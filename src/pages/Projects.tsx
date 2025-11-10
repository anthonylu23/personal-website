import { ArrowDownRight, Cpu } from "lucide-react";
import { projects } from "../data/content";

const Projects = () => (
  <main className="mx-auto flex max-w-6xl flex-col gap-16 px-4 pb-24 pt-32 lg:px-0">
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
        Selected Work
      </p>
      <h1 className="mt-3 text-4xl font-semibold text-white text-balance">
        Technical Projects
      </h1>
      <p className="mt-4 text-lg text-slate-400">
        Personal projects spanning AI-native and dev tools, and realtime data
        applications.
      </p>
    </div>
    <div className="grid gap-6 md:grid-cols-2">
      {projects.map((project) => (
        <article
          key={project.title}
          className="group flex h-full flex-col rounded-3xl border border-white/5 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 transition hover:border-accent/40"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-accent">
              <Cpu className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              {project.title}
            </h2>
          </div>
          <p className="mt-4 flex-1 text-base text-slate-400">
            {project.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent"
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
