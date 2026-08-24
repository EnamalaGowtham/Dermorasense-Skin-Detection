import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../services/api';
import { ArrowLeft } from 'lucide-react-native';
import { showErrorAlert } from '../utils/errorHandler';

export default function VerifyOTPScreen({ route, navigation }: any) {
  const { email } = route.params || {};
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(60);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendCooldown > 0) {
      interval = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resendCooldown]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      Alert.alert('Validation Error', 'Please enter the complete 6-digit OTP.');
      return;
    }
    
    setLoading(true);
    try {
      const res = await api.post('/auth/verify-reset-otp', { email, otp: otpString });
      const { reset_token } = res.data;
      if (reset_token) {
        navigation.navigate('ResetPassword', { reset_token });
      } else {
        Alert.alert('Error', 'OTP verified but no reset token was returned from server.');
      }
    } catch (error: any) {
      showErrorAlert('Error', error);
      // Clear OTP on error
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    
    try {
      await api.post('/auth/forgot-password', { email });
      Alert.alert('Success', 'A new OTP has been sent to your email.');
      setResendCooldown(60);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch (error: any) {
      showErrorAlert('Error', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-clinical-bg">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View className="px-4 pt-4">
            <TouchableOpacity onPress={() => navigation.goBack()} className="w-10 h-10 items-center justify-center rounded-full bg-white/5 border border-white/10">
              <ArrowLeft color="#00f2fe" size={20} />
            </TouchableOpacity>
          </View>
          
          <View className="flex-1 justify-center px-6 mt-[-40px]">
            <Text className="text-3xl font-bold font-outfit text-white mb-2 text-center">Verify OTP</Text>
            <Text className="text-clinical-slate text-center text-sm mb-8">
              We sent a verification code to{'\n'}<Text className="text-white font-bold">{email || 'your email'}</Text>
            </Text>
            
            <View className="bg-clinical-card border border-clinical-border p-6 rounded-3xl shadow-lg">
              <View className="flex-row justify-between mb-8 px-2">
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => { inputRefs.current[index] = ref; }}
                    className="w-12 h-14 bg-[#0f172a] border border-clinical-border rounded-xl text-white text-center text-xl font-bold font-outfit focus:border-clinical-teal"
                    keyboardType="number-pad"
                    maxLength={1}
                    value={digit}
                    onChangeText={(val) => handleOtpChange(val, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                  />
                ))}
              </View>
              
              <TouchableOpacity 
                className={`w-full py-4 rounded-xl items-center ${loading || otp.join('').length !== 6 ? 'bg-clinical-teal/40' : 'bg-clinical-teal'}`} 
                onPress={handleVerify}
                disabled={loading || otp.join('').length !== 6}
              >
                {loading ? <ActivityIndicator color="#0f172a" /> : <Text className="text-[#0f172a] font-bold text-base">Verify OTP</Text>}
              </TouchableOpacity>

              <View className="flex-row justify-center mt-6">
                <Text className="text-clinical-slate text-sm">Didn't receive the code? </Text>
                <TouchableOpacity onPress={handleResend} disabled={resendCooldown > 0}>
                  <Text className={`text-sm font-bold ${resendCooldown > 0 ? 'text-clinical-slate/50' : 'text-clinical-teal hover:underline'}`}>
                    {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend OTP'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
