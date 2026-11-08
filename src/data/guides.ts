import { ArticleGuide } from '../types';

export const REPAIR_GUIDES: ArticleGuide[] = [
  {
    id: 'guide-bosch-e15',
    slug: 'bosch-dishwasher-e15-error-code-fix',
    title: 'Bosch Dishwasher E15 Error Code: The 15-Minute DIY Fix (No Plumber Needed)',
    seoTitle: 'Bosch Dishwasher E15 Error Code Fix – Step by Step DIY Guide',
    seoDescription: 'Got a blinking tap symbol and E15 error on your Bosch dishwasher? Learn how to reset the safety float switch and install the $18 sump seal fix.',
    category: 'Dishwasher',
    subcategory: 'Appliance Troubleshooting',
    readTime: '6 min read',
    publishDate: 'Updated Yesterday',
    author: {
      name: 'Mark Henderson',
      role: 'Master Appliance Technician (14+ yrs exp)',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&auto=format&fit=crop&q=80',
      verified: true
    },
    difficulty: 'Beginner',
    estTime: '20 minutes',
    estDiyCost: '$18.99',
    estProCost: '$225.00',
    heroImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&auto=format&fit=crop&q=80',
    personalIntro: "I ran into this exact headache last Saturday. We were hosting family dinner when our Bosch 500-Series dishwasher started beeping non-stop with a blinking faucet icon and 'E15' glowing on the display. Worse yet, the drain pump refused to stop humming—even with the power button turned off. A local repair company quoted me $210 just to show up on Monday. Instead, I grabbed two bath towels, tilted the unit back 45 degrees, and had it running clean dishes in under 20 minutes. Here is how to clear the code and prevent it from ever coming back.",
    quickSummary: "The Bosch E15 error means water has entered the bottom shallow emergency drip pan, lifting a lightweight styrofoam float switch (AquaStop). Tilted 45 degrees backward drains the water and clears the code temporarily, while an $18 silicone sump gasket kit seals the leak permanently.",
    safetyAlert: "CRITICAL: Turn off the dedicated 15-amp breaker for your dishwasher in your breaker panel, or pull the plug under your kitchen sink. The drain pump runs continuously during E15 as a flood prevention safeguard, which can burn out the pump motor if left running dry for hours.",
    toolsNeeded: [
      'T15 or T20 Torx screwdriver',
      'Two thick bath towels',
      'Small handheld hair dryer (low heat)',
      'Flashlight or phone light'
    ],
    partsNeeded: [
      {
        name: 'Genuine Bosch Sump Basin Silicone Seal Repair Kit',
        partNumber: '12005744',
        price: '$18.99',
        originalPrice: '$28.50',
        rating: 4.8,
        reviewsCount: 1420,
        isPrime: true,
        affiliateUrl: 'https://www.amazon.com/s?k=Bosch+dishwasher+sump+silicone+seal+kit+12005744&tag=reportiq-20',
        badge: 'Top Fix Part',
        category: 'part',
        description: 'Installs in 10 minutes from inside the stainless tub to permanently stop micro-leaks into the safety tray.'
      },
      {
        name: 'Klein Tools Precision Torx Screwdriver Set',
        partNumber: 'KLN-32527',
        price: '$14.97',
        rating: 4.9,
        reviewsCount: 3890,
        isPrime: true,
        affiliateUrl: 'https://www.amazon.com/s?k=Klein+Tools+precision+torx+screwdriver+set&tag=reportiq-20',
        badge: 'Essential Tool',
        category: 'tool',
        description: 'Required to remove the lower toe kick screws without stripping the soft metal heads.'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Cut Electricity to the Appliance',
        instructions: [
          'Switch off the circuit breaker labeled Dishwasher at your main home electrical box.',
          'Verify the display panel is completely dark before touching any panels.'
        ],
        warning: 'Do not attempt to tilt or disassemble while connected to 120V household current.'
      },
      {
        stepNumber: 2,
        title: 'The Quick 45-Degree Tilt Reset Method',
        instructions: [
          'Open the door and remove the two mounting screws securing the dishwasher to the underside of the countertop.',
          'Slide the dishwasher outward from the cabinet cavity by about 6 to 8 inches.',
          'Place two folded bath towels directly on the floor behind and under the kickplate.',
          'Grip the upper door frame and tilt the entire dishwasher backward at approximately 45 degrees. Hold it in this tilted position for 60 seconds.',
          'Watch for water running out onto the towels. Once the pan empties, the buoyant styrofoam float disk drops back down onto its microswitch.'
        ],
        proTip: 'If your drain hose has little slack, have a partner hold the hose so it doesn\'t kink during the tilt.'
      },
      {
        stepNumber: 3,
        title: 'Dry the Base Pan and Inspect Float Switch',
        instructions: [
          'Remove the two Torx T20 screws on the front lower kickplate.',
          'Peer into the shallow white plastic base tray with a flashlight.',
          'Use a low-heat hairdryer for 3 to 4 minutes to evaporate any lingering moisture around the white styrofoam round float.'
        ]
      },
      {
        stepNumber: 4,
        title: 'Install Permanent Sump Gasket Kit ($18)',
        instructions: [
          'Open the main door and remove the lower dish rack and circular filter mesh.',
          'Remove the four Torx screws holding the transparent plastic sump ring.',
          'Fit the circular white silicone gasket into the groove between the stainless steel tub and the black plastic sump.',
          'Tighten screws evenly in a crisscross pattern until snug. This stops water from ever dripping past the factory seal again.'
        ],
        proTip: 'Do not overtighten the plastic sump screws, or you risk cracking the injection-molded sump rim.'
      }
    ],
    commonMistakes: [
      'Using liquid Dawn dish soap inside the dishwasher: Over-foaming creates billions of suds bubbles that spill over the tub lip right into the base tray.',
      'Assuming the pump is broken: The loud continuous humming is intentional safety draining by design, not a damaged pump.',
      'Only doing the tilt without replacing the sump gasket: In 80% of Bosch dishwashers older than 3 years, the factory gasket shrink-gap causes E15 to return within 3 weeks.'
    ],
    paaFaqs: [
      {
        question: 'Why won\'t my Bosch dishwasher turn off during E15?',
        answer: 'The AquaStop flood safety switch activates the drain pump motor on a continuous hardwired loop. Even when you press the power button, the pump stays engaged to prevent household flood damage until power is disconnected or the base pan is emptied.'
      },
      {
        question: 'Can I clear E15 by holding the reset button for 3 seconds?',
        answer: 'No. The 3-second reset button only resets user software cycles. It cannot override a mechanical float switch that is physically lifted by standing water.'
      },
      {
        question: 'How much does a plumber charge to fix Bosch E15?',
        answer: 'Most appliance repair technicians charge between $180 and $280 for service callout and labor. Following this DIY guide costs under $20 for the gasket kit, saving you over $200.'
      }
    ],
    relatedGuideIds: ['guide-whirlpool-f2e1', 'guide-disposal-humming', 'guide-fridge-leaking']
  },
  {
    id: 'guide-whirlpool-f2e1',
    slug: 'whirlpool-washer-f2e1-error-code-fix',
    title: 'Whirlpool Washer F2E1 Error Code: Step-by-Step UI & Harness Fix',
    seoTitle: 'How to Fix Whirlpool Washer F2E1 Error Code (Easy Step-by-Step)',
    seoDescription: 'Buttons not working and F2E1 code flashing on your Whirlpool washer? Follow this tested DIY troubleshooting guide to fix the control board connection.',
    category: 'Washing Machine',
    subcategory: 'Appliance Troubleshooting',
    readTime: '7 min read',
    publishDate: '3 days ago',
    author: {
      name: 'Sarah Jenkins',
      role: 'Certified HVAC & Appliance Specialist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
      verified: true
    },
    difficulty: 'Intermediate',
    estTime: '30 minutes',
    estDiyCost: '$12.99',
    estProCost: '$260.00',
    heroImage: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=1200&auto=format&fit=crop&q=80',
    personalIntro: "Few things derail a family weekend like a mountain of dirty sports uniforms and a washing machine that beeps mockingly with 'F2E1' across the console. Last month my own Whirlpool Cabrio washer threw this exact code right before Sunday laundry. Before you drop $300 on a technician or consider buying a new washer, understand that over 65% of F2E1 codes are merely a loose or mildly oxidized 12-pin ribbon connector shaken free by high-velocity spin cycles.",
    quickSummary: "Whirlpool code F2E1 indicates a User Interface (UI) communication breakdown with the Main Appliance Control Unit (ACU). A 5-minute capacitor discharge reset, followed by cleaning and reseating the ribbon cable harness with contact cleaner, fixes the majority of occurrences.",
    safetyAlert: "DANGER: Always disconnect the 3-prong power cord. Washing machines house large electrolytic capacitors inside the control board that can hold painful electrical charges even with the power button switched off.",
    toolsNeeded: [
      '1/4" Nut driver or socket',
      'Flathead screwdriver or plastic putty knife',
      'Electronic contact cleaner spray',
      'Multimeter (optional for continuity)'
    ],
    partsNeeded: [
      {
        name: 'BW-100 Electronic Contact Cleaner Non-Conductive Aerosol',
        partNumber: 'BW-100',
        price: '$12.99',
        rating: 4.8,
        reviewsCount: 5210,
        isPrime: true,
        affiliateUrl: 'https://www.amazon.com/s?k=BW-100+Electronic+Contact+Cleaner&tag=reportiq-20',
        badge: 'Recommended Fix',
        category: 'tool',
        description: 'Dissolves micro-corrosion and moisture residue from gold/copper ribbon contact pins.'
      },
      {
        name: 'Genuine Whirlpool Washer Electronic Control Board (ACU)',
        partNumber: 'W11170317',
        price: '$148.50',
        originalPrice: '$210.00',
        rating: 4.6,
        reviewsCount: 340,
        isPrime: true,
        affiliateUrl: 'https://www.amazon.com/s?k=Whirlpool+Washer+Electronic+Control+Board+W11170317&tag=reportiq-20',
        badge: 'OEM Replacement',
        category: 'part',
        description: 'Only purchase if ribbon reseating fails and diagnostic mode shows board memory error.'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Hard System Drain & Power Cycle',
        instructions: [
          'Unplug the washer power cord from the wall outlet.',
          'Wait a full 5 minutes. While unplugged, press and hold down the START button for 10 seconds to fully discharge internal capacitors.',
          'Plug the machine back in. If the lights come on normally, run a Quick Wash test.'
        ],
        proTip: 'A power surge or brownout frequently causes the UI microprocessor to hang.'
      },
      {
        stepNumber: 2,
        title: 'Access the Control Console Ribbon Cable',
        instructions: [
          'Unplug the machine again for safety.',
          'Locate the two 1/4-inch hex screws on the top rear of the console panel.',
          'Tilt the console forward or slide it toward you to disengage the plastic locking clips.',
          'Locate the flat, multi-colored ribbon cable connecting the front button keypad to the main control board box.'
        ]
      },
      {
        stepNumber: 3,
        title: 'Inspect, Clean, and Reseat the Terminal Clip',
        instructions: [
          'Carefully depress the plastic retention locking tab and pull the ribbon connector straight out of the socket.',
          'Check for signs of green corrosion or white mineral chalk caused by humid laundry room air.',
          'Spray 2 quick bursts of electronic contact cleaner into both male and female connectors.',
          'Let dry for 60 seconds, then firmly push the connector back into place until you hear an audible click.'
        ]
      },
      {
        stepNumber: 4,
        title: 'Run Diagnostic Test Mode',
        instructions: [
          'Reassemble the console and re-insert the screws.',
          'Plug the washer in. Within 6 seconds, turn the cycle dial: Left 1 click, Right 3 clicks, Left 1 click, Right 1 click.',
          'All LED indicator lights should illuminate in sequence. Turn knob to cycle 01 and press Start to clear fault history.'
        ]
      }
    ],
    commonMistakes: [
      'Immediately ordering a $200 control board before checking the ribbon cable seating.',
      'Yanking the ribbon cable without releasing the tiny plastic clip lock, tearing the delicate micro-traces.',
      'Using WD-40 instead of dedicated fast-drying electronic contact cleaner (WD-40 leaves conductive oily residue).'
    ],
    paaFaqs: [
      {
        question: 'What does error code F2E1 mean on a Whirlpool washer?',
        answer: 'F2 stands for User Interface fault, and E1 stands for communication mismatch. It signifies the front button control panel is unable to send signals to the main computer board.'
      },
      {
        question: 'How do you reset a Whirlpool washer control board?',
        answer: 'Unplug the power cord for 5 minutes, press the start button for 10 seconds while disconnected, plug back in, and execute the diagnostic knob rotation pattern.'
      }
    ],
    relatedGuideIds: ['guide-bosch-e15', 'guide-disposal-humming']
  },
  {
    id: 'guide-furnace-filter-hvac',
    slug: 'how-to-replace-furnace-filter-20x25x1',
    title: 'How to Replace a Furnace Filter (20x25x1 vs 16x25x1) & MERV Rating Guide',
    seoTitle: 'How to Replace Furnace Filter Size 20x25x1 & MERV Guide',
    seoDescription: 'Step-by-step DIY guide to changing your furnace and AC filter (size 20x25x1). Learn correct airflow arrow direction, MERV ratings, and replacement schedule.',
    category: 'HVAC & Heating',
    subcategory: 'HVAC Filters & Maintenance',
    readTime: '5 min read',
    publishDate: '5 days ago',
    author: {
      name: 'David Reynolds',
      role: 'HVAC Contractor & Building Engineer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      verified: true
    },
    difficulty: 'Beginner',
    estTime: '10 minutes',
    estDiyCost: '$14.99',
    estProCost: '$135.00',
    heroImage: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1200&auto=format&fit=crop&q=80',
    personalIntro: "Every November, emergency HVAC calls skyrocket with homeowners complaining their furnace starts blowing lukewarm air or shuts down completely after running for 4 minutes. In nearly half of those expensive $150 emergency service calls, the culprit isn't a cracked heat exchanger or a blown blower motor—it's a choked $15 filter covered in pet fur and drywall dust. Taking 5 minutes every few months to swap this filter protects your $6,000 furnace from catastrophic failure and cuts your electric bills.",
    quickSummary: "Furnace filters remove dust, pollen, and pet dander from recirculated air while shielding the blower fan and heat exchanger. For 1-inch thick filters (such as 20x25x1), stick to MERV 8 to 11 to avoid choking your blower motor. Ensure the printed airflow arrow points toward the blower cabinet.",
    safetyAlert: "Always flip the HVAC emergency power switch (mounted on or near your furnace wall) off before opening the filter door to keep the high-speed centrifugal blower fan from turning on while your hands are inside.",
    toolsNeeded: [
      'Flashlight',
      'Marker or pencil (to write the installation date on the cardboard frame)'
    ],
    partsNeeded: [
      {
        name: 'Filtrete 20x25x1 Allergen Defense MERV 11 HVAC Filters (4-Pack)',
        partNumber: 'FILT-20251',
        price: '$44.97',
        originalPrice: '$54.00',
        rating: 4.8,
        reviewsCount: 8400,
        isPrime: true,
        affiliateUrl: 'https://www.amazon.com/s?k=Filtrete+20x25x1+MERV+11+HVAC+Filters+4-Pack&tag=reportiq-20',
        badge: 'Best Value 4-Pack',
        category: 'part',
        description: 'Captures microscopic particles like smoke, cough droplets, dust mite debris, and pet dander.'
      },
      {
        name: 'Filtrete 16x25x1 MPR 1000 Clean Living Filters (4-Pack)',
        partNumber: 'FILT-16251',
        price: '$39.99',
        rating: 4.8,
        reviewsCount: 6500,
        isPrime: true,
        affiliateUrl: 'https://www.amazon.com/s?k=Filtrete+16x25x1+MPR+1000+Filters+4-Pack&tag=reportiq-20',
        badge: 'Popular Size',
        category: 'part',
        description: 'High-flow electrostatic filter engineered for older and standard airflow furnace systems.'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Verify Your Filter Dimensions Exactly',
        instructions: [
          'Look at the cardboard perimeter frame of your existing filter for the nominal size printed in bold numbers (e.g., 20 x 25 x 1 or 16 x 25 x 1).',
          'Measure the metal filter slot with a tape measure if the old filter has no markings.'
        ],
        proTip: 'Never squeeze an oversized filter or leave gaps with an undersized filter; unfilitered air bypasses the filter and coats your evaporator coil.'
      },
      {
        stepNumber: 2,
        title: 'Shut Off Furnace Power',
        instructions: [
          'Locate the toggle switch on the side of the furnace or on the nearby basement joist.',
          'Flip it to the OFF position. The burner and blower should immediately go silent.'
        ]
      },
      {
        stepNumber: 3,
        title: 'Check the Airflow Direction Arrow',
        instructions: [
          'Locate the printed arrow on your fresh filter labeled Air Flow with directional arrows.',
          'The arrow must point IN THE DIRECTION OF AIR MOVEMENT: from the large cold air return duct TOWARD the furnace blower and burners.',
          'Slide the new filter into the metal retention tracks smoothly.'
        ],
        warning: 'Installing a filter backward causes the pleats to collapse under air pressure, damaging your blower motor.'
      },
      {
        stepNumber: 4,
        title: 'Date the Filter and Power On',
        instructions: [
          'Write today\'s date on the visible cardboard edge with a marker.',
          'Re-attach the metal slot cover or slide latch.',
          'Flip the furnace power switch back ON.'
        ]
      }
    ],
    commonMistakes: [
      'Buying MERV 13 to 16 hospital-grade filters for a standard 1-inch residential slot: Dense high-MERV filters cause extreme static pressure drops that overheat the furnace limit switch.',
      'Forgetting to replace filters every 60–90 days, or every 30 days in homes with 2+ shedding dogs or cats.',
      'Operating the system without the metal access slot cover, pulling basement radon or furnace combustion gases directly into the home air supply.'
    ],
    paaFaqs: [
      {
        question: 'Which way does the arrow point on a 20x25x1 furnace filter?',
        answer: 'The arrow ALWAYS points toward the furnace unit and blower motor, in the direction the air travels through the ductwork.'
      },
      {
        question: 'What is the best MERV rating for a home furnace?',
        answer: 'MERV 8 to MERV 11 provides the sweet spot for residential HVAC systems. It captures over 85% of household allergens without choking the airflow.'
      }
    ],
    relatedGuideIds: ['guide-bosch-e15', 'guide-water-heater-valve']
  },
  {
    id: 'guide-unclog-shower-drain',
    slug: 'unclog-shower-drain-without-chemicals',
    title: 'Best Way to Unclog Shower Drain Without Chemicals (Snake & Natural Method)',
    seoTitle: 'How to Unclog Shower Drain Without Chemicals (DIY Natural Guide)',
    seoDescription: 'Standing in ankle-deep water? Clear stubborn hair and soap scum clogs without damaging your pipes with caustic chemicals. Tested DIY methods.',
    category: 'Plumbing',
    subcategory: 'Plumbing Fixes (DIY level)',
    readTime: '6 min read',
    publishDate: '1 week ago',
    author: {
      name: 'Mark Henderson',
      role: 'Master Appliance Technician (14+ yrs exp)',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&auto=format&fit=crop&q=80',
      verified: true
    },
    difficulty: 'Beginner',
    estTime: '15 minutes',
    estDiyCost: '$8.50',
    estProCost: '$175.00',
    heroImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&auto=format&fit=crop&q=80',
    personalIntro: "When you are standing in soapy, lukewarm dirty water up to your ankles during your morning shower, the natural urge is to run to the grocery store and dump a gallon of Drano down the hole. Please don't! As someone who has replaced corroded brass P-traps and melted PVC glue joints, chemical drain cleaners generate intense heat that corrodes plumbing and hardens hair into concrete-like sludge. Here is the exact mechanical and natural solution I use in my own house that clears 99% of shower clogs in 10 minutes.",
    quickSummary: "Shower clogs are 90% composed of tangled hair and solidified bar soap tallow trapped within the first 12 inches of the drain crosshairs. A barbed plastic drain snake physically pulls the clog out in seconds, followed by a boiling water and baking soda flush to dissolve remaining body oils.",
    safetyAlert: "Wear rubber cleaning gloves and eye protection. Never mix vinegar and baking soda in a sealed pipe or plunger chamber.",
    toolsNeeded: [
      'Barbed plastic hair drain snake (24-inch)',
      'Flathead screwdriver (to pop off drain grate)',
      'Rubber cleaning gloves',
      'Small plastic trash bag for disposal'
    ],
    partsNeeded: [
      {
        name: 'FlexiSnake Drain Weasel Hair Clog Tool Starter Kit',
        partNumber: 'DWPSK2',
        price: '$11.98',
        originalPrice: '$17.00',
        rating: 4.7,
        reviewsCount: 14200,
        isPrime: true,
        affiliateUrl: 'https://www.amazon.com/s?k=FlexiSnake+Drain+Weasel+Hair+Clog+Tool&tag=reportiq-20',
        badge: '#1 Best Seller in Drain Augers',
        category: 'tool',
        description: 'Micro-hook patented wand grabs hair instantly on contact without needing to remove the drain stopper.'
      },
      {
        name: 'OXO Good Grips Silicone Shower Stall Drain Protector',
        partNumber: 'OXO-1313',
        price: '$9.99',
        rating: 4.8,
        reviewsCount: 28500,
        isPrime: true,
        affiliateUrl: 'https://www.amazon.com/s?k=OXO+Good+Grips+Silicone+Shower+Drain+Protector&tag=reportiq-20',
        badge: 'Clog Prevention Pick',
        category: 'part',
        description: 'Catches hair before it ever enters the pipes, preventing future blockages completely.'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Remove the Drain Cover or Stopper',
        instructions: [
          'If you have a flat stainless grate, use a flathead screwdriver to pry up the outer rim gently.',
          'If you have a screw-in plate, back out the single center stainless screw.',
          'For pop-up stoppers, unscrew counter-clockwise by hand.'
        ]
      },
      {
        stepNumber: 2,
        title: 'Deploy the Barbed Hair Snake',
        instructions: [
          'Insert the barbed plastic snake tool into the drain opening past the metal crossbar.',
          'Push it down until you feel resistance (typically 8 to 16 inches down at the P-trap curve).',
          'Twist the snake tool 360 degrees three or four times to entangle the hair matrix around the reverse barbs.',
          'Slowly pull the snake upward. Deposit the dislodged hair ball into a plastic grocery bag.'
        ],
        proTip: 'Repeat 2 to 3 times from different angles until the snake comes back clean.'
      },
      {
        stepNumber: 3,
        title: 'Baking Soda & Boiling Water Flush',
        instructions: [
          'Pour 1/2 cup of baking soda directly down the empty drain pipe opening.',
          'Follow with 1 cup of distilled white vinegar. Let the natural effervescent foaming action dissolve greasy soap scum for 15 minutes.',
          'Pour a full kettle of boiling water slowly down the center to flush remaining fats.'
        ]
      }
    ],
    commonMistakes: [
      'Pouring sulfuric acid or bleach: Acid attacks cast iron and generates toxic fumes if mixed with other bathroom cleaners.',
      'Pushing rigid coat hangers down too aggressively, puncturing flexible shower pan liners or dislodging pipe joints.'
    ],
    paaFaqs: [
      {
        question: 'Does baking soda and vinegar really dissolve hair?',
        answer: 'No chemical or natural concoction truly dissolves human hair without destroying your plumbing pipes. The hair must be physically removed with a snake; the baking soda simply removes the sticky soap scum binding the hair together.'
      },
      {
        question: 'How do you unclog a shower drain with standing water?',
        answer: 'Bail out the standing water with a cup first so your snake or natural flush is not diluted, then insert the barbed snake directly through the drain grate.'
      }
    ],
    relatedGuideIds: ['guide-disposal-humming', 'guide-fridge-leaking']
  },
  {
    id: 'guide-fridge-leaking',
    slug: 'why-is-my-refrigerator-leaking-water',
    title: 'Why Is My Refrigerator Leaking Water Under Crisper Drawers? (Defrost Drain Fix)',
    seoTitle: 'Why Is Fridge Leaking Water Under Crisper Drawers? Easy DIY Fix',
    seoDescription: 'Find a puddle of water beneath your produce drawers or a sheet of ice on the freezer floor? Here is how to unfreeze and clean the defrost drain in 30 mins.',
    category: 'Refrigerator',
    subcategory: 'Appliance Troubleshooting',
    readTime: '6 min read',
    publishDate: '1 week ago',
    author: {
      name: 'Sarah Jenkins',
      role: 'Certified HVAC & Appliance Specialist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
      verified: true
    },
    difficulty: 'Intermediate',
    estTime: '35 minutes',
    estDiyCost: '$12.95',
    estProCost: '$210.00',
    heroImage: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=1200&auto=format&fit=crop&q=80',
    personalIntro: "Every time you go to grab a bell pepper, you notice your celery is floating in a stagnant pond of water under the crisper bins. You wipe it dry with a towel, only for the mysterious lake to return two days later. Don't panic: your refrigerator compressor is not failing, and your refrigerant isn't leaking. This is a classic symptom of a choked or frozen defrost drain line, and you can permanently cure it this afternoon with basic tools.",
    quickSummary: "During normal automatic defrost cycles, heating elements melt frost off cooling coils. If the small center drain hole or rubber duckbill valve becomes plugged with dust or ice, the meltwater overflows into the bottom of the fresh food compartment.",
    safetyAlert: "Unplug the refrigerator before removing interior plastic rear covers to avoid electrical contact with the defrost heater element.",
    toolsNeeded: [
      '1/4" Nut driver or Phillips screwdriver',
      'Turkey baster or syringe bulb',
      'Hot tap water',
      'Towel and flashlight'
    ],
    partsNeeded: [
      {
        name: 'Upgraded Defrost Drain Tube & Duckbill Grommet Kit',
        partNumber: 'W10619951',
        price: '$12.95',
        originalPrice: '$22.00',
        rating: 4.8,
        reviewsCount: 3100,
        isPrime: true,
        affiliateUrl: 'https://www.amazon.com/s?k=Upgraded+Defrost+Drain+Tube+W10619951&tag=reportiq-20',
        badge: 'Cures Problem Permanently',
        category: 'part',
        description: 'Direct replacement drain tube with wider opening that will never stick shut with mineral buildup.'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Empty the Freezer Bottom & Access Evaporator Panel',
        instructions: [
          'Unplug refrigerator power cord.',
          'Slide out the lower freezer basket and remove frozen food.',
          'Remove the 2 to 4 screws securing the lower back plastic panel.'
        ]
      },
      {
        stepNumber: 2,
        title: 'Melt the Ice Dam with Hot Water',
        instructions: [
          'Beneath the aluminum coil fins, you will spot a small metal V-trough packed with solid ice.',
          'Fill a turkey baster with very hot tap water and squirt directly onto the ice dam.',
          'Soak up water with a sponge as it melts until the drain hole is exposed and water suddenly whooshes down into the bottom drain pan.'
        ]
      },
      {
        stepNumber: 3,
        title: 'Snip or Replace the Defective Duckbill Valve',
        instructions: [
          'Pull the refrigerator away from the wall.',
          'Remove the bottom rear cardboard or metal compressor cover.',
          'Locate the small rubber drain tube hanging over the plastic condensation pan.',
          'The factory duckbill valve often glues itself shut with sticky mineral residue. Wash it clean or replace it with an upgraded open-mouth tube.'
        ]
      }
    ],
    commonMistakes: [
      'Chipping at the ice with an ice pick or screwdriver: You risk puncturing the aluminum refrigerant lines, ruining the refrigerator instantly.',
      'Only wiping the crisper drawer without clearing the drain: The water will return within 48 hours.'
    ],
    paaFaqs: [
      {
        question: 'Why does a freezer defrost drain freeze over?',
        answer: 'Dust and food crumbs slowly coat the tiny rubber drain tube valve. When water cannot drain fast enough during a 20-minute defrost cycle, it refreezes when the cooling cycle restarts, creating an escalating ice dam.'
      }
    ],
    relatedGuideIds: ['guide-bosch-e15', 'guide-disposal-humming']
  },
  {
    id: 'guide-disposal-humming',
    slug: 'garbage-disposal-humming-reset-fix',
    title: 'Garbage Disposal Humming But Not Spinning: The 2-Minute Jam Reset Fix',
    seoTitle: 'Garbage Disposal Humming But Won\'t Spin? 2-Minute DIY Fix',
    seoDescription: 'Hear a loud hum when turning on your garbage disposal? Do NOT buy a new one! Use the underside hex wrench trick and reset button to unjam it in 2 minutes.',
    category: 'Garbage Disposal',
    subcategory: 'Plumbing Fixes (DIY level)',
    readTime: '4 min read',
    publishDate: '2 weeks ago',
    author: {
      name: 'David Reynolds',
      role: 'HVAC Contractor & Building Engineer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      verified: true
    },
    difficulty: 'Beginner',
    estTime: '5 minutes',
    estDiyCost: '$7.49',
    estProCost: '$160.00',
    heroImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&auto=format&fit=crop&q=80',
    personalIntro: "You flip the wall switch, and instead of the familiar grinding roar, your garbage disposal emits a dull 'HUMMMMMMM' and stops dead. Plumbers love this call because they can charge $150 to $200 for a repair that takes literally 45 seconds using a simple $7 hex wrench you can keep tucked beneath your kitchen sink. Keep your money in your pocket—here is how to clear the jam right now.",
    quickSummary: "When a hard object (like an avocado pit, bone, or coin) gets wedged between the rotating impeller and stationary shredder ring, the motor cannot spin and hums until the thermal overload switch trips. Manually rotating the motor shaft from the bottom using a 1/4-inch hex key frees the jam instantly.",
    safetyAlert: "CRITICAL: Turn off the wall switch and UNPLUG the unit from under the sink. NEVER place fingers or hands inside the disposal hopper chamber.",
    toolsNeeded: [
      '1/4" Hex Allen wrench (or disposal jam wrench)',
      'Flashlight',
      'Kitchen tongs or needle-nose pliers'
    ],
    partsNeeded: [
      {
        name: 'Universal Garbage Disposal Jam Unjamming Hex Key Wrench',
        partNumber: 'WRN-DISP-01',
        price: '$7.49',
        rating: 4.8,
        reviewsCount: 4900,
        isPrime: true,
        affiliateUrl: 'https://www.amazon.com/s?k=garbage+disposal+wrench+key&tag=reportiq-20',
        badge: 'Essential Under-Sink Tool',
        category: 'tool',
        description: 'Double-ended leverage wrench engineered to fit InSinkErator, Badger, Moen, and Waste King disposals.'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Turn Off Wall Switch & Unplug',
        instructions: [
          'Flip the wall switch to OFF.',
          'Unplug the power cord located inside the cabinet beneath the sink.'
        ]
      },
      {
        stepNumber: 2,
        title: 'Insert Hex Wrench in Bottom Center',
        instructions: [
          'Duck beneath the sink and look directly up at the bottom underside of the disposal.',
          'Locate the small hex socket hole in the exact center of the motor base plate.',
          'Insert your 1/4-inch hex wrench firmly into the socket.'
        ]
      },
      {
        stepNumber: 3,
        title: 'Work the Wrench Back and Forth with Leverage',
        instructions: [
          'Rotate the wrench back and forth vigorously. You will feel heavy resistance, then a distinct POP as the jammed object dislodges.',
          'Continue rotating until the wrench spins freely 360 degrees in both directions.'
        ]
      },
      {
        stepNumber: 4,
        title: 'Retrieve Debris & Press Red Reset Button',
        instructions: [
          'Use kitchen tongs to look down through the rubber sink splash guard and extract the dislodged bone, coin, or seed.',
          'Locate the small red button on the bottom side of the disposal housing. If popped out, push it in firmly until it clicks.',
          'Plug back in, run cold water, and flip the switch.'
        ]
      }
    ],
    commonMistakes: [
      'Leaving the wall switch on while the unit hums: This overheats and potentially burns out the motor windings.',
      'Putting drain cleaner into a jammed disposal: Splashing caustic chemicals when clearing the jam will cause severe skin burns.'
    ],
    paaFaqs: [
      {
        question: 'Why did my disposal stop humming completely?',
        answer: 'The red thermal overload breaker on the bottom popped out to protect the motor from burning out. Once unjammed, push the red button in to restore power.'
      }
    ],
    relatedGuideIds: ['guide-unclog-shower-drain', 'guide-bosch-e15']
  },
  {
    id: 'guide-winterize-spigots',
    slug: 'winterizing-outdoor-spigots-pipes',
    title: 'Winterizing Outdoor Spigots & Pipes: Protect Your Home From Frozen Burst Pipes',
    seoTitle: 'How to Winterize Outdoor Spigots to Prevent Burst Pipes (DIY)',
    seoDescription: 'Avoid a catastrophic $5,000 basement flood this winter. Follow this 10-minute checklist to drain, shut off, and insulate outdoor hose bibbs.',
    category: 'Plumbing',
    subcategory: 'Seasonal Home Prep',
    readTime: '5 min read',
    publishDate: '2 weeks ago',
    author: {
      name: 'Mark Henderson',
      role: 'Master Appliance Technician (14+ yrs exp)',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&auto=format&fit=crop&q=80',
      verified: true
    },
    difficulty: 'Beginner',
    estTime: '15 minutes',
    estDiyCost: '$16.50',
    estProCost: '$150.00',
    heroImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&auto=format&fit=crop&q=80',
    personalIntro: "Few household insurance claims are as messy and devastating as a burst outdoor hose bibb. In cold climates, a single night below 20°F can freeze water trapped inside an exterior spigot, rupturing the copper pipe behind your wall. When spring arrives and you turn the valve back on, hundreds of gallons of pressurized water dump into your drywall and insulation. Here is the foolproof 3-step winterizing routine to prevent this.",
    quickSummary: "Disconnect all garden hoses, shut off the interior isolation valve, open the outdoor spigot to drain residual line water, and install an insulated thermal faucet sock over the exterior bibb.",
    safetyAlert: "Never leave garden hoses connected to outdoor spigots during freezing temps—even 'frost-free' spigots will burst if a hose traps water inside the stem.",
    toolsNeeded: [
      'Pliers or small adjustable wrench',
      'Small bucket to catch drain water'
    ],
    partsNeeded: [
      {
        name: 'Frost King Heavy-Duty Insulated Outdoor Faucet Cover (2-Pack)',
        partNumber: 'FC2-HD',
        price: '$12.98',
        rating: 4.8,
        reviewsCount: 11200,
        isPrime: true,
        affiliateUrl: 'https://www.amazon.com/s?k=outdoor+faucet+cover+insulated&tag=reportiq-20',
        badge: 'Amazon\'s Choice',
        category: 'part',
        description: 'Thick thermal styrofoam and rubber gasket seals freeze winds away from wall penetrations.'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Disconnect and Store All Garden Hoses',
        instructions: [
          'Unscrew all hoses, splitters, and timers from outdoor spigots.',
          'Drain remaining water from hoses and store them inside your garage or shed.'
        ]
      },
      {
        stepNumber: 2,
        title: 'Shut Off Interior Isolation Valve & Drain Bleeder',
        instructions: [
          'Go inside your basement or crawlspace directly opposite the outdoor spigot location.',
          'Locate the brass shutoff valve on the supply line and turn it fully clockwise to close.',
          'Place a small cup under the small brass bleeder cap on the side of the valve, unscrew the bleeder, and let vacuum water drain out.'
        ]
      },
      {
        stepNumber: 3,
        title: 'Open Exterior Spigot & Install Insulating Cover',
        instructions: [
          'Walk outside and open the spigot handle completely to let any residual water drip out.',
          'Leave the handle open slightly over winter so expanding pressure has an escape route.',
          'Secure the insulated foam faucet cover tightly against the brick or siding.'
        ]
      }
    ],
    commonMistakes: [
      'Leaving a hose attached to a frost-free sillcock: The back-siphon vacuum prevents the long brass stem from self-draining, cracking the pipe 10 inches inside the wall.',
      'Forgetting to open the interior valve bleeder cap to break the water lock.'
    ],
    paaFaqs: [
      {
        question: 'Do frost-free outdoor faucets still need faucet covers?',
        answer: 'Yes! While frost-free sillcocks have a shutoff valve set 8 to 12 inches inside the house, an insulated cover provides critical extra thermal protection during prolonged sub-zero polar vortex storms.'
      }
    ],
    relatedGuideIds: ['guide-water-heater-valve', 'guide-furnace-filter-hvac']
  },
  {
    id: 'guide-water-heater-valve',
    slug: 'water-heater-pressure-relief-valve-leaking',
    title: 'Water Heater Pressure Relief Valve Leaking: Test, Flush, or Replace Guide',
    seoTitle: 'Water Heater Pressure Relief Valve Dripping? How to Fix & Replace',
    seoDescription: 'Is your hot water heater T&P relief valve leaking or dripping water onto the floor? Learn how to flush sediment safely or replace the $22 valve.',
    category: 'Water Heater',
    subcategory: 'Plumbing Fixes (DIY level)',
    readTime: '7 min read',
    publishDate: '3 weeks ago',
    author: {
      name: 'Mark Henderson',
      role: 'Master Appliance Technician (14+ yrs exp)',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&auto=format&fit=crop&q=80',
      verified: true
    },
    difficulty: 'Intermediate',
    estTime: '30 minutes',
    estDiyCost: '$21.99',
    estProCost: '$240.00',
    heroImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&auto=format&fit=crop&q=80',
    personalIntro: "If you walked into your utility closet and noticed a small puddle under the copper discharge pipe running down the side of your water heater, you are looking at the Temperature & Pressure (T&P) Relief Valve in action. This valve is the single most important safety mechanism in your house—it prevents your water heater from turning into a rocket if pressure builds up. When it begins to drip, it is either fouled with hard mineral grit or reaching the end of its 5-year service life. Here is how to test and swap it.",
    quickSummary: "The T&P valve releases water if tank temperature exceeds 210°F or pressure hits 150 PSI. A minor drip is often resolved by lifting the test lever for 5 seconds to blow out sediment; if dripping persists, an inexpensive $22 replacement valve fixes it permanently.",
    safetyAlert: "SCALD HAZARD: Water escaping the discharge pipe is up to 140°F and under heavy pressure. Stand to the side, wear heavy heat-resistant work gloves, and never put hands near the pipe opening.",
    toolsNeeded: [
      '10-inch or 12-inch pipe wrench',
      'Bucket',
      'Teflon thread seal tape',
      'Garden hose'
    ],
    partsNeeded: [
      {
        name: 'Watts 3/4" 150 PSI Temperature & Pressure Relief Valve',
        partNumber: '100XL-4',
        price: '$21.98',
        rating: 4.8,
        reviewsCount: 3800,
        isPrime: true,
        affiliateUrl: 'https://www.amazon.com/s?k=Watts+temperature+pressure+relief+valve+3-4+inch&tag=reportiq-20',
        badge: 'Industry Standard',
        category: 'part',
        description: 'Standard residential 3/4-inch NPT thread with thermostat probe for gas and electric tanks.'
      },
      {
        name: 'Oatey Heavy Duty PTFE Thread Seal Tape (Plumber\'s Tape)',
        partNumber: '31202',
        price: '$4.99',
        rating: 4.9,
        reviewsCount: 9100,
        isPrime: true,
        affiliateUrl: 'https://www.amazon.com/s?k=Oatey+PTFE+thread+seal+tape&tag=reportiq-20',
        category: 'tool',
        description: 'Ensures water-tight high-pressure seal on the threaded brass tank port.'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Safety Sediment Flush (Quick Test)',
        instructions: [
          'Place a bucket directly under the bottom of the copper discharge tube.',
          'Lift the small metal test lever on the valve halfway up for 3 seconds, then release it so it snaps shut.',
          'Water should rush out loudly. If the valve stops dripping after snapping shut, calcium sediment was cleared.'
        ]
      },
      {
        stepNumber: 2,
        title: 'Shut Off Water Supply & Drain Tank Partially',
        instructions: [
          'If dripping continues, shut off cold water inlet valve on top of the tank.',
          'Turn off gas valve or flip the electric breaker.',
          'Connect a garden hose to the bottom drain spigot and drain 5 to 10 gallons of water to lower water level below the valve height.'
        ]
      },
      {
        stepNumber: 3,
        title: 'Unscrew Discharge Tube and Valve',
        instructions: [
          'Use a pipe wrench to unthread the long copper discharge pipe from the valve outlet.',
          'Use the wrench to unthread the old T&P valve counter-clockwise from the water heater tank.'
        ]
      },
      {
        stepNumber: 4,
        title: 'Tape and Install New Watts Valve',
        instructions: [
          'Wrap 4 to 5 turns of Teflon tape clockwise around the threads of the new valve.',
          'Hand-thread into the tank port, then tighten securely with the wrench until the discharge outlet points straight down.',
          'Re-attach the copper discharge pipe, turn water back on, and check for leaks.'
        ]
      }
    ],
    commonMistakes: [
      'Capping or plugging the discharge pipe with a threaded plug: This can cause the tank to explode catastrophically under extreme runaway pressure.',
      'Failing to replace a valve that is over 5 years old and visibly coated in green corrosion.'
    ],
    paaFaqs: [
      {
        question: 'Is a dripping water heater pressure relief valve dangerous?',
        answer: 'A small slow drip is an early warning symptom of high thermal expansion or mineral buildup. However, a valve that is stuck closed or plugged is extremely dangerous.'
      }
    ],
    relatedGuideIds: ['guide-winterize-spigots', 'guide-unclog-shower-drain']
  },
  {
    id: 'guide-ge-washer-lid-lock',
    slug: 'ge-washer-not-spinning-lid-lock-fix',
    title: 'GE Washer Not Spinning: How to Test & Replace Lid Lock Switch in 15 Minutes',
    seoTitle: 'GE Washer Not Spinning: Lid Lock Switch Test & Fix | ReportIQ',
    seoDescription: 'GE top-load washer agitates but will not spin? Follow this step-by-step master technician bench guide to test and swap the WH12X10334 lid lock solenoid for under $22.',
    category: 'Washing Machine',
    subcategory: 'Washer Diagnostics',
    readTime: '6 min read',
    publishDate: 'Updated Today',
    author: {
      name: 'Mark Henderson',
      role: 'Master Appliance Technician (14+ yrs exp)',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&auto=format&fit=crop&q=80',
      verified: true
    },
    difficulty: 'Beginner',
    estTime: '15 – 20 mins',
    estDiyCost: '$21.50',
    estProCost: '$240.00',
    heroImage: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=1200&auto=format&fit=crop&q=80',
    personalIntro: 'I ran into this exact callout last Tuesday on a GE top-load washer. The machine would fill with hot water, agitate normally, but when it came time to drain and spin, the motor stayed dead silent and the lid light started blinking. A local appliance company had quoted the homeowner $240 to "replace the transmission." Ten minutes with a putty knife and a screwdriver revealed it was simply a cracked magnetic actuator inside the $21 lid lock assembly.',
    quickSummary: 'On modern GE washing machines, the main control board will immediately halt the spin basket if the lid lock switch cannot confirm an electrical latch circuit. Replacing the lock takes 15 minutes and requires only a 1/4" nut driver and a putty knife.',
    safetyAlert: 'Always unplug the washing machine from 120V wall electrical power before releasing the top console clips. Never attempt to jam a pencil or wire jumper into modern electronic lid switches.',
    toolsNeeded: [
      '1/4" Nut driver or socket',
      'Flat-blade putty knife (to pop console spring clips)',
      'Digital Multimeter (optional, for continuity check)',
      'Work gloves'
    ],
    partsNeeded: [
      {
        name: 'OEM GE Washer Lid Lock Switch Assembly (WH12X10334)',
        partNumber: 'WH12X10334',
        price: '$21.50',
        rating: 4.8,
        reviewsCount: 3840,
        isPrime: true,
        affiliateUrl: 'https://www.amazon.com/s?k=WH12X10334+GE+washer+lid+lock+switch&tag=reportiq-20',
        badge: 'Exact OEM Fit',
        category: 'part',
        description: 'Genuine OEM factory replacement magnetic interlock switch engineered specifically for GE top-load models.'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Disconnect Power and Release Top Cover Clips',
        instructions: [
          'Unplug the 120V power cord from the wall outlet.',
          'Take a stiff putty knife and slide it into the seam between the main top and the front panel, roughly 3 inches in from both corners.',
          'Push firmly inward on the spring clips while lifting up on the main top cover until it hinges upward.'
        ],
        proTip: 'Support the top panel with a bungee cord secured to your overhead cabinet so it does not drop on your hands.'
      },
      {
        stepNumber: 2,
        title: 'Unclip Wiring Harness and Remove Screws',
        instructions: [
          'Locate the lid lock switch assembly mounted on the underside of the top deck on the right side.',
          'Trace the wire harness back to the terminal connector and press the locking tab to disconnect it.',
          'Using a 1/4" nut driver, remove the two hex-head mounting screws securing the switch to the metal bracket.'
        ]
      },
      {
        stepNumber: 3,
        title: 'Install Replacement OEM Switch',
        instructions: [
          'Position the new WH12X10334 switch into the mounting bracket, ensuring the plastic locating pin seats into the alignment hole.',
          'Drive the two 1/4" retention screws firmly until snug. Do not over-tighten into plastic.',
          'Plug the electrical harness connector back in until it clicks solidly into place.'
        ]
      },
      {
        stepNumber: 4,
        title: 'Snap Top Deck Down and Run Test Spin Cycle',
        instructions: [
          'Lower the top lid deck back down and press firmly on the front corners until both spring clips snap locked.',
          'Plug the power cord back into the wall outlet.',
          'Select "Drain & Spin" mode on the control dial and press Start. Listen for the audible "click-clack" of the lock engaging; the basket will spin up to full RPM within 45 seconds.'
        ]
      }
    ],
    commonMistakes: [
      'Bypassing the switch with jumper wires: Modern GE washers measure both microswitch resistance and solenoid pulse timing; jumpers trigger an instant permanent fault lock.',
      'Forgetting to check the strike bezel: If the plastic catch on the lid is bent or missing its magnet, even a brand new switch will not engage.'
    ],
    paaFaqs: [
      {
        question: 'Why is my GE washer agitating but not spinning?',
        answer: 'The primary cause is a defective lid lock switch. The washer can agitate at low speed safely, but high-speed centrifugal spin is strictly interlocked with the lid latch circuit.'
      },
      {
        question: 'How much does it cost to fix a GE washer lid switch?',
        answer: 'A professional appliance technician typically charges $190 to $260 for trip charge and labor. Buying the OEM replacement part on Amazon costs about $21 and takes 15 minutes of DIY labor.'
      }
    ],
    relatedGuideIds: ['guide-whirlpool-f2e1', 'guide-bosch-e15']
  },
  {
    id: 'guide-whirlpool-dryer-thermal-fuse',
    slug: 'whirlpool-dryer-not-heating-thermal-fuse-fix',
    title: 'Whirlpool Dryer Not Heating: How to Test & Replace Thermal Fuse (Step-by-Step)',
    seoTitle: 'Whirlpool Dryer Not Heating: Thermal Fuse & Element Fix | ReportIQ',
    seoDescription: 'Whirlpool dryer runs and spins but produces zero heat? Test the thermal fuse and heating element with a $10 multimeter and fix it for $24 with this technician guide.',
    category: 'Dryer',
    subcategory: 'Dryer Troubleshooting',
    readTime: '7 min read',
    publishDate: 'Updated Today',
    author: {
      name: 'David Miller',
      role: 'Senior HVAC & Appliance Field Specialist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      verified: true
    },
    difficulty: 'Beginner',
    estTime: '25 – 30 mins',
    estDiyCost: '$24.95',
    estProCost: '$265.00',
    heroImage: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=1200&auto=format&fit=crop&q=80',
    personalIntro: 'Last autumn my neighbor knocked on my door frustrated because their Whirlpool electric dryer ran for two hours without warming a single towel. A local company told them it would cost $265 to repair or they should buy a new $800 dryer. We pulled the back panel off with a 1/4" nut driver, touched a digital multimeter to the white plastic thermal fuse, and confirmed zero continuity. A $24 heating element and fuse kit on Amazon Prime had them back in business the next afternoon.',
    quickSummary: 'When an electric Whirlpool dryer spins but blows cold air, 90% of failures stem from a blown thermal cut-off fuse (triggered by lint buildup) or a snapped nickel-chromium heating element coil. Testing with a multimeter takes 3 minutes.',
    safetyAlert: 'DANGER: Always unplug the 240V heavy-duty dryer power cord before removing the back cover panel. 240V lines carry lethal current.',
    toolsNeeded: [
      '1/4" Nut driver or socket wrench',
      'Digital Multimeter (set to Resistance / Ohms Ω)',
      'Vacuum cleaner with crevice attachment (to vacuum lint)',
      'Work gloves'
    ],
    partsNeeded: [
      {
        name: 'OEM Whirlpool Dryer Heating Element & Thermal Fuse Kit (Part #WP3387747)',
        partNumber: 'WP3387747',
        price: '$24.95',
        rating: 4.8,
        reviewsCount: 14200,
        isPrime: true,
        affiliateUrl: 'https://www.amazon.com/s?k=WP3387747+whirlpool+dryer+heating+element+kit&tag=reportiq-20',
        badge: 'Best Seller Kit',
        category: 'part',
        description: 'Complete replacement kit including heavy-gauge heating element coil, thermal cut-off fuse, and cycling thermostat.'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Unplug 240V Power & Remove Rear Metal Panel',
        instructions: [
          'Pull the dryer away from the wall and unplug the large 240V 3-prong or 4-prong electrical plug.',
          'Disconnect the 4-inch aluminum exhaust duct pipe.',
          'Using a 1/4" nut driver, remove the 8 to 10 perimeter hex screws securing the galvanized rear panel and lift it off.'
        ],
        proTip: 'Take a photo of the wire connections with your phone before disconnecting any terminals.'
      },
      {
        stepNumber: 2,
        title: 'Multimeter Continuity Test on Thermal Fuse',
        instructions: [
          'Locate the small white plastic thermal fuse mounted on the blower housing or heater duct.',
          'Pull one wire off the terminal to isolate the circuit.',
          'Touch the multimeter probes to both fuse terminals with the meter set to Ohms (Ω).',
          'A working fuse will read between 0.0 and 0.5 Ohms (continuous beep). If the meter reads "O.L" or 1, the fuse is blown and must be replaced.'
        ]
      },
      {
        stepNumber: 3,
        title: 'Inspect & Test Heating Element Box',
        instructions: [
          'Inspect the long metal heater box on the bottom right.',
          'Look through the perforated holes for any broken or sagged coils.',
          'Test continuity across both heater box terminals. A good element reads between 9 and 12 Ohms. Infinite resistance indicates a broken element wire.'
        ]
      },
      {
        stepNumber: 4,
        title: 'Install New Element Kit and Clean Lint Exhaust',
        instructions: [
          'Unscrew the old element box and fuse, then mount the new parts from the WP3387747 kit.',
          'Reconnect all spade terminals firmly according to your reference photo.',
          'Thoroughly vacuum all lint out of the blower housing and exhaust duct before replacing the back cover.',
          'Plug back into 240V, select High Heat Timed Dry, and check for warm air within 60 seconds.'
        ]
      }
    ],
    commonMistakes: [
      'Not cleaning the exhaust vent: A thermal fuse blows because airflow was blocked by lint. If you do not clean the duct pipe all the way to the outside wall, the new fuse will blow again within 3 days.',
      'Touching the bare nichrome coil with oily hands: Skin oils create hot spots on the heating coil that burn out prematurely.'
    ],
    paaFaqs: [
      {
        question: 'Why does my Whirlpool dryer spin but blow cold air?',
        answer: 'The most common cause is a blown thermal cut-off fuse or a snapped heating element coil. When the exhaust vent gets clogged with lint, internal temperatures exceed 196°F and the safety fuse shuts down the heating circuit to prevent a home fire.'
      },
      {
        question: 'Can you reset a thermal fuse on a dryer?',
        answer: 'No. The thermal fuse is a one-time safety device containing an internal solder pellet. Once blown, it cannot be reset and must be replaced.'
      }
    ],
    relatedGuideIds: ['guide-furnace-filter-hvac', 'guide-ge-washer-lid-lock']
  }
];
