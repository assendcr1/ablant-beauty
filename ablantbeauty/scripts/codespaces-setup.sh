#!/bin/bash
# ── Codespaces Post-Create Setup ──────────────────────────────
# Runs once when the Codespace is first created.

set -e
REPO_ROOT="/workspaces/ablantbeauty"

echo ""
echo "╔══════════════════════════════════════════╗"
echo "║   AblantBeauty — Codespaces Setup        ║"
echo "╚══════════════════════════════════════════╝"
echo ""

# ── 1. Copy .env if not present ───────────────────────────────
if [ ! -f "$REPO_ROOT/.env" ]; then
  cp "$REPO_ROOT/.env.example" "$REPO_ROOT/.env"
  echo "✅ .env created from .env.example"
fi

# ── 2. Install Next.js dependencies ──────────────────────────
echo "📦 Installing Next.js dependencies..."
cd "$REPO_ROOT/nextjs"
npm install
echo "✅ npm install complete"

# ── 3. Start Docker Compose services ─────────────────────────
echo "🐳 Starting Docker services..."
cd "$REPO_ROOT"
docker compose up -d --build
echo "✅ Docker services started"

# ── 4. Wait for WordPress + run WP-CLI setup ─────────────────
echo "⏳ Waiting for WordPress to become available (up to 2 mins)..."
for i in $(seq 1 24); do
  if curl -sf http://localhost:8080/wp-login.php > /dev/null 2>&1; then
    echo "✅ WordPress is up!"
    break
  fi
  echo "  Attempt $i/24 — waiting 5s..."
  sleep 5
done

# ── 5. Show access info ───────────────────────────────────────
echo ""
echo "════════════════════════════════════════════"
echo "🚀  AblantBeauty is ready!"
echo "════════════════════════════════════════════"
echo ""
echo "  Frontend (Next.js):   http://localhost:3000"
echo "  WordPress Admin:      http://localhost:8080/wp-admin"
echo "  phpMyAdmin:           http://localhost:8081"
echo ""
echo "  WP Admin login:       admin / admin_password_change_me"
echo ""
echo "  ⚠️  After setup, copy WooCommerce API keys"
echo "     from scripts/wc-api-keys.txt into .env"
echo "     then restart: docker compose restart nextjs"
echo "════════════════════════════════════════════"
