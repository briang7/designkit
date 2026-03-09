export type BgVariant = 'primary' | 'alt' | 'brand' | 'dark';

const bgClasses: Record<BgVariant, string> = {
  primary: 'bg-[var(--dk-section-bg-primary,var(--dk-color-surface,#f9fafb))]',
  alt: 'bg-[var(--dk-section-bg-alt,#f3f4f6)]',
  brand: 'bg-[var(--dk-section-bg-brand,var(--dk-color-primary,#2563eb))] text-white',
  dark: 'bg-[var(--dk-section-bg-dark,#111827)] text-white',
};

export function bgVariant(bg: BgVariant = 'primary'): string {
  return bgClasses[bg] || bgClasses.primary;
}
