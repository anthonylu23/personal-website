import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ProjectRow from "../components/ProjectRow";
import { projects } from "../data/content";

const COLLAPSED_PROJ = 3;

const Projects = () => {
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [projExpanded, setProjExpanded] = useState(false);

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
      { threshold: 0.1 },
    );

    rowsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-10 px-4 pb-[calc(6rem+var(--safe-area-bottom,0px))] pt-[calc(8rem+var(--safe-area-top,0px))] lg:px-0">
      <section id="projects" className="scroll-mt-24">
        <div className="flex flex-col gap-6 md:flex-row md:gap-24">
          <h2 className="animate-fade-up-1 text-lg font-semibold text-textPrimary md:w-40 md:shrink-0">
            Projects
          </h2>
          <div className="w-full">
            {projects.slice(0, COLLAPSED_PROJ).map((project, i) => (
              <div
                key={project.title}
                ref={(el) => {
                  rowsRef.current[i] = el;
                }}
                className={`relative flex flex-col gap-2 opacity-0 translate-y-4 transition-all duration-500 ease-out ${i > 0 ? "py-4 border-t border-border/30" : "pb-4"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <ProjectRow project={project} />
              </div>
            ))}
            {projects.length > COLLAPSED_PROJ &&
              (() => {
                const peekProj = projects[COLLAPSED_PROJ];
                return (
                  <>
                    {/* Peek item: clipped to show title only */}
                    <div
                      className="relative overflow-hidden border-t border-border/30"
                      style={{
                        maxHeight: projExpanded ? "360px" : "52px",
                        transition: "max-height 500ms ease-out",
                      }}
                    >
                      <div
                        ref={(el) => {
                          rowsRef.current[COLLAPSED_PROJ] = el;
                        }}
                        className="relative flex flex-col gap-2 py-4 opacity-0 translate-y-4 transition-all duration-500 ease-out"
                        style={{ transitionDelay: `${COLLAPSED_PROJ * 80}ms` }}
                      >
                        <ProjectRow project={peekProj} />
                      </div>
                      <div
                        className={`pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-base transition-opacity duration-300 ${projExpanded ? "opacity-0" : "opacity-100"}`}
                      />
                    </div>

                    {/* Remaining hidden items */}
                    {projects.length > COLLAPSED_PROJ + 1 && (
                      <div
                        className="grid"
                        style={{
                          gridTemplateRows: projExpanded ? "1fr" : "0fr",
                          transition: "grid-template-rows 500ms ease-out",
                        }}
                      >
                        <div className="overflow-hidden min-h-0">
                          {projects
                            .slice(COLLAPSED_PROJ + 1)
                            .map((project, i) => (
                              <div
                                key={project.title}
                                className={`flex flex-col gap-2 py-4 border-t border-border/30 transition-all duration-500 ease-out ${projExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                                style={{
                                  transitionDelay: projExpanded
                                    ? `${(i + 1) * 80}ms`
                                    : "0ms",
                                }}
                              >
                                <ProjectRow project={project} />
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => setProjExpanded((v) => !v)}
                      className="focus-ring mt-2 flex items-center gap-1 rounded text-sm text-textSecondary/60 transition hover:text-accent"
                    >
                      {projExpanded ? (
                        <>
                          Show less <ChevronUp className="h-3.5 w-3.5" />
                        </>
                      ) : (
                        <>
                          {projects.length - COLLAPSED_PROJ} more{" "}
                          <ChevronDown className="h-3.5 w-3.5" />
                        </>
                      )}
                    </button>
                  </>
                );
              })()}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Projects;
