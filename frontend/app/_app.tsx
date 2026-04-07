import { AuthProvider } from '@/context/AuthContext';
import { PropertyProvider } from '@/context/PropertyContext';
import React, { ReactNode } from 'react';

export default function AppWrapper({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <PropertyProvider>
        {children}
      </PropertyProvider>
    </AuthProvider>
  );
}
