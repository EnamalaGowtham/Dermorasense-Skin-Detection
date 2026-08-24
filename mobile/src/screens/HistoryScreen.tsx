import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert, TextInput, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api, { API_URL } from '../services/api';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { Buffer } from 'buffer';
import { History, Search, AlertCircle, Calendar, RefreshCw, Eye, Trash2, ArrowLeft, Download } from 'lucide-react-native';
import { logError, showErrorAlert } from '../utils/errorHandler';

export default function HistoryScreen({ navigation }: any) {
  const [scans, setScans] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await api.get('/scans/history');
      setScans(res.data || []);
    } catch (error: any) {
      showErrorAlert('Error', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteScan = async (scanId: number) => {
    Alert.alert(
      "Delete Scan",
      "Are you sure you want to delete this scan from your history? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: async () => {
            try {
              const res = await api.delete(`/scans/${scanId}`);
              if (res.status === 200 || res.status === 204) {
                setScans(prev => prev.filter(s => s.id !== scanId));
              }
            } catch (err: any) {
              showErrorAlert('Delete Failed', err);
            }
          }
        }
      ]
    );
  };

  const getSeverityBadge = (sev: string) => {
    if (sev === 'high') return { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' };
    if (sev === 'moderate') return { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' };
    return { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' };
  };

  const handleDownloadPdf = async (scanId: number) => {
    try {
      setDownloadingId(scanId);
      
      // Request PDF using the authenticated API client
      const response = await api.get(`/scans/${scanId}/report`, {
        responseType: 'arraybuffer',
        timeout: 60000, // 60 seconds timeout for PDF generation
      });
      
      // Verify content type
      const contentType = response.headers['content-type'];
      if (typeof contentType !== 'string' || !contentType.includes('application/pdf')) {
        throw new Error('INVALID_MIME_TYPE');
      }

      // Convert ArrayBuffer to Base64
      const base64data = Buffer.from(response.data, 'binary').toString('base64');
      const fileUri = `${(FileSystem as any).documentDirectory}DermoraSense_Case_Report_${scanId}.pdf`;
      await FileSystem.writeAsStringAsync(fileUri, base64data, {
        encoding: 'base64',
      });

      // Verify file
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (!fileInfo.exists || fileInfo.size === 0) {
        throw new Error("FILE_SAVE_ERROR");
      }

      // Share/Open
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri, {
          mimeType: 'application/pdf',
          dialogTitle: 'Download Case PDF Report'
        });
      } else {
        Alert.alert('Success', 'PDF downloaded successfully.');
      }
    } catch (err: any) {
      logError(err, 'HistoryScreen - handleDownloadPdf');
      if (err.message === 'INVALID_MIME_TYPE') {
        Alert.alert('Download Error', 'The server returned an invalid PDF report.');
      } else if (err.message === 'FILE_SAVE_ERROR') {
        Alert.alert('Save Error', 'The PDF was generated but could not be saved on this device.');
      } else {
        showErrorAlert('Download Error', err);
      }
    } finally {
      setDownloadingId(null);
    }
  };

  const filteredScans = scans.filter((s) => {
    const predStr = s.prediction ? String(s.prediction).toLowerCase() : "";
    const matchesSearch = predStr.includes(searchTerm.toLowerCase());
    
    // Safely check severity against the filter
    const sevStr = s.severity ? String(s.severity).toLowerCase() : "";
    const filterStr = severityFilter.toLowerCase();
    
    const matchesSeverity = filterStr === 'all' || sevStr === filterStr;
    
    return matchesSearch && matchesSeverity;
  });

  const renderScan = ({ item }: { item: any }) => {
    const colors = getSeverityBadge(item.severity);
    
    return (
      <TouchableOpacity 
        className="bg-clinical-card/80 border border-clinical-border p-4 rounded-2xl mb-4 shadow-lg flex-row items-center"
        onPress={() => navigation.navigate('DiseaseDetails', { scanId: item.id, scanData: item })}
      >
        <Image 
          source={{ uri: `${API_URL}${item.image_url}` }} 
          className="w-16 h-16 rounded-xl bg-black/40 mr-4"
        />
        
        <View className="flex-1">
          <Text className="text-white text-base font-bold mb-1">{item.prediction}</Text>
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-clinical-teal font-extrabold text-sm">{(item.confidence * 100).toFixed(1)}% match</Text>
            <View className={`px-2 py-1 rounded-full border ${colors.bg} ${colors.border}`}>
              <Text className={`text-[10px] font-bold uppercase tracking-wide ${colors.text}`}>
                {item.severity}
              </Text>
            </View>
          </View>
          
          <View className="flex-row items-center justify-between mt-3">
            <View className="flex-row items-center">
              <Calendar color="#64748b" size={14} className="mr-2" />
              <Text className="text-clinical-slate text-xs">{item.timestamp}</Text>
            </View>
            
            <View className="flex-row items-center space-x-2">
              <TouchableOpacity onPress={() => handleDownloadPdf(item.id)} className="p-2" disabled={downloadingId === item.id}>
                {downloadingId === item.id ? (
                  <ActivityIndicator color="#00f2fe" size="small" />
                ) : (
                  <Download color="#00f2fe" size={18} />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteScan(item.id)} className="p-2">
                <Trash2 color="#f87171" size={18} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('DiseaseDetails', { scanId: item.id, scanData: item })} className="p-2">
                <Eye color="#00f2fe" size={18} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const FilterButton = ({ label, value }: { label: string, value: string }) => {
    const isActive = severityFilter === value;
    return (
      <TouchableOpacity 
        onPress={() => setSeverityFilter(value)}
        className={`px-5 py-3 rounded-xl border mr-3 ${isActive ? 'bg-clinical-teal/20 border-clinical-teal' : 'bg-clinical-card border-clinical-border'}`}
      >
        <Text className={`text-xs font-bold ${isActive ? 'text-clinical-teal' : 'text-clinical-slate'}`}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-clinical-bg">
      <View className="flex-1 px-4 pt-4">
        
        {/* Header */}
        <View className="flex-row items-center justify-between mb-8 mt-2">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
              <ArrowLeft color="#00f2fe" size={28} />
            </TouchableOpacity>
            <History className="text-clinical-teal w-7 h-7 mr-3" color="#00f2fe" />
            <View>
              <Text className="text-2xl font-bold font-outfit text-white mb-1">Scan Records</Text>
              <Text className="text-sm text-clinical-slate">Browse past diagnostic evaluations</Text>
            </View>
          </View>
          <TouchableOpacity onPress={fetchHistory} className="p-3 bg-white/5 rounded-full border border-white/10">
            <RefreshCw color="#64748b" size={20} />
          </TouchableOpacity>
        </View>

        {/* Search & Filter */}
        <View className="mb-6">
          <View className="flex-row items-center bg-[#090e1c] border border-clinical-border rounded-xl px-4 py-3 mb-4">
            <Search color="#64748b" size={16} className="mr-3" />
            <TextInput 
              placeholder="Search by predicted condition..."
              placeholderTextColor="#64748b"
              className="flex-1 text-white text-base py-1"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>
          
          <View className="flex-row">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <FilterButton label="All" value="all" />
              <FilterButton label="High" value="high" />
              <FilterButton label="Moderate" value="moderate" />
              <FilterButton label="Low" value="low" />
            </ScrollView>
          </View>
        </View>
        
        {/* List */}
        {loading ? (
          <ActivityIndicator size="large" color="#00f2fe" style={{ marginTop: 50 }} />
        ) : (
          <FlatList
            data={filteredScans}
            keyExtractor={(item, index) => item.id?.toString() || index.toString()}
            renderItem={renderScan}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View className="bg-clinical-card/80 p-8 rounded-2xl border border-dashed border-clinical-border items-center justify-center mt-4">
                <AlertCircle color="rgba(148, 163, 184, 0.4)" size={48} className="mb-4" />
                <Text className="text-base font-bold text-white mb-2">No scan records match</Text>
                <Text className="text-xs text-clinical-slate text-center">
                  {scans.length === 0 
                    ? "You haven't run any analyses yet." 
                    : "Try altering your keyword query or severity filter definitions."}
                </Text>
              </View>
            }
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
