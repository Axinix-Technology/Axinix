# State Management & React Contexts

## Overview
State management in the AXINIX frontend is organized across specialized React Context providers located in `src/context/`:

1. **CartContext (`CartContext.jsx`)**:
   - Manages stateful client cart operations: `cartItems`, `cartCount`, `addToCart()`, `removeFromCart()`, `updateQuantity()`, `clearCart()`.
   - Real-time financial calculations: `subtotal`, `discountAmount`, `taxAmount` (18% GST for B2B input credit), `shippingAmount`, and `totalAmount`.
   - Promotional coupon validation engine (`applyCoupon('AXINIX10')`, `removeCoupon()`).
   - LocalStorage persistence under key `axinix_cart`.
   - Pre-seeded with production software and hardware packages to avoid empty screens on first load.

2. **ThemeContext (`ThemeContext.jsx`)**:
   - Manages dark mode and light mode toggling.
   - Defaults to the clean, bright, modern enterprise palette (`'light'`: `#F8FAFC` background with pure white cards `#FFFFFF`, crisp slate typography, and signature deep navy & gold accents).
   - Elevated dark mode option (`'dark'`: `#0F172A` modern slate surface with `#1E293B` cards, preventing murky pitch-black visual fatigue).
   - Synchronizes `data-theme` attribute on document root element and persists user preference in `localStorage`.

3. **ToastContext (`ToastContext.jsx`)**:
   - Provides global non-blocking toast notifications (`success`, `info`, `warning`, `error`).
   - Accessible from any component via `useToast()` hook.
   - Implements auto-dismiss timers and manual close actions.

4. **SettingsContext (`SettingsContext.jsx`)**:
   - Stores enterprise configuration (`phone`, `email`, `address`, social channels, WhatsApp link, Google Maps link).
   - Allows live customization and runtime updates for company branding and metadata.

5. **AuthContext (`AuthContext.jsx`)**:
   - Manages client authentication state, current user session, permissions, and token storage.
   - Supplies `login()`, `logout()`, and `isAuthenticated` primitives to route guards and layout components.
