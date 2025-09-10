import type { VideoItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

interface VideoCardProps {
  video: VideoItem;
  onClick: (video: VideoItem) => void;
  onPlay?: (video: VideoItem, episode: number) => void;
}

export function VideoCard({ video, onClick, onPlay }: VideoCardProps) {
  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlay?.(video, 1);
  };

  return (
    <div 
      className="relative cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-10 group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl"
      onClick={() => onClick(video)}
    >
      <div className="aspect-[2/3] relative bg-gray-100">{/* 从 aspect-[3/4] 改为 aspect-[2/3] 使高度更高 */}
        <img 
          src={video.pic} 
          alt={video.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/300x400/cccccc/666666?text=暂无图片';
          }}
        />
        
        {/* 渐变蒙层 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
        
        {/* 播放按钮覆盖层 */}
        {onPlay && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              onClick={handlePlayClick}
              size="sm"
              className="bg-white/95 backdrop-blur-sm hover:bg-white text-black border-none shadow-xl scale-90 hover:scale-100 transition-transform"
            >
              <Play className="h-4 w-4 mr-1 fill-current" />
              播放
            </Button>
          </div>
        )}
        
        {/* 信息叠加 */}
        <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
          <h3 className="font-medium text-sm leading-tight mb-2 line-clamp-2 drop-shadow-sm">
            {video.name}
          </h3>
          <div className="flex flex-wrap gap-1">
            {video.area && (
              <span className="text-xs bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                {video.area}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}