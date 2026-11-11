import React, { useState } from 'react';
import {
  Truck,
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  Package,
  PhoneCall,
  ShieldCheck,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Radio,
  FileText,
  Navigation,
} from 'lucide-react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { useToast } from '../context/ToastContext';

const MOCK_TRACKING_DATABASE = {
  'AX-DEL-2026-89412': {
    trackingNumber: 'AX-DEL-2026-89412',
    carrier: 'BlueDart Express Logistics',
    serviceType: 'Surface High-Value Secure Freight',
    estimatedDelivery: 'Tomorrow by 5:00 PM',
    status: 'In Transit',
    progressPercentage: 65,
    origin: 'AXINIX Central Hub, Chennai, Tamil Nadu',
    destination: 'Apex Retail Tech Park, Bangalore, Karnataka 560066',
    items: [
      {
        name: 'AXINIX Heavy-Duty Dual-Screen POS Terminal & 80mm Printer Kit',
        sku: 'AX-POS-TRM-80X',
        quantity: 1,
        weight: '4.8 kg',
        serial: 'SN-POS-2026-9921',
      },
      {
        name: 'AXINIX 2D Omnidirectional Desktop Barcode Scanner',
        sku: 'AX-SCN-2D-OMNI',
        quantity: 2,
        weight: '1.2 kg',
        serial: 'SN-SCN-2026-4401',
      },
    ],
    milestones: [
      {
        id: 'm1',
        time: 'Today, 11:30 AM',
        location: 'Bangalore Regional Sort Hub',
        title: 'Arrived at Regional Sort Hub',
        description: 'Shipment container scanned into regional distribution warehouse. Under sorting for local courier dispatch run.',
        completed: true,
        current: true,
        inspectionSeal: 'VERIFIED-SECURE-992',
        gpsCoordinates: '12.9716° N, 77.5946° E',
        dispatcher: 'BlueDart Fleet Lead - R. Verma',
      },
      {
        id: 'm2',
        time: 'Yesterday, 07:15 PM',
        location: 'Chennai Transit Air/Surface Expressway Center',
        title: 'Departed Facility in Transit',
        description: 'En route aboard temperature-monitored secure logistics vehicle via National Highway 48.',
        completed: true,
        current: false,
        inspectionSeal: 'DISPATCH-CHEN-842',
        gpsCoordinates: '13.0827° N, 80.2707° E',
        dispatcher: 'Carrier Logistics Hub #4',
      },
      {
        id: 'm3',
        time: 'Yesterday, 02:40 PM',
        location: 'AXINIX Central Fulfillment Warehouse, Chennai',
        title: 'Order Packed & Handed to Carrier',
        description: 'Hardware terminals tested on 24-point pre-delivery quality inspection. Multi-layer shockproof bubble packed with tamper-evident serial security seal.',
        completed: true,
        current: false,
        inspectionSeal: 'AXINIX-QA-PASS-1029',
        gpsCoordinates: '13.0418° N, 80.2341° E',
        dispatcher: 'AXINIX QA Team - S. Murugan',
      },
      {
        id: 'm4',
        time: 'Yesterday, 10:00 AM',
        location: 'AXINIX Systems Portal',
        title: 'Order Approved & Invoice Generated',
        description: 'GST invoice AX-INV-4921 issued and serial numbers linked to client account master key.',
        completed: true,
        current: false,
        inspectionSeal: 'GSTIN-INV-4921',
        gpsCoordinates: 'Cloud Provisioning Node #1',
        dispatcher: 'Automated ERP Billing Engine',
      },
    ],
  },
  'AX-DEL-2026-11029': {
    trackingNumber: 'AX-DEL-2026-11029',
    carrier: 'Delhivery Enterprise Secure',
    serviceType: 'Dedicated Air Cargo Priority',
    estimatedDelivery: 'Delivered on Oct 24, 2026',
    status: 'Delivered',
    progressPercentage: 100,
    origin: 'AXINIX Tech Center, Chennai',
    destination: 'Apex Retail HQ, MG Road, Bangalore 560001',
    items: [
      {
        name: 'AXINIX Dedicated Rackmount Cloud Gateway Server',
        sku: 'AX-SRV-RACK-01',
        quantity: 1,
        weight: '12.4 kg',
        serial: 'SN-SRV-ENT-88421',
      },
    ],
    milestones: [
      {
        id: 'm1',
        time: 'Oct 24, 2026, 03:45 PM',
        location: 'Apex Retail HQ Reception, Bangalore',
        title: 'Delivered & Handover Completed',
        description: 'Package accepted and signed by authorized recipient Rajesh Subramanian. On-site installation engineer dispatched.',
        completed: true,
        current: true,
        inspectionSeal: 'POD-SIGNED-OTP-8819',
        gpsCoordinates: '12.9754° N, 77.6092° E',
        dispatcher: 'Delhivery Courier Agent - K. Arun',
      },
      {
        id: 'm2',
        time: 'Oct 24, 2026, 09:15 AM',
        location: 'Bangalore Delivery Hub #3',
        title: 'Out for Delivery',
        description: 'Courier agent departed facility with dedicated high-security van.',
        completed: true,
        current: false,
        inspectionSeal: 'VAN-SECURE-04',
        gpsCoordinates: '12.9620° N, 77.5800° E',
        dispatcher: 'Local Dispatch Desk',
      },
    ],
  },
  'AX-DEL-2026-30419': {
    trackingNumber: 'AX-DEL-2026-30419',
    carrier: 'DTDC Priority Air',
    serviceType: 'Express Same-Day City Transit',
    estimatedDelivery: 'Today by 3:30 PM',
    status: 'Out for Delivery',
    progressPercentage: 88,
    origin: 'AXINIX Logistics Hub, Bangalore South',
    destination: 'Apex Retail Branch #2, Indiranagar, Bangalore 560038',
    items: [
      {
        name: 'Thermal Receipt Rolls (Box of 50 Rolls) & Barcode Ribbons',
        sku: 'AX-SUP-THM-50',
        quantity: 3,
        weight: '6.5 kg',
        serial: 'LOT-THM-2026-09',
      },
    ],
    milestones: [
      {
        id: 'm1',
        time: 'Today, 08:30 AM',
        location: 'Bangalore Indiranagar Dispatch Center',
        title: 'Out for Delivery with Route Driver',
        description: 'Driver Vijay Kumar (Vehicle KA-01-MJ-4491) en route for delivery. OTP verification required upon receipt.',
        completed: true,
        current: true,
        inspectionSeal: 'DRIVER-OTP-REQUIRED',
        gpsCoordinates: '12.9784° N, 77.6408° E',
        dispatcher: 'Courier Driver: +91 98450 11223',
      },
      {
        id: 'm2',
        time: 'Today, 05:00 AM',
        location: 'Bangalore Central Parcel Hub',
        title: 'Sorted & Bagged for Last-Mile Courier',
        description: 'Dispatched to local branch fulfillment vehicle.',
        completed: true,
        current: false,
        inspectionSeal: 'BAG-SECURE-4412',
        gpsCoordinates: '12.9200° N, 77.6100° E',
        dispatcher: 'Hub Coordinator',
      },
    ],
  },
};

export function DeliveryTracker({ initialTrackingData }) {
  const [searchCode, setSearchCode] = useState(initialTrackingData.trackingNumber || 'AX-DEL-2026-89412');
  const [trackingData, setTrackingData] = useState(
    MOCK_TRACKING_DATABASE[initialTrackingData.trackingNumber] || initialTrackingData
  );
  const [expandedMilestones, setExpandedMilestones] = useState({ m1: true });
  const { showToast } = useToast();

  const toggleMilestone = (id) => {
    setExpandedMilestones(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const loadSample = (code) => {
    setSearchCode(code);
    const found = MOCK_TRACKING_DATABASE[code];
    if (found) {
      setTrackingData(found);
      setExpandedMilestones({ m1: true });
      showToast(`Showing live tracking for ${code} (${found.status})`, 'info');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchCode.trim().toUpperCase();
    if (!query) {
      showToast('Please enter a tracking number', 'error');
      return;
    }
    const matched = Object.keys(MOCK_TRACKING_DATABASE).find(k => k.includes(query) || query.includes(k));
    if (matched) {
      setTrackingData(MOCK_TRACKING_DATABASE[matched]);
      setExpandedMilestones({ m1: true });
      showToast(`Tracking status updated for ${matched}`, 'success');
    } else {
      showToast(`No live records found for ${query}. Showing demo shipment.`, 'warning');
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Tracking Search Bar & Sample Selectors */}
      <Card className="p-4 sm:p-5 bg-card border border-border/80 space-y-3">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full">
            <Input
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder="Enter AXINIX or Carrier Tracking ID (e.g. AX-DEL-2026-89412)"
              className="pl-9 h-11 text-xs font-mono"
            />
            <Search size={16} className="absolute left-3 top-3.5 text-muted pointer-events-none" />
          </div>
          <Button type="submit" size="sm" variant="gold" className="w-full sm:w-auto h-11 px-6 gap-2 text-xs font-semibold shrink-0 shadow-xs">
            <Truck size={15} />
            <span>Track Delivery</span>
          </Button>
        </form>

        {/* Quick Sample Package Switchers */}
        <div className="flex items-center gap-2 pt-1 flex-wrap text-xs">
          <span className="text-muted text-[11px] font-medium">Test live tracking samples:</span>
          <button
            type="button"
            onClick={() => loadSample('AX-DEL-2026-89412')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all border ${
              trackingData.trackingNumber === 'AX-DEL-2026-89412'
                ? 'bg-gold/20 border-gold text-gold font-bold'
                : 'bg-card border-border/70 text-muted hover:text-foreground'
            }`}
          >
            AX-DEL-89412 (In Transit)
          </button>
          <button
            type="button"
            onClick={() => loadSample('AX-DEL-2026-30419')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all border ${
              trackingData.trackingNumber === 'AX-DEL-2026-30419'
                ? 'bg-gold/20 border-gold text-gold font-bold'
                : 'bg-card border-border/70 text-muted hover:text-foreground'
            }`}
          >
            AX-DEL-30419 (Out for Delivery)
          </button>
          <button
            type="button"
            onClick={() => loadSample('AX-DEL-2026-11029')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all border ${
              trackingData.trackingNumber === 'AX-DEL-2026-11029'
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold'
                : 'bg-card border-border/70 text-muted hover:text-foreground'
            }`}
          >
            AX-DEL-11029 (Delivered)
          </button>
        </div>
      </Card>

      {/* 2. Shipment High-Level Status & Live Progress Bar */}
      <Card className="p-5 sm:p-6 bg-card border border-border/80 space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs text-muted">Tracking ID:</span>
              <span className="font-mono font-bold text-base text-foreground">{trackingData.trackingNumber}</span>
              <Badge
                variant={
                  trackingData.status === 'Delivered'
                    ? 'success'
                    : trackingData.status === 'Out for Delivery'
                    ? 'gold'
                    : 'gold'
                }
                size="sm"
              >
                {trackingData.status}
              </Badge>
            </div>
            <div className="text-xs text-muted mt-1.5 flex items-center gap-2">
              <span>Carrier: <b className="text-foreground">{trackingData.carrier}</b></span>
              <span>•</span>
              <span>{trackingData.serviceType}</span>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[11px] text-muted block">Estimated Delivery</span>
            <span className="text-lg font-serif font-bold text-gold">
              {trackingData.estimatedDelivery}
            </span>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-muted">Dispatch Progress</span>
            <span className="text-gold font-bold">{trackingData.progressPercentage || 70}% Completed</span>
          </div>
          <div className="w-full h-2.5 bg-deep/80 dark:bg-black/40 rounded-full overflow-hidden border border-border/60 p-0.5">
            <div
              style={{ width: `${trackingData.progressPercentage || 70}%` }}
              className="h-full bg-gradient-to-r from-royal via-gold to-emerald-400 rounded-full transition-all duration-700 ease-out"
            ></div>
          </div>
        </div>

        {/* Route Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-deep/50 dark:bg-black/30 p-4 rounded-xl border border-border/60 text-xs">
          <div className="flex items-start gap-2.5">
            <MapPin size={16} className="text-muted shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] text-muted uppercase font-mono block">Origin Fulfillment Hub</span>
              <span className="text-foreground font-semibold">{trackingData.origin}</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <MapPin size={16} className="text-gold shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] text-gold uppercase font-mono block">Delivery Destination</span>
              <span className="text-foreground font-semibold">{trackingData.destination}</span>
            </div>
          </div>
        </div>

        {/* Package Contents */}
        <div className="space-y-2 pt-1">
          <span className="text-xs font-bold text-muted uppercase tracking-wider block">
            Shipment Manifest ({trackingData.items.length} Hardware Units)
          </span>
          <div className="space-y-2">
            {trackingData.items.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 rounded-lg bg-deep/40 dark:bg-black/20 border border-border/50 text-xs gap-2"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded bg-royal/20 text-gold flex items-center justify-center shrink-0">
                    <Package size={15} />
                  </div>
                  <div>
                    <span className="font-semibold text-foreground block truncate">{item.name}</span>
                    <span className="text-[10px] text-muted font-mono">Serial: {item.serial || 'N/A'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-muted text-[11px] self-end sm:self-auto font-mono">
                  <span>Qty: {item.quantity}</span>
                  <span>•</span>
                  <span>{item.weight}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* 3. Detailed Expandable Milestone Timeline */}
      <Card className="p-5 sm:p-6 bg-card border border-border/80 space-y-5">
        <div className="flex items-center justify-between pb-2 border-b border-border/60">
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
            Detailed Dispatch & Checkpoint Telemetry
          </h3>
          <span className="text-[11px] text-muted font-mono">Click milestones to inspect scans</span>
        </div>

        <div className="relative pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-border/80">
          {trackingData.milestones.map((step, idx) => {
            const isExpanded = expandedMilestones[step.id || `m${idx + 1}`];
            const milestoneKey = step.id || `m${idx + 1}`;

            return (
              <div key={idx} className="relative group">
                {/* Beacon point */}
                <div
                  className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    step.current
                      ? 'border-gold bg-gold text-deep animate-pulse shadow-md shadow-gold/50'
                      : step.completed
                      ? 'border-emerald-400 bg-emerald-500/20 text-emerald-400'
                      : 'border-border bg-card text-muted'
                  }`}
                >
                  {step.completed ? (
                    <CheckCircle2 size={13} />
                  ) : (
                    <Clock size={13} />
                  )}
                </div>

                {/* Milestone Details Card */}
                <div
                  onClick={() => toggleMilestone(milestoneKey)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    step.current
                      ? 'bg-gold/5 border-gold/40 shadow-xs'
                      : 'bg-card border-border/70 hover:border-border'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h4 className={`text-sm font-bold ${step.current ? 'text-gold' : 'text-foreground'}`}>
                      {step.title}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-muted">{step.time}</span>
                      {isExpanded ? <ChevronUp size={14} className="text-muted" /> : <ChevronDown size={14} className="text-muted" />}
                    </div>
                  </div>

                  <p className="text-xs text-muted mt-1 leading-relaxed">{step.description}</p>

                  <div className="text-[11px] text-muted flex items-center gap-1 pt-1.5 font-medium">
                    <MapPin size={12} className="text-gold shrink-0" />
                    <span>{step.location}</span>
                  </div>

                  {/* Expanded Telemetry Inspector */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-border/60 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[10px] font-mono bg-deep/40 dark:bg-black/30 p-2.5 rounded-lg">
                      <div>
                        <span className="text-muted block">Security Seal:</span>
                        <span className="text-foreground font-bold">{step.inspectionSeal || 'SEAL-OK-2026'}</span>
                      </div>
                      <div>
                        <span className="text-muted block">GPS Coordinates:</span>
                        <span className="text-gold font-bold">{step.gpsCoordinates || '12.9716° N, 77.5946° E'}</span>
                      </div>
                      <div>
                        <span className="text-muted block">Dispatcher / Unit:</span>
                        <span className="text-foreground font-bold">{step.dispatcher || 'Express Fleet Hub'}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 4. Support Desk Card */}
      <Card className="p-4 sm:p-5 bg-deep/80 dark:bg-black/40 border border-royal/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold/15 text-gold flex items-center justify-center shrink-0">
            <PhoneCall size={18} />
          </div>
          <div>
            <h4 className="font-bold text-foreground text-sm">Need priority delivery assistance?</h4>
            <p className="text-muted text-[11px]">Direct dispatcher coordination for high-value enterprise hardware shipments.</p>
          </div>
        </div>
        <a href="tel:+919876543210" className="w-full sm:w-auto">
          <Button size="sm" variant="gold" className="w-full sm:w-auto text-xs font-semibold gap-1.5 shadow-xs">
            <PhoneCall size={13} />
            <span>Call Logistics Desk</span>
          </Button>
        </a>
      </Card>
    </div>
  );
}
