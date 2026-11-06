import { Component } from "react";
import { site } from "../../assets/site.ts";
import { WindowPanel } from "../layout/WindowPanel.tsx";

/**
 * Twitch player embed for the ScarletBytes stream, framed as a stream-overlay
 * style window ([ streaming.exe ]). Twitch requires the embedding hostname in
 * the `parent` parameter, so the URL is built from window.location at runtime -
 * that way it works on localhost, GitHub Pages and custom domains alike.
 */
export class LiveCard extends Component {
    override render() {
        const embedUrl = `https://player.twitch.tv/?channel=${site.twitchChannel}&parent=${window.location.hostname}`;

        return (
            <WindowPanel tab="streaming.exe" accent="amber" className="w-full">
                <div className="p-4">
                    <div className="mb-3 flex items-center gap-2">
                        <span className="size-2.5 animate-pulse rounded-full bg-amber-500" />
                        <span className="text-sm font-bold tracking-widest text-amber-500">
                            LIVE
                        </span>
                    </div>

                    <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                        <iframe
                            src={embedUrl}
                            title="ScarletBytes live stream on Twitch"
                            className="absolute inset-0 size-full border-0"
                            allowFullScreen
                        />
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                        <span className="size-2.5 rounded-full bg-amber-500" />
                        <span className="text-sm tracking-wider text-steel-500">
                            Live on Twitch
                        </span>
                    </div>
                </div>
            </WindowPanel>
        );
    }
}
