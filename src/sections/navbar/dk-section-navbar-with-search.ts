import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { DkSectionElement } from '../../core/dk-section-element.js';
import { navbarBaseStyles } from './dk-section-navbar.styles.js';

const searchStyles = css`
  .search {
    display: flex;
    align-items: center;
    position: relative;
    flex-shrink: 0;
    margin: 0 var(--dk-space-3, 0.75rem);
  }

  .search-icon {
    position: absolute;
    left: 10px;
    width: 16px;
    height: 16px;
    color: var(--dk-color-text-muted, #9ca3af);
    pointer-events: none;
  }

  .search input {
    width: 160px;
    height: 36px;
    padding: 0 var(--dk-space-3, 0.75rem) 0 34px;
    border: 1px solid var(--dk-color-border, #e5e7eb);
    border-radius: var(--dk-radius-full, 9999px);
    background: var(--dk-color-surface, #f9fafb);
    font-size: var(--dk-text-sm, 0.875rem);
    color: var(--dk-color-text, #111827);
    outline: none;
    transition: width 0.3s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .search input::placeholder {
    color: var(--dk-color-text-muted, #9ca3af);
  }

  .search input:focus {
    width: 240px;
    border-color: var(--dk-color-primary, #3b82f6);
    box-shadow: var(--dk-focus-ring, 0 0 0 2px rgba(59, 130, 246, 0.3));
  }

  .mobile-search {
    margin-bottom: var(--dk-space-2, 0.5rem);
  }

  .mobile-search input {
    width: 100%;
  }

  @media (max-width: 768px) {
    .search {
      display: none;
    }
  }
`;

@customElement('dk-section-navbar-with-search')
export class DkSectionNavbarWithSearch extends DkSectionElement {
  static override styles = [navbarBaseStyles, searchStyles];

  @property() brand = '';
  @property({ type: Boolean, reflect: true }) sticky = false;
  @property({ type: Boolean, reflect: true }) transparent = false;
  @property({ attribute: 'search-placeholder' }) searchPlaceholder = 'Search...';

  @state() private _mobileOpen = false;

  private _toggleMobile() {
    this._mobileOpen = !this._mobileOpen;
  }

  private _onSearch(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      const input = e.target as HTMLInputElement;
      this.emitEvent('dk-search', { query: input.value });
    }
  }

  private _renderSearchInput(mobile = false) {
    return html`
      <div class=${mobile ? 'mobile-search' : 'search'}>
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
        <input
          type="search"
          part="search-input"
          placeholder=${this.searchPlaceholder}
          aria-label="Search"
          @keydown=${this._onSearch}
        />
      </div>
    `;
  }

  override render() {
    return html`
      <nav part="nav" role="navigation" aria-label="Main navigation">
        <div class="container" part="container">
          <div class="brand" part="brand">
            <slot name="logo">${this.brand}</slot>
          </div>

          <div class="links" part="links">
            <slot name="links"></slot>
          </div>

          ${this._renderSearchInput()}

          <div class="cta" part="cta">
            <slot name="cta"></slot>
          </div>

          <button
            class=${classMap({ hamburger: true, open: this._mobileOpen })}
            part="hamburger"
            aria-label="Toggle menu"
            aria-expanded=${this._mobileOpen ? 'true' : 'false'}
            @click=${this._toggleMobile}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div class=${classMap({ 'mobile-menu': true, open: this._mobileOpen })} part="mobile-menu">
        ${this._renderSearchInput(true)}
        <slot name="links"></slot>
        <div class="mobile-cta">
          <slot name="cta"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-section-navbar-with-search': DkSectionNavbarWithSearch;
  }
}
