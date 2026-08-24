import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, ActivityIndicator, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { showErrorAlert } from '../utils/errorHandler';
import { User, Lock, ShieldAlert, Trash2, CheckCircle2, XCircle, ArrowLeft, Info, ChevronRight } from 'lucide-react-native';

export default function ProfileScreen({ navigation }: any) {
  const { user, updateUser, logout } = useAuth();
  
  // Profile details state
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profileLoading, setProfileLoading] = useState(false);

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passLoading, setPassLoading] = useState(false);

  // Logout state
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  // Deletion state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    if (!name || !email) {
      Alert.alert('Validation Error', 'Name and Email are required');
      return;
    }

    const emailLower = email.toLowerCase();
    if (!emailLower.endsWith('@gmail.com') && !emailLower.endsWith('@email.com')) {
      Alert.alert('Validation Error', 'Email address must end with @gmail.com or @email.com.');
      return;
    }
    
    setProfileLoading(true);
    try {
      const res = await api.put('/profile', { name, email });
      if (res.data) {
        updateUser(res.data); // Update context
        Alert.alert('Success', 'Profile information updated successfully.');
      }
    } catch (error: any) {
      showErrorAlert('Profile Update Failed', error);
    } finally {
      setProfileLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'All password fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match.');
      return;
    }

    if (newPassword.length < 8) {
      Alert.alert('Error', 'New password must be at least 8 characters long.');
      return;
    }

    setPassLoading(true);
    try {
      await api.put('/profile/password', { currentPassword, newPassword });
      Alert.alert('Success', 'Password changed successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      showErrorAlert('Password Change Failed', error);
    } finally {
      setPassLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText.toLowerCase() !== 'delete account') {
      Alert.alert('Error', 'Please enter the confirmation text correctly.');
      return;
    }

    setDeleteLoading(true);
    try {
      await api.delete('/profile/delete');
      setShowDeleteModal(false);
      await logout();
      // AuthContext will automatically redirect to Login due to AppNavigator listening to isAuthenticated
    } catch (err: any) {
      showErrorAlert('Delete Failed', err);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await logout();
      setShowLogoutModal(false);
    } catch (error) {
      showErrorAlert('Logout Failed', error);
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-clinical-bg">
      <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-3">
            <ArrowLeft color="#00f2fe" size={24} />
          </TouchableOpacity>
          <User className="text-clinical-teal w-6 h-6 mr-2" color="#00f2fe" />
          <View>
            <Text className="text-xl font-bold font-outfit text-white">Profile Settings</Text>
          </View>
        </View>
        
        {/* Account Details */}
        <View className="bg-clinical-card/80 border border-clinical-border p-6 rounded-2xl shadow-lg mb-6">
          <View className="flex-row items-center border-b border-clinical-border pb-3 mb-4">
            <User color="#00f2fe" size={16} className="mr-2" />
            <Text className="text-white font-bold">Account Details</Text>
          </View>
          
          <View className="mb-6">
            <Text className="text-clinical-slate text-sm font-semibold mb-2 ml-1">Full Name</Text>
            <TextInput
              className="bg-[#090e1c] border border-clinical-border text-white px-5 py-4 rounded-xl text-base focus:border-clinical-teal"
              placeholder="Your name"
              placeholderTextColor="#64748b"
              value={name}
              onChangeText={setName}
            />
          </View>
          
          <View className="mb-8">
            <Text className="text-clinical-slate text-sm font-semibold mb-2 ml-1">Email Address</Text>
            <TextInput
              className="bg-[#090e1c] border border-clinical-border text-white px-5 py-4 rounded-xl text-base focus:border-clinical-teal"
              placeholder="Your email"
              placeholderTextColor="#64748b"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          
          <TouchableOpacity 
            className={`w-full py-4 rounded-xl items-center ${profileLoading ? 'bg-clinical-teal/70' : 'bg-clinical-teal'}`} 
            onPress={handleUpdateProfile}
            disabled={profileLoading}
          >
            {profileLoading ? <ActivityIndicator color="#0a0f1d" size="small" /> : <Text className="text-[#0a0f1d] font-bold text-base">Save Profile Details</Text>}
          </TouchableOpacity>
        </View>

        {/* Change Password */}
        <View className="bg-clinical-card/80 border border-clinical-border p-6 rounded-2xl shadow-lg mb-6">
          <View className="flex-row items-center border-b border-clinical-border pb-3 mb-4">
            <Lock color="#00f2fe" size={16} className="mr-2" />
            <Text className="text-white font-bold">Security Password Change</Text>
          </View>
          
          <View className="mb-4">
            <Text className="text-clinical-slate text-xs font-semibold mb-2 ml-1">Current Password</Text>
            <TextInput
              className="bg-[#090e1c] border border-clinical-border text-white px-4 py-3 rounded-xl text-sm focus:border-clinical-teal"
              placeholder="••••••••"
              placeholderTextColor="#64748b"
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
          </View>
          
          <View className="mb-4">
            <Text className="text-clinical-slate text-xs font-semibold mb-2 ml-1">New Password</Text>
            <TextInput
              className="bg-[#090e1c] border border-clinical-border text-white px-4 py-3 rounded-xl text-sm focus:border-clinical-teal"
              placeholder="••••••••"
              placeholderTextColor="#64748b"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
          </View>

          <View className="mb-6">
            <Text className="text-clinical-slate text-xs font-semibold mb-2 ml-1">Confirm New Password</Text>
            <TextInput
              className="bg-[#090e1c] border border-clinical-border text-white px-4 py-3 rounded-xl text-sm focus:border-clinical-teal"
              placeholder="••••••••"
              placeholderTextColor="#64748b"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
          
          <TouchableOpacity 
            className={`w-full py-3.5 rounded-xl items-center ${passLoading ? 'bg-clinical-teal/70' : 'bg-clinical-teal'}`} 
            onPress={handleChangePassword}
            disabled={passLoading}
          >
            {passLoading ? <ActivityIndicator color="#0a0f1d" size="small" /> : <Text className="text-[#0a0f1d] font-bold text-sm">Update Password</Text>}
          </TouchableOpacity>
        </View>

        {/* App Information */}
        <View className="bg-clinical-card/80 border border-clinical-border p-6 rounded-2xl shadow-lg mb-6">
          <View className="flex-row items-center border-b border-clinical-border pb-3 mb-4">
            <Info color="#00f2fe" size={16} className="mr-2" />
            <Text className="text-white font-bold">App Information</Text>
          </View>
          
          <TouchableOpacity 
            className="w-full py-3.5 bg-[#0f172a] border border-clinical-border rounded-xl items-center flex-row px-4 justify-between mb-2" 
            onPress={() => navigation.navigate('HowItWorks')}
          >
            <Text className="text-white font-bold text-sm">How It Works</Text>
            <ChevronRight color="#64748b" size={16} />
          </TouchableOpacity>
        </View>

        {/* Logout Section */}
        <View className="mb-8">
          <TouchableOpacity 
            className="w-full py-3.5 bg-[#0f172a] border border-clinical-border rounded-xl items-center flex-row justify-center" 
            onPress={() => setShowLogoutModal(true)}
          >
            <Text className="text-white font-bold text-sm">Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Danger Zone */}
        <View className="bg-red-950/5 border border-red-500/20 p-6 rounded-2xl mb-8">
          <View className="flex-row items-center mb-2">
            <ShieldAlert color="#f87171" size={18} className="mr-2" />
            <Text className="text-red-400 font-bold text-sm">Danger Zone</Text>
          </View>
          <Text className="text-clinical-slate text-xs leading-relaxed mb-4">
            Deleting your profile is irreversible. Doing so deletes your name, email, credentials, and all recorded skin scans, including their diagnostic heatmaps and PDF reports.
          </Text>
          <TouchableOpacity 
            className="w-full py-3 bg-red-500/10 border border-red-500/20 rounded-xl items-center flex-row justify-center" 
            onPress={() => setShowDeleteModal(true)}
          >
            <Trash2 color="#f87171" size={16} className="mr-2" />
            <Text className="text-red-400 font-bold text-xs">Delete Account</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal visible={showLogoutModal} transparent animationType="fade">
        <View className="flex-1 bg-black/60 justify-center items-center p-4">
          <View className="bg-[#0c0d16] border border-clinical-border w-full max-w-sm rounded-3xl p-6 shadow-2xl">
            <View className="flex-row items-center mb-4">
              <User color="#00f2fe" size={20} className="mr-2" />
              <Text className="text-white font-bold text-lg">Confirm Logout</Text>
            </View>
            
            <Text className="text-clinical-slate text-sm leading-relaxed mb-6">
              Are you sure you want to log out of DermoraSense?
            </Text>

            <View className="flex-row justify-end space-x-3">
              <TouchableOpacity 
                className="px-4 py-2 justify-center"
                onPress={() => setShowLogoutModal(false)}
                disabled={logoutLoading}
              >
                <Text className="text-clinical-slate text-sm font-semibold">Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                className={`px-5 py-2.5 rounded-xl justify-center ${logoutLoading ? 'bg-clinical-teal/50' : 'bg-clinical-teal'}`}
                onPress={handleLogout}
                disabled={logoutLoading}
              >
                {logoutLoading ? (
                  <ActivityIndicator color="#0a0f1d" size="small" />
                ) : (
                  <Text className="text-[#0a0f1d] font-bold text-sm">Logout</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal visible={showDeleteModal} transparent animationType="fade">
        <View className="flex-1 bg-black/60 justify-center items-center p-4">
          <View className="bg-[#0c0d16] border border-red-500/30 w-full max-w-sm rounded-3xl p-6 shadow-2xl">
            <View className="flex-row items-center mb-4">
              <ShieldAlert color="#f87171" size={20} className="mr-2" />
              <Text className="text-white font-bold text-lg">Confirm Deletion</Text>
            </View>
            
            <Text className="text-clinical-slate text-xs leading-relaxed mb-4">
              This action is permanent and cannot be undone. To verify, please type <Text className="text-white font-bold">"delete account"</Text> below.
            </Text>

            <TextInput
              className="bg-[#090e1c] border border-red-500/20 focus:border-red-500 text-white px-4 py-3 rounded-xl text-sm mb-6"
              placeholder='Type "delete account"...'
              placeholderTextColor="#64748b"
              value={deleteConfirmText}
              onChangeText={setDeleteConfirmText}
              autoCapitalize="none"
            />

            <View className="flex-row justify-end space-x-3">
              <TouchableOpacity 
                className="px-4 py-2 justify-center"
                onPress={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmText('');
                }}
              >
                <Text className="text-clinical-slate text-xs font-semibold">Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                className={`px-5 py-2.5 rounded-xl justify-center ${deleteConfirmText.toLowerCase() === 'delete account' && !deleteLoading ? 'bg-red-600' : 'bg-red-600/50'}`}
                disabled={deleteConfirmText.toLowerCase() !== 'delete account' || deleteLoading}
                onPress={handleDeleteAccount}
              >
                {deleteLoading ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <Text className="text-white font-bold text-xs">Delete Permanently</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
