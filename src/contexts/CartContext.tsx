import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Structure } from '../types';

interface CartItem {
  structure: Structure;
  quantity: number;
  duration: '1day' | '2days' | 'custom';
  customDays?: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (structure: Structure, duration?: '1day' | '2days' | 'custom', customDays?: number) => void;
  removeFromCart: (structureId: string) => void;
  updateQuantity: (structureId: string, quantity: number) => void;
  updateDuration: (structureId: string, duration: '1day' | '2days' | 'custom', customDays?: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (structure: Structure, duration: '1day' | '2days' | 'custom' = '1day', customDays?: number) => {
    setItems(prev => {
      const existingItem = prev.find(item => 
        item.structure.id === structure.id && 
        item.duration === duration &&
        (duration !== 'custom' || item.customDays === customDays)
      );
      
      if (existingItem) {
        return prev.map(item =>
          item.structure.id === structure.id && 
          item.duration === duration &&
          (duration !== 'custom' || item.customDays === customDays)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prev, { structure, quantity: 1, duration, customDays }];
    });
  };

  const removeFromCart = (structureId: string) => {
    setItems(prev => prev.filter(item => item.structure.id !== structureId));
  };

  const updateQuantity = (structureId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(structureId);
      return;
    }
    
    setItems(prev =>
      prev.map(item =>
        item.structure.id === structureId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const updateDuration = (structureId: string, duration: '1day' | '2days' | 'custom', customDays?: number) => {
    setItems(prev =>
      prev.map(item =>
        item.structure.id === structureId
          ? { ...item, duration, customDays }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      // Si au moins un item a une durée custom ou un prix sur mesure, on ne peut pas calculer le total
      if (items.some(i => i.duration === 'custom' || i.structure.customPricing)) {
        return 0; // Retourner 0 pour indiquer un prix sur mesure
      }
      
      let price = item.structure.price;
      let multiplier = 1;
      
      // Si la structure a un prix sur mesure, on ne peut pas calculer
      if (item.structure.customPricing) {
        return 0;
      }
      
      if (item.duration === '2days' && item.structure.price2Days) {
        price = item.structure.price2Days;
      } else if (item.duration === 'custom' && item.customDays) {
        multiplier = item.customDays * 0.9; // Tarif dégressif
      }
      
      const finalPrice = price * multiplier;
      return total + (price * item.quantity);
    }, 0);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      updateDuration,
      clearCart,
      getTotalPrice,
      getItemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};