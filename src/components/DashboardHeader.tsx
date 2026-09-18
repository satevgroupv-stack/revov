import React from 'react';
import { satevLogo, satevUrl } from '../data/account';

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-20 overflow-hidden border-b border-[rgba(217,217,217,0.15)] bg-[rgba(14,26,64,0.75)] backdrop-blur-[20px]">
      <span aria-hidden="true" className="scanline absolute inset-x-0 top-0 h-px w-full" />
      <div className="relative mx-auto flex max-w-shell items-center justify-between gap-3 px-4 py-4 md:px-8">
        <a
          href={satevUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative z-10 flex shrink-0 items-center gap-2.5 rounded-[8px] px-1 py-1 transition-colors duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange">
          
          <img
            src={satevLogo}
            alt="SATEV Group"
            className="h-8 w-8 shrink-0 rounded-[6px] object-cover" />
          
          <span className="hidden text-sm font-semibold tracking-tight text-silver transition-colors duration-150 ease-out group-hover:text-orange sm:inline">
            SATEV Group
          </span>
        </a>

        <p className="pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-micro text-silver/70 md:text-[11px]">
          RevoV Vending Machine
        </p>

        <div className="relative z-10 flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-micro text-silver/50">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-orange/60" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-orange" />
          </span>
          <span className="hidden sm:inline">Live telemetry</span>
          <span className="sm:hidden">Live</span>
        </div>
      </div>
    </header>);

}