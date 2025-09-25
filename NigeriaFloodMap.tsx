import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { AlertTriangle, Users, MapPin, TrendingUp, Clock, Waves, Eye, EyeOff } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// Nigerian states data with flood risk levels and population data
const nigerianStates = [
  { id: 'niger', name: 'Niger', population: 5556200, riskLevel: 'high', currentRisk: 85, alerts: 3, lat: 9.0817, lng: 6.7218, x: 320, y: 180 },
  { id: 'lagos', name: 'Lagos', population: 14862000, riskLevel: 'medium', currentRisk: 45, alerts: 1, lat: 6.5244, lng: 3.3792, x: 280, y: 320 },
  { id: 'kano', name: 'Kano', population: 13076892, riskLevel: 'low', currentRisk: 20, alerts: 0, lat: 11.9948, lng: 8.5272, x: 420, y: 120 },
  { id: 'kaduna', name: 'Kaduna', population: 8252366, riskLevel: 'medium', currentRisk: 55, alerts: 2, lat: 10.5105, lng: 7.4165, x: 380, y: 150 },
  { id: 'katsina', name: 'Katsina', population: 7831319, riskLevel: 'medium', currentRisk: 40, alerts: 1, lat: 12.9908, lng: 7.6018, x: 380, y: 100 },
  { id: 'oyo', name: 'Oyo', population: 7840864, riskLevel: 'low', currentRisk: 25, alerts: 0, lat: 8.0000, lng: 4.0000, x: 300, y: 250 },
  { id: 'rivers', name: 'Rivers', population: 7303924, riskLevel: 'high', currentRisk: 78, alerts: 4, lat: 4.8156, lng: 6.9778, x: 360, y: 340 },
  { id: 'bauchi', name: 'Bauchi', population: 6537314, riskLevel: 'medium', currentRisk: 50, alerts: 1, lat: 10.3158, lng: 9.8442, x: 480, y: 150 },
  { id: 'jigawa', name: 'Jigawa', population: 5838819, riskLevel: 'low', currentRisk: 30, alerts: 0, lat: 12.2200, lng: 9.3500, x: 460, y: 110 },
  { id: 'benue', name: 'Benue', population: 5741815, riskLevel: 'high', currentRisk: 72, alerts: 3, lat: 7.3333, lng: 8.7500, x: 440, y: 220 },
  { id: 'anambra', name: 'Anambra', population: 5527809, riskLevel: 'medium', currentRisk: 38, alerts: 1, lat: 6.2103, lng: 6.9810, x: 400, y: 280 },
  { id: 'borno', name: 'Borno', population: 5860183, riskLevel: 'low', currentRisk: 15, alerts: 0, lat: 11.8333, lng: 13.1500, x: 550, y: 120 },
  { id: 'delta', name: 'Delta', population: 5663362, riskLevel: 'high', currentRisk: 68, alerts: 2, lat: 5.8900, lng: 5.6800, x: 340, y: 310 },
  { id: 'imo', name: 'Imo', population: 5408756, riskLevel: 'medium', currentRisk: 42, alerts: 1, lat: 5.5720, lng: 7.0588, x: 400, y: 300 },
  { id: 'akwa-ibom', name: 'Akwa Ibom', population: 5482177, riskLevel: 'high', currentRisk: 65, alerts: 2, lat: 5.0077, lng: 7.8536, x: 420, y: 330 },
  { id: 'ogun', name: 'Ogun', population: 5217716, riskLevel: 'medium', currentRisk: 35, alerts: 1, lat: 7.1608, lng: 3.3500, x: 290, y: 300 },
  { id: 'kebbi', name: 'Kebbi', population: 4440052, riskLevel: 'medium', currentRisk: 45, alerts: 2, lat: 12.4500, lng: 4.2000, x: 280, y: 100 },
  { id: 'ondo', name: 'Ondo', population: 4671700, riskLevel: 'low', currentRisk: 28, alerts: 0, lat: 7.2500, lng: 5.2000, x: 320, y: 290 },
  { id: 'osun', name: 'Osun', population: 4705589, riskLevel: 'low', currentRisk: 22, alerts: 0, lat: 7.5629, lng: 4.5200, x: 310, y: 280 },
  { id: 'kogi', name: 'Kogi', population: 4473490, riskLevel: 'high', currentRisk: 70, alerts: 3, lat: 7.8000, lng: 6.7000, x: 380, y: 240 },
  { id: 'zamfara', name: 'Zamfara', population: 4515427, riskLevel: 'medium', currentRisk: 38, alerts: 1, lat: 12.1700, lng: 6.2400, x: 320, y: 110 },
  { id: 'enugu', name: 'Enugu', population: 4411119, riskLevel: 'low', currentRisk: 25, alerts: 0, lat: 6.5244, lng: 7.5112, x: 420, y: 270 },
  { id: 'sokoto', name: 'Sokoto', population: 4998090, riskLevel: 'low', currentRisk: 18, alerts: 0, lat: 13.0627, lng: 5.2433, x: 260, y: 80 },
  { id: 'kwara', name: 'Kwara', population: 3192893, riskLevel: 'medium', currentRisk: 48, alerts: 2, lat: 8.9700, lng: 4.5400, x: 320, y: 200 },
  { id: 'plateau', name: 'Plateau', population: 4200000, riskLevel: 'medium', currentRisk: 52, alerts: 2, lat: 9.2182, lng: 9.5179, x: 480, y: 180 },
  { id: 'adamawa', name: 'Adamawa', population: 4248436, riskLevel: 'low', currentRisk: 30, alerts: 0, lat: 9.3265, lng: 12.3984, x: 540, y: 180 },
  { id: 'cross-river', name: 'Cross River', population: 3737517, riskLevel: 'high', currentRisk: 63, alerts: 2, lat: 5.9631, lng: 8.3273, x: 450, y: 320 },
  { id: 'abia', name: 'Abia', population: 3727347, riskLevel: 'medium', currentRisk: 44, alerts: 1, lat: 5.4164, lng: 7.3911, x: 410, y: 310 },
  { id: 'edo', name: 'Edo', population: 4235595, riskLevel: 'medium', currentRisk: 41, alerts: 1, lat: 6.3350, lng: 5.6037, x: 350, y: 290 },
  { id: 'taraba', name: 'Taraba', population: 2300736, riskLevel: 'medium', currentRisk: 46, alerts: 1, lat: 8.0000, lng: 10.0000, x: 520, y: 200 },
  { id: 'gombe', name: 'Gombe', population: 3256558, riskLevel: 'low', currentRisk: 26, alerts: 0, lat: 10.2897, lng: 11.1689, x: 520, y: 160 },
  { id: 'yobe', name: 'Yobe', population: 2757000, riskLevel: 'low', currentRisk: 19, alerts: 0, lat: 12.2950, lng: 11.9660, x: 520, y: 110 },
  { id: 'ekiti', name: 'Ekiti', population: 3270798, riskLevel: 'low', currentRisk: 23, alerts: 0, lat: 7.7319, lng: 5.3106, x: 330, y: 270 },
  { id: 'bayelsa', name: 'Bayelsa', population: 2277961, riskLevel: 'high', currentRisk: 82, alerts: 4, lat: 4.7719, lng: 6.0699, x: 350, y: 350 },
  { id: 'nasarawa', name: 'Nasarawa', population: 2523395, riskLevel: 'medium', currentRisk: 49, alerts: 2, lat: 8.5200, lng: 8.3100, x: 440, y: 200 },
  { id: 'ebonyi', name: 'Ebonyi', population: 2176947, riskLevel: 'low', currentRisk: 27, alerts: 0, lat: 6.2649, lng: 8.0137, x: 430, y: 280 },
  { id: 'fct', name: 'FCT Abuja', population: 3564126, riskLevel: 'medium', currentRisk: 44, alerts: 1, lat: 9.0579, lng: 7.4951, x: 400, y: 170 }
];

interface NigeriaFloodMapProps {
  onStateSelect?: (state: typeof nigerianStates[0]) => void;
}

export function NigeriaFloodMap({ onStateSelect }: NigeriaFloodMapProps) {
  const [selectedState, setSelectedState] = useState<string | null>('niger');
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [showRiskOverlay, setShowRiskOverlay] = useState(true);
  const [showAlerts, setShowAlerts] = useState(true);

  const getRiskColor = (riskLevel: string, currentRisk: number) => {
    if (riskLevel === 'high' || currentRisk >= 70) return '#dc2626';
    if (riskLevel === 'medium' || currentRisk >= 40) return '#f59e0b';
    return '#22c55e';
  };

  const getRiskOpacity = (riskLevel: string, currentRisk: number) => {
    if (riskLevel === 'high' || currentRisk >= 70) return 0.8;
    if (riskLevel === 'medium' || currentRisk >= 40) return 0.6;
    return 0.4;
  };

  const getRiskBadgeColor = (riskLevel: string) => {
    if (riskLevel === 'high') return 'bg-red-100 text-red-800';
    if (riskLevel === 'medium') return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const selectedStateData = selectedState ? nigerianStates.find(s => s.id === selectedState) : null;
  const totalPopulationAtRisk = nigerianStates.reduce((acc, state) => {
    if (state.riskLevel === 'high') return acc + state.population;
    if (state.riskLevel === 'medium') return acc + Math.floor(state.population * 0.3);
    return acc;
  }, 0);

  const handleStateClick = (state: typeof nigerianStates[0]) => {
    setSelectedState(state.id);
    onStateSelect?.(state);
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <div>
              <p className="text-sm text-gray-600">High Risk States</p>
              <p className="text-2xl text-red-600">{nigerianStates.filter(s => s.riskLevel === 'high').length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Population at Risk</p>
              <p className="text-2xl text-blue-600">{(totalPopulationAtRisk / 1000000).toFixed(1)}M</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-orange-600" />
            <div>
              <p className="text-sm text-gray-600">Active Alerts</p>
              <p className="text-2xl text-orange-600">{nigerianStates.reduce((acc, s) => acc + s.alerts, 0)}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">States Monitored</p>
              <p className="text-2xl text-green-600">{nigerianStates.length}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Nigeria Map Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Nigeria Flood Risk Map
              </CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant={viewMode === 'map' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('map')}
                >
                  Map View
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  List View
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {viewMode === 'map' ? (
              <div className="relative">
                {/* Map Controls */}
                <div className="absolute top-4 left-4 z-20 bg-white rounded-lg shadow-lg p-3 border space-y-2">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={showRiskOverlay ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setShowRiskOverlay(!showRiskOverlay)}
                      className="text-xs px-2 py-1"
                    >
                      {showRiskOverlay ? <Eye className="h-3 w-3 mr-1" /> : <EyeOff className="h-3 w-3 mr-1" />}
                      Risk Overlay
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={showAlerts ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setShowAlerts(!showAlerts)}
                      className="text-xs px-2 py-1"
                    >
                      {showAlerts ? <Eye className="h-3 w-3 mr-1" /> : <EyeOff className="h-3 w-3 mr-1" />}
                      Active Alerts
                    </Button>
                  </div>
                </div>

                {/* Nigeria Map with Risk Overlay */}
                <div className="bg-gray-50 rounded-lg overflow-hidden min-h-[500px] relative">
                  {/* Base Map Image */}
                  <div className="relative w-full h-[500px]">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1753045871205-4f8f0aa3fdf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdlcmlhJTIwbWFwJTIwb3V0bGluZSUyMGFmcmljYXxlbnwxfHx8fDE3NTg2NjI4NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Nigeria Map"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    
                    {/* Risk Overlay SVG */}
                    <svg 
                      viewBox="0 0 600 400" 
                      className="absolute inset-0 w-full h-full"
                      style={{ zIndex: 10 }}
                    >
                      {/* Title and Branding */}
                      <defs>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                          <feMerge> 
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                        <pattern id="waves" patternUnits="userSpaceOnUse" width="40" height="40">
                          <path d="M0 20 Q 10 10 20 20 T 40 20" stroke="#3b82f6" strokeWidth="1" fill="none" opacity="0.3"/>
                        </pattern>
                      </defs>
                      
                      <text x="300" y="30" textAnchor="middle" className="text-lg font-bold fill-gray-800">
                        FloodGuard AI - Nigeria Risk Assessment
                      </text>
                      <text x="300" y="45" textAnchor="middle" className="text-sm fill-gray-600">
                        Real-time flood monitoring by Flood Guard Innovators
                      </text>

                      {/* State Risk Indicators */}
                      {showRiskOverlay && nigerianStates.map((state) => {
                        const color = getRiskColor(state.riskLevel, state.currentRisk);
                        const opacity = getRiskOpacity(state.riskLevel, state.currentRisk);
                        const isSelected = selectedState === state.id;
                        const radius = state.riskLevel === 'high' ? 25 : state.riskLevel === 'medium' ? 20 : 15;
                        
                        return (
                          <g key={state.id}>
                            {/* Pulsing risk indicator */}
                            <circle
                              cx={state.x}
                              cy={state.y}
                              r={radius + 5}
                              fill={color}
                              opacity={0.2}
                              className={state.riskLevel === 'high' ? 'animate-pulse' : ''}
                            />
                            <circle
                              cx={state.x}
                              cy={state.y}
                              r={radius}
                              fill={color}
                              opacity={opacity}
                              stroke={isSelected ? '#1f2937' : 'white'}
                              strokeWidth={isSelected ? 3 : 2}
                              className="cursor-pointer transition-all duration-300 hover:brightness-110"
                              onClick={() => handleStateClick(state)}
                              filter={state.riskLevel === 'high' ? 'url(#glow)' : ''}
                            />
                            
                            {/* State Name */}
                            <text
                              x={state.x}
                              y={state.y - radius - 10}
                              textAnchor="middle"
                              className="text-xs font-medium fill-gray-800 pointer-events-none"
                              style={{ fontSize: '10px' }}
                            >
                              {state.name}
                            </text>
                            
                            {/* Risk Percentage */}
                            <text
                              x={state.x}
                              y={state.y + 4}
                              textAnchor="middle"
                              className="text-xs font-bold fill-white pointer-events-none"
                              style={{ fontSize: '11px' }}
                            >
                              {state.currentRisk}%
                            </text>
                            
                            {/* Population indicator for high risk areas */}
                            {state.riskLevel === 'high' && (
                              <text
                                x={state.x}
                                y={state.y + radius + 15}
                                textAnchor="middle"
                                className="text-xs fill-red-700 pointer-events-none"
                                style={{ fontSize: '9px' }}
                              >
                                {(state.population / 1000000).toFixed(1)}M people
                              </text>
                            )}
                          </g>
                        );
                      })}

                      {/* Major Water Bodies Pattern */}
                      <rect x="100" y="150" width="200" height="8" fill="url(#waves)" opacity="0.6"/>
                      <text x="200" y="145" textAnchor="middle" className="text-xs fill-blue-600" style={{ fontSize: '9px' }}>Niger River</text>
                      
                      <rect x="350" y="250" width="150" height="6" fill="url(#waves)" opacity="0.6"/>
                      <text x="425" y="245" textAnchor="middle" className="text-xs fill-blue-600" style={{ fontSize: '9px' }}>Benue River</text>

                      {/* Active Alert Indicators */}
                      {showAlerts && nigerianStates.filter(state => state.alerts > 0).map((state, index) => {
                        return (
                          <g key={`alert-${state.id}`}>
                            <circle
                              cx={state.x + 20}
                              cy={state.y - 20}
                              r="12"
                              fill="#dc2626"
                              className="animate-pulse"
                            />
                            <path
                              d={`M${state.x + 20} ${state.y - 26} L${state.x + 26} ${state.y - 14} L${state.x + 14} ${state.y - 14} Z`}
                              fill="white"
                            />
                            <circle
                              cx={state.x + 20}
                              cy={state.y - 18}
                              r="1"
                              fill="#dc2626"
                            />
                            <rect
                              x={state.x + 19.5}
                              y={state.y - 22}
                              width="1"
                              height="3"
                              fill="#dc2626"
                            />
                            <text
                              x={state.x + 20}
                              y={state.y - 35}
                              textAnchor="middle"
                              className="text-xs fill-red-600 font-bold"
                              style={{ fontSize: '9px' }}
                            >
                              {state.alerts} Alert{state.alerts > 1 ? 's' : ''}
                            </text>
                          </g>
                        );
                      })}

                      {/* Flood Direction Arrows for High Risk Areas */}
                      {nigerianStates.filter(s => s.riskLevel === 'high').map((state, index) => (
                        <g key={`arrow-${state.id}`}>
                          <defs>
                            <marker id={`arrowhead-${index}`} markerWidth="10" markerHeight="7" 
                             refX="9" refY="3.5" orient="auto">
                              <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" opacity="0.7" />
                            </marker>
                          </defs>
                          <path 
                            d={`M${state.x - 30} ${state.y + 30} Q${state.x} ${state.y + 40} ${state.x + 30} ${state.y + 30}`}
                            stroke="#3b82f6" 
                            strokeWidth="2" 
                            fill="none" 
                            opacity="0.7"
                            markerEnd={`url(#arrowhead-${index})`}
                            className="animate-pulse"
                          />
                        </g>
                      ))}
                    </svg>
                  </div>
                  
                  {/* Enhanced Legend */}
                  <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 border max-w-xs">
                    <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                      <Waves className="h-4 w-4 mr-2 text-blue-600" />
                      Flood Risk Levels
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                          <span className="text-xs text-gray-700">Critical Risk (≥70%)</span>
                        </div>
                        <span className="text-xs text-red-600 font-medium">
                          {nigerianStates.filter(s => s.riskLevel === 'high').length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                          <span className="text-xs text-gray-700">Moderate Risk (40-69%)</span>
                        </div>
                        <span className="text-xs text-yellow-600 font-medium">
                          {nigerianStates.filter(s => s.riskLevel === 'medium').length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-gray-700">Low Risk (&lt;40%)</span>
                        </div>
                        <span className="text-xs text-green-600 font-medium">
                          {nigerianStates.filter(s => s.riskLevel === 'low').length}
                        </span>
                      </div>
                      <div className="border-t pt-2 mt-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse"></div>
                            <span className="text-xs text-gray-700">Active Alerts</span>
                          </div>
                          <span className="text-xs text-red-600 font-medium">
                            {nigerianStates.reduce((acc, s) => acc + s.alerts, 0)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t">
                      <p className="text-xs text-gray-500">
                        <strong>Flood Guard Innovators</strong> - AI-powered flood prediction system
                      </p>
                    </div>
                  </div>
                  
                  {/* Selected State Info */}
                  {selectedStateData && (
                    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 border max-w-xs">
                      <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {selectedStateData.name} State
                      </h4>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Risk Level:</span>
                          <Badge className={getRiskBadgeColor(selectedStateData.riskLevel)}>
                            {selectedStateData.currentRisk}%
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Population:</span>
                          <span className="font-medium">{(selectedStateData.population / 1000000).toFixed(1)}M</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Active Alerts:</span>
                          <span className={`font-medium ${selectedStateData.alerts > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {selectedStateData.alerts}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="h-2 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${selectedStateData.currentRisk}%`,
                              backgroundColor: getRiskColor(selectedStateData.riskLevel, selectedStateData.currentRisk)
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {nigerianStates
                  .sort((a, b) => b.currentRisk - a.currentRisk)
                  .map((state) => (
                  <div
                    key={state.id}
                    onClick={() => handleStateClick(state)}
                    className={`
                      p-4 rounded-lg border cursor-pointer transition-all duration-200
                      ${selectedState === state.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: getRiskColor(state.riskLevel, state.currentRisk) }}
                        ></div>
                        <div>
                          <h4 className="text-sm text-gray-900">{state.name} State</h4>
                          <p className="text-xs text-gray-600">{(state.population / 1000000).toFixed(1)}M population</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getRiskBadgeColor(state.riskLevel)}>
                          {state.currentRisk}% Risk
                        </Badge>
                        {state.alerts > 0 && (
                          <p className="text-xs text-red-600 mt-1 flex items-center">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            {state.alerts} active alerts
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Selected State Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              {selectedStateData ? `${selectedStateData.name} State Details` : 'Select a State'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedStateData ? (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm text-gray-600">Current Risk Level</h4>
                    <Badge className={getRiskBadgeColor(selectedStateData.riskLevel)}>
                      {selectedStateData.riskLevel.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${selectedStateData.currentRisk}%`,
                        backgroundColor: getRiskColor(selectedStateData.riskLevel, selectedStateData.currentRisk)
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{selectedStateData.currentRisk}% flood probability</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                    <p className="text-lg text-blue-600">{(selectedStateData.population / 1000000).toFixed(1)}M</p>
                    <p className="text-xs text-gray-600">Population</p>
                  </div>
                  
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-orange-600 mx-auto mb-1" />
                    <p className="text-lg text-orange-600">{selectedStateData.alerts}</p>
                    <p className="text-xs text-gray-600">Active Alerts</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm text-gray-900 flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Key Areas at Risk:
                  </h4>
                  {selectedStateData.id === 'niger' && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Bosso Ward</span>
                        <Badge className="bg-red-100 text-red-800">High Risk</Badge>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Tunga Ward</span>
                        <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Chanchaga Ward</span>
                        <Badge className="bg-red-100 text-red-800">High Risk</Badge>
                      </div>
                    </div>
                  )}
                  {selectedStateData.id === 'rivers' && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Port Harcourt LGA</span>
                        <Badge className="bg-red-100 text-red-800">High Risk</Badge>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Obio-Akpor LGA</span>
                        <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>
                      </div>
                    </div>
                  )}
                  {selectedStateData.id === 'lagos' && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Victoria Island</span>
                        <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Lekki Peninsula</span>
                        <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>
                      </div>
                    </div>
                  )}
                  {!['niger', 'rivers', 'lagos'].includes(selectedStateData.id) && (
                    <p className="text-xs text-gray-500 italic">Detailed ward data will be available soon</p>
                  )}
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Last updated: 2 minutes ago</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-600 mt-1">
                    <Waves className="h-4 w-4" />
                    <span>Powered by FloodGuard AI</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p>Click on a state to view detailed information</p>
                <p className="text-xs mt-2">Real-time data from Flood Guard Innovators</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}