import { html, nothing } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { DkElement } from '../../core/dk-element.js';
import { tabsStyles } from './dk-tabs.styles.js';

@customElement('dk-tab')
export class DkTab extends DkElement {
  static override styles = tabsStyles.tab;

  @property() panel = '';
  @property({ type: Boolean, reflect: true }) active = false;
  @property({ type: Boolean, reflect: true }) disabled = false;

  override render() {
    return html`
      <button
        part="tab"
        class=${classMap({ tab: true, active: this.active, disabled: this.disabled })}
        role="tab"
        tabindex=${this.active ? 0 : -1}
        aria-selected=${this.active ? 'true' : 'false'}
        aria-disabled=${this.disabled ? 'true' : nothing}
        ?disabled=${this.disabled}
      >
        <slot></slot>
      </button>
    `;
  }
}

@customElement('dk-tab-panel')
export class DkTabPanel extends DkElement {
  static override styles = tabsStyles.panel;

  @property() name = '';
  @property({ type: Boolean, reflect: true }) active = false;

  override render() {
    if (!this.active) return nothing;
    return html`
      <div part="panel" class="panel" role="tabpanel">
        <slot></slot>
      </div>
    `;
  }
}

@customElement('dk-tabs')
export class DkTabs extends DkElement {
  static override styles = tabsStyles.tabs;

  @property() value = '';

  @queryAssignedElements({ slot: 'tab', selector: 'dk-tab' })
  private tabElements!: DkTab[];

  @queryAssignedElements({ selector: 'dk-tab-panel' })
  private panelElements!: DkTabPanel[];

  override firstUpdated() {
    if (!this.value && this.tabElements.length > 0) {
      this.value = this.tabElements[0].panel;
    }
    this.syncActiveStates();
  }

  private syncActiveStates() {
    this.tabElements.forEach(tab => {
      tab.active = tab.panel === this.value;
    });
    this.panelElements.forEach(panel => {
      panel.active = panel.name === this.value;
    });
  }

  private handleTabClick(e: Event) {
    const tab = (e.target as HTMLElement).closest('dk-tab') as DkTab | null;
    if (!tab || tab.disabled) return;
    this.value = tab.panel;
    this.syncActiveStates();
    this.emitEvent('dk-tab-change', { panel: this.value });
  }

  private handleKeyDown(e: KeyboardEvent) {
    const tabs = this.tabElements.filter(t => !t.disabled);
    const currentIndex = tabs.findIndex(t => t.panel === this.value);

    let newIndex = currentIndex;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      newIndex = (currentIndex + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      newIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      newIndex = tabs.length - 1;
    } else {
      return;
    }

    this.value = tabs[newIndex].panel;
    this.syncActiveStates();
    tabs[newIndex].shadowRoot?.querySelector('button')?.focus();
    this.emitEvent('dk-tab-change', { panel: this.value });
  }

  override render() {
    return html`
      <div class="tabs-wrapper">
        <div
          class="tab-list"
          role="tablist"
          @click=${this.handleTabClick}
          @keydown=${this.handleKeyDown}
        >
          <slot name="tab"></slot>
        </div>
        <div class="panels">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dk-tabs': DkTabs;
    'dk-tab': DkTab;
    'dk-tab-panel': DkTabPanel;
  }
}
