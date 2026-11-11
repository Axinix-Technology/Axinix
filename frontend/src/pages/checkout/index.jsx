import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageBanner } from '../../components/PageBanner';
import { ContentSection } from '../../components/ContentSection';
import { CheckoutForm } from '../../components/CheckoutForm';
import { OrderSummaryCard } from '../../components/OrderSummaryCard';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

export default function CheckoutPage() {
  const {
    cartItems,
    cartCount,
    subtotal,
    discountAmount,
    taxAmount,
    shippingAmount,
    totalAmount,
    couponCode,
    clearCart,
  } = useCart();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handlePlaceOrder = (formData) => {
    setIsSubmitting(true);
    // Simulate real order processing
    setTimeout(() => {
      setIsSubmitting(false);
      clearCart();
      showToast('Order confirmed! GST invoice & license details sent to your corporate email.', 'success');
      navigate('/customer-account');
    }, 1200);
  };

  return (
    <div className="w-full">
      <PageBanner
        title="Secure Corporate Order Placement"
        subtitle="Finalize your business billing details, GSTIN credit parameters, and logistics dispatch."
        breadcrumbs={[
          { label: 'Cart', to: '/cart' },
          { label: 'Checkout' },
        ]}
        badge="256-Bit SSL Encrypted"
      />

      <ContentSection>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Multi-Step Form */}
          <div className="lg:col-span-8">
            <CheckoutForm
              onSubmitOrder={handlePlaceOrder}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* Sticky Summary Breakdown with GST ITC Calculator */}
          <div className="lg:col-span-4">
            <OrderSummaryCard
              subtotal={subtotal}
              discountAmount={discountAmount}
              taxAmount={taxAmount}
              shippingAmount={shippingAmount}
              totalAmount={totalAmount}
              couponCode={couponCode}
              onCheckout={() => {
                const form = document.querySelector('form');
                if (form) form.requestSubmit();
              }}
              checkoutButtonText={isSubmitting ? 'Processing Order...' : 'Confirm & Place Order'}
              isCheckoutPage={true}
              disabled={isSubmitting || totalAmount <= 0}
            />
          </div>
        </div>
      </ContentSection>
    </div>
  );
}
