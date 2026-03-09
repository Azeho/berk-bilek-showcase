import { useState, useMemo } from "react";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import Lightbox from "@/components/Lightbox";
import { projects, ProjectCategory } from "@/data/projects";

type Filter = "all" | ProjectCategory;
type VideoFilter = "all" | "metal" | "mahabat" | "gurnama";

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "Hemmesi" },
  { key: "metal", label: "Metal işleri" },
  { key: "advertising", label: "Mahabat hyzmatlary" },
];

const videoFilters: { key: VideoFilter; label: string }[] = [
  { key: "all", label: "Hemmesi" },
  { key: "metal", label: "Metal" },
  { key: "mahabat", label: "Mahabat" },
  { key: "gurnama", label: "Gurnama" },
];

const videos: { src: string; title: string; category: VideoFilter }[] = [
  { src: "https://berkbilek.org/videoshorts/v1m.mp4", title: "Metal işleri", category: "metal" },
  { src: "https://berkbilek.org/videoshorts/v2m.mp4", title: "Metal işleri", category: "metal" },
  { src: "https://berkbilek.org/videoshorts/v3m.mp4", title: "Metal işleri", category: "metal" },
  { src: "https://berkbilek.org/videoshorts/v4m.mp4", title: "Metal işleri", category: "metal" },
  { src: "https://berkbilek.org/videoshorts/v5m.mp4", title: "Metal işleri", category: "metal" },
  { src: "https://berkbilek.org/videoshorts/v9m.mp4", title: "Metal işleri", category: "metal" },
];

const Portfolio = () => {
  const [filter, setFilter] = useState<Filter>("all");
  const [videoFilter, setVideoFilter] = useState<VideoFilter>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  const lightboxImages = filtered.map((p) => ({ src: p.image, title: p.title }));
  const filteredVideos = useMemo(
    () => (videoFilter === "all" ? videos : videos.filter((v) => v.category === videoFilter)),
    [videoFilter]
  );

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
          {/* Video Filters */}
          <div className="flex justify-center gap-3 mb-10 flex-wrap">
            {videoFilters.map((f) => (
              <button
                key={f.key}
                onClick={() => setVideoFilter(f.key)}
                className={`px-5 py-2 rounded font-display text-sm uppercase tracking-wider font-medium transition-colors ${
                  videoFilter === f.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-charcoal-foreground/10 text-charcoal-foreground/70 hover:bg-charcoal-foreground/20"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((v, i) => (
              <div key={`${v.src}-${i}`} className="rounded overflow-hidden bg-charcoal-foreground/5">
                <video
                  src={v.src}
                  controls
                  preload="metadata"
                  className="w-full aspect-video object-cover"
                  playsInline
                />
                <p className="px-3 py-2 font-display text-sm text-charcoal-foreground uppercase tracking-wide">{v.title}</p>
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
