import React from "react";
import { motion } from "framer-motion";
import { ArrowDownRightIcon, ReceiptTextIcon } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { MicroLabel } from "./MicroLabel";
import { useCountUp } from "../hooks/useCountUp";

interface StatBoxesProps {
  depositSettlement: number;
  transactions: number;
}

export function StatBoxes({ depositSettlement, transactions }: StatBoxesProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      <StatBox
        label="Deposit + Settlement"
        value={depositSettlement}
        suffix=" ETB"
        tone="orange"
        icon={ArrowDownRightIcon}
        delay={0.04}
      />

      <StatBox
        label="Transactions"
        value={transactions}
        tone="silver"
        icon={ReceiptTextIcon}
        delay={0.1}
      />
    </div>
  );
}

interface StatBoxProps {
  label: string;
  value: number;
  suffix?: string;
  tone: "orange" | "silver";
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  delay: number;
}

function StatBox({
  label,
  value,
  suffix = "",
  tone,
  icon: Icon,
  delay,
}: StatBoxProps) {
  const animated = useCountUp(value, { duration: 1500, delay: delay * 1000 });
  const isOrange = tone === "orange";

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay, ease: [0.23, 1, 0.32, 1] }}
      className="h-full"
    >
      <GlassCard className="relative h-full overflow-hidden px-5 py-7 md:px-8 md:py-8">
        {isOrange && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 120% at 50% 0%, rgba(255,113,1,0.14) 0%, rgba(255,113,1,0) 62%)",
            }}
          />
        )}
        <div className="relative flex h-full flex-col">
          <div className="flex items-start justify-between gap-4">
            <MicroLabel>{label}</MicroLabel>
            <Icon
              aria-hidden={true}
              className={`h-4 w-4 shrink-0 ${isOrange ? "text-orange" : "text-silver/55"}`}
            />
          </div>

          <p
            className={`mt-auto pt-6 font-semibold tabular-nums leading-none tracking-tight text-[2.2rem] md:text-[3rem] ${
              isOrange ? "text-orange" : "text-silver"
            }`}
            style={
              isOrange
                ? { textShadow: "0 0 34px rgba(255,113,1,0.3)" }
                : undefined
            }
          >
            {Math.round(animated).toLocaleString("en-US")}
            {suffix && (
              <span className="ml-2 align-middle font-mono text-[0.85rem] font-normal tracking-[0.12em] text-silver/60">
                {suffix.trim()}
              </span>
            )}
          </p>

          <div
            className={`mt-6 h-[3px] w-full overflow-hidden rounded-full bg-[rgba(217,217,217,0.12)]`}
            role="presentation"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: isOrange ? "100%" : "62%" }}
              transition={{
                duration: 0.3,
                delay: delay + 0.1,
                ease: [0.23, 1, 0.32, 1],
              }}
              className={`h-full rounded-full ${isOrange ? "bg-orange" : "bg-silver/55"}`}
            />
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
