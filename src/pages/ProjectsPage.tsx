import { Component } from "react";
import { projects } from "../assets/projects.ts";
import { WindowPanel } from "../components/layout/WindowPanel.tsx";
import { ProjectNode, toTabName } from "../components/sections/ProjectNode.tsx";

/**
 * Projects view: window-panel cards driven by src/assets/projects.json.
 * Projects may nest sub-projects; see ProjectNode for the tree rendering.
 */
export class ProjectsPage extends Component {
    override render() {
        return (
            <section className="mx-auto w-full max-w-7xl px-6 py-12">
                <WindowPanel tab={toTabName("projects")} accent="amber">
                    <div className="h-full items-center gap-5 p-6">
                        <h1 className="text-4xl font-bold tracking-tight text-ink-100">
                            Projects
                        </h1>
                        <p className="mt-2 text-lg tracking-wide text-ink-500">
                            Open source &amp; creative tools.
                        </p>
                    </div>
                </WindowPanel>

                {projects.length === 0 ? (
                    <p className="mt-10 text-ink-500">
                        Projects are coming soon - check back later.
                    </p>
                ) : (
                    <div className="mt-12 flex flex-col gap-10">
                        {projects.map((project) => (
                            <ProjectNode key={project.name} project={project} />
                        ))}
                    </div>
                )}
            </section>
        );
    }
}
