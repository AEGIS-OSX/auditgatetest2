"use client";
import { motion } from "framer-motion";

interface ReadoutItem {
  label: string;
  value: string;
  ariaLabel: string;
}

const READOUTS: ReadoutItem[] = [
  {
    label: "Last run",
    value: "2026-05-25 18:02 UTC",
    ariaLabel: "Last run: 2026-05-25 18:02 UTC",
  },
  {
    label: "Build duration",
    value: "1.24 s",
    ariaLabel: "Build duration: 1.24 seconds",
  },
  {
    label: "Commit",
    value: "a1b2c3d",
    ariaLabel: "Commit SHA: a1b2c3d",
  },
  {
    label: "Artifacts",
    value: "4",
    ariaLabel: "Artifact count: 4",
  },
];

const CONTAINER_VARIANTS = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: "easeOut" },
  },
};

export function NumericReadouts() {
  return (
    <section
      id="numeric-readouts"
      aria-label="Build metrics"
      className="w-full"
    >
      {/* Section label */}
      <p
        className="font-[family-name:var(--font-mono)] uppercase tracking-widest mb-[var(--space-2)]"
        style={{
          fontSize: "var(--agt-type-small-size)",
          lineHeight: "var(--agt-type-small-line)",
          color: "var(--agt-warm-gray)",
          letterSpacing: "0.1em",
        }}
        aria-hidden="true"
      >
        Build Metrics
      </p>

      {/* 4-column grid */}
      <motion.dl
        className="grid grid-cols-2 sm:grid-cols-4 gap-px"
        style={{
          backgroundColor: "var(--agt-border)",
          borderRadius: "var(--radius-md)",
          overflow: "hidden",
          border: "1px solid var(--agt-border)",
        }}
        variants={CONTAINER_VARIANTS}
        initial="hidden"
        animate="visible"
      >
        {READOUTS.map((item) => (
          <motion.div
            key={item.label}
            variants={ITEM_VARIANTS}
            className="flex flex-col gap-[var(--space-1)] p-[var(--space-2)]"
            style={{
              backgroundColor: "var(--agt-surface)",
            }}
          >
            {/* Label */}
            <dt
              className="font-[family-name:var(--font-mono)] uppercase tracking-widest"
              style={{
                fontSize: "var(--agt-type-small-size)",
                lineHeight: "var(--agt-type-small-line)",
                color: "var(--agt-warm-gray)",
                letterSpacing: "0.08em",
              }}
            >
              {item.label}
            </dt>

            {/* Value */}
            <dd
              className="font-[family-name:var(--font-mono)] m-0"
              style={{
                fontSize: "var(--agt-type-h3-size)",
                lineHeight: "var(--agt-type-h3-line)",
                color: "var(--agt-text)",
                fontWeight: 500,
                letterSpacing: "-0.01em",
              }}
              aria-label={item.ariaLabel}
            >
              {item.value}
            </dd>

            {/* Teal accent underline */}
            <div
              aria-hidden="true"
              style={{
                height: "1px",
                width: "var(--space-4)",
                backgroundColor: "var(--agt-accent)",
                marginTop: "var(--space-1)",
              }}
            />
          </motion.div>
        ))}
      </motion.dl>
    </section>
  );
}
