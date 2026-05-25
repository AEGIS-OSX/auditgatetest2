"use client";
import { motion, useReducedMotion } from "framer-motion";

interface ControlsRowProps {
  /** When true, the Re-run button becomes active (progressive enhancement). */
  rerunEnabled?: boolean;
  /** Callback fired when Re-run is clicked (only relevant when rerunEnabled=true). */
  onRerun?: () => void;
}

/**
 * ControlsRow
 *
 * Renders two controls:
 *   1. "View status" — an anchor that scrolls to #status-panel.
 *   2. "Re-run"      — a button that is visually disabled in static builds
 *                      and becomes active when rerunEnabled=true.
 *
 * Progressive enhancement: the Re-run button is always present in the DOM
 * (for backend hooks to activate) but is aria-disabled + visually muted
 * in the default static render.
 */
export function ControlsRow({
  rerunEnabled = false,
  onRerun,
}: ControlsRowProps) {
  const shouldReduceMotion = useReducedMotion();

  const handleRerun = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!rerunEnabled) {
      e.preventDefault();
      return;
    }
    onRerun?.();
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.22, ease: "easeOut", delay: 0.1 }
      }
      role="group"
      aria-label="Pipeline controls"
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "var(--space-1)",
      }}
    >
      {/* ── View status anchor ── */}
      <a
        href="#status-panel"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          paddingInline: "var(--space-2)",
          paddingBlock: "var(--space-1)",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--agt-accent)",
          backgroundColor: "color-mix(in srgb, var(--agt-accent) 10%, transparent)",
          fontFamily: "var(--font-ui)",
          fontSize: "var(--agt-type-small-size)",
          lineHeight: "var(--agt-type-small-line)",
          fontWeight: 500,
          color: "var(--agt-accent)",
          textDecoration: "none",
          transition: "background-color 0.15s ease-out, color 0.15s ease-out",
          cursor: "pointer",
          minHeight: "44px",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
            "color-mix(in srgb, var(--agt-accent) 20%, transparent)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
            "color-mix(in srgb, var(--agt-accent) 10%, transparent)";
        }}
      >
        View status
      </a>

      {/* ── Re-run button (progressive enhancement) ── */}
      <button
        type="button"
        aria-disabled={!rerunEnabled}
        onClick={handleRerun}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          paddingInline: "var(--space-2)",
          paddingBlock: "var(--space-1)",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--agt-border)",
          backgroundColor: "transparent",
          fontFamily: "var(--font-ui)",
          fontSize: "var(--agt-type-small-size)",
          lineHeight: "var(--agt-type-small-line)",
          fontWeight: 500,
          color: rerunEnabled ? "var(--agt-text)" : "var(--agt-muted)",
          cursor: rerunEnabled ? "pointer" : "not-allowed",
          opacity: rerunEnabled ? 1 : 0.5,
          transition: "opacity 0.15s ease-out, color 0.15s ease-out",
          minHeight: "44px",
        }}
      >
        Re-run
      </button>
    </motion.div>
  );
}