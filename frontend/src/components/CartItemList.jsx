import React from 'react';
import { Trash2, Plus, Minus, ArrowRight, PackageCheck, ShoppingBag, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { IconRenderer } from './IconRenderer';
import { formatCurrency } from '../utils/formatters';
import { PRODUCTS } from '../api/data';

export function CartItemList({
  items = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onAddToCart,
}) {
  if (!items || items.length === 0) {
    const featuredPicks = PRODUCTS.slice(0, 3);

    return (
      <div className="space-y-6">
        <Card className="p-8 text-center space-y-4 bg-card border-dashed border-2 border-border/80">
          <div className="w-16 h-16 rounded-full bg-gold/15 text-gold mx-auto flex items-center justify-center shadow-inner">
            <ShoppingBag size={28} />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-serif font-bold text-foreground">Your Enterprise Cart is Empty</h3>
            <p className="text-xs text-muted max-w-md mx-auto leading-relaxed">
              No software licenses or hardware components selected yet. Pick from our verified best-selling packages below or explore the full catalog.
            </p>
          </div>
          <div className="pt-2">
            <Link to="/products">
              <Button size="sm" variant="gold" className="gap-2 font-semibold shadow-gold/20">
                <span>Explore Commercial Store</span>
                <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
        </Card>

        {/* Empty Cart Recovery: Quick Add Picks */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
              <Sparkles size={13} className="text-gold" />
              <span>Recommended Solutions for Fast Procurement</span>
            </span>
            <Link to="/products" className="text-xs text-gold hover:underline font-semibold">
              View all products →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredPicks.map(prod => (
              <Card key={prod.id} className="p-4 bg-card border border-border/80 flex flex-col justify-between space-y-3 hover:border-gold/50 transition-all">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-muted">{prod.sku}</span>
                    <Badge variant="gold" size="sm" className="text-[9px]">
                      {prod.badge || 'Popular'}
                    </Badge>
                  </div>
                  <h4 className="text-xs font-semibold text-foreground line-clamp-1">{prod.name}</h4>
                  <p className="text-[11px] text-muted line-clamp-2">{prod.tagline}</p>
                </div>
                <div className="pt-2 border-t border-border/60 flex items-center justify-between">
                  <span className="font-serif font-bold text-sm text-foreground">
                    {formatCurrency(prod.price)}
                  </span>
                  <Link to="/products">
                    <Button size="sm" variant="outline" className="text-xs hover:border-gold">
                      Configure
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-border/60">
        <span className="text-xs font-bold text-muted uppercase tracking-wider">
          Items in Order ({items.reduce((acc, i) => acc + i.quantity, 0)} units)
        </span>
        <button
          type="button"
          onClick={onClearCart}
          className="text-xs text-muted hover:text-rose-400 transition-colors inline-flex items-center gap-1 font-medium"
        >
          <Trash2 size={13} />
          <span>Clear All</span>
        </button>
      </div>

      <div className="space-y-3">
        {items.map(item => (
          <Card
            key={item.id}
            className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card hover:border-gold/40 transition-all shadow-xs"
          >
            {/* Item Details */}
            <div className="flex items-start gap-3.5 flex-1 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-royal/15 border border-royal/30 text-gold flex items-center justify-center shrink-0 mt-0.5 shadow-inner">
                <IconRenderer name={item.image || 'Layers'} size={22} />
              </div>
              <div className="min-w-0 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-sm font-semibold text-foreground truncate">{item.name}</h4>
                  <Badge variant="outline" size="sm" className="text-[10px]">
                    {item.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-muted">
                  <span className="font-mono">SKU: {item.sku}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    {item.leadTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Price & Quantity Controls */}
            <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/40">
              {/* Stepper */}
              <div className="flex items-center rounded-lg border border-border/80 bg-deep/60 dark:bg-black/30 overflow-hidden shadow-xs">
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  className="p-1.5 px-2.5 text-muted hover:text-foreground hover:bg-white/10 transition-colors focus:outline-none"
                  aria-label="Decrease quantity"
                >
                  <Minus size={13} />
                </button>
                <span className="px-3 text-xs font-semibold text-foreground min-w-[28px] text-center font-mono">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="p-1.5 px-2.5 text-muted hover:text-foreground hover:bg-white/10 transition-colors focus:outline-none"
                  aria-label="Increase quantity"
                >
                  <Plus size={13} />
                </button>
              </div>

              {/* Subtotal */}
              <div className="text-right min-w-[100px]">
                <div className="text-base font-bold font-serif text-foreground">
                  {formatCurrency(item.price * item.quantity)}
                </div>
                {item.quantity > 1 && (
                  <div className="text-[10px] text-muted font-mono">
                    {formatCurrency(item.price)} each
                  </div>
                )}
              </div>

              {/* Remove button */}
              <button
                type="button"
                onClick={() => onRemoveItem(item.id)}
                className="p-2 text-muted hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-colors"
                title="Remove item"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
