import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { SOLUTIONS, INDUSTRIES, SERVICES, PRODUCTS, PORTFOLIO, INSIGHTS } from '../../api/data';
import { PageBanner } from '../../components/PageBanner';
import { ContentSection } from '../../components/ContentSection';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/EmptyState';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams(query.trim() ? { q: query.trim() } : {});
  };

  const q = query.toLowerCase().trim();

  const allResults = [
    ...SOLUTIONS.map(s => ({
      id: s.id,
      title: s.title,
      type: 'Solution',
      to: `/solutions/${s.id}`,
      description: s.subtitle,
      tags: s.features,
    })),
    ...PRODUCTS.map(p => ({
      id: p.id,
      title: p.name,
      type: 'Product',
      to: `/products`,
      description: p.tagline,
      tags: p.features,
    })),
    ...INDUSTRIES.map(i => ({
      id: i.id,
      title: i.name,
      type: 'Industry',
      to: `/industries/${i.id}`,
      description: i.subtitle,
      tags: i.features,
    })),
    ...SERVICES.map(s => ({
      id: s.id,
      title: s.title,
      type: 'Service',
      to: `/services/${s.id}`,
      description: s.subtitle,
      tags: s.deliverables,
    })),
    ...PORTFOLIO.map(p => ({
      id: p.id,
      title: p.title,
      type: 'Portfolio',
      to: `/portfolio/${p.id}`,
      description: p.client + ' — ' + p.challenge,
      tags: p.tags,
    })),
    ...INSIGHTS.map(a => ({
      id: a.id,
      title: a.title,
      type: 'Article',
      to: `/insights/${a.id}`,
      description: a.excerpt,
      tags: a.tags,
    })),
  ];

  const filteredResults = allResults.filter(item => {
    const matchesFilter = activeFilter === 'All' || item.type === activeFilter;
    if (!matchesFilter) return false;
    if (!q) return true;

    return (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      (item.tags && item.tags.some(t => t.toLowerCase().includes(q)))
    );
  });

  const getBadgeVariant = (type) => {
    switch (type) {
      case 'Solution': return 'gold';
      case 'Product': return 'gold';
      case 'Industry': return 'royal';
      case 'Service': return 'soft';
      case 'Portfolio': return 'success';
      default: return 'neutral';
    }
  };

  return (
    <div className="w-full">
      <PageBanner
        title="Unified Enterprise Search"
        subtitle="Search across all software suites, hardware kits, industry verticals, services, and technical publications."
        breadcrumbs={[{ label: 'Search' }]}
        badge="Global Search Index"
      >
        <form onSubmit={handleSearchSubmit} className="relative mt-4 max-w-xl">
          <input
            type="text"
            placeholder="Type keyword, product, or phrase..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-card border border-border/80 rounded-xl py-3 pl-11 pr-24 text-sm text-foreground focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold shadow-xl"
          />
          <Search size={16} className="absolute left-3.5 top-3.5 text-muted pointer-events-none" />
          <Button
            type="submit"
            variant="gold"
            size="sm"
            className="absolute right-2 top-2 px-3"
          >
            Search
          </Button>
        </form>
      </PageBanner>

      <ContentSection containerClassName="max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border/60">
          <div className="flex flex-wrap gap-2">
            {['All', 'Solution', 'Product', 'Industry', 'Service', 'Portfolio', 'Article'].map((tab, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveFilter(tab)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeFilter === tab
                    ? 'bg-royal text-white border border-royal shadow-sm'
                    : 'bg-card border border-border/80 text-muted hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="text-xs text-muted">
            Found <b className="text-gold">{filteredResults.length}</b> result{filteredResults.length !== 1 ? 's' : ''}
          </div>
        </div>

        {filteredResults.length > 0 ? (
          <div className="space-y-3 pt-6">
            {filteredResults.map((item, idx) => (
              <Link key={idx} to={item.to} className="block group">
                <Card interactive className="p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <Badge variant={getBadgeVariant(item.type)} size="sm">
                      {item.type}
                    </Badge>
                    <ArrowRight size={14} className="text-muted group-hover:text-gold group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-base font-serif font-semibold text-foreground group-hover:text-gold transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted line-clamp-2 leading-relaxed mt-1">
                    {item.description}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="pt-6">
            <EmptyState
              title={`No results found for "${query}"`}
              description="Try adjusting your keywords or category filters."
              onReset={() => {
                setQuery('');
                setActiveFilter('All');
              }}
              resetLabel="Reset Search"
            />
          </div>
        )}
      </ContentSection>
    </div>
  );
}
