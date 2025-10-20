import { ResumeData } from "@/types/resume";
import { Font, Document, Page, Text, View, Link, StyleSheet } from "@react-pdf/renderer";

// Basic fonts: React PDF has built-in fonts (Helvetica, Times, Courier)
// We'll use Helvetica to keep it simple and readable

Font.registerHyphenationCallback((word) => [word]);

const styles = StyleSheet.create({
  page: {
    paddingTop: 28,
    paddingBottom: 28,
    paddingHorizontal: 36,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#111827"
  },
  h1: { fontSize: 18, fontWeight: 700, marginBottom: 6 },
  h2: { fontSize: 12, fontWeight: 700, color: "#2563eb", marginBottom: 6 },
  row: { display: "flex", flexDirection: "row", gap: 8, flexWrap: "wrap", marginBottom: 6 },
  label: { color: "#6b7280" },
  section: { marginBottom: 12 },
  item: { marginBottom: 6 },
  small: { color: "#6b7280", fontSize: 9 },
  tag: { backgroundColor: "#f3f4f6", color: "#6b7280", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 3, fontSize: 9, marginRight: 4, marginBottom: 4 },
});

interface Props {
  data: ResumeData;
}

export const ResumePdf = ({ data }: Props) => {
  const normalizeUrl = (url?: string) => {
    if (!url) return "";
    const trimmed = url.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
    return `https://${trimmed}`;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.section}>
          <Text style={styles.h1}>{data.personalInfo.name}</Text>
          <View style={styles.row}>
            {data.personalInfo.email ? <Text>{data.personalInfo.email}</Text> : null}
            {data.personalInfo.phone ? <Text>• {data.personalInfo.phone}</Text> : null}
            {data.personalInfo.location ? <Text>• {data.personalInfo.location}</Text> : null}
          </View>
          {(data.personalInfo.linkedin || data.personalInfo.portfolio) && (
            <View style={styles.row}>
              {data.personalInfo.linkedin ? (
                <Text>
                  LinkedIn: <Link src={normalizeUrl(data.personalInfo.linkedin)}>{data.personalInfo.linkedin}</Link>
                </Text>
              ) : null}
              {data.personalInfo.portfolio ? (
                <Text>
                  • Portfolio: <Link src={normalizeUrl(data.personalInfo.portfolio)}>{data.personalInfo.portfolio}</Link>
                </Text>
              ) : null}
            </View>
          )}
        </View>

        {/* Summary */}
        {data.summary ? (
          <View style={styles.section}>
            <Text style={styles.h2}>Professional Summary</Text>
            <Text>{data.summary}</Text>
          </View>
        ) : null}

        {/* Education */}
        {data.education.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.h2}>Education</Text>
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.item}>
                <Text>
                  {edu.degree} {edu.verified ? " (Verified)" : ""}
                </Text>
                <Text style={styles.small}>{edu.institution}</Text>
                <Text style={styles.small}>
                  {edu.startDate} - {edu.endDate} • {edu.location}
                </Text>
                {edu.gpa ? <Text>GPA: {edu.gpa}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}

        {/* Experience */}
        {data.experience.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.h2}>Experience</Text>
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.item}>
                <Text>
                  {exp.position} {exp.verified ? " (Verified)" : ""}
                </Text>
                <Text style={styles.small}>{exp.company}</Text>
                <Text style={styles.small}>
                  {exp.startDate} - {exp.endDate} • {exp.location}
                </Text>
                {exp.description ? <Text>{exp.description}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}

        {/* Projects */}
        {data.projects.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.h2}>Projects</Text>
            {data.projects.map((p) => (
              <View key={p.id} style={styles.item}>
                <Text>{p.name}</Text>
                {p.description ? <Text>{p.description}</Text> : null}
                {p.technologies?.length ? (
                  <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: 2 }}>
                    {p.technologies.map((t) => (
                      <Text key={t} style={styles.tag}>{t}</Text>
                    ))}
                  </View>
                ) : null}
                {p.link ? (
                  <Text style={styles.small}>
                    <Link src={normalizeUrl(p.link)}>{normalizeUrl(p.link)}</Link>
                  </Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {/* Skills */}
        {(data.skills.technical.length > 0 || data.skills.soft.length > 0) ? (
          <View style={styles.section}>
            <Text style={styles.h2}>Skills</Text>
            {data.skills.technical.length > 0 ? (
              <Text>Technical: {data.skills.technical.join(" • ")}</Text>
            ) : null}
            {data.skills.soft.length > 0 ? (
              <Text>Soft: {data.skills.soft.join(" • ")}</Text>
            ) : null}
          </View>
        ) : null}

        {/* Achievements */}
        {data.achievements.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.h2}>Achievements & Certifications</Text>
            {data.achievements.map((a) => (
              <View key={a.id} style={styles.item}>
                <Text>
                  {a.title} {a.verified ? " (Verified)" : ""}
                </Text>
                {a.description ? <Text style={styles.small}>{a.description}</Text> : null}
                {a.date ? <Text style={styles.small}>{a.date}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}
      </Page>
    </Document>
  );
};

export default ResumePdf;


