import { ResumeData } from "@/types/resume";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Mail, Phone, MapPin, Linkedin, Globe, CheckCircle2, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface ResumePreviewProps {
  resumeData: ResumeData;
}

const ResumePreview = ({ resumeData }: ResumePreviewProps) => {
  const handleExport = () => {
    toast.success("Resume exported successfully!", {
      description: "Your resume has been downloaded as PDF",
    });
  };

  const normalizeUrl = (url?: string) => {
    if (!url) return "";
    const trimmed = url.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
    return `https://${trimmed}`;
  };

  return (
    <div className="space-y-4 lg:sticky lg:top-24">
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold">Live Preview</h2>
        <Button onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export PDF
        </Button>
      </div>

      <Card className="p-6 md:p-8 bg-card shadow-sm" id="resume-preview">
        {/* Header */}
        <div className="border-b pb-5 mb-5">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{resumeData.personalInfo.name}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              {resumeData.personalInfo.email}
            </div>
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              {resumeData.personalInfo.phone}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {resumeData.personalInfo.location}
            </div>
          </div>
          {(resumeData.personalInfo.linkedin || resumeData.personalInfo.portfolio) && (
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
              {resumeData.personalInfo.linkedin && (
                <div className="flex items-center gap-1">
                  <Linkedin className="h-4 w-4" />
                  {resumeData.personalInfo.linkedin}
                </div>
              )}
              {resumeData.personalInfo.portfolio && (
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  {resumeData.personalInfo.portfolio}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Summary */}
        {resumeData.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-primary">Professional Summary</h2>
            <p className="text-sm leading-relaxed">{resumeData.summary}</p>
          </div>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 text-primary">Education</h2>
            {resumeData.education.map((edu) => (
              <div key={edu.id} className="mb-3 last:mb-0">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{edu.degree}</h3>
                      {edu.verified && (
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{edu.institution}</p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="text-muted-foreground">
                      {edu.startDate} - {edu.endDate}
                    </p>
                    <p className="text-muted-foreground">{edu.location}</p>
                  </div>
                </div>
                {edu.gpa && (
                  <p className="text-sm mt-1">GPA: {edu.gpa}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Experience */}
        {resumeData.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 text-primary">Experience</h2>
            {resumeData.experience.map((exp) => (
              <div key={exp.id} className="mb-4 last:mb-0">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{exp.position}</h3>
                      {exp.verified && (
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{exp.company}</p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="text-muted-foreground">
                      {exp.startDate} - {exp.endDate}
                    </p>
                    <p className="text-muted-foreground">{exp.location}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {resumeData.projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 text-primary">Projects</h2>
            {resumeData.projects.map((project) => (
              <div key={project.id} className="mb-3 last:mb-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{project.name}</h3>
                  {project.link && (
                    <a
                      href={normalizeUrl(project.link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline"
                      title={normalizeUrl(project.link)}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
                <p className="text-sm leading-relaxed mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {(resumeData.skills.technical.length > 0 || resumeData.skills.soft.length > 0) && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 text-primary">Skills</h2>
            {resumeData.skills.technical.length > 0 && (
              <div className="mb-2">
                <h4 className="text-sm font-semibold mb-1">Technical</h4>
                <p className="text-sm">{resumeData.skills.technical.join(" • ")}</p>
              </div>
            )}
            {resumeData.skills.soft.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold mb-1">Soft Skills</h4>
                <p className="text-sm">{resumeData.skills.soft.join(" • ")}</p>
              </div>
            )}
          </div>
        )}

        {/* Achievements */}
        {resumeData.achievements.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-3 text-primary">Achievements & Certifications</h2>
            {resumeData.achievements.map((achievement) => (
              <div key={achievement.id} className="mb-2 last:mb-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm">{achievement.title}</h3>
                  {achievement.verified && (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                <p className="text-xs text-muted-foreground">{achievement.date}</p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default ResumePreview;
