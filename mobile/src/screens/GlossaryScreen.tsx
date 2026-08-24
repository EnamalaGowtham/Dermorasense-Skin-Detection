import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, BookOpen, Info } from 'lucide-react-native';
import { GLOSSARY_TERMS } from '../data/learningData';

export default function GlossaryScreen({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerm, setSelectedTerm] = useState<any>(null);

  const filteredTerms = GLOSSARY_TERMS.filter(t => {
    if (!t.term || !t.definition) return false;
    return t.term.toLowerCase().includes(searchQuery.toLowerCase()) || 
           t.definition.toLowerCase().includes(searchQuery.toLowerCase());
  }).sort((a, b) => a.term.localeCompare(b.term));

  if (selectedTerm) {
    return (
      <SafeAreaView className="flex-1 bg-[#050B14]">
        <View className="px-4 pt-4 flex-row items-center mb-6">
          <TouchableOpacity onPress={() => setSelectedTerm(null)} className="mr-4 p-2 -ml-2">
            <ArrowLeft color="#fff" size={24} />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-white font-outfit">Term Details</Text>
        </View>
        <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 40 }}>
          <View className="bg-clinical-card border border-clinical-border p-6 rounded-2xl mb-4">
            <View className="flex-row items-center mb-6 border-b border-slate-700/50 pb-4">
              <BookOpen color="#00f2fe" size={28} className="mr-3" />
              <Text className="text-2xl font-bold text-white">{selectedTerm.term}</Text>
            </View>
            
            <View className="mb-6">
              <Text className="text-clinical-teal font-bold mb-2 uppercase text-xs tracking-wider">Simple Definition</Text>
              <Text className="text-white text-base leading-relaxed">{selectedTerm.definition}</Text>
            </View>
            
            {selectedTerm.example && (
              <View className="bg-[#0a1220] p-4 rounded-xl border border-clinical-border/30 flex-row items-start">
                <Info color="#94a3b8" size={18} className="mr-3 mt-0.5 shrink-0" />
                <View className="flex-1">
                  <Text className="text-clinical-teal font-bold mb-1 uppercase text-xs tracking-wider">Example</Text>
                  <Text className="text-slate-300 text-sm italic leading-relaxed">{selectedTerm.example}</Text>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#050B14]">
      <View className="px-4 pt-4 flex-row items-center mb-6">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4 p-2 -ml-2">
          <ArrowLeft color="#fff" size={24} />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-white font-outfit">Medical Glossary</Text>
      </View>
      
      <View className="px-4 mb-4">
        <View className="flex-row items-center bg-clinical-card border border-clinical-border rounded-xl px-4 py-3">
          <Search color="#64748b" size={20} className="mr-2" />
          <TextInput 
            className="flex-1 text-white font-medium"
            placeholder="Search medical terms..."
            placeholderTextColor="#64748b"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      
      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 40 }}>
        {filteredTerms.map((item) => (
          <TouchableOpacity 
            key={item.id}
            onPress={() => setSelectedTerm(item)}
            className="bg-clinical-card border border-clinical-border p-5 rounded-2xl mb-4 active:bg-slate-800"
          >
            <View className="flex-row items-center mb-2">
              <BookOpen color="#00f2fe" size={18} className="mr-2" />
              <Text className="text-xl font-bold text-white">{item.term}</Text>
            </View>
            <Text className="text-clinical-slate leading-relaxed" numberOfLines={2}>
              {item.definition}
            </Text>
          </TouchableOpacity>
        ))}
        
        {filteredTerms.length === 0 && (
          <View className="items-center justify-center py-10 px-4">
            <Text className="text-clinical-slate text-center text-lg">No medical terms found.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
