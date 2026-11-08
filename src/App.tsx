/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BlogHeader } from './components/BlogHeader';
import { BlogHome } from './components/BlogHome';
import { ArticleView } from './components/ArticleView';
import { SixtyDaySprint } from './components/SixtyDaySprint';
import { ErrorLookupTool } from './components/ErrorLookupTool';
import { LegalPages } from './components/LegalPages';
import { Footer } from './components/Footer';
import { AdSenseChecklistModal } from './components/AdSenseChecklistModal';
import { ContractorLeadModal } from './components/ContractorLeadModal';
import { LeadsModal } from './components/LeadsModal';
import { REPAIR_GUIDES } from './data/guides';
import { ArticleGuide } from './types';

export default function App() {
  const [guides, setGuides] = useState<ArticleGuide[]>(() => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('reportiq_custom_guides');
        if (stored) {
          const parsed: ArticleGuide[] = JSON.parse(stored);
          // Merge custom guides ensuring no duplicates with default REPAIR_GUIDES
          const customUnique = parsed.filter(cg => !REPAIR_GUIDES.some(rg => rg.id === cg.id || rg.slug === cg.slug));
          return [...customUnique, ...REPAIR_GUIDES];
        }
      }
    } catch {
      // ignore
    }
    return REPAIR_GUIDES;
  });
  const [selectedGuide, setSelectedGuide] = useState<ArticleGuide | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeView, setActiveView] = useState<'blog' | 'lookup' | 'sprint' | 'legal'>('blog');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Secret Admin Access (Enabled strictly via ?admin=true in URL or Ctrl+Shift+A keyboard shortcut)
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('admin') === 'true' || params.get('editor') === 'true' || window.location.hash === '#admin') {
        localStorage.setItem('reportiq_admin', 'true');
        return true;
      }
      return localStorage.getItem('reportiq_admin') === 'true';
    }
    return false;
  });

  // Secret keyboard shortcut to toggle admin mode: Ctrl+Shift+A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdmin(prev => {
          const next = !prev;
          if (next) localStorage.setItem('reportiq_admin', 'true');
          else localStorage.removeItem('reportiq_admin');
          return next;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync view based on URL pathname (e.g. /guide/:slug, /lookup, /about, /privacy, etc.) and popstate (Back/Forward)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const syncRouteFromUrl = () => {
      const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
      
      if (path.startsWith('/guide/')) {
        const slug = path.replace('/guide/', '');
        const found = guides.find(g => g.slug.toLowerCase() === slug) || REPAIR_GUIDES.find(g => g.slug.toLowerCase() === slug);
        if (found) {
          setSelectedGuide(found);
          setActiveView('blog');
          document.title = `${found.title} | ReportIQ`;
          return;
        }
      } else if (path === '/lookup') {
        setActiveView('lookup');
        setSelectedGuide(null);
        document.title = 'Appliance Error Code Lookup Tool | ReportIQ';
        return;
      } else if (path === '/about' || path === '/privacy' || path === '/affiliate' || path === '/terms' || path === '/contact') {
        const tab = path.replace('/', '') as 'about' | 'privacy' | 'affiliate' | 'terms' | 'contact';
        setLegalInitialTab(tab);
        setActiveView('legal');
        setSelectedGuide(null);
        return;
      } else if (path.startsWith('/category/')) {
        const catSlug = path.replace('/category/', '');
        if (catSlug.includes('dish')) setActiveCategory('Dishwasher');
        else if (catSlug.includes('wash')) setActiveCategory('Washing Machine');
        else if (catSlug.includes('dry')) setActiveCategory('Dryer');
        else if (catSlug.includes('hvac')) setActiveCategory('HVAC & Heating');
        else if (catSlug.includes('plumb')) setActiveCategory('Plumbing');
        else if (catSlug.includes('refrig') || catSlug.includes('fridge')) setActiveCategory('Refrigerator');
        else if (catSlug.includes('disp')) setActiveCategory('Garbage Disposal');
        setActiveView('blog');
        setSelectedGuide(null);
        return;
      } else if (path === '/') {
        setSelectedGuide(null);
        setActiveView('blog');
        document.title = 'ReportIQ - Independent DIY Repair Reports & Diagnostics';
      }
    };

    window.addEventListener('popstate', syncRouteFromUrl);
    syncRouteFromUrl();

    return () => window.removeEventListener('popstate', syncRouteFromUrl);
  }, [guides]);

  // Modals
  const [isAdSenseModalOpen, setIsAdSenseModalOpen] = useState<boolean>(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState<boolean>(false);
  const [isLeadsModalOpen, setIsLeadsModalOpen] = useState<boolean>(false);
  const [leadServiceName, setLeadServiceName] = useState<string>('Appliance Repair');
  const [legalInitialTab, setLegalInitialTab] = useState<'about' | 'privacy' | 'affiliate' | 'contact' | 'terms'>('about');

  // Navigation handlers that cleanly update the browser URL
  const handleSelectGuide = (guide: ArticleGuide) => {
    setSelectedGuide(guide);
    setActiveView('blog');
    window.history.pushState({ type: 'guide', slug: guide.slug }, '', `/guide/${guide.slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = `${guide.title} | ReportIQ`;
  };

  const handleSelectGuideBySlug = (slug: string) => {
    const found = guides.find(g => g.slug.toLowerCase() === slug.toLowerCase()) || REPAIR_GUIDES.find(g => g.slug.toLowerCase() === slug.toLowerCase());
    if (found) {
      handleSelectGuide(found);
    }
  };

  const handleBackToHome = () => {
    setSelectedGuide(null);
    setActiveView('blog');
    window.history.pushState({ type: 'home' }, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'ReportIQ - Independent DIY Repair Reports & Diagnostics';
  };

  const handleSelectCategory = (cat: string) => {
    setActiveCategory(cat);
    setSelectedGuide(null);
    setActiveView('blog');
    const catSlug = cat.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    window.history.pushState({ type: 'category', cat }, '', cat === 'All' ? '/' : `/category/${catSlug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateView = (view: 'blog' | 'lookup' | 'sprint' | 'legal') => {
    setActiveView(view);
    if (view === 'blog') {
      setSelectedGuide(null);
      window.history.pushState({ type: 'home' }, '', '/');
      document.title = 'ReportIQ - Independent DIY Repair Reports & Diagnostics';
    } else if (view === 'lookup') {
      setSelectedGuide(null);
      window.history.pushState({ type: 'lookup' }, '', '/lookup');
      document.title = 'Appliance Error Code Lookup Tool | ReportIQ';
    } else if (view === 'sprint') {
      window.history.pushState({ type: 'sprint' }, '', '/?admin=true');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle publishing a new article from the 60-Day sprint editor directly into the live blog!
  const handlePublishNewArticle = (newGuide: ArticleGuide) => {
    setGuides(prev => {
      const updated = [newGuide, ...prev];
      try {
        const customOnly = updated.filter(g => !REPAIR_GUIDES.some(rg => rg.id === g.id));
        localStorage.setItem('reportiq_custom_guides', JSON.stringify(customOnly));
      } catch (err) {
        console.error('Failed to save guide to localStorage', err);
      }
      return updated;
    });
    handleSelectGuide(newGuide);
  };

  const handleOpenLeadModal = (service: string) => {
    setLeadServiceName(service);
    setIsLeadModalOpen(true);
  };

  const handleOpenLegalTab = (tab: 'about' | 'privacy' | 'affiliate' | 'contact' | 'terms') => {
    setLegalInitialTab(tab);
    setActiveView('legal');
    setSelectedGuide(null);
    window.history.pushState({ type: 'legal', tab }, '', `/${tab}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered guides by search
  const displayedGuides = guides.filter(guide => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      guide.title.toLowerCase().includes(query) ||
      guide.quickSummary.toLowerCase().includes(query) ||
      guide.category.toLowerCase().includes(query) ||
      guide.toolsNeeded.some(t => t.toLowerCase().includes(query))
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf9] text-stone-900 font-sans selection:bg-amber-400 selection:text-stone-900">
      {/* PRIVATE OWNER ADMIN BAR (Visible ONLY when ?admin=true is in URL or Ctrl+Shift+A pressed) */}
      {isAdmin && (
        <div className="bg-amber-500 text-stone-900 px-4 py-2 text-xs font-bold flex flex-wrap items-center justify-between gap-3 shadow-md sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
            <span>🔐 Private Owner Desk (Hidden from public & Google)</span>
            <span className="bg-stone-900 text-white px-2 py-0.5 rounded text-[10px]">
              Secret Mode
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveView('sprint');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all shadow-xs ${
                activeView === 'sprint' ? 'bg-stone-900 text-white' : 'bg-white text-stone-900 hover:bg-stone-100'
              }`}
            >
              ⚡ 60-Day Sprint & 1-Click Publisher
            </button>
            <button
              onClick={() => setIsAdSenseModalOpen(true)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-stone-900 hover:bg-stone-100 transition-all shadow-xs"
            >
              ✓ AdSense Checklist
            </button>
            <button
              onClick={() => setIsLeadsModalOpen(true)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-stone-900 hover:bg-stone-100 transition-all shadow-xs"
            >
              📋 Customer Quotes & Leads
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('reportiq_admin');
                setIsAdmin(false);
                if (activeView === 'sprint') setActiveView('blog');
              }}
              className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white transition-colors"
              title="Hide admin bar"
            >
              Exit Admin ✕
            </button>
          </div>
        </div>
      )}

      {/* Editorial Blog Header */}
      <BlogHeader
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        activeView={activeView}
        onNavigate={handleNavigateView}
        onOpenAdSenseModal={() => setIsAdSenseModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        publishedCount={guides.length}
      />

      {/* Main Blog Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* VIEW 1: BLOG HOME OR ARTICLE VIEW */}
        {activeView === 'blog' && (
          <div>
            {selectedGuide ? (
              <ArticleView
                guide={selectedGuide}
                allGuides={guides}
                onBack={handleBackToHome}
                onSelectRelated={handleSelectGuide}
                onOpenLeadModal={handleOpenLeadModal}
              />
            ) : (
              <BlogHome
                guides={displayedGuides}
                onSelectGuide={handleSelectGuide}
                onOpenLookup={() => handleNavigateView('lookup')}
                onNavigateToSprint={() => {
                  setActiveView('sprint');
                  window.history.pushState({ type: 'sprint' }, '', '/?admin=true');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenAdSenseModal={() => setIsAdSenseModalOpen(true)}
                selectedCategory={activeCategory}
                onSelectCategory={handleSelectCategory}
              />
            )}
          </div>
        )}

        {/* VIEW 2: INTERACTIVE APPLIANCE ERROR CODE LOOKUP TOOL */}
        {activeView === 'lookup' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs text-center max-w-3xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Interactive Homeowner Tool
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold font-editorial text-stone-900 tracking-tight">
                Appliance Error Code & Symptoms Diagnostic Engine
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto">
                Diagnose blinking error codes, leaking washers, and humming disposals. Verified DIY fix steps, OEM part numbers, and contractor cost comparisons.
              </p>
            </div>

            <ErrorLookupTool
              onSelectGuideBySlug={handleSelectGuideBySlug}
              onOpenLeadModal={handleOpenLeadModal}
            />
          </div>
        )}

        {/* VIEW 3: 60-DAY SPRINT & DAILY ARTICLE GENERATOR */}
        {activeView === 'sprint' && (
          <SixtyDaySprint
            publishedCount={guides.length}
            onPublishNewArticle={handlePublishNewArticle}
            onOpenAdSenseModal={() => setIsAdSenseModalOpen(true)}
          />
        )}

        {/* VIEW 4: LEGAL & TRUST PAGES (AdSense Approval Shield) */}
        {activeView === 'legal' && (
          <LegalPages initialTab={legalInitialTab} />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(view) => {
          if (view === 'lookup') setActiveView('lookup');
          else if (view === 'guides') { setActiveView('blog'); setSelectedGuide(null); }
          else if (view === 'keywords' || view === 'studio') setActiveView('sprint');
          else if (view === 'legal') setActiveView('legal');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenLegalTab={handleOpenLegalTab}
      />

      {/* AdSense Checklist Modal */}
      <AdSenseChecklistModal
        isOpen={isAdSenseModalOpen}
        onClose={() => setIsAdSenseModalOpen(false)}
        onOpenLegalTab={handleOpenLegalTab}
      />

      {/* Contractor Quote Lead Modal */}
      <ContractorLeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        serviceName={leadServiceName}
      />

      {/* Owner Customer Quotes & Leads Modal */}
      <LeadsModal
        isOpen={isLeadsModalOpen}
        onClose={() => setIsLeadsModalOpen(false)}
      />
    </div>
  );
}
