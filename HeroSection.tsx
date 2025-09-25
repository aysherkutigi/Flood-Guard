import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { AlertTriangle, Brain, Shield, Zap } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import floodImage1 from 'figma:asset/ddcfcbfa00a4e14c3894750348b1515a08d54b4a.png';
import floodImage2 from 'figma:asset/5f5dd420facef97ee75c2063883d629cd873f7b3.png';

export function HeroSection() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Partnership Logos */}
        <div className="flex justify-center items-center space-x-8 mb-12 opacity-70">
          <div className="text-xs text-gray-500 text-center">
            <div className="text-2xl mb-1">🏛️</div>
            <div>NEMA</div>
          </div>
          <div className="text-xs text-gray-500 text-center">
            <div className="text-2xl mb-1">🌤️</div>
            <div>NiMet</div>
          </div>
          <div className="text-xs text-gray-500 text-center">
            <div className="text-2xl mb-1">🌍</div>
            <div>OpenWeather</div>
          </div>
          <div className="text-xs text-gray-500 text-center">
            <div className="text-2xl mb-1">🎯</div>
            <div>3MTT</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 p-2 rounded-lg mr-3">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">AI-Powered Protection</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl text-gray-900 mb-6">
              Advanced Flood Alert System with AI Intelligence
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Protect your community with real-time flood monitoring, AI-powered predictions, and instant emergency alerts. Our system analyzes weather patterns, water levels, and environmental data to provide accurate flood warnings.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-600">
                <Shield className="h-5 w-5 mr-2" />
                Activate Flood Alerts
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-gray-300 hover:bg-gray-50">
                Protect My Community
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl mb-1">24/7</div>
                <div className="text-sm text-gray-600">Monitoring</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">98%</div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">&lt;5min</div>
                <div className="text-sm text-gray-600">Alert Time</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <Card className="p-6 bg-white shadow-xl">
              <div className="mb-4">
                <img 
                  src={floodImage1}
                  alt="Flood affected area showing real flood conditions"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                    <span className="text-red-900">High Risk Alert - Niger State</span>
                  </div>
                  <span className="text-red-600 font-medium">Active</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center">
                    <Zap className="h-5 w-5 text-yellow-600 mr-2" />
                    <span className="text-yellow-900">AI Prediction Engine</span>
                  </div>
                  <span className="text-yellow-600 font-medium">85% Risk</span>
                </div>
                
                <div className="text-center text-sm text-gray-500 mt-4">
                  Real-time monitoring • 12,000 people protected
                </div>
              </div>
            </Card>
            
            {/* Secondary flood image */}
            <div className="absolute -bottom-6 -left-6 w-32 h-24 rounded-lg overflow-hidden shadow-lg border-4 border-white">
              <img 
                src={floodImage2}
                alt="Community flood monitoring"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}