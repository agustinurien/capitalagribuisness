import React, { useEffect, useRef, useState } from "react";

const VideoSequencer = ({ videos }) => {
  const videoRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || videos.length === 0) return;

    const handleEnded = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };

    video.addEventListener("ended", handleEnded);
    video.src = videos[currentIndex].src;
    video.load();
    video.play();

    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, [currentIndex, videos]);

  return (
    <div className="videoContainer">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="videoPlayer"
      />
    </div>
  );
};

export default VideoSequencer;
