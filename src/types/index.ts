export type ApplianceCategory = 
  | 'Dishwasher'
  | 'Washing Machine'
  | 'Refrigerator'
  | 'Dryer'
  | 'HVAC & Heating'
  | 'Plumbing'
  | 'Garbage Disposal'
  | 'Water Heater'
  | 'Oven & Range';

export interface AffiliatePart {
  name: string;
  partNumber: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviewsCount: number;
  isPrime: boolean;
  affiliateUrl: string;
  badge?: string;
  category: 'part' | 'tool' | 'safety';
  description: string;
}

export interface ErrorCodeItem {
  id: string;
  brand: string;
  appliance: ApplianceCategory;
  code: string;
  symptom: string;
  meaning: string;
  difficulty: 'Easy (DIY)' | 'Moderate' | 'Advanced' | 'Pro Recommended';
  timeEstimate: string;
  diyCostEstimate: string;
  proCostEstimate: string;
  dangerLevel: 'Low' | 'Medium' | 'High (Cut Power/Gas)';
  safetyWarning: string;
  commonCauses: string[];
  steps: {
    title: string;
    description: string;
    proTip?: string;
  }[];
  parts: AffiliatePart[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface ArticleGuide {
  id: string;
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  category: ApplianceCategory;
  subcategory: string;
  readTime: string;
  publishDate: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    verified: boolean;
  };
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estTime: string;
  estDiyCost: string;
  estProCost: string;
  heroImage: string;
  personalIntro: string;
  quickSummary: string;
  safetyAlert: string;
  toolsNeeded: string[];
  partsNeeded: AffiliatePart[];
  steps: {
    stepNumber: number;
    title: string;
    instructions: string[];
    proTip?: string;
    warning?: string;
  }[];
  commonMistakes: string[];
  paaFaqs: {
    question: string;
    answer: string;
  }[];
  relatedGuideIds: string[];
}

export interface KeywordResearchItem {
  keyword: string;
  searchVolume: string;
  cpc: string;
  rpmPotential: string;
  intent: 'Problem / Fix' | 'Replacement' | 'How-To' | 'Error Code';
  paaQuestions: string[];
  competitorWeakness: string;
  subNiche: string;
}

export interface BlogComment {
  id: string;
  authorName: string;
  date: string;
  comment: string;
  savedMoney: string;
  avatar: string;
}
