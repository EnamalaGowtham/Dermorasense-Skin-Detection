import React, { createContext, useContext, useState, useEffect } from 'react';
import api, { setLogoutHandler } from '../services/api';
import * as SecureStore from 'expo-secure-store';

type User = {
  id: number;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
  checkAuth: () => Promise<void>;
};

import { logError } from '../utils/errorHandler';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const token = await SecureStore.getItemAsync('access_token');
      if (!token) {
        setUser(null);
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      
      const res = await api.get('/auth/me');
      if (res.data?.user) {
        setUser(res.data.user);
        setIsAuthenticated(true);
      } else {
        await SecureStore.deleteItemAsync('access_token');
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      logError(error, 'AuthContext - checkAuth');
      await SecureStore.deleteItemAsync('access_token');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      logError(error, 'AuthContext - logout');
    } finally {
      await SecureStore.deleteItemAsync('access_token');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    setLogoutHandler(logout);
    checkAuth();
  }, []);

  const login = async (data: any) => {
    if (data?.access_token) {
      await SecureStore.setItemAsync('access_token', data.access_token);
    }
    if (data?.user) {
      setUser(data.user);
      setIsAuthenticated(true);
    }
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout, updateUser, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
