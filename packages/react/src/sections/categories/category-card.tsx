import { cn } from '../../utils/cn.js';

export interface CategoryCardProps {
  image: string;
  name: string;
  description?: string;
  href?: string;
  count?: number;
  className?: string;
}

export function CategoryCard({
  image,
  name,
  description,
  href,
  count,
  className,
}: CategoryCardProps) {
  const inner = (
    <>
      <div
        data-part="image"
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[450ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.08]"
        style={{ backgroundImage: `url('${image}')` }}
      />
      <div
        data-part="overlay"
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10 transition-all duration-[350ms] group-hover:from-black/65 group-hover:via-black/25 group-hover:to-black/5"
      />
      <div data-part="content" className="relative z-[1] p-6 text-white">
        <p
          data-part="name"
          className="font-[var(--dk-font-display,var(--dk-font-sans,system-ui,sans-serif))] text-xl font-bold leading-tight tracking-[-0.01em] m-0 mb-1"
        >
          {name}
        </p>
        {description && (
          <p
            data-part="description"
            className="font-[var(--dk-font-sans,system-ui,sans-serif)] text-sm leading-relaxed text-white/80 m-0"
          >
            {description}
          </p>
        )}
        {count != null && (
          <span
            data-part="count"
            className="inline-flex items-center gap-1 font-[var(--dk-font-sans,system-ui,sans-serif)] text-xs font-medium text-white/70 mt-2"
          >
            {count} items
          </span>
        )}
      </div>
    </>
  );

  return (
    <div
      data-part="card"
      className={cn(
        'group relative flex flex-col justify-end rounded-2xl overflow-hidden min-h-[240px] h-full cursor-pointer focus-within:outline-2 focus-within:outline-[var(--dk-color-primary,#3b82f6)] focus-within:outline-offset-2',
        className,
      )}
    >
      {href ? (
        <a href={href} aria-label={name} className="text-inherit no-underline after:content-[''] after:absolute after:inset-0">
          {inner}
        </a>
      ) : (
        inner
      )}
    </div>
  );
}
