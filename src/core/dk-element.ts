import { LitElement } from 'lit';

export class DkElement extends LitElement {
  protected emitEvent<T>(name: string, detail?: T): CustomEvent<T> {
    const event = new CustomEvent(name, {
      detail,
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    this.dispatchEvent(event);
    return event;
  }
}
