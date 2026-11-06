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

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  color?: string;
  viewType?: 'front' | 'back' | 'model' | 'detail' | string;
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
  images: ProductImage[];
  variants: ProductVariant[];
  featured: boolean;
  bestSeller: boolean;
  isNewArrival: boolean;
  isActive: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl?: string;
  isActive: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  size: string;
  color: string;
  quantity: number;
  product: Product;
}

export interface OrderItem {
  id: string;
  productId: string;
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

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'CUSTOMER' | 'ADMIN';
}

export interface Review {
  id: string;
  productId: string;
  authorName: string;
  rating: number;
  title: string;
  comment: string;
  isVerified: boolean;
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountPercent?: number;
  discountFlat?: number;
  minOrderValue: number;
  maxDiscount?: number;
  isActive: boolean;
}
