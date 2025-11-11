import GlassSurface from "../components/GlassSurface";
import { gallery } from "../data/content";

const Photography = () => (
  <main className="mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-24 pt-36 text-textInverse lg:px-0">
    <GlassSurface
      width="100%"
      height="auto"
      borderRadius={48}
      backgroundOpacity={0.2}
      opacity={0.65}
      blur={18}
      className="mx-auto w-full"
    >
      <div className="px-8 py-6">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-textInverse/70">
          Photography
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-textInverse text-balance">
          Photography Work
        </h1>
        <p className="mt-4 text-lg text-textInverse/80">
          Visual stories from recent expeditions—texture, light, and motion captured across continents.
        </p>
      </div>
    </GlassSurface>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {gallery.map((photo, index) => (
        <GlassSurface
          key={`${photo.title}-${index}`}
          width="100%"
          height="auto"
          borderRadius={32}
          backgroundOpacity={0.15}
          opacity={0.55}
          blur={16}
          className="overflow-hidden"
        >
          <figure className="group h-full">
            <div className="relative aspect-[4/5]">
              <img
                src={photo.image}
                alt={photo.title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-lg font-semibold text-white">{photo.title}</p>
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
    </div>
  </main>
);

export default Photography;
