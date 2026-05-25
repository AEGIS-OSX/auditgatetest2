"use client";
import { motion } from "framer-motion";

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
  const handleRerun = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!rerunEnabled) {
      e.preventDefault();
      return;
    }
    onRerun?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: "easeOut", delay: 0.1 }}
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
        {/* Arrow icon */}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M6 2L6 10M6 10L2.5 6.5M6 10L9.5 6.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        View status
      </a>

      {/* ── Re-run button (progressive enhancement) ── */}
      <button
        type="button"
        onClick={handleRerun}
        disabled={!rerunEnabled}
        aria-disabled={!rerunEnabled}
        aria-label={rerunEnabled ? "Re-run pipeline" : "Re-run pipeline (unavailable in static build)"}
        data-progressive-enhancement="rerun"
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
          opacity: rerunEnabled ? 1 : 0.45,
          transition: "opacity 0.15s ease-out, color 0.15s ease-out, background-color 0.15s ease-out",
        }}
        onMouseEnter={(e) => {
          if (!rerunEnabled) return;
          (e.currentTarget as HTMLButtonElement).style.backgroundColor =
            "color-mix(in srgb, var(--agt-text) 8%, transparent)";
        }}
        onMouseLeave={(e) => {
          if (!rerunEnabled) return;
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
        }}
      >
        {/* Refresh icon */}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M10.5 2.5A5 5 0 1 0 11 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M10.5 2.5V5.5H7.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Re-run
        {!rerunEnabled && (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              lineHeight: "1",
              color: "var(--agt-muted)",
              letterSpacing: "0.04em",
            }}
            aria-hidden="true"
          >
            static
          </span>
        )}
      </button>
    </motion.div>
  );
}
