import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, ChevronRight } from 'lucide-react-native';

const DISEASES = [
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

export default function DiseaseLibraryScreen({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDiseases = DISEASES.filter(d => 
    d.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-[#050B14]">
      <View className="px-4 pt-4 flex-row items-center mb-6">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <ArrowLeft color="#fff" size={24} />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-white font-outfit">Disease Library</Text>
      </View>
      
      <View className="px-4 mb-4">
        <View className="flex-row items-center bg-clinical-card border border-clinical-border rounded-xl px-4 py-3">
          <Search color="#64748b" size={20} className="mr-2" />
          <TextInput 
            className="flex-1 text-white font-medium"
            placeholder="Search conditions..."
            placeholderTextColor="#64748b"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      
      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 40 }}>
        {filteredDiseases.map((disease, idx) => (
          <TouchableOpacity 
            key={idx}
            onPress={() => navigation.navigate('DiseaseDetails', { diseaseName: disease })}
            className="bg-clinical-card border border-clinical-border p-4 rounded-xl flex-row items-center justify-between mb-3"
          >
            <Text className="text-white font-medium flex-1 pr-4">{disease}</Text>
            <ChevronRight color="#00f2fe" size={20} />
          </TouchableOpacity>
        ))}
        {filteredDiseases.length === 0 && (
          <Text className="text-center text-clinical-slate mt-10">No conditions found matching your search.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
