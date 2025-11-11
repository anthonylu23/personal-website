import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GlassSurface from "./GlassSurface";
import { navItems } from "./Navbar";

const GlassNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const handleHashNav = (hash: string) => {
    const scrollToHash = () => {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scrollToHash, 60);
    } else {
      scrollToHash();
    }

    closeMenu();
  };

  const renderItem = (item: (typeof navItems)[number]) => {
    if (item.type === "route") {
      return (
        <Link
          key={item.label}
          to={item.to}
          className="text-sm font-medium text-white/80 transition hover:text-accent"
          onClick={closeMenu}
        >
          {item.label}
        </Link>
      );
    }

    return (
      <button
        key={item.label}
        type="button"
        onClick={() => handleHashNav(item.hash)}
        className="text-sm font-medium text-white/80 transition hover:text-accent"
      >
        {item.label}
      </button>
    );
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div className="relative mx-auto w-full max-w-5xl">
        <GlassSurface
          width="100%"
          height="auto"
          borderRadius={60}
          backgroundOpacity={0.15}
          opacity={0.55}
          blur={16}
          className="relative w-full overflow-visible"
        >
          <div className="flex w-full items-center justify-between px-6 py-3">
            <Link
              to="/"
              className="text-base truncate font-semibold tracking-tight text-white hover:text-accent transition"
              onClick={closeMenu}
            >
              luanthony.xyz
            </Link>
            <nav className="hidden items-center gap-6 md:flex">
              {navItems.map(renderItem)}
            </nav>
            <div className="md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full border border-white/50 bg-transparent p-2 text-white transition hover:text-accent hover:border-accent"
                onClick={toggleMenu}
                aria-label="Toggle navigation"
              >
                {isOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </GlassSurface>
        {isOpen && (
          <GlassSurface
            width="100%"
            height="auto"
            borderRadius={40}
            backgroundOpacity={0.2}
            opacity={0.65}
            blur={18}
            className="absolute right-0 top-[calc(100%+12px)] z-10 w-[min(80vw,260px)] px-4 py-4 md:hidden"
          >
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    if (item.type === "route") {
                      navigate(item.to);
                      closeMenu();
                      return;
                    }
                    handleHashNav(item.hash);
                  }}
                  className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-left text-base font-medium text-white transition hover:text-accent hover:bg-white/20"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </GlassSurface>
        )}
      </div>
    </header>
  );
};

export default GlassNavbar;
