import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { Navigation, Phone, Globe, MapPin } from 'lucide-react-native';
import { NearbyHospital } from '../services/nearbyService';

interface HospitalCardProps {
  hospital: NearbyHospital;
  isSelected?: boolean;
  onPress?: () => void;
  userLat?: number;
  userLng?: number;
}

export default function HospitalCard({ hospital, isSelected, onPress, userLat, userLng }: HospitalCardProps) {
  const openDirections = () => {
    let url = `https://www.google.com/maps/dir/?api=1&destination=${hospital.latitude},${hospital.longitude}`;
    if (userLat && userLng) {
      url = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${hospital.latitude},${hospital.longitude}`;
    }
    Linking.openURL(url);
  };

  const openWebsite = () => {
    if (hospital.website) Linking.openURL(hospital.website);
  };

  const callPhone = () => {
    if (hospital.phone) Linking.openURL(`tel:${hospital.phone}`);
  };

  const distanceText = hospital.distance < 1000 
    ? `${hospital.distance} m away` 
    : `${(hospital.distance / 1000).toFixed(1)} km away`;

  return (
    <TouchableOpacity 
      activeOpacity={onPress ? 0.7 : 1}
      onPress={onPress}
      className={`border rounded-2xl p-5 mb-4 shadow-sm ${isSelected ? 'bg-[#111a2f] border-clinical-teal' : 'bg-clinical-card border-clinical-border'}`}
    >
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-white font-bold text-base flex-1 mr-3 leading-tight">
          {hospital.name}
        </Text>
        <View className="bg-clinical-teal/10 px-2.5 py-1 rounded-lg border border-clinical-teal/20">
          <Text className="text-clinical-teal text-xs font-bold">{distanceText}</Text>
        </View>
      </View>

      <Text className={`text-xs font-semibold mb-3 ${hospital.is_dermatologist ? 'text-[#00f2fe]' : 'text-amber-400'}`}>
        {hospital.speciality}
      </Text>

      <View className="flex-row items-start mb-4 pr-4">
        <MapPin color="#64748b" size={14} className="mr-2 mt-0.5" />
        <Text className="text-clinical-slate text-sm leading-relaxed flex-1">
          {hospital.address}
        </Text>
      </View>

      {(hospital.phone || hospital.website) && (
        <View className="flex-row flex-wrap gap-3 mb-4 pb-4 border-b border-clinical-border/50">
          {hospital.phone && (
            <TouchableOpacity onPress={callPhone} className="flex-row items-center bg-[#0a0f1d] px-3 py-1.5 rounded-lg border border-clinical-border">
              <Phone color="#00f2fe" size={12} className="mr-2" />
              <Text className="text-clinical-slate text-xs font-medium">Call</Text>
            </TouchableOpacity>
          )}
          {hospital.website && (
            <TouchableOpacity onPress={openWebsite} className="flex-row items-center bg-[#0a0f1d] px-3 py-1.5 rounded-lg border border-clinical-border">
              <Globe color="#00f2fe" size={12} className="mr-2" />
              <Text className="text-clinical-slate text-xs font-medium">Website</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <TouchableOpacity 
        onPress={openDirections}
        className="flex-row items-center justify-center py-3 bg-clinical-teal/10 border border-clinical-teal/30 rounded-xl"
      >
        <Navigation color="#00f2fe" size={16} className="mr-2" />
        <Text className="text-clinical-teal font-bold text-sm">Get Directions</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
