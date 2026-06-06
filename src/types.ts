export interface SocialLinks {
  linkedin: string;
  github: string;
  portfolio: string;
}

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  photoUrl: string; // Base64 or standard URL
  socials: SocialLinks;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  startYear: string;
  endYear: string;
  description: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  responsibilities: string; // Paragraph or bulleted text
}

export interface Skill {
  id: string;
  name: string;
  level?: 'Beginner' | 'Intermediate' | 'Expert' | string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techUsed: string; // Comma separated or tags
  link: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
}

export interface Language {
  id: string;
  name: string;
  level: string; // e.g., Native, Fluent, Conversational
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
}

export type TemplateType = 'modern' | 'elegant' | 'creative';

export interface ThemeConfig {
  template: TemplateType;
  primaryColor: string;
  fontFamily: 'sans' | 'serif' | 'mono' | 'display' | 'outfit' | 'merriweather' | 'montserrat' | 'firacode';
  spacing: 'compact' | 'normal' | 'relaxed';
  fontScale: 'small' | 'medium' | 'large';
  sectionHeaderStyle: 'underline' | 'pill' | 'bordered' | 'badge-line' | 'minimal';
  skillBadgeStyle: 'flat' | 'outline' | 'pills' | 'text-dot';
  paperTheme: 'classic-light' | 'charcoal-dark' | 'cream-parchment' | 'sage-mint' | 'lavender-mist' | 'sand-warm' | 'slate-ice' | 'blush-rose' | 'nordic-spruce';
  workspaceAura: 'indigo-aurora' | 'emerald-glow' | 'sunset-radiance' | 'steel-obsidian';
}
