import { Component } from "react";
import { Gamepad2 } from "lucide-react";
import { socialLinks } from "./assets/sociallinks.ts";
import { DitherGridBackground } from "./components/dither/DitherGridBackground.tsx";
import { SiteFooter } from "./components/layout/SiteFooter.tsx";
import { SiteHeader } from "./components/layout/SiteHeader.tsx";
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

          <main className="flex flex-1 flex-col items-center justify-center gap-8 px-6 text-ink-100">
            <Gamepad2 className="size-16 text-scarlet-500" strokeWidth={1.5} />

            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                ScarletBytesDev
              </h1>
              <p className="mt-3 text-lg text-ink-400">
                Streaming, projects, and more — coming soon.
              </p>
            </div>

            <nav className="flex flex-wrap items-center justify-center gap-4">
              {socialLinks.map(({ platform, label, href, icon: Icon }) => (
                <a
                  key={platform}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full border border-ink-800 bg-ink-900 px-5 py-2.5 text-sm font-medium text-ink-200 transition-colors hover:border-scarlet-500 hover:text-white"
                >
                  <Icon className="size-4" />
                  {label}
                </a>
              ))}
            </nav>
          </main>

          <SiteFooter />
        </div>
      </DitherGridBackground>
    );
  }
}
