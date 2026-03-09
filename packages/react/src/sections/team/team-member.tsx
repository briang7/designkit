import type { ReactNode } from 'react';
import { cn } from '../../utils/cn.js';

export interface TeamMemberProps {
  name: string;
  role?: string;
  image?: string;
  bio?: string;
  social?: ReactNode;
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

export function TeamMember({
  name,
  role,
  image,
  bio,
  social,
  className,
}: TeamMemberProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl',
        'bg-[var(--dk-color-surface,#ffffff)]',
        'border border-[var(--dk-color-border,#e5e7eb)]',
        'text-center flex flex-col',
        'shadow-[0_1px_3px_rgba(0,0,0,0.04)]',
        'transition-[box-shadow,transform] duration-300 ease-out',
        'hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-0.5',
        'group',
        className,
      )}
      data-part="card"
    >
      <div
        className="relative overflow-hidden aspect-[4/5] max-h-[280px] shrink-0"
        data-part="image-wrapper"
      >
        {image ? (
          <img
            src={image}
            alt={name}
            loading="lazy"
            data-part="image"
            className="w-full h-full object-cover object-top block transition-transform duration-300 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="aspect-square bg-[var(--dk-color-neutral-100,#f3f4f6)] flex items-center justify-center text-5xl text-[var(--dk-color-text-muted,#6b7280)]">
            {getInitials(name)}
          </div>
        )}
        {social && (
          <div
            data-part="social-overlay"
            className={cn(
              'absolute bottom-0 left-0 right-0',
              'p-[var(--dk-space-4,1rem)]',
              'bg-gradient-to-t from-black/60 to-transparent',
              'flex justify-center gap-[var(--dk-space-3,0.75rem)]',
              'translate-y-full transition-transform duration-300 ease-out',
              'group-hover:translate-y-0',
            )}
          >
            {social}
          </div>
        )}
      </div>
      <div className="p-[var(--dk-space-5,1.25rem)]" data-part="info">
        <h3
          className="font-sans text-base font-semibold text-[var(--dk-color-text,#111827)] m-0 mb-[var(--dk-space-1,0.25rem)]"
          data-part="name"
        >
          {name}
        </h3>
        {role && (
          <p
            className="font-sans text-sm text-[var(--dk-color-primary,#3b82f6)] m-0 mb-[var(--dk-space-2,0.5rem)]"
            data-part="role"
          >
            {role}
          </p>
        )}
        {bio && (
          <p
            className="font-sans text-xs text-[var(--dk-color-text-muted,#6b7280)] leading-relaxed m-0"
            data-part="bio"
          >
            {bio}
          </p>
        )}
      </div>
    </div>
  );
}
