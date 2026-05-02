import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../services/LanguageContext';
import { Eye, ChevronDown, ChevronUp } from 'lucide-react';
import { CertificateItem } from '../types';
import CertificateModal from './CertificateModal';
import { SectionHeader } from './ui/Brutalist';

const Certificates: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const handleOpenModal = (cert: CertificateItem) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCert(null), 300);
  };

  const featuredCerts = t.certificates.items.slice(0, 4);
  const remainingCerts = t.certificates.items.slice(4);
  const displayedCerts = showAll ? t.certificates.items : featuredCerts;

  return (
    <section
      id="certificates"
      className="relative border-b border-[var(--border)] py-20 md:py-28 bg-[var(--bg-deep)]"
    >
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12">
        <SectionHeader
          index="06"
          label="Certs"
          title={t.certificates.title}
          subtitle={
            language === 'ar'
              ? `${t.certificates.items.length} شهادة احترافية`
              : `${t.certificates.items.length} Professional Certifications`
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {displayedCerts.map((cert, index) => (
              <motion.button
                key={cert.title}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, delay: index * 0.04, ease: [0.65, 0, 0.35, 1] }}
                onClick={() => handleOpenModal(cert)}
                className="group relative text-start border border-[var(--border)] -ms-px -mt-px hover:border-[var(--accent)] focus-visible:border-[var(--accent)] transition-colors bg-[var(--bg)]"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--bg-elevated)]">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[var(--bg)]/0 group-hover:bg-[var(--bg)]/30 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity p-3 border border-[var(--accent)] text-[var(--accent)]">
                      <Eye size={20} />
                    </div>
                  </div>
                  <div className="absolute top-0 left-0 px-2 py-1 mono-meta bg-[var(--bg)]/85 border-b border-r border-[var(--border-strong)]">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 border-t border-[var(--border)]" dir={dir}>
                  <h3 className="font-display text-xl text-[var(--text-primary)] leading-tight line-clamp-2 group-hover:text-[var(--accent)] transition-colors">
                    {cert.title}
                  </h3>
                  <p className="mt-2 mono-meta">{cert.issuer}</p>
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] tracking-[0.18em] text-[var(--text-muted)]">
                      {cert.date}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.18em] text-[var(--text-secondary)]">
                      +{cert.skills.length} {language === 'ar' ? 'مهارة' : 'SKILLS'}
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {remainingCerts.length > 0 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn-brutal"
            >
              {showAll ? (
                <>
                  <ChevronUp size={14} />
                  <span>{language === 'ar' ? 'عرض أقل' : 'Show Less'}</span>
                </>
              ) : (
                <>
                  <ChevronDown size={14} />
                  <span>
                    {language === 'ar'
                      ? `عرض الكل (${remainingCerts.length}+)`
                      : `View All (${remainingCerts.length}+ More)`}
                  </span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <CertificateModal
        certificate={selectedCert}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Certificates;
