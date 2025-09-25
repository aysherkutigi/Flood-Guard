import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "sonner@2.0.3";
import { 
  User, Settings, Bell, Shield, Key, Globe, 
  Phone, Mail, MapPin, Camera, Save,
  Smartphone, Monitor, Volume2, VolumeX
} from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  role: string;
  organization: string;
  location: string;
  bio: string;
  avatar: string;
  timezone: string;
  language: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  soundEnabled: boolean;
  floodAlerts: boolean;
  systemUpdates: boolean;
  communityMessages: boolean;
  emergencyOnly: boolean;
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

interface SecuritySettings {
  twoFactorEnabled: boolean;
  sessionTimeout: number;
  ipWhitelist: string[];
  apiKeyRotation: boolean;
  auditLogging: boolean;
}

export function UserSettings() {
  const [activeTab, setActiveTab] = useState('profile');
  
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Dr. Amina Hassan',
    email: 'amina.hassan@floodguard.ng',
    phone: '+234-817-123-4567',
    role: 'Emergency Response Coordinator',
    organization: 'FloodGuard Nigeria',
    location: 'Abuja, Nigeria',
    bio: 'Emergency response specialist with 10+ years experience in disaster management and community safety. Leading FloodGuard\'s implementation across Nigerian communities.',
    avatar: '',
    timezone: 'Africa/Lagos',
    language: 'English'
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    soundEnabled: true,
    floodAlerts: true,
    systemUpdates: true,
    communityMessages: false,
    emergencyOnly: false,
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '06:00'
    }
  });

  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    sessionTimeout: 30,
    ipWhitelist: [],
    apiKeyRotation: true,
    auditLogging: true
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSaveProfile = () => {
    // In a real app, this would save to backend
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleNotificationChange = (key: keyof NotificationSettings, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast.success('Notification preferences updated');
  };

  const handleSecurityChange = (key: keyof SecuritySettings, value: any) => {
    setSecurity(prev => ({ ...prev, [key]: value }));
    toast.success('Security settings updated');
  };

  const generateApiKey = () => {
    const newKey = 'fg_' + Math.random().toString(36).substr(2, 32);
    toast.success(`New API Key generated: ${newKey}`);
  };

  const enable2FA = () => {
    setSecurity(prev => ({ ...prev, twoFactorEnabled: true }));
    toast.success('Two-factor authentication enabled');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl text-gray-900">User Settings</h2>
          <p className="text-gray-600">Manage your profile, notifications, and security preferences</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="flex items-center space-x-1">
            <Shield className="h-3 w-3" />
            <span>Verified Account</span>
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Preferences</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Profile Information
                </CardTitle>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                >
                  {isEditing ? <Save className="h-4 w-4 mr-2" /> : null}
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center space-x-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback className="text-2xl">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h3 className="text-xl">{profile.name}</h3>
                  <p className="text-gray-600">{profile.role}</p>
                  <Button variant="outline" size="sm" disabled={!isEditing}>
                    <Camera className="h-4 w-4 mr-2" />
                    Change Photo
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Personal Information */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role/Position</Label>
                  <Input
                    id="role"
                    value={profile.role}
                    onChange={(e) => setProfile(prev => ({ ...prev, role: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="organization">Organization</Label>
                  <Input
                    id="organization"
                    value={profile.organization}
                    onChange={(e) => setProfile(prev => ({ ...prev, organization: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              {/* Bio Section */}
              <div>
                <Label htmlFor="bio">Bio/Description</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                  disabled={!isEditing}
                  rows={4}
                  placeholder="Tell us about yourself and your role..."
                />
              </div>

              {/* Timezone and Language */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select 
                    value={profile.timezone} 
                    onValueChange={(value) => setProfile(prev => ({ ...prev, timezone: value }))}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Africa/Lagos">West Africa Time (WAT)</SelectItem>
                      <SelectItem value="Africa/Cairo">Central Africa Time (CAT)</SelectItem>
                      <SelectItem value="Africa/Nairobi">East Africa Time (EAT)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select 
                    value={profile.language} 
                    onValueChange={(value) => setProfile(prev => ({ ...prev, language: value }))}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Hausa">Hausa</SelectItem>
                      <SelectItem value="Yoruba">Yoruba</SelectItem>
                      <SelectItem value="Igbo">Igbo</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* General Notifications */}
              <div className="space-y-4">
                <h3 className="text-lg">General Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-gray-600">Receive notifications via email</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.emailNotifications}
                      onCheckedChange={(checked) => handleNotificationChange('emailNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="h-5 w-5 text-gray-400" />
                      <div>
                        <Label>SMS Notifications</Label>
                        <p className="text-sm text-gray-600">Receive critical alerts via SMS</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.smsNotifications}
                      onCheckedChange={(checked) => handleNotificationChange('smsNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Monitor className="h-5 w-5 text-gray-400" />
                      <div>
                        <Label>Push Notifications</Label>
                        <p className="text-sm text-gray-600">Browser push notifications</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.pushNotifications}
                      onCheckedChange={(checked) => handleNotificationChange('pushNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {notifications.soundEnabled ? 
                        <Volume2 className="h-5 w-5 text-gray-400" /> : 
                        <VolumeX className="h-5 w-5 text-gray-400" />
                      }
                      <div>
                        <Label>Sound Alerts</Label>
                        <p className="text-sm text-gray-600">Play sound for notifications</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.soundEnabled}
                      onCheckedChange={(checked) => handleNotificationChange('soundEnabled', checked)}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Alert Types */}
              <div className="space-y-4">
                <h3 className="text-lg">Alert Types</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Flood Alerts</Label>
                      <p className="text-sm text-gray-600">Critical flood warnings and updates</p>
                    </div>
                    <Switch
                      checked={notifications.floodAlerts}
                      onCheckedChange={(checked) => handleNotificationChange('floodAlerts', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>System Updates</Label>
                      <p className="text-sm text-gray-600">System maintenance and feature updates</p>
                    </div>
                    <Switch
                      checked={notifications.systemUpdates}
                      onCheckedChange={(checked) => handleNotificationChange('systemUpdates', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Community Messages</Label>
                      <p className="text-sm text-gray-600">Non-urgent community communications</p>
                    </div>
                    <Switch
                      checked={notifications.communityMessages}
                      onCheckedChange={(checked) => handleNotificationChange('communityMessages', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Emergency Only Mode</Label>
                      <p className="text-sm text-gray-600">Only receive critical emergency alerts</p>
                    </div>
                    <Switch
                      checked={notifications.emergencyOnly}
                      onCheckedChange={(checked) => handleNotificationChange('emergencyOnly', checked)}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Quiet Hours */}
              <div className="space-y-4">
                <h3 className="text-lg">Quiet Hours</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Enable Quiet Hours</Label>
                      <p className="text-sm text-gray-600">Suppress non-critical notifications during quiet hours</p>
                    </div>
                    <Switch
                      checked={notifications.quietHours.enabled}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({
                          ...prev,
                          quietHours: { ...prev.quietHours, enabled: checked }
                        }))
                      }
                    />
                  </div>

                  {notifications.quietHours.enabled && (
                    <div className="grid grid-cols-2 gap-4 ml-6">
                      <div>
                        <Label>Start Time</Label>
                        <Input
                          type="time"
                          value={notifications.quietHours.start}
                          onChange={(e) =>
                            setNotifications(prev => ({
                              ...prev,
                              quietHours: { ...prev.quietHours, start: e.target.value }
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label>End Time</Label>
                        <Input
                          type="time"
                          value={notifications.quietHours.end}
                          onChange={(e) =>
                            setNotifications(prev => ({
                              ...prev,
                              quietHours: { ...prev.quietHours, end: e.target.value }
                            }))
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Two-Factor Authentication */}
              <div className="space-y-4">
                <h3 className="text-lg">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label>2FA Status</Label>
                    <p className="text-sm text-gray-600">
                      {security.twoFactorEnabled ? 'Enabled - Your account is protected' : 'Disabled - Consider enabling for better security'}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={security.twoFactorEnabled ? "default" : "secondary"}>
                      {security.twoFactorEnabled ? "Enabled" : "Disabled"}
                    </Badge>
                    <Button 
                      variant="outline" 
                      onClick={enable2FA}
                      disabled={security.twoFactorEnabled}
                    >
                      {security.twoFactorEnabled ? "Configured" : "Enable 2FA"}
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Session Management */}
              <div className="space-y-4">
                <h3 className="text-lg">Session Management</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Session Timeout (minutes)</Label>
                    <Select 
                      value={security.sessionTimeout.toString()} 
                      onValueChange={(value) => handleSecurityChange('sessionTimeout', parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                        <SelectItem value="240">4 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button variant="outline" className="w-full">
                      View Active Sessions
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* API Key Management */}
              <div className="space-y-4">
                <h3 className="text-lg">API Key Management</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>API Key Rotation</Label>
                      <p className="text-sm text-gray-600">Automatically rotate API keys monthly</p>
                    </div>
                    <Switch
                      checked={security.apiKeyRotation}
                      onCheckedChange={(checked) => handleSecurityChange('apiKeyRotation', checked)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="text-sm">Current API Key</p>
                      <code className="text-xs text-gray-600">fg_***************************abc123</code>
                    </div>
                    <Button variant="outline" onClick={generateApiKey}>
                      <Key className="h-4 w-4 mr-2" />
                      Generate New Key
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Audit & Logging */}
              <div className="space-y-4">
                <h3 className="text-lg">Audit & Logging</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Audit Logging</Label>
                      <p className="text-sm text-gray-600">Log all account activities and API calls</p>
                    </div>
                    <Switch
                      checked={security.auditLogging}
                      onCheckedChange={(checked) => handleSecurityChange('auditLogging', checked)}
                    />
                  </div>
                  <Button variant="outline" className="w-full">
                    Download Audit Log
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                System Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Display Preferences */}
              <div className="space-y-4">
                <h3 className="text-lg">Display & Interface</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Theme</Label>
                    <Select defaultValue="light">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="auto">Auto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Dashboard Layout</Label>
                    <Select defaultValue="default">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="compact">Compact</SelectItem>
                        <SelectItem value="detailed">Detailed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Data & Privacy */}
              <div className="space-y-4">
                <h3 className="text-lg">Data & Privacy</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Analytics Collection</Label>
                      <p className="text-sm text-gray-600">Help improve FloodGuard by sharing usage analytics</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Error Reporting</Label>
                      <p className="text-sm text-gray-600">Automatically report errors to help fix issues</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Data Export */}
              <div className="space-y-4">
                <h3 className="text-lg">Data Management</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline">
                    Export My Data
                  </Button>
                  <Button variant="destructive">
                    Delete Account
                  </Button>
                </div>
                <p className="text-sm text-gray-600">
                  You can export your data or permanently delete your account. Deletion is irreversible.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}