import React, { useState, useEffect } from 'react';
import { Search, Truck, CheckCircle2, Clock, PackageCheck, AlertCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { api } from '../services/api';
import { Order } from '../types';

export const OrderTrackingPage: React.FC = () => {
  const { routeParams, navigateTo } = useStore();
  const [query, setQuery] = useState(routeParams.id || 'STCH-2026-9142');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchTrack = async (searchId: string) => {
    if (!searchId.trim()) return;
    try {
      setLoading(true);
      setErrorMsg(null);
      const data = await api.getOrder(searchId.trim());
      setOrder(data.order);
    } catch {
      setErrorMsg(`No active order found with reference "${searchId}". Please check your invoice.`);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (routeParams.id) {
      setQuery(routeParams.id);
      fetchTrack(routeParams.id);
    } else {
      // Load default demo order
      fetchTrack('STCH-2026-9142');
    }
  }, [routeParams.id]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTrack(query);
  };

  const steps = [
    { key: 'CONFIRMED', label: 'Order Confirmed', desc: 'Verified by atelier team' },
    { key: 'PROCESSING', label: 'Quality & Finishing', desc: 'Threadwork inspection' },
    { key: 'SHIPPED', label: 'Dispatched via Courier', desc: 'Handoff to delivery partner' },
    { key: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', desc: 'Executive on the way' },
    { key: 'DELIVERED', label: 'Delivered', desc: 'Signed and delivered' },
  ];

  const getStepStatus = (stepKey: string, currentStatus: Order['status']) => {
    const orderIndex = steps.findIndex(s => s.key === currentStatus);
    const thisIndex = steps.findIndex(s => s.key === stepKey);

    if (thisIndex < orderIndex) return 'completed';
    if (thisIndex === orderIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Search Bar Header */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] text-[#B77D8D] font-semibold">
          Real-Time Consignment Tracking
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#3B2118]">
          Track Your Muskan's Stitching Order
        </h1>
        <p className="text-xs text-[#73574E]">
          Enter your 16-character order reference (e.g. STCH-2026-9142) found in your confirmation email or SMS.
        </p>

        <form onSubmit={handleSearch} className="flex gap-2 pt-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter Order ID..."
            className="flex-1 px-4 py-2.5 text-xs bg-white border border-[#E8D9C8] rounded text-[#3B2118] focus:outline-none focus:border-[#B77D8D]"
          />
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#3B2118] text-[#FAF5EE] rounded text-xs font-semibold uppercase tracking-wider hover:bg-[#523024] cursor-pointer"
          >
            Track
          </button>
        </form>
      </div>

      {loading && (
        <div className="text-center py-12 text-xs text-[#73574E]">
          Connecting to courier node...
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center gap-2 max-w-xl mx-auto">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {order && !loading && (
        <div className="bg-[#FAF5EE] rounded-2xl p-6 sm:p-10 border border-[#E8D9C8] space-y-8 shadow-sm">
          {/* Header Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8D9C8] pb-6">
            <div>
              <span className="text-xs text-[#73574E] block">Consignment Dossier</span>
              <h2 className="font-serif-luxury text-2xl text-[#3B2118] font-bold">
                {order.orderNumber}
              </h2>
            </div>

            <div className="text-left sm:text-right text-xs">
              <span className="text-[#73574E] block">Estimated Delivery</span>
              <span className="font-semibold text-emerald-800 text-sm">
                {new Date(order.estimatedDelivery).toLocaleDateString('en-IN', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>

          {/* Tracking Number Callout */}
          <div className="bg-white p-4 rounded-xl border border-[#E8D9C8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-[#73574E] block">Express Courier Partner</span>
              <span className="font-semibold text-[#3B2118]">Delhivery Air Express</span>
            </div>
            <div>
              <span className="text-[#73574E] block">Tracking Airway Bill (AWB)</span>
              <span className="font-mono text-[#B77D8D] font-bold">{order.trackingNumber || 'DELHIVERY-981240'}</span>
            </div>
            <div>
              <span className="text-[#73574E] block">Payment State</span>
              <span className="font-semibold text-[#3B2118]">
                {order.paymentMethod} ({order.paymentStatus})
              </span>
            </div>
          </div>

          {/* Visual Progress Timeline */}
          <div className="space-y-6">
            <h3 className="font-serif-luxury text-xl text-[#3B2118]">Delivery Progress</h3>

            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
                {steps.map((st, idx) => {
                  const status = getStepStatus(st.key, order.status);

                  return (
                    <div key={st.key} className="flex flex-col items-start md:items-center text-left md:text-center space-y-2">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                          status === 'completed'
                            ? 'bg-emerald-600 text-white'
                            : status === 'current'
                            ? 'bg-[#3B2118] text-[#FAF5EE] ring-4 ring-[#D8B4C0]/50'
                            : 'bg-white text-[#73574E] border border-[#E8D9C8]'
                        }`}
                      >
                        {status === 'completed' ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : status === 'current' ? (
                          <Clock className="w-4 h-4 animate-spin" />
                        ) : (
                          <span>{idx + 1}</span>
                        )}
                      </div>

                      <div>
                        <span className={`text-xs font-semibold block ${status === 'upcoming' ? 'text-[#73574E]/60' : 'text-[#3B2118]'}`}>
                          {st.label}
                        </span>
                        <span className="text-[10px] text-[#73574E] block">
                          {st.desc}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Destination & Items preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#E8D9C8] text-xs">
            <div>
              <span className="font-semibold text-[#3B2118] block mb-1">Destination Address</span>
              <p className="text-[#73574E]">
                {order.shippingAddress.fullName}<br />
                {order.shippingAddress.street}<br />
                {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
              </p>
            </div>

            <div>
              <span className="font-semibold text-[#3B2118] block mb-1">Package Contents ({order.items.length})</span>
              <div className="space-y-1 text-[#73574E]">
                {order.items.map(i => (
                  <div key={i.id} className="flex justify-between">
                    <span className="truncate max-w-[200px]">{i.productName} ({i.size})</span>
                    <span className="font-medium text-[#3B2118]">₹{i.totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
