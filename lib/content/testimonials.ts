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
      "Zlatko is a PRO! Something I was struggling with for months, took him only a few days. He knows how to operate the back end of a website, he understands coding and connection. He is just a life saver and has saved me valuable time. I'll 100% will be working with him as I continue to build my tech business. I recommend him, but be easy on him…I still need him to be available to help me. You can't lose when working with Zlatko! He's excellent!",
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
      "Working with Zlatko has been nothing but exceptional. From the speed of his work to his deep knowledge of code, the entire process was a pleasure, and I'm very happy with my improved website. Zlatko was responsive, knowledgeable, and willing to go back and forth with me on even the smallest details. He also sent a very detailed video addressing all of my questions and concerns, which I can refer back to for any future updates. I'm very glad I chose Zlatko and would highly recommend him for any Webflow or Framer work.",
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
      "Great experience working with Zlatko! He did a great job creating our press sites and delivered a professional, well-structured result that matched what we needed. Communication was smooth throughout the project. Highly recommended and we would happily work with him again!",
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
      "Very happy with the project and Zlatko's work. I didn't think it was possible but he took my site from a 43 to a 96 score on Lighthouse for page speed and load times. Will definitely be a repeat customer.",
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
      "Zlatko did a very good job making a new website for my clinic. It looks very professional and streamlined, and I am looking forward to optimizing it for SEO performance. There was a little bit of delay due to some unforeseen issues on his end, but he was communicative and let me know what's going on. I would definitely use him again in the future if needed.",
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
      "Zlatko did excellent work on my Webflow site. He significantly improved PageSpeed performance, rebuilt a problematic popup natively in Webflow, and refined the mobile experience so the site is now much smoother and easier to navigate. Communication was clear and professional throughout, and he was thoughtful in addressing both technical performance and real user experience. I would happily work with him again and highly recommend his work.",
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
      "Zlatko is the real deal. Not just some guy who learned Framer. A REAL web developer who builds professional components, structure, and websites. He absolutely knows what he's doing and is the most professional web builder I've worked with on this platform. I will 100% hire him again and again and again. He's my go-to guy now. Absolutely knocked it out of the park on an insane deadline with a heavily animated and polished build. Can't recommend this man enough. Super super good.",
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
      "The best web developer you could ever ask for. He did an amazing job with our website and we will be working with him in the future for more projects. We are extremely satisfied with his work and the end result. Highly recommend Zlatko for any high-end website needs.",
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
      "Zlatko did such an amazing job fixing up my Webflow site. He is always fast and responsive and delivers high-quality work. Will definitely come back again if I need anything Webflow. Highly recommend.",
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
      "Zlatko is very experienced, able to communicate clearly and efficiently and able to work very fast while still delivering quality work. He's an amazing web designer and I will definitely be back for future work and refer close friends to his offer.",
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
      "Zlatko has been a pleasure to work with. He is extremely professional, proficient and articulate. He met our tight deadline and was incredibly patient with our changes. Looking forward to working with him in the future.",
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
      "Zlatko exceeded in every possible way. Excellent communicator, very speedy in response and proactively thinking with me to get the most out of my website and setup. He is a gem!",
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
      "Zlatko was extraordinarily adept, efficient and provided amazingly high quality in his work. Would highly recommend him for your Webflow website needs!",
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
      "Zlatko is hard-working and proactive, with excellent communication skills and a keen eye for detail. We engaged Zlatko to help with a broad range of tasks in Webflow with quite a short turnaround, and we couldn't be happier with his results. I highly recommend his services and would not hesitate to work with him again in the future. Thank you Zlatko for the exceptional work!",
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
      "Zlatko was incredible to work with. He helped spin up our website in less than two days and responded within minutes to all of my requests. Can't thank him enough — will use him again for many other projects moving forward. My second time working with him in two weeks and he's completely exceeded expectations yet again. I needed tons of formatting help and mobile optimization. Every time I sent a request he responded quickly and the tasks were already done.",
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
    quote: "Zlatko was a dream to work with and we would 100% work with him again!",
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
      "Great job. Did a comprehensive overhaul of our entire site and got us to move off SquareSpace to Webflow. Very collaborative and consultative, which was very helpful.",
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
      "Zlatko is a true pro. His knowledge of Webflow and web development is tremendous, and he is very committed to ensuring everything works to your satisfaction before delivery. I will continue to be using Zlatko for any updates to my website, and cannot recommend his services enough!",
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
      "Our website allows us to deliver our vision, impact, and connect with our existing and future community around the world. Thanks to Zlatko's skillsets and laser-focused diligence, it speaks to our audience, inspires others to take action, and transmits the energy of our work with young founders. Zlatko's expertise and ability to run multiple objectives along our milestones allowed us to develop a top-notch and interactive website.",
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
      "I had the pleasure of working with Z on a Webflow project, and I couldn't be more impressed with the results. His communication is exceptional—clear, prompt, and always professional. Z truly understands client needs and goes above and beyond to ensure satisfaction. I look forward to collaborating with him on future projects and highly recommend him to anyone in need of top-tier Webflow development.",
    authorName: "Jordan W. Bryant",
    authorTitle: "Chair & CEO, Vault Apps",
    company: "Vault Apps",
    industry: "Upwork",
    image: img("Jordan-W-Bryant.avif"),
    platform: true,
    featured: true,
  },
  {
    id: "p-21",
    quote:
      "Zlatko was incredible. He worked diligently under a deadline, gave incredible insights and was able to work on his own and bring massive value to the project. It was a pleasure working with him on this project and will be working with him again in the future. Best web person I've worked with on this platform, by far.",
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
