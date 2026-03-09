import { cn } from '../../utils/cn.js';

export interface GalleryItemProps {
  src: string;
  alt?: string;
  caption?: string;
  className?: string;
  onClick?: () => void;
}

export function GalleryItem({
  src,
  alt = '',
  caption,
  className,
  onClick,
}: GalleryItemProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[var(--dk-radius-lg,0.75rem)] cursor-pointer',
        'aspect-[var(--dk-gallery-item-ratio,4/3)] group',
        className,
      )}
      data-part="item"
      onClick={onClick}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        data-part="image"
        className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
      />
      {caption && (
        <div
          data-part="caption"
          className={cn(
            'absolute bottom-0 left-0 right-0',
            'p-[var(--dk-space-4,1rem)]',
            'bg-gradient-to-t from-black/70 to-transparent',
            'text-white font-sans text-sm',
            'translate-y-full transition-transform duration-300 ease-out',
            'group-hover:translate-y-0',
          )}
        >
          {caption}
        </div>
      )}
    </div>
  );
}
