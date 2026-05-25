import { NextRequest, NextResponse } from "next/server";

const WP_URL = process.env.WP_URL || process.env.NEXT_PUBLIC_WP_URL || "https://ablantbeauty.co.za";
const WC_KEY = process.env.WC_CONSUMER_KEY || "";
const WC_SECRET = process.env.WC_CONSUMER_SECRET || "";

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join("/");
  const searchParams = req.nextUrl.searchParams.toString();
  const separator = searchParams ? "&" : "?";
  const url = `${WP_URL}/wp-json/wc/v3/${path}?consumer_key=${WC_KEY}&consumer_secret=${WC_SECRET}${searchParams ? "&" + searchParams : ""}`;

  try {
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    return NextResponse.json({ error: "WooCommerce API unavailable" }, { status: 503 });
  }
}

export async function POST(req: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join("/");
  const body = await req.json();
  const url = `${WP_URL}/wp-json/wc/v3/${path}?consumer_key=${WC_KEY}&consumer_secret=${WC_SECRET}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    return NextResponse.json({ error: "WooCommerce API unavailable" }, { status: 503 });
  }
}
