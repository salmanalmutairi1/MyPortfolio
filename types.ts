import { ReactNode } from "react";

export enum Language {
  EN = 'en',
  AR = 'ar'
}

export type SectionId = 
  | 'home' 
  | 'about' 
  | 'skills' 
  | 'projects' 
  | 'education' 
  | 'certificates' 
  | 'mindset'
  | 'contact';

export interface NavItem {
  id: SectionId;
  label: string;
}

export interface SkillItem {
  name: string;
  iconSlug: string; // For SimpleIcons CDN
  url: string;
}

// Enhanced project feature with icon
export interface ProjectFeatureDetailed {
  title: string;
  description: string;
  icon: string; // Lucide icon name
}

// Project context information (program, duration, cohort)
export interface ProjectContext {
  program?: string;
  duration?: string;
  cohort?: string;
}

// Project metric with icon
export interface ProjectMetric {
  label: string;
  value: string;
  icon: string; // Lucide icon name
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  overview?: string; // Extended overview with "why"
  projectType: string;
  role: string;
  roleDetailed?: string; // Extended role description
  keyFeatures: string[];
  keyFeaturesDetailed?: ProjectFeatureDetailed[]; // Enhanced features with icons
  goals?: string[]; // Project goals as bullet points
  context?: ProjectContext; // Program/duration/cohort info
  metrics?: ProjectMetric[]; // Impact metrics with values
  biggestChallenge: string;
  solution: string;
  impact: string;
  tech: string[];
  caseStudy: {
    sections: {
      id: string;
      title: string;
      body: string[];
      variant?: 'list' | 'paragraphs';
    }[];
  };
  links: {
    demo?: string;
    github?: string;
    caseStudy?: string;
  };
  audio: {
    en: string;
    ar: string;
  };
  image?: string;
  isPrivate?: boolean;
}

export interface EducationItem {
  institution: string;
  degree: string;
  date: string;
  desc?: string;
}

export interface CertificateItem {
  title: string;
  issuer: string;
  date: string;
  image: string;
  description: string;
  skills: string[];
  keyOutcomes?: string[];
  duration?: string;
  specialization?: string;
}

export interface CertificatesTranslation {
  title: string;
  viewDetails: string;
  closeDetails: string;
  skillsAcquired: string;
  keyOutcomes: string;
  issuedBy: string;
  duration: string;
  specialization: string;
  items: CertificateItem[];
}

export interface AchievementItem {
  title: string;
  description: string;
  icon?: string;
}

export interface MindsetTab {
  id: 'principles' | 'workflow' | 'quality' | 'learning';
  label: string;
  title: string;
  description: string; // Added tooltip description
  content: string[];
}

export interface Translation {
  nav: Record<SectionId, string>;
  hero: {
    greeting: string;
    name: string;
    role: string;
    tagline: string;
    typingLines: string[];
    cta: {
      projects: string;
      contact: string;
      cv: string;
    };
  };
  about: {
    title: string;
    content: string[];
    stats: { label: string; value: string }[];
  };
  skills: {
    title: string;
    list: SkillItem[];
  };
  projects: {
    title: string;
    subtitle: string;
    viewProject: string;
    caseStudyBtn: string;
    closeBtn: string;
    items: Project[];
    labels: {
      role: string;
      platform: string;
      focus: string;
      playNarration: string;
      playingNarration: string;
      contents: string;
      techStack: string;
    };
    narration: {
      title: string;
      subtitle: string;
      play: string;
      playing: string;
    };
  };
  // Experience removed
  education: {
    title: string;
    items: EducationItem[];
  };
  certificates: CertificatesTranslation;
  achievements: {
    title: string;
    items: AchievementItem[];
  };
  mindset: {
    title: string;
    subtitle: string;
    status: string;
    initialMessage: string;
    placeholder: string;
    run: string;
    suggestionsLabel: string;
    copy: string;
    copied: string;
    reset: string;
    tabs: MindsetTab[];
    commands: {
      cmd: string;
      desc: string;
    }[];
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      message: string;
      submit: string;
      success: string;
    };
    socials: {
      linkedin: string;
      email: string;
    }
  };
  player: {
    nowPlaying: string;
    speed: string;
    close: string;
  };
}

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
  dir: 'ltr' | 'rtl';
}

export interface PlayerContextType {
  isPlaying: boolean;
  currentTrack: { title: string; src: string; fallbackSrc?: string; fallbackTried?: boolean; projectId: string } | null;
  progress: number;
  duration: number;
  playbackRate: number;
  togglePlay: () => void;
  playTrack: (track: { title: string; src: string; fallbackSrc?: string; projectId: string }) => void;
  loadTrack: (track: { title: string; src: string; fallbackSrc?: string; projectId: string }) => void;
  seek: (time: number) => void;
  skip: (seconds: number) => void;
  setRate: (rate: number) => void;
  closePlayer: () => void;
  isMinimized: boolean;
  toggleMinimize: () => void;
  switchAudioLanguage: () => void;
  audioLanguage: 'en' | 'ar';
}

export interface PropsWithChildren {
  children: ReactNode;
}
