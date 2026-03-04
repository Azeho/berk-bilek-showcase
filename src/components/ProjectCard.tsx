interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  onClick?: () => void;
}

const ProjectCard = ({ image, title, description, onClick }: ProjectCardProps) => (
  <div
    onClick={onClick}
    className="group cursor-pointer bg-card rounded overflow-hidden card-industrial transition-all duration-300 hover:-translate-y-1"
  >
    <div className="aspect-[4/3] overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
    </div>
    <div className="p-5">
      <h3 className="font-display text-lg font-semibold text-foreground uppercase tracking-wide">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  </div>
);

export default ProjectCard;
