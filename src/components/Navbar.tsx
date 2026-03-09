import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Globe } from "lucide-react";
import logo from "@/assets/logo.png";

const navLinks = [
  { to: "/", label: "Baş sahypa" },
  { to: "/portfolio", label: "Işlerimiz" },
  { to: "/metalworks", label: "Metal işleri" },
  { to: "/advertising", label: "Mahabat hyzmatlary" },
  { to: "/about", label: "Biz barada" },
  { to: "/contact", label: "Habarlaşmak" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showTranslate, setShowTranslate] = useState(false);
  const location = useLocation();
  const desktopBtnRef = useRef<HTMLButtonElement>(null);
  const mobileBtnRef = useRef<HTMLButtonElement>(null);

  const getVisibleBtn = () => {
    // Return whichever button is actually visible (non-zero bounding rect)
    const d = desktopBtnRef.current;
    if (d && d.getBoundingClientRect().width > 0) return d;
    return mobileBtnRef.current;
  };

  // Position and show/hide the Google Translate widget under the visible globe button
  useEffect(() => {
    const el = document.getElementById("google_translate_element");
    if (!el) return;
    if (showTranslate) {
      const btn = getVisibleBtn();
      if (btn) {
        const rect = btn.getBoundingClientRect();
        el.style.cssText = `display:block;position:fixed;top:${rect.bottom + 4}px;right:${window.innerWidth - rect.right}px;z-index:99999;background:#fff;border-radius:6px;box-shadow:0 4px 16px rgba(0,0,0,0.25);padding:6px 10px;`;
      }
    } else {
      el.style.display = "none";
    }
  }, [showTranslate]);

  // Close on outside click
  useEffect(() => {
    if (!showTranslate) return;
    const handler = (e: MouseEvent) => {
      const el = document.getElementById("google_translate_element");
      const clickedBtn = desktopBtnRef.current?.contains(e.target as Node) || mobileBtnRef.current?.contains(e.target as Node);
      if (el && !el.contains(e.target as Node) && !clickedBtn) {
        setShowTranslate(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showTranslate]);

  return (
    <nav className="sticky top-0 z-50 bg-charcoal border-b border-charcoal/80">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Berk Bilek" className="h-10 w-auto" />
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 text-sm font-medium tracking-wide uppercase transition-colors ${
                location.pathname === link.to
                  ? "text-primary"
                  : "text-charcoal-foreground/70 hover:text-charcoal-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            ref={desktopBtnRef}
            onClick={() => setShowTranslate((v) => !v)}
            title="Translate"
            className={`ml-2 p-2 rounded transition-colors ${showTranslate ? "text-primary" : "text-charcoal-foreground/70 hover:text-charcoal-foreground"}`}
          >
            <Globe size={18} />
          </button>
          <a
            href="tel:+993127650010"
            className="ml-2 flex items-center gap-2 btn-cta text-primary-foreground px-4 py-2 rounded text-sm font-semibold"
          >
            <Phone size={14} />
            Jaň ediň
          </a>
        </div>

        {/* Mobile translate + toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            ref={mobileBtnRef}
            onClick={() => setShowTranslate((v) => !v)}
            title="Translate"
            className={`p-2 rounded transition-colors ${showTranslate ? "text-primary" : "text-charcoal-foreground/70"}`}
          >
            <Globe size={18} />
          </button>
        <button onClick={() => setOpen(!open)} className="text-charcoal-foreground">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-charcoal border-t border-charcoal/80 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`block px-6 py-3 text-sm font-medium uppercase tracking-wide ${
                location.pathname === link.to
                  ? "text-primary"
                  : "text-charcoal-foreground/70"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="px-6 pt-3">
            <a
              href="tel:+993127650010"
              className="flex items-center justify-center gap-2 btn-cta text-primary-foreground px-4 py-2 rounded text-sm font-semibold w-full"
            >
              <Phone size={14} />
              Jaň ediň
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
