import { useEffect, useRef, useState } from "react";
import { Download, FileText, X } from "lucide-react";
import { resume } from "../data/resume";
import { LiquidMetalButton } from "./ui/liquid-metal";

export function ResumeDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const downloadLink = useRef<HTMLAnchorElement>(null);
  const [loaded, setLoaded] = useState(false);
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (open && !dialog.current?.open) dialog.current?.showModal();
    if (!open) dialog.current?.close();
  }, [open]);

  return (
    <dialog
      ref={dialog}
      id="resume-preview"
      className="resume-dialog"
      aria-labelledby="resume-preview-title"
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <header className="resume-toolbar">
        <h2 id="resume-preview-title">
          <FileText size={16} aria-hidden="true" />
          Resume
        </h2>
        <div className="resume-toolbar-actions">
          <a
            ref={downloadLink}
            href={resume.pdf}
            download={resume.downloadName}
            hidden
            aria-hidden="true"
          />
          <LiquidMetalButton
            type="button"
            size="sm"
            className="resume-download"
            icon={<Download size={17} strokeWidth={2.25} aria-hidden="true" />}
            metalConfig={{ speed: open && !reducedMotion ? 0.4 : 0 }}
            onClick={() => downloadLink.current?.click()}
          >
            Download PDF
          </LiquidMetalButton>
          <button
            type="button"
            className="resume-close"
            onClick={onClose}
            aria-label="Close resume preview"
            autoFocus
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
      </header>
      <div
        className="resume-image-scroll"
        tabIndex={0}
        aria-label="Resume image"
        aria-busy={!loaded}
      >
        {!loaded && (
          <p className="resume-loading" role="status">
            Loading resume…
          </p>
        )}
        <img
          src={resume.image}
          alt="Naren’s resume"
          width={2481}
          height={3508}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
        />
      </div>
    </dialog>
  );
}
