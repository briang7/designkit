const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export class FocusTrap {
  private container: HTMLElement;
  private previousFocus: HTMLElement | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  activate(): void {
    this.previousFocus = document.activeElement as HTMLElement;
    this.container.addEventListener('keydown', this.handleKeyDown);

    requestAnimationFrame(() => {
      const first = this.getFocusableElements()[0];
      if (first) {
        (first as HTMLElement).focus();
      } else {
        this.container.focus();
      }
    });
  }

  deactivate(): void {
    this.container.removeEventListener('keydown', this.handleKeyDown);
    if (this.previousFocus) {
      this.previousFocus.focus();
    }
  }

  private handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key !== 'Tab') return;

    const focusable = this.getFocusableElements();
    if (focusable.length === 0) return;

    const first = focusable[0] as HTMLElement;
    const last = focusable[focusable.length - 1] as HTMLElement;

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  private getFocusableElements(): NodeListOf<Element> {
    return this.container.querySelectorAll(FOCUSABLE_SELECTORS);
  }
}
