import { ArrowDownRight, Cpu } from "lucide-react";
import { projects } from "../data/content";

const Projects = () => (
  <main className="mx-auto flex max-w-6xl flex-col gap-16 px-4 pb-[calc(6rem+var(--safe-area-bottom,0px))] pt-[calc(8rem+var(--safe-area-top,0px))] lg:px-0">
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
        Selected Work
      </p>
      <h1 className="mt-3 text-4xl font-semibold text-textPrimary text-balance">
        Technical Projects
      </h1>
      <p className="mt-4 text-lg text-textSecondary">
        Personal projects spanning AI-native and dev tools, and realtime data
        applications.
      </p>
    </div>
    <div className="grid gap-6 md:grid-cols-2">
      {projects.map((project) => (
        <article
          key={project.title}
          className="group flex h-full flex-col rounded-3xl border border-border bg-surface p-6 transition hover:border-accent/40"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-border bg-elevated p-3 text-accent">
              <Cpu className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold text-textPrimary">
              {project.title}
            </h2>
          </div>
          <p className="mt-4 flex-1 text-base text-textSecondary">
            {project.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-elevated px-3 py-1 text-xs font-medium text-textSecondary"
              >
                {tech}
              </span>
            ))}
          </div>
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:text-accentHover"
          >
            Explore build
            <ArrowDownRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </article>
      ))}
    </div>
  </main>
);

export default Projects;
