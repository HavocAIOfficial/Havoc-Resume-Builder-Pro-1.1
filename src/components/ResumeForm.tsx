import React, { useState } from 'react';
import { 
  User, Briefcase, GraduationCap, Wrench, Layers, 
  Award, Globe, Plus, Trash2, ChevronRight, 
  ChevronLeft, Camera, Sparkles, CheckCircle2, 
  Eye, RefreshCw, X
} from 'lucide-react';
import { ResumeData, Skill, Education, Experience, Project, Certification, Language } from '../types';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (newData: ResumeData) => void;
  activeStep: number;
  setActiveStep: (step: number) => void;
  onClear: () => void;
  onLoadSample: () => void;
}

export default function ResumeForm({ 
  data, 
  onChange, 
  activeStep, 
  setActiveStep, 
  onClear, 
  onLoadSample 
}: ResumeFormProps) {
  
  const steps = [
    { title: 'Personal Info', icon: <User className="w-4 h-4" /> },
    { title: 'Experience & Projects', icon: <Briefcase className="w-4 h-4" /> },
    { title: 'Education & Certs', icon: <GraduationCap className="w-4 h-4" /> },
    { title: 'Skills & Languages', icon: <Wrench className="w-4 h-4" /> },
  ];

  // Handler for nested personal details change
  const handlePersonalChange = (key: string, value: any) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [key]: value
      }
    });
  };

  const handleSocialChange = (key: string, value: string) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        socials: {
          ...data.personalInfo.socials,
          [key]: value
        }
      }
    });
  };

  // Profile photo upload helper
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Image must be smaller than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        handlePersonalChange('photoUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Experience Handlers
  const addExperience = () => {
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      role: '',
      company: '',
      startDate: '',
      endDate: '',
      responsibilities: ''
    };
    onChange({
      ...data,
      experience: [...data.experience, newExp]
    });
  };

  const updateExperience = (id: string, key: keyof Experience, value: string) => {
    onChange({
      ...data,
      experience: data.experience.map(exp => exp.id === id ? { ...exp, [key]: value } : exp)
    });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experience: data.experience.filter(exp => exp.id !== id)
    });
  };

  // Education Handlers
  const addEducation = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      degree: '',
      school: '',
      startYear: '',
      endYear: '',
      description: ''
    };
    onChange({
      ...data,
      education: [...data.education, newEdu]
    });
  };

  const updateEducation = (id: string, key: keyof Education, value: string) => {
    onChange({
      ...data,
      education: data.education.map(edu => edu.id === id ? { ...edu, [key]: value } : edu)
    });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter(edu => edu.id !== id)
    });
  };

  // Project Handlers
  const addProject = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: '',
      description: '',
      techUsed: '',
      link: ''
    };
    onChange({
      ...data,
      projects: [...data.projects, newProj]
    });
  };

  const updateProject = (id: string, key: keyof Project, value: string) => {
    onChange({
      ...data,
      projects: data.projects.map(p => p.id === id ? { ...p, [key]: value } : p)
    });
  };

  const removeProject = (id: string) => {
    onChange({
      ...data,
      projects: data.projects.filter(p => p.id !== id)
    });
  };

  // Skills Tag Handler
  const [newSkillText, setNewSkillText] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('Intermediate');

  const addSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillText.trim()) return;
    const newSkill: Skill = {
      id: `skill-${Date.now()}`,
      name: newSkillText.trim(),
      level: newSkillLevel
    };
    onChange({
      ...data,
      skills: [...data.skills, newSkill]
    });
    setNewSkillText('');
  };

  const removeSkill = (id: string) => {
    onChange({
      ...data,
      skills: data.skills.filter(s => s.id !== id)
    });
  };

  // Certification Handlers
  const addCertification = () => {
    const newCert: Certification = {
      id: `cert-${Date.now()}`,
      title: '',
      issuer: '',
      year: ''
    };
    onChange({
      ...data,
      certifications: [...data.certifications, newCert]
    });
  };

  const updateCertification = (id: string, key: keyof Certification, value: string) => {
    onChange({
      ...data,
      certifications: data.certifications.map(c => c.id === id ? { ...c, [key]: value } : c)
    });
  };

  const removeCertification = (id: string) => {
    onChange({
      ...data,
      certifications: data.certifications.filter(c => c.id !== id)
    });
  };

  // Language Handlers
  const [newLanguageText, setNewLanguageText] = useState('');
  const [newLanguageLevel, setNewLanguageLevel] = useState('Fluent');

  const addLanguage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLanguageText.trim()) return;
    const newLang: Language = {
      id: `lang-${Date.now()}`,
      name: newLanguageText.trim(),
      level: newLanguageLevel
    };
    onChange({
      ...data,
      languages: [...data.languages, newLang]
    });
    setNewLanguageText('');
  };

  const removeLanguage = (id: string) => {
    onChange({
      ...data,
      languages: data.languages.filter(l => l.id !== id)
    });
  };

  // Form Progress Calculators
  const calculateCompletness = () => {
    let score = 0;
    const info = data.personalInfo;
    if (info.fullName) score += 15;
    if (info.jobTitle) score += 15;
    if (info.email) score += 10;
    if (info.phone) score += 10;
    if (info.summary) score += 15;
    if (data.experience.length > 0) score += 15;
    if (data.education.length > 0) score += 10;
    if (data.skills.length > 0) score += 10;
    return Math.min(score, 100);
  };

  const completeness = calculateCompletness();

  return (
    <div className="w-full flex flex-col gap-6" id="resume-builder-form">
      {/* Step Stepper Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-950/40 backdrop-blur-sm border border-slate-200 dark:border-slate-800/60 shadow-sm dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)] flex flex-col gap-4">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white font-display">Resume Details</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5">Fill out your profile step-by-step</p>
          </div>

          {/* Quick Config Actions */}
          <div className="flex gap-2">
            <button
              onClick={onLoadSample}
              id="btn-autofill"
              className="px-3 py-1.5 rounded-lg border border-indigo-500/20 text-xs font-semibold text-indigo-400 bg-indigo-500/10 hover:bg-indigo-505/20 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Fill Sample
            </button>
            <button
              onClick={onClear}
              id="btn-clear"
              className="px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-semibold text-slate-405 bg-slate-900 hover:bg-slate-800 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset All
            </button>
          </div>
        </div>

        {/* Horizontal Nav Steps */}
        <div className="grid grid-cols-4 gap-1.5">
          {steps.map((step, idx) => {
            const isActive = idx === activeStep;
            const isCompleted = idx < activeStep;
            return (
              <button
                key={idx}
                id={`step-${idx}`}
                onClick={() => setActiveStep(idx)}
                className={`py-2 rounded-xl transition-all font-sans text-[10px] sm:text-xs font-medium flex flex-col sm:flex-row items-center justify-center gap-1.5 border cursor-pointer ${
                  isActive 
                    ? 'bg-indigo-600 text-white border-indigo-500/20 shadow-lg shadow-indigo-500/20' 
                    : isCompleted
                      ? 'bg-indigo-950/30 border-indigo-900/40 text-indigo-400'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {step.icon}
                <span className="hidden md:inline font-sans">{step.title}</span>
                <span className="md:hidden font-sans">Step {idx + 1}</span>
              </button>
            );
          })}
        </div>

        {/* Stepper Progress Meter */}
        <div className="flex items-center gap-4 pt-1">
          <div className="flex-grow bg-slate-900 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-indigo-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${completeness}%` }}
            />
          </div>
          <p className="text-xs font-medium text-slate-400 whitespace-nowrap font-mono">
            Completeness: <span className="text-indigo-450 dark:text-indigo-400 font-bold">{completeness}%</span>
          </p>
        </div>
      </div>

      {/* Dynamic Step Panels */}
      <div className="flex-grow flex flex-col gap-6">
        
        {/* STEP 1: Personal Details */}
        {activeStep === 0 && (
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-950/40 backdrop-blur-sm border border-slate-200 dark:border-slate-800/60 shadow-sm dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)] flex flex-col gap-6 animate-fade-in">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="font-bold text-slate-800 dark:text-white font-display text-lg">Personal Information</h3>
            </div>

            {/* Profile Avatar Select */}
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <div className="relative group w-24 h-24 rounded-full overflow-hidden border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 flex items-center justify-center bg-slate-50/50 dark:bg-slate-900/50 transition-colors">
                {data.personalInfo.photoUrl ? (
                  <>
                    <img 
                      src={data.personalInfo.photoUrl} 
                      alt="Profile Avatar" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <button
                      onClick={() => handlePersonalChange('photoUrl', '')}
                      id="btn-remove-photo"
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-medium"
                    >
                      <X className="w-5 h-5 text-rose-400" />
                    </button>
                  </>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center justify-center h-full w-full p-2 text-center text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                    <Camera className="w-6 h-6 mb-1" />
                    <span className="text-[10px] font-sans font-medium">Upload Photo</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handlePhotoUpload} 
                      className="hidden" 
                    />
                  </label>
                )}
              </div>
              
              <div className="text-center sm:text-left">
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 font-sans">Professional Headshot</h4>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 leading-relaxed font-sans max-w-sm">
                  Upload an optional JPG, PNG or WebP image under 2MB. Most creative templates render the avatar cleanly.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 font-sans mb-1.5">Full Name *</label>
                <input 
                  type="text" 
                  value={data.personalInfo.fullName}
                  placeholder="e.g. Alex Carter"
                  onChange={(e) => handlePersonalChange('fullName', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-sm text-slate-800 dark:text-slate-100 font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                  id="input-name"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 font-sans mb-1.5">Job Title *</label>
                <input 
                  type="text" 
                  value={data.personalInfo.jobTitle}
                  placeholder="e.g. Senior Full-Stack Engineer"
                  onChange={(e) => handlePersonalChange('jobTitle', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-sm text-slate-800 dark:text-slate-100 font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                  id="input-role"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 font-sans mb-1.5">Email Address *</label>
                <input 
                  type="email" 
                  value={data.personalInfo.email}
                  placeholder="e.g. alex.carter@dev.com"
                  onChange={(e) => handlePersonalChange('email', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-sm text-slate-800 dark:text-slate-100 font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                  id="input-email"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 font-sans mb-1.5">Phone Number *</label>
                <input 
                  type="text" 
                  value={data.personalInfo.phone}
                  placeholder="e.g. +1 (555) 019-2834"
                  onChange={(e) => handlePersonalChange('phone', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-sm text-slate-800 dark:text-slate-100 font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                  id="input-phone"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 font-sans mb-1.5">Location / Address</label>
                <input 
                  type="text" 
                  value={data.personalInfo.address}
                  placeholder="e.g. San Francisco, CA"
                  onChange={(e) => handlePersonalChange('address', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-sm text-slate-800 dark:text-slate-100 font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                  id="input-address"
                />
              </div>

              <div className="sm:col-span-2">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 font-sans">Professional Summary</label>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {data.personalInfo.summary.length}/400 characters
                  </span>
                </div>
                <textarea 
                  value={data.personalInfo.summary}
                  placeholder="Briefly state your core expertise, achievements, and professional interests..."
                  maxLength={400}
                  rows={4}
                  onChange={(e) => handlePersonalChange('summary', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-sm text-slate-800 dark:text-slate-100 font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm resize-none"
                  id="input-summary"
                />
              </div>
            </div>

            {/* Social profiles sub-block */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-4">
              <h4 className="text-sm font-semibold text-slate-800 dark:text-white font-sans">Profile & Portfolio Links</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 font-sans mb-1.5">LinkedIn URL</label>
                  <input 
                    type="text" 
                    value={data.personalInfo.socials.linkedin}
                    placeholder="linkedin.com/in/username"
                    onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-sm text-slate-800 dark:text-slate-100 font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                    id="input-linkedin"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 font-sans mb-1.5">GitHub URL</label>
                  <input 
                    type="text" 
                    value={data.personalInfo.socials.github}
                    placeholder="github.com/username"
                    onChange={(e) => handleSocialChange('github', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-sm text-slate-800 dark:text-slate-100 font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                    id="input-github"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 font-sans mb-1.5">Website / Portfolio</label>
                  <input 
                    type="text" 
                    value={data.personalInfo.socials.portfolio}
                    placeholder="myportfolio.design"
                    onChange={(e) => handleSocialChange('portfolio', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-sm text-slate-800 dark:text-slate-100 font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                    id="input-portfolio"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Work Experience & Projects */}
        {activeStep === 1 && (
          <div className="flex flex-col gap-6 animate-fade-in">
            {/* Work History Panel */}
            <div className="p-6 rounded-2xl glass-panel shadow-sm border border-slate-200/60 dark:border-slate-800/60 flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-indigo-500" />
                  <h3 className="font-semibold text-slate-800 dark:text-white font-display text-lg">Work Experience</h3>
                </div>
                <button
                  onClick={addExperience}
                  id="btn-add-experience"
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>

              {data.experience.length === 0 ? (
                <div className="p-8 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                  <p className="text-sm text-slate-400 dark:text-slate-500 font-sans">No work experience fields added. Click 'Add' to incorporate professional steps.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {data.experience.map((exp, idx) => (
                    <div key={exp.id} className="relative p-5 rounded-xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80 flex flex-col gap-4">
                      <button
                        onClick={() => removeExperience(exp.id)}
                        className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                        title="Remove experience record"
                        id={`btn-remove-exp-${idx}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <span className="text-[10px] font-bold text-indigo-500 uppercase font-mono tracking-wider">Experience Record #{idx + 1}</span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 font-sans mb-1">Company *</label>
                          <input 
                            type="text" 
                            value={exp.company}
                            placeholder="e.g. Stripe"
                            onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm text-xs font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 font-sans mb-1">Role / Job Title *</label>
                          <input 
                            type="text" 
                            value={exp.role}
                            placeholder="e.g. Staff UI Engineer"
                            onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm text-xs font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 font-sans mb-1">Start Date *</label>
                          <input 
                            type="text" 
                            value={exp.startDate}
                            placeholder="e.g. 2021-06 (or June 2021)"
                            onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm text-xs font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 font-sans mb-1">End Date</label>
                          <input 
                            type="text" 
                            value={exp.endDate}
                            placeholder="e.g. Present (or Dec 2023)"
                            onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm text-xs font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <div className="flex justify-between items-center mb-1">
                            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 font-sans">Responsibilities & Achievements</label>
                            <span className="text-[9px] text-slate-400 font-mono">{exp.responsibilities.length}/500</span>
                          </div>
                          <textarea 
                            value={exp.responsibilities}
                            placeholder="Use hyphens for bullet points:&#10;- Redesigned checkout workflow leading to 15% increase in conversions&#10;- Configured clean Vite bundlers..."
                            maxLength={500}
                            rows={3}
                            onChange={(e) => updateExperience(exp.id, 'responsibilities', e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm text-xs font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none font-sans"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Projects Panel */}
            <div className="p-6 rounded-2xl glass-panel shadow-sm border border-slate-200/60 dark:border-slate-800/60 flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <Layers className="w-5 h-5 text-indigo-500" />
                  <h3 className="font-semibold text-slate-800 dark:text-white font-display text-lg">Key Projects</h3>
                </div>
                <button
                  onClick={addProject}
                  id="btn-add-project"
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>

              {data.projects.length === 0 ? (
                <div className="p-8 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                  <p className="text-sm text-slate-400 dark:text-slate-500 font-sans">No projects added yet. Click 'Add' to show off your custom works.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {data.projects.map((proj, idx) => (
                    <div key={proj.id} className="relative p-5 rounded-xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80 flex flex-col gap-4">
                      <button
                        onClick={() => removeProject(proj.id)}
                        className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                        id={`btn-remove-proj-${idx}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <span className="text-[10px] font-bold text-indigo-500 uppercase font-mono tracking-wider">Project Record #{idx + 1}</span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 font-sans mb-1">Project Title *</label>
                          <input 
                            type="text" 
                            value={proj.title}
                            placeholder="e.g. VividFlow Kanban"
                            onChange={(e) => updateProject(proj.id, 'title', e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm text-xs font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 font-sans mb-1">Demo / URL</label>
                          <input 
                            type="text" 
                            value={proj.link}
                            placeholder="e.g. github.com/user/project"
                            onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm text-xs font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 font-sans mb-1">Tech Stack Used</label>
                          <input 
                            type="text" 
                            value={proj.techUsed}
                            placeholder="e.g. React, TypeScript, Tailwind, Node.js"
                            onChange={(e) => updateProject(proj.id, 'techUsed', e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm text-xs font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <div className="flex justify-between items-center mb-1">
                            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 font-sans">Project Description</label>
                            <span className="text-[9px] text-slate-400 font-mono">{proj.description.length}/250</span>
                          </div>
                          <textarea 
                            value={proj.description}
                            placeholder="A concise description of what the project does, key technical barriers bypassed, and metrics."
                            maxLength={250}
                            rows={3}
                            onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm text-xs font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none font-sans"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 3: Education & Certifications */}
        {activeStep === 2 && (
          <div className="flex flex-col gap-6 animate-fade-in">
            {/* Education Panel */}
            <div className="p-6 rounded-2xl glass-panel shadow-sm border border-slate-200/60 dark:border-slate-800/60 flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 text-indigo-500" />
                  <h3 className="font-semibold text-slate-800 dark:text-white font-display text-lg">Education History</h3>
                </div>
                <button
                  onClick={addEducation}
                  id="btn-add-education"
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>

              {data.education.length === 0 ? (
                <div className="p-8 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                  <p className="text-sm text-slate-400 dark:text-slate-500 font-sans">No education entries. Track academic background by clicking 'Add'.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {data.education.map((edu, idx) => (
                    <div key={edu.id} className="relative p-5 rounded-xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80 flex flex-col gap-4">
                      <button
                        onClick={() => removeEducation(edu.id)}
                        className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                        id={`btn-remove-edu-${idx}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <span className="text-[10px] font-bold text-indigo-500 uppercase font-mono tracking-wider">Education Entry #{idx + 1}</span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 font-sans mb-1">School / College *</label>
                          <input 
                            type="text" 
                            value={edu.school}
                            placeholder="e.g. Stanford University"
                            onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm text-xs font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 font-sans mb-1">Degree / Certification *</label>
                          <input 
                            type="text" 
                            value={edu.degree}
                            placeholder="e.g. B.S. in Computer Science"
                            onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm text-xs font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 font-sans mb-1">Start Year *</label>
                          <input 
                            type="text" 
                            value={edu.startYear}
                            placeholder="e.g. 2018"
                            onChange={(e) => updateEducation(edu.id, 'startYear', e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm text-xs font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 font-sans mb-1">End Year</label>
                          <input 
                            type="text" 
                            value={edu.endYear}
                            placeholder="e.g. 2022 (or Ongoing)"
                            onChange={(e) => updateEducation(edu.id, 'endYear', e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm text-xs font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 font-sans mb-1">Honors / Extra Details</label>
                          <input 
                            type="text" 
                            value={edu.description}
                            placeholder="e.g. Specialized in Distributed Networks. Graduated Magna Cum Laude."
                            onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm text-xs font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Certifications Panel */}
            <div className="p-6 rounded-2xl glass-panel shadow-sm border border-slate-200/60 dark:border-slate-800/60 flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-indigo-500" />
                  <h3 className="font-semibold text-slate-800 dark:text-white font-display text-lg">Certifications</h3>
                </div>
                <button
                  onClick={addCertification}
                  id="btn-add-certification"
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>

              {data.certifications.length === 0 ? (
                <div className="p-8 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                  <p className="text-sm text-slate-400 dark:text-slate-500 font-sans">No certifications currently specified. Click 'Add' to incorporate.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {data.certifications.map((cert, idx) => (
                    <div key={cert.id} className="relative p-5 rounded-xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80 flex flex-col gap-4">
                      <button
                        onClick={() => removeCertification(cert.id)}
                        className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                        id={`btn-remove-cert-${idx}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 font-sans mb-1">Certification *</label>
                          <input 
                            type="text" 
                            value={cert.title}
                            placeholder="e.g. AWS Solutions Architect"
                            onChange={(e) => updateCertification(cert.id, 'title', e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm text-xs font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 font-sans mb-1">Issuer / Company *</label>
                          <input 
                            type="text" 
                            value={cert.issuer}
                            placeholder="e.g. Amazon Web Services"
                            onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm text-xs font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 font-sans mb-1">Year Achieved *</label>
                          <input 
                            type="text" 
                            value={cert.year}
                            placeholder="e.g. 2023"
                            onChange={(e) => updateCertification(cert.id, 'year', e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm text-xs font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 4: Skills & Languages */}
        {activeStep === 3 && (
          <div className="flex flex-col gap-6 animate-fade-in font-sans">
            {/* Skills Panel */}
            <div className="p-6 rounded-2xl glass-panel shadow-sm border border-slate-200/60 dark:border-slate-800/60 flex flex-col gap-5">
              <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                <Wrench className="w-5 h-5 text-indigo-500" />
                <h3 className="font-semibold text-slate-800 dark:text-white font-display text-lg">Skills Inventory</h3>
              </div>

              {/* Add Skill Tag Inline form */}
              <form onSubmit={addSkill} className="flex gap-2 items-end">
                <div className="flex-grow">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 font-sans mb-1.5">Skill Name *</label>
                  <input 
                    type="text" 
                    value={newSkillText}
                    placeholder="e.g. TypeScript, AWS, Figma"
                    onChange={(e) => setNewSkillText(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm"
                    id="input-add-skill"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 font-sans mb-1.5">Proficiency</label>
                  <select
                    value={newSkillLevel}
                    onChange={(e) => setNewSkillLevel(e.target.value)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm text-slate-800 dark:text-slate-200"
                    id="select-add-skill-level"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
                <button
                  type="submit"
                  id="btn-add-skill-tag"
                  className="px-5 py-2.5 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white transition-colors h-fit shadow-md flex items-center gap-1 cursor-pointer font-sans text-sm"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </form>

              {/* Skill chips display list */}
              {data.skills.length === 0 ? (
                <p className="text-xs text-slate-400 dark:text-slate-500 text-center py-4 italic font-sans">No skills created yet. Enter a name above to add chips.</p>
              ) : (
                <div className="flex flex-wrap gap-2.5 pt-2">
                  {data.skills.map((skill, idx) => (
                    <div 
                      key={skill.id} 
                      className="inline-flex items-center gap-2 pl-3.5 pr-2 py-1.5 rounded-full bg-indigo-50/60 border border-indigo-100 text-indigo-800 text-xs dark:bg-indigo-950/40 dark:border-indigo-900/60 dark:text-indigo-300 shadow-sm font-sans"
                      id={`skill-chip-${idx}`}
                    >
                      <span className="font-semibold">{skill.name}</span>
                      <span className="text-[10px] opacity-75 px-1.5 py-0.5 rounded-md bg-white dark:bg-indigo-950 border border-indigo-100/40 dark:border-indigo-900/30">{skill.level}</span>
                      <button
                        onClick={() => removeSkill(skill.id)}
                        className="p-0.5 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-400 hover:text-indigo-950 dark:hover:text-white transition-colors cursor-pointer"
                        title={`Remove skill: ${skill.name}`}
                        id={`btn-remove-skill-${idx}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Languages Panel */}
            <div className="p-6 rounded-2xl glass-panel shadow-sm border border-slate-200/60 dark:border-slate-800/60 flex flex-col gap-5">
              <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                <Globe className="w-5 h-5 text-indigo-500" />
                <h3 className="font-semibold text-slate-800 dark:text-white font-display text-lg">Languages</h3>
              </div>

              {/* Add Language Form */}
              <form onSubmit={addLanguage} className="flex gap-2 items-end">
                <div className="flex-grow">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 font-sans mb-1.5">Language *</label>
                  <input 
                    type="text" 
                    value={newLanguageText}
                    placeholder="e.g. Spanish, German"
                    onChange={(e) => setNewLanguageText(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm"
                    id="input-add-lang"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 font-sans mb-1.5">Fluency</label>
                  <select
                    value={newLanguageLevel}
                    onChange={(e) => setNewLanguageLevel(e.target.value)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm text-slate-800 dark:text-slate-200"
                    id="select-add-lang-level"
                  >
                    <option value="Native">Native</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Conversational">Conversational</option>
                    <option value="Professional">Professional</option>
                  </select>
                </div>
                <button
                  type="submit"
                  id="btn-add-lang-tag"
                  className="px-5 py-2.5 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white transition-colors h-fit shadow-md flex items-center gap-1 cursor-pointer font-sans text-sm"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </form>

              {/* Language Chips */}
              {data.languages.length === 0 ? (
                <p className="text-xs text-slate-400 dark:text-slate-500 text-center py-4 italic font-sans">No languages added. Include them above to list on resume.</p>
              ) : (
                <div className="flex flex-wrap gap-2.5 pt-2 font-sans">
                  {data.languages.map((lang, idx) => (
                    <div 
                      key={lang.id} 
                      className="inline-flex items-center gap-2 pl-3.5 pr-2 py-1.5 rounded-full bg-emerald-50/60 border border-emerald-100 text-emerald-800 text-xs dark:bg-emerald-950/40 dark:border-emerald-900/60 dark:text-emerald-300 shadow-sm font-sans"
                      id={`lang-chip-${idx}`}
                    >
                      <span className="font-semibold">{lang.name}</span>
                      <span className="text-[10px] opacity-75 px-1.5 py-0.5 rounded-md bg-white dark:bg-emerald-950 border border-emerald-100/40 dark:border-emerald-900/30">{lang.level}</span>
                      <button
                        onClick={() => removeLanguage(lang.id)}
                        className="p-0.5 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900 text-emerald-400 hover:text-emerald-950 dark:hover:text-white transition-colors cursor-pointer"
                        id={`btn-remove-lang-${idx}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Grid Flow Navigation Buttons bottom */}
      <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl shadow-sm">
        <button
          disabled={activeStep === 0}
          onClick={() => setActiveStep(activeStep - 1)}
          id="btn-prev-step"
          className="px-5 py-2.5 rounded-xl font-semibold border border-slate-200 dark:border-slate-800 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-650 dark:text-slate-200 transition-all font-sans text-sm flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>

        {activeStep < 3 ? (
          <button
            onClick={() => setActiveStep(activeStep + 1)}
            id="btn-next-step-bottom"
            className="px-5 py-2.5 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-sans text-sm transition-all flex items-center gap-1.5 shadow-md shadow-indigo-500/10 cursor-pointer border border-transparent"
          >
            Next Step <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-sans">
            <CheckCircle2 className="w-4 h-4" /> Form fully filled
          </div>
        )}
      </div>
    </div>
  );
}
