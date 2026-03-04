import { Award, Users, Target, CheckCircle } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const values = [
  { icon: Award, title: "20 ýyllyk tejribe", desc: "Pudakda iki onýyllykdan gowrak iş tejribesi." },
  { icon: CheckCircle, title: "TDS standartlary", desc: "Ähli önümler döwlet tehniki standartlaryna laýyk öndürilýär." },
  { icon: Users, title: "Professional topar", desc: "Tejribeli hünärmenlerden ybarat güýçli topar." },
  { icon: Target, title: "Ýokary hil", desc: "Her taslamada iň ýokary hil derejesini üpjün edýäris." },
];

const About = () => (
  <div>
    <section className="bg-charcoal py-16">
      <div className="container">
        <SectionHeading title="Biz barada" subtitle="Berk Bilek — ygtybarly hyzmatdaşyňyz." light />
      </div>
    </section>

    <section className="py-20">
      <div className="container max-w-4xl">
        <div className="prose prose-lg max-w-none text-foreground">
          <p className="text-lg leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Berk Bilek</strong> kompaniýasy 20 ýyldan gowrak wagt bäri metal işleri we mahabat hyzmatlary pudagynda üstünlikli iş alyp barýar. Biz döwlet tehniki standartlaryna (TDS) laýyklykda ýokary hilli önümler öndürýäris we müşderilerimize iň gowy hyzmatlary hödürleýäris.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground mt-4">
            Biziň toparymyz tejribeli hünärmenlerden ybarat bolup, her bir taslamany jogapkärçilik bilen ýerine ýetirýär. Metal kesmekden we infrastruktura taslamalaryndan başlap, mahabat materiallarynyň çap edilmegine, LED ekranlaryň gurnamagyna we 3D animasiýa hyzmatlaryna çenli doly çözgütleri hödürleýäris.
          </p>
        </div>
      </div>
    </section>

    <section className="bg-muted py-20">
      <div className="container">
        <SectionHeading title="Biziň gymmatlyklarymyz" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div key={v.title} className="bg-card rounded-lg p-6 card-industrial text-center">
              <v.icon className="mx-auto mb-3 text-primary" size={32} />
              <h3 className="font-display text-base font-semibold uppercase">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;
