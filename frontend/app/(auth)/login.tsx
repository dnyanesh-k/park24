import { AuthContext } from '@/context/AuthContext';
import { login } from '@/services/auth.service';
import { useRouter } from 'expo-router';
import React, { useContext, useState } from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

export default function Login() {
  const router = useRouter();
  const { signIn } = useContext(AuthContext);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [passwordHash, setPasswordHash] = useState('');
  const [loading, setLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');
  // const [successMessage, setSuccessMessage] = useState('');

  const handlePhoneChange = (text: string) => {
    // Regex: Remove anything that is NOT a digit
    const cleaned = text.replace(/[^0-9]/g, '');

    // Optional: Limit to 10 digits for Indian numbers
    if (cleaned.length <= 10) {
      setPhoneNumber(cleaned);
    }
  };

  const handleLogin = async () => {
    if (phoneNumber.length !== 10) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Phone Number',
        text2: 'Phone number must be exactly 10 digits',
      });
      return;
    }

    if (passwordHash.length < 4) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Password',
        text2: 'Password must be at least 4 characters',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await login({ phoneNumber, passwordHash });
      console.log("RESPOINSE.Message ==>", response.message);

      // setSuccessMessage(response.message);
      Toast.show({
        type: 'success',
        text1: 'Login Success',
        text2: response.message,
      });
      await signIn(response.data.token, response.data.user);
      router.replace('/(tabs)/home');
    } catch (error: any) {
      setPhoneNumber('');
      setPasswordHash('');
      // setErrorMessage(error);
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: error,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.brand}>Landmark</Text>
        <Text style={styles.subtitle}>Buy & Sell Land with Confidence</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.welcome}>Welcome Back</Text>

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

        {/* {errorMessage ? (
          <Text style={styles.error}>{errorMessage}</Text>
        ) : null} */}

        {/* {successMessage ? (
          <Text style={styles.success}>{successMessage}</Text>
        ) : null} */}

        <TouchableOpacity
          style={[
            styles.button,
            (!phoneNumber || passwordHash.length !== 4) && styles.buttonDisabled,
          ]}
          onPress={handleLogin}
          disabled={loading}
          activeOpacity={0.9}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Access My Properties</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/(auth)/select-role')}
          style={styles.linkWrap}
        >
          <Text style={styles.linkText}>
            New to Landmark? <Text style={styles.linkHighlight}>Create Account</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F1E8',
    paddingHorizontal: 24,
    justifyContent: 'center',
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

  welcome: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
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
});