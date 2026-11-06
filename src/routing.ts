export type Route = "home" | "projects";

/**
 * Resolves the current view from the URL hash. Unknown hashes fall back to
 * the home view; new pages just add a case here and a nav entry.
 */
export function parseRoute(hash: string): Route {
  return hash === "#projects" ? "projects" : "home";
}
