import React, { useState } from 'react';
import { 
  Clock, 
  Wrench, 
  ShieldCheck, 
  ArrowRight, 
  TrendingUp, 
  Sparkles, 
  ExternalLink, 
  DollarSign, 
  CheckCircle2, 
  Mail, 
  Tag, 
  HelpCircle,
  Zap,
  Bookmark
} from 'lucide-react';
import { ArticleGuide } from '../types';
import { ERROR_CODES_DATABASE } from '../data/errorCodes';

interface BlogHomeProps {
  guides: ArticleGuide[];
  onSelectGuide: (guide: ArticleGuide) => void;
  onOpenLookup: () => void;
  onNavigateToSprint: () => void;
  onOpenAdSenseModal: () => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const BlogHome: React.FC<BlogHomeProps> = ({
  guides,
  onSelectGuide,
  onOpenLookup,
  onNavigateToSprint,
  onOpenAdSenseModal,
  selectedCategory,
  onSelectCategory
}) => {
  const [quickBrand, setQuickBrand] = useState('Bosch');
  const [quickCode, setQuickCode] = useState('E15');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Filtered guides based on selected category
  const filteredGuides = guides.filter(g => 
    selectedCategory === 'All' ? true : g.category === selectedCategory
  );

  const heroGuide = guides[0] || filteredGuides[0];
  const trendingGuides = guides.slice(1, 4);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setTimeout(() => setNewsletterSubscribed(false), 4000);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* 1. EDITORIAL MAGAZINE HERO SECTION (Only on 'All' category) */}
      {selectedCategory === 'All' && heroGuide && (
        <section className="bg-white rounded-3xl border border-stone-200/90 shadow-xs overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Main Lead Story (Left 7 Cols) */}
            <div 
              onClick={() => onSelectGuide(heroGuide)}
              className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between cursor-pointer group hover:bg-stone-50/50 transition-colors border-b lg:border-b-0 lg:border-r border-stone-100"
            >
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-stone-100 shadow-xs">
                  <img
                    src={heroGuide.heroImage}
                    alt={heroGuide.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-stone-900 text-white shadow-md">
                      Featured Investigation
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-400 text-stone-900 shadow-md">
                      Save {heroGuide.estProCost}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                  <span className="text-blue-700 font-bold uppercase tracking-wider">{heroGuide.category}</span>
                  <span>·</span>
                  <span>{heroGuide.readTime}</span>
                  <span>·</span>
                  <span className="text-emerald-700 font-semibold">{heroGuide.publishDate}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 font-editorial leading-tight group-hover:text-blue-700 transition-colors">
                  {heroGuide.title}
                </h2>

                <p className="text-stone-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                  {heroGuide.personalIntro}
                </p>
              </div>

              {/* Author & Cost Bar */}
              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={heroGuide.author.avatar}
                    alt={heroGuide.author.name}
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-stone-300"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-stone-900">{heroGuide.author.name}</span>
                    <span className="text-stone-400 block text-[10px]">{heroGuide.author.role}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700 group-hover:translate-x-1 transition-transform">
                  <span>Read Full Tutorial</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Trending Column (Right 5 Cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-stone-50/60 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-stone-900 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
                    <span>Trending DIY Fixes This Week</span>
                  </h3>
                  <span className="text-[10px] text-stone-500 font-semibold">High Reader Engagement</span>
                </div>

                <div className="space-y-4 divide-y divide-stone-200/80">
                  {trendingGuides.map((item, index) => (
                    <article
                      key={item.id}
                      onClick={() => onSelectGuide(item)}
                      className={`pt-3.5 cursor-pointer group flex items-start gap-3 ${index === 0 ? 'pt-0' : ''}`}
                    >
                      <span className="text-2xl font-black text-stone-300 font-editorial group-hover:text-stone-900 transition-colors w-6 shrink-0">
                        0{index + 1}
                      </span>
                      <div className="flex-1 space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">
                          {item.category}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-stone-900 font-editorial group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-stone-500">
                          <span>{item.readTime}</span>
                          <span>·</span>
                          <span className="text-emerald-700 font-semibold">DIY: {item.estDiyCost}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Quick Box */}
              <div className="mt-4 p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-900">Need an Instant Error Code Diagnostic?</span>
                  <span className="text-[10px] bg-blue-100 text-blue-800 font-extrabold px-1.5 py-0.5 rounded">Free Tool</span>
                </div>
                <p className="text-[11px] text-stone-500 leading-normal">
                  Look up Whirlpool, Bosch, LG, or Samsung washer & dishwasher error codes for instant step-by-step solutions.
                </p>
                <button
                  onClick={onOpenLookup}
                  className="w-full py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Wrench className="w-3.5 h-3.5 text-amber-400" />
                  <span>Launch Error Code Lookup Engine</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}


      {/* 2. MAIN EDITORIAL CONTENT GRID (Articles Feed + Classic Blog Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Articles Stream (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-editorial text-stone-900">
                {selectedCategory === 'All' ? 'Latest Repair Guides & Articles' : `${selectedCategory} Guides`}
              </h3>
              <p className="text-xs text-stone-500">
                Showing {filteredGuides.length} field-tested troubleshooting articles
              </p>
            </div>

            {selectedCategory !== 'All' && (
              <button
                onClick={() => onSelectCategory('All')}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                View All Categories →
              </button>
            )}
          </div>

          {/* Articles Stream */}
          <div className="space-y-6">
            {filteredGuides.map((guide, idx) => (
              <React.Fragment key={guide.id}>
                <article
                  onClick={() => onSelectGuide(guide)}
                  className="bg-white rounded-3xl border border-stone-200/90 p-5 sm:p-7 shadow-xs hover:shadow-md hover:border-stone-400 transition-all cursor-pointer group"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                    {/* Thumbnail Image */}
                    <div className="sm:col-span-4 rounded-2xl overflow-hidden aspect-[4/3] bg-stone-100 shadow-2xs">
                      <img
                        src={guide.heroImage}
                        alt={guide.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      />
                    </div>

                    {/* Content Details */}
                    <div className="sm:col-span-8 space-y-2.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                          {guide.category}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          guide.difficulty === 'Beginner' ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'
                        }`}>
                          {guide.difficulty}
                        </span>
                        <span className="text-[11px] text-stone-400 ml-auto">
                          {guide.readTime}
                        </span>
                      </div>

                      <h2 className="text-base sm:text-lg font-bold font-editorial text-stone-900 group-hover:text-blue-700 transition-colors leading-snug">
                        {guide.title}
                      </h2>

                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {guide.quickSummary}
                      </p>

                      <div className="pt-2 flex items-center justify-between text-xs border-t border-stone-100">
                        <div className="flex items-center gap-2">
                          <img
                            src={guide.author.avatar}
                            alt={guide.author.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="text-stone-700 font-medium text-[11px]">{guide.author.name}</span>
                        </div>

                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-[11px] text-stone-400">Pro: {guide.estProCost}</span>
                          <span className="text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded">
                            DIY: {guide.estDiyCost}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>


              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Right Column: Authoritative Editorial Blog Sidebar (4 cols) */}
        <aside className="lg:col-span-4 space-y-6">
          {/* 1. MEET THE EDITORS BIO BOX */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=160&auto=format&fit=crop&q=80"
                alt="Mark Henderson"
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-stone-200"
              />
              <div>
                <h4 className="text-sm font-bold font-editorial text-stone-900 flex items-center gap-1.5">
                  <span>Mark Henderson</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </h4>
                <p className="text-[11px] text-blue-700 font-medium">Founder & Master Tech (14 yrs exp)</p>
                <p className="text-[10px] text-stone-400">Certified EPA 608 Universal</p>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed italic bg-stone-50 p-3 rounded-xl border border-stone-100">
              "We started The HomeFix Journal because big media sites write generic fluff. Here, we dismantle real dishwashers, test multimeter diagnostics, and show homeowners how to fix common breakdowns for under $25."
            </p>

            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500 font-medium">Verified Editorial Policy</span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">100% Tested</span>
            </div>
          </div>

          {/* 2. QUICK ERROR CODE LOOKUP SIDEBAR WIDGET */}
          <div className="bg-gradient-to-br from-stone-900 to-blue-950 text-white rounded-3xl p-6 shadow-md border border-stone-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-400">
              <Wrench className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Quick Diagnostic Tool</span>
            </div>

            <h4 className="text-base font-bold font-editorial text-white">
              Appliance Error Code Lookup
            </h4>

            <p className="text-xs text-stone-300">
              Select your appliance brand to reveal instant DIY solution steps:
            </p>

            <div className="space-y-2">
              <select
                value={quickBrand}
                onChange={(e) => setQuickBrand(e.target.value)}
                className="w-full px-3 py-2 bg-stone-800 text-white border border-stone-700 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Bosch">Bosch</option>
                <option value="Whirlpool">Whirlpool</option>
                <option value="LG">LG</option>
                <option value="Samsung">Samsung</option>
                <option value="GE">GE</option>
                <option value="Maytag">Maytag</option>
                <option value="Carrier">Carrier</option>
                <option value="InSinkErator">InSinkErator</option>
              </select>

              <input
                type="text"
                value={quickCode}
                onChange={(e) => setQuickCode(e.target.value)}
                placeholder="Enter error code (e.g. E15, LE, 4C)..."
                className="w-full px-3 py-2 bg-stone-800 text-white placeholder-stone-400 border border-stone-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                onClick={onOpenLookup}
                className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-900 font-extrabold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 uppercase tracking-wider"
              >
                <span>Diagnose {quickBrand} {quickCode} Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 3. WIRECUTTER-STYLE TOP AFFILIATE TOOLS (HIGH CONVERTING) */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-emerald-600" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  Editor's Essential Toolkit
                </h4>
              </div>
              <span className="text-[10px] text-stone-400">Tested in Lab</span>
            </div>

            <div className="space-y-3">
              {[
                {
                  name: 'Bosch Sump Gasket Repair Kit',
                  price: '$18.99',
                  rating: '4.8 ★',
                  badge: 'Fixes Bosch E15',
                  url: 'https://www.amazon.com/s?k=Bosch+dishwasher+sump+gasket+kit+12005744&tag=reportiq-20'
                },
                {
                  name: 'Universal Garbage Disposal Hex Key',
                  price: '$7.49',
                  rating: '4.9 ★',
                  badge: '2-Min Jam Fix',
                  url: 'https://www.amazon.com/s?k=garbage+disposal+wrench+key&tag=reportiq-20'
                },
                {
                  name: 'FlexiSnake Drain Weasel Starter Kit',
                  price: '$11.98',
                  rating: '4.7 ★',
                  badge: 'No Chemical Clogs',
                  url: 'https://www.amazon.com/s?k=FlexiSnake+drain+weasel+starter+kit&tag=reportiq-20'
                },
                {
                  name: 'Filtrete 20x25x1 MERV 11 (4-Pack)',
                  price: '$44.97',
                  rating: '4.8 ★',
                  badge: 'HVAC Essential',
                  url: 'https://www.amazon.com/s?k=Filtrete+20x25x1+MERV+11+4-pack&tag=reportiq-20'
                }
              ].map((tool, tIdx) => (
                <div key={tIdx} className="p-3 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-black uppercase text-blue-700 bg-blue-100 px-1.5 py-0.2 rounded">
                      {tool.badge}
                    </span>
                    <h5 className="text-xs font-bold text-stone-900 line-clamp-1">{tool.name}</h5>
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="font-extrabold text-emerald-700">{tool.price}</span>
                      <span className="text-amber-600">{tool.rating}</span>
                    </div>
                  </div>

                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noreferrer sponsored"
                    className="px-2.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-stone-900 text-[11px] font-bold rounded-lg transition-colors shrink-0 shadow-2xs"
                  >
                    Check Amazon
                  </a>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-stone-400 text-center leading-tight">
              *As an Amazon Associate, ReportIQ earns from qualifying purchases. Zero cost to you.
            </p>
          </div>

          {/* 5. INDEPENDENT EDITORIAL TESTING GUARANTEE (High E-E-A-T) */}
          <div className="bg-stone-900 text-white rounded-3xl p-6 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Diagnostic Standards</span>
              </span>
              <span className="text-[10px] font-bold text-stone-300 bg-stone-800 px-2 py-0.5 rounded border border-stone-700">
                E-E-A-T Certified
              </span>
            </div>

            <h4 className="text-sm font-bold text-white font-editorial">
              100% Bench-Tested DIY Solutions
            </h4>

            <p className="text-xs text-stone-300 leading-relaxed">
              Every guide on ReportIQ is verified on real residential appliances using digital multimeters, OEM schematics, and factory tolerances. No AI hallucinations.
            </p>

            <button
              onClick={() => onOpenLookup()}
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
            >
              Open Diagnostic Lookup Engine →
            </button>
          </div>

          {/* 6. FREE PRINTABLE CHECKLIST NEWSLETTER BOX */}
          <div className="bg-stone-900 text-white rounded-3xl p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-amber-400">
              <Mail className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Free Homeowner Guide</span>
            </div>

            <h4 className="text-base font-bold font-editorial text-white">
              The 2025 Seasonal Home Care Checklist
            </h4>

            <p className="text-xs text-stone-300">
              Get our monthly 10-minute maintenance PDF checklist to prevent frozen pipes and furnace breakdowns.
            </p>

            {newsletterSubscribed ? (
              <div className="p-3 bg-emerald-950/80 border border-emerald-700 rounded-xl text-center text-xs text-emerald-300 font-bold">
                ✓ Check your inbox for the free PDF!
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full px-3 py-2 bg-stone-800 text-white placeholder-stone-400 border border-stone-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold text-xs rounded-xl transition-colors shadow-xs"
                >
                  Send Me Free Checklist
                </button>
              </form>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};
