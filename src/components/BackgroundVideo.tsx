import React from "react";

import info from "@/data/info.json";

const BackgroundVideo = () => {
  return (
    <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-10" />
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={info.weddingBackgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default BackgroundVideo;
