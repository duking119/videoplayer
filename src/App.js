// src/App.js
import React, { useMemo } from 'react'; // 导入 useMemo
import VideoPlayer from './components/VideoPlayer';

function App() {
  // 使用 useMemo 确保 options 对象只在依赖项([])变化时才创建
  const playerOptions = useMemo(() => ({
    autoplay: false,
    controls: true,
    sources: [{
      src: 'videos/video-1.mp4', // 确保这是正确的视频 URL
      type: 'video/mp4'
    }]
  }), []); // <-- 空依赖数组意味着只在组件首次挂载时创建一次
  
const handlePlayerReady = (player) => {
  console.log('Video.js 播放器已就绪，添加自定义控制键...');

  // 获取控制栏组件
  const controlBar = player.getChild('ControlBar');
  
  // 在控制栏中添加我们注册的 'CustomButton' 组件
  controlBar.addChild(
    'CustomButton', 
    { 
      // 可以传递选项给 CustomButton 的 constructor
      controlText: '自定义切换',
      // onClick: () => console.log('按钮被点击了！') 
    }, 
    // 插入位置：通常在控制栏的第0个位置（最左边）
    0 
  );
};

  return (
    <div className="App">
      <h1>在线播放程序</h1>
      <VideoPlayer options={playerOptions} onReady={handlePlayerReady} /> {/* 传递稳定的引用 */}
    </div>
  );
}

export default App;