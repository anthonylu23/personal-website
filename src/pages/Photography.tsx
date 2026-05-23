import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { gallery } from "../data/gallery";

const Photography = () => {
  const [navOffset, setNavOffset] = useState(0);
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) {
      return;
    }

    const updateOffset = () => {
      const rect = header.getBoundingClientRect();
      setNavOffset(Math.ceil(rect.height));
    };

    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setPageReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <main className="min-h-screen">
      <section
        className="relative z-10 bg-base px-4 pb-24 md:px-8"
        style={navOffset ? { paddingTop: navOffset } : undefined}
      >
        <div className="mx-auto flex max-w-4xl flex-col gap-16">
          {gallery.map((item, index) => (
            <article
              key={item.title}
              className={`flex min-h-[70vh] w-full items-center transition-all duration-700 ease-out md:min-h-[85vh] ${
                pageReady ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={
                index === 0 && navOffset
                  ? {
                      minHeight: `calc(100vh - ${navOffset}px)`,
                      transitionDelay: `${Math.min(index * 80, 240)}ms`,
                    }
                  : { transitionDelay: `${Math.min(index * 80, 240)}ms` }
              }
            >
              <div className="relative flex w-full items-center justify-center">
                <div className="group relative inline-flex max-w-full overflow-hidden bg-border/20">
                  <img
                    src={item.image}
                    alt={`${item.title} cover`}
                    loading="lazy"
                    className={`max-h-[85vh] w-auto max-w-full object-contain transition-all duration-1000 ease-out ${
                      pageReady ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"
                    }`}
                  />
                  <div className="pointer-events-none absolute inset-0 z-10 bg-black/55 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100" />
                  <Link
                    to={`/photography/${item.id}`}
                    className="nav-underline pointer-events-auto absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer font-serif text-2xl tracking-tight text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.85)] opacity-0 transition-opacity duration-500 mix-blend-exclusion group-hover:opacity-100 group-focus-within:opacity-100 md:text-4xl"
                    aria-label={`${item.title} gallery`}
                  >
                    {item.title}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Photography;
