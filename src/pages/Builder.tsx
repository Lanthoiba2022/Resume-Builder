import { useState } from "react";
import Navigation from "@/components/Navigation";
import ResumeEditor from "@/components/ResumeEditor";
import ResumePreview from "@/components/ResumePreview";
import PlatformIntegration from "@/components/PlatformIntegration";
import ActivitySync from "@/components/ActivitySync";
import IntegrationDashboard from "@/components/IntegrationDashboard";
import SyncIndicator from "@/components/SyncIndicator";
import { ResumeData } from "@/types/resume";
import { IntegrationSettings } from "@/types/platform";
import { usePlatformIntegration } from "@/hooks/usePlatformIntegration";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Zap, Activity, BarChart3 } from "lucide-react";

const Builder = () => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: "Alex Johnson",
      email: "alex.johnson@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/alexjohnson",
      portfolio: "alexjohnson.dev",
    },
    summary: "Computer Science student with hands-on experience in full-stack development. Passionate about building scalable applications and contributing to open-source projects.",
    education: [
      {
        id: "1",
        institution: "Stanford University",
        degree: "Bachelor of Science in Computer Science",
        location: "Stanford, CA",
        startDate: "2021",
        endDate: "2025",
        gpa: "3.8/4.0",
        verified: true,
      },
    ],
    experience: [
      {
        id: "1",
        company: "TechCorp Inc.",
        position: "Software Engineering Intern",
        location: "San Francisco, CA",
        startDate: "Jun 2024",
        endDate: "Aug 2024",
        description: "Developed and deployed microservices using Node.js and AWS. Improved API response time by 40% through optimization.",
        verified: true,
      },
      {
        id: "2",
        company: "StartupXYZ",
        position: "Frontend Developer Intern",
        location: "Remote",
        startDate: "Jan 2024",
        endDate: "May 2024",
        description: "Built responsive web applications using React and TypeScript. Collaborated with design team to implement pixel-perfect UI components.",
        verified: true,
      },
    ],
    projects: [
      {
        id: "1",
        name: "AI-Powered Task Manager",
        description: "Full-stack application using React, Node.js, and OpenAI API for intelligent task prioritization",
        technologies: ["React", "Node.js", "OpenAI", "MongoDB"],
        link: "github.com/alexj/task-manager",
        verified: false,
      },
      {
        id: "2",
        name: "E-commerce Platform",
        description: "Built scalable e-commerce solution with payment integration and real-time inventory management",
        technologies: ["Next.js", "Stripe", "PostgreSQL", "Redis"],
        link: "github.com/alexj/ecommerce",
        verified: false,
      },
    ],
    skills: {
      technical: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "AWS", "Docker", "Git"],
      soft: ["Team Leadership", "Problem Solving", "Communication", "Agile Methodology"],
    },
    achievements: [
      {
        id: "1",
        title: "1st Place - HackMIT 2024",
        description: "Won first place among 500+ participants for building an AI-powered accessibility tool",
        date: "Mar 2024",
        verified: true,
      },
      {
        id: "2",
        title: "AWS Certified Developer",
        description: "Associate level certification in AWS cloud services",
        date: "Feb 2024",
        verified: true,
      },
    ],
  });

  const {
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
  } = usePlatformIntegration({ resumeData, setResumeData });

  const [activeTab, setActiveTab] = useState("editor");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="palette-gradient-text">Resume Builder</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Build your professional resume with integrated platform sync and real-time updates
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 palette-card p-1">
            <TabsTrigger value="editor" className="flex items-center gap-2 data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground transition-all duration-300">
              <FileText className="h-4 w-4" />
              Resume Editor
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2 data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground transition-all duration-300">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-2 data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground transition-all duration-300">
              <Zap className="h-4 w-4" />
              Platform Integration
            </TabsTrigger>
            <TabsTrigger value="activities" className="flex items-center gap-2 data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground transition-all duration-300">
              <Activity className="h-4 w-4" />
              Activity Sync
            </TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="flex min-h-[70vh] flex-col palette-card rounded-xl p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-lg font-semibold text-foreground">Editor</div>
                </div>
                <div className="flex-1 min-h-0">
                  <ResumeEditor resumeData={resumeData} setResumeData={setResumeData} />
                </div>
              </div>
              <div className="flex min-h-[70vh] flex-col palette-card rounded-xl p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Activity className="h-4 w-4 text-primary" />
                    </div>
                    <div className="text-lg font-semibold text-foreground">Preview</div>
                  </div>
                  <div className="text-xs text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">A4 · 1 column</div>
                </div>
                <div className="flex-1 min-h-0">
                  <ResumePreview resumeData={resumeData} />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <IntegrationDashboard
                  connections={connections}
                  activities={activities}
                  isSyncing={isSyncing}
                  lastSyncTime={lastSyncTime}
                  onSync={handleSync}
                />
              </div>
              <div>
                <SyncIndicator
                  isSyncing={isSyncing}
                  lastSyncTime={lastSyncTime}
                  connectionsCount={connections.length}
                  activitiesCount={activities.length}
                  onManualSync={handleSync}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <PlatformIntegration
              onActivitySync={addBulkActivities}
              settings={settings}
              onSettingsChange={updateSettings}
            />
          </TabsContent>

          <TabsContent value="activities" className="space-y-6">
            <ActivitySync
              activities={activities}
              onActivitySelect={addSingleActivity}
              onBulkAdd={addBulkActivities}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Builder;
