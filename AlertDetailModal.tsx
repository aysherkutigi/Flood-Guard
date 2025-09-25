import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  AlertTriangle, Users, Clock, MapPin, Phone, MessageSquare, 
  TrendingUp, Droplets, Wind, Thermometer, Eye, Navigation,
  Send, Settings, FileText, Activity
} from "lucide-react";

interface AlertDetailModalProps {
  alert: {
    id: number;
    location: string;
    severity: string;
    message: string;
    timestamp: string;
    affectedPopulation: number;
    riskLevel: number;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AlertDetailModal({ alert, isOpen, onClose }: AlertDetailModalProps) {
  const [activeAction, setActiveAction] = useState<string | null>(null);

  if (!alert) return null;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const weatherData = {
    rainfall: "156mm in 24hrs",
    windSpeed: "45 km/h",
    temperature: "28°C",
    humidity: "85%",
    riverLevel: "4.2m (Critical)",
    soilSaturation: "95%"
  };

  const communityContacts = [
    { name: "Malam Sani Ibrahim", role: "Community Leader", phone: "+234-803-123-4567", status: "Contacted" },
    { name: "Mrs. Fatima Usman", role: "Women's Group Leader", phone: "+234-807-987-6543", status: "Contacted" },
    { name: "Chief John Adamu", role: "Traditional Ruler", phone: "+234-809-456-7890", status: "Pending" },
    { name: "Dr. Ahmed Bello", role: "Health Center", phone: "+234-811-234-5678", status: "Contacted" }
  ];

  const alertHistory = [
    { time: "14:32", action: "Alert created", user: "System AI", severity: "high" },
    { time: "14:35", action: "SMS sent to 12,000 residents", user: "FloodGuard SMS", severity: "medium" },
    { time: "14:38", action: "USSD alerts dispatched", user: "FloodGuard USSD", severity: "medium" },
    { time: "14:42", action: "Community leaders contacted", user: "Emergency Team", severity: "high" },
    { time: "14:45", action: "NEMA notification sent", user: "System", severity: "high" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <AlertTriangle className={`h-6 w-6 ${alert.severity === 'high' ? 'text-red-600' : 'text-yellow-600'}`} />
            <span>Flood Alert Details - {alert.location}</span>
            <Badge className={`${alert.severity === 'high' ? 'bg-red-600' : 'bg-yellow-600'} text-white`}>
              {alert.severity.toUpperCase()} PRIORITY
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="weather">Weather Data</TabsTrigger>
            <TabsTrigger value="contacts">Community Contacts</TabsTrigger>
            <TabsTrigger value="actions">Response Actions</TabsTrigger>
            <TabsTrigger value="history">Alert History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className={getSeverityColor(alert.severity)}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Alert Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm opacity-75">Location</p>
                    <p className="text-lg">{alert.location}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-75">Risk Level</p>
                    <div className="flex items-center space-x-2">
                      <div className="w-full bg-white bg-opacity-30 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${alert.severity === 'high' ? 'bg-red-600' : 'bg-yellow-600'}`}
                          style={{ width: `${alert.riskLevel}%` }}
                        ></div>
                      </div>
                      <span className="text-lg">{alert.riskLevel}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm opacity-75">Alert Message</p>
                    <p className="text-base">{alert.message}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Impact Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <Users className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                      <p className="text-2xl text-blue-600">{alert.affectedPopulation.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">People Affected</p>
                    </div>
                    
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <MapPin className="h-6 w-6 text-orange-600 mx-auto mb-1" />
                      <p className="text-2xl text-orange-600">8</p>
                      <p className="text-sm text-gray-600">Communities</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <MessageSquare className="h-6 w-6 text-green-600 mx-auto mb-1" />
                      <p className="text-2xl text-green-600">98%</p>
                      <p className="text-sm text-gray-600">SMS Delivered</p>
                    </div>
                    
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <Clock className="h-6 w-6 text-purple-600 mx-auto mb-1" />
                      <p className="text-2xl text-purple-600">2</p>
                      <p className="text-sm text-gray-600">Hours Active</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="weather" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Droplets className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-sm text-blue-600">Rainfall (24hrs)</p>
                      <p className="text-2xl text-blue-700">{weatherData.rainfall}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Wind className="h-8 w-8 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Wind Speed</p>
                      <p className="text-2xl text-gray-700">{weatherData.windSpeed}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Thermometer className="h-8 w-8 text-orange-600" />
                    <div>
                      <p className="text-sm text-orange-600">Temperature</p>
                      <p className="text-2xl text-orange-700">{weatherData.temperature}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-8 w-8 text-red-600" />
                    <div>
                      <p className="text-sm text-red-600">River Level</p>
                      <p className="text-2xl text-red-700">{weatherData.riverLevel}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Eye className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-sm text-green-600">Humidity</p>
                      <p className="text-2xl text-green-700">{weatherData.humidity}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Activity className="h-8 w-8 text-purple-600" />
                    <div>
                      <p className="text-sm text-purple-600">Soil Saturation</p>
                      <p className="text-2xl text-purple-700">{weatherData.soilSaturation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Community Emergency Contacts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {communityContacts.map((contact, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="text-base">{contact.name}</p>
                          <p className="text-sm text-gray-600">{contact.role}</p>
                          <p className="text-sm text-gray-500">{contact.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={contact.status === 'Contacted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {contact.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4 mr-1" />
                          Call
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="actions" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full justify-start" 
                    variant={activeAction === 'escalate' ? 'default' : 'outline'}
                    onClick={() => setActiveAction('escalate')}
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Escalate Alert Level
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant={activeAction === 'sms' ? 'default' : 'outline'}
                    onClick={() => setActiveAction('sms')}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Additional SMS
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant={activeAction === 'evacuation' ? 'default' : 'outline'}
                    onClick={() => setActiveAction('evacuation')}
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Trigger Evacuation Alert
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant={activeAction === 'nema' ? 'default' : 'outline'}
                    onClick={() => setActiveAction('nema')}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Contact NEMA
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Response Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>SMS Delivery</span>
                      <Badge className="bg-green-100 text-green-800">98% Complete</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '98%' }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Community Response</span>
                      <Badge className="bg-yellow-100 text-yellow-800">75% Confirmed</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Emergency Services</span>
                      <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Alert Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alertHistory.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        item.severity === 'high' ? 'bg-red-500' : 
                        item.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-base">{item.action}</p>
                            <p className="text-sm text-gray-600">by {item.user}</p>
                          </div>
                          <Badge variant="outline">{item.time}</Badge>
                        </div>
                        {index < alertHistory.length - 1 && (
                          <div className="w-px h-4 bg-gray-200 ml-1 mt-2"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}