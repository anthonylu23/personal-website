import { useEffect, useRef } from "react";
import SectionHeading from "../components/SectionHeading";
import { projects } from "../data/content";

const Projects = () => {
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-4");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    rowsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-12 px-4 pb-[calc(6rem+var(--safe-area-bottom,0px))] pt-[calc(8rem+var(--safe-area-top,0px))] lg:px-0">
      <SectionHeading
        title="Projects"
        description="Personal projects spanning AI-native and dev tools, and realtime data applications."
      />
      <div className="border-t border-border/40">
        <div className="flex items-center gap-3 py-4 text-xs font-semibold uppercase tracking-[0.35em] text-textSecondary/70">
          <span className="h-px w-8 bg-border/60" />
          <span>Selected Work</span>
          <span className="ml-auto h-1 w-1 rounded-full bg-border/60" />
          <span className="h-px w-8 bg-border/60" />
        </div>
        <div className="divide-y divide-border/30">
          {projects.map((project, i) => {
            const href = project.link;
            const isExternal = Boolean(href && href.startsWith("http"));
            return (
              <div
                key={project.title}
                ref={(el) => { rowsRef.current[i] = el; }}
                className="flex flex-col gap-2 py-4 opacity-0 translate-y-4 transition-all duration-500 ease-out md:flex-row md:items-baseline md:justify-between"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {href ? (
                  <a
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                    className="text-base font-medium text-textPrimary/90 transition hover:text-accent"
                  >
                    {project.title}
                  </a>
                ) : (
                  <span className="text-base font-medium text-textPrimary/90">
                    {project.title}
                  </span>
                )}
                <div className="text-sm leading-relaxed text-textSecondary md:flex md:max-w-[60%] md:flex-col md:items-end md:text-right">
                  <p>{project.description}</p>
                  <p className="mt-2 text-xs text-textSecondary/70">
                    {project.stack.join(" · ")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Projects;
