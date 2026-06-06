import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';
import { ResumeData, ThemeConfig } from '../types';

interface ResumePreviewProps {
  data: ResumeData;
  themeConfig: ThemeConfig;
}

export default function ResumePreview({ data, themeConfig }: ResumePreviewProps) {
  const { personalInfo, education, experience, skills, projects, certifications, languages } = data;
  const { 
    template, 
    primaryColor, 
    fontFamily = 'sans', 
    spacing = 'normal',
    fontScale = 'medium',
    sectionHeaderStyle = 'underline',
    skillBadgeStyle = 'flat',
    paperTheme = 'classic-light',
    workspaceAura = 'indigo-aurora'
  } = themeConfig;

  // Paper color themes presets definitions
  const paperThemeStyles = {
    'classic-light': {
      bg: 'bg-white text-slate-800 print:bg-white print:text-black',
      titleText: 'text-slate-900 print:text-black',
      bodyText: 'text-slate-700 dark:text-slate-700 print:text-black',
      subText: 'text-slate-500 print:text-slate-700',
      skillBg: 'bg-slate-100/70 dark:bg-slate-100/70 border-slate-200/80',
      sectionBorder: 'border-slate-200/80',
      sidebarBg: 'bg-slate-50/50 dark:bg-slate-900/10'
    },
    'charcoal-dark': {
      bg: 'bg-[#12141c] text-[#f1f5f9] border-[#222530] print:bg-white print:text-black dark:text-[#f1f5f9]',
      titleText: 'text-white print:text-black dark:text-white',
      bodyText: 'text-slate-300 dark:text-slate-150 print:text-black',
      subText: 'text-slate-400 dark:text-slate-450 print:text-slate-700',
      skillBg: 'bg-[#1a1c26] dark:bg-[#1a1c26] border-[#2e3245]',
      sectionBorder: 'border-[#2d3040]',
      sidebarBg: 'bg-[#181c25]'
    },
    'cream-parchment': {
      bg: 'bg-[#fbf7eb] text-[#332211] border-[#ebdcb9] print:bg-white print:text-black dark:text-[#332211]',
      titleText: 'text-[#201002] print:text-black dark:text-[#201002]',
      bodyText: 'text-[#4d3a29] dark:text-[#4d3a25] print:text-black',
      subText: 'text-[#7d6854] dark:text-[#7d6854] print:text-slate-700',
      skillBg: 'bg-[#f4ebe0] dark:bg-[#f4ebe0] border-[#ebdcb9]',
      sectionBorder: 'border-[#e4d4ae]',
      sidebarBg: 'bg-[#f4ebd0]/30'
    },
    'sage-mint': {
      bg: 'bg-[#f1f6f4] text-[#1c2e24] border-[#cfded5] print:bg-white print:text-black dark:text-[#1c2e24]',
      titleText: 'text-[#0f1f17] print:text-black dark:text-[#0f1f17]',
      bodyText: 'text-[#2d3f35] dark:text-[#2d3f35] print:text-black',
      subText: 'text-[#4d6155] dark:text-[#4d6155] print:text-slate-705',
      skillBg: 'bg-[#e6eeea] dark:bg-[#e6eeea] border-[#d2dfd8]',
      sectionBorder: 'border-[#cfe0d5]',
      sidebarBg: 'bg-[#e9f0eb]/40'
    },
    'lavender-mist': {
      bg: 'bg-[#f4f3f9] text-[#241a3c] border-[#d7d2ea] print:bg-white print:text-black dark:text-[#241a3c]',
      titleText: 'text-[#150a29] print:text-black dark:text-[#150a29]',
      bodyText: 'text-[#382d54] dark:text-[#382d54] print:text-black',
      subText: 'text-[#5e537d] dark:text-[#5e537d] print:text-slate-705',
      skillBg: 'bg-[#eae8f3] dark:bg-[#eae8f3] border-[#dad6eb]',
      sectionBorder: 'border-[#d3cee8]',
      sidebarBg: 'bg-[#eceaf2]/40'
    },
    'sand-warm': {
      bg: 'bg-[#faf7f2] text-[#3e2c1c] border-[#ebdcc4] print:bg-white print:text-black dark:text-[#3e2c1c]',
      titleText: 'text-[#281c10] print:text-black dark:text-[#281c10]',
      bodyText: 'text-[#574332] dark:text-[#574332] print:text-black',
      subText: 'text-[#826d5b] dark:text-[#826d5b] print:text-slate-705',
      skillBg: 'bg-[#f2ebe0] dark:bg-[#f2ebe0] border-[#e3d5c1]',
      sectionBorder: 'border-[#dfcca9]',
      sidebarBg: 'bg-[#f4efe5]/45'
    },
    'slate-ice': {
      bg: 'bg-[#f0f4f8] text-[#1e293b] border-[#cbd5e1] print:bg-white print:text-black dark:text-[#1e293b]',
      titleText: 'text-[#0f172a] print:text-black dark:text-[#0f172a]',
      bodyText: 'text-[#334155] dark:text-[#334155] print:text-black',
      subText: 'text-[#64748b] dark:text-[#64748b] print:text-slate-700',
      skillBg: 'bg-[#e2e8f0] dark:bg-[#e2e8f0] border-[#cbd5e1]',
      sectionBorder: 'border-[#cbd5e1]',
      sidebarBg: 'bg-[#cbd5e1]/30'
    },
    'blush-rose': {
      bg: 'bg-[#faf5f5] text-[#4c2d2d] border-[#ebdada] print:bg-white print:text-black dark:text-[#4c2d2d]',
      titleText: 'text-[#2d1212] print:text-black dark:text-[#2d1212]',
      bodyText: 'text-[#5c3a3a] dark:text-[#5c3a3a] print:text-black',
      subText: 'text-[#8c6b6b] dark:text-[#8c6b6b] print:text-slate-700',
      skillBg: 'bg-[#f2e6e6] dark:bg-[#f2e6e6] border-[#ebdada]',
      sectionBorder: 'border-[#e3caca]',
      sidebarBg: 'bg-[#f2e6e6]/40'
    },
    'nordic-spruce': {
      bg: 'bg-[#152520] text-[#f1f5f9] border-[#203a30] print:bg-white print:text-black dark:text-[#f1f5f9]',
      titleText: 'text-white print:text-black dark:text-white',
      bodyText: 'text-[#cbd5e1] dark:text-[#cbd5e1] print:text-black',
      subText: 'text-[#94a3b8] dark:text-[#94a3b8] print:text-slate-700',
      skillBg: 'bg-[#1e332c] dark:bg-[#1e332c] border-[#27443a]',
      sectionBorder: 'border-[#1b3028]',
      sidebarBg: 'bg-[#0f1b17]'
    }
  };

  const activeTheme = paperThemeStyles[paperTheme as keyof typeof paperThemeStyles] || paperThemeStyles['classic-light'];

  // Font Scale Mappings (applied to body copies)
  const fontScaleClasses = {
    small: 'text-[11px] leading-normal',
    medium: 'text-xs leading-relaxed',
    large: 'text-sm leading-relaxed',
  };

  const getFontSize = (sizeKey: 'h1' | 'xl' | 'h2' | 'h3' | 'base' | 'sm' | 'xs' | 'p10' | 'p9') => {
    const scaleMap = {
      small: {
        h1: 'text-2xl sm:text-2xl print:text-2xl',
        xl: 'text-lg sm:text-lg print:text-lg',
        h2: 'text-sm sm:text-sm print:text-sm',
        h3: 'text-xs sm:text-xs print:text-xs',
        base: 'text-xs sm:text-xs print:text-xs',
        sm: 'text-[11.5px] sm:text-[11.5px] print:text-[11.5px]',
        xs: 'text-[10.5px] sm:text-[10.5px] print:text-[10.5px]',
        p10: 'text-[9.5px] sm:text-[9.5px] print:text-[9.5px]',
        p9: 'text-[8.5px] sm:text-[8.5px] print:text-[8.5px]',
      },
      medium: {
        h1: 'text-3xl sm:text-3xl print:text-3xl',
        xl: 'text-xl sm:text-xl print:text-xl',
        h2: 'text-base sm:text-base print:text-base',
        h3: 'text-sm sm:text-sm print:text-sm',
        base: 'text-sm sm:text-sm print:text-sm',
        sm: 'text-xs sm:text-xs print:text-xs',
        xs: 'text-[11px] sm:text-[11px] print:text-[11px]',
        p10: 'text-[10px] sm:text-[10px] print:text-[10px]',
        p9: 'text-[9px] sm:text-[9px] print:text-[9px]',
      },
      large: {
        h1: 'text-4xl sm:text-4xl print:text-4xl',
        xl: 'text-2xl sm:text-2xl print:text-2xl',
        h2: 'text-lg sm:text-lg print:text-lg',
        h3: 'text-base sm:text-base print:text-base',
        base: 'text-base sm:text-base print:text-base',
        sm: 'text-sm sm:text-sm print:text-sm',
        xs: 'text-xs sm:text-xs print:text-xs',
        p10: 'text-[11.5px] sm:text-[11.5px] print:text-[11.5px]',
        p9: 'text-[10.5px] sm:text-[10.5px] print:text-[10.5px]',
      }
    };
    return scaleMap[fontScale as keyof typeof scaleMap] ? scaleMap[fontScale as keyof typeof scaleMap][sizeKey] : scaleMap['medium'][sizeKey];
  };

  // Font family mapping
  const fontStyles = {
    sans: 'font-sans',
    serif: 'font-serif',
    mono: 'font-mono',
    display: 'font-display',
    outfit: 'font-outfit',
    merriweather: 'font-merriweather',
    montserrat: 'font-montserrat',
    firacode: 'font-firacode',
  };

  // Spacing densities mapping (focuses purely on padding density and layout boundaries)
  const spacingClasses = {
    compact: 'p-4 gap-3 text-[11px] leading-tight',
    normal: 'p-8 gap-5 text-xs leading-normal',
    relaxed: 'p-12 gap-7 text-sm leading-relaxed',
  };

  const sectionSpacingClasses = {
    compact: 'mt-2 mb-2 pb-1',
    normal: 'mt-4 mb-4 pb-1.5 border-b',
    relaxed: 'mt-6 mb-6 pb-2.5 border-b-2',
  };

  // Primary color helper styles
  const primaryTextColor = { color: primaryColor };
  const primaryBgColor = { backgroundColor: primaryColor };
  const primaryBorderColor = { borderColor: primaryColor };

  // Render Custom Section Headers dynamically
  const renderSectionHeader = (title: string) => {
    switch (sectionHeaderStyle) {
      case 'pill':
        return (
          <div className="flex items-center gap-2 mb-2 print-avoid-break">
            <div className="w-1.5 h-6 rounded-sm" style={primaryBgColor} />
            <span className={`${getFontSize('sm')} font-extrabold uppercase tracking-widest px-3 py-1 rounded-md`} style={{ backgroundColor: `${primaryColor}15`, color: primaryColor, borderLeft: `3px solid ${primaryColor}` }}>
              {title}
            </span>
          </div>
        );
      case 'bordered':
        return (
          <div className="border-t border-b py-1.5 mb-2.5 print-avoid-break" style={primaryBorderColor}>
            <h2 className={`${getFontSize('sm')} font-extrabold uppercase tracking-widest text-center`} style={primaryTextColor}>
              {title}
            </h2>
          </div>
        );
      case 'badge-line':
        return (
          <div className="flex items-center gap-3 mb-2 border-l-4 pl-3 print-avoid-break" style={primaryBorderColor}>
            <h2 className={`${getFontSize('h3')} font-extrabold uppercase tracking-wider`} style={primaryTextColor}>
              {title}
            </h2>
            <div className="flex-grow h-[1px] bg-slate-200/50 dark:bg-slate-800/20" />
          </div>
        );
      case 'minimal':
        return (
          <div className="mb-2 print-avoid-break">
            <h2 className={`${getFontSize('h3')} font-bold uppercase tracking-wider`} style={primaryTextColor}>
              {title}
            </h2>
          </div>
        );
      case 'underline':
      default:
        return (
          <div className="border-b pb-1 mb-2.5 print-avoid-break" style={primaryBorderColor}>
            <h2 className={`${getFontSize('h3')} font-extrabold uppercase tracking-wider`} style={primaryTextColor}>
              {title}
            </h2>
          </div>
        );
    }
  };

  // Render Custom Skill badging dynamically
  const renderSkillBadges = (skillsList: typeof skills) => {
    if (!skillsList || skillsList.length === 0) return null;

    if (skillBadgeStyle === 'outline') {
      return (
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {skillsList.map((skill) => (
            <span 
              key={skill.id} 
              className={`px-2 py-0.5 ${getFontSize('p10')} font-semibold rounded border bg-transparent`}
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              {skill.name} {skill.level && <span className={`${getFontSize('p9')} opacity-75`}>({skill.level})</span>}
            </span>
          ))}
        </div>
      );
    }

    if (skillBadgeStyle === 'pills') {
      return (
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {skillsList.map((skill) => (
            <span 
              key={skill.id} 
              className={`px-3 py-1 ${getFontSize('xs')} font-bold uppercase tracking-wide rounded-full border border-transparent`}
              style={{ backgroundColor: `${primaryColor}18`, color: primaryColor }}
            >
              {skill.name} {skill.level && <span className={`${getFontSize('p9')} opacity-80 pl-1 font-mono`}>({skill.level.slice(0, 3)})</span>}
            </span>
          ))}
        </div>
      );
    }

    if (skillBadgeStyle === 'text-dot') {
      return (
        <div className={`flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-2 ${getFontSize('xs')} font-semibold`}>
          {skillsList.map((skill, i) => (
            <span key={skill.id} className={`inline-flex items-center gap-1 ${getFontSize('xs')}`}>
              {i > 0 && <span className="w-1 h-1 rounded-full inline-block" style={primaryBgColor} />}
              <span className={activeTheme.titleText}>{skill.name}</span>
              {skill.level && <span className={`${getFontSize('p9')} opacity-60`}>({skill.level})</span>}
            </span>
          ))}
        </div>
      );
    }

    // Default: 'flat'
    return (
      <div className="flex flex-wrap gap-1.5 mt-2.5">
        {skillsList.map((skill) => (
          <span 
            key={skill.id} 
            className={`px-2.5 py-1 ${getFontSize('p10')} font-semibold rounded-md border ${activeTheme.skillBg} ${activeTheme.bodyText}`}
          >
            {skill.name} {skill.level && <span className={`${getFontSize('p9')} opacity-75 font-mono`}>({skill.level})</span>}
          </span>
        ))}
      </div>
    );
  };

  // Helper description renderer with custom body colors and font scales
  const renderFormattedDescription = (text: string) => {
    if (!text) return null;
    const lines = text.split('\n');
    return (
      <ul className={`list-disc pl-4 space-y-1 mt-1 ${activeTheme.bodyText}`}>
        {lines.map((line, i) => {
          const cleanLine = line.trim().replace(/^-\s*/, '');
          if (!cleanLine) return null;
          return <li key={i} className={`font-sans ${getFontSize('xs')}`}>{cleanLine}</li>;
        })}
      </ul>
    );
  };

  const isDataEmpty = !personalInfo.fullName && !personalInfo.jobTitle && education.length === 0 && experience.length === 0;

  if (isDataEmpty) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-lg min-h-[600px] border-dashed">
        <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 mb-4 border border-slate-100 dark:border-slate-800">
          <Mail className="w-6 h-6" />
        </div>
        <h4 className="font-display font-semibold text-slate-700 dark:text-slate-200 text-lg mb-1">Live Resume Preview</h4>
        <p className="text-sm text-slate-400 dark:text-slate-500 max-w-sm leading-relaxed">
          Start writing your personal details, experience, or populate sample data to see a beautiful real-time rendering.
        </p>
      </div>
    );
  }

  /* =========================================================
     TEMPLATE 1: MODERN MINIMAL
     ========================================================= */
  const renderModernTemplate = () => (
    <div className={`print-page ${fontStyles[fontFamily]} ${spacingClasses[spacing]} ${activeTheme.bg} h-full flex flex-col`} style={{ overflowWrap: 'break-word' }}>
      {/* Header section with top-level name and summary */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-grow flex gap-4 items-center">
          {personalInfo.photoUrl && (
            <img 
              src={personalInfo.photoUrl} 
              alt={personalInfo.fullName} 
              className="w-16 h-16 rounded-full object-cover border border-slate-200"
              referrerPolicy="no-referrer"
            />
          )}
          <div>
            <h1 className={`${getFontSize('h1')} font-extrabold tracking-tight`} style={primaryTextColor}>{personalInfo.fullName || 'Your Name'}</h1>
            <p className={`${getFontSize('base')} font-semibold mt-0.5`} style={primaryTextColor}>{personalInfo.jobTitle || 'Your Preferred Role'}</p>
          </div>
        </div>

        {/* Contact list icons inline right side */}
        <div className={`flex flex-wrap gap-x-4 gap-y-1.5 md:text-right ${getFontSize('xs')} ${activeTheme.subText}`}>
          {personalInfo.email && (
            <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{personalInfo.email}</span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{personalInfo.phone}</span>
          )}
          {personalInfo.address && (
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{personalInfo.address}</span>
          )}
        </div>
      </div>

      {personalInfo.summary && (
        <p className={`mt-4 ${getFontSize('xs')} leading-relaxed italic max-w-4xl border-l-2 pl-3 ${activeTheme.bodyText}`} style={primaryBorderColor}>
          {personalInfo.summary}
        </p>
      )}

      {/* Grid structure below summary */}
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${sectionSpacingClasses[spacing]}`}>
        {/* Main large area representing professional experience */}
        <div className="md:col-span-2 flex flex-col gap-5">
          {/* EXPERIENCE */}
          {experience.length > 0 && (
            <div className="print-avoid-break">
              {renderSectionHeader("Work Experience")}
              <div className="mt-3 flex flex-col gap-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="flex flex-col gap-0.5 print-avoid-break">
                    <div className="flex justify-between items-center flex-wrap">
                      <h3 className={`font-bold ${getFontSize('sm')} ${activeTheme.titleText}`}>{exp.role} @ <span style={primaryTextColor} className="font-semibold">{exp.company}</span></h3>
                      <span className={`${getFontSize('p10')} font-mono ${activeTheme.subText}`}>{exp.startDate} - {exp.endDate || 'Present'}</span>
                    </div>
                    {renderFormattedDescription(exp.responsibilities)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROJECTS */}
          {projects.length > 0 && (
            <div className="print-avoid-break">
              {renderSectionHeader("Projects")}
              <div className="mt-3 flex flex-col gap-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="flex flex-col gap-1 print-avoid-break">
                    <div className="flex justify-between items-center">
                      <h3 className={`font-bold ${getFontSize('sm')} flex items-center gap-1 ${activeTheme.titleText}`}>
                        {proj.title}
                        {proj.link && <span className={`${getFontSize('p10')} font-mono font-medium ${activeTheme.subText}`}>({proj.link})</span>}
                      </h3>
                    </div>
                    {proj.techUsed && (
                      <p className={`${getFontSize('p10')} font-bold`} style={primaryTextColor}>Stack: {proj.techUsed}</p>
                    )}
                    <p className={` ${getFontSize('xs')} ${activeTheme.bodyText}`}>{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar panels representing education, skills, certs */}
        <div className="flex flex-col gap-5">
          {/* EDUCATION */}
          {education.length > 0 && (
            <div className="print-avoid-break">
              {renderSectionHeader("Education")}
              <div className="mt-3 flex flex-col gap-3">
                {education.map((edu) => (
                  <div key={edu.id} className="flex flex-col gap-0.5">
                    <h3 className={`font-bold ${getFontSize('xs')} ${activeTheme.titleText}`}>{edu.degree}</h3>
                    <p className={`${getFontSize('xs')} font-semibold ${activeTheme.subText}`}>{edu.school}</p>
                    <span className={`${getFontSize('p10')} font-mono ${activeTheme.subText}`}>{edu.startYear} - {edu.endYear || 'Present'}</span>
                    {edu.description && <p className={`${getFontSize('p10')} italic mt-0.5 ${activeTheme.bodyText}`}>{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SKILLS */}
          {skills.length > 0 && (
            <div className="print-avoid-break">
              {renderSectionHeader("Skills")}
              {renderSkillBadges(skills)}
            </div>
          )}

          {/* CERTIFICATIONS */}
          {certifications.length > 0 && (
            <div className="print-avoid-break">
              {renderSectionHeader("Certifications")}
              <div className="mt-3 flex flex-col gap-2">
                {certifications.map((c) => (
                  <div key={c.id} className={`${getFontSize('xs')} leading-normal`}>
                    <p className={`font-semibold ${activeTheme.titleText}`}>{c.title}</p>
                    <p className={`${getFontSize('p10')} ${activeTheme.subText}`}>{c.issuer} • {c.year}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LANGUAGES */}
          {languages.length > 0 && (
            <div className="print-avoid-break">
              {renderSectionHeader("Languages")}
              <div className="mt-3 flex flex-col gap-1.5">
                {languages.map((l) => (
                  <div key={l.id} className={`flex justify-between items-center ${getFontSize('xs')}`}>
                    <span className={`font-semibold ${activeTheme.titleText}`}>{l.name}</span>
                    <span className={`${getFontSize('p10')} font-mono ${activeTheme.subText}`}>{l.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SOCIAL LINKS */}
          {Object.values(personalInfo.socials).some(Boolean) && (
            <div className={`print-avoid-break border-t pt-4 ${activeTheme.sectionBorder}`}>
              <h2 className={`${getFontSize('xs')} font-bold uppercase tracking-wider mb-2 ${activeTheme.subText}`}>Connect</h2>
              <div className={`flex flex-col gap-1 ${getFontSize('p10')} font-mono ${activeTheme.subText}`}>
                {personalInfo.socials.linkedin && (
                  <span className="flex items-center gap-1.5"><Linkedin className="w-3.5 h-3.5" />{personalInfo.socials.linkedin}</span>
                )}
                {personalInfo.socials.github && (
                  <span className="flex items-center gap-1.5"><Github className="w-3.5 h-3.5" />{personalInfo.socials.github}</span>
                )}
                {personalInfo.socials.portfolio && (
                  <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" />{personalInfo.socials.portfolio}</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  /* =========================================================
     TEMPLATE 2: ELEGANT PROFESSIONAL
     ========================================================= */
  const renderElegantTemplate = () => (
    <div className={`print-page ${fontStyles[fontFamily]} ${spacingClasses[spacing]} ${activeTheme.bg} h-full flex flex-col items-center`} style={{ overflowWrap: 'break-word' }}>
      
      {/* Centered Professional Header */}
      <div className={`text-center w-full pb-4 border-b-2 ${activeTheme.sectionBorder}`} style={primaryBorderColor}>
        <h1 className={`${getFontSize('h1')} font-bold tracking-wide`} style={primaryTextColor}>{personalInfo.fullName || 'Your Name'}</h1>
        <p className={`${getFontSize('sm')} tracking-widest uppercase mt-1 ${activeTheme.subText}`}>{personalInfo.jobTitle || 'Your Preferred Role'}</p>
        
        {/* Contact panel center block */}
        <div className={`flex flex-wrap justify-center gap-x-6 gap-y-1.5 mt-3 ${getFontSize('xs')} ${activeTheme.subText}`}>
          {personalInfo.email && (
            <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-400" />{personalInfo.email}</span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-slate-400" />{personalInfo.phone}</span>
          )}
          {personalInfo.address && (
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-400" />{personalInfo.address}</span>
          )}
          {personalInfo.socials.linkedin && (
            <span className="flex items-center gap-1"><Linkedin className="w-3 h-3 text-slate-400" />{personalInfo.socials.linkedin}</span>
          )}
          {personalInfo.socials.github && (
            <span className="flex items-center gap-1"><Github className="w-3 h-3 text-slate-400" />{personalInfo.socials.github}</span>
          )}
        </div>
      </div>

      {personalInfo.summary && (
        <p className={`mt-4 ${getFontSize('xs')} leading-relaxed text-center italic max-w-3xl ${activeTheme.bodyText}`}>
          "{personalInfo.summary}"
        </p>
      )}

      {/* Main Single Column Flow (Very traditional, readable, and highly preferred by executive recruiters) */}
      <div className="w-full flex flex-col gap-5 mt-4">
        
        {/* WORK EXPERIENCE */}
        {experience.length > 0 && (
          <div className="print-avoid-break">
            {renderSectionHeader("Professional Work History")}
            <div className="mt-3 flex flex-col gap-4">
              {experience.map((exp) => (
                <div key={exp.id} className="flex flex-col gap-1 print-avoid-break">
                  <div className="flex justify-between items-baseline flex-wrap">
                    <div>
                      <span className={`font-bold ${getFontSize('sm')} ${activeTheme.titleText}`}>{exp.role}</span>
                      <span className={`font-semibold ${getFontSize('xs')}`} style={primaryTextColor}> • {exp.company}</span>
                    </div>
                    <span className={`${getFontSize('p10')} font-mono ${activeTheme.subText}`}>{exp.startDate} – {exp.endDate || 'Present'}</span>
                  </div>
                  {renderFormattedDescription(exp.responsibilities)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROJECTS */}
        {projects.length > 0 && (
          <div className="print-avoid-break">
            {renderSectionHeader("Significant Projects")}
            <div className="mt-3 flex flex-col gap-4">
              {projects.map((proj) => (
                <div key={proj.id} className="flex flex-col gap-0.5 print-avoid-break">
                  <div className="flex justify-between items-baseline">
                    <h3 className={`font-bold ${getFontSize('sm')} ${activeTheme.titleText}`}>{proj.title}</h3>
                    {proj.link && <span className={`${getFontSize('p10')} font-mono italic ${activeTheme.subText}`}>{proj.link}</span>}
                  </div>
                  {proj.techUsed && (
                    <span className={`${getFontSize('p10')} tracking-wide text-indigo-650 dark:text-indigo-400 uppercase font-bold`}>Tech: {proj.techUsed}</span>
                  )}
                  <p className={`${getFontSize('xs')} leading-relaxed mt-1 ${activeTheme.bodyText}`}>{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EDUCATION & ACADEMICS */}
        {education.length > 0 && (
          <div className="print-avoid-break">
            {renderSectionHeader("Education & Qualifications")}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex flex-col gap-0.5">
                  <div className="flex justify-between items-baseline">
                    <h3 className={`font-bold ${getFontSize('xs')} ${activeTheme.titleText}`}>{edu.degree}</h3>
                    <span className={`${getFontSize('p10')} font-mono ${activeTheme.subText}`}>{edu.startYear} – {edu.endYear || 'Present'}</span>
                  </div>
                  <p className={`${getFontSize('xs')} font-semibold ${activeTheme.subText}`}>{edu.school}</p>
                  {edu.description && <p className={`${getFontSize('p10')} italic mt-0.5 ${activeTheme.bodyText}`}>{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GRID: Skills, Language, Certifications */}
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 border-t ${activeTheme.sectionBorder}`}>
          {/* SKILLS COLUMN */}
          {skills.length > 0 && (
            <div className="print-avoid-break">
              <h3 className={`${getFontSize('p10')} font-bold uppercase tracking-widest mb-2 ${activeTheme.subText}`}>Core Proficiencies</h3>
              {renderSkillBadges(skills)}
            </div>
          )}

          {/* CERTIFICATIONS COLUMN */}
          {certifications.length > 0 && (
            <div className="print-avoid-break">
              <h3 className={`${getFontSize('p10')} font-bold uppercase tracking-widest mb-2 ${activeTheme.subText}`}>Credentials</h3>
              <div className="flex flex-col gap-2">
                {certifications.map((c) => (
                  <div key={c.id} className={`${getFontSize('p10')} leading-normal`}>
                    <p className={`font-semibold leading-tight ${activeTheme.titleText}`}>{c.title}</p>
                    <p className={`${getFontSize('p9')} ${activeTheme.subText}`}>{c.issuer} ({c.year})</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LANGUAGES */}
          {languages.length > 0 && (
            <div className="print-avoid-break">
              <h3 className={`${getFontSize('p10')} font-bold uppercase tracking-widest mb-2 ${activeTheme.subText}`}>Languages</h3>
              <div className="flex flex-col gap-1.5">
                {languages.map((l) => (
                  <div key={l.id} className={`flex justify-between items-center ${getFontSize('p10')}`}>
                    <span className={`font-semibold ${activeTheme.titleText}`}>{l.name}</span>
                    <span className={`font-mono ${getFontSize('p9')} ${activeTheme.subText}`}>{l.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );

  /* =========================================================
     TEMPLATE 3: CREATIVE SIDEBAR
     ========================================================= */
  const renderCreativeTemplate = () => (
    <div className={`print-page ${fontStyles[fontFamily]} ${activeTheme.bg} h-full flex flex-col md:flex-row gap-0`} style={{ overflowWrap: 'break-word', minHeight: '297mm' }}>
      
      {/* Side column: background tinted, customized profile and contact */ }
      <div className={`w-full md:w-[260px] md:min-w-[260px] p-6 flex flex-col gap-5 border-r ${activeTheme.sectionBorder} ${activeTheme.sidebarBg || 'bg-slate-50/50 dark:bg-slate-900/10'} print-avoid-break`} style={{ minHeight: '100%' }}>
        {/* Avatar Headshot */}
        {personalInfo.photoUrl ? (
          <div className="relative mx-auto w-24 h-24 rounded-full overflow-hidden border-2 shadow-sm" style={primaryBorderColor}>
            <img 
              src={personalInfo.photoUrl} 
              alt={personalInfo.fullName} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        ) : (
          <div className="mx-auto w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400 font-bold uppercase text-lg">
            {personalInfo.fullName ? personalInfo.fullName.slice(0, 2) : 'CV'}
          </div>
        )}

        <div className="text-center">
          <h1 className={`${getFontSize('xl')} font-extrabold tracking-tight`} style={primaryTextColor}>{personalInfo.fullName || 'Your Name'}</h1>
          <p className={`${getFontSize('xs')} font-semibold mt-1 ${activeTheme.subText}`}>{personalInfo.jobTitle || 'Your Preferred Role'}</p>
        </div>

        {/* Contact Links Stack */}
        <div className={`flex flex-col gap-2.5 pt-4 border-t ${getFontSize('xs')} ${activeTheme.sectionBorder}`}>
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Contact Details</h3>
          
          {personalInfo.email && (
            <span className={`flex items-center gap-2 ${activeTheme.bodyText}`}>
              <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span className="truncate">{personalInfo.email}</span>
            </span>
          )}
          {personalInfo.phone && (
            <span className={`flex items-center gap-2 ${activeTheme.bodyText}`}>
              <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span>{personalInfo.phone}</span>
            </span>
          )}
          {personalInfo.address && (
            <span className={`flex items-center gap-2 ${activeTheme.bodyText}`}>
              <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span>{personalInfo.address}</span>
            </span>
          )}
        </div>

        {/* Social Links Stack */}
        {Object.values(personalInfo.socials).some(Boolean) && (
          <div className={`flex flex-col gap-2.5 pt-4 border-t ${getFontSize('xs')} ${activeTheme.sectionBorder}`}>
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Social Portals</h3>
            
            {personalInfo.socials.linkedin && (
              <span className={`flex items-center gap-2 ${activeTheme.bodyText}`}>
                <Linkedin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span className="truncate">{personalInfo.socials.linkedin}</span>
              </span>
            )}
            {personalInfo.socials.github && (
              <span className={`flex items-center gap-2 ${activeTheme.bodyText}`}>
                <Github className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span className="truncate">{personalInfo.socials.github}</span>
              </span>
            )}
            {personalInfo.socials.portfolio && (
              <span className={`flex items-center gap-2 ${activeTheme.bodyText}`}>
                <Globe className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span className="truncate">{personalInfo.socials.portfolio}</span>
              </span>
            )}
          </div>
        )}

        {/* SKILLS */}
        {skills.length > 0 && (
          <div className={`flex flex-col gap-2 pt-4 border-t ${activeTheme.sectionBorder}`}>
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Expertise</h3>
            {renderSkillBadges(skills)}
          </div>
        )}

        {/* LANGUAGES */}
        {languages.length > 0 && (
          <div className={`flex flex-col gap-2.5 pt-4 border-t ${getFontSize('xs')} ${activeTheme.sectionBorder}`}>
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Languages</h3>
            {languages.map((l) => (
              <div key={l.id} className="flex justify-between items-center">
                <span className={`font-semibold ${activeTheme.titleText}`}>{l.name}</span>
                <span className={`${getFontSize('p10')} font-mono ${activeTheme.subText}`}>{l.level}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Column: Hold Experiences and academic blocks */}
      <div className={`w-full md:flex-1 md:min-w-0 ${spacingClasses[spacing]} flex flex-col gap-6`}>
        {personalInfo.summary && (
          <div className="print-avoid-break">
            {renderSectionHeader("Executive Profile")}
            <p className={`mt-2 ${getFontSize('xs')} leading-relaxed ${activeTheme.bodyText}`}>
              {personalInfo.summary}
            </p>
          </div>
        )}

        {/* WORK EXPERIENCE */}
        {experience.length > 0 && (
          <div className="print-avoid-break">
            {renderSectionHeader("Work Experience")}
            <div className="mt-3 flex flex-col gap-4">
              {experience.map((exp) => (
                <div key={exp.id} className="flex flex-col gap-0.5 print-avoid-break">
                  <div className="flex justify-between items-center flex-wrap">
                    <h3 className={`font-bold ${getFontSize('xs')} sm:${getFontSize('sm')} ${activeTheme.titleText}`}>{exp.role}</h3>
                    <span className={`${getFontSize('p10')} font-mono ${activeTheme.subText}`}>{exp.startDate} - {exp.endDate || 'Present'}</span>
                  </div>
                  <p className={`${getFontSize('xs')} font-semibold mb-1`} style={primaryTextColor}>{exp.company}</p>
                  {renderFormattedDescription(exp.responsibilities)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROJECTS */}
        {projects.length > 0 && (
          <div className="print-avoid-break">
            {renderSectionHeader("Notable Projects")}
            <div className="mt-3 flex flex-col gap-4">
              {projects.map((proj) => (
                <div key={proj.id} className="flex flex-col gap-0.5 print-avoid-break">
                  <div className="flex justify-between items-baseline">
                    <h3 className={`font-bold ${getFontSize('xs')} sm:${getFontSize('sm')} ${activeTheme.titleText}`}>{proj.title}</h3>
                    {proj.link && <span className={`${getFontSize('p10')} font-mono ${activeTheme.subText}`}>{proj.link}</span>}
                  </div>
                  {proj.techUsed && (
                    <span className={`${getFontSize('p9')} uppercase tracking-wider font-bold text-indigo-600 dark:text-indigo-400`}>Stack: {proj.techUsed}</span>
                  )}
                  <p className={`${getFontSize('xs')} mt-1 ${activeTheme.bodyText}`}>{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EDUCATION */}
        {education.length > 0 && (
          <div className="print-avoid-break">
            {renderSectionHeader("Education Background")}
            <div className="mt-3 flex flex-col gap-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex flex-col gap-0.5">
                  <div className="flex justify-between items-baseline">
                    <h3 className={`font-bold ${getFontSize('xs')} ${activeTheme.titleText}`}>{edu.degree}</h3>
                    <span className={`${getFontSize('p10')} font-mono ${activeTheme.subText}`}>{edu.startYear} - {edu.endYear || 'Present'}</span>
                  </div>
                  <p className={`${getFontSize('xs')} font-semibold ${activeTheme.subText}`}>{edu.school}</p>
                  {edu.description && <p className={`${getFontSize('p10')} italic mt-0.5 ${activeTheme.bodyText}`}>{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CERTIFICATIONS */}
        {certifications.length > 0 && (
          <div className="print-avoid-break">
            {renderSectionHeader("Certifications")}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              {certifications.map((c) => (
                <div key={c.id} className={`${getFontSize('xs')} leading-tight`}>
                  <p className={`font-semibold ${activeTheme.titleText}`}>{c.title}</p>
                  <p className={`${getFontSize('p10')} ${activeTheme.subText}`}>{c.issuer} ({c.year})</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const auraWrappers = {
    'indigo-aurora': {
      wrapperBg: 'bg-gradient-to-br from-indigo-500/10 via-slate-900/5 to-purple-500/10 dark:from-indigo-950/20 dark:via-slate-950/50 dark:to-purple-950/20 border-indigo-500/15 dark:border-indigo-500/30',
      glowShadow: 'shadow-[0_0_50px_-5px_rgba(99,102,241,0.25)]'
    },
    'emerald-glow': {
      wrapperBg: 'bg-gradient-to-br from-emerald-500/10 via-slate-900/5 to-teal-500/10 dark:from-emerald-950/20 dark:via-slate-950/50 dark:to-teal-950/20 border-emerald-500/15 dark:border-emerald-500/30',
      glowShadow: 'shadow-[0_0_50px_-5px_rgba(16,185,129,0.25)]'
    },
    'sunset-radiance': {
      wrapperBg: 'bg-gradient-to-br from-rose-500/10 via-slate-900/5 to-amber-500/10 dark:from-rose-950/20 dark:via-slate-950/50 dark:to-amber-950/20 border-rose-500/15 dark:border-rose-500/30',
      glowShadow: 'shadow-[0_0_50px_-5px_rgba(244,63,94,0.25)]'
    },
    'steel-obsidian': {
      wrapperBg: 'bg-gradient-to-br from-slate-500/10 via-slate-900/5 to-zinc-500/10 dark:from-slate-900/20 dark:via-slate-950/50 dark:to-zinc-900/20 border-slate-500/15 dark:border-slate-500/30',
      glowShadow: 'shadow-[0_0_50px_-5px_rgba(100,116,139,0.25)]'
    }
  };

  const activeAura = auraWrappers[workspaceAura as keyof typeof auraWrappers] || auraWrappers['indigo-aurora'];

  return (
    <div className={`w-full flex justify-center p-4 sm:p-5 rounded-2xl border transition-all duration-500 overflow-hidden relative ${activeAura.wrapperBg}`} id="live-resume-wrapper">
      {/* Dynamic aura glow spots inside the resume preview framework workspace */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {workspaceAura === 'emerald-glow' && (
          <>
            <div className="absolute top-1/4 -left-1/4 w-3/4 h-3/4 bg-emerald-500/10 blur-[90px] rounded-full"></div>
            <div className="absolute bottom-1/4 -right-1/4 w-3/4 h-3/4 bg-teal-500/10 blur-[90px] rounded-full"></div>
          </>
        )}
        {workspaceAura === 'sunset-radiance' && (
          <>
            <div className="absolute top-1/4 -left-1/4 w-3/4 h-3/4 bg-rose-500/10 blur-[90px] rounded-full"></div>
            <div className="absolute bottom-1/4 -right-1/4 w-3/4 h-3/4 bg-amber-500/10 blur-[90px] rounded-full"></div>
          </>
        )}
        {workspaceAura === 'steel-obsidian' && (
          <>
            <div className="absolute top-1/4 -left-1/4 w-3/4 h-3/4 bg-slate-500/10 blur-[90px] rounded-full"></div>
            <div className="absolute bottom-1/4 -right-1/4 w-3/4 h-3/4 bg-zinc-500/10 blur-[90px] rounded-full"></div>
          </>
        )}
        {workspaceAura === 'indigo-aurora' && (
          <>
            <div className="absolute top-1/4 -left-1/4 w-3/4 h-3/4 bg-indigo-500/10 blur-[90px] rounded-full"></div>
            <div className="absolute bottom-1/4 -right-1/4 w-3/4 h-3/4 bg-purple-500/10 blur-[90px] rounded-full"></div>
          </>
        )}
      </div>

      <div 
        className={`w-full ${activeTheme.bg} ${activeTheme.titleText} transition-all duration-300 rounded-sm overflow-hidden select-text border ${activeTheme.sectionBorder} relative z-10 ${activeAura.glowShadow}`}
        style={{ 
          maxWidth: '800px', 
          minHeight: '297mm', // Standard ratio
        }}
        id="resume-pdf-target"
      >
        {template === 'modern' && renderModernTemplate()}
        {template === 'elegant' && renderElegantTemplate()}
        {template === 'creative' && renderCreativeTemplate()}
      </div>
    </div>
  );
}
