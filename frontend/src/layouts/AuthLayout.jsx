import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ToastContainer } from '../components/ToastContainer';

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-deep text-foreground flex flex-col justify-between p-4 sm:p-8 brand-mesh-bg">
      <div className="max-w-md w-full mx-auto pt-6">
        <Link to="/" className="inline-block mb-8 text-center w-full">
          <span className="font-sans font-bold text-xl sm:text-2xl tracking-widest text-foreground hover:text-gold transition-colors">
            AXINIX <b className="text-gold font-bold">TECHNOLOGIES</b>
          </span>
        </Link>
        <div className="bg-card/90 border border-border/80 rounded-xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          <Outlet />
        </div>
      </div>
      <div className="text-center text-xs text-muted py-6">
        <Link to="/" className="hover:text-gold transition-colors">← Return to AXINIX Home</Link>
      </div>
      <ToastContainer />
    </div>
  );
}

