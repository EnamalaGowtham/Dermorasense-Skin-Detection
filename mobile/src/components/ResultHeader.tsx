import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Activity, ArrowLeft } from 'lucide-react-native';

export default function ResultHeader({ onBack }: { onBack: () => void }) {
  return (
    <View className="flex-row items-center mb-6">
      <TouchableOpacity onPress={onBack} className="mr-3">
        <ArrowLeft color="#00f2fe" size={24} />
      </TouchableOpacity>
      <Activity className="text-clinical-teal w-6 h-6 mr-2" color="#00f2fe" />
      <View>
        <Text className="text-2xl font-bold font-outfit text-white mb-1">Diagnostic AI Scanner</Text>
        <Text className="text-sm text-clinical-slate">Upload photographs for immediate classification</Text>
      </View>
    </View>
  );
}
