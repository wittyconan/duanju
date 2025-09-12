import { Star, Clock } from 'lucide-react';
import type { VideoItem } from '@/types';

interface VideoInfoProps {
  video: VideoItem;
  videoInfo?: {
    description?: string;
  };
}

export function VideoInfo({ video, videoInfo }: VideoInfoProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        {video.year && (
          <div>
            <span className="text-muted-foreground">年份:</span>
            <div className="font-medium">{video.year}</div>
          </div>
        )}
        {video.area && (
          <div>
            <span className="text-muted-foreground">地区:</span>
            <div className="font-medium">{video.area}</div>
          </div>
        )}
        {video.score > 0 && (
          <div>
            <span className="text-muted-foreground">评分:</span>
            <div className="font-medium flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              {video.score}
            </div>
          </div>
        )}
        {video.updateTime && (
          <div>
            <span className="text-muted-foreground">更新:</span>
            <div className="font-medium flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {new Date(video.updateTime).toLocaleDateString()}
            </div>
          </div>
        )}
      </div>
      
      {video.director && (
        <div>
          <span className="text-sm text-muted-foreground">导演:</span>
          <div className="mt-1">{video.director}</div>
        </div>
      )}
      
      {video.actor && (
        <div>
          <span className="text-sm text-muted-foreground">主演:</span>
          <div className="mt-1">{video.actor}</div>
        </div>
      )}
      
      {(video.content || videoInfo?.description) && (
        <div>
          <span className="text-sm text-muted-foreground">剧情简介:</span>
          <div className="mt-2 text-sm leading-relaxed">
            {video.content || videoInfo?.description || '暂无剧情介绍'}
          </div>
        </div>
      )}
    </div>
  );
}