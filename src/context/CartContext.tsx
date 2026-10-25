"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
  selectedColor?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (
    product: Product,
    quantity?: number,
    selectedVariant?: string,
    selectedColor?: string
  ) => void;
  updateQuantity: (
    productId: string,
    quantity: number,
    selectedVariant?: string,
    selectedColor?: string
  ) => void;
  removeFromCart: (
    productId: string,
    selectedVariant?: string,
    selectedColor?: string
  ) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  lastAddedItem: CartItem | null;
  clearLastAddedItem: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "harmony_hub_bag_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to parse cart from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage when items change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch (e) {
        console.error("Failed to save cart to localStorage", e);
      }
    }
  }, [items, isLoaded]);

  const addToCart = (
    product: Product,
    quantity: number = 1,
    selectedVariant?: string,
    selectedColor?: string
  ) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedVariant === selectedVariant &&
          item.selectedColor === selectedColor
      );

      let newItems: CartItem[];
      if (existingIndex > -1) {
        newItems = [...prevItems];
        const newQty = Math.min(
          newItems[existingIndex].quantity + quantity,
          product.stockCount || 99
        );
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newQty,
        };
      } else {
        newItems = [
          ...prevItems,
          {
            product,
            quantity: Math.min(quantity, product.stockCount || 99),
            selectedVariant,
            selectedColor,
          },
        ];
      }
      return newItems;
    });

    setLastAddedItem({ product, quantity, selectedVariant, selectedColor });
  };

  const updateQuantity = (
    productId: string,
    quantity: number,
    selectedVariant?: string,
    selectedColor?: string
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedVariant, selectedColor);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) => {
        if (
          item.product.id === productId &&
          item.selectedVariant === selectedVariant &&
          item.selectedColor === selectedColor
        ) {
          const max = item.product.stockCount || 99;
          return {
            ...item,
            quantity: Math.min(quantity, max),
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = (
    productId: string,
    selectedVariant?: string,
    selectedColor?: string
  ) => {
    setItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedVariant === selectedVariant &&
            item.selectedColor === selectedColor
          )
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const clearLastAddedItem = () => setLastAddedItem(null);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        subtotal,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        lastAddedItem,
        clearLastAddedItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
