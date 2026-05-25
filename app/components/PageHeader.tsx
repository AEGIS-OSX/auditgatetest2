"use client";
import { motion } from "framer-motion";

// prefers-reduced-motion evaluated once at module load (client only)
const REDUCE_MOTION =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

const fadeUp = {
  hidden: { opacity: 0, y: REDUCE_MOTION ? 0 : 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: REDUCE_MOTION ? 0 : 0.45, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

const meta = {
  build: "2026-05-25",
  commit: "a1b2c3d",
  timestamp: "2026-05-25T18:02:00Z",
};

export function PageHeader() {
  return (
    <>
      {/* ── Header ─────────────────────────────────────────────── */}
      <header
        style={{
          width: "100%",
          borderBottom: "1px solid var(--agt-border)",
          backgroundColor: "var(--agt-bg)",
        }}
        role="banner"
      >
        <div
          style={{
            maxWidth: "var(--agt-container-max)",
            margin: "0 auto",
            padding: "var(--agt-space-4xl) var(--agt-space-3xl)",
          }}
        >
          {/* Asymmetric two-column: 60% H1 left, 40% build-meta right */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              gap: "0",
            }}
          >
            {/* Left column — 60% */}
            <div
              style={{
                flex: "0 0 60%",
                paddingRight: "var(--agt-space-3xl)",
                boxSizing: "border-box",
              }}
            >
              {/* Eyebrow */}
              <motion.p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--agt-type-small-size)",
                  lineHeight: "var(--agt-type-small-line)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--agt-accent)",
                  marginBottom: "var(--agt-space-md)",
                }}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0}
              >
                AEGIS Pipeline
              </motion.p>

              {/* H1 — exact copy, font-display, 56px/64px, weight 600 */}
              <motion.h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "var(--agt-type-h1-size)",
                  lineHeight: "var(--agt-type-h1-line)",
                  color: "var(--agt-text)",
                  margin: 0,
                }}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.08}
              >
                AEGIS Gate Test
              </motion.h1>
            </div>

            {/* Right column — 40% build-meta */}
            <div
              style={{
                flex: "0 0 40%",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "var(--agt-space-xs)",
              }}
            >
              <motion.dl
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--agt-space-xs)",
                  margin: 0,
                  padding: 0,
                  textAlign: "right",
                }}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.16}
              >
                {[
                  { label: "Build", value: meta.build },
                  { label: "Commit", value: meta.commit },
                  { label: "Timestamp", value: meta.timestamp },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: "flex", gap: "var(--agt-space-xs)", justifyContent: "flex-end" }}>
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
                      {label}
                    </dt>
                    <dd
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--agt-type-small-size)",
                        lineHeight: "var(--agt-type-small-line)",
                        color: "var(--agt-warm-gray)",
                        margin: 0,
                      }}
                    >
                      {value}
                    </dd>
                  </div>
                ))}
              </motion.dl>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
