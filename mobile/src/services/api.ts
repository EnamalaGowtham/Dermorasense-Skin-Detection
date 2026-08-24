import axios from 'axios';
import { Platform, NativeModules } from 'react-native';

import * as SecureStore from 'expo-secure-store';

export let API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.dermorasense.com';

if (__DEV__ && !process.env.EXPO_PUBLIC_API_URL) {
  try {
    const scriptURL = NativeModules.SourceCode.scriptURL;
    if (scriptURL) {
      const match = scriptURL.match(/^https?:\/\/(.*?):/);
      if (match && match[1]) {
        API_URL = `http://${match[1]}:8000`;
      } else {
        API_URL = 'http://172.20.10.3:8000';
      }
    } else {
      API_URL = 'http://172.20.10.3:8000';
    }
  } catch (e) {
    API_URL = 'http://172.20.10.3:8000';
  }
}

const getBaseUrl = () => {
  return `${API_URL}/api`;
};

const api = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 20000, // 20 seconds is a healthy balance for lively UI but enough time for basic Overpass queries
});

let logoutHandler: (() => void) | null = null;
export const setLogoutHandler = (handler: () => void) => {
  logoutHandler = handler;
};

import { logError } from './../utils/errorHandler';

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync('access_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      logError(error, 'API Request Interceptor - SecureStore');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    logError(error, 'API Response Interceptor');
    
    // We only keep the 401 logout side-effect here.
    // The actual error formatting is now handled by getErrorMessage() in errorHandler.ts
    // when the error reaches the UI.
    if (error.response && error.response.status === 401) {
      if (logoutHandler) {
        logoutHandler();
      }
    }
    return Promise.reject(error);
  }
);

export const checkHealth = async () => {
  try {
    const res = await axios.get(getBaseUrl().replace('/api', '/health'));
    return res.data;
  } catch (err) {
    logError(err, 'API Health Check Failed');
    throw err;
  }
};

export default api;
