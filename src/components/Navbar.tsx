import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
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
  const location = useLocation();

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
          <a
            href="tel:+99312000000"
            className="ml-4 flex items-center gap-2 btn-cta text-primary-foreground px-4 py-2 rounded text-sm font-semibold"
          >
            <Phone size={14} />
            Jaň ediň
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="lg:hidden text-charcoal-foreground">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
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
        </div>
      )}
    </nav>
  );
};

export default Navbar;
