import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  Calendar,
  CheckCircle2,
  ShieldCheck,
  User,
  Mail,
  Phone,
} from 'lucide-react';
import { SOLUTIONS } from '../api/data';
import { apiClient } from '../api/client';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Textarea } from './ui/Textarea';
import { Badge } from './ui/Badge';
import { useToast } from '../context/ToastContext';
import { validateRequired, validateEmail, validatePhone } from '../utils/validators';

export function DemoBookingForm({ defaultProduct, defaultIndustry }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const productParam = searchParams.get('product') || defaultProduct || SOLUTIONS[0].title;
  const industryParam = searchParams.get('industry') || defaultIndustry || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    timeSlot: '10:00 AM - 10:45 AM',
    product: productParam,
    companySize: '2-5 Branches / Stores',
    notes: industryParam ? `Interested in solutions for ${industryParam}` : '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState(null);

  useEffect(() => {
    if (searchParams.get('product')) {
      setFormData(prev => ({ ...prev, product: searchParams.get('product') }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const nameErr = validateRequired(formData.name, 'Full name');
    if (nameErr) newErrors.name = nameErr;

    const emailErr = validateEmail(formData.email);
    if (emailErr) newErrors.email = emailErr;

    const phoneErr = validatePhone(formData.phone);
    if (phoneErr) newErrors.phone = phoneErr;

    const dateErr = validateRequired(formData.date, 'Preferred date');
    if (dateErr) newErrors.date = dateErr;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast('Please fix the errors in the form before submitting.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await apiClient.post('/api/demo-bookings', formData);
      setSubmittedBooking({
        ...formData,
        referenceId: response.requestId,
        bookedAt: new Date().toLocaleString(),
      });
      showToast('Demo request registered successfully!', 'success');
    } catch (err) {
      showToast('Failed to schedule demo. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedBooking) {
    return (
      <div className="bg-card border border-emerald-500/40 rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
          <CheckCircle2 size={36} />
        </div>

        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
          Demo Scheduled Successfully!
        </h2>

        <p className="text-xs sm:text-sm text-muted leading-relaxed">
          Thank you, <b className="text-foreground">{submittedBooking.name}</b>. Your live walkthrough for{' '}
          <b className="text-gold">{submittedBooking.product}</b> has been booked for{' '}
          <b className="text-foreground">{submittedBooking.date}</b> at <b className="text-foreground">{submittedBooking.timeSlot}</b>.
        </p>

        <div className="p-4 rounded-xl bg-deep/80 border border-border/80 text-left text-xs space-y-2 max-w-md mx-auto">
          <div className="flex justify-between">
            <span className="text-muted">Booking Reference:</span>
            <span className="font-mono text-gold font-semibold">{submittedBooking.referenceId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Confirmation Sent To:</span>
            <span className="text-foreground">{submittedBooking.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Assigned Team:</span>
            <span className="text-foreground">Senior Enterprise Architect</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Link to="/">
            <Button variant="gold" size="md">
              Return to Home
            </Button>
          </Link>
          <Button
            variant="outline"
            size="md"
            onClick={() => {
              setSubmittedBooking(null);
              setFormData({
                name: '',
                email: '',
                phone: '',
                date: '',
                timeSlot: '10:00 AM - 10:45 AM',
                product: SOLUTIONS[0].title,
                companySize: '2-5 Branches / Stores',
                notes: '',
              });
            }}
          >
            Schedule Another Session
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Left Column: Form */}
      <div className="lg:col-span-7 bg-card border border-border/80 rounded-2xl p-6 sm:p-8 shadow-xl">
        <h2 className="text-xl font-serif font-bold text-foreground mb-1">
          Enter Your Booking Details
        </h2>
        <p className="text-xs text-muted mb-6">
          All fields marked with an asterisk (<span className="text-red-400">*</span>) are required.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              name="name"
              required
              placeholder="e.g. Rajesh Kumar"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              icon={User}
            />

            <Input
              label="Work Email"
              name="email"
              type="email"
              required
              placeholder="rajesh@company.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              icon={Mail}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              required
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              icon={Phone}
            />

            <Input
              label="Preferred Date"
              name="date"
              type="date"
              required
              min={new Date().toISOString().split('T')[0]}
              value={formData.date}
              onChange={handleChange}
              error={errors.date}
              icon={Calendar}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Preferred Time Slot"
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleChange}
              options={[
                '10:00 AM - 10:45 AM (Morning)',
                '02:00 PM - 02:45 PM (Afternoon)',
                '04:30 PM - 05:15 PM (Evening)',
                '07:00 PM - 07:45 PM (Late)',
              ]}
            />

            <Select
              label="Target Solution"
              name="product"
              value={formData.product}
              onChange={handleChange}
              options={SOLUTIONS.map(s => s.title)}
            />
          </div>

          <Select
            label="Company Scale / Branch Count"
            name="companySize"
            value={formData.companySize}
            onChange={handleChange}
            options={[
              'Single Store / Head Office',
              '2-5 Branches / Stores',
              '6-15 Branches / Distribution Hubs',
              '16+ Branches / Multi-State Enterprise',
            ]}
          />

          <Textarea
            label="Specific Requirements or Questions (Optional)"
            name="notes"
            rows={3}
            placeholder="Share details on your current software, hardware setup, or specific challenges..."
            value={formData.notes}
            onChange={handleChange}
          />

          <div className="pt-2">
            <Button
              type="submit"
              variant="gold"
              size="lg"
              className="w-full shadow-lg shadow-gold/20"
              isLoading={isSubmitting}
            >
              Confirm & Request Demo Walkthrough
            </Button>
          </div>

          <p className="text-[11px] text-muted text-center pt-2">
            No credit card required. We respect your privacy and will never share your contact information.
          </p>
        </form>
      </div>

      {/* Right Column: Demo Expectations & Highlights */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-deep/80 border border-border/80 rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <Badge variant="royal" className="mb-2">What to Expect</Badge>
            <h3 className="text-xl font-serif font-bold text-foreground">
              A Personalized 30-Minute Session
            </h3>
            <p className="text-xs text-muted mt-1 leading-relaxed">
              We configure our live sandbox to mirror your business operations and workflow requirements.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-gold/15 text-gold flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                1
              </div>
              <div>
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Operational Deep Dive
                </h4>
                <p className="text-xs text-muted mt-0.5">
                  Review pain points, manual reconciliation friction, and reporting requirements.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-gold/15 text-gold flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                2
              </div>
              <div>
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Live System Simulation
                </h4>
                <p className="text-xs text-muted mt-0.5">
                  Interactive demonstration of sub-second billing, stock sync, and mobile dashboards.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-gold/15 text-gold flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                3
              </div>
              <div>
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Transparent Scope & Proposal
                </h4>
                <p className="text-xs text-muted mt-0.5">
                  Receive immediate clarity on hardware compatibility, deployment timelines, and pricing options.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border/40 text-xs text-muted">
            <div className="flex items-center gap-2 mb-1.5">
              <ShieldCheck size={16} className="text-gold" />
              <span className="font-medium text-foreground">Zero Obligation</span>
            </div>
            <p className="text-[11px]">
              Decide at your own pace with full technical documentation provided post-call.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

