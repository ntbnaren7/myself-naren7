export type SocialProfile = {
  name: string;
  icon: string;
  url: string;
  handle: string;
  displayName?: string;
  pronouns?: string;
  location?: string;
  avatar?: string;
  banner?: string;
  manualStatus?: string;
  variant: "github" | "twitter" | "linkedin" | "discord";
  bio: string;
  stats: { value: string; label: string }[];
};

export const socialOwner = {
  name: "Naren",
  avatar: "/images/social-avatar.svg",
  location: "Madurai, India",
};

// Static profile snapshots: GitHub API, LinkedIn's public listing, and supplied screenshots.
export const socials: SocialProfile[] = [
  {
    name: "GitHub",
    displayName: "Naren A",
    avatar: "/images/profiles/github.jpg",
    location: "Madurai, India (UTC +05:30)",
    icon: "github",
    variant: "github",
    url: "https://github.com/ntbnaren7",
    handle: "ntbnaren7",
    bio: "21 • AI Engineer Intern",
    stats: [
      { value: "28", label: "Repositories" },
      { value: "8", label: "Followers" },
    ],
  },
  {
    name: "Twitter",
    icon: "twitter",
    variant: "twitter",
    url: "https://x.com/ntbnaren7",
    handle: "@ntbnaren7",
    bio: "I love building stuff",
    stats: [
      { value: "53", label: "Following" },
      { value: "4", label: "Followers" },
    ],
  },
  {
    name: "LinkedIn",
    displayName: "Naren A",
    location: "Greater Madurai Area",
    avatar: "/images/profiles/linkedin.png",
    banner: "/images/profiles/linkedin-banner.jpg",
    icon: "linkedin",
    variant: "linkedin",
    url: "https://www.linkedin.com/in/naren-tech/",
    handle: "in/naren-tech",
    bio: "I build AI systems that actually ship.",
    stats: [
      { value: "500+", label: "Connections" },
      { value: "1,000+", label: "Followers" },
    ],
  },
  {
    name: "Discord",
    displayName: "Naren",
    avatar: "/images/profiles/discord.png",
    icon: "discord",
    variant: "discord",
    url: "https://discord.com/users/684050302550147150",
    handle: "ntbnaren7",
    pronouns: "he/him/hers",
    bio: "Even if it's dark, keep moving forward.",
    manualStatus: "Online",
    stats: [],
  },
];
