# STITCHORA — Haute Couture & Bespoke Fashion E-Commerce

> *"Stitched for You"*

A full-stack luxury Indian fashion e-commerce platform specializing in women's ethnic wear, designer suits, layered georgette ensembles, co-ord sets, party wear, and festive contemporary couture.

---

## Brand Visual Identity
- **Primary Palette**:
  - Warm Ivory: `#F8F0E6`
  - Espresso Brown: `#3B2118`
  - Muted Mauve: `#B77D8D`
  - Soft Beige: `#E8D9C8`
- **Typography**:
  - Headings: *Cormorant Garamond* (Editorial Luxury Serif)
  - Body & Numbers: *Plus Jakarta Sans* (Refined Clean Sans-Serif with Tabular Numerals)
- **Brand Monogram**: Needle threaded through the iconic serif 'S' with calligraphic flourishing loops and diamond star insignia.
- **Hero Silhouette**: The Mauve Tiered Georgette Ensemble (inspired by the uploaded reference image).

---

## Key Features

1. **Homepage Experience**:
   - Slim dismissible announcement bar with coupon promotion.
   - 3-Zone Top Bar with sticky header and mobile navigation drawer.
   - Full-width editorial hero campaign banner with high-resolution editorial photography.
   - Curated category portfolios: Ethnic Suits, Co-ord Sets, Party Wear, Festive Wear, and New Arrivals.
   - Star Spotlight on **The Mauve Tiered Georgette Ensemble** with quick-size selection and craftsmanship notes.
   - Best Sellers and Trending Now catalog grid.
   - Artisanal craft storytelling ("The Art of Stitchora").
   - Verified buyer reviews and testimonials.
   - VIP newsletter subscription with instant validation.

2. **Catalog & Product Detail Page (PDP)**:
   - Multi-faceted filtering by category, size (XS to XXL), price range, and sorting.
   - High-definition image gallery with thumbnail switcher.
   - Contiguous purchase module with live inventory status.
   - Comprehensive Size Guide with inches/cm toggle and custom tailoring guarantee.
   - Indian PIN Code delivery estimator with instant date calculation.
   - Verified customer reviews with submission form.

3. **Shopping Bag & Checkout**:
   - Slide-out Cart Drawer with complimentary shipping progress bar.
   - Server-authoritative price and inventory verification (`/api/checkout/quote`).
   - Coupon codes (`WELCOME10`, `FESTIVE15`, `STITCHORA500`) validated server-side.
   - Guest and authenticated checkout with full delivery address and special instructions.
   - Razorpay Indian payment gateway simulator with UPI, Cards, and Netbanking.
   - Server-side HMAC-SHA256 signature verification (`/api/payment/verify`).
   - Cash on Delivery (COD) support.

4. **Order Tracking & Account**:
   - Post-order confirmation screen with printable tax invoice receipt.
   - Real-time consignment tracking timeline (`CONFIRMED` → `PROCESSING` → `SHIPPED` → `OUT_FOR_DELIVERY` → `DELIVERED`).
   - Customer account with order history, address book, and wishlist management.

5. **Protected Admin Dashboard**:
   - Role-based access control (Admin role only).
   - Overview metrics: Gross revenue, total orders, customers, and low stock inventory alerts.
   - Product catalog management: Create new silhouette, upload images, manage variants and pricing.
   - Order fulfillment manager: Update order status and assign courier AWB tracking numbers.
   - Discount coupon management and site settings (toggle COD, free shipping threshold).

---

## Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons
- **Backend**: Express full-stack server running with Vite middleware integration
- **Database Engine**: Persistent store with full PostgreSQL DDL schema & Prisma definitions
- **ORM & Migrations**: Prisma schema (`prisma/schema.prisma`) and initial SQL migration (`prisma/migrations/20260401_init/migration.sql`)
- **Payments**: Razorpay Indian Payment Gateway integration with server HMAC signature validation

---

## Demo Accounts & Credentials

### Administrator Account
- **Email**: `admin@stitchora.com`
- **Password**: `admin123`
- *Access*: Admin Dashboard (`/admin`), Product creation/deletion, order dispatching, coupon controls.

### Customer Account
- **Email**: `muskan@stitchora.com`
- **Password**: `customer123`
- *Access*: Pre-loaded with order history and default delivery address.

### Active Promotional Coupons
- `WELCOME10`: 10% off on cart orders above ₹2,999
- `FESTIVE15`: 15% off on festive collections above ₹4,999
- `STITCHORA500`: Flat ₹500 off on cart orders above ₹3,500

---

## Local Development Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

3. **Start Full-Stack Development Server**:
   ```bash
   npm run dev
   ```
   The application will start on `http://localhost:3000`.

4. **Production Build**:
   ```bash
   npm run build
   npm start
   ```

---

## Setting Up External Production Credentials

### 1. PostgreSQL & Prisma (Production DB)
Update `DATABASE_URL` in your `.env`:
```env
DATABASE_URL="postgresql://<user>:<password>@<host>:5432/<dbname>?schema=public"
```
Apply the database schema:
```bash
npx prisma migrate deploy
```

### 2. Razorpay Indian Payments
1. Create a merchant account at [Razorpay Dashboard](https://dashboard.razorpay.com).
2. Generate your API keys from **Settings → API Keys**.
3. Set the keys in `.env`:
   ```env
   RAZORPAY_KEY_ID="rzp_live_your_key_id"
   RAZORPAY_KEY_SECRET="your_key_secret"
   ```
4. The server automatically verifies transactions using HMAC-SHA256 signature calculation.
