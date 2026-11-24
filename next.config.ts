const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: true
});

// Doc08 LK-ARCH-A-01/A-02/A-07 security headers. The CSP is report-only first so it can be
// tuned against real traffic (Stripe, tawk.to, analytics) before it is enforced.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy-Report-Only",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://embed.tawk.to https://*.tawk.to https://www.googletagmanager.com",
      "connect-src 'self' https://api.stripe.com https://*.tawk.to wss://*.tawk.to https://www.google-analytics.com",
      "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://*.tawk.to",
      "img-src 'self' data: blob: https:",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.tawk.to",
      "font-src 'self' data: https://fonts.gstatic.com https://*.tawk.to",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
  ...(process.env.NODE_ENV === "production"
    ? [{ key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" }]
    : []),
];

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
});