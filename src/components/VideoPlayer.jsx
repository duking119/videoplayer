import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

// 确保 CustomButton/QualityMenuButton 已被导入/注册
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
               
               // === 新增：监听自定义质量切换事件 ===
               player.on('qualitychange', (event, data) => {
                   player.log(`正在切换到分辨率: ${data.quality}`);
                   
                   // 查找对应分辨率的源
                   const newQualityOptions = player.options_.qualities.find(
                       q => q.label === data.quality
                   );

                   if (newQualityOptions) {
                       const currentTime = player.currentTime(); // 记录当前播放时间
                       const isPaused = player.paused(); // 记录当前播放状态
                       
                       // 切换视频源
                       player.src(newQualityOptions.sources); 

                       // 切换后保持播放状态和时间
                       player.load();
                       player.currentTime(currentTime);
                       if (!isPaused) {
                           player.play();
                       }
                       
                       // 更新所有菜单项的选中状态 (可选，但推荐)
                       player.children().forEach(child => {
                           if (child.options_.name === 'QualityMenuButton') {
                               child.children().forEach(item => {
                                   item.selected(item.options_.quality === data.quality);
                               });
                           }
                       });
                   }
               });
               // ===================================

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