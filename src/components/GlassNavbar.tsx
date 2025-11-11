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
          className="text-sm font-medium text-textInverse/80 transition hover:text-textInverse"
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
        className="text-sm font-medium text-textInverse/80 transition hover:text-textInverse"
      >
        {item.label}
      </button>
    );
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <GlassSurface
        width="100%"
        height="auto"
        borderRadius={60}
        backgroundOpacity={0.15}
        opacity={0.55}
        blur={16}
        className="w-full max-w-5xl"
      >
        <div className="flex w-full items-center justify-between px-6 py-3">
          <Link
            to="/"
            className="text-base font-semibold tracking-tight"
            onClick={closeMenu}
          >
            Anthony Lu
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map(renderItem)}
          </nav>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-white/50 p-2 text-textInverse md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </GlassSurface>
      {isOpen && (
        <GlassSurface
          width="100%"
          height="auto"
          borderRadius={32}
          backgroundOpacity={0.2}
          opacity={0.6}
          blur={18}
          className="absolute left-1/2 top-full mt-3 w-full max-w-xs -translate-x-1/2 px-5 py-4 md:hidden"
        >
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-white/10 pb-2 last:border-b-0 last:pb-0">
                {renderItem(item)}
              </div>
            ))}
          </nav>
        </GlassSurface>
      )}
    </header>
  );
};

export default GlassNavbar;
