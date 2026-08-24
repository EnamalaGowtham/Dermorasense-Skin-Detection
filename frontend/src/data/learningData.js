export const MYTHS_AND_FACTS = [
  {
    id: "myth_1",
    myth: "All skin conditions are caused by poor hygiene.",
    fact: "Many skin conditions have multiple contributing factors, such as genetics, autoimmune responses, or environmental triggers, and are not simply caused by poor hygiene.",
  },
  {
    id: "myth_2",
    myth: "Popping pimples helps them heal faster.",
    fact: "Popping pimples pushes bacteria and pus deeper into the skin, causing more inflammation and increasing the risk of scarring and infection.",
  },
  {
    id: "myth_3",
    myth: "You don't need sunscreen on cloudy days.",
    fact: "Up to 80% of the sun's harmful UV rays can penetrate clouds. Daily sun protection is essential regardless of weather.",
  },
  {
    id: "myth_4",
    myth: "Tanning beds are a safe way to get a base tan.",
    fact: "Tanning beds emit intense UV radiation that significantly increases the risk of melanoma and other skin cancers. There is no 'safe' tan.",
  },
  {
    id: "myth_5",
    myth: "Drinking more water cures dry skin.",
    fact: "While hydration is important for overall health, dry skin is typically a surface barrier issue and is best treated with topical moisturizers to trap moisture in the skin.",
  }
];

export const SKIN_CARE_GUIDES = [
  {
    id: "guide_cleansing",
    category: "Daily Skin Care",
    title: "Cleansing",
    icon: "Droplets",
    whatIsIt: "Cleansing is simply washing your face to remove dirt, oil, makeup, and pollution.",
    whyImportant: "Throughout the day, your skin collects dirt and bacteria. Washing your face keeps pores clear and helps prevent breakouts.",
    whatToDo: [
      "Wet your face with lukewarm water.",
      "Use a gentle cleanser.",
      "Massage gently with your fingertips.",
      "Rinse thoroughly.",
      "Pat your skin dry instead of rubbing it.",
      "Apply moisturizer if needed."
    ],
    howOften: "Daily: Morning and night, plus after heavy sweating.",
    tips: [
      "Use your hands instead of rough washcloths.",
      "Make sure the water is not too hot."
    ],
    dos: [
      "Use gentle cleansers.",
      "Keep your skin clean."
    ],
    avoids: [
      "Harsh scrubbing.",
      "Using very hot water."
    ]
  },
  {
    id: "guide_moisturize",
    category: "Daily Skin Care",
    title: "Moisturizing",
    icon: "Feather",
    whatIsIt: "Moisturizing means applying a lotion or cream to keep your skin hydrated.",
    whyImportant: "It traps water in your skin, keeping it soft, smooth, and protected from drying out.",
    whatToDo: [
      "Choose a moisturizer that feels comfortable on your skin.",
      "Apply it right after washing your face or bathing.",
      "Gently smooth it over your skin."
    ],
    howOften: "Daily: Morning and night, immediately after cleansing.",
    dos: [
      "Apply while skin is still slightly damp."
    ],
    avoids: [
      "Using heavy, greasy creams if your skin is already very oily."
    ]
  },
  {
    id: "guide_sun",
    category: "Protection",
    title: "Sun Protection",
    icon: "Sun",
    whatIsIt: "Using sunscreen and clothing to block harmful UV rays from the sun.",
    whyImportant: "Sun protection prevents premature aging, sunburns, and lowers the risk of skin cancer.",
    whatToDo: [
      "Apply a broad-spectrum sunscreen (SPF 30 or higher).",
      "Reapply every 2 hours if outdoors.",
      "Wear a hat and sunglasses for extra protection."
    ],
    howOften: "Every day, even when it is cloudy.",
    dos: [
      "Use enough sunscreen (about a shot glass full for your body).",
      "Seek shade during midday."
    ],
    avoids: [
      "Tanning beds.",
      "Staying in direct sun without protection."
    ]
  },
  {
    id: "guide_sleep",
    category: "Lifestyle",
    title: "Sleep & Lifestyle",
    icon: "Moon",
    whatIsIt: "Getting enough rest and managing stress in your daily life.",
    whyImportant: "During sleep, your body repairs itself. High stress can sometimes make skin problems worse.",
    whatToDo: [
      "Aim for 7-9 hours of sleep each night.",
      "Find simple ways to relax, like reading or walking.",
      "Exercise regularly."
    ],
    howOften: "Daily.",
    dos: [
      "Keep a regular sleep schedule."
    ],
    avoids: [
      "Ignoring stress levels."
    ]
  },
  {
    id: "guide_products",
    category: "Safety",
    title: "Product Safety",
    icon: "Shield",
    whatIsIt: "Being careful about which creams, soaps, and cosmetics you put on your skin.",
    whyImportant: "Using too many products or sharing them can cause irritation or spread germs.",
    whatToDo: [
      "Test a small amount of any new product on your arm before using it on your face (patch test).",
      "Stick to a simple routine with just a few products."
    ],
    howOften: "Whenever using a new skin-care product.",
    dos: [
      "Keep your routine simple."
    ],
    avoids: [
      "Using too many products at once.",
      "Sharing personal skin-care products.",
      "Continuing to use products that cause persistent irritation."
    ]
  },
  {
    id: "guide_bathing",
    category: "Hygiene",
    title: "Bathing & Hygiene",
    icon: "Bath",
    whatIsIt: "Keeping your body clean through regular bathing.",
    whyImportant: "Good hygiene removes sweat and bacteria, keeping skin fresh and preventing infections.",
    whatToDo: [
      "Take warm (not hot) showers or baths.",
      "Wash gently.",
      "Keep your towels and clothes clean."
    ],
    howOften: "Daily, or as needed after sweating.",
    dos: [
      "Use clean towels."
    ],
    avoids: [
      "Excessively hot water."
    ]
  },
  {
    id: "guide_sensitive",
    category: "Care",
    title: "Sensitive or Irritated Skin",
    icon: "Heart",
    whatIsIt: "Taking extra care of skin that feels dry, itchy, or red.",
    whyImportant: "Gentle care helps irritated skin heal and prevents it from getting worse.",
    whatToDo: [
      "Use very mild, fragrance-free products.",
      "Leave the irritated area alone as much as possible."
    ],
    howOften: "When needed.",
    dos: [
      "Be extremely gentle."
    ],
    avoids: [
      "Scratching or picking.",
      "Introducing multiple new products at once."
    ]
  },
  {
    id: "guide_doctor",
    category: "Medical",
    title: "When to See a Dermatologist",
    icon: "Stethoscope",
    whatIsIt: "Knowing when to get professional help for a skin problem.",
    whyImportant: "Doctors can safely treat skin issues that won't go away on their own.",
    whenToSeeDoctor: "See a doctor if you notice:\n• A skin problem that does not improve.\n• Rapidly worsening symptoms.\n• Severe pain or significant swelling.\n• Signs of infection.\n• A rapidly changing or concerning spot.",
    disclaimer: "This guide provides general skin-care information and does not replace advice from a qualified healthcare professional.",
    dos: [
      "Seek professional help if you are worried."
    ],
    avoids: [
      "Waiting too long if symptoms are severe."
    ]
  }
];

export const GLOSSARY_TERMS = [
  { id: "term-acne", term: "Acne", definition: "A chronic inflammatory skin condition caused by clogged hair follicles.", example: "Commonly presents as blackheads, whiteheads, or pimples on the face, chest, or back." },
  { id: "term-alopecia", term: "Alopecia", definition: "The medical term for hair loss, which can occur on the scalp or body.", example: "Can occur in small patches (alopecia areata) or universally over the body." },
  { id: "term-benign", term: "Benign", definition: "Not cancerous; a growth that will not spread to other parts of the body.", example: "A standard, unchanging mole is typically a benign skin growth." },
  { id: "term-comedone", term: "Comedone", definition: "A clogged hair follicle (pore) in the skin. Can be open (blackhead) or closed (whitehead).", example: "Blackheads are open comedones where the exposed pigment has oxidized." },
  { id: "term-dermatitis", term: "Dermatitis", definition: "A general term for skin inflammation, often presenting as an itchy rash.", example: "Contact dermatitis occurs when touching a harsh chemical or poison ivy." },
  { id: "term-erythema", term: "Erythema", definition: "Redness of the skin or mucous membranes, caused by increased blood flow in superficial capillaries.", example: "A sunburn is a common cause of widespread erythema." },
  { id: "term-lesion", term: "Lesion", definition: "Any abnormal damage or change in the tissue of an organism, usually caused by disease or trauma.", example: "A blister, a mole, or a cut are all considered skin lesions." },
  { id: "term-malignant", term: "Malignant", definition: "Cancerous; capable of invading nearby tissue and spreading to other parts of the body.", example: "Melanoma is a malignant form of skin cancer requiring immediate treatment." },
  { id: "term-melanin", term: "Melanin", definition: "The pigment that gives human skin, hair, and eyes their color.", example: "Increased melanin production during sun exposure causes a tan." },
  { id: "term-papule", term: "Papule", definition: "A small, raised, solid pimple or swelling, often inflamed but not producing pus.", example: "A raised, red bump without a white head is a papule." },
  { id: "term-pruritus", term: "Pruritus", definition: "The medical term for severe itching of the skin.", example: "Patients with eczema often experience intense pruritus at night." },
  { id: "term-pustule", term: "Pustule", definition: "A small blister or pimple on the skin containing pus.", example: "A 'whitehead' pimple containing yellow or white fluid is a pustule." },
  { id: "term-urticaria", term: "Urticaria", definition: "Also known as hives; an outbreak of swollen, pale red bumps or plaques on the skin.", example: "An allergic reaction to a bee sting might cause urticaria." }
];

export const QUIZ_QUESTIONS = {
  "beginner": [
    {
      "id": "b_01",
      "question": "Which of the following is essential for daily sun protection?",
      "options": [
        "Applying SPF 30+ sunscreen",
        "Drinking 8 glasses of water",
        "Washing face with hot water",
        "Exfoliating every morning"
      ],
      "correctIndex": 0,
      "explanation": "Daily application of broad-spectrum SPF 30+ sunscreen is the most effective way to protect your skin from harmful UV rays."
    },
    {
      "id": "b_02",
      "question": "What is the best way to handle a new pimple?",
      "options": [
        "Pop it immediately",
        "Apply a hot compress",
        "Apply a spot treatment and leave it alone",
        "Scrub it vigorously"
      ],
      "correctIndex": 2,
      "explanation": "Popping or scrubbing pimples can lead to scarring and further infection. Gentle spot treatments are best."
    },
    {
      "id": "b_03",
      "question": "When is the best time to apply body moisturizer?",
      "options": [
        "Right before going to bed",
        "Immediately after showering while skin is damp",
        "Before exercising",
        "Only when the skin looks flaky"
      ],
      "correctIndex": 1,
      "explanation": "Applying moisturizer to damp skin helps lock in moisture and supports the skin's natural barrier."
    },
    {
      "id": "b_04",
      "question": "How often should you typically wash your face?",
      "options": [
        "Once a week",
        "Twice a day",
        "Five times a day",
        "Only when it looks dirty"
      ],
      "correctIndex": 1,
      "explanation": "Washing twice a day (morning and night) is generally recommended to remove impurities without stripping natural oils."
    },
    {
      "id": "b_05",
      "question": "What does SPF stand for?",
      "options": [
        "Skin Protection Factor",
        "Sun Protection Factor",
        "Solar Prevention Formula",
        "Skin Prevention Formula"
      ],
      "correctIndex": 1,
      "explanation": "SPF stands for Sun Protection Factor, which measures how well a sunscreen protects against UVB rays."
    },
    {
      "id": "b_06",
      "question": "Which water temperature is best for washing your face?",
      "options": [
        "Ice cold",
        "Lukewarm",
        "Hot",
        "Alternating hot and cold"
      ],
      "correctIndex": 1,
      "explanation": "Lukewarm water is ideal. Hot water can strip natural oils, while ice cold water may not effectively remove dirt."
    },
    {
      "id": "b_07",
      "question": "What is the primary function of a skin cleanser?",
      "options": [
        "To add color",
        "To remove dirt, oil, and makeup",
        "To protect from the sun",
        "To shrink pores permanently"
      ],
      "correctIndex": 1,
      "explanation": "Cleansers are formulated to remove dirt, excess oil, dead skin cells, and makeup from the skin."
    },
    {
      "id": "b_08",
      "question": "Which of these is a common symptom of dry skin?",
      "options": [
        "Excessive shininess",
        "Flaking and tightness",
        "Frequent severe acne",
        "Dark under-eye circles"
      ],
      "correctIndex": 1,
      "explanation": "Dry skin often feels tight and may appear flaky or rough due to a lack of moisture."
    },
    {
      "id": "b_09",
      "question": "True or False: You only need sunscreen on sunny days.",
      "options": [
        "True",
        "False, UV rays penetrate clouds",
        "False, but only in summer",
        "True, clouds block all UV rays"
      ],
      "correctIndex": 1,
      "explanation": "Up to 80% of the sun's UV rays can pass through clouds, making daily sunscreen necessary regardless of weather."
    },
    {
      "id": "b_10",
      "question": "What is the term for pores that are clogged with oil and dead skin but remain open to the air?",
      "options": [
        "Whiteheads",
        "Blackheads",
        "Cysts",
        "Pustules"
      ],
      "correctIndex": 1,
      "explanation": "Blackheads are open comedones where the trapped melanin and sebum oxidize and turn dark."
    },
    {
      "id": "b_11",
      "question": "Which of the following describes oily skin?",
      "options": [
        "Tight and flaky",
        "Shiny with enlarged pores",
        "Red and irritated",
        "Thin and papery"
      ],
      "correctIndex": 1,
      "explanation": "Oily skin typically has excess sebum production leading to a shiny appearance and visible pores."
    },
    {
      "id": "b_12",
      "question": "What should you always do before sleeping?",
      "options": [
        "Apply heavy makeup",
        "Remove all makeup and cleanse",
        "Exfoliate aggressively",
        "Apply sunscreen"
      ],
      "correctIndex": 1,
      "explanation": "Sleeping in makeup can clog pores and lead to breakouts. Always cleanse before bed."
    },
    {
      "id": "b_13",
      "question": "Which ingredient is commonly used to hydrate the skin?",
      "options": [
        "Hyaluronic acid",
        "Salicylic acid",
        "Benzoyl peroxide",
        "Retinol"
      ],
      "correctIndex": 0,
      "explanation": "Hyaluronic acid is a powerful humectant that draws water into the skin to hydrate it."
    },
    {
      "id": "b_14",
      "question": "What happens if you over-exfoliate your skin?",
      "options": [
        "It becomes immune to acne",
        "It may become red, irritated, and compromised",
        "Pores disappear completely",
        "It stops producing oil permanently"
      ],
      "correctIndex": 1,
      "explanation": "Over-exfoliation damages the skin barrier, leading to redness, sensitivity, and irritation."
    },
    {
      "id": "b_15",
      "question": "What is a 'patch test'?",
      "options": [
        "Sewing a patch on clothing",
        "Testing a new product on a small skin area to check for reactions",
        "A medical procedure for acne",
        "Measuring the skin's pH level"
      ],
      "correctIndex": 1,
      "explanation": "A patch test involves applying a small amount of product to ensure you aren't allergic before full application."
    },
    {
      "id": "b_16",
      "question": "What is the medical term for redness of the skin?",
      "options": [
        "Erythema",
        "Cyanosis",
        "Jaundice",
        "Pallor"
      ],
      "correctIndex": 0,
      "explanation": "Erythema is the medical term for redness of the skin, typically caused by increased blood flow in capillaries."
    },
    {
      "id": "b_17",
      "question": "Which of these habits can worsen acne?",
      "options": [
        "Drinking water",
        "Frequently touching your face",
        "Sleeping 8 hours",
        "Eating vegetables"
      ],
      "correctIndex": 1,
      "explanation": "Touching your face can transfer bacteria and dirt from your hands to your pores, worsening breakouts."
    },
    {
      "id": "b_18",
      "question": "What does a toner typically do?",
      "options": [
        "Removes hair",
        "Hydrates, balances pH, or removes residual dirt",
        "Acts as a strong sunblock",
        "Heals deep wounds"
      ],
      "correctIndex": 1,
      "explanation": "Toners are liquids used after cleansing to balance skin pH, hydrate, or prep the skin for serums."
    },
    {
      "id": "b_19",
      "question": "What is melanin?",
      "options": [
        "A type of skin bacteria",
        "The pigment that gives skin its color",
        "A bone in the face",
        "A type of sunscreen"
      ],
      "correctIndex": 1,
      "explanation": "Melanin is the pigment responsible for skin, hair, and eye color, and provides some UV protection."
    },
    {
      "id": "b_20",
      "question": "What is the outermost layer of the skin called?",
      "options": [
        "Dermis",
        "Hypodermis",
        "Epidermis",
        "Subcutaneous"
      ],
      "correctIndex": 2,
      "explanation": "The epidermis is the top, outermost layer of the skin that provides a waterproof barrier."
    },
    {
      "id": "b_21",
      "question": "How much sunscreen is generally recommended for the face and neck?",
      "options": [
        "A pea-sized amount",
        "About half a teaspoon or two finger lengths",
        "Three tablespoons",
        "One tiny drop"
      ],
      "correctIndex": 1,
      "explanation": "Dermatologists recommend about half a teaspoon (or the length of two fingers) to adequately cover the face and neck."
    },
    {
      "id": "b_22",
      "question": "Which item should be washed regularly to prevent acne?",
      "options": [
        "Shoes",
        "Pillowcases",
        "Belts",
        "Watches"
      ],
      "correctIndex": 1,
      "explanation": "Pillowcases accumulate oil, dead skin, and bacteria. Washing them regularly helps prevent breakouts."
    },
    {
      "id": "b_23",
      "question": "What characterizes combination skin?",
      "options": [
        "Dry everywhere",
        "Oily in the T-zone and dry/normal on cheeks",
        "Redness and scaling",
        "Completely poreless"
      ],
      "correctIndex": 1,
      "explanation": "Combination skin features an oily T-zone (forehead, nose, chin) while the cheeks remain dry or normal."
    },
    {
      "id": "b_24",
      "question": "What is the purpose of a skin barrier?",
      "options": [
        "To keep water in and irritants out",
        "To stop hair growth",
        "To block all vitamin D",
        "To permanently change skin color"
      ],
      "correctIndex": 0,
      "explanation": "The skin barrier (stratum corneum) protects against environmental damage and prevents transepidermal water loss."
    },
    {
      "id": "b_25",
      "question": "Which of these is a physical exfoliant?",
      "options": [
        "Glycolic acid",
        "Lactic acid",
        "A walnut scrub",
        "Salicylic acid"
      ],
      "correctIndex": 2,
      "explanation": "Physical exfoliants use granules (like walnut shells or sugar) to manually slough off dead skin."
    },
    {
      "id": "b_26",
      "question": "What does broad-spectrum mean on a sunscreen?",
      "options": [
        "It covers the whole body",
        "It protects against both UVA and UVB rays",
        "It lasts forever",
        "It is waterproof for 24 hours"
      ],
      "correctIndex": 1,
      "explanation": "Broad-spectrum means the product provides protection against both UVA (aging) and UVB (burning) rays."
    },
    {
      "id": "b_27",
      "question": "Which is generally better for sensitive skin?",
      "options": [
        "Highly fragranced products",
        "Fragrance-free products",
        "Harsh scrubs",
        "Essential oils"
      ],
      "correctIndex": 1,
      "explanation": "Fragrances (both synthetic and natural) are common allergens and irritants for sensitive skin."
    },
    {
      "id": "b_28",
      "question": "What is the common term for 'sebum'?",
      "options": [
        "Skin oil",
        "Dead skin",
        "Sweat",
        "Hair follicles"
      ],
      "correctIndex": 0,
      "explanation": "Sebum is the natural oil produced by the sebaceous glands to lubricate and waterproof the skin."
    },
    {
      "id": "b_29",
      "question": "How often should you reapply sunscreen when outdoors?",
      "options": [
        "Every 10 minutes",
        "Every 2 hours",
        "Once a day",
        "Only after sunset"
      ],
      "correctIndex": 1,
      "explanation": "Sunscreen should be reapplied every two hours, or immediately after swimming or heavy sweating."
    },
    {
      "id": "b_30",
      "question": "What is a basic daily skincare routine order?",
      "options": [
        "Moisturize, Cleanser, Sunscreen",
        "Cleanser, Moisturizer, Sunscreen",
        "Sunscreen, Cleanser, Moisturizer",
        "Cleanser, Sunscreen, Moisturizer"
      ],
      "correctIndex": 1,
      "explanation": "The basic order is to cleanse first, moisturize to hydrate, and finish with sunscreen (in the morning)."
    },
    {
      "id": "b_31",
      "question": "Which skin type feels tight after washing?",
      "options": [
        "Oily",
        "Dry",
        "Normal",
        "Combination"
      ],
      "correctIndex": 1,
      "explanation": "Dry skin lacks natural oils and often feels tight and uncomfortable immediately after cleansing."
    },
    {
      "id": "b_32",
      "question": "What is a whitehead?",
      "options": [
        "A freckle",
        "A closed comedo trapped under the skin",
        "An open pore",
        "A deep cyst"
      ],
      "correctIndex": 1,
      "explanation": "A whitehead is a closed comedo where oil and dead skin cells are trapped beneath the skin's surface."
    },
    {
      "id": "b_33",
      "question": "What role does drinking water play in skin health?",
      "options": [
        "It cures severe acne instantly",
        "It helps maintain overall hydration and bodily functions",
        "It makes sunscreen unnecessary",
        "It permanently shrinks pores"
      ],
      "correctIndex": 1,
      "explanation": "While it won't cure diseases, adequate hydration is essential for overall health, which reflects in skin elasticity."
    },
    {
      "id": "b_34",
      "question": "Should you apply skincare products to a dirty face?",
      "options": [
        "Yes, it doesn't matter",
        "No, always cleanse first",
        "Yes, if it's expensive",
        "Only at night"
      ],
      "correctIndex": 1,
      "explanation": "Applying products to unwashed skin traps dirt and prevents active ingredients from absorbing."
    },
    {
      "id": "b_35",
      "question": "What is the T-zone?",
      "options": [
        "The toes",
        "The forehead, nose, and chin",
        "The cheeks and neck",
        "The back of the hands"
      ],
      "correctIndex": 1,
      "explanation": "The T-zone covers the forehead, nose, and chin, which typically have a higher concentration of oil glands."
    },
    {
      "id": "b_36",
      "question": "What is a common sign of a sunburn?",
      "options": [
        "Green skin",
        "Redness, heat, and pain",
        "Instant wrinkle removal",
        "Increased acne"
      ],
      "correctIndex": 1,
      "explanation": "Sunburns cause erythema (redness), inflammation, heat, and pain due to UV damage."
    },
    {
      "id": "b_37",
      "question": "Why is sleep important for the skin?",
      "options": [
        "It makes you taller",
        "It allows the skin to repair and regenerate",
        "It stops hair growth",
        "It completely removes scars"
      ],
      "correctIndex": 1,
      "explanation": "During sleep, blood flow to the skin increases, allowing it to rebuild collagen and repair UV damage."
    },
    {
      "id": "b_38",
      "question": "Which of these should you NOT use on your face?",
      "options": [
        "Facial cleanser",
        "Body lotion",
        "Facial serum",
        "Facial sunscreen"
      ],
      "correctIndex": 1,
      "explanation": "Body lotions are often thicker and contain heavier fragrances that can clog facial pores and cause irritation."
    },
    {
      "id": "b_39",
      "question": "What is a dermatologist?",
      "options": [
        "A foot doctor",
        "A medical doctor specializing in skin, hair, and nails",
        "A dentist",
        "A heart surgeon"
      ],
      "correctIndex": 1,
      "explanation": "Dermatologists are specialists who diagnose and treat thousands of skin, hair, and nail conditions."
    },
    {
      "id": "b_40",
      "question": "True or False: Darker skin tones do not need sunscreen.",
      "options": [
        "True",
        "False, all skin tones are susceptible to UV damage and skin cancer",
        "True, melanin blocks 100% of UV rays",
        "False, but only in winter"
      ],
      "correctIndex": 1,
      "explanation": "While more melanin provides a higher natural SPF, it does not prevent all damage, hyperpigmentation, or skin cancer."
    },
    {
      "id": "b_41",
      "question": "What is an exfoliant?",
      "options": [
        "A product that removes dead skin cells",
        "A heavy night cream",
        "A type of makeup",
        "A lip balm"
      ],
      "correctIndex": 0,
      "explanation": "Exfoliants help shed the top layer of dead skin cells to reveal smoother skin underneath."
    },
    {
      "id": "b_42",
      "question": "What does hypoallergenic mean?",
      "options": [
        "Guaranteed never to cause an allergy",
        "Formulated to minimize the risk of allergic reactions",
        "Contains heavy allergens",
        "Only for medical professionals"
      ],
      "correctIndex": 1,
      "explanation": "Hypoallergenic implies the product is less likely to cause allergic reactions, though it is not a 100% guarantee."
    },
    {
      "id": "b_43",
      "question": "Why is picking at scabs bad for the skin?",
      "options": [
        "It increases healing speed",
        "It delays healing and increases the chance of scarring",
        "It makes the scab invisible",
        "It hydrates the skin"
      ],
      "correctIndex": 1,
      "explanation": "Picking at scabs disrupts the healing process, increases infection risk, and leads to hyperpigmentation and scars."
    },
    {
      "id": "b_44",
      "question": "What is the purpose of a lip balm?",
      "options": [
        "To dye the lips permanently",
        "To prevent and heal dry, chapped lips",
        "To shrink lips",
        "To remove lip skin"
      ],
      "correctIndex": 1,
      "explanation": "Lip balms use occlusives like wax or petrolatum to seal in moisture and protect the delicate lip skin."
    },
    {
      "id": "b_45",
      "question": "Which of these is a common acne trigger for some people?",
      "options": [
        "Washing hands",
        "High stress levels",
        "Sleeping 8 hours",
        "Drinking water"
      ],
      "correctIndex": 1,
      "explanation": "Stress increases cortisol levels, which can stimulate sebaceous glands to produce more oil, triggering breakouts."
    },
    {
      "id": "b_46",
      "question": "What is the main benefit of using a daily moisturizer?",
      "options": [
        "Prevents dryness and protects the skin barrier",
        "Changes skin color",
        "Removes makeup",
        "Cures all infections"
      ],
      "correctIndex": 0,
      "explanation": "Moisturizers hydrate the skin and lock in moisture to keep the skin barrier healthy and intact."
    },
    {
      "id": "b_47",
      "question": "What is a 'breakout'?",
      "options": [
        "A sudden appearance of acne or rashes",
        "Escaping from a room",
        "Skin peeling off entirely",
        "A permanent scar"
      ],
      "correctIndex": 0,
      "explanation": "In skincare, a breakout refers to a sudden eruption of acne, pimples, or a rash on the skin."
    },
    {
      "id": "b_48",
      "question": "Can weather affect your skin?",
      "options": [
        "No, skin is immune to weather",
        "Yes, cold wind can dry skin while humidity can increase oiliness",
        "Only in the desert",
        "Only when raining"
      ],
      "correctIndex": 1,
      "explanation": "Environmental factors like temperature, wind, and humidity heavily impact skin hydration and oil production."
    },
    {
      "id": "b_49",
      "question": "What is hyperpigmentation?",
      "options": [
        "Loss of all skin pigment",
        "Patches of skin becoming darker than surrounding areas",
        "Skin turning blue",
        "Skin becoming completely transparent"
      ],
      "correctIndex": 1,
      "explanation": "Hyperpigmentation occurs when an excess of melanin forms deposits, creating darker patches on the skin."
    },
    {
      "id": "b_50",
      "question": "How long should you wash your face?",
      "options": [
        "3 seconds",
        "About 30 to 60 seconds",
        "10 minutes",
        "30 minutes"
      ],
      "correctIndex": 1,
      "explanation": "Gently massaging a cleanser for 30-60 seconds ensures dirt and oils are effectively broken down without causing irritation."
    }
  ],
  "intermediate": [
    {
      "id": "i_01",
      "question": "What is the primary function of retinoids in skincare?",
      "options": [
        "To bleach the skin",
        "To increase cell turnover and stimulate collagen",
        "To physically scrub away dead skin",
        "To increase oil production"
      ],
      "correctIndex": 1,
      "explanation": "Retinoids (Vitamin A derivatives) work by speeding up cellular turnover, unclogging pores, and boosting collagen production."
    },
    {
      "id": "i_02",
      "question": "Which acid is oil-soluble and penetrates deep into pores to treat acne?",
      "options": [
        "Glycolic Acid",
        "Lactic Acid",
        "Salicylic Acid (BHA)",
        "Ascorbic Acid"
      ],
      "correctIndex": 2,
      "explanation": "Salicylic acid is a Beta Hydroxy Acid (BHA) that is lipid-soluble, allowing it to penetrate and dissolve sebum inside pores."
    },
    {
      "id": "i_03",
      "question": "What is the difference between UVA and UVB rays?",
      "options": [
        "UVA causes burning, UVB causes aging",
        "UVA causes aging, UVB causes burning",
        "UVA only exists in winter",
        "UVB penetrates glass, UVA does not"
      ],
      "correctIndex": 1,
      "explanation": "UVA rays penetrate deeply and cause premature Aging, while UVB rays cause surface Burning."
    },
    {
      "id": "i_04",
      "question": "What does a humectant do in a moisturizer?",
      "options": [
        "Forms a physical barrier on top of the skin",
        "Attracts and binds water to the skin",
        "Fills in the spaces between skin cells",
        "Removes dead skin"
      ],
      "correctIndex": 1,
      "explanation": "Humectants like glycerin and hyaluronic acid draw water from the environment or deeper skin layers into the epidermis."
    },
    {
      "id": "i_05",
      "question": "Why is Vitamin C often packaged in dark or opaque bottles?",
      "options": [
        "To make it look expensive",
        "Because it is highly unstable and degrades in light and air",
        "To prevent evaporation",
        "Because it is legally required for all vitamins"
      ],
      "correctIndex": 1,
      "explanation": "L-ascorbic acid is extremely prone to oxidation when exposed to UV light and oxygen."
    },
    {
      "id": "i_06",
      "question": "Which of these ingredients should generally NOT be used in the same routine at the same time?",
      "options": [
        "Hyaluronic Acid and Ceramide",
        "Retinol and Benzoyl Peroxide",
        "Niacinamide and Glycerin",
        "Sunscreen and Vitamin C"
      ],
      "correctIndex": 1,
      "explanation": "Using Retinol and Benzoyl Peroxide together can cause severe irritation and in some formulations, they can deactivate each other."
    },
    {
      "id": "i_07",
      "question": "What is 'transepidermal water loss' (TEWL)?",
      "options": [
        "Sweating excessively",
        "The process of water evaporating passively through the skin barrier",
        "Drinking too much water",
        "Crying"
      ],
      "correctIndex": 1,
      "explanation": "TEWL refers to the natural, passive loss of water from the body to the atmosphere through the epidermis."
    },
    {
      "id": "i_08",
      "question": "What is the role of ceramides in the skin?",
      "options": [
        "They are lipids that help form the skin's barrier and retain moisture",
        "They are acids that exfoliate the skin",
        "They are bacteria that cause acne",
        "They are physical sunblocks"
      ],
      "correctIndex": 0,
      "explanation": "Ceramides make up about 50% of the lipids in the skin barrier, acting like 'mortar' between the cellular 'bricks'."
    },
    {
      "id": "i_09",
      "question": "Which skin condition is characterized by chronic facial redness, visible blood vessels, and sometimes pimple-like bumps?",
      "options": [
        "Melasma",
        "Psoriasis",
        "Rosacea",
        "Vitiligo"
      ],
      "correctIndex": 2,
      "explanation": "Rosacea primarily affects the face, causing erythema, telangiectasia (visible vessels), and inflammatory lesions."
    },
    {
      "id": "i_10",
      "question": "What is contact dermatitis?",
      "options": [
        "A viral skin infection",
        "An allergic or irritant reaction caused by contact with a specific substance",
        "A genetic hair loss condition",
        "A type of skin cancer"
      ],
      "correctIndex": 1,
      "explanation": "Contact dermatitis occurs when the skin reacts to an external allergen (like poison ivy or nickel) or irritant."
    },
    {
      "id": "i_11",
      "question": "What is the difference between a physical (mineral) and chemical sunscreen?",
      "options": [
        "Physical lasts 24 hours, chemical lasts 1 hour",
        "Physical sits on top to reflect/scatter UV; chemical absorbs into skin to convert UV to heat",
        "Chemical is natural, physical is synthetic",
        "There is no difference"
      ],
      "correctIndex": 1,
      "explanation": "Mineral sunscreens (zinc oxide/titanium dioxide) act as a physical shield, while chemical filters absorb UV rays and dissipate them."
    },
    {
      "id": "i_12",
      "question": "Which ingredient is known to help fade hyperpigmentation by inhibiting melanin production?",
      "options": [
        "Hyaluronic Acid",
        "Hydroquinone",
        "Dimethicone",
        "Petrolatum"
      ],
      "correctIndex": 1,
      "explanation": "Hydroquinone is a potent skin-lightening agent that works by inhibiting the enzyme tyrosinase."
    },
    {
      "id": "i_13",
      "question": "What does an occlusive ingredient do?",
      "options": [
        "Draws water from the air",
        "Creates a physical seal on the skin to prevent moisture evaporation",
        "Exfoliates dead cells",
        "Kills bacteria"
      ],
      "correctIndex": 1,
      "explanation": "Occlusives (like petrolatum or squalane) sit on the skin's surface and trap moisture to prevent TEWL."
    },
    {
      "id": "i_14",
      "question": "What is post-inflammatory hyperpigmentation (PIH)?",
      "options": [
        "A sunburn",
        "Dark spots left behind after a skin injury or acne lesion heals",
        "A type of eczema",
        "Loss of pigment in patches"
      ],
      "correctIndex": 1,
      "explanation": "PIH is the excess melanin produced as part of the skin's inflammatory response to injury or trauma."
    },
    {
      "id": "i_15",
      "question": "What is a 'purging' phase in skincare?",
      "options": [
        "When skin temporarily breaks out more due to an active ingredient accelerating cell turnover",
        "When skin starts bleeding",
        "When a product expires",
        "When pores physically close permanently"
      ],
      "correctIndex": 0,
      "explanation": "Purging occurs with active ingredients (like retinoids or acids) that speed up cell turnover, pushing underlying microcomedones to the surface."
    },
    {
      "id": "i_16",
      "question": "Which vitamin is Niacinamide derived from?",
      "options": [
        "Vitamin A",
        "Vitamin B3",
        "Vitamin C",
        "Vitamin E"
      ],
      "correctIndex": 1,
      "explanation": "Niacinamide is a form of Vitamin B3 that helps soothe the skin, fade spots, and support the barrier."
    },
    {
      "id": "i_17",
      "question": "What is the primary cause of intrinsic (chronological) skin aging?",
      "options": [
        "Sun exposure",
        "Smoking",
        "Genetics and natural cellular decline over time",
        "Diet"
      ],
      "correctIndex": 2,
      "explanation": "Intrinsic aging is the genetically programmed decline in collagen, elastin, and cellular repair capabilities over time."
    },
    {
      "id": "i_18",
      "question": "Which statement about benzoyl peroxide is true?",
      "options": [
        "It is a gentle hydrating serum",
        "It introduces oxygen into pores to kill P. acnes bacteria",
        "It is an oral antibiotic",
        "It causes skin to tan instantly"
      ],
      "correctIndex": 1,
      "explanation": "Benzoyl peroxide is highly effective against acne because it oxygenates the pore, creating an environment where anaerobic bacteria cannot survive."
    },
    {
      "id": "i_19",
      "question": "What is the acid mantle?",
      "options": [
        "A protective, slightly acidic film on the surface of human skin",
        "A severe chemical burn",
        "The outermost layer of hair",
        "A type of heavy cream"
      ],
      "correctIndex": 0,
      "explanation": "The acid mantle is a very fine, slightly acidic (pH 4.5-5.5) film on the skin made of sebum and sweat that inhibits bacterial growth."
    },
    {
      "id": "i_20",
      "question": "What differentiates a nodule from a regular papule?",
      "options": [
        "Nodules are smaller and painless",
        "Nodules are large, solid, painful lumps deep within the skin",
        "Nodules are filled with clear fluid",
        "Nodules only appear on the scalp"
      ],
      "correctIndex": 1,
      "explanation": "Nodules are severe acne lesions that form deep in the skin, are often painful, and have a high risk of scarring."
    },
    {
      "id": "i_21",
      "question": "What does a comedolytic agent do?",
      "options": [
        "Causes comedones (clogs pores)",
        "Dissolves and prevents the formation of comedones",
        "Adds pigment to the skin",
        "Removes facial hair"
      ],
      "correctIndex": 1,
      "explanation": "Comedolytics (like salicylic acid or retinoids) help to unclog pores and prevent dead skin and oil from forming comedones."
    },
    {
      "id": "i_22",
      "question": "Which of the following is a common trigger for eczema flare-ups?",
      "options": [
        "Drinking 8 glasses of water",
        "Using harsh soaps or detergents",
        "Applying fragrance-free moisturizer",
        "Sleeping in a cool room"
      ],
      "correctIndex": 1,
      "explanation": "Harsh soaps strip the skin's already compromised barrier in eczema patients, leading to severe flare-ups."
    },
    {
      "id": "i_23",
      "question": "What is keratosis pilaris?",
      "options": [
        "A viral wart",
        "A harmless condition causing small, hard bumps usually on the upper arms or thighs",
        "A severe skin infection",
        "Loss of skin pigment"
      ],
      "correctIndex": 1,
      "explanation": "Often called 'chicken skin', KP occurs when keratin forms hard plugs within the hair follicles."
    },
    {
      "id": "i_24",
      "question": "Why are antioxidants beneficial in skincare?",
      "options": [
        "They provide SPF 50 protection",
        "They neutralize free radicals caused by UV and pollution",
        "They permanently stop aging",
        "They bleach the skin"
      ],
      "correctIndex": 1,
      "explanation": "Antioxidants (like Vitamin C or E) donate electrons to unstable free radicals, preventing them from damaging cellular DNA."
    },
    {
      "id": "i_25",
      "question": "Which skin condition is characterized by rapid buildup of skin cells into thick, silvery scales?",
      "options": [
        "Psoriasis",
        "Vitiligo",
        "Acne Vulgaris",
        "Rosacea"
      ],
      "correctIndex": 0,
      "explanation": "Psoriasis is an autoimmune condition that vastly accelerates the skin cell lifecycle, causing scaling and inflammation."
    },
    {
      "id": "i_26",
      "question": "What is the typical pH level of healthy human skin?",
      "options": [
        "pH 1.0 - 2.0 (Highly acidic)",
        "pH 4.5 - 5.5 (Slightly acidic)",
        "pH 7.0 (Neutral)",
        "pH 9.0 - 10.0 (Alkaline)"
      ],
      "correctIndex": 1,
      "explanation": "Healthy skin is slightly acidic, which is essential for barrier function and keeping opportunistic pathogens at bay."
    },
    {
      "id": "i_27",
      "question": "What is the main function of elastin fibers in the dermis?",
      "options": [
        "To give skin its structural strength",
        "To allow skin to stretch and snap back to its original shape",
        "To produce sweat",
        "To carry oxygen"
      ],
      "correctIndex": 1,
      "explanation": "While collagen provides rigidity and strength, elastin provides elasticity and resilience."
    },
    {
      "id": "i_28",
      "question": "Which of the following is an Alpha Hydroxy Acid (AHA)?",
      "options": [
        "Salicylic acid",
        "Hyaluronic acid",
        "Glycolic acid",
        "Ascorbic acid"
      ],
      "correctIndex": 2,
      "explanation": "Glycolic acid is a water-soluble AHA derived from sugar cane, excellent for surface exfoliation."
    },
    {
      "id": "i_29",
      "question": "What happens if you use a high-pH (alkaline) soap on the face?",
      "options": [
        "It balances the skin perfectly",
        "It strips the acid mantle and can cause dryness and bacterial overgrowth",
        "It turns into a serum",
        "It protects against the sun"
      ],
      "correctIndex": 1,
      "explanation": "Alkaline soaps disrupt the naturally acidic barrier, leading to moisture loss and increased susceptibility to infection."
    },
    {
      "id": "i_30",
      "question": "What is melasma?",
      "options": [
        "A form of skin cancer",
        "Symmetrical brown patches on the face often triggered by hormones and UV",
        "A bacterial infection",
        "Complete loss of pigment"
      ],
      "correctIndex": 1,
      "explanation": "Often called the 'mask of pregnancy', melasma is a form of hyperpigmentation heavily influenced by hormonal changes."
    },
    {
      "id": "i_31",
      "question": "Which layer of the skin contains hair follicles and sweat glands?",
      "options": [
        "Epidermis",
        "Dermis",
        "Subcutaneous (Hypodermis)",
        "Stratum corneum"
      ],
      "correctIndex": 1,
      "explanation": "The dermis is the thick middle layer that houses blood vessels, nerves, hair follicles, and sweat glands."
    },
    {
      "id": "i_32",
      "question": "What is the primary benefit of Vitamin E in skincare?",
      "options": [
        "It is a powerful physical exfoliant",
        "It is an antioxidant that helps nourish and protect the skin barrier",
        "It stops oil production completely",
        "It instantly cures acne"
      ],
      "correctIndex": 1,
      "explanation": "Vitamin E is a fat-soluble antioxidant often paired with Vitamin C to stabilize it and enhance photoprotection."
    },
    {
      "id": "i_33",
      "question": "What is seborrheic dermatitis?",
      "options": [
        "A viral skin wart",
        "A condition causing flaky scales, often on the scalp (dandruff) or oily facial areas",
        "A third-degree burn",
        "Severe cystic acne"
      ],
      "correctIndex": 1,
      "explanation": "Seborrheic dermatitis is an inflammatory condition linked to an overgrowth of Malassezia yeast in sebum-rich areas."
    },
    {
      "id": "i_34",
      "question": "What does the term 'photosensitizing' mean?",
      "options": [
        "Making the skin glow in the dark",
        "Making the skin more susceptible to UV damage and sunburn",
        "A product that requires light to work",
        "Taking photographs of skin"
      ],
      "correctIndex": 1,
      "explanation": "Photosensitizing ingredients (like AHA or certain antibiotics) lower the skin's natural defense against UV rays."
    },
    {
      "id": "i_35",
      "question": "Which of these is the gentlest form of chemical exfoliation?",
      "options": [
        "Glycolic Acid",
        "Salicylic Acid",
        "Polyhydroxy Acids (PHAs)",
        "TCA Peel"
      ],
      "correctIndex": 2,
      "explanation": "PHAs have larger molecular structures than AHAs, meaning they penetrate the skin slower and cause less irritation."
    },
    {
      "id": "i_36",
      "question": "What is 'slugging' in skincare?",
      "options": [
        "Applying snail mucin",
        "Coating the face in a heavy occlusive (like Vaseline) overnight to prevent water loss",
        "Moving very slowly",
        "Skipping a skincare routine"
      ],
      "correctIndex": 1,
      "explanation": "Slugging traps moisture and active ingredients in the skin overnight, highly effective for dry skin."
    },
    {
      "id": "i_37",
      "question": "What does a 'broad-spectrum' sunscreen protect against?",
      "options": [
        "Only UVA",
        "Only UVB",
        "Both UVA and UVB",
        "Infrared light only"
      ],
      "correctIndex": 2,
      "explanation": "Broad-spectrum must legally prove it provides proportional protection against both burning (UVB) and aging (UVA) rays."
    },
    {
      "id": "i_38",
      "question": "Which skin condition involves the immune system attacking melanocytes?",
      "options": [
        "Rosacea",
        "Melasma",
        "Vitiligo",
        "Eczema"
      ],
      "correctIndex": 2,
      "explanation": "Vitiligo is an autoimmune condition where the cells that produce pigment (melanocytes) are destroyed, causing white patches."
    },
    {
      "id": "i_39",
      "question": "What is the function of the sebaceous gland?",
      "options": [
        "To produce sweat",
        "To produce sebum (oil) to lubricate the skin and hair",
        "To produce melanin",
        "To sense touch"
      ],
      "correctIndex": 1,
      "explanation": "Sebaceous glands are attached to hair follicles and secrete sebum to keep the skin barrier waterproof and lubricated."
    },
    {
      "id": "i_40",
      "question": "What is an emollient?",
      "options": [
        "An ingredient that fills in the cracks between cells to smooth and soften the skin",
        "A strong acid",
        "A physical sunblock",
        "A type of acne"
      ],
      "correctIndex": 0,
      "explanation": "Emollients (like ceramides, plant oils, and squalane) soften the skin by filling gaps in the skin barrier."
    },
    {
      "id": "i_41",
      "question": "How do peptides work in skincare?",
      "options": [
        "They bleach the skin",
        "They act as building blocks to signal the skin to produce more collagen and elastin",
        "They physically scrape off dead skin",
        "They paralyze facial muscles instantly"
      ],
      "correctIndex": 1,
      "explanation": "Peptides are short chains of amino acids that can penetrate the top layer of the skin and send signals to cells to regenerate."
    },
    {
      "id": "i_42",
      "question": "What is the difference between dry and dehydrated skin?",
      "options": [
        "They are exactly the same",
        "Dry skin lacks oil; dehydrated skin lacks water",
        "Dry skin lacks water; dehydrated skin lacks oil",
        "Dry skin is a disease; dehydrated skin is a myth"
      ],
      "correctIndex": 1,
      "explanation": "Dry skin is a genetic skin type lacking sebum, while dehydrated skin is a temporary condition lacking water content."
    },
    {
      "id": "i_43",
      "question": "What is the risk of popping a deep cystic pimple?",
      "options": [
        "It cures the acne instantly",
        "It can rupture the follicle beneath the skin, causing severe inflammation and scarring",
        "It turns into a blackhead",
        "Nothing happens"
      ],
      "correctIndex": 1,
      "explanation": "Squeezing a cyst often forces the infected material deeper into the dermis, severely worsening the infection."
    },
    {
      "id": "i_44",
      "question": "Which of these ingredients is primarily used to control excess sebum?",
      "options": [
        "Shea butter",
        "Niacinamide",
        "Petrolatum",
        "Olive oil"
      ],
      "correctIndex": 1,
      "explanation": "Niacinamide has been clinically shown to help regulate and reduce sebum production in oily skin types."
    },
    {
      "id": "i_45",
      "question": "What is a 'chemical peel'?",
      "options": [
        "Peeling skin off with a knife",
        "Applying an acidic solution to remove the outermost layers of skin",
        "Eating fruit peels",
        "Using a mask that hardens and is peeled off"
      ],
      "correctIndex": 1,
      "explanation": "Chemical peels use AHAs, BHAs, or TCA at high concentrations to chemically dissolve bonds between dead skin cells."
    },
    {
      "id": "i_46",
      "question": "Why is it important to use sunscreen when using AHAs?",
      "options": [
        "AHAs make sunscreen smell better",
        "AHAs remove the protective top layer of dead skin, increasing UV sensitivity",
        "AHAs are destroyed by sunscreen",
        "It isn't important"
      ],
      "correctIndex": 1,
      "explanation": "Chemical exfoliation exposes fresh, vulnerable skin cells, making the skin highly susceptible to severe sunburns."
    },
    {
      "id": "i_47",
      "question": "What is a common sign of a compromised skin barrier?",
      "options": [
        "Poreless appearance",
        "Stinging or burning when applying mild products",
        "Immediate tanning",
        "Zero oil production"
      ],
      "correctIndex": 1,
      "explanation": "A damaged barrier allows irritants to penetrate easily, causing stinging, redness, and rapid moisture loss."
    },
    {
      "id": "i_48",
      "question": "What is the primary cause of dandruff?",
      "options": [
        "Poor hygiene",
        "An overgrowth of Malassezia yeast feeding on scalp oils",
        "Washing hair too often",
        "Using too much conditioner"
      ],
      "correctIndex": 1,
      "explanation": "Dandruff is a mild form of seborrheic dermatitis triggered by an individual's inflammatory response to the Malassezia fungus."
    },
    {
      "id": "i_49",
      "question": "What does a 'comedogenic rating' indicate?",
      "options": [
        "How well a product protects against the sun",
        "The likelihood of an ingredient clogging pores",
        "The pH level of a product",
        "The price of the product"
      ],
      "correctIndex": 1,
      "explanation": "The scale (usually 0 to 5) indicates how likely an ingredient is to cause comedones (clogged pores), though it varies by individual."
    },
    {
      "id": "i_50",
      "question": "Which of the following describes 'milia'?",
      "options": [
        "Large infected cysts",
        "Tiny, hard white bumps containing trapped keratin, often around the eyes",
        "Brown sun spots",
        "Open blackheads"
      ],
      "correctIndex": 1,
      "explanation": "Milia are small epidermoid cysts filled with keratin, not sebum, and cannot be extracted like a normal pimple."
    }
  ],
  "advanced": [
    {
      "id": "a_01",
      "question": "Which layer of the epidermis is responsible for the continuous proliferation of keratinocytes?",
      "options": [
        "Stratum corneum",
        "Stratum granulosum",
        "Stratum basale",
        "Stratum lucidum"
      ],
      "correctIndex": 2,
      "explanation": "The stratum basale is the deepest layer of the epidermis and contains stem cells that continuously divide to form new keratinocytes."
    },
    {
      "id": "a_02",
      "question": "What is the primary mechanism of action of topical retinoids at the cellular level?",
      "options": [
        "They physically abrade the stratum corneum",
        "They bind to RAR and RXR nuclear receptors to modulate gene transcription",
        "They act as broad-spectrum antibiotics",
        "They permanently destroy sebaceous glands"
      ],
      "correctIndex": 1,
      "explanation": "Retinoids enter the cell and bind to Retinoic Acid Receptors (RAR) and Retinoid X Receptors (RXR), which then interact with DNA to regulate cell proliferation and differentiation."
    },
    {
      "id": "a_03",
      "question": "Which of the following defines 'Acanthosis Nigricans'?",
      "options": [
        "A viral skin infection causing severe blistering",
        "A hyperpigmented, velvety thickening of the skin folds often associated with insulin resistance",
        "A form of melanoma",
        "A genetic inability to produce melanin"
      ],
      "correctIndex": 1,
      "explanation": "Acanthosis Nigricans typically presents on the neck or axillae and serves as a crucial cutaneous marker for systemic issues like hyperinsulinemia."
    },
    {
      "id": "a_04",
      "question": "What differentiates a macule from a papule in dermatological terminology?",
      "options": [
        "A macule is fluid-filled; a papule is solid",
        "A macule is flat and non-palpable; a papule is elevated and palpable",
        "A macule is greater than 1cm; a papule is less than 1cm",
        "A macule is always red; a papule is always white"
      ],
      "correctIndex": 1,
      "explanation": "Macules are flat color changes (like freckles), whereas papules are small, solid, raised lesions."
    },
    {
      "id": "a_05",
      "question": "In the context of melanoma, what does the 'E' in the ABCDE rule stand for?",
      "options": [
        "Elevation",
        "Erythema",
        "Evolution",
        "Epidermis"
      ],
      "correctIndex": 2,
      "explanation": "Evolution (or change in size, shape, color, or elevation over time) is a critical warning sign of malignant melanoma."
    },
    {
      "id": "a_06",
      "question": "Which autoantibodies are primarily associated with Pemphigus Vulgaris?",
      "options": [
        "Anti-nuclear antibodies (ANA)",
        "Anti-desmoglein 1 and 3",
        "Anti-hemidesmosome",
        "Anti-transglutaminase"
      ],
      "correctIndex": 1,
      "explanation": "Pemphigus Vulgaris is an autoimmune blistering disease caused by autoantibodies attacking desmoglein 1 and 3, breaking the bonds between keratinocytes."
    },
    {
      "id": "a_07",
      "question": "What is the primary pathophysiological driver of Hidradenitis Suppurativa?",
      "options": [
        "Bacterial infection of the apocrine glands",
        "Follicular hyperkeratosis leading to occlusion and subsequent rupture",
        "Overproduction of sebum",
        "An allergic reaction to deodorant"
      ],
      "correctIndex": 1,
      "explanation": "HS is primarily a disorder of follicular occlusion (keratin plugging the hair follicle), rather than an infectious or apocrine gland disorder."
    },
    {
      "id": "a_08",
      "question": "Which enzyme converts testosterone to dihydrotestosterone (DHT), contributing to androgenetic alopecia?",
      "options": [
        "Tyrosinase",
        "5-alpha-reductase",
        "Cyclooxygenase",
        "Aromatase"
      ],
      "correctIndex": 1,
      "explanation": "5-alpha-reductase is the enzyme responsible for converting testosterone into the highly potent androgen DHT, which miniaturizes hair follicles."
    },
    {
      "id": "a_09",
      "question": "What is the classic histological finding in a patient with Celiac Disease presenting with Dermatitis Herpetiformis?",
      "options": [
        "IgG deposition at the basement membrane",
        "IgA deposition in the dermal papillae",
        "Massive eosinophil infiltration",
        "Destruction of melanocytes"
      ],
      "correctIndex": 1,
      "explanation": "Dermatitis Herpetiformis is characterized by granular IgA deposits in the tips of the dermal papillae, linked strongly to gluten sensitivity."
    },
    {
      "id": "a_10",
      "question": "Which form of UV radiation is most responsible for photoaging due to its ability to penetrate deeply into the dermis and degrade collagen?",
      "options": [
        "UVC",
        "UVB",
        "UVA",
        "Visible light"
      ],
      "correctIndex": 2,
      "explanation": "UVA has a longer wavelength (320-400nm) than UVB, allowing it to penetrate deeply into the dermis, generating ROS and activating matrix metalloproteinases that destroy collagen."
    },
    {
      "id": "a_11",
      "question": "What is 'Koebner Phenomenon'?",
      "options": [
        "Skin turning blue under cold stress",
        "The appearance of new skin lesions on previously unaffected skin secondary to trauma",
        "Rapid loss of hair following extreme stress",
        "A false positive patch test"
      ],
      "correctIndex": 1,
      "explanation": "The Koebner phenomenon is classically seen in psoriasis, vitiligo, and lichen planus, where physical trauma to healthy skin induces a new disease lesion."
    },
    {
      "id": "a_12",
      "question": "Which medication is a known trigger for drug-induced lupus erythematosus (DILE)?",
      "options": [
        "Isotretinoin",
        "Hydralazine",
        "Aspirin",
        "Penicillin"
      ],
      "correctIndex": 1,
      "explanation": "Hydralazine, procainamide, and isoniazid are classic culprits for drug-induced lupus, which often presents with anti-histone antibodies."
    },
    {
      "id": "a_13",
      "question": "What characterizes a 'Basal Cell Carcinoma' (BCC) clinically and histologically?",
      "options": [
        "Rapidly metastasizing black plaques",
        "Pearly, translucent papules with telangiectasias; histologically shows peripheral palisading",
        "Scaly, hyperkeratotic plaques on sun-exposed areas",
        "Autoimmune destruction of basal cells"
      ],
      "correctIndex": 1,
      "explanation": "BCCs are the most common skin cancer, rarely metastasize, and classically present as pearly papules with arborizing telangiectasias and peripheral palisading of cells."
    },
    {
      "id": "a_14",
      "question": "Which layer of the skin is completely absent in thin skin but present in the thick skin of the palms and soles?",
      "options": [
        "Stratum corneum",
        "Stratum granulosum",
        "Stratum lucidum",
        "Stratum spinosum"
      ],
      "correctIndex": 2,
      "explanation": "The stratum lucidum is a thin, clear layer of dead skin cells unique to the thick epidermis found on the palms of the hands and soles of the feet."
    },
    {
      "id": "a_15",
      "question": "What is the primary vector for Lyme disease, which presents with the classic 'Erythema migrans' rash?",
      "options": [
        "Aedes aegypti mosquito",
        "Sarcoptes scabiei",
        "Ixodes tick",
        "Pediculus humanus"
      ],
      "correctIndex": 2,
      "explanation": "Lyme disease is caused by the spirochete Borrelia burgdorferi, transmitted by the bite of infected Ixodes (black-legged) ticks."
    },
    {
      "id": "a_16",
      "question": "Which condition is characterized by a 'herald patch' followed by a 'Christmas tree' distribution of smaller scaly plaques?",
      "options": [
        "Psoriasis",
        "Pityriasis Rosea",
        "Tinea Corporis",
        "Secondary Syphilis"
      ],
      "correctIndex": 1,
      "explanation": "Pityriasis Rosea is a self-limiting papulosquamous eruption that typically begins with a single, large herald patch followed by a widespread eruption along the skin's cleavage lines."
    },
    {
      "id": "a_17",
      "question": "What is the mechanism of action of Spironolactone when used off-label for female pattern acne?",
      "options": [
        "It acts as a potent bactericidal agent against P. acnes",
        "It acts as an androgen receptor antagonist, reducing sebum production",
        "It dramatically increases cell turnover",
        "It completely suppresses cortisol production"
      ],
      "correctIndex": 1,
      "explanation": "Spironolactone blocks androgen receptors and inhibits 5-alpha-reductase, significantly reducing the androgen-driven sebum production that fuels hormonal acne."
    },
    {
      "id": "a_18",
      "question": "Which structural protein is defective in Epidermolysis Bullosa Simplex?",
      "options": [
        "Collagen VII",
        "Laminin 332",
        "Keratin 5 or 14",
        "Desmoglein 1"
      ],
      "correctIndex": 2,
      "explanation": "EBS is a genetic blistering disorder caused by mutations in the genes encoding Keratin 5 or 14, leading to fragility in the basal layer of the epidermis."
    },
    {
      "id": "a_19",
      "question": "In Mohs micrographic surgery, what is the primary advantage over standard surgical excision?",
      "options": [
        "It does not require anesthesia",
        "It allows for 100% intraoperative margin control with maximal tissue conservation",
        "It uses lasers instead of scalpels",
        "It completely guarantees no scarring"
      ],
      "correctIndex": 1,
      "explanation": "Mohs surgery involves removing tissue layer by layer and examining it immediately under a microscope, ensuring clear margins while sparing healthy tissue."
    },
    {
      "id": "a_20",
      "question": "What is 'Tinea Versicolor' (Pityriasis Versicolor) caused by?",
      "options": [
        "A dermatophyte infection (Trichophyton)",
        "Overgrowth of the lipophilic yeast Malassezia",
        "A viral infection (HPV)",
        "An autoimmune reaction"
      ],
      "correctIndex": 1,
      "explanation": "Tinea Versicolor is a common superficial fungal infection caused by Malassezia transitioning to its pathogenic mycelial form, leading to hypo- or hyperpigmented macules."
    },
    {
      "id": "a_21",
      "question": "Which of the following is a classic dermatoscopic finding of a melanoma?",
      "options": [
        "Comedo-like openings",
        "Atypical pigment network and blue-white veil",
        "Leaf-like areas",
        "Central white patch with hairpin vessels"
      ],
      "correctIndex": 1,
      "explanation": "An atypical pigment network, irregular dots/globules, and a blue-white veil are hallmark dermatoscopic criteria indicating malignant melanoma."
    },
    {
      "id": "a_22",
      "question": "What does a positive Nikolsky sign indicate?",
      "options": [
        "Immediate blanching of a lesion upon pressure",
        "The epidermis easily sloughs off when lateral pressure is applied to clinically normal skin",
        "A rash turns white when exposed to cold",
        "Hair falls out painlessly when pulled lightly"
      ],
      "correctIndex": 1,
      "explanation": "A positive Nikolsky sign indicates poor intraepidermal cohesion (e.g., in Pemphigus Vulgaris or Staphylococcal Scalded Skin Syndrome)."
    },
    {
      "id": "a_23",
      "question": "Which medication requires strict enrollment in the iPLEDGE program due to severe teratogenicity?",
      "options": [
        "Doxycycline",
        "Methotrexate",
        "Isotretinoin",
        "Cyclosporine"
      ],
      "correctIndex": 2,
      "explanation": "Isotretinoin is highly teratogenic. In the US, the iPLEDGE risk management program strictly controls its distribution to prevent fetal exposure."
    },
    {
      "id": "a_24",
      "question": "What characterizes 'Lichen Planus'?",
      "options": [
        "Pruritic, purple, polygonal, planar papules and plaques (the 6 Ps)",
        "Large, tense bullae on the extremities",
        "Widespread targetoid lesions",
        "Hypopigmented macules with fine scale"
      ],
      "correctIndex": 0,
      "explanation": "Lichen planus is classically described by the '6 Ps'. It frequently involves the wrists, ankles, and oral mucosa (Wickham striae)."
    },
    {
      "id": "a_25",
      "question": "Which genetic mutation is present in about 50% of melanomas?",
      "options": [
        "BRCA1",
        "BRAF V600E",
        "p53",
        "APC"
      ],
      "correctIndex": 1,
      "explanation": "The BRAF V600E mutation leads to constitutive activation of the MAPK pathway, driving cellular proliferation in many melanomas."
    },
    {
      "id": "a_26",
      "question": "What is the pathophysiology of 'Urticaria' (Hives)?",
      "options": [
        "Mast cell degranulation releasing histamine, causing dermal edema",
        "Autoimmune destruction of desmosomes",
        "Fungal infection of the stratum corneum",
        "Keratin plugging of the hair follicle"
      ],
      "correctIndex": 0,
      "explanation": "Urticaria is a vascular reaction of the skin characterized by wheals, primarily driven by mast cells releasing histamine and other vasoactive mediators."
    },
    {
      "id": "a_27",
      "question": "Which systemic condition is strongly associated with Pyoderma Gangrenosum?",
      "options": [
        "Inflammatory Bowel Disease (IBD)",
        "Celiac Disease",
        "Type 1 Diabetes",
        "Hypothyroidism"
      ],
      "correctIndex": 0,
      "explanation": "Pyoderma Gangrenosum is a neutrophilic dermatosis that causes rapidly progressive, painful ulcers, often associated with IBD (Crohn's or Ulcerative Colitis) or rheumatoid arthritis."
    },
    {
      "id": "a_28",
      "question": "What is the defining feature of 'Mycosis Fungoides'?",
      "options": [
        "A severe systemic fungal infection",
        "The most common form of Cutaneous T-Cell Lymphoma (CTCL)",
        "A bacterial infection of the nail bed",
        "A benign overgrowth of melanocytes"
      ],
      "correctIndex": 1,
      "explanation": "Despite the name, Mycosis Fungoides is not fungal. It is a slow-growing non-Hodgkin lymphoma of T-cells that primarily affects the skin."
    },
    {
      "id": "a_29",
      "question": "Which diagnostic test uses a Wood's lamp to detect certain fungal or bacterial infections?",
      "options": [
        "Dermoscopy",
        "Ultraviolet (UV) light examination",
        "KOH prep",
        "Tzanck smear"
      ],
      "correctIndex": 1,
      "explanation": "A Wood's lamp emits long-wave UVA light. Certain organisms fluoresce under it (e.g., Corynebacterium minutissimum fluoresces coral-red)."
    },
    {
      "id": "a_30",
      "question": "What does a Tzanck smear primarily test for?",
      "options": [
        "Fungal hyphae",
        "Multinucleated giant cells indicative of Herpes Simplex or Varicella Zoster virus",
        "Bacterial spores",
        "Malignant melanoma cells"
      ],
      "correctIndex": 1,
      "explanation": "A Tzanck smear involves scraping the base of a fresh blister. The presence of multinucleated giant cells confirms a herpesvirus infection."
    },
    {
      "id": "a_31",
      "question": "Which condition is characterized by a 'target' or 'iris' lesion and is often triggered by HSV infection?",
      "options": [
        "Erythema Multiforme",
        "Erythema Nodosum",
        "Erythema Migrans",
        "Erythema Toxicum"
      ],
      "correctIndex": 0,
      "explanation": "Erythema Multiforme classically presents with targetoid lesions, predominantly on the extremities, and is most frequently triggered by Herpes Simplex Virus."
    },
    {
      "id": "a_32",
      "question": "What is the primary defect in Ichthyosis Vulgaris?",
      "options": [
        "A mutation in the filaggrin gene (FLG)",
        "A defect in type VII collagen",
        "Autoantibodies against desmoglein",
        "Overproduction of sebum"
      ],
      "correctIndex": 0,
      "explanation": "Ichthyosis vulgaris is the most common inherited disorder of keratinization, caused by loss-of-function mutations in the filaggrin gene, leading to defective barrier function and scaling."
    },
    {
      "id": "a_33",
      "question": "Which of the following describes 'Telogen Effluvium'?",
      "options": [
        "Permanent scarring hair loss",
        "Autoimmune patchy hair loss",
        "A diffuse, non-scarring hair shedding caused by a premature shift of follicles into the resting phase",
        "A fungal infection of the hair shaft"
      ],
      "correctIndex": 2,
      "explanation": "Telogen effluvium is typically triggered by severe stress, illness, or hormonal changes, forcing an abnormally large number of hairs into the telogen (shedding) phase."
    },
    {
      "id": "a_34",
      "question": "What is the mechanism of action of Calcineurin inhibitors (like Tacrolimus) in treating atopic dermatitis?",
      "options": [
        "They thin the stratum corneum",
        "They block T-cell activation and inflammatory cytokine release",
        "They act as broad-spectrum antifungals",
        "They permanently destroy sweat glands"
      ],
      "correctIndex": 1,
      "explanation": "Topical calcineurin inhibitors provide non-steroidal anti-inflammatory effects by inhibiting calcineurin, thereby preventing T-cell activation and the production of IL-2."
    },
    {
      "id": "a_35",
      "question": "Which condition typically presents with painful, tender, red nodules on the anterior shins?",
      "options": [
        "Erythema Nodosum",
        "Pretibial Myxedema",
        "Stasis Dermatitis",
        "Necrobiosis Lipoidica"
      ],
      "correctIndex": 0,
      "explanation": "Erythema nodosum is a form of panniculitis (inflammation of subcutaneous fat) that classically presents as tender red nodules on the shins, often reacting to infections, drugs, or systemic disease."
    },
    {
      "id": "a_36",
      "question": "What is 'Xeroderma Pigmentosum'?",
      "options": [
        "A mild form of dry skin",
        "A rare autosomal recessive disorder characterized by a severe defect in nucleotide excision repair of UV-induced DNA damage",
        "A localized loss of pigmentation",
        "A fungal infection causing dark spots"
      ],
      "correctIndex": 1,
      "explanation": "Patients with XP are extremely sensitive to UV light, leading to severe sunburns, heavy freckling, and a massively increased risk of skin cancers at a young age."
    },
    {
      "id": "a_37",
      "question": "Which organism is the most common cause of 'Hot Tub Folliculitis'?",
      "options": [
        "Staphylococcus aureus",
        "Streptococcus pyogenes",
        "Pseudomonas aeruginosa",
        "Candida albicans"
      ],
      "correctIndex": 2,
      "explanation": "Pseudomonas aeruginosa thrives in warm, wet environments like poorly chlorinated hot tubs, causing an itchy, papulopustular rash typically in areas covered by a swimsuit."
    },
    {
      "id": "a_38",
      "question": "What is the Fitzpatrick Skin Typing system primarily used to determine?",
      "options": [
        "A patient's risk of developing acne",
        "The skin's constitutional response to UV radiation and risk of burning vs tanning",
        "The skin's exact pH level",
        "The severity of a psoriasis flare"
      ],
      "correctIndex": 1,
      "explanation": "The Fitzpatrick scale (Types I-VI) is a numerical classification schema for human skin color that estimates the response of different types of skin to ultraviolet light."
    },
    {
      "id": "a_39",
      "question": "Which condition is known as a 'cutaneous T-cell lymphoma' variant that presents with erythroderma and leukemic involvement?",
      "options": [
        "Kaposi Sarcoma",
        "Sézary Syndrome",
        "Bowen's Disease",
        "Paget's Disease of the Breast"
      ],
      "correctIndex": 1,
      "explanation": "Sézary Syndrome is an aggressive leukemic variant of CTCL characterized by the triad of erythroderma, generalized lymphadenopathy, and clonal T-cells (Sézary cells) in the blood."
    },
    {
      "id": "a_40",
      "question": "What is the hallmark histologic finding of 'Molluscum Contagiosum'?",
      "options": [
        "Henderson-Paterson bodies (large intracytoplasmic inclusion bodies)",
        "Kogoj spongiform pustules",
        "Munro microabscesses",
        "Civatte bodies"
      ],
      "correctIndex": 0,
      "explanation": "Molluscum contagiosum (caused by a poxvirus) is identified histologically by large, eosinophilic intracytoplasmic inclusion bodies pushing the host cell nucleus to the periphery."
    },
    {
      "id": "a_41",
      "question": "Which medication is an FDA-approved biologic targeting IL-4 and IL-13 receptor alpha for severe atopic dermatitis?",
      "options": [
        "Adalimumab",
        "Dupilumab",
        "Ustekinumab",
        "Secukinumab"
      ],
      "correctIndex": 1,
      "explanation": "Dupilumab is a monoclonal antibody that inhibits interleukin-4 (IL-4) and interleukin-13 (IL-13) signaling, which are key drivers of Type 2 inflammation in atopic dermatitis."
    },
    {
      "id": "a_42",
      "question": "What defines 'Stevens-Johnson Syndrome' (SJS) compared to 'Toxic Epidermal Necrolysis' (TEN)?",
      "options": [
        "SJS involves >30% body surface area detachment; TEN involves <10%",
        "SJS involves <10% body surface area detachment; TEN involves >30%",
        "SJS only affects children; TEN only affects adults",
        "SJS is caused by viruses; TEN is caused by bacteria"
      ],
      "correctIndex": 1,
      "explanation": "SJS and TEN are on a spectrum of severe mucocutaneous drug reactions. SJS involves less than 10% BSA detachment, while TEN involves greater than 30%."
    },
    {
      "id": "a_43",
      "question": "Which clinical sign involves pinpoint bleeding after the removal of a scale, classically seen in psoriasis?",
      "options": [
        "Darier sign",
        "Auspitz sign",
        "Nikolsky sign",
        "Crowe sign"
      ],
      "correctIndex": 1,
      "explanation": "Auspitz sign occurs because psoriasis features thinning of the epidermis over the dermal papillae, which contain dilated, tortuous capillaries that bleed easily when the scale is peeled."
    },
    {
      "id": "a_44",
      "question": "What is the primary target of autoantibodies in Bullous Pemphigoid?",
      "options": [
        "Desmoglein 1",
        "Desmoglein 3",
        "Hemidesmosomal proteins (BP180 and BP230)",
        "Type VII collagen"
      ],
      "correctIndex": 2,
      "explanation": "Bullous Pemphigoid autoantibodies target BP180 and BP230 in the hemidesmosomes, causing subepidermal blistering that is typically tense (unlike the flaccid blisters of pemphigus)."
    },
    {
      "id": "a_45",
      "question": "Which systemic disease is strongly correlated with 'Necrobiosis Lipoidica'?",
      "options": [
        "Diabetes Mellitus",
        "Hypertension",
        "Systemic Lupus Erythematosus",
        "Rheumatoid Arthritis"
      ],
      "correctIndex": 0,
      "explanation": "Necrobiosis Lipoidica presents as yellow-brown, atrophic, telangiectatic plaques on the shins and is classically associated with diabetes, though it can occur in non-diabetics."
    },
    {
      "id": "a_46",
      "question": "What does a KOH preparation specifically identify?",
      "options": [
        "Bacterial cell wall type (Gram positive vs negative)",
        "Fungal hyphae and spores (by dissolving keratin)",
        "Viral inclusion bodies",
        "Malignant melanocytes"
      ],
      "correctIndex": 1,
      "explanation": "Potassium hydroxide (KOH) dissolves the keratin of epidermal cells, leaving fungal elements intact and visible under a microscope."
    },
    {
      "id": "a_47",
      "question": "Which term describes a thickened, leathery, and hyperpigmented state of the skin caused by chronic scratching?",
      "options": [
        "Excoriation",
        "Lichenification",
        "Maceration",
        "Induration"
      ],
      "correctIndex": 1,
      "explanation": "Lichenification is the skin's response to chronic friction or scratching, resulting in thickened skin with accentuated markings."
    },
    {
      "id": "a_48",
      "question": "What is the pathogenesis of 'Albinism'?",
      "options": [
        "A complete lack of melanocytes in the epidermis",
        "Normal melanocyte count, but defective melanin synthesis (often tyrosinase deficiency)",
        "Autoimmune destruction of melanocytes",
        "Overproduction of defective melanin"
      ],
      "correctIndex": 1,
      "explanation": "In most forms of oculocutaneous albinism, the number of melanocytes is completely normal, but a genetic mutation (e.g., in the tyrosinase gene) prevents them from synthesizing melanin."
    },
    {
      "id": "a_49",
      "question": "Which finding is pathognomonic for Scabies on a physical exam?",
      "options": [
        "Targetoid lesions",
        "Burrows (small, thread-like grey/white lines)",
        "Large tense bullae",
        "Honey-colored crusts"
      ],
      "correctIndex": 1,
      "explanation": "The burrow is the hallmark lesion of a scabies infestation, representing the tunnel created by the female Sarcoptes scabiei mite as she lays eggs."
    },
    {
      "id": "a_50",
      "question": "What is the primary use of a 'Dermatoscope'?",
      "options": [
        "To surgically excise tumors",
        "To evaluate skin lesions in-vivo by eliminating surface reflection, allowing visualization of subsurface structures",
        "To measure the exact pH of the skin",
        "To deliver targeted UV radiation"
      ],
      "correctIndex": 1,
      "explanation": "A dermatoscope uses magnification and polarized (or liquid-interface) lighting to allow clinicians to see morphological features of melanocytic and non-melanocytic lesions not visible to the naked eye."
    }
  ]
};

export const DISEASES = [
  "Acne and Rosacea",
  "Actinic Keratosis and Malignant Lesions",
  "Atopic Dermatitis",
  "Bullous Disease",
  "Cellulitis and Bacterial Infections",
  "Eczema",
  "Exanthems and Drug Eruptions",
  "Hair Loss and Alopecia",
  "Herpes and STDs",
  "Light Diseases and Pigmentation Disorders",
  "Lupus and Connective Tissue Diseases",
  "Melanoma and Skin Cancer",
  "Nail Fungus and Nail Diseases",
  "Normal Skin",
  "Poison Ivy and Contact Dermatitis",
  "Psoriasis and Lichen Planus",
  "Scabies and Infestations",
  "Seborrheic Keratoses and Benign Tumors",
  "Systemic Disease",
  "Tinea and Fungal Infections",
  "Urticaria and Hives",
  "Vascular Tumors",
  "Vasculitis",
  "Viral Infections (Warts, Molluscum)"
];
