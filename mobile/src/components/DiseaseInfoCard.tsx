import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AlertTriangle, CheckCircle } from 'lucide-react-native';
import SeverityBadge, { getSeverityColors } from './SeverityBadge';

interface DiseaseInfoCardProps {
  prediction: string;
  confidence: number;
  severity: string;
  description: string;
  isNormalSkin: boolean;
  onReset?: () => void;
}

export default function DiseaseInfoCard({ prediction, confidence, severity, description, isNormalSkin, onReset }: DiseaseInfoCardProps) {
  if (isNormalSkin) {
    return (
      <View className="bg-emerald-500/10 border border-emerald-500/30 p-8 rounded-[32px] items-center">
        <View className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
          <CheckCircle color="#34d399" size={32} />
        </View>
        <Text className="text-2xl font-bold font-outfit text-emerald-400 mb-3 text-center">Normal Skin</Text>
        <Text className="text-base text-emerald-400/80 text-center leading-loose mb-8 px-4">
          No significant skin condition was detected from the uploaded image.
          Continue monitoring your skin and consult a dermatologist if you notice persistent changes.
        </Text>
      </View>
    );
  }

  const severityColors = getSeverityColors(severity);
  const confidencePct = Math.round(confidence * 100);

  return (
    <View className={`bg-[#0f172a] p-6 rounded-[28px] border border-clinical-border shadow-lg`}>
      <View className="flex-row justify-between items-start mb-6">
        <View className="flex-1 pr-4">
          <View className="bg-clinical-teal/10 self-start px-3 py-1.5 rounded-xl border border-clinical-teal/20 mb-4">
            <Text className="text-xs font-bold text-clinical-teal uppercase tracking-widest">AI Diagnostic</Text>
          </View>
          <Text className="text-[28px] font-black font-outfit text-white leading-tight mb-2">{prediction}</Text>
          <View className="self-start mt-2">
            <SeverityBadge severity={severity} />
          </View>
        </View>
      </View>

      {/* Confidence Bar */}
      <View className="bg-[#1e293b] p-4 rounded-[20px] mb-8 border border-[#334155]">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-sm font-bold text-clinical-slate uppercase tracking-wider">Model Confidence</Text>
          <Text className="text-lg font-black text-white">{confidencePct}%</Text>
        </View>
        <View className="w-full bg-[#0f172a] h-2.5 rounded-full overflow-hidden">
          <View 
            className="h-full bg-clinical-teal rounded-full"
            style={{ width: `${confidencePct}%` }}
          ></View>
        </View>
      </View>

      {/* About this Result */}
      <View className="mb-2">
        <Text className="text-lg font-bold font-outfit text-white mb-3">About This Result</Text>
        <View className="bg-white/5 p-5 rounded-[20px] border border-white/5">
          <Text className="text-base text-clinical-slate leading-loose">
            {description || `This scan indicates characteristic markers visually consistent with ${prediction}.`}
          </Text>
        </View>
      </View>
    </View>
  );
}
