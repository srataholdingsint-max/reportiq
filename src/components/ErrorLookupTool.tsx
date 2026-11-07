import React, { useState, useMemo } from 'react';
import { 
  Wrench, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink, 
  Printer, 
  ShieldCheck, 
  DollarSign, 
  Clock, 
  Sparkles, 
  HelpCircle,
  MapPin,
  ChevronDown,
  ChevronUp,
  Tag
} from 'lucide-react';
import { ERROR_CODES_DATABASE, generateLiveDiagnosis } from '../data/errorCodes';
import { ErrorCodeItem, ApplianceCategory } from '../types';

interface ErrorLookupToolProps {
  onSelectGuideBySlug?: (slug: string) => void;
  onOpenLeadModal?: (service: string) => void;
}

export const ErrorLookupTool: React.FC<ErrorLookupToolProps> = ({ 
  onSelectGuideBySlug, 
  onOpenLeadModal 
}) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCodeId, setActiveCodeId] = useState<string>('bosch-e15');
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [leadZip, setLeadZip] = useState<string>('');
  const [zipSubmitted, setZipSubmitted] = useState<boolean>(false);

  // Available brands and categories
  const brands = useMemo(() => {
    return ['All', 'Bosch', 'Whirlpool', 'LG', 'Samsung', 'GE', 'Maytag', 'Frigidaire', 'KitchenAid', 'Carrier', 'Rheem', 'InSinkErator'];
  }, []);

  const categories = useMemo(() => {
    return ['All', 'Dishwasher', 'Washing Machine', 'Refrigerator', 'HVAC & Heating', 'Garbage Disposal', 'Plumbing', 'Water Heater'];
  }, []);

  // Filtered results from database
  const filteredCodes = useMemo(() => {
    return ERROR_CODES_DATABASE.filter(item => {
      const matchBrand = selectedBrand === 'All' || item.brand.toLowerCase() === selectedBrand.toLowerCase();
      const matchCategory = selectedCategory === 'All' || item.appliance === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchQuery = !query || 
        item.code.toLowerCase().includes(query) ||
        item.symptom.toLowerCase().includes(query) ||
        item.brand.toLowerCase().includes(query) ||
        item.appliance.toLowerCase().includes(query) ||
        item.meaning.toLowerCase().includes(query) ||
        (item.affectedModels && item.affectedModels.some(m => m.toLowerCase().includes(query))) ||
        (item.parts && item.parts.some(p => p.name.toLowerCase().includes(query) || p.partNumber.toLowerCase().includes(query)));
      return matchBrand && matchCategory && matchQuery;
    });
  }, [selectedBrand, selectedCategory, searchQuery]);

  // Live dynamic fallback when an unlisted code is entered
  const dynamicDiagnosis = useMemo(() => {
    if (searchQuery.trim().length >= 2 && filteredCodes.length === 0) {
      const applianceCat: ApplianceCategory = selectedCategory !== 'All' ? (selectedCategory as ApplianceCategory) : 'Washing Machine';
      return generateLiveDiagnosis(selectedBrand, applianceCat, searchQuery);
    }
    return null;
  }, [searchQuery, filteredCodes.length, selectedBrand, selectedCategory]);

  const activeItem: ErrorCodeItem = useMemo(() => {
    if (dynamicDiagnosis) return dynamicDiagnosis;
    if (filteredCodes.length > 0) {
      const found = filteredCodes.find(item => item.id === activeCodeId);
      if (found) return found;
      return filteredCodes[0];
    }
    return ERROR_CODES_DATABASE[0];
  }, [dynamicDiagnosis, filteredCodes, activeCodeId]);

  const toggleStep = (stepKey: string) => {
    setCheckedSteps(prev => ({ ...prev, [stepKey]: !prev[stepKey] }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (leadZip.trim().length >= 5) {
      setZipSubmitted(true);
      setTimeout(() => {
        if (onOpenLeadModal) onOpenLeadModal(`${activeItem.brand} ${activeItem.appliance} Repair`);
      }, 400);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xs border border-stone-200 overflow-hidden">
      {/* Tool Header */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-blue-950 text-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Interactive Diagnostic Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-editorial tracking-tight text-white">
              Appliance Error Code & Diagnostic Lookup
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm max-w-2xl">
              Select your appliance brand and code to reveal verified step-by-step DIY solutions, OEM part numbers, and contractor cost comparisons.
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-xl transition-colors shadow-xs"
            title="Print this repair checklist"
          >
            <Printer className="w-3.5 h-3.5 text-stone-300" />
            <span>Print Repair Sheet</span>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search error code or symptom (e.g., E15, F2E1, leaking)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800/90 text-white placeholder-slate-400 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Brand Selector */}
          <div className="md:col-span-3">
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-800/90 text-white border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
            >
              <option value="All">All Brands</option>
              {brands.filter(b => b !== 'All').map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          {/* Category Selector */}
          <div className="md:col-span-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-800/90 text-white border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
            >
              <option value="All">All Appliance Types</option>
              {categories.filter(c => c !== 'All').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 text-xs text-slate-300">
          <span className="text-slate-400 font-medium whitespace-nowrap">Popular lookups:</span>
          {[
            { label: 'Bosch E15', id: 'bosch-e15' },
            { label: 'Bosch E24 / E25', id: 'bosch-e24-e25' },
            { label: 'Whirlpool F2E1', id: 'whirlpool-f2e1' },
            { label: 'Whirlpool F9E1', id: 'whirlpool-f9e1' },
            { label: 'LG LE Motor', id: 'lg-le-error' },
            { label: 'LG OE Drain', id: 'lg-oe-error' },
            { label: 'Samsung 4C / 4E', id: 'samsung-4e-4c' },
            { label: 'Samsung 5C Drain', id: 'samsung-5c-5e' },
            { label: 'Samsung 22E Fan', id: 'samsung-22e-fridge' },
            { label: 'Carrier Filter / 33', id: 'carrier-code33' },
            { label: 'Disposal Humming', id: 'disposal-humming-fix' },
            { label: 'Fridge Crisper Leak', id: 'fridge-leaking-crisper' }
          ].map(tag => (
            <button
              key={tag.id}
              onClick={() => {
                setActiveCodeId(tag.id);
                setSearchQuery('');
              }}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-colors ${
                activeCodeId === tag.id && !searchQuery
                  ? 'bg-blue-600 text-white font-semibold' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Tool Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Column: Code Selector List */}
        <div className="lg:col-span-4 border-r border-slate-200 bg-slate-50/50 p-4 max-h-[750px] overflow-y-auto">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Matching Diagnoses ({dynamicDiagnosis ? 'Live AI Generated' : filteredCodes.length})
            </span>
            <span className="text-xs text-blue-600 font-medium">Click to inspect</span>
          </div>

          <div className="space-y-2">
            {dynamicDiagnosis && (
              <div className="p-3.5 rounded-xl border bg-indigo-50 border-indigo-400 shadow-sm ring-1 ring-indigo-400 mb-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-indigo-900 text-white">
                    {dynamicDiagnosis.brand}
                  </span>
                  <span className="text-[11px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-indigo-600" />
                    <span>Live AI Diagnosis</span>
                  </span>
                </div>
                <h4 className="text-sm font-bold text-indigo-950 mt-2 line-clamp-1">
                  {dynamicDiagnosis.code}: {dynamicDiagnosis.symptom}
                </h4>
                <p className="text-xs text-indigo-800 mt-1 line-clamp-2">
                  {dynamicDiagnosis.meaning}
                </p>
              </div>
            )}

            {filteredCodes.length === 0 && !dynamicDiagnosis ? (
              <div className="text-center py-10 px-4 bg-white rounded-xl border border-dashed border-slate-300">
                <Search className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700">Type any code or symptom</p>
                <p className="text-xs text-slate-500 mt-1">
                  e.g., E15, F2E1, LE, 4C, humming, leaking
                </p>
              </div>
            ) : (
              filteredCodes.map(item => {
                const isSelected = item.id === activeCodeId;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveCodeId(item.id);
                      setCheckedSteps({});
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-blue-50 border-blue-500 shadow-sm ring-1 ring-blue-500'
                        : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50/80'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-slate-900 text-white">
                        {item.brand}
                      </span>
                      <span className="text-xs font-bold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded">
                        {item.code}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 mt-2 line-clamp-1">
                      {item.symptom}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {item.meaning}
                    </p>

                    <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {item.timeEstimate}
                      </span>
                      <span className="text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                        DIY: {item.diyCostEstimate}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Detailed Diagnostic & Solution Box */}
        <div className="lg:col-span-8 p-6 sm:p-8 space-y-6">
          {/* Active Diagnostic Header Card */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-600 text-white font-extrabold text-sm rounded-lg shadow-sm">
                  {activeItem.brand} {activeItem.code}
                </span>
                <span className="px-2.5 py-1 bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg">
                  {activeItem.appliance}
                </span>
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg ${
                  activeItem.difficulty.includes('Easy') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  Difficulty: {activeItem.difficulty}
                </span>
                {dynamicDiagnosis && (
                  <span className="px-2.5 py-1 text-xs font-bold bg-indigo-600 text-white rounded-lg flex items-center gap-1 shadow-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Live AI Generated</span>
                  </span>
                )}
              </div>

              {/* Verified Badge */}
              <div className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Certified Technician Verified</span>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-editorial text-slate-900 mt-3">
              {activeItem.symptom}
            </h3>
            <p className="text-slate-700 text-sm mt-1 leading-relaxed">
              <strong className="text-slate-900">Official Meaning:</strong> {activeItem.meaning}
            </p>

            {/* Confirmed Compatible Models */}
            {activeItem.affectedModels && activeItem.affectedModels.length > 0 && (
              <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                  Confirmed Compatible Models & Series:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeItem.affectedModels.map((model, mIdx) => (
                    <span 
                      key={mIdx}
                      className="px-2.5 py-0.5 text-xs font-semibold bg-slate-100 text-slate-800 rounded-md border border-slate-200"
                    >
                      {model}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* DIY vs Pro Cost Comparison Banner */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-white rounded-xl border border-slate-200">
              <div className="text-center sm:text-left">
                <div className="text-xs text-slate-500 font-medium">Estimated DIY Cost</div>
                <div className="text-lg font-bold text-emerald-600">{activeItem.diyCostEstimate}</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-xs text-slate-500 font-medium">Professional Service Call</div>
                <div className="text-lg font-bold text-slate-700">{activeItem.proCostEstimate}</div>
              </div>
              <div className="bg-emerald-50 text-emerald-900 p-2.5 rounded-lg text-center flex flex-col justify-center border border-emerald-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Estimated Savings</span>
                <span className="text-base font-extrabold text-emerald-700">Save up to $220</span>
              </div>
            </div>

            {/* Safety Alert */}
            <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  Safety Precaution ({activeItem.dangerLevel})
                </h5>
                <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                  {activeItem.safetyWarning}
                </p>
              </div>
            </div>
          </div>

          {/* Common Causes List */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              Common Root Causes
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
              {activeItem.commonCauses.map((cause, idx) => (
                <li key={idx} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <span>{cause}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Step-by-Step Interactive DIY Fix Checklist */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-blue-600" />
                Step-by-Step DIY Solution
              </h4>
              <span className="text-xs text-slate-500 font-medium">
                Check off steps as you complete them
              </span>
            </div>

            <div className="space-y-3">
              {activeItem.steps.map((step, idx) => {
                const stepKey = `${activeItem.id}-step-${idx}`;
                const isChecked = !!checkedSteps[stepKey];
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border transition-all ${
                      isChecked 
                        ? 'bg-emerald-50/60 border-emerald-300' 
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={() => toggleStep(stepKey)}
                        className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                          isChecked 
                            ? 'bg-emerald-600 border-emerald-600 text-white' 
                            : 'border-slate-300 bg-white hover:border-blue-500'
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-4 h-4" />}
                      </button>

                      <div className="flex-1">
                        <h5 className={`text-sm font-bold ${isChecked ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                          {step.title}
                        </h5>
                        <p className={`text-xs mt-1 leading-relaxed ${isChecked ? 'text-slate-400' : 'text-slate-600'}`}>
                          {step.description}
                        </p>
                        {step.proTip && (
                          <div className="mt-2 text-[11px] bg-blue-50 text-blue-900 px-3 py-1.5 rounded-md border border-blue-100 font-medium">
                            💡 <strong>Pro Tech Tip:</strong> {step.proTip}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* HIGH-CONVERTING AFFILIATE MONETIZATION: Required Replacement Parts & Tools */}
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl p-6 shadow-md border border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Recommended Fix Parts & Tools
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white mt-1">
                  Verified Replacement Hardware for {activeItem.brand} {activeItem.code}
                </h4>
              </div>
              <span className="text-[11px] text-slate-400">
                Direct OEM Fit & Free Prime Delivery Available
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeItem.parts.map((part, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-4 flex flex-col justify-between hover:border-blue-500 transition-all group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800">
                        {part.partNumber}
                      </span>
                      {part.badge && (
                        <span className="text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded">
                          {part.badge}
                        </span>
                      )}
                    </div>

                    <h5 className="text-sm font-bold text-white mt-2 group-hover:text-blue-300 transition-colors">
                      {part.name}
                    </h5>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                      {part.description}
                    </p>

                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-base font-extrabold text-emerald-400">{part.price}</span>
                      {part.originalPrice && (
                        <span className="text-xs text-slate-400 line-through">{part.originalPrice}</span>
                      )}
                      {part.isPrime && (
                        <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/80 px-1.5 py-0.2 rounded border border-cyan-800">
                          prime
                        </span>
                      )}
                      <span className="text-[11px] text-amber-300 ml-auto">
                        ★ {part.rating} ({part.reviewsCount.toLocaleString()})
                      </span>
                    </div>
                  </div>

                  <a
                    href={part.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="mt-4 w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm"
                  >
                    <span>Check Price on Amazon</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>

            {/* FTC Affiliate Compliance Statement */}
            <p className="text-[10px] text-slate-400 mt-4 text-center">
              *Affiliate Disclosure: As an Amazon Associate and Home Depot affiliate, we earn from qualifying purchases at zero extra cost to you. All parts are matched to manufacturer technical specifications.
            </p>
          </div>

          {/* HIGH-RPM CONTRACTOR LEAD GEN WIDGET */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>Need Professional Hands?</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900">
                Prefer a licensed {activeItem.appliance.toLowerCase()} technician to do it?
              </h4>
              <p className="text-xs text-slate-600 max-w-md">
                Get up to 3 free, no-obligation quotes from pre-screened local contractors in your zip code.
              </p>
            </div>

            <form onSubmit={handleLeadSubmit} className="w-full md:w-auto flex flex-col sm:flex-row gap-2 shrink-0">
              <input
                type="text"
                placeholder="Enter 5-digit ZIP code"
                maxLength={5}
                value={leadZip}
                onChange={(e) => setLeadZip(e.target.value.replace(/\D/g, ''))}
                className="px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-44 text-center"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors whitespace-nowrap"
              >
                {zipSubmitted ? 'Finding Pros...' : 'Get Free Quotes'}
              </button>
            </form>
          </div>

          {/* People Also Ask FAQ Accordion */}
          {activeItem.faqs.length > 0 && (
            <div className="border-t border-slate-200 pt-6">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                Frequently Asked Diagnostic Questions
              </h4>

              <div className="space-y-2">
                {activeItem.faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full text-left px-4 py-3 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                      >
                        <span className="text-xs sm:text-sm font-bold text-slate-900">
                          {faq.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
