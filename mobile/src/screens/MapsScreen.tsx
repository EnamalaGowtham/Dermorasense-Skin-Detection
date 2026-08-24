import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserLocation } from '../hooks/useUserLocation';
import { nearbyService, NearbyHospital } from '../services/nearbyService';

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

export default function MapsScreen({ navigation }: any) {
  const { location, loading: locationLoading, error: locationError, refreshLocation } = useUserLocation();
  const [clinics, setClinics] = useState<NearbyHospital[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchRadius, setSearchRadius] = useState(5000); // meters internally handled by nearbyService but used here for display
  const [apiRadiusKm, setApiRadiusKm] = useState(0);

  useEffect(() => {
    if (location && !locationLoading) {
      fetchClinics(location.latitude, location.longitude);
    }
  }, [location?.latitude, location?.longitude, locationLoading]);

  const fetchClinics = async (lat: number, lng: number) => {
    setLoading(true);
    setError(null);
    
    // We are passing a default radius of 50000 meters (50km) to match the other screen
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
    setLoading(false);
  };

  const handleDirections = (lat: number, lng: number) => {
    if (!location) return;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${location.latitude},${location.longitude}&destination=${lat},${lng}`;
    Linking.openURL(url);
  };

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
    return calculated;
  }, [clinics, location]);

  const renderClinic = ({ item }: { item: NearbyHospital }) => (
    <View className="bg-[#090e1c] p-4 rounded-2xl mb-4 border border-[#1e293b] shadow-md">
      <View className="flex-row justify-between items-start mb-2">
        <Text className={`text-base font-bold flex-1 mr-2 ${item.is_dermatologist ? 'text-clinical-teal' : 'text-white'}`}>
          {item.name}
        </Text>
        <View className="bg-clinical-teal/10 px-2 py-1 rounded-lg">
          <Text className="text-clinical-teal text-xs font-bold">
            {item.distance < 1000 ? `${Math.round(item.distance)} m away` : `${(item.distance / 1000).toFixed(1)} km away`}
          </Text>
        </View>
      </View>
      
      <Text className={`text-xs mb-2 font-bold ${item.is_dermatologist ? 'text-clinical-teal' : 'text-amber-400'}`}>
        {item.speciality}
      </Text>
      
      <Text className="text-clinical-slate text-xs mb-3 leading-5">📍 {item.address}</Text>
      
      {(item.phone || item.website) && (
        <View className="border-t border-[#1e293b] pt-3 mb-3">
          {item.phone && <Text className="text-clinical-slate text-xs mb-1">☎ {item.phone}</Text>}
          {item.website && <Text className="text-clinical-slate text-xs" numberOfLines={1}>🌐 {item.website}</Text>}
        </View>
      )}
      
      <TouchableOpacity 
        className="bg-clinical-teal/10 border border-clinical-teal/30 py-3 rounded-xl items-center" 
        onPress={() => handleDirections(item.latitude, item.longitude)}
      >
        <Text className="text-clinical-teal font-bold text-sm tracking-wide">Get Directions</Text>
      </TouchableOpacity>
    </View>
  );

  const isLoading = locationLoading || loading;
  const currentError = locationError || error;

  return (
    <SafeAreaView className="flex-1 bg-clinical-bg">
      <View className="flex-1 px-5 pt-4">
        
        <View className="border-b border-[#1e293b] pb-4 mb-4">
          <Text className="text-2xl font-bold font-outfit text-white mb-3">Nearby Dermatologists</Text>
          
          {location && (
            <View className="bg-[#1e293b] p-3 rounded-xl mb-4">
              <Text className="text-clinical-teal font-bold text-sm mb-1">📍 Your Current Location</Text>
              <Text className="text-clinical-slate text-xs">Lat: {location.latitude.toFixed(5)}</Text>
              <Text className="text-clinical-slate text-xs">Lng: {location.longitude.toFixed(5)}</Text>
            </View>
          )}
          
          <TouchableOpacity 
            className={`py-3 rounded-xl items-center ${isLoading ? 'bg-clinical-teal/70' : 'bg-clinical-teal'}`} 
            onPress={() => refreshLocation()}
            disabled={isLoading}
          >
            <Text className="text-[#0f172a] font-bold text-sm tracking-wide">{isLoading ? 'Refreshing...' : 'Refresh Location'}</Text>
          </TouchableOpacity>
        </View>
        
        {isLoading ? (
          <ActivityIndicator size="large" color="#00f2fe" style={{ marginTop: 50 }} />
        ) : currentError ? (
          <View className="bg-red-500/10 p-4 rounded-xl mt-5">
            <Text className="text-red-400 text-center font-medium text-sm leading-5">{currentError}</Text>
          </View>
        ) : (
          <View className="flex-1">
            <Text className="text-xs text-clinical-slate mb-3 bg-[#090e1c] p-2 rounded-lg self-start">
              Showing clinics within {apiRadiusKm} km
            </Text>
            <FlatList
              data={displayClinics}
              keyExtractor={(item) => item.id}
              renderItem={renderClinic}
              ListEmptyComponent={<Text className="text-clinical-slate text-center mt-5">No clinics found nearby.</Text>}
              contentContainerStyle={{ paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
        
        <TouchableOpacity className="py-4 items-center mt-auto" onPress={() => navigation.goBack()}>
          <Text className="text-clinical-slate font-medium text-base">Go Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
