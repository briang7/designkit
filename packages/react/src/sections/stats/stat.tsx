import { cn } from '../../utils/cn.js';

export interface StatProps {
  value?: number;
  label?: string;
  prefix?: string;
  suffix?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function Stat({
  value = 0,
  label,
  prefix,
  suffix,
  icon,
  className,
}: StatProps) {
  const displayValue = Number.isFinite(value) ? value : 0;

  return (
    <div
      data-part="stat"
      className={cn('flex flex-col items-center gap-2 text-center', className)}
    >
      {icon && (
        <div
          data-part="icon"
          className="flex items-center justify-center w-12 h-12 rounded-[var(--dk-radius-lg,0.75rem)] bg-[var(--dk-color-primary-subtle,rgba(59,130,246,0.1))] text-[var(--dk-color-primary,#3b82f6)] mb-2 [&>svg]:w-6 [&>svg]:h-6"
        >
          {icon}
        </div>
      )}

      <span
        data-part="value"
        className="font-[var(--dk-font-display,var(--dk-font-sans,system-ui,sans-serif))] text-[clamp(2.5rem,5vw,3.5rem)] font-extrabold leading-none text-[var(--dk-color-primary,#3b82f6)] tracking-tight tabular-nums"
      >
        {prefix}{displayValue}{suffix}
      </span>

      {label && (
        <span
          data-part="label"
          className="font-[var(--dk-font-sans,system-ui,sans-serif)] text-sm font-medium text-dk-text-muted leading-relaxed tracking-wide uppercase"
        >
          {label}
        </span>
      )}
    </div>
  );
}
