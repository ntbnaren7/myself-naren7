import { useEffect, useState } from "react";
import { profile, socials } from "../../data/portfolio";
import { Icon } from "../ui/Icon";
import { SocialHoverCard } from "../ui/SocialHoverCard";
import { ResumeButton } from "../ui/ResumeButton";
import { BookingLink } from "../ui/BookingLink";
import { BannerAtmosphere } from "../ui/BannerAtmosphere";

export function ProfileHeader({
  onOpenCommands,
  light,
  onToggleTheme,
  onOpenResume,
}: {
  onOpenCommands: () => void;
  light: boolean;
  onToggleTheme: () => void;
  onOpenResume: () => void;
}) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString("en-GB").replaceAll(":", "."));
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <>
      <div className="hero-banner">
        <img
          src="/images/hero/naren-banner.jpg"
          alt="A pixel-art knight resting in a flower meadow"
          width={1376}
          height={768}
          fetchPriority="high"
        />
        <img
          className="hero-banner-day"
          src="/images/hero/naren-banner-day.jpg"
          alt=""
          aria-hidden="true"
          width={1679}
          height={937}
        />
        <BannerAtmosphere light={light} />
        <time className="hero-clock">{time}</time>
      </div>
      <header className="profile-header full-divider">
        <div className="profile-identity">
          <div className="avatar-frame">
            <img
              src={profile.avatar}
              alt={`${profile.name}'s profile`}
              width={80}
              height={80}
            />
          </div>
          <div className="profile-name">
            <h1>{profile.name}</h1>
            <p>{profile.age}</p>
          </div>
        </div>
        <div className="profile-controls">
          <button
            className="command-trigger framed-button"
            onClick={onOpenCommands}
            aria-label="Open command menu"
          >
            <span>⌘</span> K
          </button>
          <button
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={`Switch to ${light ? "dark" : "light"} theme`}
          >
            <Icon name={light ? "moon" : "sun"} size={18} />
          </button>
        </div>
      </header>
      <section className="introduction" aria-label="About me">
        <p>{profile.introduction}</p>
        <ul>
          <li>{profile.interests}</li>
          <li>{profile.philosophy}</li>
          <li>
            Currently building <strong>{profile.currentProjects[0]}</strong>,{" "}
            <strong>{profile.currentProjects[1]}</strong>, and experimental AI
            tools.
          </li>
        </ul>
        <div className="contact-actions">
          <BookingLink href={profile.bookingUrl} />
          <a
            className="small-button tactile-button"
            href={profile.contactUrl}
          >
            <Icon name="mail" />
            Send an email
          </a>
        </div>
        <div className="socials">
          <h2>
            Here are my <span>socials</span>
          </h2>
          <div className="social-links">
            {socials.map((social) => (
              <SocialHoverCard key={social.name} social={social} />
            ))}
            <ResumeButton onClick={onOpenResume} />
          </div>
        </div>
      </section>
    </>
  );
}
