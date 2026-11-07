import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Lock, 
  DollarSign, 
  Mail, 
  CheckCircle2, 
  Award, 
  Wrench, 
  Users,
  Send
} from 'lucide-react';

interface LegalPagesProps {
  initialTab?: 'about' | 'privacy' | 'affiliate' | 'contact' | 'terms';
}

export const LegalPages: React.FC<LegalPagesProps> = ({ initialTab = 'about' }) => {
  const [activeTab, setActiveTab] = useState<'about' | 'privacy' | 'affiliate' | 'contact' | 'terms'>(initialTab);
  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    subject: 'Appliance Repair Question',
    message: ''
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactFormData({ name: '', email: '', subject: 'Appliance Repair Question', message: '' });
      setContactSubmitted(false);
    }, 4000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: 'about', label: 'About Us & Editorial Team', icon: Users },
          { id: 'privacy', label: 'Privacy Policy (AdSense Compliant)', icon: Lock },
          { id: 'affiliate', label: 'FTC & Affiliate Disclosure', icon: DollarSign },
          { id: 'terms', label: 'Terms & DIY Safety', icon: FileText },
          { id: 'contact', label: 'Contact Us', icon: Mail }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: ABOUT US */}
      {activeTab === 'about' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Our Mission & Editorial Board
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              About ReportIQ
            </h1>
            <p className="text-sm text-slate-500">
              Empowering homeowners to solve complex appliance and household repairs safely without predatory service markups at reportiq.xyz.
            </p>
          </div>

          <div className="prose text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4">
            <p>
              ReportIQ (reportiq.xyz) was founded by licensed master technicians and seasoned DIY enthusiasts with one core principle: 
              <strong> You shouldn't have to pay $250 for a service call when the real fix takes 15 minutes and an $18 replacement seal.</strong>
            </p>
            <p>
              Every troubleshooting guide and diagnostic error code published on our platform undergoes strict technical review. 
              We dismantle real appliances, test multimeter continuity patterns, and verify manufacturer technical service bulletins (TSBs) 
              before writing a single word.
            </p>
          </div>

          {/* Editorial Board Profiles */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Meet Our Senior Editorial Board
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=160&auto=format&fit=crop&q=80"
                  alt="Mark Henderson"
                  className="w-16 h-16 rounded-xl object-cover ring-2 ring-blue-500/20"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-slate-900">Mark Henderson</h4>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                      Master Tech
                    </span>
                  </div>
                  <p className="text-xs text-blue-600 font-medium">Head of Plumbing & Dishwashers</p>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    14+ years servicing Bosch, KitchenAid, and residential drainage systems. Certified EPA 608 Universal.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80"
                  alt="Sarah Jenkins"
                  className="w-16 h-16 rounded-xl object-cover ring-2 ring-blue-500/20"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-slate-900">Sarah Jenkins</h4>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                      HVAC Specialist
                    </span>
                  </div>
                  <p className="text-xs text-blue-600 font-medium">Washer & Refrigerator Diagnostics</p>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Electrical diagnostic expert specializing in inverter direct-drive motors, control board micro-soldering, and sealed refrigeration circuits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRIVACY POLICY */}
      {activeTab === 'privacy' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Legal Compliance
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Privacy & Cookie Policy
            </h1>
            <p className="text-xs text-slate-500">Last updated: Today</p>
          </div>

          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4">
            <h3 className="text-base font-bold text-slate-900">1. Google AdSense & Third-Party Advertising</h3>
            <p>
              ReportIQ (reportiq.xyz) uses Google AdSense to serve advertisements when you visit our website. Google, as a third-party vendor, 
              uses cookies to serve ads based on your prior visits to our website or other websites. Google's use of advertising cookies enables 
              it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.
            </p>
            <p>
              Users may opt out of personalized advertising by visiting Google Ad Settings at{' '}
              <a href="https://adssettings.google.com" target="_blank" rel="noreferrer" className="text-blue-600 underline">
                adssettings.google.com
              </a>.
            </p>

            <h3 className="text-base font-bold text-slate-900">2. Cookies and Web Beacons</h3>
            <p>
              We utilize session cookies and analytics beacons to improve site speed, record user sessions in interactive tools, 
              and store anonymous preferences (such as checklist states). These do not contain personally identifiable information.
            </p>

            <h3 className="text-base font-bold text-slate-900">3. CCPA & GDPR Compliance</h3>
            <p>
              Under California Consumer Privacy Act (CCPA) and European General Data Protection Regulation (GDPR), visitors have the right 
              to request disclosure of data collected, request deletion of information, and opt out of third-party tracking. We do not sell personal data.
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: FTC & AFFILIATE DISCLOSURE */}
      {activeTab === 'affiliate' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Full Transparency
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Affiliate & Advertising Disclosure
            </h1>
            <p className="text-xs text-slate-500">Compliance with FTC 16 CFR Part 255 Guidelines</p>
          </div>

          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4">
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-950 font-medium">
              "ReportIQ (reportiq.xyz) is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com."
            </div>

            <p>
              Throughout our articles, tool diagnostic results, and error code lookups, you will see links to tools, replacement parts, 
              silicone gaskets, filters, and safety gear available on Amazon, The Home Depot, and SupplyHouse. 
            </p>
            <p>
              When you click on these links and complete a purchase, ReportIQ may receive a modest referral commission at 
              <strong> absolutely no additional cost to you</strong>. These commissions allow us to maintain our free error code tool 
              and keep 100% of our diagnostic guides free for all homeowners.
            </p>
            <p>
              <strong>Editorial Independence:</strong> We only recommend parts that match OEM specifications or exceed factory durability. 
              We never accept sponsored product placements from brands that don't pass our workshop quality tests.
            </p>
          </div>
        </div>
      )}

      {/* TAB 4: TERMS & DIY SAFETY */}
      {activeTab === 'terms' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Terms of Service
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              DIY Safety & Terms of Use
            </h1>
          </div>

          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4">
            <h3 className="text-base font-bold text-slate-900">1. DIY Repair Disclaimer</h3>
            <p>
              Household maintenance involves exposure to high electrical voltages (120V / 240V), pressurized natural gas, scalding water, 
              and sharp sheet metal edges. Always cut power at the main service panel, close water and gas shutoff valves, and wear appropriate 
              PPE (safety glasses, cut-resistant gloves).
            </p>
            <p>
              If at any point you feel uncomfortable or lack the necessary equipment to safely complete a repair, stop work immediately 
              and consult a licensed, insured contractor.
            </p>
          </div>
        </div>
      )}

      {/* TAB 5: CONTACT US */}
      {activeTab === 'contact' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Get In Touch
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Contact Our Technical Desk
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Got a tricky appliance error code not yet in our database? Need a correction on a part number? Send our technicians a message.
            </p>
          </div>

          {contactSubmitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h3 className="text-sm font-bold text-emerald-900">Message Received!</h3>
              <p className="text-xs text-emerald-800">
                A member of our certified repair editorial desk will respond within 24 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={contactFormData.name}
                    onChange={(e) => setContactFormData({ ...contactFormData, name: e.target.value })}
                    placeholder="e.g. John Miller"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={contactFormData.email}
                    onChange={(e) => setContactFormData({ ...contactFormData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Subject</label>
                <select
                  value={contactFormData.subject}
                  onChange={(e) => setContactFormData({ ...contactFormData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Appliance Repair Question">Appliance Repair Question</option>
                  <option value="Request New Error Code Guide">Request New Error Code Guide</option>
                  <option value="Technical Correction / Feedback">Technical Correction / Feedback</option>
                  <option value="Advertising & Affiliate Inquiry">Advertising & Affiliate Inquiry</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Your Message & Appliance Model #</label>
                <textarea
                  rows={4}
                  required
                  value={contactFormData.message}
                  onChange={(e) => setContactFormData({ ...contactFormData, message: e.target.value })}
                  placeholder="Include appliance brand, model number, and what error code or symptom you are experiencing..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit to Technical Desk</span>
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
