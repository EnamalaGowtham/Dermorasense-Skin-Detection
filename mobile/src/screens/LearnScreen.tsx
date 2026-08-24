import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookOpen, Shield, HelpCircle, Activity, BrainCircuit, Library, RefreshCw, Trophy, FileText, Sun, Moon, Sunrise, Sunset } from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function LearnScreen({ navigation }: any) {
  const { user } = useAuth();
  const [progress, setProgress] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [greetingInfo, setGreetingInfo] = useState({ text: 'Good Morning', Icon: Sunrise, color: '#f59e0b', bgClass: 'bg-amber-500/10', borderClass: 'border-amber-500/20' });

  const fetchProgress = async () => {
    try {
      const response = await api.get('/learning/progress');
      setProgress(response.data);
    } catch (error) {
      console.log('Error fetching learning progress', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        setGreetingInfo({ text: 'Good Morning', Icon: Sunrise, color: '#f59e0b', bgClass: 'bg-amber-500/10', borderClass: 'border-amber-500/20' });
      } else if (hour >= 12 && hour < 17) {
        setGreetingInfo({ text: 'Good Afternoon', Icon: Sun, color: '#eab308', bgClass: 'bg-yellow-500/10', borderClass: 'border-yellow-500/20' });
      } else if (hour >= 17 && hour < 21) {
        setGreetingInfo({ text: 'Good Evening', Icon: Sunset, color: '#f97316', bgClass: 'bg-orange-500/10', borderClass: 'border-orange-500/20' });
      } else {
        setGreetingInfo({ text: 'Good Night', Icon: Moon, color: '#818cf8', bgClass: 'bg-indigo-500/10', borderClass: 'border-indigo-500/20' });
      }
    };

    updateGreeting();
    
    // Check every minute
    const intervalId = setInterval(updateGreeting, 60000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchProgress();
    });
    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return (
      <View className="flex-1 bg-[#050B14] items-center justify-center">
        <ActivityIndicator size="large" color="#00f2fe" />
      </View>
    );
  }

  const diseasesExplored = progress?.diseases_viewed?.length || 0;
  const quizzesCompleted = progress?.quizzes_completed || 0;
  const bestScore = progress?.best_score || 0;
  const achievements = progress?.achievements || [];
  const { Icon, color, bgClass, borderClass } = greetingInfo;

  return (
    <SafeAreaView className="flex-1 bg-[#050B14]">
      <ScrollView className="flex-1 px-4 pt-6" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Header / Greeting Card */}
        <View className="mb-8">
          <Text className="text-3xl font-bold font-outfit text-white mb-4">Learn</Text>
          
          <View className={`p-6 rounded-3xl border ${bgClass} ${borderClass}`}>
            <View className="flex-row items-center mb-3">
              <View className="p-2 rounded-xl bg-[#050B14]/40 mr-3">
                <Icon color={color} size={28} />
              </View>
              <Text className="text-xl font-bold text-white flex-1">
                {greetingInfo.text}{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
              </Text>
            </View>
            <Text className="text-sm text-clinical-slate leading-relaxed">
              Ready to learn about skin health today? Explore your analysis results and our comprehensive medical library.
            </Text>
          </View>
        </View>

        {/* Action: Learn About Your Result */}
        <TouchableOpacity 
          onPress={() => navigation.navigate('LearnStack', { screen: 'LearnResult' })}
          className="bg-clinical-teal/10 border border-clinical-teal/30 p-5 rounded-2xl flex-row items-center justify-between mb-8"
        >
          <View className="flex-1 pr-4">
            <Text className="text-lg font-bold text-white mb-1">Learn About Your Result</Text>
            <Text className="text-sm text-clinical-slate">
              View educational info based on your latest AI analysis.
            </Text>
          </View>
          <View className="bg-clinical-teal/20 p-3 rounded-full">
            <Activity color="#00f2fe" size={24} />
          </View>
        </TouchableOpacity>

        {/* Section: Explore */}
        <Text className="text-lg font-bold text-white mb-4">📚 Explore</Text>
        <View className="flex-row flex-wrap justify-between mb-8">
          
          <TouchableOpacity 
            onPress={() => navigation.navigate('LearnStack', { screen: 'DiseaseLibrary' })}
            className="w-[48%] bg-clinical-card border border-clinical-border p-4 rounded-xl mb-4 items-center"
          >
            <Library color="#4ade80" size={32} className="mb-2" />
            <Text className="text-white font-bold text-center">Disease Library</Text>
            <Text className="text-xs text-clinical-slate text-center mt-1">All 23 conditions</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => navigation.navigate('LearnStack', { screen: 'SkinCareGuide' })}
            className="w-[48%] bg-clinical-card border border-clinical-border p-4 rounded-xl mb-4 items-center"
          >
            <Shield color="#38bdf8" size={32} className="mb-2" />
            <Text className="text-white font-bold text-center">Skin Care Guide</Text>
            <Text className="text-xs text-clinical-slate text-center mt-1">Daily routines</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => navigation.navigate('LearnStack', { screen: 'SimilarDisease' })}
            className="w-[48%] bg-clinical-card border border-clinical-border p-4 rounded-xl mb-4 items-center"
          >
            <RefreshCw color="#a78bfa" size={32} className="mb-2" />
            <Text className="text-white font-bold text-center">Similar Diseases</Text>
            <Text className="text-xs text-clinical-slate text-center mt-1">Visual comparison</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => navigation.navigate('LearnStack', { screen: 'Glossary' })}
            className="w-[48%] bg-clinical-card border border-clinical-border p-4 rounded-xl mb-4 items-center"
          >
            <FileText color="#fbbf24" size={32} className="mb-2" />
            <Text className="text-white font-bold text-center">Medical Glossary</Text>
            <Text className="text-xs text-clinical-slate text-center mt-1">Terms explained</Text>
          </TouchableOpacity>
          
        </View>

        {/* Section: Test Your Knowledge */}
        <Text className="text-lg font-bold text-white mb-4">🧠 Test Your Knowledge</Text>
        
        <TouchableOpacity 
          onPress={() => navigation.navigate('LearnStack', { screen: 'Quiz' })}
          className="bg-clinical-card border border-clinical-border p-5 rounded-2xl flex-row items-center justify-between mb-4"
        >
          <View className="flex-1 pr-4">
            <Text className="text-lg font-bold text-white mb-1">Skin Health Quiz</Text>
            <Text className="text-sm text-clinical-slate">
              Test your knowledge across 3 difficulty levels.
            </Text>
          </View>
          <View className="bg-clinical-card/50 p-3 rounded-full border border-clinical-border">
            <BrainCircuit color="#f472b6" size={24} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => navigation.navigate('LearnStack', { screen: 'MythFact' })}
          className="bg-clinical-card border border-clinical-border p-5 rounded-2xl flex-row items-center justify-between mb-8"
        >
          <View className="flex-1 pr-4">
            <Text className="text-lg font-bold text-white mb-1">Myth vs Fact</Text>
            <Text className="text-sm text-clinical-slate">
              Debunk common skincare misconceptions.
            </Text>
          </View>
          <View className="bg-clinical-card/50 p-3 rounded-full border border-clinical-border">
            <HelpCircle color="#fb923c" size={24} />
          </View>
        </TouchableOpacity>

        {/* Section: Progress */}
        <Text className="text-lg font-bold text-white mb-4">📊 Your Progress</Text>
        <View className="bg-clinical-card border border-clinical-border p-5 rounded-2xl mb-8">
          <View className="flex-row justify-between mb-4">
            <View>
              <Text className="text-sm text-clinical-slate">Disease Library</Text>
              <Text className="text-xl font-bold text-white">{diseasesExplored} / 23</Text>
            </View>
            <View>
              <Text className="text-sm text-clinical-slate">Quizzes</Text>
              <Text className="text-xl font-bold text-white">{quizzesCompleted}</Text>
            </View>
            <View>
              <Text className="text-sm text-clinical-slate">Best Score</Text>
              <Text className="text-xl font-bold text-clinical-teal">{bestScore}%</Text>
            </View>
          </View>
          
          <View className="border-t border-clinical-border pt-4">
            <Text className="text-sm text-clinical-slate mb-2">Achievements Earned: {achievements.length}</Text>
            {achievements.length > 0 ? (
              <View className="flex-row space-x-2">
                {achievements.map((ach: any) => (
                  <View key={ach.achievement_id} className="bg-yellow-500/20 p-2 rounded-full border border-yellow-500/30">
                    <Trophy color="#eab308" size={16} />
                  </View>
                ))}
              </View>
            ) : (
              <Text className="text-xs text-clinical-slate italic">Complete quizzes to earn achievements!</Text>
            )}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
