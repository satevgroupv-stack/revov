import { useEffect, useState } from "react";

export interface MachineUptime {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const machineStart = new Date(2026, 3, 9, 6, 0, 0);

function getMachineUptime(now: Date): MachineUptime {
  if (now <= machineStart) {
    return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  let months =
    (now.getFullYear() - machineStart.getFullYear()) * 12 +
    now.getMonth() -
    machineStart.getMonth();
  const monthAnchor = new Date(machineStart);
  monthAnchor.setMonth(machineStart.getMonth() + months);

  if (monthAnchor > now) {
    months -= 1;
    monthAnchor.setMonth(machineStart.getMonth() + months);
  }

  const remainingSeconds = Math.floor(
    (now.getTime() - monthAnchor.getTime()) / 1_000,
  );
  const days = Math.floor(remainingSeconds / (24 * 60 * 60));
  const hours = Math.floor((remainingSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((remainingSeconds % (60 * 60)) / 60);
  const seconds = remainingSeconds % 60;

  return { months, days, hours, minutes, seconds };
}

export function useMachineUptime() {
  const [uptime, setUptime] = useState(() => getMachineUptime(new Date()));

  useEffect(() => {
    const update = () => setUptime(getMachineUptime(new Date()));
    const interval = window.setInterval(update, 1_000);
    return () => window.clearInterval(interval);
  }, []);

  return uptime;
}
