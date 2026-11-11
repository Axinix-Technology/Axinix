import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { Button } from './ui/Button';
import { DashboardPreview } from './DashboardPreview';

/**
 * HeroBanner: High-impact reusable hero section with luminous sapphire gradient.
 * Uses the brand multi-color mix: Deep Cobalt (#123E87), Cerulean (#0E77C6), Cyan (#1CC7F4), Teal (#05B292).
 */
export function HeroBanner({
  badge = 'AXINIX TECHNOLOGIES',
  title = 'Powering Every Industry.',
  highlight = 'Enabling Every Possibility.',
  description = 'From intelligent ERP software to high-performance retail POS, custom web applications, and digital marketing, AXINIX TECHNOLOGIES simplifies enterprise operations and accelerates measurable business growth.',
  primaryAction = { label: 'Explore Our Solutions', to: '/solutions' },
  secondaryAction = { label: 'Book a Free Consultation', to: '/contact/create' },
  trustPoints = [
    { label: 'Zero Vendor Lock-in', icon: ShieldCheck, detail: '100% Data Portability' },
    { label: 'Custom Architecture', icon: Zap, detail: 'Bespoke Scalability' },
    { label: 'Dedicated 99.99% SLA Support', icon: CheckCircle2, detail: '24/7 Enterprise Response' },
  ],
}) {
  return (
    <section className="py-14 sm:py-22 px-4 sm:px-6 lg:px-8 border-b border-border/60 w-full text-foreground relative overflow-hidden bg-gradient-to-b from-[#1CC7F4]/10 via-[#0E77C6]/5 to-transparent dark:from-[#0E77C6]/20 dark:via-[#123E87]/14 dark:to-transparent">
      {/* Relative atmospheric highlight glows */}
      <div className="absolute -top-16 left-10 w-[700px] h-[450px] rounded-full bg-gradient-to-br from-[#1CC7F4]/14 via-[#0E77C6]/10 to-transparent blur-3xl pointer-events-none -z-0 opacity-60 dark:opacity-100"></div>
      <div className="absolute top-10 right-[-5%] w-[650px] h-[450px] rounded-full bg-gradient-to-bl from-[#05B292]/12 via-[#1CC7F4]/10 to-transparent blur-3xl pointer-events-none -z-0 opacity-60 dark:opacity-100"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
        {/* Left Column: Hero Content */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold-hover dark:text-gold text-xs font-semibold tracking-widest uppercase shadow-sm shadow-gold/20 backdrop-blur-md">
            <Sparkles size={14} className="animate-spin-slow" />
            <span>{badge}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
            {title} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-hover to-gold dark:from-gold dark:via-gold-light dark:to-white">
              {highlight}
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-200 max-w-2xl leading-relaxed mx-auto lg:mx-0">
            {description}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
            <Link to={primaryAction.to} className="w-full sm:w-auto">
              <Button size="lg" variant="gold" className="w-full sm:w-auto shadow-lg shadow-gold/25 gap-2 font-semibold">
                <span>{primaryAction.label}</span>
                <ArrowRight size={16} />
              </Button>
            </Link>
            <Link to={secondaryAction.to} className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-slate-800 border-slate-300 hover:bg-slate-100 hover:border-gold dark:text-white dark:border-white/40 dark:hover:bg-white/10 dark:hover:border-gold">
                {secondaryAction.label}
              </Button>
            </Link>
          </div>

          {/* Elevated Trust Pillars with Glowing Micro-indicators */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            {trustPoints.map((point, idx) => {
              const Icon = point.icon || CheckCircle2;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/80 border border-slate-200/80 shadow-xs dark:bg-white/5 dark:border-white/10 backdrop-blur-sm hover:border-gold/40 transition-colors"
                >
                  <div className="w-7 h-7 rounded-md bg-gold/20 text-gold flex items-center justify-center shrink-0">
                    <Icon size={14} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">{point.label}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-300 truncate">{point.detail}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Telemetry Dashboard */}
        <div className="lg:col-span-5 w-full">
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}
