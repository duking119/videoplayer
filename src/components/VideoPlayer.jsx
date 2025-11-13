import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

import './CustomButton';


const VideoPlayer = ({ options, onReady }) => {
   const videoRef = React.useRef(null);
   const playerRef = React.useRef(null);
   React.useEffect(() => {
       if (!playerRef.current) {
           const videoElement = document.createElement('video-js');
           videoElement.classList.add('vjs-big-play-centered');
           videoRef.current.appendChild(videoElement);

           const player = (playerRef.current = videojs(videoElement, options, () => {
               if (onReady) onReady(player);
           }));
       } else {
           const player = playerRef.current;
           player.autoplay(options.autoplay);
           player.src(options.sources);
       }
   }, [options]);
   React.useEffect(() => {
       return () => {
           if (playerRef.current) {
               playerRef.current.dispose();
               playerRef.current = null;
           }
       };
   }, []);
   return <div data-vjs-player><div ref={videoRef} /></div>;
};
export default VideoPlayer;