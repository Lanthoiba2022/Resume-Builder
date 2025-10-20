import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  Plug, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  ExternalLink,
  Settings,
  Activity,
  Zap,
  Shield,
  BookOpen,
  Trophy,
  Code,
  Users,
  Clock
} from "lucide-react";
import { PlatformConnection, PlatformActivity, PlatformConfig, IntegrationSettings } from "@/types/platform";

interface PlatformIntegrationProps {
  onActivitySync: (activities: PlatformActivity[]) => void;
  settings: IntegrationSettings;
  onSettingsChange: (settings: IntegrationSettings) => void;
}

const platformConfigs: PlatformConfig[] = [
  {
    name: "GitHub",
    type: "github",
    icon: "🐙",
    color: "bg-gray-900",
    description: "Sync your repositories, contributions, and projects",
    authUrl: "/auth/github",
    apiUrl: "https://api.github.com",
    supportedActivities: ["project", "achievement"],
    autoSync: true,
    syncInterval: 60
  },
  {
    name: "LinkedIn",
    type: "linkedin",
    icon: "💼",
    color: "bg-blue-600",
    description: "Import professional experience and certifications",
    authUrl: "/auth/linkedin",
    apiUrl: "https://api.linkedin.com",
    supportedActivities: ["internship", "certification", "achievement"],
    autoSync: true,
    syncInterval: 120
  },
  {
    name: "Coursera",
    type: "coursera",
    icon: "🎓",
    color: "bg-blue-500",
    description: "Sync completed courses and certificates",
    authUrl: "/auth/coursera",
    apiUrl: "https://api.coursera.org",
    supportedActivities: ["course_completion", "certification"],
    autoSync: true,
    syncInterval: 180
  },
  {
    name: "LeetCode",
    type: "leetcode",
    icon: "🧮",
    color: "bg-orange-500",
    description: "Track coding achievements and contest rankings",
    authUrl: "/auth/leetcode",
    apiUrl: "https://leetcode.com/api",
    supportedActivities: ["achievement", "competition"],
    autoSync: true,
    syncInterval: 240
  },
  {
    name: "Devpost",
    type: "devpost",
    icon: "🏆",
    color: "bg-green-600",
    description: "Import hackathon wins and project submissions",
    authUrl: "/auth/devpost",
    apiUrl: "https://devpost.com/api",
    supportedActivities: ["hackathon_win", "hackathon_participation", "project"],
    autoSync: true,
    syncInterval: 300
  },
  {
    name: "Kaggle",
    type: "kaggle",
    icon: "📊",
    color: "bg-purple-600",
    description: "Sync data science competitions and achievements",
    authUrl: "/auth/kaggle",
    apiUrl: "https://kaggle.com/api",
    supportedActivities: ["competition", "achievement", "skill_verification"],
    autoSync: true,
    syncInterval: 360
  }
];

const PlatformIntegration = ({ onActivitySync, settings, onSettingsChange }: PlatformIntegrationProps) => {
  const [connections, setConnections] = useState<PlatformConnection[]>([]);
  const [activities, setActivities] = useState<PlatformActivity[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [connectingPlatform, setConnectingPlatform] = useState<string | null>(null);

  // Mock data for demonstration
  useEffect(() => {
    const mockConnections: PlatformConnection[] = [
      {
        id: "1",
        platform: "github",
        name: "GitHub",
        status: "connected",
        lastSync: "2024-01-15T10:30:00Z",
        userId: "user123"
      },
      {
        id: "2",
        platform: "linkedin",
        name: "LinkedIn",
        status: "connected",
        lastSync: "2024-01-15T09:15:00Z",
        userId: "user123"
      },
      {
        id: "3",
        platform: "coursera",
        name: "Coursera",
        status: "disconnected",
        lastSync: "2024-01-10T14:20:00Z",
        userId: "user123"
      }
    ];

    const mockActivities: PlatformActivity[] = [
      {
        id: "1",
        platform: "github",
        title: "AI-Powered Task Manager",
        description: "Full-stack application with React, Node.js, and OpenAI API",
        date: "2024-01-10",
        type: "project",
        verified: true,
        autoAddToResume: true,
        metadata: { stars: 15, language: "JavaScript" }
      },
      {
        id: "2",
        platform: "coursera",
        title: "Machine Learning Specialization",
        description: "Completed 5-course specialization from Stanford",
        date: "2024-01-05",
        type: "course_completion",
        verified: true,
        autoAddToResume: true,
        metadata: { grade: "98%", duration: "6 months" }
      },
      {
        id: "3",
        platform: "devpost",
        title: "1st Place - HackMIT 2024",
        description: "Won first place among 500+ participants",
        date: "2024-01-08",
        type: "hackathon_win",
        verified: true,
        autoAddToResume: true,
        metadata: { participants: 500, prize: "$5000" }
      }
    ];

    setConnections(mockConnections);
    setActivities(mockActivities);
  }, []);

  // Debug effect to monitor connection changes
  useEffect(() => {
    console.log('Connections updated:', connections);
    const courseraConnection = connections.find(conn => conn.platform === 'coursera');
    console.log('Coursera connection in state:', courseraConnection);
  }, [connections]);

  const handleConnect = async (platform: PlatformConfig) => {
    console.log('Connecting to platform:', platform.name);
    setConnectingPlatform(platform.type);
    
    try {
      // Simulate connection process with a small delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newConnection: PlatformConnection = {
        id: Date.now().toString(),
        platform: platform.type,
        name: platform.name,
        status: "connected",
        lastSync: new Date().toISOString(),
        userId: "user123"
      };

      setConnections(prev => {
        // Check if connection already exists and is connected
        const existingConnection = prev.find(conn => conn.platform === platform.type);
        if (existingConnection && existingConnection.status === 'connected') {
          console.log('Connection already exists for:', platform.name);
          return prev;
        }
        
        if (existingConnection) {
          // Update existing disconnected connection
          console.log('Updating existing connection for:', platform.name);
          return prev.map(conn => 
            conn.platform === platform.type 
              ? { ...conn, status: 'connected', lastSync: new Date().toISOString() }
              : conn
          );
        }
        
        console.log('Adding new connection:', platform.name);
        return [...prev, newConnection];
      });
      
      // Show success notification
      if (platform.type === 'coursera') {
        console.log('Coursera connected successfully!');
      }
    } catch (error) {
      console.error('Connection failed:', error);
    } finally {
      setConnectingPlatform(null);
    }
  };

  const handleDisconnect = (connectionId: string) => {
    setConnections(prev => prev.filter(conn => conn.id !== connectionId));
  };

  const handleSync = async () => {
    setIsSyncing(true);
    setSyncProgress(0);

    // Simulate sync process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setSyncProgress(i);
    }

    setIsSyncing(false);
    onActivitySync(activities);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'disconnected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'project':
        return <Code className="h-4 w-4" />;
      case 'course_completion':
        return <BookOpen className="h-4 w-4" />;
      case 'hackathon_win':
        return <Trophy className="h-4 w-4" />;
      case 'certification':
        return <Shield className="h-4 w-4" />;
      case 'internship':
        return <Users className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary palette-glow flex items-center justify-center">
              <Zap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="palette-gradient-text">Platform Integration</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Connect your accounts to automatically sync activities and update your resume in real-time
          </p>
        </div>
        <Button onClick={handleSync} disabled={isSyncing} className="palette-button flex items-center gap-2 px-6 py-3">
          <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
          {isSyncing ? 'Syncing...' : 'Sync All'}
        </Button>
      </div>

      {isSyncing && (
        <Alert>
          <Activity className="h-4 w-4" />
          <AlertDescription className="flex items-center gap-2">
            Syncing activities from connected platforms...
            <Progress value={syncProgress} className="w-32" />
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="platforms" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="platforms" className="space-y-4">
          <div className="grid gap-4">
            {platformConfigs.map((platform) => {
              const connection = connections.find(conn => conn.platform === platform.type);
              const isConnected = connection?.status === 'connected';
              
              // Debug logging for Coursera
              if (platform.type === 'coursera') {
                console.log('Coursera connection status:', connection);
                console.log('Coursera isConnected:', isConnected);
              }

              return (
                <Card key={`${platform.type}-${connection?.status || 'disconnected'}`} className="palette-card p-6 hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className={`w-16 h-16 rounded-xl ${platform.color} flex items-center justify-center text-white text-2xl palette-shadow`}>
                        {platform.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">{platform.name}</h3>
                        <p className="text-muted-foreground mb-3">{platform.description}</p>
                        {isConnected && (
                          <div className="flex items-center gap-2">
                            {getStatusIcon(connection?.status || 'disconnected')}
                            <span className="text-sm text-muted-foreground">
                              Last sync: {new Date(connection?.lastSync || '').toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isConnected ? (
                        <>
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Connected
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDisconnect(connection?.id || '')}
                          >
                            Disconnect
                          </Button>
                        </>
                      ) : (
                        <Button
                          onClick={() => {
                            console.log('Button clicked for platform:', platform.name, platform.type);
                            handleConnect(platform);
                          }}
                          disabled={connectingPlatform === platform.type}
                          className="palette-button flex items-center gap-2 px-6 py-3"
                          type="button"
                        >
                          {connectingPlatform === platform.type ? (
                            <>
                              <RefreshCw className="h-4 w-4 animate-spin" />
                              Connecting...
                            </>
                          ) : (
                            <>
                              <Plug className="h-4 w-4" />
                              Connect
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="activities" className="space-y-4">
          <div className="space-y-4">
            {activities.map((activity) => (
              <Card key={activity.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{activity.title}</h4>
                        {activity.verified && (
                          <Badge variant="secondary" className="text-xs">
                            <Shield className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{new Date(activity.date).toLocaleDateString()}</span>
                        <span className="capitalize">{activity.type.replace('_', ' ')}</span>
                        <span className="capitalize">{activity.platform}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={activity.autoAddToResume}
                      onCheckedChange={(checked) => {
                        setActivities(prev => 
                          prev.map(act => 
                            act.id === activity.id 
                              ? { ...act, autoAddToResume: checked }
                              : act
                          )
                        );
                      }}
                    />
                    <Label className="text-xs">Auto-add</Label>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Sync Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-sync">Auto Sync</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically sync activities from connected platforms
                  </p>
                </div>
                <Switch
                  id="auto-sync"
                  checked={settings.autoSync}
                  onCheckedChange={(checked) => 
                    onSettingsChange({ ...settings, autoSync: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-add-verified">Auto-add Verified Activities</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically add verified activities to your resume
                  </p>
                </div>
                <Switch
                  id="auto-add-verified"
                  checked={settings.autoAddVerified}
                  onCheckedChange={(checked) => 
                    onSettingsChange({ ...settings, autoAddVerified: checked })
                  }
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="sync-success">Sync Success</Label>
                <Switch
                  id="sync-success"
                  checked={settings.notifications.syncSuccess}
                  onCheckedChange={(checked) => 
                    onSettingsChange({ 
                      ...settings, 
                      notifications: { ...settings.notifications, syncSuccess: checked }
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sync-error">Sync Error</Label>
                <Switch
                  id="sync-error"
                  checked={settings.notifications.syncError}
                  onCheckedChange={(checked) => 
                    onSettingsChange({ 
                      ...settings, 
                      notifications: { ...settings.notifications, syncError: checked }
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="new-activity">New Activity</Label>
                <Switch
                  id="new-activity"
                  checked={settings.notifications.newActivity}
                  onCheckedChange={(checked) => 
                    onSettingsChange({ 
                      ...settings, 
                      notifications: { ...settings.notifications, newActivity: checked }
                    })
                  }
                />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlatformIntegration;
