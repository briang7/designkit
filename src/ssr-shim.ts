// Minimal shims so Lit can load in Node.js (SSR / Next.js).
// Only polyfills globals that don't exist yet — never overwrites existing ones.

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
  function Document() {}
  g.Document = Document as unknown as typeof globalThis.Document;
}

if (typeof g.document === 'undefined') {
  const noop = () => ({});
  g.document = {
    createComment: noop,
    createElement: noop,
    createElementNS: noop,
    createTextNode: noop,
    createTreeWalker: () => ({ nextNode: () => null }),
    importNode: (node: unknown) => node,
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    getElementsByTagName: () => [],
    getElementsByClassName: () => [],
    adoptedStyleSheets: [],
    documentElement: { style: {} },
    head: { appendChild: noop, querySelectorAll: () => [] },
    body: { appendChild: noop },
  } as unknown as Document;
}

if (typeof g.window === 'undefined') {
  g.window = g as unknown as Window & typeof globalThis;
}

// Next.js SSR reads window.location
if (typeof g.location === 'undefined') {
  g.location = {
    protocol: 'http:',
    hostname: 'localhost',
    port: '',
    pathname: '/',
    search: '',
    hash: '',
    href: 'http://localhost/',
    origin: 'http://localhost',
    host: 'localhost',
  } as unknown as Location;
}

if (typeof g.CSSStyleSheet === 'undefined') {
  g.CSSStyleSheet = class CSSStyleSheet {
    cssRules: unknown[] = [];
    replaceSync() {}
    replace() { return Promise.resolve(this); }
  } as unknown as typeof globalThis.CSSStyleSheet;
}

if (typeof g.ShadowRoot === 'undefined') {
  g.ShadowRoot = class ShadowRoot {} as unknown as typeof globalThis.ShadowRoot;
}

if (typeof g.MutationObserver === 'undefined') {
  g.MutationObserver = class MutationObserver {
    observe() {}
    disconnect() {}
    takeRecords() { return []; }
  } as unknown as typeof globalThis.MutationObserver;
}
