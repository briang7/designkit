import { cn } from '../../utils/cn.js';
import { bgVariant, type BgVariant } from '../../utils/bg.js';

export interface TestimonialsFeaturedProps {
  headline?: string;
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
  rating?: number;
  bg?: BgVariant;
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
    <svg className="w-6 h-6" viewBox="0 0 24 24" aria-hidden="true">
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

export function TestimonialsFeatured({
  headline,
  quote,
  author,
  role,
  avatar,
  rating = 0,
  bg = 'primary',
  className,
}: TestimonialsFeaturedProps) {
  const isDark = bg === 'brand' || bg === 'dark';

  return (
    <section
      className={cn(
        'block py-20 px-6',
        bgVariant(bg),
        className,
      )}
      data-part="section"
    >
      <div className="max-w-[1200px] mx-auto" data-part="container">
        {headline && (
          <div className="text-center mb-12">
            <h2
              className={cn(
                'font-sans text-[clamp(1.875rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight mb-4',
                isDark ? 'text-white' : 'text-[var(--dk-color-text,#111827)]',
              )}
              data-part="headline"
            >
              {headline}
            </h2>
          </div>
        )}
        <div className="flex flex-col items-center text-center max-w-[800px] mx-auto">
          <div
            className="font-serif text-[clamp(6rem,12vw,10rem)] leading-[0.8] text-[var(--dk-color-primary,#3b82f6)] opacity-15 select-none mb-2"
            data-part="quote-mark"
            aria-hidden="true"
          >
            {'\u201C'}
          </div>
          <p
            className={cn(
              'font-sans text-[clamp(1.25rem,3vw,1.75rem)] leading-relaxed italic mb-8 max-w-[720px]',
              isDark ? 'text-white' : 'text-[var(--dk-color-text,#111827)]',
            )}
            data-part="quote"
          >
            {quote}
          </p>

          {rating > 0 && (
            <div
              className="flex gap-1 justify-center text-[var(--dk-color-warning,#f59e0b)] mb-6"
              data-part="stars"
              aria-label={`${rating} out of 5 stars`}
            >
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon key={i} filled={i < rating} />
              ))}
            </div>
          )}

          <div className="flex flex-col items-center gap-3" data-part="author-section">
            {avatar ? (
              <img
                className="w-20 h-20 rounded-full object-cover bg-[var(--dk-color-neutral-100,#f3f4f6)] border-[3px] border-[var(--dk-color-primary-subtle,rgba(59,130,246,0.15))]"
                data-part="avatar"
                src={avatar}
                alt={author}
                loading="lazy"
              />
            ) : (
              <div
                className={cn(
                  'w-20 h-20 rounded-full flex items-center justify-center',
                  'bg-[var(--dk-color-primary-subtle,rgba(59,130,246,0.1))]',
                  'text-[var(--dk-color-primary,#3b82f6)] font-bold text-xl',
                )}
                data-part="avatar"
              >
                {getInitials(author)}
              </div>
            )}
            <span
              className={cn(
                'font-sans text-lg font-semibold',
                isDark ? 'text-white' : 'text-[var(--dk-color-text,#111827)]',
              )}
              data-part="author-name"
            >
              {author}
            </span>
            {role && (
              <span
                className="font-sans text-sm text-[var(--dk-color-text-muted,#6b7280)]"
                data-part="author-role"
              >
                {role}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
