import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Image, RefreshControl, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { logError, showErrorAlert } from '../utils/errorHandler';
import { Activity, ShieldAlert, BarChart3, Clock, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react-native';

export default function DashboardScreen({ navigation }: any) {
  const { user, logout } = useAuth();
  const [scans, setScans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchHistory = useCallback(async (isRefreshing = false) => {
    if (refreshing) return; // Prevent duplicate requests
    if (isRefreshing) setRefreshing(true);
    
    try {
      const res = await api.get('/scans/history');
      setScans(res.data);
    } catch (err) {
      logError(err, 'DashboardScreen - fetchHistory');
      if (isRefreshing) {
        showErrorAlert('Refresh Failed', err);
      }
    } finally {
      if (isRefreshing) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  }, [refreshing]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const onRefresh = () => {
    fetchHistory(true);
  };

  const totalScans = scans.length;
  const highSeverityScans = scans.filter(s => s.severity === 'high').length;
  
  const avgConfidence = totalScans > 0 
    ? scans.reduce((acc, curr) => acc + curr.confidence, 0) / totalScans 
    : 0;

  const mostCommonFinding = totalScans > 0 
    ? [...scans].reduce((acc: any, curr: any) => {
        acc[curr.prediction] = (acc[curr.prediction] || 0) + 1;
        return acc;
      }, {})
    : {};

  const topFindingName = Object.keys(mostCommonFinding).length > 0 
    ? Object.keys(mostCommonFinding).reduce((a, b) => mostCommonFinding[a] > mostCommonFinding[b] ? a : b)
    : "No scans recorded";

  const getSeverityColors = (sev: string) => {
    if (sev === 'high') return { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' };
    if (sev === 'moderate') return { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' };
    return { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' };
  };

  return (
    <SafeAreaView className="flex-1 bg-clinical-bg">
      <ScrollView 
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 100 }} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor="#00f2fe"
            colors={['#00f2fe']}
            progressBackgroundColor="#0a1220"
          />
        }
      >
        
        {/* Welcome Banner */}
        <View className="bg-clinical-card/80 p-6 rounded-3xl mb-6 border border-clinical-border shadow-lg overflow-hidden">
          <View className="absolute inset-0 bg-clinical-teal/5 opacity-50 z-0"></View>
          <View className="z-10 relative">
            <Text className="text-3xl font-outfit font-bold text-white mb-2">
              Welcome back, <Text className="text-clinical-teal">{user?.name?.split(' ')[0]}</Text>
            </Text>
            <Text className="text-base leading-relaxed text-clinical-slate mb-2">
              Analyze dermora-photographs with our advanced clinical-grade deep learning diagnostics platform.
            </Text>
          </View>
        </View>

        {/* Metrics Grid */}
        <View className="flex-row flex-wrap justify-between mb-8">
          <View className="w-[48%] bg-clinical-card/80 p-5 rounded-2xl mb-4 border border-clinical-border">
            <View className="w-12 h-12 bg-clinical-teal/10 border border-clinical-teal/20 rounded-xl flex items-center justify-center mb-4">
              <Activity color="#00f2fe" size={24} />
            </View>
            <Text className="text-xs font-bold text-clinical-slate uppercase tracking-wider">Total Scans</Text>
            <Text className="text-2xl font-black text-white mt-1">{totalScans}</Text>
          </View>

          <View className="w-[48%] bg-clinical-card/80 p-5 rounded-2xl mb-4 border border-clinical-border">
            <View className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center mb-4">
              <ShieldAlert color="#f87171" size={24} />
            </View>
            <Text className="text-xs font-bold text-clinical-slate uppercase tracking-wider">High Concern</Text>
            <Text className="text-2xl font-black text-white mt-1">{highSeverityScans}</Text>
          </View>

          <View className="w-[48%] bg-clinical-card/80 p-5 rounded-2xl border border-clinical-border">
            <View className="w-12 h-12 bg-clinical-blue/10 border border-clinical-blue/20 rounded-xl flex items-center justify-center mb-4">
              <BarChart3 color="#6366f1" size={24} />
            </View>
            <Text className="text-xs font-bold text-clinical-slate uppercase tracking-wider">Avg Confidence</Text>
            <Text className="text-2xl font-black text-white mt-1">
              {totalScans > 0 ? `${(avgConfidence * 100).toFixed(1)}%` : 'N/A'}
            </Text>
          </View>

          <View className="w-[48%] bg-clinical-card/80 p-5 rounded-2xl border border-clinical-border">
            <View className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center mb-4">
              <ShieldCheck color="#34d399" size={24} />
            </View>
            <Text className="text-xs font-bold text-clinical-slate uppercase tracking-wider">Primary Finding</Text>
            <Text className="text-base font-black text-white mt-1" numberOfLines={1} ellipsizeMode="tail">
              {topFindingName}
            </Text>
          </View>
        </View>

        {/* Recent History */}
        <View className="mb-8">
          <View className="flex-row items-center justify-between mb-5">
            <View className="flex-row items-center space-x-2">
              <Clock color="#00f2fe" size={20} />
              <Text className="text-xl font-bold font-outfit text-white ml-2">Recent History</Text>
            </View>
            {totalScans > 3 && (
              <TouchableOpacity onPress={() => navigation.navigate('HistoryTab')} className="px-3 py-1">
                <Text className="text-sm font-bold text-clinical-teal">View all</Text>
              </TouchableOpacity>
            )}
          </View>

          {loading ? (
            <ActivityIndicator color="#00f2fe" style={{ marginVertical: 32 }} />
          ) : totalScans === 0 ? (
            <View className="bg-clinical-card/80 p-8 rounded-2xl items-center border border-dashed border-clinical-border">
              <AlertTriangle color="rgba(148, 163, 184, 0.4)" size={40} className="mb-4" />
              <Text className="text-lg font-bold text-white mb-2">No scan history</Text>
              <Text className="text-sm text-clinical-slate text-center leading-relaxed mb-2">
                You haven't run any dermatological analyses yet. Upload an image to screen for potential skin conditions.
              </Text>
            </View>
          ) : (
            <View className="space-y-3">
              {scans.slice(0, 3).map((scan) => {
                const colors = getSeverityColors(scan.severity);
                return (
                  <TouchableOpacity
                    key={scan.id}
                    onPress={() => navigation.navigate('AnalyzeTab', { scanId: scan.id })}
                    className="bg-clinical-card/80 p-4 rounded-xl flex-row items-center justify-between border border-clinical-border mb-3"
                  >
                    <View className="flex-row items-center flex-1 pr-4">
                      <Image
                        source={{ uri: `${api.defaults.baseURL?.replace('/api', '')}${scan.image_url}` }}
                        className="w-12 h-12 rounded-lg border border-clinical-border mr-3"
                      />
                      <View className="flex-1">
                        <Text className="text-sm font-bold text-white" numberOfLines={1}>{scan.prediction}</Text>
                        <Text className="text-xs text-clinical-slate mt-1">{scan.timestamp}</Text>
                      </View>
                    </View>

                    <View className="items-end">
                      <Text className="text-xs font-bold text-white mb-1">{(scan.confidence * 100).toFixed(1)}%</Text>
                      <View className={`px-2 py-1 rounded-full border ${colors.bg} ${colors.border}`}>
                        <Text className={`text-[10px] font-bold uppercase tracking-wide ${colors.text}`}>
                          {scan.severity}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>

        {/* Clinician Guidelines */}
        <View className="bg-clinical-card/80 p-6 rounded-2xl border border-clinical-border mb-8">
          <Text className="text-base font-bold text-white border-b border-clinical-border pb-2 mb-3">
            Clinician Guidelines
          </Text>
          <View className="space-y-3">
            <View className="flex-row space-x-2 mb-3">
              <Text className="text-clinical-teal font-bold mr-2">•</Text>
              <Text className="text-sm text-clinical-slate leading-relaxed flex-1">
                <Text className="font-bold text-white">Clear Lighting:</Text> Position the skin lesion in neutral, bright daylight. Avoid heavy shadows.
              </Text>
            </View>
            <View className="flex-row space-x-2 mb-3">
              <Text className="text-clinical-teal font-bold mr-2">•</Text>
              <Text className="text-sm text-clinical-slate leading-relaxed flex-1">
                <Text className="font-bold text-white">Sharp Focus:</Text> Center the camera and focus directly on the target region.
              </Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
