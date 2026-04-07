import { Slot } from 'expo-router';
import React from 'react';
import Toast from 'react-native-toast-message';
import AppWrapper from './_app';

// keep root layout simple – the index route will drive the initial
// redirect, and group-specific layouts manage access.
export default function RootLayout() {
  return (
    <AppWrapper>
      <Slot />
      <Toast />
    </AppWrapper>
  );
}
