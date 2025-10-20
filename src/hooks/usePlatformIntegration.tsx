import { useState, useEffect, useCallback } from "react";
import { PlatformActivity, PlatformConnection, IntegrationSettings } from "@/types/platform";
import { ResumeData } from "@/types/resume";

interface UsePlatformIntegrationProps {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
}

export const usePlatformIntegration = ({ resumeData, setResumeData }: UsePlatformIntegrationProps) => {
  const [connections, setConnections] = useState<PlatformConnection[]>([
    {
      id: "1",
      platform: "github",
      name: "GitHub",
      status: "connected",
      lastSync: "2025-10-20T10:30:00Z",
      userId: "user123"
    },
    {
      id: "2",
      platform: "linkedin",
      name: "LinkedIn",
      status: "connected",
      lastSync: "2025-10-20T09:15:00Z",
      userId: "user123"
    },
    {
      id: "3",
      platform: "coursera",
      name: "Coursera",
      status: "disconnected",
      lastSync: "2025-10-10T14:20:00Z",
      userId: "user123"
    }
  ]);
  const [activities, setActivities] = useState<PlatformActivity[]>([
    {
      id: "1",
      platform: "github",
      title: "AI-Powered Task Manager",
      description: "Full-stack application with React, Node.js, and OpenAI API",
      date: "2025-10-10",
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
      date: "2025-10-05",
      type: "course_completion",
      verified: true,
      autoAddToResume: true,
      metadata: { grade: "98%", duration: "6 months" }
    },
    {
      id: "3",
      platform: "devpost",
      title: "1st Place - HackMIT 2025",
      description: "Won first place among 500+ participants",
      date: "2025-10-08",
      type: "hackathon_win",
      verified: true,
      autoAddToResume: true,
      metadata: { participants: 500, prize: "$5000" }
    }
  ]);
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
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(new Date().toISOString());
  const [syncProgress, setSyncProgress] = useState(0);

  // Auto-sync effect
  useEffect(() => {
    if (!settings.autoSync || connections.length === 0) return;

    const interval = setInterval(() => {
      handleSync();
    }, settings.syncInterval * 60 * 1000);

    return () => clearInterval(interval);
  }, [settings.autoSync, settings.syncInterval, connections.length]);

  const addActivitiesToResume = useCallback(async (activitiesToAdd: PlatformActivity[]) => {
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
          if (!updatedResume.projects.some(p => p.id === newProject.id)) {
            updatedResume.projects.push(newProject);
          }
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
          if (!updatedResume.achievements.some(a => a.id === newAchievement.id)) {
            updatedResume.achievements.push(newAchievement);
          }
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
          if (!updatedResume.achievements.some(a => a.id === hackathonAchievement.id)) {
            updatedResume.achievements.push(hackathonAchievement);
          }
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
          if (!updatedResume.experience.some(e => e.id === newExperience.id)) {
            updatedResume.experience.push(newExperience);
          }
          break;
      }
    });

    setResumeData(updatedResume);
  }, [resumeData, setResumeData]);

  const handleSync = useCallback(async () => {
    setIsSyncing(true);
    setSyncProgress(0);
    try {
      // Simulate API calls and progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setSyncProgress(i);
      }

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

      setActivities(prev => [...prev, ...newActivities.filter(na => !prev.some(pa => pa.id === na.id))]);
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
  }, [connections, settings.autoAddVerified, addActivitiesToResume]);

  const addSingleActivity = async (activity: PlatformActivity) => {
    await addActivitiesToResume([activity]);
  };

  const addBulkActivities = async (activitiesToAdd: PlatformActivity[]) => {
    await addActivitiesToResume(activitiesToAdd);
  };

  const connectPlatform = async (platformType: string) => {
    setConnections(prev => {
      const existingConnection = prev.find(conn => conn.platform === platformType);
      if (existingConnection) {
        return prev.map(conn =>
          conn.platform === platformType
            ? { ...conn, status: 'connected', lastSync: new Date().toISOString() }
            : conn
        );
      } else {
        const newConnection: PlatformConnection = {
          id: `${platformType}-${Date.now()}`,
          platform: platformType as any,
          name: platformType.charAt(0).toUpperCase() + platformType.slice(1),
          status: 'connected',
          lastSync: new Date().toISOString(),
          userId: 'user123'
        };
        return [...prev, newConnection];
      }
    });
  };

  const disconnectPlatform = (connectionId: string) => {
    setConnections(prev => prev.map(conn => 
      conn.id === connectionId 
        ? { ...conn, status: 'disconnected' } 
        : conn
    ));
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
    syncProgress,
    handleSync,
    addSingleActivity,
    addBulkActivities,
    connectPlatform,
    disconnectPlatform,
    updateSettings
  };
};
