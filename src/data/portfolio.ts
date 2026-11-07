import reference from "./reference-content.json";

// Reference content stays here until the owner's details are supplied.
export const profile = {
  name: "naren7",
  age: "21",
  avatar: "/images/profiles/goat.svg",
  introduction:
    "Engineer / Artist. I love building, breaking, and shipping things.",
  interests: "AI, open source, and developer tools excite me.",
  philosophy:
    "I believe actions speak louder than words, so I put my code where my mouth is.",
  currentProjects: ["Draco", "VengeanceUI"],
  bookingUrl: "https://calendly.com/a-naren1308",
  contactUrl: "mailto:community.naren1308@gmail.com",
  githubUrl: "https://github.com/ntbnaren7",
  blogUrl: "https://medium.com/@ashutoshx7",
  quote:
    "Do so much work that it would be unreasonable for you to not be successful.",
  quoteAuthor: "Alex Hormozi",
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
    stats: [],
    description: [],
    tags: [],
  },
  {
    id: "dci",
    title: "Dot Com Infoway (DCI)",
    role: "AI Engineer Intern",
    date: "Jan 2026 - Jun 2026",
    location: "Hybrid · Madurai",
    image: "/images/experience/dci.png",
    stats: [],
    description: [],
    tags: [],
  },
  // ...reference.experiences, // Previous sample entries retained for later.
];
export { socials } from "./socials";

export const projects = [
  {
    name: "VengenceUI",
    status: "Live",
    directLink: true,
    image: "/images/projects/scribe-ui.png",
    hoverImage: "/images/projects/project-hover-vengenceui.webp",
    description:
      "VengenceUI helps you to build your landing page by providing you animated beautiful components",
    technologies: ["next", "react", "typescript", "tailwind", "motion"],
    url: "https://www.usescribe.in/",
  },
  {
    name: "Scribble3D",
    status: "Building",
    directLink: true,
    image: "/images/projects/invariant-ui.png",
    hoverImage: "/images/projects/project-hover-scribble3d.webp",
    description:
      "Turn your sketches into 3D objects and worlds — no 3D skills required.",
    technologies: ["next", "typescript", "postman", "motion"],
    url: "https://financial-control-engine-fce.vercel.app/",
  },
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
