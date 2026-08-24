import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../services/api';
import { Eye, EyeOff } from 'lucide-react-native';
import { showErrorAlert } from '../utils/errorHandler';

export default function ResetPasswordScreen({ route, navigation }: any) {
  const { reset_token } = route.params || {};
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleReset = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Validation Error', 'Please enter and confirm your new password.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match.');
      return;
    }
    
    setLoading(true);
    try {
      await api.post('/auth/reset-password', { reset_token, password: newPassword });
      setSuccess(true);
    } catch (error: any) {
      showErrorAlert('Error', error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <SafeAreaView className="flex-1 bg-clinical-bg">
        <View className="flex-1 justify-center px-6 items-center">
          <View className="w-20 h-20 bg-emerald-500/20 rounded-full items-center justify-center mb-6 border border-emerald-500/40">
            <Text className="text-emerald-400 text-4xl">✓</Text>
          </View>
          <Text className="text-3xl font-bold font-outfit text-white mb-2 text-center">Password Reset{'\n'}Successful</Text>
          <Text className="text-clinical-slate text-center text-base mb-10">
            Your password has been updated.{'\n'}You can now log in with your new password.
          </Text>
          
          <TouchableOpacity 
            className="w-full py-4 rounded-xl items-center bg-clinical-teal" 
            onPress={() => navigation.navigate('Login')}
          >
            <Text className="text-[#0f172a] font-bold text-base">Go to Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-clinical-bg">
      <View className="flex-1 justify-center px-6">
        <Text className="text-3xl font-bold font-outfit text-white mb-2 text-center">Create New Password</Text>
        <Text className="text-clinical-slate text-center text-sm mb-8">
          Your new password must be different from previous used passwords.
        </Text>
        
        <View className="bg-clinical-card border border-clinical-border p-6 rounded-3xl shadow-lg">
          
          <View className="mb-4">
            <Text className="text-clinical-slate text-xs font-semibold mb-2 ml-1">New Password</Text>
            <View className="relative justify-center">
              <TextInput
                className="bg-[#0f172a] border border-clinical-border text-white px-4 py-3.5 pr-12 rounded-xl text-base"
                placeholder="Enter new password"
                placeholderTextColor="#64748b"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity 
                className="absolute right-4" 
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff color="#64748b" size={20} /> : <Eye color="#64748b" size={20} />}
              </TouchableOpacity>
            </View>
          </View>

          <View className="mb-8">
            <Text className="text-clinical-slate text-xs font-semibold mb-2 ml-1">Confirm Password</Text>
            <View className="relative justify-center">
              <TextInput
                className="bg-[#0f172a] border border-clinical-border text-white px-4 py-3.5 pr-12 rounded-xl text-base"
                placeholder="Confirm new password"
                placeholderTextColor="#64748b"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity 
                className="absolute right-4" 
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff color="#64748b" size={20} /> : <Eye color="#64748b" size={20} />}
              </TouchableOpacity>
            </View>
          </View>
          
          <TouchableOpacity 
            className={`w-full py-4 rounded-xl items-center ${loading ? 'bg-clinical-teal/70' : 'bg-clinical-teal'}`} 
            onPress={handleReset}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#0f172a" /> : <Text className="text-[#0f172a] font-bold text-base">Reset Password</Text>}
          </TouchableOpacity>
        </View>

        {!loading && (
          <TouchableOpacity className="mt-8 py-4 items-center" onPress={() => navigation.navigate('Login')}>
            <Text className="text-clinical-slate font-medium text-base">Back to Login</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
