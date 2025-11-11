import GlassSurface from "../components/GlassSurface";
import { gallery } from "../data/content";

const Photography = () => {
  const [highlight, ...rest] = gallery;

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-24 pt-24 text-textInverse lg:px-0">
      {highlight && (
        <section className="flex min-h-[70vh] items-center justify-center">
          <GlassSurface
            width="100%"
            height="auto"
            borderRadius={32}
            backgroundOpacity={0.15}
            opacity={0.6}
            blur={18}
            quality="low"
            className="overflow-hidden"
          >
            <figure className="group h-full w-full">
              <div className="relative aspect-[16/9]">
                <img
                  src={highlight.image}
                  alt={highlight.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-lg font-semibold text-white">
                    {highlight.title}
                  </p>
                  <p className="text-sm text-white/80">{highlight.location}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {highlight.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/40 bg-white/15 px-3 py-1 text-xs text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </figure>
          </GlassSurface>
        </section>
      )}
      <section className="flex flex-col items-center gap-6">
        {rest.map((photo, index) => (
          <GlassSurface
            key={`${photo.title}-${index}`}
            width="100%"
            height="auto"
            borderRadius={32}
            backgroundOpacity={0.15}
            opacity={0.55}
            blur={16}
            quality="low"
            className="overflow-hidden"
          >
            <figure className="group h-full w-full">
              <div className="relative aspect-[16/9]">
                <img
                  src={photo.image}
                  alt={photo.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-lg font-semibold text-white">
                    {photo.title}
                  </p>
                  <p className="text-sm text-white/80">{photo.location}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {photo.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/40 bg-white/15 px-3 py-1 text-xs text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </figure>
          </GlassSurface>
        ))}
      </section>
    </main>
  );
};

export default Photography;
