import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  perfumeId: string;
  brand: string;
  name: string;
  image: string;
  price: number;
  volume: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  addToCart: (perfumeId: string, perfume: any, volume?: string) => void;
  updateQuantity: (perfumeId: string, quantity: number) => void;
  removeFromCart: (perfumeId: string) => void;
  clearCart: () => void;
  getItemQuantity: (perfumeId: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        setItems(cartItems);
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const addToCart = (
    perfumeId: string,
    perfume: any,
    volume: string = "50ml",
  ) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.perfumeId === perfumeId,
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.perfumeId === perfumeId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        const newItem: CartItem = {
          id: `${perfumeId}-${Date.now()}`,
          perfumeId,
          brand: perfume.brand,
          name: perfume.name,
          image: perfume.image,
          price: perfume.price,
          volume,
          quantity: 1,
        };
        return [...prevItems, newItem];
      }
    });
  };

  const updateQuantity = (perfumeId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(perfumeId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.perfumeId === perfumeId ? { ...item, quantity } : item,
      ),
    );
  };

  const removeFromCart = (perfumeId: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.perfumeId !== perfumeId),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemQuantity = (perfumeId: string): number => {
    const item = items.find((item) => item.perfumeId === perfumeId);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalAmount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
