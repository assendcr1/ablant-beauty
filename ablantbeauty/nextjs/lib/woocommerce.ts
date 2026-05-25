/**
 * WooCommerce REST API client
 * All server-side calls use Consumer Key/Secret (OAuth 1.0a)
 * All client-side calls go through /wp-api proxy (Next.js rewrites)
 */

const WP_URL = process.env.WP_URL || process.env.NEXT_PUBLIC_WP_URL || 'http://wordpress';
const WC_KEY = process.env.WC_CONSUMER_KEY || '';
const WC_SECRET = process.env.WC_CONSUMER_SECRET || '';

// ── Base fetch with WC auth ────────────────────────────────────
async function wcFetch(path: string, options: RequestInit = {}) {
  const credentials = Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString('base64');
  const url = `${WP_URL}/wp-json/wc/v3${path}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${credentials}`,
      ...options.headers,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || `WC API error: ${res.status}`);
  }

  return res.json();
}

// ── Products ───────────────────────────────────────────────────
export async function getProducts(params?: {
  per_page?: number;
  page?: number;
  category?: string;
  featured?: boolean;
  on_sale?: boolean;
  search?: string;
  orderby?: string;
  order?: 'asc' | 'desc';
}) {
  const qs = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined) qs.set(k, String(v));
    });
  }
  return wcFetch(`/products?${qs.toString()}`);
}

export async function getProduct(id: number) {
  return wcFetch(`/products/${id}`);
}

export async function getProductBySlug(slug: string) {
  const products = await wcFetch(`/products?slug=${slug}`);
  return products[0] || null;
}

export async function getFeaturedProducts() {
  return wcFetch('/products?featured=true&per_page=6');
}

// ── Categories ─────────────────────────────────────────────────
export async function getCategories() {
  return wcFetch('/products/categories?per_page=20&hide_empty=true');
}

// ── Orders ─────────────────────────────────────────────────────
export async function getOrders(params?: { customer?: number; per_page?: number; page?: number }) {
  const qs = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined) qs.set(k, String(v));
    });
  }
  return wcFetch(`/orders?${qs.toString()}`);
}

export async function getOrder(id: number) {
  return wcFetch(`/orders/${id}`);
}

export async function createOrder(orderData: Record<string, unknown>) {
  return wcFetch('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  });
}

export async function updateOrder(id: number, data: Record<string, unknown>) {
  return wcFetch(`/orders/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// ── Customers ──────────────────────────────────────────────────
export async function getCustomer(id: number) {
  return wcFetch(`/customers/${id}`);
}

export async function createCustomer(data: {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
}) {
  return wcFetch('/customers', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateCustomer(id: number, data: Record<string, unknown>) {
  return wcFetch(`/customers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function getCustomerOrders(customerId: number) {
  return wcFetch(`/orders?customer=${customerId}&per_page=20`);
}

// ── Coupons ────────────────────────────────────────────────────
export async function validateCoupon(code: string) {
  const coupons = await wcFetch(`/coupons?code=${encodeURIComponent(code)}`);
  return coupons[0] || null;
}

// ── Store stats (admin) ────────────────────────────────────────
export async function getSalesReport(period: 'week' | 'month' | 'year' = 'month') {
  return wcFetch(`/reports/sales?period=${period}`);
}

export async function getTopSellers(period: 'week' | 'month' | 'year' = 'month') {
  return wcFetch(`/reports/top_sellers?period=${period}`);
}

export async function getOrdersCount() {
  return wcFetch('/reports/orders/totals');
}

export async function getCustomerCount() {
  const res = await fetch(
    `${WP_URL}/wp-json/wc/v3/customers?per_page=1`,
    {
      headers: { Authorization: `Basic ${Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString('base64')}` },
      cache: 'no-store',
    }
  );
  return parseInt(res.headers.get('X-WP-Total') || '0', 10);
}
