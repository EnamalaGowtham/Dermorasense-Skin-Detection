import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CheckCircle2, AlertTriangle, Lightbulb, ArrowRight } from 'lucide-react-native';
import { MYTHS_AND_FACTS } from '../data/learningData';

export default function MythFactScreen({ navigation }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  const currentItem = MYTHS_AND_FACTS[currentIndex];
  const total = MYTHS_AND_FACTS.length;

  useEffect(() => {
    if (revealed) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      fadeAnim.setValue(0);
      slideAnim.setValue(20);
    }
  }, [revealed, fadeAnim, slideAnim]);

  const handleReveal = () => {
    setRevealed(true);
  };

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setRevealed(false);
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.goBack();
    }
  };

  const renderProgressDots = () => {
    // Show a window of 5 dots around the current index
    const dots = [];
    const windowSize = 5;
    let start = Math.max(0, currentIndex - Math.floor(windowSize / 2));
    let end = Math.min(total - 1, start + windowSize - 1);
    
    if (end - start + 1 < windowSize) {
      start = Math.max(0, end - windowSize + 1);
    }

    for (let i = start; i <= end; i++) {
      dots.push(
        <View 
          key={i} 
          className={`h-2 rounded-full mx-1 ${i === currentIndex ? 'w-6 bg-[#00f2fe]' : 'w-2 bg-slate-700'}`}
        />
      );
    }

    return (
      <View className="flex-row items-center justify-center mt-2">
        {start > 0 && <Text className="text-slate-500 text-xs mr-2">...</Text>}
        {dots}
        {end < total - 1 && <Text className="text-slate-500 text-xs ml-2">...</Text>}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#050B14]">
      {/* Header */}
      <View className="px-4 pt-4 flex-row items-center mb-6">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4 p-2 -ml-2">
          <ArrowLeft color="#fff" size={24} />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-white font-outfit">Myth vs Fact</Text>
      </View>
      
      {/* Progress */}
      <View className="px-4 mb-6 items-center">
        <Text className="text-clinical-slate font-medium text-sm mb-1 uppercase tracking-widest">
          Fact {currentIndex + 1} of {total}
        </Text>
        {renderProgressDots()}
      </View>
      
      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 100, flexGrow: 1, justifyContent: 'center' }}>
        
        {/* Main Card */}
        <View className="bg-[#0a1220] border border-clinical-border/40 rounded-[32px] overflow-hidden shadow-xl">
          
          {/* Card Header */}
          <View className="bg-clinical-card border-b border-clinical-border/40 py-4 items-center">
            <View className="flex-row items-center">
              <Lightbulb color="#00f2fe" size={20} className="mr-2" />
              <Text className="text-white font-bold tracking-widest uppercase text-sm">Did you know?</Text>
            </View>
          </View>

          <View className="p-6 md:p-8">
            {/* Myth Section */}
            <View className="mb-2">
              <View className="flex-row items-center mb-3">
                <AlertTriangle color="#ef4444" size={20} className="mr-2" />
                <Text className="text-red-400 font-bold tracking-widest uppercase text-sm">Myth</Text>
              </View>
              <Text className="text-2xl md:text-3xl font-bold text-white leading-tight">
                "{currentItem.myth}"
              </Text>
            </View>

            {/* Revealed Fact Section */}
            {revealed && (
              <Animated.View 
                style={{ 
                  opacity: fadeAnim, 
                  transform: [{ translateY: slideAnim }],
                  marginTop: 32 
                }}
              >
                <View className="h-px bg-slate-700/50 w-full mb-8" />
                
                <View className="flex-row items-center mb-3">
                  <CheckCircle2 color="#4ade80" size={20} className="mr-2" />
                  <Text className="text-green-400 font-bold tracking-widest uppercase text-sm">Fact</Text>
                </View>
                <Text className="text-lg md:text-xl text-slate-300 leading-relaxed font-medium">
                  {currentItem.fact}
                </Text>
              </Animated.View>
            )}
          </View>
        </View>

      </ScrollView>

      {/* Sticky Bottom Action */}
      <View className="absolute bottom-0 left-0 right-0 p-6 bg-[#050B14] border-t border-clinical-border/30">
        {!revealed ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleReveal}
            className="bg-clinical-teal py-4 rounded-2xl items-center shadow-lg shadow-clinical-teal/20"
          >
            <Text className="font-bold text-[#050B14] text-lg">Reveal the Fact</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleNext}
            className="bg-[#0f172a] border border-clinical-teal py-4 rounded-2xl flex-row justify-center items-center"
          >
            <Text className="font-bold text-clinical-teal text-lg mr-2">
              {currentIndex < total - 1 ? "Next Fact" : "Finish"}
            </Text>
            {currentIndex < total - 1 && <ArrowRight color="#00f2fe" size={20} />}
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
