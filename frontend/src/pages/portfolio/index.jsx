import React, { useState } from 'react';
import { PORTFOLIO } from '../../api/data';
import { PageBanner } from '../../components/PageBanner';
import { ContentSection } from '../../components/ContentSection';
import { SearchFilterBar } from '../../components/SearchFilterBar';
import { PortfolioCard } from '../../components/PortfolioCard';
import { EmptyState } from '../../components/EmptyState';
import { CtaBanner } from '../../components/CtaBanner';

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', ...new Set(PORTFOLIO.map(p => p.category))];

  const filteredProjects = PORTFOLIO.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      !search.trim() ||
      p.title.toLowerCase().includes(search.toLowerCase().trim()) ||
      p.client.toLowerCase().includes(search.toLowerCase().trim()) ||
      p.industry.toLowerCase().includes(search.toLowerCase().trim()) ||
      p.tags.some(t => t.toLowerCase().includes(search.toLowerCase().trim()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full">
      <PageBanner
        title="Real Solutions. Meaningful Business Impact."
        subtitle="Explore our representative implementations, digital storefronts, high-throughput retail deployments, and custom business platforms."
        breadcrumbs={[{ label: 'Portfolio' }]}
        badge="Proven Deployments"
      />

      <ContentSection>
        <SearchFilterBar
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search case studies, industries, technologies..."
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          count={filteredProjects.length}
          countLabel="case studies"
        />

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            {filteredProjects.map(prj => (
              <PortfolioCard key={prj.id} project={prj} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No case studies match your search criteria"
            onReset={() => {
              setSelectedCategory('All');
              setSearch('');
            }}
          />
        )}
      </ContentSection>

      <CtaBanner
        badge="Your Vision. Our Engineering."
        title="Ready to Build Your Organization's Next Success Story?"
        subtitle="Consult directly with our solution architects to scope your roadmap and system specs."
        primaryAction={{ label: 'Start Your Project', to: '/contact/create' }}
        secondaryAction={{ label: 'Schedule Technical Demo', to: '/demo/create' }}
      />
    </div>
  );
}
