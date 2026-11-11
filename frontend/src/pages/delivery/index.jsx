import React from 'react';
import { PageBanner } from '../../components/PageBanner';
import { ContentSection } from '../../components/ContentSection';
import { DeliveryTracker } from '../../components/DeliveryTracker';
import { CtaBanner } from '../../components/CtaBanner';
import { SAMPLE_DELIVERY_TRACKING } from '../../api/data';

export default function DeliveryTrackingPage() {
  return (
    <div className="w-full">
      <PageBanner
        title="Live Hardware Dispatch & Delivery Tracking"
        subtitle="Real-time GPS logistics tracking for your POS terminals, barcode scanners, and enterprise hardware consignments."
        breadcrumbs={[{ label: 'Orders' }, { label: 'Track Delivery' }]}
        badge="Real-Time Logistics Telemetry"
      />

      <ContentSection>
        <DeliveryTracker initialTrackingData={SAMPLE_DELIVERY_TRACKING} />
      </ContentSection>

      <CtaBanner
        badge="Enterprise Guarantee"
        title="Hardware Pre-Tested & Configured Prior to Dispatch"
        subtitle="All terminals undergo burn-in tests and come pre-flashed with your organization credentials."
        primaryAction={{ label: 'Order More Terminals', to: '/category/retail-hardware' }}
        secondaryAction={{ label: 'View Your Invoices', to: '/customer-account' }}
      />
    </div>
  );
}

