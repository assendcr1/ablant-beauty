/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "ablantbeauty.co.za" },
      { protocol: "http", hostname: "localhost", port: "8080" },
      { protocol: "http", hostname: "wordpress" },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/wp-api/:path*",
        destination: `${process.env.NEXT_PUBLIC_WP_URL || "https://ablantbeauty.co.za"}/wp-json/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
