import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  RefreshCw, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Zap,
  Activity,
  TrendingUp
} from "lucide-react";

interface SyncIndicatorProps {
  isSyncing: boolean;
  lastSyncTime: string | null;
  connectionsCount: number;
  activitiesCount: number;
  onManualSync: () => void;
}

const SyncIndicator = ({ 
  isSyncing, 
  lastSyncTime, 
  connectionsCount, 
  activitiesCount, 
  onManualSync 
}: SyncIndicatorProps) => {
  const [syncProgress, setSyncProgress] = useState(0);

  useEffect(() => {
    if (isSyncing) {
      setSyncProgress(0);
      const interval = setInterval(() => {
        setSyncProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isSyncing]);

  const getTimeAgo = (timestamp: string | null) => {
    if (!timestamp) return 'Never';
    const now = new Date();
    const syncTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - syncTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="space-y-4">
      {/* Main Sync Status */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Platform Sync</h3>
          </div>
          <Button 
            onClick={onManualSync} 
            disabled={isSyncing}
            size="sm"
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Syncing...' : 'Sync Now'}
          </Button>
        </div>

        {isSyncing && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Syncing activities...</span>
              <span>{syncProgress}%</span>
            </div>
            <Progress value={syncProgress} className="h-2" />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-blue-500" />
            <div>
              <p className="text-sm font-medium">{connectionsCount}</p>
              <p className="text-xs text-muted-foreground">Connected</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <div>
              <p className="text-sm font-medium">{activitiesCount}</p>
              <p className="text-xs text-muted-foreground">Activities</p>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Last sync:</span>
            <div className="flex items-center gap-1">
              {lastSyncTime ? (
                <>
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  <span>{getTimeAgo(lastSyncTime)}</span>
                </>
              ) : (
                <>
                  <Clock className="h-3 w-3 text-gray-500" />
                  <span>Never</span>
                </>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-blue-100 rounded">
              <Activity className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Auto Sync</p>
              <p className="text-xs text-muted-foreground">Enabled</p>
            </div>
          </div>
        </Card>

        <Card className="p-3">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-green-100 rounded">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Verified</p>
              <p className="text-xs text-muted-foreground">Activities</p>
            </div>
          </div>
        </Card>

        <Card className="p-3">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-purple-100 rounded">
              <Zap className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Real-time</p>
              <p className="text-xs text-muted-foreground">Updates</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Sync Status Alert */}
      {!isSyncing && lastSyncTime && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            All platforms synced successfully. Your resume is up to date with the latest activities.
          </AlertDescription>
        </Alert>
      )}

      {!isSyncing && !lastSyncTime && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No platforms connected yet. Connect your accounts to start syncing activities automatically.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default SyncIndicator;
