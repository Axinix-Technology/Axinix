import React from 'react';
import { SOLUTIONS, SERVICES } from '../../api/data';
import { HeroBanner } from '../../components/HeroBanner';
import { StatsSection } from '../../components/StatsSection';
import { ContentSection } from '../../components/ContentSection';
import { SolutionCard } from '../../components/SolutionCard';
import { ServiceCard } from '../../components/ServiceCard';
import { WhyChooseUsGrid } from '../../components/WhyChooseUsGrid';
import { ProcessRoadmap } from '../../components/ProcessRoadmap';
import { TestimonialSlider } from '../../components/TestimonialSlider';
import { CtaBanner } from '../../components/CtaBanner';

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 1. Reusable Hero Banner */}
      <HeroBanner />

      {/* 2. Operational Metrics Section */}
      <StatsSection />

      {/* 3. Enterprise Software Solutions Section */}
      <ContentSection
        badge="Enterprise Software"
        title="Everything Your Business Needs. All in One Place."
        subtitle="Intelligent modular software designed to eliminate manual re-entry, connect multi-branch operations, and provide clear executive visibility."
        actionText="View All 8 Solutions"
        actionTo="/solutions"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SOLUTIONS.map(sol => (
            <SolutionCard key={sol.id} solution={sol} />
          ))}
        </div>
      </ContentSection>

      {/* 4. Services Section */}
      <ContentSection
        badge="Digital Capabilities"
        title="From Digital Presence to Digital Growth"
        subtitle="Comprehensive technology services spanning modern web development, mobile applications, e-commerce, and targeted marketing campaigns."
        actionText="All Services"
        actionTo="/services"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map(srv => (
            <ServiceCard key={srv.id} service={srv} />
          ))}
        </div>
      </ContentSection>

      {/* 5. Why Choose AXINIX */}
      <ContentSection
        bg="deep"
        centered
        badge="The Axinix Advantage"
        title="More Than Technology. A Partner in Your Growth."
        subtitle="We stand apart through our deep operational immersion, responsive human support, and engineered software scalability."
      >
        <WhyChooseUsGrid />
      </ContentSection>

      {/* 6. Working Process Roadmap */}
      <ContentSection
        centered
        badge="Methodology"
        title="Our Working Process"
        subtitle="A structured, disciplined 6-stage engineering lifecycle ensuring on-time delivery and predictable results."
      >
        <ProcessRoadmap />
      </ContentSection>

      {/* 7. Testimonials Section */}
      <ContentSection
        bg="card"
        centered
        badge="Client Trust"
        title="What Our Clients Say"
        containerClassName="max-w-4xl"
      >
        <TestimonialSlider />
      </ContentSection>

      {/* 8. High-Impact CTA Banner */}
      <CtaBanner />
    </div>
  );
}
