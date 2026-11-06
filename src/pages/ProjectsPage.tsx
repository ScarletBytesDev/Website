import { Component } from "react";
import { type Project, projects } from "../assets/projects.ts";
import { WindowPanel } from "../components/layout/WindowPanel.tsx";

function toTabName(name: string): string {
    return `${name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")}.dll`;
}

/** Projects view: window-panel cards driven by src/assets/projects.json. */
export class ProjectsPage extends Component {
    private renderCard(project: Project) {
        const Icon = project.icon;

        return (
            <WindowPanel
                key={project.name}
                tab={toTabName(project.name)}
                accent="scarlet"
            >
                <div className="flex h-full items-center gap-5 p-6">
                    {Icon && (
                        <span className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-scarlet-500/40 bg-ink-950/60">
                            <Icon className="size-8 text-scarlet-500" />
                        </span>
                    )}

                    <span className="flex-1 text-left">
                        <span className="block text-xl font-bold text-ink-100">
                            {project.name}
                        </span>
                        <span className="mt-1 block text-sm tracking-wide text-steel-500">
                            {project.description}
                        </span>
                    </span>

                    {project.links.length > 0 && (
                        <span className="flex shrink-0 flex-wrap justify-end gap-2">
                            {project.links.map((link) => {
                                const LinkIcon = link.icon;
                                return (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-2 rounded-full border border-steel-500/50 px-4 py-2 text-sm font-medium text-ink-200 transition-colors hover:border-amber-500 hover:text-amber-500"
                                    >
                                        {LinkIcon && (
                                            <LinkIcon className="size-4" />
                                        )}
                                        {link.label}
                                    </a>
                                );
                            })}
                        </span>
                    )}
                </div>
            </WindowPanel>
        );
    }

    override render() {
        return (
            <section className="mx-auto w-full max-w-7xl px-6 py-12">
                <h1 className="text-4xl font-bold tracking-tight text-ink-100">
                    Projects
                </h1>
                <p className="mt-2 text-lg tracking-wide text-steel-500">
                    Open source &amp; creative tools.
                </p>

                {projects.length === 0 ? (
                    <p className="mt-10 text-steel-500">
                        Projects are coming soon - check back later.
                    </p>
                ) : (
                    <div className="mt-12 flex flex-col gap-10">
                        {projects.map((project) => this.renderCard(project))}
                    </div>
                )}
            </section>
        );
    }
}
