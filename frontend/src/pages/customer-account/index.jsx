import React from 'react';
import { PageBanner } from '../../components/PageBanner';
import { ContentSection } from '../../components/ContentSection';
import { CustomerAccountOverview } from '../../components/CustomerAccountOverview';
import { CtaBanner } from '../../components/CtaBanner';
import { SAMPLE_CUSTOMER_ACCOUNT } from '../../api/data';
import { useAuth } from '../../context/AuthContext';

export default function CustomerAccountPage() {
  const { user, logout } = useAuth();

  // Combine authenticated user details if logged in
  const accountData = {
    ...SAMPLE_CUSTOMER_ACCOUNT,
    user: {
      ...SAMPLE_CUSTOMER_ACCOUNT.user,
      ...(user && user.email ? { name: user.name, email: user.email } : {}),
    },
  };

  return (
    <div className="w-full">
      <PageBanner
        title="Enterprise Client Portal"
        subtitle="Manage your active software licenses, cloud database nodes, hardware consignments, and priority support tickets."
        breadcrumbs={[{ label: 'Client Portal' }, { label: 'My Account' }]}
        badge="Enterprise Service Portal"
      />

      <ContentSection>
        <CustomerAccountOverview
          accountData={accountData}
          onLogout={logout}
        />
      </ContentSection>

      <CtaBanner
        badge="Dedicated Support SLA"
        title="Need an Enterprise Systems Expansion or Custom Integration?"
        subtitle="Our Senior Solution Architects are assigned to your corporate account with priority response."
        primaryAction={{ label: 'Open Priority Ticket', to: '/contact/create' }}
        secondaryAction={{ label: 'Explore Addon Modules', to: '/products' }}
      />
    </div>
  );
}

