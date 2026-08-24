import React, { useState, useEffect, useRef, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Linking, Dimensions, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, MapPin, AlertTriangle, RefreshCw, Crosshair } from 'lucide-react-native';

import { useUserLocation } from '../hooks/useUserLocation';
import { nearbyService, NearbyHospital } from '../services/nearbyService';

import LocationCard from '../components/LocationCard';
import HospitalCard from '../components/HospitalCard';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';

const { width } = Dimensions.get('window');

const RADIUS_OPTIONS = [10, 25, 50, 100, 250, 500]; // in km

// Haversine formula
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);  // deg2rad below
  const dLon = (lon2 - lon1) * (Math.PI / 180); 
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return d;
}

export default function NearbyDermatologyScreen({ navigation }: any) {
  const { location, loading: locationLoading, error: locationError, permissionStatus, gpsDisabled, refreshLocation, openSettings } = useUserLocation();
  const [hospitals, setHospitals] = useState<NearbyHospital[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [searchRadius, setSearchRadius] = useState<number>(0);
  const [apiRadiusKm, setApiRadiusKm] = useState<number>(0);
  const [isCached, setIsCached] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  
  const [selectedHospitalId, setSelectedHospitalId] = useState<string | null>(null);
  const mapRef = useRef<MapView>(null);

  const fetchNearby = async () => {
    if (loading || !location) return;
    
    setLoading(true);
    setApiError(null);
    setLoadingMsg('Finding nearby dermatology hospitals...');

    // We no longer pass radiusMeters to allow progressive fallback in the backend, matching the web app
    const nearbyRes = await nearbyService.findNearbyDermatology(location.latitude, location.longitude, 10);
    
    if (nearbyRes.error) {
      setApiError(nearbyRes.error);
      setLoading(false);
      return;
    }

    if (nearbyRes.data) {
      setIsCached(nearbyRes.isCached || false);
      if (nearbyRes.data.facilities && nearbyRes.data.facilities.length > 0) {
        setHospitals(nearbyRes.data.facilities);
        setApiRadiusKm(nearbyRes.data.search_radius_km || searchRadius);
        setSelectedHospitalId(nearbyRes.data.facilities[0].id);
      } else {
        setHospitals([]);
        setApiRadiusKm(searchRadius);
      }
    }
    
    setLoading(false);
  };

  // Run search when location changes or radius changes
  useEffect(() => {
    if (location && !locationLoading) {
      fetchNearby();
    }
  }, [location?.latitude, location?.longitude, searchRadius]);

  const handleHospitalSelect = (hospitalId: string, lat: number, lng: number) => {
    setSelectedHospitalId(hospitalId);
    mapRef.current?.animateToRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    }, 1000);
  };

  const centerOnUser = () => {
    if (location) {
      mapRef.current?.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }, 1000);
    }
  };

  const centerOnInitialLoad = () => {
     if (location && hospitals.length > 0) {
        // Find bounds or just center on user
        centerOnUser();
     }
  };
  
  // Recalculate distances based on the LIVE GPS location
  const displayHospitals = useMemo(() => {
    if (!location || hospitals.length === 0) return [];
    
    const calculated = hospitals.map(h => {
      const distanceKm = getDistanceFromLatLonInKm(location.latitude, location.longitude, h.latitude, h.longitude);
      return {
        ...h,
        distance: distanceKm * 1000 // Convert back to meters for consistent rendering in UI
      };
    });
    
    // Sort nearest first
    calculated.sort((a, b) => a.distance - b.distance);
    return calculated;
  }, [hospitals, location]);

  const isLoading = locationLoading || loading;
  const errorMsg = locationError || apiError;

  return (
    <SafeAreaView className="flex-1 bg-[#0a0f1d]">
      <View className="flex-row items-center px-4 py-4 border-b border-clinical-border">
        <TouchableOpacity 
          className="w-10 h-10 rounded-full bg-clinical-card border border-clinical-border items-center justify-center mr-4"
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft color="#00f2fe" size={24} />
        </TouchableOpacity>
        <View>
          <Text className="text-white font-bold text-lg">Nearby Dermatology</Text>
          <Text className="text-clinical-slate text-xs">Locate certified professionals</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
        
        {/* Radius Selector Removed for Web Parity */}

        {isLoading ? (
          <View className="flex-1 min-h-[400px] items-center justify-center p-8 border border-clinical-border border-dashed rounded-3xl bg-[#090e1c]/50">
            <ActivityIndicator size="large" color="#00f2fe" className="mb-6" />
            <Text className="text-white font-bold text-lg text-center mb-2">{locationLoading ? 'Detecting your location...' : loadingMsg}</Text>
            <Text className="text-clinical-slate text-center text-sm">Please wait while we securely process your geographical data.</Text>
          </View>
        ) : errorMsg ? (
          <View className="flex-1 min-h-[400px] items-center justify-center p-8 border border-red-500/20 border-dashed rounded-3xl bg-red-500/5">
            <AlertTriangle color="#ef4444" size={48} className="mb-4" />
            <Text className="text-white font-bold text-lg text-center mb-4">{errorMsg}</Text>
            
            {permissionStatus !== 'granted' && !locationLoading && (
              <TouchableOpacity 
                onPress={openSettings}
                className="bg-clinical-teal px-6 py-3 rounded-xl mb-4"
              >
                <Text className="text-[#0a0f1d] font-bold">Open Settings</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity 
              onPress={() => {
                if (locationError) refreshLocation();
                else fetchNearby();
              }}
              className="bg-clinical-card border border-clinical-border px-6 py-3 rounded-xl flex-row items-center"
            >
              <RefreshCw color="#00f2fe" size={16} className="mr-2" />
              <Text className="text-clinical-teal font-bold">Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {location && <LocationCard latitude={location.latitude} longitude={location.longitude} radiusKm={apiRadiusKm} />}

            {isCached && (
              <View className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl mb-4 flex-row items-center">
                <AlertTriangle color="#f59e0b" size={16} className="mr-2" />
                <Text className="text-amber-400 text-xs font-bold flex-1">
                  No Internet connection. Showing cached hospitals.
                </Text>
              </View>
            )}

            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-white font-bold text-lg">
                {displayHospitals.length === 0 ? 'No Results' : `Found ${displayHospitals.length} dermatology facilities within ${apiRadiusKm} km`}
              </Text>
              
              <TouchableOpacity onPress={() => refreshLocation()} className="p-2 flex-row items-center">
                <RefreshCw color="#00f2fe" size={14} className="mr-1" />
                <Text className="text-clinical-teal text-xs font-bold">Refresh GPS</Text>
              </TouchableOpacity>
            </View>

            {displayHospitals.length === 0 ? (
              <View className="p-8 border border-clinical-border border-dashed rounded-3xl bg-[#090e1c]/50 items-center">
                <MapPin color="#64748b" size={48} className="mb-4 opacity-50" />
                <Text className="text-clinical-slate text-center mb-6">
                  No healthcare facilities were found within {apiRadiusKm} KM of your current location.
                </Text>
                <TouchableOpacity 
                  onPress={fetchNearby}
                  className="bg-clinical-teal/10 border border-clinical-teal/30 px-6 py-3 rounded-xl flex-row items-center"
                >
                  <RefreshCw color="#00f2fe" size={16} className="mr-2" />
                  <Text className="text-clinical-teal font-bold">Search Again</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <View className="h-64 rounded-2xl overflow-hidden mb-6 border border-clinical-border relative">
                  <MapView
                    ref={mapRef}
                    provider={PROVIDER_DEFAULT}
                    style={{ flex: 1 }}
                    initialRegion={{
                      latitude: location?.latitude || 0,
                      longitude: location?.longitude || 0,
                      latitudeDelta: 0.1,
                      longitudeDelta: 0.1,
                    }}
                    showsUserLocation={true}
                    showsMyLocationButton={false}
                    onMapReady={centerOnInitialLoad}
                  >
                    {displayHospitals.map(h => (
                       <Marker
                          key={h.id}
                          coordinate={{ latitude: h.latitude, longitude: h.longitude }}
                          title={h.name}
                          description={h.speciality}
                          pinColor={h.id === selectedHospitalId ? '#00f2fe' : '#ef4444'}
                          onPress={() => handleHospitalSelect(h.id, h.latitude, h.longitude)}
                       />
                    ))}
                  </MapView>
                  
                  {/* Current Location Button overlay */}
                  <TouchableOpacity 
                    className="absolute top-2 right-2 bg-[#090e1c] border border-clinical-border p-2 rounded-full shadow-lg"
                    onPress={centerOnUser}
                  >
                    <Crosshair color="#00f2fe" size={20} />
                  </TouchableOpacity>

                  <View className="absolute bottom-2 right-2 bg-black/60 px-2 py-1 rounded">
                    <Text className="text-white text-[9px]">© OpenStreetMap contributors</Text>
                  </View>
                </View>

                {displayHospitals.map(h => (
                  <HospitalCard 
                    key={h.id} 
                    hospital={h} 
                    isSelected={h.id === selectedHospitalId}
                    onPress={() => handleHospitalSelect(h.id, h.latitude, h.longitude)}
                    userLat={location?.latitude}
                    userLng={location?.longitude}
                  />
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
