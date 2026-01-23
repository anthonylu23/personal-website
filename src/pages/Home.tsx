import { ArrowDownRight } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { contactMethods, projects, skills } from "../data/content";

const Home = () => {
  const locationHighlights = [
    {
      label: "Primary Base",
      value: "Austin, TX",
    },
    {
      label: "Campus",
      value: "NYC",
    },
  ];

  const locationSummary = locationHighlights
    .map((entry) => entry.value)
    .join(" / ");
  const aboutRows = [
    {
      title: "New York University",
      detail: "B.A. Computer and Data Science. Jan 2024 - May 2027.",
    },
    // {
    //   title: "Liberal Arts and Science Academy",
    //   detail: "High School Diploma. Aug 2020 - May 2023.",
    // },
    {
      title: "Location",
      detail: `${locationSummary}`,
    },
  ];
  const skillRows = skills
    .filter((group) => group.label !== "Relevant Coursework")
    .map((group) => ({
      title: group.label,
      detail: group.items.join(", "),
    }));

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-28 px-4 pb-[calc(6rem+var(--safe-area-bottom,0px))] pt-[calc(8rem+var(--safe-area-top,0px))] lg:px-0">
      <section id="home" className="scroll-mt-24 space-y-8">
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold text-textPrimary text-balance md:text-5xl">
            Hi, I'm Anthony!
          </h1>
          <p className="text-lg text-textSecondary">
            I'm currently a Computer and Data Science undergrad at NYU, and exploring software, data, and AI/ML. I'm also an avid photographer and violinist!
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={`${import.meta.env.BASE_URL}AnthonyLu_Resume_NYC.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-semibold text-textInverse shadow-glow transition hover:bg-accentHover"
          >
            Resume
            <ArrowDownRight className="h-4 w-4" />
          </a>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-base font-semibold text-textPrimary transition hover:border-accent/60"
          >
            View projects
            <ArrowDownRight className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-base font-semibold text-textPrimary transition hover:border-accent/60"
          >
            Let&apos;s talk
          </a>
        </div>
      </section>

      <section id="about" className="scroll-mt-24">
        <SectionHeading title="About" />
        <div className="border-t border-border/40">
          <div className="flex items-center gap-3 py-4 text-xs font-semibold uppercase tracking-[0.35em] text-textSecondary/70">
            <span className="h-px w-8 bg-border/60" />
            <span>Background</span>
            <span className="ml-auto h-1 w-1 rounded-full bg-border/60" />
            <span className="h-px w-8 bg-border/60" />
          </div>
          <div className="divide-y divide-border/30">
            {aboutRows.map((row) => (
              <div
                key={row.title}
                className="flex flex-col gap-2 py-4 md:flex-row md:items-baseline md:justify-between"
              >
                <div className="flex items-center gap-3 text-base font-medium text-textPrimary/90">
                  <span>{row.title}</span>
                </div>
                <p className="text-sm leading-relaxed text-textSecondary md:max-w-[60%] md:text-right">
                  {row.detail}
                </p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 py-4">
            <span className="h-px w-32 bg-border/60 sm:w-56 md:w-80" />
            <span className="h-1 w-1 rounded-full bg-border/60" />
            <span className="h-px w-32 bg-border/60 sm:w-56 md:w-80" />
          </div>
        </div>
        <div className="mt-10 border-t border-border/40">
          <div className="flex items-center gap-3 py-4 text-xs font-semibold uppercase tracking-[0.35em] text-textSecondary/70">
            <span className="h-px w-8 bg-border/60" />
            <span>Tools & Skills</span>
            <span className="ml-auto h-1 w-1 rounded-full bg-border/60" />
            <span className="h-px w-8 bg-border/60" />
          </div>
          <div className="divide-y divide-border/30">
            {skillRows.map((row) => (
              <div
                key={row.title}
                className="flex flex-col gap-2 py-4 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-center gap-3 text-base font-medium text-textPrimary/90">
                  <span>{row.title}</span>
                </div>
                <p className="text-sm leading-relaxed text-textSecondary md:max-w-[60%] md:text-right">
                  {row.detail}
                </p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 py-4">
            <span className="h-px w-32 bg-border/60 sm:w-56 md:w-80" />
            <span className="h-1 w-1 rounded-full bg-border/60" />
            <span className="h-px w-32 bg-border/60 sm:w-56 md:w-80" />
          </div>
        </div>
      </section>

      <section id="projects" className="scroll-mt-24">
        <SectionHeading title="Projects" />
        <div className="border-t border-border/40">
          <div className="flex items-center gap-3 py-4 text-xs font-semibold uppercase tracking-[0.35em] text-textSecondary/70">
            <span className="h-px w-8 bg-border/60" />
            <span>Selected Work</span>
            <span className="ml-auto h-1 w-1 rounded-full bg-border/60" />
            <span className="h-px w-8 bg-border/60" />
          </div>
          <div className="divide-y divide-border/30">
            {projects.map((project) => {
              const href = project.link;
              const isExternal = Boolean(href && href.startsWith("http"));
              return (
                <div
                  key={project.title}
                  className="flex flex-col gap-2 py-4 md:flex-row md:items-center md:justify-between"
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
          <div className="flex items-center justify-center gap-4 py-4">
            <span className="h-px w-32 bg-border/60 sm:w-56 md:w-80" />
            <span className="h-1 w-1 rounded-full bg-border/60" />
            <span className="h-px w-32 bg-border/60 sm:w-56 md:w-80" />
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24">
        <SectionHeading title="Contact" />
        <div className="grid gap-6">
          <div className="border-t border-border/40">
            <div className="flex items-center gap-3 py-4 text-xs font-semibold uppercase tracking-[0.35em] text-textSecondary/70">
              <span className="h-px w-8 bg-border/60" />
              <span>Elsewhere</span>
              <span className="ml-auto h-1 w-1 rounded-full bg-border/60" />
              <span className="h-px w-8 bg-border/60" />
            </div>
            <div className="divide-y divide-border/30">
              {contactMethods.map((method) => {
                const isExternal = method.href.startsWith("http");
                return (
                  <div
                    key={method.label}
                    className="flex flex-col gap-2 py-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="text-base font-medium text-textPrimary/90">
                      {method.label}
                    </div>
                    <a
                      href={method.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                      className="text-sm leading-relaxed text-textSecondary transition hover:text-accent md:max-w-[60%] md:text-right"
                    >
                      {method.detail}
                    </a>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-center gap-4 py-4">
              <span className="h-px w-32 bg-border/60 sm:w-56 md:w-80" />
              <span className="h-1 w-1 rounded-full bg-border/60" />
              <span className="h-px w-32 bg-border/60 sm:w-56 md:w-80" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
