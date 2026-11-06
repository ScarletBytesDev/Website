import { ArrowRight } from "lucide-react";
import { Component } from "react";
import {
    isExternalHref,
    type NavigationAccent,
    type NavigationItem,
    navigation,
} from "../../assets/navigation.ts";

const ACCENT_STYLES: Record<
    NavigationAccent,
    { border: string; iconBox: string; icon: string; arrow: string }
> = {
    scarlet: {
        border: "border-scarlet-500/50 hover:border-scarlet-500",
        iconBox: "bg-scarlet-500/10",
        icon: "text-scarlet-500",
        arrow: "text-scarlet-500",
    },
    purple: {
        border: "border-twitch-500/50 hover:border-twitch-500",
        iconBox: "bg-twitch-500/10",
        icon: "text-twitch-500",
        arrow: "text-twitch-500",
    },
};

/** Section cards linking to the site's main areas, driven by navigation.json. */
export class FeatureCards extends Component {
    private renderCard(item: NavigationItem) {
        const styles = ACCENT_STYLES[item.accent];
        const Icon = item.icon;

        return (
            <a
                key={item.label}
                href={item.href}
                target={isExternalHref(item.href) ? "_blank" : undefined}
                rel={isExternalHref(item.href) ? "noreferrer" : undefined}
                className={`group flex items-center gap-5 rounded-2xl border-2 bg-ink-950/40 p-6 transition-colors ${styles.border}`}
            >
                {Icon && (
                    <span
                        className={`flex size-14 shrink-0 items-center justify-center rounded-xl ${styles.iconBox}`}
                    >
                        <Icon className={`size-8 ${styles.icon}`} />
                    </span>
                )}

                <span className="flex-1 text-left">
                    <span className="block text-2xl font-bold text-ink-100">
                        {item.label}
                    </span>
                    {item.description && (
                        <span className="mt-1 block text-sm text-ink-400">
                            {item.description}
                        </span>
                    )}
                </span>

                <ArrowRight
                    className={`size-6 shrink-0 transition-transform group-hover:translate-x-1 ${styles.arrow}`}
                />
            </a>
        );
    }

    override render() {
        const cards = navigation.filter((item) => item.description);

        return (
            <section className="mx-auto grid w-full max-w-7xl gap-6 px-6 pb-16 md:grid-cols-3">
                {cards.map((item) => this.renderCard(item))}
            </section>
        );
    }
}
