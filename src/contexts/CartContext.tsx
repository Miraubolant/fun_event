import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Structure } from '../types';

interface CartItem {
  structure: Structure;
  quantity: number;
  duration: '1day' | '2days';
}

interface CartContextType {
  items: CartItem[];
  addToCart: (structure: Structure, duration?: '1day' | '2days') => void;
  removeFromCart: (structureId: string) => void;
  updateQuantity: (structureId: string, quantity: number) => void;
  updateDuration: (structureId: string, duration: '1day' | '2days') => void;
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

  const addToCart = (structure: Structure, duration: '1day' | '2days' = '1day') => {
    setItems(prev => {
      const existingItem = prev.find(item => 
        item.structure.id === structure.id && item.duration === duration
      );
      
      if (existingItem) {
        return prev.map(item =>
          item.structure.id === structure.id && item.duration === duration
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prev, { structure, quantity: 1, duration }];
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

  const updateDuration = (structureId: string, duration: '1day' | '2days') => {
    setItems(prev =>
      prev.map(item =>
        item.structure.id === structureId
          ? { ...item, duration }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const price = item.duration === '2days' && item.structure.price2Days 
        ? item.structure.price2Days 
        : item.structure.price;
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