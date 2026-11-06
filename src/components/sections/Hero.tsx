import { Component } from "react";
import logo from "../../assets/FoxxyLogoFull.png";

/**
 * Landing hero: split-color wordmark and tagline on the left, the fox mascot
 * in the middle.
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
                </div>

                <img
                    src={logo}
                    alt="Foxxy, the ScarletBytes mascot"
                    className="mx-auto h-64 w-auto drop-shadow-2xl sm:h-80 lg:h-[26rem]"
                />
            </section>
        );
    }
}
