import React, { useEffect, useRef, useState } from "react";
import "./video.css"

const VideoSequencer = ({ videos }) => {
  const videoRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || videos.length === 0) return;

    const handleEnded = () => {
      // Avanzar al siguiente video o volver al inicio
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex < videos.length ? nextIndex : 0;
      });
    };

    video.addEventListener("ended", handleEnded);

    // Establecer el src y reproducir
    video.src = videos[currentIndex].src;
    video.load();
    video.play().catch((e) => {
      console.error("Error al reproducir el video:", e);
    });

    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, [currentIndex, videos]);

  return (
    <div className="videoContainer">
      <video ref={videoRef} muted playsInline className="videoPlayer" />
    </div>
  );
};

export default VideoSequencer;
