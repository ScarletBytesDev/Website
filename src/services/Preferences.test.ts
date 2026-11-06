import { describe, expect, it } from "vitest";
import { Preferences } from "./Preferences.ts";

function fakeStorage(initial: string | null = null): Storage {
    let data = initial;
    return {
        getItem: () => data,
        setItem: (_key, value) => {
            data = value;
        },
        removeItem: () => {
            data = null;
        },
        clear: () => {
            data = null;
        },
        key: () => null,
        get length() {
            return data === null ? 0 : 1;
        },
    } as Storage;
}

describe("Preferences", () => {
    it("returns defaults for a fresh store", () => {
        const preferences = new Preferences(fakeStorage());
        expect(preferences.get("motionEnabled")).toBe(true);
    });

    it("persists values across instances", () => {
        const storage = fakeStorage();
        new Preferences(storage).set("motionEnabled", false);
        expect(new Preferences(storage).get("motionEnabled")).toBe(false);
    });

    it("falls back to defaults on corrupt JSON", () => {
        const preferences = new Preferences(fakeStorage("not json"));
        expect(preferences.get("motionEnabled")).toBe(true);
    });

    it("ignores stored values of the wrong type", () => {
        const preferences = new Preferences(
            fakeStorage('{"motionEnabled":"yes"}'),
        );
        expect(preferences.get("motionEnabled")).toBe(true);
    });

    it("survives a blocked storage without throwing", () => {
        const blocked = {
            getItem: () => {
                throw new Error("blocked");
            },
            setItem: () => {
                throw new Error("blocked");
            },
            removeItem: () => {
                throw new Error("blocked");
            },
            clear: () => {
                throw new Error("blocked");
            },
            key: () => {
                throw new Error("blocked");
            },
            get length() {
                return 0;
            },
        } as Storage;

        const preferences = new Preferences(blocked);
        expect(() => preferences.set("motionEnabled", false)).not.toThrow();
        expect(preferences.get("motionEnabled")).toBe(true);
    });

    it("reset restores the defaults", () => {
        const preferences = new Preferences(fakeStorage());
        preferences.set("motionEnabled", false);
        preferences.reset();
        expect(preferences.get("motionEnabled")).toBe(true);
    });
});
