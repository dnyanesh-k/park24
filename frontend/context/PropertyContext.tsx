import { addProperty as addPropertyService, getMyProperties, getProperties } from '@/services/property.service';
import React, { createContext, useContext, useState } from 'react';
import { Platform } from 'react-native';
import { AuthContext } from './AuthContext';

export const PropertyContext = createContext<any>({});

export const PropertyProvider = ({ children }: { children: React.ReactNode }) => {
  const [properties, setProperties] = useState([]);
  const [myProperties, setMyProperties] = useState([]);
  const { token, user } = useContext(AuthContext); // Extract user for sellerId

  const fetchProperties = async () => {
    try {
      const data = await getProperties();
      setProperties(data?.data || data || []);
    } catch (error) {
      console.log("Context Error:", error);
    }
  };

  const fetchMyProperties = async () => {
    try {
      if (!token) return;
      const response = await getMyProperties(token);
      setMyProperties(response?.data || response || []);
    } catch (error) {
      console.log("Fetch My Properties Error:", error);
    }
  };

  const addProperty = async (formPayload: any, selectedImages: any[]) => {
    try {
      if (!token || !user) throw 'You must be logged in';

      const finalPayload = {
        ...formPayload,
        sellerId: user.userId,
        price: Number(formPayload.price),
        areaSqFt: Number(formPayload.areaSqFt)
      };

      const formData = new FormData();

      //Spring expects name = "property"
      formData.append(
        'property', JSON.stringify(finalPayload));

      // //Spring expects name = "images"
      // selectedImages.forEach((asset, index) => {
      //   formData.append('images', {
      //     uri: asset.uri,
      //     name: asset.fileName || `image_${index}.jpg`,
      //     type: asset.mimeType || 'image/jpeg',
      //   } as any);
      // });

      selectedImages.forEach((asset, index) => {
        if (Platform.OS === 'web') {
          formData.append('images', asset.file);
        } else {
          formData.append('images', {
            uri: asset.uri,
            name: asset.fileName ?? `image_${index}.jpg`,
            type: asset.mimeType ?? 'image/jpeg',
          } as any);
        }
      });

      console.log("FORMDATA DEBUG:");
      console.log((formData as any)._parts);

      const res = await addPropertyService(formData, token);

      await fetchMyProperties();
      return res;

    } catch (error) {
      console.log("Add Property Error:", error);
      throw error;
    }
  };

  return (
    <PropertyContext.Provider value={{
      properties,
      fetchProperties,
      myProperties,
      fetchMyProperties,
      addProperty // Expose to UI
    }}>
      {children}
    </PropertyContext.Provider>
  );
};
