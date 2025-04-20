import { useState, useEffect } from "react";
import { Scroll } from "lucide-react";

const LoveLetter = ({ partnerName }: { partnerName: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const letterContent = [
    `My dearest ${partnerName},`,
    "Every moment with you feels like a beautiful dream come true.",
    "Your smile lights up my world in ways words cannot express.",
    "I fall in love with you more and more each day.",
    "Forever yours,",
    "❤️",
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById("love-letter");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section id="love-letter" className="py-20">
      <div className="max-w-3xl mx-auto text-center">
        <Scroll className="w-12 h-12 mx-auto mb-8 text-secondary animate-float" />
        <div className="love-letter-bg p-8 md:p-12 rounded-2xl romantic-shadow">
          {letterContent.map((line, index) => (
            <p
              key={index}
              className={`mb-6 text-lg md:text-xl text-secondary ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              } transition-all duration-700`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoveLetter;
