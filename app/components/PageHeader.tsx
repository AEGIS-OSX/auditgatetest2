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
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "64px 48px",
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
                paddingRight: "48px",
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
                  marginBottom: "16px",
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
                  fontSize: "56px",
                  lineHeight: "64px",
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

              {/* Visually-hidden accessibility description — exact copy */}
              <p
                style={{
                  position: "absolute",
                  width: "1px",
                  height: "1px",
                  padding: 0,
                  margin: "-1px",
                  overflow: "hidden",
                  clip: "rect(0,0,0,0)",
                  whiteSpace: "nowrap",
                  border: 0,
                }}
              >
                Pipeline calibration — single-route static render.
              </p>
            </div>

            {/* Right column — 40% */}
            <motion.div
              style={{
                flex: "0 0 40%",
                borderLeft: "1px solid var(--agt-border)",
                paddingLeft: "40px",
                boxSizing: "border-box",
              }}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.18}
            >
              {/* #build-meta — data attributes for machine consumption */}
              <div
                id="build-meta"
                data-build={meta.build}
                data-commit={meta.commit}
                data-timestamp={meta.timestamp}
                style={{ display: "flex", flexDirection: "column", gap: "16px" }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--agt-type-small-size)",
                    lineHeight: "var(--agt-type-small-line)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--agt-muted)",
                    margin: 0,
                  }}
                >
                  Build metadata
                </p>

                <dl
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    columnGap: "24px",
                    rowGap: "16px",
                    margin: 0,
                  }}
                >
                  <div>
                    <dt
                      style={{
                        fontFamily: "var(--font-ui)",
                        fontSize: "var(--agt-type-small-size)",
                        lineHeight: "var(--agt-type-small-line)",
                        color: "var(--agt-warm-gray)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      Build
                    </dt>
                    <dd
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--agt-type-small-size)",
                        lineHeight: "var(--agt-type-small-line)",
                        color: "var(--agt-text)",
                        marginTop: "4px",
                        marginLeft: 0,
                      }}
                    >
                      {meta.build}
                    </dd>
                  </div>

                  <div>
                    <dt
                      style={{
                        fontFamily: "var(--font-ui)",
                        fontSize: "var(--agt-type-small-size)",
                        lineHeight: "var(--agt-type-small-line)",
                        color: "var(--agt-warm-gray)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      Commit
                    </dt>
                    <dd
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--agt-type-small-size)",
                        lineHeight: "var(--agt-type-small-line)",
                        color: "var(--agt-accent)",
                        marginTop: "4px",
                        marginLeft: 0,
                      }}
                    >
                      {meta.commit}
                    </dd>
                  </div>

                  <div>
                    <dt
                      style={{
                        fontFamily: "var(--font-ui)",
                        fontSize: "var(--agt-type-small-size)",
                        lineHeight: "var(--agt-type-small-line)",
                        color: "var(--agt-warm-gray)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      Last run
                    </dt>
                    <dd
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--agt-type-small-size)",
                        lineHeight: "var(--agt-type-small-line)",
                        color: "var(--agt-text)",
                        marginTop: "4px",
                        marginLeft: 0,
                      }}
                    >
                      2026-05-25 18:02 UTC
                    </dd>
                  </div>

                  <div>
                    <dt
                      style={{
                        fontFamily: "var(--font-ui)",
                        fontSize: "var(--agt-type-small-size)",
                        lineHeight: "var(--agt-type-small-line)",
                        color: "var(--agt-warm-gray)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      Status
                    </dt>
                    <dd
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginTop: "4px",
                        marginLeft: 0,
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          backgroundColor: "var(--agt-success)",
                          flexShrink: 0,
                        }}
                        aria-hidden="true"
                      />
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "var(--agt-type-small-size)",
                          lineHeight: "var(--agt-type-small-line)",
                          color: "var(--agt-success)",
                        }}
                      >
                        OK
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* ── Status panel ────────────────────────────────────────── */}
      <section
        aria-label="Pipeline status"
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "40px 48px 0",
        }}
      >
        <div
          style={{
            backgroundColor: "var(--agt-surface)",
            border: "1px solid var(--agt-border)",
            borderRadius: "var(--radius-md)",
            padding: "24px 32px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--agt-type-small-size)",
              lineHeight: "var(--agt-type-small-line)",
              color: "var(--agt-success)",
              margin: 0,
            }}
          >
            Status: OK
          </p>
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "var(--agt-type-body-size)",
              lineHeight: "var(--agt-type-body-line)",
              color: "var(--agt-warm-gray)",
              margin: 0,
            }}
          >
            Pipeline gate: passing.
          </p>
        </div>
      </section>

      {/* ── Numeric readouts ────────────────────────────────────── */}
      <section
        aria-label="Build metrics"
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "32px 48px 0",
        }}
      >
        <dl
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px",
            backgroundColor: "var(--agt-border)",
            border: "1px solid var(--agt-border)",
            borderRadius: "var(--radius-md)",
            overflow: "hidden",
          }}
        >
          {([
            { label: "Last run", value: "2026-05-25 18:02 UTC" },
            { label: "Build duration", value: "1.24 s" },
            { label: "Commit", value: "a1b2c3d" },
            { label: "Artifacts", value: "4" },
          ] as { label: string; value: string }[]).map(({ label, value }) => (
            <div
              key={label}
              style={{
                backgroundColor: "var(--agt-surface)",
                padding: "20px 24px",
              }}
            >
              <dt
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "var(--agt-type-small-size)",
                  lineHeight: "var(--agt-type-small-line)",
                  color: "var(--agt-warm-gray)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "4px",
                }}
              >
                {label}
              </dt>
              <dd
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--agt-type-body-size)",
                  lineHeight: "var(--agt-type-body-line)",
                  color: "var(--agt-text)",
                  margin: 0,
                }}
              >
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── Timeline ────────────────────────────────────────────── */}
      <section
        aria-label="Run timeline"
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "32px 48px 0",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-ui)",
            fontWeight: 500,
            fontSize: "var(--agt-type-h3-size)",
            lineHeight: "var(--agt-type-h3-line)",
            color: "var(--agt-text)",
            marginBottom: "16px",
          }}
        >
          Recent run durations (last 7 runs)
        </h2>
        {/* Placeholder bar chart — static values */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "8px",
            height: "64px",
          }}
          role="img"
          aria-label="Bar chart of recent run durations"
        >
          {[48, 56, 40, 64, 52, 44, 60].map((h, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${h}px`,
                backgroundColor: "var(--agt-accent)",
                borderRadius: "var(--radius-sm)",
                opacity: i === 6 ? 1 : 0.45,
              }}
            />
          ))}
        </div>
      </section>

      {/* ── Controls ────────────────────────────────────────────── */}
      <section
        aria-label="Pipeline controls"
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "32px 48px 0",
          display: "flex",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <a
          href="#build-meta"
          style={{
            fontFamily: "var(--font-ui)",
            fontWeight: 500,
            fontSize: "var(--agt-type-body-size)",
            lineHeight: "var(--agt-type-body-line)",
            color: "var(--agt-accent)",
            textDecoration: "none",
            borderBottom: "1px solid var(--agt-accent)",
            paddingBottom: "1px",
          }}
        >
          View status
        </a>

        {/* Re-run: disabled in static build */}
        <button
          type="button"
          disabled
          style={{
            fontFamily: "var(--font-ui)",
            fontWeight: 500,
            fontSize: "var(--agt-type-body-size)",
            lineHeight: "var(--agt-type-body-line)",
            color: "var(--agt-muted)",
            backgroundColor: "var(--agt-surface)",
            border: "1px solid var(--agt-border)",
            borderRadius: "var(--radius-md)",
            padding: "8px 20px",
            cursor: "not-allowed",
            opacity: 0.5,
          }}
          aria-disabled="true"
        >
          Re-run
        </button>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "40px 48px 64px",
          borderTop: "1px solid var(--agt-border)",
          marginTop: "48px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--agt-type-small-size)",
            lineHeight: "var(--agt-type-small-line)",
            color: "var(--agt-muted)",
            margin: 0,
          }}
        >
          AEGIS Gate Test — Build gate verification. For developer use only.
        </p>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--agt-type-small-size)",
            lineHeight: "var(--agt-type-small-line)",
            color: "var(--agt-muted)",
            marginTop: "4px",
          }}
        >
          ZRS Enterprises © 2026
        </p>
      </footer>
    </>
  );
}
