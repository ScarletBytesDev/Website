import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// happy-dom cannot load iframe pages (e.g. the Twitch embed) and logs a noisy
// DOMException for each attempt. Tests only assert the embed markup, so the
// iframe load hooks are neutralized: attribute handling still works normally
// (getAttribute("src") stays intact), the page load itself is skipped.
const NOOP = () => {};

function neutralizeIframeLoading(): void {
    const proto = HTMLIFrameElement.prototype as unknown as Record<
        symbol,
        unknown
    >;
    const parent = Object.getPrototypeOf(proto) as Record<symbol, unknown>;

    for (const sym of Object.getOwnPropertySymbols(proto)) {
        const name = String(sym.description ?? "");
        if (
            name === "connectedToDocument"
            || name === "onSetAttribute"
            || name === "onRemoveAttribute"
        ) {
            proto[sym] = (parent[sym] as typeof NOOP) ?? NOOP;
        }
    }
}

neutralizeIframeLoading();

// happy-dom defines IntersectionObserver but never fires its callback, so
// lazy-loaded elements (e.g. the Twitch embed in LiveCard) would stay hidden
// forever in tests. This mock fires the callback synchronously on observe().
class ImmediateIntersectionObserver {
    private readonly cb: IntersectionObserverCallback;

    constructor(cb: IntersectionObserverCallback) {
        this.cb = cb;
    }

    observe(target: Element): void {
        this.cb(
            [
                {
                    isIntersecting: true,
                    target,
                } as IntersectionObserverEntry,
            ],
            this as unknown as IntersectionObserver,
        );
    }

    unobserve(): void {}
    disconnect(): void {}
    takeRecords(): IntersectionObserverEntry[] {
        return [];
    }
    readonly root = null;
    readonly rootMargin = "";
    readonly thresholds: readonly number[] = [];
}

globalThis.IntersectionObserver =
    ImmediateIntersectionObserver as unknown as typeof IntersectionObserver;

afterEach(() => {
    cleanup();
});
