import { useState } from "react";
import { Button } from "./ui/button";
import { Bell, Menu, Settings, HelpCircle, Phone } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";
import { AuthDialog } from "./AuthDialog";
import { UserDropdown } from "./UserDropdown";
import { useAuth } from "./AuthContext";

export function Header() {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authDialogTab, setAuthDialogTab] = useState<'login' | 'signup'>('login');
  const { user, isAuthenticated, login } = useAuth();

  const handleAuthSuccess = (userData: { email: string; name: string; role: string }) => {
    login(userData);
    setAuthDialogOpen(false);
  };

  const openLoginDialog = () => {
    setAuthDialogTab('login');
    setAuthDialogOpen(true);
  };

  const openSignupDialog = () => {
    setAuthDialogTab('signup');
    setAuthDialogOpen(true);
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white">🌊</span>
                </div>
                <h1 className="text-xl text-gray-900">FloodGuard AI</h1>
              </div>
            </div>
            
            <nav className="hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100">Dashboard</a>
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100">Alerts</a>
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100">Predictions</a>
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100">Reports</a>
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100 flex items-center">
                  <HelpCircle className="h-4 w-4 mr-1" />
                  How It Works
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100 flex items-center">
                  <Phone className="h-4 w-4 mr-1" />
                  Contact
                </a>
              </div>
            </nav>

            <div className="flex items-center space-x-3">
              {/* Language Toggle */}
              <LanguageToggle />
              
              {/* Authentication Buttons or User Menu */}
              {!isAuthenticated ? (
                <>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="hidden sm:flex border-2 border-gray-300 hover:border-gray-400"
                    onClick={openLoginDialog}
                  >
                    Log In
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-purple-600 hover:bg-purple-700 text-white border-2 border-purple-600 hidden sm:flex"
                    onClick={openSignupDialog}
                  >
                    Sign Up
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm">
                    <Bell className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <UserDropdown />
                </>
              )}
              
              <Button variant="outline" size="sm" className="lg:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <AuthDialog 
        isOpen={authDialogOpen}
        onClose={() => setAuthDialogOpen(false)}
        initialTab={authDialogTab}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
}