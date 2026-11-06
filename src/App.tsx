/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { AuthModal } from './components/AuthModal';
import { SizeGuideModal } from './components/SizeGuideModal';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { AccountPage } from './pages/AccountPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AboutPage, ContactPage, FAQPage, PolicyPage, NotFoundPage } from './pages/StaticPages';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentRoute, toasts, removeToast } = useStore();

  const renderCurrentPage = () => {
    switch (currentRoute) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'product':
        return <ProductDetailPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-confirmed':
        return <OrderConfirmationPage />;
      case 'track':
        return <OrderTrackingPage />;
      case 'account':
        return <AccountPage />;
      case 'admin':
        return <AdminDashboard />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'faq':
        return <FAQPage />;
      case 'size-guide':
        return <AboutPage />;
      case 'shipping-policy':
        return <PolicyPage type="shipping" />;
      case 'returns-policy':
        return <PolicyPage type="returns" />;
      case 'privacy':
        return <PolicyPage type="privacy" />;
      case 'terms':
        return <PolicyPage type="terms" />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F0E6] text-[#3B2118] selection:bg-[#B77D8D] selection:text-[#FAF5EE]">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Drawers & Modals */}
      <CartDrawer />
      <SearchModal />
      <AuthModal />
      <SizeGuideModal />

      {/* Toast Feedback Stack */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-lg shadow-xl border flex items-center justify-between gap-3 text-xs transition-all animate-in slide-in-from-bottom duration-200 ${
              toast.type === 'error'
                ? 'bg-[#3B2118] text-rose-200 border-rose-800'
                : toast.type === 'info'
                ? 'bg-[#3B2118] text-[#E8D9C8] border-[#523024]'
                : 'bg-[#3B2118] text-[#FAF5EE] border-[#523024]'
            }`}
          >
            <div className="flex items-center gap-2">
              {toast.type === 'error' ? (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              ) : toast.type === 'info' ? (
                <Info className="w-4 h-4 text-[#D8B4C0] shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-[#D8B4C0] shrink-0" />
              )}
              <span className="font-medium">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#FAF5EE]/60 hover:text-white p-0.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
