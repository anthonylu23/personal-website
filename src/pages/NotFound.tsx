import { Link } from "react-router-dom";
import { BLOG_ENABLED } from "@/config/features";

const NotFound = () => {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-6 px-4 pt-[calc(8rem+var(--safe-area-top,0px))] text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-textSecondary/80">
        404
      </p>
      <h1 className="text-4xl font-semibold text-textPrimary md:text-5xl">
        Page not found
      </h1>
      <p className="max-w-xl text-base text-textSecondary">
        The route you requested does not exist. Try one of these pages instead.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-textInverse transition hover:bg-accentHover"
        >
          Home
        </Link>
        {BLOG_ENABLED && (
          <Link
            to="/blog"
            className="rounded-full border border-border bg-surface px-5 py-2 text-sm font-semibold text-textPrimary transition hover:border-accent/60"
          >
            Blog
          </Link>
        )}
        <Link
          to="/photography"
          className="rounded-full border border-border bg-surface px-5 py-2 text-sm font-semibold text-textPrimary transition hover:border-accent/60"
        >
          Photography
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
