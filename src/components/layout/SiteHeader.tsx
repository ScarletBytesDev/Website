import { Component } from "react";
import { Menu, X } from "lucide-react";
import logo from "../../assets/FoxxyLogoFull.png";
import { navigation, type NavigationItem } from "../../assets/navigation.ts";

export interface SiteHeaderProps {
  motionEnabled: boolean;
  onToggleMotion: () => void;
}

interface SiteHeaderState {
  menuOpen: boolean;
}

/**
 * Site header: brand on the left, section links centered, motion toggle on
 * the right. On mobile the brand centers and everything else moves into a
 * burger menu. The links come from src/assets/navigation.json so new
 * sections can be added without touching this component.
 */
export class SiteHeader extends Component<SiteHeaderProps, SiteHeaderState> {
  constructor(props: SiteHeaderProps) {
    super(props);
    this.state = { menuOpen: false };
  }

  private handleToggleMenu = () => {
    this.setState((prev) => ({ menuOpen: !prev.menuOpen }));
  };

  private handleCloseMenu = () => {
    this.setState({ menuOpen: false });
  };

  private renderNavLabel(item: NavigationItem) {
    const Icon = item.icon;
    return (
      <>
        {Icon && <Icon className="size-4" />}
        {item.label}
      </>
    );
  }

  private renderBrand(className: string) {
    return (
      <a href="/" className={className}>
        <img
          src={logo}
          alt="ScarletBytes fox logo"
          className="h-8 w-auto md:h-9"
        />
        <span className="text-lg font-bold text-ink-100 sm:text-xl">
          ScarletBytes
        </span>
      </a>
    );
  }

  private renderMotionToggle() {
    const { motionEnabled, onToggleMotion } = this.props;

    return (
      <button
        type="button"
        role="switch"
        aria-checked={motionEnabled}
        onClick={onToggleMotion}
        className="flex items-center gap-2.5"
      >
        <span className="text-sm font-medium text-ink-300">Motion</span>
        <span
          className={`relative inline-block h-6 w-11 rounded-full transition-colors ${
            motionEnabled ? "bg-scarlet-500" : "bg-ink-800"
          }`}
        >
        <span
          className={`absolute left-0.5 top-0.5 size-5 rounded-full bg-white transition-transform ${
            motionEnabled ? "translate-x-5" : "translate-x-0"
          }`}
        />
        </span>
      </button>
    );
  }

  override render() {
    const { menuOpen } = this.state;

    return (
      <header className="relative z-20 flex items-center gap-4 px-4 py-3 sm:px-6">
        <div className="flex flex-1 items-center">
          <button
            type="button"
            onClick={this.handleToggleMenu}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="rounded-full p-2 text-ink-200 transition-colors hover:bg-ink-900 md:hidden"
          >
            {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>

          {this.renderBrand("hidden items-center gap-3 md:flex")}
        </div>

        <div className="flex flex-1 items-center justify-center">
          <nav className="hidden items-center gap-2 md:flex">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-ink-300 transition-colors hover:bg-ink-900 hover:text-ink-100"
              >
                {this.renderNavLabel(item)}
              </a>
            ))}
          </nav>

          {this.renderBrand("flex items-center gap-2.5 md:hidden")}
        </div>

        <div className="flex flex-1 items-center justify-end">
          <div className="hidden md:block">{this.renderMotionToggle()}</div>
        </div>

        {menuOpen && (
          <div
            data-testid="mobile-menu"
            className="absolute inset-x-0 top-full z-30 flex flex-col gap-1 border-b border-ink-800 bg-ink-950/95 p-4 md:hidden"
          >
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={this.handleCloseMenu}
                className="flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-ink-200 transition-colors hover:bg-ink-900 hover:text-ink-100"
              >
                {this.renderNavLabel(item)}
              </a>
            ))}

            <div className="mt-2 border-t border-ink-800 pt-3">
              {this.renderMotionToggle()}
            </div>
          </div>
        )}
      </header>
    );
  }
}
