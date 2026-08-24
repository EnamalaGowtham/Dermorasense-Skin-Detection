import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { BarChart3 } from 'lucide-react-native';

interface PredictionGraphProps {
  prediction: string;
  confidence: number;
  alternates: any[];
}

export default function PredictionGraph({ prediction, confidence, alternates }: PredictionGraphProps) {
  const dataList = [
    { name: prediction, confidence: confidence * 100 },
    ...(alternates || []).map((a: any) => ({ name: a.class, confidence: a.confidence * 100 }))
  ].slice(0, 4);

  return (
    <View className="mb-6">
      <View className="flex-row items-center mb-4 mt-2">
        <BarChart3 color="#00f2fe" size={18} className="mr-2" />
        <Text className="text-lg font-bold text-white">AI Prediction Comparison</Text>
      </View>

      <View className="bg-clinical-card/80 p-5 rounded-2xl border border-clinical-border">
        {dataList.map((item, idx) => (
          <View key={idx} className="mb-4">
            <View className="flex-row justify-between mb-1">
              <Text className="text-white text-xs font-bold" numberOfLines={1}>{item.name}</Text>
              <Text className="text-clinical-teal text-xs font-bold">{item.confidence.toFixed(1)}%</Text>
            </View>
            <View className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
              <View 
                className="h-full bg-clinical-teal" 
                style={{ width: `${item.confidence}%` }}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
