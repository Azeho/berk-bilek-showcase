import { Scissors, Lightbulb, ShieldCheck } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
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

const Metalworks = () => {
  const metalProjects = projects.filter((p) => p.category === "metal");

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
            {metalProjects.map((p) => (
              <ProjectCard key={p.id} image={p.image} title={p.title} description={p.description} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Metalworks;
