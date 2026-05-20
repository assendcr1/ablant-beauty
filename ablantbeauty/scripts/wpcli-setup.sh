#!/bin/sh
# ── AblantBeauty WP-CLI Setup Script ──────────────────────────
# Runs once inside the wpcli container to fully configure
# WordPress + WooCommerce with sample data.

set -e

WP="wp --allow-root --path=/var/www/html"
SITE_URL="http://localhost:8080"
ADMIN_USER="${WP_ADMIN_USER:-admin}"
ADMIN_PASS="${WP_ADMIN_PASSWORD:-admin_password_change_me}"
ADMIN_EMAIL="${WP_ADMIN_EMAIL:-admin@ablantbeauty.co.za}"

echo "⏳ Waiting for WordPress to be ready..."
until $WP core is-installed 2>/dev/null; do
  sleep 5
  echo "  Still waiting..."
done

echo "✅ WordPress is ready. Running setup..."

# ── 1. Core WordPress Install ──────────────────────────────────
$WP core install \
  --url="$SITE_URL" \
  --title="AblantBeauty" \
  --admin_user="$ADMIN_USER" \
  --admin_password="$ADMIN_PASS" \
  --admin_email="$ADMIN_EMAIL" \
  --skip-email || echo "Already installed, continuing..."

# ── 2. Site settings ──────────────────────────────────────────
$WP option update blogname "AblantBeauty"
$WP option update blogdescription "Premium Wigs by Vanessa Ablant"
$WP option update timezone_string "Africa/Johannesburg"
$WP option update date_format "d F Y"
$WP option update permalink_structure "/%postname%/"
$WP rewrite flush

# ── 3. Install & activate plugins ─────────────────────────────
echo "📦 Installing plugins..."

# WooCommerce
$WP plugin install woocommerce --activate

# WooCommerce REST API helper (enables better CORS + JWT)
$WP plugin install jwt-authentication-for-wp-rest-api --activate

# WooCommerce Stripe gateway (optional, configure keys later)
$WP plugin install woocommerce-gateway-stripe --activate

# Enable CORS for Next.js
$WP plugin install wp-rest-api-key-authentication --activate

echo "✅ Plugins installed"

# ── 4. WooCommerce base settings ──────────────────────────────
echo "🛒 Configuring WooCommerce..."

$WP option update woocommerce_store_address "Cape Town"
$WP option update woocommerce_store_city "Cape Town"
$WP option update woocommerce_default_country "ZA"
$WP option update woocommerce_store_postcode "8001"
$WP option update woocommerce_currency "ZAR"
$WP option update woocommerce_currency_pos "left"
$WP option update woocommerce_price_thousand_sep ","
$WP option update woocommerce_price_decimal_sep "."
$WP option update woocommerce_price_num_decimals "2"

# Enable REST API
$WP option update woocommerce_api_enabled "yes"

# ── 5. Create product categories ──────────────────────────────
echo "🏷️  Creating categories..."

$WP wc product_cat create \
  --name="Lace Front Wigs" \
  --description="Natural-looking lace front wigs" \
  --user=1 2>/dev/null || true

$WP wc product_cat create \
  --name="HD Lace Wigs" \
  --description="Undetectable HD lace wigs" \
  --user=1 2>/dev/null || true

$WP wc product_cat create \
  --name="Full Lace Wigs" \
  --description="Full lace wigs for versatile styling" \
  --user=1 2>/dev/null || true

$WP wc product_cat create \
  --name="Bob Wigs" \
  --description="Sleek bob-cut wigs" \
  --user=1 2>/dev/null || true

# ── 6. Create sample products ─────────────────────────────────
echo "👒 Creating sample products..."

# Product 1 – Silky Straight 22"
$WP wc product create \
  --name="Silky Straight 22\" Lace Front" \
  --type=simple \
  --regular_price=2400 \
  --sale_price=1680 \
  --description="<p>Vanessa's #1 bestselling wig. 100% human hair, pre-plucked hairline, bleached knots. Comes in natural black. Lasts 12+ months with proper care.</p>" \
  --short_description="Bestselling lace front wig – looks 100% natural." \
  --status=publish \
  --featured=true \
  --stock_quantity=5 \
  --manage_stock=true \
  --categories='[{"id":1}]' \
  --meta_data='[{"key":"_wig_length","value":"22 inch"},{"key":"_wig_type","value":"Lace Front"},{"key":"_wig_color","value":"Natural Black"}]' \
  --user=1 2>/dev/null || true

# Product 2 – Honey Blonde Bob 14"
$WP wc product create \
  --name="Honey Blonde Bob 14\" HD Lace" \
  --type=simple \
  --regular_price=1950 \
  --description="<p>Trending honey blonde bob. HD lace is completely undetectable. Medium density, pre-styled and ready to wear.</p>" \
  --short_description="Undetectable HD lace bob in gorgeous honey blonde." \
  --status=publish \
  --featured=true \
  --stock_quantity=20 \
  --manage_stock=true \
  --categories='[{"id":2}]' \
  --meta_data='[{"key":"_wig_length","value":"14 inch"},{"key":"_wig_type","value":"HD Lace"},{"key":"_wig_color","value":"#27 Honey Blonde"}]' \
  --user=1 2>/dev/null || true

# Product 3 – Deep Wave 18"
$WP wc product create \
  --name="Deep Wave 18\" Full Lace" \
  --type=simple \
  --regular_price=2800 \
  --sale_price=1960 \
  --description="<p>Luscious deep wave full lace wig. 100% human hair, jet black, can be dyed. Full lace allows parting anywhere.</p>" \
  --short_description="Full lace deep wave wig – part anywhere, style anywhere." \
  --status=publish \
  --featured=true \
  --stock_quantity=9 \
  --manage_stock=true \
  --categories='[{"id":3}]' \
  --meta_data='[{"key":"_wig_length","value":"18 inch"},{"key":"_wig_type","value":"Full Lace"},{"key":"_wig_color","value":"Jet Black"}]' \
  --user=1 2>/dev/null || true

# Product 4 – Curly Pixie Cut
$WP wc product create \
  --name="Curly Pixie Cut Wig" \
  --type=simple \
  --regular_price=1650 \
  --description="<p>Bold and beautiful curly pixie cut. 100% human hair, minimal glue needed. Perfect for a dramatic transformation.</p>" \
  --short_description="Bold curly pixie cut – Vanessa's favourite for summer." \
  --status=publish \
  --stock_quantity=15 \
  --manage_stock=true \
  --categories='[{"id":4}]' \
  --meta_data='[{"key":"_wig_length","value":"8 inch"},{"key":"_wig_type","value":"Full Lace"},{"key":"_wig_color","value":"Natural Black"}]' \
  --user=1 2>/dev/null || true

echo "✅ Products created"

# ── 7. Generate WooCommerce API keys ──────────────────────────
echo "🔑 Generating WooCommerce API keys..."

$WP wc tool run install_pages --user=1 2>/dev/null || true

# Create API key for Next.js
$WP eval '
$user_id = 1;
$description = "Next.js Frontend";
$permissions = "read_write";

$consumer_key    = "ck_" . wc_rand_hash();
$consumer_secret = "cs_" . wc_rand_hash();

$data = array(
  "user_id"         => $user_id,
  "description"     => $description,
  "permissions"     => $permissions,
  "consumer_key"    => wc_api_hash( $consumer_key ),
  "consumer_secret" => $consumer_secret,
  "truncated_key"   => substr( $consumer_key, -7 ),
);

global $wpdb;
$wpdb->insert( $wpdb->prefix . "woocommerce_api_keys", $data, array( "%d", "%s", "%s", "%s", "%s", "%s" ) );

echo "WC_CONSUMER_KEY=" . $consumer_key . PHP_EOL;
echo "WC_CONSUMER_SECRET=" . $consumer_secret . PHP_EOL;
' 2>/dev/null | tee /scripts/wc-api-keys.txt

echo ""
echo "════════════════════════════════════════════"
echo "✅  AblantBeauty WordPress setup complete!"
echo "════════════════════════════════════════════"
echo ""
echo "  WP Admin:     http://localhost:8080/wp-admin"
echo "  Username:     $ADMIN_USER"
echo "  Password:     $ADMIN_PASS"
echo ""
echo "  API Keys saved to: scripts/wc-api-keys.txt"
echo "  Copy them into your .env file."
echo "════════════════════════════════════════════"
