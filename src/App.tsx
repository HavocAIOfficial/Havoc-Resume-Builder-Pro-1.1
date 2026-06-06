import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Download, Layout, Palette, Settings, 
  Sun, Moon, RotateCcw, FileText, ArrowRight, Eye, Edit3,
  AlertTriangle
} from 'lucide-react';
// @ts-ignore
import html2pdf from 'html2pdf.js';
import { ResumeData, ThemeConfig, TemplateType } from './types';
import { emptyResumeData, sampleResumeData } from './utils/sampleData';
import LandingHero from './components/LandingHero';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import Toast, { ToastMessage } from './components/Toast';

export default function App() {
  const [isBuilding, setIsBuilding] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>('edit');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [customizerTab, setCustomizerTab] = useState<'colors' | 'typo' | 'structure'>('colors');
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  // Core resume state initialized from localStorage if available
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    const saved = localStorage.getItem('resume_data');
    return saved ? JSON.parse(saved) : emptyResumeData;
  });

  // Customization rules theme configuration
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(() => {
    const saved = localStorage.getItem('theme_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          template: parsed.template || 'modern',
          primaryColor: parsed.primaryColor || '#6366f1',
          fontFamily: parsed.fontFamily || 'sans',
          spacing: parsed.spacing || 'normal',
          fontScale: parsed.fontScale || 'medium',
          sectionHeaderStyle: parsed.sectionHeaderStyle || 'underline',
          skillBadgeStyle: parsed.skillBadgeStyle || 'flat',
          paperTheme: parsed.paperTheme || 'classic-light',
          workspaceAura: parsed.workspaceAura || 'indigo-aurora'
        };
      } catch (e) {
        // Fallback below
      }
    }
    return {
      template: 'modern',
      primaryColor: '#6366f1',
      fontFamily: 'sans',
      spacing: 'normal',
      fontScale: 'medium',
      sectionHeaderStyle: 'underline',
      skillBadgeStyle: 'flat',
      paperTheme: 'classic-light',
      workspaceAura: 'indigo-aurora'
    };
  });

  // Persist resume and design configurations auto-save
  useEffect(() => {
    localStorage.setItem('resume_data', JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    localStorage.setItem('theme_config', JSON.stringify(themeConfig));
  }, [themeConfig]);

  // Dark mode trigger
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Trigger temporary floating messages
  const triggerToast = (text: string, type: 'success' | 'warning' | 'info' = 'success') => {
    const newToast: ToastMessage = {
      id: Date.now().toString(),
      type,
      text
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleStartBuilding = () => {
    setIsBuilding(true);
    triggerToast('Welcome back! Ready to craft your resume.', 'info');
  };

  const handleLoadSample = () => {
    setResumeData(sampleResumeData);
    setIsBuilding(true);
    triggerToast('Loaded professional developer profile!', 'success');
  };

  const handleClearAll = () => {
    setShowResetConfirm(true);
  };

  const handleConfirmClearAll = () => {
    setResumeData(emptyResumeData);
    setShowResetConfirm(false);
    triggerToast('All resume data has been fully cleared!', 'warning');
  };

  // Modern palette colors with beautiful contrasts
  const colorOptions = [
    { value: '#6366f1', name: 'Vibrant Indigo' },
    { value: '#10b981', name: 'Fresh Emerald' },
    { value: '#0ea5e9', name: 'Electric Sky' },
    { value: '#f43f5e', name: 'Sunset Rose' },
    { value: '#8b5cf6', name: 'Royal Violet' },
    { value: '#f59e0b', name: 'Amber Gold' },
    { value: '#14b8a6', name: 'Placid Teal' },
    { value: '#ec4899', name: 'Radiant Pink' },
    { value: '#ef4444', name: 'Fire Crimson' },
    { value: '#06b6d4', name: 'Neon Cyan' },
    { value: '#a855f7', name: 'Classic Purple' },
    { value: '#475569', name: 'Steel Slate' }
  ];

  const templateOptions = [
    { id: 'modern', label: 'Modern Minimal', description: 'Clean geometry, spacious grids' },
    { id: 'elegant', label: 'Elegant Prof', description: 'Classic centring, editorial serifs' },
    { id: 'creative', label: 'Creative Sidebar', description: 'Polished tinted column layout' },
  ];

  // Color space conversions to resolve html2canvas oklch/oklab limitations gracefully during export
  const oklchToRgb = (L: number, C: number, H_deg: number): [number, number, number] => {
    const H = (H_deg * Math.PI) / 180;
    const a = C * Math.cos(H);
    const b = C * Math.sin(H);

    const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

    const l = l_ * l_ * l_;
    const m = m_ * m_ * m_;
    const s = s_ * s_ * s_;

    let r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
    let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
    let b_val = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

    // Clamp values to valid projection space bounds
    r = Math.max(0, Math.min(1, r));
    g = Math.max(0, Math.min(1, g));
    b_val = Math.max(0, Math.min(1, b_val));

    // Decouple color space projection back into standard non-linear gamma sRGB
    const gamma = (x: number) => x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055;

    return [
      Math.round(gamma(r) * 255),
      Math.round(gamma(g) * 255),
      Math.round(gamma(b_val) * 255)
    ];
  };

  const oklabToRgb = (L: number, a: number, b: number): [number, number, number] => {
    const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

    const l = l_ * l_ * l_;
    const m = m_ * m_ * m_;
    const s = s_ * s_ * s_;

    let r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
    let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
    let b_val = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

    r = Math.max(0, Math.min(1, r));
    g = Math.max(0, Math.min(1, g));
    b_val = Math.max(0, Math.min(1, b_val));

    const gamma = (x: number) => x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055;

    return [
      Math.round(gamma(r) * 255),
      Math.round(gamma(g) * 255),
      Math.round(gamma(b_val) * 255)
    ];
  };

  const sanitizeOklchColors = (str: string): string => {
    let result = str;

    const parseComponent = (valueStr: string, multiplier = 1): number => {
      let val = parseFloat(valueStr);
      if (valueStr.endsWith('%')) {
        val = (parseFloat(valueStr) / 100) * multiplier;
      }
      return val;
    };

    // Replace oklch(...) occurrences
    const oklchRegex = /oklch\(\s*([\d.%]+)[\s,]+([\d.%]+)[\s,]+([\d.%deg]+)(?:\s*\/[\s,]*([\d.%]+))?\s*\)/gi;
    result = result.replace(oklchRegex, (match, lStr, cStr, hStr, aStr) => {
      try {
        const L = parseComponent(lStr, 1);
        const C = parseComponent(cStr, 0.4); // max Chroma standard normalizer
        
        let H = parseFloat(hStr);
        if (hStr.endsWith('%')) {
          H = (parseFloat(hStr) / 100) * 360;
        } else if (hStr.endsWith('deg')) {
          H = parseFloat(hStr);
        }

        const alpha = aStr ? parseComponent(aStr, 1) : 1;
        const [rVal, gVal, bVal] = oklchToRgb(L, C, H);
        
        return alpha === 1 ? `rgb(${rVal}, ${gVal}, ${bVal})` : `rgba(${rVal}, ${gVal}, ${bVal}, ${alpha})`;
      } catch (e) {
        return 'rgb(70, 70, 70)';
      }
    });

    // Replace oklab(...) occurrences
    const oklabRegex = /oklab\(\s*([\d.%]+)[\s,]+([\d.%+-]+)[\s,]+([\d.%+-]+)(?:\s*\/[\s,]*([\d.%]+))?\s*\)/gi;
    result = result.replace(oklabRegex, (match, lStr, aStrVal, bStrVal, alphaStr) => {
      try {
        const L = parseComponent(lStr, 1);
        const aVal = parseFloat(aStrVal);
        const bValCoord = parseFloat(bStrVal);
        const alpha = alphaStr ? parseComponent(alphaStr, 1) : 1;
        const [rVal, gVal, bVal] = oklabToRgb(L, aVal, bValCoord);
        
        return alpha === 1 ? `rgb(${rVal}, ${gVal}, ${bVal})` : `rgba(${rVal}, ${gVal}, ${bVal}, ${alpha})`;
      } catch (e) {
        return 'rgb(70, 70, 70)';
      }
    });

    return result;
  };

  // High fidelity PDF export workflow
  const handlePdfDownload = () => {
    // Basic validation constraints
    if (!resumeData.personalInfo.fullName || !resumeData.personalInfo.jobTitle) {
      triggerToast('Unable to export. Please specify your Full Name and Job Title.', 'warning');
      setActiveStep(0); // Focus personal info step
      return;
    }

    triggerToast('Generating your high-fidelity A4 document...', 'info');

    const element = document.getElementById('resume-pdf-target');
    if (!element) {
      triggerToast('Error: Failed to register print node container.', 'warning');
      return;
    }

    // --- Dynamic CSS normalization for html2canvas color space compat boundaries ---
    const originalGetComputedStyle = window.getComputedStyle;

    // Backup and rewrite style elements
    const styleTags = Array.from(document.querySelectorAll('style'));
    const styleBackups = styleTags.map(tag => ({
      tag,
      originalText: tag.textContent || ''
    }));

    styleTags.forEach(tag => {
      const cssText = tag.textContent || '';
      if (cssText.includes('oklch') || cssText.includes('oklab')) {
        tag.textContent = sanitizeOklchColors(cssText);
      }
    });

    // Backup and rewrite programmatic link / CSSStyleSheets rules
    const sheetsBackup: Array<{ sheet: CSSStyleSheet; originalRules: string[] }> = [];
    try {
      for (let i = 0; i < document.styleSheets.length; i++) {
        const sheet = document.styleSheets[i];
        try {
          if (sheet.cssRules) {
            const rules: string[] = [];
            let hasOkl = false;
            for (let j = 0; j < sheet.cssRules.length; j++) {
              const ruleText = sheet.cssRules[j].cssText;
              rules.push(ruleText);
              if (ruleText.includes('oklch') || ruleText.includes('oklab')) {
                hasOkl = true;
              }
            }
            if (hasOkl) {
              sheetsBackup.push({ sheet, originalRules: rules });
              while (sheet.cssRules.length > 0) {
                sheet.deleteRule(0);
              }
              rules.forEach(rule => {
                const sanitized = sanitizeOklchColors(rule);
                try {
                  sheet.insertRule(sanitized, sheet.cssRules.length);
                } catch (e) {
                  // Ignore rule insertion errors
                }
              });
            }
          }
        } catch (e) {
          // Cross-origin sheets throw CORS errors, safely ignored
        }
      }
    } catch (e) {
      console.warn("Style sheets preprocess skipped:", e);
    }

    // Inject interceptor on getComputedStyle to yield clean RGBs during html2canvas render context
    window.getComputedStyle = function(el: Element, pseudo?: string): CSSStyleDeclaration {
      const style = originalGetComputedStyle.call(this, el, pseudo);
      return new Proxy(style, {
        get(target: any, prop: string | symbol) {
          // Clean native property accesses that evaluation runs with proper target context
          const value = target[prop];
          
          if (typeof value === 'string' && (value.includes('oklch') || value.includes('oklab'))) {
            return sanitizeOklchColors(value);
          }
          if (typeof value === 'function') {
            return function(this: any, ...args: any[]) {
              // Bound to normal targets to avoid Illegal invocation
              const res = value.apply(target, args);
              if (typeof res === 'string' && (res.includes('oklch') || res.includes('oklab'))) {
                return sanitizeOklchColors(res);
              }
              return res;
            };
          }
          return value;
        }
      });
    };

    // Reversible clean up handler to bring back native modern styling
    const restoreOriginalStyleState = () => {
      styleBackups.forEach(backup => {
        backup.tag.textContent = backup.originalText;
      });
      sheetsBackup.forEach(backup => {
        try {
          while (backup.sheet.cssRules.length > 0) {
            backup.sheet.deleteRule(0);
          }
          backup.originalRules.forEach(rule => {
            try {
              backup.sheet.insertRule(rule, backup.sheet.cssRules.length);
            } catch (e) {}
          });
        } catch (e) {}
      });
      window.getComputedStyle = originalGetComputedStyle;
    };

    const opt = {
      margin: 0,
      filename: `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        letterRendering: true,
        backgroundColor: '#ffffff'
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Robust client execution call using bundled html2pdf.js package
    try {
      html2pdf()
        .from(element)
        .set(opt as any)
        .save()
        .then(() => {
          triggerToast('PDF downloaded successfully!', 'success');
          restoreOriginalStyleState();
        })
        .catch((err: any) => {
          console.error(err);
          triggerToast('PDF compilation failed, please try again.', 'warning');
          restoreOriginalStyleState();
        });
    } catch (err: any) {
      console.error(err);
      triggerToast('Export system error, please try again.', 'warning');
      restoreOriginalStyleState();
    }
  };

  // If landing page is active
  if (!isBuilding) {
    return (
      <div className={`min-h-screen bg-slate-50 dark:bg-[#0a0a0c] text-slate-900 dark:text-slate-200 transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
        <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            id="btn-toggle-dark-landing"
            className="p-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer shadow-md inline-flex items-center justify-center"
            title="Toggle theme visual"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-slate-650 text-indigo-650" />}
          </button>
        </div>
        <LandingHero onStart={handleStartBuilding} onLoadSample={handleLoadSample} />
        <Toast toasts={toasts} onRemove={removeToast} />
      </div>
    );
  }

  const renderAuraBg = () => {
    const aura = themeConfig.workspaceAura || 'indigo-aurora';
    if (aura === 'emerald-glow') {
      return (
        <>
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-teal-600/10 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-cyan-600/5 blur-[100px] rounded-full pointer-events-none"></div>
        </>
      );
    }
    if (aura === 'sunset-radiance') {
      return (
        <>
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-rose-600/10 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-amber-600/10 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-orange-600/5 blur-[100px] rounded-full pointer-events-none"></div>
        </>
      );
    }
    if (aura === 'steel-obsidian') {
      return (
        <>
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-slate-600/10 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-zinc-600/10 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-slate-500/5 blur-[100px] rounded-full pointer-events-none"></div>
        </>
      );
    }
    // Default indigo-aurora
    return (
      <>
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none"></div>
      </>
    );
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-[#0a0a0c] text-slate-900 dark:text-slate-200 transition-colors duration-300 ${darkMode ? 'dark' : ''}`} id="app-workspace">
      {/* Immersive blur effects */}
      {renderAuraBg()}

      {/* Sticky Premium Top Nav */}
      <nav className="sticky top-0 z-40 bg-white/85 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/60 shadow-sm" id="main-nav">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Logo / App Brand */}
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => setIsBuilding(false)}>
            <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg shadow-[0_0_15px_rgba(99,102,241,0.4)] flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4 text-white font-bold" />
            </div>
            <div className="hidden min-[420px]:block">
              <span className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-1.5 leading-none">
                HavocResume<span className="text-indigo-600 dark:text-indigo-400">Pro</span>
              </span>
            </div>
          </div>

          {/* Configuration Actions */}
          <div className="flex items-center gap-1.5 sm:gap-4">
            <div className="hidden sm:flex items-center gap-2 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest bg-slate-100/80 dark:bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Auto-saved
            </div>

            <button
              onClick={handleClearAll}
              id="btn-reset-workspace"
              className="px-2.5 py-1.5 sm:px-3.5 sm:py-2 border border-rose-200 dark:border-rose-950/40 text-rose-600 dark:text-rose-450 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-xs font-bold rounded-full transition-all flex items-center gap-1 sm:gap-1.5 cursor-pointer active:scale-95 group shadow-[0_2px_8px_rgba(244,63,94,0.08)] dark:shadow-none shrink-0"
              title="Reset All Resume Details"
            >
              <RotateCcw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
              <span className="hidden min-[480px]:inline">Reset All</span>
              <span className="inline min-[480px]:hidden">Reset</span>
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-1.5 sm:p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-800 cursor-pointer shrink-0"
              title="Toggle system theme"
              id="workstate-dark-switch"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-400" />}
            </button>

            <button
              onClick={handlePdfDownload}
              id="btn-export-pdf"
              className="px-3 py-1.5 sm:px-5 sm:py-2 bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200 text-xs sm:text-sm font-bold rounded-full transition-all shadow-sm flex items-center gap-1 sm:gap-2 cursor-pointer active:scale-95 shrink-0 whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white dark:text-black" />
              <span className="hidden min-[360px]:inline">Download <span className="hidden sm:inline">PDF</span></span>
              <span className="inline min-[360px]:hidden">PDF</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Responsive Grid Layout Workspace */}
      <main className="w-full max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8 flex-grow">
        
        {/* Toggle navigation for small Viewports */}
        <div className="md:hidden flex rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-1">
          <button
            onClick={() => setMobileTab('edit')}
            className={`flex-1 py-3 text-xs font-semibold rounded-lg font-sans flex items-center justify-center gap-1.5 transition-all ${
              mobileTab === 'edit'
                ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20'
                : 'text-slate-400'
            }`}
            id="mobile-tab-edit"
          >
            <Edit3 className="w-4 h-4" /> Edit Profile
          </button>
          <button
            onClick={() => setMobileTab('preview')}
            className={`flex-1 py-3 text-xs font-semibold rounded-lg font-sans flex items-center justify-center gap-1.5 transition-all ${
              mobileTab === 'preview'
                ? 'bg-indigo-650/40 text-indigo-400 border border-indigo-500/20'
                : 'text-slate-400'
            }`}
            id="mobile-tab-preview"
          >
            <Eye className="w-4 h-4" /> Live Preview
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start h-full pb-16">
          
          {/* LEFT SIDEBAR: Builder Tools Form or Style Config */}
          <div className={`md:col-span-7 flex flex-col gap-6 h-full ${mobileTab === 'edit' ? 'block' : 'hidden md:block'}`}>
            
            {/* Design Customization Drawer */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-950/40 backdrop-blur-sm border border-slate-200 dark:border-slate-800/60 flex flex-col gap-5 shadow-sm dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)]" id="design-drawer">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-2">
                  <Palette className="w-4.5 h-4.5 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="font-bold text-slate-800 dark:text-white text-sm font-display uppercase tracking-wider">Design Customizer</h3>
                </div>
                <div className="text-[10px] bg-slate-100 dark:bg-slate-900/85 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-full font-mono font-semibold flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: themeConfig.primaryColor }} />
                  {colorOptions.find(c => c.value === themeConfig.primaryColor)?.name || 'Custom Theme'}
                </div>
              </div>

              {/* Advanced visual sub-tabs */}
              <div className="flex gap-1 bg-slate-100 dark:bg-slate-950/80 p-1 rounded-xl border border-slate-200 dark:border-slate-900">
                <button
                  type="button"
                  onClick={() => setCustomizerTab('colors')}
                  className={`flex-1 py-1.5 text-[10px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    customizerTab === 'colors'
                      ? 'bg-white dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-indigo-500/20 shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/40 dark:hover:bg-slate-900/40'
                  }`}
                >
                  🎨 Colors & Themes
                </button>
                <button
                  type="button"
                  onClick={() => setCustomizerTab('typo')}
                  className={`flex-1 py-1.5 text-[10px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    customizerTab === 'typo'
                      ? 'bg-white dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-indigo-500/20 shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/40 dark:hover:bg-slate-900/40'
                  }`}
                >
                  📝 Fonts & Sizing
                </button>
                <button
                  type="button"
                  onClick={() => setCustomizerTab('structure')}
                  className={`flex-1 py-1.5 text-[10px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    customizerTab === 'structure'
                      ? 'bg-white dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-indigo-500/20 shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/40 dark:hover:bg-slate-900/40'
                  }`}
                >
                  📐 Accent Styles
                </button>
              </div>

              {/* Color tab config */}
              {customizerTab === 'colors' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 animate-fade-in">
                            {/* Color options with name labels and distinct outline borders */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-755 text-slate-700 dark:text-slate-300 mb-1.5">Accent Theme Color</label>
                    <div className="flex flex-col gap-2 bg-slate-50 dark:bg-slate-900/30 p-2 rounded-xl border border-slate-200 dark:border-slate-800">
                      <div className="grid grid-cols-7 gap-1.5">
                        {colorOptions.map((color) => {
                          const isActive = themeConfig.primaryColor === color.value;
                          return (
                            <button
                              key={color.value}
                              type="button"
                              onClick={() => setThemeConfig({ ...themeConfig, primaryColor: color.value })}
                              className="relative aspect-square rounded-md border transition-all transform hover:scale-110 flex items-center justify-center cursor-pointer group shadow-[0_2px_4px_rgba(0,0,0,0.15)] dark:shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                              style={{ 
                                backgroundColor: color.value,
                                borderColor: isActive ? (darkMode ? '#ffffff' : '#000000') : 'rgba(255, 255, 255, 0.25)',
                                boxShadow: isActive ? `0 0 10px ${color.value}aa` : 'none'
                              }}
                              title={color.name}
                            >
                              {isActive && (
                                <div className="w-1.5 h-1.5 rounded-full bg-white ring-1 ring-black" />
                              )}
                              <span className="absolute bottom-full mb-2 hidden group-hover:block bg-slate-950 text-[9px] text-white font-bold py-1 px-1.5 rounded border border-slate-800 whitespace-nowrap z-50 shadow-lg">
                                {color.name}
                              </span>
                            </button>
                          );
                        })}
                        {/* Custom color picker */}
                        {(() => {
                          const isCustomActive = !colorOptions.some((c) => c.value === themeConfig.primaryColor);
                          return (
                            <div className="relative aspect-square rounded-md border flex items-center justify-center cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.15)] dark:shadow-[0_2px_4px_rgba(0,0,0,0.3)] bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-amber-200 via-rose-500 to-indigo-500 hover:scale-110 transition-all animate-pulse"
                              style={{
                                borderColor: isCustomActive ? (darkMode ? '#ffffff' : '#000000') : 'rgba(255, 255, 255, 0.25)',
                                boxShadow: isCustomActive ? `0 0 10px ${themeConfig.primaryColor}aa` : 'none'
                              }}
                              title="Custom Theme Color Picker"
                            >
                              <input 
                                type="color" 
                                value={themeConfig.primaryColor}
                                onChange={(e) => setThemeConfig({ ...themeConfig, primaryColor: e.target.value })}
                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                id="input-custom-color"
                              />
                              <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center shadow-md">
                                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: themeConfig.primaryColor }} />
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                      
                      {/* Custom Hex Color Text Input */}
                      <div className="flex items-center justify-between mt-1 border-t border-slate-200/50 dark:border-slate-800/40 pt-2 px-1">
                        <span className="text-[9px] uppercase font-mono text-slate-400 dark:text-slate-500">Pick Custom Color or Input Color hex code:</span>
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-mono text-slate-400">#</span>
                          <input
                            type="text"
                            value={themeConfig.primaryColor.replace('#', '')}
                            onChange={(e) => {
                              const val = e.target.value.trim();
                              setThemeConfig({ ...themeConfig, primaryColor: `#${val}` });
                            }}
                            className="px-2 py-1 text-[10px] font-mono rounded bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 outline-none focus:ring-1 focus:ring-indigo-505 w-20"
                            placeholder="6366f1"
                            maxLength={7}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Resume paper backgrounds theme */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Resume Paper Tone</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: 'classic-light', label: 'Off-White', desc: 'Standard' },
                        { id: 'charcoal-dark', label: 'Midnight', desc: 'Cosmic' },
                        { id: 'cream-parchment', label: 'Ivory Cream', desc: 'Serif' },
                        { id: 'sage-mint', label: 'Sage Green', desc: 'Restorative' },
                        { id: 'lavender-mist', label: 'Lavender', desc: 'Lilac Aura' },
                        { id: 'sand-warm', label: 'Warm Sand', desc: 'Earthy Clay' },
                        { id: 'slate-ice', label: 'Slate Ice', desc: 'Cool Alpine' },
                        { id: 'blush-rose', label: 'Blush Rose', desc: 'Elegant Bloom' },
                        { id: 'nordic-spruce', label: 'Deep Spruce', desc: 'Boreal Forest' }
                      ].map((item) => {
                        const isActive = themeConfig.paperTheme === item.id || (!themeConfig.paperTheme && item.id === 'classic-light');
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setThemeConfig({ ...themeConfig, paperTheme: item.id as any })}
                            className={`flex flex-col items-center justify-center py-2 px-0.5 rounded-xl border text-[10px] font-bold transition-all cursor-pointer ${
                              isActive
                                ? 'bg-indigo-50 dark:bg-indigo-650/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 font-extrabold shadow-sm'
                                : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-slate-200'
                            }`}
                          >
                            <span>{item.label}</span>
                            <span className="text-[8px] opacity-60 dark:opacity-50 font-normal font-sans text-center leading-none mt-0.5">{item.desc}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Backdrop glowing background themes */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Workspace Backdrop Theme Glow</label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[
                        { id: 'indigo-aurora', name: 'Indigo Nebula' },
                        { id: 'emerald-glow', name: 'Neon Green' },
                        { id: 'sunset-radiance', name: 'Sunset Rose' },
                        { id: 'steel-obsidian', name: 'Monochrome' }
                      ].map((item) => {
                        const isActive = themeConfig.workspaceAura === item.id || (!themeConfig.workspaceAura && item.id === 'indigo-aurora');
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setThemeConfig({ ...themeConfig, workspaceAura: item.id as any })}
                            className={`py-2 rounded-xl border text-[10px] font-bold transition-all truncate cursor-pointer ${
                              isActive
                                ? 'bg-indigo-50 dark:bg-indigo-650/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30'
                                : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-slate-200'
                            }`}
                            title={item.name}
                          >
                            {item.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>
              )}

              {/* Typo and sizes tab config */}
              {customizerTab === 'typo' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 animate-fade-in">
                  
                  {/* 8 Custom Fonts dropdown */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Primary Font Family</label>
                    <select
                      value={themeConfig.fontFamily}
                      onChange={(e: any) => setThemeConfig({ ...themeConfig, fontFamily: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                      id="select-font-family"
                    >
                      <option value="sans">Inter (Modern Sans)</option>
                      <option value="serif">Playfair (Classic Serif)</option>
                      <option value="mono">JetBrains (High-Tech Mono)</option>
                      <option value="display">Space Grotesk (Tech Geometric)</option>
                      <option value="outfit">Outfit (Sleek Geometric)</option>
                      <option value="merriweather">Merriweather (Warm Editorial Serif)</option>
                      <option value="montserrat">Montserrat (High-End Decorative)</option>
                      <option value="firacode">Fira Code (Developer Mono)</option>
                    </select>
                  </div>

                  {/* Font Sizing scale */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Document Font Size</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: 'small', label: 'Small (11px)' },
                        { id: 'medium', label: 'Medium (12px)' },
                        { id: 'large', label: 'Large (13px)' }
                      ].map((item) => {
                        const isActive = themeConfig.fontScale === item.id || (!themeConfig.fontScale && item.id === 'medium');
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setThemeConfig({ ...themeConfig, fontScale: item.id as any })}
                            className={`py-2 rounded-xl border text-[10px] font-bold transition-all cursor-pointer ${
                              isActive
                                ? 'bg-indigo-50 dark:bg-indigo-650/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30'
                                : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-slate-200'
                            }`}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Compactness / Line Spacing */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Line Spacing / Padding Height</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(['compact', 'normal', 'relaxed'] as const).map((space) => (
                        <button
                          key={space}
                          type="button"
                          id={`spacing-opt-${space}`}
                          onClick={() => setThemeConfig({ ...themeConfig, spacing: space })}
                          className={`py-2 rounded-xl border text-[10px] font-bold capitalize transition-all cursor-pointer font-mono ${
                            themeConfig.spacing === space
                              ? 'bg-indigo-50 dark:bg-indigo-650/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30'
                              : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-slate-200'
                          }`}
                        >
                          {space}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* Structural decoration elements tab */}
              {customizerTab === 'structure' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 animate-fade-in">
                  
                  {/* Layout Option */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Active Template Layout</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {templateOptions.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          id={`template-opt-${t.id}`}
                          onClick={() => setThemeConfig({ ...themeConfig, template: t.id as TemplateType })}
                          className={`flex-1 py-2 rounded-xl border text-[10px] font-bold transition-all truncate px-1 cursor-pointer ${
                            themeConfig.template === t.id
                              ? 'bg-indigo-50 dark:bg-indigo-650/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30'
                              : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-slate-200'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Section Line / Border Accent style */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Section Heading Accent</label>
                    <select
                      value={themeConfig.sectionHeaderStyle || 'underline'}
                      onChange={(e: any) => setThemeConfig({ ...themeConfig, sectionHeaderStyle: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                    >
                      <option value="underline">Classic Bottom Line</option>
                      <option value="pill">Sleek Tipped Banner</option>
                      <option value="bordered">Dual Top-Bottom Border</option>
                      <option value="badge-line">Heavy Left Vertical Bar</option>
                      <option value="minimal">Minimalist Text Only</option>
                    </select>
                  </div>

                  {/* Skill badging formatter style */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Skill Badges Formatter</label>
                    <select
                      value={themeConfig.skillBadgeStyle || 'flat'}
                      onChange={(e: any) => setThemeConfig({ ...themeConfig, skillBadgeStyle: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                    >
                      <option value="flat">Rounded Compact Chips</option>
                      <option value="outline">Fine Tinted Outlines</option>
                      <option value="pills">Full Oval Soft Capsules</option>
                      <option value="text-dot">Text Spaced With Bullets</option>
                    </select>
                  </div>

                </div>
              )}

            </div>

            {/* Profile detail builders form panel */}
            <ResumeForm
              data={resumeData}
              onChange={setResumeData}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              onClear={handleClearAll}
              onLoadSample={handleLoadSample}
            />

          </div>

          {/* RIGHT SIDEBAR: REAL TIME LIVE PREVIEW WRAPPER */}
          <div className={`md:col-span-5 h-full ${mobileTab === 'preview' ? 'block' : 'hidden md:block'}`}>
            <div className="sticky top-24 flex flex-col gap-4">
              <div className="flex justify-between items-center px-2">
                <div>
                  <h3 className="font-semibold text-slate-850 text-slate-800 dark:text-white font-display text-base flex items-center gap-1.5">
                    Live Rendering Preview
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </h3>
                  <p className="text-[10px] text-slate-500 font-mono">Changes render instantly beside edit states</p>
                </div>
              </div>

              {/* Informative Rendering Notice */}
              <div className="bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/20 rounded-xl p-3 px-3.5 flex items-start gap-2.5 mx-1" id="preview-notifying-banner">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-700 dark:text-amber-450 leading-relaxed">
                  Please note that the live preview might appear misaligned. However, once you download the resume as a PDF pressing the Download PDF button, the formatting will lock into place, resulting in a perfectly polished and professional document.
                </p>
              </div>

              {/* Central resume rendering controller */}
              <ResumePreview data={resumeData} themeConfig={themeConfig} />
            </div>
          </div>

        </div>

      </main>

      {/* Embedded application toast indicators */}
      <Toast toasts={toasts} onRemove={removeToast} />

      {/* Premium custom confirmation modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in" id="reset-confirm-modal">
          {/* Backdrop blur overlay */}
          <div 
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity cursor-pointer" 
            onClick={() => setShowResetConfirm(false)}
          />
          
          {/* Dialog Container */}
          <div className="relative w-full max-w-md bg-white dark:bg-[#12141c] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-6 text-center transform scale-100 transition-all z-10">
            <div className="mx-auto w-12 h-12 bg-rose-50 dark:bg-rose-950/30 rounded-full flex items-center justify-center mb-4 border border-rose-100 dark:border-rose-900/30">
              <AlertTriangle className="w-6 h-6 text-rose-500" />
            </div>
            
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2">
              Reset Your Workspace?
            </h3>
            
            <p className="text-sm text-slate-500 dark:text-slate-450 mb-6 leading-relaxed">
              Are you sure you want to clear your current resume details? All filled information will be permanently deleted and the preview will reset. This action cannot be undone.
            </p>
            
            <div className="flex gap-3 justify-center">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-250 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 text-sm font-semibold transition-all cursor-pointer"
              >
                No, Keep My Data
              </button>
              
              <button
                type="button"
                onClick={handleConfirmClearAll}
                className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold transition-all cursor-pointer shadow-[0_2px_8px_rgba(244,63,94,0.15)] active:scale-95"
              >
                Yes, Clear Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
