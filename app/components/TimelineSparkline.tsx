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

// Coordinate space constants — used for viewBox math only, not pixel sizing
const VB_WIDTH = 280;
const VB_HEIGHT = 48;
const BAR_GAP = 6;
const BAR_COUNT = RUNS.length; // 7
const BAR_WIDTH = Math.floor(
  (VB_WIDTH - BAR_GAP * (BAR_COUNT - 1)) / BAR_COUNT
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
      MIN_BAR_HEIGHT + normalised * (VB_HEIGHT - MIN_BAR_HEIGHT)
    );
    const x = i * (BAR_WIDTH + BAR_GAP);
    const y = VB_HEIGHT - barHeight;
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
        rect.setAttribute("y", String(VB_HEIGHT));
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
      id="timeline-sparkline"
      aria-label="Timeline sparkline"
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
        Recent run durations (last 7 runs)
      </p>

      {/* Fluid SVG — viewBox keeps coordinate math intact; width="100%" scales to container */}
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VB_WIDTH} ${VB_HEIGHT}`}
        width="100%"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{
          display: "block",
          borderRadius: "var(--radius-sm)",
        }}
      >
        {bars.map((bar, i) => (
          <rect
            key={i}
            x={bar.x}
            width={BAR_WIDTH}
            data-target-y={bar.y}
            data-target-h={bar.height}
            data-delay={i * 40}
            y={VB_HEIGHT}
            height={0}
            fill={i === lastIndex ? "var(--agt-accent)" : "var(--agt-muted)"}
            rx={1}
          />
        ))}
      </svg>
    </section>
  );
}