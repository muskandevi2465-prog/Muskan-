import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, ChevronDown, ChevronUp, Sparkles, Send, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

// 1. ABOUT US PAGE
export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF5EE] text-[#3B2118] py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.22em] font-semibold text-[#8F5567]">Our Story</span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-medium text-[#3B2118] mt-2">
            The Muskan's Stitching Atelier
          </h1>
          <p className="text-sm text-[#73574E] mt-3 leading-relaxed">
            Preserving centuries-old Indian handcraft needlework while crafting timeless, modern silhouettes for the contemporary woman.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white">
              <img
                src="/assets/aistudio/n7_ac78eefa.png"
                alt="Muskan's Stitching Ethnic Couture Heritage"
                className="w-full h-auto object-cover max-h-[550px]"
              />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-[#3B2118] text-[#FAF5EE] p-5 rounded-2xl shadow-xl hidden sm:block max-w-xs">
              <p className="font-serif-luxury text-base">"Every stitch tells a story of royalty, grace, and devotion."</p>
              <span className="text-[10px] text-[#D8B4C0] uppercase tracking-widest block mt-1">— Muskan's Stitching Master Karigars</span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 text-[#5D4238] leading-relaxed text-sm">
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#3B2118]">
              Artisanal Devotion to Pure Textiles
            </h2>
            <p>
              At Muskan's Stitching, every garment begins with carefully chosen organic handloom textiles: pure Chanderi silk, breathable Mulmul cotton, lustrous tissue organza, and royal velvets.
            </p>
            <p>
              Our master artisans in Delhi and Rajasthan employ heirloom techniques like intricate zardozi, hand-done gota patti, fine resham embroidery, and traditional block prints to create pieces that can be passed down as family treasures.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E8D9C8]">
              <div className="p-4 rounded-xl bg-white border border-[#E8D9C8]">
                <h4 className="font-serif-luxury text-xl font-bold text-[#8F5567]">100%</h4>
                <p className="text-xs text-[#73574E] mt-0.5">Handcrafted in Indian ateliers</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#E8D9C8]">
                <h4 className="font-serif-luxury text-xl font-bold text-[#8F5567]">50+</h4>
                <p className="text-xs text-[#73574E] mt-0.5">Master karigars supported</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. CONTACT US PAGE
export const ContactPage: React.FC = () => {
  const { showToast } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please fill out all required fields', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Your message has been received! Our concierge will contact you shortly.');
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-[#FAF5EE] text-[#3B2118] py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.22em] font-semibold text-[#8F5567]">Concierge</span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-medium text-[#3B2118] mt-2">
            Contact Muskan's Stitching
          </h1>
          <p className="text-sm text-[#73574E] mt-3">
            Have questions about custom bridal measurements, order status, or fabric choices? Our boutique team is here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white border border-[#E8D9C8] shadow-sm space-y-6">
              <h3 className="font-serif-luxury text-2xl font-medium text-[#3B2118]">Boutique Atelier</h3>

              <div className="space-y-5 text-xs text-[#5D4238]">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF5EE] flex items-center justify-center text-[#8F5567] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#3B2118]">Flagship Studio</h5>
                    <p className="mt-0.5 leading-relaxed">
                      Atelier Muskan's Stitching, 14 Defence Colony Main Market, New Delhi 110024
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF5EE] flex items-center justify-center text-[#8F5567] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#3B2118]">Customer Care</h5>
                    <p className="mt-0.5">+91 98765 43210 (Mon - Sat, 10 AM - 7 PM)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF5EE] flex items-center justify-center text-[#8F5567] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#3B2118]">Email Inquiries</h5>
                    <p className="mt-0.5">concierge@muskansstitching.com</p>
                  </div>
                </div>

                {/* WhatsApp Option */}
                <div className="pt-2">
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on WhatsApp Directly</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl bg-white border border-[#E8D9C8] shadow-sm">
              <h3 className="font-serif-luxury text-2xl font-medium text-[#3B2118] mb-6">
                Send Us a Message
              </h3>

              {submitted && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Thank you! Your inquiry has been sent to our atelier stylists.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#5D4238] mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Priya Mehra"
                      className="w-full px-3.5 py-2.5 bg-[#FAF5EE] border border-[#E8D9C8] rounded-xl text-xs text-[#3B2118] focus:outline-hidden focus:border-[#8F5567]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#5D4238] mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="priya@example.com"
                      className="w-full px-3.5 py-2.5 bg-[#FAF5EE] border border-[#E8D9C8] rounded-xl text-xs text-[#3B2118] focus:outline-hidden focus:border-[#8F5567]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5D4238] mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 bg-[#FAF5EE] border border-[#E8D9C8] rounded-xl text-xs text-[#3B2118] focus:outline-hidden focus:border-[#8F5567]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5D4238] mb-1">Your Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your sizing inquiry, custom stitching request, or order question..."
                    className="w-full px-3.5 py-2.5 bg-[#FAF5EE] border border-[#E8D9C8] rounded-xl text-xs text-[#3B2118] focus:outline-hidden focus:border-[#8F5567]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#3B2118] hover:bg-[#2A160F] text-[#FAF5EE] text-xs font-bold uppercase tracking-[0.18em] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. FAQ PAGE
export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Do you offer custom tailoring and bespoke alterations?',
      a: "Yes, Muskan's Stitching provides complimentary alteration guidance and custom length adjustments for all unstitched, semi-stitched, and ready-to-wear ensembles. Connect with our atelier on WhatsApp with your exact bust, waist, and length measurements.",
    },
    {
      q: 'What fabrics do you specialize in?',
      a: 'We specialize in pure Chanderi silk, handloom raw silk, tissue organza, georgette, and breathable mulmul cotton, all adorned with hand-done zardozi, gota patti, and zari work.',
    },
    {
      q: 'How long does domestic shipping take across India?',
      a: 'Standard orders ship within 24 to 48 hours. Metro cities receive delivery in 2-3 business days, while other PIN codes typically take 3-5 business days via BlueDart and Delhivery.',
    },
    {
      q: 'What is your return and exchange policy?',
      a: 'We offer an easy 7-day size exchange guarantee. If an ensemble does not fit perfectly, our courier will pick it up and deliver the revised size promptly.',
    },
    {
      q: 'How can I care for my handcrafted ethnic garments?',
      a: 'We recommend dry cleaning for all silk, velvet, organza, and zardozi embroidered outfits to preserve the luster and delicate gold/silver threads.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF5EE] text-[#3B2118] py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.22em] font-semibold text-[#8F5567]">Help Center</span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-medium text-[#3B2118] mt-2">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-[#73574E] mt-3">
            Find answers to custom stitching, sizing, shipping, and fabric care.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E8D9C8] overflow-hidden shadow-2xs"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif-luxury text-lg font-medium text-[#3B2118] hover:text-[#8F5567] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-[#8F5567]" /> : <ChevronDown className="w-5 h-5 text-[#73574E]" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-[#5D4238] leading-relaxed border-t border-[#FAF5EE]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// 4. POLICY PAGES
export const PolicyPage: React.FC<{ type: 'shipping' | 'returns' | 'privacy' | 'terms' }> = ({ type }) => {
  const titles = {
    shipping: 'Shipping & Delivery Policy',
    returns: 'Returns & Exchanges Policy',
    privacy: 'Privacy & Data Protection Policy',
    terms: 'Terms of Service',
  };

  return (
    <div className="min-h-screen bg-[#FAF5EE] text-[#3B2118] py-14">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-[#E8D9C8] shadow-sm space-y-6 text-xs text-[#5D4238] leading-relaxed">
        <h1 className="font-serif-luxury text-3xl font-medium text-[#3B2118]">{titles[type]}</h1>
        <p>
          At Muskan's Stitching, we are committed to providing an exceptional couture experience with transparent policies that protect your purchases and personal data.
        </p>
        <h3 className="font-serif-luxury text-lg text-[#3B2118] pt-4 font-semibold">1. Overview & Commitments</h3>
        <p>
          All domestic orders over ₹1,999 enjoy complimentary express insured courier shipping with real-time tracking numbers dispatched within 24 hours of fulfillment.
        </p>
        <h3 className="font-serif-luxury text-lg text-[#3B2118] pt-2 font-semibold">2. Exchanges & Guarantees</h3>
        <p>
          Garments unworn with original tags attached can be exchanged for size within 7 days of delivery.
        </p>
      </div>
    </div>
  );
};

// 5. NOT FOUND PAGE
export const NotFoundPage: React.FC = () => {
  const { navigateTo } = useStore();
  return (
    <div className="min-h-screen bg-[#FAF5EE] flex flex-col items-center justify-center p-6 text-center text-[#3B2118]">
      <h1 className="font-serif-luxury text-6xl font-medium text-[#8F5567]">404</h1>
      <h2 className="font-serif-luxury text-2xl font-medium mt-2">Page Not Found</h2>
      <p className="text-xs text-[#73574E] mt-2 mb-6">The page you are looking for does not exist or has been relocated.</p>
      <button
        onClick={() => navigateTo('home')}
        className="px-6 py-3 bg-[#3B2118] text-[#FAF5EE] rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#2A160F] cursor-pointer"
      >
        Return to Home
      </button>
    </div>
  );
};
