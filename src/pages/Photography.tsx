import InfiniteGallery from "../components/InfiniteGallery";
import { gallery } from "../data/content";

const Photography = () => {
  const images = gallery.map((item) => ({ src: item.image, alt: item.title }));

  return (
    <main className="min-h-screen">
      <InfiniteGallery
        images={images}
        speed={1.2}
        zSpacing={3}
        visibleCount={12}
        falloff={{ near: 6, far: 18 }}
        className="h-screen w-full overflow-hidden rounded-lg"
      />
      <div className="pointer-events-none fixed inset-0 z-20 flex items-center justify-center px-3 text-center text-white mix-blend-exclusion">
        <h1 className="nav-underline pointer-events-auto cursor-pointer font-serif text-4xl tracking-tight md:text-7xl">
          <span className="italic">view</span> gallery
        </h1>
      </div>
      <div className="pointer-events-none fixed bottom-10 left-0 right-0 z-20 text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-textPrimary/90">
        <p>Use mouse wheel, arrow keys, or touch to navigate</p>
        <p className="opacity-60">
          Auto-play resumes after 3 seconds of inactivity
        </p>
      </div>
    </main>
  );
};

export default Photography;
