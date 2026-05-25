"use client";

import { motion, useReducedMotion } from "framer-motion";

interface RunDatum {
  durationMs: number;
}

const RUNS: RunDatum[] = [
  { durationMs: 1380 },
  { durationMs: 1510 },
  { durationMs: 1290 },
  { durationMs: 1620 },
  { durationMs: 1190 },
  { durationMs: 1450 },
  { durationMs: 1240 },
];

const CHART_WIDTH = 280;
const CHART_HEIGHT = 48;
const BAR_GAP = 6;
const BAR_COUNT = RUNS.length; // 7
const BAR_WIDTH = Math.floor((CHART_WIDTH - BAR_GAP * (BAR_COUNT - 1)) / BAR_COUNT);
const MIN_BAR_HEIGHT = 4;

interface BarDatum {
  x: number;
  height: number;
  y: number;
}

function computeBars(runs: RunDatum[]): BarDatum[] {
  const durations = runs.map((r) => r.durationMs);
  const maxDuration = Math.max(...durations);
  const minDuration = Math.min(...durations);
  const range = maxDuration - minDuration || 1;

  return runs.map((run, i) => {
    const normalised = (run.durationMs - minDuration) / range;
    const barHeight = Math.round(
      MIN_BAR_HEIGHT + normalised * (CHART_HEIGHT - MIN_BAR_HEIGHT)
    );
    const x = i * (BAR_WIDTH + BAR_GAP);
    const y = CHART_HEIGHT - barHeight;
    return { x, height: barHeight, y };
  });
}

export default function TimelineSparkline(): JSX.Element {
  const prefersReduced = useReducedMotion();
  const bars = computeBars(RUNS);
  const lastIndex = RUNS.length - 1;

  return (
    <section
      aria-label="Timeline: recent run durations"
      className="flex flex-col gap-[8px] w-full"
    >
      {/* Verbatim copy label per spec */}
      <p
        className="font-[family-name:var(--font-ui)] font-medium"
        style={{
          color: "var(--agt-warm-gray)",
          fontSize: "var(--agt-type-small-size)",
          lineHeight: "var(--agt-type-small-line)",
        }}
      >
        Recent run durations (last 7 runs)
      </p>

      <div
        className="relative w-full overflow-hidden"
        style={{
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--agt-border)",
          backgroundColor: "var(--agt-surface)",
          padding: "var(--space-2)",
        }}
        role="img"
        aria-label="Bar chart showing last 7 pipeline run durations in milliseconds"
      >
        <svg
          width={CHART_WIDTH}
          height={CHART_HEIGHT}
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          aria-hidden="true"
          className="block w-full"
          style={{ maxWidth: `${CHART_WIDTH}px` }}
        >
          {bars.map((bar, i) => {
            const isLast = i === lastIndex;

            /*
             * Color rules — all via CSS custom properties, no hardcoded hex:
             *   latest run  → var(--agt-accent)   [warm teal, full opacity, highlighted]
             *   other runs  → var(--agt-muted)     [at reduced opacity]
             */
            const fillVar = isLast ? "var(--agt-accent)" : "var(--agt-muted)";
            const opacity = isLast ? 1 : 0.55;

            return (
              <motion.rect
                key={i}
                x={bar.x}
                y={prefersReduced ? bar.y : CHART_HEIGHT}
                width={BAR_WIDTH}
                height={prefersReduced ? bar.height : 0}
                rx={2}
                ry={2}
                fill={fillVar}
                opacity={opacity}
                animate={{
                  y: bar.y,
                  height: bar.height,
                }}
                transition={{
                  duration: prefersReduced ? 0 : 0.28,
                  delay: prefersReduced ? 0 : i * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                aria-label={`Run ${
                  i + 1
                }: ${RUNS[i].durationMs}ms${
                  isLast ? " (latest)" : ""
                }`}
              />
            );
          })}
        </svg>

        <div
          className="mt-[8px] flex items-center justify-between"
          aria-hidden="true"
        >
          <span
            className="font-[family-name:var(--font-mono)]"
            style={{
              color: "var(--agt-muted)",
              fontSize: "var(--agt-type-small-size)",
              lineHeight: "var(--agt-type-small-line)",
            }}
          >
            run 1
          </span>
          <span
            className="font-[family-name:var(--font-mono)]"
            style={{
              color: "var(--agt-accent)",
              fontSize: "var(--agt-type-small-size)",
              lineHeight: "var(--agt-type-small-line)",
            }}
          >
            latest
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-[16px]" aria-hidden="true">
        <span className="flex items-center gap-[6px]">
          <span
            className="inline-block w-[8px] h-[8px] rounded-[2px]"
            style={{ backgroundColor: "var(--agt-accent)" }}
          />
          <span
            className="font-[family-name:var(--font-ui)]"
            style={{
              color: "var(--agt-warm-gray)",
              fontSize: "var(--agt-type-small-size)",
              lineHeight: "var(--agt-type-small-line)",
            }}
          >
            latest
          </span>
        </span>
        <span className="flex items-center gap-[6px]">
          <span
            className="inline-block w-[8px] h-[8px] rounded-[2px]"
            style={{ backgroundColor: "var(--agt-muted)", opacity: 0.55 }}
          />
          <span
            className="font-[family-name:var(--font-ui)]"
            style={{
              color: "var(--agt-warm-gray)",
              fontSize: "var(--agt-type-small-size)",
              lineHeight: "var(--agt-type-small-line)",
            }}
          >
            prior
          </span>
        </span>
      </div>
    </section>
  );
}
