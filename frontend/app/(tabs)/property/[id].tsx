import { getPropertyById } from '@/services/property.service';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function PropertyDetails() {
  const params = useLocalSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();

  const [property, setProperty] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    async function loadProperty() {
      try {
        const res = await getPropertyById(id as string);
        setProperty(res.data || res);
      } catch (err) {
        console.error('Failed to load property', err);
      }
    }
    if (id) loadProperty();
  }, [id]);

  if (!property) {
    return (
      <View style={styles.loader}>
        <Text>Loading property...</Text>
      </View>
    );
  }

  const images = property.imageUrls || [];

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slide = Math.round(
      event.nativeEvent.contentOffset.x / width
    );
    setCurrentIndex(slide);
  };

  return (
    <>
      <FlatList
        data={[property]}
        keyExtractor={() => 'property'}
        ListHeaderComponent={
          <View>
            <FlatList
              data={images}
              horizontal
              pagingEnabled
              snapToInterval={width}
              decelerationRate="fast"
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, index) => String(index)}
              onMomentumScrollEnd={onScroll}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    setCurrentIndex(index);
                    setModalVisible(true);
                  }}
                >
                  <Image
                    source={{ uri: item }}
                    style={styles.heroImage}
                  />
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={22} color="#fff" />
            </TouchableOpacity>

            <View style={styles.counter}>
              <Text style={styles.counterText}>
                {currentIndex + 1} / {images.length}
              </Text>
            </View>
          </View>
        }
        renderItem={() => (
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{property.title}</Text>
            <Text style={styles.price}>
              ₹{Number(property.price).toLocaleString()}
            </Text>
            <Text>{property.description}</Text>
          </View>
        )}
      />

      {/* FULLSCREEN IMAGE MODAL */}
      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <FlatList
            ref={flatListRef}
            data={images}
            horizontal
            pagingEnabled
            initialScrollIndex={currentIndex}
            getItemLayout={(_, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => String(index)}
            renderItem={({ item }) => (
              <ZoomableImage uri={item} />
            )}
          />

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}

/* ---------------- ZOOMABLE IMAGE COMPONENT ---------------- */

function ZoomableImage({ uri }: { uri: string }) {
  const scale = useSharedValue(1);

  const gestureHandler = (event: PinchGestureHandlerGestureEvent) => {
    'worklet';
    scale.value = event.nativeEvent.scale;
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <PinchGestureHandler
      onGestureEvent={gestureHandler}
    >
      <Animated.View style={{ width, height }}>
        <Animated.Image
          source={{ uri }}
          style={[styles.fullImage, animatedStyle]}
          resizeMode="contain"
        />
      </Animated.View>
    </PinchGestureHandler>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImage: {
    width,
    height: 420,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 10,
    borderRadius: 30,
  },
  counter: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  counterText: {
    color: '#fff',
    fontSize: 12,
  },
  detailsContainer: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 6,
  },
  price: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  fullImage: {
    width,
    height,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
  },
});