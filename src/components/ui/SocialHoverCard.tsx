import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { socialOwner, type SocialProfile } from "../../data/socials";
import { Icon } from "./Icon";
import { SocialIcon } from "./SocialIcon";
import "../../styles/social-hover-card.css";

export function SocialHoverCard({ social }: { social: SocialProfile }) {
  const [open, setOpen] = useState(false);
  const [side, setSide] = useState<"top" | "bottom">("bottom");
  const [horizontalOffset, setHorizontalOffset] = useState(0);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const cardId = useId();

  const scheduleOpen = (nextOpen: boolean, delay: number) => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpen(nextOpen), delay);
  };

  useEffect(() => () => clearTimeout(hoverTimer.current), []);

  useLayoutEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const card = cardRef.current;
    if (!trigger || !card) return;

    const updatePlacement = () => {
      const bounds = trigger.getBoundingClientRect();
      const below = window.innerHeight - bounds.bottom - 16;
      const above = bounds.top - 16;
      const needed = card.offsetHeight + 8;
      setSide(below < needed && above > below ? "top" : "bottom");
      const centeredLeft =
        bounds.left + bounds.width / 2 - card.offsetWidth / 2;
      const clampedLeft = Math.max(
        16,
        Math.min(centeredLeft, window.innerWidth - card.offsetWidth - 16),
      );
      setHorizontalOffset(clampedLeft - centeredLeft);
    };

    updatePlacement();
    const observer = new ResizeObserver(updatePlacement);
    observer.observe(card);
    window.addEventListener("resize", updatePlacement);
    window.addEventListener("scroll", updatePlacement, true);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updatePlacement);
      window.removeEventListener("scroll", updatePlacement, true);
    };
  }, [open]);

  const discord = social.variant === "discord";
  const avatar = (
    <img
      src={social.avatar ?? socialOwner.avatar}
      alt=""
      width={48}
      height={48}
      loading="lazy"
    />
  );

  return (
    <div
      className="social-link-group"
      data-open={open}
      data-variant={social.variant}
      onPointerEnter={(event) => {
        if (event.pointerType !== "touch") scheduleOpen(true, 80);
      }}
      onPointerLeave={() => scheduleOpen(false, 120)}
      onFocus={() => scheduleOpen(true, 0)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          scheduleOpen(false, 120);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          clearTimeout(hoverTimer.current);
          setOpen(false);
          event.stopPropagation();
        }
      }}
    >
      <a
        ref={triggerRef}
        className="small-button tactile-button"
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-describedby={open ? cardId : undefined}
      >
        <SocialIcon name={social.variant} />
        {social.name}
      </a>
      <div
        className="social-card-positioner"
        data-side={side}
        style={{ marginLeft: horizontalOffset }}
        aria-hidden={!open}
      >
        <div
          ref={cardRef}
          id={cardId}
          role="tooltip"
          className={`social-hover-card social-card-${social.variant}`}
        >
          {(social.variant === "twitter" || social.variant === "linkedin") && (
            <div className="social-card-banner">
              {social.banner ? (
                <img src={social.banner} alt="" loading="lazy" />
              ) : (
                <>
                  <img
                    className="social-card-banner-day"
                    src="/images/hero/naren-banner-day.jpg"
                    alt=""
                    loading="lazy"
                  />
                  <img
                    className="social-card-banner-night"
                    src="/images/hero/naren-banner.jpg"
                    alt=""
                    loading="lazy"
                  />
                </>
              )}
            </div>
          )}
          <div className="social-card-body">
            <div className="social-card-identity">
              {discord ? (
                <span className="discord-avatar">
                  {avatar}
                  {social.manualStatus && (
                    <i className="discord-avatar-status" aria-hidden="true" />
                  )}
                </span>
              ) : (
                avatar
              )}
              <div>
                <strong>{social.displayName ?? socialOwner.name}</strong>
                <span>{social.handle}</span>
                {social.pronouns && !discord && <span>{social.pronouns}</span>}
              </div>
            </div>
            {social.bio && <p className="social-card-bio">{social.bio}</p>}
            {discord && social.manualStatus && (
              <div
                className="discord-status-row"
                title="Manually set profile status; not live Discord presence"
                aria-label={`${social.manualStatus} (manually set profile status)`}
              >
                <span className="discord-status-label">
                  <i aria-hidden="true" />
                  {social.manualStatus}
                </span>
                <span className="discord-status-caption">Active status</span>
              </div>
            )}
            {social.variant !== "discord" && (
              <p className="social-card-location">
                <Icon name="map-pin" size={12} />
                {social.location ?? socialOwner.location}
              </p>
            )}
            {social.stats.length > 0 && (
              <dl className="social-card-stats">
                {social.stats.map((stat) => (
                  <div key={stat.label}>
                    <dt>{stat.label}</dt>
                    <dd>{stat.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
