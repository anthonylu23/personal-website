import { useRef, useState, useEffect, useCallback } from "react";
import {
  ArrowDownRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Github,
} from "lucide-react";
import { contactMethods, experiences, projects } from "../data/content";

const Home = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const projectRowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const expRowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [expExpanded, setExpExpanded] = useState(false);
  const [projExpanded, setProjExpanded] = useState(false);

  const COLLAPSED_EXP = 2;
  const COLLAPSED_PROJ = 3;

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    const ro = new ResizeObserver(checkScroll);
    ro.observe(el);
    el.addEventListener("scroll", checkScroll, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", checkScroll);
    };
  }, [checkScroll]);

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

    [...projectRowsRef.current, ...expRowsRef.current].forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -80 : 80,
      behavior: "smooth",
    });
  };

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-10 px-4 pb-[calc(6rem+var(--safe-area-bottom,0px))] pt-[calc(8rem+var(--safe-area-top,0px))] lg:px-0">
      <section id="home" className="scroll-mt-24 flex flex-col justify-center">
        <div className="space-y-8">
          <div className="animate-fade-up-1 space-y-6">
            <h1 className="text-4xl font-semibold text-textPrimary text-balance md:text-5xl">
              Anthony Lu
            </h1>
            <p className="text-lg text-textSecondary">
              I like building software systems and training neural nets.
              I&apos;m also an avid photographer and classical violinist!
            </p>
          </div>
          <div className="animate-fade-up-2 flex items-center gap-5">
            <a
              href={`${import.meta.env.BASE_URL}Resume_AnthonyLu_NYC.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-semibold text-textInverse shadow-glow transition hover:bg-accentHover"
            >
              Resume
              <ArrowDownRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
            <button
              onClick={() => scroll("left")}
              className={`shrink-0 text-textSecondary/50 transition-opacity duration-300 hover:text-accent ${canScrollLeft ? "opacity-100" : "pointer-events-none opacity-0"}`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="relative min-w-0">
              <div
                className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-base to-transparent transition-opacity duration-300 ${canScrollLeft ? "opacity-100" : "opacity-0"}`}
              />
              <div
                className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-base to-transparent transition-opacity duration-300 ${canScrollRight ? "opacity-100" : "opacity-0"}`}
              />
              <div
                ref={scrollRef}
                className="flex items-center gap-5 overflow-x-auto scrollbar-hide"
              >
                <a
                  href="https://github.com/anthonylu23"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-textSecondary transition hover:text-accent"
                  aria-label="GitHub"
                >
                  <Github className="h-6 w-6" />
                </a>
                {contactMethods.map((method) => {
                  const isExternal = method.href.startsWith("http");
                  const Icon = method.icon;
                  return (
                    <a
                      key={method.label}
                      href={method.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                      className="shrink-0 text-textSecondary transition hover:text-accent"
                      aria-label={method.label}
                    >
                      <Icon className="h-6 w-6" />
                    </a>
                  );
                })}
              </div>
            </div>
            <button
              onClick={() => scroll("right")}
              className={`shrink-0 text-textSecondary/50 transition-opacity duration-300 hover:text-accent ${canScrollRight ? "opacity-100" : "pointer-events-none opacity-0"}`}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section id="about" className="animate-fade-up-3 scroll-mt-24 mt-16">
        <div className="flex flex-col gap-6 md:flex-row md:gap-24">
          <h2 className="text-lg font-semibold text-textPrimary md:w-40 md:shrink-0">
            About
          </h2>
          <div className="space-y-6 text-base leading-relaxed text-textSecondary">
            <p>
              Undergrad at New York University studying Computer Science, Data
              Science, and Math. Currently interning at InterSystems.
            </p>
            <p>
              I&apos;m interested in reinforcement learning, deep learning for
              computational neuroscience, and data engineering. I'm currently
              exploring and studying GPU kernels.
            </p>
          </div>
        </div>
      </section>

      <hr className="mx-auto w-[45%] border-textSecondary/30" />

      <section id="experience" className="scroll-mt-24">
        <div className="flex flex-col gap-6 md:flex-row md:gap-24">
          <h2 className="text-lg font-semibold text-textPrimary md:w-40 md:shrink-0">
            Experience
          </h2>
          <div className="relative w-full pl-6">
            <span className="pointer-events-none absolute left-0 bottom-0 top-[11px] w-px bg-gradient-to-b from-border/40 via-border/40 to-transparent" />
            {experiences.slice(0, COLLAPSED_EXP).map((exp, i) => {
              const href = exp.link;
              const isExternal = Boolean(href && href.startsWith("http"));
              return (
                <div
                  key={exp.company}
                  ref={(el) => { expRowsRef.current[i] = el; }}
                  className="relative pb-8 opacity-0 translate-y-4 transition-all duration-500 ease-out"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <span className={`absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent ${i === 0 ? "bg-accent" : "bg-base"}`} />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                    {href ? (
                      <a href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noreferrer" : undefined} className="font-medium text-textPrimary/90 transition hover:text-accent">
                        {exp.company}
                      </a>
                    ) : (
                      <p className="font-medium text-textPrimary/90">{exp.company}</p>
                    )}
                    <p className="text-xs text-textSecondary/70">{exp.location}</p>
                  </div>
                  <div className="mt-0.5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                    <p className="text-sm text-textSecondary">{exp.role}</p>
                    <p className="text-xs uppercase tracking-wide text-textSecondary/70">{exp.period}</p>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-textSecondary">{exp.description}</p>
                </div>
              );
            })}
            {experiences.length > COLLAPSED_EXP && (() => {
              const peekExp = experiences[COLLAPSED_EXP];
              const peekHref = peekExp.link;
              const peekExternal = Boolean(peekHref && peekHref.startsWith("http"));
              return (
                <>
                  {/* Peek item: clipped to show company + role only */}
                  <div
                    className="relative overflow-hidden"
                    style={{ maxHeight: expExpanded ? "300px" : "44px", transition: "max-height 500ms ease-out" }}
                  >
                    <div
                      ref={(el) => { expRowsRef.current[COLLAPSED_EXP] = el; }}
                      className="relative pb-8 opacity-0 translate-y-4 transition-all duration-500 ease-out"
                      style={{ transitionDelay: `${COLLAPSED_EXP * 80}ms` }}
                    >
                      <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-base" />
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                        {peekHref ? (
                          <a href={peekHref} target={peekExternal ? "_blank" : undefined} rel={peekExternal ? "noreferrer" : undefined} className="font-medium text-textPrimary/90 transition hover:text-accent">
                            {peekExp.company}
                          </a>
                        ) : (
                          <p className="font-medium text-textPrimary/90">{peekExp.company}</p>
                        )}
                        <p className="text-xs text-textSecondary/70">{peekExp.location}</p>
                      </div>
                      <div className="mt-0.5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                        <p className="text-sm text-textSecondary">{peekExp.role}</p>
                        <p className="text-xs uppercase tracking-wide text-textSecondary/70">{peekExp.period}</p>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-textSecondary">{peekExp.description}</p>
                    </div>
                    <div className={`pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-base transition-opacity duration-300 ${expExpanded ? "opacity-0" : "opacity-100"}`} />
                  </div>

                  {/* Remaining hidden items */}
                  {experiences.length > COLLAPSED_EXP + 1 && (
                    <div className="grid" style={{ gridTemplateRows: expExpanded ? "1fr" : "0fr", transition: "grid-template-rows 500ms ease-out" }}>
                      <div className="overflow-hidden min-h-0">
                        {experiences.slice(COLLAPSED_EXP + 1).map((exp, i) => {
                          const href = exp.link;
                          const isExternal = Boolean(href && href.startsWith("http"));
                          return (
                            <div
                              key={exp.company}
                              className={`relative pb-8 transition-all duration-500 ease-out last:pb-0 ${expExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                              style={{ transitionDelay: expExpanded ? `${(i + 1) * 80}ms` : "0ms" }}
                            >
                              <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-base" />
                              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                                {href ? (
                                  <a href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noreferrer" : undefined} className="font-medium text-textPrimary/90 transition hover:text-accent">
                                    {exp.company}
                                  </a>
                                ) : (
                                  <p className="font-medium text-textPrimary/90">{exp.company}</p>
                                )}
                                <p className="text-xs text-textSecondary/70">{exp.location}</p>
                              </div>
                              <div className="mt-0.5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                                <p className="text-sm text-textSecondary">{exp.role}</p>
                                <p className="text-xs uppercase tracking-wide text-textSecondary/70">{exp.period}</p>
                              </div>
                              <p className="mt-1.5 text-sm leading-relaxed text-textSecondary">{exp.description}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setExpExpanded((v) => !v)}
                    className="mt-2 flex items-center gap-1 text-sm text-textSecondary/60 transition hover:text-accent"
                  >
                    {expExpanded ? (
                      <>Show less <ChevronUp className="h-3.5 w-3.5" /></>
                    ) : (
                      <>{experiences.length - COLLAPSED_EXP} more <ChevronDown className="h-3.5 w-3.5" /></>
                    )}
                  </button>
                </>
              );
            })()}
          </div>
        </div>
      </section>

      <hr className="mx-auto w-[45%] border-textSecondary/30" />

      <section id="projects" className="scroll-mt-24">
        <div className="flex flex-col gap-6 md:flex-row md:gap-24">
          <h2 className="animate-fade-up-4 text-lg font-semibold text-textPrimary md:w-40 md:shrink-0">
            Projects
          </h2>
          <div className="w-full">
            {projects.slice(0, COLLAPSED_PROJ).map((project, i) => {
              const href = project.link;
              const isExternal = Boolean(href && href.startsWith("http"));
              return (
                <div
                  key={project.title}
                  ref={(el) => { projectRowsRef.current[i] = el; }}
                  className={`relative flex flex-col gap-1 py-4 opacity-0 translate-y-4 transition-all duration-500 ease-out${i > 0 ? " border-t border-border/30" : ""}`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  {href ? (
                    <a href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noreferrer" : undefined} className="group inline-flex w-fit items-baseline gap-1.5 font-medium text-textPrimary/90 transition hover:text-accent">
                      <span>{project.title}</span>
                      <Github className="h-3.5 w-3.5 translate-y-[2px] opacity-60 transition group-hover:opacity-100" />
                    </a>
                  ) : (
                    <span className="font-medium text-textPrimary/90">{project.title}</span>
                  )}
                  <p className="text-sm leading-relaxed text-textSecondary">{project.description}</p>
                  <p className="text-xs text-textSecondary/70">{project.stack.join(" · ")}</p>
                </div>
              );
            })}
            {projects.length > COLLAPSED_PROJ && (() => {
              const peekProj = projects[COLLAPSED_PROJ];
              const peekHref = peekProj.link;
              const peekExternal = Boolean(peekHref && peekHref.startsWith("http"));
              return (
                <>
                  {/* Peek item: clipped to show title only */}
                  <div
                    className="relative overflow-hidden border-t border-border/30"
                    style={{ maxHeight: projExpanded ? "300px" : "52px", transition: "max-height 500ms ease-out" }}
                  >
                    <div
                      ref={(el) => { projectRowsRef.current[COLLAPSED_PROJ] = el; }}
                      className="relative flex flex-col gap-1 py-4 opacity-0 translate-y-4 transition-all duration-500 ease-out"
                      style={{ transitionDelay: `${COLLAPSED_PROJ * 80}ms` }}
                    >
                      {peekHref ? (
                        <a href={peekHref} target={peekExternal ? "_blank" : undefined} rel={peekExternal ? "noreferrer" : undefined} className="group inline-flex w-fit items-baseline gap-1.5 font-medium text-textPrimary/90 transition hover:text-accent">
                          <span>{peekProj.title}</span>
                          <Github className="h-3.5 w-3.5 translate-y-[2px] opacity-60 transition group-hover:opacity-100" />
                        </a>
                      ) : (
                        <span className="font-medium text-textPrimary/90">{peekProj.title}</span>
                      )}
                      <p className="text-sm leading-relaxed text-textSecondary">{peekProj.description}</p>
                      <p className="text-xs text-textSecondary/70">{peekProj.stack.join(" · ")}</p>
                    </div>
                    <div className={`pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-base transition-opacity duration-300 ${projExpanded ? "opacity-0" : "opacity-100"}`} />
                  </div>

                  {/* Remaining hidden items */}
                  {projects.length > COLLAPSED_PROJ + 1 && (
                    <div className="grid" style={{ gridTemplateRows: projExpanded ? "1fr" : "0fr", transition: "grid-template-rows 500ms ease-out" }}>
                      <div className="overflow-hidden min-h-0">
                        {projects.slice(COLLAPSED_PROJ + 1).map((project, i) => {
                          const href = project.link;
                          const isExternal = Boolean(href && href.startsWith("http"));
                          return (
                            <div
                              key={project.title}
                              className={`flex flex-col gap-1 py-4 border-t border-border/30 transition-all duration-500 ease-out ${projExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                              style={{ transitionDelay: projExpanded ? `${(i + 1) * 80}ms` : "0ms" }}
                            >
                              {href ? (
                                <a href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noreferrer" : undefined} className="group inline-flex w-fit items-baseline gap-1.5 font-medium text-textPrimary/90 transition hover:text-accent">
                                  <span>{project.title}</span>
                                  <Github className="h-3.5 w-3.5 translate-y-[2px] opacity-60 transition group-hover:opacity-100" />
                                </a>
                              ) : (
                                <span className="font-medium text-textPrimary/90">{project.title}</span>
                              )}
                              <p className="text-sm leading-relaxed text-textSecondary">{project.description}</p>
                              <p className="text-xs text-textSecondary/70">{project.stack.join(" · ")}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setProjExpanded((v) => !v)}
                    className="mt-2 flex items-center gap-1 text-sm text-textSecondary/60 transition hover:text-accent"
                  >
                    {projExpanded ? (
                      <>Show less <ChevronUp className="h-3.5 w-3.5" /></>
                    ) : (
                      <>{projects.length - COLLAPSED_PROJ} more <ChevronDown className="h-3.5 w-3.5" /></>
                    )}
                  </button>
                </>
              );
            })()}
          </div>
        </div>
      </section>

      <hr className="mx-auto w-[45%] border-textSecondary/30" />
    </main>
  );
};

export default Home;
