import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ExternalLink, RefreshCw } from 'lucide-react';
import { CustomVideoPlayer } from './CustomVideoPlayer';

interface VideoPlayerWithFallbackProps {
  src: string;
  videoPic?: string;
  onError?: () => void;
  onLoadedMetadata?: () => void;
  className?: string;
  autoPlay?: boolean;
}

type PlaybackMode = 'direct' | 'external' | 'error';

export function VideoPlayerWithFallback({ 
  src, 
  videoPic,
  onError, 
  onLoadedMetadata, 
  className, 
  autoPlay = true 
}: VideoPlayerWithFallbackProps) {
  const [playbackMode, setPlaybackMode] = useState<PlaybackMode>('direct');
  const [errorCount, setErrorCount] = useState(0);

  const handleVideoError = useCallback(() => {
    console.error('视频播放失败，切换到备选方案');
    const newErrorCount = errorCount + 1;
    setErrorCount(newErrorCount);
    
    if (newErrorCount === 1) {
      // 第一次失败，显示外部链接选项
      setPlaybackMode('external');
    } else {
      // 多次失败，显示错误状态
      setPlaybackMode('error');
      onError?.();
    }
  }, [errorCount, onError]);

  const handleRetry = useCallback(() => {
    setPlaybackMode('direct');
    setErrorCount(0);
  }, []);

  const openInNewTab = useCallback(() => {
    window.open(src, '_blank', 'noopener,noreferrer');
  }, [src]);

  // 直接视频播放
  if (playbackMode === 'direct') {
    return (
      <CustomVideoPlayer
        src={src}
        onError={handleVideoError}
        onLoadedMetadata={onLoadedMetadata}
        className={className}
        autoPlay={autoPlay}
      />
    );
  }


  // 外部播放选项
  if (playbackMode === 'external') {
    return (
      <div 
        className={`relative bg-gray-100 dark:bg-black rounded-lg overflow-hidden ${className}`}
        style={{
          backgroundImage: videoPic ? `url(${videoPic})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 dark:bg-black/50 backdrop-blur-sm p-8">
          <div className="bg-white/20 dark:bg-white/15 backdrop-blur-md rounded-lg p-8 max-w-md w-full border border-white/30 dark:border-white/30">
            <AlertTriangle className="w-12 h-12 text-yellow-500 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white text-center mb-2">播放受限</h3>
            <p className="text-sm text-gray-600 dark:text-gray-200 text-center mb-6">
              由于跨域限制，无法在当前页面播放此视频。
              <br />
              请尝试以下解决方案：
            </p>
            
            <div className="flex flex-col gap-3 w-full">
              <Button
                onClick={openInNewTab}
                className="flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                在新标签页打开
              </Button>
              
              <Button
                variant="outline"
                onClick={handleRetry}
                className="flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                重新尝试播放
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 错误状态
  return (
    <div 
      className={`relative bg-gray-100 dark:bg-black rounded-lg overflow-hidden ${className}`}
      style={{
        backgroundImage: videoPic ? `url(${videoPic})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 dark:bg-black/50 backdrop-blur-sm p-8">
        <div className="bg-white/20 dark:bg-white/15 backdrop-blur-md rounded-lg p-8 max-w-md w-full text-center border border-white/30 dark:border-white/30">
          <AlertTriangle className="w-12 h-12 text-red-500 mb-4 mx-auto" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            播放失败
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-200 mb-4">
            视频无法播放，可能是网络问题或视频源已失效
          </p>
          <Button
            variant="outline"
            onClick={handleRetry}
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            重试
          </Button>
        </div>
      </div>
    </div>
  );
}