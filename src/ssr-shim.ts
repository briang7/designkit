// Minimal shims so Lit can load in Node.js (SSR / Next.js build).
// Components won't render on the server — they only need to not crash on import.

const g = globalThis as Record<string, unknown>;

if (typeof g.HTMLElement === 'undefined') {
  g.HTMLElement = class HTMLElement {} as unknown as typeof globalThis.HTMLElement;
}

if (typeof g.customElements === 'undefined') {
  g.customElements = {
    define: () => {},
    get: () => undefined,
    whenDefined: () => Promise.resolve(),
  } as unknown as CustomElementRegistry;
}

if (typeof g.Document === 'undefined') {
  // Use function constructor — class prototype is read-only
  function Document() {}
  g.Document = Document as unknown as typeof globalThis.Document;
}

if (typeof g.document === 'undefined') {
  g.document = {
    createComment: () => ({}),
    createElement: () => ({}),
    createElementNS: () => ({}),
    createTextNode: () => ({}),
    createTreeWalker: () => ({ nextNode: () => null }),
    importNode: (node: unknown) => node,
    adoptedStyleSheets: [],
    head: { appendChild: () => ({}) },
  } as unknown as Document;
}

if (typeof g.window === 'undefined') {
  g.window = g as unknown as Window & typeof globalThis;
}

if (typeof g.CSSStyleSheet === 'undefined') {
  g.CSSStyleSheet = class CSSStyleSheet {
    cssRules: unknown[] = [];
    replaceSync() {}
    replace() { return Promise.resolve(this); }
  } as unknown as typeof globalThis.CSSStyleSheet;
}

if (typeof g.MutationObserver === 'undefined') {
  g.MutationObserver = class MutationObserver {
    observe() {}
    disconnect() {}
    takeRecords() { return []; }
  } as unknown as typeof globalThis.MutationObserver;
}

if (typeof g.ShadowRoot === 'undefined') {
  g.ShadowRoot = class ShadowRoot {} as unknown as typeof globalThis.ShadowRoot;
}
