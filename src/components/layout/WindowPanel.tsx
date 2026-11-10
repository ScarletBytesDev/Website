import type { CSSProperties, ReactNode } from "react";
import { Component } from "react";
import { windowDitherTile } from "./windowDither.ts";
import "./WindowPanel.css";

/** Panel chrome color: amber (streaming.exe), twitch purple, or default. */
export type WindowAccent = "amber" | "twitch" | "default";

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
    default: { border: "border-steel-600", tab: "text-steel-600" },
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
 * layouts ([ streaming.exe ], [ chat.dll ], ...). A static steel dither
 * overlay (see WindowPanel.css) sits on top of the fill and fades out from
 * right to left.
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
                    className={`relative flex flex-1 flex-col overflow-hidden rounded-2xl border-2 bg-panel-950/85 ${styles.border}`}
                    style={
                        {
                            "--window-panel-dither": `url("${windowDitherTile}")`,
                        } as CSSProperties
                    }
                >
                    <div className="window-panel__dither" aria-hidden="true" />

                    <div className="relative z-1 flex flex-1 flex-col">
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}
