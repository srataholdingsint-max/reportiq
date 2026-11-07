import React, { useState } from 'react';
import { 
  Zap, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  TrendingUp, 
  DollarSign, 
  ArrowRight, 
  PlusCircle, 
  Copy, 
  Check, 
  RefreshCw, 
  FileText, 
  Calendar, 
  Layers, 
  Award,
  Globe,
  Server,
  Link2,
  ExternalLink,
  ShieldCheck,
  Tag,
  Search
} from 'lucide-react';
import { KEYWORD_RESEARCH_DATABASE, DAILY_ROUTINE_STEPS } from '../data/keywordDatabase';
import { ArticleGuide, ApplianceCategory } from '../types';

interface SixtyDaySprintProps {
  publishedCount: number;
  onPublishNewArticle: (newGuide: ArticleGuide) => void;
  onOpenAdSenseModal: () => void;
}

export const SixtyDaySprint: React.FC<SixtyDaySprintProps> = ({
  publishedCount,
  onPublishNewArticle,
  onOpenAdSenseModal
}) => {
  const [activeTab, setActiveTab] = useState<'writer' | 'tomorrow' | 'affiliateLinks' | 'rankingSEO' | 'roadmap' | 'keywords' | 'routine'>('writer');
  const [selectedKeyword, setSelectedKeyword] = useState<string>('LG washer dC error code fix');
  const [customKeyword, setCustomKeyword] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<ApplianceCategory>('Washing Machine');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [publishedSuccess, setPublishedSuccess] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Form draft state for publishing
  const [draftTitle, setDraftTitle] = useState<string>('How to Fix LG Washer dC Error Code: Door Latch Switch Replacement');
  const [draftIntro, setDraftIntro] = useState<string>('I ran into this exact issue when our front-load washer refused to spin during a heavy load of towels. The display beeped with dC. Before ordering a new washer, I tested the door latch switch and fixed it for $18 in 20 minutes.');
  const [draftSummary, setDraftSummary] = useState<string>('The dC error on LG washers indicates the door lock latch switch is not engaging. Reseating the terminal harness or replacing the $18 interlock solenoid clears it 95% of the time.');
  const [draftDiyCost, setDraftDiyCost] = useState<string>('$18.50');
  const [draftProCost, setDraftProCost] = useState<string>('$230.00');
  const [draftEstTime, setDraftEstTime] = useState<string>('20 minutes');
  const [draftPartName, setDraftPartName] = useState<string>('OEM LG Washer Door Lock Switch Assembly EBF61315801');
  const [draftPartPrice, setDraftPartPrice] = useState<string>('$18.99');
  const [amazonTag, setAmazonTag] = useState<string>(() => {
    return localStorage.getItem('reportiq_amazon_tag') || 'reportiq-20';
  });

  const handleAmazonTagChange = (newTag: string) => {
    const clean = newTag.trim();
    setAmazonTag(clean);
    localStorage.setItem('reportiq_amazon_tag', clean);
  };

  // Daily action checklist state
  const [dailyTasks, setDailyTasks] = useState<Record<string, boolean>>({
    't1': true,
    't2': false,
    't3': false,
    't4': false,
    't5': false,
    't6': false
  });

  const toggleDailyTask = (id: string) => {
    setDailyTasks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (text: string, key: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const handleGenerateAI = () => {
    const kw = customKeyword.trim() || selectedKeyword;
    setIsGenerating(true);
    setTimeout(() => {
      setDraftTitle(`How to Fix ${kw}: The 20-Minute Step-by-Step DIY Solution`);
      setDraftIntro(`I had to deal with this exact ${kw} headache last weekend in my own home. After calling two local contractors who quoted over $200, I grabbed my screwdriver, tested the components, and had it fixed for under $20 in 25 minutes. Follow this exact guide to save your hard-earned money.`);
      setDraftSummary(`A step-by-step diagnostic breakdown for ${kw}. Covers common mistake traps, safety protocols, and direct OEM replacement parts to avoid service callouts.`);
      setDraftDiyCost('$19.99');
      setDraftProCost('$240.00');
      setDraftEstTime('25 minutes');
      setDraftPartName(`Genuine OEM Replacement Hardware Kit for ${kw}`);
      setDraftPartPrice('$19.50');
      setIsGenerating(false);
    }, 700);
  };

  const handlePublishToBlog = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = (customKeyword || selectedKeyword)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newGuide: ArticleGuide = {
      id: `user-guide-${Date.now()}`,
      slug: slug || `guide-${Date.now()}`,
      title: draftTitle,
      seoTitle: `${draftTitle} | HomeFix Journal`,
      seoDescription: draftSummary,
      category: selectedCategory,
      subcategory: 'Appliance Troubleshooting',
      readTime: '6 min read',
      publishDate: 'Just Published',
      author: {
        name: 'Mark Henderson',
        role: 'Master Appliance Technician (14+ yrs exp)',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&auto=format&fit=crop&q=80',
        verified: true
      },
      difficulty: 'Beginner',
      estTime: draftEstTime,
      estDiyCost: draftDiyCost,
      estProCost: draftProCost,
      heroImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&auto=format&fit=crop&q=80',
      personalIntro: draftIntro,
      quickSummary: draftSummary,
      safetyAlert: 'Always unplug electrical power before opening appliance cabinets. Never bypass door lock safety switches.',
      toolsNeeded: ['Phillips screwdriver', 'Needle-nose pliers', 'Microfiber towel', 'Flashlight'],
      partsNeeded: [
        {
          name: draftPartName,
          partNumber: 'OEM-SPEC-GEN',
          price: draftPartPrice,
          rating: 4.8,
          reviewsCount: 1420,
          isPrime: true,
          affiliateUrl: `https://www.amazon.com/s?k=${encodeURIComponent(draftPartName)}&tag=${amazonTag || 'reportiq-20'}`,
          badge: 'Top Homeowner Fix',
          category: 'part',
          description: 'Tested OEM factory replacement part engineered for reliable long-term service.'
        }
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Disconnect Power & Verify Symptoms',
          instructions: [
            'Unplug appliance power cord from 120V wall receptacle.',
            'Wait 3 minutes for capacitors to discharge safely before servicing.'
          ],
          proTip: 'Never work with live power; circuit boards can short with a single metal tool slip.'
        },
        {
          stepNumber: 2,
          title: 'Access Internal Component Assembly',
          instructions: [
            'Remove the retention screws securing the exterior access panel.',
            'Unclip the wiring harness gently by pressing the plastic locking tab.'
          ]
        },
        {
          stepNumber: 3,
          title: 'Install Tested Replacement Hardware',
          instructions: [
            'Align the replacement part into the factory mounting bracket.',
            'Fasten screws firmly and reconnect terminal harness until you hear an audible click.'
          ]
        },
        {
          stepNumber: 4,
          title: 'Reassemble and Run Verification Test',
          instructions: [
            'Replace exterior panels and tighten screws.',
            'Plug unit back into power and run a quick test cycle.'
          ]
        }
      ],
      commonMistakes: [
        'Ordering generic third-party parts that lack heat-resistant solenoid windings.',
        'Yanking wire harnesses without disengaging the plastic clip latch.'
      ],
      paaFaqs: [
        {
          question: `Can I fix ${draftTitle} myself?`,
          answer: 'Yes! Over 80% of homeowners complete this repair in 20 minutes with a single Phillips screwdriver, saving $200+ on service fees.'
        }
      ],
      relatedGuideIds: ['guide-bosch-e15', 'guide-whirlpool-f2e1']
    };

    onPublishNewArticle(newGuide);
    setPublishedSuccess(true);
    setTimeout(() => {
      setPublishedSuccess(false);
    }, 4000);
  };

  const targetArticles = 30;
  const progressPercent = Math.min(100, Math.round((publishedCount / targetArticles) * 100));

  return (
    <div className="space-y-8 pb-16">
      {/* Top Challenge Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-blue-950 text-white rounded-3xl p-6 sm:p-10 border border-stone-800 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-400 text-stone-900 uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              <span>The 60-Day Blog Monetization Sprint</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-editorial tracking-tight text-white">
              Under 2 Months to $1,500/Month
            </h1>
            <p className="text-stone-300 text-xs sm:text-base max-w-2xl leading-relaxed">
              Publish 1 high-intent SEO article every day. Target "People Also Ask" questions that weak blogs currently hold, and monetize with high-RPM Google AdSense and Amazon affiliate hardware.
            </p>
          </div>

          {/* Milestone Badge */}
          <div className="bg-stone-800/90 p-4 rounded-2xl border border-stone-700 text-center space-y-1 shrink-0">
            <span className="text-[10px] uppercase font-bold text-stone-400">AdSense Fast-Track Goal</span>
            <div className="text-2xl font-black text-amber-400">{publishedCount} / {targetArticles} Posts</div>
            <div className="w-36 bg-stone-700 h-2 rounded-full overflow-hidden mx-auto">
              <div 
                className="bg-amber-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-emerald-400 font-bold block">{progressPercent}% to 30 Pillar Posts</span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="mt-8 pt-4 border-t border-stone-800 flex items-center gap-2 overflow-x-auto text-xs">
          {[
            { id: 'writer', label: '✍️ Daily Article Publisher' },
            { id: 'tomorrow', label: '🚀 What to Do Tomorrow (Day 1 Launch & Hosting)' },
            { id: 'affiliateLinks', label: '💰 Where to Get Affiliate Links' },
            { id: 'rankingSEO', label: '📈 How to Rank #1 on Google' },
            { id: 'roadmap', label: '📅 60-Day Day-by-Day Calendar' },
            { id: 'keywords', label: '🎯 High-RPM PAA Keyword Targets' },
            { id: 'routine', label: '⏱️ The 2-Hour Daily Rhythm' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-amber-400 text-stone-900 shadow-sm'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: DAILY ARTICLE PUBLISHER & AI GENERATOR */}
      {activeTab === 'writer' && (
        <div className="space-y-6">
          {/* Today's 2-Hour Action Checklist Widget */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                <h3 className="text-sm font-bold font-editorial text-stone-900 uppercase tracking-wider">
                  Today's 2-Hour Execution Checklist (Daily Routine)
                </h3>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Under 2 Months Sprint
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Hour 1 Creation */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-blue-800">
                  <span>HOUR 1: CREATION (60 mins)</span>
                  <span className="text-[10px] text-stone-400">9:00 AM - 10:00 AM</span>
                </div>
                <div className="space-y-2 text-xs">
                  {[
                    { id: 't1', label: '1. Pick 1 low-competition PAA question from target list below' },
                    { id: 't2', label: '2. Click "Generate 3-Step SEO Post Draft"' },
                    { id: 't3', label: '3. Add your personal intro ("I tried this last weekend...") & photo note' },
                    { id: 't4', label: '4. Click "Publish Directly to Live Blog Feed"' }
                  ].map(task => (
                    <label
                      key={task.id}
                      className="flex items-start gap-2.5 cursor-pointer select-none text-stone-700 hover:text-stone-900"
                    >
                      <input
                        type="checkbox"
                        checked={!!dailyTasks[task.id]}
                        onChange={() => toggleDailyTask(task.id)}
                        className="mt-0.5 w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
                      />
                      <span className={dailyTasks[task.id] ? 'line-through text-stone-400' : ''}>
                        {task.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Hour 2 Optimization & Revenue */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-800">
                  <span>HOUR 2: MONETIZATION & LINKS (60 mins)</span>
                  <span className="text-[10px] text-stone-400">10:00 AM - 11:00 AM</span>
                </div>
                <div className="space-y-2 text-xs">
                  {[
                    { id: 't5', label: '5. Open 2 older blog articles & add internal links to your new post' },
                    { id: 't6', label: '6. Verify Amazon Prime affiliate buy button & exact OEM part number' },
                    { id: 't7', label: '7. Submit new URL in Google Search Console for fast indexing' },
                    { id: 't8', label: '8. Answer a relevant question on Reddit r/Appliances with your checklist' }
                  ].map(task => (
                    <label
                      key={task.id}
                      className="flex items-start gap-2.5 cursor-pointer select-none text-stone-700 hover:text-stone-900"
                    >
                      <input
                        type="checkbox"
                        checked={!!dailyTasks[task.id]}
                        onChange={() => toggleDailyTask(task.id)}
                        className="mt-0.5 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className={dailyTasks[task.id] ? 'line-through text-stone-400' : ''}>
                        {task.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Keyword Selector & Prompts */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold font-editorial text-stone-900 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Step 1: Pick Today's Target Keyword
              </h3>

              <div className="space-y-2">
                {[
                  { kw: 'LG washer dC error code fix', cpc: '$14.80', vol: '14,200/mo' },
                  { kw: 'Samsung dryer not heating reset button', cpc: '$16.20', vol: '28,100/mo' },
                  { kw: 'GE dishwasher orange light blinking', cpc: '$11.50', vol: '12,500/mo' },
                  { kw: 'KitchenAid disposal humming hex key', cpc: '$9.40', vol: '18,900/mo' }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedKeyword(item.kw);
                      setCustomKeyword('');
                    }}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${
                      selectedKeyword === item.kw && !customKeyword
                        ? 'bg-amber-50 border-amber-500 font-bold text-amber-950'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <span>{item.kw}</span>
                    <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {item.cpc} CPC
                    </span>
                  </button>
                ))}
              </div>

              <div>
                <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
                  Or Type Any Keyword:
                </label>
                <input
                  type="text"
                  value={customKeyword}
                  onChange={(e) => setCustomKeyword(e.target.value)}
                  placeholder="e.g. Whirlpool fridge clicking sound fix"
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <button
                onClick={handleGenerateAI}
                disabled={isGenerating}
                className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                <span>{isGenerating ? 'Generating Structured Article...' : 'Generate 3-Step SEO Post Draft'}</span>
              </button>
            </div>

            {/* Prompt Vault Reference */}
            <div className="bg-stone-50 rounded-3xl p-5 border border-stone-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Google AI Studio Prompt Guidelines
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                <strong>Step A (Outline):</strong> "Act as a home repair expert. Write a detailed outline with H2 headers, common mistakes, and safety warnings."
              </p>
              <p className="text-xs text-stone-600 leading-relaxed">
                <strong>Step B (Section):</strong> "Write Section 1. Tone: Helpful, direct, simple English. No fluff. Keep sentences short. Include one bullet list."
              </p>
              <p className="text-xs text-stone-600 leading-relaxed">
                <strong>Step C (Human Touch):</strong> Add a personal intro: <em>"I tried this myself last weekend..."</em> to pass Google EEAT.
              </p>
            </div>
          </div>

          {/* Right Column: Live Blog Post Editor & Instant Publisher */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                  Step 2: Review & Publish to Live Blog
                </span>
                <h3 className="text-lg font-bold font-editorial text-stone-900">
                  Daily Post Publisher
                </h3>
              </div>

              {publishedSuccess && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5 animate-pulse">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Published to Live Blog!</span>
                </span>
              )}
            </div>

            <form onSubmit={handlePublishToBlog} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Article Headline (H1)</label>
                <input
                  type="text"
                  required
                  value={draftTitle}
                  onChange={(e) => setDraftTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-editorial font-bold bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Sub-Niche Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as ApplianceCategory)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="Washing Machine">Washing Machine</option>
                    <option value="Dishwasher">Dishwasher</option>
                    <option value="Refrigerator">Refrigerator</option>
                    <option value="HVAC & Heating">HVAC & Heating</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Garbage Disposal">Garbage Disposal</option>
                    <option value="Water Heater">Water Heater</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Time to Fix</label>
                  <input
                    type="text"
                    value={draftEstTime}
                    onChange={(e) => setDraftEstTime(e.target.value)}
                    placeholder="e.g. 20 minutes"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              {/* Personal Intro Box (The Human Touch) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                    <span>Authentic First-Person Intro (Google EEAT Anchor)</span>
                  </label>
                  <span className="text-[10px] text-stone-400">"I tried this myself..."</span>
                </div>
                <textarea
                  rows={3}
                  required
                  value={draftIntro}
                  onChange={(e) => setDraftIntro(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-amber-50/50 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-stone-800 leading-relaxed"
                />
              </div>

              {/* Excerpt / Summary */}
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Quick Key Takeaways Summary</label>
                <textarea
                  rows={2}
                  required
                  value={draftSummary}
                  onChange={(e) => setDraftSummary(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-stone-800"
                />
              </div>

              {/* Costs & Affiliate Part */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-stone-50 rounded-2xl border border-stone-200">
                <div>
                  <label className="text-[11px] font-bold text-stone-600 block mb-1">DIY Cost</label>
                  <input
                    type="text"
                    value={draftDiyCost}
                    onChange={(e) => setDraftDiyCost(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-lg text-emerald-700 font-extrabold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-stone-600 block mb-1">Pro Plumber Cost</label>
                  <input
                    type="text"
                    value={draftProCost}
                    onChange={(e) => setDraftProCost(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-lg text-stone-700 font-bold"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-[11px] font-bold text-stone-600 block mb-1">Part Price</label>
                  <input
                    type="text"
                    value={draftPartPrice}
                    onChange={(e) => setDraftPartPrice(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Recommended Amazon OEM Replacement Part Name</label>
                <input
                  type="text"
                  value={draftPartName}
                  onChange={(e) => setDraftPartName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              {/* Automated Amazon Affiliate Tag Configuration */}
              <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-4 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <label className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-amber-700" />
                      <span>Your Amazon Associates Tracking ID (Tag)</span>
                    </label>
                    <p className="text-[11px] text-amber-800">
                      All product buttons will automatically generate with your tag to credit your commissions.
                    </p>
                  </div>
                  <input
                    type="text"
                    value={amazonTag}
                    onChange={(e) => handleAmazonTagChange(e.target.value)}
                    placeholder="e.g. reportiq-20"
                    className="px-3 py-1.5 text-xs bg-white border border-amber-300 rounded-xl font-mono font-bold text-stone-900 w-full sm:w-40 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
                  />
                </div>

                {draftPartName && (
                  <div className="text-[11px] text-stone-600 flex items-center justify-between pt-1 border-t border-amber-200/60">
                    <span className="truncate pr-2">
                      Live Link: <span className="font-mono text-blue-700 underline text-[10px]">amazon.com/s?k={encodeURIComponent(draftPartName).slice(0, 32)}...&tag={amazonTag}</span>
                    </span>
                    <a
                      href={`https://www.amazon.com/s?k=${encodeURIComponent(draftPartName)}&tag=${amazonTag || 'reportiq-20'}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-amber-950 bg-amber-200/70 px-2 py-0.5 rounded font-bold hover:bg-amber-300 shrink-0 text-[10px] transition-colors"
                    >
                      Test Live Link ↗
                    </a>
                  </div>
                )}
              </div>

              {/* Publish CTA Button */}
              <button
                type="submit"
                className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-stone-900 font-black text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Publish Directly to Live Blog Feed</span>
              </button>
            </form>
          </div>
        </div>
      </div>
      )}

      {/* TAB: WHAT TO DO TOMORROW (DAY 1 LAUNCH & HOSTING) */}
      {activeTab === 'tomorrow' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs space-y-8">
          <div className="border-b border-stone-100 pb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-400 text-stone-900 uppercase tracking-wider mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>Day 1 Action Blueprint</span>
            </div>
            <h3 className="text-2xl font-bold font-editorial text-stone-900">
              What to Do Tomorrow (Day 1: Launch, Domain & Hosting)
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Follow this exact 4-step checklist tomorrow morning to get your domain, free hosting, and first article live in under 2 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Step 1: Domain */}
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                  Step 1 · 9:00 AM (15 Mins)
                </span>
                <Globe className="w-4 h-4 text-stone-500" />
              </div>
              <h4 className="text-base font-bold font-editorial text-stone-900">
                Buy a Brandable .COM Domain ($10/yr)
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Go to <strong>Namecheap.com</strong> or <strong>Cloudflare Registrar</strong>. Avoid hyphens or numbers. Choose a clean, trustworthy name:
              </p>
              <div className="bg-white p-3 rounded-xl border border-stone-200 space-y-1 text-xs">
                <div className="font-bold text-stone-800">High-Trust Examples to Register:</div>
                <ul className="list-disc pl-4 text-stone-600 space-y-0.5">
                  <li><code>TheHomeFixJournal.com</code></li>
                  <li><code>FixCraftDIY.com</code></li>
                  <li><code>ApplianceFixLab.com</code></li>
                  <li><code>HomeProGuides.com</code></li>
                </ul>
              </div>
            </div>

            {/* Step 2: Hosting */}
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Step 2 · 9:20 AM (20 Mins)
                </span>
                <Server className="w-4 h-4 text-stone-500" />
              </div>
              <h4 className="text-base font-bold font-editorial text-stone-900">
                Deploy for Free on Vercel or Cloudflare Pages
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                You do NOT need expensive hosting. This React application is ultra-lightweight and runs on 100% free edge CDNs:
              </p>
              <ol className="list-decimal pl-4 text-xs text-stone-600 space-y-1">
                <li>Create a free account at <strong>Vercel.com</strong> or <strong>Cloudflare.com</strong>.</li>
                <li>Connect your GitHub repository (or click "Upload").</li>
                <li>Click <strong>Deploy</strong> (build takes ~40 seconds).</li>
                <li>In Vercel Settings $\rightarrow$ Domains, enter your custom domain.</li>
                <li>Add the 2 DNS records (CNAME) into your registrar. Free SSL is automatic!</li>
              </ol>
            </div>

            {/* Step 3: Google Search Console */}
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  Step 3 · 9:45 AM (15 Mins)
                </span>
                <Search className="w-4 h-4 text-stone-500" />
              </div>
              <h4 className="text-base font-bold font-editorial text-stone-900">
                Setup Google Search Console (GSC)
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                This tells Google your blog exists so your articles start ranking:
              </p>
              <ul className="list-disc pl-4 text-xs text-stone-600 space-y-1">
                <li>Go to <code>search.google.com/search-console</code>.</li>
                <li>Add your domain and copy the TXT verification record.</li>
                <li>Paste the TXT record in your DNS settings.</li>
                <li>Submit your sitemap URL: <code>https://yourdomain.com/sitemap.xml</code>.</li>
              </ul>
            </div>

            {/* Step 4: Publish First Article */}
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                  Step 4 · 10:00 AM (30 Mins)
                </span>
                <CheckCircle2 className="w-4 h-4 text-stone-500" />
              </div>
              <h4 className="text-base font-bold font-editorial text-stone-900">
                Publish Article #1 & Submit URL
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Use the <strong>Daily Article Publisher</strong> tab in this app:
              </p>
              <ul className="list-disc pl-4 text-xs text-stone-600 space-y-1">
                <li>Pick the first keyword: <em>"Bosch dishwasher E15 error code fix"</em>.</li>
                <li>Review the prompt draft and add your personal intro note.</li>
                <li>Click <strong>Publish Directly to Live Blog Feed</strong>.</li>
                <li>In Google Search Console, paste the URL and click <strong>"Request Indexing"</strong>.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB: WHERE TO GET AFFILIATE LINKS */}
      {activeTab === 'affiliateLinks' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs space-y-8">
          <div className="border-b border-stone-100 pb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-400 text-stone-900 uppercase tracking-wider mb-2">
              <DollarSign className="w-3.5 h-3.5" />
              <span>Affiliate Monetization Vault</span>
            </div>
            <h3 className="text-2xl font-bold font-editorial text-stone-900">
              Where to Get Affiliate Links & How to Monetize
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              You do not need to wait for AdSense approval to make money. Affiliate links can earn you commissions on Day 1.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                network: '1. Amazon Associates (Recommended for Day 1)',
                url: 'affiliate-program.amazon.com',
                payout: '3% – 4% on Tools, Hardware & Parts + 24-hr Cart Cookie',
                badge: 'Instant Approval',
                description: 'The easiest affiliate program to join. When someone clicks your link for an $18 Bosch gasket or $7 disposal wrench, you earn a commission on the part AND on anything else they buy on Amazon in the next 24 hours (groceries, electronics, household goods).',
                steps: [
                  'Go to affiliate-program.amazon.com and sign up with your Amazon account.',
                  'Enter your website domain and fill out the brief profile.',
                  'Once inside, enable the Amazon SiteStripe bar in your browser.',
                  'Whenever you view any product on Amazon, click "Get Link: Text" at the top and paste it into your articles.'
                ]
              },
              {
                network: '2. AppliancePartsPros & RepairClinic (Specialized OEM Parts)',
                url: 'ShareASale.com / CJ.com',
                payout: '5% – 9% per sale ($15 – $40 per high-ticket board/motor)',
                badge: 'High Conversion',
                description: 'Specialized OEM replacement part warehouses. They offer 365-day return policies and model lookup tools, so homeowners trust them for expensive parts like washing machine control boards ($150+) and refrigerator fan motors ($40+).',
                steps: [
                  'Create a free affiliate account at ShareASale.com or CJ.com.',
                  'Search for "AppliancePartsPros" or "RepairClinic" and click Join Program.',
                  'Get approved within 48 hours to access thousands of deep OEM part links.'
                ]
              },
              {
                network: '3. The Home Depot Affiliate Program',
                url: 'Impact.com',
                payout: 'Up to 8% on Tools, Plumbing & HVAC Filters',
                badge: 'High Trust Brand',
                description: 'Great for bulk furnace filters (e.g. 4-packs of 20x25x1 filters), drain snakes, toilet repair kits, and plumbing spigot covers where homeowners prefer in-store pickup.',
                steps: [
                  'Join the Home Depot affiliate program on Impact.com.',
                  'Search products and generate tracked links for furnace filters and pipe tools.'
                ]
              },
              {
                network: '4. Contractor Lead Generation (Angi / Networx / HomeAdvisor)',
                url: 'Lead Economy / CPA Networks',
                payout: '$30 – $80 CPA per Contractor Quote Request',
                badge: 'Highest Payout',
                description: 'When a homeowner decides the repair is too difficult and clicks your "Get 3 Free Local Contractor Quotes" box, you get paid $30–$80 just for generating the lead — even if they don\'t end up hiring the contractor!',
                steps: [
                  'This is already built directly into your HomeFix Journal articles and Error Code Tool.',
                  'Partner with contractor networks like Networx or HomeAdvisor to route ZIP code quote submissions.'
                ]
              }
            ].map((net, nIdx) => (
              <div key={nIdx} className="bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold font-editorial text-stone-900">{net.network}</h4>
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                      {net.badge}
                    </span>
                  </div>
                  <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    {net.payout}
                  </span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {net.description}
                </p>

                <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-1.5 text-xs">
                  <div className="font-bold text-stone-800">How to get your links:</div>
                  <ol className="list-decimal pl-4 text-stone-600 space-y-0.5">
                    {net.steps.map((st, sIdx) => (
                      <li key={sIdx}>{st}</li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: HOW TO RANK #1 ON GOOGLE (THE SEO FORMULA) */}
      {activeTab === 'rankingSEO' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs space-y-8">
          <div className="border-b border-stone-100 pb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-blue-600 text-white uppercase tracking-wider mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Google Ranking Blueprint</span>
            </div>
            <h3 className="text-2xl font-bold font-editorial text-stone-900">
              How You Will Rank on Google (The PAA Hijack Strategy)
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              You do not need expensive backlinks. In home repair, Google rewards direct, no-fluff answers with high user dwell time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                01
              </div>
              <h4 className="text-sm font-bold font-editorial text-stone-900">
                The First 150 Words (Featured Snippet Bait)
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                When Google shows an article in position #0 (the quick answer box), it extracts a 45-word direct answer. 
                Your article must answer the symptom in the very first paragraph before telling stories. 
                Our template places the <strong>Quick Key Takeaways Box</strong> right at the top for this exact reason.
              </p>
            </div>

            <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-stone-900 flex items-center justify-center font-bold text-xs">
                02
              </div>
              <h4 className="text-sm font-bold font-editorial text-stone-900">
                Targeting Zero-Difficulty Forum Weaknesses
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Only target queries where the #1 ranking site is an unformatted forum thread or an outdated 2017 blog with no photos. 
                When a homeowner lands on your clean, step-by-step checklist with verified part numbers, they stay for 3+ minutes. 
                Google sees high dwell time and pushes you above the forum within 14–21 days.
              </p>
            </div>

            <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                03
              </div>
              <h4 className="text-sm font-bold font-editorial text-stone-900">
                The Internal Linking Silo Network
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Never publish an orphaned article! Every new guide must link to at least 2 existing guides on your site (e.g. 
                <em> Bosch E15</em> links to <em>Garbage Disposal Reset</em>; <em>Whirlpool F2E1</em> links to <em>LG LE Motor</em>). 
                This spreads "Google link juice" and gets your new posts indexed in 24 hours.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB: 60-DAY SPRINT ROADMAP CALENDAR */}
      {activeTab === 'roadmap' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs space-y-8">
          <div className="border-b border-stone-100 pb-4">
            <h3 className="text-xl font-bold font-editorial text-stone-900">
              The 60-Day Blog Monetization Roadmap
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Follow this timeline to go from 0 visitors to ranking keywords, AdSense approval, and daily affiliate commissions under 2 months.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                phase: 'Weeks 1 – 2 (Days 1–14)',
                title: 'The Foundation & AdSense Fast-Track',
                target: 'Reach 15–20 high-quality articles',
                tasks: [
                  'Setup custom domain (.com) & SSL certificate',
                  'Publish 1 comprehensive guide per day using Step A/B/C prompts',
                  'Verify About Us, Privacy Policy, and FTC Affiliate disclosures exist',
                  'Setup Google Search Console & submit XML sitemap',
                  'Apply for Google AdSense on Day 14 once 20 articles are indexed'
                ]
              },
              {
                phase: 'Weeks 3 – 4 (Days 15–30)',
                title: 'The PAA Hijack & 30-Article Milestone',
                target: 'Reach 30 published articles (100% AdSense Approval)',
                tasks: [
                  'Target specific low-competition keywords where forums hold rank #1',
                  'Add "People Also Ask" FAQ schema markup to all guides',
                  'Build an internal linking web (every new post links to 2 older posts)',
                  'Receive Google AdSense account approval notification',
                  'Embed high-RPM responsive leaderboard and in-article ads'
                ]
              },
              {
                phase: 'Weeks 5 – 6 (Days 31–45)',
                title: 'Affiliate Conversion Optimization',
                target: 'Boost Amazon Associates and OEM part sales',
                tasks: [
                  'Add Wirecutter-style "Top Pick" and "Budget Alternative" boxes',
                  'Include exact OEM part numbers and Amazon Prime direct links',
                  'Test local contractor lead-gen widget ($30–$80 per quote referral)',
                  'Publish 5 seasonal winterizing & HVAC maintenance guides'
                ]
              },
              {
                phase: 'Weeks 7 – 8 (Days 46–60)',
                title: 'Ranking Momentum & Scaling to $1,500/Mo',
                target: 'Consistent 1,000+ daily visitors',
                tasks: [
                  'Inspect Google Search Console for keywords ranking on page 2 (positions 11–20)',
                  'Update top 5 articles with 150 words of fresh technician tips to push into top 3',
                  'Achieve $18–$28 AdSense RPM on appliance troubleshooting traffic',
                  'Total estimated monthly income: $600 AdSense + $900 Affiliate = $1,500/mo'
                ]
              }
            ].map((col, idx) => (
              <div key={idx} className="bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {col.phase}
                  </span>
                  <Award className="w-4 h-4 text-amber-500" />
                </div>

                <h4 className="text-base font-bold font-editorial text-stone-900">{col.title}</h4>
                <div className="text-xs font-semibold text-emerald-700">Target: {col.target}</div>

                <ul className="space-y-2 pt-2 text-xs text-stone-600">
                  {col.tasks.map((task, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">✓</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: HIGH-RPM PAA KEYWORD TARGETS */}
      {activeTab === 'keywords' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h3 className="text-xl font-bold font-editorial text-stone-900">
              Low-Competition, High-RPM Target Keywords
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              These keywords pay $8–$18 per click from appliance manufacturers and contractors. Big sites ignore them, so you can rank #1 fast.
            </p>
          </div>

          <div className="space-y-3">
            {KEYWORD_RESEARCH_DATABASE.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-stone-900 font-editorial">{item.keyword}</span>
                    <span className="text-[10px] font-semibold text-stone-500 bg-stone-200 px-2 py-0.5 rounded">
                      {item.subNiche}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 italic">
                    Competitor trap: {item.competitorWeakness}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="text-xs font-extrabold text-emerald-700">{item.cpc} CPC</div>
                    <div className="text-[11px] text-stone-400">{item.searchVolume}</div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedKeyword(item.keyword);
                      setActiveTab('writer');
                      handleGenerateAI();
                    }}
                    className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl shadow-2xs transition-colors"
                  >
                    Draft Post →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: THE 2-HOUR DAILY ROUTINE */}
      {activeTab === 'routine' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h3 className="text-xl font-bold font-editorial text-stone-900">
              Your Daily 2 Hours/Day Execution Checklist
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Stick to this strict rhythm every day to rank consistently without burning out.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DAILY_ROUTINE_STEPS.map((routine, idx) => (
              <div key={idx} className="bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                  {routine.hour}
                </span>

                <div className="space-y-3">
                  {routine.tasks.map((task, tIdx) => (
                    <div key={tIdx} className="bg-white p-3.5 rounded-xl border border-stone-200 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <strong className="text-stone-900">{task.title}</strong>
                        <span className="text-stone-400 font-medium">{task.time}</span>
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed">{task.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
