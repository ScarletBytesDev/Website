import { ArrowRight } from "lucide-react";
import { Component } from "react";
import {
    isExternalHref,
    type NavigationAccent,
    type NavigationItem,
    navigation,
} from "../../assets/navigation.ts";
import { WindowPanel } from "../layout/WindowPanel.tsx";

const ACCENT_STYLES: Record<
    NavigationAccent,
    { panel: "twitch" | "ice"; icon: string; iconBox: string }
> = {
    scarlet: {
        panel: "ice",
        icon: "text-scarlet-500",
        iconBox: "border-scarlet-500/40",
    },
    purple: {
        panel: "twitch",
        icon: "text-twitch-500",
        iconBox: "border-twitch-500/40",
    },
};

/** Section cards linking to the site's main areas, driven by navigation.json. */
export class FeatureCards extends Component {
    private renderCard(item: NavigationItem) {
        const styles = ACCENT_STYLES[item.accent];
        const Icon = item.icon;
        const external = isExternalHref(item.href);

        return (
            <WindowPanel
                key={item.label}
                tab={`${item.label.toLowerCase().replaceAll(" ", "-")}.dll`}
                accent={styles.panel}
            >
                <a
                    href={item.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    className="group flex items-center gap-5 p-6"
                >
                    {Icon && (
                        <span
                            className={`flex size-14 shrink-0 items-center justify-center rounded-xl border bg-ink-950/60 ${styles.iconBox}`}
                        >
                            <Icon className={`size-8 ${styles.icon}`} />
                        </span>
                    )}

                    <span className="flex-1 text-left">
                        <span className="block text-2xl font-bold text-ink-100">
                            {item.label}
                        </span>
                        {item.description && (
                            <span className="mt-1 block text-sm tracking-wide text-steel-500">
                                {item.description}
                            </span>
                        )}
                    </span>

                    <ArrowRight className="size-6 shrink-0 text-amber-500 transition-transform group-hover:translate-x-1" />
                </a>
            </WindowPanel>
        );
    }

    override render() {
        const cards = navigation.filter((item) => item.description);

        return (
            <section className="mx-auto grid w-full max-w-7xl gap-8 px-6 pb-16 pt-4 md:grid-cols-3">
                {cards.map((item) => this.renderCard(item))}
            </section>
        );
    }
}
