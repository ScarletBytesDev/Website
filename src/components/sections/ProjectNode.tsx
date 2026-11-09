import { ChevronRight } from "lucide-react";
import { Component } from "react";
import type { Project } from "../../assets/projects.ts";
import { WindowPanel } from "../layout/WindowPanel.tsx";

/** Window tab label for a project name, e.g. "This Website" -> "this-website.dll". */
export function toTabName(name: string): string {
    return `${name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")}.dll`;
}

export interface ProjectNodeProps {
    project: Project;
}

interface ProjectNodeState {
    expanded: boolean;
}

/**
 * One project card in the projects tree. A project with sub-projects gets an
 * expand/collapse chevron on its card and its children nested underneath,
 * joined by tree guide lines. Nodes start expanded; that state is local and
 * resets whenever the page remounts.
 */
export class ProjectNode extends Component<ProjectNodeProps, ProjectNodeState> {
    constructor(props: ProjectNodeProps) {
        super(props);
        this.state = { expanded: true };
    }

    private handleToggle = () => {
        this.setState((prev) => ({ expanded: !prev.expanded }));
    };

    private renderCard() {
        const { project } = this.props;
        const { expanded } = this.state;
        const Icon = project.icon;
        const hasChildren = project.children.length > 0;

        return (
            <WindowPanel tab={toTabName(project.name)} accent="scarlet">
                <div className="flex h-full items-center gap-5 p-6">
                    {hasChildren && (
                        <button
                            type="button"
                            onClick={this.handleToggle}
                            aria-expanded={expanded}
                            aria-label={`${expanded ? "Collapse" : "Expand"} ${project.name}`}
                            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-steel-500/50 bg-panel-950/85 text-steel-500 transition-colors hover:border-amber-500 hover:text-amber-500"
                        >
                            <ChevronRight
                                className={`size-5 transition-transform ${expanded ? "rotate-90" : ""}`}
                            />
                        </button>
                    )}

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
                                        className="flex items-center gap-2 rounded-full border border-steel-500/50 px-4 py-2 text-sm font-medium text-ink-200 transition-colors hover:border-amber-500 hover:text-amber-500 bg-panel-950/85"
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

    private renderChildren() {
        const { project } = this.props;
        const { expanded } = this.state;

        if (!expanded || project.children.length === 0) {
            return null;
        }

        return (
            <div className="mt-2 ml-8 flex flex-col gap-8 border-l-2 border-scarlet-600/40 pt-4">
                {project.children.map((child) => (
                    <div key={child.name} className="relative pl-8">
                        <span
                            aria-hidden="true"
                            className="absolute left-0 top-1/2 h-0.5 w-8 bg-scarlet-600/40"
                        />
                        <ProjectNode project={child} />
                    </div>
                ))}
            </div>
        );
    }

    override render() {
        return (
            <div>
                {this.renderCard()}
                {this.renderChildren()}
            </div>
        );
    }
}
