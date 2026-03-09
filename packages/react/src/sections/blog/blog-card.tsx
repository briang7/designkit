import { cn } from '../../utils/cn.js';

export interface BlogCardProps {
  image?: string;
  title: string;
  description?: string;
  author?: string;
  date?: string;
  category?: string;
  href?: string;
  className?: string;
}

export function BlogCard({
  image,
  title,
  description,
  author,
  date,
  category,
  href,
  className,
}: BlogCardProps) {
  const inner = (
    <>
      {image && (
        <div data-part="image" className="relative overflow-hidden aspect-video">
          {category && (
            <span
              data-part="category-badge"
              className="absolute top-3 left-3 text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-dk-primary text-white"
            >
              {category}
            </span>
          )}
          <img
            className="w-full h-full object-cover block transition-transform duration-300 group-hover:scale-[1.03]"
            src={image}
            alt={title}
            loading="lazy"
          />
        </div>
      )}
      <div data-part="content" className="flex flex-col flex-1 p-5 gap-3">
        <h3
          data-part="title"
          className="font-dk-sans text-lg font-bold leading-tight text-dk-text m-0"
        >
          {title}
        </h3>
        {description && (
          <p
            data-part="description"
            className="font-dk-sans text-sm leading-relaxed text-dk-text-muted m-0 flex-1 line-clamp-3"
          >
            {description}
          </p>
        )}
        {(author || date) && (
          <div
            data-part="meta"
            className="flex items-center justify-between text-xs text-dk-text-muted pt-3 border-t border-dk-border mt-auto"
          >
            {author && (
              <span data-part="author" className="font-semibold text-dk-text">
                {author}
              </span>
            )}
            {date && (
              <time data-part="date" className="text-dk-text-muted">
                {date}
              </time>
            )}
          </div>
        )}
      </div>
    </>
  );

  const classes = cn(
    'group flex flex-col h-full bg-dk-surface border border-dk-border rounded-[var(--dk-radius-xl,1rem)]',
    'overflow-hidden transition-all duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.04)]',
    'hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)]',
    className,
  );

  if (href) {
    return (
      <a data-part="card" className={cn(classes, 'no-underline text-inherit')} href={href}>
        {inner}
      </a>
    );
  }

  return (
    <div data-part="card" className={classes}>
      {inner}
    </div>
  );
}
