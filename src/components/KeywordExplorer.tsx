import React, { useState } from 'react';
import { 
  Search, 
  TrendingUp, 
  DollarSign, 
  HelpCircle, 
  CheckCircle2, 
  Filter, 
  ExternalLink, 
  Zap, 
  Award,
  ArrowRight
} from 'lucide-react';
import { KEYWORD_RESEARCH_DATABASE } from '../data/keywordDatabase';
import { KeywordResearchItem } from '../types';

interface KeywordExplorerProps {
  onDraftKeyword?: (keyword: string) => void;
}

export const KeywordExplorer: React.FC<KeywordExplorerProps> = ({ onDraftKeyword }) => {
  const [selectedNiche, setSelectedNiche] = useState<string>('All');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [activeItem, setActiveItem] = useState<KeywordResearchItem>(KEYWORD_RESEARCH_DATABASE[0]);

  const niches = [
    'All',
    'Appliance Troubleshooting',
    'HVAC Filters & Maintenance',
    'Plumbing Fixes (DIY level)',
    'Seasonal Home Prep'
  ];

  const filteredItems = KEYWORD_RESEARCH_DATABASE.filter(item => {
    const matchesNiche = selectedNiche === 'All' || item.subNiche === selectedNiche;
    const matchesSearch = !searchFilter.trim() || 
      item.keyword.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.competitorWeakness.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesNiche && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Strategy Explainer */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              Free & Fast Research Method ($0/mo vs $100/mo Ahrefs)
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              High-RPM Home Repair Keyword Database
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>Target RPM: $18.00 – $28.50 per 1,000 visitors</span>
          </div>
        </div>

        {/* The 4 Strategic Rules */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">1. High Ad Rates ($5–$20 CPC)</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Homeowners in panic click contractor, warranty, and replacement parts ads that pay massive bids.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">2. Low Competition</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Big giants (Bob Vila, This Old House) are broad. We target hyper-specific error codes they ignore.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">3. The Small-Blog Filter</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Only target questions where #1 is a small forum or low-quality blog. You will outrank them with ease.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Filter by keyword (e.g., E15, furnace, shower drain)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 text-slate-900 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {niches.map(niche => (
              <button
                key={niche}
                onClick={() => setSelectedNiche(niche)}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedNiche === niche
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {niche}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Keywords Table & Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table of Keywords */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Discovered PAA Target Keywords ({filteredItems.length})
            </span>
            <span className="text-xs text-blue-600 font-medium">Click row to inspect</span>
          </div>

          <div className="divide-y divide-slate-100 max-h-[620px] overflow-y-auto">
            {filteredItems.map((item, idx) => {
              const isSelected = activeItem.keyword === item.keyword;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveItem(item)}
                  className={`w-full text-left p-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isSelected ? 'bg-blue-50/80' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{item.keyword}</span>
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {item.intent}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{item.subNiche}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 text-right">
                    <div>
                      <div className="text-xs font-extrabold text-emerald-600">{item.cpc} CPC</div>
                      <div className="text-[10px] text-slate-400">{item.searchVolume}</div>
                    </div>
                    <span className="text-xs font-bold text-blue-700 bg-blue-100/80 px-2.5 py-1 rounded-lg">
                      {item.rpmPotential} RPM
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Inspector Card */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Keyword Audit & People Also Ask Box
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-1">
              {activeItem.keyword}
            </h3>
            <div className="flex items-center gap-3 mt-2 text-xs">
              <span className="text-slate-500 font-medium">Vol: <strong>{activeItem.searchVolume}</strong></span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">Avg CPC: {activeItem.cpc}</span>
              <span className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded">Est RPM: {activeItem.rpmPotential}</span>
            </div>
          </div>

          {/* Competitor Weakness Angle */}
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span>Competitor Weakness (Why You Win)</span>
            </div>
            <p className="text-xs text-amber-900/90 leading-relaxed">
              {activeItem.competitorWeakness}
            </p>
          </div>

          {/* People Also Ask Sub-Headings (Ready for H2s) */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
              <span>Google "People Also Ask" Sub-Headings</span>
            </h4>
            <div className="space-y-1.5">
              {activeItem.paaQuestions.map((q, qIdx) => (
                <div key={qIdx} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
                  <span className="text-blue-500 font-bold">H2</span>
                  <span>{q}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          {onDraftKeyword && (
            <button
              onClick={() => onDraftKeyword(activeItem.keyword)}
              className="w-full inline-flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
            >
              <span>Load Into AI Studio Generator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
