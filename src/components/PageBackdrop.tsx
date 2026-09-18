import React from 'react';

/** Drifting navy horizon + 56px grid + top-center orange bleed. */
export function PageBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <div className="horizon-drift absolute inset-0" />
      <div className="grid-overlay absolute inset-0" />
      <div
        className="absolute inset-x-0 top-0 h-[70vh]"
        style={{
          background:
          'radial-gradient(ellipse 120% 100% at 50% 0%, rgba(255,113,1,0.07) 0%, rgba(255,113,1,0.03) 28%, rgba(255,113,1,0) 55%)'
        }} />
      
    </div>);

}