import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Share2 } from 'lucide-react';
import { INSIGHTS } from '../../api/data';
import { PageBanner } from '../../components/PageBanner';
import { ContentSection } from '../../components/ContentSection';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { ArticleCard } from '../../components/ArticleCard';
import { EmptyState } from '../../components/EmptyState';
import { CtaBanner } from '../../components/CtaBanner';
import { useToast } from '../../context/ToastContext';
import { formatDate } from '../../utils/formatters';

export default function InsightDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const article = INSIGHTS.find(p => p.id === id);

  if (!article) {
    return (
      <ContentSection containerClassName="max-w-xl text-center py-20">
        <EmptyState
          title="Article Not Located"
          description={`The publication identifier "${id}" could not be found.`}
          action={
            <Link to="/insights">
              <Button variant="gold" size="md">
                ← Return to Insights
              </Button>
            </Link>
          }
        />
      </ContentSection>
    );
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article link copied to clipboard!', 'success');
    }
  };

  const relatedArticles = INSIGHTS.filter(a => a.id !== article.id).slice(0, 2);

  return (
    <div className="w-full">
      <PageBanner
        title={article.title}
        subtitle={`By ${article.author} · ${formatDate(article.date)}`}
        badge={article.category}
        breadcrumbs={[
          { label: 'Insights', to: '/insights' },
          { label: article.title },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleShare} className="gap-1.5 py-1">
              <Share2 size={13} />
              <span>Share</span>
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate('/insights')} className="gap-1.5 py-1">
              <ArrowLeft size={13} />
              <span>Back</span>
            </Button>
          </div>
        }
      />

      <ContentSection containerClassName="max-w-4xl space-y-10">
        <Card className="p-6 sm:p-10 bg-card border border-border/80 space-y-6 text-foreground/90 leading-relaxed text-sm sm:text-base">
          <p className="text-base sm:text-lg font-medium text-foreground border-l-4 border-gold pl-4 py-1 italic">
            {article.excerpt}
          </p>

          <div className="space-y-4 whitespace-pre-line text-xs sm:text-sm leading-relaxed text-muted/95 pt-4 border-t border-border/40">
            {article.content}
          </div>

          <div className="pt-6 border-t border-border/40 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted uppercase font-semibold">Tags:</span>
              {article.tags.map((t, idx) => (
                <Badge key={idx} variant="neutral" size="sm">
                  #{t}
                </Badge>
              ))}
            </div>
            <Button variant="gold" size="sm" onClick={handleShare}>
              Share this Publication
            </Button>
          </div>
        </Card>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="space-y-4 pt-2">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-foreground">
              Related Perspectives
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedArticles.map(rel => (
                <ArticleCard key={rel.id} article={rel} />
              ))}
            </div>
          </div>
        )}
      </ContentSection>

      <CtaBanner
        badge="Enterprise Acceleration"
        title="Apply These Strategies to Your Business"
        subtitle="Book an interactive software demonstration tailored to your exact operational workflows."
        primaryAction={{ label: 'Book a Free Demo', to: '/demo/create' }}
        secondaryAction={{ label: 'Talk to Solution Experts', to: '/contact/create' }}
      />
    </div>
  );
}
