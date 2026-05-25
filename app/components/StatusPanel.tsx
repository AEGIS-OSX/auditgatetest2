"use client";
import { motion } from "framer-motion";

type StatusValue = "ok" | "fail" | "unknown";

interface StatusPanelProps {
  status?: StatusValue;
  statusLabel?: string;
  statusCopy?: string;
}

/**
 * STATUS_CONFIG — all colors reference CSS custom properties.
 * No hardcoded hex literals or Tailwind color classes.
 */
const STATUS_CONFIG: Record<
  StatusValue,
  {
    label: string;
    dotVar: string;
    badgeBgVar: string;
    badgeBorderVar: string;
    badgeTextVar: string;
  }
> = {
  ok: {
    label: "OK",
    dotVar: "var(--agt-accent)",
    badgeBgVar: "color-mix(in srgb, var(--agt-accent) 12%, transparent)",
    badgeBorderVar: "color-mix(in srgb, var(--agt-accent) 30%, transparent)",
    badgeTextVar: "var(--agt-accent)",
  },
  fail: {
    label: "FAIL",
    dotVar: "var(--agt-error)",
    badgeBgVar: "color-mix(in srgb, var(--agt-error) 12%, transparent)",
    badgeBorderVar: "color-mix(in srgb, var(--agt-error) 30%, transparent)",
    badgeTextVar: "var(--agt-error)",
  },
  unknown: {
    label: "UNKNOWN",
    dotVar: "var(--agt-muted)",
    badgeBgVar: "color-mix(in srgb, var(--agt-muted) 12%, transparent)",
    badgeBorderVar: "color-mix(in srgb, var(--agt-muted) 30%, transparent)",
    badgeTextVar: "var(--agt-muted)",
  },
};

export function StatusPanel({
  status = "ok",
  statusLabel = "Status: OK",
  statusCopy = "Pipeline gate: passing.",
}: StatusPanelProps) {
  const config = STATUS_CONFIG[status];

  return (
    <section
      id="status-panel"
      aria-label="Pipeline status"
      style={{
        width: "100%",
        border: "1px solid var(--agt-border)",
        backgroundColor: "var(--agt-surface)",
        borderRadius: "var(--radius-md)",
        padding: "var(--space-3)",
      }}
    >
      {/* Section label */}
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--agt-type-small-size)",
          lineHeight: "var(--agt-type-small-line)",
          color: "var(--agt-warm-gray)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: "var(--space-2)",
        }}
        aria-hidden="true"
      >
        Pipeline Status
      </p>

      {/* Badge + copy row — aria-live region */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--space-1)" }}
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--space-1)",
            paddingInline: "var(--space-1)",
            paddingBlock: "4px",
            borderRadius: "var(--radius-sm)",
            border: "1px solid",
            borderColor: config.badgeBorderVar,
            backgroundColor: config.badgeBgVar,
            fontFamily: "var(--font-mono)",
            fontSize: "var(--agt-type-small-size)",
            lineHeight: "var(--agt-type-small-line)",
            fontWeight: 500,
            letterSpacing: "0.08em",
            color: config.badgeTextVar,
          }}
        >
          {/* Pulse dot */}
          <span
            style={{ position: "relative", display: "flex", width: "8px", height: "8px", flexShrink: 0 }}
            aria-hidden="true"
          >
            {status === "ok" && (
              <span
                className="animate-ping"
                style={{
                  position: "absolute",
                  display: "inline-flex",
                  width: "100%",
                  height: "100%",
                  borderRadius: "9999px",
                  opacity: 0.6,
                  backgroundColor: config.dotVar,
                }}
              />
            )}
            <span
              style={{
                position: "relative",
                display: "inline-flex",
                borderRadius: "9999px",
                width: "8px",
                height: "8px",
                backgroundColor: config.dotVar,
              }}
            />
          </span>
          {config.label}
        </motion.div>

        {/* Divider */}
        <span
          style={{
            display: "block",
            width: "1px",
            height: "16px",
            backgroundColor: "var(--agt-border)",
          }}
          aria-hidden="true"
        />

        {/* Status label */}
        <motion.p
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.05 }}
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "var(--agt-type-body-size)",
            lineHeight: "var(--agt-type-body-line)",
            fontWeight: 500,
            color: "var(--agt-text)",
            margin: 0,
          }}
        >
          {statusLabel}
        </motion.p>
      </div>

      {/* One-line status copy */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25, ease: "easeOut", delay: 0.1 }}
        style={{
          marginTop: "var(--space-1)",
          fontFamily: "var(--font-ui)",
          fontSize: "var(--agt-type-small-size)",
          lineHeight: "var(--agt-type-small-line)",
          color: "var(--agt-warm-gray)",
        }}
      >
        {statusCopy}
      </motion.p>

      {/* Teal accent rule */}
      <div
        style={{
          marginTop: "var(--space-2)",
          height: "1px",
          width: "100%",
          backgroundColor: "var(--agt-border)",
        }}
        aria-hidden="true"
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.15 }}
          style={{
            transformOrigin: "left",
            height: "1px",
            width: "100%",
            backgroundColor: "var(--agt-accent)",
          }}
        />
      </div>
    </section>
  );
}
