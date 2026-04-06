import { useState, useMemo } from "react";
import { Printer, MonitorPlay, Box } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import Lightbox from "@/components/Lightbox";
import { projects } from "@/data/projects";
import heroImg from "@/assets/hero-advertising.jpg";
import { useCanonical } from "@/hooks/useCanonical";

const services = [
  {
    icon: Printer,
    title: "Çap hyzmatlary",
    desc: "Bannerler, plakatlar we ähli görnüşli mahabat materiallarynyň ýokary hilli çap edilmegi.",
  },
  {
    icon: MonitorPlay,
    title: "LED ekranlar",
    desc: "Daşky we içki meýdan üçin uly ölçegli LED wideo ekranlaryň gurnamasy.",
  },
  {
    icon: Box,
    title: "3D animasiýa",
    desc: "Mahabat we tanyşdyrylyş üçin professional 3D animasiýa we wizuallaşdyrma.",
  },
];

type VideoFilter = "all" | "mahabat" | "gurnama";

const videoFilters: { key: VideoFilter; label: string }[] = [
  { key: "all",     label: "Hemmesi" },
  { key: "mahabat", label: "Mahabat" },
  { key: "gurnama", label: "Gurnama" },
];

const videos: { src: string; title: string; categories: VideoFilter[] }[] = [
  // Mahabat
  { src: "https://berk-bilek.com/videoshorts/r1.mp4",   title: "Mahabat işleri",            categories: ["mahabat"] },
  { src: "https://berk-bilek.com/videoshorts/r2.mp4",   title: "Mahabat işleri",            categories: ["mahabat"] },
  { src: "https://berk-bilek.com/videoshorts/r9.mp4",   title: "Mahabat işleri",            categories: ["mahabat"] },
  { src: "https://berk-bilek.com/videoshorts/r12.mp4",  title: "Mahabat işleri",            categories: ["mahabat"] },
  // Mahabat + Gurnama
  { src: "https://berk-bilek.com/videoshorts/rg3.mp4",  title: "Mahabat we Gurnama işleri", categories: ["mahabat", "gurnama"] },
  { src: "https://berk-bilek.com/videoshorts/rg4.mp4",  title: "Mahabat we Gurnama işleri", categories: ["mahabat", "gurnama"] },
  { src: "https://berk-bilek.com/videoshorts/rg5.mp4",  title: "Mahabat we Gurnama işleri", categories: ["mahabat", "gurnama"] },
  { src: "https://berk-bilek.com/videoshorts/rg6.mp4",  title: "Mahabat we Gurnama işleri", categories: ["mahabat", "gurnama"] },
  { src: "https://berk-bilek.com/videoshorts/rg7.mp4",  title: "Mahabat we Gurnama işleri", categories: ["mahabat", "gurnama"] },
  { src: "https://berk-bilek.com/videoshorts/rg8.mp4",  title: "Mahabat we Gurnama işleri", categories: ["mahabat", "gurnama"] },
  { src: "https://berk-bilek.com/videoshorts/rg10.mp4", title: "Mahabat we Gurnama işleri", categories: ["mahabat", "gurnama"] },
  { src: "https://berk-bilek.com/videoshorts/rg11.mp4", title: "Mahabat we Gurnama işleri", categories: ["mahabat", "gurnama"] },
];

const Advertising = () => {
  useCanonical("/advertising");
  const adProjects = projects.filter((p) => p.category === "advertising");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [videoFilter, setVideoFilter] = useState<VideoFilter>("all");
  const lightboxImages = adProjects.map((p) => ({ src: p.image, title: p.title }));
  const filteredVideos = useMemo(
    () => (videoFilter === "all" ? videos : videos.filter((v) => v.categories.includes(videoFilter))),
    [videoFilter]
  );

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[300px] flex items-center">
        <img src={heroImg} alt="Mahabat hyzmatlary" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay opacity-85" />
        <div className="relative container z-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-charcoal-foreground uppercase tracking-wider">
            Mahabat hyzmatlary
          </h1>
          <p className="mt-3 text-charcoal-foreground/70 max-w-lg">
            Doly görnüşli mahabat hyzmatlary — çap etmekden 3D animasiýa çenli.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container">
          <SectionHeading title="Hyzmatlarymyz" />
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((s) => (
              <div key={s.title} className="bg-card rounded-lg p-8 card-industrial text-center">
                <s.icon className="mx-auto mb-4 text-primary" size={36} />
                <h3 className="font-display text-lg font-semibold uppercase">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="bg-muted py-20">
        <div className="container">
          <SectionHeading title="Mahabat taslamalary" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {adProjects.map((p, i) => (
              <ProjectCard key={p.id} image={p.image} title={p.title} onClick={() => setLightboxIndex(i)} />
            ))}
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNext={() => setLightboxIndex((lightboxIndex + 1) % adProjects.length)}
          onPrev={() => setLightboxIndex((lightboxIndex - 1 + adProjects.length) % adProjects.length)}
        />
      )}

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
            {filteredVideos.length === 0 && (
              <p className="col-span-full text-center text-charcoal-foreground/50 py-10">Wideo ýok.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Advertising;
