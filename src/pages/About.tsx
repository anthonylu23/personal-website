import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { experiences } from "../data/content";
import type { Experience } from "../data/content";

function renderDescription(exp: Experience) {
  const { description, descriptionLinks } = exp;
  if (!descriptionLinks?.length) return description;
  const parts: React.ReactNode[] = [];
  let remaining = description;
  for (const { text, href } of descriptionLinks) {
    const idx = remaining.indexOf(text);
    if (idx === -1) continue;
    if (idx > 0) parts.push(remaining.slice(0, idx));
    parts.push(
      <a
        key={href}
        href={href}
        target="_blank"
        rel="noreferrer"
        className="underline underline-offset-2 transition hover:text-accent"
      >
        {text}
      </a>,
    );
    remaining = remaining.slice(idx + text.length);
  }
  if (remaining) parts.push(remaining);
  return parts;
}

const COLLAPSED_EXP = 2;

const About = () => {
  const expRowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const expHeadingRef = useRef<HTMLHeadingElement>(null);
  const expLineRef = useRef<HTMLSpanElement>(null);
  const [expExpanded, setExpExpanded] = useState(false);

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

    [expHeadingRef.current, expLineRef.current, ...expRowsRef.current].forEach(
      (el) => {
        if (el) observer.observe(el);
      },
    );

    return () => observer.disconnect();
  }, []);

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-10 px-4 pb-[calc(6rem+var(--safe-area-bottom,0px))] pt-[calc(8rem+var(--safe-area-top,0px))] lg:px-0">
      <section id="about" className="animate-fade-up-1 scroll-mt-24">
        <div className="flex flex-col gap-6 md:flex-row md:gap-24">
          <h2 className="text-lg font-semibold text-textPrimary md:w-40 md:shrink-0">
            About
          </h2>
          <div className="space-y-6 text-base leading-relaxed text-textSecondary">
            <p>
              I'm originally from Austin, and currently based in New York City.
              In my free time, I take{" "}
              <Link
                to="/photography"
                className="underline underline-offset-2 transition hover:text-accent"
              >
                pictures
              </Link>{" "}
              (mostly analog), play classical violin, and watch racing and
              basketball.
            </p>
            <p>
              I&apos;m always looking to learn new things and explore different
              ideas. These days, I've been exploring systems programming and
              researching multi-agent post-training methods.
            </p>
          </div>
        </div>
      </section>

      <hr className="mx-auto w-[45%] border-textSecondary/30" />

      <section id="experience" className="scroll-mt-24">
        <div className="flex flex-col gap-6 md:flex-row md:gap-24">
          <h2
            ref={expHeadingRef}
            className="text-lg font-semibold text-textPrimary opacity-0 translate-y-4 transition-all duration-500 ease-out md:w-40 md:shrink-0"
          >
            Experience
          </h2>
          <div className="relative w-full pl-6">
            <span
              ref={expLineRef}
              className="pointer-events-none absolute left-0 bottom-0 top-[11px] w-px bg-gradient-to-b from-border/40 via-border/40 to-transparent opacity-0 transition-opacity duration-500 ease-out"
            />
            {experiences.slice(0, COLLAPSED_EXP).map((exp, i) => {
              const href = exp.link;
              const isExternal = Boolean(href && href.startsWith("http"));
              return (
                <div
                  key={exp.company}
                  ref={(el) => {
                    expRowsRef.current[i] = el;
                  }}
                  className="relative pb-8 opacity-0 translate-y-4 transition-all duration-500 ease-out"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <span
                    className={`absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent ${i === 0 ? "bg-accent" : "bg-base"}`}
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                    {href ? (
                      <a
                        href={href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noreferrer" : undefined}
                        className="font-medium text-textPrimary/90 transition hover:text-accent"
                      >
                        {exp.company}
                      </a>
                    ) : (
                      <p className="font-medium text-textPrimary/90">
                        {exp.company}
                      </p>
                    )}
                    <p className="text-xs text-textSecondary/70">
                      {exp.location}
                    </p>
                  </div>
                  <div className="mt-0.5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                    <p className="text-sm text-textSecondary">{exp.role}</p>
                    <p className="text-xs tracking-wide text-textSecondary/70">
                      {exp.period}
                    </p>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-textSecondary">
                    {renderDescription(exp)}
                  </p>
                </div>
              );
            })}
            {experiences.length > COLLAPSED_EXP &&
              (() => {
                const peekExp = experiences[COLLAPSED_EXP];
                const peekHref = peekExp.link;
                const peekExternal = Boolean(
                  peekHref && peekHref.startsWith("http"),
                );
                return (
                  <>
                    {/* Peek item: clipped to show company + role only */}
                    <div
                      className="relative -ml-8 overflow-hidden pl-8"
                      style={{
                        maxHeight: expExpanded ? "300px" : "44px",
                        transition: "max-height 500ms ease-out",
                      }}
                    >
                      <div
                        ref={(el) => {
                          expRowsRef.current[COLLAPSED_EXP] = el;
                        }}
                        className="relative pb-8 opacity-0 translate-y-4 transition-all duration-500 ease-out"
                        style={{ transitionDelay: `${COLLAPSED_EXP * 80}ms` }}
                      >
                        <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-base" />
                        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                          {peekHref ? (
                            <a
                              href={peekHref}
                              target={peekExternal ? "_blank" : undefined}
                              rel={peekExternal ? "noreferrer" : undefined}
                              className="font-medium text-textPrimary/90 transition hover:text-accent"
                            >
                              {peekExp.company}
                            </a>
                          ) : (
                            <p className="font-medium text-textPrimary/90">
                              {peekExp.company}
                            </p>
                          )}
                          <p className="text-xs text-textSecondary/70">
                            {peekExp.location}
                          </p>
                        </div>
                        <div className="mt-0.5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                          <p className="text-sm text-textSecondary">
                            {peekExp.role}
                          </p>
                          <p className="text-xs tracking-wide text-textSecondary/70">
                            {peekExp.period}
                          </p>
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-textSecondary">
                          {renderDescription(peekExp)}
                        </p>
                      </div>
                      <div
                        className={`pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-base transition-opacity duration-300 ${expExpanded ? "opacity-0" : "opacity-100"}`}
                      />
                    </div>

                    {/* Remaining hidden items */}
                    {experiences.length > COLLAPSED_EXP + 1 && (
                      <div
                        className="grid"
                        style={{
                          gridTemplateRows: expExpanded ? "1fr" : "0fr",
                          transition: "grid-template-rows 500ms ease-out",
                        }}
                      >
                        <div className="-ml-8 min-h-0 overflow-hidden pl-8">
                          {experiences
                            .slice(COLLAPSED_EXP + 1)
                            .map((exp, i) => {
                              const href = exp.link;
                              const isExternal = Boolean(
                                href && href.startsWith("http"),
                              );
                              return (
                                <div
                                  key={exp.company}
                                  className={`relative pb-8 transition-all duration-500 ease-out last:pb-0 ${expExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                                  style={{
                                    transitionDelay: expExpanded
                                      ? `${(i + 1) * 80}ms`
                                      : "0ms",
                                  }}
                                >
                                  <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-base" />
                                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                                    {href ? (
                                      <a
                                        href={href}
                                        target={
                                          isExternal ? "_blank" : undefined
                                        }
                                        rel={
                                          isExternal ? "noreferrer" : undefined
                                        }
                                        className="font-medium text-textPrimary/90 transition hover:text-accent"
                                      >
                                        {exp.company}
                                      </a>
                                    ) : (
                                      <p className="font-medium text-textPrimary/90">
                                        {exp.company}
                                      </p>
                                    )}
                                    <p className="text-xs text-textSecondary/70">
                                      {exp.location}
                                    </p>
                                  </div>
                                  <div className="mt-0.5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                                    <p className="text-sm text-textSecondary">
                                      {exp.role}
                                    </p>
                                    <p className="text-xs tracking-wide text-textSecondary/70">
                                      {exp.period}
                                    </p>
                                  </div>
                                  <p className="mt-1.5 text-sm leading-relaxed text-textSecondary">
                                    {renderDescription(exp)}
                                  </p>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => setExpExpanded((v) => !v)}
                      className="focus-ring mt-2 flex items-center gap-1 rounded text-sm text-textSecondary/60 transition hover:text-accent"
                    >
                      {expExpanded ? (
                        <>
                          Show less <ChevronUp className="h-3.5 w-3.5" />
                        </>
                      ) : (
                        <>
                          {experiences.length - COLLAPSED_EXP} more{" "}
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

export default About;
