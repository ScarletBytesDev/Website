/** All user preferences with their default values. New entries need no extra wiring. */
export type PreferenceValues = {
  motionEnabled: boolean;
};

const STORAGE_KEY = "scarletbytes:preferences";

const DEFAULTS: PreferenceValues = {
  motionEnabled: true,
};

/**
 * User preference service backed by localStorage (static hosting — there is
 * no server session). Everything is stored as one JSON object merged over
 * DEFAULTS, so preferences survive reloads and re-navigation, while unknown
 * or invalid entries safely fall back to their defaults.
 *
 * Use the app-wide `preferences` singleton; a separate instance with an
 * injected Storage can be created for tests.
 */
export class Preferences {
  constructor(private readonly storage: Storage = window.localStorage) {}

  get<K extends keyof PreferenceValues>(key: K): PreferenceValues[K] {
    return this.read()[key];
  }

  set<K extends keyof PreferenceValues>(
    key: K,
    value: PreferenceValues[K],
  ): void {
    const values = this.read();
    values[key] = value;
    this.write(values);
  }

  reset(): void {
    this.write({ ...DEFAULTS });
  }

  private read(): PreferenceValues {
    try {
      const raw = this.storage.getItem(STORAGE_KEY);
      return this.merge(raw ? JSON.parse(raw) : {});
    } catch {
      return { ...DEFAULTS };
    }
  }

  private merge(stored: unknown): PreferenceValues {
    const values: PreferenceValues = { ...DEFAULTS };
    if (typeof stored !== "object" || stored === null) return values;

    const record = stored as Record<string, unknown>;
    for (const key of Object.keys(DEFAULTS) as Array<keyof PreferenceValues>) {
      const candidate = record[key];
      if (typeof candidate === typeof values[key]) {
        (values as Record<string, unknown>)[key] = candidate;
      }
    }
    return values;
  }

  private write(values: PreferenceValues): void {
    try {
      this.storage.setItem(STORAGE_KEY, JSON.stringify(values));
    } catch {
      // Storage blocked (e.g. private mode) — in-memory behaviour still works.
    }
  }
}

/** App-wide preference store. */
export const preferences = new Preferences();
