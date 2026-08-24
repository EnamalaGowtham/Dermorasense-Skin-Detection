import AsyncStorage from '@react-native-async-storage/async-storage';

export const cacheService = {
  async set(key: string, value: any) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      console.log(`[CACHE] Saved data for key: ${key}`);
    } catch (e) {
      console.error(`[CACHE] Error saving data for key: ${key}`, e);
    }
  },

  async get(key: string) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue != null) {
        console.log(`[CACHE] Retrieved data for key: ${key}`);
        return JSON.parse(jsonValue);
      }
      return null;
    } catch (e) {
      console.error(`[CACHE] Error retrieving data for key: ${key}`, e);
      return null;
    }
  },

  async remove(key: string) {
    try {
      await AsyncStorage.removeItem(key);
      console.log(`[CACHE] Removed data for key: ${key}`);
    } catch (e) {
      console.error(`[CACHE] Error removing data for key: ${key}`, e);
    }
  }
};
