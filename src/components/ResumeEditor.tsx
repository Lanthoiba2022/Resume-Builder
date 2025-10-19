import { useState } from "react";
import { ResumeData } from "@/types/resume";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Briefcase, GraduationCap, Code, Award, Sparkles, Plus, Trash2 } from "lucide-react";

interface ResumeEditorProps {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
}

const ResumeEditor = ({ resumeData, setResumeData }: ResumeEditorProps) => {
  const [projectTechInput, setProjectTechInput] = useState<Record<string, string>>({});
  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData({
      ...resumeData,
      personalInfo: { ...resumeData.personalInfo, [field]: value },
    });
  };

  const genId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  const updateEducation = (id: string, field: string, value: string | boolean) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    });
  };
  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          id: genId(),
          institution: "",
          degree: "",
          location: "",
          startDate: "",
          endDate: "",
          gpa: "",
          verified: false,
        },
      ],
    });
  };
  const removeEducation = (id: string) => {
    setResumeData({ ...resumeData, education: resumeData.education.filter((e) => e.id !== id) });
  };

  const updateExperience = (id: string, field: string, value: string | boolean) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map((x) => (x.id === id ? { ...x, [field]: value } : x)),
    });
  };
  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        {
          id: genId(),
          company: "",
          position: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
          verified: false,
        },
      ],
    });
  };
  const removeExperience = (id: string) => {
    setResumeData({ ...resumeData, experience: resumeData.experience.filter((x) => x.id !== id) });
  };

  const updateProject = (id: string, field: string, value: string | boolean | string[]) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    });
  };
  const addProject = () => {
    setResumeData({
      ...resumeData,
      projects: [
        ...resumeData.projects,
        {
          id: genId(),
          name: "",
          description: "",
          technologies: [],
          link: "",
          verified: false,
        },
      ],
    });
  };
  const removeProject = (id: string) => {
    setResumeData({ ...resumeData, projects: resumeData.projects.filter((p) => p.id !== id) });
  };

  const updateAchievement = (id: string, field: string, value: string | boolean) => {
    setResumeData({
      ...resumeData,
      achievements: resumeData.achievements.map((a) => (a.id === id ? { ...a, [field]: value } : a)),
    });
  };
  const addAchievement = () => {
    setResumeData({
      ...resumeData,
      achievements: [
        ...resumeData.achievements,
        {
          id: genId(),
          title: "",
          description: "",
          date: "",
          verified: false,
        },
      ],
    });
  };
  const removeAchievement = (id: string) => {
    setResumeData({ ...resumeData, achievements: resumeData.achievements.filter((a) => a.id !== id) });
  };

  const updateSkills = (field: "technical" | "soft", value: string) => {
    const items = value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    setResumeData({ ...resumeData, skills: { ...resumeData.skills, [field]: items } });
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold mb-3 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Editor
        </h2>
        
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 gap-1">
            <TabsTrigger value="personal" className="h-8 px-2 text-[11px] md:text-xs">
              <User className="h-4 w-4 mr-1" />
              Personal
            </TabsTrigger>
            <TabsTrigger value="summary" className="h-8 px-2 text-[11px] md:text-xs">
              Summary
            </TabsTrigger>
            <TabsTrigger value="education" className="h-8 px-2 text-[11px] md:text-xs">
              <GraduationCap className="h-4 w-4 mr-1" />
              Education
            </TabsTrigger>
            <TabsTrigger value="experience" className="h-8 px-2 text-[11px] md:text-xs">
              <Briefcase className="h-4 w-4 mr-1" />
              Experience
            </TabsTrigger>
            <TabsTrigger value="projects" className="h-8 px-2 text-[11px] md:text-xs">
              <Code className="h-4 w-4 mr-1" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="skills" className="h-8 px-2 text-[11px] md:text-xs">
              Skills
            </TabsTrigger>
            <TabsTrigger value="achievements" className="h-8 px-2 text-[11px] md:text-xs">
              <Award className="h-4 w-4 mr-1" />
              Awards
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={resumeData.personalInfo.name}
                  onChange={(e) => updatePersonalInfo("name", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => updatePersonalInfo("email", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={resumeData.personalInfo.location}
                  onChange={(e) => updatePersonalInfo("location", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={resumeData.personalInfo.linkedin}
                  onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="portfolio">Portfolio</Label>
                <Input
                  id="portfolio"
                  value={resumeData.personalInfo.portfolio}
                  onChange={(e) => updatePersonalInfo("portfolio", e.target.value)}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="summary" className="space-y-4 mt-4">
            <div>
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea
                id="summary"
                value={resumeData.summary}
                onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
                rows={6}
                className="resize-none"
              />
            </div>
          </TabsContent>

          <TabsContent value="education" className="mt-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Add your education history.</p>
              <Button size="sm" onClick={addEducation}>
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
            <div className="space-y-4">
              {resumeData.education.map((edu) => (
                <Card key={edu.id} className="p-4">
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                      <Input id={`degree-${edu.id}`} value={edu.degree} onChange={(e) => updateEducation(edu.id, "degree", e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                      <Input id={`institution-${edu.id}`} value={edu.institution} onChange={(e) => updateEducation(edu.id, "institution", e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor={`location-${edu.id}`}>Location</Label>
                      <Input id={`location-${edu.id}`} value={edu.location} onChange={(e) => updateEducation(edu.id, "location", e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor={`start-${edu.id}`}>Start</Label>
                        <Input id={`start-${edu.id}`} value={edu.startDate} onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)} />
                      </div>
                      <div>
                        <Label htmlFor={`end-${edu.id}`}>End</Label>
                        <Input id={`end-${edu.id}`} value={edu.endDate} onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)} />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor={`gpa-${edu.id}`}>GPA</Label>
                      <Input id={`gpa-${edu.id}`} value={edu.gpa || ""} onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)} />
                    </div>
                    <div className="flex items-center gap-2 pt-5">
                      <Checkbox id={`verified-edu-${edu.id}`} checked={edu.verified} onCheckedChange={(v) => updateEducation(edu.id, "verified", Boolean(v))} />
                      <Label htmlFor={`verified-edu-${edu.id}`}>Verified</Label>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <Button variant="outline" size="sm" onClick={() => removeEducation(edu.id)}>
                      <Trash2 className="h-4 w-4 mr-1" /> Remove
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="experience" className="mt-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Add internships and roles.</p>
              <Button size="sm" onClick={addExperience}>
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
            <div className="space-y-4">
              {resumeData.experience.map((exp) => (
                <Card key={exp.id} className="p-4">
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor={`position-${exp.id}`}>Position</Label>
                      <Input id={`position-${exp.id}`} value={exp.position} onChange={(e) => updateExperience(exp.id, "position", e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor={`company-${exp.id}`}>Company</Label>
                      <Input id={`company-${exp.id}`} value={exp.company} onChange={(e) => updateExperience(exp.id, "company", e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor={`location-exp-${exp.id}`}>Location</Label>
                      <Input id={`location-exp-${exp.id}`} value={exp.location} onChange={(e) => updateExperience(exp.id, "location", e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor={`start-exp-${exp.id}`}>Start</Label>
                        <Input id={`start-exp-${exp.id}`} value={exp.startDate} onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)} />
                      </div>
                      <div>
                        <Label htmlFor={`end-exp-${exp.id}`}>End</Label>
                        <Input id={`end-exp-${exp.id}`} value={exp.endDate} onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)} />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor={`desc-exp-${exp.id}`}>Description</Label>
                      <Textarea id={`desc-exp-${exp.id}`} rows={4} value={exp.description} onChange={(e) => updateExperience(exp.id, "description", e.target.value)} />
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <Checkbox id={`verified-exp-${exp.id}`} checked={exp.verified} onCheckedChange={(v) => updateExperience(exp.id, "verified", Boolean(v))} />
                      <Label htmlFor={`verified-exp-${exp.id}`}>Verified</Label>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <Button variant="outline" size="sm" onClick={() => removeExperience(exp.id)}>
                      <Trash2 className="h-4 w-4 mr-1" /> Remove
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="projects" className="mt-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Showcase notable projects.</p>
              <Button size="sm" onClick={addProject}>
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
            <div className="space-y-4">
              {resumeData.projects.map((project) => (
                <Card key={project.id} className="p-4">
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor={`proj-name-${project.id}`}>Name</Label>
                      <Input id={`proj-name-${project.id}`} value={project.name} onChange={(e) => updateProject(project.id, "name", e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor={`proj-link-${project.id}`}>Link</Label>
                      <Input id={`proj-link-${project.id}`} value={project.link || ""} onChange={(e) => updateProject(project.id, "link", e.target.value)} />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor={`proj-desc-${project.id}`}>Description</Label>
                      <Textarea id={`proj-desc-${project.id}`} rows={4} value={project.description} onChange={(e) => updateProject(project.id, "description", e.target.value)} />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor={`proj-tech-${project.id}`}>Technologies (comma, newline, or ; separated)</Label>
                      <Input
                        id={`proj-tech-${project.id}`}
                        value={projectTechInput[project.id] ?? project.technologies.join(", ")}
                        onChange={(e) => {
                          const raw = e.target.value;
                          setProjectTechInput((prev) => ({ ...prev, [project.id]: raw }));
                          const list = raw
                            .split(/[\n;,]+/)
                            .map((s) => s.trim())
                            .filter((v, i, a) => (v.length === 0 ? false : a.indexOf(v) === i));
                          updateProject(project.id, "technologies", list);
                        }}
                        onBlur={() => {
                          setProjectTechInput((prev) => {
                            const next = { ...prev };
                            delete next[project.id];
                            return next;
                          });
                        }}
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <Checkbox id={`verified-proj-${project.id}`} checked={project.verified} onCheckedChange={(v) => updateProject(project.id, "verified", Boolean(v))} />
                      <Label htmlFor={`verified-proj-${project.id}`}>Verified</Label>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <Button variant="outline" size="sm" onClick={() => removeProject(project.id)}>
                      <Trash2 className="h-4 w-4 mr-1" /> Remove
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="mt-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Awards, certifications, and wins.</p>
              <Button size="sm" onClick={addAchievement}>
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
            <div className="space-y-4">
              {resumeData.achievements.map((achievement) => (
                <Card key={achievement.id} className="p-4">
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor={`ach-title-${achievement.id}`}>Title</Label>
                      <Input id={`ach-title-${achievement.id}`} value={achievement.title} onChange={(e) => updateAchievement(achievement.id, "title", e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor={`ach-date-${achievement.id}`}>Date</Label>
                      <Input id={`ach-date-${achievement.id}`} value={achievement.date} onChange={(e) => updateAchievement(achievement.id, "date", e.target.value)} />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor={`ach-desc-${achievement.id}`}>Description</Label>
                      <Textarea id={`ach-desc-${achievement.id}`} rows={3} value={achievement.description} onChange={(e) => updateAchievement(achievement.id, "description", e.target.value)} />
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <Checkbox id={`verified-ach-${achievement.id}`} checked={achievement.verified} onCheckedChange={(v) => updateAchievement(achievement.id, "verified", Boolean(v))} />
                      <Label htmlFor={`verified-ach-${achievement.id}`}>Verified</Label>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <Button variant="outline" size="sm" onClick={() => removeAchievement(achievement.id)}>
                      <Trash2 className="h-4 w-4 mr-1" /> Remove
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="skills" className="mt-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="skills-technical">Technical (comma-separated)</Label>
                <Textarea id="skills-technical" rows={3} value={resumeData.skills.technical.join(", ")} onChange={(e) => updateSkills("technical", e.target.value)} />
              </div>
              <div>
                <Label htmlFor="skills-soft">Soft skills (comma-separated)</Label>
                <Textarea id="skills-soft" rows={3} value={resumeData.skills.soft.join(", ")} onChange={(e) => updateSkills("soft", e.target.value)} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default ResumeEditor;
