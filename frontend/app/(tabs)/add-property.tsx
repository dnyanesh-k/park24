import ScreenLayout from '@/components/ScreenLayout'; // Consistent layout component
import { PropertyContext } from '@/context/PropertyContext';
import * as ImagePicker from 'expo-image-picker';
import React, { useContext, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

export default function AddProperty() {
  const { addProperty } = useContext(PropertyContext);
  const { width } = useWindowDimensions();

  // Responsive logic
  const isTablet = width >= 768;
  const horizontalPadding = width * 0.05;
  const maxContentWidth = 750;

  const [title, setTitle] = useState('');
  const [areaSqFt, setAreaSqFt] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [city, setCity] = useState('');
  const [description, setDescription] = useState('');
  const [plotNumber, setPlotNumber] = useState('');
  const [surveyNumber, setSurveyNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<any[]>([]);

  const pickImages = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      return Toast.show({
        type: 'error',
        text1: 'Permission required',
        text2: 'Allow gallery access to upload images',
      });
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 3,
      quality: 0.8,
    });

    if (!result.canceled) {
      if (result.assets.length !== 3) {
        return Toast.show({
          type: 'error',
          text1: 'Exactly 3 images required',
        });
      }
      setImages(result.assets);
    }
  };

  const handlePublish = async () => {
    if (!title || !areaSqFt || !price || !city) {
      return Toast.show({
        type: 'error',
        text1: 'Missing Required Fields',
        text2: 'Title, City, Area and Price are mandatory.',
        position: 'top',
        visibilityTime: 3000,
      });
    }

    if (images.length !== 3) {
      return Toast.show({
        type: 'error',
        text1: '3 images required',
      });
    }

    try {
      setLoading(true);
      const response = await addProperty({
        title,
        areaSqFt,
        address,
        price,
        description,
        city,
        plotNumber,
        surveyNumber,
      }, images);

      Toast.show({
        type: 'success',
        text1: 'Plot Published',
        text2: response?.message || 'Your plot is now live.',
      });

      // Reset form
      setTitle('');
      setAreaSqFt('');
      setAddress('');
      setPrice('');
      setDescription('');
      setCity('');
      setPlotNumber('');
      setSurveyNumber('');
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Publishing Failed',
        text2: error?.message || 'Something went wrong.',
      });
    } finally {
      setLoading(false);
    }
  };

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
          title="Add Property"
          subtitle="List your property for buyers"
        >
          <ScrollView
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={[
                styles.card,
                { padding: isTablet ? 36 : 28 },
              ]}
            >
              <Text style={styles.title}>Add Property Details</Text>

              <Input
                label="Title *"
                value={title}
                onChangeText={setTitle}
                placeholder="e.g. Premium Riverside Property"
              />

              <Input
                label="City *"
                value={city}
                onChangeText={setCity}
                placeholder="e.g. Pune, Maharashtra"
              />

              <Input
                label="Area (Sq.Ft) *"
                value={areaSqFt}
                onChangeText={setAreaSqFt}
                keyboardType="numeric"
                placeholder="e.g. 1200"
              />

              <Input
                label="Price *"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                placeholder="₹ 12,00,000"
              />

              <Input
                label="Plot Number"
                value={plotNumber}
                onChangeText={setPlotNumber}
                placeholder="e.g. 10"
              />

              <Input
                label="Survey Number"
                value={surveyNumber}
                onChangeText={setSurveyNumber}
                placeholder="e.g. 19 (As per 7/12 Utara)"
              />

              <Input
                label="Address"
                value={address}
                onChangeText={setAddress}
                placeholder="Nearby landmark or area"
              />

              <Input
                label="Description"
                value={description}
                onChangeText={setDescription}
                multiline
                height={120}
                placeholder="Describe road access, soil type, and nearby developments..."
              />
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#3A5A40', marginBottom: 15 }]}
                onPress={pickImages}
              >
                <Text style={styles.buttonText}>
                  {images.length === 3 ? '3 Images Selected ✓' : 'Select 3 Images'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  loading && styles.buttonDisabled,
                  { marginTop: isTablet ? 28 : 20 },
                ]}
                onPress={handlePublish}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Publish Plot</Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ScreenLayout>
      </View>
    </SafeAreaView>
  );
}

const Input = ({ label, height, ...props }: any) => (
  <View style={{ marginBottom: 18 }}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      {...props}
      style={[
        styles.input,
        height && { height, paddingTop: 15, paddingBottom: 15 }
      ]}
      placeholderTextColor="#9C9C9C"
      textAlignVertical={props.multiline ? "top" : "center"}
    />
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
    marginTop: 10,
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

  buttonDisabled: {
    backgroundColor: '#A3B18A',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
