import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Stethoscope, AlertTriangle, CheckCircle, Info, MapPin, Sparkles, Download } from 'lucide-react-native';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { Buffer } from 'buffer';
import { logError, showErrorAlert } from '../utils/errorHandler';
import api, { API_URL } from '../services/api';

import DiseaseInfoCard from '../components/DiseaseInfoCard';
import GradCamCard from '../components/GradCamCard';
import DosCard from '../components/DosCard';
import DontsCard from '../components/DontsCard';
import FoodRecommendationCard from '../components/FoodRecommendationCard';
import FoodLimitCard from '../components/FoodLimitCard';
import PredictionGraph from '../components/PredictionGraph';
import DiseaseComparisonGraph from '../components/DiseaseComparisonGraph';
import RelatedDiseaseCard from '../components/RelatedDiseaseCard';

export default function DiseaseDetailsScreen({ route, navigation }: any) {
  const { diseaseName, confidence, imageUrl, scanId, scanData } = route.params || {};
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<any>(scanData || null);
  const [error, setError] = useState<string | null>(null);
  const [showGradCam, setShowGradCam] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    if (!scanData) {
      fetchDiseaseDetails();
    } else {
      // If we have scanData, we still need to fetch full details to get similar cases and diet
      // unless scanData already has disease_details and similar_cases populated.
      if (!scanData.disease_details || !scanData.similar_cases) {
        fetchDiseaseDetails();
      } else {
        setLoading(false);
      }
    }
  }, [diseaseName, scanId]);

  const fetchDiseaseDetails = async () => {
    try {
      setLoading(true);
      if (scanId) {
        // Fetch full historical scan record
        const res = await api.get(`/scans/${scanId}`);
        setDetails(res.data);
      } else if (diseaseName) {
        // Fallback to static disease text lookup
        const res = await api.get(`/scans/disease/${encodeURIComponent(diseaseName)}`);
        setDetails({ disease_details: res.data, prediction: diseaseName });
      }
    } catch (err: any) {
      setError('Unable to load details.');
    } finally {
      setLoading(false);
    }
  };

  const isGenericDisease = !scanId && !details?.id && diseaseName;

  const downloadPdf = async () => {
    const targetId = details?.id || scanId;
    
    if (!targetId && !isGenericDisease) return;

    try {
      setDownloadingPdf(true);
      
      const endpoint = isGenericDisease 
        ? `/scans/disease/${encodeURIComponent(diseaseName)}/report`
        : `/scans/${targetId}/report`;
        
      const response = await api.get(endpoint, {
        responseType: 'arraybuffer',
        timeout: 60000,
      });
      
      const contentType = response.headers['content-type'];
      if (typeof contentType !== 'string' || !contentType.includes('application/pdf')) {
        throw new Error('INVALID_MIME_TYPE');
      }

      const base64data = Buffer.from(response.data, 'binary').toString('base64');
      
      const safeName = diseaseName ? diseaseName.replace(/[^a-zA-Z0-9]/g, '_') : 'Scan';
      const fileName = isGenericDisease 
        ? `DermoraSense_Educational_Report_${safeName}.pdf`
        : `DermoraSense_Case_Report_${targetId}.pdf`;
        
      const fileUri = `${(FileSystem as any).documentDirectory}${fileName}`;
      await FileSystem.writeAsStringAsync(fileUri, base64data, {
        encoding: 'base64',
      });
      
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (!fileInfo.exists || fileInfo.size === 0) {
        throw new Error("FILE_SAVE_ERROR");
      }
      
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri, {
          mimeType: 'application/pdf',
          dialogTitle: 'Download PDF Report'
        });
      } else {
        Alert.alert('Success', 'PDF downloaded successfully.');
      }
    } catch (err: any) {
      logError(err, 'DiseaseDetailsScreen - handleDownloadPdf');
      if (err.message === 'INVALID_MIME_TYPE') {
        Alert.alert('Download Error', 'The server returned an invalid PDF report.');
      } else if (err.message === 'FILE_SAVE_ERROR') {
        Alert.alert('Save Error', 'The PDF was generated but could not be saved on this device.');
      } else {
        showErrorAlert('Download Error', err);
      }
    } finally {
      setDownloadingPdf(false);
    }
  };

  const isNormalSkin = details?.prediction?.toLowerCase().includes("normal");
  const hasFullData = !!details?.id || !!scanId;

  return (
    <SafeAreaView className="flex-1 bg-clinical-bg">
      <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-3">
            <ArrowLeft color="#00f2fe" size={24} />
          </TouchableOpacity>
          <Text className="text-xl font-bold font-outfit text-white">Diagnostic Details</Text>
        </View>

        {loading ? (
          <View className="min-h-[300px] justify-center items-center">
            <ActivityIndicator size="large" color="#00f2fe" />
          </View>
        ) : error ? (
          <View className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
            <Text className="text-red-400 text-center">{error}</Text>
          </View>
        ) : (
          <View className="space-y-6">
            
            {isGenericDisease ? (
              <View className="space-y-6">
                <Text className="text-2xl font-bold text-white mb-2">{details?.prediction || diseaseName}</Text>
                
                {details?.disease_details?.image_url && (
                  <View className="w-full aspect-video rounded-2xl overflow-hidden border border-clinical-border bg-clinical-card mb-4 relative items-center justify-center">
                     {!imageError ? (
                       <>
                         <Image 
                            source={{ uri: details.disease_details.image_url.startsWith('http') ? encodeURI(details.disease_details.image_url) : encodeURI(`${API_URL}${details.disease_details.image_url}`) }} 
                            className="w-full h-full"
                            resizeMode="cover"
                            onLoadStart={() => setImageLoading(true)}
                            onLoadEnd={() => setImageLoading(false)}
                            onError={() => {
                              setImageError(true);
                              setImageLoading(false);
                            }}
                         />
                         {imageLoading && (
                           <View className="absolute inset-0 bg-clinical-card items-center justify-center">
                             <ActivityIndicator size="large" color="#00f2fe" />
                           </View>
                         )}
                       </>
                     ) : (
                       <View className="absolute inset-0 bg-clinical-bg items-center justify-center p-4">
                         <AlertTriangle color="#64748b" size={32} className="mb-2" />
                         <Text className="text-clinical-slate font-medium text-center">Image unavailable</Text>
                       </View>
                     )}
                  </View>
                )}

                {details?.disease_details?.description && (
                  <View className="bg-clinical-card border border-clinical-border rounded-2xl p-5 mb-4">
                    <Text className="text-lg font-bold text-white mb-2">What is it?</Text>
                    <Text className="text-clinical-slate leading-relaxed">{details.disease_details.description}</Text>
                  </View>
                )}

                {details?.disease_details?.affectedAreas && (
                  <View className="bg-clinical-card border border-clinical-border rounded-2xl p-5 mb-4">
                    <Text className="text-lg font-bold text-white mb-2">Where can it affect the body?</Text>
                    <View className="flex-row items-start">
                      <MapPin color="#00f2fe" size={18} className="mt-0.5 mr-2" />
                      <Text className="text-clinical-slate flex-1 leading-relaxed text-base">{details.disease_details.affectedAreas}</Text>
                    </View>
                  </View>
                )}

                {details?.disease_details?.symptoms && details.disease_details.symptoms.length > 0 && (
                  <View className="bg-clinical-card border border-clinical-border rounded-2xl p-5 mb-4">
                    <Text className="text-lg font-bold text-white mb-3">Common Symptoms</Text>
                    {details.disease_details.symptoms.map((symptom: string, index: number) => (
                      <View key={`sym-${index}`} className="flex-row items-start mb-2">
                        <View className="w-1.5 h-1.5 rounded-full bg-clinical-teal mt-2 mr-3" />
                        <Text className="text-clinical-slate flex-1 leading-relaxed">{symptom}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {((details?.disease_details?.first_aid && details.disease_details.first_aid.length > 0) || 
                  (details?.disease_details?.do && details.disease_details.do.length > 0)) && (
                  <View className="bg-clinical-card border border-clinical-border rounded-2xl p-5 mb-4">
                    <Text className="text-lg font-bold text-white mb-3">Basic Skin Care</Text>
                    {details?.disease_details?.first_aid?.map((item: string, index: number) => (
                      <View key={`fa-${index}`} className="flex-row items-start mb-2">
                        <CheckCircle color="#10b981" size={16} className="mt-0.5 mr-3" />
                        <Text className="text-clinical-slate flex-1 leading-relaxed">{item}</Text>
                      </View>
                    ))}
                    {details?.disease_details?.do?.map((item: string, index: number) => (
                      <View key={`do-${index}`} className="flex-row items-start mb-2">
                        <CheckCircle color="#10b981" size={16} className="mt-0.5 mr-3" />
                        <Text className="text-clinical-slate flex-1 leading-relaxed">{item}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {details?.disease_details?.see_doctor && (
                  <View className="bg-clinical-card border border-clinical-border rounded-2xl p-5 mb-4">
                    <View className="flex-row items-center mb-2">
                      <Stethoscope color="#00f2fe" size={20} className="mr-2" />
                      <Text className="text-lg font-bold text-white">When to See a Doctor</Text>
                    </View>
                    <Text className="text-clinical-slate leading-relaxed">{details.disease_details.see_doctor}</Text>
                  </View>
                )}
                <View className="bg-blue-500/10 border border-blue-500/30 p-5 rounded-2xl mb-4">
                  <View className="flex-row items-center mb-2">
                    <Info color="#60a5fa" size={20} className="mr-2" />
                    <Text className="text-sm font-bold text-blue-400 uppercase tracking-wider">Important Note</Text>
                  </View>
                  <Text className="text-sm text-clinical-slate leading-relaxed">
                    This information is for educational purposes only and does not replace professional medical advice or diagnosis. Always consult a healthcare provider for medical concerns.
                  </Text>
                </View>
                
              </View>
            ) : (
              <>
                {hasFullData && details?.gradcam_url ? (
                  <GradCamCard 
                    originalImageUri={`${API_URL}${details.image_url}`}
                    gradCamImageUri={`${API_URL}${details.gradcam_url}`}
                    caseId={details.id}
                    showGradCam={showGradCam}
                    onToggleGradCam={() => setShowGradCam(!showGradCam)}
                  />
                ) : imageUrl ? (
                  <View className="relative w-full aspect-video rounded-xl overflow-hidden border border-clinical-border mb-4">
                    <Image source={{ uri: imageUrl.startsWith('http') ? imageUrl : `${API_URL}${imageUrl}` }} className="w-full h-full object-cover" />
                  </View>
                ) : null}

                <DiseaseInfoCard 
                  prediction={details?.prediction}
                  confidence={details?.confidence}
                  severity={details?.severity}
                  description={details?.disease_details?.description}
                  isNormalSkin={isNormalSkin}
                />

                {!isNormalSkin && (
                  <>
                    {details?.severity === 'high' && (
                      <View className="bg-red-500/10 border border-red-500/30 p-5 rounded-2xl mb-4">
                        <View className="flex-row items-center mb-2">
                          <AlertTriangle color="#ef4444" size={20} className="mr-2" />
                          <Text className="text-sm font-bold text-red-400 uppercase tracking-wider">Medical Attention Recommended</Text>
                        </View>
                        <Text className="text-sm text-clinical-slate leading-relaxed mb-4">
                          This result may require professional evaluation. Please consult a qualified dermatologist.
                        </Text>
                      </View>
                    )}

                    {hasFullData && details?.alternates && (
                      <PredictionGraph 
                        prediction={details.prediction}
                        confidence={details.confidence}
                        alternates={details.alternates}
                      />
                    )}

                    {hasFullData && details?.similar_cases && (
                      <DiseaseComparisonGraph 
                        prediction={details.prediction}
                        confidence={details.confidence}
                        similarCases={details.similar_cases}
                      />
                    )}

                    {hasFullData && details?.similar_cases && (
                      <RelatedDiseaseCard 
                        similarCases={details.similar_cases}
                        apiUrl={API_URL}
                        onPressItem={(name, conf, url) => navigation.navigate('DiseaseDetails', { 
                          diseaseName: name, confidence: conf, imageUrl: url 
                        })}
                      />
                    )}

                    {details?.disease_details && (
                      <View className="mb-6">
                        <View className="flex-row items-center mb-4 mt-2">
                          <Sparkles color="#00f2fe" size={18} className="mr-2" />
                          <Text className="text-lg font-bold text-white">General Care Do's & Don'ts</Text>
                        </View>
                        {details.disease_details.do?.length > 0 && <DosCard items={details.disease_details.do} />}
                        {details.disease_details.dont?.length > 0 && <DontsCard items={details.disease_details.dont} />}
                      </View>
                    )}

                    {details?.disease_details && (
                      <View className="mb-6">
                        <View className="flex-row items-center mb-4">
                          <Sparkles color="#00f2fe" size={18} className="mr-2" />
                          <Text className="text-lg font-bold text-white">Nutritional Guidelines</Text>
                        </View>
                        {details.disease_details.diet_eat?.length > 0 && <FoodRecommendationCard items={details.disease_details.diet_eat} />}
                        {details.disease_details.diet_avoid?.length > 0 && <FoodLimitCard items={details.disease_details.diet_avoid} />}
                      </View>
                    )}
                  </>
                )}
              </>
            )}

            <TouchableOpacity
              className="flex-row items-center justify-center py-4 bg-clinical-card border border-clinical-border rounded-2xl mt-2 mb-4 opacity-90"
              onPress={downloadPdf}
              disabled={downloadingPdf}
            >
              {downloadingPdf ? (
                <ActivityIndicator color="#00f2fe" size="small" style={{ marginRight: 8 }} />
              ) : (
                <Download color="#00f2fe" size={18} style={{ marginRight: 8 }} />
              )}
              <Text className="text-white font-bold text-sm">
                {downloadingPdf ? "Generating PDF..." : "Download Case PDF Report"}
              </Text>
            </TouchableOpacity>

            {!isGenericDisease && (
              <TouchableOpacity
                className="flex-row items-center justify-center py-4 bg-clinical-teal/10 border border-clinical-teal/30 rounded-2xl mb-8"
                onPress={() => navigation.navigate('NearbyDermatology')}
              >
                <MapPin color="#00f2fe" size={18} style={{ marginRight: 8 }} />
                <Text className="text-clinical-teal font-bold text-sm">Find Nearby Dermatologists</Text>
              </TouchableOpacity>
            )}
            
            {isGenericDisease && <View className="h-4" />}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
