interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  light?: boolean;
}

const SectionHeading = ({ title, subtitle, light }: SectionHeadingProps) => (
  <div className="text-center mb-12">
    <h2 className={`font-display text-3xl md:text-4xl font-bold uppercase tracking-wider ${light ? "text-charcoal-foreground" : "text-foreground"}`}>
      {title}
    </h2>
    <div className="w-16 h-1 bg-primary mx-auto mt-4 mb-4 rounded-full" />
    {subtitle && (
      <p className={`max-w-2xl mx-auto text-base ${light ? "text-charcoal-foreground/60" : "text-muted-foreground"}`}>
        {subtitle}
      </p>
    )}
  </div>
);

export default SectionHeading;
