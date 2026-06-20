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
      { source: "/industries/shopify-dtc-brands", destination: "/industries/ecommerce-shopify", permanent: true },
      { source: "/industries/b2b-saas-tech", destination: "/industries/small-business-custom-software", permanent: true },
      { source: "/industries/saas-companies", destination: "/industries/small-business-custom-software", permanent: true },
      { source: "/industries/ai-startups", destination: "/industries/small-business-custom-software", permanent: true },
      { source: "/industries/software-companies", destination: "/industries/small-business-custom-software", permanent: true },
      { source: "/industries/tech-startups", destination: "/industries/small-business-custom-software", permanent: true },
      { source: "/industries/home-services", destination: "/industries/healthcare-clinics", permanent: true },
      { source: "/industries/dental-healthcare", destination: "/industries/dental-clinics", permanent: true },
      { source: "/industries/legal", destination: "/industries/small-business-custom-software", permanent: true },
      { source: "/industries/real-estate", destination: "/industries/ecommerce-shopify", permanent: true },
      { source: "/industries/saas-startups", destination: "/industries/small-business-custom-software", permanent: true },
      { source: "/industries/financial-insurance", destination: "/industries/small-business-custom-software", permanent: true },
      { source: "/industries/wellness-med-spas", destination: "/industries/med-spas", permanent: true },
      { source: "/industries/ecommerce-dtc", destination: "/industries/ecommerce-shopify", permanent: true },
      { source: "/industries/professional-services", destination: "/industries/small-business-custom-software", permanent: true },
      { source: "/industries/construction", destination: "/industries/small-business-custom-software", permanent: true },
    ];
  },
};

export default nextConfig;
