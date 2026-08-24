import api from './api';
import { cacheService } from './cacheService';

export interface NearbyHospital {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  phone?: string;
  website?: string;
  speciality: string;
  distance: number;
  is_dermatologist: boolean;
  source: string;
}

export interface NearbyResponse {
  success: boolean;
  user_location: {
    latitude: number;
    longitude: number;
  };
  search_radius_km: number;
  count: number;
  facilities: NearbyHospital[];
  isCached?: boolean;
}

export const nearbyService = {
  async findNearbyDermatology(latitude: number, longitude: number, limit: number = 10, radius?: number): Promise<{ data?: NearbyResponse; error?: string; isCached?: boolean }> {
    const radiusParam = radius ? `&radius=${radius}` : '';
    const cacheKey = `nearby_hospitals_${latitude.toFixed(2)}_${longitude.toFixed(2)}_${limit}_${radius || 'auto'}`;
    try {
      console.log(`[HOSPITALS] Requesting Overpass via backend: limit=${limit}, lat=${latitude}, lng=${longitude}, radius=${radius || 'auto'}`);
      // The backend returns results already sorted and filtered up to 500km
      const response = await api.get<NearbyResponse>(`/nearby-dermatologists?lat=${latitude}&lng=${longitude}&limit=${limit}${radiusParam}`);
      
      const data = response.data;
      
      // Double check filter on the client just to be absolutely certain we don't display > 500km
      if (data && data.facilities) {
        data.facilities = data.facilities.filter(f => f.distance <= 500000);
        data.count = data.facilities.length;
      }
      
      console.log(`[HOSPITALS] Retrieved ${data?.count} results. Saving to cache.`);
      await cacheService.set(cacheKey, data);
      
      return { data, isCached: false };
    } catch (err: any) {
      console.log(`[HOSPITALS] Network error encountered. Attempting to load from cache.`);
      // Differentiate network errors
      const cachedData = await cacheService.get(cacheKey) as NearbyResponse;
      if (cachedData) {
        console.log(`[HOSPITALS] Serving cached results from ${cacheKey}`);
        cachedData.isCached = true;
        return { data: cachedData, isCached: true };
      }
      
      if (err.message === 'Network Error' || !err.response) {
        return { error: 'Unable to search nearby hospitals. Please check your internet connection.' };
      }
      return { error: 'Nearby location service is temporarily unavailable.' };
    }
  }
};
