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

// Enforced CSP where no third-party scripts are needed (Doc02 NFR-06, Doc13 L13-FR-056): the staff
// console and the Linko JSON API. The public site keeps the report-only policy above until it is tuned.
const dev = process.env.NODE_ENV !== "production";
const staffCsp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""}`,
  `connect-src 'self'${dev ? " ws: wss:" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");
const apiCsp = "default-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'";

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      { source: "/staff/:path*", headers: [{ key: "Content-Security-Policy", value: staffCsp }, { key: "X-Frame-Options", value: "DENY" }] },
      { source: "/staff", headers: [{ key: "Content-Security-Policy", value: staffCsp }, { key: "X-Frame-Options", value: "DENY" }] },
      { source: "/v1/linko/:path*", headers: [{ key: "Content-Security-Policy", value: apiCsp }] },
    ];
  },
});