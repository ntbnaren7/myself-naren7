import { useEffect, useRef } from "react";

export function BannerAtmosphere({ light }: { light: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lightRef = useRef(light);

  useEffect(() => {
    lightRef.current = light;
  }, [light]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let frame = 0;
    let previousTime = 0;
    let elapsed = 0;
    let nightTime = 0;
    let visible = true;
    const random = (min: number, max: number) =>
      min + Math.random() * (max - min);
    const petals = Array.from({ length: 20 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: random(8, 16),
      vy: random(6, 12),
      size: random(1.6, 3.8),
      phase: random(0, Math.PI * 2),
      flutter: random(1.2, 2.4),
      leaf: Math.random() > 0.8,
    }));
    const star = {
      x: random(0.06, 0.62),
      y: random(0.03, 0.16),
      size: random(0.6, 1),
      start: random(8, 16),
      duration: random(1.4, 2.2),
    };

    function resize() {
      const bounds = canvas!.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const density = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(width * density);
      canvas!.height = Math.round(height * density);
      context!.setTransform(density, 0, 0, density, 0, 0);
    }

    function draw(now: number) {
      frame = 0;
      // Cap the step so resuming a paused tab cannot fling particles forward.
      const dt = previousTime
        ? Math.min((now - previousTime) / 1000, 1 / 30)
        : 0;
      previousTime = now;
      elapsed += dt;
      const day = lightRef.current;
      context!.clearRect(0, 0, width, height);

      if (!day) nightTime += dt;
      if (nightTime > star.start + star.duration) {
        star.x = random(0.06, 0.62);
        star.y = random(0.03, 0.16);
        star.size = random(0.6, 1);
        star.start = nightTime + random(12, 28);
        star.duration = random(1.4, 2.2);
      }
      // One brief glint at a time, with long random gaps and no daytime glow.
      if (!day && nightTime >= star.start) {
        const progress = (nightTime - star.start) / star.duration;
        const pulse = Math.sin(progress * Math.PI) ** 2;
        const x = star.x * width;
        const y = star.y * height;
        const radius = star.size * (1 + pulse * 1.8);
        context!.save();
        context!.globalAlpha = pulse * 0.65;
        const halo = context!.createRadialGradient(x, y, 0, x, y, radius * 3);
        halo.addColorStop(0, "#e4f5ff");
        halo.addColorStop(1, "#b9e5ff00");
        context!.fillStyle = halo;
        context!.fillRect(
          x - radius * 3,
          y - radius * 3,
          radius * 6,
          radius * 6,
        );
        context!.fillStyle = "#effaff";
        context!.beginPath();
        context!.moveTo(x, y - radius);
        context!.lineTo(x + radius * 0.2, y - radius * 0.2);
        context!.lineTo(x + radius, y);
        context!.lineTo(x + radius * 0.2, y + radius * 0.2);
        context!.lineTo(x, y + radius);
        context!.lineTo(x - radius * 0.2, y + radius * 0.2);
        context!.lineTo(x - radius, y);
        context!.lineTo(x - radius * 0.2, y - radius * 0.2);
        context!.closePath();
        context!.fill();
        context!.restore();
      }

      const wind =
        14 + Math.sin(elapsed * 0.43) * 9 + Math.sin(elapsed * 0.91) * 4;
      for (const petal of petals) {
        const depth = petal.size / 3;
        const flutter = Math.sin(elapsed * petal.flutter + petal.phase);
        // Gravity, drag toward a shared breeze, and small local eddies.
        petal.vx +=
          (wind * depth + flutter * 5 - petal.vx) * (1 - Math.exp(-1.6 * dt));
        petal.vy += (8 * depth - petal.vy * 0.65 + flutter * 3) * dt;
        petal.x += (petal.vx * dt) / Math.max(width, 1);
        petal.y += (petal.vy * dt) / Math.max(height, 1);
        if (petal.y * height > height + 16) {
          petal.y = -16 / Math.max(height, 1);
          petal.x = Math.random();
        }
        if (petal.x * width > width + 16) petal.x = -16 / Math.max(width, 1);

        const turn = elapsed * petal.flutter * 0.7 + petal.phase;
        context!.save();
        context!.translate(petal.x * width, petal.y * height);
        context!.rotate(turn * 0.5 + flutter * 0.45);
        // Foreshortening and changing illumination as each petal tumbles.
        context!.scale(0.25 + Math.abs(Math.cos(turn)) * 0.75, 1);
        context!.globalAlpha = 0.4 + Math.abs(Math.cos(turn)) * 0.4;
        const surface = context!.createLinearGradient(
          -petal.size,
          0,
          petal.size,
          0,
        );
        surface.addColorStop(
          0,
          day ? (petal.leaf ? "#a3b96e" : "#e3d8b7") : "#93b2c5",
        );
        surface.addColorStop(
          0.5,
          day ? (petal.leaf ? "#e0e9b4" : "#fffbea") : "#e8f3f9",
        );
        surface.addColorStop(
          1,
          day ? (petal.leaf ? "#bacd8b" : "#f4e9cb") : "#b9d5e2",
        );
        context!.fillStyle = surface;
        context!.beginPath();
        context!.moveTo(0, -petal.size);
        context!.bezierCurveTo(
          petal.size * 1.5,
          -petal.size * 0.7,
          petal.size,
          petal.size,
          0,
          petal.size * 1.2,
        );
        context!.bezierCurveTo(
          -petal.size * 0.8,
          petal.size * 0.5,
          -petal.size * 0.6,
          -petal.size * 0.6,
          0,
          -petal.size,
        );
        context!.fill();
        context!.restore();
      }
      frame = requestAnimationFrame(draw);
    }

    function syncPlayback() {
      cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
      context!.clearRect(0, 0, width, height);
      if (!motion.matches && visible && !document.hidden) {
        frame = requestAnimationFrame(draw);
      }
    }

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    });
    resize();
    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);
    motion.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    syncPlayback();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      motion.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="banner-atmosphere" aria-hidden="true" />
  );
}
