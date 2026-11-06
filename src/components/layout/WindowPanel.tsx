import type { ReactNode } from "react";
import { Component } from "react";

/** Panel chrome color: amber (streaming.exe), twitch purple, or scarlet. */
export type WindowAccent = "amber" | "twitch" | "scarlet";

/**
 * Chrome classes per accent - the single source shared by panels and their
 * contents (tabs, arrows), so an accent always looks the same everywhere.
 */
export const WINDOW_ACCENT_CLASSES: Record<
    WindowAccent,
    { border: string; tab: string }
> = {
    amber: { border: "border-amber-500", tab: "text-amber-500" },
    twitch: { border: "border-twitch-500", tab: "text-twitch-500" },
    scarlet: { border: "border-scarlet-500", tab: "text-scarlet-500" },
};

export interface WindowPanelProps {
    /** Bracketed window label shown on the top border, e.g. "streaming.exe". */
    tab: string;
    /** Chrome color - amber by default, matching the OBS [ streaming.exe ] look. */
    accent?: WindowAccent;
    children?: ReactNode;
    className?: string;
}

/**
 * Stream-overlay style window panel: dark teal-black fill, a colored border
 * and a bracketed monospace tab pill sitting on the top border, like the OBS
 * layouts ([ streaming.exe ], [ chat.dll ], ...).
 */
export class WindowPanel extends Component<WindowPanelProps> {
    override render() {
        const { tab, accent = "amber", children, className = "" } = this.props;
        const styles = WINDOW_ACCENT_CLASSES[accent];

        return (
            <div className={`relative flex h-full flex-col ${className}`}>
                <span
                    className={`absolute -top-3 left-6 z-10 rounded-full border-2 bg-panel-950 px-3 py-0.5 text-xs font-bold tracking-wider ${styles.border} ${styles.tab}`}
                >
                    [ {tab} ]
                </span>

                <div
                    className={`flex-1 rounded-2xl border-2 bg-panel-950/85 ${styles.border}`}
                >
                    {children}
                </div>
            </div>
        );
    }
}
