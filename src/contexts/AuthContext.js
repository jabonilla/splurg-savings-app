import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DataService from '../services/DataService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      const authToken = await AsyncStorage.getItem('authToken');
      
      if (userData && authToken) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // Mock login - in real app, this would call your API
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: email,
        phone: '+1234567890',
      };

      const mockToken = 'mock-auth-token-' + Date.now();

      // Save to AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      await AsyncStorage.setItem('authToken', mockToken);

      // Initialize mock data
      await DataService.initializeMockData();

      setUser(mockUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      // Mock registration - in real app, this would call your API
      const mockUser = {
        id: '1',
        name: name,
        email: email,
        phone: '+1234567890',
      };

      const mockToken = 'mock-auth-token-' + Date.now();

      // Save to AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      await AsyncStorage.setItem('authToken', mockToken);

      // Initialize mock data
      await DataService.initializeMockData();

      setUser(mockUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Clear AsyncStorage
      await AsyncStorage.multiRemove(['user', 'authToken']);
      await DataService.clearAllData();

      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 