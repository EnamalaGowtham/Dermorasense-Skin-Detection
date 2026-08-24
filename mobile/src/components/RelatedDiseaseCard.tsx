import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { FileText, ArrowRight } from 'lucide-react-native';

interface RelatedDiseaseCardProps {
  similarCases: any[];
  apiUrl: string;
  onPressItem: (diseaseName: string, confidence: number, imageUrl: string) => void;
}

export default function RelatedDiseaseCard({ similarCases, apiUrl, onPressItem }: RelatedDiseaseCardProps) {
  if (!similarCases || similarCases.length === 0) return null;

  // Filter uniquely by disease name up to 3 cases for mobile vertical layout
  const uniqueCases = similarCases.filter((value, index, self) =>
    index === self.findIndex((t) => (
      t.label === value.label
    ))
  ).slice(0, 3);

  return (
    <View className="mb-4">
      <View className="flex-row items-center mb-6">
        <FileText color="#00f2fe" size={24} className="mr-3" />
        <Text className="text-xl font-bold font-outfit text-white">Similar Conditions</Text>
      </View>
      
      <View className="space-y-4">
        {uniqueCases.map((sim, idx) => (
          <TouchableOpacity 
            key={idx}
            className="bg-clinical-card/80 border border-clinical-border rounded-[24px] overflow-hidden flex-row items-center p-4 shadow-sm"
            onPress={() => onPressItem(sim.label, sim.similarity * 100, `${apiUrl}${sim.image_url}`)}
          >
            <Image 
              source={{ uri: `${apiUrl}${sim.image_url}` }}
              className="w-20 h-20 bg-black/40 rounded-xl mr-4 border border-clinical-border"
            />
            
            <View className="flex-1 justify-center">
              <Text className="text-white font-bold text-base mb-1" numberOfLines={1}>{sim.label}</Text>
              
              <View className="flex-row items-center mb-3">
                <Text className="text-clinical-slate text-xs mr-2">Visual Match:</Text>
                <Text className="text-clinical-teal font-bold text-xs">{(sim.similarity * 100).toFixed(0)}%</Text>
              </View>
              
              <View className="flex-row items-center">
                <Text className="text-sm text-clinical-teal font-medium mr-1">View Details</Text>
                <ArrowRight color="#00f2fe" size={16} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
