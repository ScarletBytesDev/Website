import { Component } from "react";
import { FeatureCards } from "../components/sections/FeatureCards.tsx";
import { Hero } from "../components/sections/Hero.tsx";

/** Landing view: hero and the section cards. */
export class HomePage extends Component {
  override render() {
    return (
      <>
        <Hero />
        <FeatureCards />
      </>
    );
  }
}
