import { LitElement, css } from 'lit';

/** Shared link reset — kills default blue/underline inside shadow DOM */
export const dkLinkReset = css`
  ::slotted(a) {
    color: inherit;
    text-decoration: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

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
