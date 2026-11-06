import React from 'react';
import { User, Package, Heart, LogOut } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AccountPage: React.FC = () => {
  const { user, logout, setIsAuthOpen, navigateTo, wishlist } = useStore();

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FAF5EE] flex flex-col items-center justify-center p-8 text-[#3B2118]">
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#8F5567] mb-4 shadow-xs">
          <User className="w-8 h-8 stroke-1" />
        </div>
        <h2 className="font-serif-luxury text-2xl font-medium">Atelier Account</h2>
        <p className="text-xs text-[#73574E] mt-1 mb-6">Please sign in to view your orders, address, and profile.</p>
        <button
          onClick={() => setIsAuthOpen(true)}
          className="px-8 py-3 bg-[#3B2118] text-[#FAF5EE] rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#2A160F] cursor-pointer"
        >
          Sign In / Register
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF5EE] text-[#3B2118] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between pb-6 border-b border-[#E8D9C8]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#3B2118] text-[#FAF5EE] flex items-center justify-center font-serif-luxury text-2xl font-medium shadow-md">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="font-serif-luxury text-2xl font-medium text-[#3B2118]">{user.name}</h1>
              <p className="text-xs text-[#73574E]">{user.email}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#E8D9C8] hover:bg-white text-xs text-[#73574E] hover:text-[#3B2118] transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#E8D9C8] space-y-4">
            <div className="flex items-center gap-2.5">
              <Package className="w-5 h-5 text-[#8F5567]" />
              <h3 className="font-serif-luxury text-lg font-medium">Orders & Tracking</h3>
            </div>
            <p className="text-xs text-[#73574E]">
              Track real-time shipment updates for your bespoke Indian outfits.
            </p>
            <button
              onClick={() => navigateTo('track')}
              className="w-full py-2.5 bg-[#FAF5EE] hover:bg-[#E8D9C8] text-[#3B2118] rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              View Order Tracking
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E8D9C8] space-y-4">
            <div className="flex items-center gap-2.5">
              <Heart className="w-5 h-5 text-[#8F5567]" />
              <h3 className="font-serif-luxury text-lg font-medium">Saved Wishlist ({wishlist.length})</h3>
            </div>
            <p className="text-xs text-[#73574E]">
              View your handpicked kurtis, suits, and festive sets.
            </p>
            <button
              onClick={() => navigateTo('shop')}
              className="w-full py-2.5 bg-[#FAF5EE] hover:bg-[#E8D9C8] text-[#3B2118] rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
