import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  X, 
  DollarSign, 
  TrendingUp, 
  ShieldAlert, 
  Smartphone, 
  Globe, 
  FileText, 
  Image as ImageIcon,
  Sparkles
} from 'lucide-react';
import { REPAIR_GUIDES } from '../data/guides';

interface AdSenseChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLegalTab?: (tab: 'about' | 'privacy' | 'affiliate') => void;
}

export const AdSenseChecklistModal: React.FC<AdSenseChecklistModalProps> = ({ 
  isOpen, 
  onClose,
  onOpenLegalTab
}) => {
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({
    'custom-domain': true,
    'privacy-policy': true,
    'about-page': true,
    'affiliate-disclosure': true,
    'mobile-friendly': true,
    'copyright-images': true
  });

  const [monthlyPageviews, setMonthlyPageviews] = useState<number>(35000);

  if (!isOpen) return null;

  const publishedCount = REPAIR_GUIDES.length;
  const articlesTarget = 30;
  const progressPercent = Math.min(100, Math.round((publishedCount / articlesTarget) * 100));

  const toggleCheck = (id: string) => {
    setCompletedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Home Maintenance RPM calculation: avg $22 RPM + Affiliate 1.5% conversion at $18 commission
  const estimatedAdRevenue = Math.round((monthlyPageviews / 1000) * 22);
  const estimatedAffiliateRevenue = Math.round((monthlyPageviews * 0.012) * 16.5);
  const totalProjected = estimatedAdRevenue + estimatedAffiliateRevenue;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AdSense Approval Blueprint & Checklist</span>
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Google AdSense Approval Audit
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Follow this 5-point checklist to guarantee 100% first-try approval in the high-RPM Home Maintenance niche.
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Article Count Milestone Progress */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
              <span>Goal 1: 30 In-Depth Articles Published</span>
              <span className="text-blue-600 font-extrabold">{publishedCount} / {articlesTarget} Guides ({progressPercent}%)</span>
            </div>

            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-blue-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <p className="text-xs text-slate-500">
              Google AdSense bots reject websites with fewer than 20–30 comprehensive articles for "Low Value Content". Our template provides 8 full guides to start!
            </p>
          </div>

          {/* Verification Checklist */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Compliance Requirements Checklist
            </h4>

            {[
              {
                id: 'custom-domain',
                title: 'Custom .com Domain Configured',
                desc: 'AdSense prioritizes top-level domains over free subdomains (.com, .net, .org).',
                icon: Globe
              },
              {
                id: 'privacy-policy',
                title: 'GDPR / CCPA / AdSense Privacy Policy',
                desc: 'Must include mandatory Google DART cookie clauses and analytics tracking disclosures.',
                icon: FileText,
                action: () => onOpenLegalTab && onOpenLegalTab('privacy')
              },
              {
                id: 'about-page',
                title: 'Editorial Team "About Us" Page',
                desc: 'Displays bios of verified appliance technicians to satisfy Google EEAT standards.',
                icon: ShieldAlert,
                action: () => onOpenLegalTab && onOpenLegalTab('about')
              },
              {
                id: 'affiliate-disclosure',
                title: 'FTC & Amazon Associates Operating Agreement',
                desc: 'Clear, transparent disclosure of product affiliate links on all repair pages.',
                icon: DollarSign,
                action: () => onOpenLegalTab && onOpenLegalTab('affiliate')
              },
              {
                id: 'mobile-friendly',
                title: '100% Mobile Responsive Layout',
                desc: 'Tested on smartphone screens; zero horizontal scroll or clipped ad spaces.',
                icon: Smartphone
              },
              {
                id: 'copyright-images',
                title: 'Zero Copyright Infringing Photos',
                desc: 'All diagrams and photos are sourced from Unsplash, Pexels, or your own camera.',
                icon: ImageIcon
              }
            ].map(item => {
              const isChecked = !!completedItems[item.id];
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                    isChecked ? 'bg-emerald-50/50 border-emerald-200' : 'bg-white border-slate-200'
                  }`}
                >
                  <button
                    onClick={() => toggleCheck(item.id)}
                    className="mt-0.5 text-emerald-600 shrink-0"
                  >
                    {isChecked ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300" />
                    )}
                  </button>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <Icon className="w-3.5 h-3.5 text-blue-600" />
                        <span>{item.title}</span>
                      </h5>
                      {item.action && (
                        <button
                          onClick={() => {
                            onClose();
                            item.action!();
                          }}
                          className="text-[11px] font-semibold text-blue-600 hover:underline"
                        >
                          View Page →
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* HIGH-RPM EARNINGS SIMULATOR */}
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Home Repair Niche RPM Calculator
                </span>
                <h4 className="text-base font-bold text-white mt-0.5">
                  Projected Monthly Revenue
                </h4>
              </div>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-800">
                ~$22.00 Ad RPM
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5">
                <span>Monthly Traffic:</span>
                <strong className="text-white text-sm">{monthlyPageviews.toLocaleString()} pageviews</strong>
              </div>
              <input
                type="range"
                min="5000"
                max="150000"
                step="5000"
                value={monthlyPageviews}
                onChange={(e) => setMonthlyPageviews(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-center">
              <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                <span className="text-[10px] text-slate-400 uppercase font-medium">Google AdSense</span>
                <div className="text-base font-extrabold text-blue-400 mt-0.5">${estimatedAdRevenue.toLocaleString()}/mo</div>
              </div>
              <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                <span className="text-[10px] text-slate-400 uppercase font-medium">Affiliate & Leads</span>
                <div className="text-base font-extrabold text-amber-400 mt-0.5">${estimatedAffiliateRevenue.toLocaleString()}/mo</div>
              </div>
              <div className="bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-700 text-emerald-300">
                <span className="text-[10px] uppercase font-bold text-emerald-400">Total Revenue</span>
                <div className="text-base font-black text-emerald-300 mt-0.5">${totalProjected.toLocaleString()}/mo</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors"
          >
            Got It, Close Checklist
          </button>
        </div>
      </div>
    </div>
  );
};
