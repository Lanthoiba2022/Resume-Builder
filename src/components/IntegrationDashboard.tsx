import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Users, 
  Award, 
  Code, 
  BookOpen, 
  Trophy,
  Activity,
  Zap,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";
import { PlatformActivity, PlatformConnection } from "@/types/platform";

interface IntegrationDashboardProps {
  connections: PlatformConnection[];
  activities: PlatformActivity[];
  isSyncing: boolean;
  lastSyncTime: string | null;
  onSync: () => void;
}

const IntegrationDashboard = ({ 
  connections, 
  activities, 
  isSyncing, 
  lastSyncTime, 
  onSync 
}: IntegrationDashboardProps) => {
  const getActivityStats = () => {
    const total = activities.length;
    const verified = activities.filter(a => a.verified).length;
    const recent = activities.filter(a => {
      const activityDate = new Date(a.date);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return activityDate > thirtyDaysAgo;
    }).length;

    const byType = activities.reduce((acc, activity) => {
      acc[activity.type] = (acc[activity.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { total, verified, recent, byType };
  };

  const getConnectionStats = () => {
    const connected = connections.filter(c => c.status === 'connected').length;
    const total = connections.length;
    const lastSync = lastSyncTime ? new Date(lastSyncTime) : null;
    
    return { connected, total, lastSync };
  };

  const stats = getActivityStats();
  const connectionStats = getConnectionStats();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'project':
        return <Code className="h-4 w-4 text-blue-500" />;
      case 'course_completion':
        return <BookOpen className="h-4 w-4 text-green-500" />;
      case 'hackathon_win':
        return <Trophy className="h-4 w-4 text-yellow-500" />;
      case 'certification':
        return <Award className="h-4 w-4 text-purple-500" />;
      case 'internship':
        return <Users className="h-4 w-4 text-orange-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTimeAgo = (timestamp: Date | null | string) => {
    if (!timestamp) return 'Never';
    const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            Integration Dashboard
          </h2>
          <p className="text-muted-foreground">
            Monitor your platform connections and activity sync status
          </p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{connectionStats.connected}</p>
              <p className="text-sm text-muted-foreground">Connected Platforms</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Activity className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total Activities</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <CheckCircle className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.verified}</p>
              <p className="text-sm text-muted-foreground">Verified</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.recent}</p>
              <p className="text-sm text-muted-foreground">Last 30 Days</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Connection Status */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Platform Connections</h3>
        <div className="space-y-3">
          {connections.map((connection) => (
            <div key={connection.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center">
                  <img 
                    src={`/PlatformImages/${connection.platform}.png`} 
                    alt={`${connection.name} logo`}
                    className="w-8 h-8 object-contain"
                    onError={(e) => {
                      // Fallback to SVG for Coursera
                      if (connection.platform === 'coursera') {
                        e.currentTarget.src = '/PlatformImages/blueCoursera.svg';
                      }
                    }}
                  />
                </div>
                <div>
                  <p className="font-medium">{connection.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Last sync: {getTimeAgo(connection.lastSync)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge 
                  variant={connection.status === 'connected' ? 'default' : 'secondary'}
                  className="flex items-center gap-1"
                >
                  {connection.status === 'connected' ? (
                    <CheckCircle className="h-3 w-3" />
                  ) : (
                    <AlertCircle className="h-3 w-3" />
                  )}
                  {connection.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Activity Breakdown */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Activity Breakdown</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(stats.byType).map(([type, count]) => (
            <div key={type} className="flex items-center gap-2 p-3 border rounded-lg">
              {getActivityIcon(type)}
              <div>
                <p className="font-medium">{count}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {type.replace('_', ' ')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Activities */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
        <div className="space-y-3">
          {activities.slice(0, 5).map((activity) => (
            <div key={activity.id} className="flex items-center gap-3 p-3 border rounded-lg">
              {getActivityIcon(activity.type)}
              <div className="flex-1">
                <p className="font-medium">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
              </div>
              <div className="flex items-center gap-2">
                {activity.verified && (
                  <Badge variant="secondary" className="text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
                <span className="text-xs text-muted-foreground">
                  {new Date(activity.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Sync Status */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Sync Status</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Last Sync</span>
            <div className="flex items-center gap-2">
              {connectionStats.lastSync ? (
                <>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>{getTimeAgo(connectionStats.lastSync)}</span>
                </>
              ) : (
                <>
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>Never</span>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span>Auto Sync</span>
            <Badge variant="default" className="flex items-center gap-1">
              <Zap className="h-3 w-3" />
              Enabled
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span>Sync Progress</span>
            <div className="flex items-center gap-2">
              <Progress value={isSyncing ? 75 : 100} className="w-24" />
              <span className="text-sm text-muted-foreground">
                {isSyncing ? 'Syncing...' : 'Complete'}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default IntegrationDashboard;
