import { FaGithub, FaTwitter, FaLinkedin, FaDiscord } from "react-icons/fa";
import type { SocialProfile } from "../../data/socials";

const icons = {
  github: FaGithub,
  twitter: FaTwitter,
  linkedin: FaLinkedin,
  discord: FaDiscord,
};

export function SocialIcon({
  name,
  size = 14,
}: {
  name: SocialProfile["variant"];
  size?: number;
}) {
  const Glyph = icons[name];
  return <Glyph size={size} className="icon" aria-hidden="true" />;
}
