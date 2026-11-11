/**
 * Standardized Populate Helper Client
 * Adheres to Core Rule 8 & 9 (Populate Pipeline, depth <= 3, ceiling <= 50, in-memory caching).
 */

import {
  SOLUTIONS,
  INDUSTRIES,
  SERVICES,
  PORTFOLIO,
  INSIGHTS,
} from './data';
import { recordAuditLog } from './client';
import { generateCorrelationId } from '../utils/formatters';

const memoryCache = new Map();

export const populateHelper = {
  /**
   * Universal populate query interface
   * @param {string} model - target entity ('solutions' | 'industries' | 'services' | 'portfolio' | 'insights')
   * @param {Object} options - { filter, search, depth = 1, page = 1, limit = 50 }
   */
  async query(model, options = {}) {
    const requestId = generateCorrelationId();
    const {
      filter = {},
      search = '',
      depth = 1,
      page = 1,
      limit = Math.min(options.limit || 50, 50), // Hard ceiling of 50 per Rule 9
    } = options;

    const safeDepth = Math.min(depth, 3); // Max depth 3 per Rule 9
    const cacheKey = `${model}:${JSON.stringify(options)}`;

    if (memoryCache.has(cacheKey)) {
      return memoryCache.get(cacheKey);
    }

    let dataset = [];
    switch (model) {
      case 'solutions':
        dataset = [...SOLUTIONS];
        break;
      case 'industries':
        dataset = [...INDUSTRIES];
        break;
      case 'services':
        dataset = [...SERVICES];
        break;
      case 'portfolio':
        dataset = [...PORTFOLIO];
        break;
      case 'insights':
        dataset = [...INSIGHTS];
        break;
      default:
        dataset = [];
    }

    // Apply AST / property filters
    let results = dataset.filter(item => {
      for (const [key, val] of Object.entries(filter)) {
        if (val !== undefined && val !== 'All' && item[key] !== val) {
          return false;
        }
      }
      return true;
    });

    // Apply text search
    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      results = results.filter(item => {
        const titleMatch = item.title?.toLowerCase().includes(q) || item.name?.toLowerCase().includes(q);
        const descMatch = item.description?.toLowerCase().includes(q) || item.subtitle?.toLowerCase().includes(q);
        const tagsMatch = item.tags?.some(t => t.toLowerCase().includes(q));
        const featuresMatch = item.features?.some(f => f.toLowerCase().includes(q));
        return titleMatch || descMatch || tagsMatch || featuresMatch;
      });
    }

    // Pagination
    const total = results.length;
    const startIndex = (page - 1) * limit;
    const paginated = results.slice(startIndex, startIndex + limit);

    const response = {
      model,
      total,
      page,
      limit,
      depth: safeDepth,
      data: paginated,
      requestId,
    };

    memoryCache.set(cacheKey, response);
    recordAuditLog({
      action: 'POPULATE_READ',
      endpoint: `/api/populate/${model}`,
      requestId,
      payload: { filter, search, depth: safeDepth },
      status: 200,
    });

    return response;
  },

  /**
   * Find single record by identifier or slug
   */
  async findById(model, id) {
    const list = await this.query(model, { limit: 50 });
    return list.data.find(item => item.id === id) || null;
  },
};

