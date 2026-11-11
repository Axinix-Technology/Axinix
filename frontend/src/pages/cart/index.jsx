import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageBanner } from '../../components/PageBanner';
import { ContentSection } from '../../components/ContentSection';
import { CartItemList } from '../../components/CartItemList';
import { OrderSummaryCard } from '../../components/OrderSummaryCard';
import { CtaBanner } from '../../components/CtaBanner';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

export default function CartPage() {
  const {
    cartItems,
    cartCount,
    updateQuantity,
    removeFromCart,
    clearCart,
    couponCode,
    applyCoupon,
    removeCoupon,
    subtotal,
    discountAmount,
    taxAmount,
    shippingAmount,
    totalAmount,
  } = useCart();

  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      showToast('Your cart is empty. Add a product first.', 'warning');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="w-full">
      <PageBanner
        title="Enterprise Cart & Solution Configurator"
        subtitle="Review selected software licenses, cloud tiers, and hardware POS equipment prior to corporate order placement."
        breadcrumbs={[{ label: 'Cart' }]}
        badge="Secure Order Desk"
      />

      <ContentSection>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <CartItemList
              items={cartItems}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeFromCart}
              onClearCart={clearCart}
            />
          </div>

          <div className="lg:col-span-4">
            <OrderSummaryCard
              subtotal={subtotal}
              discountAmount={discountAmount}
              taxAmount={taxAmount}
              shippingAmount={shippingAmount}
              totalAmount={totalAmount}
              couponCode={couponCode}
              onApplyCoupon={applyCoupon}
              onRemoveCoupon={removeCoupon}
              onCheckout={handleCheckout}
              checkoutButtonText={`Proceed to Checkout (${cartCount} items)`}
              disabled={cartItems.length === 0}
            />
          </div>
        </div>
      </ContentSection>

      <CtaBanner
        badge="Custom Enterprise Package?"
        title="Need a Multi-Branch Quote or Custom Hardware Config?"
        subtitle="Our systems architects will prepare a tailored enterprise quotation within 4 business hours."
        primaryAction={{ label: 'Request Corporate Quote', to: '/contact/create' }}
        secondaryAction={{ label: 'Schedule Live Demo', to: '/demo/create' }}
      />
    </div>
  );
}

