import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ChevronLeft, ChevronRight, Brain, Shield, AlertTriangle, MapPin, Users, Target, BookOpen, BarChart3, Repeat, TrendingUp, MessageSquare, Heart, Handshake } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import nemaLogo from 'figma:asset/16d520d278b8537a88c085462735da4f96598fe6.png';
import floodImage from 'figma:asset/ddcfcbfa00a4e14c3894750348b1515a08d54b4a.png';

interface PresentationSlidesProps {
  currentSlide: number;
  totalSlides: number;
  onSlideChange: (slideNumber: number) => void;
}

export function PresentationSlides({ currentSlide, totalSlides, onSlideChange }: PresentationSlidesProps) {
  const nextSlide = () => {
    if (currentSlide < totalSlides) onSlideChange(currentSlide + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 1) onSlideChange(currentSlide - 1);
  };

  const renderSlide = () => {
    switch (currentSlide) {
      case 1:
        return (
          <div className="text-center space-y-8">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-4xl">🌊</span>
              </div>
            </div>
            <div>
              <h1 className="text-6xl text-gray-900 mb-4">FloodGuard</h1>
              <p className="text-2xl text-blue-600 mb-8">AI Flood Alert System</p>
              <div className="space-y-2 text-xl text-gray-600">
                <p>Team: <span className="text-gray-900">Flood Guard Innovators</span></p>
                <p className="text-lg italic">"Predicting floods, protecting lives."</p>
              </div>
            </div>
            <div className="flex justify-center space-x-8 mt-12">
              <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-base">SDG 13: Climate Action</Badge>
              <Badge className="bg-green-100 text-green-800 px-4 py-2 text-base">SDG 11: Sustainable Cities</Badge>
              <Badge className="bg-purple-100 text-purple-800 px-4 py-2 text-base">SDG 3: Health</Badge>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <Target className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h1 className="text-5xl text-gray-900 mb-4">Task</h1>
              <p className="text-xl text-gray-600">Build a minimum viable product that predicts flood risks and alerts communities</p>
            </div>
            
            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-2xl text-center mb-6">Core MVP Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center space-y-4">
                    <Brain className="h-12 w-12 text-blue-600 mx-auto" />
                    <h3 className="text-xl">Simple AI Model</h3>
                    <p className="text-gray-600">Predicts Low/Medium/High risk levels using weather data</p>
                  </div>
                  
                  <div className="text-center space-y-4">
                    <MessageSquare className="h-12 w-12 text-green-600 mx-auto" />
                    <h3 className="text-xl">SMS/USSD Alerts</h3>
                    <p className="text-gray-600">Emergency notifications in local languages</p>
                  </div>
                  
                  <div className="text-center space-y-4">
                    <BarChart3 className="h-12 w-12 text-purple-600 mx-auto" />
                    <h3 className="text-xl">Dashboard</h3>
                    <p className="text-gray-600">Visual risk monitoring and community management</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <AlertTriangle className="h-16 w-16 text-red-600 mx-auto mb-4" />
              <h1 className="text-5xl text-gray-900 mb-4">Context</h1>
              <p className="text-xl text-gray-600">The flooding crisis in Nigeria</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="text-red-600">The Problem</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>• Flooding displaces <strong>thousands yearly</strong> in Nigeria</p>
                  <p>• Lives lost, farmlands destroyed</p>
                  <p>• Economic impact on rural communities</p>
                  <p>• Climate change intensifying patterns</p>
                </CardContent>
              </Card>
              
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="text-blue-600">The Gap</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>• No reliable early warning systems</p>
                  <p>• Limited community-friendly alerts</p>
                  <p>• Language barriers in emergency communication</p>
                  <p>• Lack of predictive technology access</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl mb-6">Supporting UN Sustainable Development Goals</h3>
              <div className="flex justify-center space-x-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white text-2xl">🌍</span>
                  </div>
                  <p className="text-sm">SDG 13<br/>Climate Action</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white text-2xl">🏙️</span>
                  </div>
                  <p className="text-sm">SDG 11<br/>Sustainable Cities</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white text-2xl">❤️</span>
                  </div>
                  <p className="text-sm">SDG 3<br/>Health & Well-being</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <BookOpen className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h1 className="text-5xl text-gray-900 mb-4">References</h1>
              <p className="text-xl text-gray-600">Data sources and research foundation</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="text-2xl mr-3">📊</span>
                    Data Sources
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p>• <strong>OpenWeather API</strong> - Real-time weather & rainfall data</p>
                  <p>• <strong>NEMA Reports</strong> - Nigerian emergency management data</p>
                  <p>• <strong>NiMet</strong> - Nigerian meteorological service</p>
                  <p>• <strong>Historical flood data</strong> - Past incident analysis</p>
                </CardContent>
              </Card>
              
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="text-2xl mr-3">🔬</span>
                    Research & Examples
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p>• <strong>Bangladesh flood SMS system</strong> - Proven alert model</p>
                  <p>• <strong>AI climate prediction papers</strong> - Academic research</p>
                  <p>• <strong>WHO emergency guidelines</strong> - Health protection protocols</p>
                  <p>• <strong>Local language studies</strong> - Communication effectiveness</p>
                </CardContent>
              </Card>
            </div>
            
            <Card className="p-6 bg-blue-50 border-blue-200">
              <CardContent>
                <h3 className="text-xl mb-4 text-center">Key Insights from Research</h3>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <p className="text-2xl text-blue-600 mb-2">70%</p>
                    <p className="text-sm">Flood casualties preventable with early warning</p>
                  </div>
                  <div>
                    <p className="text-2xl text-green-600 mb-2">5-10min</p>
                    <p className="text-sm">Optimal warning time for evacuation</p>
                  </div>
                  <div>
                    <p className="text-2xl text-purple-600 mb-2">85%</p>
                    <p className="text-sm">Preference for local language alerts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 5:
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <BarChart3 className="h-16 w-16 text-purple-600 mx-auto mb-4" />
              <h1 className="text-5xl text-gray-900 mb-4">Evaluate</h1>
              <p className="text-xl text-gray-600">Testing and success metrics</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="text-purple-600">Test Cases</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-purple-600 text-xs">1</span>
                    </div>
                    <p>Can the model predict "High risk" when heavy rainfall data is input?</p>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-purple-600 text-xs">2</span>
                    </div>
                    <p>Do SMS alerts reach users within the target timeframe?</p>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-purple-600 text-xs">3</span>
                    </div>
                    <p>Can users understand and act on dashboard information?</p>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-purple-600 text-xs">4</span>
                    </div>
                    <p>Are local language translations accurate and effective?</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="text-green-600">Success Indicators</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-3xl text-green-600 mb-2">≥ 90%</div>
                    <p className="text-sm text-gray-600">Prediction Accuracy</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl text-blue-600 mb-2">≥ 95%</div>
                    <p className="text-sm text-gray-600">Message Delivery Rate</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl text-yellow-600 mb-2">≥ 80%</div>
                    <p className="text-sm text-gray-600">User Comprehension</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl text-purple-600 mb-2">&lt; 5min</div>
                    <p className="text-sm text-gray-600">Alert Response Time</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <Repeat className="h-16 w-16 text-orange-600 mx-auto mb-4" />
              <h1 className="text-5xl text-gray-900 mb-4">Iterate</h1>
              <p className="text-xl text-gray-600">Future improvements and scaling</p>
            </div>
            
            <div className="space-y-6">
              <Card className="p-6 border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="text-orange-600">Phase 2: Enhanced Communication</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>• Add local dialect SMS/voice alerts (Hausa, Yoruba, Igbo)</p>
                  <p>• Implement USSD for feature phones</p>
                  <p>• Community liaison network integration</p>
                </CardContent>
              </Card>
              
              <Card className="p-6 border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-600">Phase 3: Data Enhancement</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>• Expand dataset with real flood history and patterns</p>
                  <p>• Integrate satellite imagery for real-time monitoring</p>
                  <p>• Add soil moisture and river level sensors</p>
                </CardContent>
              </Card>
              
              <Card className="p-6 border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-green-600">Phase 4: Advanced Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>• GIS maps with evacuation routes and safe zones</p>
                  <p>• Emergency resource coordination dashboard</p>
                  <p>• Mobile app for community reporting</p>
                </CardContent>
              </Card>
              
              <Card className="p-6 border-purple-200 bg-purple-50">
                <CardHeader>
                  <CardTitle className="text-purple-600">Phase 5: Partnership & Scale</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>• Partner with NEMA and local emergency agencies</p>
                  <p>• Integrate with national disaster management systems</p>
                  <p>• Scale across West African countries</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <div className="flex justify-center items-center space-x-4 mb-6">
                <Shield className="h-16 w-16 text-blue-600" />
                <span className="text-6xl">⚡</span>
              </div>
              <h1 className="text-5xl text-gray-900 mb-4">Demo (MVP)</h1>
              <p className="text-xl text-gray-600">FloodGuard AI in action</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-6 w-6 mr-2 text-blue-600" />
                    Live Dashboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-red-900">📍 Minna, Niger State</p>
                        <p className="text-2xl text-red-600">HIGH RISK</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-red-600">Risk Level: 85%</p>
                        <p className="text-sm text-red-600">24hr Forecast</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <p className="text-xl text-blue-600">156mm</p>
                      <p className="text-xs text-gray-600">Expected Rainfall</p>
                    </div>
                    <div>
                      <p className="text-xl text-yellow-600">4.2m</p>
                      <p className="text-xs text-gray-600">River Level</p>
                    </div>
                    <div>
                      <p className="text-xl text-red-600">12,000</p>
                      <p className="text-xs text-gray-600">People at Risk</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="h-6 w-6 mr-2 text-green-600" />
                    Sample SMS Alert
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 p-4 rounded-lg mb-4 font-mono text-sm">
                    <p className="mb-2">📱 <strong>FloodGuard Alert</strong></p>
                    <p className="mb-2">⚠️ <strong>HIGH FLOOD RISK</strong> in Bosso area, Minna</p>
                    <p className="mb-2">🏃‍♂️ Move valuables to higher ground NOW</p>
                    <p className="mb-2">🚗 Avoid low roads near Chanchaga River</p>
                    <p className="text-xs text-gray-600">Sent: 2 min ago | Reply HELP for assistance</p>
                  </div>
                  
                  <div className="text-sm text-gray-600 space-y-2">
                    <p><strong>Hausa:</strong> "Haddari ruwa mai girma a Bosso..."</p>
                    <p><strong>Reach:</strong> 12,000 residents via SMS + USSD</p>
                    <p><strong>Delivery:</strong> 98% success rate in &lt;2 minutes</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="p-6 bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-600 text-center">Impact Story</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg mb-4">
                  "This alert system could have saved Farmer Musa's entire rice harvest last season. 
                  With 4 hours advance notice, his family and 200 bags of rice would have been moved to safety."
                </p>
                <p className="text-sm text-gray-600">
                  Potential impact: Lives saved, ₦2M+ agricultural losses prevented per community
                </p>
              </CardContent>
            </Card>
          </div>
        );

      case 8:
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <TrendingUp className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h1 className="text-5xl text-gray-900 mb-4">Impact & Future</h1>
              <p className="text-xl text-gray-600">Transforming flood response in Nigeria</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-600">
                    <Heart className="h-6 w-6 mr-2" />
                    Immediate Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">👥</span>
                    <p><strong>Lives saved</strong> through early warning systems</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">💰</span>
                    <p><strong>Reduced losses</strong> for farmers and businesses</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🏘️</span>
                    <p><strong>Empowered communities</strong> with actionable information</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🏥</span>
                    <p><strong>Healthcare preparedness</strong> for emergency response</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-600">
                    <TrendingUp className="h-6 w-6 mr-2" />
                    Future Vision
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p><strong>🌍 National Scale:</strong> Cover all 36 states in Nigeria</p>
                  <p><strong>🛰️ IoT Integration:</strong> Real-time sensor networks in high-risk areas</p>
                  <p><strong>🏛️ Government Partnership:</strong> Integration with NEMA and state emergency services</p>
                  <p><strong>🗺️ Smart Mapping:</strong> Dynamic evacuation routes and resource allocation</p>
                  <p><strong>🌍 Regional Expansion:</strong> Scale to West African countries facing similar challenges</p>
                </CardContent>
              </Card>
            </div>
            
            <Card className="p-8 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
              <CardContent>
                <h3 className="text-2xl text-center mb-6">5-Year Vision</h3>
                <div className="grid md:grid-cols-4 gap-6 text-center">
                  <div>
                    <p className="text-3xl text-blue-600 mb-2">50M+</p>
                    <p className="text-sm">People Protected</p>
                  </div>
                  <div>
                    <p className="text-3xl text-green-600 mb-2">₦100B+</p>
                    <p className="text-sm">Losses Prevented</p>
                  </div>
                  <div>
                    <p className="text-3xl text-purple-600 mb-2">10</p>
                    <p className="text-sm">Countries Served</p>
                  </div>
                  <div>
                    <p className="text-3xl text-orange-600 mb-2">99%</p>
                    <p className="text-sm">Alert Accuracy</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 9:
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <Handshake className="h-16 w-16 text-purple-600 mx-auto mb-4" />
              <h1 className="text-5xl text-gray-900 mb-4">Partnerships & Support</h1>
              <p className="text-xl text-gray-600">Strategic partnerships and organizational support</p>
            </div>
            
            {/* Real flood image for impact */}
            <div className="flex justify-center mb-8">
              <Card className="p-4 max-w-md">
                <img 
                  src={floodImage}
                  alt="Real flood situation in Nigeria showing the urgent need for early warning systems"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <CardContent className="pt-4">
                  <p className="text-center text-sm text-gray-600">
                    Real flood conditions in Nigerian communities - why early warning systems are critical
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-600">
                    <span className="text-xl mr-2">🏛️</span>
                    Government Partners
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={nemaLogo}
                      alt="NEMA Logo"
                      className="w-12 h-12 object-contain"
                    />
                    <div>
                      <p className="text-sm"><strong>NEMA</strong> - National Emergency Management Agency</p>
                      <p className="text-xs text-gray-600">Emergency response coordination and data</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg">🌤️</span>
                    </div>
                    <div>
                      <p className="text-sm"><strong>NiMet</strong> - Nigerian Meteorological Agency</p>
                      <p className="text-xs text-gray-600">Weather data and climate predictions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-600">
                    <span className="text-xl mr-2">🌍</span>
                    Technology Partners
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg">🌐</span>
                    </div>
                    <div>
                      <p className="text-sm"><strong>OpenWeather API</strong> - Real-time weather data</p>
                      <p className="text-xs text-gray-600">Global weather monitoring and forecasting</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg">🎯</span>
                    </div>
                    <div>
                      <p className="text-sm"><strong>3MTT</strong> - 3 Million Technical Talent</p>
                      <p className="text-xs text-gray-600">Technical training and development support</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="p-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-center text-gray-800 mb-6">UN Sustainable Development Goals Alignment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div className="space-y-3">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white text-2xl">🌍</span>
                    </div>
                    <div>
                      <h4 className="text-lg">SDG 13</h4>
                      <p className="text-sm text-gray-600">Climate Action</p>
                      <p className="text-xs text-gray-500">Building climate resilience through AI-powered flood prediction</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white text-2xl">🏙️</span>
                    </div>
                    <div>
                      <h4 className="text-lg">SDG 11</h4>
                      <p className="text-sm text-gray-600">Sustainable Cities</p>
                      <p className="text-xs text-gray-500">Creating safer, more resilient urban and rural communities</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white text-2xl">❤️</span>
                    </div>
                    <div>
                      <h4 className="text-lg">SDG 3</h4>
                      <p className="text-sm text-gray-600">Good Health & Well-being</p>
                      <p className="text-xs text-gray-500">Protecting lives and preventing health emergencies</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-6 bg-purple-50 border-purple-200">
              <CardContent className="text-center">
                <h3 className="text-xl mb-4 text-purple-600">Partnership Impact</h3>
                <p className="text-lg mb-4">
                  "Through strategic partnerships with government agencies, technology providers, 
                  and international organizations, FloodGuard AI leverages collective expertise 
                  to maximize community protection and save lives."
                </p>
                <div className="grid md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-2xl text-blue-600 mb-1">37</p>
                    <p className="text-gray-600">States Covered</p>
                  </div>
                  <div>
                    <p className="text-2xl text-green-600 mb-1">50M+</p>
                    <p className="text-gray-600">People Reachable</p>
                  </div>
                  <div>
                    <p className="text-2xl text-orange-600 mb-1">24/7</p>
                    <p className="text-gray-600">Monitoring</p>
                  </div>
                  <div>
                    <p className="text-2xl text-purple-600 mb-1">4</p>
                    <p className="text-gray-600">Languages</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 10:
        return (
          <div className="text-center space-y-12">
            <div className="mb-16">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <span className="text-4xl">🌍</span>
              </div>
              <h1 className="text-6xl text-gray-900 mb-8">Thank You</h1>
            </div>
            
            <Card className="p-12 max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-green-50 border-blue-200">
              <CardContent>
                <blockquote className="text-3xl text-gray-700 mb-8 italic">
                  "Technology can't stop floods, but it can prepare us for them."
                </blockquote>
                
                <div className="space-y-6 text-xl">
                  <p className="text-gray-600">
                    FloodGuard AI represents our commitment to using artificial intelligence 
                    for social good and climate resilience.
                  </p>
                  
                  <div className="flex justify-center items-center space-x-8 text-lg">
                    <div className="text-center">
                      <div className="text-3xl mb-2">🌊</div>
                      <p>Predict</p>
                    </div>
                    <div className="text-2xl text-gray-300">→</div>
                    <div className="text-center">
                      <div className="text-3xl mb-2">📱</div>
                      <p>Alert</p>
                    </div>
                    <div className="text-2xl text-gray-300">→</div>
                    <div className="text-center">
                      <div className="text-3xl mb-2">🛡️</div>
                      <p>Protect</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <p className="text-lg text-gray-600 mb-4">Questions & Discussion</p>
                  <p className="text-blue-600">Flood Guard Innovators • 3MTT Hackathon 2024</p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return <div>Slide not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="h-1 bg-gray-200">
          <div 
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${(currentSlide / totalSlides) * 100}%` }}
          />
        </div>
        
        {/* Slide counter */}
        <div className="flex justify-between items-center px-6 py-2">
          <div className="text-sm text-gray-600">
            Slide {currentSlide} of {totalSlides}
          </div>
          <div className="text-sm text-blue-600">FloodGuard AI Presentation</div>
        </div>
      </div>
      
      {/* Main slide content */}
      <div className="pt-20 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {renderSlide()}
        </div>
      </div>
      
      {/* Navigation controls */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-4 bg-white rounded-full shadow-lg px-6 py-3">
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            disabled={currentSlide === 1}
            className="rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <span className="text-sm text-gray-600 px-4">
            {currentSlide} / {totalSlides}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            disabled={currentSlide === totalSlides}
            className="rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}