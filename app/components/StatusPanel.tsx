"use client";
import { motion } from "framer-motion";

type StatusValue = "ok" | "fail" | "unknown";

interface StatusPanelProps {
  status?: StatusValue;
  statusLabel?: string;
  statusCopy?: string;
}

const STATUS_CONFIG: Record<StatusValue, { label: string; dotClass: string; badgeClass: string; badgeTextClass: string }> = {
  ok: {
    label: "OK",
    dotClass: "bg-[var(--agt-success)]",
    badgeClass: "bg-[var(--agt-success)]/10 border-[var(--agt-success)]/30",
    badgeTextClass: "text-[var(--agt-success)]",
  },
  fail: {
    label: "FAIL",
    dotClass: "bg-red-500",
    badgeClass: "bg-red-500/10 border-red-500/30",
    badgeTextClass: "text-red-400",
  },
  unknown: {
    label: "UNKNOWN",
    dotClass: "bg-[var(--agt-muted)]",
    badgeClass: "bg-[var(--agt-muted)]/10 border-[var(--agt-muted)]/30",
    badgeTextClass: "text-[var(--agt-muted)]",
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
      className="w-full border border-[var(--agt-border)] bg-[var(--agt-surface)] rounded-[var(--radius-md)] p-6"
    >
      {/* Section label */}
      <p
        className="font-[family-name:var(--font-mono)] text-[length:var(--agt-type-small-size)] leading-[var(--agt-type-small-line)] text-[var(--agt-warm-gray)] uppercase tracking-widest mb-4"
        aria-hidden="true"
      >
        Pipeline Status
      </p>

      {/* Badge + copy row */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="flex flex-col sm:flex-row sm:items-center gap-3"
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-sm)] border font-[family-name:var(--font-mono)] text-[length:var(--agt-type-small-size)] leading-[var(--agt-type-small-line)] font-medium tracking-wider ${config.badgeClass} ${config.badgeTextClass}`}
        >
          {/* Pulse dot */}
          <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
            {status === "ok" && (
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${config.dotClass}`}
              />
            )}
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${config.dotClass}`}
            />
          </span>
          {config.label}
        </motion.div>

        {/* Divider (desktop only) */}
        <span
          className="hidden sm:block w-px h-4 bg-[var(--agt-border)]"
          aria-hidden="true"
        />

        {/* Status label */}
        <motion.p
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.05 }}
          className="font-[family-name:var(--font-ui)] text-[length:var(--agt-type-body-size)] leading-[var(--agt-type-body-line)] font-medium text-[var(--agt-text)]"
        >
          {statusLabel}
        </motion.p>
      </div>

      {/* One-line status copy */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25, ease: "easeOut", delay: 0.1 }}
        className="mt-3 font-[family-name:var(--font-ui)] text-[length:var(--agt-type-small-size)] leading-[var(--agt-type-small-line)] text-[var(--agt-warm-gray)]"
      >
        {statusCopy}
      </motion.p>

      {/* Teal accent rule */}
      <div
        className="mt-5 h-px w-full bg-[var(--agt-border)]"
        aria-hidden="true"
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.15 }}
          style={{ transformOrigin: "left" }}
          className="h-px w-full bg-[var(--agt-accent)]"
        />
      </div>
    </section>
  );
}
