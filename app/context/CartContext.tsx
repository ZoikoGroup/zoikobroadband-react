"use client";

import { createContext, useContext, useEffect, useState } from "react";

type FormattedAddress = {
  id: string;
  display: string;
  streetNr: string;
  streetName: string;
  city: string;
  postcode: string;
  districtCode: string;
  uprn: string;
  exchangeGroupCode: string;
  qualifier: string;
};

//  Define FULL plan structure (IMPORTANT)
type Plan = {
  id: string;
  name: string;
  price: number;
  speed: string;
  validity?: string;
  description?: string;
  address?: FormattedAddress | null; // Store full address object or just display string
};

//  Context Type
type CartContextType = {
  cart: Plan[];
  addToCart: (plan: Plan) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

//  Provider
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Plan[]>([]);

  // Load from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cart");
      if (stored) setCart(JSON.parse(stored));
    }
  }, []);

  //  Sync to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  //  Add plan (with full details)
  const addToCart = (plan: Plan) => {
    setCart([]);
    setCart((prev) => {
      const exists = prev.find((item) => item.id === plan.id);
      if (exists) return prev;
      return [...prev, plan];
    });
  };

  //  Remove plan
  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  //  Clear cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

//  Hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};