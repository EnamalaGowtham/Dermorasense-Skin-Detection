import React from 'react';
import { View, Text } from 'react-native';
import { CheckCircle } from 'lucide-react-native';

export default function DosCard({ items }: { items: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <View className="bg-clinical-card/80 p-6 rounded-[24px] border border-clinical-border shadow-sm">
      <View className="flex-row items-center mb-4">
        <CheckCircle color="#34d399" size={20} className="mr-3" />
        <Text className="text-sm font-bold text-emerald-400 uppercase tracking-widest">Recommended Actions (Do's)</Text>
      </View>
      <View className="space-y-3">
        {items.map((item, idx) => (
          <View key={idx} className="flex-row items-start">
            <View className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 mr-3" />
            <Text className="text-sm text-clinical-slate flex-1 leading-relaxed">{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
