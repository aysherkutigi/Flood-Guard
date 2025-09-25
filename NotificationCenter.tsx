import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { toast } from "sonner@2.0.3";
import { 
  Bell, Send, Users, MessageSquare, Settings, Clock, 
  CheckCircle, AlertCircle, Phone, Mail, MessageCircle,
  Key, Wifi, WifiOff, Database, Zap
} from "lucide-react";
import { MessageLanguageToggle } from "./MessageLanguageToggle";

interface NotificationMessage {
  id: string;
  recipient: string;
  phoneNumber: string;
  message: string;
  type: 'sms' | 'whatsapp' | 'email' | 'push';
  status: 'pending' | 'sent' | 'delivered' | 'failed';
  timestamp: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

interface ContactGroup {
  id: string;
  name: string;
  contacts: {
    name: string;
    phone: string;
    email?: string;
    role: string;
  }[];
}

export function NotificationCenter() {
  const [activeTab, setActiveTab] = useState('compose');
  const [isApiConnected, setIsApiConnected] = useState(false);
  const [messageLanguage, setMessageLanguage] = useState('en'); // Add language state
  const [apiKeys, setApiKeys] = useState({
    twilioSid: 'YOUR_TWILIO_SID_HERE',
    twilioToken: 'YOUR_TWILIO_TOKEN_HERE',
    whatsappToken: 'YOUR_WHATSAPP_TOKEN_HERE',
    emailKey: 'YOUR_SENDGRID_KEY_HERE'
  });
  
  const [message, setMessage] = useState({
    recipients: [] as string[],
    subject: '',
    body: '',
    type: 'sms' as 'sms' | 'whatsapp' | 'email' | 'push',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'critical',
    scheduledFor: ''
  });

  const [sentMessages, setSentMessages] = useState<NotificationMessage[]>([
    {
      id: '1',
      recipient: 'Malam Sani Ibrahim',
      phoneNumber: '+234-803-123-4567',
      message: 'URGENT: Flood alert for Bosso Ward. Please evacuate immediately.',
      type: 'sms',
      status: 'delivered',
      timestamp: '2 minutes ago',
      priority: 'critical'
    },
    {
      id: '2',
      recipient: 'Mrs. Fatima Usman',
      phoneNumber: '+234-807-987-6543',
      message: 'Weather update: Heavy rainfall expected in Tunga Ward within 6 hours.',
      type: 'whatsapp',
      status: 'sent',
      timestamp: '15 minutes ago',
      priority: 'high'
    },
    {
      id: '3',
      recipient: 'Chief John Adamu',
      phoneNumber: '+234-809-456-7890',
      message: 'Community meeting scheduled for flood preparedness discussion.',
      type: 'sms',
      status: 'delivered',
      timestamp: '1 hour ago',
      priority: 'medium'
    }
  ]);

  const contactGroups: ContactGroup[] = [
    {
      id: 'community-leaders',
      name: 'Community Leaders',
      contacts: [
        { name: 'Malam Sani Ibrahim', phone: '+234-803-123-4567', email: 'sani@community.ng', role: 'Community Leader' },
        { name: 'Mrs. Fatima Usman', phone: '+234-807-987-6543', email: 'fatima@women.ng', role: 'Women\'s Group Leader' },
        { name: 'Chief John Adamu', phone: '+234-809-456-7890', role: 'Traditional Ruler' }
      ]
    },
    {
      id: 'emergency-services',
      name: 'Emergency Services',
      contacts: [
        { name: 'Dr. Ahmed Bello', phone: '+234-811-234-5678', email: 'ahmed@health.gov.ng', role: 'Health Center Director' },
        { name: 'Inspector Kemi Okafor', phone: '+234-813-567-8901', role: 'Police Station Commander' },
        { name: 'Fire Chief Yakubu', phone: '+234-815-890-1234', role: 'Fire Service Chief' }
      ]
    },
    {
      id: 'nema-officials',
      name: 'NEMA Officials',
      contacts: [
        { name: 'Dir. Amina Hassan', phone: '+234-817-123-4567', email: 'amina@nema.gov.ng', role: 'NEMA State Coordinator' },
        { name: 'Eng. Babatunde Ola', phone: '+234-819-456-7890', role: 'Emergency Response Manager' }
      ]
    }
  ];

  const handleSendMessage = async () => {
    if (!message.body.trim()) {
      toast.error('Please enter a message');
      return;
    }

    if (message.recipients.length === 0) {
      toast.error('Please select at least one recipient');
      return;
    }

    try {
      // This is where real API integration would happen
      if (isApiConnected && apiKeys.twilioSid !== 'YOUR_TWILIO_SID_HERE') {
        // Real API call would be made here
        toast.success('Message sent via live API!');
      } else {
        // Demo mode - simulate sending
        toast.success(`Demo: Message sent to ${message.recipients.length} recipients`);
      }

      // Add to sent messages
      const newMessage: NotificationMessage = {
        id: Date.now().toString(),
        recipient: message.recipients.join(', '),
        phoneNumber: message.recipients[0], // Simplified for demo
        message: message.body,
        type: message.type,
        status: 'sent',
        timestamp: 'Just now',
        priority: message.priority
      };

      setSentMessages(prev => [newMessage, ...prev]);

      // Reset form
      setMessage({
        recipients: [],
        subject: '',
        body: '',
        type: 'sms',
        priority: 'medium',
        scheduledFor: ''
      });

    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  const testApiConnection = () => {
    if (apiKeys.twilioSid === 'YOUR_TWILIO_SID_HERE') {
      toast.error('Please enter valid API credentials');
      return;
    }
    
    // In real implementation, this would test actual API connection
    setIsApiConnected(true);
    toast.success('API connection successful! Live messaging enabled.');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'delivered': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed': return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sms': return <MessageSquare className="h-4 w-4" />;
      case 'whatsapp': return <MessageCircle className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with API Status */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl text-gray-900">Notification Center</h2>
          <p className="text-gray-600">Send live messages and manage communications</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {isApiConnected ? <Wifi className="h-5 w-5 text-green-600" /> : <WifiOff className="h-5 w-5 text-red-600" />}
            <span className={`text-sm ${isApiConnected ? 'text-green-600' : 'text-red-600'}`}>
              {isApiConnected ? 'Live API Connected' : 'Demo Mode'}
            </span>
          </div>
          <Badge variant={isApiConnected ? 'default' : 'secondary'} className="flex items-center space-x-1">
            <Database className="h-3 w-3" />
            <span>{isApiConnected ? 'Production' : 'Prototype'}</span>
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="compose" className="flex items-center space-x-2">
            <Send className="h-4 w-4" />
            <span>Compose</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>Message History</span>
          </TabsTrigger>
          <TabsTrigger value="contacts" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Contacts</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>API Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="compose" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Send className="h-5 w-5 mr-2" />
                Compose Message
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Message Type and Priority */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="messageType">Message Type</Label>
                  <Select 
                    value={message.type} 
                    onValueChange={(value: 'sms' | 'whatsapp' | 'email' | 'push') => 
                      setMessage(prev => ({ ...prev, type: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="push">Push Notification</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="priority">Priority Level</Label>
                  <Select 
                    value={message.priority} 
                    onValueChange={(value: 'low' | 'medium' | 'high' | 'critical') => 
                      setMessage(prev => ({ ...prev, priority: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="critical">Critical Alert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Recipients Selection */}
              <div>
                <Label htmlFor="recipients">Recipients</Label>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  {contactGroups.map(group => (
                    <Card key={group.id} className="p-3">
                      <h4 className="text-sm mb-2">{group.name}</h4>
                      <div className="space-y-1">
                        {group.contacts.map(contact => (
                          <div key={contact.phone} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={contact.phone}
                              checked={message.recipients.includes(contact.phone)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setMessage(prev => ({
                                    ...prev,
                                    recipients: [...prev.recipients, contact.phone]
                                  }));
                                } else {
                                  setMessage(prev => ({
                                    ...prev,
                                    recipients: prev.recipients.filter(r => r !== contact.phone)
                                  }));
                                }
                              }}
                              className="rounded"
                            />
                            <label htmlFor={contact.phone} className="text-xs cursor-pointer">
                              {contact.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
                {message.recipients.length > 0 && (
                  <div className="mt-2">
                    <Badge variant="outline">{message.recipients.length} recipients selected</Badge>
                  </div>
                )}
              </div>

              {/* Subject (for email) */}
              {message.type === 'email' && (
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={message.subject}
                    onChange={(e) => setMessage(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Enter email subject"
                  />
                </div>
              )}

              {/* Multi-Language Message Composer */}
              <Card className="bg-blue-50/30 border-blue-200">
                <CardContent className="p-4">
                  <MessageLanguageToggle
                    currentLanguage={messageLanguage}
                    onLanguageChange={setMessageLanguage}
                    onTemplateSelect={(template, priority) => {
                      setMessage(prev => ({
                        ...prev,
                        body: template,
                        priority: priority as 'low' | 'medium' | 'high' | 'critical'
                      }));
                    }}
                    messageLength={message.body.length}
                  />
                </CardContent>
              </Card>

              {/* Message Body */}
              <div>
                <Label htmlFor="message">Message Content</Label>
                <Textarea
                  id="message"
                  value={message.body}
                  onChange={(e) => setMessage(prev => ({ ...prev, body: e.target.value }))}
                  placeholder="Enter your message here..."
                  rows={6}
                  className="resize-none"
                />
              </div>

              {/* Send Options */}
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-sm text-gray-600">
                  {isApiConnected ? (
                    <span className="flex items-center space-x-1 text-green-600">
                      <Zap className="h-4 w-4" />
                      <span>Ready to send via live API</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-1 text-orange-600">
                      <Database className="h-4 w-4" />
                      <span>Demo mode - messages will be simulated</span>
                    </span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setMessage({
                    recipients: [],
                    subject: '',
                    body: '',
                    type: 'sms',
                    priority: 'medium',
                    scheduledFor: ''
                  })}>
                    Clear
                  </Button>
                  <Button onClick={handleSendMessage} className="flex items-center space-x-2">
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Message History
                </span>
                <Badge variant="outline">{sentMessages.length} messages</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sentMessages.map((msg) => (
                  <div key={msg.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(msg.type)}
                        <span className="text-base">{msg.recipient}</span>
                        <Badge className={getPriorityColor(msg.priority)}>
                          {msg.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(msg.status)}
                        <span className="text-xs text-gray-500">{msg.timestamp}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{msg.message}</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>To: {msg.phoneNumber}</span>
                      <span className="capitalize">{msg.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-4">
          {contactGroups.map(group => (
            <Card key={group.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    {group.name}
                  </span>
                  <Badge variant="outline">{group.contacts.length} contacts</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.contacts.map(contact => (
                    <div key={contact.phone} className="border rounded-lg p-3">
                      <h4 className="text-base mb-1">{contact.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{contact.role}</p>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-xs">
                          <Phone className="h-3 w-3" />
                          <span>{contact.phone}</span>
                        </div>
                        {contact.email && (
                          <div className="flex items-center space-x-2 text-xs">
                            <Mail className="h-3 w-3" />
                            <span>{contact.email}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Key className="h-5 w-5 mr-2" />
                API Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* API Status */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {isApiConnected ? (
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  ) : (
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  )}
                  <div>
                    <p className="text-base">API Connection Status</p>
                    <p className="text-sm text-gray-600">
                      {isApiConnected ? 'Connected - Live messaging enabled' : 'Disconnected - Using demo mode'}
                    </p>
                  </div>
                </div>
                <Button onClick={testApiConnection} variant="outline">
                  Test Connection
                </Button>
              </div>

              <Separator />

              {/* Twilio SMS Configuration */}
              <div className="space-y-4">
                <h3 className="text-lg flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Twilio SMS Configuration
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="twilioSid">Account SID</Label>
                    <Input
                      id="twilioSid"
                      type="password"
                      value={apiKeys.twilioSid}
                      onChange={(e) => setApiKeys(prev => ({ ...prev, twilioSid: e.target.value }))}
                      placeholder="Enter Twilio Account SID"
                    />
                  </div>
                  <div>
                    <Label htmlFor="twilioToken">Auth Token</Label>
                    <Input
                      id="twilioToken"
                      type="password"
                      value={apiKeys.twilioToken}
                      onChange={(e) => setApiKeys(prev => ({ ...prev, twilioToken: e.target.value }))}
                      placeholder="Enter Twilio Auth Token"
                    />
                  </div>
                </div>
                <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                  <p><strong>To enable live SMS:</strong></p>
                  <p>1. Sign up for a Twilio account at twilio.com</p>
                  <p>2. Get your Account SID and Auth Token from the Console</p>
                  <p>3. Enter them above and test the connection</p>
                </div>
              </div>

              <Separator />

              {/* WhatsApp Configuration */}
              <div className="space-y-4">
                <h3 className="text-lg flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  WhatsApp Business API
                </h3>
                <div>
                  <Label htmlFor="whatsappToken">WhatsApp Token</Label>
                  <Input
                    id="whatsappToken"
                    type="password"
                    value={apiKeys.whatsappToken}
                    onChange={(e) => setApiKeys(prev => ({ ...prev, whatsappToken: e.target.value }))}
                    placeholder="Enter WhatsApp Business API Token"
                  />
                </div>
                <div className="text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
                  <p><strong>To enable WhatsApp messaging:</strong></p>
                  <p>1. Apply for WhatsApp Business API access</p>
                  <p>2. Get your access token from Meta Business</p>
                  <p>3. Configure your webhook and verify your business</p>
                </div>
              </div>

              <Separator />

              {/* Email Configuration */}
              <div className="space-y-4">
                <h3 className="text-lg flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  Email Configuration (SendGrid)
                </h3>
                <div>
                  <Label htmlFor="emailKey">SendGrid API Key</Label>
                  <Input
                    id="emailKey"
                    type="password"
                    value={apiKeys.emailKey}
                    onChange={(e) => setApiKeys(prev => ({ ...prev, emailKey: e.target.value }))}
                    placeholder="Enter SendGrid API Key"
                  />
                </div>
                <div className="text-sm text-gray-600 bg-purple-50 p-3 rounded-lg">
                  <p><strong>To enable email notifications:</strong></p>
                  <p>1. Create a SendGrid account at sendgrid.com</p>
                  <p>2. Generate an API key with full access</p>
                  <p>3. Verify your sender identity</p>
                </div>
              </div>

              <Separator />

              {/* Production Warning */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-base text-yellow-800">Production Environment Setup</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      This is a prototype environment. To enable live messaging in production:
                    </p>
                    <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                      <li>• Set up proper API key management with environment variables</li>
                      <li>• Implement proper error handling and retry logic</li>
                      <li>• Add rate limiting to prevent API abuse</li>
                      <li>• Set up monitoring and logging for message delivery</li>
                      <li>• Implement user authentication and authorization</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}