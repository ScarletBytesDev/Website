import { ArrowRight, Code } from "lucide-react";
import { Component } from "react";
import logo from "../../assets/FoxxyLogoFull.png";
import { site } from "../../assets/site.ts";
import { TwitchIcon } from "../icons/BrandIcons.tsx";
import { LiveCard } from "./LiveCard.tsx";

/**
 * Landing hero: split-color wordmark, tagline and CTAs on the left, the fox
 * mascot in the middle and the live stream card on the right.
 */
export class Hero extends Component {
    override render() {
        return (
            <section
                id="home"
                className="mx-auto grid w-full max-w-7xl items-center gap-10 px-6 py-12 lg:grid-cols-[1fr_auto_1fr] lg:py-16"
            >
                <div>
                    <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
                        <span className="bg-gradient-to-r from-scarlet-500 to-scarlet-600 bg-clip-text text-transparent">
                            Scarlet
                        </span>
                        <span className="text-ink-100">Bytes</span>
                    </h1>

                    <p className="mt-4 text-xl text-ink-300 sm:text-2xl">
                        Build. Stream. Repeat.
                    </p>

                    <div className="mt-5 h-1 w-16 rounded-full bg-scarlet-500" />

                    <div className="mt-8 flex flex-wrap gap-4">
                        <a
                            href={site.twitchUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2.5 rounded-full bg-gradient-to-r from-scarlet-600 to-scarlet-500 px-6 py-3 font-semibold text-white shadow-lg shadow-scarlet-500/25 transition-transform hover:scale-105"
                        >
                            <TwitchIcon className="size-5" />
                            Watch on Twitch
                            <ArrowRight className="size-5" />
                        </a>

                        <a
                            href="#projects"
                            className="flex items-center gap-2.5 rounded-full border border-ink-800 bg-ink-900/60 px-6 py-3 font-semibold text-ink-100 transition-colors hover:border-scarlet-500"
                        >
                            <Code className="size-5" />
                            Explore Projects
                        </a>
                    </div>
                </div>

                <img
                    src={logo}
                    alt="Foxxy, the ScarletBytes mascot"
                    className="mx-auto h-64 w-auto drop-shadow-2xl sm:h-80 lg:h-[26rem]"
                />

                <div className="flex justify-center lg:justify-end">
                    <LiveCard />
                </div>
            </section>
        );
    }
}
