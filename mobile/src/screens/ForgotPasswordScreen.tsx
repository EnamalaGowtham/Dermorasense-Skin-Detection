import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../services/api';
import { showErrorAlert } from '../utils/errorHandler';

export default function ForgotPasswordScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    if (!email) {
      Alert.alert('Validation Error', 'Please enter your email.');
      return;
    }
    
    setLoading(true);
    try {
      // Connects to the existing backend forgot-password endpoint
      await api.post('/auth/forgot-password', { email });
      Alert.alert('Success', 'If an account exists, an OTP has been sent to your email.');
      navigation.navigate('VerifyOTP', { email });
    } catch (error: any) {
      showErrorAlert('Error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-clinical-bg">
      <View className="flex-1 justify-center px-6">
        <Text className="text-3xl font-bold font-outfit text-white mb-2 text-center">Forgot Password</Text>
        <Text className="text-clinical-slate text-center text-sm mb-8">
          Enter your email to receive an OTP.
        </Text>
        
        <View className="bg-clinical-card border border-clinical-border p-6 rounded-3xl shadow-lg">
          <View className="mb-6">
            <Text className="text-clinical-slate text-xs font-semibold mb-2 ml-1">Email Address</Text>
            <TextInput
              className="bg-[#0f172a] border border-clinical-border text-white px-4 py-3.5 rounded-xl text-base"
              placeholder="Enter your email"
              placeholderTextColor="#64748b"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          
          <TouchableOpacity 
            className={`w-full py-4 rounded-xl items-center ${loading ? 'bg-clinical-teal/70' : 'bg-clinical-teal'}`} 
            onPress={handleSendOTP}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#0f172a" /> : <Text className="text-[#0f172a] font-bold text-base">Send OTP</Text>}
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="mt-8 py-4 items-center" onPress={() => navigation.goBack()}>
          <Text className="text-clinical-slate font-medium text-base">Back to Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
