
import React from "react";

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, title }) => {
  return (
    <div className="aspect-video bg-gray-900 rounded-lg">
      <iframe 
        src={videoUrl} 
        className="w-full h-full" 
        title={title} 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
