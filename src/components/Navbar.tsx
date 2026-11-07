import React, { useState } from 'react';
import { 
  Wrench, 
  BookOpen, 
  Search, 
  Sparkles, 
  DollarSign, 
  Menu, 
  X, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface NavbarProps {
  activeView: 'lookup' | 'guides' | 'keywords' | 'studio' | 'legal';
  onNavigate: (view: 'lookup' | 'guides' | 'keywords' | 'studio' | 'legal') => void;
  onOpenAdSenseModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeView, 
  onNavigate, 
  onOpenAdSenseModal 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'lookup', label: 'Error Code Tool', icon: Wrench, badge: 'Interactive' },
    { id: 'guides', label: 'Repair Guides', icon: BookOpen },
    { id: 'keywords', label: 'PAA Keyword Hub', icon: Search, badge: 'High RPM' },
    { id: 'studio', label: 'AI Prompt Studio', icon: Sparkles },
    { id: 'legal', label: 'About & Trust', icon: ShieldCheck }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo */}
          <button
            onClick={() => onNavigate('lookup')}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  HomeFix<span className="text-blue-600">Pro</span>
                </span>
                <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded uppercase">
                  DIY Hub
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium">Home Maintenance & Diagnostics</p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id as any)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all relative ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* AdSense Approval Checklist CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenAdSenseModal}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-xs transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>AdSense Readiness (30/30)</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onOpenAdSenseModal}
              className="p-2 text-slate-700 bg-slate-100 rounded-lg text-xs font-bold"
              title="AdSense Audit"
            >
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-1 shadow-lg">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id as any);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-black ${
                    isActive ? 'bg-blue-700 text-white' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                onOpenAdSenseModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>AdSense Approval Audit Checklist</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
