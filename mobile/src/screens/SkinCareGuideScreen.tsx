import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Droplets, Feather, Sun, Shield, Apple, Moon, Bath, Heart, Stethoscope } from 'lucide-react-native';
import { SKIN_CARE_GUIDES } from '../data/learningData';

const IconMap: any = {
  Droplets: <Droplets color="#38bdf8" size={24} />,
  Feather: <Feather color="#a78bfa" size={24} />,
  Sun: <Sun color="#fbbf24" size={24} />,
  Shield: <Shield color="#4ade80" size={24} />,
  Apple: <Apple color="#f87171" size={24} />,
  Moon: <Moon color="#818cf8" size={24} />,
  Bath: <Bath color="#34d399" size={24} />,
  Heart: <Heart color="#f472b6" size={24} />,
  Stethoscope: <Stethoscope color="#94a3b8" size={24} />
};

export default function SkinCareGuideScreen({ navigation }: any) {
  return (
    <SafeAreaView className="flex-1 bg-[#050B14]">
      <View className="px-4 pt-4 flex-row items-center mb-6">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <ArrowLeft color="#fff" size={24} />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-white font-outfit">Skin Care Guide</Text>
      </View>
      
      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 40 }}>
        <Text className="text-3xl font-bold font-outfit text-white mb-2">Daily Routines & Guides</Text>
        <Text className="text-base text-clinical-text mb-8 leading-relaxed">
          Establishing a consistent skin care routine is the foundation of healthy skin. Follow these essential and easy-to-understand guidelines.
        </Text>
        
        {SKIN_CARE_GUIDES.map((guide, idx) => (
          <View key={idx} className="bg-clinical-card border border-clinical-border p-5 rounded-2xl mb-6">
            <View className="flex-row items-center mb-5 border-b border-clinical-border pb-4">
              <View className="bg-clinical-bg p-3 rounded-xl mr-4 border border-clinical-border">
                {IconMap[guide.icon]}
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold text-clinical-teal uppercase tracking-wider mb-1">
                  {guide.category}
                </Text>
                <Text className="text-xl font-bold text-white">{guide.title}</Text>
              </View>
            </View>
            
            {guide.whatIsIt && (
              <View className="mb-5">
                <Text className="text-white font-bold mb-2">What is it?</Text>
                <Text className="text-clinical-slate leading-relaxed text-base">{guide.whatIsIt}</Text>
              </View>
            )}

            {guide.whyImportant && (
              <View className="mb-5">
                <Text className="text-white font-bold mb-2">Why is it important?</Text>
                <Text className="text-clinical-slate leading-relaxed text-base">{guide.whyImportant}</Text>
              </View>
            )}

            {guide.whatToDo && guide.whatToDo.length > 0 && (
              <View className="mb-5">
                <Text className="text-white font-bold mb-3">What should I do?</Text>
                {guide.whatToDo.map((step, sIdx) => (
                  <View key={sIdx} className="flex-row items-start mb-2">
                    <Text className="text-clinical-teal mr-3 mt-0.5 font-bold">•</Text>
                    <Text className="text-clinical-slate leading-relaxed text-base flex-1">{step}</Text>
                  </View>
                ))}
              </View>
            )}

            {guide.howOften && (
              <View className="mb-5">
                <Text className="text-white font-bold mb-2">How often should I do it?</Text>
                <Text className="text-clinical-slate leading-relaxed text-base">{guide.howOften}</Text>
              </View>
            )}

            {guide.tips && guide.tips.length > 0 && (
              <View className="mb-5">
                <Text className="text-white font-bold mb-3">Simple Tips</Text>
                {guide.tips.map((tip, tIdx) => (
                  <View key={tIdx} className="flex-row items-start mb-2">
                    <Text className="text-clinical-teal mr-3 mt-0.5 font-bold">•</Text>
                    <Text className="text-clinical-slate leading-relaxed text-base flex-1">{tip}</Text>
                  </View>
                ))}
              </View>
            )}
            
            {guide.dos && guide.dos.length > 0 && (
              <View className="mb-4 bg-green-500/10 p-4 rounded-xl border border-green-500/20">
                <Text className="text-green-400 font-bold mb-3 flex-row items-center">
                  ✅ Do
                </Text>
                {guide.dos.map((item, dIdx) => (
                  <View key={dIdx} className="flex-row items-start mb-2">
                    <Text className="text-green-400 mr-3 mt-0.5 font-bold">•</Text>
                    <Text className="text-green-100 leading-relaxed text-base flex-1">{item}</Text>
                  </View>
                ))}
              </View>
            )}

            {guide.avoids && guide.avoids.length > 0 && (
              <View className="mb-5 bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                <Text className="text-red-400 font-bold mb-3 flex-row items-center">
                  ❌ Avoid
                </Text>
                {guide.avoids.map((item, aIdx) => (
                  <View key={aIdx} className="flex-row items-start mb-2">
                    <Text className="text-red-400 mr-3 mt-0.5 font-bold">•</Text>
                    <Text className="text-red-100 leading-relaxed text-base flex-1">{item}</Text>
                  </View>
                ))}
              </View>
            )}

            {guide.whenToSeeDoctor && (
              <View className="mb-5 bg-clinical-bg p-4 rounded-xl border border-clinical-border">
                <Text className="text-[#00f2fe] font-bold mb-3 flex-row items-center">
                  👨‍⚕️ When should I see a doctor?
                </Text>
                <Text className="text-clinical-slate leading-relaxed text-base">{guide.whenToSeeDoctor}</Text>
              </View>
            )}

            {guide.disclaimer && (
              <View className="mt-2 bg-clinical-bg/50 p-3 rounded-lg">
                <Text className="text-clinical-text text-sm italic leading-relaxed text-center">{guide.disclaimer}</Text>
              </View>
            )}

          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
