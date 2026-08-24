import React from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Cpu, Eye, Layers, Lock, Code, AlertTriangle, ArrowDown } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const HowItWorksScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <SafeAreaView className="flex-1 bg-clinical-bg">
      {/* Header */}
      <View className="flex-row items-center justify-between p-4 border-b border-white/10">
        <TouchableOpacity 
          className="p-2 bg-clinical-card border border-clinical-border rounded-xl"
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <ChevronLeft color="#94a3b8" size={20} />
        </TouchableOpacity>
        <Text className="text-white font-bold text-lg">How It Works</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }}>
        <Text className="text-clinical-teal font-black text-2xl mb-2 text-center">Understand DermoraSense</Text>
        <Text className="text-clinical-slate text-center text-sm mb-8 leading-5">
          Understand the technology and principles behind DermoraSense.
        </Text>

        {/* 1. EfficientNetV2-B3 Core */}
        <View className="bg-clinical-card border border-clinical-border p-5 rounded-2xl mb-4">
          <View className="flex-row items-center mb-3">
            <View className="w-10 h-10 rounded-full bg-clinical-teal/10 border border-clinical-teal/20 items-center justify-center mr-3">
              <Cpu size={20} color="#00f2fe" />
            </View>
            <Text className="text-white font-bold text-lg flex-1">EfficientNetV2-B3 Core</Text>
          </View>
          <Text className="text-clinical-slate text-sm leading-relaxed">
            DermoraSense leverages a pre-trained EfficientNetV2-B3 architecture optimized for dermatological image analysis. The model is fine-tuned using progressive layer freezing to learn relevant visual patterns and structural features from skin images.
          </Text>
        </View>

        {/* 2. Explainable AI (Grad-CAM) */}
        <View className="bg-clinical-card border border-clinical-border p-5 rounded-2xl mb-4">
          <View className="flex-row items-center mb-3">
            <View className="w-10 h-10 rounded-full bg-clinical-teal/10 border border-clinical-teal/20 items-center justify-center mr-3">
              <Eye size={20} color="#00f2fe" />
            </View>
            <Text className="text-white font-bold text-lg flex-1">Explainable AI (Grad-CAM)</Text>
          </View>
          <Text className="text-clinical-slate text-sm leading-relaxed">
            To make the model's predictions easier to understand, DermoraSense uses Grad-CAM heatmaps to visualize the areas of an image that contributed most to the model's prediction. This helps users understand which visual regions the model focused on.
          </Text>
        </View>

        {/* 3. Test-Time Augmentation */}
        <View className="bg-clinical-card border border-clinical-border p-5 rounded-2xl mb-4">
          <View className="flex-row items-center mb-3">
            <View className="w-10 h-10 rounded-full bg-clinical-teal/10 border border-clinical-teal/20 items-center justify-center mr-3">
              <Layers size={20} color="#00f2fe" />
            </View>
            <Text className="text-white font-bold text-lg flex-1">Test-Time Augmentation (TTA)</Text>
          </View>
          <Text className="text-clinical-slate text-sm leading-relaxed">
            DermoraSense can evaluate an input image using the original image and an augmented version, such as a horizontal flip. The resulting prediction probabilities are combined to make the model less sensitive to minor image variations.
          </Text>
        </View>

        {/* 4. Patient Confidentiality */}
        <View className="bg-clinical-card border border-clinical-border p-5 rounded-2xl mb-4">
          <View className="flex-row items-center mb-3">
            <View className="w-10 h-10 rounded-full bg-clinical-teal/10 border border-clinical-teal/20 items-center justify-center mr-3">
              <Lock size={20} color="#00f2fe" />
            </View>
            <Text className="text-white font-bold text-lg flex-1">Patient Confidentiality</Text>
          </View>
          <Text className="text-clinical-slate text-sm leading-relaxed">
            Scan uploads are stored using secure, randomized file paths associated with the authenticated user. Backend access to protected history data is controlled through authenticated sessions and authorization checks.
          </Text>
        </View>

        {/* 5. Technology Stack */}
        <View className="bg-clinical-card border border-clinical-border p-5 rounded-2xl mb-4">
          <View className="flex-row items-center mb-4">
            <View className="w-10 h-10 rounded-full bg-clinical-teal/10 border border-clinical-teal/20 items-center justify-center mr-3">
              <Code size={20} color="#00f2fe" />
            </View>
            <Text className="text-white font-bold text-lg flex-1">Technology Stack</Text>
          </View>
          
          <View className="flex-row flex-wrap mb-4">
            <View className="w-1/2 pr-2 mb-4">
              <Text className="text-clinical-teal font-bold text-xs mb-1">Mobile Application</Text>
              <Text className="text-clinical-slate text-sm">• React Native</Text>
              <Text className="text-clinical-slate text-sm">• Nativewind</Text>
            </View>
            <View className="w-1/2 pl-2 mb-4">
              <Text className="text-clinical-teal font-bold text-xs mb-1">Web Frontend</Text>
              <Text className="text-clinical-slate text-sm">• React 18 & Vite</Text>
              <Text className="text-clinical-slate text-sm">• Tailwind CSS</Text>
              <Text className="text-clinical-slate text-sm">• Recharts</Text>
            </View>
            <View className="w-1/2 pr-2 mb-4">
              <Text className="text-clinical-teal font-bold text-xs mb-1">Backend Server</Text>
              <Text className="text-clinical-slate text-sm">• FastAPI</Text>
              <Text className="text-clinical-slate text-sm">• Python</Text>
              <Text className="text-clinical-slate text-sm">• ReportLab</Text>
            </View>
            <View className="w-1/2 pl-2 mb-4">
              <Text className="text-clinical-teal font-bold text-xs mb-1">AI / Processing</Text>
              <Text className="text-clinical-slate text-sm">• TensorFlow</Text>
              <Text className="text-clinical-slate text-sm">• OpenCV</Text>
            </View>
          </View>
        </View>

        {/* 6. Architecture Flow */}
        <View className="bg-clinical-card border border-clinical-border p-5 rounded-2xl mb-6">
          <Text className="text-white font-bold text-lg mb-4 text-center">Architecture Flow</Text>
          
          <View className="items-center">
            <View className="bg-clinical-bg border border-clinical-border px-4 py-2 rounded-lg w-full items-center">
              <Text className="text-clinical-teal font-bold">User</Text>
            </View>
            <ArrowDown size={20} color="#64748b" className="my-1" />
            
            <View className="bg-clinical-bg border border-clinical-border px-4 py-2 rounded-lg w-full items-center">
              <Text className="text-white text-sm">Upload / Capture Skin Image</Text>
            </View>
            <ArrowDown size={20} color="#64748b" className="my-1" />
            
            <View className="bg-clinical-bg border border-clinical-border px-4 py-2 rounded-lg w-full items-center">
              <Text className="text-white text-sm">Image Processing</Text>
            </View>
            <ArrowDown size={20} color="#64748b" className="my-1" />
            
            <View className="bg-clinical-teal/20 border border-clinical-teal px-4 py-2 rounded-lg w-full items-center">
              <Text className="text-clinical-teal font-bold">EfficientNetV2-B3</Text>
            </View>
            <ArrowDown size={20} color="#64748b" className="my-1" />
            
            <View className="bg-clinical-bg border border-clinical-border px-4 py-2 rounded-lg w-full items-center">
              <Text className="text-white text-sm">Test-Time Augmentation (TTA)</Text>
            </View>
            <ArrowDown size={20} color="#64748b" className="my-1" />
            
            <View className="bg-clinical-bg border border-clinical-border px-4 py-2 rounded-lg w-full items-center">
              <Text className="text-white text-sm">Prediction</Text>
            </View>
            <ArrowDown size={20} color="#64748b" className="my-1" />
            
            <View className="bg-clinical-bg border border-clinical-border px-4 py-2 rounded-lg w-full items-center">
              <Text className="text-white text-sm">Grad-CAM Explanation</Text>
            </View>
            <ArrowDown size={20} color="#64748b" className="my-1" />
            
            <View className="bg-[#4ade80]/20 border border-[#4ade80] px-4 py-2 rounded-lg w-full items-center">
              <Text className="text-[#4ade80] font-bold">Result</Text>
            </View>
          </View>
        </View>

        {/* 7. Regulatory Notice */}
        <View className="bg-amber-500/10 border border-amber-500/50 p-5 rounded-2xl mb-8">
          <View className="flex-row items-center mb-2">
            <AlertTriangle size={20} color="#f59e0b" className="mr-2" />
            <Text className="text-amber-500 font-bold text-base">Important Regulatory Notice</Text>
          </View>
          <Text className="text-amber-500/80 text-sm leading-relaxed">
            DermoraSense is a technology demonstration prototype and is not a diagnostic device. It does not claim FDA approval or CE marking/certification. Results should not be treated as a medical diagnosis. Medical concerns should be reviewed by a qualified dermatologist or other appropriate healthcare professional.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default HowItWorksScreen;
