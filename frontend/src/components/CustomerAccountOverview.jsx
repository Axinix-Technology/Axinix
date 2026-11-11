import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  KeyRound,
  Package,
  Headphones,
  Copy,
  Check,
  Download,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Building,
  CreditCard,
  Truck,
  Send,
  MessageSquare,
  AlertTriangle,
  Sparkles,
  ChevronDown,
  Monitor,
  Apple,
  Terminal,
} from 'lucide-react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { useToast } from '../context/ToastContext';

export function CustomerAccountOverview({
  accountData,
  onLogout,
}) {
  const [activeTab, setActiveTab] = useState('licenses');
  const [copiedKey, setCopiedKey] = useState(null);
  const [downloadingClient, setDownloadingClient] = useState(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [selectedOs, setSelectedOs] = useState('windows');
  const [activeTicketId, setActiveTicketId] = useState(null);
  const [ticketReplyText, setTicketReplyText] = useState('');
  const [ticketsList, setTicketsList] = useState(accountData.tickets);

  const { showToast } = useToast();

  const handleCopyKey = (key) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    showToast('License key copied to clipboard!', 'info');
    setTimeout(() => setCopiedKey(null), 3000);
  };

  const handleStartDownload = (licenseId, productName) => {
    setDownloadingClient(licenseId);
    setDownloadProgress(15);

    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDownloadingClient(null);
            setDownloadProgress(0);
            showToast(`${productName} installer downloaded successfully!`, 'success');
          }, 600);
          return 100;
        }
        return prev + 25;
      });
    }, 300);
  };

  const handleSendTicketReply = (ticketId) => {
    if (!ticketReplyText.trim()) return;

    setTicketsList(prev =>
      prev.map(tck => {
        if (tck.ticketId === ticketId) {
          const replies = tck.replies || [
            {
              sender: 'AXINIX Support Team (L2)',
              time: '2 hours ago',
              text: 'We reviewed your barcode layout specification. Please verify if the print darkness is set to Level 12 on your 80mm Seiko unit.',
            },
          ];
          return {
            ...tck,
            lastUpdate: 'Just now by You',
            replies: [
              ...replies,
              {
                sender: 'Rajesh Subramanian (You)',
                time: 'Just now',
                text: ticketReplyText.trim(),
              },
            ],
          };
        }
        return tck;
      })
    );

    setTicketReplyText('');
    showToast('Reply dispatched to enterprise engineering team!', 'success');
  };

  const { user, licenses, orders } = accountData;

  return (
    <div className="space-y-6">
      {/* 1. Account Summary Profile Card */}
      <Card className="p-5 sm:p-6 bg-card border border-border/80">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-gold to-royal border border-gold/40 text-deep flex items-center justify-center font-bold text-xl shrink-0 shadow-lg shadow-gold/20">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-serif font-bold text-foreground">{user.name}</h2>
                <Badge variant="gold" size="sm">
                  {user.membershipTier}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                <span className="flex items-center gap-1 font-semibold text-foreground">
                  <Building size={13} className="text-gold" />
                  <span>{user.company}</span>
                </span>
                <span>•</span>
                <span className="font-mono">GST: {user.gstin}</span>
                <span>•</span>
                <span>Client since {user.joinedDate}</span>
              </div>
              <div className="text-xs text-muted/80 pt-0.5 font-mono">
                {user.email} · {user.phone}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            <Link to="/delivery">
              <Button size="sm" variant="outline" className="gap-1.5 text-xs hover:border-gold">
                <Truck size={14} className="text-gold" />
                <span>Track Shipments</span>
              </Button>
            </Link>
            <Link to="/demo/create">
              <Button size="sm" variant="gold" className="gap-1.5 text-xs font-semibold shadow-xs">
                <Calendar size={14} />
                <span>Request SLA Architect</span>
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* 2. Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-border/80 pb-1 overflow-x-auto">
        {[
          { id: 'licenses', label: 'Active Licenses & Cloud Subscriptions', icon: KeyRound, count: licenses.length },
          { id: 'orders', label: 'Hardware & Solution Orders', icon: Package, count: orders.length },
          { id: 'tickets', label: 'Priority Support Tickets', icon: Headphones, count: ticketsList.length },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg text-xs font-bold whitespace-nowrap transition-all border-b-2 -mb-1 ${
                isActive
                  ? 'border-gold text-gold bg-card shadow-xs'
                  : 'border-transparent text-muted hover:text-foreground hover:bg-card/40'
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${isActive ? 'bg-gold/20 text-gold font-bold' : 'bg-border/60 text-muted'}`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Tab Contents */}
      {/* TAB A: Active Licenses with Installer Download Simulator */}
      {activeTab === 'licenses' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {licenses.map(lic => {
              const isDownloading = downloadingClient === lic.id;

              return (
                <Card key={lic.id} className="p-5 bg-card border border-border/80 space-y-4 flex flex-col justify-between shadow-xs hover:border-gold/50 transition-all">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="gold" size="sm">
                        {lic.plan}
                      </Badge>
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                        <ShieldCheck size={13} />
                        <span>{lic.status}</span>
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-foreground">{lic.productName}</h3>
                      <p className="text-xs text-muted mt-0.5">{lic.usersAllocated}</p>
                    </div>

                    {/* License Key Box */}
                    <div className="bg-deep/70 dark:bg-black/40 rounded-xl p-3 border border-border/70 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <span className="text-[10px] text-muted uppercase font-mono block">Enterprise Master Key</span>
                        <span className="text-xs font-mono font-bold text-foreground truncate block">
                          {lic.licenseKey}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyKey(lic.licenseKey)}
                        className="p-2 text-muted hover:text-gold hover:bg-white/5 rounded-lg transition-colors shrink-0"
                        title="Copy Key"
                      >
                        {copiedKey === lic.licenseKey ? (
                          <Check size={15} className="text-emerald-400" />
                        ) : (
                          <Copy size={15} />
                        )}
                      </button>
                    </div>

                    {/* Simulated OS Selector & Download */}
                    <div className="pt-1 space-y-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-muted font-medium">Software Package:</span>
                        <div className="flex items-center gap-1.5 font-mono text-[10px]">
                          <button
                            type="button"
                            onClick={() => setSelectedOs('windows')}
                            className={`px-1.5 py-0.5 rounded ${selectedOs === 'windows' ? 'bg-royal text-white font-bold' : 'text-muted hover:text-foreground'}`}
                          >
                            Win x64
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedOs('mac')}
                            className={`px-1.5 py-0.5 rounded ${selectedOs === 'mac' ? 'bg-royal text-white font-bold' : 'text-muted hover:text-foreground'}`}
                          >
                            macOS
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedOs('linux')}
                            className={`px-1.5 py-0.5 rounded ${selectedOs === 'linux' ? 'bg-royal text-white font-bold' : 'text-muted hover:text-foreground'}`}
                          >
                            Linux deb
                          </button>
                        </div>
                      </div>

                      {/* Download button or progress bar */}
                      {isDownloading ? (
                        <div className="space-y-1.5 p-2.5 rounded-lg bg-deep/50 border border-royal/40">
                          <div className="flex items-center justify-between text-[11px] font-mono">
                            <span className="text-gold font-bold">Downloading v4.2.1 Stable ({selectedOs})</span>
                            <span className="text-white">{downloadProgress}% (184 MB)</span>
                          </div>
                          <div className="w-full h-1.5 bg-card rounded-full overflow-hidden">
                            <div
                              style={{ width: `${downloadProgress}%` }}
                              className="h-full bg-gradient-to-r from-royal to-gold transition-all duration-300"
                            ></div>
                          </div>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStartDownload(lic.id, lic.productName)}
                          className="w-full text-xs font-semibold gap-1.5 hover:border-gold hover:text-gold"
                        >
                          <Download size={13} />
                          <span>Download v4.2.1 Installer ({selectedOs === 'windows' ? '.exe 184MB' : selectedOs === 'mac' ? '.dmg 192MB' : '.deb 168MB'})</span>
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs">
                    <span className="text-muted text-[11px] font-mono">Renewal Date: {lic.renewalDate}</span>
                    <Link
                      to="/contact/create"
                      className="text-xs text-gold hover:underline font-semibold"
                    >
                      Request Key Upgrade →
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB B: Hardware & Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="space-y-3">
            {orders.map(order => (
              <Card key={order.orderId} className="p-4 sm:p-5 bg-card border border-border/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono font-bold text-sm text-foreground">{order.orderId}</span>
                    <Badge variant={order.status === 'In Transit' ? 'gold' : 'success'} size="sm">
                      {order.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted">
                    Placed on {order.date} · {order.itemsCount} hardware components · Paid via {order.paymentMethod}
                  </div>
                  <div className="text-[11px] text-muted font-mono">
                    Air Waybill / Tracking: <span className="text-gold font-bold">{order.trackingNumber}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-border/40">
                  <span className="font-bold font-serif text-lg text-foreground">{order.amount}</span>
                  <Link to="/delivery">
                    <Button size="sm" variant="gold" className="gap-1.5 text-xs font-semibold shadow-xs">
                      <Truck size={13} />
                      <span>Track Shipment</span>
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB C: Support Tickets with Interactive Reply Thread */}
      {activeTab === 'tickets' && (
        <div className="space-y-4">
          <div className="space-y-4">
            {ticketsList.map(tck => {
              const isExpanded = activeTicketId === tck.ticketId;

              return (
                <Card key={tck.ticketId} className="p-5 bg-card border border-border/80 space-y-4 shadow-xs">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs text-gold font-bold">{tck.ticketId}</span>
                        <Badge variant="outline" size="sm" className="text-[10px] font-mono">
                          Priority: {tck.priority}
                        </Badge>
                        <Badge variant={tck.status.includes('Resolved') ? 'success' : 'gold'} size="sm" className="text-[10px]">
                          {tck.status}
                        </Badge>
                      </div>
                      <h4 className="text-sm font-bold text-foreground">{tck.subject}</h4>
                      <p className="text-xs text-muted">{tck.lastUpdate}</p>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setActiveTicketId(isExpanded ? null : tck.ticketId)}
                      className="text-xs hover:border-gold"
                    >
                      {isExpanded ? 'Hide Thread' : 'View Thread & Reply'}
                    </Button>
                  </div>

                  {/* Thread & Reply Box */}
                  {isExpanded && (
                    <div className="pt-3 border-t border-border/60 space-y-3 animate-in fade-in duration-150">
                      <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                        {(tck.replies || [
                          {
                            sender: 'AXINIX Senior Engineering Desk',
                            time: '2 hours ago',
                            text: 'We reviewed your thermal printer setup. To configure 80mm ESC/POS barcode density, ensure DIP switch #3 is ON and reload the AXINIX Driver daemon.',
                          },
                        ]).map((rep, rIdx) => (
                          <div key={rIdx} className="p-3 rounded-lg bg-deep/50 dark:bg-black/30 border border-border/50 text-xs space-y-1">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="font-bold text-foreground">{rep.sender}</span>
                              <span className="text-muted font-mono">{rep.time}</span>
                            </div>
                            <p className="text-muted leading-relaxed">{rep.text}</p>
                          </div>
                        ))}
                      </div>

                      {/* Reply Input Form */}
                      <div className="flex gap-2 pt-2">
                        <Input
                          value={ticketReplyText}
                          onChange={(e) => setTicketReplyText(e.target.value)}
                          placeholder="Type an official reply to the assigned engineering team..."
                          className="text-xs h-10"
                        />
                        <Button
                          size="sm"
                          variant="gold"
                          onClick={() => handleSendTicketReply(tck.ticketId)}
                          className="h-10 px-4 text-xs font-semibold shrink-0 gap-1.5"
                        >
                          <Send size={13} />
                          <span>Send Reply</span>
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>

          <div className="pt-2">
            <Link to="/contact/create">
              <Button size="sm" variant="gold" className="gap-2 text-xs font-semibold shadow-xs">
                <Headphones size={14} />
                <span>Create New Enterprise Support Ticket</span>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
