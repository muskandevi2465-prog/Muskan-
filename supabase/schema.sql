-- ==============================================================================
-- Muskan's Stitching - Supabase Backend Database Schema
-- Project ID: ogiiheusnnyzqzltontv
-- Supabase URL: https://ogiiheusnnyzqzltontv.supabase.co
--
-- Instructions:
-- 1. Open your Supabase Dashboard:
--    https://supabase.com/dashboard/project/ogiiheusnnyzqzltontv/sql/new
-- 2. Paste and run this SQL query to create the tables.
-- ==============================================================================

-- 1. Orders Table
create table if not exists public.orders (
    id text primary key,
    order_number text not null unique,
    customer_name text not null,
    customer_email text not null,
    customer_phone text not null,
    subtotal numeric(12, 2) not null default 0,
    discount_amount numeric(12, 2) not null default 0,
    shipping_fee numeric(12, 2) not null default 0,
    total_amount numeric(12, 2) not null default 0,
    coupon_code text,
    status text not null default 'PENDING',
    payment_method text not null default 'COD',
    payment_status text not null default 'PENDING',
    razorpay_order_id text,
    razorpay_payment_id text,
    tracking_number text,
    estimated_delivery text,
    shipping_address jsonb not null default '{}'::jsonb,
    items jsonb not null default '[]'::jsonb,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- 2. Order Items Table
create table if not exists public.order_items (
    id text primary key,
    order_id text references public.orders(id) on delete cascade,
    order_number text,
    product_id text not null,
    product_name text not null,
    product_image text,
    size text,
    color text,
    unit_price numeric(12, 2) not null default 0,
    quantity integer not null default 1,
    total_price numeric(12, 2) not null default 0,
    created_at timestamptz not null default now()
);

-- 3. Contact Inquiries Table
create table if not exists public.inquiries (
    id text primary key,
    name text not null,
    email text not null,
    phone text,
    topic text,
    message text not null,
    created_at timestamptz not null default now()
);

-- Enable Row Level Security (RLS)
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.inquiries enable row level security;

-- Policies for public inserts and admin reads
drop policy if exists "Enable insert for orders" on public.orders;
create policy "Enable insert for orders" on public.orders for insert with check (true);

drop policy if exists "Enable select for orders" on public.orders;
create policy "Enable select for orders" on public.orders for select using (true);

drop policy if exists "Enable update for orders" on public.orders;
create policy "Enable update for orders" on public.orders for update using (true);

drop policy if exists "Enable insert for order_items" on public.order_items;
create policy "Enable insert for order_items" on public.order_items for insert with check (true);

drop policy if exists "Enable select for order_items" on public.order_items;
create policy "Enable select for order_items" on public.order_items for select using (true);

drop policy if exists "Enable update for order_items" on public.order_items;
create policy "Enable update for order_items" on public.order_items for update using (true);

drop policy if exists "Enable insert for inquiries" on public.inquiries;
create policy "Enable insert for inquiries" on public.inquiries for insert with check (true);

drop policy if exists "Enable select for inquiries" on public.inquiries;
create policy "Enable select for inquiries" on public.inquiries for select using (true);

-- Performance Indexes
create index if not exists idx_orders_created_at on public.orders(created_at desc);
create index if not exists idx_orders_customer_email on public.orders(customer_email);
create index if not exists idx_order_items_order_id on public.order_items(order_id);
create index if not exists idx_inquiries_created_at on public.inquiries(created_at desc);
