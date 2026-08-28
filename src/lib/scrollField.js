/**
 * Shared scroll signal for the stellar field.
 * Updated from a passive listener — no React re-renders.
 */
export const scrollField = {
  progress: 0,
  velocity: 0,
  scrolling: false,
};

export function updateScrollField() {
  const max = Math.max(
    1,
    document.documentElement.scrollHeight - window.innerHeight
  );
  const y = window.scrollY || 0;
  const progress = Math.min(1, Math.max(0, y / max));
  const velocity = progress - scrollField.progress;
  scrollField.progress = progress;
  // Soften spikes; keep a short memory of motion
  scrollField.velocity = scrollField.velocity * 0.72 + velocity * 0.28;
  scrollField.scrolling = Math.abs(scrollField.velocity) > 0.00015;
}
