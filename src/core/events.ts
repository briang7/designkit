export function emit<T>(el: HTMLElement, name: string, detail?: T): CustomEvent<T> {
  const event = new CustomEvent(name, {
    detail,
    bubbles: true,
    composed: true,
    cancelable: true,
  });
  el.dispatchEvent(event);
  return event;
}
