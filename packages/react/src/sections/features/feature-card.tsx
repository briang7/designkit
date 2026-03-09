import { cn } from '../../utils/cn.js';

const icons: Record<string, React.ReactNode> = {
  lightning: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" fill="none" />,
  puzzle: <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.611a2.404 2.404 0 0 1-1.705.706 2.404 2.404 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877L2.97 13.85A2.404 2.404 0 0 1 2.264 12.146c0-.617.236-1.234.706-1.704L4.581 8.83c.23-.23.556-.338.877-.29.493.074.84.504 1.02.968a2.5 2.5 0 1 0 3.237-3.237c-.464-.18-.894-.527-.967-1.02a1.026 1.026 0 0 1 .289-.877l1.611-1.611A2.404 2.404 0 0 1 12.352 2.057c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.878.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.968 1.02z" stroke="currentColor" strokeWidth="2" fill="none" />,
  star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" stroke="currentColor" strokeWidth="2" fill="none" />,
  globe: <><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" /><ellipse cx="12" cy="12" rx="4" ry="10" stroke="currentColor" strokeWidth="2" fill="none" /><line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2" /></>,
  code: <><polyline points="16 18 22 12 16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /><polyline points="8 6 2 12 8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></>,
  heart: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" fill="none" />,
  zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10" stroke="currentColor" strokeWidth="2" fill="none" />,
  layers: <><polygon points="12 2 2 7 12 12 22 7" stroke="currentColor" strokeWidth="2" fill="none" /><polyline points="2 17 12 22 22 17" stroke="currentColor" strokeWidth="2" fill="none" /><polyline points="2 12 12 17 22 12" stroke="currentColor" strokeWidth="2" fill="none" /></>,
  settings: <><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="2" fill="none" /></>,
  users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" fill="none" /><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" fill="none" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" fill="none" /><path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" fill="none" /></>,
  chart: <><line x1="18" y1="20" x2="18" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><line x1="12" y1="20" x2="12" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><line x1="6" y1="20" x2="6" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
};

const fallbackIcon = (
  <>
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
  </>
);

export interface FeatureCardProps {
  icon?: string;
  title?: string;
  description?: string;
  centered?: boolean;
  flat?: boolean;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  centered,
  flat,
  className,
}: FeatureCardProps) {
  const resolvedIcon = icon ? icons[icon] || fallbackIcon : null;

  return (
    <div
      data-part="card"
      className={cn(
        'flex flex-col gap-3 p-6 rounded-[var(--dk-radius-xl,1rem)] box-border',
        !flat && 'bg-[var(--dk-color-surface,#fff)] border border-[var(--dk-color-border,#e5e7eb)] shadow-sm',
        flat && 'bg-transparent border-none shadow-none p-4',
        centered && 'items-center text-center',
        !centered && 'items-start',
        className,
      )}
    >
      {resolvedIcon && (
        <div
          data-part="icon-container"
          className={cn(
            'flex items-center justify-center w-12 h-12 shrink-0 rounded-[var(--dk-radius-lg,0.75rem)]',
            'bg-[var(--dk-color-primary-subtle,rgba(59,130,246,0.08))] text-dk-primary',
          )}
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="w-6 h-6"
          >
            {resolvedIcon}
          </svg>
        </div>
      )}
      {title && (
        <h3
          data-part="title"
          className="font-[var(--dk-font-sans,system-ui,sans-serif)] text-lg font-semibold text-dk-text leading-tight m-0"
        >
          {title}
        </h3>
      )}
      {description && (
        <p
          data-part="description"
          className="font-[var(--dk-font-sans,system-ui,sans-serif)] text-base leading-relaxed text-dk-text-muted m-0"
        >
          {description}
        </p>
      )}
    </div>
  );
}
