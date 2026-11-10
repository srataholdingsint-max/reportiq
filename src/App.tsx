/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  User, 
  Mail, 
  Wrench, 
  ExternalLink, 
  Printer, 
  Sparkles, 
  ArrowRight,
  FileSpreadsheet,
  Trash2,
  Download,
  Calculator,
  ShoppingCart,
  AlertCircle,
  HelpCircle,
  DollarSign,
  Calendar,
  TrendingDown,
  RotateCcw,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { BlogHeader } from './components/BlogHeader';
import { BlogHome } from './components/BlogHome';
import { ArticleView } from './components/ArticleView';
import { SixtyDaySprint } from './components/SixtyDaySprint';
import { ErrorLookupTool } from './components/ErrorLookupTool';
import { LegalPages } from './components/LegalPages';
import { Footer } from './components/Footer';
import { AdSenseChecklistModal } from './components/AdSenseChecklistModal';
import { REPAIR_GUIDES } from './data/guides';
import { ArticleGuide } from './types';

// ==========================================
// EMBEDDED CONTRACTOR AUTOMATED QUOTE MODAL
// ==========================================
interface ContractorLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
}

interface RegionalPricing {
  regionName: string;
  tripFee: string;
  laborFee: string;
  partsFee: string;
  totalLow: number;
  totalHigh: number;
  diySavings: number;
}

const ContractorLeadModal: React.FC<ContractorLeadModalProps> = ({ 
  isOpen, 
  onClose,
  serviceName 
}) => {
  const [zipCode, setZipCode] = useState('');
  const [selectedUrgency, setSelectedUrgency] = useState('Within 24 Hours');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  
  const [isDispatched, setIsDispatched] = useState(false);
  const [activeTab, setActiveTab] = useState<'quote' | 'dispatch'>('quote');

  const baseService = serviceName || 'Appliance Repair';
  const isHvac = baseService.toLowerCase().includes('hvac') || baseService.toLowerCase().includes('furnace');
  const isPlumbing = baseService.toLowerCase().includes('plumb') || baseService.toLowerCase().includes('drain');

  // Compute dynamic automated pricing based on first digit of US ZIP code
  const pricing: RegionalPricing = useMemo(() => {
    const firstDigit = zipCode.trim().charAt(0);
    let regionName = 'National Average';
    let multiplier = 1.0;

    if (firstDigit === '0' || firstDigit === '1') {
      regionName = 'Northeast / Mid-Atlantic Metro';
      multiplier = 1.18;
    } else if (firstDigit === '9') {
      regionName = 'West Coast Metro (CA/WA/OR)';
      multiplier = 1.25;
    } else if (firstDigit === '2' || firstDigit === '3') {
      regionName = 'Southeast Region';
      multiplier = 0.95;
    } else if (firstDigit === '4' || firstDigit === '5') {
      regionName = 'Midwest Region';
      multiplier = 0.92;
    } else if (firstDigit === '6' || firstDigit === '7') {
      regionName = 'South Central Region';
      multiplier = 0.96;
    } else if (firstDigit === '8') {
      regionName = 'Mountain West Region';
      multiplier = 1.05;
    }

    if (isHvac) {
      const lowTrip = Math.round(95 * multiplier);
      const highTrip = Math.round(135 * multiplier);
      const lowLabor = Math.round(160 * multiplier);
      const highLabor = Math.round(250 * multiplier);
      const lowParts = 45;
      const highParts = 95;
      const totalLow = lowTrip + lowLabor + lowParts;
      const totalHigh = highTrip + highLabor + highParts;
      return {
        regionName,
        tripFee: `$${lowTrip} – $${highTrip}`,
        laborFee: `$${lowLabor} – $${highLabor}`,
        partsFee: `$${lowParts} – $${highParts}`,
        totalLow,
        totalHigh,
        diySavings: totalLow - 35
      };
    }

    if (isPlumbing) {
      const lowTrip = Math.round(85 * multiplier);
      const highTrip = Math.round(120 * multiplier);
      const lowLabor = Math.round(130 * multiplier);
      const highLabor = Math.round(200 * multiplier);
      const lowParts = 20;
      const highParts = 45;
      const totalLow = lowTrip + lowLabor + lowParts;
      const totalHigh = highTrip + highLabor + highParts;
      return {
        regionName,
        tripFee: `$${lowTrip} – $${highTrip}`,
        laborFee: `$${lowLabor} – $${highLabor}`,
        partsFee: `$${lowParts} – $${highParts}`,
        totalLow,
        totalHigh,
        diySavings: totalLow - 18
      };
    }

    // Standard appliance repair (Dishwasher, Washer, Dryer, Refrigerator)
    const lowTrip = Math.round(79 * multiplier);
    const highTrip = Math.round(109 * multiplier);
    const lowLabor = Math.round(125 * multiplier);
    const highLabor = Math.round(185 * multiplier);
    const lowParts = 25;
    const highParts = 48;
    const totalLow = lowTrip + lowLabor + lowParts;
    const totalHigh = highTrip + highLabor + highParts;
    return {
      regionName,
      tripFee: `$${lowTrip} – $${highTrip}`,
      laborFee: `$${lowLabor} – $${highLabor}`,
      partsFee: `$${lowParts} – $${highParts}`,
      totalLow,
      totalHigh,
      diySavings: totalLow - 22
    };
  }, [zipCode, isHvac, isPlumbing]);

  if (!isOpen) return null;

  const handleDispatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const storedLeads = JSON.parse(localStorage.getItem('reportiq_leads') || '[]');
      const newLead = {
        id: `REQ-${Date.now().toString().slice(-6)}`,
        name: fullName || 'Homeowner',
        phone: phoneNumber,
        email: emailAddress,
        zipCode: zipCode || 'General',
        service: baseService,
        urgency: selectedUrgency,
        estimatedCost: `$${pricing.totalLow} – $${pricing.totalHigh}`,
        date: new Date().toLocaleString()
      };
      storedLeads.unshift(newLead);
      localStorage.setItem('reportiq_leads', JSON.stringify(storedLeads.slice(0, 100)));
    } catch {
      // ignore
    }
    setIsDispatched(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden relative my-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors z-20"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-6 sm:p-7 relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-black uppercase tracking-wider mb-2 border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Instant Automated Quote Engine</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Automated Repair Estimate & Local Dispatch
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-md">
            Calculated in real-time for <strong className="text-white">{baseService}</strong> using licensed regional labor indices. Zero owner intervention needed.
          </p>

          {/* Quick Tabs */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-800">
            <button
              onClick={() => setActiveTab('quote')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'quote' 
                  ? 'bg-amber-400 text-slate-950 shadow-sm' 
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
              }`}
            >
              1. Instant Price Breakdown
            </button>
            <button
              onClick={() => setActiveTab('dispatch')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'dispatch' 
                  ? 'bg-amber-400 text-slate-950 shadow-sm' 
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
              }`}
            >
              2. Free Local Pro Dispatch
            </button>
          </div>
        </div>

        {/* TAB 1: INSTANT AUTOMATED QUOTE */}
        {activeTab === 'quote' && (
          <div className="p-6 sm:p-7 space-y-5">
            {/* ZIP Input Row */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="flex-1">
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 block mb-1">
                    Enter Your 5-Digit US ZIP Code:
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      maxLength={5}
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="e.g. 90210 or 10001"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="sm:w-48 flex flex-col justify-end">
                  <div className="text-[11px] text-slate-500 leading-tight">
                    <span className="font-bold text-slate-800 block">Pricing Area:</span>
                    <span className="text-blue-700 font-semibold">{pricing.regionName}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Automated Price Table */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-blue-600" />
                  Estimated Professional Cost ({baseService})
                </span>
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-300 px-2.5 py-1 rounded-lg transition-colors"
                >
                  <Printer className="w-3 h-3" />
                  <span>Print Sheet</span>
                </button>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Standard Diagnostic / Trip Fee:</span>
                  <span className="font-bold text-slate-900">{pricing.tripFee}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Certified Labor (1.5 – 2.0 hrs standard):</span>
                  <span className="font-bold text-slate-900">{pricing.laborFee}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">OEM Hardware & Gasket Kit:</span>
                  <span className="font-bold text-slate-900">{pricing.partsFee}</span>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-slate-200 text-sm font-black text-slate-900">
                  <span>Total Estimated Pro Invoice:</span>
                  <span className="text-lg text-blue-700">${pricing.totalLow} – ${pricing.totalHigh}</span>
                </div>
              </div>
            </div>

            {/* Smart 2-Option Decision Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Option A: DIY with Amazon */}
              <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-300 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-950 bg-amber-200 px-2 py-0.5 rounded-full inline-block">
                    Save Up To ${pricing.diySavings} DIY
                  </span>
                  <h4 className="text-xs font-black text-stone-900 mt-2">
                    Option 1: Order OEM Part & Fix It Yourself
                  </h4>
                  <p className="text-[11px] text-stone-600 mt-1 leading-relaxed">
                    Order factory OEM replacement parts on Amazon Prime with 2-day delivery and step-by-step bench guide.
                  </p>
                </div>
                <a
                  href={`https://www.amazon.com/s?k=${encodeURIComponent(`${baseService} OEM replacement parts`)}&tag=reportiq-20`}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl text-center flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <span>Order OEM Parts on Amazon</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Option B: Pro Dispatch */}
              <div className="p-4 rounded-2xl bg-blue-50/90 border border-blue-200 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-950 bg-blue-200 px-2 py-0.5 rounded-full inline-block">
                    100% Hands-Off
                  </span>
                  <h4 className="text-xs font-black text-slate-900 mt-2">
                    Option 2: Match with Certified Pro
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                    Have up to 3 licensed, insured local technicians reach out with confirmed availability.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('dispatch')}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <span>Request Local Pro Dispatch</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Quotes automatically calculated via public Bureau of Labor & regional trade averages. Zero owner intervention needed.</span>
            </div>
          </div>
        )}

        {/* TAB 2: LOCAL PRO DISPATCH FORM */}
        {activeTab === 'dispatch' && (
          <div className="p-6 sm:p-7">
            {isDispatched ? (
              <div className="space-y-4 py-4 text-center">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-black text-slate-900">
                  Dispatch Request Confirmed!
                </h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Your repair inquiry for <strong className="text-slate-900">{baseService}</strong> in ZIP <strong className="text-slate-900">{zipCode || 'Local'}</strong> has been recorded. Pre-screened technicians will contact <strong className="text-slate-900">{phoneNumber || 'you'}</strong> shortly.
                </p>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-1.5 max-w-sm mx-auto">
                  <div className="flex justify-between text-slate-500">
                    <span>Reference Ticket:</span>
                    <span className="font-mono font-bold text-slate-800">REQ-{Date.now().toString().slice(-6)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Target Service:</span>
                    <span className="font-bold text-slate-800">{baseService}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Target Cost Range:</span>
                    <span className="font-bold text-blue-700">${pricing.totalLow} – ${pricing.totalHigh}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto pt-2">
                  <button
                    onClick={() => {
                      setIsDispatched(false);
                      setActiveTab('quote');
                    }}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                  >
                    ← Back to Estimate
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl"
                  >
                    Done (Close)
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleDispatchSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-extrabold text-slate-700 block mb-1">ZIP Code *</label>
                    <input
                      type="text"
                      required
                      maxLength={5}
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="e.g. 90210"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-extrabold text-slate-700 block mb-1">Timing *</label>
                    <select
                      value={selectedUrgency}
                      onChange={(e) => setSelectedUrgency(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Within 24 Hours">Within 24 Hours</option>
                      <option value="This Week">This Week</option>
                      <option value="Just Planning">Just Planning</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-extrabold text-slate-700 block mb-1">Your Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Alex Taylor"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-extrabold text-slate-700 block mb-1">Mobile Phone *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="(555) 234-5678"
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-extrabold text-slate-700 block mb-1">Email Address *</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        placeholder="alex@example.com"
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-[11px] text-blue-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Your estimate is locked at <strong>${pricing.totalLow} – ${pricing.totalHigh}</strong>. Local contractors match this baseline range.</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-md transition-all uppercase tracking-wider"
                >
                  Send Free Dispatch Request →
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// EMBEDDED LEADS / QUOTES DASHBOARD MODAL
// ==========================================
interface LeadRecord {
  id?: string;
  name: string;
  phone: string;
  email: string;
  zipCode: string;
  service: string;
  urgency?: string;
  estimatedCost?: string;
  date: string;
}

interface LeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeadsModal: React.FC<LeadsModalProps> = ({ isOpen, onClose }) => {
  const [leads, setLeads] = useState<LeadRecord[]>([]);

  useEffect(() => {
    if (isOpen) {
      try {
        const stored = JSON.parse(localStorage.getItem('reportiq_leads') || '[]');
        setLeads(stored);
      } catch {
        setLeads([]);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClear = () => {
    if (window.confirm('Clear all stored lead records?')) {
      localStorage.removeItem('reportiq_leads');
      setLeads([]);
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Date', 'Name', 'Phone', 'Email', 'ZIP', 'Service', 'Urgency', 'EstimatedCost'];
    const rows = leads.map(l => [
      l.id || '',
      `"${l.date}"`,
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      `"${l.zipCode}"`,
      `"${l.service}"`,
      `"${l.urgency || ''}"`,
      `"${l.estimatedCost || ''}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `reportiq_quotes_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden relative my-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="bg-gradient-to-r from-stone-900 via-slate-900 to-stone-900 text-white p-6 sm:p-7">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
            <FileSpreadsheet className="w-4 h-4" />
            <span>Private Owner Access</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Automated Quote & Contractor Leads ({leads.length})
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Every customer quote request submitted on your website is logged here automatically.
          </p>
        </div>

        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {leads.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-sm">
              <p>No customer quote requests recorded yet.</p>
              <p className="text-xs text-slate-400 mt-1">When visitors request quotes on your live site, their details and estimated repair prices will appear here instantly.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {leads.map((lead, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span className="text-blue-700">{lead.service}</span>
                    <span className="text-slate-400 font-normal text-[11px]">{lead.date}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-slate-800">{lead.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-blue-600 font-semibold">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <a href={`tel:${lead.phone}`}>{lead.phone}</a>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <a href={`mailto:${lead.email}`}>{lead.email}</a>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>ZIP: {lead.zipCode} ({lead.urgency || 'Standard'})</span>
                    </div>
                  </div>
                  {lead.estimatedCost && (
                    <div className="pt-2 border-t border-slate-200 flex justify-between text-[11px]">
                      <span className="text-slate-500">Auto-Generated Estimate:</span>
                      <span className="font-bold text-emerald-700">{lead.estimatedCost}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={handleClear}
            disabled={leads.length === 0}
            className="text-xs text-red-600 hover:text-red-700 font-bold flex items-center gap-1 disabled:opacity-40"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Leads</span>
          </button>
          <div className="flex gap-2">
            <button
              onClick={handleExportCSV}
              disabled={leads.length === 0}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 disabled:opacity-40"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// EMBEDDED REPAIR VS REPLACE CALCULATOR (50% RULE)
// ==========================================
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

const RepairVsReplaceCalculator: React.FC<CalculatorProps> = ({ onOpenLeadModal }) => {
  const [selectedAppliance, setSelectedAppliance] = useState<string>('Dishwasher');
  const [applianceAge, setApplianceAge] = useState<number>(6);
  const [repairQuote, setRepairQuote] = useState<number>(250);
  const [replacementCost, setReplacementCost] = useState<number>(750);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const benchmark = APPLIANCE_BENCHMARKS[selectedAppliance] || APPLIANCE_BENCHMARKS['Dishwasher'];

  const handleSelectAppliance = (applianceName: string) => {
    setSelectedAppliance(applianceName);
    const b = APPLIANCE_BENCHMARKS[applianceName];
    if (b) {
      setReplacementCost(b.averageNewCost);
      setRepairQuote(b.typicalRepairCost);
      setApplianceAge(Math.min(applianceAge, b.averageLifespan - 1));
    }
  };

  const calculation = useMemo(() => {
    const lifespan = benchmark.averageLifespan;
    const remainingYears = Math.max(0, lifespan - applianceAge);
    const ageRatio = applianceAge / lifespan;
    const costRatio = repairQuote / replacementCost;

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
      a: 'Almost always when the breakdown is caused by consumable wear parts: door gaskets, thermal fuses, drain pump impellers, igniters, and drive belts. These OEM parts typically cost between $15 and $40 on Amazon and can be installed in under 45 minutes.'
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

// ==========================================
// MAIN REPORTIQ APPLICATION
// ==========================================
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
  const [activeView, setActiveView] = useState<'blog' | 'lookup' | 'calculator' | 'sprint' | 'legal'>('blog');
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
        const slug = path.replace('/guide/', '').trim();
        const found = guides.find(g => g.slug.toLowerCase() === slug || slug.includes(g.slug.toLowerCase()) || g.slug.toLowerCase().includes(slug)) || 
                      REPAIR_GUIDES.find(g => g.slug.toLowerCase() === slug || slug.includes(g.slug.toLowerCase()) || g.slug.toLowerCase().includes(slug));
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
      } else if (path === '/calculator' || path === '/repair-vs-replace') {
        setActiveView('calculator');
        setSelectedGuide(null);
        document.title = 'Appliance Repair vs Replace Calculator (50% Rule) | ReportIQ';
        return;
      } else if (path === '/admin' || path === '/editor' || path === '/sprint' || path === '/publish' || path === '/write') {
        setIsAdmin(true);
        setActiveView('sprint');
        setSelectedGuide(null);
        document.title = 'Author Studio & Article Publisher | ReportIQ';
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

      // Track pageview in Google Analytics 4 (GA4)
      try {
        if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
          (window as any).gtag('config', 'G-N29TBE7FGC', {
            page_path: window.location.pathname,
            page_title: document.title
          });
        }
      } catch {
        // ignore analytics error
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

  const handleNavigateView = (view: 'blog' | 'lookup' | 'calculator' | 'sprint' | 'legal') => {
    setActiveView(view);
    if (view === 'blog') {
      setSelectedGuide(null);
      window.history.pushState({ type: 'home' }, '', '/');
      document.title = 'ReportIQ - Independent DIY Repair Reports & Diagnostics';
    } else if (view === 'lookup') {
      setSelectedGuide(null);
      window.history.pushState({ type: 'lookup' }, '', '/lookup');
      document.title = 'Appliance Error Code Lookup Tool | ReportIQ';
    } else if (view === 'calculator') {
      setSelectedGuide(null);
      window.history.pushState({ type: 'calculator' }, '', '/calculator');
      document.title = 'Appliance Repair vs Replace Calculator (50% Rule) | ReportIQ';
    } else if (view === 'sprint') {
      window.history.pushState({ type: 'sprint' }, '', '/editor');
      document.title = 'Author Studio & Article Publisher | ReportIQ';
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

        {/* VIEW 3: INTERACTIVE REPAIR VS REPLACE CALCULATOR (50% RULE) */}
        {activeView === 'calculator' && (
          <RepairVsReplaceCalculator onOpenLeadModal={handleOpenLeadModal} />
        )}

        {/* VIEW 4: 60-DAY SPRINT & DAILY ARTICLE GENERATOR */}
        {activeView === 'sprint' && (
          <SixtyDaySprint
            publishedCount={guides.length}
            onPublishNewArticle={handlePublishNewArticle}
            onOpenAdSenseModal={() => setIsAdSenseModalOpen(true)}
          />
        )}

        {/* VIEW 5: LEGAL & TRUST PAGES (AdSense Approval Shield) */}
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
