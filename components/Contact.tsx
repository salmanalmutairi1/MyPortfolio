import React, { useState } from 'react';
import { useLanguage } from '../services/LanguageContext';
import { Mail, Linkedin, Send, CheckCircle, ArrowRight } from 'lucide-react';
import { SectionHeader, Reveal } from './ui/Brutalist';

type IconProps = { size?: number };

const DiscordIcon: React.FC<IconProps> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

type ChannelIcon = React.ComponentType<IconProps>;

const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

const Contact: React.FC = () => {
  const { t, dir } = useLanguage();
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const isRTL = dir === 'rtl';

  const sendToTelegram = async (name: string, email: string, message: string) => {
    const text = `🚀 *New Portfolio Message*\n\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n\n💬 *Message:*\n${message}\n\n---\n_Sent from your portfolio_`;
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: 'Markdown' }),
    });
    if (!response.ok) throw new Error('Failed to send');
    return response.json();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    try {
      await sendToTelegram(formData.name, formData.email, formData.message);
      setFormState('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormState('idle'), 4000);
    } catch (err) {
      console.error('Error sending message:', err);
      setFormState('error');
      setTimeout(() => setFormState('idle'), 3000);
    }
  };

  const MailIcon: ChannelIcon = ({ size = 18 }) => <Mail size={size} />;
  const LinkedinIcon: ChannelIcon = ({ size = 18 }) => <Linkedin size={size} />;

  const channels: { name: string; handle: string; href: string; Icon: ChannelIcon; external: boolean }[] = [
    {
      name: isRTL ? 'البريد الإلكتروني' : 'Email',
      handle: 'salmanmajed.sma@gmail.com',
      href: 'mailto:salmanmajed.sma@gmail.com',
      Icon: MailIcon,
      external: false,
    },
    {
      name: 'LinkedIn',
      handle: 'Salman Almutairi',
      href: 'https://www.linkedin.com/in/salman-almutairi-9b860324b/',
      Icon: LinkedinIcon,
      external: true,
    },
    {
      name: 'Discord',
      handle: '@salmanmajed29',
      href: 'https://discord.com/users/salmanmajed29',
      Icon: DiscordIcon,
      external: true,
    },
  ];

  return (
    <section
      id="contact"
      className="relative border-b border-[var(--border)] py-20 md:py-28 bg-[var(--bg)]"
    >
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12">
        <SectionHeader
          index="07"
          label="Contact"
          title={isRTL ? 'تواصل معي' : "Let's Connect"}
          subtitle={
            isRTL
              ? 'أرسل لي رسالة وستصلني فوراً على التليجرام. أرد عادةً خلال ساعات قليلة.'
              : "Send me a message and I'll receive it instantly on Telegram. I typically respond within a few hours."
          }
        />

        <div className="grid grid-cols-12 gap-y-12 gap-x-6 lg:gap-x-10">
          {/* Channels */}
          <div className="col-span-12 lg:col-span-5">
            <Reveal>
              <div className="mono-meta mb-6">
                {isRTL ? '/ تواصل مباشر' : '/ DIRECT CHANNELS'}
              </div>
              <ul className="border-y border-[var(--border-strong)]">
                {channels.map((c, idx) => {
                  const I = c.Icon;
                  return (
                    <li key={c.name}>
                      <a
                        href={c.href}
                        target={c.external ? '_blank' : undefined}
                        rel="noreferrer"
                        className="group flex items-center gap-5 py-5 border-t border-[var(--border)] first:border-t-0 hover:bg-[var(--bg-elevated)] transition-colors px-2"
                      >
                        <span className="mono-meta text-[var(--text-muted)] w-8">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="w-10 h-10 border border-[var(--border-strong)] flex items-center justify-center text-[var(--text-primary)] group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] group-hover:text-[var(--bg)] transition-colors">
                          <I size={18} />
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="font-mono text-[12px] uppercase tracking-[0.16em] text-[var(--text-primary)]">
                            {c.name}
                          </div>
                          <div className="text-sm text-[var(--text-secondary)] truncate mt-0.5">
                            {c.handle}
                          </div>
                        </div>
                        <ArrowRight
                          size={16}
                          className={`text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors ${
                            isRTL ? 'rotate-180' : ''
                          }`}
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-10 p-5 border border-[var(--border-strong)]">
                <div className="mono-meta mb-2">
                  {isRTL ? '/ الموقع' : '/ LOCATION'}
                </div>
                <div className="font-display text-2xl text-[var(--text-primary)]">
                  {isRTL ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}
                </div>
                <div className="mt-3 mono-meta text-[var(--text-secondary)]">
                  GMT+3 · 24°42′N · 46°43′E
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <div className="col-span-12 lg:col-span-7">
            <Reveal delay={0.05}>
              <div className="border border-[var(--border-strong)] p-6 md:p-10 bg-[var(--bg-elevated)]">
                <div className="flex items-center justify-between mb-8">
                  <div className="mono-meta text-[var(--text-primary)]">
                    {isRTL ? 'نموذج · ٠٠٧' : 'FORM / 007'}
                  </div>
                  <div className="flex items-center gap-2 mono-meta">
                    <span className="inline-block w-2 h-2 bg-[var(--accent)]" aria-hidden="true" />
                    <span>{isRTL ? 'مباشر' : 'INSTANT'}</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <BrutalField
                      id="name"
                      label={isRTL ? 'الاسم' : 'Name'}
                      placeholder={isRTL ? 'اسمك' : 'Your name'}
                      value={formData.name}
                      onChange={v => setFormData(p => ({ ...p, name: v }))}
                      required
                    />
                    <BrutalField
                      id="email"
                      type="email"
                      label={isRTL ? 'البريد الإلكتروني' : 'Email'}
                      placeholder={isRTL ? 'بريدك الإلكتروني' : 'your@email.com'}
                      value={formData.email}
                      onChange={v => setFormData(p => ({ ...p, email: v }))}
                      required
                    />
                  </div>

                  <BrutalField
                    id="message"
                    multiline
                    label={isRTL ? 'الرسالة' : 'Message'}
                    placeholder={isRTL ? 'كيف أقدر أساعدك؟' : 'How can I help you?'}
                    value={formData.message}
                    onChange={v => setFormData(p => ({ ...p, message: v }))}
                    required
                  />

                  <button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className={`btn-brutal w-full ${
                      formState === 'success'
                        ? 'btn-brutal-accent'
                        : formState === 'error'
                        ? 'btn-brutal-accent'
                        : 'btn-brutal-solid'
                    }`}
                  >
                    {formState === 'submitting' ? (
                      <>
                        <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                        <span>{isRTL ? 'جاري الإرسال...' : 'Sending...'}</span>
                      </>
                    ) : formState === 'success' ? (
                      <>
                        <CheckCircle size={14} />
                        <span>{isRTL ? 'تم الإرسال بنجاح! ✨' : 'Message Sent! ✨'}</span>
                      </>
                    ) : formState === 'error' ? (
                      <span>{isRTL ? 'حدث خطأ، حاول مرة أخرى' : 'Error, please try again'}</span>
                    ) : (
                      <>
                        <Send size={14} className={isRTL ? 'rotate-180' : ''} />
                        <span>{isRTL ? 'إرسال الرسالة' : 'Send Message'}</span>
                      </>
                    )}
                  </button>

                  <p className="mono-meta text-center">
                    {isRTL
                      ? '🔒 رسالتك آمنة ومشفرة وتصلني مباشرة'
                      : '🔒 Your message is secure and delivered directly to me'}
                  </p>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

interface BrutalFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  multiline?: boolean;
}

const BrutalField: React.FC<BrutalFieldProps> = ({
  id, label, placeholder, value, onChange, type = 'text', required, multiline,
}) => {
  const sharedClass =
    'w-full bg-transparent border-0 border-b border-[var(--border-strong)] px-0 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none font-mono text-sm tracking-wide';

  return (
    <div>
      <label htmlFor={id} className="mono-label block mb-2">
        / {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          rows={5}
          required={required}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
          placeholder={placeholder}
          className={sharedClass}
        />
      ) : (
        <input
          id={id}
          type={type}
          required={required}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          placeholder={placeholder}
          className={sharedClass}
        />
      )}
    </div>
  );
};

export default Contact;
