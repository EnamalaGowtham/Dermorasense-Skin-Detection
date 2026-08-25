import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Eye, EyeOff } from 'lucide-react-native';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { showErrorAlert } from '../utils/errorHandler';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please enter both email and password.');
      return;
    }
    
    const emailLower = email.toLowerCase().trim();
    if (!emailLower.endsWith('@gmail.com') && !emailLower.endsWith('@email.com')) {
      Alert.alert('Validation Error', 'Email address must end with @gmail.com or @email.com');
      return;
    }

    try {
      setLoading(true);
      const res = await api.post('/auth/login', { email: emailLower, password });
      if (res.data.user && res.data.access_token) {
        await login(res.data);
      } else {
        // Fallback if access token wasn't returned
        await login(res.data);
      }
    } catch (error: any) {
      showErrorAlert('Login Failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-clinical-bg">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 justify-center px-6"
      >
        <View className="items-center mb-10">
          <Text className="text-4xl font-outfit font-bold text-white tracking-tight">
            Dermora<Text className="text-clinical-teal">Sense</Text>
          </Text>
          <Text className="text-clinical-slate text-base mt-2 text-center">
            AI-Powered Dermatology Detection
          </Text>
        </View>

        <View className="bg-clinical-card/80 border border-clinical-border p-6 rounded-3xl shadow-lg">
          <Text className="text-2xl font-bold text-white mb-6">Welcome Back</Text>
          
          <View className="mb-6">
            <Text className="text-clinical-slate text-sm font-semibold mb-2 ml-1">Email Address</Text>
            <TextInput
              testID="email-input"
              className="bg-[#0f172a] border border-clinical-border text-white px-5 py-4 rounded-xl text-base"
              placeholder="Enter your email"
              placeholderTextColor="#64748b"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          
          <View className="mb-8">
            <Text className="text-clinical-slate text-sm font-semibold mb-2 ml-1">Password</Text>
            <View className="relative justify-center">
              <TextInput
                testID="password-input"
                className="bg-[#0f172a] border border-clinical-border text-white pl-5 pr-12 py-4 rounded-xl text-base"
                placeholder="Enter your password"
                placeholderTextColor="#64748b"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="absolute right-0 px-4 h-full justify-center"
                accessibilityLabel={showPassword ? "Hide password" : "Show password"}
                accessibilityRole="button"
              >
                {showPassword ? (
                  <EyeOff size={20} color="#64748b" />
                ) : (
                  <Eye size={20} color="#64748b" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
            testID="login-button"
            className={`w-full py-4 rounded-xl flex-row justify-center items-center ${loading ? 'bg-clinical-teal/70' : 'bg-clinical-teal'}`}
            onPress={handleLogin} 
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#0f172a" />
            ) : (
              <Text className="text-[#0f172a] font-bold text-lg tracking-wide">Sign In</Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="mt-4 py-2 items-center"
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text className="text-clinical-teal text-sm font-medium">Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mt-8">
          <Text className="text-clinical-slate text-base">Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text className="text-clinical-teal text-base font-bold">Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
