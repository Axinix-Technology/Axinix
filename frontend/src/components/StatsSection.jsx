import React from 'react';
import { COMPANY_STATS } from '../api/data';
import { cn } from '../utils/cn';

export function StatsSection({
  title = 'Technology That Businesses Can Rely On',
  subtitle = 'Verified operational track record powering enterprise deployments.',
  stats = COMPANY_STATS,
  className = '',
}) {
  return (
    <section className={cn('py-8 sm:py-10 px-4 sm:px-6 lg:px-8 border-b border-white/[0.08] bg-transparent w-full', className)}>
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-6">
            {title && (
              <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-foreground">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xs sm:text-sm text-muted mt-1.5">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-card/90 backdrop-blur-md border border-border rounded-xl p-5 text-center transition-all shadow-sm hover:shadow-md hover:border-gold hover:-translate-y-0.5"
            >
              <div className="text-3xl sm:text-4xl font-serif font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-gold mt-1.5 uppercase tracking-wider">
                {stat.label}
              </div>
              {stat.change && (
                <div className="text-[11px] text-muted mt-1">
                  {stat.change}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
