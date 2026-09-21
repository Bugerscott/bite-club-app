import React, { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import type { CartItem, CartLineExtra, SauceOption } from '../types';
import { generateLocalId } from '../utils';

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'cartItemId' | 'quantity'>; quantity: number }
  | { type: 'INCREMENT'; cartItemId: string }
  | { type: 'DECREMENT'; cartItemId: string }
  | { type: 'REMOVE'; cartItemId: string }
  | { type: 'CLEAR' };

/** Firma de configuración de línea — mismo producto + mismas opciones = misma línea. */
function lineSignature(
  productId: string,
  sauce: SauceOption | undefined,
  extras: CartLineExtra[]
): string {
  const extraIds = extras
    .map((e) => e.id)
    .sort()
    .join(',');
  return `${productId}|${sauce ?? ''}|${extraIds}`;
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const signature = lineSignature(
        action.payload.productId,
        action.payload.selectedSauce,
        action.payload.selectedExtras
      );
      const existing = state.items.find(
        (item) => lineSignature(item.productId, item.selectedSauce, item.selectedExtras) === signature
      );
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.cartItemId === existing.cartItemId
              ? { ...item, quantity: item.quantity + action.quantity }
              : item
          ),
        };
      }
      return {
        items: [
          ...state.items,
          { ...action.payload, cartItemId: generateLocalId('cart'), quantity: action.quantity },
        ],
      };
    }
    case 'INCREMENT':
      return {
        items: state.items.map((item) =>
          item.cartItemId === action.cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    case 'DECREMENT':
      return {
        items: state.items
          .map((item) =>
            item.cartItemId === action.cartItemId ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0),
      };
    case 'REMOVE':
      return { items: state.items.filter((item) => item.cartItemId !== action.cartItemId) };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

function lineTotal(item: CartItem): number {
  const extrasTotal = item.selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
  return (item.unitPrice + extrasTotal) * item.quantity;
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, 'cartItemId' | 'quantity'>, quantity?: number) => void;
  incrementItem: (cartItemId: string) => void;
  decrementItem: (cartItemId: string) => void;
  removeItem: (cartItemId: string) => void;
  clearCart: () => void;
  lineTotal: (item: CartItem) => number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = useCallback(
    (item: Omit<CartItem, 'cartItemId' | 'quantity'>, quantity = 1) => {
      dispatch({ type: 'ADD_ITEM', payload: item, quantity });
    },
    []
  );
  const incrementItem = useCallback((cartItemId: string) => {
    dispatch({ type: 'INCREMENT', cartItemId });
  }, []);
  const decrementItem = useCallback((cartItemId: string) => {
    dispatch({ type: 'DECREMENT', cartItemId });
  }, []);
  const removeItem = useCallback((cartItemId: string) => {
    dispatch({ type: 'REMOVE', cartItemId });
  }, []);
  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);

  const itemCount = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items]
  );
  const subtotal = useMemo(
    () => state.items.reduce((sum, item) => sum + lineTotal(item), 0),
    [state.items]
  );

  const value: CartContextValue = {
    items: state.items,
    itemCount,
    subtotal,
    addItem,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart,
    lineTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>');
  return ctx;
}
