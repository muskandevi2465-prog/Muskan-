import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Sparkles, HelpCircle, Phone, ArrowUp, Lock } from 'lucide-react';
import { StitchoraLogo } from './StitchoraLogo';
import { useStore } from '../context/StoreContext';
import { api } from '../services/api';

export const Footer: React.FC = () => {
  const { navigateTo, setActiveCategory, showToast, currentRoute } = useStore();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await api.subscribeNewsletter(email);
      showToast(res.message);
      setEmail('');
    } catch {
      showToast('Subscription failed. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToTop = () => {
    if (currentRoute !== 'home') {
      navigateTo('home');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNav = (route: string, cat?: string) => {
    if (route === 'faq') {
      navigateTo('faq');
      return;
    }
    if (route === 'contact') {
      navigateTo('contact');
      return;
    }
    if (route === 'about') {
      navigateTo('about');
      return;
    }
    if (cat) {
      setActiveCategory(cat);
      navigateTo('shop');
    } else {
      navigateTo(route);
    }
  };

  return (
    <footer className="bg-[#3B2118] text-[#F8F0E6] pt-14 pb-10 border-t border-[#523024]">
      {/* 1. Value Proposition Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-[#523024]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <Sparkles className="w-5 h-5 text-[#D8B4C0]" />
            <h4 className="text-base font-bold text-[#FAF5EE]">Artisanal Handcraft</h4>
            <p className="text-xs text-[#E8D9C8]/80 leading-relaxed">
              Every embroidery motif is hand-finished by master karigars using heirloom techniques.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-2">
            <Truck className="w-5 h-5 text-[#D8B4C0]" />
            <h4 className="text-base font-bold text-[#FAF5EE]">Complimentary Delivery</h4>
            <p className="text-xs text-[#E8D9C8]/80 leading-relaxed">
              Express door-to-door courier shipping on orders above ₹1,999 across all Indian PIN codes.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-2">
            <RefreshCw className="w-5 h-5 text-[#D8B4C0]" />
            <h4 className="text-base font-bold text-[#FAF5EE]">7-Day Size Exchanges</h4>
            <p className="text-xs text-[#E8D9C8]/80 leading-relaxed">
              Hassle-free size alteration and exchange guarantee if the fit requires adjustments.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-2">
            <ShieldCheck className="w-5 h-5 text-[#D8B4C0]" />
            <h4 className="text-base font-bold text-[#FAF5EE]">Verified Payments</h4>
            <p className="text-xs text-[#E8D9C8]/80 leading-relaxed">
              End-to-end encrypted checkout powered by Razorpay with UPI, Cards, and COD.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-5">
            <StitchoraLogo variant="horizontal" size="md" dark />
            <p className="text-xs text-[#E8D9C8]/80 leading-relaxed max-w-md">
              Muskan's Stitching specializes in women’s ethnic wear, designer suits, co-ord sets, party wear, and layered contemporary silhouettes. Crafted with pure textiles, romantic palettes, and meticulous attention to drape.
            </p>
            <div className="text-xs text-[#D8B4C0] font-light">
              Boutique Atelier: Defence Colony, New Delhi · Mumbai Studio
            </div>

            {/* Newsletter Subscription */}
            <div className="w-full max-w-md pt-2">
              <h5 className="text-xs uppercase tracking-wider text-[#FAF5EE] font-medium mb-2">
                Join Atelier Privé
              </h5>
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-[#523024] text-xs px-3 py-2 rounded-lg text-[#FAF5EE] placeholder-[#E8D9C8]/50 focus:outline-hidden focus:ring-1 focus:ring-[#D8B4C0] flex-1"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#D8B4C0] text-[#3B2118] px-4 py-2 rounded-lg text-xs font-semibold hover:bg-[#FAF5EE] transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                >
                  Join
                </button>
              </form>
            </div>

            {/* Admin Panel Section */}
            <div className="pt-2 border-t border-[#523024]/60 w-full max-w-md">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Lock className="w-3.5 h-3.5 text-[#D8B4C0]" />
                <span className="text-xs uppercase tracking-wider text-[#FAF5EE] font-bold">
                  Admin Panel
                </span>
              </div>
              <button
                onClick={() => handleNav('admin')}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#523024] hover:bg-[#8F5567] text-[#FAF5EE] text-xs font-bold tracking-wide transition-all duration-200 border border-[#D8B4C0]/30 hover:border-[#D8B4C0] cursor-pointer shadow-xs active:scale-95"
                title="Secure Admin Portal Login"
                aria-label="Open Admin Panel Login"
              >
                <Lock className="w-3 h-3 text-[#D8B4C0]" />
                <span>Admin Login</span>
              </button>
            </div>
          </div>

          {/* Quick Links Section with Highlighted Back to Top */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-[#FAF5EE]">
                Quick Links
              </h4>
              <span className="text-[10px] uppercase tracking-wider text-[#D8B4C0] bg-[#523024] px-2 py-0.5 rounded-full font-bold">
                Navigation
              </span>
            </div>
            <p className="text-xs text-[#E8D9C8]/80 leading-relaxed">
              Explore essential atelier services, sizing guidance, boutique contact details, and our bespoke couture story.
            </p>

            <ul className="space-y-3 pt-1">
              <li>
                <button
                  onClick={() => handleNav('faq')}
                  className="group flex items-start gap-3 text-left w-full hover:text-white transition-all cursor-pointer"
                  aria-label="Open Frequently Asked Questions page"
                >
                  <span className="w-7 h-7 rounded-lg bg-[#523024] group-hover:bg-[#B77D8D] flex items-center justify-center text-[#D8B4C0] group-hover:text-white transition-colors shrink-0 mt-0.5">
                    <HelpCircle className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-sm font-medium text-[#FAF5EE] group-hover:text-[#D8B4C0] transition-colors flex items-center gap-1.5">
                      <span>FAQ</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#D8B4C0]" />
                    </span>
                    <span className="text-[11.5px] text-[#E8D9C8]/75 block font-light leading-snug">
                      Answers on custom stitching, sizes, colors, pricing & delivery
                    </span>
                  </div>
                </button>
              </li>

              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="group flex items-start gap-3 text-left w-full hover:text-white transition-all cursor-pointer"
                  aria-label="Open Contact Us page"
                >
                  <span className="w-7 h-7 rounded-lg bg-[#523024] group-hover:bg-[#B77D8D] flex items-center justify-center text-[#D8B4C0] group-hover:text-white transition-colors shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-sm font-medium text-[#FAF5EE] group-hover:text-[#D8B4C0] transition-colors flex items-center gap-1.5">
                      <span>Contact Us</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#D8B4C0]" />
                    </span>
                    <span className="text-[11.5px] text-[#E8D9C8]/75 block font-light leading-snug">
                      Boutique inquiry form, direct phone & email
                    </span>
                  </div>
                </button>
              </li>

              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="group flex items-start gap-3 text-left w-full hover:text-white transition-all cursor-pointer"
                  aria-label="Open About Us page"
                >
                  <span className="w-7 h-7 rounded-lg bg-[#523024] group-hover:bg-[#B77D8D] flex items-center justify-center text-[#D8B4C0] group-hover:text-white transition-colors shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-sm font-medium text-[#FAF5EE] group-hover:text-[#D8B4C0] transition-colors flex items-center gap-1.5">
                      <span>About Us</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#D8B4C0]" />
                    </span>
                    <span className="text-[11.5px] text-[#E8D9C8]/75 block font-light leading-snug">
                      Atelier heritage, master karigars & bespoke philosophy
                    </span>
                  </div>
                </button>
              </li>
            </ul>

            {/* Highlighted Back to Top CTA Button in this section */}
            <div className="pt-2">
              <button
                onClick={handleBackToTop}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#FAF5EE] via-[#FFFFFF] to-[#FAF5EE] hover:from-[#D8B4C0] hover:via-[#FAF5EE] hover:to-[#D8B4C0] text-[#3B2118] font-bold text-xs uppercase tracking-[0.16em] transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center gap-2.5 cursor-pointer ring-2 ring-[#D8B4C0] group transform hover:-translate-y-0.5 active:translate-y-0"
                aria-label="Back to Top of Homepage"
                title="Return directly to the top of homepage without manually scrolling"
              >
                <span className="w-6 h-6 rounded-full bg-[#3B2118] text-[#FAF5EE] flex items-center justify-center group-hover:bg-[#2A160F] group-hover:scale-110 transition-all shrink-0 shadow-sm">
                  <ArrowUp className="w-3.5 h-3.5 stroke-[3] group-hover:-translate-y-0.5 transition-transform" />
                </span>
                <span className="text-[#3B2118] font-extrabold tracking-wider">Back to Top</span>
                <span className="w-2 h-2 rounded-full bg-[#8F5567] animate-pulse ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Sub-Footer Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#523024] flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#E8D9C8]/70">
        <div>
          © {new Date().getFullYear()} Muskan's Stitching Private Limited. All rights reserved. "Stitched for You".
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={handleBackToTop}
            className="text-[#D8B4C0] hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-semibold"
            aria-label="Back to Top of Page"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => handleNav('privacy')} className="hover:text-white transition-colors cursor-pointer">
            Privacy Policy
          </button>
          <button onClick={() => handleNav('terms')} className="hover:text-white transition-colors cursor-pointer">
            Terms of Service
          </button>
          <div className="flex items-center gap-2 text-[#E8D9C8]/60">
            <span>UPI</span>
            <span>·</span>
            <span>Cards</span>
            <span>·</span>
            <span>NetBanking</span>
            <span>·</span>
            <span>COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
