import { useState, useEffect } from "react";
import { Image as ImageIcon, Heart } from "lucide-react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

interface Memory {
  imageUrl: string;
  caption: string;
  date: string;
}

const MemoryGallery = ({ memories }: { memories: Memory[] }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById("memory-gallery");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const handleImageLoad = (url: string) => {
    setLoadedImages((prev) => ({ ...prev, [url]: true }));
  };

  return (
    <section id="memory-gallery" className="py-20 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #7D2027 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Enhanced floating hearts background with improved visibility */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-primary animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              width: `${25 + Math.random() * 40}px`,
              height: `${25 + Math.random() * 40}px`,
              transform: `rotate(${Math.random() * 45}deg)`,
              opacity: 0.4,
            }}
            strokeWidth={1.5}
            fill="rgba(247, 202, 201, 0.2)"
          />
        ))}
      </div>

      <div className="text-center mb-12 relative">
        <ImageIcon className="w-12 h-12 mx-auto mb-4 text-secondary animate-float" />
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-secondary">
          Our Precious Memories
        </h2>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          } transition-all duration-1000`}
        >
          {memories.map((memory, index) => (
            <div
              key={index}
              className={`rounded-lg overflow-hidden romantic-shadow hover:scale-105 transition-transform duration-300 ${
                index % 2 === 1 ? "md:translate-y-12" : ""
              }`}
              style={{
                transitionDelay: `${index * 200}ms`,
                transform: isVisible
                  ? `translateY(${Math.sin(index) * 10}px)`
                  : "none",
              }}
            >
              <div className="relative group">
                <AspectRatio ratio={1}>
                  {!loadedImages[memory.imageUrl] && (
                    <Skeleton className="absolute inset-0 bg-secondary/5" />
                  )}
                  <img
                    src={memory.imageUrl}
                    alt={memory.caption}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    onLoad={() => handleImageLoad(memory.imageUrl)}
                    style={{ opacity: loadedImages[memory.imageUrl] ? 1 : 0 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </AspectRatio>
                <Heart
                  className="absolute bottom-2 right-2 text-red-400 w-6 h-6 animate-float fill-red-500"
                  style={{ animationDelay: `${index * 0.2}s` }}
                  strokeWidth={1.5}
                />
                {memory.date && (
                  <div
                    className="absolute top-4 left-0 bg-secondary/90 text-white px-4 py-1 text-sm font-medium transform -translate-x-2"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 95% 100%, 0% 100%)",
                    }}
                  >
                    {memory.date}
                  </div>
                )}
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-playfair text-lg font-semibold text-secondary">
                  {memory.caption}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MemoryGallery;
