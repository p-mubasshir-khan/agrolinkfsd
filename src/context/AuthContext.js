import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:3001';

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
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const response = await axios.get(`${API_URL}/users/${userId}`);
          setUser(response.data);
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          setToken(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.get(`${API_URL}/users?email=${email}&password=${password}`);
      
      if (response.data && response.data.length > 0) {
        const userData = response.data[0];
        
        // Simple token simulation (in real app, use JWT)
        const simpleToken = btoa(JSON.stringify({ id: userData.id, email: userData.email }));
        
        localStorage.setItem('token', simpleToken);
        localStorage.setItem('userId', userData.id.toString());
        setToken(simpleToken);
        setUser(userData);
        
        toast.success('Login successful!');
        return { success: true };
      } else {
        toast.error('Invalid email or password');
        return { success: false, message: 'Invalid email or password' };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  const register = async (userData) => {
    try {
      // Check if email already exists
      const checkResponse = await axios.get(`${API_URL}/users?email=${userData.email}`);
      if (checkResponse.data && checkResponse.data.length > 0) {
        toast.error('Email already exists');
        return { success: false, message: 'Email already exists' };
      }

      // Get next ID
      const usersResponse = await axios.get(`${API_URL}/users`);
      const maxId = usersResponse.data.reduce((max, user) => Math.max(max, user.id || 0), 0);
      
      const newUser = {
        ...userData,
        id: maxId + 1,
        isApproved: userData.role === 'customer' ? true : false
      };

      const response = await axios.post(`${API_URL}/users`, newUser);
      
      // Simple token simulation
      const simpleToken = btoa(JSON.stringify({ id: response.data.id, email: response.data.email }));
      
      localStorage.setItem('token', simpleToken);
      localStorage.setItem('userId', response.data.id.toString());
      setToken(simpleToken);
      setUser(response.data);
      
      toast.success('Registration successful!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setToken(null);
    setUser(null);
    toast.success('Logged out successfully');
  };

  const updateProfile = async (profileData) => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.put(`${API_URL}/users/${userId}`, {
        ...user,
        ...profileData
      });
      setUser(response.data);
      toast.success('Profile updated successfully!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Profile update failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isFarmer: user?.role === 'farmer',
    isCustomer: user?.role === 'customer',
    isApprovedFarmer: user?.role === 'farmer' && user?.isApproved
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 