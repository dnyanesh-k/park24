import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SelectRole() {
  const router = useRouter();

  const go = (role: 'BUYER' | 'SELLER') =>
    router.push({ pathname: '/(auth)/register', params: { role } });

  return (
    <View style={styles.screen}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'default'}
        backgroundColor="transparent"
        translucent
      />

      <View style={styles.header}>
        <Text style={styles.brand}>Landmark</Text>
        <Text style={styles.headline}>Start your journey</Text>
      </View>

      <View style={styles.stack}>
        {/* BUYER */}
        <TouchableOpacity
          activeOpacity={0.92}
          onPress={() => go('BUYER')}
          style={[styles.tile, styles.tileLight]}
        >
          <View style={styles.stripGreen} />
          <View style={styles.tileContent}>
            <View style={styles.iconCircle}>
              <Ionicons name="search-outline" size={26} color="#2F8A5E" />
            </View>

            <View style={styles.textWrap}>
              <Text style={styles.title}>Buy Property</Text>
              <Text style={styles.subtitle}>
                Search property
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* SELLER */}
        <TouchableOpacity
          activeOpacity={0.92}
          onPress={() => go('SELLER')}
          style={[styles.tile, styles.tileWarm]}
        >
          <View style={styles.stripBrown} />
          <View style={styles.tileContent}>
            <View style={styles.iconCircle}>
              <Ionicons name="business-outline" size={26} color="#8B5E34" />
            </View>

            <View style={styles.textWrap}>
              <Text style={styles.title}>Sell Property</Text>
              <Text style={styles.subtitle}>
                List your property
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7F5EF',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },

  header: {
    marginBottom: 28,
  },

  brand: {
    color: '#1E2F23',
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -0.6,
    textAlign: 'center'
  },

  headline: {
    marginTop: 6,
    fontSize: 18,
    fontWeight: '700',
    color: '#2B2B2B',
    textAlign: 'center'
  },

  stack: {
    gap: 16,
  },

  tile: {
    flexDirection: 'row',
    borderRadius: 18,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
    overflow: 'hidden',
  },

  stripGreen: {
    width: 6,
    backgroundColor: '#2F8A5E',
  },

  stripBrown: {
    width: 6,
    backgroundColor: '#8B5E34',
  },

  tileContent: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 14,
  },

  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#F3F6F3',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textWrap: {
    flex: 1,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E2F23',
  },

  subtitle: {
    marginTop: 6,
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },

  tileLight: {
    backgroundColor: '#FFFFFF',
  },

  tileWarm: {
    backgroundColor: '#FEF6F0',
  },

  footer: {
    marginTop: 28,
    alignItems: 'center',
  },

  secondary: {
    color: '#8B6B4A',
    fontSize: 13,
  },
});