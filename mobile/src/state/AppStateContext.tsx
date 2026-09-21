import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { Address, DeliveryMethod, MockOrder } from '../types';
import { mockAddresses } from '../mocks';
import { generateLocalId } from '../utils';

interface AppStateContextValue {
  deliveryMethod: DeliveryMethod | null;
  setDeliveryMethod: (method: DeliveryMethod) => void;

  addresses: Address[];
  selectedAddressId: string | null;
  selectAddress: (id: string) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Omit<Address, 'id'>) => void;
  deleteAddress: (id: string) => void;

  currentOrder: MockOrder | null;
  setCurrentOrder: (order: MockOrder) => void;
  clearCurrentOrder: () => void;
}

const AppStateContext = createContext<AppStateContextValue | null>(null);

/**
 * Estado compartido de la sesión de pedido (delivery method, dirección
 * seleccionada, pedido mock actual) — instrucciones, sección 19. Local/en
 * memoria, sin persistencia ni backend real.
 */
export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [deliveryMethod, setDeliveryMethodState] = useState<DeliveryMethod | null>(null);
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    mockAddresses.find((a) => a.isDefault)?.id ?? mockAddresses[0]?.id ?? null
  );
  const [currentOrder, setCurrentOrderState] = useState<MockOrder | null>(null);

  const setDeliveryMethod = useCallback((method: DeliveryMethod) => {
    setDeliveryMethodState(method);
  }, []);

  const selectAddress = useCallback((id: string) => {
    setSelectedAddressId(id);
  }, []);

  const addAddress = useCallback((address: Omit<Address, 'id'>) => {
    const newAddress: Address = { ...address, id: generateLocalId('addr') };
    setAddresses((prev) => [...prev, newAddress]);
    setSelectedAddressId(newAddress.id);
  }, []);

  const updateAddress = useCallback((id: string, address: Omit<Address, 'id'>) => {
    setAddresses((prev) => prev.map((a) => (a.id === id ? { ...address, id } : a)));
  }, []);

  const deleteAddress = useCallback((id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    setSelectedAddressId((current) => (current === id ? null : current));
  }, []);

  const setCurrentOrder = useCallback((order: MockOrder) => {
    setCurrentOrderState(order);
  }, []);

  const clearCurrentOrder = useCallback(() => {
    setCurrentOrderState(null);
  }, []);

  const value = useMemo<AppStateContextValue>(
    () => ({
      deliveryMethod,
      setDeliveryMethod,
      addresses,
      selectedAddressId,
      selectAddress,
      addAddress,
      updateAddress,
      deleteAddress,
      currentOrder,
      setCurrentOrder,
      clearCurrentOrder,
    }),
    [
      deliveryMethod,
      setDeliveryMethod,
      addresses,
      selectedAddressId,
      selectAddress,
      addAddress,
      updateAddress,
      deleteAddress,
      currentOrder,
      setCurrentOrder,
      clearCurrentOrder,
    ]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState(): AppStateContextValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState debe usarse dentro de <AppStateProvider>');
  return ctx;
}
