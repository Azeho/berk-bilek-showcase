import { useState, useRef } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ReCAPTCHA from "react-google-recaptcha";

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6Ledu4QsAAAAAP25tBGwCKJfF8-eQAYLwcxCBI5D";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) return;

    setSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch("/.netlify/functions/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, captchaToken }),
      });

      if (res.ok) {
        setSubmitStatus("success");
        setForm({ name: "", email: "", message: "" });
        setCaptchaToken(null);
        recaptchaRef.current?.reset();
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setSubmitting(false);
    }
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
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={(token) => setCaptchaToken(token)}
                onExpired={() => setCaptchaToken(null)}
              />
              {submitStatus === "success" && (
                <p className="text-green-600 text-sm font-medium">Hatyňyz üstünlikli iberildi!</p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-500 text-sm font-medium">Iberilmedi. Täzeden synanyşyň.</p>
              )}
              <button
                type="submit"
                disabled={!captchaToken || submitting}
                className="btn-cta text-primary-foreground px-6 py-3 rounded font-semibold inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Iberilýär..." : <><span>Ibermek</span><Send size={16} /></>}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
