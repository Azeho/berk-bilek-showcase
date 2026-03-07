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
            <strong className="text-foreground">"Berk Bilek"</strong> hususy kärhanasy 20 ýyldan gowrak wagt bäri ýurdumyzyň çäginde mahabat we metal işleri ugurlarynda yzygiderli we üstünlikli iş alyp barýar. Köp ýyllyk iş tejribämiz, ýokary hünärli işgärlerimiz hem-de häzirki zaman döwrebap  tehnologiýanyň ösen enjamlarynyň,  gurallarynyň we serişdeleriniň hasabyna  mümkinçiliklerimiz arkaly döwlet edaralaryna we hususy guramalara ýokary hilli hyzmatlary ýerine ýetirýäris.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground mt-4">
            Her bir mahabat taslamasy işçi toparymyz tarapyndan meýilleşdirilýär we wagtynda, ýokary hilli ýerine ýetirilýär.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground mt-4">
            <strong className="text-foreground">Iş ýörelgämiz:</strong><br />
            Kärhanamyz öz işinde kanunçylyk talaplaryna, tehniki düzgünlere we şertnama borçnamalaryna berk eýerýär. Biziň esasy maksadymyz — döwlet edaralary bilen uzak möhletleýin hyzmatdaşlygy ösdürmek, ynam döredýän we ygtybarly hyzmatlary hödürlemekdir.
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
