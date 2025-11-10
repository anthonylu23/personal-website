import { contactMethods } from "../data/content";

const footerContactLabels = new Set(["Email", "GitHub", "LinkedIn"]);

const socialLinks = contactMethods.filter(({ label }) =>
  footerContactLabels.has(label)
);

const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-black/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 text-sm text-slate-400 lg:px-0 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-base font-semibold text-white"></p>
          <p className="mt-1 text-slate-400">
            © {new Date().getFullYear()} Anthony — Built with React & Tailwind.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-slate-200 transition hover:border-accent/60 hover:text-accent"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
