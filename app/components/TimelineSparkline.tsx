"use client";

import { motion, useReducedMotion } from "framer-motion";

interface RunDatum {
  durationMs: number;
  failed?: boolean;
}

const RUNS: RunDatum[] = [
  { durationMs: 1380 },
  { durationMs: 1510 },
  { durationMs: 1290, failed: true },
  { durationMs: 1620 },
  { durationMs: 1190 },
  { durationMs: 1450 },
  { durationMs: 1240 },
];

const CHART_WIDTH = 280;
const CHART_HEIGHT = 48;
const BAR_GAP = 6;
const BAR_COUNT = RUNS.length;
const BAR_WIDTH = Math.floor((CHART_WIDTH - BAR_GAP * (BAR_COUNT - 1)) / BAR_COUNT);
const MIN_BAR_HEIGHT = 4;

function computeBars(runs: RunDatum[]): { x: number; height: number; y: number; failed: boolean }[] {
  const durations = runs.map((r) => r.durationMs);
  const maxDuration = Math.max(...durations);
  const minDuration = Math.min(...durations);
  const range = maxDuration - minDuration || 1;

  return runs.map((run, i) => {
    const normalised = (run.durationMs - minDuration) / range;
    const barHeight = Math.round(MIN_BAR_HEIGHT + normalised * (CHART_HEIGHT - MIN_BAR_HEIGHT));
    const x = i * (BAR_WIDTH + BAR_GAP);
    const y = CHART_HEIGHT - barHeight;
    return { x, height: barHeight, y, failed: run.failed ?? false };
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
      <p
        className="text-[var(--agt-warm-gray)] font-[family-name:var(--font-ui)] font-medium"
        style={{
          fontSize: "var(--agt-type-small-size)",
          lineHeight: "var(--agt-type-small-line)",
        }}
      >
        Recent run durations (last 7 runs)
      </p>

      <div
        className="relative w-full overflow-hidden rounded-[var(--radius-md)] border border-[var(--agt-border)] bg-[var(--agt-surface)] px-[16px] py-[16px]"
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
            const isFailed = bar.failed;

            const fillColor = isFailed
              ? "var(--agt-error, #E05252)"
              : isLast
              ? "var(--agt-accent)"
              : "var(--agt-muted)";

            const opacity = isFailed ? 1 : isLast ? 1 : 0.55;

            return (
              <motion.rect
                key={i}
                x={bar.x}
                y={prefersReduced ? bar.y : CHART_HEIGHT}
                width={BAR_WIDTH}
                height={prefersReduced ? bar.height : 0}
                rx={2}
                ry={2}
                fill={fillColor}
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
                aria-label={`Run ${i + 1}: ${RUNS[i].durationMs}ms${
                  isFailed ? " (failed)" : ""
                }${isLast ? " (latest)" : ""}`}
              />
            );
          })}
        </svg>

        <div
          className="mt-[8px] flex items-center justify-between"
          aria-hidden="true"
        >
          <span
            className="font-[family-name:var(--font-mono)] text-[var(--agt-muted)]"
            style={{
              fontSize: "var(--agt-type-small-size)",
              lineHeight: "var(--agt-type-small-line)",
            }}
          >
            run 1
          </span>
          <span
            className="font-[family-name:var(--font-mono)] text-[var(--agt-accent)]"
            style={{
              fontSize: "var(--agt-type-small-size)",
              lineHeight: "var(--agt-type-small-line)",
            }}
          >
            latest
          </span>
        </div>
      </div>

      <div className="flex items-center gap-[16px]" aria-hidden="true">
        <span className="flex items-center gap-[6px]">
          <span
            className="inline-block w-[8px] h-[8px] rounded-[2px] bg-[var(--agt-accent)]"
          />
          <span
            className="font-[family-name:var(--font-ui)] text-[var(--agt-warm-gray)]"
            style={{
              fontSize: "var(--agt-type-small-size)",
              lineHeight: "var(--agt-type-small-line)",
            }}
          >
            pass
          </span>
        </span>
        <span className="flex items-center gap-[6px]">
          <span
            className="inline-block w-[8px] h-[8px] rounded-[2px]"
            style={{ backgroundColor: "var(--agt-error, #E05252)" }}
          />
          <span
            className="font-[family-name:var(--font-ui)] text-[var(--agt-warm-gray)]"
            style={{
              fontSize: "var(--agt-type-small-size)",
              lineHeight: "var(--agt-type-small-line)",
            }}
          >
            fail
          </span>
        </span>
      </div>
    </section>
  );
}
