import { AuthContext } from '@/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import React, { useContext, useEffect } from 'react';

export default function TabLayout() {
  const { user, token, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !token) {
      router.replace('/(auth)/login');
    }
  }, [token, loading]);

  const role = user?.role || 'BUYER';

  const screenOptions = {
    headerShown: false,
    tabBarActiveTintColor: '#1F3D2B',
    tabBarInactiveTintColor: '#9CA3AF',
    tabBarStyle: {
      backgroundColor: '#FFFFFF',
      borderTopWidth: 0,
      elevation: 8,
      height: 64,
      paddingBottom: 8,
      paddingTop: 6,
    },
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: '600' as const,
    },
  };

  if (role === 'SELLER') {
    return (
      <Tabs screenOptions={screenOptions}>
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={22}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="property"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="my-properties"
          options={{
            title: 'My Properties',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? 'business' : 'business-outline'}
                size={22}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="add-property"
          options={{
            title: 'Add',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? 'add-circle' : 'add-circle-outline'}
                size={24}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? 'person' : 'person-outline'}
                size={22}
                color={color}
              />

            ),
          }}
        />
      </Tabs>

    );
  }

  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}