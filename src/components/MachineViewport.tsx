import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from './GlassCard';
import { MicroLabel } from './MicroLabel';
import { machineImage, machineDescription } from '../data/account';

/**
 * The physical unit alongside its product description. The image is always
 * contained, never cropped, so it reads correctly at every viewport size.
 */
export function MachineViewport() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.16, ease: [0.23, 1, 0.32, 1] }}>
      
      <GlassCard className="relative overflow-hidden px-5 py-7 md:px-8 md:py-9">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
            'radial-gradient(ellipse 55% 55% at 28% 45%, rgba(255,113,1,0.1) 0%, rgba(255,113,1,0) 65%)'
          }} />
        

        <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
          <img
            src={machineImage}
            alt="RevoV smart vending machine unit"
            className="mx-auto h-[280px] w-full max-w-[300px] object-contain sm:h-[380px] sm:max-w-[400px] lg:h-[480px] lg:max-w-[440px]" />
          

          <div>
            <MicroLabel tone="orange">Engineered in Ethiopia</MicroLabel>
            <h1 className="mt-3 text-[1.6rem] font-semibold leading-tight tracking-tight text-white md:text-[2.1rem]">
              RevoV Smart Vending Machine
            </h1>
            <p className="mt-5 max-w-[46ch] text-sm leading-relaxed text-silver/70 md:text-base">
              {machineDescription}
            </p>
          </div>
        </div>
      </GlassCard>
    </motion.div>);

}