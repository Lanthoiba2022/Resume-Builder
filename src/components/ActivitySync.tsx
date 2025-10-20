import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Activity, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  RefreshCw,
  TrendingUp,
  Calendar,
  Users,
  Award
} from "lucide-react";
import { PlatformActivity, ActivityType } from "@/types/platform";

interface ActivitySyncProps {
  activities: PlatformActivity[];
  onActivitySelect: (activity: PlatformActivity) => void;
  onBulkAdd: (activities: PlatformActivity[]) => void;
}

const ActivitySync = ({ activities, onActivitySelect, onBulkAdd }: ActivitySyncProps) => {
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [filter, setFilter] = useState<ActivityType | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'platform' | 'type'>('date');

  const filteredActivities = activities
    .filter(activity => filter === 'all' || activity.type === filter)
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'platform':
          return a.platform.localeCompare(b.platform);
        case 'type':
          return a.type.localeCompare(b.type);
        default:
          return 0;
      }
    });

  const handleSelectActivity = (activityId: string) => {
    setSelectedActivities(prev => 
      prev.includes(activityId) 
        ? prev.filter(id => id !== activityId)
        : [...prev, activityId]
    );
  };

  const handleBulkAdd = () => {
    const selected = activities.filter(activity => selectedActivities.includes(activity.id));
    onBulkAdd(selected);
    setSelectedActivities([]);
  };

  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'project':
        return <Activity className="h-4 w-4 text-blue-500" />;
      case 'course_completion':
        return <Award className="h-4 w-4 text-green-500" />;
      case 'hackathon_win':
        return <Award className="h-4 w-4 text-yellow-500" />;
      case 'certification':
        return <Award className="h-4 w-4 text-purple-500" />;
      case 'internship':
        return <Users className="h-4 w-4 text-orange-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActivityStats = () => {
    const total = activities.length;
    const verified = activities.filter(a => a.verified).length;
    const recent = activities.filter(a => {
      const activityDate = new Date(a.date);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return activityDate > thirtyDaysAgo;
    }).length;

    return { total, verified, recent };
  };

  const stats = getActivityStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Activity Sync</h3>
          <p className="text-sm text-muted-foreground">
            Review and add activities to your resume
          </p>
        </div>
        {selectedActivities.length > 0 && (
          <Button onClick={handleBulkAdd} className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Add Selected ({selectedActivities.length})
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Activity className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total Activities</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
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

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button
          variant={filter === 'project' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('project')}
        >
          Projects
        </Button>
        <Button
          variant={filter === 'course_completion' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('course_completion')}
        >
          Courses
        </Button>
        <Button
          variant={filter === 'hackathon_win' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('hackathon_win')}
        >
          Hackathons
        </Button>
        <Button
          variant={filter === 'certification' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('certification')}
        >
          Certifications
        </Button>
      </div>

      {/* Activities List */}
      <div className="space-y-3">
        {filteredActivities.map((activity) => (
          <Card 
            key={activity.id} 
            className={`p-4 cursor-pointer transition-colors ${
              selectedActivities.includes(activity.id) 
                ? 'ring-2 ring-primary bg-primary/5' 
                : 'hover:bg-muted/50'
            }`}
            onClick={() => handleSelectActivity(activity.id)}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium">{activity.title}</h4>
                  {activity.verified && (
                    <Badge variant="secondary" className="text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs capitalize">
                    {activity.type.replace('_', ' ')}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(activity.date).toLocaleDateString()}
                  </span>
                  <span className="capitalize">{activity.platform}</span>
                  {activity.metadata && (
                    <span>
                      {activity.type === 'project' && activity.metadata.stars && 
                        `⭐ ${activity.metadata.stars} stars`
                      }
                      {activity.type === 'course_completion' && activity.metadata.grade && 
                        `Grade: ${activity.metadata.grade}`
                      }
                      {activity.type === 'hackathon_win' && activity.metadata.participants && 
                        `${activity.metadata.participants} participants`
                      }
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {selectedActivities.includes(activity.id) && (
                  <CheckCircle className="h-5 w-5 text-primary" />
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onActivitySelect(activity);
                  }}
                >
                  Add to Resume
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No activities found for the selected filter. Try adjusting your filters or sync more platforms.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ActivitySync;
