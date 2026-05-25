"use client";
import { motion, useReducedMotion } from "framer-motion";

interface ReadoutItem {
  label: string;
  value: string;
  ariaLabel: string;
  dataAttr: string;
}

const READOUTS: ReadoutItem[] = [
  {
    label: "Last run",
    value: "2026-05-25 18:02 UTC",
    ariaLabel: "Last run: 2026-05-25 18:02 UTC",
    dataAttr: "data-last-run",
  },
  {
    label: "Build duration",
    value: "1.24 s",
    ariaLabel: "Build duration: 1.24 seconds",
    dataAttr: "data-build-duration",
  },
  {
    label: "Commit",
    value: "a1b2c3d",
    ariaLabel: "Commit SHA: a1b2c3d",
    dataAttr: "data-commit",
  },
  {
    label: "Artifacts",
    value: "4",
    ariaLabel: "Artifact count: 4",
    dataAttr: "data-artifacts",
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

const NO_VARIANTS = {
  hidden: {},
  visible: {},
};

export function NumericReadouts() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = shouldReduceMotion ? NO_VARIANTS : CONTAINER_VARIANTS;
  const itemVariants = shouldReduceMotion ? NO_VARIANTS : ITEM_VARIANTS;

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

      {/* Responsive grid — collapses to 2 cols on sm, 1 col on xs */}
      <motion.dl
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "1px",
          backgroundColor: "var(--agt-border)",
          borderRadius: "var(--radius-md)",
          overflow: "hidden",
          border: "1px solid var(--agt-border)",
          margin: 0,
          padding: 0,
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {READOUTS.map((item) => (
          <motion.div
            key={item.label}
            variants={itemVariants}
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
                color: "var(--agt-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {item.label}
            </dt>

            {/* Value — data-* attribute for machine parsing and copy/paste */}
            <dd
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--agt-type-body-size)",
                lineHeight: "var(--agt-type-body-line)",
                color: "var(--agt-text)",
                fontWeight: 400,
                margin: 0,
              }}
              aria-label={item.ariaLabel}
              {...{ [item.dataAttr]: item.value }}
            >
              {item.value}
            </dd>
          </motion.div>
        ))}
      </motion.dl>
    </section>
  );
}