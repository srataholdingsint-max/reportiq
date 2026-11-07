import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Wrench, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  ArrowRight, 
  BookOpen, 
  Sparkles,
  Tag
} from 'lucide-react';
import { REPAIR_GUIDES } from '../data/guides';
import { ArticleGuide, ApplianceCategory } from '../types';

interface GuidesListProps {
  onSelectGuide: (guide: ArticleGuide) => void;
  onOpenLookup: () => void;
}

export const GuidesList: React.FC<GuidesListProps> = ({ onSelectGuide, onOpenLookup }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  const categories = [
    'All',
    'Dishwasher',
    'Washing Machine',
    'HVAC & Heating',
    'Plumbing',
    'Refrigerator',
    'Garbage Disposal',
    'Water Heater'
  ];

  const filteredGuides = useMemo(() => {
    return REPAIR_GUIDES.filter(guide => {
      const matchCat = selectedCategory === 'All' || guide.category === selectedCategory;
      const matchDiff = selectedDifficulty === 'All' || guide.difficulty === selectedDifficulty;
      const query = searchQuery.trim().toLowerCase();
      const matchQuery = !query || 
        guide.title.toLowerCase().includes(query) ||
        guide.seoDescription.toLowerCase().includes(query) ||
        guide.subcategory.toLowerCase().includes(query) ||
        guide.toolsNeeded.some(t => t.toLowerCase().includes(query));
      return matchCat && matchDiff && matchQuery;
    });
  }, [selectedCategory, selectedDifficulty, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              <span>High-RPM Niche Library</span>
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              DIY Home Maintenance & Repair Guides
            </h1>
            <p className="text-slate-300 text-xs sm:text-base max-w-2xl">
              Field-tested tutorials written in plain English. Save hundreds on plumber & appliance technician callout fees.
            </p>
          </div>

          <button
            onClick={onOpenLookup}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-colors flex items-center gap-2 shrink-0"
          >
            <Wrench className="w-4 h-4" />
            <span>Launch Error Code Lookup</span>
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="pt-4 grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides by symptom, appliance, or tool (e.g. E15, furnace filter, shower drain)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800/90 text-white placeholder-slate-400 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
            />
          </div>

          <div className="md:col-span-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-800/90 text-white border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm font-medium"
            >
              {categories.map(c => (
                <option key={c} value={c}>{c === 'All' ? 'All Sub-Niches' : c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGuides.map(guide => (
          <article
            key={guide.id}
            onClick={() => onSelectGuide(guide)}
            className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg hover:border-blue-400 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="p-6 sm:p-7 space-y-4">
              {/* Category, Date & Difficulty */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 uppercase tracking-wider">
                  {guide.category}
                </span>

                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                    guide.difficulty === 'Beginner' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {guide.difficulty}
                  </span>
                  <span className="text-xs text-slate-400">
                    {guide.readTime}
                  </span>
                </div>
              </div>

              {/* Title & Excerpt */}
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {guide.title}
                </h2>
                <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                  {guide.quickSummary}
                </p>
              </div>

              {/* Verified Author & Est Savings */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={guide.author.avatar}
                    alt={guide.author.name}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <div className="text-[11px]">
                    <div className="font-bold text-slate-800 flex items-center gap-1">
                      <span>{guide.author.name}</span>
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Pro Cost: {guide.estProCost}</div>
                  <div className="text-xs font-black text-emerald-600">DIY: {guide.estDiyCost}</div>
                </div>
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="px-6 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:bg-blue-50/50 transition-colors">
              <span>Read Full Step-by-Step Fix →</span>
              <span className="text-[11px] text-slate-400 font-normal">Checklist & Parts Included</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
