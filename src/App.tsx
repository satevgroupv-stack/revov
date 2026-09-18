import { PageBackdrop } from "./components/PageBackdrop";
import { DashboardHeader } from "./components/DashboardHeader";
import { StatBoxes } from "./components/StatBoxes";
import { MachineStatusBox } from "./components/MachineStatusBox";
import { MachineViewport } from "./components/MachineViewport";
import { useLakipaySummary } from "./hooks/useLakipaySummary";

export function App() {
  const { summary } = useLakipaySummary();
  const depositSettlement = summary?.depositSettlement ?? 42768;
  const transactions = summary?.transactions ?? 637;

  return (
    <div className="relative min-h-screen w-full bg-navy font-sans text-silver">
      <PageBackdrop />

      <div className="relative z-10">
        <DashboardHeader />

        <main className="mx-auto w-full max-w-tablet px-4 py-10 md:px-8 md:py-12 lg:max-w-shell lg:py-14">
          <StatBoxes
            depositSettlement={depositSettlement}
            transactions={transactions}
          />

          <div className="mt-4 md:mt-6">
            <MachineStatusBox />
          </div>

          <p className="mt-3 min-h-4 text-right font-mono text-[10px] uppercase tracking-micro text-silver/45">
            {summary
              ? "LakiPay account synced"
              : "Showing saved account totals"}
          </p>

          <div className="mt-4 md:mt-6">
            <MachineViewport />
          </div>
        </main>
      </div>
    </div>
  );
}
