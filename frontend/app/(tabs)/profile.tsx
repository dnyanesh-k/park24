import { AuthContext } from '@/context/AuthContext';
import ScreenLayout from '@/components/ScreenLayout'; // Import your consistent layout
import { useRouter } from 'expo-router';
import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
  const { user, signOut } = useContext(AuthContext);
  const router = useRouter();
  const { width } = useWindowDimensions();

  // Responsive logic (Matching MyProperties)
  const isTablet = width >= 768;
  const horizontalPadding = width * 0.05;
  const maxContentWidth = 700; // Profile looks better slightly narrower than listing grid

  const handleLogout = async () => {
    await signOut();
    router.replace('/(auth)/login');
  };

  const initials =
    `${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`.toUpperCase();

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
          title="Profile"
          subtitle="Your account details"
        >
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
          >
            <View
              style={[
                styles.card,
                { padding: isTablet ? 36 : 28 },
              ]}
            >
              <Text style={styles.title}>Profile Information</Text>

              {/* Avatar Section */}
              <View
                style={[
                  styles.avatar,
                  {
                    height: isTablet ? 110 : 90,
                    width: isTablet ? 110 : 90,
                    borderRadius: isTablet ? 55 : 45,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.avatarText,
                    { fontSize: isTablet ? 34 : 28 },
                  ]}
                >
                  {initials}
                </Text>
              </View>

              {/* Info Rows */}
              <InfoRow
                label="Full Name"
                value={`${user?.firstName || ''} ${user?.lastName || ''}`}
              />
              <InfoRow
                label="Phone Number"
                value={user?.phoneNumber || 'Not available'}
              />
              <InfoRow
                label="Address"
                value={user?.address || 'Not available'}
              />
              <InfoRow
                label="Role"
                value={user?.role || 'User'}
              />

              {/* Action Button */}
              <TouchableOpacity
                style={[
                  styles.button,
                  { marginTop: isTablet ? 28 : 20 },
                ]}
                activeOpacity={0.9}
                onPress={handleLogout}
              >
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ScreenLayout>
      </View>
    </SafeAreaView>
  );
}

const InfoRow = ({ label, value }: any) => (
  <View style={{ marginBottom: 18 }}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.infoBox}>
      <Text style={styles.value}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 25,
    elevation: 8,
    marginTop: 10, // Small gap from header
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 24,
    color: '#2B2B2B',
  },

  avatar: {
    alignSelf: 'center',
    backgroundColor: '#1F3D2B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
  },

  avatarText: {
    color: '#fff',
    fontWeight: '700',
  },

  label: {
    fontSize: 13,
    marginBottom: 6,
    color: '#6B7280',
  },

  infoBox: {
    height: 56,
    borderRadius: 18,
    backgroundColor: '#F3F2EF',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },

  value: {
    fontSize: 15,
    color: '#2B2B2B',
  },

  button: {
    height: 58,
    borderRadius: 20,
    backgroundColor: '#1F3D2B',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
