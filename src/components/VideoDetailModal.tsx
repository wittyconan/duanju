import { useState, useEffect, useCallback, useRef } from 'react';
import type { VideoItem } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Play, Calendar, MapPin, User, Users, FileText, Loader2, AlertCircle } from 'lucide-react';
import { useGlassEffect, getGlassOverlayClass } from '@/contexts/GlassEffectContext';
import { apiService } from '@/services/api';

interface VideoDetailModalProps {
  video: VideoItem | null;
  isOpen: boolean;
  onClose: () => void;
  onPlay: (video: VideoItem, episode: number) => void;
}

export function VideoDetailModal({ video, isOpen, onClose, onPlay }: VideoDetailModalProps) {
  const [detailedVideo, setDetailedVideo] = useState<VideoItem | null>(null);
  const [totalEpisodes, setTotalEpisodes] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, setAdditionalInfo] = useState<{ description?: string } | null>(null);
  const [headerHeight, setHeaderHeight] = useState(320);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { effectType } = useGlassEffect();

  const loadVideoDetails = useCallback(async () => {
    if (!video) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // 首先尝试通过ID获取详细信息（更准确）
      const detailById = await apiService.getVideoDetailById(video.id);
      
      if (detailById) {
        setAdditionalInfo(detailById.videoInfo);
        setTotalEpisodes(detailById.totalEpisodes);
        
        // 使用原始视频信息，但可以用详细信息中的描述等补充
        const enrichedVideo = {
          ...video,
          content: detailById.videoInfo.description || video.content || '',
        };
        setDetailedVideo(enrichedVideo);
      } else {
        // 回退到原来的搜索方法
        const detailResult = await apiService.getVideoDetail(video.name);
        
        if (detailResult) {
          setDetailedVideo(detailResult);
          // 解析集数信息
          const episodes = parseEpisodes(detailResult.remarks || '');
          setTotalEpisodes(episodes.length);
        } else {
          // 如果都获取失败，使用原始视频信息
          setDetailedVideo(video);
          const episodes = parseEpisodes(video.remarks || '');
          setTotalEpisodes(episodes.length);
        }
      }
    } catch (err) {
      console.error('Failed to load video details:', err);
      setError('加载详情失败，显示基本信息');
      setDetailedVideo(video);
      const episodes = parseEpisodes(video.remarks || '');
      setTotalEpisodes(episodes.length);
    } finally {
      setLoading(false);
    }
  }, [video]);

  useEffect(() => {
    if (video && isOpen) {
      loadVideoDetails();
      setHeaderHeight(320); // 重置头部高度
    } else {
      // 重置状态
      setDetailedVideo(null);
      setTotalEpisodes(1);
      setError(null);
      setAdditionalInfo(null);
      setHeaderHeight(320);
    }
  }, [video, isOpen, loadVideoDetails]);

  // 滚动处理函数
  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = event.currentTarget.scrollTop;
    const minHeight = 120;
    const maxHeight = 320;
    const scrollThreshold = 200;
    
    if (scrollTop <= scrollThreshold) {
      const newHeight = maxHeight - (scrollTop / scrollThreshold) * (maxHeight - minHeight);
      setHeaderHeight(Math.max(minHeight, newHeight));
    } else {
      setHeaderHeight(minHeight);
    }
  }, []);

  const parseEpisodes = (remarks: string): number[] => {
    if (!remarks) return [1];
    
    // 匹配各种格式: "全24集", "更新至12集", "12集全", "HD", "完结" 等
    const episodeMatch = remarks.match(/(?:全|更新至|共)(\d+)集/);
    if (episodeMatch) {
      const totalEpisodes = parseInt(episodeMatch[1]);
      return Array.from({ length: totalEpisodes }, (_, i) => i + 1);
    }
    
    // 如果无法解析集数，默认为单集
    return [1];
  };

  if (!video) return null;

  const currentVideo = detailedVideo || video;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={getGlassOverlayClass("max-w-4xl max-h-[90vh] p-0 overflow-hidden flex flex-col bg-white/98 backdrop-blur-md dark:bg-black/98", effectType)}>
        <DialogDescription className="sr-only">
          视频详情信息，包括剧情简介、演职员信息和播放选项
        </DialogDescription>
        
        {/* 封面图和标题区域 - 动态高度 */}
        <div 
          className="relative flex-shrink-0 transition-all duration-300 ease-out overflow-hidden"
          style={{ height: `${headerHeight}px` }}
        >
          <img
            src={currentVideo.pic}
            alt={currentVideo.name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMTI1SDE2MEMxNTcuNzkxIDEyNSAxNTYgMTI2Ljc5MSAxNTYgMTI5VjE0N0MxNTYgMTQ5LjIwOSAxNTcuNzkxIDE1MSAxNjAgMTUxSDE3NUMxNzcuMjA5IDE1MSAxNzkgMTQ5LjIwOSAxNzkgMTQ3VjEyOUMxNzkgMTI2Ljc5MSAxNzcuMjA5IDEyNSAxNzUgMTI1WiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMjI1IDEyNUgyMTBDMjA3Ljc5MSAxMjUgMjA2IDEyNi43OTEgMjA2IDEyOVYxNDdDMjA2IDE0OS4yMDkgMjA3Ljc5MSAxNTEgMjEwIDE1MUgyMjVDMjI3LjIwOSAxNTEgMjI5IDE0OS4yMDkgMjI5IDE0N1YxMjlDMjI5IDEyNi43OTEgMjI3LjIwOSAxMjUgMjI1IDEyNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTI0MCAyMTVIMjI1QzIyMi43OTEgMjE1IDIyMSAyMTYuNzkxIDIyMSAyMTlWMjM3QzIyMSAyMzkuMjA5IDIyMi43OTEgMjQxIDIyNSAyNDFIMjQwQzI0Mi4yMDkgMjQxIDI0NCAyMzkuMjA5IDI0NCAyMzdWMjE5QzI0NCAyMTYuNzkxIDI0Mi4yMDkgMjE1IDI0MCAyMTVaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0xNzUgMjE1SDE2MEMxNTcuNzkxIDIxNSAxNTYgMjE2Ljc5MSAxNTYgMjE5VjIzN0MxNTYgMjM5LjIwOSAxNTcuNzkxIDI0MSAxNjAgMjQxSDE3NUMxNzcuMjA5IDI0MSAxNzkgMjM5LjIwOSAxNzkgMjM3VjIxOUMxNzkgMjE2Ljc5MSAxNzcuMjA5IDIxNSAxNzUgMjE1WiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <DialogHeader>
              <DialogTitle className="text-2xl md:text-3xl text-white font-bold mb-2">
                {currentVideo.name}
              </DialogTitle>
            </DialogHeader>
          </div>
        </div>
        
        {/* 滚动内容区域 */}
        <div 
          className="flex-1 overflow-y-auto"
          onScroll={handleScroll}
          ref={scrollAreaRef}
        >
          <div className="p-6">
            {loading ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin mr-2" />
                  <span>加载详情中...</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <Skeleton className="h-20 w-full" />
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-8 text-muted-foreground">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span>{error}</span>
              </div>
            ) : null}

            {/* 基本信息 */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {currentVideo.area && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">地区</div>
                    <Badge variant="outline">{currentVideo.area}</Badge>
                  </div>
                </div>
              )}
              
              {currentVideo.updateTime && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">更新时间</div>
                    <div className="text-sm">{new Date(currentVideo.updateTime).toLocaleDateString()}</div>
                  </div>
                </div>
              )}
            </div>

            {/* 演职员信息 */}
            {(currentVideo.director || currentVideo.actor) && (
              <div className="mb-6 space-y-3">
                {currentVideo.director && (
                  <div className="flex items-start gap-2">
                    <User className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground mb-1">导演</div>
                      <div className="text-sm">{currentVideo.director}</div>
                    </div>
                  </div>
                )}
                
                {currentVideo.actor && (
                  <div className="flex items-start gap-2">
                    <Users className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground mb-1">主演</div>
                      <div className="text-sm">{currentVideo.actor}</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 剧情简介 */}
            {currentVideo.content && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-4 w-4" />
                  <h3 className="font-medium">剧情简介</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {currentVideo.content}
                </p>
              </div>
            )}
            
            {/* 播放区域 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">开始播放</h3>
                {totalEpisodes > 1 && (
                  <Badge variant="secondary" className="text-white dark:text-white">
                    共{totalEpisodes}集
                  </Badge>
                )}
              </div>
              
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onPlay(currentVideo, 1);
                  onClose();
                }}
                className="w-full border-1 border-white/90 shadow-lg"
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.7)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                }}
                size="lg"
              >
                <Play className="h-4 w-4 mr-2" />
                {totalEpisodes === 1 ? '立即播放' : '播放第1集'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}