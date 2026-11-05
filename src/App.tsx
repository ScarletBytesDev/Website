import { Code, Gamepad2, Tv, Video } from "lucide-react";

const links = [
  { label: "Twitch", href: "https://twitch.tv/", icon: Tv },
  { label: "YouTube", href: "https://youtube.com/", icon: Video },
  { label: "GitHub", href: "https://github.com/", icon: Code },
];

export default function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-zinc-950 px-6 text-zinc-100">
      <Gamepad2 className="size-16 text-red-500" strokeWidth={1.5} />

      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          ScarletBytesDev
        </h1>
        <p className="mt-3 text-lg text-zinc-400">
          Streaming, projects, and more — coming soon.
        </p>
      </div>

      <nav className="flex flex-wrap items-center justify-center gap-4">
        {links.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-5 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-red-500 hover:text-white"
          >
            <Icon className="size-4" />
            {label}
          </a>
        ))}
      </nav>
    </main>
  );
}
