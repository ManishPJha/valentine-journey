import { useState, useRef, useEffect } from "react";
import { Music, Play, Pause, Volume2, VolumeX, Heart } from "lucide-react";

const MusicPlayer = ({ musics }: { musics: string[] }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Handle play/pause state when the song changes
  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;

      // Force the iframe to play when the song changes
      if (isPlaying) {
        const playMessage = '{"event":"command","func":"playVideo","args":""}';
        iframe.contentWindow?.postMessage(playMessage, "*");
      } else {
        const pauseMessage =
          '{"event":"command","func":"pauseVideo","args":""}';
        iframe.contentWindow?.postMessage(pauseMessage, "*");
      }

      // Handle mute/unmute state
      const muteMessage = isMuted
        ? '{"event":"command","func":"mute","args":""}'
        : '{"event":"command","func":"unMute","args":""}';
      iframe.contentWindow?.postMessage(muteMessage, "*");
    }
  }, [currentSongIndex, isPlaying, isMuted, iframeRef]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const playNextSong = () => {
    setIsPlaying(false);
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % musics.length);
    // setIsPlaying(true); // Auto-play the next song
  };

  const playPreviousSong = () => {
    setIsPlaying(false);
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? musics.length - 1 : prevIndex - 1
    );
    // setIsPlaying(true); // Auto-play the previous song
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <Heart
            key={i}
            className={`absolute text-primary/20 animate-float`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              width: `${30 + Math.random() * 20}px`,
              height: `${30 + Math.random() * 20}px`,
            }}
          />
        ))}
      </div>
      <div className="max-w-2xl mx-auto text-center relative">
        <Music className="w-12 h-12 mx-auto mb-4 text-secondary animate-float" />
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-secondary mb-8">
          Our Playlist
        </h2>

        <div className="bg-white p-8 rounded-2xl romantic-shadow">
          <div className="aspect-video mb-6 relative rounded-lg overflow-hidden">
            <iframe
              ref={iframeRef}
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${musics[currentSongIndex]}?enablejsapi=1`}
              title="YouTube music player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={playPreviousSong}
              className="px-6 py-2 bg-secondary text-white rounded-full font-medium hover:bg-secondary/90 transition-colors flex items-center gap-2"
            >
              Previous
            </button>
            <button
              onClick={togglePlay}
              className="px-6 py-2 bg-secondary text-white rounded-full font-medium hover:bg-secondary/90 transition-colors flex items-center gap-2"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              {isPlaying ? "Pause" : "Play"}
            </button>
            <button
              onClick={playNextSong}
              className="px-6 py-2 bg-secondary text-white rounded-full font-medium hover:bg-secondary/90 transition-colors flex items-center gap-2"
            >
              Next
            </button>
            <button
              onClick={toggleMute}
              className="p-2 bg-secondary/10 text-secondary rounded-full hover:bg-secondary/20 transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicPlayer;
