import React from 'react';
import { CartProvider } from './CartContext';
import { AppStateProvider } from './AppStateContext';

/** Combina todos los providers de estado global de la fase frontend. */
export function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <AppStateProvider>
      <CartProvider>{children}</CartProvider>
    </AppStateProvider>
  );
}
