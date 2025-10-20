import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import IntegrationShowcase from "@/components/IntegrationShowcase";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  Shield, 
  RefreshCw, 
  Award,
  Briefcase,
  GraduationCap,
  Code,
  Trophy
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground mb-6">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>Trusted, ATS-friendly, recruiter-approved</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Build your resume with connected platforms
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl">
              Seamlessly integrate with GitHub, LinkedIn, Coursera, and more to automatically sync your achievements, projects, and learning milestones. Build a comprehensive professional profile that updates in real-time.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link to="/builder">
                <Button size="lg" className="px-7">
                  Start building
                </Button>
              </Link>
              <a href="#features">
                <Button size="lg" variant="outline" className="px-7">
                  See features
                </Button>
              </a>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-6 text-sm text-muted-foreground">
              <div>
                <div className="font-semibold text-foreground">ATS-ready</div>
                <div>Optimized typography and spacing</div>
              </div>
              <div>
                <div className="font-semibold text-foreground">Verified entries</div>
                <div>Highlight what matters with badges</div>
              </div>
              <div>
                <div className="font-semibold text-foreground">One-click export</div>
                <div>PDF and clean print layout</div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5">
            <Card className="p-4 md:p-6">
              <div className="relative">
                <Carousel>
                  <CarouselContent>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <CarouselItem key={i} className="p-0">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-md border bg-muted">
                          <img
                            src={`/resumeSample/resume${i}.avif`}
                            alt={`Sample resume ${i}`}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
                <div className="mt-3 text-xs text-muted-foreground">
                  Real samples to inspire layout, hierarchy, and content quality.
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Platform Integration Showcase */}
      <section id="integrations" className="container mx-auto px-4 py-16">
        <IntegrationShowcase />
      </section>

      {/* Value props */}
      <section id="features" className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center mb-4">
              <RefreshCw className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Auto-sync</h3>
            <p className="text-muted-foreground">Keep experiences current without manual editing.</p>
          </Card>
          <Card className="p-6">
            <div className="h-10 w-10 rounded-md bg-success/10 flex items-center justify-center mb-4">
              <Shield className="h-5 w-5 text-success" />
            </div>
            <h3 className="text-lg font-semibold">Verified achievements</h3>
            <p className="text-muted-foreground">Badge real awards, certificates and roles.</p>
          </Card>
          <Card className="p-6">
            <div className="h-10 w-10 rounded-md bg-accent/10 flex items-center justify-center mb-4">
              <Zap className="h-5 w-5 text-accent" />
            </div>
            <h3 className="text-lg font-semibold">Instant export</h3>
            <p className="text-muted-foreground">Polished PDF in one click, print-optimized.</p>
          </Card>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6">
            <div className="text-3xl font-bold text-primary">01</div>
            <h4 className="mt-2 text-xl font-semibold">Add details</h4>
            <p className="text-muted-foreground">Import or enter your experience, education, projects, and skills.</p>
          </Card>
          <Card className="p-6">
            <div className="text-3xl font-bold text-primary">02</div>
            <h4 className="mt-2 text-xl font-semibold">Refine layout</h4>
            <p className="text-muted-foreground">Use sensible templates with proper hierarchy.</p>
          </Card>
          <Card className="p-6">
            <div className="text-3xl font-bold text-primary">03</div>
            <h4 className="mt-2 text-xl font-semibold">Export</h4>
            <p className="text-muted-foreground">Share a professional PDF that reads well everywhere.</p>
          </Card>
        </div>
      </section>

      {/* Sample resumes with pointers */}
      <section id="samples" className="container mx-auto px-4 py-16">
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Sample resumes</h2>
          <p className="mt-2 text-muted-foreground">What makes a resume stand out</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <Card key={i} className="p-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-md border bg-muted">
                <img
                  src={`/resumeSample/resume${i}.avif`}
                  alt={`Sample resume ${i}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                {/* pointer badges */}
                <div className="pointer-events-none absolute inset-0">
                  <div className="pointer-events-auto absolute left-[10%] top-[18%]">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="inline-flex items-center rounded-full bg-primary text-primary-foreground px-2 py-0.5 text-[10px] shadow">
                          Clear hierarchy
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        Strong section headers and typographic scale improve scanability.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="pointer-events-auto absolute left-[65%] top-[35%]">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="inline-flex items-center rounded-full bg-success text-success-foreground px-2 py-0.5 text-[10px] shadow">
                          Quantified wins
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        Bullets include metrics (%, x, time saved) to show impact.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="pointer-events-auto absolute left-[20%] bottom-[14%]">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="inline-flex items-center rounded-full bg-accent text-accent-foreground px-2 py-0.5 text-[10px] shadow">
                          Action verbs
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        Leads with impact words (Built, Shipped, Improved, Reduced).
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="pointer-events-auto absolute right-[8%] bottom-[10%]">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="inline-flex items-center rounded-full bg-muted text-foreground px-2 py-0.5 text-[10px] shadow">
                          ATS-friendly
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        Clean layout, standard fonts, high contrast, consistent spacing.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                Hover the badges to learn why this layout reads well to recruiters and ATS.
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>© 2025 ResumeForge</div>
          <div className="flex items-center gap-6">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#how" className="hover:text-foreground">How it works</a>
            <Link to="/builder" className="hover:text-foreground">Builder</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
