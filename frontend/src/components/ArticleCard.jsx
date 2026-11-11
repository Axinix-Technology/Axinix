import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { formatDate } from '../utils/formatters';

export function ArticleCard({ article }) {
  if (!article) return null;

  return (
    <Link to={`/insights/${article.id}`} className="group block h-full">
      <Card interactive className="h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <Badge variant="gold" size="sm">{article.category}</Badge>
            <div className="flex items-center gap-1 text-[11px] text-muted">
              <Clock size={12} />
              <span>{article.readTime}</span>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-semibold text-foreground group-hover:text-gold transition-colors mb-3">
            {article.title}
          </h3>
          <p className="text-xs sm:text-sm text-muted leading-relaxed mb-6">
            {article.excerpt}
          </p>
        </div>

        <div className="pt-4 border-t border-border/40 flex items-center justify-between text-xs">
          <span className="text-muted">{article.author} · {formatDate(article.date)}</span>
          <span className="text-gold font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>Read article</span>
            <ArrowRight size={13} />
          </span>
        </div>
      </Card>
    </Link>
  );
}

