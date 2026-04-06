import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
  </svg>
);

const Footer = () => (
  <footer className="bg-charcoal text-charcoal-foreground">
    <div className="container py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-xl font-bold tracking-wider uppercase mb-4">Berk Bilek</h3>
        <p className="text-charcoal-foreground/60 text-sm leading-relaxed">
          20 ýyllyk tejribe bilen metal işleri we mahabat hyzmatlarynda ygtybarly hyzmatdaş.
        </p>
      </div>
      <div>
        <h4 className="font-display text-sm font-semibold uppercase tracking-wider mb-4 text-primary">Sahypalar</h4>
        <div className="flex flex-col gap-2">
          {[
            { to: "/", label: "Baş sahypa" },
            { to: "/portfolio", label: "Işlerimiz" },
            { to: "/metalworks", label: "Metal/Mebel işleri" },
            { to: "/advertising", label: "Mahabat hyzmatlary" },
            { to: "/about", label: "Biz barada" },
            { to: "/contact", label: "Habarlaşmak" },
          ].map((l) => (
            <Link key={l.to} to={l.to} className="text-sm text-charcoal-foreground/60 hover:text-charcoal-foreground transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-display text-sm font-semibold uppercase tracking-wider mb-4 text-primary">Habarlaşmak</h4>
        <div className="flex flex-col gap-3 text-sm text-charcoal-foreground/60">
          <span className="flex items-center gap-2"><Phone size={14} /> +993 12 76 50 10</span>
          <span className="flex items-center gap-2"><Phone size={14} /> +993 12 76 59 08</span>
          <span className="flex items-center gap-2"><Mail size={14} /> berkbilek2020@gmail.com</span>
          <span className="flex items-center gap-2"><MapPin size={14} /> Berkararlyk, köçe. 1938, jaý 76, Aşgabat</span>
          <div className="flex items-center gap-3 pt-1">
            <a
              href="https://www.instagram.com/berkbilek765010"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-charcoal-foreground transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon /> Instagram
            </a>
            <a
              href="https://www.tiktok.com/@berk_bilek765010"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-charcoal-foreground transition-colors"
              aria-label="TikTok"
            >
              <TikTokIcon /> TikTok
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="border-t border-charcoal-foreground/10 py-4">
      <p className="text-center text-xs text-charcoal-foreground/40">© 2026 Berk Bilek. Ähli hukuklar goragly.</p>
    </div>
  </footer>
);

export default Footer;
