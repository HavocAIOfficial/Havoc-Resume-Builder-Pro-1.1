import { ResumeData } from '../types';

export const emptyResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
    photoUrl: '',
    socials: {
      linkedin: '',
      github: '',
      portfolio: ''
    }
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: []
};

export const sampleResumeData: ResumeData = {
  personalInfo: {
    fullName: 'Alex Carter',
    jobTitle: 'Senior Full-Stack Engineer',
    email: 'alex.carter@dev.com',
    phone: '+1 (555) 432-1098',
    address: 'San Francisco, CA',
    summary: 'Innovative and detail-oriented Software Engineer with 6+ years of experience crafting high-performance, responsive web applications. Proven record of accelerating load speeds, scaling database schemas, and architecting elegant design systems. Passionate about beautiful interfaces and clean, scalable codebases.',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256',
    socials: {
      linkedin: 'linkedin.com/in/alexcarter',
      github: 'github.com/alexcarterdev',
      portfolio: 'alexcarter.design'
    }
  },
  education: [
    {
      id: 'edu-1',
      degree: 'M.S. in Computer Science',
      school: 'Stanford University',
      startYear: '2016',
      endYear: '2018',
      description: 'Specialized in Human-Computer Interaction and Distributed Software Systems. Graduated with Honors.'
    },
    {
      id: 'edu-2',
      degree: 'B.S. in Software Engineering',
      school: 'University of California, Berkeley',
      startYear: '2012',
      endYear: '2016',
      description: 'Dean’s List recipient. Core coursework: Data Structures, Algorithms, Web Engineering, and UI Architecture.'
    }
  ],
  experience: [
    {
      id: 'exp-1',
      role: 'Senior Full-Stack Engineer',
      company: 'Aether Technologies',
      startDate: '2021-06',
      endDate: 'Present',
      responsibilities: '- Led redesign of core ecommerce dashboard, reducing page load times by 42% and increasing conversion rates by 8%.\n- Mentored 4 junior engineers, established TypeScript best practices, and spearheaded code review guidelines.\n- Designed and implemented a serverless pipeline processing 5M+ webhooks daily using Node.js and AWS lambda.'
    },
    {
      id: 'exp-2',
      role: 'Software Engineer',
      company: 'Nova Digital Corp',
      startDate: '2018-09',
      endDate: '2021-05',
      responsibilities: '- Built and deployed customized analytics widgets using React, Redux, and D3.js for B2B dashboards.\n- Conducted database optimization campaigns, cutting PostgreSQL query latency by 25% with smart indexing and caching.\n- Engineered real-time collaborative whiteboards utilizing WebSockets and modern canvas APIs.'
    }
  ],
  skills: [
    { id: 'skill-1', name: 'TypeScript', level: 'Expert' },
    { id: 'skill-2', name: 'React / Next.js', level: 'Expert' },
    { id: 'skill-3', name: 'Node.js & Express', level: 'Intermediate' },
    { id: 'skill-4', name: 'Tailwind CSS', level: 'Expert' },
    { id: 'skill-5', name: 'PostgreSQL & SQL', level: 'Intermediate' },
    { id: 'skill-6', name: 'System Design', level: 'Intermediate' },
    { id: 'skill-7', name: 'Figma UI/UX', level: 'Expert' }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'VividFlow - Kanban App',
      description: 'A gorgeous drag-and-drop Kanban workspace with real-time syncing, customized workspaces, and detailed team activity telemetry charts.',
      techUsed: 'React, Tailwind CSS, TypeScript, DnD-Kit, LocalStorage',
      link: 'github.com/alexcarterdev/vividflow'
    },
    {
      id: 'proj-2',
      title: 'KubeGaze - Pod Monitor',
      description: 'A minimalist developer dashboard that visually renders active Kubernetes logs, pods, and container performance logs in native WebGL charts.',
      techUsed: 'TypeScript, Electron, WebGL, Node.js, Kubernetes API',
      link: 'github.com/alexcarterdev/kubegaze'
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      title: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      year: '2023'
    },
    {
      id: 'cert-2',
      title: 'Advanced React Security Specialist',
      issuer: 'Scrypt Certification Labs',
      year: '2022'
    }
  ],
  languages: [
    { id: 'lang-1', name: 'English', level: 'Native' },
    { id: 'lang-2', name: 'Spanish', level: 'Conversational' }
  ]
};
