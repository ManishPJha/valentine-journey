import { useEffect, useMemo, useState } from "react";
import { Heart } from "lucide-react";
import WelcomeSection from "@/components/WelcomeSection";
import LoveLetter from "@/components/LoveLetter";
import MemoryGallery from "@/components/MemoryGallery";
import LoveQuiz from "@/components/LoveQuiz";
import MusicPlayer from "@/components/MusicPlayer";
import PhotoSection from "@/components/PhotoSection";

import info from "@/data/info.json";
import BackgroundVideo from "@/components/BackgroundVideo";

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const [isLocked, setIsLocked] = useState(true);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-love-secondary to-primary/10">
      <main
        className={`container mx-auto px-4 py-8 space-y-20 transition-opacity duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <BackgroundVideo />
        <WelcomeSection
          yourName={info.yourName}
          partnerName={info.herName}
          posterImages={info.posterImageURLs}
          isLocked={isLocked}
          setIsLocked={setIsLocked}
        />

        {!isLocked && (
          <>
            <LoveLetter partnerName={info.herName} />
            <MemoryGallery memories={info.memories} />
            <LoveQuiz />
            <MusicPlayer musics={info.youtubeSongIds} />
            <PhotoSection
              portraitURL={info.goodByeImage}
              yourName={info.yourName}
            />
            <footer className="py-8 text-center text-love-primary flex items-center justify-center gap-2">
              <Heart className="w-4 h-4 text-love-secondary fill-primary animate-float" />
              <span>Made with love for {info.herName}</span>
              <Heart className="w-4 h-4 text-love-secondary fill-primary animate-float" />
            </footer>
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
