import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProfileContext = createContext();

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within ProfileProvider');
  }
  return context;
};

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    console.log("🔑 Token:", token ? "Present" : "Missing");
    
    if (!token) {
      console.log("⚠️ No token found");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      console.log("📡 Fetching profile from API...");
      const response = await axios.get('http://localhost:5000/api/profile/me', {
        headers: { Authorization: Bearer  }
      });
      
      console.log("✅ Profile fetched:", response.data);
      setProfile(response.data);
    } catch (err) {
      console.error('❌ Error fetching profile:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load profile on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const value = {
    profile,
    loading,
    error,
    fetchProfile
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};
