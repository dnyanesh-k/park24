import { register } from '@/services/auth.service';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

export default function Register() {
  const router = useRouter();
  const { role } = useLocalSearchParams() as { role?: 'BUYER' | 'SELLER' };

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [passwordHash, setPasswordHash] = useState('');
  const [loading, setLoading] = useState(false);
  // const [successMessage, setSuccessMessage] = useState('');

  // const [errorMessage, setErrorMessage] = useState('');

  const handlePhoneChange = (text: string) => {
    // Regex: Remove anything that is NOT a digit
    const cleaned = text.replace(/[^0-9]/g, '');

    // Optional: Limit to 10 digits for Indian numbers
    if (cleaned.length <= 10) {
      setPhoneNumber(cleaned);
    }
  };

  const handleRegister = async () => {
    if (!phoneNumber || !firstName || passwordHash.length !== 4)
      return Alert.alert('Validation', 'Please fill all required fields (4 digit PIN)');

    setLoading(true);
    try {
      const response = await register({
        firstName,
        lastName,
        phoneNumber,
        address,
        passwordHash,
        role: role || 'BUYER',
      });
      // setSuccessMessage(response.message);
      Toast.show({
        type: 'success',
        text1: 'Account Created',
        text2: response.message,
      });
      router.replace('/(auth)/login');
    } catch (e: any) {
      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: e?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.brand}>Landmark</Text>
        <Text style={styles.subtitle}>
          {role === 'SELLER'
            ? 'List your land with confidence'
            : 'Discover and invest in land'}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Create Your Account</Text>

        <Text style={styles.label}>First Name</Text>
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
          placeholder="Enter first name"
          placeholderTextColor="#9C9C9C"
        />

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
          placeholder="Enter last name"
          placeholderTextColor="#9C9C9C"
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={handlePhoneChange}
          style={styles.input}
          maxLength={10}
          placeholder="Enter 10-digit mobile number"
          placeholderTextColor="#9C9C9C"
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          value={address}
          onChangeText={setAddress}
          style={styles.input}
          placeholder="City / Area"
          placeholderTextColor="#9C9C9C"
        />

        <Text style={styles.label}>4 Digit PIN</Text>
        <TextInput
          keyboardType="numeric"
          secureTextEntry
          value={passwordHash}
          onChangeText={setPasswordHash}
          style={styles.input}
          maxLength={4}
          placeholder="••••"
          placeholderTextColor="#9C9C9C"
        />

        {/* {successMessage ? (
          <Text style={styles.success}>{successMessage}</Text>
        ) : null} */}

        {/* {errorMessage ? (
          <Text style={styles.error}>{errorMessage}</Text>
        ) : null} */}

        <TouchableOpacity
          style={[styles.button,
          (phoneNumber.length != 10
            || passwordHash.length !== 4
            || !firstName
            || !lastName
            || !address
          ) && styles.buttonDisabled,]}
          onPress={handleRegister}
          disabled={loading}
          activeOpacity={0.9}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {role === 'SELLER' ? 'Start Listing Land' : 'Start Exploring Land'}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.replace('/(auth)/login')}
          style={styles.linkWrap}
        >
          <Text style={styles.linkText}>
            Already registered?{' '}
            <Text style={styles.linkHighlight}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F1E8',
    paddingHorizontal: 24,
    justifyContent: 'center',
    paddingVertical: 40,
  },

  header: {
    marginBottom: 40,
  },

  brand: {
    fontSize: 42,
    fontWeight: '800',
    color: '#1F3D2B',
    letterSpacing: -1.2,
    textAlign: 'center',
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#5F6F52',
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 28,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 25,
    elevation: 8,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 22,
    color: '#2B2B2B',
  },

  label: {
    fontSize: 13,
    marginBottom: 6,
    color: '#6B7280',
  },

  input: {
    height: 56,
    borderRadius: 18,
    backgroundColor: '#F3F2EF',
    paddingHorizontal: 18,
    marginBottom: 18,
    fontSize: 15,
    color: '#2B2B2B',
  },

  button: {
    height: 58,
    borderRadius: 20,
    backgroundColor: '#1F3D2B',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#A3B18A',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  linkWrap: {
    marginTop: 24,
    alignItems: 'center',
  },

  linkText: {
    fontSize: 14,
    color: '#6B7280',
  },

  linkHighlight: {
    color: '#8B5E34',
    fontWeight: '600',
  },
  success: {
    color: '#1e950cc4',
    fontSize: 14,
    marginBottom: 10,
  },
  error: {
    color: '#C2410C',
    fontSize: 14,
    marginBottom: 10,
  },
});

