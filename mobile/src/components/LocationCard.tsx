import React from 'react';
import { View, Text } from 'react-native';
import { MapPin } from 'lucide-react-native';

interface LocationCardProps {
  latitude: number;
  longitude: number;
  radiusKm: number;
}

export default function LocationCard({ latitude, longitude, radiusKm }: LocationCardProps) {
  return (
    <View className="bg-clinical-card border border-clinical-border rounded-2xl p-5 mb-6">
      <View className="flex-row items-center mb-3">
        <MapPin color="#00f2fe" size={20} className="mr-2" />
        <Text className="text-white font-bold text-base">Your Location</Text>
      </View>
      <View className="flex-row justify-between items-end">
        <View>
          <Text className="text-clinical-slate text-xs mb-1">Coordinates</Text>
          <Text className="text-white font-medium text-sm">
            {latitude.toFixed(6)}, {longitude.toFixed(6)}
          </Text>
        </View>
        <View className="bg-clinical-teal/10 px-3 py-1.5 rounded-lg border border-clinical-teal/20">
          <Text className="text-clinical-teal text-xs font-bold">Search radius: {radiusKm} km</Text>
        </View>
      </View>
    </View>
  );
}
