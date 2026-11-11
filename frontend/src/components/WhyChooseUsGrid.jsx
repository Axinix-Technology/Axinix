import React from 'react';
import { WHY_CHOOSE_US } from '../api/data';
import { cn } from '../utils/cn';

export function WhyChooseUsGrid({ items = WHY_CHOOSE_US, className = '' }) {
  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6', className)}>
      {items.map((item, idx) => (
        <div
          key={idx}
          className="bg-card/90 backdrop-blur-md border border-border/80 rounded-xl p-6 hover:border-gold/60 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0E77C6]/15"
        >
          <div className="w-10 h-10 rounded-lg bg-gold/15 text-gold flex items-center justify-center font-bold text-sm mb-4 border border-gold/30">
            ✓
          </div>
          <h3 className="text-base font-serif font-semibold text-foreground mb-2">
            {item.title}
          </h3>
          <p className="text-xs text-muted leading-relaxed">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
