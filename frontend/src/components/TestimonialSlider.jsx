import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../api/data';
import { cn } from '../utils/cn';

export function TestimonialSlider({ testimonials = TESTIMONIALS, autoPlay = true, className = '' }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!autoPlay || testimonials.length <= 1) return;
    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [autoPlay, testimonials.length]);

  if (!testimonials || testimonials.length === 0) return null;
  const current = testimonials[active];

  return (
    <div className={cn('bg-card border border-border/90 rounded-2xl p-8 sm:p-12 shadow-xl relative min-h-[220px] flex flex-col justify-between max-w-4xl mx-auto', className)}>
      <div className="flex justify-center gap-1 text-gold mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={18} fill="currentColor" />
        ))}
      </div>

      <p className="text-base sm:text-lg text-foreground/95 italic font-serif leading-relaxed mb-6 text-center">
        "{current.quote}"
      </p>

      <div className="text-center">
        <b className="text-sm font-semibold text-foreground block">
          {current.client}
        </b>
        <span className="text-xs text-muted">
          {current.role} {current.location ? `· ${current.location}` : ''}
        </span>
      </div>

      {testimonials.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                active === i ? 'bg-gold w-6' : 'bg-muted/40 hover:bg-muted'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

