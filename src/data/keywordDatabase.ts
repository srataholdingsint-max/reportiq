import { KeywordResearchItem } from '../types';

export const KEYWORD_RESEARCH_DATABASE: KeywordResearchItem[] = [
  {
    keyword: 'Bosch dishwasher E15 error code fix',
    searchVolume: '49,500 / mo',
    cpc: '$14.20',
    rpmPotential: '$24.50',
    intent: 'Error Code',
    subNiche: 'Appliance Troubleshooting',
    competitorWeakness: 'Top result is an old 2018 forum post with no photos; weak blog ranks #2 with thin content.',
    paaQuestions: [
      'Why is my Bosch dishwasher beeping and showing E15?',
      'Can you reset a Bosch dishwasher E15 without taking it apart?',
      'What causes water to pool in Bosch dishwasher bottom tray?',
      'How much does it cost to fix an E15 error on a Bosch dishwasher?'
    ]
  },
  {
    keyword: 'How to replace furnace filter size 20x25x1',
    searchVolume: '22,200 / mo',
    cpc: '$8.80',
    rpmPotential: '$18.00',
    intent: 'Replacement',
    subNiche: 'HVAC Filters & Maintenance',
    competitorWeakness: 'Top ranking page is an e-commerce catalog page with no step-by-step instructions or airflow arrow explanation.',
    paaQuestions: [
      'Which way should the arrow face on a 20x25x1 filter?',
      'What happens if you put a furnace filter in backward?',
      'How often should I change a 20x25x1 furnace filter?',
      'What MERV rating is best for 20x25x1 furnace filters?'
    ]
  },
  {
    keyword: 'Whirlpool washer F2E1 error code',
    searchVolume: '18,100 / mo',
    cpc: '$16.50',
    rpmPotential: '$26.00',
    intent: 'Error Code',
    subNiche: 'Appliance Troubleshooting',
    competitorWeakness: 'Top result is a generic 100-word answers site with broken diagrams and no diagnostic mode instructions.',
    paaQuestions: [
      'How do I clear the F2E1 code on my Whirlpool washer?',
      'How do you put a Whirlpool washer in diagnostic test mode?',
      'Does F2E1 mean I need to replace the entire control board?',
      'Why are my Whirlpool washer buttons unresponsive?'
    ]
  },
  {
    keyword: 'Best way to unclog shower drain without chemicals',
    searchVolume: '33,100 / mo',
    cpc: '$11.40',
    rpmPotential: '$19.20',
    intent: 'Problem / Fix',
    subNiche: 'Plumbing Fixes (DIY level)',
    competitorWeakness: 'Big sites recommend liquid Drano which damages pipes; homeowners search specifically for natural snake / baking soda methods.',
    paaQuestions: [
      'How do plumbers unclog a shower drain without chemicals?',
      'Can baking soda and vinegar clear a completely clogged shower drain?',
      'What tool clears hair from shower drains the fastest?',
      'Is Drano really bad for PVC shower plumbing pipes?'
    ]
  },
  {
    keyword: 'Why is my fridge leaking water under crisper drawers',
    searchVolume: '27,400 / mo',
    cpc: '$12.80',
    rpmPotential: '$21.00',
    intent: 'Problem / Fix',
    subNiche: 'Appliance Troubleshooting',
    competitorWeakness: 'Weak manufacturer PDF manual ranks in top 3; misses simple turkey baster hot water defrost drain clearing trick.',
    paaQuestions: [
      'Why is water pooling under the vegetable drawers in my refrigerator?',
      'How do you unclog a refrigerator defrost drain hole?',
      'Where is the duckbill valve located on a refrigerator?',
      'Will standing water under crisper drawers cause mold?'
    ]
  },
  {
    keyword: 'Garbage disposal humming but not spinning',
    searchVolume: '60,500 / mo',
    cpc: '$9.20',
    rpmPotential: '$17.50',
    intent: 'Problem / Fix',
    subNiche: 'Plumbing Fixes (DIY level)',
    competitorWeakness: 'Articles fail to mention the 1/4" hex key socket trick or confuse users about the red thermal reset button.',
    paaQuestions: [
      'Why does my garbage disposal hum and not turn?',
      'Where is the reset button on an InSinkErator garbage disposal?',
      'What size Allen wrench fits in the bottom of a garbage disposal?',
      'How do you unjam a garbage disposal without taking it apart?'
    ]
  },
  {
    keyword: 'Winterizing outdoor spigots without shut off valve',
    searchVolume: '14,800 / mo',
    cpc: '$15.10',
    rpmPotential: '$23.00',
    intent: 'How-To',
    subNiche: 'Seasonal Home Prep',
    competitorWeakness: 'Top results assume all homes have an interior basement valve; homeowners in slab foundations desperately need insulated cover advice.',
    paaQuestions: [
      'How do you winterize an outside faucet with no indoor shutoff valve?',
      'Do insulated faucet covers really protect from freezing pipes?',
      'At what temperature will an outdoor spigot freeze and burst?',
      'Do frost free hose bibbs need to be shut off in winter?'
    ]
  },
  {
    keyword: 'Water heater pressure relief valve leaking water',
    searchVolume: '21,000 / mo',
    cpc: '$18.90',
    rpmPotential: '$28.50',
    intent: 'Problem / Fix',
    subNiche: 'Plumbing Fixes (DIY level)',
    competitorWeakness: 'Contractor lead gen sites push $1,500 tank replacements instead of showing the simple $20 DIY valve swap or lever flush.',
    paaQuestions: [
      'Is it normal for a water heater relief valve to drip water?',
      'How do you know if a T&P relief valve is bad?',
      'Can you replace a water heater relief valve yourself?',
      'What causes excessive pressure in a residential water heater?'
    ]
  }
];

export const DAILY_ROUTINE_STEPS = [
  {
    hour: 'Hour 1: Creation (60 mins)',
    tasks: [
      {
        title: 'Pick 1 Low-Competition Keyword',
        description: 'Choose a target question from the PAA database where the #1 spot is held by a weak blog or forum thread.',
        time: '10 min'
      },
      {
        title: 'Run AI Studio Step A & Step B Prompts',
        description: 'Generate the structured outline with safety warnings, then generate each section with direct, no-fluff instructions.',
        time: '20 min'
      },
      {
        title: 'Add Human Touch & Real Images',
        description: 'Insert an authentic personal intro ("I tested this last week..."), add tool photos, verify exact part numbers, and add affiliate links.',
        time: '20 min'
      },
      {
        title: 'Publish on Site / WordPress',
        description: 'Format with clean H2s, bulleted tool list, PAA FAQ accordion, and publish.',
        time: '10 min'
      }
    ]
  },
  {
    hour: 'Hour 2: Optimization & Monetization (60 mins)',
    tasks: [
      {
        title: 'Internal Linking Network',
        description: 'Open 3 previously published articles and insert natural contextual links pointing to your new guide (e.g. link Dishwasher E15 to Garbage Disposal Reset).',
        time: '20 min'
      },
      {
        title: 'Content Refresh on Oldest Post',
        description: 'Add 100 words of fresh pro-tips, updated affiliate tool recommendations, or a new PAA question to maintain Google freshness signals.',
        time: '20 min'
      },
      {
        title: 'Google Search Console & Error Code Audit',
        description: 'Review queries bringing impressions in GSC; add new error codes and high-intent appliance models directly to the lookup tool.',
        time: '20 min'
      }
    ]
  }
];
