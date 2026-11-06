import { Component } from "react";
import { DitherGridBackground } from "./components/dither/DitherGridBackground.tsx";
import { SiteFooter } from "./components/layout/SiteFooter.tsx";
import { SiteHeader } from "./components/layout/SiteHeader.tsx";
import { FeatureCards } from "./components/sections/FeatureCards.tsx";
import { Hero } from "./components/sections/Hero.tsx";
import { preferences } from "./services/Preferences.ts";

interface AppState {
  motionEnabled: boolean;
}

export default class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = { motionEnabled: preferences.get("motionEnabled") };
  }

  private handleToggleMotion = () => {
    const motionEnabled = !this.state.motionEnabled;
    preferences.set("motionEnabled", motionEnabled);
    this.setState({ motionEnabled });
  };

  override render() {
    const { motionEnabled } = this.state;

    return (
      <DitherGridBackground
        className="min-h-screen w-full"
        animateNoise={motionEnabled}
        animateGlow={motionEnabled}
      >
        <div className="flex min-h-screen flex-col">
          <SiteHeader
            motionEnabled={motionEnabled}
            onToggleMotion={this.handleToggleMotion}
          />

          <main className="flex-1">
            <Hero />
            <FeatureCards />
          </main>

          <SiteFooter />
        </div>
      </DitherGridBackground>
    );
  }
}
