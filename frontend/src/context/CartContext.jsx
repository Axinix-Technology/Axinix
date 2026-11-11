import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const INITIAL_CART = [
  {
    id: 'prod-erp-cloud',
    name: 'AXINIX ERP Cloud - Professional Edition (Annual)',
    sku: 'AX-ERP-CLD-PRO',
    category: 'Enterprise Software Suites',
    price: 48000,
    period: 'year',
    quantity: 1,
    leadTime: 'Instant Cloud Provisioning',
    image: 'Layers',
  },
  {
    id: 'prod-pos-terminal',
    name: 'AXINIX Heavy-Duty Dual-Screen POS Terminal & 80mm Printer Kit',
    sku: 'AX-POS-TRM-80X',
    category: 'Retail & POS Hardware',
    price: 32500,
    period: 'one-time',
    quantity: 1,
    leadTime: 'Ships within 24 Hours via BlueDart',
    image: 'Printer',
  },
];

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('axinix_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_CART;
      }
    }
    return INITIAL_CART;
  });

  const [couponCode, setCouponCode] = useState(() => {
    return localStorage.getItem('axinix_coupon') || 'AXINIX10';
  });

  useEffect(() => {
    localStorage.setItem('axinix_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (couponCode) {
      localStorage.setItem('axinix_coupon', couponCode);
    } else {
      localStorage.removeItem('axinix_coupon');
    }
  }, [couponCode]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
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
          sku: product.sku || product.id,
          category: product.categoryName || product.category || 'Enterprise Solution',
          price: product.price || 0,
          period: product.period || 'one-time',
          quantity,
          leadTime: product.leadTime || 'Standard Delivery',
          image: product.icon || 'Layers',
        },
      ];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setCouponCode('');
  };

  const applyCoupon = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'AXINIX10' || clean === 'ENTERPRISE10' || clean === 'GROWTH10') {
      setCouponCode(clean);
      return { success: true, message: '10% Enterprise discount applied successfully!' };
    }
    if (clean === 'FIRST5000') {
      setCouponCode(clean);
      return { success: true, message: '₹5,000 First-order voucher applied successfully!' };
    }
    return { success: false, message: 'Invalid or expired promotional code. Try AXINIX10.' };
  };

  const removeCoupon = () => {
    setCouponCode('');
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  let discountAmount = 0;
  if (couponCode === 'AXINIX10' || couponCode === 'ENTERPRISE10' || couponCode === 'GROWTH10') {
    discountAmount = Math.round(subtotal * 0.1);
  } else if (couponCode === 'FIRST5000') {
    discountAmount = Math.min(5000, subtotal);
  }

  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxAmount = Math.round(taxableAmount * 0.18); // 18% GST
  const shippingAmount = 0; // Free enterprise courier delivery & cloud setup
  const totalAmount = taxableAmount + taxAmount + shippingAmount;
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        couponCode,
        applyCoupon,
        removeCoupon,
        subtotal,
        discountAmount,
        taxAmount,
        shippingAmount,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

