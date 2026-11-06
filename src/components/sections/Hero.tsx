import { Component } from "react";
import logo from "../../assets/FoxxyLogoFull.png";

/**
 * Landing hero: split-color wordmark and tagline on the left, the fox mascot
 * to the right (stacked on small screens).
 */
export class Hero extends Component {
    override render() {
        return (
            <section className="mx-auto grid w-full max-w-7xl items-center gap-10 px-6 py-12 sm:grid-cols-2 lg:py-16">
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
                </div>

                <div className="flex justify-center lg:justify-end">
                    <img
                        src={logo}
                        alt="Foxxy, the ScarletBytes mascot"
                        className="mx-auto h-64 w-auto drop-shadow-2xl sm:h-80 lg:h-[26rem] "
                    />
                </div>
            </section>
        );
    }
}
