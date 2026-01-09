import { Link, useParams } from "react-router-dom";
import { gallery } from "../data/content";

const PhotographyProject = () => {
  const { id } = useParams<{ id: string }>();
  const project = gallery.find((item) => item.id === id);

  if (!project) {
    return (
      <main className="min-h-screen bg-base px-6 py-20">
        <Link
          to="/photography"
          className="text-xs uppercase tracking-[0.3em] text-textPrimary/80 hover:text-accent"
        >
          Back
        </Link>
        <p className="mt-10 text-lg text-textPrimary/80">
          Project not found.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-base px-6 pb-20 pt-24 md:px-10">
      <div
        className="fixed inset-x-0 top-0 z-50 px-6 pt-4 md:px-10"
        style={{
          paddingTop: "calc(1rem + env(safe-area-inset-top, 0px))",
        }}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between py-3">
          <Link
            to="/photography"
            className="text-2xl font-medium text-white/80 hover:text-accent"
            aria-label="Back"
          >
            ←
          </Link>
          <p className="text-right text-sm font-medium text-white/60">
            {project.title}
          </p>
        </div>
      </div>
      <section className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="grid grid-cols-1 gap-10">
          {project.galleryImages.map((src, index) => (
            <figure key={`${project.id}-${index}`} className="w-full">
              <img
                src={src}
                alt={`${project.title} photo ${index + 1}`}
                loading="lazy"
                className="h-[88vh] w-full object-contain"
              />
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
};

export default PhotographyProject;
