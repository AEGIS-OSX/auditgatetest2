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
      style={{ width: "100%" }}
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
        Build Metrics
      </p>

      {/* 4-column grid — always 4 columns, no responsive collapse */}
      <motion.dl
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1px",
          backgroundColor: "var(--agt-border)",
          borderRadius: "var(--radius-md)",
          overflow: "hidden",
          border: "1px solid var(--agt-border)",
          margin: 0,
          padding: 0,
        }}
        variants={CONTAINER_VARIANTS}
        initial="hidden"
        animate="visible"
      >
        {READOUTS.map((item) => (
          <motion.div
            key={item.label}
            variants={ITEM_VARIANTS}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-1)",
              padding: "var(--space-2)",
              backgroundColor: "var(--agt-surface)",
            }}
          >
            {/* Label */}
            <dt
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--agt-type-small-size)",
                lineHeight: "var(--agt-type-small-line)",
                color: "var(--agt-warm-gray)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                margin: 0,
              }}
            >
              {item.label}
            </dt>

            {/* Value — mono at small scale (13px / 20px) */}
            <dd
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--agt-type-small-size)",
                lineHeight: "var(--agt-type-small-line)",
                color: "var(--agt-text)",
                fontWeight: 400,
                letterSpacing: "-0.01em",
                margin: 0,
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
