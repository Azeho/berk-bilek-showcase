import { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Hatyňyz üstünlikli iberildi!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div>
      <section className="bg-charcoal py-16">
        <div className="container">
          <SectionHeading title="Habarlaşmak" subtitle="Biz bilen habarlaşyň — size kömek etmäge taýýar." light />
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="font-display text-2xl font-bold uppercase mb-6">Biziň maglumatlarymyz</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-accent flex items-center justify-center flex-shrink-0">
                    <Phone className="text-primary" size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Telefon</p>
                    <p className="text-muted-foreground">+993 12 76 50 10</p>
                    <p className="text-muted-foreground">+993 12 76 59 08</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-accent flex items-center justify-center flex-shrink-0">
                    <Mail className="text-primary" size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">E-poçta</p>
                    <p className="text-muted-foreground">berkbilek2020@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-accent flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-primary" size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Salgy</p>
                    <p className="text-muted-foreground">Berkararlyk, köçe. 1938 (demirçiler), jaý 76, Aşgabat, Türkmenistan</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1">Adyňyz</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-border rounded px-4 py-3 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">E-poçtaňyz</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-border rounded px-4 py-3 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Hatyňyz</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border border-border rounded px-4 py-3 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>
              <button type="submit" className="btn-cta text-primary-foreground px-6 py-3 rounded font-semibold inline-flex items-center gap-2">
                Ibermek <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
