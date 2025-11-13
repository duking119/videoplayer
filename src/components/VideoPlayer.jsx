import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

import './CustomButton';


const VideoPlayer = ({ options, onReady }) => {
   const videoRef = React.useRef(null);
   const playerRef = React.useRef(null);
   const mergedOptions = React.useMemo(
       () => ({
           fluid: true,
           aspectRatio: '16:9',
           ...options,
       }),
       [options],
   );
   React.useEffect(() => {
       if (!playerRef.current) {
           const videoElement = document.createElement('video-js');
           videoElement.classList.add('vjs-big-play-centered');
           videoRef.current.appendChild(videoElement);

           const player = (playerRef.current = videojs(videoElement, mergedOptions, () => {
               if (onReady) onReady(player);
           }));
       } else {
           const player = playerRef.current;
           player.autoplay(mergedOptions.autoplay);
           if (mergedOptions.sources) {
               player.src(mergedOptions.sources);
           }
           if (mergedOptions.aspectRatio) {
               player.aspectRatio(mergedOptions.aspectRatio);
           }
           player.fluid(Boolean(mergedOptions.fluid));
       }
   }, [mergedOptions, onReady]);
   React.useEffect(() => {
       return () => {
           if (playerRef.current) {
               playerRef.current.dispose();
               playerRef.current = null;
           }
       };
   }, []);
   return (
       <div className="video-player-wrapper" data-vjs-player>
           <div ref={videoRef} />
       </div>
   );
};
export default VideoPlayer;