import React from 'react';
import { View, Text } from 'react-native';

interface DiseaseComparisonGraphProps {
  prediction: string;
  confidence: number;
  similarCases: any[];
}

export default function DiseaseComparisonGraph({ prediction, confidence, similarCases }: DiseaseComparisonGraphProps) {
  if (!similarCases || similarCases.length === 0) return null;

  // Ensure unique distinct related diseases
  const related = Array.from(new Set(similarCases.map(s => s.label)))
    .filter(label => label !== prediction)
    .slice(0, 5)
    .map(label => {
      const match = similarCases.find(s => s.label === label);
      return { name: label, similarity: match.similarity * 100, isMain: false };
    });

  const dataList = [
    { name: `Detected: ${prediction}`, similarity: confidence * 100, isMain: true },
    ...related
  ];

  return (
    <View className="mb-6">
      <View className="flex-row items-center mb-4">
        <Text className="text-lg font-bold text-white">Related Disease Comparison</Text>
      </View>

      <View className="bg-clinical-card/80 p-5 rounded-2xl border border-clinical-border">
        {dataList.map((item, idx) => (
          <View key={idx} className="mb-4">
            <View className="flex-row justify-between mb-1">
              <Text className="text-white text-[10px] flex-1 mr-2" numberOfLines={1}>
                {item.name}
              </Text>
              <Text className={`text-[10px] font-bold ${item.isMain ? 'text-clinical-teal' : 'text-clinical-slate'}`}>
                {item.similarity.toFixed(1)}%
              </Text>
            </View>
            <View className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
              <View 
                className={`h-full ${item.isMain ? 'bg-clinical-teal' : 'bg-clinical-slate'}`}
                style={{ width: `${item.similarity}%` }}
              />
            </View>
          </View>
        ))}
        <Text className="text-[8px] text-clinical-slate text-center mt-2 uppercase tracking-widest">Model Similarity Metric</Text>
      </View>
    </View>
  );
}
