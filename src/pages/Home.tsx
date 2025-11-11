import { ArrowDownRight, GraduationCap, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import { contactMethods, skills } from "../data/content";

const Home = () => {
  const locationHighlights = [
    {
      label: "Primary Base",
      value: "Austin, TX",
    },
    {
      label: "Campus",
      value: "New York City, NY",
    },
  ];

  const focusSkillLabels = new Set([
    "AI",
    "Systems & Infra",
    "Relevant Coursework",
  ]);

  const primarySkillGroups = skills.filter(
    (group) => !focusSkillLabels.has(group.label)
  );
  const focusSkillGroups = skills.filter((group) =>
    focusSkillLabels.has(group.label)
  );

  const renderSkillCard = (
    group: (typeof skills)[number],
    extraClasses = ""
  ) => (
    <div
      key={group.label}
      className={`rounded-3xl border border-border bg-surface p-5 ${extraClasses}`}
    >
      <div className="flex items-center gap-3">
        <div className="rounded-2xl border border-border bg-elevated p-2 text-accent">
          <group.icon className="h-5 w-5" />
        </div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-textSecondary">
          {group.label}
        </p>
      </div>
      <ul
        className={`mt-3 space-y-1 text-sm text-textPrimary ${
          group.label === "Relevant Coursework"
            ? "grid grid-cols-2 gap-1 space-y-0"
            : ""
        }`}
      >
        {group.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-28 px-4 pb-24 pt-32 lg:px-0">
      <section id="home" className="scroll-mt-24 space-y-8">
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold text-textPrimary text-balance md:text-5xl">
            Hi, I'm Anthony!
          </h1>
          <p className="text-lg text-textSecondary">
            I'm currently a Computer and Data Science student at NYU with a
            strong interest in software, AI/ML, and all things tech. I'm also an
            avid photographer and violinist!
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-semibold text-textInverse shadow-glow transition hover:bg-accentHover"
          >
            View projects
            <ArrowDownRight className="h-4 w-4" />
          </Link>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-base font-semibold text-textPrimary transition hover:border-accent/60"
          >
            Let&apos;s talk
          </a>
        </div>
      </section>

      <section id="about" className="scroll-mt-24">
        <SectionHeading eyebrow="About" title="Skills & Background" />
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6 h-full">
            <div className="rounded-3xl border border-border bg-surface p-6 h-full">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl border border-border bg-elevated p-3">
                  <GraduationCap className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-textSecondary">
                    Education
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-textPrimary">
                    New York University
                  </h3>
                  <p className="text-textSecondary">
                    B.A. Computer and Data Science
                  </p>
                  <p className="mt-1 text-sm text-textSecondary/80">
                    Jan 2024 - May 2027
                  </p>
                  <div className="mt-4 border-t border-border pt-4">
                    <h3 className="text-xl font-semibold text-textPrimary">
                      Liberal Arts and Science Academy
                    </h3>
                    <p className="text-textSecondary">High School Diploma</p>
                    <p className="mt-1 text-sm text-textSecondary/80">
                      Aug 2020 - May 2024
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4 h-full">
            <div className="rounded-3xl border border-border bg-surface p-6 space-y-5 h-full">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl border border-border bg-elevated p-3">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-textSecondary">
                    Location
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-textPrimary">
                    Austin / New York City
                  </h3>
                  <p className="text-sm text-textSecondary">
                    Rooted in Texas, on campus in NYC, and remote-friendly
                    worldwide.
                  </p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {locationHighlights.map((entry) => (
                  <div
                    key={entry.label}
                    className="rounded-2xl border border-border bg-elevated p-4"
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-textSecondary/80">
                      {entry.label}
                    </p>
                    <p className="mt-1 text-lg font-semibold text-textPrimary">
                      {entry.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {primarySkillGroups.map((group) => renderSkillCard(group))}
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[0.65fr_0.75fr_1.6fr]">
              {focusSkillGroups.map((group) =>
                renderSkillCard(
                  group,
                  group.label === "AI"
                    ? "lg:max-w-sm"
                    : group.label === "Systems & Infra"
                    ? "lg:max-w-sm"
                    : "lg:w-full"
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something"
          description="I'm always open for collaboration, internships, full-time opportunities, or just a chat!"
        />
        <div className="grid gap-6 md:grid-cols-2">
          {contactMethods.map((method) => (
            <a
              key={method.label}
              href={method.href}
              target={method.href.startsWith("http") ? "_blank" : undefined}
              rel={method.href.startsWith("http") ? "noreferrer" : undefined}
              className="group flex items-center justify-between rounded-3xl border border-border bg-surface p-5 transition hover:border-accent/40"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-2xl border border-border bg-elevated p-3 text-accent">
                  <method.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-textSecondary">
                    {method.label}
                  </p>
                  <p className="text-lg font-semibold text-textPrimary">
                    {method.detail}
                  </p>
                </div>
              </div>
              <ArrowDownRight className="h-5 w-5 text-accent transition group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
