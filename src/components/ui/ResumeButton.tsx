import { FileText } from "lucide-react";
import { RadialGlowButton } from "./radial-glow-button";

export function ResumeButton({ onClick }: { onClick: () => void }) {
  return (
    <RadialGlowButton
      className="small-button resume-button"
      onClick={onClick}
      aria-haspopup="dialog"
      aria-controls="resume-preview"
    >
      <FileText size={14} aria-hidden="true" />
      Resume
    </RadialGlowButton>
  );
}
