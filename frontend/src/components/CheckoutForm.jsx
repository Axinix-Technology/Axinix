import React, { useState } from 'react';
import {
  ShieldCheck,
  Building2,
  Truck,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Lock,
  Sparkles,
  QrCode,
  FileCheck2,
} from 'lucide-react';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

export function CheckoutForm({ onSubmitOrder, isSubmitting = false }) {
  const [currentStep, setCurrentStep] = useState(1); // 1: Identity, 2: Logistics, 3: Payment
  const [formData, setFormData] = useState({
    fullName: 'Rajesh Subramanian',
    email: 'rajesh@apexretail.in',
    phone: '+91 98401 23456',
    companyName: 'Apex Retail Enterprises Pvt Ltd',
    gstin: '33AAACA1234A1Z5',
    addressLine: 'Plot 42, Electronics Hub, Outer Ring Road',
    city: 'Bangalore',
    state: 'Karnataka',
    postalCode: '560066',
    deliveryMethod: 'express',
    paymentMethod: 'upi',
    acceptTerms: true,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateStep1 = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Valid corporate email required';
    if (!formData.phone.trim()) errs.phone = 'Contact phone number required';
    if (!formData.companyName.trim()) errs.companyName = 'Company name required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs = {};
    if (!formData.addressLine.trim()) errs.addressLine = 'Delivery address required';
    if (!formData.city.trim()) errs.city = 'City required';
    if (!formData.state.trim()) errs.state = 'State required';
    if (!formData.postalCode.trim()) errs.postalCode = 'Postal PIN code required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs = {};
    if (!formData.acceptTerms) errs.acceptTerms = 'You must accept the terms of service';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentStep === 1) {
      if (validateStep1()) setCurrentStep(2);
    } else if (currentStep === 2) {
      if (validateStep2()) setCurrentStep(3);
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep1() && validateStep2() && validateStep3()) {
      onSubmitOrder(formData);
    }
  };

  const steps = [
    { number: 1, title: 'Business Identity', desc: 'Contact & GSTIN' },
    { number: 2, title: 'Logistics & Cloud', desc: 'Dispatch Address' },
    { number: 3, title: 'Payment & Invoicing', desc: 'Bank Settlement' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Multi-Step Visual Progress Bar (Zero Modals - Dedicated Step Flow) */}
      <Card className="p-4 sm:p-5 bg-card border border-border/80">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 relative">
          {steps.map(s => {
            const isActive = currentStep === s.number;
            const isCompleted = currentStep > s.number;
            return (
              <button
                key={s.number}
                type="button"
                onClick={() => {
                  if (s.number === 1) setCurrentStep(1);
                  if (s.number === 2 && validateStep1()) setCurrentStep(2);
                  if (s.number === 3 && validateStep1() && validateStep2()) setCurrentStep(3);
                }}
                className={`flex items-center gap-2 sm:gap-3 p-2 rounded-lg text-left transition-all ${
                  isActive
                    ? 'bg-gold/15 border border-gold/50'
                    : isCompleted
                    ? 'bg-emerald-500/10 border border-emerald-500/30'
                    : 'bg-deep/40 dark:bg-black/20 border border-border/50 opacity-60'
                }`}
              >
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                    isCompleted
                      ? 'bg-emerald-500 text-white'
                      : isActive
                      ? 'bg-gold text-deep shadow-sm shadow-gold/50'
                      : 'bg-card text-muted border border-border'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 size={16} /> : s.number}
                </div>
                <div className="min-w-0 hidden sm:block">
                  <div className={`text-xs font-bold truncate ${isActive ? 'text-gold' : isCompleted ? 'text-emerald-400' : 'text-foreground'}`}>
                    {s.title}
                  </div>
                  <div className="text-[10px] text-muted truncate">{s.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      {/* STEP 1: Contact & Corporate Identity */}
      {currentStep === 1 && (
        <Card className="p-5 sm:p-6 bg-card border border-border/80 space-y-5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-border/60">
            <div className="flex items-center gap-2">
              <Building2 size={18} className="text-gold" />
              <div>
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                  Step 1: Business Invoicing & Authorized Contact
                </h3>
                <p className="text-xs text-muted">Enter corporate contact credentials for software licenses & billing.</p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-gold font-bold">1 of 3</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name *"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              error={errors.fullName}
              placeholder="Authorized contact person"
            />
            <Input
              label="Corporate Email Address *"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              error={errors.email}
              placeholder="name@company.com"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Direct Phone Number *"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              error={errors.phone}
              placeholder="+91 98765 43210"
            />
            <Input
              label="Registered Company Name *"
              value={formData.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
              error={errors.companyName}
              placeholder="Company Pvt Ltd / LLP"
            />
            <Input
              label="GSTIN (For 18% Input Credit)"
              value={formData.gstin}
              onChange={(e) => handleChange('gstin', e.target.value)}
              placeholder="33AAAAA0000A1Z5"
            />
          </div>

          <div className="pt-3 border-t border-border/60 flex justify-end">
            <Button type="button" size="sm" variant="gold" onClick={handleNext} className="gap-2 text-xs font-semibold px-5">
              <span>Continue to Logistics</span>
              <ArrowRight size={14} />
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 2: Deployment & Delivery Address */}
      {currentStep === 2 && (
        <Card className="p-5 sm:p-6 bg-card border border-border/80 space-y-5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-border/60">
            <div className="flex items-center gap-2">
              <Truck size={18} className="text-gold" />
              <div>
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                  Step 2: Delivery & Cloud Provisioning Address
                </h3>
                <p className="text-xs text-muted">Hardware shipping destination & regional data center location.</p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-gold font-bold">2 of 3</span>
          </div>

          <Input
            label="Street Address / Office Unit *"
            value={formData.addressLine}
            onChange={(e) => handleChange('addressLine', e.target.value)}
            error={errors.addressLine}
            placeholder="Building, Floor, Tech Park / Industrial Area"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="City *"
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
              error={errors.city}
              placeholder="e.g. Bangalore"
            />
            <Input
              label="State / Province *"
              value={formData.state}
              onChange={(e) => handleChange('state', e.target.value)}
              error={errors.state}
              placeholder="e.g. Karnataka"
            />
            <Input
              label="Postal Code (PIN) *"
              value={formData.postalCode}
              onChange={(e) => handleChange('postalCode', e.target.value)}
              error={errors.postalCode}
              placeholder="e.g. 560066"
            />
          </div>

          {/* Delivery Method Selector */}
          <div className="pt-2 space-y-2">
            <label className="text-xs font-semibold text-foreground block">
              Logistics & Deployment Mode
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => handleChange('deliveryMethod', 'express')}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  formData.deliveryMethod === 'express'
                    ? 'border-gold bg-gold/10 shadow-xs'
                    : 'border-border/80 bg-deep/50 hover:border-gold/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">BlueDart Surface Air Express</span>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase">Free Enterprise Shipping</span>
                </div>
                <p className="text-[11px] text-muted mt-1 leading-relaxed">
                  Dispatches within 24 hours. Sealed tamper-evident container with live GPS milestone tracking.
                </p>
              </div>

              <div
                onClick={() => handleChange('deliveryMethod', 'instant')}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  formData.deliveryMethod === 'instant'
                    ? 'border-gold bg-gold/10 shadow-xs'
                    : 'border-border/80 bg-deep/50 hover:border-gold/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">Instant Cloud Provisioning</span>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase">Immediate 15m Setup</span>
                </div>
                <p className="text-[11px] text-muted mt-1 leading-relaxed">
                  Cloud tenant database, admin master keys, and license certificates generated in 15 minutes.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-border/60 flex items-center justify-between">
            <Button type="button" size="sm" variant="outline" onClick={handleBack} className="gap-2 text-xs">
              <ArrowLeft size={14} />
              <span>Back</span>
            </Button>
            <Button type="button" size="sm" variant="gold" onClick={handleNext} className="gap-2 text-xs font-semibold px-5">
              <span>Continue to Payment</span>
              <ArrowRight size={14} />
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 3: Corporate Payment Method */}
      {currentStep === 3 && (
        <Card className="p-5 sm:p-6 bg-card border border-border/80 space-y-5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-border/60">
            <div className="flex items-center gap-2">
              <CreditCard size={18} className="text-gold" />
              <div>
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                  Step 3: Settlement & Payment Invoicing
                </h3>
                <p className="text-xs text-muted">Select corporate payment channel for instant tax receipting.</p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-gold font-bold">3 of 3</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                id: 'upi',
                title: 'Instant UPI / QR Code',
                desc: 'GPay, PhonePe, Paytm, BHIM instant settlement',
                icon: QrCode,
              },
              {
                id: 'bank',
                title: 'NEFT / RTGS Wire',
                desc: 'Official AXINIX HDFC Bank corporate account',
                icon: Building2,
              },
              {
                id: 'card',
                title: 'Corporate Card',
                desc: 'Visa, Mastercard, RuPay, Amex Corporate',
                icon: CreditCard,
              },
            ].map(method => {
              const Icon = method.icon;
              const isSelected = formData.paymentMethod === method.id;
              return (
                <div
                  key={method.id}
                  onClick={() => handleChange('paymentMethod', method.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-gold bg-gold/10 shadow-xs'
                      : 'border-border/80 bg-deep/50 hover:border-gold/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <Icon size={14} className="text-gold" />
                      <span>{method.title}</span>
                    </span>
                    {isSelected && (
                      <CheckCircle2 size={15} className="text-gold" />
                    )}
                  </div>
                  <p className="text-[11px] text-muted leading-relaxed">{method.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Terms agreement checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={(e) => handleChange('acceptTerms', e.target.checked)}
                className="mt-0.5 rounded border-border text-gold focus:ring-gold"
              />
              <span className="text-xs text-muted leading-relaxed">
                I agree to the AXINIX Master Services Agreement, 18% GST Invoicing Compliance, and 30-day money-back deployment warranty.
              </span>
            </label>
            {errors.acceptTerms && (
              <p className="text-[11px] text-rose-400 mt-1">{errors.acceptTerms}</p>
            )}
          </div>

          <div className="pt-3 border-t border-border/60 flex items-center justify-between">
            <Button type="button" size="sm" variant="outline" onClick={handleBack} className="gap-2 text-xs">
              <ArrowLeft size={14} />
              <span>Back</span>
            </Button>
            <Button
              type="submit"
              size="lg"
              variant="gold"
              disabled={isSubmitting}
              className="gap-2 font-bold px-6 shadow-md shadow-gold/20"
            >
              <Lock size={15} />
              <span>{isSubmitting ? 'Confirming Order...' : 'Confirm & Finalize Order'}</span>
            </Button>
          </div>
        </Card>
      )}
    </form>
  );
}
