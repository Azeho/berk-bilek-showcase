import { useState, useMemo } from "react";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import Lightbox from "@/components/Lightbox";
import { projects, ProjectCategory } from "@/data/projects";
import { Play } from "lucide-react";

type Filter = "all" | ProjectCategory;

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "Hemmesi" },
  { key: "metal", label: "Metal işleri" },
  { key: "advertising", label: "Mahabat hyzmatlary" },
];

const videos = [
  { title: "Polat konstruksiýa gurnamasy", thumbnail: "https://images.unsplash.com/photo-1504917595217-d4dc5efe5a68?w=600&q=80" },
  { title: "LED mahabat ulgamy", thumbnail: "https://images.unsplash.com/photo-1563906267088-b029e7101114?w=600&q=80" },
  { title: "3D animasiýa görkezmesi", thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80" },
];

const Portfolio = () => {
  const [filter, setFilter] = useState<Filter>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  const lightboxImages = filtered.map((p) => ({ src: p.image, title: p.title }));

  return (
    <div>
      {/* Header */}
      <section className="bg-charcoal py-16">
        <div className="container">
          <SectionHeading title="Işlerimiz" subtitle="Tamamlanan taslamalarymyz bilen tanyşyň." light />
        </div>
      </section>

      {/* Filter + Gallery */}
      <section className="py-16">
        <div className="container">
          {/* Filters */}
          <div className="flex justify-center gap-3 mb-10">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-5 py-2 rounded font-display text-sm uppercase tracking-wider font-medium transition-colors ${
                  filter === f.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <ProjectCard
                key={p.id}
                image={p.image}
                title={p.title}
                description={p.description}
                onClick={() => setLightboxIndex(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="bg-charcoal py-16">
        <div className="container">
          <SectionHeading title="Wideo görkezmeler" subtitle="Işlerimizi wideo arkaly görüň." light />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((v) => (
              <div key={v.title} className="relative group rounded overflow-hidden aspect-video bg-charcoal-foreground/5 cursor-pointer">
                <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" loading="lazy" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="text-primary-foreground ml-1" size={28} />
                  </div>
                </div>
                <p className="absolute bottom-4 left-4 right-4 font-display text-sm text-charcoal-foreground uppercase tracking-wide">{v.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNext={() => setLightboxIndex((lightboxIndex + 1) % filtered.length)}
          onPrev={() => setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length)}
        />
      )}
    </div>
  );
};

export default Portfolio;
