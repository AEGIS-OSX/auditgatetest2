"use client";
import { PageHeader } from "./components/PageHeader";
import { StatusPanel } from "./components/StatusPanel";
import { NumericReadouts } from "./components/NumericReadouts";
import { TimelineSparkline } from "./components/TimelineSparkline";
import { ControlsRow } from "./components/ControlsRow";

export default function Home() {
  return (
    <main
      id="top"
      className="min-h-screen bg-[var(--agt-bg)] text-[var(--agt-text)]"
    >
      {/* Visually-hidden accessibility description */}
      <p className="sr-only">
        Pipeline calibration: single-route static render.
      </p>

      {/* PageHeader — dramatic H1, asymmetric two-column layout */}
      <PageHeader />

      {/* Instrument panel body — all sections share a consistent container */}
      <div
        id="build-meta"
        data-build="1.24s"
        data-commit="a1b2c3d"
        data-timestamp="2026-05-25T18:02:00Z"
        className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 pb-16"
      >
        {/* StatusPanel — teal-accented status badge + one-line copy */}
        <section className="mb-8">
          <StatusPanel
            status="ok"
            statusLabel="Status: OK"
            statusCopy="Pipeline gate: passing."
          />
        </section>

        {/* NumericReadouts — responsive grid of labeled mono metrics */}
        <section className="mb-8">
          <NumericReadouts />
        </section>

        {/* TimelineSparkline — fluid SVG bar chart of last 7 run durations */}
        <section className="mb-8">
          <TimelineSparkline />
        </section>

        {/* ControlsRow — View status anchor + disabled Re-run button */}
        <section className="mb-8">
          <ControlsRow rerunEnabled={false} />
        </section>
      </div>

      {/* Footer */}
      <footer
        className="border-t border-[var(--agt-border)] py-6"
        aria-label="Page footer"
      >
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 flex flex-col gap-1">
          <p
            className="font-[family-name:var(--font-mono)] text-[var(--agt-muted)]"
            style={{
              fontSize: "var(--agt-type-small-size)",
              lineHeight: "var(--agt-type-small-line)",
            }}
          >
            AEGIS Gate Test: Build gate verification. For developer use only.
          </p>
          <p
            className="font-[family-name:var(--font-mono)] text-[var(--agt-muted)]"
            style={{
              fontSize: "var(--agt-type-small-size)",
              lineHeight: "var(--agt-type-small-line)",
            }}
          >
            ZRS Enterprises &copy; 2026
          </p>
        </div>
      </footer>
    </main>
  );
}
