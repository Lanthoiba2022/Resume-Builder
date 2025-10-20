export interface PlatformActivity {
  id: string;
  platform: PlatformType;
  title: string;
  description: string;
  date: string;
  type: ActivityType;
  verified: boolean;
  metadata?: Record<string, any>;
  autoAddToResume: boolean;
}

export interface PlatformConnection {
  id: string;
  platform: PlatformType;
  name: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync: string;
  userId: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: string;
}

export interface PlatformSync {
  id: string;
  connectionId: string;
  lastSyncTime: string;
  activitiesSynced: number;
  status: 'success' | 'error' | 'in_progress';
  errorMessage?: string;
}

export type PlatformType = 
  | 'internship' 
  | 'hackathon' 
  | 'learning' 
  | 'verification'
  | 'github'
  | 'linkedin'
  | 'coursera'
  | 'edx'
  | 'udemy'
  | 'leetcode'
  | 'hackerrank'
  | 'devpost'
  | 'kaggle';

export type ActivityType = 
  | 'internship'
  | 'hackathon_win'
  | 'hackathon_participation'
  | 'course_completion'
  | 'certification'
  | 'project'
  | 'skill_verification'
  | 'achievement'
  | 'competition'
  | 'publication';

export interface PlatformConfig {
  name: string;
  type: PlatformType;
  icon: string;
  color: string;
  description: string;
  authUrl?: string;
  apiUrl?: string;
  supportedActivities: ActivityType[];
  autoSync: boolean;
  syncInterval: number; // in minutes
}

export interface IntegrationSettings {
  autoSync: boolean;
  syncInterval: number;
  autoAddVerified: boolean;
  platforms: PlatformConfig[];
  notifications: {
    syncSuccess: boolean;
    syncError: boolean;
    newActivity: boolean;
  };
}
