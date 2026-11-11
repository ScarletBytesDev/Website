import { Component } from "react";
import { socialLinks } from "../../assets/sociallinks.ts";

/** Row of social link buttons, driven by src/assets/sociallinks.json. */
export class SocialLinks extends Component {
    override render() {
        return (
            <nav
                aria-label="Social links"
                className="mt-3 flex flex-wrap items-center justify-center gap-3"
            >
                {socialLinks.map(({ platform, label, href, icon: Icon }) => (
                    <a
                        key={platform}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 rounded-full border border-ink-500/50 bg-panel-950/60 px-4 py-2 text-sm font-medium text-ink-200 transition-colors hover:border-amber-500 hover:text-amber-500"
                    >
                        <Icon className="size-4" />
                        {label}
                    </a>
                ))}
            </nav>
        );
    }
}
