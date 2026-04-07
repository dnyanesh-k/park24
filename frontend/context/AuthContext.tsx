import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: any;
  token: string | null;
  loading: boolean;
  signIn: (t: string, u: any) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStorageData = async () => {
      try {
        const t = await AsyncStorage.getItem('token');
        const u = await AsyncStorage.getItem('user');
        if (t && u) {
          setToken(t);
          setUser(JSON.parse(u));

          axios.defaults.headers.common['Authorization'] = `Bearer ${t}`;
        }
      } catch (e) {
        console.error("Error loading auth data", e);
      } finally {
        setLoading(false);
      }
    };
    loadStorageData();
  }, []);

  const signIn = async (t: string | null | undefined, u: any) => {
    if (!t || t === "undefined" || t === "null") {
      console.warn("Invalid token received:", t);
      return;
    }

    setToken(t);
    setUser(u);

    await AsyncStorage.setItem('token', t);
    await AsyncStorage.setItem('user', JSON.stringify(u));

    axios.defaults.headers.common['Authorization'] = `Bearer ${t}`;
  };

  const signOut = async () => {
    setToken(null);
    setUser(null);
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
