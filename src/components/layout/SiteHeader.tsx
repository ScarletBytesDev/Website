import { Menu, Moon, Sun, X } from "lucide-react";
import { Component } from "react";
import logo from "../../assets/FoxxyLogoFull.png";
import {
    isExternalHref,
    type NavigationItem,
    navigation,
} from "../../assets/navigation.ts";
import { PreferenceToggle } from "./PreferenceToggle.tsx";

export interface SiteHeaderProps {
    motionEnabled: boolean;
    onToggleMotion: () => void;
    lightMode: boolean;
    onToggleTheme: () => void;
}

interface SiteHeaderState {
    menuOpen: boolean;
    hash: string;
}

/**
 * Site header: brand on the left, section links centered and the motion
 * toggle on the right. The current section (by URL hash) is highlighted. On
 * mobile the brand centers and everything else moves into a burger menu.
 * Links come from src/assets/navigation.json.
 */
export class SiteHeader extends Component<SiteHeaderProps, SiteHeaderState> {
    constructor(props: SiteHeaderProps) {
        super(props);
        this.state = { menuOpen: false, hash: window.location.hash };
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

    private handleToggleMenu = () => {
        this.setState((prev) => ({ menuOpen: !prev.menuOpen }));
    };

    private handleCloseMenu = () => {
        this.setState({ menuOpen: false });
    };

    private isActive(item: NavigationItem): boolean {
        const hash = this.state.hash || "#home";
        return item.href === hash;
    }

    private renderBrand(className: string) {
        return (
            <a href="#home" className={className}>
                <img
                    src={logo}
                    alt="ScarletBytes fox logo"
                    className="h-9 w-auto md:h-10"
                />
                <span className="text-xl font-bold">
                    <span className="text-scarlet-500">Scarlet</span>
                    <span className="text-ink-100">Bytes</span>
                </span>
            </a>
        );
    }

    override render() {
        const { menuOpen } = this.state;
        const { motionEnabled, onToggleMotion, lightMode, onToggleTheme } =
            this.props;
        const toggles = (
            <>
                <PreferenceToggle
                    label="Motion"
                    ariaLabel="Motion"
                    checked={motionEnabled}
                    onToggle={onToggleMotion}
                    activeClassName="bg-scarlet-600"
                />
                <PreferenceToggle
                    label="Theme"
                    ariaLabel="Light mode"
                    checked={lightMode}
                    onToggle={onToggleTheme}
                    activeClassName="bg-scarlet-600"
                    activeIcon={<Sun className="size-4 text-scarlet-600" />}
                    inactiveIcon={<Moon className="size-4 text-steel-800" />}
                />
            </>
        );

        return (
            <header className="sticky top-0 z-20 flex items-center gap-4 bg-ink-900/80 px-4 py-3 sm:px-6">
                <div className="flex flex-1 items-center">
                    <button
                        type="button"
                        onClick={this.handleToggleMenu}
                        aria-expanded={menuOpen}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        className="rounded-full p-2 text-ink-200 transition-colors hover:bg-ink-900 md:hidden"
                    >
                        {menuOpen ? (
                            <X className="size-6" />
                        ) : (
                            <Menu className="size-6" />
                        )}
                    </button>

                    {this.renderBrand("hidden items-center gap-3 md:flex")}
                </div>

                <div className="flex flex-1 items-center justify-center">
                    <nav className="hidden items-center gap-2 md:flex">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const external = isExternalHref(item.href);
                            return (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    target={external ? "_blank" : undefined}
                                    rel={external ? "noreferrer" : undefined}
                                    className={`flex items-center gap-2 border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                                        this.isActive(item)
                                            ? "border-amber-500 text-amber-500"
                                            : "border-transparent text-ink-300 hover:text-ink-100"
                                    }`}
                                >
                                    {Icon && <Icon className="size-4" />}
                                    {item.label}
                                </a>
                            );
                        })}
                    </nav>

                    {this.renderBrand("flex items-center gap-2.5 md:hidden")}
                </div>

                <div className="flex flex-1 items-center justify-end gap-4">
                    <div className="hidden items-center gap-4 md:flex">
                        {toggles}
                    </div>
                </div>

                <div
                    data-testid="mobile-menu"
                    className={`absolute inset-x-0 top-full z-30 flex flex-col gap-1 border-b border-ink-800 bg-ink-950/95 p-4 transition-[opacity,visibility,transform] duration-200 ease-in motion-reduce:transition-none md:hidden ${
                        menuOpen
                            ? "pointer-events-auto visible translate-y-0 opacity-100"
                            : "pointer-events-none invisible -translate-y-2 opacity-0"
                    }`}
                >
                    {navigation.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            target={
                                isExternalHref(item.href) ? "_blank" : undefined
                            }
                            rel={
                                isExternalHref(item.href)
                                    ? "noreferrer"
                                    : undefined
                            }
                            onClick={this.handleCloseMenu}
                            className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors hover:bg-ink-900 ${
                                this.isActive(item)
                                    ? "text-amber-500"
                                    : "text-ink-200 hover:text-ink-100"
                            }`}
                        >
                            {item.icon && <item.icon className="size-4" />}
                            {item.label}
                        </a>
                    ))}

                    <div className="mt-2 border-t border-ink-800 pt-3">
                        <div className="flex flex-row w-full justify-between">
                            {toggles}
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}
