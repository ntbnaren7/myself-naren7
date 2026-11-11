import reference from "./reference-content.json";

// Reference content stays here until the owner's details are supplied.
export const profile = {
  name: "naren7",
  age: "21",
  avatar: "/images/profiles/goat.svg",
  introductionTitle: "Engineer / Dreamer.",
  introduction: "Just someone who loves creating things.",
  interests: "Obsessed with AI, products, and possibilities.",
  philosophy:
    "I think beyond code - combining tech, design, and business to bring ideas to life.",
  currentProjects: ["ECHO", "Scribe"],
  bookingUrl: "https://calendly.com/a-naren1308",
  contactUrl: "mailto:community.naren1308@gmail.com",
  githubUrl: "https://github.com/ntbnaren7",
  blogUrl: "https://medium.com/@ashutoshx7",
  quote:
    "By believing passionately in something that still does not exist, we create it. The non-existent is whatever we have not sufficiently desired",
  quoteAuthor: "Franz Kafka",
};

export const sections = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  // { id: "opensource", label: "Open Source" },
  { id: "skills", label: "Skills" },
  { id: "blogs", label: "Blog" },
  { id: "highlights", label: "Highlights" },
];

export const { skills, blogs, highlights } = reference;
export const experiences: typeof reference.experiences = [
  {
    id: "hyle-global",
    title: "Hyle Global",
    role: "AI Engineer Intern",
    date: "Jun 2026 - Aug 2026",
    location: "Remote · Chennai",
    image: "/images/experience/hyle-global.png",
    stats: [
      { value: "Tech Lead", label: "Engineering role" },
      { value: "Cognis", label: "Product led" },
      { value: "Aug-Oct '26", label: "Term" },
      { value: "0 → 1", label: "Product engineering" },
    ],
    description: [
      "Led the engineering of **Cognis** at Hyle Global, taking ownership of its technical direction, architecture, and core development.",
      "Architected the foundational systems powering an AI-native browser experience, translating ambitious product ideas into executable engineering.",
      "Engineered type-safe, event-driven infrastructure to coordinate complex interactions across browser environments.",
      "Drove the development of real-time contextual intelligence, tackling the challenges of latency, relevance, and seamless user interaction.",
      "Shaped Cognis from an engineering and product perspective, making critical trade-offs across technical feasibility, user experience, and long-term scalability.",
    ],
    tags: [
      "AI Systems",
      "Event-Driven Architecture",
      "Intent Modeling",
      "AI Co-pilot",
    ],
  },
  {
    id: "dci",
    title: "Dot Com Infoway (DCI)",
    role: "AI Engineer Intern",
    date: "Jan 2026 - Jun 2026",
    location: "Hybrid · Madurai",
    image: "/images/experience/dci.png",
    stats: [
      { value: "DIYA", label: "AI product" },
      { value: "15-20h", label: "Weekly time saved*" },
      { value: "Jan - Jun 2026", label: "Term" },
      { value: "End-to-End", label: "AI workflows" },
    ],
    description: [
      "Engineered **DIYA**, an AI-powered marketing system that transforms a brand's website into structured intelligence and actionable content strategies.",
      "Built a URL-to-brand intelligence pipeline, extracting visual identity, brand context, and positioning from unstructured web content.",
      "Orchestrated multi-stage LLM workflows, connecting brand analysis, strategic reasoning, and content generation into a cohesive system.",
      "Tackled the challenge of maintaining brand consistency across AI-generated outputs, grounding creative decisions in extracted brand information.",
      "Automated repetitive research and campaign-planning workflows, reducing an estimated **15-20 hours of manual work per week**.",
    ],
    tags: ["AI Content Automation", "Content Strategy", "Workflow Automation"],
  },
  // ...reference.experiences, // Previous sample entries retained for later.
];
export { socials } from "./socials";

export const projects = [
  {
    name: "Scribe",
    status: "Building",
    directLink: true,
    linkLabel: "Visit Scribe",
    image: "/images/projects/scribe-ui.png",
    hoverImage: "/images/projects/project-hover-vengenceui.webp",
    description:
      "An AI-powered creative engine that turns brand websites into intelligent, ready-to-publish marketing campaigns.",
    technologies: ["next", "typescript", "python", "gemini", "tailwind"],
    url: "https://www.usescribe.in/",
  },
  {
    name: "Invariant",
    status: "Live",
    directLink: true,
    image: "/images/projects/invariant-ui.png",
    hoverImage: "/images/projects/project-hover-scribble3d.webp",
    description:
      "An open-source financial intelligence engine that detects payment discrepancies, reconciles transactions, and automates recovery workflows.",
    technologies: [
      "python",
      "fastapi",
      "postgresql",
      "sqlalchemy",
      "pydantic",
      "razorpay",
    ],
    url: "https://financial-control-engine-fce.vercel.app/",
  },
  /* Additional sample projects retained for later.
  {
    name: "Blueprint",
    status: "Building",
    pinned: false,
    image: "/images/projects/blueprint.png",
    hoverImage: "/images/projects/project-hover-blueprint.webp",
    description:
      "Blueprint is an AI UI builder that turns prompts into structured, production-ready interfaces.",
    technologies: [
      "next",
      "typescript",
      "tailwind",
      "prisma",
      "bun",
      "node",
      "zustand",
    ],
    url: "https://www.ashutoshx7.me/projects",
  },
  {
    name: "Inquiro",
    status: "Not Started",
    pinned: false,
    image: "/images/projects/inquiro.png",
    hoverImage: "/images/projects/project-hover-inquiro.webp",
    description:
      "Inquiro is an AI-powered search engine that helps you find information on the internet",
    technologies: ["next", "typescript", "node", "zustand"],
    url: "https://www.ashutoshx7.me/projects",
  },
  */
];

// Captured from the supplied reference. The layout needs no API or backend.
export const contributions = [
  {
    title:
      "feat(runtime): check agent versions and cover failures during a launch",
    repository: "Garudex-Labs/caracal",
    state: "Merged",
  },
  {
    title: "feat(runtime): add an OpenClaw adapter to caracal launch",
    repository: "Garudex-Labs/caracal",
    state: "Merged",
  },
  {
    title:
      "feat(runtime): sandbox claude-code tool commands and fail hooks closed",
    repository: "Garudex-Labs/caracal",
    state: "Merged",
  },
  {
    title: "feat(runtime): launch coding agents under a governed Session",
    repository: "Garudex-Labs/caracal",
    state: "Merged",
  },
];
