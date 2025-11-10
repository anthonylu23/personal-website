import { ArrowDownRight, GraduationCap, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import { contactMethods, skills } from "../data/content";

const Home = () => {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-28 px-4 pb-24 pt-32 lg:px-0">
      <section id="home" className="scroll-mt-24 space-y-8">
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold text-white text-balance md:text-5xl">
            Hi, I'm Anthony!
          </h1>
          <p className="text-lg text-slate-400">
            I'm currently a Computer and Data Science student at NYU with a
            strong interest in software, AI/ML, and all things tech. I'm also an
            avid photographer and violinist!
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-semibold text-slate-950 shadow-glow transition hover:scale-105"
          >
            View projects
            <ArrowDownRight className="h-4 w-4" />
          </Link>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-base font-semibold text-white transition hover:border-accent/60"
          >
            Let&apos;s talk
          </a>
        </div>
      </section>

      <section id="about" className="scroll-mt-24">
        <h2 className="mb-10 text-3xl font-semibold text-white text-balance lg:text-4xl">
          About Me
        </h2>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6 order-1">
            <div className="rounded-3xl border border-white/5 bg-white/5 p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <GraduationCap className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                    Education
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-white">
                    New York University
                  </h3>
                  <p className="text-slate-400">
                    B.A. Computer and Data Science
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Jan 2024 - May 2027
                  </p>
                  <div className="mt-4 border-t border-white/10 pt-4">
                    <h3 className="text-xl font-semibold text-white">
                      Liberal Arts and Science Academy
                    </h3>
                    <p className="text-slate-400">High School Diploma</p>
                    <p className="mt-1 text-sm text-slate-500">
                      Aug 2020 - May 2024
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4 order-3 lg:order-2">
            <div className="rounded-3xl border border-white/5 bg-white/5 p-6 h-full">
              <div className="flex items-start gap-4 h-full">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                    Location
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-white">
                    Austin, Texas
                  </h3>
                  <div className="mt-4 border-t border-white/10 pt-4">
                    <h3 className="text-xl font-semibold text-white">
                      New York City, New York
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="order-2 lg:order-3 lg:col-span-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((group) => (
              <div
                key={group.label}
                className="rounded-3xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-2 text-accent">
                    <group.icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
                    {group.label}
                  </p>
                </div>
                <ul
                  className={`mt-3 space-y-1 text-sm text-slate-200 ${
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
            ))}
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
              className="group flex items-center justify-between rounded-3xl border border-white/5 bg-white/5 p-5 transition hover:border-accent/40"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-accent">
                  <method.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                    {method.label}
                  </p>
                  <p className="text-lg font-semibold text-white">
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
