import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "cdn.simpleicons.org" },
      { protocol: "https", hostname: "zednova.com" },
      { protocol: "https", hostname: "www.zednova.com" },
      { protocol: "https", hostname: "zednova.studio" },
      { protocol: "https", hostname: "www.zednova.studio" },
    ],
  },
  async redirects() {
    return [
      { source: "/custom_software", destination: "/custom-software", permanent: true },
      { source: "/resources", destination: "/", permanent: false },
      { source: "/resources/:path*", destination: "/", permanent: false },
      { source: "/products", destination: "/", permanent: false },
      { source: "/industries/shopify-dtc-brands", destination: "/industries/ecommerce-dtc", permanent: true },
      { source: "/industries/small-business-custom-software", destination: "/custom-software", permanent: true },
      { source: "/industries/healthcare-clinics", destination: "/industries/healthcare-wellness", permanent: true },
      { source: "/industries/ecommerce-shopify", destination: "/industries/ecommerce-dtc", permanent: true },
      { source: "/industries/b2b-saas-tech", destination: "/industries/b2b-saas-technology", permanent: true },
      { source: "/industries/saas-companies", destination: "/industries/b2b-saas-technology", permanent: true },
      { source: "/industries/ai-startups", destination: "/industries/b2b-saas-technology", permanent: true },
      { source: "/industries/software-companies", destination: "/industries/b2b-saas-technology", permanent: true },
      { source: "/industries/tech-startups", destination: "/industries/b2b-saas-technology", permanent: true },
      { source: "/industries/home-services", destination: "/industries/professional-services", permanent: true },
      { source: "/industries/dental-healthcare", destination: "/industries/dental-clinics", permanent: true },
      { source: "/industries/legal", destination: "/industries/law-firms", permanent: true },
      { source: "/industries/real-estate", destination: "/industries/real-estate-property", permanent: true },
      { source: "/industries/saas-startups", destination: "/industries/b2b-saas-technology", permanent: true },
      { source: "/industries/financial-insurance", destination: "/industries/professional-services", permanent: true },
      { source: "/industries/wellness-med-spas", destination: "/industries/medspas", permanent: true },
      { source: "/industries/construction", destination: "/industries/professional-services", permanent: true },
      { source: "/industries/fitness-coaches-personal-trainers", destination: "/industries/fitness-coaches", permanent: true },
      { source: "/industries/gyms-fitness-studios", destination: "/industries/gyms", permanent: true },
      { source: "/industries/med-spas", destination: "/industries/medspas", permanent: true },
      { source: "/industries/wellness-clinics", destination: "/industries/wellness-practices", permanent: true },
      { source: "/industries/supplement-brands", destination: "/industries/supplement-style-wellness-brands", permanent: true },
      { source: "/industries/dtc-brands", destination: "/industries/small-dtc-brands", permanent: true },
    ];
  },
};

export default nextConfig;
