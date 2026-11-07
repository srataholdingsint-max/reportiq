import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Wrench, 
  AlertTriangle, 
  FileText, 
  Layers, 
  UserCheck, 
  Clock, 
  ArrowRight, 
  Code, 
  Send,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { KEYWORD_RESEARCH_DATABASE, DAILY_ROUTINE_STEPS } from '../data/keywordDatabase';

export const AIContentStudio: React.FC = () => {
  const [selectedKeyword, setSelectedKeyword] = useState<string>('Bosch dishwasher E15 error code fix');
  const [activeTab, setActiveTab] = useState<'workflow' | 'routine' | 'promptCopy'>('workflow');
  const [currentStep, setCurrentStep] = useState<'stepA' | 'stepB' | 'stepC'>('stepA');
  const [customKeyword, setCustomKeyword] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Stored outputs for workflow
  const [generatedOutline, setGeneratedOutline] = useState<string>(`# Detailed Article Outline: Bosch Dishwasher E15 Error Code Fix

## 1. Safety Warnings & Preliminary Prep
- Electrical hazard: Disconnecting 120V household power
- Water shutoff valve location beneath kitchen sink
- Why the drain pump runs continuously (AquaStop flood protection)

## 2. Tools & Replacement Hardware
- T15 / T20 Torx driver
- Bath towels & low-heat dryer
- Silicone Sump Basin Gasket Seal Kit (OEM 12005744)

## 3. Step 1: The Emergency 45-Degree Tilt Reset (Temporary Drain)
- Sliding unit out 6 inches
- Catching pooled water in the shallow base tray
- Resetting the floating styrofoam microswitch

## 4. Step 2: Drying the Float Chamber
- Removing lower toe kickplate
- Inspection with flashlight
- Air drying styrofoam float sensor

## 5. Step 3: Installing the Permanent Sump Gasket ($18 Fix)
- Removing lower spray arm and filter
- Sealing stainless tub to plastic sump bowl
- Torquing retention screws

## 6. Critical Mistakes to Avoid
- Never use regular dish soap (suds overflow into base)
- Don't neglect replacing the sump gasket (leak will return in 3 weeks)

## 7. People Also Ask (FAQ)
- Why won't my Bosch dishwasher turn off during E15?
- Can I clear E15 with the reset button?
- DIY cost vs Plumber callout fee ($18 vs $220)`);

  const [generatedSection, setGeneratedSection] = useState<string>(`## Step 1: The Emergency 45-Degree Tilt Reset (Temporary Drain)

Before you begin, turn off the circuit breaker labeled Dishwasher in your electrical panel.

The E15 error code triggers because water entered the shallow white plastic pan under the dishwasher tub. A small styrofoam disc floated up and tripped a flood safety switch. 

To drain this pooled water without taking the entire machine apart:

* Open the dishwasher door and remove the two screws securing the unit to the countertop underside.
* Slide the dishwasher forward about 6 inches out of the cabinet opening.
* Place two folded bath towels on the floor behind and under the front kickplate.
* Grip the upper metal frame with both hands.
* Tilt the dishwasher backward at a 45-degree angle.
* Hold this position for 60 seconds until all pooled water drains onto your towels.

Once the water drains, the styrofoam float drops back down. When you plug the machine back in, the blinking tap and E15 code will disappear.`);

  const [humanizedIntro, setHumanizedIntro] = useState<string>(`I tried this myself last Saturday. We were hosting family dinner when our Bosch 500-Series dishwasher started beeping non-stop with a blinking faucet icon and 'E15' glowing on the display. Worse yet, the drain pump refused to stop humming—even with the power button turned off. A local repair company quoted me $210 just to show up on Monday. Instead, I grabbed two bath towels, tilted the unit back 45 degrees, and had it running clean dishes in under 20 minutes. Here is how to clear the code and prevent it from ever coming back.`);

  const handleCopy = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 2000);
    }
  };

  const handleGenerateOutline = () => {
    const kw = customKeyword.trim() || selectedKeyword;
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedOutline(`# Detailed Article Outline: ${kw}

## 1. Safety Warnings & Immediate Hazard Controls
- Crucial power/water/gas shutoff protocol
- Identifying the symptoms before touching components
- What damage occurs if ignored

## 2. Required Tools & Replacement Parts
- Exact socket or screwdriver dimensions
- OEM part numbers & price benchmarks ($10 - $25)
- Safety goggles and gloves

## 3. Step-by-Step Diagnostic & Repair
- Step 1: Preliminary testing & error verification
- Step 2: Accessing the internal housing
- Step 3: Cleaning or replacing the failed part
- Step 4: System reassembly and test cycle

## 4. Common DIY Mistakes & Traps
- Top 3 pitfalls homeowners make with ${kw}
- Unnecessary parts people buy by mistake

## 5. Cost Comparison & Real Savings
- DIY Cost: Under $25
- Professional Technician Callout: $180 - $280
- Total Homeowner Savings

## 6. People Also Ask (PAA FAQ)
- High-intent PAA questions answered directly for Google snippet capture`);
      setIsGenerating(false);
    }, 600);
  };

  const handleGenerateSection = () => {
    const kw = customKeyword.trim() || selectedKeyword;
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedSection(`## Step 1: Performing the Root Cause Diagnostic for ${kw}

Always begin by disconnecting power. Unplug the unit or switch off the dedicated breaker.

When tackling ${kw}, most people waste money replacing parts that are still functional. In over 70% of cases, the fault is caused by accumulated debris, mineral buildup, or a loosened connection harness.

Follow this quick inspection:

* Remove the access panel using the correct driver.
* Inspect wire terminals for loose clips or green oxidation.
* Clear any sediment or standing moisture using a clean microfiber cloth.
* Reconnect terminals firmly until you hear a secure click.

Reassemble the panel and reconnect power. Run a quick diagnostic cycle to confirm if the error code clears.`);
      setIsGenerating(false);
    }, 600);
  };

  const handleGenerateHumanizer = () => {
    const kw = customKeyword.trim() || selectedKeyword;
    setHumanizedIntro(`I dealt with this exact ${kw} problem last month in my own home. After calling two local contractors who both quoted over $200 just for the inspection, I decided to pull the service manual and test it myself. It took me less than 25 minutes and under $15 in parts to get everything running like brand new. Follow these exact steps to save yourself a massive bill.`);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Google AI Studio 3-Step Content Machine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              AI Prompt Studio & 2-Hour Daily Routine
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl">
              Execute the exact Step A (Outline), Step B (Section), and Step C (Humanizer) workflow to produce humanized, high-RPM articles that win AdSense approval.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setActiveTab('workflow')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeTab === 'workflow' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              3-Step Workflow
            </button>
            <button
              onClick={() => setActiveTab('routine')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeTab === 'routine' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              Daily 2-Hour Routine
            </button>
            <button
              onClick={() => setActiveTab('promptCopy')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeTab === 'promptCopy' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              Raw System Prompts
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'workflow' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Keyword Picker & Step Tabs */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                Select Target PAA Keyword
              </h3>

              <div className="space-y-2">
                {KEYWORD_RESEARCH_DATABASE.slice(0, 5).map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedKeyword(item.keyword);
                      setCustomKeyword('');
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs font-medium border transition-all ${
                      selectedKeyword === item.keyword && !customKeyword
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-900 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="truncate">{item.keyword}</span>
                      <span className="text-[10px] text-emerald-600 font-bold ml-1">{item.cpc} CPC</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-100">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Or Enter Custom Keyword:
                </label>
                <input
                  type="text"
                  value={customKeyword}
                  onChange={(e) => setCustomKeyword(e.target.value)}
                  placeholder="e.g. LG washer dC error code fix"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Workflow Step Buttons */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-2">
              <button
                onClick={() => setCurrentStep('stepA')}
                className={`w-full text-left p-3 rounded-xl border flex items-center justify-between transition-all ${
                  currentStep === 'stepA'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider">Step A</div>
                  <div className="text-sm font-semibold">Generate Article Outline</div>
                </div>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentStep('stepB')}
                className={`w-full text-left p-3 rounded-xl border flex items-center justify-between transition-all ${
                  currentStep === 'stepB'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider">Step B</div>
                  <div className="text-sm font-semibold">Write Section (No Fluff)</div>
                </div>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentStep('stepC')}
                className={`w-full text-left p-3 rounded-xl border flex items-center justify-between transition-all ${
                  currentStep === 'stepC'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider">Step C (CRITICAL)</div>
                  <div className="text-sm font-semibold">The Human Touch & Intro</div>
                </div>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Step Output Canvas */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            {currentStep === 'stepA' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                      Step A: Generate Outline
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                      Target: "{customKeyword || selectedKeyword}"
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleGenerateOutline}
                      disabled={isGenerating}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm transition-colors"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                      <span>{isGenerating ? 'Generating...' : 'Re-Generate Outline'}</span>
                    </button>
                    <button
                      onClick={() => handleCopy(generatedOutline, 'outline')}
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
                    >
                      {copiedText === 'outline' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedText === 'outline' ? 'Copied!' : 'Copy Outline'}</span>
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                  💡 <strong>Prompt Guideline:</strong> "Act as a home repair expert. Write a detailed outline including H2 headers for each step, common mistakes, and safety warnings. Do not write the full article yet."
                </div>

                <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl font-mono text-xs whitespace-pre-wrap leading-relaxed max-h-[450px] overflow-y-auto">
                  {generatedOutline}
                </div>
              </div>
            )}

            {currentStep === 'stepB' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                      Step B: Write Section (One-by-One)
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                      Direct, Simple English, No AI Fluff
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleGenerateSection}
                      disabled={isGenerating}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm transition-colors"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                      <span>{isGenerating ? 'Writing...' : 'Write Section 1'}</span>
                    </button>
                    <button
                      onClick={() => handleCopy(generatedSection, 'section')}
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
                    >
                      {copiedText === 'section' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedText === 'section' ? 'Copied!' : 'Copy Section'}</span>
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-900">
                  💡 <strong>Prompt Guideline:</strong> "Write Section 1 of this outline. Tone: Helpful, direct, simple English. No fluff. Keep sentences short. Include one bullet list."
                </div>

                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl text-slate-800 text-xs sm:text-sm whitespace-pre-wrap leading-relaxed max-h-[450px] overflow-y-auto">
                  {generatedSection}
                </div>
              </div>
            )}

            {currentStep === 'stepC' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                      Step C: The Human Touch (AdSense Safeguard)
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                      Authentic First-Person Experience Intro
                    </h3>
                  </div>

                  <button
                    onClick={() => handleCopy(humanizedIntro, 'intro')}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
                  >
                    {copiedText === 'intro' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedText === 'intro' ? 'Copied!' : 'Copy Intro'}</span>
                  </button>
                </div>

                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2 text-xs text-emerald-900">
                  <div className="font-bold uppercase tracking-wider">Why Google Approves This:</div>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>Personal Experience:</strong> Starts with "I tried this myself..." to satisfy Google's EEAT (Experience, Expertise, Authoritativeness, Trustworthiness).</li>
                    <li><strong>Fact Checking:</strong> Verifies electrical breaker, gas shutoff, and OEM part numbers so readers never get misled.</li>
                    <li><strong>Real Media:</strong> Suggests exact phone photos to snap (e.g. picture of multimeter display or tilted dishwasher).</li>
                  </ul>
                </div>

                <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 text-xs sm:text-sm text-slate-800 leading-relaxed italic">
                  "{humanizedIntro}"
                </div>

                <button
                  onClick={handleGenerateHumanizer}
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors"
                >
                  Generate Alternate Intro Hook
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'routine' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-xl font-bold text-slate-900">
              The 2 Hours/Day High-RPM Blueprint
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Stick to this daily rhythm for 30 days to build a 30-article topical authority network ready for instant Google AdSense approval.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DAILY_ROUTINE_STEPS.map((routine, idx) => (
              <div 
                key={idx}
                className="bg-slate-50/70 border border-slate-200 rounded-2xl p-6 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                    {routine.hour}
                  </span>
                  <Clock className="w-4 h-4 text-slate-400" />
                </div>

                <div className="space-y-3">
                  {routine.tasks.map((task, tIdx) => (
                    <div key={tIdx} className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                          {task.title}
                        </h4>
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {task.time}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {task.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-white">Your First 7-Day Sprint Target:</h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Day 1 (Domain/Setup) → Day 2 (20 Keywords) → Day 3 to 7 (1 Article/Day). Total = 5 Authority Guides.
              </p>
            </div>
            <span className="px-3 py-1.5 bg-amber-400 text-slate-900 text-xs font-extrabold rounded-lg shrink-0">
              Goal: 30 Guides in Month 1
            </span>
          </div>
        </div>
      )}

      {activeTab === 'promptCopy' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-xl font-bold text-slate-900">
              Raw Copy-Paste Prompts for Google AI Studio
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Copy these directly into the Google AI Studio prompt box when generating articles one by one.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                  Step A Prompt (The Outline)
                </span>
                <button
                  onClick={() => handleCopy(`Act as a home repair expert. Write a detailed outline for an article titled '[Insert Keyword Here]'. Include H2 headers for each step, common mistakes, and safety warnings. Do not write the full article yet.`, 'promptA')}
                  className="px-3 py-1 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  {copiedText === 'promptA' ? 'Copied!' : 'Copy Prompt'}
                </button>
              </div>
              <p className="text-xs font-mono bg-white p-3 rounded-xl border border-slate-200 text-slate-800">
                "Act as a home repair expert. Write a detailed outline for an article titled '[Insert Keyword Here]'. Include H2 headers for each step, common mistakes, and safety warnings. Do not write the full article yet."
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                  Step B Prompt (The Section)
                </span>
                <button
                  onClick={() => handleCopy(`Write Section 1 of this outline. Tone: Helpful, direct, simple English. No fluff. Keep sentences short. Include one bullet list.`, 'promptB')}
                  className="px-3 py-1 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  {copiedText === 'promptB' ? 'Copied!' : 'Copy Prompt'}
                </button>
              </div>
              <p className="text-xs font-mono bg-white p-3 rounded-xl border border-slate-200 text-slate-800">
                "Write Section 1 of this outline. Tone: Helpful, direct, simple English. No fluff. Keep sentences short. Include one bullet list."
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                  The Interactive Error Code Tool Prompt
                </span>
                <button
                  onClick={() => handleCopy(`Create a simple React app that lets users select an appliance brand (Whirlpool, Bosch, LG) and enter an error code. Display a mock solution box. Style it cleanly with a white background and blue buttons.`, 'promptTool')}
                  className="px-3 py-1 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  {copiedText === 'promptTool' ? 'Copied!' : 'Copy Tool Prompt'}
                </button>
              </div>
              <p className="text-xs font-mono bg-white p-3 rounded-xl border border-slate-200 text-slate-800">
                "Create a simple React app that lets users select an appliance brand (Whirlpool, Bosch, LG) and enter an error code. Display a mock solution box. Style it cleanly with a white background and blue buttons."
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
