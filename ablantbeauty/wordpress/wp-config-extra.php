<?php
/**
 * AblantBeauty WordPress Extra Config
 * Loaded via wp-config.php to enable headless / Next.js integration
 */

// ── REST API CORS ──────────────────────────────────────────────
add_action('init', function () {
    $allowed_origins = [
        'http://localhost:3000',
        'http://nextjs:3000',
        getenv('NEXT_PUBLIC_SITE_URL') ?: '',
    ];

    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

    if (in_array($origin, array_filter($allowed_origins), true)) {
        header("Access-Control-Allow-Origin: $origin");
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce');
    }

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        status_header(200);
        exit();
    }
});

// ── Disable XML-RPC (security) ─────────────────────────────────
add_filter('xmlrpc_enabled', '__return_false');

// ── Remove REST API authentication requirement ─────────────────
// (WooCommerce API keys handle auth for the storefront)
add_filter('rest_authentication_errors', function ($result) {
    if (true === $result || is_wp_error($result)) {
        return $result;
    }
    if (!is_user_logged_in()) {
        return $result;
    }
    return $result;
});

// ── WooCommerce: allow REST API from Next.js ───────────────────
add_filter('woocommerce_rest_check_permissions', function ($permission, $context, $object_id, $post_type) {
    return $permission;
}, 10, 4);

// ── Security headers ───────────────────────────────────────────
add_action('send_headers', function () {
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: SAMEORIGIN');
    header('Referrer-Policy: strict-origin-when-cross-origin');
});
