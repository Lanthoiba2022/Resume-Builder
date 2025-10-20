import { useState, useEffect, useCallback } from "react";
import { PlatformActivity, PlatformConnection, IntegrationSettings } from "@/types/platform";
import { ResumeData } from "@/types/resume";

interface UsePlatformIntegrationProps {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
}

export const usePlatformIntegration = ({ resumeData, setResumeData }: UsePlatformIntegrationProps) => {
  const [connections, setConnections] = useState<PlatformConnection[]>([]);
  const [activities, setActivities] = useState<PlatformActivity[]>([]);
  const [settings, setSettings] = useState<IntegrationSettings>({
    autoSync: true,
    syncInterval: 30,
    autoAddVerified: true,
    platforms: [],
    notifications: {
      syncSuccess: true,
      syncError: true,
      newActivity: true
    }
  });
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);

  // Auto-sync effect
  useEffect(() => {
    if (!settings.autoSync || connections.length === 0) return;

    const interval = setInterval(() => {
      handleSync();
    }, settings.syncInterval * 60 * 1000);

    return () => clearInterval(interval);
  }, [settings.autoSync, settings.syncInterval, connections.length]);

  const handleSync = useCallback(async () => {
    setIsSyncing(true);
    try {
      // Simulate API calls to different platforms
      const newActivities: PlatformActivity[] = [];
      
      // Mock GitHub activities
      const githubConnection = connections.find(c => c.platform === 'github');
      if (githubConnection?.status === 'connected') {
        newActivities.push({
          id: `github-${Date.now()}`,
          platform: 'github',
          title: 'New Repository: AI Chatbot',
          description: 'Built a conversational AI chatbot using OpenAI API and React',
          date: new Date().toISOString().split('T')[0],
          type: 'project',
          verified: true,
          autoAddToResume: settings.autoAddVerified,
          metadata: { stars: 8, language: 'TypeScript' }
        });
      }

      // Mock Coursera activities
      const courseraConnection = connections.find(c => c.platform === 'coursera');
      if (courseraConnection?.status === 'connected') {
        newActivities.push({
          id: `coursera-${Date.now()}`,
          platform: 'coursera',
          title: 'Deep Learning Specialization',
          description: 'Completed 5-course specialization in deep learning from deeplearning.ai',
          date: new Date().toISOString().split('T')[0],
          type: 'course_completion',
          verified: true,
          autoAddToResume: settings.autoAddVerified,
          metadata: { grade: '95%', duration: '4 months' }
        });
      }

      // Mock Devpost activities
      const devpostConnection = connections.find(c => c.platform === 'devpost');
      if (devpostConnection?.status === 'connected') {
        newActivities.push({
          id: `devpost-${Date.now()}`,
          platform: 'devpost',
          title: '2nd Place - TechCrunch Disrupt Hackathon',
          description: 'Built a real-time collaboration tool for remote teams',
          date: new Date().toISOString().split('T')[0],
          type: 'hackathon_win',
          verified: true,
          autoAddToResume: settings.autoAddVerified,
          metadata: { participants: 200, prize: '$3000' }
        });
      }

      setActivities(prev => [...prev, ...newActivities]);
      setLastSyncTime(new Date().toISOString());

      // Auto-add verified activities to resume
      if (settings.autoAddVerified) {
        const verifiedActivities = newActivities.filter(activity => activity.verified);
        await addActivitiesToResume(verifiedActivities);
      }

    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setIsSyncing(false);
    }
  }, [connections, settings.autoAddVerified]);

  const addActivitiesToResume = async (activitiesToAdd: PlatformActivity[]) => {
    const updatedResume = { ...resumeData };

    activitiesToAdd.forEach(activity => {
      switch (activity.type) {
        case 'project':
          const newProject = {
            id: activity.id,
            name: activity.title,
            description: activity.description,
            technologies: activity.metadata?.language ? [activity.metadata.language] : [],
            link: activity.metadata?.url || '',
            verified: activity.verified
          };
          updatedResume.projects.push(newProject);
          break;

        case 'course_completion':
        case 'certification':
          const newAchievement = {
            id: activity.id,
            title: activity.title,
            description: activity.description,
            date: activity.date,
            verified: activity.verified
          };
          updatedResume.achievements.push(newAchievement);
          break;

        case 'hackathon_win':
        case 'hackathon_participation':
          const hackathonAchievement = {
            id: activity.id,
            title: activity.title,
            description: activity.description,
            date: activity.date,
            verified: activity.verified
          };
          updatedResume.achievements.push(hackathonAchievement);
          break;

        case 'internship':
          const newExperience = {
            id: activity.id,
            company: activity.metadata?.company || 'Company',
            position: activity.title,
            location: activity.metadata?.location || 'Remote',
            startDate: activity.metadata?.startDate || activity.date,
            endDate: activity.metadata?.endDate || 'Present',
            description: activity.description,
            verified: activity.verified
          };
          updatedResume.experience.push(newExperience);
          break;
      }
    });

    setResumeData(updatedResume);
  };

  const addSingleActivity = async (activity: PlatformActivity) => {
    await addActivitiesToResume([activity]);
  };

  const addBulkActivities = async (activitiesToAdd: PlatformActivity[]) => {
    await addActivitiesToResume(activitiesToAdd);
  };

  const connectPlatform = async (platformType: string) => {
    // Simulate platform connection
    const newConnection: PlatformConnection = {
      id: `${platformType}-${Date.now()}`,
      platform: platformType as any,
      name: platformType.charAt(0).toUpperCase() + platformType.slice(1),
      status: 'connected',
      lastSync: new Date().toISOString(),
      userId: 'user123'
    };

    setConnections(prev => [...prev, newConnection]);
  };

  const disconnectPlatform = (connectionId: string) => {
    setConnections(prev => prev.filter(conn => conn.id !== connectionId));
  };

  const updateSettings = (newSettings: IntegrationSettings) => {
    setSettings(newSettings);
  };

  return {
    connections,
    activities,
    settings,
    isSyncing,
    lastSyncTime,
    handleSync,
    addSingleActivity,
    addBulkActivities,
    connectPlatform,
    disconnectPlatform,
    updateSettings
  };
};
