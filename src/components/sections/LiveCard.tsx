import { Component } from "react";
import { site } from "../../assets/site.ts";

/**
 * Twitch player embed for the ScarletBytes stream, framed like the design's
 * live card. Twitch requires the embedding hostname in the `parent` parameter,
 * so the URL is built from window.location at runtime — that way it works on
 * localhost, GitHub Pages and custom domains alike.
 */
export class LiveCard extends Component {
    override render() {
        const embedUrl = `https://player.twitch.tv/?channel=${site.twitchChannel}&parent=${window.location.hostname}`;

        return (
            <div className="relative w-full max-w-sm">
                <div
                    className="absolute -top-3 right-6 flex gap-1"
                    aria-hidden="true"
                >
                    <span className="h-6 w-1.5 rotate-12 rounded-full bg-scarlet-500" />
                    <span className="h-4 w-1.5 rotate-12 rounded-full bg-scarlet-500" />
                </div>

                <div className="rounded-3xl border border-scarlet-500/60 bg-ink-950/80 p-4 shadow-2xl shadow-scarlet-500/10">
                    <div className="mb-3 flex items-center gap-2">
                        <span className="size-2.5 animate-pulse rounded-full bg-scarlet-500" />
                        <span className="text-sm font-bold tracking-wider text-ink-100">
                            LIVE
                        </span>
                    </div>

                    <iframe
                        src={embedUrl}
                        title="ScarletBytes live stream on Twitch"
                        className="aspect-video w-full rounded-2xl border-0"
                        allowFullScreen
                    />

                    <div className="mt-3 flex items-center gap-2">
                        <span className="size-2.5 rounded-full bg-scarlet-500" />
                        <span className="text-sm font-medium text-ink-300">
                            Live on Twitch
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
