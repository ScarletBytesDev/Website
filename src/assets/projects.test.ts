import { describe, expect, it } from "vitest";
import { type Project, parseProject, projects } from "./projects.ts";

function flatten(items: readonly Project[]): Project[] {
    return items.flatMap((item) => [item, ...flatten(item.children)]);
}

describe("parseProject", () => {
    it("parses nested children recursively", () => {
        const project = parseProject({
            name: "Parent",
            description: "Has kids",
            children: [
                {
                    name: "Child",
                    description: "Has a grandchild",
                    children: [
                        { name: "Grandchild", description: "Deep down" },
                    ],
                },
            ],
        });

        expect(project.children.length).toBe(1);
        expect(project.children[0].name).toBe("Child");
        expect(project.children[0].children[0].name).toBe("Grandchild");
    });

    it("defaults children to an empty array", () => {
        const project = parseProject({
            name: "Solo",
            description: "Standalone",
        });
        expect(project.children).toEqual([]);
    });

    it("throws when children is not an array", () => {
        expect(() =>
            parseProject({
                name: "Broken",
                description: "Bad children",
                children: { name: "Not an array" },
            }),
        ).toThrow(/children must be an array/);
    });

    it("throws when a nested child link is not https", () => {
        expect(() =>
            parseProject({
                name: "Parent",
                description: "Has kids",
                children: [
                    {
                        name: "Child",
                        description: "Insecure link",
                        links: [
                            { label: "Insecure", href: "http://example.com" },
                        ],
                    },
                ],
            }),
        ).toThrow(/must be https/);
    });
});

describe("projects", () => {
    it("parses the nested demo entry from the asset", () => {
        const website = projects.find(
            (project) => project.name === "This Website",
        );
        expect(website).toBeDefined();
        expect(website?.children.map((child) => child.name)).toContain(
            "Dither Background",
        );
    });

    it("keeps every link at every depth on https", () => {
        for (const project of flatten(projects)) {
            for (const link of project.links) {
                expect(link.href.startsWith("https://")).toBe(true);
            }
        }
    });
});
