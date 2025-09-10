import type { VideoItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

// 页面级配置参数
const CONFIG = {
  // 默认图片配置
  fallback: {
    imageUrl: 'https://via.placeholder.com/300x400/cccccc/666666?text=暂无图片',
    aspectRatio: '2/3',
  },
  
  // 样式类名配置
  styles: {
    card: 'relative cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-10 group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl',
    imageContainer: 'w-full h-full object-cover',
    overlay: 'absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity',
    playButton: 'absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300',
    buttonStyle: 'bg-white/95 backdrop-blur-sm hover:bg-white text-black border-none shadow-xl scale-90 hover:scale-100 transition-transform',
    infoOverlay: 'absolute bottom-0 left-0 right-0 p-3 text-white',
    title: 'font-medium text-sm leading-tight mb-2 line-clamp-2 drop-shadow-sm',
    tag: 'text-xs bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full',
  },
  
  // 默认值配置
  defaults: {
    firstEpisode: 1,
  },
};

interface VideoCardProps {
  video: VideoItem;
  onClick: (video: VideoItem) => void;
  onPlay?: (video: VideoItem, episode: number) => void;
}

export function VideoCard({ video, onClick, onPlay }: VideoCardProps) {
  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlay?.(video, CONFIG.defaults.firstEpisode);
  };

  return (
    <div 
      className={CONFIG.styles.card}
      onClick={() => onClick(video)}
    >
      <div className={`aspect-[${CONFIG.fallback.aspectRatio}] relative bg-gray-100`}>
        <img 
          src={video.pic} 
          alt={video.name}
          className={CONFIG.styles.imageContainer}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = CONFIG.fallback.imageUrl;
          }}
        />
        
        {/* 渐变蒙层 */}
        <div className={CONFIG.styles.overlay} />
        
        {/* 播放按钮覆盖层 */}
        {onPlay && (
          <div className={CONFIG.styles.playButton}>
            <Button
              onClick={handlePlayClick}
              size="sm"
              className={CONFIG.styles.buttonStyle}
            >
              <Play className="h-4 w-4 mr-1 fill-current" />
              播放
            </Button>
          </div>
        )}
        
        {/* 信息叠加 */}
        <div className={CONFIG.styles.infoOverlay}>
          <h3 className={CONFIG.styles.title}>
            {video.name}
          </h3>
          <div className="flex flex-wrap gap-1">
            {video.area && (
              <span className={CONFIG.styles.tag}>
                {video.area}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}