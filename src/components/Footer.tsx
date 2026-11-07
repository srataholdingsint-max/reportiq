import React from 'react';
import { Wrench, ShieldCheck, Heart, ExternalLink, Mail, Phone } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'lookup' | 'guides' | 'keywords' | 'studio' | 'legal') => void;
  onOpenLegalTab: (tab: 'about' | 'privacy' | 'affiliate' | 'contact' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLegalTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Wrench className="w-4 h-4" />
              </div>
              <span className="text-base font-extrabold text-white tracking-tight">
                ReportIQ<span className="text-blue-500">.xyz</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Tested DIY home maintenance guides, appliance error code diagnostics, and OEM hardware recommendations from ReportIQ.
            </p>
            <div className="pt-2 text-[11px] text-slate-400">
              Verified by certified master appliance repair technicians & plumbers.
            </div>
          </div>

          {/* Sub-Niches */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Core Sub-Niches
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => onNavigate('guides')} 
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Appliance Troubleshooting
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('guides')} 
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  HVAC Filters & Maintenance
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('guides')} 
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Plumbing Fixes (DIY Level)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('guides')} 
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Seasonal Home Prep
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Monetized Features
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => onNavigate('lookup')} 
                  className="hover:text-blue-400 transition-colors text-left font-medium text-white"
                >
                  🛠️ Appliance Error Code Lookup
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('keywords')} 
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  📊 People Also Ask (PAA) Method
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('studio')} 
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  ✨ AI Studio 3-Step Content Machine
                </button>
              </li>
            </ul>
          </div>

          {/* AdSense Compliance & Legal Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              AdSense & Trust Pages
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => onOpenLegalTab('about')} 
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  About Us & Editorial Standards
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenLegalTab('privacy')} 
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Privacy & Cookie Policy (GDPR)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenLegalTab('affiliate')} 
                  className="hover:text-blue-400 transition-colors text-left text-amber-300 font-medium"
                >
                  FTC Affiliate Marketing Disclosure
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenLegalTab('terms')} 
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Terms of Service & DIY Safety
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenLegalTab('contact')} 
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Contact Technical Helpdesk
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimers (Required for AdSense & Amazon Associates) */}
        <div className="pt-8 border-t border-slate-800 text-[11px] text-slate-400 space-y-2 leading-relaxed">
          <p>
            <strong>Amazon Associates Disclaimer:</strong> ReportIQ (reportiq.xyz) is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. Certain content that appears on this site comes from Amazon Services LLC.
          </p>
          <p>
            <strong>DIY Safety Disclaimer:</strong> All guides and diagnostic lookup results are provided for informational and educational purposes only. Working with 120V/240V electricity, natural gas, hot water heaters, and mechanical disposal blades carries inherent risk of serious injury or property damage. If you are uncertain or uncomfortable performing any repair, contact a licensed local contractor.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-slate-400">
            <span>© {new Date().getFullYear()} ReportIQ (reportiq.xyz). All rights reserved.</span>
            <span>Optimized for Google AdSense High RPM & EEAT Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
