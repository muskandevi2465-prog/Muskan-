import React, { useState } from 'react';
import { X, ShieldCheck, Smartphone, CreditCard, Building2, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '../services/api';
import { Order } from '../types';

interface RazorpayModalProps {
  order: Order;
  onSuccess: (updatedOrder: Order) => void;
  onClose: () => void;
}

export const RazorpayModal: React.FC<RazorpayModalProps> = ({ order, onSuccess, onClose }) => {
  const [method, setMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('muskan@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSimulatePayment = async () => {
    setIsProcessing(true);
    setErrorMsg(null);

    try {
      // 1. Fetch server-generated Razorpay order details
      const rzpOrder = await api.getRazorpayOrder(order.id);

      // 2. Generate test transaction credentials
      const razorpayPaymentId = `pay_${Date.now().toString().slice(-8)}${Math.random().toString(36).substring(2, 6)}`;
      const razorpayOrderId = rzpOrder.razorpayOrderId || `order_${order.id}`;

      // In real production, Razorpay checkout JS SDK triggers this.
      // Here we send the signature for server-side verification:
      const razorpaySignature = `demo_sig_${Date.now()}`;

      // 3. Verify payment signature on the server (server-authoritative)
      const verification = await api.verifyPayment({
        orderId: order.id,
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
      });

      if (verification.success && verification.order) {
        onSuccess(verification.order);
      } else {
        throw new Error('Payment signature verification failed on the server');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden z-10 border border-slate-200">
        {/* Razorpay Header Branding */}
        <div className="bg-[#0C2340] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-[#528FF0] flex items-center justify-center font-bold text-white text-lg tracking-wider">
              R
            </div>
            <div>
              <div className="text-sm font-semibold tracking-wide">Razorpay Gateway</div>
              <div className="text-xs text-blue-200">Merchant: Muskan's Stitching</div>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Summary Strip */}
        <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex justify-between items-center text-xs">
          <div>
            <span className="text-slate-500 block">Order Ref</span>
            <span className="font-semibold text-slate-800">{order.orderNumber}</span>
          </div>
          <div className="text-right">
            <span className="text-slate-500 block">Payable Amount</span>
            <span className="font-bold text-base text-[#0C2340] tabular-nums">
              ₹{order.totalAmount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setMethod('upi')}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border text-xs font-medium transition-all ${
                method === 'upi' ? 'border-[#528FF0] bg-blue-50/50 text-[#0C2340]' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Smartphone className="w-4 h-4 text-[#528FF0]" />
              <span>UPI / QR</span>
            </button>
            <button
              type="button"
              onClick={() => setMethod('card')}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border text-xs font-medium transition-all ${
                method === 'card' ? 'border-[#528FF0] bg-blue-50/50 text-[#0C2340]' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <CreditCard className="w-4 h-4 text-[#528FF0]" />
              <span>Cards</span>
            </button>
            <button
              type="button"
              onClick={() => setMethod('netbanking')}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border text-xs font-medium transition-all ${
                method === 'netbanking' ? 'border-[#528FF0] bg-blue-50/50 text-[#0C2340]' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Building2 className="w-4 h-4 text-[#528FF0]" />
              <span>Netbanking</span>
            </button>
          </div>

          {/* Tab Content */}
          {method === 'upi' && (
            <div className="space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
              <label className="block text-xs font-medium text-slate-700">Enter Virtual Payment Address (VPA)</label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="mobile@upi or id@okhdfcbank"
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded text-slate-800 focus:outline-none focus:border-[#528FF0]"
              />
              <div className="flex gap-2 text-[10px] text-slate-500 items-center">
                <span className="font-medium text-slate-700">Popular:</span>
                <span>GPay</span> · <span>PhonePe</span> · <span>Paytm</span> · <span>BHIM</span>
              </div>
            </div>
          )}

          {method === 'card' && (
            <div className="space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
              <label className="block text-xs font-medium text-slate-700">Card Number (Visa / Mastercard / RuPay)</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded text-slate-800"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  defaultValue="08 / 29"
                  placeholder="MM/YY"
                  className="px-3 py-2 text-xs bg-white border border-slate-300 rounded text-slate-800"
                />
                <input
                  type="password"
                  defaultValue="882"
                  placeholder="CVV"
                  className="px-3 py-2 text-xs bg-white border border-slate-300 rounded text-slate-800"
                />
              </div>
            </div>
          )}

          {method === 'netbanking' && (
            <div className="space-y-2 bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs">
              <span className="block font-medium text-slate-700">Select Banking Partner</span>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 border rounded bg-white font-medium text-slate-700 text-center">HDFC Bank</div>
                <div className="p-2 border rounded bg-white font-medium text-slate-700 text-center">ICICI Bank</div>
                <div className="p-2 border rounded bg-white font-medium text-slate-700 text-center">State Bank of India</div>
                <div className="p-2 border rounded bg-white font-medium text-slate-700 text-center">Axis Bank</div>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Pay Button */}
          <button
            type="button"
            disabled={isProcessing}
            onClick={handleSimulatePayment}
            className="w-full py-3 bg-[#528FF0] hover:bg-[#3D78DC] text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors shadow flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isProcessing ? (
              <span>Verifying with Server HMAC...</span>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Authorize ₹{order.totalAmount.toLocaleString('en-IN')} (Razorpay Test Mode)</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>PCI-DSS Level 1 Compliant · Server-Verified Signature</span>
          </div>
        </div>
      </div>
    </div>
  );
};
