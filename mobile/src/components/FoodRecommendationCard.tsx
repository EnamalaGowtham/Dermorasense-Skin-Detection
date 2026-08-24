import React from 'react';
import { View, Text } from 'react-native';

export default function FoodRecommendationCard({ items }: { items: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <View className="bg-clinical-card/80 p-5 rounded-2xl border-t-4 border-emerald-500/80 mb-4 border border-clinical-border">
      <View className="flex-row items-center mb-3">
        <Text className="text-xl mr-2">🥗</Text>
        <Text className="text-xs font-bold text-white uppercase tracking-wider">Recommended Foods</Text>
      </View>
      <Text className="text-[10px] text-clinical-slate mb-3">General dietary guidance. Individual dietary needs may vary.</Text>
      {items.map((item, idx) => (
        <View key={idx} className="flex-row items-start mb-2">
          <View className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 mr-2" />
          <Text className="text-xs text-clinical-slate flex-1 leading-relaxed">{item}</Text>
        </View>
      ))}
    </View>
  );
}
