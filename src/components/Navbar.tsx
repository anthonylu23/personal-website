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
    const base = "text-textSecondary transition hover:text-accent"
    const mobileClasses =
      "block rounded-2xl border border-border/40 bg-surface/80 px-4 py-3 text-left"
    const desktopClasses = ""
    const commonClasses = `${base} ${variant === "mobile" ? mobileClasses : desktopClasses}`.trim()

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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-base/90 backdrop-blur">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-0">
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight text-textPrimary transition hover:text-accent"
          onClick={closeMenu}
        >
          Anthony Lu<span className="text-accent"></span>
        </Link>

        <nav className="hidden gap-8 rounded-full border border-border bg-surface px-6 py-2 text-sm font-medium shadow-lg shadow-black/30 md:flex">
          {navItems.map((item) => renderNavItem(item, "desktop"))}
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-border bg-elevated p-2 text-textPrimary transition hover:border-accent/50 hover:text-accent md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        {isOpen && (
          <div className="absolute right-0 top-[calc(100%+12px)] z-10 w-[min(80vw,260px)] rounded-3xl border border-border bg-base/95 p-4 shadow-xl shadow-black/40 md:hidden">
            <nav className="flex flex-col space-y-3 text-base">
              {navItems.map((item) => renderNavItem(item, "mobile"))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
