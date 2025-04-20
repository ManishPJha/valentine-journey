import { useEffect } from "react";
import party from "party-js";

const ParticleEffect = () => {
  useEffect(() => {
    const container = document.body;
    party.confetti(container, {
      count: party.variation.range(40, 80), // Increased particle count for celebration
      size: party.variation.range(0.8, 1.2),
      speed: party.variation.range(100, 300),
    });

    return () => {
      const partyElements = document.querySelectorAll(".party-js-container");
      partyElements.forEach((element) => {
        element.remove();
      });
    };
  }, []);

  return null;
};

export default ParticleEffect;
