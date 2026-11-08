import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Wrench, 
  ShoppingCart, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  DollarSign, 
  Calendar, 
  TrendingDown, 
  ShieldCheck, 
  ExternalLink, 
  RotateCcw,
  Printer,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ApplianceCategory } from '../types';

interface ApplianceBenchmark {
  averageLifespan: number;
  averageNewCost: number;
  typicalRepairCost: number;
  energySavingsPerYearNew: number;
  replacementAdvice: string;
}

const APPLIANCE_BENCHMARKS: Record<string, ApplianceBenchmark> = {
  'Dishwasher': {
    averageLifespan: 10,
    averageNewCost: 750,
    typicalRepairCost: 220,
    energySavingsPerYearNew: 35,
    replacementAdvice: 'Modern dishwashers use 30% less water and feature quieter brushless motors. If your unit is over 8 years old with a motor or control board failure, replacement is usually the best financial choice.'
  },
  'Washing Machine': {
    averageLifespan: 11,
    averageNewCost: 850,
    typicalRepairCost: 240,
    energySavingsPerYearNew: 45,
    replacementAdvice: 'Top-load washers with simple direct-drive couplers are worth repairing up to 10 years. Front-load washers with drum bearing failure or tub leaks should be replaced if older than 7 years.'
  },
  'Clothes Dryer': {
    averageLifespan: 13,
    averageNewCost: 700,
    typicalRepairCost: 180,
    energySavingsPerYearNew: 25,
    replacementAdvice: 'Dryers are mechanically simple. Thermal fuses, belts, heating elements, and rollers cost under $30 on Amazon and are almost always worth repairing even on 10+ year old machines.'
  },
  'Refrigerator': {
    averageLifespan: 12,
    averageNewCost: 1400,
    typicalRepairCost: 320,
    energySavingsPerYearNew: 70,
    replacementAdvice: 'Defrost heaters, fan motors, and door gaskets are great DIY repairs. But if the sealed refrigeration compressor fails or leaks freon on a fridge older than 8 years, replace immediately.'
  },
  'HVAC & Heating': {
    averageLifespan: 16,
    averageNewCost: 4800,
    typicalRepairCost: 650,
    energySavingsPerYearNew: 180,
    replacementAdvice: 'Capacitors, flame sensors, pressure switches, and filters should always be repaired. A cracked heat exchanger or burnt compressor older than 12 years warrants a high-efficiency replacement.'
  },
  'Water Heater': {
    averageLifespan: 10,
    averageNewCost: 950,
    typicalRepairCost: 260,
    energySavingsPerYearNew: 50,
    replacementAdvice: 'Heating elements and pressure relief valves are $20 DIY fixes. However, if the steel inner tank is leaking from bottom rust, it cannot be safely repaired—replace immediately.'
  },
  'Garbage Disposal': {
    averageLifespan: 10,
    averageNewCost: 160,
    typicalRepairCost: 110,
    energySavingsPerYearNew: 0,
    replacementAdvice: 'Disposals with jammed flywheels can be reset in 2 minutes for $0 using a hex key. If the internal motor casing is leaking dirty water from the underside, purchase a new 1/2 HP replacement.'
  }
};

interface CalculatorProps {
  onOpenLeadModal?: (service: string) => void;
}

export const RepairVsReplaceCalculator: React.FC<CalculatorProps> = ({ onOpenLeadModal }) => {
  const [selectedAppliance, setSelectedAppliance] = useState<string>('Dishwasher');
  const [applianceAge, setApplianceAge] = useState<number>(6);
  const [repairQuote, setRepairQuote] = useState<number>(250);
  const [replacementCost, setReplacementCost] = useState<number>(750);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const benchmark = APPLIANCE_BENCHMARKS[selectedAppliance] || APPLIANCE_BENCHMARKS['Dishwasher'];

  // Handle appliance type switch
  const handleSelectAppliance = (applianceName: string) => {
    setSelectedAppliance(applianceName);
    const b = APPLIANCE_BENCHMARKS[applianceName];
    if (b) {
      setReplacementCost(b.averageNewCost);
      setRepairQuote(b.typicalRepairCost);
      setApplianceAge(Math.min(applianceAge, b.averageLifespan - 1));
    }
  };

  // The Industry Standard "50% Rule" Calculation
  const calculation = useMemo(() => {
    const lifespan = benchmark.averageLifespan;
    const remainingYears = Math.max(0, lifespan - applianceAge);
    const ageRatio = applianceAge / lifespan;
    const costRatio = repairQuote / replacementCost;

    // The Golden Rule: If repair cost is > 50% of new price AND age is past 50% of lifespan => Replace
    const exceedsCostRule = costRatio >= 0.50;
    const exceedsAgeRule = ageRatio >= 0.50;

    let decision: 'REPAIR' | 'REPLACE' | 'CONSIDER_BOTH';
    let confidenceScore = 80;
    let headlineReason = '';

    if (exceedsCostRule && exceedsAgeRule) {
      decision = 'REPLACE';
      confidenceScore = Math.min(98, Math.round(50 + (costRatio * 30) + (ageRatio * 20)));
      headlineReason = `Your ${selectedAppliance} is past 50% of its expected life (${applianceAge} of ${lifespan} yrs) and the repair cost exceeds 50% of a brand-new unit.`;
    } else if (costRatio < 0.35 && ageRatio < 0.70) {
      decision = 'REPAIR';
      confidenceScore = Math.min(95, Math.round(100 - (costRatio * 50)));
      headlineReason = `Repairing this ${selectedAppliance} is financially smart. You still have ~${remainingYears} years of expected life and the repair is under 35% of replacement.`;
    } else if (applianceAge >= lifespan - 1) {
      decision = 'REPLACE';
      confidenceScore = 90;
      headlineReason = `This unit has exceeded or reached its typical lifespan of ${lifespan} years. Further component failures are statistically imminent.`;
    } else {
      decision = 'CONSIDER_BOTH';
      confidenceScore = 65;
      headlineReason = `Borderline financial scenario. If you can perform a DIY repair with an OEM part ($20–$50), repair it! If paying a contractor $250+ labor, lean toward replacing.`;
    }

    // Cumulative 3-year projected cost comparison
    const projectedRepairScenario3Yr = repairQuote + (remainingYears <= 1 ? replacementCost : 60);
    const projectedReplaceScenario3Yr = replacementCost - (benchmark.energySavingsPerYearNew * 3);

    return {
      remainingYears,
      ageRatio: Math.round(ageRatio * 100),
      costRatio: Math.round(costRatio * 100),
      decision,
      confidenceScore,
      headlineReason,
      projectedRepairScenario3Yr,
      projectedReplaceScenario3Yr
    };
  }, [selectedAppliance, applianceAge, repairQuote, replacementCost, benchmark]);

  const faqs = [
    {
      q: 'What is the appliance 50% rule?',
      a: 'The 50% rule is the gold standard used by certified technicians and consumer advocacy groups: Never spend more than 50% of the cost of a new appliance to repair an old one that is already past 50% of its expected lifespan.'
    },
    {
      q: 'What are the average lifespans of major home appliances?',
      a: 'On average: Refrigerators last 12 years, Dishwashers 10 years, Washing Machines 11 years, Dryers 13 years, Gas Furnaces 15–18 years, and Tank Water Heaters 10 years.'
    },
    {
      q: 'When does a DIY repair beat replacing the appliance?',
      a: 'Almost always when the breakdown is caused by consumable wear parts: door gaskets, thermal fuses, drain pump impellers, igniters, and drive belts. These OEM parts typically cost between $15 and $40 on Amazon and can be installed in under 45 minutes with basic screwdrivers.'
    },
    {
      q: 'Should I repair a refrigerator with a bad compressor?',
      a: 'Usually no. Replacing a sealed refrigeration compressor requires certified EPA Section 608 technician tools, freon recovery, and torch brazing, often costing $700 to $1,100. If the refrigerator is over 5 years old, buying a brand-new energy-efficient refrigerator is almost always more cost-effective.'
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebApplication",
                "name": "Appliance Repair vs Replace Calculator",
                "url": "https://www.reportiq.xyz/calculator",
                "description": "Interactive 50% rule calculator to determine whether to repair or replace your dishwasher, washer, dryer, refrigerator, or water heater.",
                "applicationCategory": "HomeImprovementApplication",
                "operatingSystem": "All"
              },
              {
                "@type": "FAQPage",
                "mainEntity": faqs.map(f => ({
                  "@type": "Question",
                  "name": f.q,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": f.a
                  }
                }))
              }
            ]
          })
        }}
      />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-blue-950 to-stone-900 text-white rounded-3xl p-6 sm:p-10 border border-stone-800 shadow-xl text-center space-y-3 relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-400/30">
          <Calculator className="w-3.5 h-3.5 text-amber-400" />
          <span>Interactive Consumer Decision Tool</span>
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-editorial tracking-tight text-white max-w-3xl mx-auto">
          Appliance Repair vs Replace Calculator
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Powered by the certified <strong className="text-white">50% Appliance Lifespan Rule</strong>. Calculate whether spending money on repairs or upgrading to an ENERGY STAR unit saves you the most money over the next 3 years.
        </p>

        {/* Quick Appliance Selector Pills */}
        <div className="pt-4 flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
          {Object.keys(APPLIANCE_BENCHMARKS).map(name => (
            <button
              key={name}
              onClick={() => handleSelectAppliance(name)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedAppliance === name
                  ? 'bg-amber-400 text-stone-950 shadow-md scale-105'
                  : 'bg-white/10 text-slate-200 hover:bg-white/20'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Calculator Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Input Controls */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h2 className="text-base font-black text-stone-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Step 1: Enter Appliance Financials</span>
            </h2>
            <button
              onClick={() => handleSelectAppliance(selectedAppliance)}
              className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 font-semibold"
              title="Reset to averages"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Input 1: Age of Appliance */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-extrabold text-stone-800 uppercase tracking-wide flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>Current Age of {selectedAppliance}:</span>
              </label>
              <span className="text-sm font-black text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200">
                {applianceAge} Years Old
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={benchmark.averageLifespan + 4}
              step={1}
              value={applianceAge}
              onChange={(e) => setApplianceAge(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer h-2 bg-stone-200 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-stone-500">
              <span>Brand New (0 yrs)</span>
              <span>Avg Lifespan: {benchmark.averageLifespan} yrs</span>
              <span>Older ({benchmark.averageLifespan + 4}+ yrs)</span>
            </div>
          </div>

          {/* Input 2: Repair Quote */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-extrabold text-stone-800 uppercase tracking-wide flex items-center gap-1.5">
                <Wrench className="w-4 h-4 text-amber-600" />
                <span>Estimated Repair Cost:</span>
              </label>
              <div className="flex items-center gap-1">
                <span className="text-xs text-stone-500">$</span>
                <input
                  type="number"
                  min={20}
                  max={2500}
                  step={10}
                  value={repairQuote}
                  onChange={(e) => setRepairQuote(Math.max(0, Number(e.target.value)))}
                  className="w-24 text-right text-sm font-black text-amber-700 bg-amber-50 px-2 py-1 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
            <input
              type="range"
              min={20}
              max={selectedAppliance === 'HVAC & Heating' ? 2500 : 1200}
              step={10}
              value={repairQuote}
              onChange={(e) => setRepairQuote(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-stone-200 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-stone-500">
              <span>DIY OEM Part ($20–$50)</span>
              <span>Typical Pro Repair (~${benchmark.typicalRepairCost})</span>
            </div>
          </div>

          {/* Input 3: New Replacement Cost */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-extrabold text-stone-800 uppercase tracking-wide flex items-center gap-1.5">
                <ShoppingCart className="w-4 h-4 text-emerald-600" />
                <span>Cost of Brand-New Replacement:</span>
              </label>
              <div className="flex items-center gap-1">
                <span className="text-xs text-stone-500">$</span>
                <input
                  type="number"
                  min={100}
                  max={9000}
                  step={50}
                  value={replacementCost}
                  onChange={(e) => setReplacementCost(Math.max(50, Number(e.target.value)))}
                  className="w-24 text-right text-sm font-black text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
            <input
              type="range"
              min={selectedAppliance === 'Garbage Disposal' ? 80 : 300}
              max={selectedAppliance === 'HVAC & Heating' ? 9000 : 3000}
              step={25}
              value={replacementCost}
              onChange={(e) => setReplacementCost(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer h-2 bg-stone-200 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-stone-500">
              <span>Budget Model</span>
              <span>Average New Price (${benchmark.averageNewCost})</span>
              <span>Premium Tier</span>
            </div>
          </div>

          {/* Quick Benchmark Fact Box */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-xs text-stone-600 space-y-1.5">
            <div className="font-extrabold text-stone-900 flex items-center gap-1 text-[11px] uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Master Technician Benchmark Data:</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              {benchmark.replacementAdvice}
            </p>
          </div>
        </div>

        {/* Right Column: Dynamic Decision Engine & Recommendation */}
        <div className="lg:col-span-6 space-y-6">
          {/* Result Card */}
          <div className={`rounded-3xl p-6 sm:p-8 border shadow-md text-stone-900 transition-all ${
            calculation.decision === 'REPAIR'
              ? 'bg-gradient-to-br from-emerald-50 via-teal-50 to-white border-emerald-300'
              : calculation.decision === 'REPLACE'
              ? 'bg-gradient-to-br from-rose-50 via-orange-50 to-white border-rose-300'
              : 'bg-gradient-to-br from-amber-50 via-stone-50 to-white border-amber-300'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <span className="text-xs font-black uppercase tracking-wider text-stone-600">
                Official 50% Rule Verdict
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-stone-900 text-white">
                {calculation.confidenceScore}% Confidence
              </span>
            </div>

            {/* Giant Recommendation Badge */}
            <div className="py-4 text-center space-y-1">
              <div className="text-xs font-extrabold text-stone-500 uppercase tracking-widest">
                Our Expert Recommendation:
              </div>
              <div className={`text-3xl sm:text-5xl font-black font-editorial tracking-tight ${
                calculation.decision === 'REPAIR'
                  ? 'text-emerald-700'
                  : calculation.decision === 'REPLACE'
                  ? 'text-rose-700'
                  : 'text-amber-700'
              }`}>
                {calculation.decision === 'REPAIR' && 'REPAIR IT'}
                {calculation.decision === 'REPLACE' && 'REPLACE IT'}
                {calculation.decision === 'CONSIDER_BOTH' && 'CONSIDER BOTH'}
              </div>
              <p className="text-xs sm:text-sm font-semibold text-stone-700 max-w-md mx-auto pt-2 leading-relaxed">
                {calculation.headlineReason}
              </p>
            </div>

            {/* The 50% Rule Progress Bars */}
            <div className="bg-white/90 rounded-2xl p-4 border border-stone-200 space-y-3 shadow-2xs">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-stone-800">
                  <span>Repair Cost vs New Price Ratio:</span>
                  <span className={calculation.costRatio >= 50 ? 'text-rose-600' : 'text-emerald-600'}>
                    {calculation.costRatio}% (Max Safe Threshold: 50%)
                  </span>
                </div>
                <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      calculation.costRatio >= 50 ? 'bg-rose-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(100, calculation.costRatio)}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-stone-800">
                  <span>Appliance Age vs Expected Lifespan:</span>
                  <span className={calculation.ageRatio >= 50 ? 'text-rose-600' : 'text-emerald-600'}>
                    {calculation.ageRatio}% Used ({applianceAge} of {benchmark.averageLifespan} yrs)
                  </span>
                </div>
                <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      calculation.ageRatio >= 50 ? 'bg-rose-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(100, calculation.ageRatio)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Projected 3-Year Total Financial Cost */}
            <div className="grid grid-cols-2 gap-3 pt-4 text-xs">
              <div className="p-3 bg-white/80 rounded-xl border border-stone-200 text-center">
                <span className="text-[11px] text-stone-500 font-semibold block">3-Yr Cost (Keep & Repair)</span>
                <span className="text-base font-black text-stone-900 block mt-0.5">
                  ${calculation.projectedRepairScenario3Yr}
                </span>
                <span className="text-[10px] text-stone-500">Repair + wear risk</span>
              </div>
              <div className="p-3 bg-white/80 rounded-xl border border-stone-200 text-center">
                <span className="text-[11px] text-stone-500 font-semibold block">3-Yr Cost (Buy New)</span>
                <span className="text-base font-black text-stone-900 block mt-0.5">
                  ${calculation.projectedReplaceScenario3Yr}
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold">Includes energy savings</span>
              </div>
            </div>

            {/* Smart Action Buttons */}
            <div className="pt-5 space-y-2.5">
              {calculation.decision === 'REPAIR' || calculation.decision === 'CONSIDER_BOTH' ? (
                <>
                  <a
                    href={`https://www.amazon.com/s?k=${encodeURIComponent(`${selectedAppliance} OEM replacement parts`)}&tag=reportiq-20`}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs sm:text-sm rounded-xl text-center flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Find Cheap DIY OEM Parts on Amazon Prime ($15–$45)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  {onOpenLeadModal && (
                    <button
                      onClick={() => onOpenLeadModal(selectedAppliance)}
                      className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Wrench className="w-3.5 h-3.5" />
                      <span>Compare 3 Free Local Contractor Quotes</span>
                    </button>
                  )}
                </>
              ) : (
                <>
                  <a
                    href={`https://www.amazon.com/s?k=${encodeURIComponent(`best rated ${selectedAppliance} ENERGY STAR`)}&tag=reportiq-20`}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-black text-xs sm:text-sm rounded-xl text-center flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <ShoppingCart className="w-4 h-4 text-amber-400" />
                    <span>Compare Top-Rated New Replacements on Amazon</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={`https://www.amazon.com/s?k=${encodeURIComponent(`${selectedAppliance} OEM repair parts`)}&tag=reportiq-20`}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="w-full py-2.5 bg-amber-100 hover:bg-amber-200 text-stone-900 font-bold text-xs rounded-xl text-center flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Check if a $25 DIY fix is possible first</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SEO Content & Detailed Explanations */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs space-y-6">
        <h2 className="text-xl sm:text-2xl font-black font-editorial text-stone-900">
          How to Decide: Should You Repair or Replace Your Appliance?
        </h2>
        <div className="text-xs sm:text-sm text-stone-700 space-y-4 leading-relaxed">
          <p>
            When a major appliance suddenly throws an error code, stops heating, or starts pooling water across your kitchen floor, homeowners face a high-stress dilemma: <strong>Is it worth paying for repairs, or should you put that money toward a brand-new appliance?</strong>
          </p>
          <p>
            Our tool implements the <strong>50% Rule</strong> formulated by leading appliance master technicians and consumer research labs. If an appliance has surpassed half its life expectancy and the estimated repair invoice approaches half the cost of replacement, replacing the appliance protects your wallet against "cascading failures"—the frustrating scenario where repairing one worn part causes adjacent aged components to break down weeks later.
          </p>
        </div>

        {/* PAA FAQs Accordion for Rich Results */}
        <div className="pt-6 border-t border-stone-200 space-y-3">
          <h3 className="text-base font-extrabold text-stone-900">
            Frequently Asked Questions (PAA)
          </h3>
          <div className="space-y-2">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-stone-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-4 py-3 bg-stone-50 text-left text-xs sm:text-sm font-bold text-stone-900 flex justify-between items-center hover:bg-stone-100 transition-colors"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
                </button>
                {openFaq === idx && (
                  <div className="px-4 py-3 text-xs sm:text-sm text-stone-600 bg-white leading-relaxed border-t border-stone-200">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
