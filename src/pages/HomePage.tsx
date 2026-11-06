import { Component } from "react";
import { FeatureCards } from "../components/sections/FeatureCards.tsx";
import { Hero } from "../components/sections/Hero.tsx";
import { LiveCard } from "../components/sections/LiveCard.tsx";

/** Landing view: hero, the section cards and the live stream card. */
export class HomePage extends Component {
    override render() {
        return (
            <>
                <Hero />
                <FeatureCards />

                <section className="mx-auto w-full max-w-7xl px-6 pb-16">
                    <LiveCard />
                </section>
            </>
        );
    }
}
