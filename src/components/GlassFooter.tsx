import { contactMethods } from "../data/content";
import GlassSurface from "./GlassSurface";

const footerContactLabels = new Set(["Email", "GitHub", "LinkedIn"]);

const socialLinks = contactMethods.filter(({ label }) =>
  footerContactLabels.has(label)
);

const GlassFooter = () => {
  return (
    <footer className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4">
      <GlassSurface
        width="100%"
        height="auto"
        borderRadius={60}
        backgroundOpacity={0.15}
        opacity={0.55}
        blur={16}
        className="pointer-events-auto w-full max-w-5xl"
      >
        <div className="flex flex-col gap-4 px-6 py-3 text-white/80 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-base font-semibold text-white">
              © {new Date().getFullYear()} Anthony Lu — Photography Portfolio
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
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white transition hover:text-accent hover:border-accent hover:bg-white/20"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </GlassSurface>
    </footer>
  );
};

export default GlassFooter;
