import { Component } from "react";
import { type Project, projects } from "../assets/projects.ts";

/** Projects view: a card list driven by src/assets/projects.json. */
export class ProjectsPage extends Component {
    private renderCard(project: Project) {
        const Icon = project.icon;

        return (
            <div
                key={project.name}
                className="flex items-center gap-5 rounded-2xl border-2 border-scarlet-500/50 bg-ink-950/40 p-6 transition-colors hover:border-scarlet-500"
            >
                {Icon && (
                    <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-scarlet-500/10">
                        <Icon className="size-8 text-scarlet-500" />
                    </span>
                )}

                <span className="flex-1 text-left">
                    <span className="block text-xl font-bold text-ink-100">
                        {project.name}
                    </span>
                    <span className="mt-1 block text-sm text-ink-400">
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
                                    className="flex items-center gap-2 rounded-full border border-ink-800 bg-ink-900/60 px-4 py-2 text-sm font-medium text-ink-100 transition-colors hover:border-scarlet-500"
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
        );
    }

    override render() {
        return (
            <section className="mx-auto w-full max-w-7xl px-6 py-12">
                <h1 className="text-4xl font-bold tracking-tight text-ink-100">
                    Projects
                </h1>
                <p className="mt-2 text-lg text-ink-400">
                    Open source & creative tools.
                </p>

                {projects.length === 0 ? (
                    <p className="mt-10 text-ink-400">
                        Projects are coming soon — check back later.
                    </p>
                ) : (
                    <div className="mt-10 flex flex-col gap-6">
                        {projects.map((project) => this.renderCard(project))}
                    </div>
                )}
            </section>
        );
    }
}
