import fs from 'fs';
import path from 'path';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  phone?: string;
  role: 'CUSTOMER' | 'ADMIN';
  createdAt: string;
}

export interface Address {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl?: string;
  isActive: boolean;
}

export interface ProductVariant {
  id: string;
  productId: string;
  size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  color: string;
  colorHex?: string;
  stock: number;
  sku: string;
  price?: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  sku: string;
  description: string;
  shortDesc: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  fabric: string;
  careInstructions: string;
  occasion: string;
  fit: string;
  categoryId: string;
  colors?: string[];
  images: { id: string; url: string; alt: string; isPrimary: boolean }[];
  variants: ProductVariant[];
  featured: boolean;
  bestSeller: boolean;
  isNewArrival: boolean;
  isActive: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface CartItem {
  id: string;
  userId?: string;
  sessionId?: string;
  productId: string;
  variantId?: string;
  size: string;
  color: string;
  quantity: number;
  createdAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  variantId?: string;
  productName: string;
  productImage: string;
  size: string;
  color: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  totalAmount: number;
  couponCode?: string;
  status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';
  paymentMethod: 'RAZORPAY' | 'COD';
  paymentStatus: 'PENDING' | 'AUTHORIZED' | 'CAPTURED' | 'FAILED';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  trackingNumber?: string;
  estimatedDelivery: string;
  deliveryNotes?: string;
  shippingAddress: {
    fullName: string;
    phone: string;
    street: string;
    landmark?: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountPercent?: number;
  discountFlat?: number;
  minOrderValue: number;
  maxDiscount?: number;
  isActive: boolean;
  timesUsed: number;
}

export interface Review {
  id: string;
  productId: string;
  userId?: string;
  authorName: string;
  rating: number;
  title: string;
  comment: string;
  isVerified: boolean;
  isApproved: boolean;
  createdAt: string;
}

interface DatabaseSchema {
  users: User[];
  addresses: Address[];
  categories: Category[];
  products: Product[];
  cartItems: CartItem[];
  wishlist: { userId: string; productIds: string[] }[];
  orders: Order[];
  coupons: Coupon[];
  reviews: Review[];
  newsletterSubscribers: { email: string; createdAt: string }[];
  siteSettings: {
    codEnabled: boolean;
    freeShippingThreshold: number;
    standardShippingFee: number;
    announcementBarText?: string;
    announcementBarEnabled?: boolean;
    supportPhone?: string;
    supportWhatsApp?: string;
    supportEmail?: string;
    atelierAddress?: string;
  };
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'stitchora.json');

const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-ethnic-suits',
    slug: 'ethnic-suits',
    name: 'Ethnic Dresses',
    description: 'Timeless handcrafted Anarkalis, Flared Gowns, and Ethnic Dresses embroidered with heritage craft.',
    imageUrl: '/src/assets/images/stitchora_ivory_anarkali_suit_1791889229520.jpg',
    isActive: true,
  },
  {
    id: 'cat-short-kurtis',
    slug: 'short-kurtis',
    name: 'Short Kurtis',
    description: 'Chic, everyday luxury and festive short kurtis tailored with breathable handlooms, peplum silhouettes, and fine embroidery.',
    imageUrl: '/src/assets/images/chikankari_short_kurti_1792148571659.jpg',
    isActive: true,
  },
  {
    id: 'cat-coord-sets',
    slug: 'coord-sets',
    name: 'Co-ord Sets',
    description: 'Chic, tailored modern luxury sets designed for effortless contemporary versatility.',
    imageUrl: '/src/assets/images/stitchora_coord_set_blush_1791889230186.jpg',
    isActive: true,
  },
  {
    id: 'cat-party-wear',
    slug: 'party-wear',
    name: 'Party Wear',
    description: 'Bespoke tiered silhouettes, ethereal georgettes, and sculptural modern Indo-Western cocktail attire.',
    imageUrl: '/src/assets/images/stitchora_mauve_layered_dress_1791889228209.jpg',
    isActive: true,
  },
  {
    id: 'cat-festive-wear',
    slug: 'festive-wear',
    name: 'Festive Wear',
    description: 'Regal micro-velvet, pure mulberry silk, and heirloom zardozi masterpieces for celebrations.',
    imageUrl: '/src/assets/images/stitchora_espresso_velvet_suit_1791889230693.jpg',
    isActive: true,
  },
];

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-ivory-anarkali-suit',
    slug: 'the-royal-ivory-zari-anarkali-suit',
    name: 'The Royal Ivory & Zari Anarkali Suit',
    sku: 'STCH-IV-02',
    shortDesc: 'Warm ivory hand-woven Chanderi silk Anarkali set embellished with antique gold gota patti and zardozi.',
    description: 'Exuding aristocratic poise, this ivory Anarkali suit set is handcrafted on fine Chanderi silk. The regal kali pattern features hand-beaded antique gold marodi and zardozi embroidery along the yoke and voluminous hemline. Complemented by tailored churidar pants and a featherlight sheer organza dupatta finished with delicate zari kiran.',
    price: 12999,
    originalPrice: 16500,
    discountPercent: 21,
    fabric: 'Pure Chanderi Silk with Shantoon Lining',
    careInstructions: 'Strictly dry clean only. Light iron on reverse side under protective cloth.',
    occasion: 'Weddings, Reception, Festive Puja, Eid',
    fit: 'Classic Kalidar Flare with Tailored Bodice',
    categoryId: 'cat-ethnic-suits',
    images: [
      {
        id: 'img-2-1',
        url: '/src/assets/images/stitchora_ivory_anarkali_suit_1791889229520.jpg',
        alt: 'STITCHORA Royal Ivory & Zari Anarkali Suit Set',
        isPrimary: true,
      },
    ],
    variants: [
      { id: 'v-2-xs', productId: 'prod-ivory-anarkali-suit', size: 'XS', color: 'Warm Ivory', colorHex: '#F8F0E6', stock: 4, sku: 'STCH-IV-02-XS' },
      { id: 'v-2-s', productId: 'prod-ivory-anarkali-suit', size: 'S', color: 'Warm Ivory', colorHex: '#F8F0E6', stock: 8, sku: 'STCH-IV-02-S' },
      { id: 'v-2-m', productId: 'prod-ivory-anarkali-suit', size: 'M', color: 'Warm Ivory', colorHex: '#F8F0E6', stock: 10, sku: 'STCH-IV-02-M' },
      { id: 'v-2-l', productId: 'prod-ivory-anarkali-suit', size: 'L', color: 'Warm Ivory', colorHex: '#F8F0E6', stock: 7, sku: 'STCH-IV-02-L' },
      { id: 'v-2-xl', productId: 'prod-ivory-anarkali-suit', size: 'XL', color: 'Warm Ivory', colorHex: '#F8F0E6', stock: 5, sku: 'STCH-IV-02-XL' },
      { id: 'v-2-xxl', productId: 'prod-ivory-anarkali-suit', size: 'XXL', color: 'Warm Ivory', colorHex: '#F8F0E6', stock: 2, sku: 'STCH-IV-02-XXL' },
    ],
    featured: true,
    bestSeller: true,
    isNewArrival: false,
    isActive: true,
    rating: 4.8,
    reviewCount: 29,
    createdAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 'prod-coord-set-blush',
    slug: 'rose-mauve-tailored-raw-silk-coord-set',
    name: 'Rose Mauve Tailored Raw Silk Co-ord Set',
    sku: 'STCH-CR-03',
    shortDesc: 'Modern power luxury 2-piece co-ord set with lapel embroidery and relaxed high-waisted palazzo trousers.',
    description: 'Redefining contemporary Indian power dressing, this Rose Mauve ensemble marries sharp structural tailoring with delicate artisanal sensibilities. Features an architectural single-button structured jacket adorned with tonal cutdana cuffs and lapel accents, paired with impeccably pleated wide-leg silk trousers.',
    price: 6999,
    originalPrice: 8999,
    discountPercent: 22,
    fabric: 'Handloom Raw Silk & Viscose Satin',
    careInstructions: 'Professional dry clean only. Steam press.',
    occasion: 'Contemporary Soiree, Intimate Dinner, Pre-wedding brunch',
    fit: 'Tailored Blazer Silhouette with Wide-Leg Trousers',
    categoryId: 'cat-coord-sets',
    images: [
      {
        id: 'img-3-1',
        url: '/src/assets/images/stitchora_coord_set_blush_1791889230186.jpg',
        alt: 'STITCHORA Rose Mauve Tailored Raw Silk Co-ord Set',
        isPrimary: true,
      },
    ],
    variants: [
      { id: 'v-3-xs', productId: 'prod-coord-set-blush', size: 'XS', color: 'Dusty Rose', colorHex: '#B77D8D', stock: 6, sku: 'STCH-CR-03-XS' },
      { id: 'v-3-s', productId: 'prod-coord-set-blush', size: 'S', color: 'Dusty Rose', colorHex: '#B77D8D', stock: 14, sku: 'STCH-CR-03-S' },
      { id: 'v-3-m', productId: 'prod-coord-set-blush', size: 'M', color: 'Dusty Rose', colorHex: '#B77D8D', stock: 12, sku: 'STCH-CR-03-M' },
      { id: 'v-3-l', productId: 'prod-coord-set-blush', size: 'L', color: 'Dusty Rose', colorHex: '#B77D8D', stock: 9, sku: 'STCH-CR-03-L' },
      { id: 'v-3-xl', productId: 'prod-coord-set-blush', size: 'XL', color: 'Dusty Rose', colorHex: '#B77D8D', stock: 4, sku: 'STCH-CR-03-XL' },
      { id: 'v-3-xxl', productId: 'prod-coord-set-blush', size: 'XXL', color: 'Dusty Rose', colorHex: '#B77D8D', stock: 3, sku: 'STCH-CR-03-XXL' },
    ],
    featured: true,
    bestSeller: false,
    isNewArrival: true,
    isActive: true,
    rating: 4.7,
    reviewCount: 22,
    createdAt: '2026-03-12T10:00:00Z',
  },
  {
    id: 'prod-espresso-velvet-suit',
    slug: 'espresso-velvet-scalloped-kurta-set',
    name: 'Espresso Velvet Scalloped Kurta Set',
    sku: 'STCH-EV-04',
    shortDesc: 'Regal espresso brown micro-velvet kurta set with antique bronze zardozi and scalloped organza dupatta.',
    description: 'Crafted for winter weddings and celebratory galas, this opulent ensemble in deep espresso brown velvet is embroidered with intricate antique bronze bullion wire and dabka work. Features a stately straight kurta with scalloped hemline, velvet cigarette trousers, and a luxurious tissue dupatta.',
    price: 14500,
    originalPrice: 18900,
    discountPercent: 23,
    fabric: 'Plush Silk Velvet & Pure Tissue Organza',
    careInstructions: 'Dry clean only. Do not iron directly on velvet pile.',
    occasion: 'Winter Weddings, Sangeet, Grand Receptions',
    fit: 'Regal Straight Cut with Tapered Trousers',
    categoryId: 'cat-festive-wear',
    images: [
      {
        id: 'img-4-1',
        url: '/src/assets/images/stitchora_espresso_velvet_suit_1791889230693.jpg',
        alt: 'STITCHORA Espresso Velvet Scalloped Kurta Set',
        isPrimary: true,
      },
    ],
    variants: [
      { id: 'v-4-xs', productId: 'prod-espresso-velvet-suit', size: 'XS', color: 'Espresso Brown', colorHex: '#3B2118', stock: 3, sku: 'STCH-EV-04-XS' },
      { id: 'v-4-s', productId: 'prod-espresso-velvet-suit', size: 'S', color: 'Espresso Brown', colorHex: '#3B2118', stock: 7, sku: 'STCH-EV-04-S' },
      { id: 'v-4-m', productId: 'prod-espresso-velvet-suit', size: 'M', color: 'Espresso Brown', colorHex: '#3B2118', stock: 9, sku: 'STCH-EV-04-M' },
      { id: 'v-4-l', productId: 'prod-espresso-velvet-suit', size: 'L', color: 'Espresso Brown', colorHex: '#3B2118', stock: 5, sku: 'STCH-EV-04-L' },
      { id: 'v-4-xl', productId: 'prod-espresso-velvet-suit', size: 'XL', color: 'Espresso Brown', colorHex: '#3B2118', stock: 4, sku: 'STCH-EV-04-XL' },
      { id: 'v-4-xxl', productId: 'prod-espresso-velvet-suit', size: 'XXL', color: 'Espresso Brown', colorHex: '#3B2118', stock: 2, sku: 'STCH-EV-04-XXL' },
    ],
    featured: true,
    bestSeller: true,
    isNewArrival: false,
    isActive: true,
    rating: 5.0,
    reviewCount: 31,
    createdAt: '2026-02-20T10:00:00Z',
  },
  {
    id: 'prod-festive-indowestern-mustard',
    slug: 'festive-mustard-yellow-indowestern-skirt-set',
    name: 'Festive Mustard Indo-Western Skirt & Jacket Set',
    sku: 'STCH-IW-06',
    shortDesc: 'Mustard yellow flared skirt with a colorful printed crop top and matching embroidered jacket.',
    description: 'An exuberant blend of traditional Indian craftsmanship and contemporary silhouette. This festive Indo-Western ensemble features a voluminous flared pleated skirt in radiant mustard yellow, paired with an artfully printed sweetheart crop top and a tailored jacket with fine zari and mirror borders. Made with bespoke precision for memorable celebrations.',
    price: 9499,
    originalPrice: 12999,
    discountPercent: 27,
    fabric: 'Georgette, Silk Blend & Shantoon',
    careInstructions: 'Dry clean only. Gentle steam press on reverse.',
    occasion: 'Festive Celebrations, Sangeet, Mehendi, Haldi',
    fit: 'Flared Skirt with Tailored Crop Top & Jacket',
    categoryId: 'cat-festive-wear',
    images: [
      {
        id: 'img-mustard-1',
        url: '/images/Screenshot 2026-10-16 160255.png',
        alt: 'Festive Indo-Western Wear: Mustard yellow flared skirt with colorful printed crop top and matching jacket',
        isPrimary: true,
      },
    ],
    variants: [
      { id: 'v-mustard-xs', productId: 'prod-festive-indowestern-mustard', size: 'XS', color: 'Mustard Yellow', colorHex: '#D4A017', stock: 5, sku: 'STCH-IW-06-XS' },
      { id: 'v-mustard-s', productId: 'prod-festive-indowestern-mustard', size: 'S', color: 'Mustard Yellow', colorHex: '#D4A017', stock: 9, sku: 'STCH-IW-06-S' },
      { id: 'v-mustard-m', productId: 'prod-festive-indowestern-mustard', size: 'M', color: 'Mustard Yellow', colorHex: '#D4A017', stock: 12, sku: 'STCH-IW-06-M' },
      { id: 'v-mustard-l', productId: 'prod-festive-indowestern-mustard', size: 'L', color: 'Mustard Yellow', colorHex: '#D4A017', stock: 8, sku: 'STCH-IW-06-L' },
      { id: 'v-mustard-xl', productId: 'prod-festive-indowestern-mustard', size: 'XL', color: 'Mustard Yellow', colorHex: '#D4A017', stock: 4, sku: 'STCH-IW-06-XL' },
      { id: 'v-mustard-xxl', productId: 'prod-festive-indowestern-mustard', size: 'XXL', color: 'Mustard Yellow', colorHex: '#D4A017', stock: 3, sku: 'STCH-IW-06-XXL' },
    ],
    featured: true,
    bestSeller: true,
    isNewArrival: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 18,
    createdAt: '2026-03-20T10:00:00Z',
  },
  {
    id: 'prod-luxury-bridal-lehenga',
    slug: 'heritage-crimson-zardozi-bridal-lehenga',
    name: 'Heritage Crimson Zardozi Luxury Bridal Lehenga',
    sku: 'STCH-BR-07',
    shortDesc: 'Richly embroidered bridal lehenga with intricate traditional patterns and a matching sheer dupatta.',
    description: 'An aristocratic bridal masterpiece celebrating traditional Indian hand embroidery. Crafted in rich crimson red mulberry silk with heritage zardozi, kundan work, and intricate floral paisleys across heavy kalis. Paired with a fitted sweetheart choli and a sheer dupatta with ornate embroidered scalloped borders.',
    price: 48500,
    originalPrice: 59000,
    discountPercent: 18,
    fabric: 'Pure Mulberry Silk, Velvet & Handloom Organza',
    careInstructions: 'Specialized bridal heirloom dry clean and preservation.',
    occasion: 'Bridal Ceremony, Wedding Pheras, Grand Reception',
    fit: 'Kalidar Voluminous Bridal Flare with Custom Fitted Blouse',
    categoryId: 'cat-ethnic-suits',
    images: [
      {
        id: 'img-bridal-1',
        url: '/images/Screenshot 2026-10-13 170212.png',
        alt: 'Luxury Bridal Wear: Richly embroidered lehenga with intricate traditional patterns and matching dupatta',
        isPrimary: true,
      },
    ],
    variants: [
      { id: 'v-bridal-xs', productId: 'prod-luxury-bridal-lehenga', size: 'XS', color: 'Crimson Red', colorHex: '#9B111E', stock: 3, sku: 'STCH-BR-07-XS' },
      { id: 'v-bridal-s', productId: 'prod-luxury-bridal-lehenga', size: 'S', color: 'Crimson Red', colorHex: '#9B111E', stock: 5, sku: 'STCH-BR-07-S' },
      { id: 'v-bridal-m', productId: 'prod-luxury-bridal-lehenga', size: 'M', color: 'Crimson Red', colorHex: '#9B111E', stock: 6, sku: 'STCH-BR-07-M' },
      { id: 'v-bridal-l', productId: 'prod-luxury-bridal-lehenga', size: 'L', color: 'Crimson Red', colorHex: '#9B111E', stock: 4, sku: 'STCH-BR-07-L' },
      { id: 'v-bridal-xl', productId: 'prod-luxury-bridal-lehenga', size: 'XL', color: 'Crimson Red', colorHex: '#9B111E', stock: 2, sku: 'STCH-BR-07-XL' },
      { id: 'v-bridal-xxl', productId: 'prod-luxury-bridal-lehenga', size: 'XXL', color: 'Crimson Red', colorHex: '#9B111E', stock: 2, sku: 'STCH-BR-07-XXL' },
    ],
    featured: true,
    bestSeller: true,
    isNewArrival: true,
    isActive: true,
    rating: 5.0,
    reviewCount: 42,
    createdAt: '2026-03-21T10:00:00Z',
  },
  {
    id: 'prod-traditional-royal-blue',
    slug: 'royal-blue-silver-zari-anarkali-suit',
    name: 'Royal Blue Silver Zari Anarkali Ensemble',
    sku: 'STCH-RB-08',
    shortDesc: 'Royal blue ethnic outfit with detailed silver embroidery and a graceful flowing silhouette.',
    description: 'Exemplifying majestic poise, this royal sapphire blue ensemble is embellished with gleaming fine silver thread and silver zari needlework. Designed with a sweeping floor-length flared silhouette, structured neckline, tailored trousers, and a fluid matching dupatta with intricate embroidered borders.',
    price: 13999,
    originalPrice: 17500,
    discountPercent: 20,
    fabric: 'Royal Banarasi Silk & Chiffon',
    careInstructions: 'Dry clean only. Store wrapped in soft muslin cloth.',
    occasion: 'Royal Celebrations, Sangeet, Festive Receptions',
    fit: 'Flowing Kalidar Silhouette with Fitted Bodice',
    categoryId: 'cat-ethnic-suits',
    images: [
      {
        id: 'img-royal-blue-1',
        url: '/src/assets/images/traditional_royal_blue_1792147981305.jpg',
        alt: 'Elegant Traditional Wear: Royal blue ethnic outfit with detailed silver embroidery and flowing silhouette',
        isPrimary: true,
      },
    ],
    variants: [
      { id: 'v-blue-xs', productId: 'prod-traditional-royal-blue', size: 'XS', color: 'Royal Blue', colorHex: '#1E3F8A', stock: 4, sku: 'STCH-RB-08-XS' },
      { id: 'v-blue-s', productId: 'prod-traditional-royal-blue', size: 'S', color: 'Royal Blue', colorHex: '#1E3F8A', stock: 8, sku: 'STCH-RB-08-S' },
      { id: 'v-blue-m', productId: 'prod-traditional-royal-blue', size: 'M', color: 'Royal Blue', colorHex: '#1E3F8A', stock: 10, sku: 'STCH-RB-08-M' },
      { id: 'v-blue-l', productId: 'prod-traditional-royal-blue', size: 'L', color: 'Royal Blue', colorHex: '#1E3F8A', stock: 6, sku: 'STCH-RB-08-L' },
      { id: 'v-blue-xl', productId: 'prod-traditional-royal-blue', size: 'XL', color: 'Royal Blue', colorHex: '#1E3F8A', stock: 5, sku: 'STCH-RB-08-XL' },
      { id: 'v-blue-xxl', productId: 'prod-traditional-royal-blue', size: 'XXL', color: 'Royal Blue', colorHex: '#1E3F8A', stock: 2, sku: 'STCH-RB-08-XXL' },
    ],
    featured: true,
    bestSeller: true,
    isNewArrival: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 26,
    createdAt: '2026-03-22T10:00:00Z',
  },
  {
    id: 'prod-purple-zari-ethnic-dress',
    slug: 'royal-purple-gold-zari-ethnic-dress',
    name: 'The Royal Purple Gold Zari Ethnic Dress & Dupatta Set',
    sku: 'STCH-ED-12',
    shortDesc: 'Regal royal purple ethnic dress with gold floral embroidery, matching trousers, and sheer dupatta.',
    description: 'An embodiment of regal Indian elegance, this deep royal purple ethnic dress is crafted in lustrous modal silk and adorned with intricate gold zari boota embroidery across the front placket, hemline, and sleeves. Paired with coordinating straight-cut pants with matching gold borders and a graceful diaphanous dupatta edged in subtle zari trims. Perfect for festive soirees, family ceremonies, and wedding functions.',
    price: 4999,
    originalPrice: 6999,
    discountPercent: 29,
    fabric: 'Lustrous Modal Silk & Fine Chiffon Dupatta',
    careInstructions: 'Dry clean only. Steam press on reverse side with low heat.',
    occasion: 'Festive Celebrations, Sangeet, Mehendi, Evening Soirees',
    fit: 'Straight Tailored Kurti Silhouette with Matching Pants & Dupatta',
    categoryId: 'cat-ethnic-suits',
    images: [
      {
        id: 'img-purple-dress-1',
        url: '/images/01.png',
        alt: 'STITCHORA Royal Purple Gold Zari Embroidered Ethnic Dress with Matching Dupatta and Pants',
        isPrimary: true,
      },
    ],
    variants: [
      { id: 'v-purple-xs', productId: 'prod-purple-zari-ethnic-dress', size: 'XS', color: 'Royal Purple', colorHex: '#5B327A', stock: 5, sku: 'STCH-ED-12-XS' },
      { id: 'v-purple-s', productId: 'prod-purple-zari-ethnic-dress', size: 'S', color: 'Royal Purple', colorHex: '#5B327A', stock: 10, sku: 'STCH-ED-12-S' },
      { id: 'v-purple-m', productId: 'prod-purple-zari-ethnic-dress', size: 'M', color: 'Royal Purple', colorHex: '#5B327A', stock: 14, sku: 'STCH-ED-12-M' },
      { id: 'v-purple-l', productId: 'prod-purple-zari-ethnic-dress', size: 'L', color: 'Royal Purple', colorHex: '#5B327A', stock: 8, sku: 'STCH-ED-12-L' },
      { id: 'v-purple-xl', productId: 'prod-purple-zari-ethnic-dress', size: 'XL', color: 'Royal Purple', colorHex: '#5B327A', stock: 5, sku: 'STCH-ED-12-XL' },
      { id: 'v-purple-xxl', productId: 'prod-purple-zari-ethnic-dress', size: 'XXL', color: 'Royal Purple', colorHex: '#5B327A', stock: 3, sku: 'STCH-ED-12-XXL' },
    ],
    featured: true,
    bestSeller: true,
    isNewArrival: true,
    isActive: true,
    rating: 5.0,
    reviewCount: 28,
    createdAt: '2026-03-26T10:00:00Z',
  },
  {
    id: 'prod-chikankari-peplum-kurti',
    slug: 'ivory-chikankari-peplum-short-kurti',
    name: 'The Ivory Chikankari Peplum Short Kurti',
    sku: 'STCH-SK-09',
    shortDesc: 'Hand-embroidered ivory chikankari cotton short kurti with a flared peplum silhouette and pearl button accents.',
    description: 'Effortlessly elegant and featherlight, this ivory short kurti is adorned with intricate Lucknowi Chikankari floral jaal. Crafted from breathable pure cambric cotton with a flattering peplum waist flare, round notched neckline, and handcrafted pearl button details. Perfect for festive brunches, workwear, and paired with cigarette pants or denim.',
    price: 3299,
    originalPrice: 4500,
    discountPercent: 27,
    fabric: '100% Pure Fine Cambric Cotton with Mulmul Lining',
    careInstructions: 'Gentle hand wash or delicate cycle with mild detergent. Line dry in shade.',
    occasion: 'Casual Chic, Brunch, Festive Gatherings, Summer Soiree',
    fit: 'Tailored Peplum Silhouette with Notched Neckline',
    categoryId: 'cat-short-kurtis',
    images: [
      {
        id: 'img-kurti-1',
        url: '/src/assets/images/chikankari_short_kurti_1792148571659.jpg',
        alt: 'STITCHORA Ivory Hand-Embroidered Chikankari Peplum Short Kurti',
        isPrimary: true,
      },
    ],
    variants: [
      { id: 'v-chikan-xs', productId: 'prod-chikankari-peplum-kurti', size: 'XS', color: 'Pristine Ivory', colorHex: '#FAF5EE', stock: 6, sku: 'STCH-SK-09-XS' },
      { id: 'v-chikan-s', productId: 'prod-chikankari-peplum-kurti', size: 'S', color: 'Pristine Ivory', colorHex: '#FAF5EE', stock: 12, sku: 'STCH-SK-09-S' },
      { id: 'v-chikan-m', productId: 'prod-chikankari-peplum-kurti', size: 'M', color: 'Pristine Ivory', colorHex: '#FAF5EE', stock: 15, sku: 'STCH-SK-09-M' },
      { id: 'v-chikan-l', productId: 'prod-chikankari-peplum-kurti', size: 'L', color: 'Pristine Ivory', colorHex: '#FAF5EE', stock: 9, sku: 'STCH-SK-09-L' },
      { id: 'v-chikan-xl', productId: 'prod-chikankari-peplum-kurti', size: 'XL', color: 'Pristine Ivory', colorHex: '#FAF5EE', stock: 7, sku: 'STCH-SK-09-XL' },
      { id: 'v-chikan-xxl', productId: 'prod-chikankari-peplum-kurti', size: 'XXL', color: 'Pristine Ivory', colorHex: '#FAF5EE', stock: 4, sku: 'STCH-SK-09-XXL' },
    ],
    featured: true,
    bestSeller: true,
    isNewArrival: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 38,
    createdAt: '2026-03-23T10:00:00Z',
  },
  {
    id: 'prod-crimson-floral-alia-kurti',
    slug: 'crimson-floral-alia-cut-short-kurti',
    name: 'The Crimson Flora Alia-Cut Short Kurti',
    sku: 'STCH-SK-10',
    shortDesc: 'Artisanal floral printed cotton-silk Alia-cut short kurti with gathered V-neck pleats and bell sleeves.',
    description: 'Channel vibrant modern ethnic glamour with our signature Alia-cut short kurti. Rendered in deep crimson and marigold botanical prints on soft cotton-silk fabric. Features a structured inverted V-waistline with micro-gathers, delicate gota piping, and statement bell sleeves designed for an ultra-flattering drape.',
    price: 2899,
    originalPrice: 3999,
    discountPercent: 28,
    fabric: 'Premium Cotton Silk with Soft Cotton Voile Lining',
    careInstructions: 'Dry clean recommended for first wash. Gentle cold hand wash thereafter.',
    occasion: 'Daily Festive, Office Ethnic, College, Dinner Outing',
    fit: 'Alia Cut Flared Silhouette with V-Neckline',
    categoryId: 'cat-short-kurtis',
    images: [
      {
        id: 'img-kurti-2',
        url: '/src/assets/images/printed_short_kurti_1792148571215.jpg',
        alt: 'STITCHORA Crimson Flora Alia-Cut Designer Short Kurti',
        isPrimary: true,
      },
    ],
    variants: [
      { id: 'v-flora-xs', productId: 'prod-crimson-floral-alia-kurti', size: 'XS', color: 'Crimson Flora', colorHex: '#8B2635', stock: 5, sku: 'STCH-SK-10-XS' },
      { id: 'v-flora-s', productId: 'prod-crimson-floral-alia-kurti', size: 'S', color: 'Crimson Flora', colorHex: '#8B2635', stock: 10, sku: 'STCH-SK-10-S' },
      { id: 'v-flora-m', productId: 'prod-crimson-floral-alia-kurti', size: 'M', color: 'Crimson Flora', colorHex: '#8B2635', stock: 14, sku: 'STCH-SK-10-M' },
      { id: 'v-flora-l', productId: 'prod-crimson-floral-alia-kurti', size: 'L', color: 'Crimson Flora', colorHex: '#8B2635', stock: 8, sku: 'STCH-SK-10-L' },
      { id: 'v-flora-xl', productId: 'prod-crimson-floral-alia-kurti', size: 'XL', color: 'Crimson Flora', colorHex: '#8B2635', stock: 6, sku: 'STCH-SK-10-XL' },
      { id: 'v-flora-xxl', productId: 'prod-crimson-floral-alia-kurti', size: 'XXL', color: 'Crimson Flora', colorHex: '#8B2635', stock: 3, sku: 'STCH-SK-10-XXL' },
    ],
    featured: true,
    bestSeller: true,
    isNewArrival: true,
    isActive: true,
    rating: 4.8,
    reviewCount: 24,
    createdAt: '2026-03-24T10:00:00Z',
  },
  {
    id: 'prod-emerald-zari-chanderi-kurti',
    slug: 'emerald-gold-zari-chanderi-short-kurti',
    name: 'The Emerald Gold Zari Chanderi Short Kurti',
    sku: 'STCH-SK-11',
    shortDesc: 'Lustrous royal emerald green chanderi silk short kurti with fine antique gold zari threadwork on the placket.',
    description: 'Richly pigmented in jewel-toned emerald green, this short kurti is hand-tailored in pure Chanderi silk with subtle metallic sheen. Featuring intricate marodi and zardozi needlework along the mandarin band collar and front placket with handcrafted potli buttons. Versatile for festive celebrations and contemporary evening dinners.',
    price: 3899,
    originalPrice: 4999,
    discountPercent: 22,
    fabric: 'Handloom Chanderi Silk with Shantoon Lining',
    careInstructions: 'Dry clean only. Steam press inside out.',
    occasion: 'Diwali Puja, Festive Dinners, Family Celebrations',
    fit: 'Straight Fit with Side Slits and Mandarin Collar',
    categoryId: 'cat-short-kurtis',
    images: [
      {
        id: 'img-kurti-3',
        url: '/src/assets/images/emerald_short_kurti_1792148571830.jpg',
        alt: 'STITCHORA Emerald Gold Zari Chanderi Short Kurti',
        isPrimary: true,
      },
    ],
    variants: [
      { id: 'v-em-xs', productId: 'prod-emerald-zari-chanderi-kurti', size: 'XS', color: 'Emerald Green', colorHex: '#0A5C36', stock: 4, sku: 'STCH-SK-11-XS' },
      { id: 'v-em-s', productId: 'prod-emerald-zari-chanderi-kurti', size: 'S', color: 'Emerald Green', colorHex: '#0A5C36', stock: 9, sku: 'STCH-SK-11-S' },
      { id: 'v-em-m', productId: 'prod-emerald-zari-chanderi-kurti', size: 'M', color: 'Emerald Green', colorHex: '#0A5C36', stock: 11, sku: 'STCH-SK-11-M' },
      { id: 'v-em-l', productId: 'prod-emerald-zari-chanderi-kurti', size: 'L', color: 'Emerald Green', colorHex: '#0A5C36', stock: 7, sku: 'STCH-SK-11-L' },
      { id: 'v-em-xl', productId: 'prod-emerald-zari-chanderi-kurti', size: 'XL', color: 'Emerald Green', colorHex: '#0A5C36', stock: 5, sku: 'STCH-SK-11-XL' },
      { id: 'v-em-xxl', productId: 'prod-emerald-zari-chanderi-kurti', size: 'XXL', color: 'Emerald Green', colorHex: '#0A5C36', stock: 2, sku: 'STCH-SK-11-XXL' },
    ],
    featured: true,
    bestSeller: true,
    isNewArrival: true,
    isActive: true,
    rating: 5.0,
    reviewCount: 19,
    createdAt: '2026-03-25T10:00:00Z',
  },
];

const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'c-welcome10',
    code: 'WELCOME10',
    discountPercent: 10,
    minOrderValue: 2999,
    maxDiscount: 1500,
    isActive: true,
    timesUsed: 142,
  },
  {
    id: 'c-festive15',
    code: 'FESTIVE15',
    discountPercent: 15,
    minOrderValue: 4999,
    maxDiscount: 2500,
    isActive: true,
    timesUsed: 89,
  },
  {
    id: 'c-muskan500',
    code: 'MUSKAN500',
    discountFlat: 500,
    minOrderValue: 3500,
    isActive: true,
    timesUsed: 215,
  },
  {
    id: 'c-stitchora500',
    code: 'STITCHORA500',
    discountFlat: 500,
    minOrderValue: 3500,
    isActive: true,
    timesUsed: 215,
  },
];

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-mauve-tiered-dress',
    authorName: 'Aanya Singhania',
    rating: 5,
    title: 'Pure poetry in fabric!',
    comment: 'I ordered this tiered mauve dress for my sister\'s sangeet and the compliments were endless. The fabric has such an ethereal drape and the sequin work is so subtle and tasteful, not loud at all. The fit in size M was perfection.',
    isVerified: true,
    isApproved: true,
    createdAt: '2026-03-18T14:32:00Z',
  },
  {
    id: 'rev-2',
    productId: 'prod-mauve-tiered-dress',
    authorName: 'Meera Kapur',
    rating: 5,
    title: 'Stunning craftsmanship',
    comment: 'The packaging with the signature Stitchora box and scented butter paper was an experience in itself. The layers flow like water when you walk.',
    isVerified: true,
    isApproved: true,
    createdAt: '2026-03-22T09:15:00Z',
  },
  {
    id: 'rev-3',
    productId: 'prod-ivory-anarkali-suit',
    authorName: 'Devika Sharma',
    rating: 5,
    title: 'Heirloom quality piece',
    comment: 'The Chanderi silk is so soft and the antique zardozi work looks like a designer couture piece worth lakhs. Truly impressed with Stitchora\'s quality.',
    isVerified: true,
    isApproved: true,
    createdAt: '2026-03-15T11:45:00Z',
  },
  {
    id: 'rev-4',
    productId: 'prod-espresso-velvet-suit',
    authorName: 'Rohini Malhotra',
    rating: 5,
    title: 'The espresso velvet is magnificent',
    comment: 'Wore this for an evening reception in Delhi winter. Keeps you comfortably warm while looking like royalty. The scalloped dupatta is exceptional.',
    isVerified: true,
    isApproved: true,
    createdAt: '2026-03-05T16:20:00Z',
  },
  {
    id: 'rev-purple-1',
    productId: 'prod-purple-zari-ethnic-dress',
    authorName: 'Ananya Saxena',
    rating: 5,
    title: 'Breathtaking shade of royal purple!',
    comment: 'The color in person is even more majestic than the photos. The gold boota embroidery glistens delicately and the fit of the trousers and sheer dupatta drape is impeccable. Wore it to a wedding reception and received so many compliments!',
    isVerified: true,
    isApproved: true,
    createdAt: '2026-03-27T12:00:00Z',
  },
  {
    id: 'rev-purple-2',
    productId: 'prod-purple-zari-ethnic-dress',
    authorName: 'Priyanka Sen',
    rating: 5,
    title: 'Custom stitching perfection',
    comment: 'Stitchora\'s customized measurements fit me like a glove without needing a single alteration. The fabric feels luxurious and breathable.',
    isVerified: true,
    isApproved: true,
    createdAt: '2026-03-28T15:40:00Z',
  },
];

const INITIAL_USERS: User[] = [
  {
    id: 'user-owner-admin',
    email: 'muskandevi2465@gmail.com',
    passwordHash: 'Muskan@Stitchora2026',
    name: 'Muskan Devi (Owner)',
    phone: '+91 98111 22334',
    role: 'ADMIN',
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'user-admin',
    email: 'admin@stitchora.com',
    passwordHash: 'admin123', // In production: bcrypt salted hash
    name: 'Stitchora Admin',
    phone: '+91 98765 43210',
    role: 'ADMIN',
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'user-customer',
    email: 'muskan@stitchora.com',
    passwordHash: 'customer123',
    name: 'Muskan Devi',
    phone: '+91 98111 22334',
    role: 'CUSTOMER',
    createdAt: '2026-02-15T00:00:00Z',
  },
];

const INITIAL_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    userId: 'user-customer',
    fullName: 'Muskan Devi',
    phone: '+91 98111 22334',
    street: 'Flat 402, Lotus Greens, Sector 78',
    landmark: 'Near Central Park',
    city: 'Noida',
    state: 'Uttar Pradesh',
    pincode: '201301',
    isDefault: true,
  },
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'STCH-2026-9142',
    userId: 'user-customer',
    customerName: 'Muskan Devi',
    customerEmail: 'muskan@stitchora.com',
    customerPhone: '+91 98111 22334',
    subtotal: 8499,
    discountAmount: 849.9,
    shippingFee: 0,
    totalAmount: 7649.1,
    couponCode: 'WELCOME10',
    status: 'SHIPPED',
    paymentMethod: 'RAZORPAY',
    paymentStatus: 'CAPTURED',
    razorpayOrderId: 'order_mock_98124',
    razorpayPaymentId: 'pay_mock_38192',
    trackingNumber: 'DELHIVERY-STCH-981204',
    estimatedDelivery: '2026-10-18T18:00:00Z',
    shippingAddress: {
      fullName: 'Muskan Devi',
      phone: '+91 98111 22334',
      street: 'Flat 402, Lotus Greens, Sector 78',
      landmark: 'Near Central Park',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201301',
    },
    items: [
      {
        id: 'oi-1',
        productId: 'prod-mauve-tiered-dress',
        productName: 'The Mauve Tiered Georgette Ensemble',
        productImage: '/src/assets/images/stitchora_mauve_layered_dress_1791889228209.jpg',
        size: 'M',
        color: 'Muted Mauve',
        unitPrice: 8499,
        quantity: 1,
        totalPrice: 8499,
      },
    ],
    createdAt: '2026-10-10T11:20:00Z',
    updatedAt: '2026-10-12T15:30:00Z',
  },
];

class DatabaseStore {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): DatabaseSchema {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        return {
          users: parsed.users || INITIAL_USERS,
          addresses: parsed.addresses || INITIAL_ADDRESSES,
          categories: parsed.categories || INITIAL_CATEGORIES,
          products: parsed.products || INITIAL_PRODUCTS,
          cartItems: parsed.cartItems || [],
          wishlist: parsed.wishlist || [],
          orders: parsed.orders || INITIAL_ORDERS,
          coupons: parsed.coupons || INITIAL_COUPONS,
          reviews: parsed.reviews || INITIAL_REVIEWS,
          newsletterSubscribers: parsed.newsletterSubscribers || [],
          siteSettings: parsed.siteSettings || {
            codEnabled: true,
            freeShippingThreshold: 1999,
            standardShippingFee: 150,
          },
        };
      }
    } catch (err) {
      console.warn('Could not read existing database file, initializing defaults:', err);
    }

    const initial: DatabaseSchema = {
      users: INITIAL_USERS,
      addresses: INITIAL_ADDRESSES,
      categories: INITIAL_CATEGORIES,
      products: INITIAL_PRODUCTS,
      cartItems: [],
      wishlist: [],
      orders: INITIAL_ORDERS,
      coupons: INITIAL_COUPONS,
      reviews: INITIAL_REVIEWS,
      newsletterSubscribers: [],
      siteSettings: {
        codEnabled: true,
        freeShippingThreshold: 1999,
        standardShippingFee: 150,
      },
    };

    this.persist(initial);
    return initial;
  }

  private persist(dataToSave: DatabaseSchema = this.data) {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(dataToSave, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to persist database file:', err);
    }
  }

  // Users
  getUserByEmail(email: string): User | undefined {
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  getUserById(id: string): User | undefined {
    return this.data.users.find(u => u.id === id);
  }

  createUser(user: Omit<User, 'id' | 'createdAt'>): User {
    const newUser: User = {
      ...user,
      id: 'usr-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      createdAt: new Date().toISOString(),
    };
    this.data.users.push(newUser);
    this.persist();
    return newUser;
  }

  updateUser(id: string, updates: Partial<User>): User | null {
    const index = this.data.users.findIndex(u => u.id === id);
    if (index === -1) return null;
    this.data.users[index] = { ...this.data.users[index], ...updates };
    this.persist();
    return this.data.users[index];
  }

  // Products
  getProducts(filters?: {
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
    size?: string;
    featured?: boolean;
    bestSeller?: boolean;
    isNewArrival?: boolean;
    colors?: string[] | string;
  }): Product[] {
    let result = [...this.data.products.filter(p => p.isActive)];

    if (filters?.colors) {
      const colorList = Array.isArray(filters.colors)
        ? filters.colors.map(c => c.trim().toLowerCase())
        : filters.colors.split(',').map(c => c.trim().toLowerCase()).filter(Boolean);

      if (colorList.length > 0) {
        result = result.filter(p => {
          const hasColorInArray = p.colors?.some(c =>
            colorList.some(fc => c.toLowerCase().includes(fc) || fc.includes(c.toLowerCase()))
          );
          if (hasColorInArray) return true;

          const hasColorInVariant = p.variants?.some(v =>
            colorList.some(fc => v.color.toLowerCase().includes(fc) || fc.includes(v.color.toLowerCase()))
          );
          if (hasColorInVariant) return true;

          const combinedText = `${p.name} ${p.shortDesc} ${p.description}`.toLowerCase();
          return colorList.some(fc => combinedText.includes(fc));
        });
      }
    }

    if (filters?.category) {
      result = result.filter(
        p => p.categoryId === filters.category || p.categoryId === `cat-${filters.category}`
      );
    }

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.occasion.toLowerCase().includes(q)
      );
    }

    if (filters?.minPrice !== undefined) {
      result = result.filter(p => p.price >= (filters.minPrice || 0));
    }

    if (filters?.maxPrice !== undefined) {
      result = result.filter(p => p.price <= (filters.maxPrice || Infinity));
    }

    if (filters?.size) {
      result = result.filter(p => p.variants.some(v => v.size === filters.size && v.stock > 0));
    }

    if (filters?.featured !== undefined) {
      result = result.filter(p => p.featured === filters.featured);
    }

    if (filters?.bestSeller !== undefined) {
      result = result.filter(p => p.bestSeller === filters.bestSeller);
    }

    if (filters?.isNewArrival !== undefined) {
      result = result.filter(p => p.isNewArrival === filters.isNewArrival);
    }

    if (filters?.sort) {
      switch (filters.sort) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        default:
          break;
      }
    }

    return result;
  }

  getProductById(id: string): Product | undefined {
    return this.data.products.find(p => p.id === id || p.slug === id);
  }

  createProduct(product: Omit<Product, 'id' | 'createdAt' | 'rating' | 'reviewCount'>): Product {
    const newProduct: Product = {
      ...product,
      id: 'prod-' + Date.now(),
      rating: 5.0,
      reviewCount: 0,
      createdAt: new Date().toISOString(),
    };
    this.data.products.push(newProduct);
    this.persist();
    return newProduct;
  }

  updateProduct(id: string, updates: Partial<Product>): Product | null {
    const index = this.data.products.findIndex(p => p.id === id);
    if (index === -1) return null;
    this.data.products[index] = { ...this.data.products[index], ...updates };
    this.persist();
    return this.data.products[index];
  }

  deleteProduct(id: string): boolean {
    const initialLen = this.data.products.length;
    this.data.products = this.data.products.filter(p => p.id !== id);
    if (this.data.products.length !== initialLen) {
      this.persist();
      return true;
    }
    return false;
  }

  // Categories
  getCategories(): Category[] {
    return this.data.categories.filter(c => c.isActive);
  }

  getAllCategories(): Category[] {
    return this.data.categories;
  }

  createCategory(category: Omit<Category, 'id'>): Category {
    const slug = category.slug || category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newCategory: Category = {
      ...category,
      id: 'cat-' + slug,
      slug,
      isActive: category.isActive !== undefined ? category.isActive : true,
    };
    this.data.categories.push(newCategory);
    this.persist();
    return newCategory;
  }

  updateCategory(id: string, updates: Partial<Category>): Category | null {
    const index = this.data.categories.findIndex(c => c.id === id);
    if (index === -1) return null;
    this.data.categories[index] = { ...this.data.categories[index], ...updates };
    this.persist();
    return this.data.categories[index];
  }

  deleteCategory(id: string): boolean {
    const initialLen = this.data.categories.length;
    this.data.categories = this.data.categories.filter(c => c.id !== id);
    if (this.data.categories.length !== initialLen) {
      this.persist();
      return true;
    }
    return false;
  }

  // Cart
  getCart(userIdOrSession: string): { items: (CartItem & { product: Product })[]; subtotal: number } {
    const rawItems = this.data.cartItems.filter(
      c => c.userId === userIdOrSession || c.sessionId === userIdOrSession
    );

    const itemsWithProduct = rawItems
      .map(item => {
        const product = this.data.products.find(p => p.id === item.productId);
        if (!product) return null;
        return {
          ...item,
          product,
        };
      })
      .filter(Boolean) as (CartItem & { product: Product })[];

    const subtotal = itemsWithProduct.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);

    return { items: itemsWithProduct, subtotal };
  }

  addToCart(
    userOrSessionId: { userId?: string; sessionId?: string },
    productId: string,
    size: string,
    color: string,
    quantity: number = 1
  ): CartItem {
    const product = this.data.products.find(p => p.id === productId);
    if (!product) throw new Error('Product not found');

    const variant = product.variants.find(v => v.size === size && v.color.toLowerCase() === color.toLowerCase());
    if (variant && variant.stock < quantity) {
      throw new Error(`Only ${variant.stock} items in size ${size} available in stock`);
    }

    const existingIndex = this.data.cartItems.findIndex(
      c =>
        (userOrSessionId.userId ? c.userId === userOrSessionId.userId : c.sessionId === userOrSessionId.sessionId) &&
        c.productId === productId &&
        c.size === size
    );

    if (existingIndex > -1) {
      this.data.cartItems[existingIndex].quantity += quantity;
      this.persist();
      return this.data.cartItems[existingIndex];
    }

    const newItem: CartItem = {
      id: 'cart-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      userId: userOrSessionId.userId,
      sessionId: userOrSessionId.sessionId,
      productId,
      variantId: variant?.id,
      size,
      color,
      quantity,
      createdAt: new Date().toISOString(),
    };

    this.data.cartItems.push(newItem);
    this.persist();
    return newItem;
  }

  updateCartQuantity(cartItemId: string, quantity: number): boolean {
    const item = this.data.cartItems.find(c => c.id === cartItemId);
    if (!item) return false;
    if (quantity <= 0) {
      return this.removeFromCart(cartItemId);
    }
    item.quantity = quantity;
    this.persist();
    return true;
  }

  removeFromCart(cartItemId: string): boolean {
    const initialLen = this.data.cartItems.length;
    this.data.cartItems = this.data.cartItems.filter(c => c.id !== cartItemId);
    if (this.data.cartItems.length !== initialLen) {
      this.persist();
      return true;
    }
    return false;
  }

  clearCart(userIdOrSession: string): void {
    this.data.cartItems = this.data.cartItems.filter(
      c => c.userId !== userIdOrSession && c.sessionId !== userIdOrSession
    );
    this.persist();
  }

  // Wishlist
  getWishlist(userId: string): Product[] {
    const userWishlist = this.data.wishlist.find(w => w.userId === userId);
    if (!userWishlist) return [];
    return this.data.products.filter(p => userWishlist.productIds.includes(p.id));
  }

  toggleWishlist(userId: string, productId: string): boolean {
    let entry = this.data.wishlist.find(w => w.userId === userId);
    if (!entry) {
      entry = { userId, productIds: [] };
      this.data.wishlist.push(entry);
    }
    const idx = entry.productIds.indexOf(productId);
    let isAdded = false;
    if (idx > -1) {
      entry.productIds.splice(idx, 1);
      isAdded = false;
    } else {
      entry.productIds.push(productId);
      isAdded = true;
    }
    this.persist();
    return isAdded;
  }

  // Coupons
  getCoupons(): Coupon[] {
    return this.data.coupons;
  }

  validateCoupon(code: string, subtotal: number): { valid: boolean; discount: number; message: string; coupon?: Coupon } {
    const coupon = this.data.coupons.find(c => c.code.toUpperCase() === code.toUpperCase() && c.isActive);
    if (!coupon) {
      return { valid: false, discount: 0, message: 'Invalid or expired coupon code' };
    }

    if (subtotal < coupon.minOrderValue) {
      return {
        valid: false,
        discount: 0,
        message: `This coupon requires a minimum cart value of ₹${coupon.minOrderValue.toLocaleString('en-IN')}`,
      };
    }

    let discount = 0;
    if (coupon.discountPercent) {
      discount = (subtotal * coupon.discountPercent) / 100;
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    } else if (coupon.discountFlat) {
      discount = coupon.discountFlat;
    }

    return {
      valid: true,
      discount: Math.round(discount),
      message: `Coupon applied: Saved ₹${Math.round(discount).toLocaleString('en-IN')}`,
      coupon,
    };
  }

  // Orders
  getOrders(userId?: string): Order[] {
    if (userId) {
      return this.data.orders.filter(o => o.userId === userId);
    }
    return this.data.orders;
  }

  getOrderById(idOrNumber: string): Order | undefined {
    return this.data.orders.find(o => o.id === idOrNumber || o.orderNumber === idOrNumber);
  }

  createOrder(orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>): Order {
    const timestamp = Date.now().toString().slice(-4);
    const random = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `STCH-2026-${timestamp}${random}`.slice(0, 16);

    const newOrder: Order = {
      ...orderData,
      id: 'ord-' + Date.now(),
      orderNumber,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Decrement stock in product inventory
    for (const item of newOrder.items) {
      const prod = this.data.products.find(p => p.id === item.productId);
      if (prod) {
        const variant = prod.variants.find(v => v.size === item.size);
        if (variant && variant.stock >= item.quantity) {
          variant.stock -= item.quantity;
        }
      }
    }

    // Increment coupon usage if used
    if (newOrder.couponCode) {
      const coupon = this.data.coupons.find(c => c.code.toUpperCase() === newOrder.couponCode?.toUpperCase());
      if (coupon) coupon.timesUsed += 1;
    }

    this.data.orders.unshift(newOrder);
    this.persist();
    return newOrder;
  }

  updateOrderStatus(orderId: string, status: Order['status'], trackingNumber?: string): Order | null {
    const order = this.data.orders.find(o => o.id === orderId || o.orderNumber === orderId);
    if (!order) return null;
    order.status = status;
    if (trackingNumber) order.trackingNumber = trackingNumber;
    order.updatedAt = new Date().toISOString();
    this.persist();
    return order;
  }

  // Reviews
  getReviews(productId?: string): Review[] {
    if (productId) {
      return this.data.reviews.filter(r => r.productId === productId && r.isApproved);
    }
    return this.data.reviews;
  }

  addReview(review: Omit<Review, 'id' | 'createdAt' | 'isApproved'>): Review {
    const newRev: Review = {
      ...review,
      id: 'rev-' + Date.now(),
      isApproved: true,
      createdAt: new Date().toISOString(),
    };
    this.data.reviews.unshift(newRev);

    // Update product rating
    const prodReviews = this.data.reviews.filter(r => r.productId === review.productId && r.isApproved);
    const avg = prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length;
    const prod = this.data.products.find(p => p.id === review.productId);
    if (prod) {
      prod.rating = Number(avg.toFixed(1));
      prod.reviewCount = prodReviews.length;
    }

    this.persist();
    return newRev;
  }

  // Newsletter
  subscribeNewsletter(email: string): { success: boolean; message: string } {
    const exists = this.data.newsletterSubscribers.some(s => s.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { success: true, message: "You are already subscribed to Muskan's Stitching couture updates!" };
    }
    this.data.newsletterSubscribers.push({
      email,
      createdAt: new Date().toISOString(),
    });
    this.persist();
    return { success: true, message: "Welcome to Muskan's Stitching! Check your inbox for exclusive bespoke previews." };
  }

  // Admin Stats
  getAdminStats() {
    const totalOrders = this.data.orders.length;
    const totalRevenue = this.data.orders
      .filter(o => o.status !== 'CANCELLED')
      .reduce((sum, o) => sum + o.totalAmount, 0);
    const totalCustomers = this.data.users.filter(u => u.role === 'CUSTOMER').length;
    const totalProducts = this.data.products.length;

    const lowStockAlerts: { product: string; size: string; stock: number }[] = [];
    this.data.products.forEach(p => {
      p.variants.forEach(v => {
        if (v.stock <= 3) {
          lowStockAlerts.push({
            product: p.name,
            size: v.size,
            stock: v.stock,
          });
        }
      });
    });

    const recentOrders = this.data.orders.slice(0, 5);

    return {
      totalOrders,
      totalRevenue: Math.round(totalRevenue),
      totalCustomers,
      totalProducts,
      lowStockAlerts,
      recentOrders,
    };
  }

  // Site Settings
  getSiteSettings() {
    return this.data.siteSettings;
  }

  updateSiteSettings(settings: Partial<DatabaseSchema['siteSettings']>) {
    this.data.siteSettings = { ...this.data.siteSettings, ...settings };
    this.persist();
    return this.data.siteSettings;
  }
}

export const db = new DatabaseStore();
