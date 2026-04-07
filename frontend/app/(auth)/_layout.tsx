import { useAuth } from '@/context/AuthContext';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect } from 'react';

export default function AuthLayout() {
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && token) {

      console.log("TOKEN:",token, typeof token);
      
      // already authenticated -> send to the main tabs/home screen
      router.replace('/(tabs)/home');
    }
  }, [token, loading]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="select-role" />
      <Stack.Screen name="register" />
      <Stack.Screen name="login" />
    </Stack>
  );
}