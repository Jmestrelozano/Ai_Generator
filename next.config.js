/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "oaidalleapiprodscus.blob.core.windows.net",
      },
      {
        protocol: "https",
        hostname: "cdn.openai.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/auth",
        destination: "/sign-in",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
