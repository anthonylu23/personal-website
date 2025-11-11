import { contactMethods } from "../data/content";
import GlassSurface from "./GlassSurface";

const footerContactLabels = new Set(["Email", "GitHub", "LinkedIn"]);

const socialLinks = contactMethods.filter(({ label }) =>
  footerContactLabels.has(label),
);

const GlassFooter = () => {
  return (
    <footer className="flex justify-center px-4 pb-6 pt-10">
      <GlassSurface
        width="100%"
        height="auto"
        borderRadius={40}
        backgroundOpacity={0.18}
        opacity={0.6}
        blur={18}
        className="w-full max-w-5xl"
      >
        <div className="flex flex-col gap-6 px-6 py-6 text-textInverse/80 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-base font-semibold text-textInverse">
              Visual stories from Austin ↺ NYC
            </p>
            <p className="text-sm text-textInverse/70">
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
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/10 text-textInverse transition hover:bg-white/20"
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
