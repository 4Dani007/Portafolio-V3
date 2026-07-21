'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const FORM_ENDPOINT = 'https://api.web3forms.com/submit';

export default function ContactForm() {
  const t = useTranslations('contactSection.form');
  const { isDark } = useTheme();
  const [status, setStatus] = useState('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const accessKey = process.env.NEXT_PUBLIC_FORM_ACCESS_KEY;
  const subjectOptions = t.raw('subjectOptions');

  const colors = {
    bg: isDark ? 'rgb(30, 41, 59)' : 'rgb(255, 255, 255)',
    border: isDark ? 'rgb(51, 65, 85)' : 'rgb(226, 232, 240)',
    text: isDark ? 'rgb(241, 245, 249)' : 'rgb(15, 23, 42)',
    muted: isDark ? 'rgb(148, 163, 184)' : 'rgb(100, 116, 139)',
    accent: isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)',
    inputBg: isDark ? 'rgb(15, 23, 42)' : 'rgb(248, 250, 252)',
    success: isDark ? 'rgb(74, 222, 128)' : 'rgb(22, 163, 74)',
    error: isDark ? 'rgb(248, 113, 113)' : 'rgb(220, 38, 38)',
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accessKey) {
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputStyle = {
    backgroundColor: colors.inputBg,
    borderColor: colors.border,
    color: colors.text,
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg p-6 border text-left space-y-4"
      style={{ backgroundColor: colors.bg, borderColor: colors.border }}
    >
      <h3 className="text-lg font-semibold" style={{ color: colors.text }}>
        {t('title')}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium mb-1" style={{ color: colors.muted }}>
            {t('name')} *
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border text-sm outline-none focus:ring-2 transition-shadow"
            style={inputStyle}
            disabled={status === 'loading'}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium mb-1" style={{ color: colors.muted }}>
            {t('email')} *
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border text-sm outline-none focus:ring-2 transition-shadow"
            style={inputStyle}
            disabled={status === 'loading'}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-sm font-medium mb-1" style={{ color: colors.muted }}>
          {t('subject')} *
        </label>
        <select
          id="contact-subject"
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-lg border text-sm outline-none focus:ring-2 transition-shadow"
          style={inputStyle}
          disabled={status === 'loading'}
        >
          <option value="">{t('subjectPlaceholder')}</option>
          {Array.isArray(subjectOptions) &&
            subjectOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium mb-1" style={{ color: colors.muted }}>
          {t('message')} *
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder={t('messagePlaceholder')}
          className="w-full px-3 py-2 rounded-lg border text-sm outline-none focus:ring-2 transition-shadow resize-none"
          style={inputStyle}
          disabled={status === 'loading'}
        />
      </div>

      {status === 'success' && (
        <div className="flex items-center gap-2 text-sm" style={{ color: colors.success }}>
          <CheckCircle2 size={18} />
          {t('success')}
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-center gap-2 text-sm" style={{ color: colors.error }}>
          <AlertCircle size={18} />
          {t('error')}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg font-medium transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
        style={{ backgroundColor: colors.accent, color: 'rgb(255, 255, 255)' }}
      >
        {status === 'loading' ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            {t('sending')}
          </>
        ) : (
          <>
            <Send size={18} />
            {t('submit')}
          </>
        )}
      </button>
    </form>
  );
}
