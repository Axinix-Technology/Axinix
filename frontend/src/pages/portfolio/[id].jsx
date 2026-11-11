import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PORTFOLIO } from '../../api/data';
import { PageBanner } from '../../components/PageBanner';
import { ContentSection } from '../../components/ContentSection';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { ProcessRoadmap } from '../../components/ProcessRoadmap';
import { EmptyState } from '../../components/EmptyState';
import { CtaBanner } from '../../components/CtaBanner';

export default function PortfolioDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = PORTFOLIO.find(p => p.id === id);

  if (!project) {
    return (
      <ContentSection containerClassName="max-w-xl text-center py-20">
        <EmptyState
          title="Case Study Not Located"
          description={`The requested case study "${id}" could not be found.`}
          action={
            <Link to="/portfolio">
              <Button variant="gold" size="md">
                ← Return to Portfolio
              </Button>
            </Link>
          }
        />
      </ContentSection>
    );
  }

  return (
    <div className="w-full">
      <PageBanner
        title={project.title}
        subtitle={`${project.client} · ${project.industry}`}
        badge={project.category}
        breadcrumbs={[
          { label: 'Portfolio', to: '/portfolio' },
          { label: project.title },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate('/portfolio')} className="gap-1.5">
              <ArrowLeft size={14} />
              <span>All Projects</span>
            </Button>
            <Link to="/demo/create">
              <Button variant="gold" size="sm">
                Book a Demo
              </Button>
            </Link>
          </div>
        }
      />

      <ContentSection className="space-y-10">
        {/* Challenge vs Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 sm:p-8 bg-card border border-border/80 border-l-4 border-l-red-400 space-y-3">
            <span className="text-xs font-semibold text-red-400 uppercase tracking-widest block">
              The Operational Bottleneck
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-foreground">
              The Business Challenge
            </h2>
            <p className="text-xs sm:text-sm text-muted/90 leading-relaxed">
              {project.challenge}
            </p>
          </Card>

          <Card className="p-6 sm:p-8 bg-card border border-border/80 border-l-4 border-l-gold space-y-3">
            <span className="text-xs font-semibold text-gold uppercase tracking-widest block">
              The Architecture
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-foreground">
              The Implemented Solution
            </h2>
            <p className="text-xs sm:text-sm text-muted/90 leading-relaxed">
              {project.solution}
            </p>
          </Card>
        </div>

        {/* Measurable Verified Results */}
        <Card className="p-6 sm:p-8 bg-card/50 border border-border/80 space-y-5">
          <div>
            <span className="text-xs font-semibold text-gold tracking-widest uppercase">Quantified Impact</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mt-1">
              Measurable Business Results
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {project.results.map((res, rIdx) => (
              <div key={rIdx} className="bg-deep/70 border border-border/80 rounded-xl p-5 border-t-2 border-t-gold space-y-2">
                <div className="text-2xl font-serif font-bold text-gold">
                  0{rIdx + 1}
                </div>
                <p className="text-xs sm:text-sm text-foreground/90 font-medium leading-relaxed">
                  {res}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* 6-Stage Process Breakdown */}
        {project.process && (
          <div className="space-y-4">
            <div>
              <span className="text-xs font-semibold text-gold tracking-widest uppercase">Methodology</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mt-1">
                Implementation Process
              </h2>
            </div>
            <ProcessRoadmap steps={project.process} />
          </div>
        )}

        {/* Technologies Used */}
        <Card className="p-5 bg-deep/60 border border-border/80 space-y-3">
          <h3 className="text-xs font-serif font-semibold text-foreground uppercase tracking-wider">
            Technologies & Infrastructure Deployed
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t, tIdx) => (
              <Badge key={tIdx} variant="royal" size="md">
                {t}
              </Badge>
            ))}
          </div>
        </Card>
      </ContentSection>

      {/* Reusable CTA */}
      <CtaBanner
        badge="Proven Outcomes"
        title="Achieve Similar Results for Your Business"
        subtitle="Our engineering team will assess your current bottlenecks and present a comprehensive implementation plan."
        primaryAction={{ label: 'Schedule a Solution Demo', to: '/demo/create' }}
        secondaryAction={{ label: 'Contact Our Lead Architects', to: '/contact/create' }}
      />
    </div>
  );
}
