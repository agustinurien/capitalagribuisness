import React, { useEffect, useRef, useState } from "react";
import "./video.css";
import { BiArrowFromLeft, BiArrowFromRight } from "react-icons/bi";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const VideoSequencer = ({ videos }) => {
  const videoRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const playVideoAtIndex = (index) => {
    const video = videoRef.current;
    if (!video || videos.length === 0) return;

    video.src = videos[index].src;
    video.load();
    video.play().catch((e) => {
      console.error("Error al reproducir el video:", e);
    });
  };

  useEffect(() => {
    playVideoAtIndex(currentIndex);

    const handleEnded = () => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex < videos.length ? nextIndex : 0;
      });
    };

    const video = videoRef.current;
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, [currentIndex, videos]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < videos.length ? prevIndex + 1 : 0
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : videos.length - 1
    );
  };

  return (
    <div className="videoContainer">
      <video ref={videoRef} muted playsInline className="videoPlayer" />
      <div className="controls">
        <button onClick={handlePrevious}>
          <FaArrowAltCircleLeft fontSize={30} />
        </button>
        <button onClick={handleNext}>
          <FaArrowAltCircleRight fontSize={30} />
        </button>
      </div>
    </div>
  );
};

export default VideoSequencer;
