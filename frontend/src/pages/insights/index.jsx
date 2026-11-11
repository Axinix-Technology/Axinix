import React, { useState } from 'react';
import { INSIGHTS } from '../../api/data';
import { PageBanner } from '../../components/PageBanner';
import { ContentSection } from '../../components/ContentSection';
import { SearchFilterBar } from '../../components/SearchFilterBar';
import { ArticleCard } from '../../components/ArticleCard';
import { EmptyState } from '../../components/EmptyState';
import { CtaBanner } from '../../components/CtaBanner';

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', ...new Set(INSIGHTS.map(i => i.category))];

  const filteredInsights = INSIGHTS.filter(post => {
    const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      !search.trim() ||
      post.title.toLowerCase().includes(search.toLowerCase().trim()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase().trim()) ||
      post.tags.some(t => t.toLowerCase().includes(search.toLowerCase().trim()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full">
      <PageBanner
        title="Insights & Technology Perspectives"
        subtitle="Practical strategies, technical deep-dives, and operational playbooks to help your business scale efficiently."
        breadcrumbs={[{ label: 'Insights' }]}
        badge="Knowledge Vault"
      />

      <ContentSection>
        <SearchFilterBar
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search articles by title, topic, or keyword..."
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          count={filteredInsights.length}
          countLabel="articles"
        />

        {filteredInsights.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            {filteredInsights.map(post => (
              <ArticleCard key={post.id} article={post} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No articles found matching your search"
            onReset={() => {
              setSelectedCategory('All');
              setSearch('');
            }}
          />
        )}
      </ContentSection>

      <CtaBanner
        badge="Enterprise Editorial"
        title="Subscribe to AXINIX Systems Engineering Digest"
        subtitle="Receive curated architecture teardowns, retail operational tips, and software benchmarks every fortnight."
        primaryAction={{ label: 'Subscribe via Email', to: '/contact/create' }}
        secondaryAction={{ label: 'Explore Products', to: '/products' }}
      />
    </div>
  );
}
