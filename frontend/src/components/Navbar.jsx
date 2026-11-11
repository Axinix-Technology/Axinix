import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Menu, X, ChevronDown, Sun, Moon, ArrowRight, User, ShoppingCart, Sparkles, Command } from 'lucide-react';
import { SOLUTIONS, INDUSTRIES, SERVICES } from '../api/data';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useCart } from '../context/CartContext';
import { Button } from './ui/Button';
import { IconRenderer } from './IconRenderer';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMega, setActiveMega] = useState(null);
  const [cartPulse, setCartPulse] = useState(false);
  const searchInputRef = useRef(null);
  const megaRef = useRef(null);

  const { isDark, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const { cartCount } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Pulse cart indicator whenever cartCount changes
  useEffect(() => {
    if (cartCount > 0) {
      setCartPulse(true);
      const timer = setTimeout(() => setCartPulse(false), 800);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  // Global Ctrl+K / Cmd+K / / shortcut to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      } else if (e.key === 'Escape') {
        setActiveMega(null);
        setMobileOpen(false);
        if (searchInputRef.current) {
          searchInputRef.current.blur();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileOpen(false);
      setActiveMega(null);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-1.5 rounded-md hover:text-gold ${
      isActive ? 'text-gold bg-white/5 font-bold shadow-xs' : 'text-slate-100 hover:bg-white/5'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-[#061126]/90 backdrop-blur-md text-white border-b border-white/10 transition-colors shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-gold focus:outline-none transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Brand Logo with exact 4-color gradient from uploaded brand mark */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#123E87] via-[#0E77C6] via-[#1CC7F4] to-[#05B292] p-[1.5px] flex items-center justify-center shadow-md shadow-[#0E77C6]/30 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#061126] rounded-[10px] flex items-center justify-center">
                <span className="font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-[#1CC7F4] to-[#05B292] text-lg">A</span>
              </div>
            </div>
            <span className="font-sans font-bold text-base sm:text-lg tracking-wider text-white group-hover:text-gold transition-colors">
              AXINIX <span className="text-gold font-bold">TECHNOLOGIES</span>
            </span>
          </Link>

          {/* Quick Search bar with Ctrl+K shortcut badge */}
          <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center relative max-w-xs xl:max-w-sm w-full">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search solutions, products, services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0A1429]/90 border border-white/15 rounded-lg py-1.5 pl-9 pr-14 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all shadow-inner"
            />
            <Search size={14} className="absolute left-3 text-slate-400 pointer-events-none" />
            <kbd className="absolute right-2 px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-white/10 border border-white/10 pointer-events-none flex items-center gap-0.5">
              <span className="text-[9px]">Ctrl</span> K
            </kbd>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-lg text-slate-300 hover:text-gold hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Shopping Cart Pill */}
            <Link
              to="/cart"
              className={`relative p-2 rounded-lg text-slate-300 hover:text-gold hover:bg-white/10 transition-all ${
                cartPulse ? 'scale-110 bg-gold/20 text-gold' : ''
              }`}
              title="View Cart & Configuration"
              aria-label="Shopping Cart"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className={`absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold text-deep font-bold text-[10px] flex items-center justify-center font-mono shadow-sm shadow-gold/50 ${
                  cartPulse ? 'animate-bounce' : ''
                }`}>
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Customer Account / Login */}
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/customer-account">
                  <Button size="sm" variant="outline" className="gap-1.5 text-xs text-white border-white/30 hover:border-gold hover:text-gold hover:bg-white/10">
                    <User size={13} className="text-gold" />
                    <span>My Account</span>
                  </Button>
                </Link>
                <Button size="sm" variant="ghost" onClick={logout} className="text-xs text-slate-300 hover:text-white">
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link to="/customer-account" className="hidden sm:block">
                <Button size="sm" variant="outline" className="gap-1.5 text-xs text-white border-white/30 hover:border-gold hover:text-gold hover:bg-white/10">
                  <User size={13} />
                  <span>Client Portal</span>
                </Button>
              </Link>
            )}

            {/* Book a Demo CTA */}
            <Link to="/demo">
              <Button size="sm" variant="gold" className="font-semibold shadow-gold/20 text-xs gap-1.5">
                <Sparkles size={13} />
                <span>Book Demo</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Desktop Navigation Links & Luminous Mega Menus */}
        <nav ref={megaRef} className="hidden md:flex items-center space-x-1 border-t border-white/10 py-1.5 text-xs relative">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>

          {/* Solutions Mega Menu */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMega('solutions')}
            onMouseLeave={() => setActiveMega(null)}
          >
            <NavLink to="/solutions" className={navLinkClass}>
              <span>Solutions</span>
              <ChevronDown size={13} className={`transition-transform duration-200 ${activeMega === 'solutions' ? 'rotate-180 text-gold' : ''}`} />
            </NavLink>

            {activeMega === 'solutions' && (
              <div className="absolute top-full left-0 w-[640px] bg-[#0F172A] border border-gold/30 rounded-xl shadow-2xl p-5 z-50 animate-in fade-in slide-in-from-top-1 duration-150 backdrop-blur-2xl">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
                    <span className="text-[11px] font-bold text-white uppercase tracking-wider">Enterprise Software Solutions</span>
                  </div>
                  <Link
                    to="/solutions"
                    onClick={() => setActiveMega(null)}
                    className="text-[11px] text-gold hover:underline font-medium inline-flex items-center gap-1"
                  >
                    View All Suites <ArrowRight size={11} />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {SOLUTIONS.map(sol => (
                    <Link
                      key={sol.id}
                      to={`/solutions/${sol.id}`}
                      onClick={() => setActiveMega(null)}
                      className="p-3 rounded-lg bg-white/5 hover:bg-gold/10 group border border-white/10 hover:border-gold/40 transition-all flex items-start gap-3"
                    >
                      <div className="w-9 h-9 rounded-md bg-gold/15 border border-gold/30 text-gold flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <IconRenderer name={sol.icon || 'Layers'} size={18} />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-white group-hover:text-gold text-xs flex items-center justify-between">
                          <span className="truncate">{sol.title}</span>
                          <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-gold shrink-0" />
                        </div>
                        <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">{sol.subtitle}</p>
                        <span className="inline-block mt-1 text-[9px] px-1.5 py-0.2 rounded bg-white/10 text-gold font-mono uppercase tracking-wider">
                          {sol.badge}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Industries Mega Menu */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMega('industries')}
            onMouseLeave={() => setActiveMega(null)}
          >
            <NavLink to="/industries" className={navLinkClass}>
              <span>Industries</span>
              <ChevronDown size={13} className={`transition-transform duration-200 ${activeMega === 'industries' ? 'rotate-180 text-gold' : ''}`} />
            </NavLink>

            {activeMega === 'industries' && (
              <div className="absolute top-full left-0 w-[680px] bg-[#0F172A] border border-gold/30 rounded-xl shadow-2xl p-5 z-50 animate-in fade-in slide-in-from-top-1 duration-150 backdrop-blur-2xl">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-royal-light animate-pulse"></span>
                    <span className="text-[11px] font-bold text-white uppercase tracking-wider">Verticals & Domain Expertise</span>
                  </div>
                  <Link
                    to="/industries"
                    onClick={() => setActiveMega(null)}
                    className="text-[11px] text-gold hover:underline font-semibold inline-flex items-center gap-1"
                  >
                    View All 16+ Verticals <ArrowRight size={11} />
                  </Link>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  {INDUSTRIES.slice(0, 12).map(ind => (
                    <Link
                      key={ind.id}
                      to={`/industries/${ind.id}`}
                      onClick={() => setActiveMega(null)}
                      className="p-2.5 rounded-lg bg-white/5 hover:bg-gold/10 group transition-all border border-white/10 hover:border-gold/40 flex items-start gap-2.5"
                    >
                      <div className="w-7 h-7 rounded bg-royal/20 text-gold flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                        <IconRenderer name={ind.icon || 'Store'} size={14} />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-white group-hover:text-gold text-xs truncate">
                          {ind.name}
                        </div>
                        <span className="text-[10px] text-slate-400 block truncate mt-0.5">{ind.category}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Services Mega Menu */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMega('services')}
            onMouseLeave={() => setActiveMega(null)}
          >
            <NavLink to="/services" className={navLinkClass}>
              <span>Services</span>
              <ChevronDown size={13} className={`transition-transform duration-200 ${activeMega === 'services' ? 'rotate-180 text-gold' : ''}`} />
            </NavLink>

            {activeMega === 'services' && (
              <div className="absolute top-full left-0 w-[600px] bg-[#0F172A] border border-gold/30 rounded-xl shadow-2xl p-5 z-50 animate-in fade-in slide-in-from-top-1 duration-150 backdrop-blur-2xl">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-[11px] font-bold text-white uppercase tracking-wider">Technology & Engineering Services</span>
                  </div>
                  <Link
                    to="/services"
                    onClick={() => setActiveMega(null)}
                    className="text-[11px] text-gold hover:underline font-semibold inline-flex items-center gap-1"
                  >
                    All Services <ArrowRight size={11} />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {SERVICES.map(srv => (
                    <Link
                      key={srv.id}
                      to={`/services/${srv.id}`}
                      onClick={() => setActiveMega(null)}
                      className="p-3 rounded-lg bg-white/5 hover:bg-gold/10 group border border-white/10 hover:border-gold/40 transition-all flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-md bg-royal/20 text-gold flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <IconRenderer name={srv.icon || 'Code2'} size={16} />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-white group-hover:text-gold text-xs flex items-center justify-between">
                          <span className="truncate">{srv.title}</span>
                          <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-gold" />
                        </div>
                        <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">{srv.subtitle}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <NavLink to="/products" className={navLinkClass}>
            Products
          </NavLink>
          <NavLink to="/portfolio" className={navLinkClass}>
            Portfolio
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About Us
          </NavLink>
          <NavLink to="/delivery" className={navLinkClass}>
            Track Order
          </NavLink>
          <NavLink to="/insights" className={navLinkClass}>
            Insights
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact Us
          </NavLink>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0F172A] border-b border-white/10 px-4 pt-3 pb-6 space-y-3 animate-in fade-in duration-200">
          <form onSubmit={handleSearchSubmit} className="relative mb-3">
            <input
              type="text"
              placeholder="Search AXINIX..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0A1429] border border-white/20 rounded-lg py-2 pl-9 pr-3 text-xs text-white"
            />
            <Search size={14} className="absolute left-3 top-3 text-slate-400" />
          </form>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <Link to="/" onClick={() => setMobileOpen(false)} className="p-2.5 rounded-lg bg-white/5 text-white hover:text-gold font-medium">Home</Link>
            <Link to="/solutions" onClick={() => setMobileOpen(false)} className="p-2.5 rounded-lg bg-white/5 text-white hover:text-gold font-medium">Solutions</Link>
            <Link to="/industries" onClick={() => setMobileOpen(false)} className="p-2.5 rounded-lg bg-white/5 text-white hover:text-gold font-medium">Industries</Link>
            <Link to="/services" onClick={() => setMobileOpen(false)} className="p-2.5 rounded-lg bg-white/5 text-white hover:text-gold font-medium">Services</Link>
            <Link to="/products" onClick={() => setMobileOpen(false)} className="p-2.5 rounded-lg bg-white/5 text-white hover:text-gold font-medium">Products</Link>
            <Link to="/cart" onClick={() => setMobileOpen(false)} className="p-2.5 rounded-lg bg-white/5 text-white hover:text-gold font-medium flex items-center justify-between">
              <span>Cart</span>
              {cartCount > 0 && <span className="px-1.5 py-0.5 rounded-full bg-gold text-deep font-bold text-[10px]">{cartCount}</span>}
            </Link>
            <Link to="/delivery" onClick={() => setMobileOpen(false)} className="p-2.5 rounded-lg bg-white/5 text-white hover:text-gold font-medium">Track Order</Link>
            <Link to="/customer-account" onClick={() => setMobileOpen(false)} className="p-2.5 rounded-lg bg-white/5 text-white hover:text-gold font-medium">My Account</Link>
            <Link to="/about" onClick={() => setMobileOpen(false)} className="p-2.5 rounded-lg bg-white/5 text-white hover:text-gold font-medium">About Us</Link>
            <Link to="/contact" onClick={() => setMobileOpen(false)} className="p-2.5 rounded-lg bg-white/5 text-white hover:text-gold font-medium">Contact Us</Link>
          </div>
        </div>
      )}
    </header>
  );
}
