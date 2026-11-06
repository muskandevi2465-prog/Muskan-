import { Product, Category, CartItem, Order, User, Review, Coupon } from '../types';

const API_BASE = '/api';

// Generate or retrieve persistent guest session ID
function getSessionId(): string {
  let id = localStorage.getItem('stitchora_session_id');
  if (!id) {
    id = 'guest_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now();
    localStorage.setItem('stitchora_session_id', id);
  }
  return id;
}

function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'x-session-id': getSessionId(),
  };
  const token = localStorage.getItem('stitchora_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export const api = {
  // Products
  async getProducts(params?: {
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
  }): Promise<{ products: Product[]; total: number }> {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.search) query.append('search', params.search);
    if (params?.minPrice !== undefined) query.append('minPrice', params.minPrice.toString());
    if (params?.maxPrice !== undefined) query.append('maxPrice', params.maxPrice.toString());
    if (params?.sort) query.append('sort', params.sort);
    if (params?.size) query.append('size', params.size);
    if (params?.featured) query.append('featured', 'true');
    if (params?.bestSeller) query.append('bestSeller', 'true');
    if (params?.isNewArrival) query.append('isNewArrival', 'true');
    if (params?.colors) {
      const colorsStr = Array.isArray(params.colors) ? params.colors.join(',') : params.colors;
      if (colorsStr) query.append('colors', colorsStr);
    }

    const res = await fetch(`${API_BASE}/products?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  async getProduct(idOrSlug: string): Promise<{ product: Product; reviews: Review[] }> {
    const res = await fetch(`${API_BASE}/products/${idOrSlug}`);
    if (!res.ok) throw new Error('Product not found');
    return res.json();
  },

  async getCategories(): Promise<{ categories: Category[] }> {
    const res = await fetch(`${API_BASE}/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  },

  // Cart
  async getCart(): Promise<{ items: CartItem[]; subtotal: number }> {
    const res = await fetch(`${API_BASE}/cart`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch cart');
    return res.json();
  },

  async addToCart(productId: string, size: string, color: string, quantity = 1): Promise<{ items: CartItem[]; subtotal: number }> {
    const res = await fetch(`${API_BASE}/cart`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ productId, size, color, quantity }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to add item to bag');
    }
    return res.json();
  },

  async updateCartItem(itemId: string, quantity: number): Promise<{ items: CartItem[]; subtotal: number }> {
    const res = await fetch(`${API_BASE}/cart/${itemId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ quantity }),
    });
    if (!res.ok) throw new Error('Failed to update cart');
    return res.json();
  },

  async removeCartItem(itemId: string): Promise<{ items: CartItem[]; subtotal: number }> {
    const res = await fetch(`${API_BASE}/cart/${itemId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to remove cart item');
    return res.json();
  },

  // Wishlist
  async getWishlist(): Promise<{ items: Product[] }> {
    const res = await fetch(`${API_BASE}/wishlist`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch wishlist');
    return res.json();
  },

  async toggleWishlist(productId: string): Promise<{ isAdded: boolean; items: Product[] }> {
    const res = await fetch(`${API_BASE}/wishlist/toggle`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ productId }),
    });
    if (!res.ok) throw new Error('Failed to update wishlist');
    return res.json();
  },

  // Coupons
  async validateCoupon(code: string, subtotal: number): Promise<{ valid: boolean; discount: number; message: string; coupon?: Coupon }> {
    const res = await fetch(`${API_BASE}/coupons/validate`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ code, subtotal }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Invalid coupon');
    return data;
  },

  // Checkout
  async getCheckoutQuote(items: any[], couponCode?: string): Promise<{
    subtotal: number;
    discountAmount: number;
    shippingFee: number;
    totalAmount: number;
    items: any[];
  }> {
    const res = await fetch(`${API_BASE}/checkout/quote`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ items, couponCode }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Quote failed');
    }
    return res.json();
  },

  async createOrder(orderPayload: any): Promise<{ success: boolean; order: Order }> {
    const res = await fetch(`${API_BASE}/orders/create`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(orderPayload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to place order');
    return data;
  },

  // Razorpay
  async getRazorpayOrder(orderId: string): Promise<any> {
    const res = await fetch(`${API_BASE}/payment/razorpay-order`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ orderId }),
    });
    if (!res.ok) throw new Error('Failed to initialize payment gateway');
    return res.json();
  },

  async verifyPayment(verificationData: {
    orderId: string;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
  }): Promise<{ success: boolean; order: Order }> {
    const res = await fetch(`${API_BASE}/payment/verify`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(verificationData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Payment verification failed');
    return data;
  },

  // Orders
  async getOrder(id: string): Promise<{ order: Order }> {
    const res = await fetch(`${API_BASE}/orders/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Order not found');
    return res.json();
  },

  async getUserOrders(): Promise<{ orders: Order[] }> {
    const res = await fetch(`${API_BASE}/orders`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to load orders');
    return res.json();
  },

  // Auth
  async login(email: string, password: string): Promise<{ success: boolean; user: User; token: string }> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Invalid credentials');
    localStorage.setItem('stitchora_token', data.token);
    return data;
  },

  async register(name: string, email: string, password: string, phone?: string): Promise<{ success: boolean; user: User; token: string }> {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, phone }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed');
    localStorage.setItem('stitchora_token', data.token);
    return data;
  },

  async getCurrentUser(): Promise<{ user: User } | null> {
    const token = localStorage.getItem('stitchora_token');
    if (!token) return null;
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: getAuthHeaders(),
      });
      if (!res.ok) {
        localStorage.removeItem('stitchora_token');
        return null;
      }
      return res.json();
    } catch {
      return null;
    }
  },

  async resetPassword(email: string): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to request reset');
    return data;
  },

  // Newsletter
  async subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE}/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return res.json();
  },

  // Reviews
  async addReview(reviewData: {
    productId: string;
    authorName: string;
    rating: number;
    title: string;
    comment: string;
  }): Promise<{ success: boolean; review: Review }> {
    const res = await fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(reviewData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to submit review');
    return data;
  },

  // Admin APIs
  async getAdminStats(): Promise<any> {
    const res = await fetch(`${API_BASE}/admin/stats`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Unauthorized');
    return res.json();
  },

  async createAdminProduct(productData: any): Promise<any> {
    const res = await fetch(`${API_BASE}/admin/products`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to create product');
    return data;
  },

  async updateAdminProduct(id: string, updates: any): Promise<any> {
    const res = await fetch(`${API_BASE}/admin/products/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update product');
    return res.json();
  },

  async deleteAdminProduct(id: string): Promise<any> {
    const res = await fetch(`${API_BASE}/admin/products/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete product');
    return res.json();
  },

  async getAdminOrders(): Promise<{ orders: Order[] }> {
    const res = await fetch(`${API_BASE}/admin/orders`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to load admin orders');
    return res.json();
  },

  async updateAdminOrderStatus(orderId: string, status: string, trackingNumber?: string): Promise<any> {
    const res = await fetch(`${API_BASE}/admin/orders/${orderId}/status`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status, trackingNumber }),
    });
    if (!res.ok) throw new Error('Failed to update order');
    return res.json();
  },

  // Admin Category APIs
  async getAdminCategories(): Promise<{ categories: Category[] }> {
    const res = await fetch(`${API_BASE}/admin/categories`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  },

  async createAdminCategory(categoryData: any): Promise<{ success: boolean; category: Category }> {
    const res = await fetch(`${API_BASE}/admin/categories`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(categoryData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to create category');
    return data;
  },

  async updateAdminCategory(id: string, updates: any): Promise<{ success: boolean; category: Category }> {
    const res = await fetch(`${API_BASE}/admin/categories/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update category');
    return data;
  },

  async deleteAdminCategory(id: string): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE}/admin/categories/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to delete category');
    return data;
  },

  async adminLogin(email: string, pass: string): Promise<{ user: User; token: string }> {
    const res = await fetch(`${API_BASE}/admin/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pass }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Admin login failed');
    if (data.token) {
      localStorage.setItem('stitchora_token', data.token);
    }
    return data;
  },

  async requestAdminForgotPassword(email: string): Promise<{
    success: boolean;
    message: string;
    email: string;
    verificationCode: string;
    expiresInMinutes: number;
  }> {
    const res = await fetch(`${API_BASE}/admin/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to request password reset');
    return data;
  },

  async verifyAndResetAdminPassword(payload: {
    email: string;
    verificationCode: string;
    newPassword: string;
  }): Promise<{ success: boolean; message: string; user: User; token: string }> {
    const res = await fetch(`${API_BASE}/admin/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to reset password');
    if (data.token) {
      localStorage.setItem('stitchora_token', data.token);
    }
    return data;
  },

  async adminChangePassword(newPassword: string): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE}/admin/change-password`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ newPassword }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update password');
    return data;
  },

  async uploadPhoto(imageData: string, fileName?: string): Promise<{ success: boolean; url: string; filename: string }> {
    const res = await fetch(`${API_BASE}/admin/upload-photo`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ imageData, fileName }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to upload photo');
    return data;
  },

  async getAdminSettings(): Promise<any> {
    const res = await fetch(`${API_BASE}/admin/settings`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch settings');
    return res.json();
  },

  async updateAdminSettings(settings: any): Promise<any> {
    const res = await fetch(`${API_BASE}/admin/settings`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(settings),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update settings');
    return data;
  },

  async getCoupons(): Promise<{ coupons: any[] }> {
    const res = await fetch(`${API_BASE}/admin/coupons`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch coupons');
    return res.json();
  },

  async getSiteSettings(): Promise<any> {
    const res = await fetch(`${API_BASE}/site-settings`);
    if (!res.ok) throw new Error('Failed to load settings');
    return res.json();
  },

  // Supabase Backend Management
  async getSupabaseStatus(): Promise<{
    connected: boolean;
    projectId: string;
    url: string;
    hasKey: boolean;
    error?: string;
    dashboardUrl: string;
    sqlEditorUrl: string;
    tables: string[];
    sqlSchema: string;
  }> {
    const res = await fetch(`${API_BASE}/admin/supabase/status`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to check Supabase status');
    return res.json();
  },

  async configureSupabase(anonKey: string): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE}/admin/supabase/configure`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ anonKey }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to configure Supabase');
    return data;
  },

  async syncAllOrdersToSupabase(): Promise<{
    success: boolean;
    total: number;
    synced: number;
    failed: number;
    message: string;
    errors: string[];
  }> {
    const res = await fetch(`${API_BASE}/admin/supabase/sync-all`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to sync orders to Supabase');
    return data;
  },

  async submitInquiry(inquiry: {
    name: string;
    email: string;
    phone?: string;
    topic?: string;
    message: string;
  }): Promise<{ success: boolean; message: string; supabaseSynced?: boolean }> {
    const res = await fetch(`${API_BASE}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiry),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to send inquiry');
    return data;
  },
};

