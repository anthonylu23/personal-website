import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

type NavItem =
  | { label: string; to: string; type: "route" }
  | { label: string; hash: string; type: "hash" };

export const navItems: NavItem[] = [
  { label: "Home", to: "/", type: "route" },
  { label: "About", hash: "#about", type: "hash" },
  { label: "Contact", hash: "#contact", type: "hash" },
  { label: "Projects", to: "/projects", type: "route" },
  { label: "Photography", to: "/photography", type: "route" },
];

const Navbar = () => {
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

  const renderNavItem = (item: NavItem, variant: "desktop" | "mobile") => {
    const commonClasses =
      "text-slate-300 transition hover:text-accent" +
      (variant === "mobile"
        ? " block rounded-xl border border-white/5 bg-white/5 px-4 py-3"
        : "");

    if (item.type === "route") {
      return (
        <Link
          key={item.label}
          to={item.to}
          className={commonClasses}
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
        className={commonClasses + " text-left"}
        onClick={() => handleHashNav(item.hash)}
      >
        {item.label}
      </button>
    );
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-0">
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight text-white transition hover:text-accent"
          onClick={closeMenu}
        >
          Anthony Lu<span className="text-accent"></span>
        </Link>

        <nav className="hidden gap-8 rounded-full border border-white/5 bg-white/5 px-6 py-2 text-sm font-medium shadow-lg shadow-black/20 md:flex">
          {navItems.map((item) => renderNavItem(item, "desktop"))}
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-white/10 p-2 text-slate-200 transition hover:border-accent/50 hover:text-accent md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-white/5 bg-background/95 px-4 py-4 md:hidden">
          <nav className="flex flex-col space-y-3 text-base">
            {navItems.map((item) => renderNavItem(item, "mobile"))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
