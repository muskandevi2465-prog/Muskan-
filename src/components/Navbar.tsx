import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, User as UserIcon, Menu, X, ShieldAlert } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { StitchoraLogo } from './StitchoraLogo';

export const Navbar: React.FC = () => {
  const {
    navigateTo,
    currentRoute,
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsSearchOpen,
    setIsAuthOpen,
    user,
    isAdmin,
    setActiveCategory,
    activeCategory,
  } = useStore();

  const [isBannerDismissed, setIsBannerDismissed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (route: string, cat?: string) => {
    if (cat === 'coord-sets' && currentRoute === 'home') {
      const el = document.getElementById('coord-sets-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
        return;
      }
    }
    if (cat === 'short-kurtis' && currentRoute === 'home') {
      const el = document.getElementById('short-kurtis-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
        return;
      }
    }
    if (cat === 'party-wear' && currentRoute === 'home') {
      const el = document.getElementById('party-wear-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
        return;
      }
    }
    if (cat === 'festive-wear' && currentRoute === 'home') {
      const el = document.getElementById('festive-wear-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
        return;
      }
    }
    if (cat) {
      setActiveCategory(cat);
      navigateTo('shop');
    } else {
      navigateTo(route);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F8F0E6]/95 backdrop-blur-md border-b border-[#E8D9C8] transition-all">
      {/* 1. Slim Announcement Bar */}
      {!isBannerDismissed && (
        <div className="bg-[#3B2118] text-[#F8F0E6] text-xs py-1.5 px-4 text-center relative flex items-center justify-center font-light tracking-wide">
          <p className="truncate">
            <span className="font-medium tracking-wider text-[#D8B4C0]">MUSKAN'S STITCHING:</span> Complimentary Bespoke Shipping across India on orders over ₹1,999 · Use code <span className="underline font-medium text-[#FAF5EE]">WELCOME10</span>
          </p>
          <button
            onClick={() => setIsBannerDismissed(true)}
            aria-label="Dismiss banner"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F8F0E6]/70 hover:text-white p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 2. Top Bar Contract: Zone 1 (Brand) — Zone 2 (4-5 Nav Links) — Zone 3 (Action Items) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[88px] sm:h-24 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Lockup */}
        <button
          onClick={() => handleNav('home')}
          className="focus:outline-none text-left shrink-0 cursor-pointer"
          aria-label="Muskan's Stitching Home"
        >
          <StitchoraLogo variant="horizontal" size="md" />
        </button>

        {/* Zone 2: 4-5 Concise Single-Line Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-[12.5px] xl:text-[13px] font-bold tracking-[0.08em] uppercase text-[#3B2118]/85">
          <button
            onClick={() => handleNav('home')}
            className={`transition-colors hover:text-[#B77D8D] whitespace-nowrap shrink-0 cursor-pointer ${
              currentRoute === 'home' ? 'text-[#3B2118] font-extrabold border-b-2 border-[#3B2118] pb-0.5' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNav('shop', 'all')}
            className={`transition-colors hover:text-[#B77D8D] whitespace-nowrap shrink-0 cursor-pointer ${
              currentRoute === 'shop' && activeCategory === 'all' ? 'text-[#3B2118] font-extrabold border-b-2 border-[#3B2118] pb-0.5' : ''
            }`}
          >
            Shop All
          </button>
          <button
            onClick={() => handleNav('shop', 'ethnic-suits')}
            className={`transition-colors hover:text-[#B77D8D] whitespace-nowrap shrink-0 cursor-pointer ${
              currentRoute === 'shop' && activeCategory === 'ethnic-suits' ? 'text-[#3B2118] font-extrabold border-b-2 border-[#3B2118] pb-0.5' : ''
            }`}
          >
            Ethnic Dresses
          </button>
          <button
            onClick={() => handleNav('shop', 'short-kurtis')}
            className={`transition-colors hover:text-[#B77D8D] whitespace-nowrap shrink-0 cursor-pointer ${
              currentRoute === 'shop' && activeCategory === 'short-kurtis' ? 'text-[#3B2118] font-extrabold border-b-2 border-[#3B2118] pb-0.5' : ''
            }`}
          >
            Short Kurtis
          </button>
          <button
            onClick={() => handleNav('shop', 'coord-sets')}
            className={`transition-colors hover:text-[#B77D8D] whitespace-nowrap shrink-0 cursor-pointer ${
              currentRoute === 'shop' && activeCategory === 'coord-sets' ? 'text-[#3B2118] font-extrabold border-b-2 border-[#3B2118] pb-0.5' : ''
            }`}
          >
            Co-ord Sets
          </button>
          <button
            onClick={() => handleNav('shop', 'party-wear')}
            className={`transition-colors hover:text-[#B77D8D] whitespace-nowrap shrink-0 cursor-pointer ${
              currentRoute === 'shop' && activeCategory === 'party-wear' ? 'text-[#3B2118] font-extrabold border-b-2 border-[#3B2118] pb-0.5' : ''
            }`}
          >
            Party Wear
          </button>
          <button
            onClick={() => handleNav('shop', 'festive-wear')}
            className={`transition-colors hover:text-[#B77D8D] whitespace-nowrap shrink-0 cursor-pointer ${
              currentRoute === 'shop' && activeCategory === 'festive-wear' ? 'text-[#3B2118] font-extrabold border-b-2 border-[#3B2118] pb-0.5' : ''
            }`}
          >
            Festive Wear
          </button>
        </nav>

        {/* Zone 3: Interactive Affordances (Search, Wishlist, Account/Admin, Bag) */}
        <div className="flex items-center gap-4 sm:gap-5 shrink-0">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="text-[#3B2118] hover:text-[#B77D8D] p-1.5 transition-colors cursor-pointer"
            aria-label="Search catalog"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist */}
          <button
            onClick={() => handleNav('account', 'wishlist')}
            className="text-[#3B2118] hover:text-[#B77D8D] p-1.5 transition-colors relative cursor-pointer"
            aria-label="View Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#B77D8D] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold tabular-nums">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Account / Admin */}
          {isAdmin ? (
            <button
              onClick={() => handleNav('admin')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#FAF5EE] bg-[#3B2118] rounded-md hover:bg-[#523024] transition-colors cursor-pointer shadow-sm"
              title="Admin Dashboard"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-[#D8B4C0]" />
              <span>Admin</span>
            </button>
          ) : (
            <button
              onClick={() => (user ? handleNav('account') : setIsAuthOpen(true))}
              className="text-[#3B2118] hover:text-[#B77D8D] p-1.5 transition-colors relative cursor-pointer"
              aria-label={user ? 'My Account' : 'Sign In'}
            >
              <UserIcon className="w-5 h-5" />
              {user && (
                <span className="absolute bottom-1 right-1 w-2 h-2 bg-[#B77D8D] rounded-full" />
              )}
            </button>
          )}

          {/* Shopping Bag Button (CTA) */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 bg-[#3B2118] hover:bg-[#523024] text-[#FAF5EE] rounded-lg text-xs font-medium tracking-wider transition-all duration-200 cursor-pointer shadow-sm"
            aria-label="View Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4 text-[#E8D9C8]" />
            <span className="tabular-nums font-semibold">{cartCount}</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-[#3B2118] p-1.5 hover:text-[#B77D8D]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF5EE] border-b border-[#E8D9C8] px-6 py-6 space-y-4 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-3 pb-4 border-b border-[#E8D9C8]/60 text-sm font-medium">
            <button
              onClick={() => handleNav('home')}
              className="text-left py-2 text-[#3B2118] hover:text-[#B77D8D]"
            >
              Home
            </button>
            <button
              onClick={() => handleNav('shop', 'all')}
              className="text-left py-2 text-[#3B2118] hover:text-[#B77D8D]"
            >
              Shop All
            </button>
            <button
              onClick={() => handleNav('shop', 'ethnic-suits')}
              className="text-left py-2 text-[#3B2118] hover:text-[#B77D8D]"
            >
              Ethnic Dresses
            </button>
            <button
              onClick={() => handleNav('shop', 'short-kurtis')}
              className="text-left py-2 text-[#3B2118] hover:text-[#B77D8D]"
            >
              Short Kurtis
            </button>
            <button
              onClick={() => handleNav('shop', 'coord-sets')}
              className="text-left py-2 text-[#3B2118] hover:text-[#B77D8D]"
            >
              Co-ord Sets
            </button>
            <button
              onClick={() => handleNav('shop', 'party-wear')}
              className="text-left py-2 text-[#3B2118] hover:text-[#B77D8D]"
            >
              Party Wear
            </button>
            <button
              onClick={() => handleNav('shop', 'festive-wear')}
              className="text-left py-2 text-[#3B2118] hover:text-[#B77D8D]"
            >
              Festive Wear
            </button>
            <button
              onClick={() => handleNav('about')}
              className="text-left py-2 text-[#3B2118] hover:text-[#B77D8D]"
            >
              Our Craftsmanship
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('contact-section');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                } else {
                  handleNav('contact');
                }
              }}
              className="text-left py-2 text-[#3B2118] hover:text-[#B77D8D]"
            >
              Contact Boutique & WhatsApp
            </button>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                if (user) handleNav('account');
                else setIsAuthOpen(true);
                setMobileMenuOpen(false);
              }}
              className="text-xs uppercase font-medium tracking-wider text-[#3B2118] flex items-center gap-2"
            >
              <UserIcon className="w-4 h-4" />
              <span>{user ? `Account (${user.name})` : 'Sign In / Register'}</span>
            </button>
            {isAdmin && (
              <button
                onClick={() => handleNav('admin')}
                className="text-xs font-semibold text-[#B77D8D]"
              >
                Admin Panel →
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
