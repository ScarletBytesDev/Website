import { DitherGridBackground } from "@code-of-chaos/dither/react";
import { Component } from "react";
import { SiteFooter } from "./components/layout/SiteFooter.tsx";
import { SiteHeader } from "./components/layout/SiteHeader.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import { ProjectsPage } from "./pages/ProjectsPage.tsx";
import { parseRoute } from "./routing.ts";
import { preferences } from "./services/Preferences.ts";

interface AppState {
    motionEnabled: boolean;
    lightMode: boolean;
    hash: string;
}

export default class App extends Component<object, AppState> {
    constructor(props: object) {
        super(props);
        this.state = {
            motionEnabled: preferences.get("motionEnabled"),
            lightMode: preferences.get("lightMode"),
            hash: window.location.hash,
        };
        this.applyTheme(this.state.lightMode);
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

    private handleToggleTheme = () => {
        const lightMode = !this.state.lightMode;
        preferences.set("lightMode", lightMode);
        this.applyTheme(lightMode);
        this.setState({ lightMode });
    };

    private applyTheme(lightMode: boolean): void {
        document.documentElement.dataset.theme = lightMode ? "light" : "dark";
        const themeColor = getComputedStyle(document.documentElement)
            .getPropertyValue("--theme-color")
            .trim();
        document
            .querySelector('meta[name="theme-color"]')
            ?.setAttribute("content", themeColor);
    }

    override render() {
        const { motionEnabled, lightMode, hash } = this.state;

        return (
            <>
                <div className="fixed inset-0">
                    <DitherGridBackground
                        className="h-full w-full"
                        animateNoise={motionEnabled}
                        animateGlow={true}
                        gridColor="var(--dither-grid)"
                        noiseColor="var(--dither-noise)"
                        noiseAngle={-90}
                        noiseSpeed={16}
                    />
                </div>

                <div className="relative flex min-h-screen flex-col">
                    <SiteHeader
                        motionEnabled={motionEnabled}
                        onToggleMotion={this.handleToggleMotion}
                        lightMode={lightMode}
                        onToggleTheme={this.handleToggleTheme}
                    />

                    <main className="flex-1">
                        {parseRoute(hash) === "projects" ? (
                            <ProjectsPage />
                        ) : (
                            <HomePage />
                        )}
                    </main>

                    <SiteFooter />
                </div>
            </>
        );
    }
}
