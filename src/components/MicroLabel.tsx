import React from 'react';

interface MicroLabelProps {
  children: React.ReactNode;
  className?: string;
  tone?: 'silver' | 'orange';
}

/** 10px mono micro-label: uppercase, 0.22em tracking, low-opacity silver. */
export function MicroLabel({ children, className = '', tone = 'silver' }: MicroLabelProps) {
  return (
    <span
      className={`block font-mono text-[10px] uppercase leading-none tracking-micro ${
      tone === 'orange' ? 'text-orange/70' : 'text-silver/50'} ${
      className}`}>
      
      {children}
    </span>);

}