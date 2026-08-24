import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, ScrollView, Animated, Easing } from 'react-native';
const RNImage = require('react-native').Image;
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { Buffer } from 'buffer';
import api, { API_URL } from '../services/api';
import ErrorBoundary from '../components/ErrorBoundary';
import { logError, showErrorAlert } from '../utils/errorHandler';
import { Upload, Camera, Activity, Sparkles, AlertTriangle, MapPin, Download, CheckCircle2, ShieldCheck, ArrowRight, Image as ImageIcon } from 'lucide-react-native';


import ResultHeader from '../components/ResultHeader';
import DiseaseInfoCard from '../components/DiseaseInfoCard';
import GradCamCard from '../components/GradCamCard';
import DosCard from '../components/DosCard';
import DontsCard from '../components/DontsCard';
import FoodRecommendationCard from '../components/FoodRecommendationCard';
import FoodLimitCard from '../components/FoodLimitCard';
import PredictionGraph from '../components/PredictionGraph';
import DiseaseComparisonGraph from '../components/DiseaseComparisonGraph';
import RelatedDiseaseCard from '../components/RelatedDiseaseCard';

export default function AnalyzeScreen({ navigation, route }: any) {
  const existingScan = route?.params?.scanId ? route.params.scanData : null;
  
  const [image, setImage] = useState<string | null>(existingScan ? `${API_URL}${existingScan.image_url}` : null);

  const [loading, setLoading] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [result, setResult] = useState<any>(existingScan || null);
  const [showGradCam, setShowGradCam] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);



  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.15, duration: 800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 800, easing: Easing.inOut(Easing.ease), useNativeDriver: true })
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [loading]);

  const downloadPdf = async () => {
    if (!result?.id) return;
    try {
      setDownloadingPdf(true);
      
      const response = await api.get(`/scans/${result.id}/report`, {
        responseType: 'arraybuffer',
        timeout: 60000, 
      });
      
      const contentType = response.headers['content-type'];
      if (typeof contentType !== 'string' || !contentType.includes('application/pdf')) {
        throw new Error('INVALID_MIME_TYPE');
      }

      const base64data = Buffer.from(response.data, 'binary').toString('base64');
      const fileUri = `${(FileSystem as any).documentDirectory}DermoraSense_Case_Report_${result.id}.pdf`;
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
          dialogTitle: 'Download Case PDF Report'
        });
      } else {
        Alert.alert('Success', 'PDF downloaded successfully.');
      }
    } catch (err: any) {
      logError(err, 'AnalyzeScreen - downloadPdf');
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

  const takePhoto = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert("Permission Required", "Camera permission is required to take a skin photo.");
        return;
      }

      const pickerResult = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false, // Disabled to prevent Android crop activity bugs and URI loss
        quality: 0.8,
      });

      if (!pickerResult.canceled) {
        const asset = pickerResult.assets?.[0];
        const capturedUri = asset?.uri || (pickerResult as any).uri;
        
        if (capturedUri) {
          // Basic Client-Side Validation
          if (asset && asset.width && asset.height) {
            if (asset.width < 100 || asset.height < 100) {
              setImage(capturedUri);
              setImageError("Image resolution is too low. Please upload or capture a higher-quality image.");
              setResult(null);
              return;
            }
          }
          
          try {
            // The camera stores images in a temporary cache that can become inaccessible.
            // Copy it to the persistent document directory.
            const filename = `scan_${Date.now()}.jpg`;
            const permanentUri = `${(FileSystem as any).documentDirectory}${filename}`;
            
            await (FileSystem as any).copyAsync({
              from: capturedUri,
              to: permanentUri
            });
            
            setImage(permanentUri);
            setImageError(null);
            setResult(null); 
          } catch (fsError) {
            logError(fsError, 'AnalyzeScreen - takePhoto copyAsync');
            // Fallback to original URI if copy fails
            setImage(capturedUri);
            setImageError(null);
            setResult(null);
          }
        } else {
          Alert.alert("Camera Error", "Unable to load the captured photo. Please retake the photo.");
        }
      }
    } catch (error) {
      logError(error, 'AnalyzeScreen - takePhoto');
      Alert.alert("Camera Error", "Unable to load the captured photo. Please retake the photo.");
    }
  };

  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert("Permission Required", "Gallery permission is required to select a photo.");
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false, // Disabled for consistency and avoiding crop bugs
        quality: 0.8,
      });

      if (!pickerResult.canceled) {
        const asset = pickerResult.assets?.[0];
        const selectedUri = asset?.uri || (pickerResult as any).uri;
        
        if (selectedUri) {
          // Basic Client-Side Validation
          if (asset && asset.width && asset.height) {
            if (asset.width < 100 || asset.height < 100) {
              setImage(selectedUri);
              setImageError("Image resolution is too low. Please upload or capture a higher-quality image.");
              setResult(null);
              return;
            }
          }

          try {
            // Copy gallery image to document directory to ensure stable access for analysis
            const filename = `gallery_${Date.now()}.jpg`;
            const permanentUri = `${(FileSystem as any).documentDirectory}${filename}`;
            
            await (FileSystem as any).copyAsync({
              from: selectedUri,
              to: permanentUri
            });
            
            setImage(permanentUri);
            setImageError(null);
            setResult(null); 
          } catch (fsError) {
            logError(fsError, 'AnalyzeScreen - pickImage copyAsync');
            setImage(selectedUri);
            setImageError(null);
            setResult(null);
          }
        } else {
          Alert.alert("Gallery Error", "Unable to load the selected photo.");
        }
      }
    } catch (error) {
      logError(error, 'AnalyzeScreen - pickImage');
      Alert.alert("Gallery Error", "Unable to load the selected photo.");
    }
  };

  const analyzeImage = async () => {
    if (!image) return;
    try {
      setLoading(true);
      setProgressStep(1);
      
      const formData = new FormData();
      formData.append('image', {
        uri: image,
        name: 'scan.jpg',
        type: 'image/jpeg',
      } as any);

      setTimeout(() => setProgressStep(2), 800);
      setTimeout(() => setProgressStep(3), 1600);

      const res = await api.post('/scans/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(res.data);
    } catch (error: any) {
      if (error.response?.data?.detail && error.response.data.detail.toLowerCase().includes('insufficient')) {
        setImageError("The image quality is insufficient for analysis. Please try a clearer photo.");
      } else if (error.response?.data?.detail && error.response.data.detail.toLowerCase().includes('unable to read')) {
        setImageError("We couldn't read this image format. Please try a different photo.");
      } else {
        showErrorAlert('Analysis Failed', error);
      }
    } finally {
      setLoading(false);
      setProgressStep(0);
    }
  };

  const handleReset = () => {
    setImage(null);
    setResult(null);
    setImageError(null);
    setShowGradCam(false);
  };

  const isNormalSkin = result?.prediction?.toLowerCase().includes("normal");

  return (
    <SafeAreaView className="flex-1 bg-clinical-bg">
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        
        <ResultHeader onBack={() => navigation.goBack()} />

        {!result && !loading ? (
          image ? (
            // PREVIEW STATE
            <ErrorBoundary fallbackName="PreviewState">
              <View className="mb-8 mt-4">
                {/* 1. Image Preview Section */}
                <View className="bg-clinical-card border border-clinical-border rounded-[32px] p-5 shadow-xl mb-6">
                  <Text className="text-sm font-bold font-outfit text-clinical-slate text-center mb-4 tracking-widest uppercase">Selected Photo</Text>
                  <View className="w-full aspect-[4/3] rounded-[24px] overflow-hidden border border-clinical-border bg-[#050B14]">
                    <RNImage source={{ uri: image }} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                  </View>
                </View>

                {/* 2. Validation Message Section */}
                {imageError ? (
                  <View className="bg-red-500/10 border border-red-500/30 rounded-2xl p-5 mb-8 flex-row items-start">
                    <AlertTriangle color="#ef4444" size={24} className="mr-4 mt-0.5" />
                    <View className="flex-1">
                      <Text className="text-base font-bold text-red-400 mb-1">Image Needs Improvement</Text>
                      <Text className="text-sm text-red-400/80 leading-relaxed">
                        {imageError}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 mb-8 flex-row items-center justify-center">
                    <CheckCircle2 color="#34d399" size={20} className="mr-3" />
                    <Text className="text-emerald-400 font-bold text-sm">Image quality looks good</Text>
                  </View>
                )}

                {/* 3. Actions Section */}
                <View className="mb-4">
                  {imageError ? (
                     <View className="flex-row justify-between">
                       <TouchableOpacity 
                         className="w-[48%] bg-clinical-card border border-clinical-border py-4 rounded-2xl items-center justify-center" 
                         onPress={takePhoto}
                         activeOpacity={0.7}
                       >
                         <Text className="text-white font-bold text-base">Retake Photo</Text>
                       </TouchableOpacity>
                       <TouchableOpacity 
                         className="w-[48%] bg-clinical-card border border-clinical-border py-4 rounded-2xl items-center justify-center" 
                         onPress={pickImage}
                         activeOpacity={0.7}
                       >
                         <Text className="text-white font-bold text-base">Choose Gallery</Text>
                       </TouchableOpacity>
                     </View>
                  ) : (
                    <View className="flex-col">
                      <TouchableOpacity 
                        className={`w-full py-4 rounded-2xl flex-row items-center justify-center shadow-lg mb-6 ${loading ? 'bg-clinical-teal/50' : 'bg-clinical-teal shadow-clinical-teal/20'}`} 
                        onPress={analyzeImage}
                        activeOpacity={0.8}
                        disabled={loading}
                      >
                        {loading ? (
                          <ActivityIndicator color="#050B14" size="small" />
                        ) : (
                          <>
                            <Text className="text-[#050B14] font-bold text-lg mr-2">Analyze Skin</Text>
                            <ArrowRight color="#050B14" size={20} strokeWidth={2.5} />
                          </>
                        )}
                      </TouchableOpacity>
                      
                      <View className="flex-row justify-between">
                        <TouchableOpacity 
                          className="w-[48%] bg-clinical-card border border-clinical-border py-3.5 rounded-2xl items-center justify-center" 
                          onPress={takePhoto}
                          activeOpacity={0.7}
                          disabled={loading}
                        >
                          <Text className="text-white font-bold text-sm">Retake Photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                          className="w-[48%] bg-clinical-card border border-clinical-border py-3.5 rounded-2xl items-center justify-center" 
                          onPress={pickImage}
                          activeOpacity={0.7}
                          disabled={loading}
                        >
                          <Text className="text-white font-bold text-sm">Choose Gallery</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </ErrorBoundary>
          ) : (
            // INITIAL STATE
            <View className="py-2">
              <View className="items-center mb-8">
                <Text className="text-[28px] font-bold font-outfit text-white mb-3 text-center tracking-tight">Analyze Your Skin</Text>
                <Text className="text-base text-clinical-slate text-center leading-relaxed px-2">
                  Take a clear photo or select one from your gallery to analyze your skin.
                </Text>
              </View>

              <View className="flex-row justify-between mb-10">
                {/* Take a Photo Card */}
                <TouchableOpacity 
                  className="w-[48%] bg-clinical-card border border-clinical-border rounded-[28px] p-5 shadow-lg items-center"
                  onPress={takePhoto}
                  activeOpacity={0.7}
                  accessibilityLabel="Take a photo of your skin"
                >
                  <View className="w-16 h-16 rounded-[20px] bg-clinical-teal/10 items-center justify-center mb-4 border border-clinical-teal/20">
                    <Camera color="#00f2fe" size={28} strokeWidth={2} />
                  </View>
                  <Text className="text-[17px] font-bold text-white mb-2 font-outfit text-center tracking-tight">Take a Photo</Text>
                  <Text className="text-xs text-clinical-slate text-center leading-relaxed">
                    Use your camera to capture an image
                  </Text>
                </TouchableOpacity>

                {/* Choose from Gallery Card */}
                <TouchableOpacity 
                  className="w-[48%] bg-clinical-card border border-clinical-border rounded-[28px] p-5 shadow-lg items-center"
                  onPress={pickImage}
                  activeOpacity={0.7}
                  accessibilityLabel="Choose a skin photo from your gallery"
                >
                  <View className="w-16 h-16 rounded-[20px] bg-clinical-blue/10 items-center justify-center mb-4 border border-clinical-blue/20">
                    <ImageIcon color="#6366f1" size={28} strokeWidth={2} />
                  </View>
                  <Text className="text-[17px] font-bold text-white mb-2 font-outfit text-center tracking-tight">Choose Photo</Text>
                  <Text className="text-xs text-clinical-slate text-center leading-relaxed">
                    Select an image from gallery
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Photo Guidance */}
              <View className="px-2 mb-8 bg-clinical-card border border-clinical-border rounded-[24px] p-5">
                 <Text className="text-lg font-bold font-outfit text-white mb-4">For better results:</Text>
                 <View className="space-y-3 pl-2">
                   <View className="flex-row items-center">
                     <Text className="text-clinical-teal font-bold mr-3">✓</Text>
                     <Text className="text-sm text-clinical-slate font-medium">Use good, even lighting</Text>
                   </View>
                   <View className="flex-row items-center">
                     <Text className="text-clinical-teal font-bold mr-3">✓</Text>
                     <Text className="text-sm text-clinical-slate font-medium">Keep the camera steady</Text>
                   </View>
                   <View className="flex-row items-center">
                     <Text className="text-clinical-teal font-bold mr-3">✓</Text>
                     <Text className="text-sm text-clinical-slate font-medium">Keep the affected area in focus</Text>
                   </View>
                   <View className="flex-row items-center">
                     <Text className="text-clinical-teal font-bold mr-3">✓</Text>
                     <Text className="text-sm text-clinical-slate font-medium">Avoid strong shadows</Text>
                   </View>
                   <View className="flex-row items-center">
                     <Text className="text-clinical-teal font-bold mr-3">✓</Text>
                     <Text className="text-sm text-clinical-slate font-medium">Avoid excessive flash</Text>
                   </View>
                   <View className="flex-row items-center">
                     <Text className="text-clinical-teal font-bold mr-3">✓</Text>
                     <Text className="text-sm text-clinical-slate font-medium">Make sure the skin area is clearly visible</Text>
                   </View>
                   <View className="flex-row items-center">
                     <Text className="text-clinical-teal font-bold mr-3">✓</Text>
                     <Text className="text-sm text-clinical-slate font-medium">Avoid filters</Text>
                   </View>
                 </View>
              </View>

              {/* Privacy Footer */}
              <View className="flex-row items-center justify-center space-x-2 px-6 pt-4 border-t border-clinical-border/50">
                <ShieldCheck color="#64748b" size={16} />
                <Text className="text-xs text-clinical-slate text-center">
                  Your image is analyzed securely and privately.
                </Text>
              </View>
            </View>
          )
        ) : loading ? (
          // LOADING STATE
          <View className="items-center justify-center min-h-[500px]">
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }} className="w-28 h-28 bg-clinical-teal/10 border-2 border-clinical-teal/30 rounded-full items-center justify-center mb-10 shadow-lg shadow-clinical-teal/20">
              <Activity color="#00f2fe" size={48} strokeWidth={1.5} />
            </Animated.View>
            <Text className="text-2xl font-bold font-outfit text-white mb-3 tracking-tight">Analyzing Your Skin</Text>
            <Text className="text-base text-clinical-slate mb-10">Your image is being processed by the AI model.</Text>
            
            <View className="items-center space-y-4 bg-clinical-card/50 p-6 rounded-3xl border border-clinical-border w-full max-w-[280px]">
              <Text className={`text-sm font-bold tracking-wide transition-colors duration-300 ${progressStep >= 1 ? 'text-clinical-teal' : 'text-clinical-slate'}`}>
                Processing image
              </Text>
              <Text className={`text-sm font-bold tracking-wide transition-colors duration-300 ${progressStep >= 2 ? 'text-clinical-teal' : 'text-clinical-slate/40'}`}>
                Analyzing
              </Text>
              <Text className={`text-sm font-bold tracking-wide transition-colors duration-300 ${progressStep >= 3 ? 'text-clinical-teal' : 'text-clinical-slate/20'}`}>
                Preparing result
              </Text>
            </View>
          </View>
        ) : (
          // RESULT STATE
          <View className="pt-2">
            <View className="items-center mb-8 pb-4 border-b border-clinical-border">
              <Text className="text-[22px] font-bold font-outfit text-white">Analysis Result</Text>
            </View>

            <View className="w-full aspect-[4/3] rounded-[24px] overflow-hidden border border-clinical-border shadow-lg mb-8 bg-black">
                <RNImage source={{ uri: image || `${API_URL}${result.image_url}` }} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
            </View>
            
            <View className="mb-8">
              <DiseaseInfoCard 
                prediction={result.prediction}
                confidence={result.confidence}
                severity={result.severity}
                description={result.disease_details?.description}
                isNormalSkin={isNormalSkin}
              />
            </View>

            <View className="mb-8">
              <GradCamCard 
                originalImageUri={image || `${API_URL}${result.image_url}`}
                gradCamImageUri={`${API_URL}${result.gradcam_url}`}
                caseId={result.id}
                showGradCam={showGradCam}
                onToggleGradCam={() => setShowGradCam(!showGradCam)}
              />
            </View>

            {!isNormalSkin && result.disease_details && (
              <View className="mb-8">
                <Text className="text-xl font-bold font-outfit text-white mb-6">What You Can Do</Text>
                <DosCard items={result.disease_details.do} />
                <View className="h-4"></View>
                <DontsCard items={result.disease_details.dont} />
              </View>
            )}

            {!isNormalSkin && (
              <View className="mb-10">
                <RelatedDiseaseCard 
                  similarCases={result.similar_cases}
                  apiUrl={API_URL}
                  onPressItem={(name, conf, url) => navigation.navigate('DiseaseDetails', { 
                    diseaseName: name, confidence: conf, imageUrl: url 
                  })}
                />
              </View>
            )}

            <View className="bg-[#111827] border border-clinical-border rounded-[20px] p-5 mb-10 flex-row items-start shadow-sm">
              <AlertTriangle color="#64748b" size={24} className="mr-4 mt-1" />
              <View className="flex-1">
                <Text className="text-sm font-bold text-white mb-2 uppercase tracking-wider">Important</Text>
                <Text className="text-sm text-clinical-slate leading-relaxed">
                  This AI result is for informational/screening purposes and does not replace professional medical evaluation.
                </Text>
              </View>
            </View>

            <View className="mb-8 mt-6">
              <TouchableOpacity
                className="w-full flex-row items-center justify-center h-[56px] bg-clinical-teal/10 border border-clinical-teal/30 rounded-2xl mb-6"
                onPress={downloadPdf}
                disabled={downloadingPdf}
              >
                {downloadingPdf ? (
                  <ActivityIndicator color="#00f2fe" size="small" style={{ marginRight: 8 }} />
                ) : (
                  <Download color="#00f2fe" size={20} style={{ marginRight: 8 }} />
                )}
                <Text className="text-clinical-teal font-bold text-base">
                  {downloadingPdf ? "Generating PDF..." : "Download Case PDF Report"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="w-full flex-row items-center justify-center h-[56px] bg-clinical-card border border-clinical-border rounded-2xl shadow-sm"
                onPress={handleReset}
              >
                <Camera color="#00f2fe" size={20} className="mr-3" />
                <Text className="text-white font-bold text-base">Analyze Another Photo</Text>
              </TouchableOpacity>
            </View>

          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
