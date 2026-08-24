import { useState, useEffect, useCallback } from 'react';
import * as Location from 'expo-location';
import { Linking } from 'react-native';
import { logError, getErrorMessage } from '../utils/errorHandler';

export interface UserLocation {
  latitude: number;
  longitude: number;
  accuracy: number | null;
  timestamp: number;
}

export interface UseUserLocationResult {
  location: UserLocation | null;
  loading: boolean;
  error: string | null;
  permissionStatus: Location.PermissionStatus | null;
  gpsDisabled: boolean;
  refreshLocation: () => Promise<void>;
  openSettings: () => void;
}

export function useUserLocation(): UseUserLocationResult {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<Location.PermissionStatus | null>(null);
  const [gpsDisabled, setGpsDisabled] = useState(false);

  const fetchLocation = useCallback(async () => {
    setLoading(true);
    setError(null);
    setGpsDisabled(false);

    try {
      // 1. Check if location services (GPS) are enabled
      const servicesEnabled = await Location.hasServicesEnabledAsync();
      if (!servicesEnabled) {
        setGpsDisabled(true);
        setError('Location services are turned off. Please enable location services and try again.');
        setLoading(false);
        return;
      }

      // 2. Check and request permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionStatus(status);
      
      if (status !== 'granted') {
        setError('Location access is required to find nearby dermatologists. Please allow location access in your device settings.');
        setLoading(false);
        return;
      }

      // 3. Get actual location with high accuracy
      const pos = await Promise.race([
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        }),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Unable to determine your current location. Request timed out.')), 15000)
        ),
      ]);

      const { latitude, longitude, accuracy } = pos.coords;

      // 4. Validate coordinates
      if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
        throw new Error('Received invalid coordinates from GPS.');
      }

      
      setLocation({
        latitude,
        longitude,
        accuracy,
        timestamp: pos.timestamp,
      });
      setError(null);
    } catch (err: any) {
      logError(err, 'useUserLocation - fetchLocation');
      setError(getErrorMessage(err) || 'Unable to retrieve your location right now. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const openSettings = useCallback(() => {
    Linking.openSettings();
  }, []);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  return {
    location,
    loading,
    error,
    permissionStatus,
    gpsDisabled,
    refreshLocation: fetchLocation,
    openSettings,
  };
}
