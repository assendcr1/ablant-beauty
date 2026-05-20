import { NextRequest, NextResponse } from 'next/server';

const WP_URL = process.env.NEXT_PUBLIC_WP_URL || 'http://wordpress';
const WC_KEY = process.env.WC_CONSUMER_KEY || '';
const WC_SECRET = process.env.WC_CONSUMER_SECRET || '';

// Proxy WooCommerce API calls from the browser (avoids exposing keys)
export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join('/');
  const searchParams = req.nextUrl.searchParams.toString();
  const url = `${WP_URL}/wp-json/wc/v3/${path}${searchParams ? `?${searchParams}` : ''}`;

  const credentials = Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString('base64');

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Basic ${credentials}` },
      cache: 'no-store',
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    return NextResponse.json({ error: 'WooCommerce API unavailable' }, { status: 503 });
  }
}
