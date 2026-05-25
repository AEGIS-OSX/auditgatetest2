"use client";
import { motion } from "framer-motion";

const REDUCE_MOTION =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

const fadeUp = {
  hidden: { opacity: 0, y: REDUCE_MOTION ? 0 : 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: REDUCE_MOTION ? 0 : 0.5, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

interface BuildMeta {
  build: string;
  commit: string;
  timestamp: string;
}

const meta: BuildMeta = {
  build: "2026-05-25",
  commit: "a1b2c3d",
  timestamp: "2026-05-25T18:02:00Z",
};

export function PageHeader() {
  return (
    <header
      className="w-full border-b border-[var(--color-border)] bg-[var(--color-bg)]"
      role="banner"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-10 md:px-12 md:py-16">
        {/* Asymmetric two-column: 60% H1 left, 40% build-meta right */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:gap-0">
          {/* Left column — 60% */}
          <div className="flex-[0_0_100%] md:flex-[0_0_60%] md:pr-12">
            {/* Eyebrow label */}
            <motion.p
              className="mb-4 font-[family-name:var(--font-mono)] text-[length:var(--type-small-size)] leading-[var(--type-small-line)] tracking-widest uppercase text-[var(--color-primary)]"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              AEGIS Pipeline
            </motion.p>

            {/* H1 — exact copy from Quinn */}
            <motion.h1
              className="font-[family-name:var(--font-display)] font-semibold text-[length:var(--type-h1-size)] leading-[var(--type-h1-line)] text-[var(--color-text)] text-4xl md:text-[length:var(--type-h1-size)]"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.08}
            >
              AEGIS Gate Test
            </motion.h1>

            {/* Visually-hidden accessibility description */}
            <p className="sr-only">
              Pipeline calibration — single-route static render.
            </p>

            {/* Sub-label */}
            <motion.p
              className="mt-4 font-[family-name:var(--font-ui)] text-[length:var(--type-body-size)] leading-[var(--type-body-line)] text-[var(--color-warm-gray)]"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.16}
            >
              Build gate verification. Single-route instrument panel.
            </motion.p>
          </div>

          {/* Right column — 40% */}
          <motion.div
            className="flex-[0_0_100%] md:flex-[0_0_40%] md:border-l md:border-[var(--color-border)] md:pl-10"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.22}
          >
            {/* Build meta panel — data attributes for machine consumption */}
            <div
              id="build-meta"
              data-build={meta.build}
              data-commit={meta.commit}
              data-timestamp={meta.timestamp}
              className="flex flex-col gap-4"
            >
              <p className="font-[family-name:var(--font-mono)] text-[length:var(--type-small-size)] leading-[var(--type-small-line)] uppercase tracking-widest text-[var(--color-muted)]">
                Build metadata
              </p>

              <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <dt className="font-[family-name:var(--font-ui)] text-[length:var(--type-small-size)] leading-[var(--type-small-line)] text-[var(--color-warm-gray)] uppercase tracking-wider">
                    Build
                  </dt>
                  <dd className="mt-1 font-[family-name:var(--font-mono)] text-[length:var(--type-small-size)] leading-[var(--type-small-line)] text-[var(--color-text)]">
                    {meta.build}
                  </dd>
                </div>

                <div>
                  <dt className="font-[family-name:var(--font-ui)] text-[length:var(--type-small-size)] leading-[var(--type-small-line)] text-[var(--color-warm-gray)] uppercase tracking-wider">
                    Commit
                  </dt>
                  <dd className="mt-1 font-[family-name:var(--font-mono)] text-[length:var(--type-small-size)] leading-[var(--type-small-line)] text-[var(--color-primary)]">
                    {meta.commit}
                  </dd>
                </div>

                <div>
                  <dt className="font-[family-name:var(--font-ui)] text-[length:var(--type-small-size)] leading-[var(--type-small-line)] text-[var(--color-warm-gray)] uppercase tracking-wider">
                    Timestamp
                  </dt>
                  <dd className="mt-1 font-[family-name:var(--font-mono)] text-[length:var(--type-small-size)] leading-[var(--type-small-line)] text-[var(--color-text)]">
                    2026-05-25 18:02 UTC
                  </dd>
                </div>

                <div>
                  <dt className="font-[family-name:var(--font-ui)] text-[length:var(--type-small-size)] leading-[var(--type-small-line)] text-[var(--color-warm-gray)] uppercase tracking-wider">
                    Status
                  </dt>
                  <dd className="mt-1 flex items-center gap-2">
                    <span
                      className="inline-block h-2 w-2 rounded-full bg-[var(--color-success)]"
                      aria-hidden="true"
                    />
                    <span className="font-[family-name:var(--font-mono)] text-[length:var(--type-small-size)] leading-[var(--type-small-line)] text-[var(--color-success)]">
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
  );
}
