import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Sparkles } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
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
