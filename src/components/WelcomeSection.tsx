import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import ParticleEffect from "./ParticleEffect";

const WelcomeSection = ({
  partnerName,
  yourName,
  posterImages,
  isLocked,
  setIsLocked,
}: {
  partnerName: string;
  yourName: string;
  posterImages: Array<Record<string, string>>;
  isLocked: boolean;
  setIsLocked: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [showParticles, setShowParticles] = useState(false);

  const names = `${yourName} and ${partnerName}`;

  useEffect(() => {
    const calculateTimeLeft = () => {
      const anniversaryDate = new Date("2025-04-26T00:00:00");
      const now = new Date();
      const difference = anniversaryDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        // Time is up
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsLocked(false); // Unlock the website
        setShowParticles(true); // Show celebration particles
        clearInterval(timer);
      }
    };

    calculateTimeLeft(); // Calculate immediately on mount
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [setIsLocked]);

  return (
    <>
      {showParticles && <ParticleEffect />}

      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <Heart
              key={i}
              className="absolute text-primary/60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.3}s`,
                width: `${20 + Math.random() * 20}px`,
                height: `${20 + Math.random() * 20}px`,
              }}
            />
          ))}
        </div>

        {isLocked ? (
          <>
            <p className="mt-8 text-love-accent font-playfair text-xl">
              Website is locked please wait for the right time dear ❤️
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div
                  key={unit}
                  className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg"
                >
                  <div className="text-3xl md:text-4xl font-bold text-love-accent">
                    {value}
                  </div>
                  <div className="text-sm md:text-base text-gray-600 capitalize">
                    {unit}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Decorative hearts background */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <Heart
                  key={i}
                  className="absolute text-primary/20 animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.3}s`,
                    width: `${20 + Math.random() * 20}px`,
                    height: `${20 + Math.random() * 20}px`,
                  }}
                />
              ))}
            </div>

            {/* Photo Album */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="container mx-auto h-full relative">
                {posterImages.map((photo, index) => (
                  <div
                    key={index}
                    className={`${photo.classValues} transition-transform duration-500 hover:scale-105`}
                    style={{
                      perspective: "1000px",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div
                      className="bg-white p-2 romantic-shadow"
                      style={{
                        width: photo.size === "small" ? "160px" : "200px",
                        transform: `rotateZ(${Math.random() * 10 - 5}deg)`,
                      }}
                    >
                      <AspectRatio ratio={4 / 3}>
                        <img
                          src={photo.url}
                          alt={`Our Photo ${index + 1}`}
                          className="object-cover rounded-sm"
                        />
                      </AspectRatio>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Heart className="w-16 h-16 text-secondary animate-float fill-secondary" />
            <p className="text-xl text-secondary/80 font-playfair reveal-text">
              {names}
            </p>
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-secondary reveal-text">
              Happy Aniversary, {partnerName} ❤️!
            </h1>
            <p className="text-xl md:text-2xl text-secondary/80 max-w-2xl mx-auto reveal-text reveal-text-delay-1">
              You mean the world to me
            </p>
            <div className="mt-8 reveal-text reveal-text-delay-2">
              <button
                onClick={() =>
                  window.scrollTo({
                    top: window.innerHeight,
                    behavior: "smooth",
                  })
                }
                className="px-8 py-3 bg-secondary text-white rounded-full font-medium hover:bg-secondary/90 transition-colors romantic-shadow"
              >
                Begin Our Journey
              </button>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default WelcomeSection;
