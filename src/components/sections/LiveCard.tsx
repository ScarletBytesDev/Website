import { Component, createRef } from "react";
import { site } from "../../assets/site.ts";
import { WindowPanel } from "../layout/WindowPanel.tsx";

interface LiveCardState {
    visible: boolean;
}

/**
 * Twitch player embed for the ScarletBytes stream, framed as a stream-overlay
 * style window ([ streaming.exe ]). Twitch requires the embedding hostname in
 * the `parent` parameter, so the URL is built from window.location at runtime -
 * that way it works on localhost, GitHub Pages and custom domains alike.
 *
 * The iframe is lazy-loaded via IntersectionObserver so the Twitch player
 * bundle is only fetched when the card scrolls into view. This prevents the
 * "Autoplay disabled: viewport visibility" error and defers the player until
 * it is actually visible.
 */
export class LiveCard extends Component<object, LiveCardState> {
    private readonly containerRef = createRef<HTMLDivElement>();
    private observer?: IntersectionObserver;

    constructor(props: object) {
        super(props);
        this.state = { visible: typeof IntersectionObserver === "undefined" };
    }

    override componentDidMount(): void {
        if (this.state.visible) return;

        const el = this.containerRef.current;
        if (!el) return;

        this.observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting) {
                    this.setState({ visible: true });
                    this.observer?.disconnect();
                }
            },
            { rootMargin: "100px" },
        );
        this.observer.observe(el);
    }

    override componentWillUnmount(): void {
        this.observer?.disconnect();
    }

    override render() {
        const { visible } = this.state;
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

                    <div
                        ref={this.containerRef}
                        className="relative aspect-video w-full overflow-hidden rounded-xl"
                    >
                        {visible && (
                            <iframe
                                src={embedUrl}
                                title="ScarletBytes live stream on Twitch"
                                className="absolute inset-0 size-full border-0"
                                allowFullScreen
                            />
                        )}
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
