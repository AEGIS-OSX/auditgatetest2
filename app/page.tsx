"use client";
import { PageHeader } from "./components/PageHeader";
import { StatusPanel } from "./components/StatusPanel";

export default function Home() {
  return (
    <main id="top">
      <PageHeader />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatusPanel
          status="ok"
          statusLabel="Status: OK"
          statusCopy="Pipeline gate: passing."
        />
      </div>
    </main>
  );
}
