import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useAuth } from "./AuthContext";
import { 
  User, 
  Settings, 
  LogOut, 
  Shield, 
  MapPin, 
  Bell, 
  ChevronDown,
  Crown,
  Users,
  Building
} from "lucide-react";

export function UserDropdown() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case 'administrator':
      case 'admin':
        return <Crown className="h-3 w-3" />;
      case 'emergency-responder':
        return <Shield className="h-3 w-3" />;
      case 'community-leader':
        return <Users className="h-3 w-3" />;
      case 'government-official':
        return <Building className="h-3 w-3" />;
      default:
        return <User className="h-3 w-3" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'administrator':
      case 'admin':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'emergency-responder':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'community-leader':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'government-official':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 pr-2"
      >
        <Avatar className="h-6 w-6">
          <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
        <span className="hidden sm:inline text-sm max-w-[100px] truncate">
          {user.name}
        </span>
        <ChevronDown className="h-3 w-3" />
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <Card className="absolute top-full mt-2 right-0 z-50 min-w-[280px] shadow-lg">
            <CardContent className="p-4">
              {/* User Info */}
              <div className="flex items-start space-x-3 pb-4 border-b">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.email}
                  </p>
                  {user.phone && (
                    <p className="text-xs text-gray-500 truncate">
                      {user.phone}
                    </p>
                  )}
                  <div className="flex items-center space-x-1 mt-2">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getRoleBadgeColor(user.role)}`}
                    >
                      <span className="mr-1">{getRoleIcon(user.role)}</span>
                      {user.role.replace('-', ' ')}
                    </Badge>
                  </div>
                  {user.organization && (
                    <p className="text-xs text-gray-500 mt-1 truncate">
                      {user.organization}
                    </p>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="py-3 border-b">
                <p className="text-xs text-gray-500 mb-2">Account Status</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center space-x-1">
                    <Shield className="h-3 w-3 text-green-600" />
                    <span className="text-green-600">Active</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Bell className="h-3 w-3 text-blue-600" />
                    <span className="text-gray-600">Alerts On</span>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="pt-3 space-y-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-sm h-8"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile Settings
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-sm h-8"
                  onClick={() => setIsOpen(false)}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  My Locations
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-sm h-8"
                  onClick={() => setIsOpen(false)}
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Notification Settings
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-sm h-8"
                  onClick={() => setIsOpen(false)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Preferences
                </Button>
                
                <div className="pt-2 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-sm h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}