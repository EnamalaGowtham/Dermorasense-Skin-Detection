import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { MapPin, RefreshCw, AlertTriangle, Navigation } from 'lucide-react-native';
import { NearbyHospital, nearbyService } from '../services/nearbyService';
import { useUserLocation } from '../hooks/useUserLocation';
import NearbyDoctorCard from './NearbyDoctorCard';

type NearbyClinic = NearbyHospital;

// Haversine formula
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);  
  const dLon = (lon2 - lon1) * (Math.PI / 180); 
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; 
  return d;
}

export default function MapPreview() {
  const { location, loading: locationLoading, error: locationError, refreshLocation } = useUserLocation();
  const [clinics, setClinics] = useState<NearbyClinic[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchRadius, setSearchRadius] = useState(5000);
  const [apiRadiusKm, setApiRadiusKm] = useState(0);

  const fetchClinics = async (lat: number, lng: number) => {
    setLoading(true);
    setError(null);
    try {
      // Pass 50km radius as default for the preview
      const radiusMeters = 50000;
      const res = await nearbyService.findNearbyDermatology(lat, lng, 10, radiusMeters);
      
      if (res.error) {
        setError(res.error);
        setClinics([]);
      } else if (res.data) {
        if (res.data.facilities && res.data.facilities.length > 0) {
          setClinics(res.data.facilities);
          setApiRadiusKm(res.data.search_radius_km);
        } else {
          setError('No healthcare facilities were found within 50 KM of your current location.');
          setClinics([]);
          setApiRadiusKm(50);
        }
      }
    } catch (e: any) {
      setError('Unable to retrieve nearby healthcare locations right now. Please try again.');
      setClinics([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location && !locationLoading) {
      fetchClinics(location.latitude, location.longitude);
    }
  }, [location?.latitude, location?.longitude, locationLoading]);

  const displayClinics = useMemo(() => {
    if (!location || clinics.length === 0) return [];
    
    const calculated = clinics.map(h => {
      const distanceKm = getDistanceFromLatLonInKm(location.latitude, location.longitude, h.latitude, h.longitude);
      return {
        ...h,
        distance: distanceKm * 1000 // meters
      };
    });
    
    calculated.sort((a, b) => a.distance - b.distance);
    // Only show top 3 for preview
    return calculated.slice(0, 3);
  }, [clinics, location]);

  const renderClinic = ({ item }: { item: NearbyClinic }) => (
    location
      ? <NearbyDoctorCard item={item} userLat={location.latitude} userLng={location.longitude} />
      : null
  );

  const isLoading = locationLoading || loading;
  const currentError = locationError || error;

  return (
    <View className="bg-[#111a2f] p-5 rounded-3xl mt-4 border border-[#1e293b]">
      {/* Header */}
      <View className="border-b border-[#1e293b] pb-4 mb-4">
        <View className="flex-row items-center mb-2">
          <MapPin color="#00f2fe" size={24} className="mr-2" />
          <Text className="text-xl font-bold text-white">Nearby Dermatologists</Text>
        </View>
        <Text className="text-[#64748b] text-xs mb-4">Locate certified professionals close to you</Text>
        
        {location && (
          <View className="bg-[#090e1c] border border-[#1e293b] p-3 rounded-xl mb-4 self-start">
            <View className="flex-row items-center mb-1">
              <Navigation color="#00f2fe" size={14} className="mr-1.5" />
              <Text className="text-[#00f2fe] font-bold text-xs">Your Current Location</Text>
            </View>
            <Text className="text-[#64748b] text-[10px]">
              Lat: {location.latitude.toFixed(5)}, Lng: {location.longitude.toFixed(5)}
            </Text>
          </View>
        )}
        
        <TouchableOpacity 
          className="flex-row items-center justify-center py-3 px-4 rounded-xl shadow-lg"
          style={{ backgroundColor: isLoading ? '#0e7490' : '#0ea5e9' }}
          onPress={() => refreshLocation()}
          disabled={isLoading}
        >
          <RefreshCw color="white" size={16} className="mr-2" />
          <Text className="text-white font-bold text-sm">
            {location ? 'Refresh Location' : 'Use Geolocation'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Error State */}
      {currentError && (
        <View className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl mb-4 flex-row items-center">
          <AlertTriangle color="#f87171" size={20} className="mr-3" />
          <Text className="text-red-400 text-xs flex-1">{currentError}</Text>
        </View>
      )}

      {/* Loading State */}
      {isLoading && displayClinics.length === 0 && (
        <View className="py-10 border border-dashed border-[#1e293b] rounded-2xl items-center justify-center bg-[#090e1c]/30">
          <ActivityIndicator size="large" color="#00f2fe" className="mb-4" />
          <Text className="text-[#64748b] text-xs font-medium">{locationLoading ? 'Detecting your location...' : 'Finding dermatologists near you...'}</Text>
        </View>
      )}

      {/* Results State */}
      {!isLoading && location && displayClinics.length > 0 && (
        <View>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-white">Nearby Results</Text>
            <View className="bg-[#090e1c] px-3 py-1 rounded-full border border-[#1e293b]">
              <Text className="text-[#64748b] text-[10px]">Searching within {apiRadiusKm} km</Text>
            </View>
          </View>
          
          <FlatList
            data={displayClinics}
            keyExtractor={(item) => item.id}
            renderItem={renderClinic}
            scrollEnabled={false}
          />
        </View>
      )}

      {/* Initial Empty State */}
      {!isLoading && !location && !currentError && (
        <View className="py-10 border border-dashed border-[#1e293b] rounded-2xl flex-col items-center justify-center bg-[#090e1c]/30 p-6">
          <MapPin color="#64748b" size={32} opacity={0.5} className="mb-3" />
          <Text className="text-[#64748b] text-xs text-center leading-5">
            Click <Text className="text-white font-bold">Use Geolocation</Text> above to securely find dermatologists near your real location.
          </Text>
        </View>
      )}
    </View>
  );
}
