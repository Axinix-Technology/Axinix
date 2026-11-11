import React, { useState, useEffect } from 'react';
import { ANNOUNCEMENTS } from '../api/data';

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <aside aria-label="Announcement" className="bg-deep border-b border-border/40 py-2 px-4 text-center text-xs tracking-wider text-gold font-medium select-none overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span>
        <p className="transition-all duration-500 ease-in-out transform">
          {ANNOUNCEMENTS[index]}
        </p>
      </div>
    </aside>
  );
}

