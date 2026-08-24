export const SIMILAR_DISEASE_IMAGES: Record<string, any> = {
  'acne_and_rosacea': require('../../assets/diseases/acne_and_rosacea.jpg'),
  'actinic_keratosis_and_malignant_lesions': require('../../assets/diseases/actinic_keratosis_and_malignant_lesions.jpg'),
  'atopic_dermatitis': require('../../assets/diseases/atopic_dermatitis.jpg'),
  'bullous_disease': require('../../assets/diseases/bullous_disease.jpg'),
  'cellulitis_and_bacterial_infections': require('../../assets/diseases/cellulitis_and_bacterial_infections.jpg'),
  'eczema': require('../../assets/diseases/eczema.jpg'),
  'exanthems_and_drug_eruptions': require('../../assets/diseases/exanthems_and_drug_eruptions.jpg'),
  'hair_loss_and_alopecia': require('../../assets/diseases/hair_loss_and_alopecia.jpg'),
  'herpes_and_stds': require('../../assets/diseases/herpes_and_stds.jpg'),
  'light_diseases_and_pigmentation_disorders': require('../../assets/diseases/light_diseases_and_pigmentation_disorders.jpg'),
  'lupus_and_connective_tissue_diseases': require('../../assets/diseases/lupus_and_connective_tissue_diseases.jpg'),
  'melanoma_and_skin_cancer': require('../../assets/diseases/melanoma_and_skin_cancer.jpg'),
  'nail_fungus_and_nail_diseases': require('../../assets/diseases/nail_fungus_and_nail_diseases.jpg'),
  'normal_skin': require('../../assets/diseases/normal_skin.jpg'),
  'poison_ivy_and_contact_dermatitis': require('../../assets/diseases/poison_ivy_and_contact_dermatitis.jpg'),
  'psoriasis_and_lichen_planus': require('../../assets/diseases/psoriasis_and_lichen_planus.jpg'),
  'scabies_and_infestations': require('../../assets/diseases/scabies_and_infestations.jpg'),
  'seborrheic_keratoses_and_benign_tumors': require('../../assets/diseases/seborrheic_keratoses_and_benign_tumors.jpg'),
  'systemic_disease': require('../../assets/diseases/systemic_disease.jpg'),
  'tinea_and_fungal_infections': require('../../assets/diseases/tinea_and_fungal_infections.jpg'),
  'urticaria_and_hives': require('../../assets/diseases/urticaria_and_hives.jpg'),
  'vascular_tumors': require('../../assets/diseases/vascular_tumors.jpg'),
  'vasculitis': require('../../assets/diseases/vasculitis.jpg'),
  'viral_infections_warts_molluscum': require('../../assets/diseases/viral_infections_warts_molluscum.jpg'),
};

export const DISEASE_DATA = [
  {
    id: 'acne_and_rosacea',
    baseDisease: {
      id: 'acne_and_rosacea',
      name: 'Acne and Rosacea',
      image: SIMILAR_DISEASE_IMAGES['acne_and_rosacea'],
      shortDescription: 'A condition categorized as Acne and Rosacea.',
      commonSigns: ['Varies by specific condition type', 'Consult a dermatologist for exact signs'],
    },
    similarDiseases: [
      {
        id: 'actinic_keratosis_and_malignant_lesions',
        name: 'Actinic Keratosis and Malignant Lesions',
        image: SIMILAR_DISEASE_IMAGES['actinic_keratosis_and_malignant_lesions'],
        whySimilar: 'May share similar visual characteristics or affected areas.',
        howDifferent: 'Acne and Rosacea has distinct clinical features compared to Actinic Keratosis and Malignant Lesions.',
        commonSigns: ['Varies by specific condition', 'Requires clinical evaluation'],
        comparisonPoints: [
          { feature: 'Appearance', base: 'Specific to Acne and Rosacea', similar: 'Specific to Actinic Keratosis and Malignant Lesions' },
          { feature: 'Severity', base: 'Varies', similar: 'Varies' }
        ]
      }
    ]
  },
  {
    id: 'actinic_keratosis_and_malignant_lesions',
    baseDisease: {
      id: 'actinic_keratosis_and_malignant_lesions',
      name: 'Actinic Keratosis and Malignant Lesions',
      image: SIMILAR_DISEASE_IMAGES['actinic_keratosis_and_malignant_lesions'],
      shortDescription: 'A condition categorized as Actinic Keratosis and Malignant Lesions.',
      commonSigns: ['Varies by specific condition type', 'Consult a dermatologist for exact signs'],
    },
    similarDiseases: [
      {
        id: 'atopic_dermatitis',
        name: 'Atopic Dermatitis',
        image: SIMILAR_DISEASE_IMAGES['atopic_dermatitis'],
        whySimilar: 'May share similar visual characteristics or affected areas.',
        howDifferent: 'Actinic Keratosis and Malignant Lesions has distinct clinical features compared to Atopic Dermatitis.',
        commonSigns: ['Varies by specific condition', 'Requires clinical evaluation'],
        comparisonPoints: [
          { feature: 'Appearance', base: 'Specific to Actinic Keratosis and Malignant Lesions', similar: 'Specific to Atopic Dermatitis' },
          { feature: 'Severity', base: 'Varies', similar: 'Varies' }
        ]
      }
    ]
  },
  {
    id: 'atopic_dermatitis',
    baseDisease: {
      id: 'atopic_dermatitis',
      name: 'Atopic Dermatitis',
      image: SIMILAR_DISEASE_IMAGES['atopic_dermatitis'],
      shortDescription: 'A condition categorized as Atopic Dermatitis.',
      commonSigns: ['Varies by specific condition type', 'Consult a dermatologist for exact signs'],
    },
    similarDiseases: [
      {
        id: 'bullous_disease',
        name: 'Bullous Disease',
        image: SIMILAR_DISEASE_IMAGES['bullous_disease'],
        whySimilar: 'May share similar visual characteristics or affected areas.',
        howDifferent: 'Atopic Dermatitis has distinct clinical features compared to Bullous Disease.',
        commonSigns: ['Varies by specific condition', 'Requires clinical evaluation'],
        comparisonPoints: [
          { feature: 'Appearance', base: 'Specific to Atopic Dermatitis', similar: 'Specific to Bullous Disease' },
          { feature: 'Severity', base: 'Varies', similar: 'Varies' }
        ]
      }
    ]
  },
  {
    id: 'bullous_disease',
    baseDisease: {
      id: 'bullous_disease',
      name: 'Bullous Disease',
      image: SIMILAR_DISEASE_IMAGES['bullous_disease'],
      shortDescription: 'A condition categorized as Bullous Disease.',
      commonSigns: ['Varies by specific condition type', 'Consult a dermatologist for exact signs'],
    },
    similarDiseases: [
      {
        id: 'cellulitis_and_bacterial_infections',
        name: 'Cellulitis and Bacterial Infections',
        image: SIMILAR_DISEASE_IMAGES['cellulitis_and_bacterial_infections'],
        whySimilar: 'May share similar visual characteristics or affected areas.',
        howDifferent: 'Bullous Disease has distinct clinical features compared to Cellulitis and Bacterial Infections.',
        commonSigns: ['Varies by specific condition', 'Requires clinical evaluation'],
        comparisonPoints: [
          { feature: 'Appearance', base: 'Specific to Bullous Disease', similar: 'Specific to Cellulitis and Bacterial Infections' },
          { feature: 'Severity', base: 'Varies', similar: 'Varies' }
        ]
      }
    ]
  },
  {
    id: 'cellulitis_and_bacterial_infections',
    baseDisease: {
      id: 'cellulitis_and_bacterial_infections',
      name: 'Cellulitis and Bacterial Infections',
      image: SIMILAR_DISEASE_IMAGES['cellulitis_and_bacterial_infections'],
      shortDescription: 'A condition categorized as Cellulitis and Bacterial Infections.',
      commonSigns: ['Varies by specific condition type', 'Consult a dermatologist for exact signs'],
    },
    similarDiseases: [
      {
        id: 'eczema',
        name: 'Eczema',
        image: SIMILAR_DISEASE_IMAGES['eczema'],
        whySimilar: 'May share similar visual characteristics or affected areas.',
        howDifferent: 'Cellulitis and Bacterial Infections has distinct clinical features compared to Eczema.',
        commonSigns: ['Varies by specific condition', 'Requires clinical evaluation'],
        comparisonPoints: [
          { feature: 'Appearance', base: 'Specific to Cellulitis and Bacterial Infections', similar: 'Specific to Eczema' },
          { feature: 'Severity', base: 'Varies', similar: 'Varies' }
        ]
      }
    ]
  },
  {
    id: 'eczema',
    baseDisease: {
      id: 'eczema',
      name: 'Eczema',
      image: SIMILAR_DISEASE_IMAGES['eczema'],
      shortDescription: 'A condition categorized as Eczema.',
      commonSigns: ['Varies by specific condition type', 'Consult a dermatologist for exact signs'],
    },
    similarDiseases: [
      {
        id: 'exanthems_and_drug_eruptions',
        name: 'Exanthems and Drug Eruptions',
        image: SIMILAR_DISEASE_IMAGES['exanthems_and_drug_eruptions'],
        whySimilar: 'May share similar visual characteristics or affected areas.',
        howDifferent: 'Eczema has distinct clinical features compared to Exanthems and Drug Eruptions.',
        commonSigns: ['Varies by specific condition', 'Requires clinical evaluation'],
        comparisonPoints: [
          { feature: 'Appearance', base: 'Specific to Eczema', similar: 'Specific to Exanthems and Drug Eruptions' },
          { feature: 'Severity', base: 'Varies', similar: 'Varies' }
        ]
      }
    ]
  },
  {
    id: 'exanthems_and_drug_eruptions',
    baseDisease: {
      id: 'exanthems_and_drug_eruptions',
      name: 'Exanthems and Drug Eruptions',
      image: SIMILAR_DISEASE_IMAGES['exanthems_and_drug_eruptions'],
      shortDescription: 'A condition categorized as Exanthems and Drug Eruptions.',
      commonSigns: ['Varies by specific condition type', 'Consult a dermatologist for exact signs'],
    },
    similarDiseases: [
      {
        id: 'hair_loss_and_alopecia',
        name: 'Hair Loss and Alopecia',
        image: SIMILAR_DISEASE_IMAGES['hair_loss_and_alopecia'],
        whySimilar: 'May share similar visual characteristics or affected areas.',
        howDifferent: 'Exanthems and Drug Eruptions has distinct clinical features compared to Hair Loss and Alopecia.',
        commonSigns: ['Varies by specific condition', 'Requires clinical evaluation'],
        comparisonPoints: [
          { feature: 'Appearance', base: 'Specific to Exanthems and Drug Eruptions', similar: 'Specific to Hair Loss and Alopecia' },
          { feature: 'Severity', base: 'Varies', similar: 'Varies' }
        ]
      }
    ]
  },
  {
    id: 'hair_loss_and_alopecia',
    baseDisease: {
      id: 'hair_loss_and_alopecia',
      name: 'Hair Loss and Alopecia',
      image: SIMILAR_DISEASE_IMAGES['hair_loss_and_alopecia'],
      shortDescription: 'A condition categorized as Hair Loss and Alopecia.',
      commonSigns: ['Varies by specific condition type', 'Consult a dermatologist for exact signs'],
    },
    similarDiseases: [
      {
        id: 'herpes_and_stds',
        name: 'Herpes and STDs',
        image: SIMILAR_DISEASE_IMAGES['herpes_and_stds'],
        whySimilar: 'May share similar visual characteristics or affected areas.',
        howDifferent: 'Hair Loss and Alopecia has distinct clinical features compared to Herpes and STDs.',
        commonSigns: ['Varies by specific condition', 'Requires clinical evaluation'],
        comparisonPoints: [
          { feature: 'Appearance', base: 'Specific to Hair Loss and Alopecia', similar: 'Specific to Herpes and STDs' },
          { feature: 'Severity', base: 'Varies', similar: 'Varies' }
        ]
      }
    ]
  },
  {
    id: 'herpes_and_stds',
    baseDisease: {
      id: 'herpes_and_stds',
      name: 'Herpes and STDs',
      image: SIMILAR_DISEASE_IMAGES['herpes_and_stds'],
      shortDescription: 'A condition categorized as Herpes and STDs.',
      commonSigns: ['Varies by specific condition type', 'Consult a dermatologist for exact signs'],
    },
    similarDiseases: [
      {
        id: 'light_diseases_and_pigmentation_disorders',
        name: 'Light Diseases and Pigmentation Disorders',
        image: SIMILAR_DISEASE_IMAGES['light_diseases_and_pigmentation_disorders'],
        whySimilar: 'May share similar visual characteristics or affected areas.',
        howDifferent: 'Herpes and STDs has distinct clinical features compared to Light Diseases and Pigmentation Disorders.',
        commonSigns: ['Varies by specific condition', 'Requires clinical evaluation'],
        comparisonPoints: [
          { feature: 'Appearance', base: 'Specific to Herpes and STDs', similar: 'Specific to Light Diseases and Pigmentation Disorders' },
          { feature: 'Severity', base: 'Varies', similar: 'Varies' }
        ]
      }
    ]
  },
  {
    id: 'light_diseases_and_pigmentation_disorders',
    baseDisease: {
      id: 'light_diseases_and_pigmentation_disorders',
      name: 'Light Diseases and Pigmentation Disorders',
      image: SIMILAR_DISEASE_IMAGES['light_diseases_and_pigmentation_disorders'],
      shortDescription: 'A condition categorized as Light Diseases and Pigmentation Disorders.',
      commonSigns: ['Varies by specific condition type', 'Consult a dermatologist for exact signs'],
    },
    similarDiseases: [
      {
        id: 'lupus_and_connective_tissue_diseases',
        name: 'Lupus and Connective Tissue Diseases',
        image: SIMILAR_DISEASE_IMAGES['lupus_and_connective_tissue_diseases'],
        whySimilar: 'May share similar visual characteristics or affected areas.',
        howDifferent: 'Light Diseases and Pigmentation Disorders has distinct clinical features compared to Lupus and Connective Tissue Diseases.',
        commonSigns: ['Varies by specific condition', 'Requires clinical evaluation'],
        comparisonPoints: [
          { feature: 'Appearance', base: 'Specific to Light Diseases and Pigmentation Disorders', similar: 'Specific to Lupus and Connective Tissue Diseases' },
          { feature: 'Severity', base: 'Varies', similar: 'Varies' }
        ]
      }
    ]
  },
  {
    id: 'lupus_and_connective_tissue_diseases',
    baseDisease: {
      id: 'lupus_and_connective_tissue_diseases',
      name: 'Lupus and Connective Tissue Diseases',
      image: SIMILAR_DISEASE_IMAGES['lupus_and_connective_tissue_diseases'],
      shortDescription: 'A condition categorized as Lupus and Connective Tissue Diseases.',
      commonSigns: ['Varies by specific condition type', 'Consult a dermatologist for exact signs'],
    },
    similarDiseases: [
      {
        id: 'melanoma_and_skin_cancer',
        name: 'Melanoma and Skin Cancer',
        image: SIMILAR_DISEASE_IMAGES['melanoma_and_skin_cancer'],
        whySimilar: 'May share similar visual characteristics or affected areas.',
        howDifferent: 'Lupus and Connective Tissue Diseases has distinct clinical features compared to Melanoma and Skin Cancer.',
        commonSigns: ['Varies by specific condition', 'Requires clinical evaluation'],
        comparisonPoints: [
          { feature: 'Appearance', base: 'Specific to Lupus and Connective Tissue Diseases', similar: 'Specific to Melanoma and Skin Cancer' },
          { feature: 'Severity', base: 'Varies', similar: 'Varies' }
        ]
      }
    ]
  },
  {
    id: 'melanoma_and_skin_cancer',
    baseDisease: {
      id: 'melanoma_and_skin_cancer',
      name: 'Melanoma and Skin Cancer',
      image: SIMILAR_DISEASE_IMAGES['melanoma_and_skin_cancer'],
      shortDescription: 'A condition categorized as Melanoma and Skin Cancer.',
      commonSigns: ['Varies by specific condition type', 'Consult a dermatologist for exact signs'],
    },
    similarDiseases: [
      {
        id: 'nail_fungus_and_nail_diseases',
        name: 'Nail Fungus and Nail Diseases',
        image: SIMILAR_DISEASE_IMAGES['nail_fungus_and_nail_diseases'],
        whySimilar: 'May share similar visual characteristics or affected areas.',
        howDifferent: 'Melanoma and Skin Cancer has distinct clinical features compared to Nail Fungus and Nail Diseases.',
        commonSigns: ['Varies by specific condition', 'Requires clinical evaluation'],
        comparisonPoints: [
          { feature: 'Appearance', base: 'Specific to Melanoma and Skin Cancer', similar: 'Specific to Nail Fungus and Nail Diseases' },
          { feature: 'Severity', base: 'Varies', similar: 'Varies' }
        ]
      }
    ]
  },
  {
    id: 'nail_fungus_and_nail_diseases',
    baseDisease: {
      id: 'nail_fungus_and_nail_diseases',
      name: 'Nail Fungus and Nail Diseases',
      image: SIMILAR_DISEASE_IMAGES['nail_fungus_and_nail_diseases'],
      shortDescription: 'A condition categorized as Nail Fungus and Nail Diseases.',
      commonSigns: ['Varies by specific condition type', 'Consult a dermatologist for exact signs'],
    },
    similarDiseases: [
      {
        id: 'normal_skin',
        name: 'Normal Skin',
        image: SIMILAR_DISEASE_IMAGES['normal_skin'],
        whySimilar: 'May share similar visual characteristics or affected areas.',
        howDifferent: 'Nail Fungus and Nail Diseases has distinct clinical features compared to Normal Skin.',
        commonSigns: ['Varies by specific condition', 'Requires clinical evaluation'],
        comparisonPoints: [
          { feature: 'Appearance', base: 'Specific to Nail Fungus and Nail Diseases', similar: 'Specific to Normal Skin' },
          { feature: 'Severity', base: 'Varies', similar: 'Varies' }
        ]
      }
    ]
  },
  {
    id: 'normal_skin',
    baseDisease: {
      id: 'normal_skin',
      name: 'Normal Skin',
      image: SIMILAR_DISEASE_IMAGES['normal_skin'],
      shortDescription: 'A condition categorized as Normal Skin.',
      commonSigns: ['Varies by specific condition type', 'Consult a dermatologist for exact signs'],
    },
    similarDiseases: [
      {
        id: 'poison_ivy_and_contact_dermatitis',
        name: 'Poison Ivy and Contact Dermatitis',
        image: SIMILAR_DISEASE_IMAGES['poison_ivy_and_contact_dermatitis'],
        whySimilar: 'May share similar visual characteristics or affected areas.',
        howDifferent: 'Normal Skin has distinct clinical features compared to Poison Ivy and Contact Dermatitis.',
        commonSigns: ['Varies by specific condition', 'Requires clinical evaluation'],
        comparisonPoints: [
          { feature: 'Appearance', base: 'Specific to Normal Skin', similar: 'Specific to Poison Ivy and Contact Dermatitis' },
          { feature: 'Severity', base: 'Varies', similar: 'Varies' }
        ]
      }
    ]
  },
  {
    id: 'poison_ivy_and_contact_dermatitis',
    baseDisease: {
      id: 'poison_ivy_and_contact_dermatitis',
      name: 'Poison Ivy and Contact Dermatitis',
      image: SIMILAR_DISEASE_IMAGES['poison_ivy_and_contact_dermatitis'],
      shortDescription: 'A condition categorized as Poison Ivy and Contact Dermatitis.',
      commonSigns: ['Varies by specific condition type', 'Consult a dermatologist for exact signs'],
    },
    similarDiseases: [
      {
        id: 'psoriasis_and_lichen_planus',
        name: 'Psoriasis and Lichen Planus',
        image: SIMILAR_DISEASE_IMAGES['psoriasis_and_lichen_planus'],
        whySimilar: 'May share similar visual characteristics or affected areas.',
        howDifferent: 'Poison Ivy and Contact Dermatitis has distinct clinical features compared to Psoriasis and Lichen Planus.',
        commonSigns: ['Varies by specific condition', 'Requires clinical evaluation'],
        comparisonPoints: [
          { feature: 'Appearance', base: 'Specific to Poison Ivy and Contact Dermatitis', similar: 'Specific to Psoriasis and Lichen Planus' },
          { feature: 'Severity', base: 'Varies', similar: 'Varies' }
        ]
      }
    ]
  },
  {
    id: 'psoriasis_and_lichen_planus',
    baseDisease: {
      id: 'psoriasis_and_lichen_planus',
      name: 'Psoriasis and Lichen Planus',
      image: SIMILAR_DISEASE_IMAGES['psoriasis_and_lichen_planus'],
      shortDescription: 'A condition categorized as Psoriasis and Lichen Planus.',
      commonSigns: ['Varies by specific condition type', 'Consult a dermatologist for exact signs'],
    },
    similarDiseases: [
      {
        id: 'scabies_and_infestations',
        name: 'Scabies and Infestations',
        image: SIMILAR_DISEASE_IMAGES['scabies_and_infestations'],
        whySimilar: 'May share similar visual characteristics or affected areas.',
        howDifferent: 'Psoriasis and Lichen Planus has distinct clinical features compared to Scabies and Infestations.',
        commonSigns: ['Varies by specific condition', 'Requires clinical evaluation'],
        comparisonPoints: [
          { feature: 'Appearance', base: 'Specific to Psoriasis and Lichen Planus', similar: 'Specific to Scabies and Infestations' },
          { feature: 'Severity', base: 'Varies', similar: 'Varies' }
        ]
      }
    ]
  },
  {
    id: 'scabies_and_infestations',
    baseDisease: {
      id: 'scabies_and_infestations',
      name: 'Scabies and Infestations',
      image: SIMILAR_DISEASE_IMAGES['scabies_and_infestations'],
      shortDescription: 'A condition categorized as Scabies and Infestations.',
      commonSigns: ['Varies by specific condition type', 'Consult a dermatologist for exact signs'],
    },
    similarDiseases: [
      {
        id: 'seborrheic_keratoses_and_benign_tumors',
        name: 'Seborrheic Keratoses and Benign Tumors',
        image: SIMILAR_DISEASE_IMAGES['seborrheic_keratoses_and_benign_tumors'],
        whySimilar: 'May share similar visual characteristics or affected areas.',
        howDifferent: 'Scabies and Infestations has distinct clinical features compared to Seborrheic Keratoses and Benign Tumors.',
        commonSigns: ['Varies by specific condition', 'Requires clinical evaluation'],
        comparisonPoints: [
          { feature: 'Appearance', base: 'Specific to Scabies and Infestations', similar: 'Specific to Seborrheic Keratoses and Benign Tumors' },
          { feature: 'Severity', base: 'Varies', similar: 'Varies' }
        ]
      }
    ]
  },
  {
    id: 'seborrheic_keratoses_and_benign_tumors',
    baseDisease: {
      id: 'seborrheic_keratoses_and_benign_tumors',
      name: 'Seborrheic Keratoses and Benign Tumors',
      image: SIMILAR_DISEASE_IMAGES['seborrheic_keratoses_and_benign_tumors'],
      shortDescription: 'A condition categorized as Seborrheic Keratoses and Benign Tumors.',
      commonSigns: ['Varies by specific condition type', 'Consult a dermatologist for exact signs'],
    },
    similarDiseases: [
      {
        id: 'systemic_disease',
        name: 'Systemic Disease',
        image: SIMILAR_DISEASE_IMAGES['systemic_disease'],
        whySimilar: 'May share similar visual characteristics or affected areas.',
        howDifferent: 'Seborrheic Keratoses and Benign Tumors has distinct clinical features compared to Systemic Disease.',
        commonSigns: ['Varies by specific condition', 'Requires clinical evaluation'],
        comparisonPoints: [
          { feature: 'Appearance', base: 'Specific to Seborrheic Keratoses and Benign Tumors', similar: 'Specific to Systemic Disease' },
          { feature: 'Severity', base: 'Varies', similar: 'Varies' }
        ]
      }
    ]
  },
  {
    id: 'systemic_disease',
    baseDisease: {
      id: 'systemic_disease',
      name: 'Systemic Disease',
      image: SIMILAR_DISEASE_IMAGES['systemic_disease'],
      shortDescription: 'A condition categorized as Systemic Disease.',
      commonSigns: ['Varies by specific condition type', 'Consult a dermatologist for exact signs'],
    },
    similarDiseases: [
      {
        id: 'tinea_and_fungal_infections',
        name: 'Tinea and Fungal Infections',
        image: SIMILAR_DISEASE_IMAGES['tinea_and_fungal_infections'],
        whySimilar: 'May share similar visual characteristics or affected areas.',
        howDifferent: 'Systemic Disease has distinct clinical features compared to Tinea and Fungal Infections.',
        commonSigns: ['Varies by specific condition', 'Requires clinical evaluation'],
        comparisonPoints: [
          { feature: 'Appearance', base: 'Specific to Systemic Disease', similar: 'Specific to Tinea and Fungal Infections' },
          { feature: 'Severity', base: 'Varies', similar: 'Varies' }
        ]
      }
    ]
  },
  {
    id: 'tinea_and_fungal_infections',
    baseDisease: {
      id: 'tinea_and_fungal_infections',
      name: 'Tinea and Fungal Infections',
      image: SIMILAR_DISEASE_IMAGES['tinea_and_fungal_infections'],
      shortDescription: 'A condition categorized as Tinea and Fungal Infections.',
      commonSigns: ['Varies by specific condition type', 'Consult a dermatologist for exact signs'],
    },
    similarDiseases: [
      {
        id: 'urticaria_and_hives',
        name: 'Urticaria and Hives',
        image: SIMILAR_DISEASE_IMAGES['urticaria_and_hives'],
        whySimilar: 'May share similar visual characteristics or affected areas.',
        howDifferent: 'Tinea and Fungal Infections has distinct clinical features compared to Urticaria and Hives.',
        commonSigns: ['Varies by specific condition', 'Requires clinical evaluation'],
        comparisonPoints: [
          { feature: 'Appearance', base: 'Specific to Tinea and Fungal Infections', similar: 'Specific to Urticaria and Hives' },
          { feature: 'Severity', base: 'Varies', similar: 'Varies' }
        ]
      }
    ]
  },
  {
    id: 'urticaria_and_hives',
    baseDisease: {
      id: 'urticaria_and_hives',
      name: 'Urticaria and Hives',
      image: SIMILAR_DISEASE_IMAGES['urticaria_and_hives'],
      shortDescription: 'A condition categorized as Urticaria and Hives.',
      commonSigns: ['Varies by specific condition type', 'Consult a dermatologist for exact signs'],
    },
    similarDiseases: [
      {
        id: 'vascular_tumors',
        name: 'Vascular Tumors',
        image: SIMILAR_DISEASE_IMAGES['vascular_tumors'],
        whySimilar: 'May share similar visual characteristics or affected areas.',
        howDifferent: 'Urticaria and Hives has distinct clinical features compared to Vascular Tumors.',
        commonSigns: ['Varies by specific condition', 'Requires clinical evaluation'],
        comparisonPoints: [
          { feature: 'Appearance', base: 'Specific to Urticaria and Hives', similar: 'Specific to Vascular Tumors' },
          { feature: 'Severity', base: 'Varies', similar: 'Varies' }
        ]
      }
    ]
  },
  {
    id: 'vascular_tumors',
    baseDisease: {
      id: 'vascular_tumors',
      name: 'Vascular Tumors',
      image: SIMILAR_DISEASE_IMAGES['vascular_tumors'],
      shortDescription: 'A condition categorized as Vascular Tumors.',
      commonSigns: ['Varies by specific condition type', 'Consult a dermatologist for exact signs'],
    },
    similarDiseases: [
      {
        id: 'vasculitis',
        name: 'Vasculitis',
        image: SIMILAR_DISEASE_IMAGES['vasculitis'],
        whySimilar: 'May share similar visual characteristics or affected areas.',
        howDifferent: 'Vascular Tumors has distinct clinical features compared to Vasculitis.',
        commonSigns: ['Varies by specific condition', 'Requires clinical evaluation'],
        comparisonPoints: [
          { feature: 'Appearance', base: 'Specific to Vascular Tumors', similar: 'Specific to Vasculitis' },
          { feature: 'Severity', base: 'Varies', similar: 'Varies' }
        ]
      }
    ]
  },
  {
    id: 'vasculitis',
    baseDisease: {
      id: 'vasculitis',
      name: 'Vasculitis',
      image: SIMILAR_DISEASE_IMAGES['vasculitis'],
      shortDescription: 'A condition categorized as Vasculitis.',
      commonSigns: ['Varies by specific condition type', 'Consult a dermatologist for exact signs'],
    },
    similarDiseases: [
      {
        id: 'viral_infections_warts_molluscum',
        name: 'Viral Infections (Warts, Molluscum)',
        image: SIMILAR_DISEASE_IMAGES['viral_infections_warts_molluscum'],
        whySimilar: 'May share similar visual characteristics or affected areas.',
        howDifferent: 'Vasculitis has distinct clinical features compared to Viral Infections (Warts, Molluscum).',
        commonSigns: ['Varies by specific condition', 'Requires clinical evaluation'],
        comparisonPoints: [
          { feature: 'Appearance', base: 'Specific to Vasculitis', similar: 'Specific to Viral Infections (Warts, Molluscum)' },
          { feature: 'Severity', base: 'Varies', similar: 'Varies' }
        ]
      }
    ]
  },
  {
    id: 'viral_infections_warts_molluscum',
    baseDisease: {
      id: 'viral_infections_warts_molluscum',
      name: 'Viral Infections (Warts, Molluscum)',
      image: SIMILAR_DISEASE_IMAGES['viral_infections_warts_molluscum'],
      shortDescription: 'A condition categorized as Viral Infections (Warts, Molluscum).',
      commonSigns: ['Varies by specific condition type', 'Consult a dermatologist for exact signs'],
    },
    similarDiseases: [
      {
        id: 'acne_and_rosacea',
        name: 'Acne and Rosacea',
        image: SIMILAR_DISEASE_IMAGES['acne_and_rosacea'],
        whySimilar: 'May share similar visual characteristics or affected areas.',
        howDifferent: 'Viral Infections (Warts, Molluscum) has distinct clinical features compared to Acne and Rosacea.',
        commonSigns: ['Varies by specific condition', 'Requires clinical evaluation'],
        comparisonPoints: [
          { feature: 'Appearance', base: 'Specific to Viral Infections (Warts, Molluscum)', similar: 'Specific to Acne and Rosacea' },
          { feature: 'Severity', base: 'Varies', similar: 'Varies' }
        ]
      }
    ]
  },
];
