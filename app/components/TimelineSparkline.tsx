"use client";

import { useEffect, useRef } from "react";

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
const BAR_WIDTH = Math.floor(
  (CHART_WIDTH - BAR_GAP * (BAR_COUNT - 1)) / BAR_COUNT
);
const MIN_BAR_HEIGHT = 4;

interface BarDatum {
  x: number;
  height: number;
  y: number;
}

function computeBars(runs: RunDatum[]): BarDatum[] {
  const durations = runs.map((r: RunDatum) => r.durationMs);
  const maxDuration = Math.max(...durations);
  const minDuration = Math.min(...durations);
  const range = maxDuration - minDuration || 1;

  return runs.map((run: RunDatum, i: number) => {
    const normalised = (run.durationMs - minDuration) / range;
    const barHeight = Math.round(
      MIN_BAR_HEIGHT + normalised * (CHART_HEIGHT - MIN_BAR_HEIGHT)
    );
    const x = i * (BAR_WIDTH + BAR_GAP);
    const y = CHART_HEIGHT - barHeight;
    return { x, height: barHeight, y };
  });
}

export function TimelineSparkline(): React.ReactElement {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const rects = svg.querySelectorAll<SVGRectElement>("rect[data-target-y]");
    rects.forEach((rect: SVGRectElement) => {
      const targetY = rect.getAttribute("data-target-y");
      const targetH = rect.getAttribute("data-target-h");
      if (targetY === null || targetH === null) return;

      if (prefersReduced) {
        rect.setAttribute("y", targetY);
        rect.setAttribute("height", targetH);
      } else {
        rect.style.transition = "none";
        rect.setAttribute("y", String(CHART_HEIGHT));
        rect.setAttribute("height", "0");

        requestAnimationFrame(() => {
          const delayMs = Number(rect.getAttribute("data-delay") ?? "0");
          rect.style.transition = `y 0.28s cubic-bezier(0.22,1,0.36,1) ${delayMs}ms, height 0.28s cubic-bezier(0.22,1,0.36,1) ${delayMs}ms`;
          rect.setAttribute("y", targetY);
          rect.setAttribute("height", targetH);
        });
      }
    });
  }, []);

  const bars = computeBars(RUNS);
  const lastIndex = RUNS.length - 1;

  return (
    <section
      aria-label="Timeline: recent run durations"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-1)",
        width: "100%",
      }}
    >
      {/* Verbatim copy label per spec */}
      <p
        style={{
          fontFamily: "var(--font-ui)",
          fontWeight: 500,
          color: "var(--agt-warm-gray)",
          fontSize: "var(--agt-type-small-size)",
          lineHeight: "var(--agt-type-small-line)",
          margin: 0,
        }}
      >
        Recent run durations (last 7 runs)
      </p>

      <div
        style={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--agt-border)",
          backgroundColor: "var(--agt-surface)",
          padding: "var(--space-2)",
        }}
        role="img"
        aria-label="Bar chart showing last 7 pipeline run durations in milliseconds"
      >
        <svg
          ref={svgRef}
          width={CHART_WIDTH}
          height={CHART_HEIGHT}
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          aria-hidden="true"
          style={{
            display: "block",
            width: "100%",
            maxWidth: `${CHART_WIDTH}px`,
          }}
        >
          {bars.map((bar: BarDatum, i: number) => {
            const isLast = i === lastIndex;

            /*
             * Color rules — all via CSS custom properties, no hardcoded hex:
             *   latest run  -> var(--agt-accent)   [warm teal, full opacity, highlighted]
             *   other runs  -> var(--agt-muted)     [at reduced opacity]
             */
            const fillVar = isLast
              ? "var(--agt-accent)"
              : "var(--agt-muted)";
            const opacity = isLast ? 1 : 0.55;

            return (
              <rect
                key={i}
                x={bar.x}
                y={bar.y}
                width={BAR_WIDTH}
                height={bar.height}
                rx={2}
                ry={2}
                fill={fillVar}
                opacity={opacity}
                data-target-y={bar.y}
                data-target-h={bar.height}
                data-delay={i * 40}
              />
            );
          })}
        </svg>

        <div
          style={{
            marginTop: "var(--space-1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          aria-hidden="true"
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--agt-muted)",
              fontSize: "var(--agt-type-small-size)",
              lineHeight: "var(--agt-type-small-line)",
            }}
          >
            run 1
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-2)",
        }}
        aria-hidden="true"
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-1)",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "var(--space-1)",
              height: "var(--space-1)",
              borderRadius: "var(--radius-sm)",
              backgroundColor: "var(--agt-accent)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-ui)",
              color: "var(--agt-warm-gray)",
              fontSize: "var(--agt-type-small-size)",
              lineHeight: "var(--agt-type-small-line)",
            }}
          >
            latest
          </span>
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-1)",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "var(--space-1)",
              height: "var(--space-1)",
              borderRadius: "var(--radius-sm)",
              backgroundColor: "var(--agt-muted)",
              opacity: 0.55,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-ui)",
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
