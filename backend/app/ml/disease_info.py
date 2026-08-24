"""
Disease Knowledge Base — First Aid, Precautions & Severity for all 24 classes.
"""

DISEASE_DATA = {
    "Acne and Rosacea": {
        "severity": "Mild to Moderate",
        "icon": "🔴",
        "first_aid": [
            "Wash the affected area gently with a mild, non-comedogenic cleanser twice daily",
            "Apply over-the-counter benzoyl peroxide (2.5–5%) or salicylic acid cream",
            "Use oil-free, non-comedogenic moisturizer and sunscreen (SPF 30+)",
            "Apply a cold compress to reduce redness and inflammation",
        ],
        "do": [
            "Keep your hands away from your face",
            "Change pillowcases frequently",
            "Stay hydrated and maintain a balanced diet",
            "Remove makeup before sleeping",
        ],
        "dont": [
            "Do NOT pop, squeeze, or pick at pimples — this causes scarring",
            "Avoid harsh scrubs or exfoliants on inflamed skin",
            "Avoid greasy or oily cosmetics",
            "Do not use multiple acne treatments simultaneously without medical advice",
        ],
        "see_doctor": "If acne is severe, cystic, leaving scars, or not improving after 6–8 weeks of OTC treatment.",
    },
    "Actinic Keratosis and Malignant Lesions": {
        "severity": "⚠️ High — Potentially Pre-cancerous",
        "icon": "🟠",
        "first_aid": [
            "Do NOT attempt to treat this at home — seek medical evaluation promptly",
            "Protect the area from further sun exposure immediately (cover with clothing)",
            "Apply broad-spectrum SPF 50+ sunscreen to all exposed skin",
            "Document the lesion: take clear photos to track any changes in size, shape, or color",
        ],
        "do": [
            "Schedule a dermatologist appointment as soon as possible",
            "Perform monthly self-examinations of your skin",
            "Wear protective clothing and wide-brimmed hats outdoors",
        ],
        "dont": [
            "Do NOT ignore new or changing lesions",
            "Do NOT scratch, pick, or try to remove the lesion yourself",
            "Avoid tanning beds and excessive sun exposure",
        ],
        "see_doctor": "IMMEDIATELY. Actinic keratosis can progress to squamous cell carcinoma. Early treatment is critical.",
    },
    "Atopic Dermatitis": {
        "severity": "Mild to Moderate",
        "icon": "🟡",
        "first_aid": [
            "Apply fragrance-free moisturizer or emollient cream generously (e.g., Cetaphil, Eucerin)",
            "Use a cold, damp cloth compress on itchy areas for 10–15 minutes",
            "Take an over-the-counter antihistamine (cetirizine/loratadine) to reduce itching",
            "Apply 1% hydrocortisone cream to inflamed patches for short-term relief (max 7 days)",
        ],
        "do": [
            "Moisturize immediately after bathing while skin is still damp",
            "Use lukewarm water for baths (not hot)",
            "Wear soft, breathable cotton clothing",
            "Identify and avoid personal triggers (dust, pollen, certain foods)",
        ],
        "dont": [
            "Do NOT scratch — trim fingernails short, consider cotton gloves at night",
            "Avoid harsh soaps, detergents, and fragranced products",
            "Avoid wool and synthetic fabrics against the skin",
            "Do not take excessively long or hot showers",
        ],
        "see_doctor": "If the rash spreads, weeps/oozes, becomes infected (pus, warmth), or doesn't respond to OTC treatments within 1–2 weeks.",
    },
    "Bullous Disease": {
        "severity": "⚠️ Moderate to High",
        "icon": "🟡",
        "first_aid": [
            "Do NOT pop or puncture blisters — they protect the skin underneath",
            "Cover intact blisters loosely with a sterile, non-stick bandage",
            "If a blister breaks, gently clean with mild soap and water, apply antibiotic ointment",
            "Keep the area clean and dry to prevent infection",
        ],
        "do": [
            "Change bandages daily and inspect for signs of infection",
            "Wear loose clothing to avoid friction on blisters",
            "Take over-the-counter pain relief (ibuprofen) if needed",
        ],
        "dont": [
            "Do NOT peel off the skin from broken blisters",
            "Avoid adhesive bandages directly on blisters",
            "Do not apply ice directly to blisters",
        ],
        "see_doctor": "Promptly. Bullous diseases (like pemphigus/pemphigoid) require medical diagnosis and often prescription treatment.",
    },
    "Cellulitis and Bacterial Infections": {
        "severity": "⚠️ High — Requires Medical Treatment",
        "icon": "🔴",
        "first_aid": [
            "Clean the affected area with mild soap and water",
            "Elevate the affected limb to reduce swelling",
            "Apply a cool, damp cloth to ease discomfort",
            "Mark the edges of the redness with a pen to monitor if it's spreading",
        ],
        "do": [
            "Seek medical attention within 24 hours — antibiotics are almost always needed",
            "Take the full course of prescribed antibiotics",
            "Rest and keep the area elevated",
        ],
        "dont": [
            "Do NOT delay treatment — cellulitis can spread rapidly and become life-threatening",
            "Do not apply creams or ointments without medical advice",
            "Avoid squeezing or draining any abscesses yourself",
        ],
        "see_doctor": "URGENTLY. Cellulitis requires prescription antibiotics. Go to ER if you have fever, red streaks spreading from the area, or rapid swelling.",
    },
    "Eczema": {
        "severity": "Mild to Moderate",
        "icon": "🟡",
        "first_aid": [
            "Apply a thick layer of fragrance-free moisturizer or petroleum jelly",
            "Use a cold compress or wet wrap therapy to soothe itching",
            "Take an OTC antihistamine for severe itching (especially at bedtime)",
            "Apply 1% hydrocortisone cream to flare-ups (short-term use only)",
        ],
        "do": [
            "Bathe in lukewarm water for 10–15 minutes, pat dry gently",
            "Use gentle, soap-free cleansers",
            "Keep home humidity at 30–50% with a humidifier",
            "Identify triggers (stress, allergens, weather changes)",
        ],
        "dont": [
            "Do NOT scratch — use cold packs or gentle tapping instead",
            "Avoid bubble baths, fragranced lotions, and harsh detergents",
            "Do not wear tight or rough-textured clothing",
        ],
        "see_doctor": "If eczema covers large areas, is oozing/crusting, interferes with sleep, or isn't improving with OTC care.",
    },
    "Exanthems and Drug Eruptions": {
        "severity": "⚠️ Moderate to High",
        "icon": "🟠",
        "first_aid": [
            "Stop the suspected medication ONLY after consulting your doctor",
            "Take an OTC antihistamine to reduce itching",
            "Apply calamine lotion or cooling aloe vera gel to affected areas",
            "Keep the skin cool — avoid hot environments",
        ],
        "do": [
            "Document all medications you are currently taking (including supplements)",
            "Note when the rash started relative to starting any new medication",
            "Wear loose, comfortable clothing",
        ],
        "dont": [
            "Do NOT stop prescription medications without medical guidance",
            "Avoid sun exposure on affected areas",
            "Do not apply multiple topical products at once",
        ],
        "see_doctor": "IMMEDIATELY if you have fever, facial swelling, difficulty breathing, or if the rash involves mucous membranes (mouth, eyes). These may indicate a severe drug reaction.",
    },
    "Hair Loss and Alopecia": {
        "severity": "Mild (cosmetic concern, but may indicate underlying condition)",
        "icon": "⚫",
        "first_aid": [
            "Gentle scalp massage with natural oils (coconut, castor oil) to improve blood circulation",
            "Use a mild, sulfate-free shampoo",
            "Take biotin supplements (consult doctor for dosage)",
            "Protect the scalp from sun exposure with hats or SPF spray",
        ],
        "do": [
            "Eat a balanced diet rich in iron, zinc, vitamin D, and protein",
            "Manage stress through exercise, meditation, or counseling",
            "Be gentle when brushing — use a wide-toothed comb on wet hair",
        ],
        "dont": [
            "Avoid tight hairstyles (ponytails, braids) that pull on hair roots",
            "Do not use harsh chemical treatments, excessive heat styling",
            "Avoid crash diets — sudden weight loss can trigger hair shedding",
        ],
        "see_doctor": "If hair loss is sudden, patchy, accompanied by scalp pain/itching, or if you notice bald spots. Could indicate alopecia areata or thyroid issues.",
    },
    "Herpes and STDs": {
        "severity": "⚠️ Moderate — Contagious",
        "icon": "🟠",
        "first_aid": [
            "Keep the affected area clean and dry",
            "Apply OTC antiviral cream (docosanol/Abreva) for cold sores at first tingle",
            "Take OTC pain relief (ibuprofen/acetaminophen) for discomfort",
            "Apply petroleum jelly to sores to prevent cracking",
        ],
        "do": [
            "Wash hands frequently, especially after touching affected areas",
            "Use separate towels and avoid sharing personal items",
            "Wear loose cotton underwear if genital area is affected",
        ],
        "dont": [
            "Do NOT touch, pick, or squeeze sores — this spreads the virus",
            "Avoid intimate contact during active outbreaks",
            "Do not share utensils, lip balm, or razors",
        ],
        "see_doctor": "As soon as possible for proper diagnosis and prescription antiviral medication (acyclovir/valacyclovir). Essential for managing outbreaks.",
    },
    "Light Diseases and Pigmentation Disorders": {
        "severity": "Mild to Moderate",
        "icon": "🟤",
        "first_aid": [
            "Apply broad-spectrum SPF 50+ sunscreen and reapply every 2 hours",
            "Use a gentle vitamin C serum to help even skin tone",
            "Apply aloe vera gel to soothe any irritated areas",
            "Keep affected skin moisturized with a fragrance-free lotion",
        ],
        "do": [
            "Wear protective clothing and wide-brimmed hats in sunlight",
            "Use mineral sunscreen (zinc oxide/titanium dioxide) on sensitive areas",
            "Be patient — pigmentation changes take weeks to months to improve",
        ],
        "dont": [
            "Avoid prolonged sun exposure, especially 10 AM – 4 PM",
            "Do not use bleaching creams without medical supervision",
            "Avoid picking or scratching at discolored patches",
        ],
        "see_doctor": "If pigmentation changes rapidly, new dark moles appear, or patches spread. Some pigmentation disorders need prescription treatment.",
    },
    "Lupus and Connective Tissue Diseases": {
        "severity": "⚠️ High — Systemic Autoimmune Condition",
        "icon": "🔴",
        "first_aid": [
            "Strict sun protection — SPF 50+, reapply frequently, wear UV-protective clothing",
            "Apply cool compresses to inflamed skin rashes",
            "Rest and avoid overexertion during flares",
            "Take OTC anti-inflammatory medication (ibuprofen) for joint pain, if not contraindicated",
        ],
        "do": [
            "Follow your prescribed treatment plan strictly",
            "Get adequate rest and manage stress levels",
            "Keep a symptom diary to identify triggers",
        ],
        "dont": [
            "Do NOT discontinue prescribed medications without doctor's advice",
            "Avoid unprotected sun exposure — UV light triggers lupus flares",
            "Avoid smoking — it worsens lupus symptoms significantly",
        ],
        "see_doctor": "Lupus requires ongoing rheumatologist care. Seek URGENT care if you develop chest pain, difficulty breathing, severe headache, or high fever during a flare.",
    },
    "Melanoma and Skin Cancer": {
        "severity": "🚨 CRITICAL — Life-Threatening",
        "icon": "🔴",
        "first_aid": [
            "DO NOT attempt any home treatment — this requires immediate professional evaluation",
            "Cover the lesion from sun exposure",
            "Take clear, close-up photographs from multiple angles for your doctor",
            "Use the ABCDE rule to document: Asymmetry, Border, Color, Diameter, Evolving",
        ],
        "do": [
            "Schedule an URGENT dermatologist appointment (within days, not weeks)",
            "Perform full-body skin self-exams monthly",
            "Apply SPF 50+ daily to prevent further UV damage",
        ],
        "dont": [
            "Do NOT ignore changing moles — size, shape, color changes are warning signs",
            "Do NOT scratch, cut, or try to remove suspicious lesions",
            "Never use tanning beds",
        ],
        "see_doctor": "IMMEDIATELY. Melanoma is the most dangerous form of skin cancer. Early detection and surgical removal dramatically improve survival rates. Every day matters.",
    },
    "Nail Fungus and Nail Diseases": {
        "severity": "Mild to Moderate",
        "icon": "🟡",
        "first_aid": [
            "Keep nails clean, dry, and trimmed short",
            "Apply OTC antifungal nail lacquer (ciclopirox) or cream (clotrimazole)",
            "Soak affected nails in warm water with tea tree oil for 15–20 minutes",
            "Disinfect nail clippers and files after each use",
        ],
        "do": [
            "Wear breathable shoes and moisture-wicking socks",
            "Change socks daily and rotate shoes to let them dry",
            "Use antifungal powder in shoes",
            "Wear shower shoes in public pools, gyms, and locker rooms",
        ],
        "dont": [
            "Do NOT share nail clippers, files, or shoes with others",
            "Avoid walking barefoot in damp public areas",
            "Do not cover infected nails with polish (traps moisture)",
        ],
        "see_doctor": "If the nail becomes painful, significantly discolored/thickened, separates from the nail bed, or OTC treatments fail after 2–3 months.",
    },
    "Normal Skin": {
        "severity": "✅ Healthy — No Concerns Detected",
        "icon": "🟢",
        "first_aid": [
            "No treatment needed! Your skin appears healthy",
            "Continue your current skincare routine",
            "Apply SPF 30+ sunscreen daily for prevention",
            "Stay hydrated and moisturize regularly",
        ],
        "do": [
            "Maintain a balanced diet rich in vitamins A, C, and E",
            "Drink at least 8 glasses of water daily",
            "Get 7–8 hours of sleep for skin regeneration",
            "Perform monthly skin self-exams to catch any changes early",
        ],
        "dont": [
            "Avoid excessive sun exposure without protection",
            "Don't over-wash or use harsh products on healthy skin",
            "Avoid smoking — it accelerates skin aging",
        ],
        "see_doctor": "For annual skin check-ups, especially if you have a family history of skin conditions or skin cancer.",
    },
    "Poison Ivy and Contact Dermatitis": {
        "severity": "Mild to Moderate",
        "icon": "🟢",
        "first_aid": [
            "Immediately wash the area with soap and lukewarm water (within 30 minutes of exposure if possible)",
            "Apply calamine lotion or hydrocortisone cream (1%) to reduce itching",
            "Use cold compresses for 15–20 minutes several times daily",
            "Take an OTC antihistamine (diphenhydramine/Benadryl) for intense itching",
        ],
        "do": [
            "Wash all clothing, tools, and pets that may have contacted the irritant",
            "Take an oatmeal bath to soothe widespread rashes",
            "Keep the rash clean and uncovered when possible",
        ],
        "dont": [
            "Do NOT scratch — this can cause infection and spread the rash",
            "Avoid burning poison ivy/oak plants — inhaling smoke causes lung irritation",
            "Don't apply hot water — it worsens itching",
        ],
        "see_doctor": "If the rash covers a large area, affects the face/genitals, shows signs of infection, or causes difficulty breathing.",
    },
    "Psoriasis and Lichen Planus": {
        "severity": "Moderate (Chronic condition)",
        "icon": "🟣",
        "first_aid": [
            "Apply thick moisturizer or petroleum jelly to plaques immediately after bathing",
            "Use OTC coal tar or salicylic acid shampoo/cream on affected areas",
            "Apply 1% hydrocortisone cream for mild flare-ups (short-term)",
            "Take lukewarm baths with colloidal oatmeal or Dead Sea salts",
        ],
        "do": [
            "Moisturize frequently — dry skin worsens psoriasis",
            "Get brief, controlled sun exposure (10–15 mins) — UV light can help",
            "Manage stress — it's a major trigger for flare-ups",
            "Maintain a healthy weight — obesity worsens psoriasis",
        ],
        "dont": [
            "Do NOT pick or scratch at plaques/scales",
            "Avoid alcohol — it can trigger and worsen flare-ups",
            "Do not use harsh soaps or take very hot showers",
        ],
        "see_doctor": "If psoriasis covers more than 10% of your body, affects joints (psoriatic arthritis), or significantly impacts quality of life.",
    },
    "Scabies and Infestations": {
        "severity": "⚠️ Moderate — Highly Contagious",
        "icon": "🔴",
        "first_aid": [
            "Apply OTC permethrin cream (5%) to the ENTIRE body from neck down — leave for 8–14 hours",
            "Take an antihistamine for intense itching",
            "Wash all bedding, clothing, and towels in HOT water (60°C/140°F) and dry on high heat",
            "Vacuum all carpets, furniture, and mattresses thoroughly",
        ],
        "do": [
            "Treat ALL household members and close contacts simultaneously",
            "Seal non-washable items in plastic bags for at least 72 hours",
            "Repeat treatment after 7 days as directed",
        ],
        "dont": [
            "Do NOT share beds, clothing, or towels with others until fully treated",
            "Avoid scratching — secondary bacterial infection is common",
            "Do not assume itching stops immediately — it can persist 2–4 weeks after successful treatment",
        ],
        "see_doctor": "If OTC permethrin doesn't work after 2 treatments, or if you develop crusted/Norwegian scabies (thick, crusty patches).",
    },
    "Seborrheic Keratoses and Benign Tumors": {
        "severity": "Mild — Usually Harmless",
        "icon": "🟢",
        "first_aid": [
            "No urgent treatment needed — these are typically benign growths",
            "Apply moisturizer to prevent dryness and irritation around the growth",
            "If itchy, apply a mild hydrocortisone cream",
            "Protect the area from friction (clothing, jewelry rubbing)",
        ],
        "do": [
            "Monitor for any changes in size, shape, color, or bleeding",
            "Take photos periodically to track changes",
            "Continue regular sun protection",
        ],
        "dont": [
            "Do NOT try to remove or scrape off growths at home",
            "Avoid picking or scratching at the growths",
            "Don't assume all growths are benign — have new ones checked",
        ],
        "see_doctor": "If a growth changes rapidly, bleeds without trauma, becomes painful, or if you're unsure whether it's benign. A biopsy may be needed to rule out skin cancer.",
    },
    "Systemic Disease": {
        "severity": "⚠️ High — May Indicate Underlying Condition",
        "icon": "🔴",
        "first_aid": [
            "Document all skin changes along with any other symptoms (fatigue, fever, joint pain, weight loss)",
            "Keep the skin clean and moisturized",
            "Take note of when symptoms started and their progression",
            "Rest and stay hydrated",
        ],
        "do": [
            "Seek comprehensive medical evaluation promptly",
            "Bring a complete list of all medications and supplements to your appointment",
            "Get blood work done as recommended by your doctor",
        ],
        "dont": [
            "Do NOT ignore skin manifestations of systemic disease — they can be early warning signs",
            "Avoid self-diagnosing or self-treating systemic conditions",
            "Do not delay seeking medical attention",
        ],
        "see_doctor": "SOON. Skin changes linked to systemic disease may indicate conditions like diabetes, thyroid disorders, liver disease, or autoimmune conditions that need prompt investigation.",
    },
    "Tinea and Fungal Infections": {
        "severity": "Mild to Moderate — Contagious",
        "icon": "🟡",
        "first_aid": [
            "Apply OTC antifungal cream (clotrimazole, miconazole, or terbinafine) twice daily",
            "Keep the affected area clean and completely dry",
            "Wash hands thoroughly after touching infected areas",
            "Change clothing that contacts the affected area daily",
        ],
        "do": [
            "Continue antifungal treatment for 1–2 weeks AFTER symptoms clear",
            "Wear loose, breathable fabrics (cotton)",
            "Use antifungal powder in shoes and skin folds",
            "Wash towels and bedding frequently in hot water",
        ],
        "dont": [
            "Do NOT share towels, clothing, or personal items",
            "Avoid walking barefoot in communal showers/pools",
            "Don't stop treatment early even if the rash looks better",
        ],
        "see_doctor": "If the infection doesn't improve after 2 weeks of OTC treatment, covers a large area, affects the scalp/nails, or you have a weakened immune system.",
    },
    "Urticaria and Hives": {
        "severity": "Mild to Moderate (can be severe if with anaphylaxis)",
        "icon": "🟠",
        "first_aid": [
            "Take an OTC non-drowsy antihistamine (cetirizine, loratadine, or fexofenadine) immediately",
            "Apply a cold compress or ice pack wrapped in cloth to itchy welts",
            "Take a cool shower or oatmeal bath to soothe the skin",
            "Wear loose, light clothing to avoid skin irritation",
        ],
        "do": [
            "Try to identify the trigger (food, medication, stress, heat, pressure)",
            "Keep a diary of outbreaks and potential triggers",
            "Stay in a cool environment — heat worsens hives",
        ],
        "dont": [
            "Do NOT scratch — it makes hives spread and worsen",
            "Avoid hot baths, alcohol, and spicy foods during an outbreak",
            "Do not take aspirin — it can worsen hives in some people",
        ],
        "see_doctor": "EMERGENCY if you experience throat swelling, difficulty breathing, dizziness, or swelling of lips/tongue (anaphylaxis). Otherwise, see a doctor if hives persist beyond 6 weeks.",
    },
    "Vascular Tumors": {
        "severity": "⚠️ Moderate — Requires Evaluation",
        "icon": "🟣",
        "first_aid": [
            "Do not attempt to treat vascular tumors at home",
            "If bleeding occurs, apply firm, direct pressure with a clean cloth for 10–15 minutes",
            "Keep the area protected from trauma and friction",
            "Document size, color, and any changes with photographs",
        ],
        "do": [
            "Get a medical evaluation to determine the type (hemangioma, angiosarcoma, etc.)",
            "Monitor for rapid growth, color changes, or ulceration",
            "Protect the area from sun exposure",
        ],
        "dont": [
            "Do NOT try to remove, cut, or cauterize vascular lesions at home",
            "Avoid tight clothing or accessories that press on the tumor",
            "Do not ignore rapid changes in size or appearance",
        ],
        "see_doctor": "Promptly for proper diagnosis. Urgently if the lesion is rapidly growing, bleeding frequently, or causing pain.",
    },
    "Vasculitis": {
        "severity": "⚠️ High — Systemic Inflammation",
        "icon": "🔴",
        "first_aid": [
            "Rest and elevate affected limbs to reduce swelling",
            "Apply cool compresses to painful, inflamed areas",
            "Take OTC pain relief (acetaminophen preferred over NSAIDs — consult doctor)",
            "Document all skin changes, joint pain, fever, or other symptoms",
        ],
        "do": [
            "Seek medical evaluation promptly",
            "Wear compression stockings if legs are affected (after doctor approval)",
            "Keep a detailed symptom diary",
        ],
        "dont": [
            "Do NOT ignore vasculitis — it can affect internal organs (kidneys, lungs, nerves)",
            "Avoid standing for prolonged periods",
            "Do not self-medicate with immunosuppressants",
        ],
        "see_doctor": "SOON. Vasculitis requires blood tests, possible biopsy, and often prescription immunosuppressive treatment. Urgent if you notice blood in urine, numbness, or severe abdominal pain.",
    },
    "Viral Infections (Warts, Molluscum)": {
        "severity": "Mild — Common and Treatable",
        "icon": "🟡",
        "first_aid": [
            "Apply OTC salicylic acid wart remover (17%) daily to warts",
            "Cover warts with a small bandage or duct tape to prevent spreading",
            "For molluscum, keep bumps clean and covered",
            "Avoid shaving over affected areas to prevent spreading",
        ],
        "do": [
            "Wash hands frequently after touching warts/bumps",
            "Wear flip-flops in public showers and pools",
            "Be patient — warts can take weeks to months to resolve with treatment",
            "Boost immune system with good nutrition and rest",
        ],
        "dont": [
            "Do NOT pick, scratch, or bite warts — this spreads the virus to new sites",
            "Avoid sharing towels, razors, or personal items",
            "Do not use the same file/pumice stone on healthy and infected nails/skin",
        ],
        "see_doctor": "If warts are painful, on the face/genitals, spreading rapidly, or don't respond to 2–3 months of OTC treatment. Cryotherapy or prescription treatments may be needed.",
    },
}


def get_disease_info(disease_name):
    """Look up disease info. Returns dict or None."""
    return DISEASE_DATA.get(disease_name)


# =============================================================================
# Detailed Disease Info — Causes, Symptoms, Contagiousness, Prevalence
# =============================================================================
DISEASE_DETAILS = {
    "Acne and Rosacea": {
        "description": "Acne is a chronic inflammatory skin condition caused by clogged hair follicles. Rosacea is a chronic condition causing facial redness and visible blood vessels.",
        "causes": ["Excess oil (sebum) production", "Clogged pores (dead skin cells + oil)", "Bacteria (Cutibacterium acnes)", "Hormonal changes (puberty, menstruation, PCOS)", "Stress and diet (high-glycemic foods, dairy)"],
        "symptoms": ["Whiteheads and blackheads", "Papules and pustules (red, inflamed bumps)", "Facial redness and flushing (rosacea)", "Visible blood vessels on face", "Cystic nodules under the skin"],
        "contagious": "❌ Not contagious",
        "prevalence": "~85% of people aged 12–24 experience acne. Rosacea affects ~5% of adults worldwide.",
        "affected_areas": "Face, forehead, chest, upper back, shoulders",
        "what_does_it_look_like": "Red bumps, pimples, whiteheads, or persistent facial redness with visible blood vessels.",
        "image_url": "/static/gallery/Acne and Rosacea Photos/07PerioralDermEye.jpg",
    },
    "Actinic Keratosis and Malignant Lesions": {
        "description": "Rough, scaly patches caused by years of UV exposure. Considered pre-cancerous — can progress to squamous cell carcinoma if untreated.",
        "causes": ["Cumulative UV radiation (sun/tanning beds)", "Fair skin with light eyes", "Age (more common after 40)", "Weakened immune system", "History of sunburns"],
        "symptoms": ["Rough, sandpaper-like patches on skin", "Flat to slightly raised lesions", "Color ranges from pink to red to brown", "Lesions may itch, burn, or bleed", "Patches may grow or change over time"],
        "contagious": "❌ Not contagious",
        "prevalence": "Affects ~58 million Americans. Most common pre-cancer in the world.",
        "affected_areas": "Face, ears, scalp, neck, forearms, backs of hands — sun-exposed areas",
        "what_does_it_look_like": "Rough, scaly, sandpaper-like patches on sun-exposed areas.",
        "image_url": "/static/gallery/Actinic Keratosis Basal Cell Carcinoma and other Malignant Lesions/actinic-cheilitis-sq-cell-lip-19.jpg",
    },
    "Atopic Dermatitis": {
        "description": "A chronic, relapsing inflammatory skin condition (a type of eczema) causing itchy, red, dry patches. Often starts in childhood and has a genetic component.",
        "causes": ["Genetic predisposition (filaggrin gene mutations)", "Overactive immune response", "Environmental triggers (allergens, irritants)", "Skin barrier dysfunction", "Stress and weather changes"],
        "symptoms": ["Intense itching (especially at night)", "Red, inflamed, dry patches", "Thickened, cracked skin from chronic scratching", "Small raised bumps that may weep fluid", "Skin darkening or lightening in affected areas"],
        "contagious": "❌ Not contagious",
        "prevalence": "Affects ~15–20% of children and ~3% of adults globally.",
        "affected_areas": "Inner elbows, behind knees, face, neck, hands, feet",
        "what_does_it_look_like": "Red, inflamed, intensely itchy dry patches that may be thickened or cracked.",
        "image_url": "/static/gallery/Atopic Dermatitis Photos/03DermatitisAreola45.jpg",
    },
    "Bullous Disease": {
        "description": "A group of autoimmune conditions (pemphigus, pemphigoid) causing large, fluid-filled blisters on the skin and sometimes mucous membranes.",
        "causes": ["Autoimmune attack on skin proteins (desmoglein, BP180)", "Certain medications (penicillamine, ACE inhibitors)", "Genetic predisposition", "UV radiation exposure"],
        "symptoms": ["Large, tense or flaccid blisters", "Painful erosions when blisters burst", "Blisters on mucous membranes (mouth, eyes)", "Widespread skin fragility", "Nikolsky sign (skin peels with gentle pressure)"],
        "contagious": "❌ Not contagious",
        "prevalence": "Rare — pemphigus affects ~0.5–3.2 per 100,000 people per year.",
        "affected_areas": "Trunk, limbs, groin, armpits, mouth, throat",
        "what_does_it_look_like": "Noticeable changes in skin texture, color variations (redness, hyperpigmentation), or distinctive lesions.",
        "image_url": "/static/gallery/Bullous Disease Photos/benign-familial-chronic-pemphigus-1.jpg",
    },
    "Cellulitis and Bacterial Infections": {
        "description": "A serious bacterial skin infection affecting deeper layers of skin (dermis and subcutaneous tissue), causing redness, swelling, and warmth.",
        "causes": ["Bacteria entering through breaks in skin (cuts, insect bites, surgical wounds)", "Staphylococcus aureus and Streptococcus pyogenes", "Weakened immune system", "Chronic skin conditions (eczema, athlete's foot)", "Lymphedema or poor circulation"],
        "symptoms": ["Red, swollen, warm, tender area of skin", "Rapidly spreading redness", "Fever and chills", "Pain and swelling in affected area", "Red streaks extending from the area (lymphangitis)"],
        "contagious": "⚠️ The bacteria can spread through direct contact with open wounds",
        "prevalence": "~14.5 million cases annually in the US. More common in adults over 45.",
        "affected_areas": "Lower legs (most common), face, arms — any area with broken skin",
        "what_does_it_look_like": "A rapidly spreading area of red, swollen, warm, and tender skin.",
        "image_url": "/static/gallery/Cellulitis Impetigo and other Bacterial Infections/09cellulitis040306.jpg",
    },
    "Eczema": {
        "description": "A group of conditions causing inflamed, itchy, red, cracked, and rough skin. The most common form is atopic eczema, but also includes nummular, dyshidrotic, and contact eczema.",
        "causes": ["Genetic factors affecting skin barrier", "Immune system overreaction", "Environmental irritants and allergens", "Stress and hormonal changes", "Climate (dry, cold weather worsens it)"],
        "symptoms": ["Dry, sensitive skin", "Intense itching", "Red, inflamed patches", "Rough, leathery, scaly patches", "Oozing, crusting during flare-ups"],
        "contagious": "❌ Not contagious",
        "prevalence": "Affects ~31.6 million people in the US (~10% of population).",
        "affected_areas": "Hands, feet, inner elbows, behind knees, face, neck",
        "what_does_it_look_like": "Red, inflamed, intensely itchy dry patches that may be thickened or cracked.",
        "image_url": "/static/gallery/Eczema Photos/03DermatitisArm1.jpg",
    },
    "Exanthems and Drug Eruptions": {
        "description": "Widespread skin rashes caused by viral infections (exanthems like measles, rubella) or adverse reactions to medications (drug eruptions).",
        "causes": ["Viral infections (measles, rubella, roseola, EBV)", "Medication reactions (antibiotics, NSAIDs, anticonvulsants)", "Immune system response", "Drug hypersensitivity"],
        "symptoms": ["Widespread red or pink rash", "Rash may start on trunk and spread outward", "Fever and malaise", "Itching (variable)", "Possible mucous membrane involvement in severe cases"],
        "contagious": "⚠️ Viral exanthems ARE contagious. Drug eruptions are NOT contagious.",
        "prevalence": "Drug eruptions affect ~2–3% of hospitalized patients. Viral exanthems are very common in children.",
        "affected_areas": "Trunk, limbs, face — often widespread and symmetrical",
        "what_does_it_look_like": "Noticeable changes in skin texture, color variations (redness, hyperpigmentation), or distinctive lesions.",
        "image_url": "/static/gallery/Exanthems and Drug Eruptions/14desquamationViral34-GP3.jpg",
    },
    "Hair Loss and Alopecia": {
        "description": "Partial or complete loss of hair from the scalp or body. Can be temporary or permanent, depending on the cause.",
        "causes": ["Genetics (androgenetic alopecia / male/female pattern baldness)", "Autoimmune disease (alopecia areata)", "Hormonal changes (thyroid, menopause, PCOS)", "Nutritional deficiencies (iron, zinc, biotin, vitamin D)", "Stress (telogen effluvium), medications, infections"],
        "symptoms": ["Gradual thinning on top of head", "Circular or patchy bald spots", "Sudden loosening of hair (handful comes out when brushing)", "Full-body hair loss (alopecia universalis)", "Scaling patches on scalp (if fungal)"],
        "contagious": "❌ Not contagious (except fungal scalp infections like tinea capitis)",
        "prevalence": "~50% of men and ~25% of women experience pattern baldness by age 50.",
        "affected_areas": "Scalp (most common), eyebrows, beard, body hair",
        "what_does_it_look_like": "Visible thinning of hair on the scalp or patchy bald spots.",
        "image_url": "/static/gallery/Hair Loss Photos Alopecia and other Hair Diseases/acne-keloidalis-15.jpg",
    },
    "Herpes and STDs": {
        "description": "Herpes simplex virus (HSV-1 and HSV-2) causes recurrent painful blisters. HSV-1 typically affects the mouth (cold sores), HSV-2 the genital area.",
        "causes": ["Herpes simplex virus type 1 (oral) and type 2 (genital)", "Spread through direct skin-to-skin contact", "Can be transmitted even without visible sores (asymptomatic shedding)", "Stress, illness, and sun exposure trigger reactivation"],
        "symptoms": ["Clusters of small, painful blisters", "Tingling, burning, or itching before blisters appear (prodrome)", "Blisters break and form shallow, painful ulcers", "Flu-like symptoms during first outbreak", "Recurrent outbreaks (usually milder)"],
        "contagious": "⚠️ YES — Highly contagious through direct contact",
        "prevalence": "HSV-1 affects ~67% of people globally. HSV-2 affects ~13% worldwide.",
        "affected_areas": "Lips, mouth (HSV-1), genitals, buttocks (HSV-2), fingers (herpetic whitlow)",
        "what_does_it_look_like": "Clusters of small, fluid-filled blisters on a red base that break and form shallow ulcers.",
        "image_url": "/static/gallery/Herpes HPV and other STDs Photos/11herpesAnal0913041.jpg",
    },
    "Light Diseases and Pigmentation Disorders": {
        "description": "Conditions affecting skin color — includes vitiligo (loss of pigment), melasma (excess pigment), and photosensitivity disorders.",
        "causes": ["Autoimmune destruction of melanocytes (vitiligo)", "Hormonal changes and UV exposure (melasma)", "Genetic predisposition", "Medications causing photosensitivity", "Post-inflammatory changes after injury/acne"],
        "symptoms": ["White patches of skin (vitiligo)", "Brown/gray patches on face (melasma)", "Increased sensitivity to sunlight", "Uneven skin tone", "Patches that may expand or remain stable"],
        "contagious": "❌ Not contagious",
        "prevalence": "Vitiligo affects ~1% of population. Melasma affects ~15–50% of pregnant women.",
        "affected_areas": "Face, hands, arms (vitiligo); cheeks, forehead, upper lip (melasma)",
        "what_does_it_look_like": "Noticeable changes in skin texture, color variations (redness, hyperpigmentation), or distinctive lesions.",
        "image_url": "/static/gallery/Light Diseases and Disorders of Pigmentation/actinic-comedones-3.jpg",
    },
    "Lupus and Connective Tissue Diseases": {
        "description": "Systemic lupus erythematosus (SLE) is a chronic autoimmune disease where the immune system attacks healthy tissue, affecting skin, joints, kidneys, brain, and other organs.",
        "causes": ["Autoimmune dysfunction (immune system attacks own tissue)", "Genetic predisposition", "UV light exposure triggers flares", "Hormonal factors (more common in women)", "Certain medications can trigger drug-induced lupus"],
        "symptoms": ["Butterfly-shaped facial rash across cheeks and nose", "Photosensitivity (sun-triggered rashes)", "Joint pain and swelling", "Fatigue, fever, weight loss", "Mouth sores and hair loss"],
        "contagious": "❌ Not contagious",
        "prevalence": "Affects ~1.5 million Americans. 9x more common in women, especially ages 15–44.",
        "affected_areas": "Face (butterfly rash), scalp, arms, hands — plus internal organs",
        "what_does_it_look_like": "Noticeable changes in skin texture, color variations (redness, hyperpigmentation), or distinctive lesions.",
        "image_url": "/static/gallery/Lupus and other Connective Tissue diseases/acrocyanosis-1.jpg",
    },
    "Melanoma and Skin Cancer": {
        "description": "The most serious form of skin cancer, arising from melanocytes (pigment-producing cells). Can metastasize rapidly if not caught early.",
        "causes": ["UV radiation exposure (sun, tanning beds)", "Multiple or atypical moles", "Fair skin, light hair, light eyes", "Family history of melanoma", "Weakened immune system, history of severe sunburns"],
        "symptoms": ["Asymmetrical mole or lesion", "Irregular, notched, or blurred borders", "Multiple colors (brown, black, red, white, blue)", "Diameter larger than 6mm (pencil eraser)", "Evolving — changing in size, shape, or color"],
        "contagious": "❌ Not contagious",
        "prevalence": "~100,000 new cases per year in the US. 5-year survival rate is 99% if caught early.",
        "affected_areas": "Anywhere on the body — trunk (men), legs (women), palms, soles, under nails",
        "what_does_it_look_like": "An asymmetrical mole or lesion with irregular borders, multiple colors, and a diameter larger than a pencil eraser.",
        "image_url": "/static/gallery/Melanoma Skin Cancer Nevi and Moles/atypical-nevi-10.jpg",
    },
    "Nail Fungus and Nail Diseases": {
        "description": "Fungal infection of fingernails or toenails (onychomycosis), causing discoloration, thickening, and crumbling of nails.",
        "causes": ["Dermatophyte fungi (most common)", "Warm, moist environments (shoes, pools)", "Injury to the nail", "Weakened immune system, diabetes", "Poor circulation, aging"],
        "symptoms": ["Yellow, brown, or white discoloration", "Thickened, brittle, or crumbly nails", "Distorted nail shape", "Foul odor from the nail", "Nail separating from the nail bed"],
        "contagious": "⚠️ Mildly contagious — can spread through shared surfaces and tools",
        "prevalence": "Affects ~10% of adults, ~20% of people over 60, and ~50% of people over 70.",
        "affected_areas": "Toenails (most common), fingernails",
        "what_does_it_look_like": "Red, scaly rings (ringworm) or thickened, discolored nails.",
        "image_url": "/static/gallery/Nail Fungus and other Nail Disease/acute-paronychia-2.jpg",
    },
    "Normal Skin": {
        "description": "Healthy skin with no detected abnormalities. The skin's barrier function, hydration, and appearance are within normal range.",
        "causes": ["N/A — This is a healthy skin finding"],
        "symptoms": ["No concerning symptoms detected"],
        "contagious": "N/A",
        "prevalence": "N/A",
        "affected_areas": "N/A — Skin appears healthy",
        "what_does_it_look_like": "Clear, healthy skin without active lesions, excessive redness, or unusual growths.",
        "image_url": "/static/gallery/Normal Skin/40yearold-latina-woman-brushes-her-260nw-2335137965.jpg",
    },
    "Poison Ivy and Contact Dermatitis": {
        "description": "An inflammatory skin reaction caused by direct contact with an allergen or irritant. Poison ivy/oak/sumac rashes are caused by urushiol oil.",
        "causes": ["Contact with urushiol (poison ivy, oak, sumac)", "Allergic reaction to metals (nickel), fragrances, latex", "Irritant exposure (chemicals, detergents, solvents)", "Occupational exposure (healthcare workers, hairdressers)"],
        "symptoms": ["Red, itchy rash at contact site", "Blisters and swelling", "Rash may appear in linear streaks (plant contact)", "Burning or stinging sensation", "Dry, cracked skin (irritant type)"],
        "contagious": "❌ Not contagious (the rash itself doesn't spread, but urushiol oil on surfaces can)",
        "prevalence": "Contact dermatitis affects ~15–20% of the general population.",
        "affected_areas": "Hands, face, arms, legs — wherever contact occurred",
        "what_does_it_look_like": "Red, itchy streaks or patches with blisters and swelling.",
        "image_url": "/static/gallery/Poison Ivy Photos and other Contact Dermatitis/allergic-contact-dermatitis-104.jpg",
    },
    "Psoriasis and Lichen Planus": {
        "description": "Psoriasis is a chronic autoimmune condition causing rapid skin cell turnover, resulting in thick, scaly plaques. Lichen planus causes flat, purplish, itchy bumps.",
        "causes": ["Immune system dysfunction (T-cell mediated)", "Genetic predisposition (runs in families)", "Triggers: stress, infections, medications, cold weather", "Lichen planus may be linked to hepatitis C"],
        "symptoms": ["Red patches covered with silvery-white scales (psoriasis)", "Flat, shiny, purplish bumps (lichen planus)", "Itching, burning, or soreness", "Thick, pitted, or ridged nails", "Stiff, swollen joints (psoriatic arthritis)"],
        "contagious": "❌ Not contagious",
        "prevalence": "Psoriasis affects ~2–3% of the world population (~125 million people).",
        "affected_areas": "Elbows, knees, scalp, lower back (psoriasis); wrists, ankles, mouth (lichen planus)",
        "what_does_it_look_like": "Thick red patches covered with silvery-white scales.",
        "image_url": "/static/gallery/Psoriasis pictures Lichen Planus and related diseases/08glutealPinking061906.jpg",
    },
    "Scabies and Infestations": {
        "description": "Scabies is caused by the Sarcoptes scabiei mite burrowing into the skin, causing intense itching and a pimple-like rash.",
        "causes": ["Sarcoptes scabiei mite infestation", "Prolonged skin-to-skin contact with an infected person", "Shared bedding, clothing, or towels", "Crowded living conditions"],
        "symptoms": ["Intense itching, especially at night", "Thin, irregular burrow tracks (tiny raised lines)", "Small red bumps and blisters", "Sores from scratching (secondary infection risk)", "Widespread rash in severe cases"],
        "contagious": "⚠️ HIGHLY contagious — spreads through prolonged skin contact",
        "prevalence": "Affects ~200 million people worldwide at any given time.",
        "affected_areas": "Between fingers, wrists, elbows, armpits, waistline, buttocks, genitals",
        "what_does_it_look_like": "Noticeable changes in skin texture, color variations (redness, hyperpigmentation), or distinctive lesions.",
        "image_url": "/static/gallery/Scabies Lyme Disease and other Infestations and Bites/biting-insects-1.jpg",
    },
    "Seborrheic Keratoses and Benign Tumors": {
        "description": "Non-cancerous growths that appear as waxy, brown, black, or tan growths on the skin. Very common with aging and completely harmless.",
        "causes": ["Aging (most common cause)", "Genetic predisposition", "Sun exposure may play a role", "Not caused by viral infection"],
        "symptoms": ["Waxy, stuck-on appearance (like a drop of candle wax)", "Color: tan, brown, or black", "Round or oval shape, slightly elevated", "Range from tiny to over 1 inch in diameter", "Generally painless (may itch if irritated)"],
        "contagious": "❌ Not contagious",
        "prevalence": "Present in ~83% of adults over 50. Nearly universal in elderly population.",
        "affected_areas": "Face, chest, shoulders, back — any area except palms and soles",
        "what_does_it_look_like": "Waxy, stuck-on appearing brown or black growths.",
        "image_url": "/static/gallery/Seborrheic Keratoses and other Benign Tumors/20EpidermCystRuptured1.jpg",
    },
    "Systemic Disease": {
        "description": "Skin manifestations of internal/systemic diseases. The skin can be a window to internal health — many systemic conditions produce characteristic skin signs.",
        "causes": ["Diabetes (acanthosis nigricans, diabetic dermopathy)", "Thyroid disease (dry skin, hair loss, pretibial myxedema)", "Liver disease (jaundice, spider angiomas)", "Kidney disease (uremic frost, pruritus)", "Autoimmune and inflammatory conditions"],
        "symptoms": ["Unexplained skin changes with systemic symptoms", "Persistent rashes not responding to topical treatment", "Skin thickening or color changes", "Associated fatigue, weight changes, fever", "Joint pain alongside skin symptoms"],
        "contagious": "❌ Not contagious (depends on the underlying condition)",
        "prevalence": "Varies widely depending on the underlying systemic condition.",
        "affected_areas": "Varies — can affect any part of the body depending on the underlying disease",
        "what_does_it_look_like": "Noticeable changes in skin texture, color variations (redness, hyperpigmentation), or distinctive lesions.",
        "image_url": "/static/gallery/Systemic Disease/26Fibrofolliculoma090604.jpg",
    },
    "Tinea and Fungal Infections": {
        "description": "Superficial fungal infections of the skin caused by dermatophytes. Includes ringworm (tinea corporis), athlete's foot (tinea pedis), and jock itch (tinea cruris).",
        "causes": ["Dermatophyte fungi (Trichophyton, Microsporum, Epidermophyton)", "Warm, moist environments", "Direct contact with infected person, animal, or soil", "Shared personal items (towels, clothing)", "Weakened immune system"],
        "symptoms": ["Ring-shaped, red, scaly patch with clearing center (ringworm)", "Itching, burning, stinging", "Cracked, peeling skin between toes (athlete's foot)", "Red, scaly rash in groin area (jock itch)", "Blisters or pustules in severe cases"],
        "contagious": "⚠️ YES — Contagious through direct contact and shared items",
        "prevalence": "Affects ~20–25% of the world population. Athlete's foot affects ~15–25% of people.",
        "affected_areas": "Feet, groin, body, scalp, nails, beard area",
        "what_does_it_look_like": "Red, scaly rings (ringworm) or thickened, discolored nails.",
        "image_url": "/static/gallery/Tinea Ringworm Candidiasis and other Fungal Infections/03cheilitis05010422.jpg",
    },
    "Urticaria and Hives": {
        "description": "Raised, itchy welts (wheals) on the skin caused by an allergic or immune reaction. Individual hives typically resolve within 24 hours but new ones may appear.",
        "causes": ["Allergic reactions (food, medications, insect stings)", "Physical triggers (pressure, cold, heat, exercise)", "Infections (viral, bacterial)", "Stress and emotional triggers", "Autoimmune conditions (chronic urticaria)"],
        "symptoms": ["Raised, red or skin-colored welts (wheals)", "Intense itching or burning", "Welts change shape and location within hours", "Angioedema (deeper swelling of lips, eyes, hands)", "Individual welts resolve within 24 hours"],
        "contagious": "❌ Not contagious",
        "prevalence": "~20% of people experience hives at least once in their lifetime.",
        "affected_areas": "Anywhere on the body — trunk, limbs, face are most common",
        "what_does_it_look_like": "Noticeable changes in skin texture, color variations (redness, hyperpigmentation), or distinctive lesions.",
        "image_url": "/static/gallery/Urticaria Hives/angioedema-1.jpg",
    },
    "Vascular Tumors": {
        "description": "Growths formed from blood vessels. Includes benign hemangiomas (common in infants) and rare malignant angiosarcomas.",
        "causes": ["Abnormal proliferation of blood vessel cells", "Genetic factors", "Most infantile hemangiomas have no known cause", "Angiosarcoma linked to radiation, lymphedema, vinyl chloride exposure"],
        "symptoms": ["Red, blue, or purple raised lesion", "Rubbery or spongy texture", "May grow rapidly (especially infantile hemangiomas)", "Can bleed with trauma", "Usually painless (pain may indicate malignancy)"],
        "contagious": "❌ Not contagious",
        "prevalence": "Infantile hemangiomas affect ~4–5% of infants. Angiosarcoma is very rare.",
        "affected_areas": "Head, neck (infantile hemangiomas); scalp, breast, liver (angiosarcoma)",
        "what_does_it_look_like": "Noticeable changes in skin texture, color variations (redness, hyperpigmentation), or distinctive lesions.",
        "image_url": "/static/gallery/Vascular Tumors/angiokeratomas-1.jpg",
    },
    "Vasculitis": {
        "description": "Inflammation of blood vessels causing vessel wall thickening, narrowing, or weakening. Can affect skin and internal organs.",
        "causes": ["Autoimmune diseases (lupus, rheumatoid arthritis)", "Infections (hepatitis B and C)", "Medication reactions", "Blood cancers", "Often idiopathic (unknown cause)"],
        "symptoms": ["Palpable purpura (raised purple spots that don't blanch)", "Skin ulcers and nodules", "Livedo reticularis (net-like purple pattern)", "Fever, fatigue, weight loss", "Joint and muscle pain"],
        "contagious": "❌ Not contagious",
        "prevalence": "Relatively uncommon — varies by type. IgA vasculitis most common in children.",
        "affected_areas": "Lower legs (most common for skin), kidneys, lungs, nerves, GI tract",
        "what_does_it_look_like": "Noticeable changes in skin texture, color variations (redness, hyperpigmentation), or distinctive lesions.",
        "image_url": "/static/gallery/Vasculitis Photos/atrophy-blanche-4.jpg",
    },
    "Viral Infections (Warts, Molluscum)": {
        "description": "Common viral skin infections. Warts are caused by HPV and appear as rough, raised growths. Molluscum contagiosum (poxvirus) causes small, dome-shaped bumps.",
        "causes": ["Human papillomavirus (HPV) — warts", "Molluscum contagiosum virus (poxvirus)", "Direct skin-to-skin contact", "Contact with contaminated surfaces", "Weakened immune system increases risk"],
        "symptoms": ["Rough, grainy, flesh-colored bumps (warts)", "Small, dome-shaped, pearly bumps with central dimple (molluscum)", "May have black dots (clotted blood vessels) in warts", "Usually painless (plantar warts can hurt when walking)", "Can spread to new areas by scratching"],
        "contagious": "⚠️ YES — Spread through direct contact and contaminated surfaces",
        "prevalence": "Warts affect ~7–12% of the population. Molluscum is common in children aged 1–10.",
        "affected_areas": "Hands, feet, face (warts); trunk, armpits, behind knees (molluscum)",
        "what_does_it_look_like": "Noticeable changes in skin texture, color variations (redness, hyperpigmentation), or distinctive lesions.",
        "image_url": "/static/gallery/Warts Molluscum and other Viral Infections/12ChickenPoxBack.jpg",
    },
}


def get_disease_details(disease_name):
    """Look up detailed disease information. Returns dict or None."""
    return DISEASE_DETAILS.get(disease_name)


# =============================================================================
# Severity Scoring — Numeric scale for visual severity meter
# =============================================================================
SEVERITY_SCORES = {
    "Acne and Rosacea": {"score": 2, "label": "Mild to Moderate", "color": "#f59e0b"},
    "Actinic Keratosis and Malignant Lesions": {"score": 4, "label": "High — Pre-cancerous", "color": "#ef4444"},
    "Atopic Dermatitis": {"score": 2, "label": "Mild to Moderate", "color": "#f59e0b"},
    "Bullous Disease": {"score": 3, "label": "Moderate to High", "color": "#f97316"},
    "Cellulitis and Bacterial Infections": {"score": 4, "label": "High — Needs Antibiotics", "color": "#ef4444"},
    "Eczema": {"score": 2, "label": "Mild to Moderate", "color": "#f59e0b"},
    "Exanthems and Drug Eruptions": {"score": 3, "label": "Moderate to High", "color": "#f97316"},
    "Hair Loss and Alopecia": {"score": 1, "label": "Mild (Cosmetic)", "color": "#10b981"},
    "Herpes and STDs": {"score": 3, "label": "Moderate — Contagious", "color": "#f97316"},
    "Light Diseases and Pigmentation Disorders": {"score": 2, "label": "Mild to Moderate", "color": "#f59e0b"},
    "Lupus and Connective Tissue Diseases": {"score": 4, "label": "High — Autoimmune", "color": "#ef4444"},
    "Melanoma and Skin Cancer": {"score": 5, "label": "CRITICAL — Life-Threatening", "color": "#dc2626"},
    "Nail Fungus and Nail Diseases": {"score": 2, "label": "Mild to Moderate", "color": "#f59e0b"},
    "Normal Skin": {"score": 0, "label": "Healthy — No Concerns", "color": "#10b981"},
    "Poison Ivy and Contact Dermatitis": {"score": 2, "label": "Mild to Moderate", "color": "#f59e0b"},
    "Psoriasis and Lichen Planus": {"score": 3, "label": "Moderate (Chronic)", "color": "#f97316"},
    "Scabies and Infestations": {"score": 3, "label": "Moderate — Contagious", "color": "#f97316"},
    "Seborrheic Keratoses and Benign Tumors": {"score": 1, "label": "Mild — Benign", "color": "#10b981"},
    "Systemic Disease": {"score": 4, "label": "High — Systemic", "color": "#ef4444"},
    "Tinea and Fungal Infections": {"score": 2, "label": "Mild to Moderate", "color": "#f59e0b"},
    "Urticaria and Hives": {"score": 2, "label": "Mild to Moderate", "color": "#f59e0b"},
    "Vascular Tumors": {"score": 3, "label": "Moderate — Needs Evaluation", "color": "#f97316"},
    "Vasculitis": {"score": 4, "label": "High — Systemic", "color": "#ef4444"},
    "Viral Infections (Warts, Molluscum)": {"score": 1, "label": "Mild — Common", "color": "#10b981"},
}


def get_severity_score(disease_name):
    """Look up severity score (0-5). Returns dict or None."""
    return SEVERITY_SCORES.get(disease_name)


DISEASE_DIET = {
    "Acne and Rosacea": {
        "eat": [
            "Zinc-rich foods (pumpkin seeds, lentils, beef)",
            "Omega-3 fatty acids (salmon, mackerel, flaxseeds, walnuts)",
            "High-fiber foods (oats, broccoli, quinoa) to balance blood sugar",
            "Green tea (contains antioxidant EGCG to reduce sebum production)"
        ],
        "avoid": [
            "High-glycemic index carbohydrates (white bread, white rice, sugary cereals)",
            "Cow's milk and dairy products (can stimulate insulin-like growth factors)",
            "Greasy fast foods and foods high in saturated/trans fats",
            "Spicy foods, hot beverages, and alcohol (common rosacea flushing triggers)"
        ]
    },
    "Actinic Keratosis and Malignant Lesions": {
        "eat": [
            "Lycopene-rich foods (cooked tomatoes, watermelon, pink grapefruit)",
            "Cruciferous vegetables (broccoli, Brussels sprouts, kale)",
            "Citrus fruits and bell peppers (high in vitamin C to protect cells)",
            "Green tea and black tea for rich polyphenol antioxidants"
        ],
        "avoid": [
            "Excessive red meat and processed meats (bacon, sausage)",
            "Highly processed snack foods and refined sugars",
            "Alcohol and sugary beverages which promote cellular inflammation"
        ]
    },
    "Atopic Dermatitis": {
        "eat": [
            "Anti-inflammatory omega-3 fatty fish (salmon, sardines)",
            "Probiotic-rich fermented foods (yogurt, kefir, sauerkraut, miso)",
            "Quercetin-rich foods (apples, onions, blueberries, spinach) which act as natural antihistamines",
            "Vitamin E rich foods (almonds, sunflower seeds, avocados)"
        ],
        "avoid": [
            "Common allergy triggers if sensitive (eggs, peanuts, soy, wheat, cow's milk)",
            "Refined sugars and processed foods which trigger systemic inflammation",
            "Artificial preservatives and food colorings"
        ]
    },
    "Bullous Disease": {
        "eat": [
            "Soft, nutrient-dense foods (mashed potatoes, scrambled eggs, smoothies) if oral blisters are present",
            "High-protein foods (chicken, fish, tofu) to assist with skin tissue repair",
            "Leafy green vegetables and zinc supplements (to support wound healing)",
            "Plenty of fluids (water, broth) to stay hydrated if skin barrier is leaking"
        ],
        "avoid": [
            "Hard, crunchy, or sharp foods (chips, toast, nuts) which can damage oral blisters",
            "Spicy foods, acidic fruits (citrus), and hot liquids which cause burning pain",
            "Gluten-containing grains (wheat, rye, barley) if diagnosed with Dermatitis Herpetiformis"
        ]
    },
    "Cellulitis and Bacterial Infections": {
        "eat": [
            "Immune-boosting vitamin C foods (oranges, kiwi, strawberries, bell peppers)",
            "Garlic and ginger (natural antimicrobial and anti-inflammatory properties)",
            "High-quality proteins (chicken, eggs, lean beef) to rebuild damaged tissue",
            "Plenty of clean water and herbal teas for hydration and toxin clearance"
        ],
        "avoid": [
            "Refined sugars (soda, candy) which can inhibit white blood cell function",
            "Highly processed foods and trans fats",
            "Alcohol, which impairs immune response and dehydrates the body"
        ]
    },
    "Eczema": {
        "eat": [
            "Omega-3 fatty acids (salmon, walnuts, chia seeds)",
            "Flavonoid-rich fruits and vegetables (berries, apples, broccoli)",
            "Probiotic foods (kefir, yogurt, tempeh) to support gut-skin axis health",
            "Vitamin D rich foods (egg yolks, fortified milk, mushrooms)"
        ],
        "avoid": [
            "Potential inflammatory food triggers (gluten, dairy, eggs, soy, peanuts)",
            "Refined sugars and artificial sweeteners",
            "Packaged foods with high sodium and artificial additives"
        ]
    },
    "Exanthems and Drug Eruptions": {
        "eat": [
            "Highly hydrating foods (cucumber, celery, watermelon, bone broth)",
            "Mild, easily digestible foods (rice, bananas, applesauce)",
            "Antioxidant-rich berries to combat oxidative stress",
            "Herbal teas (chamomile, peppermint) to soothe systemic irritation"
        ],
        "avoid": [
            "Spicy, hot, or highly seasoned dishes that increase body heat",
            "Alcohol and caffeine which act as vasodilators and can worsen itching",
            "Heavy, greasy, or deeply fried foods"
        ]
    },
    "Hair Loss and Alopecia": {
        "eat": [
            "Protein-rich foods (eggs, chicken, fish, legumes) as hair is made of protein",
            "Iron-rich foods (spinach, red meat, lentils, pumpkin seeds)",
            "Zinc-rich foods (oysters, beef, chickpeas)",
            "Biotin-rich foods (sweet potatoes, egg yolks, almonds, yeast)"
        ],
        "avoid": [
            "Refined sugars and simple carbs which can raise insulin and exacerbate hair loss",
            "Excessive intake of raw egg whites (which contains avidin, blocking biotin absorption)",
            "High-mercury fish (swordfish, king mackerel) which can trigger shedding"
        ]
    },
    "Herpes and STDs": {
        "eat": [
            "Lysine-rich foods (fish, chicken, beef, dairy, beans) which help inhibit viral replication",
            "Antioxidant-rich colorful vegetables (red peppers, broccoli, carrots)",
            "Garlic and onions (exhibit natural antiviral activities)",
            "Immune-supporting vitamin C and zinc sources"
        ],
        "avoid": [
            "Arginine-rich foods (chocolate, peanuts, almonds, walnuts, hazelnuts, sesame seeds, gelatin) which feed the virus",
            "Highly refined sugars and processed flours",
            "Alcohol, which weakens the immune system's control over viral outbreaks"
        ]
    },
    "Light Diseases and Pigmentation Disorders": {
        "eat": [
            "Beta-carotene rich foods (carrots, sweet potatoes, pumpkin, spinach)",
            "Polyphenol-rich foods (dark chocolate, green tea, pomegranate, berries)",
            "Omega-3 fatty acids to help downregulate UV-induced inflammatory pathways",
            "Vitamin C and E rich foods to shield cells from solar radiation damage"
        ],
        "avoid": [
            "Refined carbohydrates and high-fructose corn syrup",
            "Excessive sodium and processed meats",
            "Foods that contain psoralens (like celery, parsley, figs, limes) in large amounts if highly photosensitive"
        ]
    },
    "Lupus and Connective Tissue Diseases": {
        "eat": [
            "Omega-3 fatty acids (salmon, walnuts) to reduce lupus-related inflammation",
            "Calcium and Vitamin D rich foods (yogurt, tofu, sardines) to combat bone loss from steroid therapies",
            "Antioxidant-rich fresh vegetables and fruits",
            "Whole grains (brown rice, quinoa) for steady energy levels"
        ],
        "avoid": [
            "Alfalfa sprouts and seeds (contain L-canavanine, which can trigger immune responses and lupus flares)",
            "Excessive garlic (contains active substances that stimulate the immune system, potentially triggering flares)",
            "Saturated fats, trans fats, and highly processed foods",
            "Alcohol, especially when taking immunosuppressant medications"
        ]
    },
    "Melanoma and Skin Cancer": {
        "eat": [
            "Cruciferous vegetables (broccoli, cauliflower, Brussels sprouts) containing sulforaphane",
            "Lycopene-dense foods (tomatoes, watermelon) to protect cells from UV mutation",
            "Selenium-rich foods (Brazil nuts, tuna, sunflower seeds)",
            "Citrus fruits, berries, and leafy greens for vitamin diversity"
        ],
        "avoid": [
            "Charred or highly grilled meats (contain carcinogenic heterocyclic amines)",
            "Highly processed foods, refined sugars, and trans fats",
            "Excessive alcohol consumption"
        ]
    },
    "Nail Fungus and Nail Diseases": {
        "eat": [
            "Probiotic-rich foods (kefir, yogurt, kimchi, kombucha) to crowd out fungal overgrowth",
            "Garlic (contains ajoene, a potent organic sulfur compound with strong antifungal properties)",
            "Coconut oil (rich in caprylic and lauric acids, which destroy fungal cell membranes)",
            "Protein, iron, and zinc to support healthy, strong nail growth"
        ],
        "avoid": [
            "Sugars, sweeteners, and refined carbohydrates (which directly fuel fungal/Candida growth)",
            "Alcohol and yeasty fermented items (beer, bread)",
            "Dairy products if they cause digestive sensitivity and promote yeast overgrowth"
        ]
    },
    "Normal Skin": {
        "eat": [
            "Avocados and olive oil (rich in healthy monounsaturated fats for skin moisture)",
            "Colorful berries (blueberries, raspberries) for high antioxidant protection",
            "Fatty fish (salmon, tuna) for skin barrier resilience",
            "At least 8-10 glasses of clean water daily for internal hydration"
        ],
        "avoid": [
            "Excessive salt and sodium-rich packaged meals (can dehydrate skin and cause puffiness)",
            "Highly refined sugars and sodas (cause glycation, damaging skin collagen and aging skin)",
            "Excessive caffeine and alcohol"
        ]
    },
    "Poison Ivy and Contact Dermatitis": {
        "eat": [
            "Hydrating, cooling foods (cucumbers, celery, melon, coconut water)",
            "Vitamin C rich fruits to support cellular skin repair",
            "Anti-inflammatory spices (turmeric, ginger) added to meals",
            "Fiber-rich grains and clean proteins"
        ],
        "avoid": [
            "Sugary baked goods and processed candy",
            "Highly processed foods and hydrogenated oils",
            "Alcohol and hot/spicy foods"
        ]
    },
    "Psoriasis and Lichen Planus": {
        "eat": [
            "Anti-inflammatory Mediterranean-style diet (heavy on extra virgin olive oil, vegetables, nuts)",
            "Cold-water fatty fish (salmon, sardines, cod)",
            "Turmeric and ginger (powerful natural inhibitors of inflammatory cytokines)",
            "Fiber-rich fruits, vegetables, and gluten-free grains (quinoa, oats)"
        ],
        "avoid": [
            "Nightshade family plants if personally sensitive (tomatoes, white potatoes, eggplants, bell peppers)",
            "Gluten-containing grains (wheat, barley, rye) as psoriasis has high co-occurrence with gluten sensitivity",
            "Alcohol (triggers liver inflammatory pathways and worsens flares)",
            "Red meat and dairy products (contain arachidonic acid, which fuels inflammation)"
        ]
    },
    "Scabies and Infestations": {
        "eat": [
            "Garlic and onions (contain sulfur compounds that help the body fight off parasitic stress)",
            "Anti-inflammatory leafy green vegetables (kale, spinach, Swiss chard)",
            "Zinc-rich seeds and protein to rebuild skin barrier post-scratching",
            "Plenty of water to help flush out metabolic waste"
        ],
        "avoid": [
            "Refined sugars and processed sweet treats",
            "Saturated trans fats and junk food",
            "Excessive alcohol"
        ]
    },
    "Seborrheic Keratoses and Benign Tumors": {
        "eat": [
            "Whole foods diet rich in antioxidants (berries, carrots, leafy greens)",
            "Foods high in vitamin C (citrus, bell peppers) and vitamin E (sunflower seeds, almonds)",
            "Healthy plant fats (olive oil, avocados)",
            "Green tea"
        ],
        "avoid": [
            "Deep-fried foods and trans fats",
            "Refined sugars and high-fructose corn syrup",
            "Highly processed snack items"
        ]
    },
    "Systemic Disease": {
        "eat": [
            "High-fiber whole foods (beans, legumes, oats, vegetables) to maintain stable blood sugar",
            "Lean clean proteins (chicken, turkey, fish, tofu)",
            "Healthy plant-based fats (nuts, seeds, olive oil)",
            "Antioxidant-dense leafy greens"
        ],
        "avoid": [
            "Refined sugars and high-glycemic white flour products",
            "Excessive sodium and processed, canned, or cured meats",
            "Highly processed foods and artificial additives"
        ]
    },
    "Tinea and Fungal Infections": {
        "eat": [
            "Garlic, onions, and leeks (contain allicin, a natural antifungal compound)",
            "Extra virgin coconut oil (rich in caprylic acid, a medium-chain fatty acid that kills yeast/fungus)",
            "Probiotic fermented foods (unsweetened yogurt, kefir, apple cider vinegar)",
            "Oregano and thyme (contain carvacrol and thymol, strong antifungal agents)"
        ],
        "avoid": [
            "Refined sugars, honey, maple syrup, and sweet fruits (fuel fungal expansion)",
            "Refined flour products (white bread, pasta) and yeasty foods",
            "Beer, wine, and other alcoholic beverages"
        ]
    },
    "Urticaria and Hives": {
        "eat": [
            "Low-histamine fresh foods (fresh chicken, freshly caught fish, fresh vegetables except tomatoes/spinach)",
            "Non-citrus fruits (apples, pears, grapes, melons, berries)",
            "Gluten-free grains (rice, quinoa, oats)",
            "Plenty of fresh pure water"
        ],
        "avoid": [
            "High-histamine foods (fermented items, sauerkraut, soy sauce, vinegar, yogurt, aged cheeses)",
            "Cured, smoked, or processed meats (salami, bacon, ham) and canned fish",
            "Histamine-liberating foods (tomatoes, spinach, eggplant, citrus fruits, strawberries, shellfish, chocolate)",
            "Alcohol and artificial preservatives (benzoates, sulfites)"
        ]
    },
    "Vascular Tumors": {
        "eat": [
            "Leafy green vegetables (rich in vitamin K to support healthy blood clotting)",
            "Flavonoid-rich fruits and vegetables to support vascular health",
            "Lean clean proteins and whole grains",
            "Antioxidant-rich berries"
        ],
        "avoid": [
            "Highly processed meats and trans fats",
            "Refined sugars and artificial sweetening agents",
            "Excessive sodium"
        ]
    },
    "Vasculitis": {
        "eat": [
            "Anti-inflammatory foods (fatty fish, olive oil, turmeric, berries)",
            "Low-sodium foods (helps manage edema/swelling in limbs)",
            "Lean proteins (chicken, turkey, fish) to maintain muscle mass",
            "Calcium and Vitamin D rich foods (protects bones during potential steroid therapy)"
        ],
        "avoid": [
            "Highly processed foods, canned soups, and salted snacks (promote fluid retention)",
            "Refined sugars, white flour, and sodas",
            "Alcohol, which can cause vessel dilation and interact with medications"
        ]
    },
    "Viral Infections (Warts, Molluscum)": {
        "eat": [
            "Vitamin C rich immune-supportive foods (bell peppers, broccoli, kiwi, strawberries)",
            "Zinc-rich foods (pumpkin seeds, chickpeas, shellfish) to enhance antiviral T-cell response",
            "Cruciferous vegetables (cabbage, kale) containing indole-3-carbinol, which helps fight HPV",
            "Garlic (natural antiviral)"
        ],
        "avoid": [
            "Refined sugars, candy, and sugary drinks (suppress immune system function)",
            "Ultra-processed packaged foods and fast food",
            "Excessive alcohol and caffeine"
        ]
    }
}

def get_disease_diet(disease_name):
    """Look up dietary recommendations. Returns dict or None."""
    return DISEASE_DIET.get(disease_name)
