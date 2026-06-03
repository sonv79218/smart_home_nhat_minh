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

// Tạo unique key cho cart item (productId + variantId nếu có)
const getCartItemKey = (item) => {
  if (item.variantId) {
    return `${item.id}-${item.variantId}`;
  }
  return item.id;
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
      const itemKey = getCartItemKey(product);
      
      // Tìm item theo key (id hoặc id-variantId)
      const existingItem = prev.find((item) => getCartItemKey(item) === itemKey);
      
      if (existingItem) {
        return prev.map((item) =>
          getCartItemKey(item) === itemKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      // Thêm item mới với đầy đủ thông tin variant
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          thumbnail: product.thumbnail,
          // Variant info
          ...(product.variantId && {
            variantId: product.variantId,
            sku: product.sku,
            optionValues: product.optionValues || [],
          }),
          // Pricing - dùng price là giá bán, originalPrice là giá gốc
          price: product.price || 0,
          originalPrice: product.originalPrice || product.price || 0,
          quantity: quantity,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((itemKey) => {
    setCartItems((prev) => prev.filter((item) => getCartItemKey(item) !== itemKey));
  }, []);

  const removeMultipleFromCart = useCallback((itemKeys) => {
    setCartItems((prev) =>
      prev.filter((item) => !itemKeys.includes(getCartItemKey(item)))
    );
  }, []);

  const increaseQuantity = useCallback((itemKey) => {
    setCartItems((prev) =>
      prev.map((item) =>
        getCartItemKey(item) === itemKey
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }, []);

  const decreaseQuantity = useCallback((itemKey) => {
    setCartItems((prev) => {
      const item = prev.find((i) => getCartItemKey(i) === itemKey);
      if (item && item.quantity === 1) {
        return prev.filter((i) => getCartItemKey(i) !== itemKey);
      }
      return prev.map((item) =>
        getCartItemKey(item) === itemKey
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  }, []);

  const updateQuantity = useCallback((itemKey, quantity) => {
    if (quantity < 1) {
      removeFromCart(itemKey);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        getCartItemKey(item) === itemKey ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setPromoCode("");
    setDiscount(0);
  }, []);

  const applyPromoCode = useCallback((code) => {
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
    if (subtotal >= 500000) return 0;
    return 30000;
  }, [getSubtotal]);

  const getTotalPrice = useCallback(() => {
    return getSubtotal() - getDiscountAmount() + getShipping();
  }, [getSubtotal, getDiscountAmount, getShipping]);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    removeMultipleFromCart,
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
    getCartItemKey,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
