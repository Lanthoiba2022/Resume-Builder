import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import NotificationCenter from "@/components/NotificationCenter";
import { FileText, Sparkles } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "success" as const,
      title: "Platform Connected",
      message: "GitHub has been successfully connected and synced",
      timestamp: new Date().toISOString(),
      read: false
    },
    {
      id: "2",
      type: "info" as const,
      title: "New Activity",
      message: "3 new activities found from Coursera",
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      read: false
    }
  ]);

  // Add new notification when platform connects
  const addNotification = (notification: typeof notifications[0]) => {
    setNotifications(prev => [notification, ...prev]);
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };
  
  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold text-xl">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
            <Sparkles className="h-4 w-4 text-primary" />
          </span>
          <span className="text-foreground">ResumeForge</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-foreground ${
              location.pathname === "/" ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <a
            href="#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </a>
          <a
            href="#faq"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            FAQ
          </a>
          <Link
            to="/builder"
            className={`text-sm font-medium transition-colors hover:text-foreground ${
              location.pathname === "/builder" ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Builder
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <NotificationCenter
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
            onMarkAllAsRead={handleMarkAllAsRead}
            onClearAll={handleClearAll}
          />
          <Link to="/builder">
            <Button size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Create Resume
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
