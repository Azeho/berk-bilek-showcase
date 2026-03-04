import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

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
            { to: "/metalworks", label: "Metal işleri" },
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
          <span className="flex items-center gap-2"><Phone size={14} /> +993 12 00-00-00</span>
          <span className="flex items-center gap-2"><Mail size={14} /> info@berkbilek.tm</span>
          <span className="flex items-center gap-2"><MapPin size={14} /> Aşgabat, Türkmenistan</span>
        </div>
      </div>
    </div>
    <div className="border-t border-charcoal-foreground/10 py-4">
      <p className="text-center text-xs text-charcoal-foreground/40">© 2026 Berk Bilek. Ähli hukuklar goragly.</p>
    </div>
  </footer>
);

export default Footer;
