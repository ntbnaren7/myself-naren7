import { useEffect, useState } from "react";
import { sections } from "../data/portfolio";

export function useActiveSection() {
  const [active, setActive] = useState("");
  useEffect(() => {
    let scheduled = false;
    const update = () => {
      const threshold = window.innerHeight * 0.4;
      let current = "";
      for (const { id } of sections) {
        if (
          (document.getElementById(id)?.getBoundingClientRect().top ??
            Infinity) <= threshold
        )
          current = id;
      }
      setActive(current);
      scheduled = false;
    };
    const onScroll = () => {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return active;
}
