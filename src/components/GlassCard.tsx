import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
  as?: 'div' | 'section' | 'article';
}

/**
 * Glass surface with HUD corner brackets — the base instrument housing
 * used by every panel on the dashboard.
 */
export function GlassCard({ children, className = '', accent = false, as = 'div' }: GlassCardProps) {
  const Tag = as;
  return (
    <Tag
      className={`relative rounded-glass bg-[rgba(14,26,64,0.65)] shadow-glass backdrop-blur-[16px] ${
      accent ?
      'border border-orange/45' :
      'border border-[rgba(217,217,217,0.15)]'} ${
      className}`}>
      
      <HudBrackets />
      {children}
    </Tag>);

}

function HudBrackets() {
  const base = 'pointer-events-none absolute h-4 w-4 border-silver/[0.33]';
  return (
    <span aria-hidden="true">
      <span className={`${base} left-[-1px] top-[-1px] border-l border-t rounded-tl-glass`} />
      <span className={`${base} right-[-1px] top-[-1px] border-r border-t rounded-tr-glass`} />
      <span className={`${base} bottom-[-1px] left-[-1px] border-b border-l rounded-bl-glass`} />
      <span className={`${base} bottom-[-1px] right-[-1px] border-b border-r rounded-br-glass`} />
    </span>);

}