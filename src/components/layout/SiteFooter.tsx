import { Component } from "react";
import { Heart } from "lucide-react";

/**
 * Footer banner matching the header's translucent ink. A scarlet line runs
 * left to right through the middle, interrupted by the centered tagline.
 */
export class SiteFooter extends Component {
  override render() {
    return (
      <footer className="relative z-20 bg-ink-950/80 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-4">
          <span className="h-px flex-1 bg-scarlet-500" aria-hidden="true" />

          <p className="flex items-center gap-2 text-sm font-medium text-scarlet-500">
            Good code. Good Vibes
            <Heart
              className="size-4 fill-scarlet-500 text-scarlet-500"
              aria-hidden="true"
            />
          </p>

          <span className="h-px flex-1 bg-scarlet-500" aria-hidden="true" />
        </div>
      </footer>
    );
  }
}
