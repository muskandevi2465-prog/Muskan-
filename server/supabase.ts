import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { Order } from './db.ts';

dotenv.config({ override: true });

// User's Supabase Project Details (Requested by user: ogiiheusnnyzqzltontv)
export const SUPABASE_PROJECT_ID =
  (process.env.SUPABASE_PROJECT_ID && process.env.SUPABASE_PROJECT_ID !== 'vktesdjstibwbvbkvdpt')
    ? process.env.SUPABASE_PROJECT_ID
    : 'ogiiheusnnyzqzltontv';
export const SUPABASE_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co`;
export const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

let supabaseClient: SupabaseClient | null = null;
let activeClientKey: string = '';

export function setSupabaseAnonKey(newKey: string): void {
  process.env.SUPABASE_ANON_KEY = newKey.trim();
  supabaseClient = null;
  activeClientKey = '';
}

export function getActiveSupabaseAnonKey(): string {
  const key = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';
  // Avoid using stale key that was issued for previous project vktesdjstibwbvbkvdpt
  if (SUPABASE_PROJECT_ID === 'ogiiheusnnyzqzltontv' && key === 'sb_publishable_1vh5cMyQ3txe4y3ZhfNTbg_JOWSSq3k') {
    return '';
  }
  return key;
}

export function getSupabaseClient(): SupabaseClient | null {
  const currentKey = getActiveSupabaseAnonKey();
  if (supabaseClient && activeClientKey === currentKey) {
    return supabaseClient;
  }
  if (!currentKey) {
    return null;
  }
  try {
    supabaseClient = createClient(SUPABASE_URL, currentKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
    activeClientKey = currentKey;
    return supabaseClient;
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
    return null;
  }
}

/**
 * Saves a completed customer order to Supabase backend tables ('orders' & 'order_items')
 */
export async function saveOrderToSupabase(order: Order): Promise<{ success: boolean; error?: string; skipped?: boolean }> {
  const client = getSupabaseClient();
  
  if (!client) {
    console.warn(`[Supabase] Note: SUPABASE_ANON_KEY is not set yet. Order ${order.orderNumber} saved locally in SQLite/JSON db.`);
    return {
      success: false,
      skipped: true,
      error: 'SUPABASE_ANON_KEY is not configured in .env. Order saved locally.',
    };
  }

  try {
    // 1. Insert into 'orders' table
    const orderPayload = {
      id: order.id,
      order_number: order.orderNumber,
      customer_name: order.customerName,
      customer_email: order.customerEmail,
      customer_phone: order.customerPhone,
      subtotal: order.subtotal,
      discount_amount: order.discountAmount || 0,
      shipping_fee: order.shippingFee || 0,
      total_amount: order.totalAmount,
      coupon_code: order.couponCode || null,
      status: order.status || 'PENDING',
      payment_method: order.paymentMethod || 'COD',
      payment_status: order.paymentStatus || 'PENDING',
      razorpay_order_id: order.razorpayOrderId || null,
      razorpay_payment_id: order.razorpayPaymentId || null,
      tracking_number: order.trackingNumber || null,
      estimated_delivery: order.estimatedDelivery || null,
      shipping_address: order.shippingAddress,
      items: order.items,
      created_at: order.createdAt || new Date().toISOString(),
      updated_at: order.updatedAt || new Date().toISOString(),
    };

    const { error: orderError } = await client
      .from('orders')
      .upsert(orderPayload, { onConflict: 'id' });

    if (orderError) {
      console.error('[Supabase] Error inserting order into Supabase:', orderError);
      return { success: false, error: orderError.message };
    }

    // 2. Insert into 'order_items' table
    if (order.items && order.items.length > 0) {
      const lineItems = order.items.map((item, idx) => ({
        id: item.id || `${order.id}-item-${idx}`,
        order_id: order.id,
        order_number: order.orderNumber,
        product_id: item.productId,
        product_name: item.productName,
        product_image: item.productImage || null,
        size: item.size || 'M',
        color: item.color || 'Signature',
        unit_price: item.unitPrice,
        quantity: item.quantity,
        total_price: item.totalPrice,
        created_at: order.createdAt || new Date().toISOString(),
      }));

      const { error: itemsError } = await client
        .from('order_items')
        .upsert(lineItems, { onConflict: 'id' });

      if (itemsError) {
        console.error('[Supabase] Error inserting order line items into Supabase:', itemsError);
      }
    }

    console.log(`[Supabase] Successfully saved order ${order.orderNumber} to Supabase project ${SUPABASE_PROJECT_ID}!`);
    return { success: true };
  } catch (err: any) {
    console.error('[Supabase] Unexpected exception saving order to Supabase:', err);
    return { success: false, error: err.message || 'Unknown Supabase connection error' };
  }
}

/**
 * Saves a contact/bespoke inquiry form submission to Supabase 'inquiries' table
 */
export async function saveInquiryToSupabase(inquiry: {
  name: string;
  email: string;
  phone?: string;
  topic?: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  const client = getSupabaseClient();
  if (!client) {
    return { success: false, error: 'SUPABASE_ANON_KEY is not configured in .env' };
  }

  try {
    const payload = {
      id: 'inq-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6),
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone || null,
      topic: inquiry.topic || 'General Inquiry',
      message: inquiry.message,
      created_at: new Date().toISOString(),
    };

    const { error } = await client.from('inquiries').insert([payload]);
    if (error) {
      console.error('[Supabase] Error saving inquiry to Supabase:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Check Supabase connection status
 */
export async function testSupabaseConnection(): Promise<{
  connected: boolean;
  projectId: string;
  url: string;
  hasKey: boolean;
  error?: string;
  tablesVerified?: boolean;
}> {
  const currentKey = getActiveSupabaseAnonKey();
  const hasKey = Boolean(currentKey);
  if (!hasKey) {
    return {
      connected: false,
      projectId: SUPABASE_PROJECT_ID,
      url: SUPABASE_URL,
      hasKey: false,
      error: 'Missing SUPABASE_ANON_KEY in environment variables',
    };
  }

  const client = getSupabaseClient();
  if (!client) {
    return {
      connected: false,
      projectId: SUPABASE_PROJECT_ID,
      url: SUPABASE_URL,
      hasKey: true,
      error: 'Could not initialize client',
    };
  }

  try {
    const { data: _data, error } = await client.from('orders').select('id').limit(1);
    if (error) {
      const isMissingTable = error.message?.includes('does not exist') || (error as any).code === '42P01';
      return {
        connected: !isMissingTable,
        projectId: SUPABASE_PROJECT_ID,
        url: SUPABASE_URL,
        hasKey: true,
        tablesVerified: !isMissingTable,
        error: isMissingTable
          ? "The 'orders' table does not exist yet. Please run the SQL schema script in your Supabase SQL Editor."
          : error.message,
      };
    }
    return {
      connected: true,
      projectId: SUPABASE_PROJECT_ID,
      url: SUPABASE_URL,
      hasKey: true,
      tablesVerified: true,
    };
  } catch (err: any) {
    return {
      connected: false,
      projectId: SUPABASE_PROJECT_ID,
      url: SUPABASE_URL,
      hasKey: true,
      error: err.message,
    };
  }
}
