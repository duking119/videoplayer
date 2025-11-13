// src/App.js
import React, { useMemo } from 'react';
import VideoPlayer from './components/VideoPlayer';
// 假设 '480p' 和 '720p' 是我们注册的组件名称
const QUALITY_MENU_BUTTON_NAME = 'QualityMenuButton';

// 定义可用的视频源及其分辨率
const availableQualities = [
  {
    label: '720p',
    sources: [{
      src: 'videos/video-720p.mp4', // 请替换为您的 720p 视频URL
      type: 'video/mp4'
    }]
  },
  {
    label: '480p',
    sources: [{
      src: 'videos/video-480p.mp4', // 请替换为您的 480p 视频URL
      type: 'video/mp4'
    }]
  }
];

// 设置默认播放的分辨率
const defaultQuality = availableQualities[0]; // 默认播放 720p

function App() {
  const playerOptions = useMemo(() => ({
    autoplay: false,
    controls: true,
    // 1. 设置默认播放源
    sources: defaultQuality.sources, 
    // 2. 将所有分辨率源传递给 videojs 实例，以便在 player.options_ 中访问
    qualities: availableQualities 
  }), []); 
  
  const handlePlayerReady = (player) => {
    console.log('Video.js 播放器已就绪，添加清晰度选择器...');

    const controlBar = player.getChild('ControlBar');
    
    // 在控制栏中添加我们注册的 'QualityMenuButton' 组件
    controlBar.addChild(
      QUALITY_MENU_BUTTON_NAME, 
      { 
        qualities: availableQualities, // 传递所有选项给菜单按钮
        currentQuality: defaultQuality.label // 传递默认选中的分辨率
      }, 
      // 插入位置：控制栏从右往左数，通常放在音量控制前面
      // 这里的 10 是一个示例索引，您可以根据需要调整
      controlBar.children().length - 2 
    );
  };

  return (
    <div className="App">
      <h1>在线播放程序</h1>
      {/* 传递稳定的引用 */}
      <VideoPlayer options={playerOptions} onReady={handlePlayerReady} /> 
    </div>
  );
}

export default App;