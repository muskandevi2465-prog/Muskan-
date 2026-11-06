# Muskan's Stitching — Haute Couture & Bespoke Fashion E-Commerce

> *"Stitched for You — Bespoke Couture & Tailoring"*

A production-grade, mobile-friendly full-stack luxury Indian fashion e-commerce boutique specializing in women's ethnic wear, designer suits, layered georgette ensembles, co-ord sets, party wear, and festive contemporary couture.

---

## 🚀 Live & Deployment Status
- **Development App URL**: Accessible through AI Studio preview on port 3000
- **Supabase Backend Project**: `ogiiheusnnyzqzltontv` (`https://ogiiheusnnyzqzltontv.supabase.co`)
- **Admin Email**: `muskandevi2465@gmail.com`
- **Git Branch**: `main`

---

## 📦 Connecting to GitHub & Pushing Your Code

Follow these straightforward steps to connect this repository to your personal or organization GitHub account:

### 1. Create a New Repository on GitHub
1. Go to [GitHub New Repository](https://github.com/new).
2. Set the repository name to: **`muskans-stitching`** (or your preferred name).
3. Choose **Public** or **Private**.
4. **Leave "Add a README file", ".gitignore", and "license" UNCHECKED** (since your project already has them).
5. Click **Create repository**.

### 2. Connect Your Local Git to GitHub
In your terminal, run:

```bash
# Add your GitHub repository as the remote origin:
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/muskans-stitching.git

# Verify remote configuration:
git remote -v

# Push all files to GitHub:
git push -u origin main
```

*(If prompted for authentication, enter your GitHub Personal Access Token with `repo` permissions or sign in via browser.)*

### 3. Future Updates & Continuous Pushing
Whenever you make updates to the website:
```bash
git add .
git commit -m "feat: update store content and styles"
git push
```

---

## 🌐 Connecting a Custom Domain (e.g. `muskansstitching.com`)

You can connect your custom domain bought from GoDaddy, Namecheap, Hostinger, Cloudflare, or Google Domains.

### Option A: Hosting on Vercel (Recommended for Next.js / Vite)
1. Import your GitHub repository into [Vercel](https://vercel.com/new).
2. In your Vercel Project Dashboard, navigate to **Settings → Domains**.
3. Enter your domain name (e.g. `muskansstitching.com` or `www.muskansstitching.com`).
4. Vercel will provide the exact DNS records to add at your domain registrar:
   - **Apex / Root Domain (`@`)**:
     - **Type**: `A`
     - **Name / Host**: `@` (or leave empty)
     - **Value / IP**: `76.76.21.21`
   - **Subdomain (`www`)**:
     - **Type**: `CNAME`
     - **Name / Host**: `www`
     - **Value / Target**: `cname.vercel-dns.com`
5. Vercel automatically provisions and renews a free **SSL / HTTPS Certificate** within 5–15 minutes.

### Option B: Hosting on Render / Railway (Full-Stack Node.js + Express)
1. Create a **Web Service** on [Render](https://render.com) or [Railway](https://railway.app).
2. Connect your GitHub repository `muskans-stitching`.
3. Set Build Command: `npm run build`
4. Set Start Command: `npm start`
5. Go to **Settings → Custom Domains** → Add your custom domain.
6. Configure the DNS CNAME record provided by Render/Railway at your domain registrar.

### DNS Propagation Check
You can check if your new DNS records are live globally at [whatsmydns.net](https://www.whatsmydns.net). Propagation usually takes 5 to 30 minutes.

---

## ⚙️ Production Environment Variables

Add these variables in your hosting dashboard (**Settings → Environment Variables**):

| Variable | Description | Example / Default |
|---|---|---|
| `PORT` | Web server port | `3000` |
| `SESSION_SECRET` | Secret key for JWT sessions | `your_secure_random_string` |
| `SUPABASE_PROJECT_ID` | Your Supabase Project Reference | `ogiiheusnnyzqzltontv` |
| `SUPABASE_URL` | Supabase API URL | `https://ogiiheusnnyzqzltontv.supabase.co` |
| `SUPABASE_ANON_KEY` | Supabase Project Anon Public Key | Obtained from Supabase Settings → API |
| `RAZORPAY_KEY_ID` | Razorpay Merchant Key ID | `rzp_live_...` |
| `RAZORPAY_KEY_SECRET` | Razorpay Merchant Secret | `your_razorpay_secret` |

---

## 🎨 Visual Identity & Architecture

- **Branding**: Muskan's Stitching
- **Primary Color Palette**:
  - Espresso Luxury Brown: `#3B2118`
  - Warm Ivory Canvas: `#FAF5EE` / `#F8F0E6`
  - Rose Silk Mauve: `#D8B4C0` / `#8F5567`
  - Heritage Beige: `#E8D9C8`
- **Typography**: Clean, bold Canva Sans / Plus Jakarta Sans font hierarchy with high legibility across mobile and desktop.
- **Craft Emblem**: Custom vector sewing needle in polished gold with flowing rose-silk tailoring thread, basting stitches, cardinal cross-stitch accents, and central "M" monogram.
- **Mobile First**: 100% responsive, optimized tap targets, smooth slide-out cart drawer, collapsible navigation drawer, and instant one-tap checkout.

---

## 🔒 Protected Admin Dashboard

- **Authorized Owner Email**: `muskandevi2465@gmail.com`
- **Admin Login & Forgot Password**: Secure verification code sent directly for email recovery.
- **Features**:
  1. Product Catalog: Add, edit, delete silhouettes, upload pictures, adjust prices.
  2. Order Management: View customer orders, update tracking numbers and fulfillment status.
  3. Supabase Integration Tab: Real-time sync of all orders, 1-click SQL schema generator, and live connection verification.
  4. Coupons & Settings: Activate discount codes, configure COD and free shipping thresholds.

---

## 💻 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start full-stack development server
npm run dev

# 3. Build for production
npm run build
npm start
```
