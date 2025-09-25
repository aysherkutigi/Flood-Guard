import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { AlertTriangle, Users, Droplets, Clock, MapPin, Phone, Bell, TrendingUp, Activity, Settings, User } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
// Import the new components
import { NigeriaFloodMap } from "./NigeriaFloodMap";
import { PopulationManager } from "./PopulationManager";
import { AlertDetailModal } from "./AlertDetailModal";
import { NotificationCenter } from "./NotificationCenter";
import { UserSettings } from "./UserSettings";
import { WaterLevelTracker } from "./WaterLevelTracker";

export function AlertDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'map' | 'population' | 'alerts' | 'notifications' | 'settings' | 'waterlevels'>('overview');
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  const currentAlerts = [
    {
      id: 1,
      location: "Bosso Ward, Minna, Niger State",
      severity: "high",
      message: "URGENT: Heavy rainfall detected. River level rising rapidly. Evacuate low-lying areas immediately.",
      timestamp: "2 minutes ago",
      affectedPopulation: 12000,
      riskLevel: 85
    },
    {
      id: 2,
      location: "Mile 1 Diobu, Port Harcourt, Rivers State",
      severity: "high",
      message: "HIGH FLOOD RISK: Excessive rainfall in upstream areas. Prepare for possible flooding in next 6 hours.",
      timestamp: "15 minutes ago",
      affectedPopulation: 8500,
      riskLevel: 78
    },
    {
      id: 3,
      location: "Tunga Ward, Minna, Niger State",
      severity: "medium",
      message: "ALERT DELIVERED: Flood warning successfully sent to 3,200 residents via SMS and USSD.",
      timestamp: "1 hour ago",
      affectedPopulation: 3200,
      riskLevel: 45
    },
    {
      id: 4,
      location: "Victoria Island, Lagos State",
      severity: "medium",
      message: "MODERATE RISK: Coastal flooding possible due to high tide and rainfall combination.",
      timestamp: "2 hours ago",
      affectedPopulation: 5600,
      riskLevel: 52
    }
  ];

  const nigerianStatesOverview = [
    { 
      id: 'niger',
      name: "Niger", 
      risk: "High", 
      alerts: 3, 
      population: "2.8M at risk",
      riskLevel: 85
    },
    { 
      id: 'rivers',
      name: "Rivers", 
      risk: "High", 
      alerts: 4, 
      population: "1.2M at risk",
      riskLevel: 78
    },
    { 
      id: 'lagos',
      name: "Lagos", 
      risk: "Medium", 
      alerts: 2, 
      population: "800K at risk",
      riskLevel: 45
    },
    { 
      id: 'delta',
      name: "Delta", 
      risk: "High", 
      alerts: 2, 
      population: "650K at risk",
      riskLevel: 68
    },
    { 
      id: 'kaduna',
      name: "Kaduna", 
      risk: "Medium", 
      alerts: 1, 
      population: "400K at risk",
      riskLevel: 40
    },
    { 
      id: 'benue',
      name: "Benue", 
      risk: "High", 
      alerts: 3, 
      population: "900K at risk",
      riskLevel: 72
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAlertClick = (alert: any) => {
    setSelectedAlert(alert);
    setIsAlertModalOpen(true);
  };

  const handleStateClick = (state: any) => {
    setActiveTab('map');
    // The map component will handle state selection internally
  };

  const totalPopulationAtRisk = currentAlerts.reduce((acc, alert) => acc + alert.affectedPopulation, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl text-gray-900">FloodGuard Nigeria Dashboard</h1>
              <p className="text-gray-600 mt-2">Real-time flood monitoring and population management for Nigerian communities</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">System Status</p>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-600">Online</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Last Updated</p>
                <p className="text-sm text-gray-900">2 minutes ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-2 px-1 border-b-2 text-sm transition-colors duration-200 ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Activity className="h-5 w-5 inline mr-2" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab('map')}
                className={`py-2 px-1 border-b-2 text-sm transition-colors duration-200 ${
                  activeTab === 'map'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <MapPin className="h-5 w-5 inline mr-2" />
                Nigeria Map
              </button>
              <button
                onClick={() => setActiveTab('population')}
                className={`py-2 px-1 border-b-2 text-sm transition-colors duration-200 ${
                  activeTab === 'population'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Users className="h-5 w-5 inline mr-2" />
                Population Data
              </button>
              <button
                onClick={() => setActiveTab('waterlevels')}
                className={`py-2 px-1 border-b-2 text-sm transition-colors duration-200 ${
                  activeTab === 'waterlevels'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Droplets className="h-5 w-5 inline mr-2" />
                Water Levels
              </button>
              <button
                onClick={() => setActiveTab('alerts')}
                className={`py-2 px-1 border-b-2 text-sm transition-colors duration-200 ${
                  activeTab === 'alerts'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Bell className="h-5 w-5 inline mr-2" />
                Active Alerts
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`py-2 px-1 border-b-2 text-sm transition-colors duration-200 ${
                  activeTab === 'notifications'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Settings className="h-5 w-5 inline mr-2" />
                Notifications
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`py-2 px-1 border-b-2 text-sm transition-colors duration-200 ${
                  activeTab === 'settings'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <User className="h-5 w-5 inline mr-2" />
                Settings
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card 
                className="bg-red-50 border-red-200 cursor-pointer hover:shadow-md transition-shadow duration-200"
                onClick={() => setActiveTab('alerts')}
              >
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                    <div className="ml-4">
                      <p className="text-sm text-red-600">Active Alerts</p>
                      <p className="text-3xl text-red-700">{currentAlerts.filter(a => a.severity === 'high').length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="bg-blue-50 border-blue-200 cursor-pointer hover:shadow-md transition-shadow duration-200"
                onClick={() => setActiveTab('population')}
              >
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm text-blue-600">People at Risk</p>
                      <p className="text-3xl text-blue-700">{(totalPopulationAtRisk / 1000).toFixed(0)}K</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="bg-yellow-50 border-yellow-200 cursor-pointer hover:shadow-md transition-shadow duration-200"
                onClick={() => setActiveTab('map')}
              >
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <MapPin className="h-8 w-8 text-yellow-600" />
                    <div className="ml-4">
                      <p className="text-sm text-yellow-600">States Monitored</p>
                      <p className="text-3xl text-yellow-700">36</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm text-green-600">Alert Success Rate</p>
                      <p className="text-3xl text-green-700">98%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Nigerian States Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Nigerian States Risk Overview
                  </span>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab('map')}>
                    View Full Map
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {nigerianStatesOverview.map((state, index) => (
                    <div 
                      key={index} 
                      className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                      onClick={() => handleStateClick(state)}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-lg text-gray-900">{state.name} State</h4>
                        <Badge className={getRiskColor(state.risk)}>
                          {state.risk} Risk
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">{state.population}</p>
                        <p className="text-sm text-orange-600">{state.alerts} active alerts</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className={`h-2 rounded-full ${
                              state.risk === 'High' ? 'bg-red-500' :
                              state.risk === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${state.riskLevel}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500">{state.riskLevel}% flood probability</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Alerts Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Recent Alerts
                  </span>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab('alerts')}>
                    View All Alerts
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentAlerts.slice(0, 3).map((alert) => (
                    <div 
                      key={alert.id} 
                      className={`border rounded-lg p-4 cursor-pointer hover:shadow-md transition-all duration-200 ${getSeverityColor(alert.severity)}`}
                      onClick={() => handleAlertClick(alert)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <AlertTriangle className="h-4 w-4" />
                            <span className="text-sm">{alert.location}</span>
                          </div>
                          <p className="text-sm mb-2">{alert.message}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {alert.affectedPopulation.toLocaleString()} affected
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {alert.timestamp}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge variant="outline">{alert.riskLevel}% Risk</Badge>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'map' && <NigeriaFloodMap />}
        
        {activeTab === 'population' && <PopulationManager />}

        {activeTab === 'waterlevels' && <WaterLevelTracker />}

        {activeTab === 'alerts' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    All Active Alerts
                  </span>
                  <div className="flex space-x-2">
                    <Button size="sm">Send New Alert</Button>
                    <Button variant="outline" size="sm">View Reports</Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentAlerts.map((alert) => (
                    <div 
                      key={alert.id} 
                      className={`border rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all duration-200 ${getSeverityColor(alert.severity)}`}
                      onClick={() => handleAlertClick(alert)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <AlertTriangle className="h-5 w-5" />
                            <h4 className="text-lg">{alert.location}</h4>
                            <Badge className={`${alert.severity === 'high' ? 'bg-red-600' : 'bg-yellow-600'} text-white`}>
                              {alert.severity.toUpperCase()} PRIORITY
                            </Badge>
                          </div>
                          
                          <p className="text-base mb-4">{alert.message}</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4 text-blue-600" />
                              <span className="text-sm">
                                <strong>{alert.affectedPopulation.toLocaleString()}</strong> people affected
                              </span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Droplets className="h-4 w-4 text-red-600" />
                              <span className="text-sm">
                                <strong>{alert.riskLevel}%</strong> risk level
                              </span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-gray-600" />
                              <span className="text-sm">{alert.timestamp}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4 text-green-600" />
                              <span className="text-sm">SMS sent</span>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" onClick={(e) => {
                              e.stopPropagation();
                              handleAlertClick(alert);
                            }}>
                              View Full Details
                            </Button>
                            <Button size="sm" variant="outline" onClick={(e) => e.stopPropagation()}>
                              Contact Communities
                            </Button>
                            <Button size="sm" variant="outline" onClick={(e) => e.stopPropagation()}>
                              Update Status
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'notifications' && <NotificationCenter />}
        
        {activeTab === 'settings' && <UserSettings />}
      </div>

      {/* Alert Detail Modal */}
      <AlertDetailModal 
        alert={selectedAlert}
        isOpen={isAlertModalOpen}
        onClose={() => {
          setIsAlertModalOpen(false);
          setSelectedAlert(null);
        }}
      />
    </div>
  );
}