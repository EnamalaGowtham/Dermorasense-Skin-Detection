import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { ExternalLink } from 'lucide-react-native';

export default function NearbyDoctorCard({ item, userLat, userLng }: { item: any, userLat: number, userLng: number }) {
  const handleDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${item.latitude},${item.longitude}`;
    Linking.openURL(url);
  };

  return (
    <View className="bg-[#090e1c] p-4 rounded-2xl mb-4 border border-[#1e293b] shadow-md">
      <View className="flex-row justify-between items-start mb-2">
        <Text className={`text-base font-bold flex-1 mr-2 ${item.is_dermatologist ? 'text-[#00f2fe]' : 'text-white'}`}>
          {item.name}
        </Text>
        <View className="bg-[#00f2fe]/10 px-2 py-1 rounded-lg">
          <Text className="text-[#00f2fe] text-xs font-bold">
            {item.distance < 1000 ? `${item.distance} m away` : `${(item.distance / 1000).toFixed(1)} km away`}
          </Text>
        </View>
      </View>
      
      <Text className={`text-xs mb-2 font-bold ${item.is_dermatologist ? 'text-[#00f2fe]' : 'text-amber-400'}`}>
        {item.speciality}
      </Text>
      
      <Text className="text-[#64748b] text-xs mb-3 leading-5">📍 {item.address}</Text>
      
      {(item.phone || item.website) && (
        <View className="border-t border-[#1e293b] pt-3 mb-3 flex-row flex-wrap">
          {item.phone && <Text className="text-[#64748b] text-xs mr-4 mb-1">☎ {item.phone}</Text>}
          {item.website && <Text className="text-[#64748b] text-xs mb-1">🌐 {item.website}</Text>}
        </View>
      )}
      
      <TouchableOpacity 
        className="bg-[#00f2fe]/10 border border-[#00f2fe]/30 py-3 rounded-xl flex-row items-center justify-center mt-2" 
        onPress={handleDirections}
      >
        <Text className="text-[#00f2fe] font-bold text-sm tracking-wide mr-2">Get Directions</Text>
        <ExternalLink size={14} color="#00f2fe" />
      </TouchableOpacity>
    </View>
  );
}
