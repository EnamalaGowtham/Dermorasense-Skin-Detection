import React from 'react';
import { View, Text } from 'react-native';

export const getSeverityColors = (sev: string) => {
  if (sev === 'high') return { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', hex: '#ef4444' };
  if (sev === 'moderate') return { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', hex: '#f59e0b' };
  return { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', hex: '#10b981' };
};

export default function SeverityBadge({ severity }: { severity: string }) {
  const colors = getSeverityColors(severity || 'low');
  return (
    <View className={`px-2.5 py-1 rounded-full border ${colors.border} ${colors.bg}`}>
      <Text className={`text-[10px] font-black uppercase tracking-wider ${colors.text}`}>
        {severity || 'low'} Concern
      </Text>
    </View>
  );
}
