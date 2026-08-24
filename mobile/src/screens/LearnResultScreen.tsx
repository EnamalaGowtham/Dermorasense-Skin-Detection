import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, ExternalLink, ShieldAlert, Activity } from 'lucide-react-native';
import api from '../services/api';
import { API_URL } from '../services/api';
import { logError } from '../utils/errorHandler';

export default function LearnResultScreen({ navigation }: any) {
  const [latestScan, setLatestScan] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get('/scans/history');
        if (response.data && response.data.length > 0) {
          setLatestScan(response.data[0]);
        }
      } catch (error) {
        logError(error, 'LearnResultScreen - fetchHistory');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-[#050B14] items-center justify-center">
        <ActivityIndicator size="large" color="#00f2fe" />
      </SafeAreaView>
    );
  }

  if (!latestScan) {
    return (
      <SafeAreaView className="flex-1 bg-[#050B14]">
        <View className="px-4 pt-4 flex-row items-center mb-6">
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
            <ArrowLeft color="#fff" size={24} />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-white font-outfit">Learn About Your Result</Text>
        </View>
        
        <View className="flex-1 items-center justify-center px-6">
          <Activity color="#64748b" size={64} className="mb-6" />
          <Text className="text-xl font-bold text-white text-center mb-2">No Analysis Available Yet</Text>
          <Text className="text-clinical-text text-center mb-8">
            Complete a skin analysis to unlock personalized learning based on your results.
          </Text>
          <TouchableOpacity 
            onPress={() => navigation.navigate('AnalyzeTab')}
            className="bg-clinical-teal px-8 py-4 rounded-xl"
          >
            <Text className="font-bold text-[#050B14] text-lg">Analyze Your Skin</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#050B14]">
      <View className="px-4 pt-4 flex-row items-center mb-6">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <ArrowLeft color="#fff" size={24} />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-white font-outfit">Your Latest Analysis</Text>
      </View>
      
      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* Disclaimer */}
        <View className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-xl flex-row items-start mb-6">
          <ShieldAlert color="#3b82f6" size={20} className="mr-3 mt-0.5" />
          <Text className="text-sm text-blue-200 flex-1 leading-relaxed">
            <Text className="font-bold">Educational Context:</Text> This is an AI-assisted screening result, not a confirmed medical diagnosis. This information is educational and does not replace professional medical evaluation.
          </Text>
        </View>
        
        {/* Result Card */}
        <View className="bg-clinical-card border border-clinical-border rounded-2xl overflow-hidden mb-6">
          <View className="flex-row p-4 border-b border-clinical-border">
            <Image 
              source={{ uri: `${API_URL}${latestScan.image_url}` }} 
              className="w-24 h-24 rounded-xl mr-4"
              resizeMode="cover"
            />
            <View className="flex-1 justify-center">
              <Text className="text-sm text-clinical-slate mb-1">Detected Condition:</Text>
              <Text className="text-xl font-bold text-white mb-2">{latestScan.prediction}</Text>
              
              <Text className="text-sm text-clinical-slate mb-1">AI Confidence:</Text>
              <Text className="text-lg font-bold text-clinical-teal">
                {(latestScan.confidence * 100).toFixed(1)}%
              </Text>
            </View>
          </View>
          
          <TouchableOpacity 
            onPress={() => navigation.navigate('DiseaseDetails', { scanId: latestScan.id, scanData: latestScan })}
            className="bg-clinical-teal/10 py-4 flex-row justify-center items-center"
          >
            <Text className="font-bold text-clinical-teal text-base mr-2">Learn About This Condition</Text>
            <ExternalLink color="#00f2fe" size={18} />
          </TouchableOpacity>
        </View>
        
        {/* AI Explainability / Grad-CAM */}
        <Text className="text-lg font-bold text-white mb-4 mt-2">AI Explainability</Text>
        <View className="bg-clinical-card border border-clinical-border rounded-2xl p-5 mb-6">
          <View className="flex-row justify-between mb-4">
            <View className="flex-1 items-center mr-2">
              <Text className="text-sm text-clinical-slate mb-2 font-bold">Original Image</Text>
              <Image 
                source={{ uri: `${API_URL}${latestScan.image_url}` }} 
                className="w-full aspect-square rounded-xl"
                resizeMode="cover"
              />
            </View>
            <View className="flex-1 items-center ml-2">
              <Text className="text-sm text-clinical-slate mb-2 font-bold">AI Attention Map</Text>
              <Image 
                source={{ uri: `${API_URL}${latestScan.gradcam_url}` }} 
                className="w-full aspect-square rounded-xl"
                resizeMode="cover"
                defaultSource={require('../../assets/icon.png')}
              />
            </View>
          </View>
          
          <View className="bg-clinical-bg/50 p-4 rounded-xl border border-clinical-border">
            <Text className="text-white font-bold mb-1">What does this show?</Text>
            <Text className="text-sm text-clinical-slate leading-relaxed">
              The heatmap on the right represents the specific visual regions that most heavily influenced the AI's prediction. 
              {'\n\n'}
              <Text className="font-bold text-red-400">Important:</Text> Grad-CAM shows model attention and is not proof that the highlighted area is medically diagnostic.
            </Text>
          </View>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}
