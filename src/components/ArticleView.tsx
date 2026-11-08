import React, { useState } from 'react';
import { 
  Clock, 
  DollarSign, 
  Wrench, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink, 
  Share2, 
  Printer, 
  ArrowLeft, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp,
  Tag,
  ThumbsUp,
  HelpCircle,
  Sparkles,
  MapPin,
  MessageSquare,
  Send,
  Check,
  Copy,
  X
} from 'lucide-react';
import { ArticleGuide, BlogComment } from '../types';

interface ArticleViewProps {
  guide: ArticleGuide;
  allGuides?: ArticleGuide[];
  onBack: () => void;
  onSelectRelated: (guide: ArticleGuide) => void;
  onOpenLeadModal?: (service: string) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({ 
  guide, 
  allGuides = [],
  onBack, 
  onSelectRelated,
  onOpenLeadModal
}) => {
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [helpfulCount, setHelpfulCount] = useState<number>(142);
  const [hasVoted, setHasVoted] = useState<boolean>(false);

  // Comments state
  const [comments, setComments] = useState<BlogComment[]>([
    {
      id: 'c1',
      authorName: 'Robert K.',
      date: '2 days ago',
      comment: 'Mark, you literally saved my family $220 on a Saturday morning. Our local tech was charging $210 just to pull up in our driveway. Did the 45-degree tilt, dried the pan, and ordered the silicone gasket you linked. It runs like brand new!',
      savedMoney: '$206 Saved',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 'c2',
      authorName: 'Elena Davies',
      date: '4 days ago',
      comment: 'Followed every step carefully. The pro-tip about the Torx screws not being overtightened saved me from cracking the sump ring. Thank you for making genuine guides that don\'t just try to sell a new appliance!',
      savedMoney: '$180 Saved',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
    }
  ]);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentSaved, setNewCommentSaved] = useState('$150');
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  const toggleStep = (stepNumber: number) => {
    setCheckedSteps(prev => ({ ...prev, [stepNumber]: !prev[stepNumber] }));
  };

  const copyToClipboard = (text: string) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      }).catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  };

  const fallbackCopy = (text: string) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch (err) {
      console.error('Copy fallback failed', err);
    }
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareTitle = `${guide.title} | ReportIQ DIY`;

    // Try native share API on mobile devices
    if (typeof navigator !== 'undefined' && navigator.share && /mobile|android|iphone|ipad/i.test(navigator.userAgent)) {
      try {
        await navigator.share({
          title: shareTitle,
          text: guide.quickSummary,
          url: shareUrl
        });
        return;
      } catch {
        // user dismissed or canceled native share, open modal as reliable fallback
      }
    }
    
    // Default: Open the full interactive Share Modal
    setIsShareModalOpen(true);
  };

  const handleVote = () => {
    if (!hasVoted) {
      setHelpfulCount(prev => prev + 1);
      setHasVoted(true);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCommentName && newCommentText) {
      const commentObj: BlogComment = {
        id: `c-${Date.now()}`,
        authorName: newCommentName,
        date: 'Just now',
        comment: newCommentText,
        savedMoney: newCommentSaved ? `${newCommentSaved} Saved` : 'Money Saved',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
      };
      setComments([commentObj, ...comments]);
      setNewCommentName('');
      setNewCommentText('');
      setCommentSubmitted(true);
      setTimeout(() => setCommentSubmitted(false), 3000);
    }
  };

  return (
    <article className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Top Breadcrumbs & Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 pt-2 border-b border-stone-200 pb-3">
        <div className="flex items-center gap-1.5">
          <button onClick={onBack} className="hover:text-stone-900 font-semibold flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Articles</span>
          </button>
          <span>/</span>
          <span className="text-blue-700 font-bold uppercase">{guide.category}</span>
          <span className="hidden sm:inline">/</span>
          <span className="hidden sm:inline text-stone-700 truncate max-w-xs">{guide.title}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1 px-3 py-1 bg-white hover:bg-stone-50 border border-stone-200 rounded-lg text-stone-700 font-medium transition-colors shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Copied Link!' : 'Share'}</span>
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1 px-3 py-1 bg-white hover:bg-stone-50 border border-stone-200 rounded-lg text-stone-700 font-medium transition-colors shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Guide</span>
          </button>
        </div>
      </div>


      {/* Main Editorial Article Body */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs space-y-6">
        {/* Category & Freshness Badges */}
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-stone-900 text-white">
            {guide.category}
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-700">
            {guide.subcategory}
          </span>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            ● {guide.publishDate}
          </span>
        </div>

        {/* Big Editorial Headline */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 font-editorial tracking-tight leading-tight">
          {guide.title}
        </h1>

        {/* Author Byline Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-y border-stone-100 py-4">
          <div className="flex items-center gap-3">
            <img
              src={guide.author.avatar}
              alt={guide.author.name}
              className="w-12 h-12 rounded-2xl object-cover ring-2 ring-stone-200"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-stone-900">{guide.author.name}</span>
                <span title="Verified Master Technician">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </span>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">
                  Fact Checked
                </span>
              </div>
              <p className="text-xs text-stone-500">{guide.author.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-stone-500">
            <span className="flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              {guide.readTime}
            </span>
          </div>
        </div>

        {/* Lead Hero Image */}
        <div className="rounded-2xl overflow-hidden aspect-[16/9] bg-stone-100 shadow-xs border border-stone-100">
          <img
            src={guide.heroImage}
            alt={guide.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Pro vs DIY Cost Summary Card */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-stone-50 rounded-2xl border border-stone-200">
          <div>
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Difficulty</span>
            <div className="text-sm font-bold text-stone-900 mt-0.5">{guide.difficulty}</div>
          </div>
          <div>
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Time Required</span>
            <div className="text-sm font-bold text-stone-900 mt-0.5">{guide.estTime}</div>
          </div>
          <div>
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Estimated DIY Cost</span>
            <div className="text-base font-extrabold text-emerald-700 mt-0.5">{guide.estDiyCost}</div>
          </div>
          <div>
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Plumber Callout</span>
            <div className="text-base font-bold text-stone-700 mt-0.5">{guide.estProCost}</div>
          </div>
        </div>

        {/* AUTHENTIC HUMAN TOUCH FIELD NOTE */}
        <div className="bg-amber-50/70 border-l-4 border-amber-500 p-5 rounded-r-2xl space-y-1">
          <div className="flex items-center gap-2 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <span>🛠️ Field Note from {guide.author.name}</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-950 font-editorial italic leading-relaxed">
            "{guide.personalIntro}"
          </p>
        </div>

        {/* Quick Summary Box */}
        <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Key Takeaways (Quick Solution)</span>
          </h3>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            {guide.quickSummary}
          </p>
        </div>

        {/* Safety Warning */}
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900">
              Safety First Warning
            </h4>
            <p className="text-xs text-rose-800 leading-relaxed">
              {guide.safetyAlert}
            </p>
          </div>
        </div>

        {/* Tools Needed Checklist */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold font-editorial text-stone-900 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-blue-600" />
            <span>Tools Required for This Repair</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {guide.toolsNeeded.map((tool, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-2 text-stone-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{tool}</span>
              </div>
            ))}
          </div>
        </div>

        {/* WIRECUTTER-STYLE HIGH CONVERTING AFFILIATE HARDWARE BOX */}
        <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                <span>Tested Replacement Hardware</span>
              </span>
              <h3 className="text-base sm:text-lg font-bold font-editorial text-white mt-0.5">
                Exact Parts Needed for This Fix
              </h3>
            </div>
            <span className="text-[10px] text-stone-400">Direct OEM Factory Specifications</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {guide.partsNeeded.map((part, pIdx) => (
              <div
                key={pIdx}
                className="bg-stone-800/90 border border-stone-700 rounded-2xl p-4 flex flex-col justify-between hover:border-amber-400 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black uppercase text-blue-300 bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
                      Part #{part.partNumber}
                    </span>
                    {part.badge && (
                      <span className="text-[10px] font-bold bg-amber-400 text-stone-900 px-2 py-0.5 rounded">
                        {part.badge}
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold font-editorial text-white mt-2 leading-snug">
                    {part.name}
                  </h4>
                  <p className="text-xs text-stone-300 mt-1 line-clamp-2 leading-relaxed">
                    {part.description}
                  </p>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-base font-black text-emerald-400">{part.price}</span>
                    {part.originalPrice && (
                      <span className="text-xs text-stone-400 line-through">{part.originalPrice}</span>
                    )}
                    {part.isPrime && (
                      <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800">
                        prime
                      </span>
                    )}
                    <span className="text-xs text-amber-300 ml-auto">★ {part.rating}</span>
                  </div>
                </div>

                <a
                  href={part.affiliateUrl}
                  target="_blank"
                  rel="noreferrer sponsored"
                  className="mt-4 w-full py-2 bg-amber-400 hover:bg-amber-300 text-stone-900 font-extrabold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 uppercase tracking-wider"
                >
                  <span>Check Price on Amazon</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-stone-400 text-center leading-relaxed">
            *Affiliate Disclosure: HomeFix Pro participates in the Amazon Services LLC Associates Program. When you purchase through our links, we earn an affiliate commission at zero additional cost to you.
          </p>
        </div>

        {/* STEP-BY-STEP REPAIR INSTRUCTIONS WITH CHECKLIST */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h2 className="text-xl sm:text-2xl font-bold font-editorial text-stone-900">
              Step-by-Step Instructions
            </h2>
            <span className="text-xs text-stone-500 font-medium">Check off each step as you finish</span>
          </div>

          <div className="space-y-6">
            {guide.steps.map((step, idx) => {
              const isChecked = !!checkedSteps[step.stepNumber];
              return (
                <div key={idx} className="space-y-4">
                  <div
                    className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                      isChecked
                        ? 'bg-emerald-50/40 border-emerald-300'
                        : 'bg-white border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <button
                        onClick={() => toggleStep(step.stepNumber)}
                        className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors shrink-0 mt-0.5 ${
                          isChecked
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-stone-300 bg-stone-50 hover:border-blue-500'
                        }`}
                      >
                        {isChecked && <Check className="w-4 h-4" />}
                      </button>

                      <div className="flex-1 space-y-2.5">
                        <h3 className={`text-base sm:text-lg font-bold font-editorial ${
                          isChecked ? 'line-through text-stone-400' : 'text-stone-900'
                        }`}>
                          Step {step.stepNumber}: {step.title}
                        </h3>

                        <ul className="space-y-2 text-xs sm:text-sm text-stone-700 leading-relaxed">
                          {step.instructions.map((inst, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                              <span>{inst}</span>
                            </li>
                          ))}
                        </ul>

                        {step.proTip && (
                          <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-xs text-blue-950 font-medium">
                            💡 <strong>Pro Technician Tip:</strong> {step.proTip}
                          </div>
                        )}

                        {step.warning && (
                          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 font-medium flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                            <span>{step.warning}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>


                </div>
              );
            })}
          </div>
        </div>

        {/* Common Mistakes to Avoid */}
        <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-3">
          <h3 className="text-sm font-bold font-editorial text-stone-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Common DIY Mistakes to Avoid</span>
          </h3>
          <ul className="space-y-2 text-xs text-stone-600 leading-relaxed">
            {guide.commonMistakes.map((m, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">✕</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTRACTOR QUOTE LEAD GEN CALLOUT */}
        <div className="bg-gradient-to-r from-blue-900 via-stone-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>Instant Automated Pricing & Local Techs</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-editorial text-white">
              Prefer a Vetted Local Specialist to Handle This?
            </h3>
            <p className="text-xs text-stone-300 max-w-md">
              Calculate instant market-rate labor costs in your ZIP code and match with licensed local contractors. Zero wait time.
            </p>
          </div>

          <button
            onClick={() => onOpenLeadModal && onOpenLeadModal(`${guide.category} Repair`)}
            className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-stone-900 font-black text-xs sm:text-sm rounded-xl shadow-md transition-colors shrink-0 uppercase tracking-wider"
          >
            Get Instant Quote →
          </button>
        </div>

        {/* PEOPLE ALSO ASK (PAA) FAQ ACCORDION */}
        <div className="border-t border-stone-200 pt-8 space-y-4">
          <h3 className="text-lg sm:text-xl font-bold font-editorial text-stone-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <span>Frequently Asked Questions (PAA)</span>
          </h3>

          <div className="space-y-2">
            {guide.paaFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="border border-stone-200 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left px-4 py-3 flex items-center justify-between gap-4 hover:bg-stone-50 transition-colors"
                  >
                    <span className="text-xs sm:text-sm font-bold text-stone-900">{faq.question}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100 bg-stone-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* HELPFUL FEEDBACK BAR */}
        <div className="pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-stone-800">Did this tutorial resolve your issue?</span>
            <button
              onClick={handleVote}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                hasVoted ? 'bg-emerald-600 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>{hasVoted ? 'Thank you!' : `Yes, helped me (${helpfulCount})`}</span>
            </button>
          </div>
          <span className="text-xs text-stone-400">Reviewed by Editorial Board</span>
        </div>

        {/* 10. REAL READER COMMENTS & DISCUSSION SECTION */}
        <div className="border-t border-stone-200 pt-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-bold font-editorial text-stone-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <span>Reader Community Discussion ({comments.length})</span>
            </h3>
            <span className="text-xs text-stone-500">Verified Homeowners</span>
          </div>

          {/* Comment submission form */}
          <form onSubmit={handleAddComment} className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800">
              Leave a Comment or Report How Much You Saved
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                value={newCommentName}
                onChange={(e) => setNewCommentName(e.target.value)}
                placeholder="Your Name (e.g. Mike T.)"
                className="px-3 py-2 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={newCommentSaved}
                onChange={(e) => setNewCommentSaved(e.target.value)}
                placeholder="Estimated Money Saved (e.g. $190)"
                className="px-3 py-2 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-emerald-700 font-bold"
              />
            </div>

            <textarea
              rows={3}
              required
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="Did this fix work for your model? Any tips for other homeowners?"
              className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex items-center justify-between">
              <span className="text-[11px] text-stone-400">Comments are moderated for community safety.</span>
              <button
                type="submit"
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Comment</span>
              </button>
            </div>
            {commentSubmitted && (
              <p className="text-xs font-bold text-emerald-700 pt-1">
                ✓ Comment posted successfully! Thank you for helping the DIY community.
              </p>
            )}
          </form>

          {/* List of comments */}
          <div className="space-y-4">
            {comments.map(c => (
              <div key={c.id} className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={c.avatar} alt={c.authorName} className="w-7 h-7 rounded-full object-cover" />
                    <div>
                      <span className="text-xs font-bold text-stone-900">{c.authorName}</span>
                      <span className="text-[10px] text-stone-400 block">{c.date}</span>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {c.savedMoney}
                  </span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed pt-1">
                  {c.comment}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RELATED BENCH-TESTED GUIDES */}
        {allGuides.filter(g => g.id !== guide.id && (guide.relatedGuideIds?.includes(g.id) || g.category === guide.category)).length > 0 && (
          <div className="border-t border-stone-200 pt-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-bold font-editorial text-stone-900 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-blue-600" />
                <span>Related Troubleshooting Guides</span>
              </h3>
              <span className="text-xs text-stone-500">More {guide.category} Fixes</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {allGuides
                .filter(g => g.id !== guide.id && (guide.relatedGuideIds?.includes(g.id) || g.category === guide.category))
                .slice(0, 3)
                .map(rel => (
                  <a
                    key={rel.id}
                    href={`/guide/${rel.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectRelated(rel);
                    }}
                    className="p-4 bg-stone-50 hover:bg-stone-100/80 rounded-2xl border border-stone-200 space-y-2 block no-underline text-inherit group transition-all"
                  >
                    <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 block">
                      {rel.category}
                    </span>
                    <h4 className="text-xs font-bold text-stone-900 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
                      {rel.title}
                    </h4>
                    <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-200">
                      <span>{rel.readTime}</span>
                      <span className="text-emerald-700 font-bold">DIY: {rel.estDiyCost}</span>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* INTERACTIVE SHARE MODAL */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-150 space-y-5">
            <button
              onClick={() => setIsShareModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Guide</span>
              </div>
              <h3 className="text-lg font-black text-stone-900">
                Share This Bench-Tested DIY Guide
              </h3>
              <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                {guide.title}
              </p>
            </div>

            {/* Direct Social Share Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${guide.title} — Fix it yourself and save $200+: ${typeof window !== 'undefined' ? window.location.href : ''}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-colors text-center group"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow-2xs group-hover:scale-105 transition-transform">
                  WA
                </div>
                <span className="text-[11px] font-bold text-emerald-900">WhatsApp</span>
              </a>

              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(guide.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-colors text-center group"
              >
                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-bold shadow-2xs group-hover:scale-105 transition-transform">
                  𝕏
                </div>
                <span className="text-[11px] font-bold text-stone-900">X / Twitter</span>
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-colors text-center group"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-2xs group-hover:scale-105 transition-transform">
                  f
                </div>
                <span className="text-[11px] font-bold text-blue-900">Facebook</span>
              </a>

              <a
                href={`mailto:?subject=${encodeURIComponent(`DIY Fix: ${guide.title}`)}&body=${encodeURIComponent(`${guide.quickSummary}\n\nCheck out the full step-by-step repair guide here:\n${typeof window !== 'undefined' ? window.location.href : ''}`)}`}
                className="p-3 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-colors text-center group"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-2xs group-hover:scale-105 transition-transform">
                  ✉
                </div>
                <span className="text-[11px] font-bold text-indigo-900">Email</span>
              </a>
            </div>

            {/* Direct Copy Link Box */}
            <div className="space-y-1.5 pt-1">
              <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block">
                Direct Article Link:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={typeof window !== 'undefined' ? window.location.href : ''}
                  className="flex-1 px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono text-stone-700 truncate select-all focus:outline-none"
                />
                <button
                  onClick={() => copyToClipboard(typeof window !== 'undefined' ? window.location.href : '')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs shrink-0 ${
                    copiedLink
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-900 hover:bg-stone-800 text-white'
                  }`}
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};
