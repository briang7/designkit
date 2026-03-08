import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DkElement } from '../../core/dk-element.js';

export type BreadcrumbSeparator = 'slash' | 'chevron' | 'dot';

const separatorMap: Record<BreadcrumbSeparator, string> = {
  slash: '/',
  chevron: '\u203A',
  dot: '\u00B7',
};

@customElement('dk-breadcrumb')
export class DkBreadcrumb extends DkElement {
  static override styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      font-family: var(--dk-font-sans);
      font-size: var(--dk-text-sm);
    }

    .sep {
      color: var(--dk-color-text-muted, #6b7280);
      font-size: var(--dk-text-sm, 0.875rem);
      user-select: none;
      padding: 0 var(--dk-space-1, 0.25rem);
    }

    a {
      color: var(--dk-color-primary);
      text-decoration: none;
      border-radius: var(--dk-radius-sm);
      transition: color var(--dk-transition-fast);
    }

    a:hover {
      color: var(--dk-color-primary-hover, var(--dk-color-primary));
      text-decoration: underline;
    }

    a:focus-visible {
      outline: none;
      box-shadow: var(--dk-focus-ring);
    }

    .current {
      color: var(--dk-color-text);
      font-weight: var(--dk-font-semibold);
    }
  `;

  @property() href = '';
  /** @internal Set by dk-breadcrumbs parent */
  @property({ attribute: false }) showSeparator = false;
  /** @internal Set by dk-breadcrumbs parent */
  @property({ attribute: false }) separatorChar = '\u203A';

  override render() {
    const sep = this.showSeparator
      ? html`<span class="sep" aria-hidden="true">${this.separatorChar}</span>`
      : null;

    if (this.href) {
      return html`${sep}<a part="link" href=${this.href}><slot></slot></a>`;
    }
    return html`${sep}<span part="link" class="current" aria-current="page"><slot></slot></span>`;
  }
}

@customElement('dk-breadcrumbs')
export class DkBreadcrumbs extends DkElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--dk-font-sans);
    }

    nav {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--dk-space-1, 0.25rem);
    }
  `;

  @property({ reflect: true }) separator: BreadcrumbSeparator = 'chevron';

  private _updateItems() {
    const items = Array.from(this.querySelectorAll('dk-breadcrumb')) as DkBreadcrumb[];
    const sep = separatorMap[this.separator] || separatorMap.chevron;
    items.forEach((item, i) => {
      item.showSeparator = i > 0;
      item.separatorChar = sep;
    });
  }

  override firstUpdated() {
    this._updateItems();
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('separator')) {
      this._updateItems();
    }
  }

  private _onSlotChange() {
    this._updateItems();
  }

  override render() {
    return html`
      <nav part="nav" aria-label="Breadcrumb">
        <slot @slotchange=${this._onSlotChange}></slot>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-breadcrumbs': DkBreadcrumbs;
    'dk-breadcrumb': DkBreadcrumb;
  }
}
