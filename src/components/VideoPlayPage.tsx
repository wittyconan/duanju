import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from './Header';
import { Footer } from './Footer';
import { BackToTop } from './BackToTop';
import { VideoPlayPageSkeleton } from './VideoPlayPageSkeleton';
import { Play } from 'lucide-react';
import type { VideoItem } from '@/types';
import { apiService } from '@/services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { VideoPlayerWithFallback } from './VideoPlayerWithFallback';
import { VideoInfo } from './VideoInfo';
import { EpisodeList } from './EpisodeList';
import { VideoError } from './VideoError';
import { useGlassEffect, getGlassClass } from '@/contexts/GlassEffectContext';
import { toast } from 'sonner';

export function VideoPlayPage() {
  const navigate = useNavigate();
  const { videoId, episode: episodeParam } = useParams();
  const { effectType } = useGlassEffect();
  
  const [video, setVideo] = useState<VideoItem | null>(null);
  const [currentEpisode, setCurrentEpisode] = useState(parseInt(episodeParam || '1'));
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [episodeList, setEpisodeList] = useState<number[]>([]);
  const [videoInfo, setVideoInfo] = useState<{ totalEpisodes?: number; description?: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [autoPlayNext, setAutoPlayNext] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    if (videoId) {
      // 从sessionStorage获取视频信息
      const storedVideo = sessionStorage.getItem('currentVideo');
      if (storedVideo) {
        const parsedVideo = JSON.parse(storedVideo);
        setVideo(parsedVideo);
        
        // 更新页面标题
        document.title = `瞬剧｜${parsedVideo.name}`;
        
        // 从备注信息中解析集数
        if (parsedVideo.remarks) {
          const match = parsedVideo.remarks.match(/全(\d+)集/);
          if (match) {
            const totalEpisodes = parseInt(match[1]);
            setEpisodeList(Array.from({ length: totalEpisodes }, (_, i) => i + 1));
          }
        }
      }
      // 添加延迟让用户能看到骨架屏
      setTimeout(() => {
        setPageLoading(false);
      }, 800);
    }
  }, [videoId]);

  const loadEpisode = useCallback(async (episode: number) => {
    if (!video || loading) return; // 防止重复加载
    
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getVideoUrl(video.id, episode);
      if (response.url) {
        setVideoUrl(response.url);
        setVideoInfo(response.videoInfo);
        
        // 如果总集数大于1，更新集数列表
        if (response.videoInfo?.totalEpisodes > 1) {
          const totalEpisodes = response.videoInfo.totalEpisodes;
          setEpisodeList(Array.from({ length: totalEpisodes }, (_, i) => i + 1));
        }
      }
    } catch (error) {
      console.error('加载视频失败:', error);
      setError('视频加载失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  }, [video, loading]);

  useEffect(() => {
    if (video && currentEpisode) {
      loadEpisode(currentEpisode);
      // 只有当URL参数与当前集数不匹配时才更新URL
      const currentEpisodeFromUrl = parseInt(episodeParam || '1');
      if (currentEpisode !== currentEpisodeFromUrl) {
        navigate(`/play/${video.id}/${currentEpisode}`, { replace: true });
      }
      document.title = `瞬剧｜${video.name} - 第${currentEpisode}集`;
    }
  }, [video, currentEpisode, episodeParam, navigate]);

  const handleEpisodeChange = (episode: number) => {
    setCurrentEpisode(episode);
  };

  const handleDownload = () => {
    if (videoUrl && video) {
      const link = document.createElement('a');
      link.href = videoUrl;
      link.download = `${video.name}-第${currentEpisode}集.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleVideoError = () => {
    setError('视频播放出错，可能是网络问题或链接限制，建议尝试下载观看');
  };

  const handleVideoEnded = () => {
    // 自动播放下一集
    if (autoPlayNext && episodeList.length > 0) {
      const nextEpisode = currentEpisode + 1;
      if (nextEpisode <= episodeList.length) {
        setCurrentEpisode(nextEpisode);
      } else {
        // 已经是最后一集，关闭自动下一集并显示提示
        setAutoPlayNext(false);
        toast.info('全部播放完毕，已关闭自动下一集', {
          duration: 3000,
          position: 'top-center'
        });
      }
    }
  };

  const handleTryDirectPlay = () => {
    if (videoUrl) {
      // 在新窗口打开视频链接，让浏览器直接处理
      window.open(videoUrl, '_blank');
    }
  };

  if (pageLoading) {
    return <VideoPlayPageSkeleton />;
  }

  if (!video) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg mb-4">视频信息加载中...</div>
          <Button onClick={() => navigate('/')}>返回首页</Button>
        </div>
      </div>
    );
  }

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleNavClick = (type: 'home' | 'latest' | 'recommended') => {
    if (type === 'home') {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={handleSearch} onNavClick={handleNavClick} />
      
      {/* 视频信息栏 */}
      <div className={getGlassClass("bg-background/80 backdrop-blur-sm border-b", effectType)}>
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                返回
              </Button> */}
              <h1 className="text-lg font-semibold truncate">{video.name}</h1>
              {episodeList.length > 1 && (
                <Badge variant="secondary">
                  第{currentEpisode}集 / 共{episodeList.length}集
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 min-h-[70vh]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧视频播放器 */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-lg">
              <div className="aspect-video relative">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-white">加载中...</div>
                  </div>
                ) : error ? (
                  <VideoError
                    error={error}
                    videoPic={video?.pic}
                    onRetry={() => loadEpisode(currentEpisode)}
                    onDirectPlay={handleTryDirectPlay}
                    onDownload={handleDownload}
                  />
                ) : (
                  <VideoPlayerWithFallback
                    src={videoUrl}
                    videoPic={video?.pic}
                    onError={handleVideoError}
                    onLoadedMetadata={() => setError(null)}
                    onEnded={handleVideoEnded}
                    autoPlayNext={autoPlayNext}
                    playbackRate={playbackRate}
                    onPlaybackRateChange={setPlaybackRate}
                    className="w-full h-full"
                  />
                )}
              </div>
              
              {/* 播放器下方控制栏 */}
              <div className="p-4 bg-background border-t">
                <div className="flex items-center gap-4">
                  <h2 className="font-semibold">{video.name}</h2>
                  {episodeList.length > 1 && (
                    <span className="text-sm text-muted-foreground">
                      第{currentEpisode}集
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* 视频详情信息 */}
            <Card className={getGlassClass("mt-4 bg-background/95 backdrop-blur-sm border", effectType)}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  剧情介绍
                </CardTitle>
              </CardHeader>
              <CardContent>
                <VideoInfo video={video} videoInfo={videoInfo || undefined} />
              </CardContent>
            </Card>
          </div>

          {/* 右侧选集列表 */}
          {(episodeList.length > 0 || (videoInfo?.totalEpisodes && videoInfo.totalEpisodes > 1)) && (
            <div className="lg:col-span-1">
              <EpisodeList
                episodes={episodeList}
                currentEpisode={currentEpisode}
                onEpisodeChange={handleEpisodeChange}
                loading={loading}
              />
            </div>
          )}
        </div>
      </div>
      
      <Footer />
      <BackToTop />
    </div>
  );
}