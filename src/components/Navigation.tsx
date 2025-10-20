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
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 font-bold text-xl group">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg group-hover:scale-110 transition-all duration-300">
            <Sparkles className="h-6 w-6 text-white" />
          </span>
          <span className="font-extrabold tracking-tight transition-colors duration-300">
            <span className="palette-gradient-text"> Resume Forge</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`text-sm font-medium transition-all duration-300 hover:text-indigo-600 hover:scale-105 relative ${
              location.pathname === "/" ? "text-indigo-600" : "text-gray-700"
            }`}
          >
            Home
            {location.pathname === "/" && (
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
            )}
          </Link>
          <a
            href="#features"
            className="text-sm font-medium text-gray-700 transition-all duration-300 hover:text-indigo-600 hover:scale-105"
          >
            Features
          </a>
          <a
            href="#integrations"
            className="text-sm font-medium text-gray-700 transition-all duration-300 hover:text-indigo-600 hover:scale-105"
          >
            Integrations
          </a>
          <Link
            to="/builder"
            className={`text-sm font-medium transition-all duration-300 hover:text-indigo-600 hover:scale-105 relative ${
              location.pathname === "/builder" ? "text-indigo-600" : "text-gray-700"
            }`}
          >
            Builder
            {location.pathname === "/builder" && (
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
            )}
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <NotificationCenter
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
            onMarkAllAsRead={handleMarkAllAsRead}
            onClearAll={handleClearAll}
          />
          <Link to="/builder">
            <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group border-0">
              <FileText className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              Create Resume
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
