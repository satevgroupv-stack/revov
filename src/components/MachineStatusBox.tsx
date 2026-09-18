import { ActivityIcon } from "lucide-react";
import { motion } from "framer-motion";
import { GlassCard } from "./GlassCard";
import { MicroLabel } from "./MicroLabel";
import { useMachineUptime } from "../hooks/useMachineUptime";

export function MachineStatusBox() {
  const { months, days, hours, minutes, seconds } = useMachineUptime();

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: 0.16, ease: [0.23, 1, 0.32, 1] }}
      className="h-full"
    >
      <GlassCard className="relative h-full overflow-hidden px-5 py-7 md:px-8 md:py-8">
        <div className="relative flex h-full flex-col">
          <div className="flex items-start justify-between gap-4">
            <MicroLabel>Machine status</MicroLabel>
            <ActivityIcon
              aria-hidden={true}
              className="h-4 w-4 shrink-0 text-orange"
            />
          </div>
          <p className="mt-auto pt-6 font-semibold tabular-nums leading-tight tracking-tight text-orange text-[1.7rem] md:text-[2.35rem]">
            {months} months
          </p>
          <p className="mt-2 font-mono text-xs uppercase tracking-micro text-silver/60">
            {days} days, {hours} hours, {minutes} minutes, {seconds} seconds
          </p>
          <div className="mt-6 h-[3px] w-full overflow-hidden rounded-full bg-[rgba(217,217,217,0.12)]">
            <div className="h-full w-full rounded-full bg-orange" />
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
