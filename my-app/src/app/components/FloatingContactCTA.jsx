'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { MessageCircle, Calendar, Mail, X } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

function WhatsAppIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function FloatingContactCTA({ onScrollToContact }) {
  const t = useTranslations('contactSection.floatingCta');
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  const whatsappMessage = encodeURIComponent(t('whatsappMessage'));

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const accent = isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)';
  const menuBg = isDark ? 'rgb(30, 41, 59)' : 'rgb(255, 255, 255)';
  const border = isDark ? 'rgb(51, 65, 85)' : 'rgb(226, 232, 240)';
  const text = isDark ? 'rgb(241, 245, 249)' : 'rgb(15, 23, 42)';

  const actions = [
    whatsappNumber && {
      key: 'whatsapp',
      label: t('whatsapp'),
      href: `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
      external: true,
      icon: WhatsAppIcon,
      color: 'rgb(37, 211, 102)',
    },
    calendlyUrl && {
      key: 'calendly',
      label: t('schedule'),
      href: calendlyUrl,
      external: true,
      icon: Calendar,
      color: accent,
    },
    contactEmail && {
      key: 'email',
      label: t('email'),
      href: `mailto:${contactEmail}`,
      external: true,
      icon: Mail,
      color: accent,
    },
    {
      key: 'contact',
      label: t('contact'),
      onClick: () => {
        setIsOpen(false);
        onScrollToContact?.();
      },
      icon: MessageCircle,
      color: accent,
    },
  ].filter(Boolean);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {isOpen && (
        <div
          className="rounded-xl border shadow-2xl overflow-hidden min-w-[200px] animate-fadeIn"
          style={{ backgroundColor: menuBg, borderColor: border }}
        >
          {actions.map((action) => {
            const Icon = action.icon;
            const content = (
              <>
                <Icon size={18} style={{ color: action.color }} />
                <span className="text-sm font-medium" style={{ color: text }}>
                  {action.label}
                </span>
              </>
            );

            if (action.onClick) {
              return (
                <button
                  key={action.key}
                  type="button"
                  onClick={action.onClick}
                  className="flex items-center gap-3 w-full px-4 py-3 text-left transition-colors hover:opacity-80"
                  style={{ borderBottom: `1px solid ${border}` }}
                >
                  {content}
                </button>
              );
            }

            return (
              <a
                key={action.key}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full px-4 py-3 transition-colors hover:opacity-80"
                style={{ borderBottom: `1px solid ${border}` }}
                onClick={() => setIsOpen(false)}
              >
                {content}
              </a>
            );
          })}
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all hover:scale-110"
        style={{
          backgroundColor: isOpen ? (isDark ? 'rgb(51, 65, 85)' : 'rgb(100, 116, 139)') : 'rgb(37, 211, 102)',
          color: 'rgb(255, 255, 255)',
        }}
        aria-label={isOpen ? t('close') : t('open')}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} /> : <WhatsAppIcon size={26} />}
      </button>
    </div>
  );
}
