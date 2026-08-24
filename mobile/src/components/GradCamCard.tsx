import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { ArrowDown } from 'lucide-react-native';

interface GradCamCardProps {
  originalImageUri: string;
  gradCamImageUri: string;
  caseId?: number;
  showGradCam: boolean;
  onToggleGradCam: () => void;
}

export default function GradCamCard({ originalImageUri, gradCamImageUri, caseId, showGradCam, onToggleGradCam }: GradCamCardProps) {
  return (
    <View className="bg-clinical-card/80 p-6 rounded-[28px] border border-clinical-border shadow-sm">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-xl font-bold font-outfit text-white">AI Visualization</Text>
        {caseId && <Text className="text-xs text-clinical-slate uppercase font-mono">Case #{caseId}</Text>}
      </View>
      
      <View className="items-center w-full mb-6">
        {/* Original Image */}
        <View className="w-full aspect-[4/3] rounded-[20px] overflow-hidden bg-black/40 border border-clinical-border relative">
          <Image
            source={{ uri: originalImageUri }}
            className="w-full h-full object-contain"
          />
          <View className="absolute top-4 left-4 bg-black/80 px-3 py-1.5 rounded-xl border border-clinical-border shadow-lg">
            <Text className="text-[10px] font-bold tracking-wider text-white">ORIGINAL PHOTO</Text>
          </View>
        </View>

        {/* Toggle / Arrow */}
        <View className="my-3 items-center justify-center z-10">
          <TouchableOpacity 
            onPress={onToggleGradCam}
            className={`w-14 h-14 rounded-full border-4 border-clinical-bg items-center justify-center shadow-lg -my-8 ${showGradCam ? 'bg-clinical-teal' : 'bg-[#1e293b]'}`}
          >
            <ArrowDown color={showGradCam ? '#0a0f1d' : '#94a3b8'} size={24} />
          </TouchableOpacity>
        </View>

        {/* Grad-CAM Image */}
        <View className={`w-full aspect-[4/3] rounded-[20px] overflow-hidden bg-black/40 border ${showGradCam ? 'border-clinical-teal border-2' : 'border-clinical-border'} relative`}>
          <Image
            source={{ uri: showGradCam ? gradCamImageUri : originalImageUri }}
            className={`w-full h-full object-contain ${!showGradCam ? 'opacity-20 grayscale' : ''}`}
          />
          <View className="absolute top-4 left-4 bg-black/80 px-3 py-1.5 rounded-xl border border-clinical-border shadow-lg">
            <Text className={`text-[10px] font-bold tracking-wider ${showGradCam ? 'text-clinical-teal' : 'text-clinical-slate'}`}>
              GRAD-CAM HEATMAP
            </Text>
          </View>
          {!showGradCam && (
            <View className="absolute inset-0 items-center justify-center">
              <Text className="text-clinical-slate font-bold text-sm bg-black/80 px-4 py-2 rounded-xl">Tap arrow to reveal</Text>
            </View>
          )}
        </View>
      </View>

      <View className="bg-white/5 border border-white/5 p-4 rounded-[20px]">
        <Text className="text-sm font-bold text-white mb-1">What does this visualization mean?</Text>
        <Text className="text-sm text-clinical-slate leading-relaxed">
          The highlighted regions represent the precise areas of the image that influenced the deep learning model's clinical prediction.
        </Text>
      </View>
    </View>
  );
}
