import * as Location from 'expo-location';

export interface LocationResult {
  latitude: number;
  longitude: number;
}

export interface LocationError {
  message: string;
  isDenied?: boolean;
  isServicesDisabled?: boolean;
}

export const locationService = {
  async getCurrentLocation(): Promise<{ data?: LocationResult; error?: LocationError }> {
    try {
      // 1. Check if location services (GPS) are enabled globally on the device
      const servicesEnabled = await Location.hasServicesEnabledAsync();
      if (!servicesEnabled) {
        console.log('[LOCATION] Services disabled');
        return {
          error: {
            message: 'Location services are turned off. Please enable location services and try again.',
            isServicesDisabled: true,
          },
        };
      }

      // 2. Check and request permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('[LOCATION] Permission denied');
        return {
          error: {
            message: 'Location access is required to find nearby dermatologists. Please allow location access in your browser/device settings.',
            isDenied: true,
          },
        };
      }

      // 3. Get actual location with a timeout so it doesn't hang indefinitely
      const location = await Promise.race([
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        }),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Unable to determine your current location.')), 15000)
        ),
      ]);

      const { latitude, longitude } = location.coords;

      // 4. Validate coordinates
      if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
        throw new Error('Unable to determine your current location.');
      }

      console.log(`[LOCATION] Success: lat=${latitude}, lng=${longitude}`);
      return {
        data: {
          latitude,
          longitude,
        },
      };
    } catch (err: any) {
      return {
        error: {
          message: err.message || 'Unable to retrieve your location right now. Please try again.',
        },
      };
    }
  },
};
