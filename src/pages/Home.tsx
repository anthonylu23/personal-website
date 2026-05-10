import { useRef, useState, useEffect, useCallback } from "react";
import {
  ArrowDownRight,
  ChevronLeft,
  ChevronRight,
  Github,
} from "lucide-react";
import { contactMethods, projects } from "../data/content";

const Home = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const projectRowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

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
      { threshold: 0.1 }
    );

    projectRowsRef.current.forEach((el) => {
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
              Science, and Math. Incoming summer intern at InterSystems.
            </p>
            <p>
              I&apos;m interested in reinforcement learning, Linux systems,
              self-hosted infrastructure, and applying deep learning to neural
              data.
            </p>
          </div>
        </div>
      </section>

      <hr className="mx-auto w-[45%] border-textSecondary/30" />

      <section id="projects" className="scroll-mt-24">
        <div className="flex flex-col gap-6 md:flex-row md:gap-24">
          <h2 className="animate-fade-up-4 text-lg font-semibold text-textPrimary md:w-40 md:shrink-0">
            Projects
          </h2>
          <div className="w-full divide-y divide-border/30">
            {projects.map((project, i) => {
              const href = project.link;
              const isExternal = Boolean(href && href.startsWith("http"));
              return (
                <div
                  key={project.title}
                  ref={(el) => { projectRowsRef.current[i] = el; }}
                  className="flex flex-col gap-1 py-4 opacity-0 translate-y-4 transition-all duration-500 ease-out"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  {href ? (
                    <a
                      href={href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                      className="group inline-flex w-fit items-baseline gap-1.5 font-medium text-textPrimary/90 transition hover:text-accent"
                    >
                      <span>{project.title}</span>
                      <Github className="h-3.5 w-3.5 translate-y-[2px] opacity-60 transition group-hover:opacity-100" />
                    </a>
                  ) : (
                    <span className="font-medium text-textPrimary/90">
                      {project.title}
                    </span>
                  )}
                  <p className="text-sm leading-relaxed text-textSecondary">
                    {project.description}
                  </p>
                  <p className="text-xs text-textSecondary/70">
                    {project.stack.join(" · ")}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <hr className="mx-auto w-[45%] border-textSecondary/30" />
    </main>
  );
};

export default Home;
