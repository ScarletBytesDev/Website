import { Component } from "react";
import logo from "../../assets/FoxxyLogoFull.png";
import { WindowPanel } from "../layout/WindowPanel.tsx";

/**
 * Landing hero as a stream-overlay style window ([ scarletbytes.exe ]):
 * split-color wordmark, tagline and placeholder copy on the left, the fox
 * mascot to the right (stacked on small screens).
 */
export class Hero extends Component {
    override render() {
        return (
            <section className="mx-auto w-full max-w-7xl px-6 py-12 lg:py-16">
                <WindowPanel tab="scarletbytes.exe" accent="scarlet">
                    <div className="grid items-center gap-10 p-8 sm:grid-cols-2 lg:p-12">
                        <div>
                            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
                                <span className="text-scarlet-500">
                                    Scarlet
                                </span>
                                <span className="text-ink-100">Bytes</span>
                            </h1>

                            <p className="mt-4 text-xl text-ink-300 sm:text-2xl">
                                Build. Stream. Repeat.
                            </p>

                            <div className="mt-5 h-1 w-16 rounded-full bg-scarlet-500" />

                            <p className="mt-6 max-w-xl leading-relaxed text-ink-300">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo
                                consequat.
                            </p>
                        </div>

                        <div className="flex justify-center lg:justify-end">
                            <img
                                src={logo}
                                alt="Foxxy, the ScarletBytes mascot"
                                className="mx-auto h-64 w-auto drop-shadow-2xl sm:h-80 lg:h-[26rem]"
                            />
                        </div>
                    </div>
                </WindowPanel>
            </section>
        );
    }
}
