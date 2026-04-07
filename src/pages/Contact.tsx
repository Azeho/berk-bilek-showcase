import { useState, useRef } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ReCAPTCHA from "react-google-recaptcha";
import { useCanonical } from "@/hooks/useCanonical";

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6LfpDqEsAAAAAPAdfDUZysGeLGvAihbomABEJaTA";

const Contact = () => {
  useCanonical("/contact");
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
      const formData = new FormData();
      formData.append("access_key", "a5b73472-c9a7-4738-bf96-08eebcf834a8");
      formData.append("subject", `Berk Bilek - Täze hat: ${form.name}`);
      formData.append("from_name", "Berk Bilek Web Sahypasy");
      formData.append("cc", "berkbilek2020@gmail.com");
      formData.append("Ady", form.name);
      formData.append("Email", form.email);
      formData.append("Hat", form.message);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
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
                    <p className="text-muted-foreground">info@berk-bilek.com</p>
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
                {/* Social links */}
                <div className="flex items-center gap-4 pt-2">
                  <a
                    href="https://www.instagram.com/berkbilek765010"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded bg-accent flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="Instagram"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.tiktok.com/@berk_bilek765010"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded bg-accent flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="TikTok"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
                    </svg>
                  </a>
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
