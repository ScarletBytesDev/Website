import type { ReactNode } from "react";

export interface PreferenceToggleProps {
    label: string;
    ariaLabel: string;
    checked: boolean;
    onToggle: () => void;
    activeClassName: string;
    activeIcon?: ReactNode;
    inactiveIcon?: ReactNode;
}

/** Shared switch control for persistent site preferences. */
export function PreferenceToggle({
    label,
    ariaLabel,
    checked,
    onToggle,
    activeClassName,
    activeIcon,
    inactiveIcon,
}: PreferenceToggleProps) {
    return (
        <button
            type="button"
            role="switch"
            aria-label={ariaLabel}
            aria-checked={checked}
            onClick={onToggle}
            className="flex items-center gap-2.5"
        >
            <span className="text-sm font-medium text-steel-300">{label}</span>
            <span
                className={`relative inline-block h-6 w-11 rounded-full transition-colors ${
                    checked ? activeClassName : "bg-steel-800"
                }`}
            >
                <span
                    className={`absolute left-0.5 top-0.5 flex size-5 items-center justify-center rounded-full bg-steel-200 transition-transform ${
                        checked ? "translate-x-5" : "translate-x-0"
                    }`}
                >
                    {checked ? activeIcon : inactiveIcon}
                </span>
            </span>
        </button>
    );
}
