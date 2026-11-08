import React, { useState } from 'react';
import { 
  Wrench, 
  Search, 
  Menu, 
  X, 
  CheckCircle2, 
  Zap,
  Calculator
} from 'lucide-react';

interface BlogHeaderProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  activeView: 'blog' | 'lookup' | 'calculator' | 'sprint' | 'legal';
  onNavigate: (view: 'blog' | 'lookup' | 'calculator' | 'sprint' | 'legal') => void;
  onOpenAdSenseModal: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  publishedCount: number;
}

export const BlogHeader: React.FC<BlogHeaderProps> = ({
  activeCategory,
  onSelectCategory,
  activeView,
  onNavigate,
  onOpenAdSenseModal,
  searchQuery,
  onSearchChange,
  publishedCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const categories = [
    { id: 'All', label: 'All Articles' },
    { id: 'Dishwasher', label: 'Dishwashers' },
    { id: 'Washing Machine', label: 'Washers & Dryers' },
    { id: 'HVAC & Heating', label: 'HVAC & Filters' },
    { id: 'Plumbing', label: 'Plumbing DIY' },
    { id: 'Refrigerator', label: 'Refrigerators' },
    { id: 'Garbage Disposal', label: 'Disposals' }
  ];

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-40 w-full shadow-2xs">

      {/* Main Masthead */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 border-b border-stone-100">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Newspaper Title */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('blog');
              onSelectCategory('All');
            }}
            className="text-left group no-underline text-inherit block cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-4xl font-extrabold tracking-tight text-stone-900 font-editorial group-hover:text-blue-700 transition-colors">
                ReportIQ<span className="text-blue-600 font-sans text-xl sm:text-2xl ml-1 font-bold">.DIY</span>
              </span>
              <span className="hidden sm:inline text-xs uppercase tracking-widest font-bold text-stone-400 border-l border-stone-300 pl-2">
                Home Diagnostics · Est. 2024
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5 tracking-wide">
              Independent DIY Repair Reports, Appliance Error Codes & Practical Tool Reviews
            </p>
          </a>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-3">
            {/* Search Input on Desktop */}
            <div className="relative hidden md:block w-64 lg:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (activeView !== 'blog') onNavigate('blog');
                }}
                placeholder="Search error codes, leaks, filters..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 text-stone-800 border border-stone-200 rounded-full focus:outline-none focus:ring-2 focus:ring-stone-400 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-stone-400 hover:text-stone-700"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Error Code Tool CTA Button */}
            <a
              href="/lookup"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('lookup');
              }}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs no-underline ${
                activeView === 'lookup'
                  ? 'bg-blue-600 text-white'
                  : 'bg-stone-900 text-stone-100 hover:bg-stone-800'
              }`}
            >
              <Wrench className="w-3.5 h-3.5 text-amber-400" />
              <span>Error Code Lookup Tool</span>
            </a>

            {/* Repair vs Replace Calculator CTA Button */}
            <a
              href="/calculator"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('calculator');
              }}
              className={`hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs no-underline ${
                activeView === 'calculator'
                  ? 'bg-amber-400 text-stone-950 font-black'
                  : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-blue-600" />
              <span>Repair vs Replace</span>
            </a>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-1 md:hidden">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-stone-600 hover:text-stone-900"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-stone-600 hover:text-stone-900"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Dropdown */}
        {isSearchOpen && (
          <div className="mt-3 md:hidden">
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (activeView !== 'blog') onNavigate('blog');
                }}
                placeholder="Search guides (e.g. E15, furnace filter)..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
            </div>
          </div>
        )}
      </div>

      {/* Editorial Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between overflow-x-auto no-scrollbar py-2 text-xs">
          <nav className="flex items-center gap-1 shrink-0">
            {categories.map(cat => {
              const isSelected = activeView === 'blog' && activeCategory === cat.id;
              const catHref = cat.id === 'All' ? '/' : `/category/${cat.id.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
              return (
                <a
                  key={cat.id}
                  href={catHref}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('blog');
                    onSelectCategory(cat.id);
                  }}
                  className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors no-underline block ${
                    isSelected
                      ? 'bg-stone-900 text-white font-bold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  {cat.label}
                </a>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-2 shrink-0 pl-4 border-l border-stone-200 text-xs">
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('legal');
              }}
              className="text-stone-600 hover:text-stone-900 font-semibold px-2.5 py-1.5 hover:bg-stone-100 rounded-md transition-colors no-underline block"
            >
              About the Master Technicians
            </a>
            <a
              href="/lookup"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('lookup');
              }}
              className="text-blue-700 bg-blue-50 hover:bg-blue-100 font-bold px-3 py-1.5 rounded-md transition-colors no-underline block"
            >
              Diagnostic Tool
            </a>
            <a
              href="/calculator"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('calculator');
              }}
              className="text-amber-800 bg-amber-50 hover:bg-amber-100 font-bold px-3 py-1.5 rounded-md transition-colors no-underline block"
            >
              50% Rule Calculator
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-stone-50 px-4 pt-3 pb-6 space-y-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 px-2">
            Categories & Sections
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  onNavigate('blog');
                  onSelectCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-lg text-xs font-semibold ${
                  activeView === 'blog' && activeCategory === cat.id
                    ? 'bg-stone-900 text-white'
                    : 'bg-white text-stone-700 hover:bg-stone-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-stone-200 space-y-2">
            <button
              onClick={() => {
                onNavigate('lookup');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold"
            >
              <span>🛠️ Appliance Error Code Tool</span>
              <span>Open →</span>
            </button>
            <button
              onClick={() => {
                onNavigate('legal');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 bg-white text-stone-700 hover:bg-stone-100 border border-stone-200 rounded-lg text-xs font-semibold"
            >
              About the Editors & Editorial Policy
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
