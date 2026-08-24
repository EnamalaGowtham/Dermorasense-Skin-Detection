import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../services/api';
import { showErrorAlert } from '../utils/errorHandler';

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Validation Error', 'All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match.');
      return;
    }
    try {
      setLoading(true);
      await api.post('/auth/register', { name, email, password });
      Alert.alert('Registration Successful', 'You can now log in.');
      navigation.replace('Login');
    } catch (error: any) {
      showErrorAlert('Registration Failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-clinical-bg">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 20 }}>
          <View className="items-center mb-8">
            <Text className="text-3xl font-outfit font-bold text-white tracking-tight">
              Create an Account
            </Text>
            <Text className="text-clinical-slate text-sm mt-2 text-center">
              Join DermoraSense today
            </Text>
          </View>

          <View className="bg-clinical-card/80 border border-clinical-border p-6 rounded-3xl shadow-lg">
            
            <View className="mb-4">
              <Text className="text-clinical-slate text-sm font-semibold mb-2 ml-1">Full Name</Text>
              <TextInput
                className="bg-[#0f172a] border border-clinical-border text-white px-4 py-3.5 rounded-xl text-base"
                placeholder="Enter your full name"
                placeholderTextColor="#64748b"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

            <View className="mb-4">
              <Text className="text-clinical-slate text-sm font-semibold mb-2 ml-1">Email Address</Text>
              <TextInput
                className="bg-[#0f172a] border border-clinical-border text-white px-4 py-3.5 rounded-xl text-base"
                placeholder="Enter your email"
                placeholderTextColor="#64748b"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
            
            <View className="mb-4">
              <Text className="text-clinical-slate text-sm font-semibold mb-2 ml-1">Password</Text>
              <TextInput
                className="bg-[#0f172a] border border-clinical-border text-white px-4 py-3.5 rounded-xl text-base"
                placeholder="Create a password"
                placeholderTextColor="#64748b"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View className="mb-6">
              <Text className="text-clinical-slate text-sm font-semibold mb-2 ml-1">Confirm Password</Text>
              <TextInput
                className="bg-[#0f172a] border border-clinical-border text-white px-4 py-3.5 rounded-xl text-base"
                placeholder="Confirm your password"
                placeholderTextColor="#64748b"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity 
              className={`w-full py-4 rounded-xl flex-row justify-center items-center ${loading ? 'bg-clinical-teal/70' : 'bg-clinical-teal'}`}
              onPress={handleRegister} 
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#0f172a" />
              ) : (
                <Text className="text-[#0f172a] font-bold text-lg tracking-wide">Register</Text>
              )}
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center mt-8 pb-10">
            <Text className="text-clinical-slate text-base">Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text className="text-clinical-teal text-base font-bold">Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
