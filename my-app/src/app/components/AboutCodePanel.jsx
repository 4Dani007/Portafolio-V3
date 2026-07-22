'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Terminal, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const TYPE_SPEED_MS = 28;
const PAUSE_AFTER_COMPLETE_MS = 2200;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(media.matches);
    const handler = (event) => setReduced(event.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  return reduced;
}

export default function AboutCodePanel() {
  const t = useTranslations('aboutSection.codePanel');
  const { isDark } = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();

  const snippets = useMemo(() => t.raw('snippets') || [], [t]);
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const currentSnippet = snippets[snippetIndex] || { filename: 'code.txt', code: '' };
  const fullCode = currentSnippet.code || '';

  const colors = {
    bg: isDark ? 'rgb(15, 23, 42)' : 'rgb(255, 255, 255)',
    headerBg: isDark ? 'rgb(30, 41, 59)' : 'rgb(230, 244, 255)',
    border: isDark ? 'rgb(51, 65, 85)' : 'rgb(0, 102, 204)',
    text: isDark ? 'rgb(226, 232, 240)' : 'rgb(15, 23, 42)',
    muted: isDark ? 'rgb(148, 163, 184)' : 'rgb(100, 116, 139)',
    accent: isDark ? 'rgb(96, 165, 250)' : 'rgb(0, 102, 204)',
    codeBg: isDark ? 'rgb(15, 23, 42)' : 'rgb(248, 250, 252)',
    success: isDark ? 'rgb(74, 222, 128)' : 'rgb(22, 163, 74)',
    dotRed: 'rgb(239, 68, 68)',
    dotYellow: 'rgb(250, 204, 21)',
    dotGreen: 'rgb(34, 197, 94)',
  };

  useEffect(() => {
    setSnippetIndex(0);
    setDisplayedText('');
    setIsComplete(false);
  }, [snippets]);

  useEffect(() => {
    if (!fullCode) return;

    if (prefersReducedMotion) {
      setDisplayedText(fullCode);
      setIsComplete(true);
      const timer = setTimeout(() => {
        setSnippetIndex((prev) => (prev + 1) % snippets.length);
        setIsComplete(false);
      }, PAUSE_AFTER_COMPLETE_MS);
      return () => clearTimeout(timer);
    }

    if (displayedText.length < fullCode.length) {
      const timer = setTimeout(() => {
        setDisplayedText(fullCode.slice(0, displayedText.length + 1));
      }, TYPE_SPEED_MS);
      return () => clearTimeout(timer);
    }

    if (!isComplete) {
      setIsComplete(true);
    }
  }, [displayedText, fullCode, isComplete, prefersReducedMotion, snippets.length]);

  useEffect(() => {
    if (!isComplete || prefersReducedMotion || snippets.length <= 1) return;

    const timer = setTimeout(() => {
      setIsComplete(false);
      setDisplayedText('');
      setSnippetIndex((prev) => (prev + 1) % snippets.length);
    }, PAUSE_AFTER_COMPLETE_MS);

    return () => clearTimeout(timer);
  }, [isComplete, prefersReducedMotion, snippets.length]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    setDisplayedText('');
    setIsComplete(false);
  }, [snippetIndex, prefersReducedMotion]);

  const showCursor = !prefersReducedMotion && !isComplete;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg rounded-xl border shadow-2xl overflow-hidden"
      style={{
        backgroundColor: colors.bg,
        borderColor: colors.border,
        borderWidth: isDark ? '1px' : '2px',
      }}
      aria-label={t('stack')}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ backgroundColor: colors.headerBg, borderColor: colors.border }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.dotRed }} />
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.dotYellow }} />
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.dotGreen }} />
          </div>
          <AnimatePresence mode="wait">
            <motion.span
              key={currentSnippet.filename}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="text-xs font-mono truncate"
              style={{ color: colors.muted }}
            >
              {currentSnippet.filename}
            </motion.span>
          </AnimatePresence>
        </div>
        <Terminal size={16} style={{ color: colors.accent }} className="shrink-0" />
      </div>

      {/* Code area */}
      <div
        className="p-4 min-h-[220px] sm:min-h-[240px] overflow-hidden"
        style={{ backgroundColor: colors.codeBg }}
      >
        <pre
          className="text-xs sm:text-sm font-mono leading-relaxed whitespace-pre-wrap break-words"
          style={{ color: colors.text }}
        >
          <code>{displayedText}</code>
          {showCursor && (
            <span
              className="inline-block w-2 ml-0.5 align-middle animate-pulse"
              style={{
                height: '1em',
                backgroundColor: colors.accent,
              }}
              aria-hidden="true"
            />
          )}
        </pre>

        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mt-4 pt-3 border-t text-xs font-mono"
            style={{ borderColor: colors.border, color: colors.success }}
          >
            <CheckCircle2 size={14} />
            {t('success')}
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <div
        className="px-4 py-2 border-t text-center"
        style={{ borderColor: colors.border, backgroundColor: colors.headerBg }}
      >
        <span className="text-[11px] font-mono" style={{ color: colors.muted }}>
          {t('stack')}
        </span>
      </div>
    </motion.div>
  );
}
