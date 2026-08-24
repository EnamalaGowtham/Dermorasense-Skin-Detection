const fs = require('fs');

const mobileFile = fs.readFileSync('../mobile/src/screens/SimilarDiseaseScreen.tsx', 'utf-8');

// The image dictionary from the backend
const backendImages = {
  "Acne and Rosacea": "/static/gallery/Acne and Rosacea Photos/07PerioralDermEye.jpg",
  "Actinic Keratosis and Malignant Lesions": "/static/gallery/Actinic Keratosis Basal Cell Carcinoma and other Malignant Lesions/actinic-cheilitis-sq-cell-lip-19.jpg",
  "Atopic Dermatitis": "/static/gallery/Atopic Dermatitis Photos/03DermatitisAreola45.jpg",
  "Bullous Disease": "/static/gallery/Bullous Disease Photos/benign-familial-chronic-pemphigus-1.jpg",
  "Cellulitis and Bacterial Infections": "/static/gallery/Cellulitis Impetigo and other Bacterial Infections/09cellulitis040306.jpg",
  "Eczema": "/static/gallery/Eczema Photos/03DermatitisArm1.jpg",
  "Exanthems and Drug Eruptions": "/static/gallery/Exanthems and Drug Eruptions/14desquamationViral34-GP3.jpg",
  "Hair Loss and Alopecia": "/static/gallery/Hair Loss Photos Alopecia and other Hair Diseases/acne-keloidalis-15.jpg",
  "Herpes and STDs": "/static/gallery/Herpes HPV and other STDs Photos/11herpesAnal0913041.jpg",
  "Light Diseases and Pigmentation Disorders": "/static/gallery/Light Diseases and Disorders of Pigmentation/actinic-comedones-3.jpg",
  "Lupus and Connective Tissue Diseases": "/static/gallery/Lupus and other Connective Tissue diseases/acrocyanosis-1.jpg",
  "Melanoma and Skin Cancer": "/static/gallery/Melanoma Skin Cancer Nevi and Moles/atypical-nevi-10.jpg",
  "Nail Fungus and Nail Diseases": "/static/gallery/Nail Fungus and other Nail Disease/acute-paronychia-2.jpg",
  "Normal Skin": "/static/gallery/Normal Skin/40yearold-latina-woman-brushes-her-260nw-2335137965.jpg",
  "Poison Ivy and Contact Dermatitis": "/static/gallery/Poison Ivy Photos and other Contact Dermatitis/allergic-contact-dermatitis-104.jpg",
  "Psoriasis and Lichen Planus": "/static/gallery/Psoriasis pictures Lichen Planus and related diseases/08glutealPinking061906.jpg",
  "Scabies and Infestations": "/static/gallery/Scabies Lyme Disease and other Infestations and Bites/biting-insects-1.jpg",
  "Seborrheic Keratoses and Benign Tumors": "/static/gallery/Seborrheic Keratoses and other Benign Tumors/20EpidermCystRuptured1.jpg",
  "Systemic Disease": "/static/gallery/Systemic Disease/26Fibrofolliculoma090604.jpg",
  "Tinea and Fungal Infections": "/static/gallery/Tinea Ringworm Candidiasis and other Fungal Infections/03cheilitis05010422.jpg",
  "Urticaria and Hives": "/static/gallery/Urticaria Hives/angioedema-1.jpg",
  "Vascular Tumors": "/static/gallery/Vascular Tumors/angiokeratomas-1.jpg",
  "Vasculitis": "/static/gallery/Vasculitis Photos/atrophy-blanche-4.jpg",
  "Viral Infections (Warts, Molluscum)": "/static/gallery/Warts Molluscum and other Viral Infections/12ChickenPoxBack.jpg"
};

// Extract the array using regex
const dataMatch = mobileFile.match(/export const DISEASE_DATA = (\[[\s\S]*?\]);\s*const/);
if (dataMatch) {
  let dataStr = dataMatch[1];
  
  const idToName = {
    'acne_and_rosacea': 'Acne and Rosacea',
    'actinic_keratosis_and_malignant_lesions': 'Actinic Keratosis and Malignant Lesions',
    'atopic_dermatitis': 'Atopic Dermatitis',
    'bullous_disease': 'Bullous Disease',
    'cellulitis_and_bacterial_infections': 'Cellulitis and Bacterial Infections',
    'eczema': 'Eczema',
    'exanthems_and_drug_eruptions': 'Exanthems and Drug Eruptions',
    'hair_loss_and_alopecia': 'Hair Loss and Alopecia',
    'herpes_and_stds': 'Herpes and STDs',
    'light_diseases_and_pigmentation_disorders': 'Light Diseases and Pigmentation Disorders',
    'lupus_and_connective_tissue_diseases': 'Lupus and Connective Tissue Diseases',
    'melanoma_and_skin_cancer': 'Melanoma and Skin Cancer',
    'nail_fungus_and_nail_diseases': 'Nail Fungus and Nail Diseases',
    'normal_skin': 'Normal Skin',
    'poison_ivy_and_contact_dermatitis': 'Poison Ivy and Contact Dermatitis',
    'psoriasis_and_lichen_planus': 'Psoriasis and Lichen Planus',
    'scabies_and_infestations': 'Scabies and Infestations',
    'seborrheic_keratoses_and_benign_tumors': 'Seborrheic Keratoses and Benign Tumors',
    'systemic_disease': 'Systemic Disease',
    'tinea_and_fungal_infections': 'Tinea and Fungal Infections',
    'urticaria_and_hives': 'Urticaria and Hives',
    'vascular_tumors': 'Vascular Tumors',
    'vasculitis': 'Vasculitis',
    'viral_infections_warts_molluscum': 'Viral Infections (Warts, Molluscum)'
  };
  
  let newStr = dataStr.replace(/image:\s*SIMILAR_DISEASE_IMAGES\['(.*?)'\]/g, (match, p1) => {
    let name = idToName[p1];
    let url = backendImages[name] || '';
    return 'image: "' + url + '"';
  });
  
  fs.writeFileSync('./src/data/similarDiseasesData.js', 'export const DISEASE_DATA = ' + newStr + ';\n');
  console.log('Successfully written to src/data/similarDiseasesData.js');
} else {
  console.log('Could not match DISEASE_DATA');
}
