import React, { useState } from 'react';
import { ArrowUpRight, TrendingUp, Layers, Zap, Activity, Server, ShieldCheck, CheckCircle2 } from 'lucide-react';

export function DashboardPreview() {
  const [activeRange, setActiveRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('sales');
  const [hoveredBarIndex, setHoveredBarIndex] = useState(null);

  const telemetryData = {
    sales: {
      '24h': {
        kpi1: '₹1,42,800',
        kpi1Sub: '+14.2% vs yesterday',
        kpi2: '342 Tickets',
        kpi2Sub: 'Avg ₹417 / ticket',
        kpi3: '99.98%',
        kpi3Sub: 'Zero payment dropouts',
        bars: [
          { label: '04:00', value: 35, amount: '₹14,200', count: 32 },
          { label: '08:00', value: 65, amount: '₹31,400', count: 74 },
          { label: '12:00', value: 92, amount: '₹48,900', count: 118 },
          { label: '16:00', value: 78, amount: '₹38,200', count: 89 },
          { label: '20:00', value: 98, amount: '₹52,100', count: 135 },
          { label: '24:00', value: 50, amount: '₹22,000', count: 54 },
        ],
      },
      '7d': {
        kpi1: '₹12,48,290',
        kpi1Sub: '+21.4% vs last week',
        kpi2: '2,840 Items',
        kpi2Sub: 'Across 14 store locations',
        kpi3: '₹439.50',
        kpi3Sub: 'Average checkout basket',
        bars: [
          { label: 'Mon', value: 55, amount: '₹1,42,000', count: 310 },
          { label: 'Tue', value: 68, amount: '₹1,75,400', count: 395 },
          { label: 'Wed', value: 62, amount: '₹1,58,000', count: 340 },
          { label: 'Thu', value: 84, amount: '₹2,14,300', count: 480 },
          { label: 'Fri', value: 76, amount: '₹1,96,200', count: 412 },
          { label: 'Sat', value: 96, amount: '₹2,68,900', count: 590 },
          { label: 'Sun', value: 88, amount: '₹2,34,500', count: 520 },
        ],
      },
      '30d': {
        kpi1: '₹54,12,000',
        kpi1Sub: '+28.6% MoM growth',
        kpi2: '12,490 Invoices',
        kpi2Sub: '100% GST reconciled',
        kpi3: '₹4,332',
        kpi3Sub: 'B2B Wholesale Avg ticket',
        bars: [
          { label: 'W1', value: 60, amount: '₹11,40,000', count: 2600 },
          { label: 'W2', value: 78, amount: '₹14,20,000', count: 3240 },
          { label: 'W3', value: 85, amount: '₹16,10,000', count: 3680 },
          { label: 'W4', value: 95, amount: '₹18,42,000', count: 4120 },
        ],
      },
      '1y': {
        kpi1: '₹6.84 Cr',
        kpi1Sub: '+42% Annual Enterprise Run-rate',
        kpi2: '1,42,000 Orders',
        kpi2Sub: 'Processed nationwide',
        kpi3: '99.99%',
        kpi3Sub: 'Platform availability',
        bars: [
          { label: 'Q1', value: 65, amount: '₹1.42 Cr', count: 31000 },
          { label: 'Q2', value: 74, amount: '₹1.65 Cr', count: 35000 },
          { label: 'Q3', value: 88, amount: '₹1.89 Cr', count: 41000 },
          { label: 'Q4', value: 98, amount: '₹2.12 Cr', count: 45000 },
        ],
      },
    },
    stock: {
      '24h': {
        kpi1: '99.94%',
        kpi1Sub: 'Instant POS sync rate',
        kpi2: '14,820 SKUs',
        kpi2Sub: 'All warehouses linked',
        kpi3: '0 Critical',
        kpi3Sub: 'No out-of-stock stalls',
        bars: [
          { label: '04:00', value: 85, amount: 'Sync 99.8%', count: 14810 },
          { label: '08:00', value: 90, amount: 'Sync 99.9%', count: 14815 },
          { label: '12:00', value: 96, amount: 'Sync 100%', count: 14820 },
          { label: '16:00', value: 94, amount: 'Sync 99.9%', count: 14820 },
          { label: '20:00', value: 98, amount: 'Sync 100%', count: 14820 },
          { label: '24:00', value: 92, amount: 'Sync 99.8%', count: 14820 },
        ],
      },
      '7d': {
        kpi1: '99.85%',
        kpi1Sub: 'Warehouse sync accuracy',
        kpi2: '18,400 Batches',
        kpi2Sub: 'Expiry tracking active',
        kpi3: '14 Stores',
        kpi3Sub: 'Live automated transfers',
        bars: [
          { label: 'Mon', value: 88, amount: 'Sync 99.8%', count: 18200 },
          { label: 'Tue', value: 92, amount: 'Sync 99.9%', count: 18250 },
          { label: 'Wed', value: 86, amount: 'Sync 99.7%', count: 18300 },
          { label: 'Thu', value: 94, amount: 'Sync 99.9%', count: 18350 },
          { label: 'Fri', value: 90, amount: 'Sync 99.8%', count: 18380 },
          { label: 'Sat', value: 98, amount: 'Sync 100%', count: 18400 },
          { label: 'Sun', value: 95, amount: 'Sync 99.9%', count: 18400 },
        ],
      },
      '30d': {
        kpi1: '99.92%',
        kpi1Sub: 'Audit variance <0.08%',
        kpi2: '4 Hubs',
        kpi2Sub: 'Central & Regional depots',
        kpi3: '100% FIFO',
        kpi3Sub: 'Automated batch rotation',
        bars: [
          { label: 'W1', value: 85, amount: 'Sync 99.7%', count: 17900 },
          { label: 'W2', value: 91, amount: 'Sync 99.9%', count: 18100 },
          { label: 'W3', value: 94, amount: 'Sync 99.9%', count: 18250 },
          { label: 'W4', value: 99, amount: 'Sync 100%', count: 18400 },
        ],
      },
      '1y': {
        kpi1: '99.96%',
        kpi1Sub: 'Annual stock audit accuracy',
        kpi2: '42,000 Items',
        kpi2Sub: 'Master catalog throughput',
        kpi3: 'Zero Shrinkage',
        kpi3Sub: 'Strict RFID / barcode audit',
        bars: [
          { label: 'Q1', value: 88, amount: 'Accuracy 99.8%', count: 32000 },
          { label: 'Q2', value: 92, amount: 'Accuracy 99.9%', count: 36000 },
          { label: 'Q3', value: 95, amount: 'Accuracy 99.9%', count: 39000 },
          { label: 'Q4', value: 99, amount: 'Accuracy 100%', count: 42000 },
        ],
      },
    },
    orders: {
      '24h': {
        kpi1: '892 Orders',
        kpi1Sub: 'Dispatched & billed today',
        kpi2: '<0.9 sec',
        kpi2Sub: 'Average barcode scan speed',
        kpi3: '100% Up',
        kpi3Sub: 'All 32 POS counters active',
        bars: [
          { label: '04:00', value: 40, amount: '48 Orders', count: 48 },
          { label: '08:00', value: 68, amount: '124 Orders', count: 124 },
          { label: '12:00', value: 95, amount: '260 Orders', count: 260 },
          { label: '16:00', value: 82, amount: '185 Orders', count: 185 },
          { label: '20:00', value: 99, amount: '280 Orders', count: 280 },
          { label: '24:00', value: 45, amount: '65 Orders', count: 65 },
        ],
      },
      '7d': {
        kpi1: '6,420 Orders',
        kpi1Sub: '+19.2% weekly volume',
        kpi2: '99.4%',
        kpi2Sub: 'On-time customer delivery',
        kpi3: 'Zero Queues',
        kpi3Sub: 'Dual-screen swift checkout',
        bars: [
          { label: 'Mon', value: 65, amount: '780 Orders', count: 780 },
          { label: 'Tue', value: 75, amount: '890 Orders', count: 890 },
          { label: 'Wed', value: 70, amount: '840 Orders', count: 840 },
          { label: 'Thu', value: 88, amount: '1,050 Orders', count: 1050 },
          { label: 'Fri', value: 82, amount: '990 Orders', count: 990 },
          { label: 'Sat', value: 98, amount: '1,280 Orders', count: 1280 },
          { label: 'Sun', value: 92, amount: '1,150 Orders', count: 1150 },
        ],
      },
      '30d': {
        kpi1: '28,940 Orders',
        kpi1Sub: 'Fulfilled with zero defects',
        kpi2: '3.2 min',
        kpi2Sub: 'Average warehouse packing turnaround',
        kpi3: '100% Tax Compliant',
        kpi3Sub: 'E-way bill & e-invoice auto-generated',
        bars: [
          { label: 'W1', value: 70, amount: '6,400 Orders', count: 6400 },
          { label: 'W2', value: 80, amount: '7,200 Orders', count: 7200 },
          { label: 'W3', value: 88, amount: '7,800 Orders', count: 7800 },
          { label: 'W4', value: 96, amount: '8,540 Orders', count: 8540 },
        ],
      },
      '1y': {
        kpi1: '3,84,000 Orders',
        kpi1Sub: 'Processed nationwide',
        kpi2: '16+ Verticals',
        kpi2Sub: 'Retail, Manufacturing, Pharma',
        kpi3: '99.99%',
        kpi3Sub: 'Database uptime SLA',
        bars: [
          { label: 'Q1', value: 68, amount: '82,000 Orders', count: 82000 },
          { label: 'Q2', value: 79, amount: '94,000 Orders', count: 94000 },
          { label: 'Q3', value: 86, amount: '1,02,000 Orders', count: 102000 },
          { label: 'Q4', value: 98, amount: '1,18,000 Orders', count: 118000 },
        ],
      },
    },
  };

  const currentCategory = telemetryData[selectedMetric] || telemetryData.sales;
  const current = currentCategory[activeRange] || currentCategory['7d'];

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Glow decorative background aura */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-gold/30 via-royal/40 to-royal-light/30 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

      {/* Main Glassmorphic Terminal Card */}
      <div className="bg-[#0B1528]/95 border border-royal/60 rounded-2xl p-5 shadow-2xl backdrop-blur-2xl relative z-10 transition-all">
        {/* Terminal Header & Ping Telemetry */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/90 inline-block shadow-xs shadow-rose-500/50"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90 inline-block shadow-xs shadow-amber-500/50"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90 inline-block shadow-xs shadow-emerald-500/50"></span>
            <span className="text-[11px] text-slate-300 ml-1 font-mono tracking-tight">AXINIX Core OS v4.2</span>
          </div>

          <div className="flex items-center gap-1.5 bg-[#0F1E3D] px-2.5 py-1 rounded-full text-[10px] text-emerald-300 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-mono font-medium">Cluster: 99.99% SLA • 12ms</span>
          </div>
        </div>

        {/* Telemetry Switchers: Metric Tabs + Time Range Toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 mb-4">
          {/* Metrics: Sales, Stock, Orders */}
          <div className="flex gap-1.5 w-full sm:w-auto bg-[#070D1F] p-1 rounded-lg border border-white/10">
            {[
              { id: 'sales', label: 'Sales & Billing' },
              { id: 'stock', label: 'Stock Sync' },
              { id: 'orders', label: 'POS Pipeline' },
            ].map(m => (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedMetric(m.id)}
                className={`flex-1 sm:flex-initial py-1 px-2.5 rounded text-[11px] font-semibold transition-all ${
                  selectedMetric === m.id
                    ? 'bg-royal text-white shadow-sm shadow-royal/50'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Time Ranges: 24h, 7d, 30d, 1y */}
          <div className="flex gap-1 bg-[#070D1F] p-1 rounded-lg border border-white/10 self-end sm:self-auto">
            {['24h', '7d', '30d', '1y'].map(range => (
              <button
                key={range}
                type="button"
                onClick={() => setActiveRange(range)}
                className={`py-0.5 px-2 rounded text-[10px] font-mono font-bold transition-all ${
                  activeRange === range
                    ? 'bg-gold text-deep shadow-xs'
                    : 'text-slate-400 hover:text-gold hover:bg-white/5'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Live KPI Cards */}
        <div className="grid grid-cols-3 gap-2.5 mb-4">
          <div className="bg-[#0F1E3D]/80 border border-royal/30 rounded-lg p-2.5 transition-all hover:border-gold/40">
            <span className="text-[10px] text-slate-400 block truncate uppercase font-medium tracking-wide">
              {selectedMetric} Total
            </span>
            <b className="text-sm font-sans font-bold text-white block mt-0.5 truncate">{current.kpi1}</b>
            <span className="text-[9px] text-emerald-400 block truncate mt-0.5">{current.kpi1Sub}</span>
          </div>
          <div className="bg-[#0F1E3D]/80 border border-royal/30 rounded-lg p-2.5 transition-all hover:border-gold/40">
            <span className="text-[10px] text-slate-400 block truncate uppercase font-medium tracking-wide">
              Throughput
            </span>
            <b className="text-sm font-sans font-bold text-white block mt-0.5 truncate">{current.kpi2}</b>
            <span className="text-[9px] text-gold block truncate mt-0.5">{current.kpi2Sub}</span>
          </div>
          <div className="bg-[#0F1E3D]/80 border border-royal/30 rounded-lg p-2.5 transition-all hover:border-gold/40">
            <span className="text-[10px] text-slate-400 block truncate uppercase font-medium tracking-wide">
              Reliability
            </span>
            <b className="text-sm font-sans font-bold text-white block mt-0.5 truncate">{current.kpi3}</b>
            <span className="text-[9px] text-slate-300 block truncate mt-0.5">{current.kpi3Sub}</span>
          </div>
        </div>

        {/* Dynamic Telemetry Graph Bars with Interactive Tooltips */}
        <div className="pt-1">
          <div className="flex items-center justify-between text-[11px] text-slate-300 mb-2 font-mono">
            <span className="flex items-center gap-1.5">
              <Activity size={13} className="text-gold" />
              <span>Real-time Velocity Pipeline</span>
            </span>
            <span className="text-emerald-400 flex items-center gap-1 text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Sync
            </span>
          </div>

          <div className="flex items-end gap-2 sm:gap-3 h-28 pt-2 px-1 border-b border-white/10 relative">
            {current.bars.map((bar, idx) => {
              const isHovered = hoveredBarIndex === idx;
              return (
                <div
                  key={idx}
                  className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group relative cursor-pointer"
                  onMouseEnter={() => setHoveredBarIndex(idx)}
                  onMouseLeave={() => setHoveredBarIndex(null)}
                >
                  {/* Detailed Tooltip */}
                  {isHovered && (
                    <div className="absolute -top-12 z-30 bg-[#0F172A] border border-gold text-white text-[10px] px-2.5 py-1.5 rounded-lg shadow-xl pointer-events-none whitespace-nowrap animate-in fade-in duration-150">
                      <div className="font-bold text-gold">{bar.amount}</div>
                      <div className="text-[9px] text-slate-300">{bar.label} • {bar.count} txns</div>
                    </div>
                  )}

                  <div
                    style={{ height: `${bar.value}%` }}
                    className={`w-full rounded-t transition-all duration-500 ease-out ${
                      isHovered
                        ? 'bg-gradient-to-t from-royal via-gold to-white shadow-lg shadow-gold/50 scale-105'
                        : 'bg-gradient-to-t from-royal via-royal-light to-gold'
                    }`}
                  ></div>
                  <span className={`text-[9px] font-mono transition-colors ${isHovered ? 'text-gold font-bold' : 'text-slate-400'}`}>
                    {bar.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Cluster Ping Telemetry Bar */}
        <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400 font-mono">
          <span className="flex items-center gap-1 text-slate-300">
            <Server size={11} className="text-gold" />
            <span>14 Regional Nodes Live</span>
          </span>
          <span className="text-emerald-400 font-semibold">Latency: 14ms (P99: 28ms)</span>
          <span className="text-gold font-semibold">Memory: 38% Normal</span>
        </div>
      </div>

      {/* Floating Mobile Companion Card */}
      <div className="hidden sm:block absolute -right-5 -bottom-5 w-32 bg-[#0B1528] border-2 border-gold rounded-2xl p-2.5 shadow-2xl z-20 transition-transform hover:scale-105">
        <div className="w-6 h-1 bg-white/20 rounded-full mx-auto mb-1.5"></div>
        <div className="text-[9px] text-center text-gold font-bold mb-1 flex items-center justify-center gap-1">
          <Zap size={10} />
          <span>Mobile POS Lane</span>
        </div>
        <div className="flex items-end gap-1 h-12 bg-[#070D1F] rounded p-1 mb-1.5">
          {[45, 80, 60, 95].map((h, i) => (
            <div
              key={i}
              style={{ height: `${h}%` }}
              className="flex-1 bg-gradient-to-t from-royal to-gold rounded-xs"
            ></div>
          ))}
        </div>
        <div className="text-[8px] text-center text-emerald-400 font-mono font-semibold flex items-center justify-center gap-1">
          <CheckCircle2 size={9} />
          <span>Sync: 100% OK</span>
        </div>
      </div>
    </div>
  );
}
