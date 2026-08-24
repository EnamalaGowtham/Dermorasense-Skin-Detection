import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, LayoutAnimation, UIManager, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, AlertCircle, ChevronDown, ChevronUp, CheckCircle2, AlertTriangle, Activity } from 'lucide-react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Image Component with error handling - Hides entirely if image is missing or broken
const ValidatedImage = ({ source, className, onErrorProp }: any) => {
  return (
    <Image 
      source={source}
      className={className}
      resizeMode="cover"
      onError={onErrorProp}
    />
  );
};

// Single Source of Truth for Images
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

const SimilarDiseaseCard = ({ similarData, baseDiseaseName, onImageError }: any) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View className="bg-clinical-card border border-clinical-border rounded-2xl overflow-hidden mb-6">
      <TouchableOpacity 
        activeOpacity={0.8} 
        onPress={toggleExpand}
        className="p-4"
      >
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center">
            <Activity color="#00f2fe" size={20} className="mr-2" />
            <Text className="text-white font-bold text-lg">Similar: {similarData.name}</Text>
          </View>
          {expanded ? (
            <ChevronUp color="#94a3b8" size={24} />
          ) : (
            <ChevronDown color="#94a3b8" size={24} />
          )}
        </View>

        <ValidatedImage 
          source={similarData.image} 
          className="w-full h-48 rounded-xl mb-4 bg-slate-800"
          onErrorProp={() => onImageError(similarData.id)}
        />

        <Text className="text-white font-bold mb-1">Why it may look similar:</Text>
        <Text className="text-clinical-slate text-sm leading-relaxed mb-1">
          {similarData.whySimilar}
        </Text>
        
        {!expanded && (
          <Text className="text-clinical-teal text-sm font-semibold mt-2 text-center">
            View Details & Comparison
          </Text>
        )}
      </TouchableOpacity>

      {expanded && (
        <View className="px-4 pb-4 border-t border-clinical-border/50 pt-4">
          <View className="mb-4">
            <Text className="text-white font-bold mb-2 flex-row items-center">
              How it is different:
            </Text>
            <Text className="text-clinical-slate text-sm leading-relaxed">
              {similarData.howDifferent}
            </Text>
          </View>

          <View className="mb-4 bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
            <Text className="text-white font-bold mb-2">Common signs of {similarData.name}:</Text>
            {similarData.commonSigns.map((sign: string, idx: number) => (
              <View key={idx} className="flex-row items-start mb-1">
                <View className="w-1.5 h-1.5 rounded-full bg-clinical-teal mt-1.5 mr-2" />
                <Text className="text-clinical-slate text-sm flex-1">{sign}</Text>
              </View>
            ))}
          </View>

          <View>
            <Text className="text-white font-bold mb-3 text-lg">How to Tell Them Apart</Text>
            {similarData.comparisonPoints.map((point: any, idx: number) => (
              <View key={idx} className="mb-3 bg-[#0a1220] p-3 rounded-lg border border-clinical-border/30">
                <Text className="text-clinical-teal font-bold text-xs uppercase mb-2 tracking-wider">{point.feature}</Text>
                
                <View className="flex-row">
                  <View className="flex-1 pr-2 border-r border-slate-700/50">
                    <Text className="text-slate-400 text-xs mb-1">{baseDiseaseName}</Text>
                    <Text className="text-white text-sm font-medium">{point.base}</Text>
                  </View>
                  <View className="flex-1 pl-3">
                    <Text className="text-slate-400 text-xs mb-1">{similarData.name}</Text>
                    <Text className="text-white text-sm font-medium">{point.similar}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default function SimilarDiseaseScreen({ navigation }: any) {
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const handleImageError = (id: string) => {
    setFailedImages(prev => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
  };

  const hasValidDiseaseImage = (id: string, imageSource: any) => {
    if (!imageSource) return false;
    if (failedImages.has(id)) return false;
    return true;
  };

  const ALLOWED_INDICES = [0, 1, 2, 3, 6]; // 1, 2, 3, 4, 7

  // Filter the data BEFORE rendering the UI
  const availableData = DISEASE_DATA.map((item, index) => ({
    ...item,
    displayNumber: index + 1
  })).filter((item, index) => {
    if (!ALLOWED_INDICES.includes(index)) return false;
    return hasValidDiseaseImage(item.baseDisease.id, item.baseDisease.image);
  }).map(item => {
    const validSimilar = item.similarDiseases.filter(sim => {
      return hasValidDiseaseImage(sim.id, sim.image);
    });
    return { ...item, similarDiseases: validSimilar };
  });

  return (
    <SafeAreaView className="flex-1 bg-[#050B14]">
      <View className="px-4 pt-4 flex-row items-center mb-6">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4 p-2 -ml-2">
          <ArrowLeft color="#fff" size={24} />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-white font-outfit">Similar Diseases</Text>
      </View>

      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 60 }}>
        
        <View className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-xl flex-row items-start mb-6">
          <AlertCircle color="#eab308" size={20} className="mr-3 mt-0.5 shrink-0" />
          <Text className="text-sm text-yellow-200 flex-1 leading-relaxed">
            Many skin conditions look alike to the naked eye. This visual guide highlights the subtle differences between commonly confused conditions.
          </Text>
        </View>

        {availableData.map((item, index) => (
          <View key={item.id} className="mb-10">
            {/* Base Disease Section */}
            <View className="mb-6">
              <View className="flex-row items-center mb-3">
                <View className="w-8 h-8 rounded-full bg-clinical-teal/20 items-center justify-center mr-3">
                  <Text className="text-clinical-teal font-bold">{item.displayNumber}</Text>
                </View>
                <Text className="text-2xl font-bold text-white font-outfit">{item.baseDisease.name}</Text>
              </View>
              
              <Text className="text-clinical-slate text-sm italic mb-3">
                Baseline Condition
              </Text>

              <ValidatedImage 
                source={item.baseDisease.image} 
                className="w-full h-56 rounded-xl mb-4 bg-slate-800"
                onErrorProp={() => handleImageError(item.baseDisease.id)}
              />
              
              <View className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 mb-4">
                <Text className="text-white font-bold mb-2 text-base">What it means</Text>
                <Text className="text-clinical-slate text-sm leading-relaxed mb-4">
                  {item.baseDisease.shortDescription}
                </Text>

                <Text className="text-white font-bold mb-2 text-base">Common signs</Text>
                {item.baseDisease.commonSigns.map((sign, idx) => (
                  <View key={idx} className="flex-row items-start mb-1.5">
                    <CheckCircle2 color="#00f2fe" size={16} className="mr-2 mt-0.5 shrink-0" />
                    <Text className="text-clinical-slate text-sm flex-1">{sign}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Similar Diseases */}
            <View className="pl-2 border-l-2 border-clinical-teal/20 ml-4">
              {item.similarDiseases.map((similarItem) => (
                <SimilarDiseaseCard 
                  key={similarItem.id} 
                  similarData={similarItem} 
                  baseDiseaseName={item.baseDisease.name} 
                  onImageError={handleImageError}
                />
              ))}
            </View>
            
            {/* Separator for next pair if not last */}
            {index < DISEASE_DATA.length - 1 && (
              <View className="h-[1px] bg-clinical-border w-full mt-6 mb-2" />
            )}
          </View>
        ))}

        {/* Medical Disclaimer */}
        <View className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl flex-row items-start mt-4 mb-4">
          <AlertTriangle color="#ef4444" size={20} className="mr-3 mt-0.5 shrink-0" />
          <Text className="text-xs text-red-200 flex-1 leading-relaxed">
            These comparisons are for educational purposes only. Similar-looking skin conditions can have different causes. Consult a qualified healthcare professional for diagnosis.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
