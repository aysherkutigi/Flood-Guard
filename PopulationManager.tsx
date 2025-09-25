import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Users, Plus, Edit, MapPin, Phone, Home, AlertTriangle } from "lucide-react";

interface PopulationData {
  id: string;
  state: string;
  lga: string; // Local Government Area
  ward: string;
  community: string;
  households: number;
  population: number;
  vulnerablePopulation: number; // elderly, children, disabled
  contactPerson: string;
  phoneNumber: string;
  riskLevel: 'low' | 'medium' | 'high';
  lastUpdated: string;
}

const initialPopulationData: PopulationData[] = [
  {
    id: '1',
    state: 'Niger',
    lga: 'Bosso',
    ward: 'Bosso Ward A',
    community: 'Gbaiko Village',
    households: 450,
    population: 2800,
    vulnerablePopulation: 420,
    contactPerson: 'Malam Sani Ibrahim',
    phoneNumber: '+234-803-123-4567',
    riskLevel: 'high',
    lastUpdated: '2024-01-15'
  },
  {
    id: '2',
    state: 'Niger',
    lga: 'Bosso',
    ward: 'Tunga Ward',
    community: 'Tunga Central',
    households: 320,
    population: 1950,
    vulnerablePopulation: 285,
    contactPerson: 'Mrs. Fatima Usman',
    phoneNumber: '+234-807-987-6543',
    riskLevel: 'medium',
    lastUpdated: '2024-01-14'
  },
  {
    id: '3',
    state: 'Niger',
    lga: 'Chanchaga',
    ward: 'Chanchaga Ward',
    community: 'Chanchaga Riverside',
    households: 180,
    population: 890,
    vulnerablePopulation: 156,
    contactPerson: 'Chief John Adamu',
    phoneNumber: '+234-809-456-7890',
    riskLevel: 'high',
    lastUpdated: '2024-01-15'
  },
  {
    id: '4',
    state: 'Rivers',
    lga: 'Port Harcourt',
    ward: 'Diobu Ward',
    community: 'Mile 1 Diobu',
    households: 680,
    population: 4200,
    vulnerablePopulation: 630,
    contactPerson: 'Elder Samuel Okoro',
    phoneNumber: '+234-811-234-5678',
    riskLevel: 'high',
    lastUpdated: '2024-01-15'
  },
  {
    id: '5',
    state: 'Lagos',
    lga: 'Eti-Osa',
    ward: 'Victoria Island',
    community: 'Bar Beach Area',
    households: 220,
    population: 1350,
    vulnerablePopulation: 195,
    contactPerson: 'Mrs. Adenike Johnson',
    phoneNumber: '+234-812-345-6789',
    riskLevel: 'medium',
    lastUpdated: '2024-01-13'
  }
];

const nigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa', 
  'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 
  'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

export function PopulationManager() {
  const [populationData, setPopulationData] = useState<PopulationData[]>(initialPopulationData);
  const [selectedState, setSelectedState] = useState<string>('Niger');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<PopulationData>>({
    state: 'Niger',
    lga: '',
    ward: '',
    community: '',
    households: 0,
    population: 0,
    vulnerablePopulation: 0,
    contactPerson: '',
    phoneNumber: '',
    riskLevel: 'medium'
  });

  const filteredData = populationData.filter(item => item.state === selectedState);

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing record
      setPopulationData(prev => prev.map(item => 
        item.id === editingId 
          ? { ...item, ...formData, lastUpdated: new Date().toISOString().split('T')[0] }
          : item
      ));
      setEditingId(null);
    } else {
      // Add new record
      const newRecord: PopulationData = {
        ...formData,
        id: Date.now().toString(),
        lastUpdated: new Date().toISOString().split('T')[0]
      } as PopulationData;
      
      setPopulationData(prev => [...prev, newRecord]);
    }
    
    setIsAddingNew(false);
    setFormData({
      state: selectedState,
      lga: '',
      ward: '',
      community: '',
      households: 0,
      population: 0,
      vulnerablePopulation: 0,
      contactPerson: '',
      phoneNumber: '',
      riskLevel: 'medium'
    });
  };

  const handleEdit = (item: PopulationData) => {
    setFormData(item);
    setEditingId(item.id);
    setIsAddingNew(true);
  };

  const totalStats = {
    totalPopulation: filteredData.reduce((acc, item) => acc + item.population, 0),
    totalHouseholds: filteredData.reduce((acc, item) => acc + item.households, 0),
    totalVulnerable: filteredData.reduce((acc, item) => acc + item.vulnerablePopulation, 0),
    highRiskCommunities: filteredData.filter(item => item.riskLevel === 'high').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl text-gray-900">Population Data Management</h2>
          <p className="text-gray-600">Manage community population data for flood response planning</p>
        </div>
        
        <Dialog open={isAddingNew} onOpenChange={setIsAddingNew}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Community Data</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingId ? 'Edit Community Data' : 'Add New Community Data'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="state">State</Label>
                  <Select 
                    value={formData.state} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, state: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {nigerianStates.map(state => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="lga">Local Government Area</Label>
                  <Input
                    id="lga"
                    value={formData.lga || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, lga: e.target.value }))}
                    placeholder="e.g., Bosso"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ward">Ward</Label>
                  <Input
                    id="ward"
                    value={formData.ward || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, ward: e.target.value }))}
                    placeholder="e.g., Bosso Ward A"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="community">Community/Village</Label>
                  <Input
                    id="community"
                    value={formData.community || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, community: e.target.value }))}
                    placeholder="e.g., Gbaiko Village"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="households">Total Households</Label>
                  <Input
                    id="households"
                    type="number"
                    value={formData.households || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, households: parseInt(e.target.value) || 0 }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="population">Total Population</Label>
                  <Input
                    id="population"
                    type="number"
                    value={formData.population || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, population: parseInt(e.target.value) || 0 }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="vulnerablePopulation">Vulnerable Population</Label>
                  <Input
                    id="vulnerablePopulation"
                    type="number"
                    value={formData.vulnerablePopulation || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, vulnerablePopulation: parseInt(e.target.value) || 0 }))}
                    placeholder="Elderly, children, disabled"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactPerson">Community Contact Person</Label>
                  <Input
                    id="contactPerson"
                    value={formData.contactPerson || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
                    placeholder="e.g., Chief John Adamu"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                    placeholder="+234-xxx-xxx-xxxx"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="riskLevel">Flood Risk Level</Label>
                <Select 
                  value={formData.riskLevel} 
                  onValueChange={(value: 'low' | 'medium' | 'high') => setFormData(prev => ({ ...prev, riskLevel: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Risk</SelectItem>
                    <SelectItem value="medium">Medium Risk</SelectItem>
                    <SelectItem value="high">High Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsAddingNew(false);
                    setEditingId(null);
                    setFormData({
                      state: selectedState,
                      lga: '',
                      ward: '',
                      community: '',
                      households: 0,
                      population: 0,
                      vulnerablePopulation: 0,
                      contactPerson: '',
                      phoneNumber: '',
                      riskLevel: 'medium'
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingId ? 'Update' : 'Add'} Community Data
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* State Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Total Population</p>
              <p className="text-2xl text-blue-600">{totalStats.totalPopulation.toLocaleString()}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Home className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Total Households</p>
              <p className="text-2xl text-green-600">{totalStats.totalHouseholds.toLocaleString()}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <div>
              <p className="text-sm text-gray-600">Vulnerable Population</p>
              <p className="text-2xl text-orange-600">{totalStats.totalVulnerable.toLocaleString()}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-red-600" />
            <div>
              <p className="text-sm text-gray-600">High Risk Communities</p>
              <p className="text-2xl text-red-600">{totalStats.highRiskCommunities}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={selectedState} onValueChange={setSelectedState}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="Niger">Niger</TabsTrigger>
          <TabsTrigger value="Lagos">Lagos</TabsTrigger>
          <TabsTrigger value="Rivers">Rivers</TabsTrigger>
          <TabsTrigger value="Kaduna">Kaduna</TabsTrigger>
          <TabsTrigger value="Kano">Kano</TabsTrigger>
          <TabsTrigger value="Delta">Delta</TabsTrigger>
        </TabsList>
        
        <TabsContent value={selectedState}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{selectedState} State Population Data</span>
                <Badge variant="outline">{filteredData.length} Communities</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-lg text-gray-900">{item.community}</h4>
                            <Badge className={getRiskColor(item.riskLevel)}>
                              {item.riskLevel} risk
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-3">
                            {item.ward}, {item.lga} LGA, {item.state} State
                          </p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4 text-blue-600" />
                              <span className="text-sm">
                                <strong>{item.population}</strong> people
                              </span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Home className="h-4 w-4 text-green-600" />
                              <span className="text-sm">
                                <strong>{item.households}</strong> households
                              </span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <AlertTriangle className="h-4 w-4 text-orange-600" />
                              <span className="text-sm">
                                <strong>{item.vulnerablePopulation}</strong> vulnerable
                              </span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4 text-purple-600" />
                              <span className="text-sm">{item.contactPerson}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>Contact: {item.phoneNumber}</span>
                            <span>Last updated: {item.lastUpdated}</span>
                          </div>
                        </div>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(item)}
                          className="ml-4"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg text-gray-500 mb-2">No population data found</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Add community population data for {selectedState} state to get started.
                    </p>
                    <Button onClick={() => setIsAddingNew(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Community
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}