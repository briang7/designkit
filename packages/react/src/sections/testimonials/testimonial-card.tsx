import { cn } from '../../utils/cn.js';

export interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  rating?: number;
  className?: string;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" aria-hidden="true">
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

export function TestimonialCard({
  quote,
  author,
  role,
  rating = 0,
  className,
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col h-full',
        className,
      )}
      data-part="wrapper"
    >
      <div
        className={cn(
          'flex flex-col gap-4 p-6',
          'bg-[var(--dk-color-surface,#ffffff)]',
          'border border-[var(--dk-color-border,#e5e7eb)]',
          'rounded-xl flex-1',
          'transition-[box-shadow,transform] duration-[250ms] ease-out',
          'hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]',
        )}
        data-part="card"
      >
        <p
          className={cn(
            'font-sans text-base leading-relaxed',
            'text-[var(--dk-color-text,#111827)]',
            'flex-1 italic',
            'before:content-["\\201C"] before:text-[2.5em] before:leading-none',
            'before:align-[-0.35em] before:text-[var(--dk-color-primary,#3b82f6)]',
            'before:mr-[0.05em] before:not-italic before:opacity-60',
          )}
          data-part="quote"
        >
          {quote}
        </p>

        {rating > 0 && (
          <div
            className="flex gap-0.5 text-[var(--dk-color-warning,#f59e0b)]"
            data-part="stars"
            aria-label={`${rating} out of 5 stars`}
          >
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon key={i} filled={i < rating} />
            ))}
          </div>
        )}

        <div className="flex items-center gap-3" data-part="author-info">
          <div
            className={cn(
              'w-11 h-11 rounded-full shrink-0',
              'bg-[var(--dk-color-primary-subtle,rgba(59,130,246,0.1))]',
              'text-[var(--dk-color-primary,#3b82f6)]',
              'flex items-center justify-center',
              'font-bold text-sm',
            )}
            data-part="avatar"
          >
            {getInitials(author)}
          </div>
          <div className="flex flex-col">
            <span
              className="font-sans text-sm font-semibold text-[var(--dk-color-text,#111827)]"
              data-part="author-name"
            >
              {author}
            </span>
            {role && (
              <span
                className="font-sans text-xs text-[var(--dk-color-text-muted,#6b7280)]"
                data-part="author-role"
              >
                {role}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
