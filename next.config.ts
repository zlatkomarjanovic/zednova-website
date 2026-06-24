import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  async redirects() {
    return [
      { source: "/custom_software", destination: "/custom-software", permanent: true },
      { source: "/industries/shopify-dtc-brands", destination: "/industries/ecommerce-shopify", permanent: true },
      { source: "/industries/small-business-custom-software", destination: "/custom-software", permanent: true },
      { source: "/industries/b2b-saas-tech", destination: "/custom-software", permanent: true },
      { source: "/industries/saas-companies", destination: "/custom-software", permanent: true },
      { source: "/industries/ai-startups", destination: "/custom-software", permanent: true },
      { source: "/industries/software-companies", destination: "/custom-software", permanent: true },
      { source: "/industries/tech-startups", destination: "/custom-software", permanent: true },
      { source: "/industries/home-services", destination: "/industries/healthcare-clinics", permanent: true },
      { source: "/industries/dental-healthcare", destination: "/industries/dental-clinics", permanent: true },
      { source: "/industries/legal", destination: "/custom-software", permanent: true },
      { source: "/industries/real-estate", destination: "/industries/ecommerce-shopify", permanent: true },
      { source: "/industries/saas-startups", destination: "/custom-software", permanent: true },
      { source: "/industries/financial-insurance", destination: "/custom-software", permanent: true },
      { source: "/industries/wellness-med-spas", destination: "/industries/med-spas", permanent: true },
      { source: "/industries/ecommerce-dtc", destination: "/industries/ecommerce-shopify", permanent: true },
      { source: "/industries/professional-services", destination: "/custom-software", permanent: true },
      { source: "/industries/construction", destination: "/custom-software", permanent: true },
    ];
  },
};

export default nextConfig;
