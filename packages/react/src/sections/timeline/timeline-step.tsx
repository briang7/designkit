import { cn } from '../../utils/cn.js';

const icons: Record<string, React.ReactNode> = {
  lightning: (
    <path
      d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  shield: (
    <path
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  ),
  users: (
    <>
      <path
        d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" fill="none" />
    </>
  ),
  chart: (
    <>
      <line x1="18" y1="20" x2="18" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="20" x2="12" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="6" y1="20" x2="6" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
      <ellipse cx="12" cy="12" rx="4" ry="10" stroke="currentColor" strokeWidth="2" fill="none" />
      <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2" />
    </>
  ),
  code: (
    <>
      <polyline
        points="16 18 22 12 16 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <polyline
        points="8 6 2 12 8 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </>
  ),
  heart: (
    <path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  ),
  star: (
    <polygon
      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  ),
  check: (
    <polyline
      points="20 6 9 17 4 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
      <polyline
        points="12 6 12 12 16 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </>
  ),
};

export interface TimelineStepProps {
  title: string;
  description?: string;
  icon?: string;
  date?: string;
  active?: boolean;
  className?: string;
}

export function TimelineStep({
  title,
  description,
  icon,
  date,
  active = false,
  className,
}: TimelineStepProps) {
  const iconSvg = icon ? icons[icon] : null;

  return (
    <div data-part="step-root" className={cn('relative block', className)}>
      <div data-part="step" className="flex items-start gap-4 relative">
        <div data-part="connector" className="flex flex-col items-center shrink-0 relative">
          {iconSvg ? (
            <div
              data-part="icon-container"
              className={cn(
                'flex items-center justify-center w-10 h-10 rounded-full shrink-0 z-[1]',
                active
                  ? 'bg-[var(--dk-color-primary-subtle,rgba(59,130,246,0.1))] text-[var(--dk-color-primary,#3b82f6)] shadow-[0_0_0_3px_rgba(59,130,246,0.08)]'
                  : 'bg-[var(--dk-timeline-icon-bg,#f3f4f6)] text-[var(--dk-color-text-muted,#6b7280)]',
              )}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[18px] h-[18px]">
                {iconSvg}
              </svg>
            </div>
          ) : (
            <div
              data-part="dot"
              className={cn(
                'w-3.5 h-3.5 rounded-full border-2 border-white shrink-0 z-[1]',
                active
                  ? 'bg-[var(--dk-color-primary,#3b82f6)] shadow-[0_0_0_4px_var(--dk-color-primary-subtle,rgba(59,130,246,0.15)),0_0_12px_var(--dk-color-primary-subtle,rgba(59,130,246,0.2))]'
                  : 'bg-[var(--dk-timeline-dot-color,#d1d5db)] shadow-[0_0_0_3px_var(--dk-timeline-dot-ring,#f3f4f6)]',
              )}
            />
          )}
        </div>
        <div data-part="content" className="pb-6 min-w-0">
          {date && (
            <p
              data-part="date"
              className="font-[var(--dk-font-sans,system-ui,sans-serif)] text-sm text-[var(--dk-color-primary,#3b82f6)] font-medium mb-2"
            >
              {date}
            </p>
          )}
          <h3
            data-part="title"
            className="font-[var(--dk-font-sans,system-ui,sans-serif)] text-lg font-semibold text-dk-text leading-tight m-0 mb-1"
          >
            {title}
          </h3>
          {description && (
            <p
              data-part="description"
              className="font-[var(--dk-font-sans,system-ui,sans-serif)] text-base leading-relaxed text-dk-text-muted m-0"
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
