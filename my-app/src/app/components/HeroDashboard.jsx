'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  BarChart3,
  Wifi,
  CheckCircle2,
  Clock,
  RefreshCw,
  UserPlus,
  FileDown,
  Percent,
} from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const TAB_KEYS = ['projects', 'users', 'reports'];

const TAB_ICONS = {
  projects: FolderKanban,
  users: Users,
  reports: BarChart3,
};

const METRIC_ICONS = {
  projects: [LayoutDashboard, Wifi, Clock],
  users: [Users, CheckCircle2, UserPlus],
  reports: [BarChart3, FileDown, Percent],
};

const CHART_VALUES = {
  projects: [40, 65, 45, 80, 70, 55, 90],
  users: [55, 48, 62, 70, 58, 30, 25],
  reports: [30, 45, 60, 55, 75, 85, 95],
};

const STATUS_ICONS = {
  active: CheckCircle2,
  pending: Clock,
  synced: RefreshCw,
};

function AnimatedMetric({ value, duration = 1.2 }) {
  const isPercent = value.includes('%');
  const numericPart = parseInt(value, 10);
  const suffixText = isPercent ? '%' : value.includes('/') ? value.replace(/^\d+/, '') : '';
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (Number.isNaN(numericPart)) return;

    setDisplay(0);
    let start = 0;
    const step = numericPart / (duration * 60);
    const interval = setInterval(() => {
      start += step;
      if (start >= numericPart) {
        setDisplay(numericPart);
        clearInterval(interval);
      } else {
        setDisplay(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [numericPart, duration, value]);

  if (Number.isNaN(numericPart)) {
    return <span>{value}</span>;
  }

  return (
    <span>
      {display}
      {suffixText}
    </span>
  );
}

export default function HeroDashboard() {
  const t = useTranslations('heroDashboard');
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('projects');
  const [hoveredRow, setHoveredRow] = useState(null);

  const chartDays = t.raw('chart.days');
  const tabContent = t.raw(`tabContent.${activeTab}`);
  const chartValues = CHART_VALUES[activeTab];
  const metricIcons = METRIC_ICONS[activeTab];
  const metricKeys = ['processes', 'apis', 'timeSaved'];

  const colors = {
    bg: isDark ? 'rgb(15, 23, 42)' : 'rgb(255, 255, 255)',
    border: isDark ? 'rgb(51, 65, 85)' : 'rgb(0, 102, 204)',
    headerBg: isDark ? 'rgb(30, 41, 59)' : 'rgb(230, 244, 255)',
    sidebarBg: isDark ? 'rgb(30, 41, 59)' : 'rgb(248, 250, 252)',
    text: isDark ? 'rgb(241, 245, 249)' : 'rgb(15, 23, 42)',
    muted: isDark ? 'rgb(148, 163, 184)' : 'rgb(100, 116, 139)',
    accent: isDark ? 'rgb(59, 130, 246)' : 'rgb(0, 102, 204)',
    accentSoft: isDark ? 'rgba(59, 130, 246, 0.15)' : 'rgba(0, 102, 204, 0.1)',
    cardBg: isDark ? 'rgb(30, 41, 59)' : 'rgb(255, 255, 255)',
    success: isDark ? 'rgb(74, 222, 128)' : 'rgb(22, 163, 74)',
    warning: isDark ? 'rgb(250, 204, 21)' : 'rgb(202, 138, 4)',
    info: isDark ? 'rgb(96, 165, 250)' : 'rgb(37, 99, 235)',
  };

  const statusColors = {
    active: colors.success,
    pending: colors.warning,
    synced: colors.info,
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
    setHoveredRow(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full max-w-lg rounded-xl border shadow-2xl overflow-hidden"
      style={{
        backgroundColor: colors.bg,
        borderColor: colors.border,
        borderWidth: isDark ? '1px' : '2px',
      }}
      aria-label={t('title')}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ backgroundColor: colors.headerBg, borderColor: colors.border }}
      >
        <div className="flex items-center gap-2">
          <LayoutDashboard size={18} style={{ color: colors.accent }} />
          <span className="text-sm font-semibold" style={{ color: colors.text }}>
            {t('title')}
          </span>
        </div>
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
          style={{ backgroundColor: isDark ? 'rgba(74, 222, 128, 0.15)' : 'rgba(22, 163, 74, 0.1)' }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: colors.success }}
          />
          <span style={{ color: colors.success }}>{t('apiConnected')}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row">
        {/* Sidebar tabs */}
        <nav
          className="flex sm:flex-col gap-1 p-2 sm:p-3 sm:w-36 border-b sm:border-b-0 sm:border-r shrink-0"
          style={{ backgroundColor: colors.sidebarBg, borderColor: colors.border }}
        >
          {TAB_KEYS.map((key) => {
            const Icon = TAB_ICONS[key];
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleTabChange(key)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all flex-1 sm:flex-none"
                style={{
                  backgroundColor: isActive ? colors.accentSoft : 'transparent',
                  color: isActive ? colors.accent : colors.muted,
                }}
              >
                <Icon size={14} />
                {t(`tabs.${key}`)}
              </button>
            );
          })}
        </nav>

        {/* Main content */}
        <div className="flex-1 p-3 sm:p-4 space-y-3 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-3"
            >
              {/* KPI cards */}
              <div className="grid grid-cols-3 gap-2">
                {metricKeys.map((key, index) => {
                  const Icon = metricIcons[index];
                  return (
                    <div
                      key={key}
                      className="p-2.5 rounded-lg border"
                      style={{
                        backgroundColor: colors.cardBg,
                        borderColor: colors.border,
                      }}
                    >
                      <Icon size={14} style={{ color: colors.accent }} className="mb-1" />
                      <p className="text-lg font-bold leading-tight" style={{ color: colors.text }}>
                        <AnimatedMetric value={tabContent.metrics[key].value} />
                      </p>
                      <p className="text-[10px] leading-tight mt-0.5" style={{ color: colors.muted }}>
                        {tabContent.metrics[key].label}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Chart */}
              <div
                className="p-3 rounded-lg border"
                style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}
              >
                <p className="text-xs font-medium mb-3" style={{ color: colors.muted }}>
                  {tabContent.chart.title}
                </p>
                <div className="flex items-end justify-between gap-1.5 h-20">
                  {chartValues.map((height, index) => (
                    <div key={index} className="flex flex-col items-center gap-1 flex-1">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: index * 0.06, duration: 0.5, ease: 'easeOut' }}
                        className="w-full rounded-t-sm min-h-[4px]"
                        style={{
                          backgroundColor: index === chartValues.length - 1
                            ? colors.accent
                            : isDark ? 'rgba(59, 130, 246, 0.45)' : 'rgba(0, 102, 204, 0.35)',
                        }}
                      />
                      <span className="text-[9px]" style={{ color: colors.muted }}>
                        {chartDays[index]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Table */}
              <div
                className="rounded-lg border overflow-hidden"
                style={{ borderColor: colors.border }}
              >
                <div
                  className="grid grid-cols-[1fr_1fr_auto] gap-2 px-3 py-2 text-[10px] font-semibold uppercase tracking-wide"
                  style={{ backgroundColor: colors.sidebarBg, color: colors.muted }}
                >
                  <span>{tabContent.table.col1}</span>
                  <span className="hidden sm:inline">{tabContent.table.col2}</span>
                  <span>{tabContent.table.col3}</span>
                </div>
                {tabContent.table.rows.map((row, index) => {
                  const StatusIcon = STATUS_ICONS[row.status];
                  const isHovered = hoveredRow === index;
                  return (
                    <div
                      key={`${activeTab}-${index}`}
                      className="grid grid-cols-[1fr_1fr_auto] gap-2 px-3 py-2 text-xs items-center transition-colors cursor-default"
                      style={{
                        backgroundColor: isHovered
                          ? colors.accentSoft
                          : index % 2 === 0
                            ? colors.cardBg
                            : colors.sidebarBg,
                        color: colors.text,
                      }}
                      onMouseEnter={() => setHoveredRow(index)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <span className="truncate font-medium">{row.primary}</span>
                      <span className="truncate hidden sm:inline" style={{ color: colors.muted }}>
                        {row.secondary}
                      </span>
                      <span
                        className="flex items-center gap-1 text-[10px] font-medium whitespace-nowrap"
                        style={{ color: statusColors[row.status] }}
                      >
                        <StatusIcon size={12} />
                        {t(`statusLabels.${row.status}`)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer stack */}
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
