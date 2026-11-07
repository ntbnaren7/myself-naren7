import { useEffect, useRef, useState } from "react";
import { profile, sections, socials } from "../data/portfolio";
import { Icon } from "./ui/Icon";

export function CommandMenu({
  open,
  onClose,
  onToggleTheme,
  onOpenResume,
}: {
  open: boolean;
  onClose: () => void;
  onToggleTheme: () => void;
  onOpenResume: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const commands = [
    ...sections.map((section) => ({
      label: `Go to ${section.label}`,
      href: `#${section.id}`,
      icon: "arrow-right",
      action: undefined as (() => void) | undefined,
    })),
    ...socials.map((social) => ({
      label: `Visit ${social.name}`,
      href: social.url,
      icon: social.icon,
      action: undefined,
    })),
    {
      label: "Book an intro call",
      href: profile.bookingUrl,
      icon: "calendar",
      action: undefined,
    },
    {
      label: "Send an email",
      href: profile.contactUrl,
      icon: "mail",
      action: undefined,
    },
    {
      label: "View resume",
      href: "",
      icon: "file-text",
      action: onOpenResume,
    },
    { label: "Toggle theme", href: "", icon: "sun", action: onToggleTheme },
  ].filter((command) =>
    command.label.toLowerCase().includes(query.toLowerCase()),
  );
  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
      setQuery("");
      setSelected(0);
    } else dialog.current?.close();
  }, [open]);
  useEffect(() => {
    if (open)
      document
        .getElementById(`command-${selected}`)
        ?.scrollIntoView({ block: "nearest" });
  }, [open, selected]);
  const run = (index: number) => {
    const command = commands[index];
    if (!command) return;
    if (command.action) command.action();
    else if (command.href.startsWith("#")) {
      document
        .querySelector(command.href)
        ?.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", command.href);
    } else if (command.href.startsWith("mailto:")) {
      window.location.href = command.href;
    } else window.open(command.href, "_blank", "noopener,noreferrer");
    onClose();
  };
  return (
    <dialog
      ref={dialog}
      className="command-menu"
      onClose={onClose}
      aria-label="Command menu"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          event.preventDefault();
          setSelected((index) =>
            commands.length
              ? (index +
                  (event.key === "ArrowDown" ? 1 : commands.length - 1)) %
                commands.length
              : 0,
          );
        }
        if (event.key === "Enter") {
          event.preventDefault();
          run(selected);
        }
      }}
    >
      <div className="command-search">
        <Icon name="search" size={18} />
        <input
          aria-label="Search commands"
          autoFocus
          placeholder="Search for a command to run..."
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setSelected(0);
          }}
          role="combobox"
          aria-expanded="true"
          aria-controls="command-results"
          aria-activedescendant={
            commands.length ? `command-${selected}` : undefined
          }
        />
        <button onClick={onClose} aria-label="Close command menu">
          esc
        </button>
      </div>
      <div
        className="command-results"
        role="listbox"
        id="command-results"
        aria-label="Commands"
      >
        {commands.map((command, i) => (
          <button
            key={command.label}
            id={`command-${i}`}
            role="option"
            aria-selected={selected === i}
            className={selected === i ? "selected" : ""}
            onMouseMove={() => setSelected(i)}
            onClick={() => run(i)}
          >
            <Icon name={command.icon} />
            <span>{command.label}</span>
            <span className="command-return">↵</span>
          </button>
        ))}
        {!commands.length && <p className="empty-state">No commands found.</p>}
      </div>
      <div className="command-hint">
        ↑ ↓ to navigate <span>↵ to select</span>
      </div>
    </dialog>
  );
}
