import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import GlassSurface from "../components/GlassSurface"
import type { GalleryItem } from "../data/content"
import { gallery } from "../data/content"

const Photography = () => {
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null)
  const [slideIndex, setSlideIndex] = useState(0)

  const openModal = (photo: GalleryItem) => {
    setActivePhoto(photo)
    setSlideIndex(0)
  }

  const closeModal = useCallback(() => {
    setActivePhoto(null)
    setSlideIndex(0)
  }, [])

  const showPrev = useCallback(() => {
    if (!activePhoto) return
    setSlideIndex((prev) =>
      prev === 0 ? activePhoto.galleryImages.length - 1 : prev - 1,
    )
  }, [activePhoto])

  const showNext = useCallback(() => {
    if (!activePhoto) return
    setSlideIndex((prev) =>
      prev === activePhoto.galleryImages.length - 1 ? 0 : prev + 1,
    )
  }, [activePhoto])

  useEffect(() => {
    if (typeof document === "undefined") return
    if (!activePhoto) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [activePhoto])

  useEffect(() => {
    if (!activePhoto) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal()
        return
      }
      if (event.key === "ArrowRight") {
        showNext()
        return
      }
      if (event.key === "ArrowLeft") {
        showPrev()
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [activePhoto, closeModal, showNext, showPrev])

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-[calc(6rem+var(--safe-area-bottom,0px))] pt-[calc(6rem+var(--safe-area-top,0px))] text-textInverse lg:px-0">
      <section className="flex flex-col gap-8">
        {gallery.map((photo, index) => (
          <GlassSurface
            key={`${photo.title}-${index}`}
            width="100%"
            height="auto"
            borderRadius={32}
            backgroundOpacity={0.15}
            opacity={index === 0 ? 0.6 : 0.55}
            blur={index === 0 ? 18 : 16}
            quality="low"
            className="overflow-hidden"
          >
            <button
              type="button"
              onClick={() => openModal(photo)}
              className="group block h-full w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              <figure className="h-full w-full">
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
            </button>
          </GlassSurface>
        ))}
      </section>
      {activePhoto && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4 py-12"
          onClick={closeModal}
        >
          <div className="w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
            <GlassSurface
              width="100%"
              height="auto"
              borderRadius={40}
              backgroundOpacity={0.2}
              opacity={0.75}
              blur={20}
              className="pointer-events-auto w-full"
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-label={`${activePhoto.title} slideshow`}
                className="flex flex-col gap-6 px-6 py-6 text-white/90"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xl font-semibold text-white">{activePhoto.title}</p>
                    <p className="text-sm text-white/70">{activePhoto.location}</p>
                  </div>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white transition hover:border-accent hover:bg-white/20 hover:text-accent"
                    aria-label="Close slideshow"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[28px] border border-white/20">
                  <img
                    src={activePhoto.galleryImages[slideIndex]}
                    alt={`${activePhoto.title} slide ${slideIndex + 1}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  {activePhoto.galleryImages.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={showPrev}
                        className="absolute left-4 top-1/2 inline-flex -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/40 p-3 text-white transition hover:border-accent hover:text-accent"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={showNext}
                        className="absolute right-4 top-1/2 inline-flex -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/40 p-3 text-white transition hover:border-accent hover:text-accent"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>
                {activePhoto.galleryImages.length > 1 && (
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {activePhoto.tags.map((tag) => (
                        <span
                          key={`modal-${activePhoto.title}-${tag}`}
                          className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-wide text-white/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {activePhoto.galleryImages.map((_, dotIndex) => (
                        <button
                          key={`${activePhoto.title}-dot-${dotIndex}`}
                          type="button"
                          onClick={() => setSlideIndex(dotIndex)}
                          className={`h-2.5 w-2.5 rounded-full transition ${
                            dotIndex === slideIndex
                              ? "bg-accent shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                              : "bg-white/30 hover:bg-white/60"
                          }`}
                          aria-label={`Go to image ${dotIndex + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </GlassSurface>
          </div>
        </div>
      )}
    </main>
  )
}

export default Photography
