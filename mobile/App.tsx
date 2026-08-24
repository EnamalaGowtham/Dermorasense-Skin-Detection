import 'react-native-reanimated';
import "./global.css";
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActivityIndicator, View } from 'react-native';
import { Home, Camera, Clock, User, BookOpen } from 'lucide-react-native';

import { AuthProvider, useAuth } from './src/context/AuthContext';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import VerifyOTPScreen from './src/screens/VerifyOTPScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';

import DashboardScreen from './src/screens/DashboardScreen';
import AnalyzeScreen from './src/screens/AnalyzeScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import LearnScreen from './src/screens/LearnScreen';
import DiseaseLibraryScreen from './src/screens/DiseaseLibraryScreen';
import LearnResultScreen from './src/screens/LearnResultScreen';
import SimilarDiseaseScreen from './src/screens/SimilarDiseaseScreen';
import SkinCareGuideScreen from './src/screens/SkinCareGuideScreen';
import MythFactScreen from './src/screens/MythFactScreen';
import GlossaryScreen from './src/screens/GlossaryScreen';
import QuizScreen from './src/screens/QuizScreen';

import DiseaseDetailsScreen from './src/screens/DiseaseDetailsScreen';
import NearbyDermatologyScreen from './src/screens/NearbyDermatologyScreen';
import HowItWorksScreen from './src/screens/HowItWorksScreen';
import MapsScreen from './src/screens/MapsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#050B14',
          borderTopWidth: 1,
          borderTopColor: '#1e293b',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#00f2fe',
        tabBarInactiveTintColor: '#64748b',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: 'bold',
          marginTop: 2,
        },
      }}
    >
      <Tab.Screen 
        name="DashboardTab" 
        component={DashboardScreen} 
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tab.Screen 
        name="AnalyzeTab" 
        component={AnalyzeScreen} 
        options={{
          title: 'Analyze',
          tabBarIcon: ({ color, size }) => <Camera color={color} size={size} />,
        }}
      />
      <Tab.Screen 
        name="HistoryTab" 
        component={HistoryScreen} 
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => <Clock color={color} size={size} />,
        }}
      />
      <Tab.Screen 
        name="LearnTab" 
        component={LearnScreen} 
        options={{
          title: 'Learn',
          tabBarIcon: ({ color, size }) => <BookOpen color={color} size={size} />,
        }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileScreen} 
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

const LearnStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="DiseaseLibrary" component={DiseaseLibraryScreen} />
    <Stack.Screen name="LearnResult" component={LearnResultScreen} />
    <Stack.Screen name="SimilarDisease" component={SimilarDiseaseScreen} />
    <Stack.Screen name="SkinCareGuide" component={SkinCareGuideScreen} />
    <Stack.Screen name="MythFact" component={MythFactScreen} />
    <Stack.Screen name="Glossary" component={GlossaryScreen} />
    <Stack.Screen name="Quiz" component={QuizScreen} />
  </Stack.Navigator>
);

const RootNavigator = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-clinical-bg">
        <ActivityIndicator size="large" color="#00f2fe" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="AppTabs" component={AppTabs} />
          <Stack.Screen name="LearnStack" component={LearnStack} />
          <Stack.Screen name="DiseaseDetails" component={DiseaseDetailsScreen} />
          <Stack.Screen name="NearbyDermatology" component={NearbyDermatologyScreen} />
          <Stack.Screen name="HowItWorks" component={HowItWorksScreen} />
          <Stack.Screen name="Maps" component={MapsScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="VerifyOTP" component={VerifyOTPScreen} />
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
