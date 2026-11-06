import { describe, expect, it } from "vitest";
import { parseRoute } from "./routing.ts";

describe("parseRoute", () => {
  it("resolves the projects view", () => {
    expect(parseRoute("#projects")).toBe("projects");
  });

  it("falls back to home for empty or unknown hashes", () => {
    expect(parseRoute("")).toBe("home");
    expect(parseRoute("#home")).toBe("home");
    expect(parseRoute("#unknown")).toBe("home");
  });
});
