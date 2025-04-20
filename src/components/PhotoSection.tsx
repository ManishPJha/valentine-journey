import { Heart } from "lucide-react";
import { AspectRatio } from "./ui/aspect-ratio";

const PhotoSection = ({
  portraitURL,
  yourName,
}: {
  portraitURL: string;
  yourName: string;
}) => {
  return (
    <section className="py-2 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <Heart
            key={i}
            className={`absolute text-primary/20 animate-float`}
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
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white p-8 rounded-2xl romantic-shadow">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <AspectRatio ratio={1}>
                <img
                  src={portraitURL}
                  alt="Portrait Photo"
                  className="rounded-lg w-full hover:scale-105 transition-transform duration-300"
                />
              </AspectRatio>
              <Heart className="absolute -top-4 -right-4 text-secondary animate-float" />
            </div>
            <div className="text-center md:text-left space-y-4">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-secondary reveal-text">
                To My Forever Love
              </h2>
              <p className="text-secondary/80 reveal-text reveal-text-delay-1">
                Every moment with you is a blessing. Your smile lights up my
                world, and your love makes every day special. Here's to many
                more beautiful memories together.
              </p>
              <p className="font-playfair text-secondary reveal-text reveal-text-delay-2">
                With all my love,
                <br />
                {yourName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoSection;
