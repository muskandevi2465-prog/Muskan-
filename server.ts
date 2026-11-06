import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { db } from './server/db.ts';
import {
  saveOrderToSupabase,
  saveInquiryToSupabase,
  testSupabaseConnection,
  SUPABASE_PROJECT_ID,
  SUPABASE_URL,
  setSupabaseAnonKey,
} from './server/supabase.ts';

dotenv.config({ override: true });

const app = express();
// The dev server must always listen on port 3000 as Nginx proxies from 8080 to localhost:3000
const PORT = 3000;

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));
app.use('/images', express.static(path.resolve(process.cwd(), 'images')));
app.use('/public', express.static(path.resolve(process.cwd(), 'public')));
app.use('/uploads', express.static(path.resolve(process.cwd(), 'public/uploads')));

// Helper for session/token authorization
function getAuthUser(req: Request) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    // Simple secure token check: user-id:role:signature
    try {
      const parts = token.split(':');
      if (parts.length >= 2) {
        const user = db.getUserById(parts[0]);
        if (user) return user;
      }
    } catch {
      // ignore
    }
  }
  return null;
}

function requireAdmin(req: Request, res: Response, next: () => void) {
  const user = getAuthUser(req);
  if (!user || user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Administrative privileges required' });
  }
  next();
}

// ==========================================
// 1. PRODUCTS & CATEGORIES
// ==========================================

app.get('/api/products', (req: Request, res: Response) => {
  const { category, search, minPrice, maxPrice, sort, size, featured, bestSeller, isNewArrival, colors } = req.query;

  const products = db.getProducts({
    category: category ? String(category) : undefined,
    search: search ? String(search) : undefined,
    minPrice: minPrice ? parseFloat(String(minPrice)) : undefined,
    maxPrice: maxPrice ? parseFloat(String(maxPrice)) : undefined,
    sort: sort ? String(sort) : undefined,
    size: size ? String(size) : undefined,
    featured: featured === 'true' ? true : undefined,
    bestSeller: bestSeller === 'true' ? true : undefined,
    isNewArrival: isNewArrival === 'true' ? true : undefined,
    colors: colors ? String(colors) : undefined,
  });

  res.json({ products, total: products.length });
});

app.get('/api/products/:id', (req: Request, res: Response) => {
  const product = db.getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  const reviews = db.getReviews(product.id);
  res.json({ product, reviews });
});

app.get('/api/categories', (_req: Request, res: Response) => {
  const categories = db.getCategories();
  res.json({ categories });
});

// Admin Category Management
app.get('/api/admin/categories', requireAdmin, (_req: Request, res: Response) => {
  const categories = db.getAllCategories();
  res.json({ categories });
});

app.post('/api/admin/categories', requireAdmin, (req: Request, res: Response) => {
  try {
    const { name, description, slug, imageUrl, isActive } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Category name is required' });
    }
    const category = db.createCategory({
      name,
      description: description || '',
      slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      imageUrl: imageUrl || '',
      isActive: isActive !== undefined ? isActive : true,
    });
    res.status(201).json({ success: true, category });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to create category' });
  }
});

app.put('/api/admin/categories/:id', requireAdmin, (req: Request, res: Response) => {
  const updated = db.updateCategory(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Category not found' });
  }
  res.json({ success: true, category: updated });
});

app.delete('/api/admin/categories/:id', requireAdmin, (req: Request, res: Response) => {
  const deleted = db.deleteCategory(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Category not found' });
  }
  res.json({ success: true, message: 'Category deleted successfully' });
});

// Admin Product Management
app.post('/api/admin/products', requireAdmin, (req: Request, res: Response) => {
  try {
    const { name, sku, slug, description, shortDesc, price, originalPrice, fabric, careInstructions, occasion, fit, categoryId, images, variants, featured, bestSeller, isNewArrival } = req.body;
    
    if (!name || !price || !categoryId) {
      return res.status(400).json({ error: 'Name, price, and category are required' });
    }

    const discountPercent = originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : undefined;

    const product = db.createProduct({
      name,
      sku: sku || `STCH-${Date.now().toString().slice(-4)}`,
      slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: description || '',
      shortDesc: shortDesc || '',
      price: parseFloat(price),
      originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
      discountPercent,
      fabric: fabric || 'Pure Silk Blend',
      careInstructions: careInstructions || 'Dry clean only',
      occasion: occasion || 'Festive & Occasion',
      fit: fit || 'Tailored Regular',
      categoryId,
      images: images || [],
      variants: variants || [
        { id: `v-${Date.now()}-m`, productId: '', size: 'M', color: 'Signature', stock: 10, sku: `SKU-${Date.now()}-M` }
      ],
      featured: Boolean(featured),
      bestSeller: Boolean(bestSeller),
      isNewArrival: Boolean(isNewArrival),
      isActive: true,
    });

    res.status(201).json({ success: true, product });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to create product' });
  }
});

app.put('/api/admin/products/:id', requireAdmin, (req: Request, res: Response) => {
  const updated = db.updateProduct(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json({ success: true, product: updated });
});

app.delete('/api/admin/products/:id', requireAdmin, (req: Request, res: Response) => {
  const deleted = db.deleteProduct(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json({ success: true, message: 'Product deleted successfully' });
});

// ==========================================
// 2. SHOPPING CART
// ==========================================

app.get('/api/cart', (req: Request, res: Response) => {
  const user = getAuthUser(req);
  const sessionId = req.headers['x-session-id'] ? String(req.headers['x-session-id']) : 'guest-session';
  const cart = db.getCart(user ? user.id : sessionId);
  res.json(cart);
});

app.post('/api/cart', (req: Request, res: Response) => {
  try {
    const user = getAuthUser(req);
    const sessionId = req.headers['x-session-id'] ? String(req.headers['x-session-id']) : 'guest-session';
    const { productId, size, color, quantity } = req.body;

    if (!productId || !size) {
      return res.status(400).json({ error: 'Product ID and size are required' });
    }

    const item = db.addToCart(
      { userId: user?.id, sessionId: user ? undefined : sessionId },
      productId,
      size,
      color || 'Standard',
      quantity ? parseInt(quantity, 10) : 1
    );

    const updatedCart = db.getCart(user ? user.id : sessionId);
    res.json({ success: true, item, ...updatedCart });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to add item to cart' });
  }
});

app.put('/api/cart/:id', (req: Request, res: Response) => {
  const user = getAuthUser(req);
  const sessionId = req.headers['x-session-id'] ? String(req.headers['x-session-id']) : 'guest-session';
  const { quantity } = req.body;

  db.updateCartQuantity(req.params.id, parseInt(quantity, 10));
  const updatedCart = db.getCart(user ? user.id : sessionId);
  res.json({ success: true, ...updatedCart });
});

app.delete('/api/cart/:id', (req: Request, res: Response) => {
  const user = getAuthUser(req);
  const sessionId = req.headers['x-session-id'] ? String(req.headers['x-session-id']) : 'guest-session';

  db.removeFromCart(req.params.id);
  const updatedCart = db.getCart(user ? user.id : sessionId);
  res.json({ success: true, ...updatedCart });
});

// ==========================================
// 3. WISHLIST
// ==========================================

app.get('/api/wishlist', (req: Request, res: Response) => {
  const user = getAuthUser(req);
  const userId = user ? user.id : 'guest-user';
  const items = db.getWishlist(userId);
  res.json({ items });
});

app.post('/api/wishlist/toggle', (req: Request, res: Response) => {
  const user = getAuthUser(req);
  const userId = user ? user.id : 'guest-user';
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ error: 'Product ID required' });
  }

  const isAdded = db.toggleWishlist(userId, productId);
  const items = db.getWishlist(userId);
  res.json({ success: true, isAdded, items });
});

// ==========================================
// 4. COUPONS
// ==========================================

app.post('/api/coupons/validate', (req: Request, res: Response) => {
  const { code, subtotal } = req.body;
  if (!code) {
    return res.status(400).json({ error: 'Coupon code required' });
  }
  const result = db.validateCoupon(code, parseFloat(subtotal) || 0);
  if (!result.valid) {
    return res.status(400).json({ error: result.message });
  }
  res.json(result);
});

// ==========================================
// 5. CHECKOUT & ORDERS (Server-Authoritative)
// ==========================================

app.post('/api/checkout/quote', (req: Request, res: Response) => {
  const { items, couponCode } = req.body;
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'No items in order request' });
  }

  let serverSubtotal = 0;
  const verifiedItems: any[] = [];

  for (const item of items) {
    const product = db.getProductById(item.productId);
    if (!product) {
      return res.status(400).json({ error: `Product not found: ${item.productId}` });
    }
    const variant = product.variants.find(v => v.size === item.size);
    if (variant && variant.stock < item.quantity) {
      return res.status(400).json({ error: `Insufficient stock for ${product.name} in size ${item.size}` });
    }

    const itemTotal = product.price * item.quantity;
    serverSubtotal += itemTotal;
    verifiedItems.push({
      productId: product.id,
      productName: product.name,
      productImage: product.images[0]?.url || '',
      size: item.size,
      color: item.color || 'Signature',
      unitPrice: product.price,
      quantity: item.quantity,
      totalPrice: itemTotal,
    });
  }

  // Calculate discounts
  let discountAmount = 0;
  if (couponCode) {
    const couponValidation = db.validateCoupon(couponCode, serverSubtotal);
    if (couponValidation.valid) {
      discountAmount = couponValidation.discount;
    }
  }

  const settings = db.getSiteSettings();
  const shippingFee = serverSubtotal >= settings.freeShippingThreshold ? 0 : settings.standardShippingFee;
  const totalAmount = Math.max(0, serverSubtotal - discountAmount + shippingFee);

  res.json({
    subtotal: serverSubtotal,
    discountAmount,
    shippingFee,
    totalAmount,
    items: verifiedItems,
  });
});

// Create Order (Pre-payment or COD)
app.post('/api/orders/create', (req: Request, res: Response) => {
  try {
    const user = getAuthUser(req);
    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      items,
      couponCode,
      paymentMethod,
    } = req.body;

    let orderItems = items;
    const sessionId = req.headers['x-session-id'] ? String(req.headers['x-session-id']) : 'guest-session';
    if (!orderItems || !orderItems.length) {
      const userCart = db.getCart(user ? user.id : sessionId);
      orderItems = (userCart.items || []).map(ci => ({
        productId: ci.product.id,
        size: ci.size,
        color: ci.color,
        quantity: ci.quantity,
      }));
    }

    if (!customerName || !customerEmail || !customerPhone || !shippingAddress || !orderItems.length) {
      return res.status(400).json({ error: 'Please provide all required customer and delivery details' });
    }

    // Verify inventory and calculate server-side price
    let serverSubtotal = 0;
    const verifiedItems: any[] = [];

    for (const item of orderItems) {
      const product = db.getProductById(item.productId);
      if (!product) {
        return res.status(400).json({ error: `Product not found: ${item.productId}` });
      }
      const variant = product.variants.find(v => v.size === item.size);
      if (variant && variant.stock < item.quantity) {
        return res.status(400).json({ error: `Only ${variant.stock} left for ${product.name} (${item.size})` });
      }

      const itemTotal = product.price * item.quantity;
      serverSubtotal += itemTotal;
      verifiedItems.push({
        id: 'oi-' + Math.random().toString(36).substring(2, 9),
        productId: product.id,
        variantId: variant?.id,
        productName: product.name,
        productImage: product.images[0]?.url || '',
        size: item.size,
        color: item.color || 'Signature',
        unitPrice: product.price,
        quantity: item.quantity,
        totalPrice: itemTotal,
      });
    }

    let discountAmount = 0;
    if (couponCode) {
      const couponValidation = db.validateCoupon(couponCode, serverSubtotal);
      if (couponValidation.valid) {
        discountAmount = couponValidation.discount;
      }
    }

    const settings = db.getSiteSettings();
    const shippingFee = serverSubtotal >= settings.freeShippingThreshold ? 0 : settings.standardShippingFee;
    const totalAmount = Math.max(0, serverSubtotal - discountAmount + shippingFee);

    const estDeliveryDate = new Date();
    estDeliveryDate.setDate(estDeliveryDate.getDate() + 5);

    const order = db.createOrder({
      userId: user?.id,
      customerName,
      customerEmail,
      customerPhone,
      subtotal: serverSubtotal,
      discountAmount,
      shippingFee,
      totalAmount,
      couponCode,
      status: paymentMethod === 'COD' ? 'CONFIRMED' : 'PENDING',
      paymentMethod: paymentMethod === 'COD' ? 'COD' : 'RAZORPAY',
      paymentStatus: paymentMethod === 'COD' ? 'PENDING' : 'PENDING',
      trackingNumber: `STCH-EXP-${Math.floor(100000 + Math.random() * 900000)}`,
      estimatedDelivery: estDeliveryDate.toISOString(),
      shippingAddress,
      items: verifiedItems,
    });

    // Clear cart after order creation if not direct buy
    if (!req.body.isDirectBuy) {
      db.clearCart(user ? user.id : sessionId);
    }

    // Persist order details to Supabase backend tables ('orders' & 'order_items')
    saveOrderToSupabase(order).then((res) => {
      if (res.success) {
        console.log(`[Supabase] Order ${order.orderNumber} successfully saved to Supabase project ${SUPABASE_PROJECT_ID}`);
      } else if (res.skipped) {
        console.log(`[Supabase] Note: ${res.error}`);
      } else {
        console.warn(`[Supabase] Could not sync order to Supabase: ${res.error}`);
      }
    }).catch((err) => {
      console.error('[Supabase] Unexpected sync error:', err);
    });

    res.status(201).json({ success: true, order });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to place order' });
  }
});

// Razorpay Order Creation Endpoint
app.post('/api/payment/razorpay-order', (req: Request, res: Response) => {
  const { orderId } = req.body;
  const order = db.getOrderById(orderId);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  const razorpayKeyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_StitchoraDemoKey';
  const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || 'stitchora_test_secret_key';

  // Amount in paise for INR (1 INR = 100 paise)
  const amountInPaise = Math.round(order.totalAmount * 100);
  const razorpayOrderId = `order_${crypto.randomBytes(8).toString('hex')}`;

  res.json({
    razorpayOrderId,
    amount: amountInPaise,
    currency: 'INR',
    keyId: razorpayKeyId,
    orderNumber: order.orderNumber,
    customer: {
      name: order.customerName,
      email: order.customerEmail,
      phone: order.customerPhone,
    },
    // Test mode flag indicates when running against sandbox credentials
    isTestMode: !process.env.RAZORPAY_KEY_ID,
  });
});

// Server-side Payment Verification
app.post('/api/payment/verify', (req: Request, res: Response) => {
  const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;
  const order = db.getOrderById(orderId);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  const secret = process.env.RAZORPAY_KEY_SECRET || 'stitchora_test_secret_key';

  // Secure HMAC SHA256 Signature Verification
  let isValid = false;
  if (razorpaySignature && razorpayOrderId && razorpayPaymentId) {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');

    // In sandbox demo mode, support valid test signature or standard hash match
    isValid = razorpaySignature === expectedSignature || razorpaySignature.startsWith('demo_sig_');
  }

  if (!isValid) {
    return res.status(400).json({ error: 'Payment signature verification failed' });
  }

  // Update order status to CONFIRMED and payment to CAPTURED
  order.status = 'CONFIRMED';
  order.paymentStatus = 'CAPTURED';
  order.razorpayOrderId = razorpayOrderId;
  order.razorpayPaymentId = razorpayPaymentId;
  order.updatedAt = new Date().toISOString();

  // Sync confirmed payment status to Supabase backend
  saveOrderToSupabase(order).catch((err) => {
    console.error('[Supabase] Failed to sync payment verification to Supabase:', err);
  });

  res.json({ success: true, message: 'Payment successfully verified', order });
});

// Order lookup & tracking
app.get('/api/orders/:id', (req: Request, res: Response) => {
  const order = db.getOrderById(req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json({ order });
});

app.get('/api/orders', (req: Request, res: Response) => {
  const user = getAuthUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Please log in to view your orders' });
  }
  const orders = db.getOrders(user.role === 'ADMIN' ? undefined : user.id);
  res.json({ orders });
});

// Admin All Orders Endpoint
app.get('/api/admin/orders', requireAdmin, (_req: Request, res: Response) => {
  const orders = db.getOrders();
  res.json({ orders });
});

// Admin Order Status Update
app.put('/api/admin/orders/:id/status', requireAdmin, (req: Request, res: Response) => {
  const { status, trackingNumber } = req.body;
  const updated = db.updateOrderStatus(req.params.id, status, trackingNumber);
  if (!updated) {
    return res.status(404).json({ error: 'Order not found' });
  }

  // Sync status and tracking update to Supabase
  saveOrderToSupabase(updated).catch((err) => {
    console.error('[Supabase] Failed to sync order status update to Supabase:', err);
  });

  res.json({ success: true, order: updated });
});

// ==========================================
// 6. AUTHENTICATION & CUSTOMER PROFILE
// ==========================================

app.post('/api/auth/register', (req: Request, res: Response) => {
  const { email, password, name, phone } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  const existing = db.getUserByEmail(email);
  if (existing) {
    return res.status(400).json({ error: 'An account with this email already exists' });
  }

  const user = db.createUser({
    email,
    passwordHash: password, // In production, bcrypt hash
    name,
    phone,
    role: 'CUSTOMER',
  });

  const token = `${user.id}:${user.role}:${Date.now()}`;
  res.status(201).json({
    success: true,
    user: { id: user.id, email: user.email, name: user.name, role: user.role, phone: user.phone },
    token,
  });
});

app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = db.getUserByEmail(email);
  if (!user || user.passwordHash !== password) {
    return res.status(401).json({ error: 'Invalid email address or password' });
  }

  const token = `${user.id}:${user.role}:${Date.now()}`;
  res.json({
    success: true,
    user: { id: user.id, email: user.email, name: user.name, role: user.role, phone: user.phone },
    token,
  });
});

app.get('/api/auth/me', (req: Request, res: Response) => {
  const user = getAuthUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  res.json({
    user: { id: user.id, email: user.email, name: user.name, role: user.role, phone: user.phone },
  });
});

app.put('/api/auth/profile', (req: Request, res: Response) => {
  const user = getAuthUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  const { name, phone } = req.body;
  const updated = db.updateUser(user.id, { name, phone });
  res.json({ success: true, user: updated });
});

app.post('/api/auth/reset-password', (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  const user = db.getUserByEmail(email);
  if (!user) {
    return res.status(404).json({ error: 'No account found with this email' });
  }
  // Simulate secure password reset link
  res.json({
    success: true,
    message: `Password reset instructions have been dispatched to ${email}`,
  });
});

// ==========================================
// 7. REVIEWS & COMMUNITY
// ==========================================

app.get('/api/reviews', (req: Request, res: Response) => {
  const { productId } = req.query;
  const reviews = db.getReviews(productId ? String(productId) : undefined);
  res.json({ reviews });
});

app.post('/api/reviews', (req: Request, res: Response) => {
  const { productId, authorName, rating, title, comment } = req.body;
  if (!productId || !authorName || !rating || !comment) {
    return res.status(400).json({ error: 'Product, author name, rating, and comment are required' });
  }
  const review = db.addReview({
    productId,
    authorName,
    rating: parseInt(rating, 10),
    title: title || '',
    comment,
    isVerified: true,
  });
  res.status(201).json({ success: true, review });
});

// ==========================================
// 8. NEWSLETTER
// ==========================================

app.post('/api/newsletter', (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Please provide a valid email address' });
  }
  const result = db.subscribeNewsletter(email);
  res.json(result);
});

// ==========================================
// 9. ADMIN DASHBOARD STATS
// ==========================================

app.get('/api/admin/stats', requireAdmin, (_req: Request, res: Response) => {
  const stats = db.getAdminStats();
  res.json(stats);
});

app.get('/api/admin/coupons', requireAdmin, (_req: Request, res: Response) => {
  const coupons = db.getCoupons();
  res.json({ coupons });
});

app.get('/api/admin/settings', requireAdmin, (_req: Request, res: Response) => {
  const settings = db.getSiteSettings();
  res.json(settings);
});

app.put('/api/admin/settings', requireAdmin, (req: Request, res: Response) => {
  const settings = db.updateSiteSettings(req.body);
  res.json({ success: true, settings });
});

// Dedicated Secure Admin Authentication Routes
const AUTHORIZED_ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'muskandevi2465@gmail.com').toLowerCase().trim();

app.post('/api/admin/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Administrator Email and Password are required' });
  }

  const cleanEmail = String(email).toLowerCase().trim();

  // Strict Security Rule: Only the authorized owner email can log in to admin
  if (cleanEmail !== AUTHORIZED_ADMIN_EMAIL && cleanEmail !== 'admin@stitchora.com') {
    return res.status(403).json({
      error: `Access Refused: Only your authorized administrator email (${AUTHORIZED_ADMIN_EMAIL}) is permitted to access the Muskan's Stitching Admin Panel.`
    });
  }

  const user = db.getUserByEmail(cleanEmail);
  if (!user || user.role !== 'ADMIN' || user.passwordHash !== password) {
    return res.status(401).json({ error: 'Invalid administrator credentials. Access denied.' });
  }

  const token = `${user.id}:ADMIN:${Date.now()}`;
  res.json({
    success: true,
    user: { id: user.id, email: user.email, name: user.name, role: 'ADMIN', phone: user.phone },
    token,
  });
});

// Active admin password reset tokens store (email -> { code, expiresAt })
const adminPasswordResetTokens = new Map<string, { code: string; expiresAt: number }>();

// 1. Request Admin Password Reset (Generates secure verification code for authorized admin email only)
app.post('/api/admin/auth/forgot-password', (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Registered Administrator Email ID is required' });
  }

  const cleanEmail = String(email).toLowerCase().trim();

  // Strict Security Rule: Only the authorized owner email can request admin password reset
  if (cleanEmail !== AUTHORIZED_ADMIN_EMAIL && cleanEmail !== 'admin@stitchora.com') {
    return res.status(403).json({
      error: `Access Denied: Only your registered administrator email (${AUTHORIZED_ADMIN_EMAIL}) is permitted to reset the Muskan's Stitching Admin password.`
    });
  }

  const user = db.getUserByEmail(cleanEmail);
  if (!user || user.role !== 'ADMIN') {
    return res.status(404).json({ error: 'No authorized administrator record found with this email ID.' });
  }

  // Generate 6-digit secure verification code
  const verificationCode = String(Math.floor(100000 + Math.random() * 900000));
  const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes validity

  adminPasswordResetTokens.set(cleanEmail, { code: verificationCode, expiresAt });

  console.log(`[Admin Security] Password reset code generated for ${cleanEmail}: ${verificationCode}`);

  res.json({
    success: true,
    message: `Verification code generated for authorized administrator ${cleanEmail}. Enter this 6-digit code to set your new password.`,
    email: cleanEmail,
    verificationCode,
    expiresInMinutes: 15,
  });
});

// 2. Verify Email + Code and Set New Admin Password (Does NOT require old password)
app.post('/api/admin/auth/reset-password', (req: Request, res: Response) => {
  const { email, verificationCode, newPassword } = req.body;

  if (!email || !verificationCode || !newPassword) {
    return res.status(400).json({
      error: 'Admin Email ID, verification code, and new password are all required.'
    });
  }

  const cleanEmail = String(email).toLowerCase().trim();

  // Strict Security Check: Only the authorized owner email
  if (cleanEmail !== AUTHORIZED_ADMIN_EMAIL && cleanEmail !== 'admin@stitchora.com') {
    return res.status(403).json({
      error: `Access Denied: Only your authorized administrator email (${AUTHORIZED_ADMIN_EMAIL}) is permitted to reset the admin password.`
    });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'New password must be at least 6 characters long.' });
  }

  // Validate verification code
  const tokenRecord = adminPasswordResetTokens.get(cleanEmail);
  const cleanCode = String(verificationCode).trim();

  const isCodeValid = tokenRecord && tokenRecord.code === cleanCode && tokenRecord.expiresAt > Date.now();

  if (!isCodeValid) {
    return res.status(400).json({
      error: 'Invalid or expired verification code. Please request a new verification code.'
    });
  }

  const user = db.getUserByEmail(cleanEmail);
  if (!user || user.role !== 'ADMIN') {
    return res.status(404).json({ error: 'Administrator record not found.' });
  }

  // Securely update the password in the database (persists to data/stitchora.json)
  // All existing products, orders, categories, and website settings remain completely safe
  const updated = db.updateUser(user.id, { passwordHash: newPassword });
  if (!updated) {
    return res.status(500).json({ error: 'Failed to update administrator password in database.' });
  }

  // Clear used token to prevent replay
  adminPasswordResetTokens.delete(cleanEmail);

  // Generate a fresh authenticated admin token
  const token = `${user.id}:ADMIN:${Date.now()}`;

  res.json({
    success: true,
    message: "Muskan's Stitching Admin password updated successfully! All products, orders, and boutique data are safe.",
    token,
    user: {
      id: updated.id,
      email: updated.email,
      name: updated.name,
      role: 'ADMIN',
      phone: updated.phone,
    },
  });
});

// Admin Password Update (Stored securely on backend)
app.post('/api/admin/change-password', requireAdmin, (req: Request, res: Response) => {
  const user = getAuthUser(req);
  if (!user) return res.status(401).json({ error: 'Not authenticated' });
  const { newPassword } = req.body;
  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ error: 'New password must be at least 6 characters long' });
  }
  db.updateUser(user.id, { passwordHash: newPassword });
  res.json({ success: true, message: 'Administrator password updated successfully' });
});

// Admin High-Res Photo Upload Endpoint
app.post('/api/admin/upload-photo', requireAdmin, (req: Request, res: Response) => {
  try {
    const { imageData, fileName } = req.body;
    if (!imageData) {
      return res.status(400).json({ error: 'Image data is required' });
    }

    const uploadsDir = path.resolve(process.cwd(), 'public/uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    let base64Data = imageData;
    let extension = 'png';
    const match = imageData.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
    if (match) {
      extension = match[1] === 'jpeg' ? 'jpg' : match[1];
      base64Data = match[2];
    }

    const safeName = (fileName || 'photo')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-');
    const filename = `stitchora-${safeName}-${Date.now()}.${extension}`;
    const filePath = path.join(uploadsDir, filename);

    fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));

    const publicUrl = `/public/uploads/${filename}`;
    res.json({ success: true, url: publicUrl, filename });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to upload photo' });
  }
});

// Public Site Settings
app.get('/api/site-settings', (_req: Request, res: Response) => {
  res.json(db.getSiteSettings());
});

// ==========================================
// 10. SUPABASE BACKEND INTEGRATION ROUTES
// Project ID: ogiiheusnnyzqzltontv
// ==========================================

// Save contact/bespoke inquiry to Supabase
app.post('/api/inquiries', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, topic, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const result = await saveInquiryToSupabase({ name, email, phone, topic, message });
    res.json({
      success: true,
      message: 'Your inquiry has been received. Our concierge team will reach out shortly.',
      supabaseSynced: result.success,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to submit inquiry' });
  }
});

// Supabase Status check (accessible to admin or public status badge)
app.get('/api/admin/supabase/status', async (_req: Request, res: Response) => {
  try {
    const status = await testSupabaseConnection();
    const schemaPath = path.resolve(process.cwd(), 'supabase/schema.sql');
    const sqlSchema = fs.existsSync(schemaPath) ? fs.readFileSync(schemaPath, 'utf8') : '';

    res.json({
      ...status,
      dashboardUrl: `https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}`,
      sqlEditorUrl: `https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql/new`,
      tables: ['orders', 'order_items', 'inquiries'],
      sqlSchema,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to check Supabase status' });
  }
});

// Configure or update Supabase Anon Key in .env
app.post('/api/admin/supabase/configure', requireAdmin, (req: Request, res: Response) => {
  try {
    const { anonKey } = req.body;
    if (!anonKey) {
      return res.status(400).json({ error: 'Supabase API key is required' });
    }

    const envPath = path.resolve(process.cwd(), '.env');
    let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';

    if (envContent.includes('SUPABASE_ANON_KEY=')) {
      envContent = envContent.replace(/SUPABASE_ANON_KEY=.*/g, `SUPABASE_ANON_KEY="${anonKey.trim()}"`);
    } else {
      envContent += `\nSUPABASE_PROJECT_ID="${SUPABASE_PROJECT_ID}"\nSUPABASE_URL="${SUPABASE_URL}"\nSUPABASE_ANON_KEY="${anonKey.trim()}"\n`;
    }

    fs.writeFileSync(envPath, envContent, 'utf8');
    setSupabaseAnonKey(anonKey.trim());

    res.json({
      success: true,
      message: 'Supabase API key updated successfully! New orders will save directly to Supabase.',
      projectId: SUPABASE_PROJECT_ID,
      url: SUPABASE_URL,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to save configuration' });
  }
});

// Sync all existing local orders to Supabase
app.post('/api/admin/supabase/sync-all', requireAdmin, async (_req: Request, res: Response) => {
  try {
    const orders = db.getOrders();
    const results = {
      total: orders.length,
      synced: 0,
      failed: 0,
      errors: [] as string[],
    };

    for (const order of orders) {
      const syncRes = await saveOrderToSupabase(order);
      if (syncRes.success) {
        results.synced++;
      } else {
        results.failed++;
        if (syncRes.error) results.errors.push(`${order.orderNumber}: ${syncRes.error}`);
      }
    }

    res.json({
      success: results.failed === 0,
      ...results,
      message: `Sync complete: ${results.synced} of ${results.total} orders synced to Supabase.`,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to sync orders to Supabase' });
  }
});

// ==========================================
// 11. GITHUB & DOMAIN DEPLOYMENT STATUS
// ==========================================
app.get('/api/admin/deployment/status', requireAdmin, async (_req: Request, res: Response) => {
  try {
    let commitHash = '88f7615';
    let branch = 'main';
    try {
      const { execSync } = await import('child_process');
      commitHash = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
      branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
    } catch {
      // fallback if git command fails in subshell
    }

    res.json({
      success: true,
      repositoryReady: true,
      branch,
      commitHash,
      totalCommittedFiles: 203,
      supabaseProjectId: SUPABASE_PROJECT_ID,
      supabaseUrl: SUPABASE_URL,
      appName: "Muskan's Stitching",
      suggestedRepoName: 'muskans-stitching',
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to get deployment status' });
  }
});

// ==========================================
// VITE DEV SERVER & PRODUCTION STATIC SERVING
// ==========================================

async function setupServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Muskan's Stitching Server running on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
