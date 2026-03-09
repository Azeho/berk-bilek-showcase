import { useState, useMemo } from "react";
import { Scissors, Lightbulb, ShieldCheck } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import Lightbox from "@/components/Lightbox";
import { projects } from "@/data/projects";
import heroImg from "@/assets/hero-metalworks.jpg";

const services = [
  {
    icon: Scissors,
    title: "Metal kesmek",
    desc: "CNC plazma we lazer enjamlar bilen ýokary takyklykly metal kesmek hyzmatlary.",
  },
  {
    icon: Lightbulb,
    title: "Şäher infrastrukturasy",
    desc: "Yşyklandyrma sütünleri, awtobus duralgalary we beýleki şäher infrastruktura taslamalary.",
  },
  {
    icon: ShieldCheck,
    title: "Ýol howpsuzlyk enjamlary",
    desc: "Döwlet standartlaryna laýyk ýol germewleri we howpsuzlyk enjamlary öndürmek.",
  },
];

type VideoFilter = "all" | "metal" | "gurnama";

const videoFilters: { key: VideoFilter; label: string }[] = [
  { key: "all",     label: "Hemmesi" },
  { key: "metal",   label: "Metal" },
  { key: "gurnama", label: "Gurnama" },
];

const videos: { src: string; title: string; categories: VideoFilter[] }[] = [
  { src: "https://berkbilek.org/videoshorts/v1m.mp4",  title: "Metal işleri",            categories: ["metal"] },
  { src: "https://berkbilek.org/videoshorts/v2m.mp4",  title: "Metal işleri",            categories: ["metal"] },
  { src: "https://berkbilek.org/videoshorts/v3m.mp4",  title: "Metal işleri",            categories: ["metal"] },
  { src: "https://berkbilek.org/videoshorts/v4m.mp4",  title: "Metal işleri",            categories: ["metal"] },
  { src: "https://berkbilek.org/videoshorts/v5m.mp4",  title: "Metal işleri",            categories: ["metal"] },
  { src: "https://berkbilek.org/videoshorts/v9m.mp4",  title: "Metal işleri",            categories: ["metal"] },
  { src: "https://berkbilek.org/videoshorts/v10m.mp4", title: "Metal işleri",            categories: ["metal"] },
  { src: "https://berkbilek.org/videoshorts/v12m.mp4", title: "Metal işleri",            categories: ["metal"] },
  { src: "https://berkbilek.org/videoshorts/v13m.mp4", title: "Metal işleri",            categories: ["metal"] },
  { src: "https://berkbilek.org/videoshorts/v15f.mp4", title: "Mebel işleri",            categories: ["gurnama"] },
  { src: "https://berkbilek.org/videoshorts/v18mf.mp4", title: "Metal we Mebel işleri",   categories: ["metal", "gurnama"] },
  { src: "https://berkbilek.org/videoshorts/v19mf.mp4", title: "Metal we Mebel işleri",   categories: ["metal", "gurnama"] },
  { src: "https://berkbilek.org/videoshorts/v20m.mp4",  title: "Metal işleri",            categories: ["metal"] },
  { src: "https://berkbilek.org/videoshorts/v21c.mp4",  title: "Metal we Gurnama işleri", categories: ["metal", "gurnama"] },
  { src: "https://berkbilek.org/videoshorts/v22c.mp4",  title: "Metal we Gurnama işleri", categories: ["metal", "gurnama"] },
];

const Metalworks = () => {
  const metalProjects = projects.filter((p) => p.category === "metal");
  const [videoFilter, setVideoFilter] = useState<VideoFilter>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lightboxImages = metalProjects.map((p) => ({ src: p.image, title: p.title }));

  const filteredVideos = useMemo(
    () => (videoFilter === "all" ? videos : videos.filter((v) => v.categories.includes(videoFilter))),
    [videoFilter]
  );

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[300px] flex items-center">
        <img src={heroImg} alt="Metal işleri" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay opacity-85" />
        <div className="relative container z-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-charcoal-foreground uppercase tracking-wider">
            Metal işleri
          </h1>
          <p className="mt-3 text-charcoal-foreground/70 max-w-lg">
            Ýokary hilli metal önümleri we infrastruktura çözgütleri.
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
          <SectionHeading title="Metal işleri taslamalary" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metalProjects.map((p, i) => (
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
          onNext={() => setLightboxIndex((lightboxIndex + 1) % metalProjects.length)}
          onPrev={() => setLightboxIndex((lightboxIndex - 1 + metalProjects.length) % metalProjects.length)}
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

export default Metalworks;
