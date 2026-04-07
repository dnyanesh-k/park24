import PropertyCard from '@/components/PropertyCard';
import ScreenLayout from '@/components/ScreenLayout';
import { PropertyContext } from '@/context/PropertyContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { properties, fetchProperties } = useContext(PropertyContext);
  const { width } = useWindowDimensions();

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        await fetchProperties();
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const safeProperties = Array.isArray(properties) ? properties : [];

  const filteredProperties = useMemo(() => {
    if (!search.trim()) return safeProperties;

    const query = search.toLowerCase();

    return safeProperties.filter(
      (p: any) =>
        p.title?.toLowerCase().includes(query) ||
        p.address?.toLowerCase().includes(query) ||
        p.city?.toLowerCase().includes(query)
    );
  }, [search, safeProperties]);

  // Responsive calculations
  const isTablet = width >= 768;
  const horizontalPadding = width * 0.05; // 5% padding
  const maxContentWidth = 900;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F1E8' }}>
      <View
        style={{
          flex: 1,
          alignSelf: 'center',
          width: '100%',
          maxWidth: maxContentWidth,
          paddingHorizontal: horizontalPadding,
        }}
      >
        <ScreenLayout
          title="Discover Land"
          subtitle={`${filteredProperties.length} listings available`}
          loading={loading}
          loadingText="Loading properties..."
          empty={filteredProperties.length === 0}
          emptyMode="inline"
          emptyTitle="No properties found"
          emptySubtitle="Try adjusting your search terms."
        >
          {/* Search Bar */}
          <View
            style={[
              styles.searchContainer,
              { height: isTablet ? 56 : 48 },
            ]}
          >
            <Ionicons name="search-outline" size={18} color="#6B7280" />
            <TextInput
              placeholder="Search city, area or title"
              placeholderTextColor="#9CA3AF"
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
            />
          </View>

          {/* List */}
          <FlatList
            data={filteredProperties}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <PropertyCard property={item} />
            )}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        </ScreenLayout>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: '#111827',
  },

  list: {
    paddingBottom: 40,
  },
});