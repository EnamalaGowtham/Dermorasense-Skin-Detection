import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Checks if user is already authenticated via httpOnly cookie on boot
  const checkAuth = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/auth/me', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Vital for httpOnly session cookies
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error('Session sync error:', err);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      const res = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });
      
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        setError(data.detail || 'Login failed');
        return { success: false, error: data.detail || 'Login failed' };
      }
    } catch (err) {
      setError('Connection to backend failed');
      return { success: false, error: 'Connection to backend failed' };
    }
  };

  const register = async (name, email, password) => {
    setError(null);
    try {
      const res = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      
      const data = await res.json();
      if (res.ok) {
        return { success: true, message: data.message, token: data.verification_token };
      } else {
        setError(data.detail || 'Registration failed');
        return { success: false, error: data.detail || 'Registration failed' };
      }
    } catch (err) {
      setError('Connection to backend failed');
      return { success: false, error: 'Connection to backend failed' };
    }
  };

  const logout = async () => {
    try {
      await fetch('http://localhost:8000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateProfile = async (name, email) => {
    try {
      const res = await fetch('http://localhost:8000/api/profile/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        setUser(prev => ({ ...prev, name, email }));
        return { success: true };
      } else {
        return { success: false, error: data.detail || 'Update failed' };
      }
    } catch (err) {
      return { success: false, error: 'Connection failed' };
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, error, login, register, logout, updateProfile, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
