import { useState } from "react";
import { Award, Users, Target, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const values = [
  { icon: Award, title: "20 ýyllyk tejribe", desc: "Pudakda iki onýyllykdan gowrak iş tejribesi." },
  { icon: CheckCircle, title: "TDS standartlary", desc: "Ähli önümler döwlet tehniki standartlaryna laýyk öndürilýär." },
  { icon: Users, title: "Professional topar", desc: "Tejribeli hünärmenlerden ybarat güýçli topar." },
  { icon: Target, title: "Ýokary hil", desc: "Her taslamada iň ýokary hil derejesini üpjün edýäris." },
];

const About = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <section className="bg-charcoal py-16">
        <div className="container">
          <SectionHeading title="Biz barada" subtitle="Berk Bilek — ygtybarly hyzmatdaşyňyz." light />
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-4xl">
          {/* Intro */}
          <p className="text-lg leading-relaxed text-muted-foreground">
            <strong className="text-foreground">"Berk Bilek"</strong> hususy kärhanasy 20 ýyldan gowrak wagt bäri ýurdumyzyň çäginde mahabat we metal işleriň üstinde işlemek bilen yzygiderli we üstünlikli iş alyp barýar. Köp ýyllyk iş tejribämiz, ýokary hünärli işgärlerimiz hem-de häzirki zaman döwrebap tehnologiýanyň ösen enjamlarynyň, gurallarynyň we serişdeleriniň hasabyna mümkinçiliklerimiz arkaly döwlet edaralaryna we hususy kärhanalara hem-de guramalara ýokary hilli hyzmatlary ýerine ýetirýäris.
          </p>

          {/* Metal Services */}
          <div className="mt-8 rounded-xl border border-border bg-card p-6 card-industrial">
            <h3 className="font-display text-lg font-semibold uppercase text-foreground mb-4">
              Metal işleri hyzmatlary boýunça
            </h3>
            <p className="text-muted-foreground mb-3">Kärhanamyz metal işleri ugrunda aşakdaky hyzmatlary ýerine ýetirýär:</p>
            <ul className="space-y-2 text-muted-foreground">
              {[
                "Gara demiri, neržawýeyka (poslamaýan polat), latun, turba, alýumin önümleri kesmek we metal konstruksiýalaryny taýýarlamak;",
                "Poslan demirleri arassalamak;",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground mt-4 mb-3">
              Şeýle hem şäher we ýol infrastrukturasyna degişli taslamalary amala aşyrýarys, şol sanda:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              {[
                "Şäher yşyklandyryş çyralaryny öndürmek we gurnamak;",
                "Jemgyýetçilik ulag duralgalaryny taýýarlamak;",
                "Ýol belgileri (znaklar) we ýol howpsuzlyk enjamlary;",
                "Radarlar üçin metal konstruksiýalar;",
                "Daşky mahabat üçin metal karkaslary taýarlamak;",
                "Uly we kiçi göwrümli yşykly harplar taýarlamak.",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground mt-4 text-sm italic">
              Ähli ýerine ýetirilen işler degişli tehniki talaplara, howpsuzlyk düzgünlerine we döwlet standartlaryna laýyklykda ýerine ýetirilýär.
            </p>
          </div>

          {/* Expandable section */}
          <div className={`overflow-hidden transition-all duration-500 ${expanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}>
            {/* Advertising Services */}
            <div className="mt-6 rounded-xl border border-border bg-card p-6 card-industrial">
              <h3 className="font-display text-lg font-semibold uppercase text-foreground mb-4">
                Mahabat hyzmatlary boýunça
              </h3>
              <p className="text-muted-foreground mb-3">
                Mahabat bölmimiz islendik görnüşdäki ähli hyzmatlary doly talaba laýyk ýokary derejede ýerine ýetirilýär. Hususan-da:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                {[
                  "Bannerler, stikerler, foreks, alýukobond, akril, arakal serişdelerinden dürli görnüşli mahabat önümlerini taýýarlamak we çap etmek işleri;",
                  "Sergileriň we pafilýonlaryň bezeg hem-de gurnama işleri;",
                  "Mahabat roliklerini we animasiýalary ýasamak işleri;",
                  "Led ekranlar we TOUCHSCREEN ýasamak işleri;",
                  "Döwlet derejelerinde geçirilýän medeni we köpçilikleýin çäreleriň, binalaryň hem-de desgalaryň açylyş dabaralarynyň bezeg we gurnama işleri;",
                  "Mebel işleriniň ähli görnüşleri.",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground mt-4 text-sm italic">
                Her bir mahabat taslamasy işçi toparymyz tarapyndan meýilleşdirilýär we wagtynda, ýokary hilli ýerine ýetirilýär.
              </p>
            </div>

            {/* Work Principle */}
            <div className="mt-6 rounded-xl border border-border bg-card p-6 card-industrial">
              <h3 className="font-display text-lg font-semibold uppercase text-foreground mb-3">
                Iş ýörelgämiz
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Kärhanamyz öz işinde kanunçylygyň talaplaryna laýyklykda, tehniki düzgünleriň düzgünnamalaryny doly we dogry berjaý edip, şertnamalarda görkezlen borçnamalaryň talaplaryna berk eýerýär. Biziň esasy maksadymyz — döwlet edaralary hem-de hususy kärhanalar we guramalar bilen uzak möhletleýin hyzmatdaşlygy ösdürmeklige ynam döredýän ygtybarly hyzmatlary hödürlemekdir.
              </p>
            </div>
          </div>

          {/* Read More Button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-2 rounded-lg border border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              {expanded ? (
                <>
                  Gysgalt <ChevronUp size={16} />
                </>
              ) : (
                <>
                  Köpräk oka <ChevronDown size={16} />
                </>
              )}
            </button>
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
};

export default About;
