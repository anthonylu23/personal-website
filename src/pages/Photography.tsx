import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import InfiniteGallery from "../components/InfiniteGallery";
import { gallery } from "../data/gallery";

const Photography = () => {
  const images = gallery.map((item) => ({
    src: item.imageWebp ?? item.image,
    alt: item.title,
  }));
  const [navOffset, setNavOffset] = useState(0);
  const [overlayOpacity, setOverlayOpacity] = useState(1);
  const [galleryReady, setGalleryReady] = useState(false);
  const coversRef = useRef<HTMLElement | null>(null);

  const handleViewGallery = () => {
    coversRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
    if (typeof document === "undefined") {
      return;
    }
    if (!galleryReady) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
  }, [galleryReady]);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") {
        return;
      }
      const fadeDistance = window.innerHeight * 0.6;
      const progress = Math.min(
        Math.max(window.scrollY / Math.max(fadeDistance, 1), 0),
        1
      );
      const nextOpacity = 1 - progress;
      setOverlayOpacity((prev) =>
        Math.abs(prev - nextOpacity) < 0.01 ? prev : nextOpacity
      );
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <main className="min-h-screen">
      <InfiniteGallery
        images={images}
        speed={1.2}
        zSpacing={3}
        visibleCount={12}
        falloff={{ near: 6, far: 18 }}
        className="h-screen w-full overflow-hidden rounded-lg"
        onReady={() => setGalleryReady(true)}
      />
      <div
        className="fixed inset-0 z-30 flex items-center justify-center bg-base/70 backdrop-blur-sm transition-opacity duration-500"
        style={{
          opacity: galleryReady ? 0 : 1,
          pointerEvents: galleryReady ? "none" : "auto",
        }}
        aria-hidden={galleryReady}
      >
        <div className="flex flex-col items-center gap-4 text-textPrimary">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-textPrimary/30 border-t-textPrimary" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-textPrimary/80">
            Loading gallery
          </span>
        </div>
      </div>
      <div
        className="photography-hero-overlay pointer-events-none fixed inset-0 z-20 flex items-center justify-center px-3 text-center text-white mix-blend-exclusion transition-opacity duration-200"
        style={{ opacity: overlayOpacity }}
        aria-hidden={overlayOpacity <= 0.05}
      >
        <h1
          className="nav-underline pointer-events-auto cursor-pointer font-serif text-4xl tracking-tight md:text-7xl"
          style={{ pointerEvents: overlayOpacity <= 0.05 ? "none" : "auto" }}
          onClick={handleViewGallery}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              handleViewGallery();
            }
          }}
          role="button"
          tabIndex={0}
        >
          <span className="italic">view</span> gallery
        </h1>
      </div>
      <div
        className="pointer-events-none fixed bottom-10 left-0 right-0 z-20 text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-textPrimary/90 font-sans transition-opacity duration-200"
        style={{ opacity: overlayOpacity }}
        aria-hidden={overlayOpacity <= 0.05}
      >
        <p>Use mouse wheel, arrow keys, or touch to navigate</p>
        <p className="opacity-60">
          Auto-play resumes after 3 seconds of inactivity
        </p>
      </div>
      <section
        ref={coversRef}
        className="relative z-10 bg-base px-4 pb-24 pt-16 md:px-8"
        style={navOffset ? { paddingTop: navOffset } : undefined}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-16">
          {gallery.map((item, index) => (
            <article
              key={item.title}
              className="flex min-h-[70vh] w-full items-center md:min-h-[85vh]"
              style={
                index === 0 && navOffset
                  ? { minHeight: `calc(100vh - ${navOffset}px)` }
                  : undefined
              }
            >
              <div className="relative flex w-full items-center justify-center">
                <div className="group relative inline-flex max-w-full">
                  <img
                    src={item.image}
                    alt={`${item.title} cover`}
                    loading="lazy"
                    className="max-h-[85vh] w-auto max-w-full object-contain"
                  />
                  <div className="pointer-events-none absolute inset-0 z-10 bg-black/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100" />
                  <Link
                    to={`/photography/${item.id}`}
                    className="nav-underline pointer-events-auto absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer font-serif text-2xl tracking-tight text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.85)] opacity-0 transition-opacity duration-300 mix-blend-exclusion group-hover:opacity-100 group-focus-within:opacity-100 md:text-4xl"
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
