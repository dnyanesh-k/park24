import PropertyCard from '@/components/PropertyCard';
import { AuthContext } from '@/context/AuthContext';
import { PropertyContext } from '@/context/PropertyContext';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  useWindowDimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MyProperties() {
  const { myProperties, fetchMyProperties } = useContext(PropertyContext);
  const { token, loading: authLoading } = useContext(AuthContext);
  const { width } = useWindowDimensions();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !token) return;

    const load = async () => {
      try {
        await fetchMyProperties();
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [token, authLoading]);

  const properties = useMemo(
    () => (Array.isArray(myProperties) ? myProperties : []),
    [myProperties]
  );

  const isTablet = width >= 900;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F7F4' }}>
      <FlatList
        data={properties}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <PropertyCard property={item} sellerView />
        )}
        numColumns={isTablet ? 2 : 1}
        columnWrapperStyle={
          isTablet
            ? { justifyContent: 'space-between', paddingHorizontal: 32 }
            : undefined
        }
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 60,
          paddingHorizontal: isTablet ? 0 : 20,
          gap: 28,
        }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}