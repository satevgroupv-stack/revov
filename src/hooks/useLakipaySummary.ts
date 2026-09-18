import { useEffect, useState } from "react";

export interface LakipaySummary {
  depositSettlement: number;
  transactions: number;
}

export function useLakipaySummary() {
  const [summary, setSummary] = useState<LakipaySummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const response = await fetch("/api/lakipay-summary");
        const body = (await response.json()) as LakipaySummary & {
          error?: string;
        };
        if (!response.ok)
          throw new Error(body.error ?? "Unable to load LakiPay totals.");
        if (active) {
          setSummary(body);
          setError(null);
        }
      } catch (loadError) {
        if (active)
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load LakiPay totals.",
          );
      }
    };

    void load();
    const interval = window.setInterval(load, 60_000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  return { summary, error };
}
