import React, { useState, useMemo } from 'react';
import {
  ChevronDown,
  Sparkles,
  Scissors,
  Ruler,
  Palette,
  Tag,
  Truck,
  RotateCcw,
  PackageSearch,
  Search,
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  ShieldCheck,
  Check,
  ArrowRight,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface FAQItem {
  id: string;
  category: 'stitching' | 'sizes-colors' | 'pricing' | 'delivery' | 'returns';
  categoryLabel: string;
  icon: React.ElementType;
  question: string;
  answer: string;
  highlights: string[];
  actionLabel?: string;
  actionRoute?: string;
  actionType?: 'route' | 'size-guide' | 'contact';
}

export const FAQSection: React.FC = () => {
  const { navigateTo, setIsSizeGuideOpen } = useStore();
  const [openId, setOpenId] = useState<string | null>('faq-stitching');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const faqList: FAQItem[] = useMemo(
    () => [
      {
        id: 'faq-stitching',
        category: 'stitching',
        categoryLabel: 'Stitching Services',
        icon: Scissors,
        question: "What bespoke stitching and custom tailoring services does Muskan's Stitching offer?",
        answer:
          "Every Muskan's Stitching garment is crafted with atelier-grade custom stitching. When you order, our master karigars tailor each piece to your exact proportions—including bust, waist, hips, preferred kurti length, shoulder width, and sleeve contours. We provide premium internal linings (pure breathable cotton mulmul, lustrous shantoon, or soft butter crepe) and ensure generous 1.5 to 2-inch internal seam margins for effortless future adjustments.",
        highlights: [
          'Handcrafted made-to-measure tailoring tailored to your unique silhouette',
          'Premium inner linings: pure mulmul, shantoon, and butter crepe',
          'Generous 2-inch internal seam margins for easy future adjustments',
          'Custom neckline depths, sleeve fits, and side slit customization',
        ],
        actionLabel: 'Explore Bespoke Craftsmanship',
        actionRoute: 'about',
        actionType: 'route',
      },
      {
        id: 'faq-sizes',
        category: 'sizes-colors',
        categoryLabel: 'Sizes & Measurements',
        icon: Ruler,
        question: 'What sizes are available in Kurtis, Anarkalis, and Ethnic Wear?',
        answer:
          'We cater to sizes ranging from XS to XXL across all ready-to-wear short kurtis, co-ord sets, party wear, and festive lehengas. Standard sizing accommodates bust measurements from 34 inches (XS) to 44 inches (XXL). If your measurements fall between sizes or you have specific height requirements (e.g. floor-length Anarkalis or cropped kurtis), you can select our Made-to-Measure option or reference our comprehensive Size Guide.',
        highlights: [
          'Standard Size Range: XS (34"), S (36"), M (38"), L (40"), XL (42"), XXL (44")',
          'Bespoke Made-to-Measure option for custom bust, waist, and length measurements',
          'Petite and tall height adjustments available on request',
          'Interactive Size Guide modal available on every product page',
        ],
        actionLabel: 'Open Interactive Size Guide',
        actionType: 'size-guide',
      },
      {
        id: 'faq-colors',
        category: 'sizes-colors',
        categoryLabel: 'Colors & Palettes',
        icon: Palette,
        question: 'What color options and palettes are available across your collections?',
        answer:
          "Muskan's Stitching curates both romantic daytime pastels and opulent ceremonial jewel tones. Our signature palettes include Soft Blushing Pink, Powder Blue, Sage Green, Muted Mauve, Lavender, Ivory, Cream, and Shimmering Champagne, alongside royal festive hues such as Deep Burgundy, Royal Wine, Ceremonial Crimson Red, Emerald Green, Chartreuse Lime, Terracotta Rust, and Antique Bronze Gold. Every product card features interactive color swatches so you can preview available shades before adding to cart.",
        highlights: [
          'Romantic Pastels: Blush Rose, Mint Green, Powder Blue, Dusty Mauve, Lilac, and Ivory',
          'Regal Festive Tones: Deep Burgundy, Emerald Green, Crimson Red, Scarlet, and Terracotta',
          'Color-true yarn dyeing with pure natural silk, raw silk, and micro-velvet fibers',
          'Interactive color swatches on every product card with live selection',
        ],
        actionLabel: 'Explore All Collections',
        actionRoute: 'shop',
        actionType: 'route',
      },
      {
        id: 'faq-customization',
        category: 'stitching',
        categoryLabel: 'Customization',
        icon: Sparkles,
        question: 'Can I customize the design, neckline, sleeve length, or trouser style?',
        answer:
          "Yes, bespoke design customization is at the heart of Muskan's Stitching. You can request modest or plunge necklines (sweetheart, boat neck, round scoop, or Mandarin collared), modify sleeve lengths (sleeveless, elbow-length, 3/4th, or full churidar sleeves), alter kurti side-slit heights, specify trouser styles (straight cigarette pants, elasticated wide palazzos, or tiered sharara kalis), or add extra cancan netting to festive gowns.",
        highlights: [
          'Neckline variations: Sweetheart, Boat Neck, Deep V, Round Scoop, Mandarin Collar',
          'Sleeve styles: Sleeveless, Short, Elbow 3/4th, and Full Fluted Sleeves',
          'Trouser tailoring: Straight cigarette pants, wide-leg palazzos, or tiered shararas',
          'Cancan volume adjustments for flared Anarkalis and lehengas',
        ],
        actionLabel: 'Contact Concierge for Custom Orders',
        actionRoute: 'contact',
        actionType: 'route',
      },
      {
        id: 'faq-pricing',
        category: 'pricing',
        categoryLabel: 'Pricing & Surcharges',
        icon: Tag,
        question: "How does Muskan's Stitching pricing work, and are there extra fees for custom stitching?",
        answer:
          'We practice transparent direct-to-consumer luxury pricing. Everyday designer short kurtis start at ₹2,799, contemporary 2-piece co-ord sets start at ₹3,999, and heirloom festive and bridal Anarkalis range from ₹6,499 to ₹14,500. Standard custom sizing adjustments are complimentary with zero extra fees. All prices are all-inclusive of taxes, with complimentary insured shipping on orders above ₹1,999.',
        highlights: [
          'Transparent luxury pricing with no hidden stitching surcharges',
          'Handcrafted Short Kurtis from ₹2,799 · Co-ord Sets from ₹3,999',
          'Heirloom Festive & Party Wear from ₹6,499 to ₹14,500',
          'Complimentary standard custom alterations included on every order',
        ],
        actionLabel: 'View Current Shop Catalog',
        actionRoute: 'shop',
        actionType: 'route',
      },
      {
        id: 'faq-delivery',
        category: 'delivery',
        categoryLabel: 'Delivery & Shipping',
        icon: Truck,
        question: 'What are your delivery timelines and shipping fees across India?',
        answer:
          'Ready-to-wear pieces are dispatched within 24 to 48 hours and delivered within 3 to 5 business days. Made-to-measure bespoke stitched garments require 4 to 6 days of karigar handcrafting and arrive in 5 to 8 business days. We provide 100% complimentary express shipping across India for all orders over ₹1,999 (a nominal ₹150 shipping fee applies to orders below ₹1,999).',
        highlights: [
          'Complimentary express shipping across India on orders above ₹1,999',
          'Ready-to-wear dispatch in 24–48 hours (3–5 business days delivery)',
          'Bespoke hand-stitched orders delivered in 5–8 business days',
          'Pan-India delivery covering 27,000+ PIN codes via Blue Dart and Delhivery',
        ],
        actionLabel: 'Read Full Shipping Policy',
        actionRoute: 'shipping-policy',
        actionType: 'route',
      },
      {
        id: 'faq-returns',
        category: 'returns',
        categoryLabel: 'Returns & Alterations',
        icon: RotateCcw,
        question: 'What is your return, size exchange, and alteration policy?',
        answer:
          'We offer a worry-free 7-day return and size exchange guarantee. If your outfit requires minor fitting adjustments or you wish to exchange sizes, our concierge arranges complimentary doorstep reverse pickup. We will happily alter the garment at our New Delhi atelier or issue an immediate size exchange. Unworn garments with intact original security tags qualify for prompt refunds or store credit.',
        highlights: [
          '7-Day hassle-free return and size exchange guarantee from delivery date',
          'Free doorstep reverse pickup coordinated by our courier partners',
          'Complimentary atelier alterations if minor fitting tweaks are desired',
          'Prompt refund processing to original payment method or instant store credit',
        ],
        actionLabel: 'View Returns & Exchange Policy',
        actionRoute: 'returns-policy',
        actionType: 'route',
      },
      {
        id: 'faq-tracking',
        category: 'delivery',
        categoryLabel: 'Order Tracking',
        icon: PackageSearch,
        question: "How can I track my Muskan's Stitching order and courier delivery status?",
        answer:
          'Tracking your order is seamless! As soon as your garment is hand-inspected and dispatched from our atelier, you will receive an SMS, WhatsApp notification, and email containing your tracking number and courier link. You can also visit our "Track Order" page at any time and enter your Order Number (e.g. STCH-10024) to view live real-time transit updates from dispatch to doorstep delivery.',
        highlights: [
          'Real-time courier tracking through our dedicated Track Order portal',
          'Instant SMS and WhatsApp updates at every transit checkpoint',
          'Detailed transit milestones: Confirmed, In Atelier, Shipped, Out for Delivery',
          'Direct customer concierge assistance if you need delivery scheduling',
        ],
        actionLabel: 'Go to Track Order Portal',
        actionRoute: 'track',
        actionType: 'route',
      },
      {
        id: 'faq-textiles-care',
        category: 'returns',
        categoryLabel: 'Fabric & Garment Care',
        icon: ShieldCheck,
        question: 'How should I care for pure silk, micro-velvet, and hand-embroidered zardozi garments?',
        answer:
          'Due to the delicate nature of pure mulberry silk, modal chanderi, micro-velvet, and hand-embellished gotapatti and zardozi needlework, we strongly advise professional dry cleaning only. Store your garments wrapped in breathable cotton or muslin wraps in a cool, dark closet away from direct sunlight. When smoothing out travel folds, use a gentle reverse steam press and avoid pressing directly over raised metallic zari or mirror-work.',
        highlights: [
          'Professional dry clean only recommended for all embellished and silk pieces',
          'Gentle reverse steam press; avoid placing iron directly on zardozi or mirror-work',
          'Store in pure cotton or muslin garment bags to protect metallic threads',
          'Keep away from direct perfumes, moisture, and intense daylight',
        ],
        actionLabel: 'Contact Atelier for Care Advice',
        actionRoute: 'contact',
        actionType: 'route',
      },
      {
        id: 'faq-payments',
        category: 'pricing',
        categoryLabel: 'Payment Methods & COD',
        icon: HelpCircle,
        question: 'What payment methods do you accept, and is Cash on Delivery (COD) available?',
        answer:
          'We accept all major secure payment methods via 256-bit SSL encrypted Razorpay checkout, including UPI (Google Pay, PhonePe, Paytm, BHIM), all domestic and international Credit/Debit cards (Visa, MasterCard, RuPay, Amex), and Net Banking. Verified Cash on Delivery (COD) is also available across eligible PIN codes across India for orders up to ₹15,000.',
        highlights: [
          '100% Secure 256-Bit SSL checkout powered by Razorpay',
          'UPI payments supported: Google Pay, PhonePe, Paytm, and BHIM',
          'Credit/Debit Cards (Visa, MasterCard, RuPay, Amex) and Net Banking',
          'Verified Cash on Delivery (COD) available across India',
        ],
        actionLabel: 'Start Shopping',
        actionRoute: 'shop',
        actionType: 'route',
      },
    ],
    []
  );

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'stitching', label: 'Stitching & Customization' },
    { id: 'sizes-colors', label: 'Sizes & Colors' },
    { id: 'pricing', label: 'Pricing & Payments' },
    { id: 'delivery', label: 'Delivery & Tracking' },
    { id: 'returns', label: 'Returns & Care' },
  ];

  const filteredFaqs = useMemo(() => {
    return faqList.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.highlights.some((h) =>
          h.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [faqList, activeCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleActionClick = (item: FAQItem) => {
    if (item.actionType === 'size-guide') {
      setIsSizeGuideOpen(true);
    } else if (item.actionRoute) {
      navigateTo(item.actionRoute as any);
    }
  };

  return (
    <section
      id="faq-section"
      className="bg-[#FAF5EE] border-t border-[#E8D9C8] py-16 sm:py-20 lg:py-24 scroll-mt-24 transition-colors"
      aria-label="Frequently Asked Questions"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* 1. Traditional Luxury Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E8D9C8] text-[#8F5567] text-[11px] font-semibold tracking-[0.22em] uppercase shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#B77D8D]" />
            <span>Concierge Guidance · Atelier Knowledge</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#3B2118] font-normal tracking-tight">
            Frequently Asked Questions
          </h2>

          <div className="flex items-center justify-center gap-3 my-2">
            <div className="w-12 h-px bg-[#E8D9C8]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#B77D8D]" />
            <div className="w-12 h-px bg-[#E8D9C8]" />
          </div>

          <p className="text-xs sm:text-sm text-[#73574E] leading-relaxed max-w-2xl mx-auto font-light">
            Everything you need to know about our bespoke stitching services, ethnic sizes, romantic color palettes, custom tailoring adjustments, transparent pricing, and seamless door-to-door pan-India delivery.
          </p>
        </div>

        {/* 2. Interactive Search & Category Filter Controls */}
        <div className="space-y-4">
          {/* Quick Search Input */}
          <div className="relative max-w-xl mx-auto">
            <Search className="w-4 h-4 text-[#73574E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g., stitching, kurti sizes, colors, returns, delivery)..."
              className="w-full pl-10 pr-10 py-2.5 sm:py-3 bg-white border border-[#E8D9C8] rounded-full text-xs sm:text-sm text-[#3B2118] placeholder-[#73574E]/60 focus:outline-none focus:border-[#8F5567] focus:ring-1 focus:ring-[#8F5567]/30 transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#73574E] hover:text-[#3B2118] cursor-pointer"
                aria-label="Clear search"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills & Expand/Collapse Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wider transition-all whitespace-nowrap cursor-pointer shrink-0 border ${
                    activeCategory === cat.id
                      ? 'bg-[#3B2118] text-[#FAF5EE] border-[#3B2118] shadow-xs'
                      : 'bg-white hover:bg-[#F4EDE4] text-[#5D4238] border-[#E8D9C8]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2 text-xs text-[#73574E] shrink-0">
              <button
                type="button"
                onClick={() => setOpenId(openId ? null : (filteredFaqs[0]?.id || 'faq-stitching'))}
                className="hover:text-[#3B2118] underline font-medium text-[11px] cursor-pointer"
              >
                {openId ? 'Collapse All' : 'Expand Top Question'}
              </button>
              <span>·</span>
              <span className="text-[11px]">{filteredFaqs.length} Questions</span>
            </div>
          </div>
        </div>

        {/* 3. Expandable Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-[#E8D9C8] p-8 space-y-3">
              <HelpCircle className="w-8 h-8 text-[#8F5567] mx-auto opacity-70" />
              <h3 className="font-serif-luxury text-lg text-[#3B2118]">No Matching Questions Found</h3>
              <p className="text-xs text-[#73574E] max-w-md mx-auto">
                We could not find answers matching &ldquo;{searchQuery}&rdquo;. Try another keyword or connect directly with our personal boutique concierge.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="mt-2 px-4 py-2 bg-[#3B2118] text-[#FAF5EE] text-xs font-semibold rounded-full hover:bg-[#523024] cursor-pointer transition-colors"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openId === faq.id;
              const IconComponent = faq.icon;

              return (
                <div
                  key={faq.id}
                  className={`bg-white rounded-xl sm:rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'border-[#B77D8D] shadow-md ring-1 ring-[#B77D8D]/20'
                      : 'border-[#E8D9C8] hover:border-[#B77D8D]/60 hover:shadow-2xs'
                  }`}
                >
                  {/* Clickable Question Header Button */}
                  <button
                    type="button"
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-start sm:items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                  >
                    <div className="flex items-start sm:items-center gap-3.5">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                          isOpen
                            ? 'bg-[#3B2118] text-[#FAF5EE]'
                            : 'bg-[#FAF5EE] text-[#8F5567] border border-[#E8D9C8]'
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8F5567]">
                            {faq.categoryLabel}
                          </span>
                          <span className="text-[#E8D9C8] text-xs">•</span>
                          <span className="text-[10px] text-[#73574E]/70 font-medium">
                            0{index + 1}
                          </span>
                        </div>
                        <h3 className="font-serif-luxury text-base sm:text-lg text-[#3B2118] font-normal leading-snug">
                          {faq.question}
                        </h3>
                      </div>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 border ${
                        isOpen
                          ? 'rotate-180 bg-[#FAF5EE] border-[#B77D8D] text-[#8F5567]'
                          : 'bg-white border-[#E8D9C8] text-[#73574E]'
                      }`}
                      aria-hidden="true"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Expandable Answer Section */}
                  {isOpen && (
                    <div
                      id={`faq-answer-${faq.id}`}
                      className="px-4 sm:px-5 pb-5 pt-1 space-y-4 border-t border-[#F4EDE4] text-xs sm:text-[13px] text-[#5D4238] leading-relaxed animate-in fade-in-50 duration-200"
                    >
                      <p className="font-light text-[#4A3229] leading-relaxed pt-2">
                        {faq.answer}
                      </p>

                      {/* Key Highlights Bullet Pills */}
                      {faq.highlights && faq.highlights.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {faq.highlights.map((item, hIdx) => (
                            <div
                              key={hIdx}
                              className="flex items-start gap-2 bg-[#FAF5EE] p-2.5 rounded-lg border border-[#E8D9C8]/80 text-[11.5px] text-[#3B2118]"
                            >
                              <Check className="w-3.5 h-3.5 text-[#8F5567] shrink-0 mt-0.5 stroke-[2.5]" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Quick Action Button within the Answer */}
                      {faq.actionLabel && (
                        <div className="pt-2 flex items-center justify-start">
                          <button
                            type="button"
                            onClick={() => handleActionClick(faq)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FAF5EE] hover:bg-[#3B2118] text-[#3B2118] hover:text-[#FAF5EE] border border-[#3B2118] rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow-2xs active:scale-95 cursor-pointer"
                          >
                            <span>{faq.actionLabel}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* 4. Atelier Concierge Support Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E8D9C8] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-start sm:items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
            <div className="w-14 h-14 rounded-full bg-[#FAF5EE] border border-[#E8D9C8] flex items-center justify-center shrink-0 text-[#8F5567] mx-auto sm:mx-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif-luxury text-lg text-[#3B2118] font-medium">
                Have a Custom Stitching or Wedding Outfit Request?
              </h4>
              <p className="text-xs text-[#73574E] leading-relaxed max-w-xl">
                Our master karigars and bridal stylists are available for one-on-one virtual consultations, custom fabric sourcing, and urgent delivery coordination.
              </p>
              <div className="text-[11px] text-[#8F5567] font-medium pt-0.5">
                Atelier Hours: Mon – Sat · 10:00 AM – 7:30 PM IST
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={() => navigateTo('contact')}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#3B2118] hover:bg-[#523024] text-[#FAF5EE] rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer text-center"
            >
              Contact Boutique Concierge
            </button>
            <button
              onClick={() => navigateTo('track')}
              className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-[#FAF5EE] text-[#3B2118] border border-[#E8D9C8] rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer text-center"
            >
              Track Your Order
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
