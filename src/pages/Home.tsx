import { useRef, useState, useEffect, useCallback } from "react";
import {
  ArrowDownRight,
  ChevronLeft,
  ChevronRight,
  Github,
} from "lucide-react";
import { contactMethods } from "../data/content";

const Home = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
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
              Undergrad at NYU studying Computer Science, Data Science, and
              Math. Aspiring engineer and developer.
            </p>
          </div>
          <div className="animate-fade-up-2 flex items-center gap-5">
            <a
              href={`${import.meta.env.BASE_URL}Resume_AnthonyLu_NYC.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring group inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-semibold text-textInverse shadow-glow transition hover:bg-accentHover"
            >
              Resume
              <ArrowDownRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
            <button
              onClick={() => scroll("left")}
              className={`focus-ring shrink-0 rounded text-textSecondary/50 transition-opacity duration-300 hover:text-accent ${canScrollLeft ? "opacity-100" : "pointer-events-none opacity-0"}`}
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
                  className="focus-ring shrink-0 rounded-full text-textSecondary transition hover:text-accent"
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
                      className="focus-ring shrink-0 rounded-full text-textSecondary transition hover:text-accent"
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
              className={`focus-ring shrink-0 rounded text-textSecondary/50 transition-opacity duration-300 hover:text-accent ${canScrollRight ? "opacity-100" : "pointer-events-none opacity-0"}`}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
