import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import GlassSurface from "./GlassSurface";
import { navItems } from "./Navbar";

const GlassNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isForcedGlass, setIsForcedGlass] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleNavGlass = (event: Event) => {
      const detail = (event as CustomEvent<{ active?: boolean }>).detail;
      setIsForcedGlass(Boolean(detail?.active));
    };
    window.addEventListener("nav-glass", handleNavGlass as EventListener);
    return () =>
      window.removeEventListener("nav-glass", handleNavGlass as EventListener);
  }, []);

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
          className="nav-underline text-sm font-medium text-textPrimary/80"
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
        className="nav-underline text-sm font-medium text-textPrimary/80"
      >
        {item.label}
      </button>
    );
  };

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
      style={{
        paddingTop: "calc(1rem + env(safe-area-inset-top, 0px))",
        paddingLeft: "calc(1rem + env(safe-area-inset-left, 0px))",
        paddingRight: "calc(1rem + env(safe-area-inset-right, 0px))",
      }}
    >
      <div className="relative mx-auto w-full max-w-4xl">
        <GlassSurface
          width="100%"
          height="auto"
          borderRadius={60}
          backgroundOpacity={0.15}
          opacity={0.55}
          blur={10}
          className={`glass-navbar relative w-full overflow-visible ${
            isScrolled || isForcedGlass
              ? "glass-navbar--scrolled"
              : "glass-navbar--transparent"
          }`}
        >
          <div
            className={`flex w-full items-center gap-4 py-3 transition-[padding] duration-300 ${
              isScrolled || isForcedGlass ? "px-6" : "px-0"
            }`}
          >
            <Link
              to="/"
              className="nav-underline text-base truncate font-semibold tracking-tight text-textPrimary"
              onClick={(event) => {
                event.preventDefault();
                handleHashNav("#home");
              }}
            >
              luanthony.xyz
            </Link>
            <div className="ml-auto hidden items-center gap-3 md:flex">
              <nav className="flex items-center gap-6">
                {navItems.map(renderItem)}
              </nav>
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 text-textPrimary transition hover:text-accent"
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                aria-pressed={theme === "dark"}
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>
            </div>
            <div className="ml-auto flex items-center gap-2 md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 text-textPrimary transition hover:text-accent"
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                aria-pressed={theme === "dark"}
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 text-textPrimary transition hover:text-accent"
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
          <div
            className="absolute right-0 top-[calc(100%+8px)] z-10 w-fit rounded-2xl border border-border/20 bg-surface/80 px-1 py-1 backdrop-blur-lg md:hidden"
          >
            <nav className="flex flex-col">
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
                  className="rounded-xl px-4 py-2.5 text-left text-sm font-medium text-textPrimary/80 transition hover:text-accent hover:bg-surface/60"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default GlassNavbar;
