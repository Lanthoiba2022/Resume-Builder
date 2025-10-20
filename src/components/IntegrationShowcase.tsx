import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Users, 
  Award, 
  Code, 
  BookOpen, 
  Trophy,
  Activity,
  CheckCircle,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Shield,
  Clock,
  Globe
} from "lucide-react";

const IntegrationShowcase = () => {
  const platforms = [
    {
      name: "GitHub",
      icon: "🐙",
      color: "bg-gray-900",
      description: "Sync repositories, contributions, and projects",
      features: ["Repository sync", "Contribution tracking", "Project showcase"]
    },
    {
      name: "LinkedIn",
      icon: "💼",
      color: "bg-blue-600",
      description: "Import professional experience and certifications",
      features: ["Experience sync", "Certification import", "Skill verification"]
    },
    {
      name: "Coursera",
      icon: "🎓",
      color: "bg-blue-500",
      description: "Sync completed courses and certificates",
      features: ["Course completion", "Certificate tracking", "Grade import"]
    },
    {
      name: "LeetCode",
      icon: "🧮",
      color: "bg-orange-500",
      description: "Track coding achievements and contest rankings",
      features: ["Problem solving", "Contest rankings", "Skill assessment"]
    },
    {
      name: "Devpost",
      icon: "🏆",
      color: "bg-green-600",
      description: "Import hackathon wins and project submissions",
      features: ["Hackathon tracking", "Project submissions", "Award recognition"]
    },
    {
      name: "Kaggle",
      icon: "📊",
      color: "bg-purple-600",
      description: "Sync data science competitions and achievements",
      features: ["Competition tracking", "Dataset contributions", "Notebook sharing"]
    }
  ];

  const features = [
    {
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      title: "Real-time Sync",
      description: "Automatically sync activities from all connected platforms"
    },
    {
      icon: <Shield className="h-6 w-6 text-green-500" />,
      title: "Verified Activities",
      description: "Only verified achievements and activities are added to your resume"
    },
    {
      icon: <Activity className="h-6 w-6 text-blue-500" />,
      title: "Smart Categorization",
      description: "Activities are automatically categorized into projects, courses, and achievements"
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-purple-500" />,
      title: "Progress Tracking",
      description: "Track your learning journey and professional growth over time"
    }
  ];

  const stats = [
    { label: "Platforms Supported", value: "12+", icon: <Globe className="h-5 w-5" /> },
    { label: "Activity Types", value: "8+", icon: <Activity className="h-5 w-5" /> },
    { label: "Auto Sync", value: "Real-time", icon: <Clock className="h-5 w-5" /> },
    { label: "Verification", value: "100%", icon: <CheckCircle className="h-5 w-5" /> }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Connected Ecosystem</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Seamlessly integrate with your favorite platforms to automatically build and update your professional resume. 
          Every achievement, project, and learning milestone syncs in real-time.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button size="lg" className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Start Connecting
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              {stat.icon}
            </div>
            <p className="text-3xl font-bold text-primary">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Platform Grid */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Supported Platforms</h2>
          <p className="text-muted-foreground">
            Connect with your favorite platforms and let us handle the rest
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-lg ${platform.color} flex items-center justify-center text-white text-xl`}>
                  {platform.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{platform.name}</h3>
                  <p className="text-sm text-muted-foreground">{platform.description}</p>
                </div>
              </div>
              <div className="space-y-2">
                {platform.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" variant="outline">
                Connect Platform
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
          <p className="text-muted-foreground">
            Everything you need to build a comprehensive professional profile
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-muted rounded-lg">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Activity Types */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Activity Types</h2>
          <p className="text-muted-foreground">
            Track and showcase different types of professional activities
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <Code className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <h3 className="font-semibold">Projects</h3>
            <p className="text-sm text-muted-foreground">Code repositories and side projects</p>
          </Card>
          <Card className="p-4 text-center">
            <BookOpen className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <h3 className="font-semibold">Courses</h3>
            <p className="text-sm text-muted-foreground">Online learning and certifications</p>
          </Card>
          <Card className="p-4 text-center">
            <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
            <h3 className="font-semibold">Hackathons</h3>
            <p className="text-sm text-muted-foreground">Competitions and wins</p>
          </Card>
          <Card className="p-4 text-center">
            <Award className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <h3 className="font-semibold">Achievements</h3>
            <p className="text-sm text-muted-foreground">Awards and recognitions</p>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <Card className="p-8 text-center bg-gradient-to-r from-primary/10 to-primary/5">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join thousands of professionals who are already using our platform integration 
          to build better resumes and showcase their achievements.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button size="lg" className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Connect Your First Platform
          </Button>
          <Button variant="outline" size="lg">
            View Demo
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default IntegrationShowcase;
