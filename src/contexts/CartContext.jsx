import { createContext, useState, useEffect, useCallback, useMemo } from "react";

const CartContext = createContext();

const CART_STORAGE_KEY = "cart";

const loadCartFromStorage = () => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return [];
  }
};

const saveCartToStorage = (cartItems) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => loadCartFromStorage());
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    saveCartToStorage(cartItems);
  }, [cartItems]);

  const addToCart = useCallback((product, quantity = 1) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.discountPrice > 0 && product.discountPrice < product.price 
            ? product.discountPrice 
            : product.price,
          originalPrice: product.price,
          thumbnail: product.thumbnail,
          quantity: quantity,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const increaseQuantity = useCallback((productId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }, []);

  const decreaseQuantity = useCallback((productId) => {
    setCartItems((prev) => {
      const item = prev.find((i) => i.id === productId);
      if (item && item.quantity === 1) {
        return prev.filter((i) => i.id !== productId);
      }
      return prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setPromoCode("");
    setDiscount(0);
  }, []);

  const applyPromoCode = useCallback((code) => {
    // Demo promo codes
    const promoCodes = {
      "GIAM10": 10,
      "GIAM20": 20,
      "SALE30": 30,
    };
    
    const upperCode = code.toUpperCase();
    if (promoCodes[upperCode]) {
      setPromoCode(upperCode);
      setDiscount(promoCodes[upperCode]);
      return { success: true, discount: promoCodes[upperCode] };
    }
    return { success: false, discount: 0 };
  }, []);

  const removePromoCode = useCallback(() => {
    setPromoCode("");
    setDiscount(0);
  }, []);

  const getTotalItems = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const getSubtotal = useCallback(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  const getOriginalTotal = useCallback(() => {
    return cartItems.reduce(
      (total, item) => total + (item.originalPrice || item.price) * item.quantity,
      0
    );
  }, [cartItems]);

  const getDiscountAmount = useCallback(() => {
    return Math.round(getSubtotal() * discount / 100);
  }, [getSubtotal, discount]);

  const getShipping = useCallback(() => {
    const subtotal = getSubtotal();
    if (subtotal >= 500000) return 0; // Free shipping over 500k
    return 30000; // Base shipping fee
  }, [getSubtotal]);

  const getTotalPrice = useCallback(() => {
    return getSubtotal() - getDiscountAmount() + getShipping();
  }, [getSubtotal, getDiscountAmount, getShipping]);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getSubtotal,
    getOriginalTotal,
    getShipping,
    getDiscountAmount,
    promoCode,
    discount,
    applyPromoCode,
    removePromoCode,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
