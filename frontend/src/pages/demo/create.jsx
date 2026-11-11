import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageBanner } from '../../components/PageBanner';
import { ContentSection } from '../../components/ContentSection';
import { Button } from '../../components/ui/Button';
import { DemoBookingForm } from '../../components/DemoBookingForm';

export default function DemoCreatePage() {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <PageBanner
        badge="Dedicated Walkthrough"
        title="Schedule Your Interactive Live Demo"
        subtitle="Experience our platform with real data tailored to your operational workflows."
        breadcrumbs={[
          { label: 'Demo', to: '/demo' },
          { label: 'Schedule Session' },
        ]}
        actions={
          <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="gap-1.5">
            <ArrowLeft size={14} />
            <span>Back</span>
          </Button>
        }
      />

      <ContentSection containerClassName="max-w-6xl">
        <DemoBookingForm />
      </ContentSection>
    </div>
  );
}
