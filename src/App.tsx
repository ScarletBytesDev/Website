import { Component } from "react";
import { DitherGridBackground } from "./components/dither/DitherGridBackground.tsx";
import { SiteFooter } from "./components/layout/SiteFooter.tsx";
import { SiteHeader } from "./components/layout/SiteHeader.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import { ProjectsPage } from "./pages/ProjectsPage.tsx";
import { parseRoute } from "./routing.ts";
import { preferences } from "./services/Preferences.ts";

interface AppState {
  motionEnabled: boolean;
  hash: string;
}

export default class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      motionEnabled: preferences.get("motionEnabled"),
      hash: window.location.hash,
    };
  }

  override componentDidMount(): void {
    window.addEventListener("hashchange", this.handleHashChange);
  }

  override componentWillUnmount(): void {
    window.removeEventListener("hashchange", this.handleHashChange);
  }

  private handleHashChange = () => {
    this.setState({ hash: window.location.hash });
  };

  private handleToggleMotion = () => {
    const motionEnabled = !this.state.motionEnabled;
    preferences.set("motionEnabled", motionEnabled);
    this.setState({ motionEnabled });
  };

  override render() {
    const { motionEnabled, hash } = this.state;

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
            {parseRoute(hash) === "projects" ? <ProjectsPage /> : <HomePage />}
          </main>

          <SiteFooter />
        </div>
      </DitherGridBackground>
    );
  }
}
