import { Printer, MonitorPlay, Box } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import heroImg from "@/assets/hero-advertising.jpg";

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

const Advertising = () => {
  const adProjects = projects.filter((p) => p.category === "advertising");

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
            {adProjects.map((p) => (
              <ProjectCard key={p.id} image={p.image} title={p.title} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Advertising;
