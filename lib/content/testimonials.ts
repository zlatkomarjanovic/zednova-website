import type { Testimonial } from "@/lib/types";

const img = (file: string) => `/testimonials/${file}`;

/** Replace legacy personal-name mentions with the ZedNova brand name. */
export function brandQuote(quote: string): string {
  return quote
    .replace(/working with Z on/gi, "working with ZedNova on")
    .replace(/\bZ truly\b/gi, "ZedNova truly")
    .replace(/Zlatko's/gi, "ZedNova's")
    .replace(/Zlatko/gi, "ZedNova");
}

const rawPlatformTestimonials: Testimonial[] = [
  {
    id: "p-01",
    quote:
      "Something I was struggling with for months, he solved in a few days. He knows how to operate the backend, he understands code and connections. He's a lifesaver. I'll 100% be working with him as I continue building my tech business. You can't lose with ZedNova.",
    authorName: "Meesha Lewis",
    authorTitle: "CEO & Founder at ManeXperience",
    company: "ManeXperience",
    industry: "Fiverr",
    image: img("5E6E06B1-D04F-4875-BBE1-6D1662234DB1.webp"),
    platform: true,
    featured: true,
  },
  {
    id: "p-02",
    quote:
      "Working with ZedNova was exceptional from start to finish. The speed, the depth of knowledge, the process, all of it. He sent a detailed walkthrough video addressing every question I had, which I can refer back to for future updates. Highly recommend for any Webflow or Framer work.",
    authorName: "Minka Djurasevic",
    authorTitle: "Senior Graphic Designer",
    company: "Independent",
    industry: "Fiverr",
    image: img("1715187334568.webp"),
    platform: true,
    featured: true,
  },
  {
    id: "p-03",
    quote:
      "He did a great job creating our press sites and delivered a professional, well-structured result. Communication was smooth throughout. Highly recommended and we would happily work with him again.",
    authorName: "Hintsteiner Group GmbH",
    authorTitle: "Austria",
    company: "Hintsteiner Group",
    industry: "Upwork",
    image: img("download.webp"),
    platform: true,
    featured: true,
  },
  {
    id: "p-04",
    quote:
      "I didn't think it was possible but he took our site from a 43 to a 96 on Lighthouse for page speed. Will definitely be a repeat customer.",
    authorName: "Lance Parth",
    authorTitle: "Triton Sensors",
    company: "Triton Sensors",
    industry: "Fiverr",
    image: img("triton_vape_sensor_1.webp"),
    platform: true,
    featured: true,
  },
  {
    id: "p-05",
    quote:
      "He made a new website for my clinic that looks professional and streamlined. He was communicative and transparent when anything came up. I would definitely use him again.",
    authorName: "Dr. Farhan Abdullah",
    authorTitle: "CEO at Magnolia Functional Wellness",
    company: "Magnolia Functional Wellness",
    industry: "Fiverr",
    image: img("Dr-Farhan-Abdullah-DO-583781-circle_large__v2__.webp"),
    platform: true,
    featured: true,
  },
  {
    id: "p-06",
    quote:
      "He improved PageSpeed, rebuilt a problematic popup natively in Webflow, and refined the mobile experience so the site is much smoother. Communication was clear and professional throughout. I would happily work with him again.",
    authorName: "Sagel",
    authorTitle: "Yoga and Meditation with Sagel",
    company: "Yoga and Meditation with Sagel",
    industry: "Fiverr",
    image: img("Sagel.webp"),
    platform: true,
    featured: true,
  },
  {
    id: "p-07",
    quote:
      "ZedNova is the real deal. Not just some guy who learned Framer. A real web developer who builds professional components, structure, and websites. He knocked it out of the park on an insane deadline with a heavily animated and polished build. He's my go-to now.",
    authorName: "Adam",
    authorTitle: "Polyform Studio",
    company: "Polyform Studio",
    industry: "Contra",
    image: img("32719c1a-a881-487b-bbb1-5dc1bb534d10.webp"),
    platform: true,
    featured: true,
  },
  {
    id: "p-08",
    quote:
      "The best web developer you could ever ask for. He did an amazing job with our website and we will absolutely be working with him on future projects. Highly recommend for any high-end website needs.",
    authorName: "Alexander Karima",
    authorTitle: "Co-founder at Mavesta Media",
    company: "Mavesta Media",
    industry: "Fiverr",
    image: img("Screenshot_6.webp"),
    platform: true,
    featured: true,
  },
  {
    id: "p-09",
    quote:
      "Always fast and responsive and delivers high-quality work. Will definitely come back again if I need anything Webflow.",
    authorName: "Dana Yao",
    authorTitle: "Senior Product Designer at Visa Inc.",
    company: "Visa Inc.",
    industry: "Fiverr",
    image: img("Dana-Yao.avif"),
    platform: true,
    featured: true,
  },
  {
    id: "p-10",
    quote:
      "Very experienced, communicates clearly, and works fast without dropping quality. I'll definitely be back and will refer close friends to him.",
    authorName: "Astral Labs Agency",
    authorTitle: "Independent Employer",
    company: "Astral Labs Agency",
    industry: "Upwork",
    image: img("51dfb1d5-4011-4e9d-addd-0239acba08b9.webp"),
    platform: true,
    featured: true,
  },
  {
    id: "p-11",
    quote:
      "Extremely professional, proficient, and articulate. He met our tight deadline and was patient with every change request. Looking forward to working with him again.",
    authorName: "Matthew John S",
    authorTitle: "CEO at Gsshades",
    company: "Gsshades",
    industry: "Fiverr",
    image: img("Matthew-GSShades.avif"),
    platform: true,
    featured: true,
  },
  {
    id: "p-12",
    quote:
      "Excellent communicator, very responsive, and proactively thought through how to get the most out of my website and setup. He is a gem.",
    authorName: "Desiree Kolman",
    authorTitle: "Personal Website Build",
    company: "Independent",
    industry: "Fiverr",
    image: img("Desiree-Kolman.avif"),
    platform: true,
    featured: true,
  },
  {
    id: "p-13",
    quote:
      "Extraordinarily adept, efficient, and high quality. Would highly recommend for your Webflow needs.",
    authorName: "Nick Maciel",
    authorTitle: "Founder at Cadversity",
    company: "Cadversity",
    industry: "Fiverr",
    image: img("Nick-Maciel.avif"),
    platform: true,
    featured: true,
  },
  {
    id: "p-14",
    quote:
      "Hard-working, proactive, excellent communication, and a sharp eye for detail. We had a short turnaround and a broad range of tasks. He delivered on all of it. Thank you for the exceptional work.",
    authorName: "Thom Vaughan",
    authorTitle: "Manager at Common Crawl",
    company: "Common Crawl",
    industry: "Upwork",
    image: img("64e222836f9e84517a564456_thom.webp"),
    platform: true,
    featured: true,
  },
  {
    id: "p-15",
    quote:
      "He helped spin up our website in less than two days and responded within minutes to every request. I've worked with him twice now and he completely exceeded expectations both times.",
    authorName: "Marina Paganessi",
    authorTitle: "Co-Founder at Focus&Film",
    company: "Focus&Film",
    industry: "Fiverr",
    image: img("Margina-Paganessi.avif"),
    platform: true,
    featured: true,
  },
  {
    id: "p-16",
    quote: "ZedNova was a dream to work with and we would 100% work with him again.",
    authorName: "Dominique De Leon",
    authorTitle: "Independent Employer",
    company: "Independent",
    industry: "Upwork",
    image: img("Dominique-De-Leon.avif"),
    platform: true,
    featured: true,
  },
  {
    id: "p-17",
    quote:
      "Great job. Did a full overhaul of our entire site and moved us off Squarespace to Webflow. Very collaborative and consultative throughout.",
    authorName: "Seth Meritt",
    authorTitle: "CEO at Welby Health",
    company: "Welby Health",
    industry: "Contra",
    image: img("Seth-Meritt.avif"),
    platform: true,
    featured: true,
  },
  {
    id: "p-18",
    quote:
      "His knowledge of Webflow and web development is tremendous. Very committed to making sure everything works before delivery. I will keep using ZedNova and cannot recommend him enough.",
    authorName: "Zach Garti",
    authorTitle: "Founder of Pareidolia",
    company: "Pareidolia",
    industry: "Fiverr",
    image: img("65c541cb8467d9fef7014c71_6485fe8ec715e4a4f924539f_1587777528884.webp"),
    platform: true,
    featured: true,
  },
  {
    id: "p-19",
    quote:
      "Our website now speaks to our audience, inspires action, and transmits the energy of our work with young founders. His ability to run multiple objectives in parallel allowed us to build something top-notch.",
    authorName: "Filip Sasic",
    authorTitle: "CEO & Founder at EGC",
    company: "EGC",
    industry: "LinkedIn",
    image: img("Filip-Sasic.avif"),
    platform: true,
    featured: true,
  },
  {
    id: "p-20",
    quote:
      "His communication is exceptional. Clear, prompt, and always professional. He truly understands what the client needs and goes above and beyond to make it happen.",
    authorName: "Jordan W. Bryant",
    authorTitle: "Chair & CEO at Vault Apps",
    company: "Vault Apps",
    industry: "Upwork",
    image: img("Jordan-W-Bryant.avif"),
    platform: true,
    featured: true,
  },
  {
    id: "p-21",
    quote:
      "He worked diligently under a deadline, gave incredible insights, and brought massive value to the project on his own. Best web person I've worked with on this platform, by far.",
    authorName: "Marshall Wilkinson",
    authorTitle: "CEO, Construct",
    company: "Construct",
    industry: "Upwork",
    image: img("Marshall-Wilkinson.avif"),
    platform: true,
    featured: true,
  },
  {
    id: "p-22",
    quote:
      "He did a great job and completed the website very quickly. Excellent designer and good communicator.",
    authorName: "Jeremy Brown",
    authorTitle: "CEO at Karihub",
    company: "Karihub",
    industry: "Fiverr",
    image: img("Jeremy-Brown.avif"),
    platform: true,
    featured: true,
  },
];

export const platformTestimonials: Testimonial[] = rawPlatformTestimonials.map(
  (testimonial) => ({
    ...testimonial,
    quote: brandQuote(testimonial.quote),
  }),
);

/** Anonymized quotes tied to case studies on /work. */
export const caseStudyTestimonials: Testimonial[] = [
  {
    id: "t-hvac",
    quote:
      "We stopped losing jobs to voicemail in the first week. The system books appointments while my guys are on the roof. It paid for itself almost immediately.",
    authorName: "Operations Manager",
    authorTitle: "Operations Manager",
    company: "Multi-location HVAC Company",
    industry: "Home Services",
    featured: true,
  },
  {
    id: "t-dental",
    quote:
      "Our front desk finally has room to breathe, and the reviews keep coming in on their own. New patients tell us they found us on Google now.",
    authorName: "Practice Owner",
    authorTitle: "Practice Owner",
    company: "Dental Group, Southeast US",
    industry: "Dental & Healthcare",
    featured: true,
  },
  {
    id: "t-legal",
    quote:
      "We answer leads in seconds now instead of hours. That single change is the difference between signing a case and reading about it on a competitor's site.",
    authorName: "Managing Partner",
    authorTitle: "Managing Partner",
    company: "Personal Injury Firm, Texas",
    industry: "Legal",
    featured: true,
  },
  {
    id: "t-saas",
    quote:
      "ZedNova built us an outbound engine that books demos without us hiring a single SDR. It runs whether we're paying attention or not.",
    authorName: "Founder",
    authorTitle: "Founder",
    company: "Seed-stage SaaS",
    industry: "B2B SaaS",
    featured: false,
  },
];

export const testimonials: Testimonial[] = [
  ...platformTestimonials,
  ...caseStudyTestimonials,
];
