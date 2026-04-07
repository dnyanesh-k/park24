import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

// root index route acts as an entry point to decide which area to show
export default function Index() {
    const { token, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (loading) return;

        console.log("TOKEN:", token, typeof token);
        console.log("LOADING:", loading);
        if (token) {
            router.replace('/(tabs)/home');
        } else {
            router.replace('/(auth)/login');
        }
    }, [token, loading]);

    // while checking/loading auth state, show spinner
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return null;
}
