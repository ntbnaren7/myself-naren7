import { Calendar, Monitor } from "lucide-react";

export function BookingLink({ href }: { href: string }) {
  const hostname = new URL(href).hostname;

  return (
    <a
      className="booking-link"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book an intro call on Calendly"
    >
      <span
        className="small-button tactile-button-primary booking-size"
        aria-hidden="true"
      >
        <Calendar size={14} />
        Book an intro call
      </span>
      <span
        className="small-button tactile-button-primary booking-destination"
        aria-hidden="true"
      >
        <Calendar size={14} />
        {hostname}
      </span>
      <span className="booking-cover" aria-hidden="true">
        <span className="booking-cover-inside">
          <Monitor size={14} />
          {hostname}
        </span>
        <span className="booking-cover-spine" />
        <span className="small-button tactile-button-primary booking-cover-outside">
          <Calendar size={14} />
          Book an intro call
        </span>
      </span>
      <span className="booking-cover-shadow" aria-hidden="true" />
    </a>
  );
}
