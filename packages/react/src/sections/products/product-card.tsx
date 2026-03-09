import { cn } from '../../utils/cn.js';

export interface ProductCardProps {
  image?: string;
  name: string;
  price: string;
  originalPrice?: string;
  description?: string;
  badge?: string;
  rating?: number;
  href?: string;
  cta?: React.ReactNode;
  className?: string;
}

function StarFilled() {
  return (
    <svg className="w-4 h-4 text-[var(--dk-color-rating,#f59e0b)]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
    </svg>
  );
}

function StarEmpty() {
  return (
    <svg className="w-4 h-4 text-[var(--dk-color-neutral-300,#d1d5db)]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<StarFilled key={i} />);
    } else {
      stars.push(<StarEmpty key={i} />);
    }
  }
  return (
    <div data-part="rating" className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {stars}
    </div>
  );
}

export function ProductCard({
  image,
  name,
  price,
  originalPrice,
  description,
  badge,
  rating,
  href,
  cta,
  className,
}: ProductCardProps) {
  const cardContent = (
    <div
      data-part="card"
      className={cn(
        'flex flex-col rounded-2xl bg-[var(--dk-color-surface,#ffffff)] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] hover:-translate-y-[3px] transition-all duration-300',
        className,
      )}
    >
      {image && (
        <div data-part="image-wrapper" className="relative overflow-hidden aspect-[4/3] bg-[var(--dk-color-neutral-100,#f3f4f6)]">
          <img
            data-part="image"
            src={image}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-400"
          />
          {badge && (
            <span
              data-part="badge"
              className="absolute top-3 left-3 inline-flex items-center px-2 py-1 font-[var(--dk-font-sans,system-ui,sans-serif)] text-xs font-semibold leading-none text-[var(--dk-color-badge-text,#ffffff)] bg-[var(--dk-color-primary,#3b82f6)] rounded-md uppercase tracking-wider z-[1]"
            >
              {badge}
            </span>
          )}
        </div>
      )}
      <div data-part="content" className="flex flex-col gap-2 px-4 pt-4 pb-5">
        <h3
          data-part="name"
          className="font-[var(--dk-font-sans,system-ui,sans-serif)] text-lg font-semibold text-dk-text leading-tight m-0"
        >
          {name}
        </h3>
        <div className="flex items-baseline gap-2">
          <span
            data-part="price"
            className="font-[var(--dk-font-sans,system-ui,sans-serif)] text-xl font-bold text-dk-text leading-none"
          >
            {price}
          </span>
          {originalPrice && (
            <span
              data-part="original-price"
              className="font-[var(--dk-font-sans,system-ui,sans-serif)] text-sm text-dk-text-muted line-through leading-none"
            >
              {originalPrice}
            </span>
          )}
        </div>
        {rating != null && rating > 0 && <Stars rating={rating} />}
        {description && (
          <p
            data-part="description"
            className="font-[var(--dk-font-sans,system-ui,sans-serif)] text-sm leading-relaxed text-dk-text-muted m-0 line-clamp-2"
          >
            {description}
          </p>
        )}
        {cta && <div data-part="cta" className="mt-2">{cta}</div>}
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="no-underline text-inherit contents group">
        {cardContent}
      </a>
    );
  }

  return <div className="group">{cardContent}</div>;
}
