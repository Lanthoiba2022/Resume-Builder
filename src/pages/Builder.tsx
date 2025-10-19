import { useState } from "react";
import Navigation from "@/components/Navigation";
import ResumeEditor from "@/components/ResumeEditor";
import ResumePreview from "@/components/ResumePreview";
import { ResumeData } from "@/types/resume";

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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Resume Builder</h1>
          <p className="text-sm md:text-base text-muted-foreground">Edit details and preview your resume live.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="flex min-h-[70vh] flex-col rounded-lg border bg-card p-4 md:p-6">
            <div className="mb-4 text-sm font-medium text-muted-foreground">Editor</div>
            <div className="flex-1 min-h-0">
              <ResumeEditor resumeData={resumeData} setResumeData={setResumeData} />
            </div>
          </div>
          <div className="flex min-h-[70vh] flex-col rounded-lg border bg-card p-4 md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm font-medium text-muted-foreground">Preview</div>
              <div className="text-xs text-muted-foreground">A4 · 1 column</div>
            </div>
            <div className="flex-1 min-h-0">
              <ResumePreview resumeData={resumeData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
