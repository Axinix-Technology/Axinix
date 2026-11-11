import React, { useState } from 'react';
import { ArrowRight, Tag, ShieldCheck, CheckCircle2, X, Calculator, Percent, Sparkles, Building2 } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { formatCurrency } from '../utils/formatters';

export function OrderSummaryCard({
  subtotal = 0,
  discountAmount = 0,
  taxAmount = 0,
  shippingAmount = 0,
  totalAmount = 0,
  couponCode = '',
  onApplyCoupon,
  onRemoveCoupon,
  onCheckout,
  checkoutButtonText = 'Proceed to Checkout',
  isCheckoutPage = false,
  disabled = false,
}) {
  const [inputCode, setInputCode] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [claimGstCredit, setClaimGstCredit] = useState(true);

  const handleApply = (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = onApplyCoupon(inputCode.trim());
    setFeedback(res);
    if (res.success) {
      setInputCode('');
    }
  };

  const handleQuickApply = (code) => {
    const res = onApplyCoupon(code);
    setFeedback(res);
  };

  // B2B GST ITC calculation: If business claims ITC, the effective business cost excludes the 18% GST component
  const effectiveCost = Math.max(0, totalAmount - (claimGstCredit ? taxAmount : 0));

  return (
    <Card className="p-5 sm:p-6 bg-card border border-border/80 space-y-5 sticky top-24 shadow-md">
      <div className="flex items-center justify-between pb-3 border-b border-border/60">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
          <span>Order Summary</span>
        </h3>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
          GST Compliant
        </span>
      </div>

      {/* Financial Line Items */}
      <div className="space-y-2.5 text-xs">
        <div className="flex items-center justify-between text-muted">
          <span>Subtotal</span>
          <span className="font-semibold text-foreground font-mono">{formatCurrency(subtotal)}</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex items-center justify-between text-emerald-400">
            <span className="flex items-center gap-1 font-medium">
              <Tag size={12} />
              <span>Discount Applied</span>
            </span>
            <span className="font-semibold font-mono">-{formatCurrency(discountAmount)}</span>
          </div>
        )}

        <div className="flex items-center justify-between text-muted">
          <span className="flex items-center gap-1">
            <span>GST (18% Statutory Rate)</span>
          </span>
          <span className="font-semibold text-foreground font-mono">{formatCurrency(taxAmount)}</span>
        </div>

        <div className="flex items-center justify-between text-muted">
          <span>Enterprise Freight & Cloud Setup</span>
          <span className="text-emerald-400 font-semibold uppercase text-[10px] tracking-wide">
            {shippingAmount === 0 ? 'Free of Charge' : formatCurrency(shippingAmount)}
          </span>
        </div>

        {/* Gross Total Amount */}
        <div className="pt-3 border-t border-border/80 flex items-baseline justify-between text-sm">
          <div>
            <span className="font-bold text-foreground">Total Invoiced Amount</span>
            <span className="block text-[10px] text-muted">Payable amount with 18% GST</span>
          </div>
          <div className="text-right">
            <span className="text-xl font-serif font-bold text-gold">
              {formatCurrency(totalAmount)}
            </span>
          </div>
        </div>
      </div>

      {/* B2B GST Input Credit Calculator Callout */}
      <div className="p-3.5 rounded-xl bg-deep/80 dark:bg-black/40 border border-royal/30 space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={claimGstCredit}
              onChange={(e) => setClaimGstCredit(e.target.checked)}
              className="rounded border-border text-gold focus:ring-gold"
            />
            <span className="text-xs font-semibold text-foreground flex items-center gap-1">
              <Building2 size={13} className="text-gold" />
              <span>B2B GST Input Credit (ITC)</span>
            </span>
          </label>
          <span className="text-[10px] font-mono text-emerald-400 font-bold">18% Eligible</span>
        </div>

        {claimGstCredit ? (
          <div className="text-xs space-y-1.5 pt-1 border-t border-white/10">
            <div className="flex items-center justify-between text-[11px] text-muted">
              <span>ITC Offset on GSTR-3B:</span>
              <span className="text-emerald-400 font-bold font-mono">-{formatCurrency(taxAmount)}</span>
            </div>
            <div className="flex items-center justify-between font-semibold pt-1 border-t border-white/5">
              <span className="text-white text-xs">Net Business Cost:</span>
              <span className="text-emerald-400 font-serif font-bold text-sm font-mono">
                {formatCurrency(effectiveCost)}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 leading-tight pt-1">
              Provide your GSTIN at checkout to receive tax invoice with eligible input credit deduction.
            </p>
          </div>
        ) : (
          <p className="text-[11px] text-muted leading-tight">
            Check the box above to factor in 18% GST tax credits for corporate tax filings.
          </p>
        )}
      </div>

      {/* Promotional Code Form */}
      {!isCheckoutPage && (
        <div className="pt-2 border-t border-border/60 space-y-2.5">
          {couponCode ? (
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300">
              <div className="flex items-center gap-1.5 font-mono font-semibold">
                <Tag size={13} />
                <span>{couponCode}</span>
                <span className="text-[10px] bg-emerald-500/20 px-1 rounded">Applied</span>
              </div>
              <button
                type="button"
                onClick={onRemoveCoupon}
                className="text-muted hover:text-foreground p-0.5"
                title="Remove discount"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <form onSubmit={handleApply} className="space-y-2">
              <div className="flex gap-2">
                <Input
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                  placeholder="Promo code (e.g. AXINIX10)"
                  className="text-xs font-mono uppercase h-9"
                />
                <Button type="submit" size="sm" variant="outline" className="h-9 px-3 text-xs shrink-0 hover:border-gold">
                  Apply
                </Button>
              </div>

              {/* Quick Coupon Suggestions */}
              <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                <span className="text-[10px] text-muted">Try:</span>
                <button
                  type="button"
                  onClick={() => handleQuickApply('AXINIX10')}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-card border border-border/70 text-gold hover:border-gold transition-colors"
                >
                  AXINIX10 (-10%)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickApply('FIRST5000')}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-card border border-border/70 text-gold hover:border-gold transition-colors"
                >
                  FIRST5000 (-₹5k)
                </button>
              </div>
            </form>
          )}

          {feedback && !couponCode && (
            <div
              className={`text-[11px] p-2 rounded ${
                feedback.success
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
              }`}
            >
              {feedback.message}
            </div>
          )}
        </div>
      )}

      {/* Main Action Button */}
      <Button
        size="lg"
        variant="gold"
        onClick={onCheckout}
        disabled={disabled}
        className="w-full gap-2 font-semibold shadow-md shadow-gold/20 text-xs sm:text-sm py-3"
      >
        <span>{checkoutButtonText}</span>
        <ArrowRight size={16} />
      </Button>

      {/* Security & Warranty Trust Footer */}
      <div className="pt-2 border-t border-border/60 space-y-1.5 text-[11px] text-muted">
        <div className="flex items-center gap-1.5 text-slate-300">
          <ShieldCheck size={14} className="text-gold shrink-0" />
          <span>256-Bit Bank-Grade Encryption & Escrow</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-300">
          <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
          <span>Instant GSTIN invoice & license certificate</span>
        </div>
      </div>
    </Card>
  );
}
