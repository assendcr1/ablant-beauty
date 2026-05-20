# AblantBeauty — Headless WooCommerce Store

> Next.js 14 frontend + WordPress/WooCommerce backend, fully configured for GitHub Codespaces.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│                GitHub Codespaces                 │
│                                                  │
│  ┌──────────────┐    REST API    ┌─────────────┐ │
│  │  Next.js 14  │ ◄────────────► │  WordPress  │ │
│  │  :3000       │                │  :8080      │ │
│  │              │                │ WooCommerce │ │
│  └──────────────┘                └──────┬──────┘ │
│                                         │        │
│  ┌──────────────┐                ┌──────▼──────┐ │
│  │  phpMyAdmin  │                │    MySQL    │ │
│  │  :8081       │ ◄─────────────►│    :3306    │ │
│  └──────────────┘                └─────────────┘ │
└─────────────────────────────────────────────────┘
```

## 🚀 Quick Start (GitHub Codespaces)

### 1. Open in Codespaces
```
Click "Code" → "Codespaces" → "Create codespace on main"
```

The `.devcontainer/devcontainer.json` handles everything automatically:
- Installs Node.js 20, Docker
- Runs `docker compose up` (WordPress + MySQL + phpMyAdmin)
- Installs Next.js dependencies
- Waits for WordPress to be ready

### 2. Access the services

| Service          | URL                      | Notes                    |
|-----------------|--------------------------|--------------------------|
| Next.js Frontend | http://localhost:3000   | Main storefront          |
| WordPress Admin  | http://localhost:8080/wp-admin | Default: admin/admin_password_change_me |
| phpMyAdmin       | http://localhost:8081   | DB management            |

### 3. Configure WooCommerce API Keys

After WordPress is running:

1. Go to `http://localhost:8080/wp-admin`
2. Login: `admin` / `admin_password_change_me`
3. Navigate to **WooCommerce → Settings → Advanced → REST API**
4. Click **Add Key**
5. Set Description: `Next.js Frontend`, Permissions: `Read/Write`
6. Copy the Consumer Key and Consumer Secret
7. Update your `.env` file:

```env
WC_CONSUMER_KEY=ck_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
WC_CONSUMER_SECRET=cs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

8. Restart Next.js:
```bash
docker compose restart nextjs
```

> 💡 The WP-CLI setup script also auto-generates keys and saves them to `scripts/wc-api-keys.txt`

---

## 📁 Project Structure

```
ablantbeauty/
├── .devcontainer/
│   └── devcontainer.json        # Codespaces config
├── docker-compose.yml           # All services
├── .env                         # Environment variables (gitignored)
├── .env.example                 # Template
│
├── wordpress/
│   ├── wp-config-extra.php      # CORS + REST API config
│   ├── themes/                  # Custom headless theme (optional)
│   ├── plugins/                 # Custom plugins
│   └── uploads/                 # Media uploads
│
├── nextjs/
│   ├── app/
│   │   ├── page.tsx             # Homepage
│   │   ├── shop/                # Shop & product pages
│   │   ├── cart/                # Cart page
│   │   ├── checkout/            # Checkout
│   │   ├── dashboard/           # User account dashboard
│   │   ├── login/               # Auth pages
│   │   └── api/                 # API routes (WC proxy, NextAuth)
│   │
│   ├── components/
│   │   ├── layout/              # Navbar, Footer, Providers
│   │   └── shop/                # ProductCard, FlashSaleBanner
│   │
│   ├── lib/
│   │   ├── woocommerce.ts       # WC REST API client
│   │   ├── auth.ts              # NextAuth config
│   │   └── cart-store.ts        # Zustand cart (persisted)
│   │
│   └── Dockerfile
│
└── scripts/
    ├── wpcli-setup.sh           # Auto-configures WP + WooCommerce
    ├── codespaces-setup.sh      # Codespaces post-create
    └── init.sql                 # MySQL database init
```

---

## 🛒 WooCommerce Features

- **Products** — managed entirely from WP Admin
- **Orders** — full order lifecycle (pending → processing → completed)
- **Customers** — WP user accounts, linked to WooCommerce customer records
- **Categories** — Lace Front, HD Lace, Full Lace, Bob Wigs
- **Coupons** — managed from WP Admin
- **Stock management** — per-product inventory tracking
- **Sales reports** — in WP Admin under WooCommerce → Reports

### Adding a Payment Gateway

**Stripe (card payments):**
1. WP Admin → WooCommerce → Settings → Payments
2. Enable Stripe, add your test keys from [dashboard.stripe.com](https://dashboard.stripe.com)

**PayFast (South Africa):**
1. WP Admin → Plugins → Add New → Search "PayFast"
2. Install "WooCommerce PayFast Gateway"
3. Configure with your PayFast merchant credentials

---

## 👤 User Accounts

Users register at `/register` on the Next.js frontend. This creates a WordPress user + WooCommerce customer record.

**User dashboard** (`/dashboard`):
- View order history + status
- Manage account details
- Reorder past items

**WordPress Admin** (`/wp-admin`):
- Full WooCommerce management
- Order processing
- Product CRUD
- Customer management
- Sales analytics

---

## 🔧 Development Commands

```bash
# Start all services
docker compose up -d

# View logs
docker compose logs -f nextjs
docker compose logs -f wordpress

# Restart a service
docker compose restart nextjs

# Stop everything
docker compose down

# Rebuild after code changes
docker compose up -d --build

# Run WP-CLI commands
docker compose run --rm wpcli wp plugin list --allow-root

# Reset WooCommerce setup
docker compose run --rm wpcli sh /scripts/wpcli-setup.sh
```

---

## 🔐 Security Notes

Before going to production:
1. Change all passwords in `.env`
2. Set a strong `NEXTAUTH_SECRET` (32+ random chars)
3. Set `WP_DEBUG=false`
4. Enable HTTPS (add SSL certificate)
5. Restrict WP Admin to specific IPs
6. Add `.env` to `.gitignore` (already done)

---

## 📦 Adding Products

**Via WP Admin (recommended):**
WooCommerce → Products → Add New

**Via WP-CLI:**
```bash
docker compose run --rm wpcli wp wc product create \
  --name="New Wig" \
  --regular_price=1800 \
  --stock_quantity=10 \
  --user=1 --allow-root
```

**Via WooCommerce REST API:**
```bash
curl -X POST http://localhost:8080/wp-json/wc/v3/products \
  -u "ck_xxx:cs_xxx" \
  -H "Content-Type: application/json" \
  -d '{"name":"New Wig","regular_price":"1800"}'
```
