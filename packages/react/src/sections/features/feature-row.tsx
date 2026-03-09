import { cn } from '../../utils/cn.js';

export interface FeatureRowProps {
  image?: string;
  icon?: string;
  title?: string;
  description?: string;
  reverse?: boolean;
  media?: React.ReactNode;
  cta?: React.ReactNode;
  className?: string;
}

export function FeatureRow({
  image,
  icon,
  title,
  description,
  reverse,
  media,
  cta,
  className,
}: FeatureRowProps) {
  const hasMedia = !!(image || icon || media);

  const mediaContent = image ? (
    <img
      src={image}
      alt={title || ''}
      loading="lazy"
      className="block w-full max-w-full h-auto rounded-[var(--dk-radius-lg,0.75rem)] object-cover"
    />
  ) : icon ? (
    <div
      data-part="icon-container"
      className="flex items-center justify-center w-16 h-16 rounded-[var(--dk-radius-xl,1rem)] bg-[var(--dk-color-primary-subtle,rgba(59,130,246,0.1))] text-dk-primary"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="w-8 h-8">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
      </svg>
    </div>
  ) : (
    media
  );

  return (
    <div
      data-part="row"
      className={cn(
        'grid items-center gap-12',
        hasMedia ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1',
        className,
      )}
    >
      {hasMedia && (
        <div
          data-part="media"
          className={cn(reverse && 'md:order-2')}
        >
          {mediaContent}
        </div>
      )}
      <div
        data-part="content"
        className={cn('flex flex-col gap-4', reverse && hasMedia && 'md:order-1')}
      >
        {title && (
          <h3
            data-part="title"
            className="font-[var(--dk-font-sans,system-ui,sans-serif)] text-2xl font-bold text-dk-text leading-tight m-0"
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
        {cta && (
          <div data-part="cta" className="flex gap-3">
            {cta}
          </div>
        )}
      </div>
    </div>
  );
}
