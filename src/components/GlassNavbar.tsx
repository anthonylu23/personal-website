import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NAVBAR_GLASS_ON_SCROLL } from "../config/features";
import { useTheme } from "../hooks/useTheme";
import GlassSurface from "./GlassSurface";
import { navItems } from "./Navbar";

// Stops mouse/touch clicks from focusing navbar controls, so no focus style
// lingers after a click. Keyboard and screen-reader focus is unaffected.
const preventPointerFocus = (event: ReactMouseEvent) => event.preventDefault();

// No focus ring: it gets clipped by the navbar's `overflow: hidden`. Keyboard
// focus is shown by the accent icon color (or the underline on text links).
const ICON_BUTTON_CLASS =
  "inline-flex items-center justify-center rounded-full p-2 text-textPrimary transition hover:text-accent focus-visible:text-accent focus-visible:outline-none";

const GlassNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isForcedGlass, setIsForcedGlass] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const showGlass = NAVBAR_GLASS_ON_SCROLL && (isScrolled || isForcedGlass);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (!NAVBAR_GLASS_ON_SCROLL) return;
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!NAVBAR_GLASS_ON_SCROLL) return;
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
          className="nav-underline rounded text-sm font-medium text-textPrimary/80 focus-visible:outline-none"
          onMouseDown={preventPointerFocus}
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
        onMouseDown={preventPointerFocus}
        onClick={() => handleHashNav(item.hash)}
        className="nav-underline text-sm font-medium text-textPrimary/80 focus-visible:outline-none"
      >
        {item.label}
      </button>
    );
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-4 pt-4 ${
        // Solid backdrop so content doesn't show through while glass is off.
        NAVBAR_GLASS_ON_SCROLL ? "" : "bg-base"
      }`}
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
            showGlass
              ? "glass-navbar--scrolled"
              : "glass-navbar--transparent"
          }`}
        >
          <div
            className={`flex w-full items-center gap-4 py-3 transition-[padding] duration-300 ${
              showGlass ? "px-6" : "px-0"
            }`}
          >
            <Link
              to="/"
              className="nav-underline truncate rounded text-base font-semibold tracking-tight text-textPrimary focus-visible:outline-none"
              onMouseDown={preventPointerFocus}
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
                className={ICON_BUTTON_CLASS}
                onMouseDown={preventPointerFocus}
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
                className={ICON_BUTTON_CLASS}
                onMouseDown={preventPointerFocus}
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
                className={ICON_BUTTON_CLASS}
                onMouseDown={preventPointerFocus}
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
                  onMouseDown={preventPointerFocus}
                  onClick={() => {
                    if (item.type === "route") {
                      navigate(item.to);
                      closeMenu();
                      return;
                    }
                    handleHashNav(item.hash);
                  }}
                  className="rounded-xl px-4 py-2.5 text-left text-sm font-medium text-textPrimary/80 transition hover:text-accent hover:bg-surface/60 focus-visible:text-accent focus-visible:bg-surface/60 focus-visible:outline-none"
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
