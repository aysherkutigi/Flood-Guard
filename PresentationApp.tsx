import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { PresentationSlides } from "./PresentationSlides";
import { AlertDashboard } from "./AlertDashboard";
import { HeroSection } from "./HeroSection";
import { Header } from "./Header";
import { AuthProvider } from "./AuthContext";
import { Presentation, BarChart3, Home } from "lucide-react";

type ViewMode = 'presentation' | 'dashboard' | 'landing';

export function PresentationApp() {
  const [currentView, setCurrentView] = useState<ViewMode>('landing');
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 10;

  const handleSlideChange = (slideNumber: number) => {
    setCurrentSlide(slideNumber);
  };

  return (
    <AuthProvider>
      <PresentationAppContent 
        currentView={currentView}
        setCurrentView={setCurrentView}
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        handleSlideChange={handleSlideChange}
      />
    </AuthProvider>
  );
}

interface PresentationAppContentProps {
  currentView: ViewMode;
  setCurrentView: (view: ViewMode) => void;
  currentSlide: number;
  totalSlides: number;
  handleSlideChange: (slideNumber: number) => void;
}

function PresentationAppContent({ 
  currentView, 
  setCurrentView, 
  currentSlide, 
  totalSlides, 
  handleSlideChange 
}: PresentationAppContentProps) {
  if (currentView === 'presentation') {
    return (
      <div className="relative">
        <PresentationSlides
          currentSlide={currentSlide}
          totalSlides={totalSlides}
          onSlideChange={handleSlideChange}
        />
        
        {/* Exit presentation button */}
        <div className="fixed top-6 right-6 z-50">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentView('landing')}
            className="bg-white/90 backdrop-blur-sm"
          >
            Exit Presentation
          </Button>
        </div>
      </div>
    );
  }

  if (currentView === 'dashboard') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <AlertDashboard />
        
        {/* Back to main button */}
        <div className="fixed bottom-6 right-6">
          <Button
            onClick={() => setCurrentView('landing')}
            size="lg"
            className="rounded-full shadow-lg"
          >
            <Home className="h-5 w-5 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      
      {/* Navigation cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-gray-900 mb-4">FloodGuard AI Experience</h2>
          <p className="text-xl text-gray-600">Choose how you'd like to explore our AI-powered flood protection system</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card 
            className="p-8 cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-300"
            onClick={() => setCurrentView('presentation')}
          >
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Presentation className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Hackathon Presentation</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-600 text-lg">
                View our complete pitch deck following the Task → Context → References → Evaluate → Iterate framework
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• 10 comprehensive slides</li>
                <li>• Technical implementation details</li>
                <li>• Impact metrics and future vision</li>
                <li>• Partnership & organizational support</li>
              </ul>
              <Button className="mt-6" size="lg">
                Start Presentation
              </Button>
            </CardContent>
          </Card>
          
          <Card 
            className="p-8 cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-green-300"
            onClick={() => setCurrentView('dashboard')}
          >
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Live Demo Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-600 text-lg">
                Experience our MVP in action with real-time flood monitoring and alert systems
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Active flood alerts simulation</li>
                <li>• Risk assessment dashboard</li>
                <li>• Community impact metrics</li>
                <li>• AI prediction visualization</li>
              </ul>
              <Button variant="outline" className="mt-6" size="lg">
                View Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-16">
          <Card className="p-8 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
            <CardContent>
              <h3 className="text-2xl text-gray-900 mb-4">About This Demo</h3>
              <p className="text-lg text-gray-600 mb-6">
                FloodGuard AI is our hackathon project that demonstrates how artificial intelligence 
                can be used to predict floods and protect communities in Nigeria. This demo showcases 
                both our technical presentation and a working prototype of the system.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl text-blue-600 mb-2">🎯</div>
                  <p className="text-sm">Built for 3MTT Hackathon</p>
                </div>
                <div>
                  <div className="text-2xl text-green-600 mb-2">🌍</div>
                  <p className="text-sm">Supports UN SDGs 3, 11 & 13</p>
                </div>
                <div>
                  <div className="text-2xl text-purple-600 mb-2">🤝</div>
                  <p className="text-sm">Flood Guard Innovators</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}