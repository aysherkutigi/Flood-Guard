import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Textarea } from "./ui/textarea";
import { Alert, AlertDescription } from "./ui/alert";
import { 
  Droplets, 
  Calendar as CalendarIcon, 
  MapPin, 
  Plus, 
  TrendingUp, 
  AlertTriangle,
  Eye,
  Save,
  Clock,
  Users,
  Brain,
  Activity,
  Zap,
  Shield,
  TrendingDown,
  Cloud,
  Thermometer,
  Wind
} from "lucide-react";
// Date formatting helper
const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

// Nigerian states with major water monitoring points
const nigerianStates = [
  { id: 'niger', name: 'Niger', waterBodies: ['Niger River', 'Kaduna River', 'Gurara River'] },
  { id: 'rivers', name: 'Rivers', waterBodies: ['Niger Delta', 'Bonny River', 'New Calabar River'] },
  { id: 'lagos', name: 'Lagos', waterBodies: ['Lagos Lagoon', 'Ogun River', 'Atlantic Ocean'] },
  { id: 'benue', name: 'Benue', waterBodies: ['Benue River', 'Katsina Ala River', 'Donga River'] },
  { id: 'delta', name: 'Delta', waterBodies: ['Niger Delta', 'Forcados River', 'Warri River'] },
  { id: 'bayelsa', name: 'Bayelsa', waterBodies: ['Niger Delta', 'Brass River', 'Nun River'] },
  { id: 'cross-river', name: 'Cross River', waterBodies: ['Cross River', 'Calabar River', 'Akpa Yafe'] },
  { id: 'akwa-ibom', name: 'Akwa Ibom', waterBodies: ['Cross River', 'Qua Iboe River', 'Imo River'] },
  { id: 'kogi', name: 'Kogi', waterBodies: ['Niger River', 'Benue River', 'Oshin River'] },
  { id: 'plateau', name: 'Plateau', waterBodies: ['Benue River', 'Kaduna River', 'Gongola River'] }
];

interface WaterLevelEntry {
  id: string;
  date: Date;
  state: string;
  waterBody: string;
  location: string;
  waterLevel: number;
  unit: 'meters' | 'feet';
  weather: string;
  notes: string;
  reportedBy: string;
  timestamp: Date;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  trend?: 'rising' | 'falling' | 'stable';
  velocity?: number; // Rate of change per hour
  aiPrediction?: string;
  confidence?: number; // AI confidence percentage
}

interface WaterLevelTrackerProps {
  onDataSubmit?: (entry: WaterLevelEntry) => void;
}

export function WaterLevelTracker({ onDataSubmit }: WaterLevelTrackerProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedWaterBody, setSelectedWaterBody] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [waterLevel, setWaterLevel] = useState<string>('');
  const [unit, setUnit] = useState<'meters' | 'feet'>('meters');
  const [weather, setWeather] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [reportedBy, setReportedBy] = useState<string>('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'entry' | 'history' | 'ai-insights'>('entry');
  const [currentAIAssessment, setCurrentAIAssessment] = useState<any>(null);
  const [showAIPreview, setShowAIPreview] = useState(false);

  // Enhanced mock historical data with AI predictions
  const [waterLevelHistory, setWaterLevelHistory] = useState<WaterLevelEntry[]>([
    {
      id: '1',
      date: new Date('2024-12-20'),
      state: 'Niger',
      waterBody: 'Niger River',
      location: 'Bosso Ward Monitoring Point',
      waterLevel: 4.2,
      unit: 'meters',
      weather: 'Heavy Rain',
      notes: 'Water level rising rapidly due to upstream rainfall',
      reportedBy: 'NEMA Field Officer',
      timestamp: new Date('2024-12-20T08:30:00'),
      riskLevel: 'high',
      trend: 'rising',
      velocity: 0.8,
      aiPrediction: 'Flood risk likely within 6-12 hours',
      confidence: 88
    },
    {
      id: '2',
      date: new Date('2024-12-19'),
      state: 'Rivers',
      waterBody: 'Niger Delta',
      location: 'Port Harcourt Marina',
      waterLevel: 2.8,
      unit: 'meters',
      weather: 'Cloudy',
      notes: 'Normal tidal flow, no immediate concern',
      reportedBy: 'Community Volunteer',
      timestamp: new Date('2024-12-19T14:15:00'),
      riskLevel: 'medium',
      trend: 'stable',
      velocity: 0.1,
      aiPrediction: 'Stable conditions expected',
      confidence: 75
    },
    {
      id: '3',
      date: new Date('2024-12-18'),
      state: 'Benue',
      waterBody: 'Benue River',
      location: 'Makurdi Bridge',
      waterLevel: 3.1,
      unit: 'meters',
      weather: 'Clear',
      notes: 'Water level decreased from yesterday',
      reportedBy: 'Local Fisherman',
      timestamp: new Date('2024-12-18T16:45:00'),
      riskLevel: 'medium',
      trend: 'falling',
      velocity: -0.3,
      aiPrediction: 'Decreasing trend continues',
      confidence: 82
    },
    {
      id: '4',
      date: new Date('2024-12-17'),
      state: 'Niger',
      waterBody: 'Niger River',
      location: 'Bosso Ward Monitoring Point',
      waterLevel: 3.4,
      unit: 'meters',
      weather: 'Light Rain',
      notes: 'Steady increase observed',
      reportedBy: 'NEMA Field Officer',
      timestamp: new Date('2024-12-17T16:00:00'),
      riskLevel: 'medium',
      trend: 'rising',
      velocity: 0.4,
      aiPrediction: 'Monitor for continued rise',
      confidence: 79
    }
  ]);

  // Enhanced AI-based risk assessment
  const getAIRiskAssessment = (
    level: number, 
    unit: 'meters' | 'feet', 
    weather: string, 
    location: string,
    historicalData: WaterLevelEntry[]
  ): { 
    riskLevel: 'low' | 'medium' | 'high' | 'critical',
    confidence: number,
    prediction: string,
    trend: 'rising' | 'falling' | 'stable',
    velocity: number,
    recommendations: string[]
  } => {
    const levelInMeters = unit === 'feet' ? level * 0.3048 : level;
    
    // Get historical data for same location
    const locationHistory = historicalData
      .filter(entry => entry.location === location)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 5); // Last 5 readings
    
    // Calculate trend and velocity
    let trend: 'rising' | 'falling' | 'stable' = 'stable';
    let velocity = 0;
    
    if (locationHistory.length >= 2) {
      const current = levelInMeters;
      const previous = locationHistory[0]?.unit === 'feet' 
        ? locationHistory[0].waterLevel * 0.3048 
        : locationHistory[0]?.waterLevel || current;
      
      const timeDiff = (new Date().getTime() - locationHistory[0]?.timestamp.getTime()) / (1000 * 60 * 60); // hours
      velocity = timeDiff > 0 ? (current - previous) / timeDiff : 0;
      
      if (Math.abs(velocity) < 0.1) trend = 'stable';
      else if (velocity > 0) trend = 'rising';
      else trend = 'falling';
    }
    
    // Weather impact factor
    const weatherRiskMultiplier = {
      'Heavy Rain': 1.5,
      'Storm': 2.0,
      'Light Rain': 1.2,
      'Cloudy': 1.0,
      'Clear': 0.9,
      'Fog': 1.1
    }[weather] || 1.0;
    
    // Seasonal factor (simulated - in real app would use actual date analysis)
    const currentMonth = new Date().getMonth();
    const seasonalRisk = [6, 7, 8, 9].includes(currentMonth) ? 1.3 : 1.0; // Rainy season
    
    // Calculate adjusted risk level
    const adjustedLevel = levelInMeters * weatherRiskMultiplier * seasonalRisk;
    const velocityRisk = Math.abs(velocity) > 0.5 ? 1.2 : 1.0;
    const finalRiskLevel = adjustedLevel * velocityRisk;
    
    let riskLevel: 'low' | 'medium' | 'high' | 'critical';
    let confidence: number;
    let prediction: string;
    let recommendations: string[] = [];
    
    if (finalRiskLevel >= 6.5) {
      riskLevel = 'critical';
      confidence = 95;
      prediction = 'Immediate flood risk - evacuation may be necessary within 2-6 hours';
      recommendations = [
        'Activate emergency evacuation protocols immediately',
        'Contact NEMA and local emergency services',
        'Issue immediate public alerts via all communication channels',
        'Prepare emergency shelters and medical facilities'
      ];
    } else if (finalRiskLevel >= 4.5) {
      riskLevel = 'high';
      confidence = 88;
      prediction = 'High probability of flooding within 6-12 hours';
      recommendations = [
        'Issue flood warnings to all residents',
        'Prepare evacuation routes and transportation',
        'Monitor water levels every hour',
        'Pre-position emergency response teams'
      ];
    } else if (finalRiskLevel >= 2.5) {
      riskLevel = 'medium';
      confidence = 75;
      prediction = 'Moderate flood risk - monitor closely for 12-24 hours';
      recommendations = [
        'Increase monitoring frequency to every 2 hours',
        'Advise residents to prepare emergency kits',
        'Check drainage systems and remove blockages',
        'Alert local authorities and emergency services'
      ];
    } else {
      riskLevel = 'low';
      confidence = 82;
      prediction = 'Low flood risk under current conditions';
      recommendations = [
        'Continue routine monitoring every 6 hours',
        'Maintain regular community awareness programs',
        'Inspect and maintain early warning systems',
        'Keep emergency contact lists updated'
      ];
    }
    
    // Adjust confidence based on data quality
    const dataQuality = Math.min(locationHistory.length / 5, 1);
    confidence = Math.round(confidence * (0.7 + 0.3 * dataQuality));
    
    return {
      riskLevel,
      confidence,
      prediction,
      trend,
      velocity: Math.round(velocity * 100) / 100,
      recommendations
    };
  };

  const getRiskLevel = (level: number, unit: 'meters' | 'feet'): 'low' | 'medium' | 'high' | 'critical' => {
    const levelInMeters = unit === 'feet' ? level * 0.3048 : level;
    if (levelInMeters >= 6) return 'critical';
    if (levelInMeters >= 4) return 'high';
    if (levelInMeters >= 2) return 'medium';
    return 'low';
  };

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'bg-red-600 text-white';
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  // Real-time AI assessment when water level changes
  useEffect(() => {
    if (waterLevel && location && selectedState) {
      const waterLevelNum = parseFloat(waterLevel);
      if (!isNaN(waterLevelNum)) {
        const assessment = getAIRiskAssessment(
          waterLevelNum, 
          unit, 
          weather || 'Clear', 
          location,
          waterLevelHistory
        );
        setCurrentAIAssessment(assessment);
        setShowAIPreview(true);
      }
    } else {
      setShowAIPreview(false);
    }
  }, [waterLevel, unit, weather, location, selectedState, waterLevelHistory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedState || !selectedWaterBody || !location || !waterLevel || !reportedBy) {
      alert('Please fill in all required fields');
      return;
    }

    const waterLevelNum = parseFloat(waterLevel);
    const aiAssessment = getAIRiskAssessment(
      waterLevelNum, 
      unit, 
      weather || 'Clear', 
      location,
      waterLevelHistory
    );

    const newEntry: WaterLevelEntry = {
      id: Date.now().toString(),
      date: selectedDate,
      state: selectedState,
      waterBody: selectedWaterBody,
      location,
      waterLevel: waterLevelNum,
      unit,
      weather: weather || 'Clear',
      notes,
      reportedBy,
      timestamp: new Date(),
      riskLevel: aiAssessment.riskLevel,
      trend: aiAssessment.trend,
      velocity: aiAssessment.velocity,
      aiPrediction: aiAssessment.prediction,
      confidence: aiAssessment.confidence
    };

    setWaterLevelHistory(prev => [newEntry, ...prev]);
    onDataSubmit?.(newEntry);

    // Reset form
    setLocation('');
    setWaterLevel('');
    setWeather('');
    setNotes('');
    
    // Show AI assessment result
    alert(`Data submitted! AI Assessment: ${aiAssessment.riskLevel.toUpperCase()} RISK (${aiAssessment.confidence}% confidence)\n\nPrediction: ${aiAssessment.prediction}`);
  };

  const selectedStateData = nigerianStates.find(s => s.id === selectedState);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="flex items-center space-x-2">
            <Droplets className="h-6 w-6 text-blue-600" />
            <span>Water Level Monitoring</span>
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Record daily water levels for flood prediction by Flood Guard Innovators
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={viewMode === 'entry' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('entry')}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Entry
          </Button>
          <Button
            variant={viewMode === 'history' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('history')}
          >
            <Eye className="h-4 w-4 mr-2" />
            History
          </Button>
          <Button
            variant={viewMode === 'ai-insights' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('ai-insights')}
          >
            <Brain className="h-4 w-4 mr-2" />
            AI Insights
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Droplets className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Total Records</p>
              <p className="text-2xl text-blue-600">{waterLevelHistory.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <div>
              <p className="text-sm text-gray-600">High Risk Areas</p>
              <p className="text-2xl text-red-600">
                {waterLevelHistory.filter(h => h.riskLevel === 'high' || h.riskLevel === 'critical').length}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Monitoring Points</p>
              <p className="text-2xl text-green-600">
                {new Set(waterLevelHistory.map(h => `${h.state}-${h.location}`)).size}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-purple-600" />
            <div>
              <p className="text-sm text-gray-600">Active Reporters</p>
              <p className="text-2xl text-purple-600">
                {new Set(waterLevelHistory.map(h => h.reportedBy)).size}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {viewMode === 'entry' ? (
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Record Water Level Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? formatDate(selectedDate) : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={(date) => {
                            setSelectedDate(date || new Date());
                            setIsCalendarOpen(false);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reportedBy">Reported By *</Label>
                    <Input
                      id="reportedBy"
                      value={reportedBy}
                      onChange={(e) => setReportedBy(e.target.value)}
                      placeholder="Your name or organization"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Select value={selectedState} onValueChange={setSelectedState}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {nigerianStates.map((state) => (
                          <SelectItem key={state.id} value={state.id}>
                            {state.name} State
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="waterBody">Water Body *</Label>
                    <Select 
                      value={selectedWaterBody} 
                      onValueChange={setSelectedWaterBody}
                      disabled={!selectedState}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select water body" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedStateData?.waterBodies.map((waterBody) => (
                          <SelectItem key={waterBody} value={waterBody}>
                            {waterBody}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Specific Location *</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Bosso Ward Bridge, Community Center, etc."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="waterLevel">Water Level *</Label>
                    <Input
                      id="waterLevel"
                      type="number"
                      step="0.1"
                      value={waterLevel}
                      onChange={(e) => setWaterLevel(e.target.value)}
                      placeholder="Enter water level"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Select value={unit} onValueChange={(value: 'meters' | 'feet') => setUnit(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="meters">Meters (m)</SelectItem>
                        <SelectItem value="feet">Feet (ft)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weather">Weather Conditions</Label>
                  <Select value={weather} onValueChange={setWeather}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select weather conditions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Clear">Clear/Sunny</SelectItem>
                      <SelectItem value="Cloudy">Cloudy</SelectItem>
                      <SelectItem value="Light Rain">Light Rain</SelectItem>
                      <SelectItem value="Heavy Rain">Heavy Rain</SelectItem>
                      <SelectItem value="Storm">Storm/Thunderstorm</SelectItem>
                      <SelectItem value="Fog">Fog/Mist</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any additional observations, concerns, or context..."
                    rows={3}
                  />
                </div>

                {showAIPreview && currentAIAssessment && (
                  <Alert className={`border-l-4 ${
                    currentAIAssessment.riskLevel === 'critical' ? 'border-red-600 bg-red-50' :
                    currentAIAssessment.riskLevel === 'high' ? 'border-red-400 bg-red-50' :
                    currentAIAssessment.riskLevel === 'medium' ? 'border-yellow-400 bg-yellow-50' :
                    'border-green-400 bg-green-50'
                  }`}>
                    <Brain className="h-4 w-4" />
                    <AlertDescription>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">AI Risk Assessment:</span>
                          <Badge className={getRiskBadgeColor(currentAIAssessment.riskLevel)}>
                            {currentAIAssessment.riskLevel.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm">{currentAIAssessment.prediction}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-600">
                          <span>Confidence: {currentAIAssessment.confidence}%</span>
                          <span>Trend: {currentAIAssessment.trend}</span>
                          {currentAIAssessment.velocity !== 0 && (
                            <span>Velocity: {currentAIAssessment.velocity > 0 ? '+' : ''}{currentAIAssessment.velocity}m/hr</span>
                          )}
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Submit Water Level Data
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Risk Level Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 rounded-lg bg-green-50">
                  <span className="text-sm">Low Risk</span>
                  <Badge className="bg-green-100 text-green-800">{'< 2m'}</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-yellow-50">
                  <span className="text-sm">Medium Risk</span>
                  <Badge className="bg-yellow-100 text-yellow-800">2-4m</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-red-50">
                  <span className="text-sm">High Risk</span>
                  <Badge className="bg-red-100 text-red-800">4-6m</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-red-100">
                  <span className="text-sm">Critical Risk</span>
                  <Badge className="bg-red-600 text-white">{'≥ 6m'}</Badge>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="text-sm mb-2">Recent Measurements</h4>
                <div className="space-y-2">
                  {waterLevelHistory.slice(0, 3).map((entry) => (
                    <div key={entry.id} className="text-xs p-2 bg-gray-50 rounded">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{entry.location}</span>
                        <Badge className={getRiskBadgeColor(entry.riskLevel)}>
                          {entry.waterLevel}{entry.unit === 'meters' ? 'm' : 'ft'}
                        </Badge>
                      </div>
                      <p className="text-gray-600">{formatDate(entry.date)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>Data updates every hour</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-600 mt-1">
                  <Droplets className="h-4 w-4" />
                  <span>FloodGuard AI Integration</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : viewMode === 'history' ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="h-5 w-5 mr-2" />
              Water Level History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {waterLevelHistory.map((entry) => (
                <div key={entry.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-3">
                      <Badge className={getRiskBadgeColor(entry.riskLevel)}>
                        {entry.riskLevel.toUpperCase()}
                      </Badge>
                      <div>
                        <h4 className="text-sm font-medium">{entry.location}</h4>
                        <p className="text-xs text-gray-600">{entry.state} State - {entry.waterBody}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-blue-600">
                        {entry.waterLevel} {entry.unit === 'meters' ? 'm' : 'ft'}
                      </p>
                      <p className="text-xs text-gray-600">{formatDate(entry.date)}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-xs text-gray-600 mb-2">
                    <div>Weather: {entry.weather || 'Not specified'}</div>
                    <div>Reported by: {entry.reportedBy}</div>
                    <div>Time: {formatTime(entry.timestamp)}</div>
                    {entry.trend && (
                      <div className="flex items-center space-x-1">
                        {entry.trend === 'rising' && <TrendingUp className="h-3 w-3 text-red-600" />}
                        {entry.trend === 'falling' && <TrendingDown className="h-3 w-3 text-green-600" />}
                        {entry.trend === 'stable' && <Activity className="h-3 w-3 text-blue-600" />}
                        <span>Trend: {entry.trend}</span>
                      </div>
                    )}
                  </div>
                  
                  {entry.aiPrediction && (
                    <div className="bg-blue-50 p-2 rounded text-xs mt-2">
                      <div className="flex items-center space-x-1 mb-1">
                        <Brain className="h-3 w-3 text-blue-600" />
                        <span className="font-medium">AI Prediction ({entry.confidence}% confidence):</span>
                      </div>
                      <p className="text-blue-800">{entry.aiPrediction}</p>
                      {entry.velocity && entry.velocity !== 0 && (
                        <p className="text-blue-700 mt-1">
                          Rate of change: {entry.velocity > 0 ? '+' : ''}{entry.velocity}m/hr
                        </p>
                      )}
                    </div>
                  )}
                  
                  {entry.notes && (
                    <p className="text-xs text-gray-700 bg-gray-100 p-2 rounded mt-2">
                      {entry.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : viewMode === 'ai-insights' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 border-l-4 border-blue-500">
              <div className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">AI Predictions Active</p>
                  <p className="text-2xl text-blue-600">{waterLevelHistory.filter(h => h.aiPrediction).length}</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 border-l-4 border-red-500">
              <div className="flex items-center space-x-2">
                <Zap className="h-6 w-6 text-red-600" />
                <div>
                  <p className="text-sm text-gray-600">High Risk Alerts</p>
                  <p className="text-2xl text-red-600">
                    {waterLevelHistory.filter(h => h.riskLevel === 'high' || h.riskLevel === 'critical').length}
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 border-l-4 border-green-500">
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Avg Confidence</p>
                  <p className="text-2xl text-green-600">
                    {(() => {
                      const entriesWithConfidence = waterLevelHistory.filter(h => h.confidence);
                      return entriesWithConfidence.length > 0 
                        ? Math.round(entriesWithConfidence.reduce((sum, h) => sum + (h.confidence || 0), 0) / entriesWithConfidence.length)
                        : 0;
                    })()}%
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2" />
                FloodGuard AI Analysis Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {waterLevelHistory.slice(0, 3).map((entry) => {
                  const assessment = getAIRiskAssessment(
                    entry.waterLevel,
                    entry.unit,
                    entry.weather,
                    entry.location,
                    waterLevelHistory
                  );
                  
                  return (
                    <div key={entry.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">{entry.location}</h4>
                          <p className="text-sm text-gray-600">{entry.state} State - {entry.waterBody}</p>
                        </div>
                        <Badge className={getRiskBadgeColor(assessment.riskLevel)}>
                          {assessment.riskLevel.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div className="flex items-center space-x-2">
                          <Droplets className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">Level: {entry.waterLevel}{entry.unit === 'meters' ? 'm' : 'ft'}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Cloud className="h-4 w-4 text-gray-600" />
                          <span className="text-sm">Weather: {entry.weather}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Activity className="h-4 w-4 text-purple-600" />
                          <span className="text-sm">Confidence: {assessment.confidence}%</span>
                        </div>
                      </div>
                      
                      <Alert className="mb-3">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          <strong>AI Prediction:</strong> {assessment.prediction}
                        </AlertDescription>
                      </Alert>
                      
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium">Recommended Actions:</h5>
                        <ul className="text-xs space-y-1">
                          {assessment.recommendations.map((rec, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <span className="text-blue-600 mt-1">&bull;</span>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Trend Analysis & Forecasting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Rising Water Levels</h4>
                    {waterLevelHistory
                      .filter(h => h.trend === 'rising')
                      .slice(0, 3)
                      .map(entry => (
                        <div key={entry.id} className="flex items-center justify-between p-2 bg-red-50 rounded">
                          <div>
                            <span className="text-sm font-medium">{entry.location}</span>
                            <p className="text-xs text-gray-600">{entry.state}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-1">
                              <TrendingUp className="h-3 w-3 text-red-600" />
                              <span className="text-xs text-red-600">+{entry.velocity}m/hr</span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Stable/Falling Levels</h4>
                    {waterLevelHistory
                      .filter(h => h.trend === 'falling' || h.trend === 'stable')
                      .slice(0, 3)
                      .map(entry => (
                        <div key={entry.id} className="flex items-center justify-between p-2 bg-green-50 rounded">
                          <div>
                            <span className="text-sm font-medium">{entry.location}</span>
                            <p className="text-xs text-gray-600">{entry.state}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-1">
                              {entry.trend === 'falling' ? (
                                <TrendingDown className="h-3 w-3 text-green-600" />
                              ) : (
                                <Activity className="h-3 w-3 text-blue-600" />
                              )}
                              <span className="text-xs text-green-600">
                                {entry.velocity !== undefined ? `${entry.velocity}m/hr` : 'Stable'}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">AI Insights & Recommendations</h4>
                  <ul className="text-sm space-y-2 text-blue-700">
                    <li>&bull; Monitor rising trends in Niger and Rivers states closely</li>
                    <li>&bull; Weather patterns suggest increased monitoring during rainy season</li>
                    <li>&bull; Consider deploying additional sensors in high-velocity areas</li>
                    <li>&bull; Emergency protocols should be reviewed for critical risk locations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  );
}