import React from 'react';
import { CheckCircle2, ArrowRight, Package, MapPin } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrderConfirmationPage: React.FC = () => {
  const { routeParams, navigateTo } = useStore();
  const orderNumber = routeParams.orderNumber || 'STCH-' + Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="min-h-screen bg-[#FAF5EE] text-[#3B2118] flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-3xl p-8 border border-[#E8D9C8] shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 stroke-[2]" />
        </div>

        <div>
          <span className="text-xs uppercase tracking-widest text-[#8F5567] font-semibold">
            Order Confirmed
          </span>
          <h2 className="font-serif-luxury text-3xl font-medium text-[#3B2118] mt-1">
            Thank You for Choosing Muskan's Stitching
          </h2>
          <p className="text-xs text-[#73574E] mt-2">
            Your ethnic ensemble is being tailored and hand-inspected with utmost care. A confirmation email has been dispatched.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF5EE] border border-[#E8D9C8] text-xs space-y-2 text-left">
          <div className="flex justify-between">
            <span className="text-[#73574E]">Order Reference:</span>
            <span className="font-mono font-bold text-[#8F5567]">{orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#73574E]">Estimated Delivery:</span>
            <span className="font-semibold text-[#3B2118]">3 - 5 Business Days</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#73574E]">Delivery Service:</span>
            <span className="font-semibold text-[#3B2118]">Express BlueDart Courier</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => navigateTo('track')}
            className="flex-1 py-3.5 rounded-xl bg-white border border-[#8F5567] text-[#8F5567] hover:bg-[#FAF5EE] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <Package className="w-4 h-4" />
            <span>Track Order</span>
          </button>

          <button
            onClick={() => navigateTo('home')}
            className="flex-1 py-3.5 rounded-xl bg-[#3B2118] hover:bg-[#2A160F] text-[#FAF5EE] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Return to Home</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
