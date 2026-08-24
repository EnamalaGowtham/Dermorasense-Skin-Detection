import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CheckCircle2, XCircle, Trophy, RotateCcw } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QUIZ_QUESTIONS } from '../data/learningData';
import api from '../services/api';
import { logError } from '../utils/errorHandler';

const QUIZ_LENGTH = 5;

// Utility to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
// Validates the question pool and removes duplicates based on ID
const validateQuestions = (questions: any[]) => {
  if (!Array.isArray(questions)) return [];
  
  const valid: any[] = [];
  const seenIds = new Set<string>();
  
  for (const q of questions) {
    if (
      q &&
      typeof q.id !== 'undefined' &&
      !seenIds.has(q.id) &&
      typeof q.question === 'string' &&
      Array.isArray(q.options) &&
      q.options.length > 1 &&
      typeof q.correctIndex === 'number' &&
      q.correctIndex >= 0 &&
      q.correctIndex < q.options.length
    ) {
      seenIds.add(q.id);
      valid.push(q);
    }
  }
  return valid;
};

export default function QuizScreen({ navigation }: any) {
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced' | null>(null);
  
  // Session State
  const [sessionQuestions, setSessionQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  
  // Status
  const [isLoading, setIsLoading] = useState(false);
  const [isExhausted, setIsExhausted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [poolEmptyError, setPoolEmptyError] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const loadQuestions = async (level: 'beginner' | 'intermediate' | 'advanced') => {
    setIsLoading(true);
    setPoolEmptyError(false);
    try {
      const rawQuestions = QUIZ_QUESTIONS[level] || [];
      const validQuestions = validateQuestions(rawQuestions);
      
      if (validQuestions.length === 0) {
        setDifficulty(level);
        setPoolEmptyError(true);
        setIsLoading(false);
        return;
      }

      const seenKey = `@quiz_seen_${level}`;
      const seenData = await AsyncStorage.getItem(seenKey);
      let seenIds: string[] = seenData ? JSON.parse(seenData) : [];
      
      const unseenQuestions = validQuestions.filter(q => !seenIds.includes(q.id));
      
      if (unseenQuestions.length === 0 && validQuestions.length > 0) {
        setDifficulty(level);
        setIsExhausted(true);
        setIsLoading(false);
        return;
      }
      
      // Shuffle unseen questions
      let shuffledUnseen = shuffleArray(unseenQuestions);
      let selected = shuffledUnseen.slice(0, Math.min(QUIZ_LENGTH, unseenQuestions.length));
      let currentSequence = selected.map(q => q.id).join(',');

      // Prevent exact same sequence repetition
      const lastSeqKey = `@quiz_last_seq_${level}`;
      const lastSeq = await AsyncStorage.getItem(lastSeqKey);
      
      if (lastSeq && currentSequence === lastSeq && unseenQuestions.length > 1) {
        // Swap first two elements to guarantee variation if possible
        if (selected.length > 1) {
          const temp = selected[0];
          selected[0] = selected[1];
          selected[1] = temp;
          currentSequence = selected.map(q => q.id).join(',');
        }
      }
      
      await AsyncStorage.setItem(lastSeqKey, currentSequence);
      
      // Save seen instantly so restarting doesn't reuse them
      const newSeenIds = Array.from(new Set([...seenIds, ...selected.map(q => q.id)]));
      await AsyncStorage.setItem(seenKey, JSON.stringify(newSeenIds));

      // Prepare questions with shuffled options
      const preparedSession = selected.map(q => {
        const correctText = q.options[q.correctIndex];
        const shuffledOptions = shuffleArray(q.options);
        const newCorrectIndex = shuffledOptions.indexOf(correctText);
        
        return {
          ...q,
          shuffledOptions,
          newCorrectIndex
        };
      });
      
      setSessionQuestions(preparedSession);
      setDifficulty(level);
      setCurrentQuestionIndex(0);
      setScore(0);
      setIsFinished(false);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setIsExhausted(false);
    } catch (e) {
      logError(e, 'QuizScreen - fetchQuestions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStart = (level: 'beginner' | 'intermediate' | 'advanced') => {
    loadQuestions(level);
  };

  const handleResetPool = async () => {
    if (!difficulty) return;
    setIsLoading(true);
    const seenKey = `@quiz_seen_${difficulty}`;
    await AsyncStorage.removeItem(seenKey);
    await loadQuestions(difficulty);
  };

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null || !difficulty || sessionQuestions.length === 0) return;
    
    const currentQ = sessionQuestions[currentQuestionIndex];
    if (selectedAnswer === currentQ.newCorrectIndex) {
      setScore(s => s + 1);
    }
    setIsAnswered(true);
  };

  const saveProgress = async () => {
    if (!difficulty || sessionQuestions.length === 0) return;
    setSaving(true);
    try {
      // 1. Save seen locally
      const seenKey = `@quiz_seen_${difficulty}`;
      const seenData = await AsyncStorage.getItem(seenKey);
      let seenIds: string[] = seenData ? JSON.parse(seenData) : [];
      
      const newIds = sessionQuestions.map(q => q.id);
      const combinedIds = Array.from(new Set([...seenIds, ...newIds]));
      
      await AsyncStorage.setItem(seenKey, JSON.stringify(combinedIds));
      
      // 2. Submit to backend (existing API)
      await api.post('/learning/quiz/submit', {
        difficulty,
        score: score + (selectedAnswer === sessionQuestions[currentQuestionIndex].newCorrectIndex ? 1 : 0),
        max_score: sessionQuestions.length
      });
    } catch (error) {
      logError(error, 'QuizScreen - finishQuiz saveScore');
    } finally {
      setSaving(false);
      setIsFinished(true);
    }
  };

  const handleNext = async () => {
    if (currentQuestionIndex < sessionQuestions.length - 1) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        setCurrentQuestionIndex(i => i + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    } else {
      await saveProgress();
    }
  };

  if (!difficulty || isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-[#050B14]">
        <View className="px-4 pt-4 flex-row items-center mb-6">
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
            <ArrowLeft color="#fff" size={24} />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-white font-outfit">Skin Health Quiz</Text>
        </View>
        
        {isLoading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#00f2fe" />
          </View>
        ) : (
          <View className="px-4 flex-1 justify-center pb-20">
            <Text className="text-3xl font-bold text-white text-center mb-2">Test Your Knowledge</Text>
            <Text className="text-clinical-text text-center mb-10">Select a difficulty to begin</Text>
            
            <TouchableOpacity 
              onPress={() => handleStart('beginner')}
              className="bg-clinical-card border border-clinical-border p-5 rounded-xl mb-4"
            >
              <Text className="text-lg font-bold text-white text-center mb-1">Beginner</Text>
              <Text className="text-sm text-clinical-slate text-center">Basic concepts & terminology</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => handleStart('intermediate')}
              className="bg-clinical-card border border-clinical-border p-5 rounded-xl mb-4"
            >
              <Text className="text-lg font-bold text-white text-center mb-1">Intermediate</Text>
              <Text className="text-sm text-clinical-slate text-center">Prevention & general care</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => handleStart('advanced')}
              className="bg-clinical-card border border-clinical-border p-5 rounded-xl"
            >
              <Text className="text-lg font-bold text-white text-center mb-1">Advanced</Text>
              <Text className="text-sm text-clinical-slate text-center">Medical terminology & concepts</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }

  if (poolEmptyError) {
    return (
      <SafeAreaView className="flex-1 bg-[#050B14]">
        <View className="px-4 pt-4 flex-row items-center mb-6">
          <TouchableOpacity onPress={() => setDifficulty(null)} className="mr-4">
            <ArrowLeft color="#fff" size={24} />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-white font-outfit">Configuration Error</Text>
        </View>
        <View className="flex-1 items-center justify-center px-4 pb-20">
          <XCircle color="#f87171" size={80} className="mb-6" />
          <Text className="text-2xl font-bold text-white text-center mb-4">No Valid Questions Found</Text>
          <Text className="text-clinical-slate text-center text-lg mb-10 leading-relaxed">
            The {difficulty} difficulty pool is currently unavailable or improperly configured. Please select a different difficulty or contact support.
          </Text>
          <TouchableOpacity 
            onPress={() => setDifficulty(null)}
            className="w-full bg-clinical-teal py-4 rounded-xl items-center flex-row justify-center mb-4"
          >
            <ArrowLeft color="#050B14" size={20} className="mr-2" />
            <Text className="text-[#050B14] font-bold text-lg">Return to Difficulty Selection</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (isExhausted) {
    return (
      <SafeAreaView className="flex-1 bg-[#050B14]">
        <View className="px-4 pt-4 flex-row items-center mb-6">
          <TouchableOpacity onPress={() => setDifficulty(null)} className="mr-4">
            <ArrowLeft color="#fff" size={24} />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-white font-outfit">Pool Exhausted</Text>
        </View>
        <View className="flex-1 items-center justify-center px-4 pb-20">
          <Trophy color="#4ade80" size={80} className="mb-6" />
          <Text className="text-2xl font-bold text-white text-center mb-4">You've answered all questions!</Text>
          <Text className="text-clinical-slate text-center text-lg mb-10 leading-relaxed">
            You have successfully seen every question in the {difficulty} difficulty pool. Start a fresh cycle to play again.
          </Text>
          <TouchableOpacity 
            onPress={handleResetPool}
            className="w-full bg-clinical-teal py-4 rounded-xl items-center flex-row justify-center mb-4"
          >
            <RotateCcw color="#050B14" size={20} className="mr-2" />
            <Text className="text-[#050B14] font-bold text-lg">Start Fresh Cycle</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setDifficulty(null)}
            className="w-full bg-clinical-card border border-clinical-border py-4 rounded-xl items-center"
          >
            <Text className="text-white font-bold text-lg">Change Difficulty</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (isFinished) {
    const percentage = Math.round((score / sessionQuestions.length) * 100);
    return (
      <SafeAreaView className="flex-1 bg-[#050B14]">
        <View className="flex-1 items-center justify-center px-4">
          <Trophy color="#f59e0b" size={80} className="mb-6" />
          <Text className="text-3xl font-bold text-white mb-2">Quiz Complete! 🎉</Text>
          <Text className="text-xl text-clinical-text mb-8">Your Score: {score} / {sessionQuestions.length}</Text>
          
          <View className="w-32 h-32 rounded-full border-8 border-clinical-teal items-center justify-center mb-10">
            <Text className="text-3xl font-bold text-white">{percentage}%</Text>
          </View>
          
          <TouchableOpacity 
            onPress={() => loadQuestions(difficulty)}
            className="w-full bg-clinical-teal py-4 rounded-xl items-center mb-4"
          >
            <Text className="text-[#050B14] font-bold text-lg">Next {QUIZ_LENGTH} Questions</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => setDifficulty(null)}
            className="w-full bg-clinical-card border border-clinical-border py-4 rounded-xl items-center mb-4"
          >
            <Text className="text-white font-bold text-lg">Change Difficulty</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const currentQ = sessionQuestions[currentQuestionIndex];
  
  if (!currentQ) {
    return (
      <SafeAreaView className="flex-1 bg-[#050B14]">
        <View className="px-4 pt-4 flex-row items-center mb-6">
          <TouchableOpacity onPress={() => setDifficulty(null)} className="mr-4">
            <ArrowLeft color="#fff" size={24} />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-white font-outfit">Error</Text>
        </View>
        <View className="flex-1 items-center justify-center px-4 pb-20">
          <XCircle color="#f87171" size={80} className="mb-6" />
          <Text className="text-2xl font-bold text-white text-center mb-4">Question Not Found</Text>
          <Text className="text-clinical-slate text-center text-lg mb-10 leading-relaxed">
            There was an error loading this question. Please return to the difficulty selection and try again.
          </Text>
          <TouchableOpacity 
            onPress={() => setDifficulty(null)}
            className="w-full bg-clinical-teal py-4 rounded-xl items-center flex-row justify-center mb-4"
          >
            <ArrowLeft color="#050B14" size={20} className="mr-2" />
            <Text className="text-[#050B14] font-bold text-lg">Return to Difficulty Selection</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#050B14]">
      <View className="px-4 pt-4 flex-row items-center justify-between mb-4">
        <TouchableOpacity onPress={() => setDifficulty(null)}>
          <ArrowLeft color="#fff" size={24} />
        </TouchableOpacity>
        <Text className="text-clinical-text font-bold">
          Question {currentQuestionIndex + 1} of {sessionQuestions.length}
        </Text>
        <View style={{ width: 24 }} />
      </View>
      
      {/* Progress Bar */}
      <View className="px-4 mb-8">
        <View className="h-2 bg-clinical-card rounded-full overflow-hidden">
          <View 
            className="h-full bg-clinical-teal" 
            style={{ width: `${((currentQuestionIndex) / sessionQuestions.length) * 100}%` }}
          />
        </View>
      </View>

      <ScrollView className="flex-1 px-4">
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text className="text-2xl font-bold text-white mb-8 leading-tight">
            {currentQ?.question}
          </Text>
          
          {currentQ?.shuffledOptions?.map((option: string, index: number) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQ?.newCorrectIndex;
            
            let bgClass = "bg-clinical-card border-clinical-border";
            let textClass = "text-white";
            
            if (isAnswered) {
              if (isCorrect) {
                bgClass = "bg-green-500/20 border-green-500";
                textClass = "text-green-400";
              } else if (isSelected) {
                bgClass = "bg-red-500/20 border-red-500";
                textClass = "text-red-400";
              }
            } else if (isSelected) {
              bgClass = "bg-clinical-teal/20 border-clinical-teal";
              textClass = "text-clinical-teal";
            }
            
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleAnswer(index)}
                disabled={isAnswered}
                className={`p-4 rounded-xl border mb-3 flex-row items-center justify-between ${bgClass}`}
              >
                <Text className={`text-base font-medium flex-1 ${textClass}`}>
                  {option}
                </Text>
                {isAnswered && isCorrect && <CheckCircle2 color="#4ade80" size={20} />}
                {isAnswered && isSelected && !isCorrect && <XCircle color="#f87171" size={20} />}
              </TouchableOpacity>
            );
          })}
          
          {isAnswered && (
            <View className="mt-6 bg-clinical-card/50 p-4 rounded-xl border border-clinical-border mb-8">
              <Text className="text-sm font-bold text-white mb-2">Explanation:</Text>
              <Text className="text-sm text-clinical-slate leading-relaxed">
                {currentQ?.explanation}
              </Text>
            </View>
          )}
        </Animated.View>
      </ScrollView>

      <View className="p-4 border-t border-clinical-border bg-[#050B14]">
        {!isAnswered ? (
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={selectedAnswer === null}
            className={`py-4 rounded-xl items-center ${selectedAnswer !== null ? 'bg-clinical-teal' : 'bg-clinical-card'}`}
          >
            <Text className={`font-bold text-lg ${selectedAnswer !== null ? 'text-[#050B14]' : 'text-clinical-slate'}`}>
              Submit Answer
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleNext}
            disabled={saving}
            className="bg-clinical-teal py-4 rounded-xl items-center"
          >
            <Text className="font-bold text-[#050B14] text-lg">
              {saving ? "Saving..." : (currentQuestionIndex === sessionQuestions.length - 1 ? "View Results" : "Next Question")}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
