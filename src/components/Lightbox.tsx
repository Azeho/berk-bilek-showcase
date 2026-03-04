import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: { src: string; title: string }[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const Lightbox = ({ images, currentIndex, onClose, onNext, onPrev }: LightboxProps) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const current = images[currentIndex];

  return (
    <div className="fixed inset-0 z-[100] bg-charcoal/95 flex items-center justify-center" onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 text-charcoal-foreground/70 hover:text-charcoal-foreground z-10">
        <X size={32} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 text-charcoal-foreground/70 hover:text-charcoal-foreground z-10"
      >
        <ChevronLeft size={40} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 text-charcoal-foreground/70 hover:text-charcoal-foreground z-10"
      >
        <ChevronRight size={40} />
      </button>
      <div className="max-w-5xl max-h-[85vh] px-16" onClick={(e) => e.stopPropagation()}>
        <img src={current.src} alt={current.title} className="max-h-[80vh] w-auto mx-auto object-contain rounded" />
        <p className="text-center text-charcoal-foreground/80 mt-4 font-display text-lg">{current.title}</p>
      </div>
    </div>
  );
};

export default Lightbox;
