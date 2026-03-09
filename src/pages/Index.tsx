import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { ArrowRight, Shield, Wrench, Monitor, Award, ChevronLeft, ChevronRight } from "lucide-react";
import heroImg from "@/assets/hero-home.jpg";
import SectionHeading from "@/components/SectionHeading";
import { projects } from "@/data/projects";

const stats = [
  { icon: Award, value: "20+", label: "Ýyl tejribe" },
  { icon: Shield, value: "TDS", label: "Döwlet standartlary" },
  { icon: Wrench, value: "500+", label: "Tamamlanan taslamalar" },
  { icon: Monitor, value: "24/7", label: "Hyzmat goldawy" },
];

const Index = () => {
  const featured = useMemo(() => {
    const pool = [...projects];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, 8);
  }, []);

  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % featured.length), 3000);
    return () => clearInterval(t);
  }, [featured.length]);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[500px] flex items-center">
        <img src={heroImg} alt="Berk Bilek metal işleri" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay opacity-80" />
        <div className="relative container z-10">
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-charcoal-foreground uppercase leading-tight max-w-3xl tracking-wide">
            Berk Bilek
          </h1>
          <p className="mt-4 text-lg md:text-xl text-charcoal-foreground/80 max-w-xl leading-relaxed">
            20 ýyllyk tejribe we ýokary hilli hyzmatlar.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/portfolio" className="btn-cta text-primary-foreground px-6 py-3 rounded font-semibold inline-flex items-center gap-2 transition-transform hover:scale-105">
              Işlerimizi görüň <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="border border-charcoal-foreground/30 text-charcoal-foreground px-6 py-3 rounded font-semibold hover:bg-charcoal-foreground/10 transition-colors">
              Habarlaşmak
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-charcoal py-12">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <s.icon className="mx-auto mb-2 text-primary" size={28} />
              <p className="font-display text-2xl font-bold text-charcoal-foreground">{s.value}</p>
              <p className="text-sm text-charcoal-foreground/60">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects Carousel */}
      <section className="py-20">
        <div className="container">
          <SectionHeading title="Saýlanan taslamalar" subtitle="Biziň iň gowy işlerimiz bilen tanyşyň." />
          <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: "16/7" }}>
            {featured.map((p, i) => (
              <div
                key={p.id}
                className={`absolute inset-0 transition-opacity duration-700 ${i === slide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
              >
                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-6 py-5">
                  <p className="font-display text-white text-base md:text-lg uppercase tracking-wide">{p.title}</p>
                </div>
              </div>
            ))}
            {/* Prev / Next */}
            <button
              onClick={() => setSlide((s) => (s - 1 + featured.length) % featured.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setSlide((s) => (s + 1) % featured.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
            {/* Dots */}
            <div className="absolute bottom-4 right-6 z-20 flex gap-2">
              {featured.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${i === slide ? "bg-primary" : "bg-white/50"}`}
                />
              ))}
            </div>
          </div>
          <div className="text-center mt-10">
            <Link to="/portfolio" className="btn-cta text-primary-foreground px-6 py-3 rounded font-semibold inline-flex items-center gap-2">
              Ähli işleri görüň <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Services overview */}
      <section className="bg-charcoal py-20">
        <div className="container">
          <SectionHeading title="Hyzmatlarymyz" subtitle="Metal işlerinden mahabat hyzmatlaryna çenli doly çözgütler." light />
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link to="/metalworks" className="group bg-charcoal-foreground/5 border border-charcoal-foreground/10 rounded-lg p-8 hover:border-primary/50 transition-colors">
              <Wrench className="text-primary mb-4" size={32} />
              <h3 className="font-display text-xl font-semibold text-charcoal-foreground uppercase">Metal işleri</h3>
              <p className="mt-2 text-sm text-charcoal-foreground/60">Metal kesmek, infrastruktura taslamalary we ýol howpsuzlyk enjamlary.</p>
            </Link>
            <Link to="/advertising" className="group bg-charcoal-foreground/5 border border-charcoal-foreground/10 rounded-lg p-8 hover:border-primary/50 transition-colors">
              <Monitor className="text-primary mb-4" size={32} />
              <h3 className="font-display text-xl font-semibold text-charcoal-foreground uppercase">Mahabat hyzmatlary</h3>
              <p className="mt-2 text-sm text-charcoal-foreground/60">Çap etmek, LED ekranlar we 3D animasiýa hyzmatlary.</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
