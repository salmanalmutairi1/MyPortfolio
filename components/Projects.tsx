import React, { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../services/LanguageContext';
import { usePlayer } from '../services/PlayerContext';
import { ExternalLink, Github, Book, Smartphone, Globe, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { Language, Project } from '../types';
import { TRANSLATIONS } from '../constants';

type Translations = (typeof TRANSLATIONS)[Language];
import ProjectModal from './ProjectModal';
import AudioVisualizer from './ui/AudioVisualizer';
import TechIcon from './ui/TechIcon';
import { SectionHeader, MetadataStrip, Reveal } from './ui/Brutalist';

import H1 from '../Assets/H1.png';
import H2 from '../Assets/H2.png';
import H3 from '../Assets/H3.png';
import H4 from '../Assets/H4.png';
import H5 from '../Assets/H5.png';
import K1 from '../Assets/K1.png';
import K2 from '../Assets/K2.png';
import K3 from '../Assets/K3.png';
import K4 from '../Assets/K4.png';
import K5 from '../Assets/K5.png';
import YAS1 from '../Assets/YAS1.png';
import YAS2 from '../Assets/YAS2.png';
import YAS3 from '../Assets/YAS3.png';
import YAS4 from '../Assets/YAS4.png';
import YAS5 from '../Assets/YAS5.png';
import HalahLogo from '../Assets/halah.png';
import YASLogo from '../Assets/YAS.png';
import KSUMarketLogo from '../Assets/LogoDark.png';

const projectLogos: Record<string, string> = {
  ksumarket: KSUMarketLogo,
  halah: HalahLogo,
  'yas-ai': YASLogo,
};

const Projects: React.FC = () => {
  const { t, language } = useLanguage();
  const { playTrack, loadTrack, currentTrack, isPlaying, togglePlay } = usePlayer();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projectImages = useMemo(
    () => ({
      ksumarket: [K1, K2, K3, K4, K5],
      halah: [H1, H2, H3, H4, H5],
      'yas-ai': [YAS1, YAS2, YAS3, YAS4, YAS5],
    }),
    []
  );

  const getAudioSources = (project: Project) => {
    const src = language === Language.AR ? project.audio.ar : project.audio.en;
    const fallbackSrc = language === Language.AR ? project.audio.en : project.audio.ar;
    return { src, fallbackSrc };
  };

  const handleOpenProject = (project: Project) => {
    if (currentTrack?.projectId !== project.id) {
      const { src, fallbackSrc } = getAudioSources(project);
      loadTrack({ title: project.title, src, fallbackSrc, projectId: project.id });
    }
    setSelectedProject(project);
  };

  const handlePlayNarration = (project: Project) => {
    const { src, fallbackSrc } = getAudioSources(project);
    if (currentTrack?.projectId === project.id && isPlaying) {
      togglePlay();
      return;
    }
    playTrack({ title: project.title, src, fallbackSrc, projectId: project.id });
  };

  return (
    <section
      id="projects"
      className="relative border-b border-[var(--border)] py-20 md:py-28 bg-[var(--bg)]"
    >
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12">
        <SectionHeader
          index="04"
          label="Work"
          title={t.projects.title}
          subtitle={t.projects.subtitle}
        />

        <div className="flex flex-col gap-32 md:gap-40">
          {t.projects.items.map((project, index) => (
            <FeaturedProject
              key={project.id}
              project={project}
              index={index}
              onSelect={() => handleOpenProject(project)}
              onPlay={() => handlePlayNarration(project)}
              isPlaying={currentTrack?.projectId === project.id && isPlaying}
              images={projectImages[project.id as keyof typeof projectImages] || []}
              logo={projectLogos[project.id]}
              t={t}
              language={language}
            />
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

const FeaturedProject: React.FC<{
  project: Project;
  index: number;
  onSelect: () => void;
  onPlay: () => void;
  isPlaying: boolean;
  images: string[];
  logo?: string;
  t: Translations;
  language: Language;
}> = ({ project, index, onSelect, onPlay, isPlaying, images, logo, t, language }) => {
  const isEven = index % 2 === 0;
  const isRTL = language === Language.AR;
  const isMobileApp = project.id === 'halah';
  const TypeIcon = project.tech.some(tech =>
    ['Swift', 'SwiftUI', 'SwiftData', 'Flutter'].includes(tech)
  )
    ? Smartphone
    : Globe;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect();
    }
  };

  const meta = [
    { label: isRTL ? 'الرقم' : 'Index',  value: `0${index + 1}` },
    { label: t.projects.labels.platform, value: project.projectType },
    { label: t.projects.labels.role,     value: project.role },
    { label: t.projects.labels.focus,    value: project.keyFeatures[0] || '—' },
  ];

  return (
    <Reveal>
      <article dir={isRTL ? 'rtl' : 'ltr'} className="relative">
        {/* Slate header — number + private badge + hairline */}
        <div className="flex items-center gap-4 mb-8">
          <span className="font-display text-5xl md:text-6xl text-[var(--text-muted)] leading-none">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="hairline-strong flex-1" aria-hidden="true" />
          {project.isPrivate && (
            <span className="px-3 py-1 border border-[var(--accent)] text-[var(--accent)] mono-meta">
              NDA / PRIVATE
            </span>
          )}
        </div>

        <div className={`grid grid-cols-12 gap-y-8 gap-x-6 lg:gap-x-10 items-start`}>
          {/* Image */}
          <div
            className={`col-span-12 lg:col-span-7 ${
              isEven ? '' : 'lg:order-2'
            }`}
            onClick={onSelect}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label={t.projects.caseStudyBtn}
          >
            <div
              className={`relative overflow-hidden bg-[var(--bg-elevated)] border border-[var(--border-strong)] cursor-pointer ${
                isMobileApp ? 'aspect-[16/12]' : 'aspect-video'
              }`}
            >
              {images.length > 0 ? (
                isMobileApp ? (
                  <PhoneMockupCarousel images={images} title={project.title} />
                ) : (
                  <ProjectCarousel images={images} title={project.title} />
                )
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-[20vw] text-[var(--border-strong)]">
                    {project.title.substring(0, 2).toUpperCase()}
                  </span>
                  <TypeIcon
                    className="absolute w-16 h-16 text-[var(--text-muted)]"
                    strokeWidth={1}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div
            className={`col-span-12 lg:col-span-5 flex flex-col items-start ${
              isEven ? '' : 'lg:order-1'
            }`}
          >
            <div className="flex items-center gap-3 mb-5">
              {logo && (
                <div className="w-12 h-12 border border-[var(--border-strong)] bg-[var(--bg-elevated)] p-2 flex items-center justify-center shrink-0">
                  <img
                    src={logo}
                    alt={`${project.title} logo`}
                    className="w-full h-full object-contain grayscale"
                  />
                </div>
              )}
              <h3 className="font-display text-4xl md:text-5xl text-[var(--text-primary)] leading-[0.95]">
                {project.title}
              </h3>
            </div>

            <p className="text-base md:text-lg text-[var(--text-secondary)] leading-[1.7] mb-8">
              {project.description}
            </p>

            <MetadataStrip items={meta} className="w-full mb-8" />

            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech.map(techItem => (
                <span
                  key={techItem}
                  className="inline-flex items-center gap-2 px-2.5 py-1.5 border border-[var(--border)] font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--text-secondary)]"
                >
                  <TechIcon name={techItem} className="w-3.5 h-3.5 opacity-80" />
                  {techItem}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-stretch gap-2">
              <button
                onClick={onPlay}
                className={`btn-brutal ${isPlaying ? 'btn-brutal-solid' : ''}`}
                aria-label={t.projects.labels.playNarration}
              >
                {isPlaying ? (
                  <>
                    <AudioVisualizer isPlaying={true} />
                    <span>{t.projects.labels.playingNarration}</span>
                  </>
                ) : (
                  <>
                    <Play size={12} />
                    <span>{t.projects.labels.playNarration}</span>
                  </>
                )}
              </button>
              <button onClick={onSelect} className="btn-brutal btn-brutal-solid">
                <Book size={12} />
                <span>{t.projects.caseStudyBtn}</span>
              </button>
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-brutal"
                  aria-label="Demo"
                >
                  <ExternalLink size={14} />
                </a>
              )}
              {!project.isPrivate && project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-brutal"
                  aria-label="GitHub"
                >
                  <Github size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
};

/* -------- carousels (sharp corners, brutalist controls) -------- */

const ProjectCarousel: React.FC<{ images: string[]; title: string }> = ({ images, title }) => {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const total = images.length;

  useEffect(() => {
    if (total <= 1 || reduce) return;
    const id = window.setInterval(() => setIndex(prev => (prev + 1) % total), 5500);
    return () => window.clearInterval(id);
  }, [total, reduce]);

  const goPrev = () => setIndex(prev => (prev - 1 + total) % total);
  const goNext = () => setIndex(prev => (prev + 1) % total);

  return (
    <div className="absolute inset-0 z-0" dir="ltr">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="flex h-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((src, idx) => (
            <img
              key={`${src}-${idx}`}
              src={src}
              alt={`${title} preview ${idx + 1}`}
              className="w-full h-full object-cover shrink-0"
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
          ))}
        </div>
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 border border-[var(--border-strong)] bg-[var(--bg)]/80 text-[var(--text-primary)] flex items-center justify-center hover:bg-[var(--text-primary)] hover:text-[var(--bg)] transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 border border-[var(--border-strong)] bg-[var(--bg)]/80 text-[var(--text-primary)] flex items-center justify-center hover:bg-[var(--text-primary)] hover:text-[var(--bg)] transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={16} />
          </button>

          <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1.5 border border-[var(--border-strong)] bg-[var(--bg)]/80">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--text-primary)]">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

const PhoneMockupCarousel: React.FC<{ images: string[]; title: string }> = ({ images, title }) => {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const total = images.length;

  useEffect(() => {
    if (total <= 1 || reduce) return;
    const id = window.setInterval(() => setIndex(prev => (prev + 1) % total), 4500);
    return () => window.clearInterval(id);
  }, [total, reduce]);

  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center bg-[var(--bg-elevated)]" dir="ltr">
      <div className="absolute inset-0 brutal-grid opacity-40" aria-hidden="true" />

      <div className="relative h-[80%] aspect-[9/19.5] mx-auto max-h-[440px]">
        <div className="absolute inset-0 bg-[#0d0d0d] border border-[var(--border-strong)]">
          {/* sharp 'phone' frame — no rounded corners */}
        </div>
        <div className="absolute inset-[3px] bg-black overflow-hidden">
          <motion.div
            className="flex h-full"
            animate={{ x: `-${index * 100}%` }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
          >
            {images.map((src, idx) => (
              <img
                key={`phone-${idx}`}
                src={src}
                alt={`${title} screenshot ${idx + 1}`}
                className="w-full h-full object-cover shrink-0"
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
            ))}
          </motion.div>
        </div>
        <div className="absolute -top-6 left-0 right-0 flex items-center justify-between mono-meta">
          <span>SCREEN / {String(index + 1).padStart(2, '0')}</span>
          <span className="text-[var(--accent)]">●LIVE</span>
        </div>
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setIndex(prev => (prev - 1 + total) % total); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 border border-[var(--border-strong)] bg-[var(--bg)]/80 text-[var(--text-primary)] flex items-center justify-center hover:bg-[var(--text-primary)] hover:text-[var(--bg)] transition-colors z-10"
            aria-label="Previous screenshot"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setIndex(prev => (prev + 1) % total); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 border border-[var(--border-strong)] bg-[var(--bg)]/80 text-[var(--text-primary)] flex items-center justify-center hover:bg-[var(--text-primary)] hover:text-[var(--bg)] transition-colors z-10"
            aria-label="Next screenshot"
          >
            <ChevronRight size={16} />
          </button>
        </>
      )}
    </div>
  );
};

export default Projects;
