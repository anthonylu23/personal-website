import { gallery } from '../data/content'

const Photography = () => (
  <main className="mx-auto flex max-w-6xl flex-col gap-16 px-4 pb-24 pt-32 lg:px-0">
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">Photography</p>
      <h1 className="mt-3 text-4xl font-semibold text-white text-balance">Photography Work</h1>
      <p className="mt-4 text-lg text-slate-400">
        Visual stories from recent expeditions—texture, light, and motion captured across continents.
      </p>
    </div>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {gallery.map((photo) => (
        <figure key={photo.title} className="group overflow-hidden rounded-3xl border border-white/5 bg-white/5">
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
              <p className="text-sm text-slate-300">{photo.location}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {photo.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </figure>
      ))}
    </div>
  </main>
)

export default Photography
