import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ExternalLink, RefreshCw } from 'lucide-react';
import { CustomVideoPlayer } from './CustomVideoPlayer';

// 页面级配置参数
const CONFIG = {
  // 样式类名配置
  styles: {
    container: 'relative rounded-lg overflow-hidden',
    backgroundContainer: 'relative rounded-lg overflow-hidden',
    overlay: 'absolute inset-0 flex flex-col items-center justify-center bg-white/50 dark:bg-black/50 backdrop-blur-sm p-8 rounded-lg',
    dialog: 'bg-white/20 dark:bg-white/15 backdrop-blur-md rounded-lg p-8 max-w-md w-full border border-white/30 dark:border-white/30',
    dialogCenter: 'bg-white/20 dark:bg-white/15 backdrop-blur-md rounded-lg p-8 max-w-md w-full text-center border border-white/30 dark:border-white/30',
    icon: {
      warning: 'w-12 h-12 text-yellow-500 mb-4 mx-auto',
      error: 'w-12 h-12 text-red-500 mb-4 mx-auto'
    },
    title: 'text-lg font-semibold text-gray-800 dark:text-white text-center mb-2',
    description: 'text-sm text-gray-600 dark:text-gray-200 text-center mb-6',
    errorDescription: 'text-sm text-gray-600 dark:text-gray-200 mb-4',
    buttonGroup: 'flex flex-col gap-3 w-full',
    button: {
      primary: 'flex items-center justify-center gap-2',
      secondary: 'flex items-center justify-center gap-2'
    }
  },
  
  // 背景样式配置
  background: {
    light: 'bg-gray-100',
    dark: 'dark:bg-black'
  }
};

interface VideoPlayerWithFallbackProps {
  src: string;
  videoPic?: string;
  onError?: () => void;
  onLoadedMetadata?: () => void;
  onEnded?: () => void;
  className?: string;
  autoPlay?: boolean;
  autoPlayNext?: boolean;
  playbackRate?: number;
  onPlaybackRateChange?: (rate: number) => void;
}

type PlaybackMode = 'direct' | 'external' | 'error';

export function VideoPlayerWithFallback({ 
  src, 
  videoPic,
  onError, 
  onLoadedMetadata, 
  onEnded,
  className, 
  autoPlay = true,
  autoPlayNext = false,
  playbackRate = 1,
  onPlaybackRateChange
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
        onEnded={onEnded}
        className={className}
        autoPlay={autoPlay}
        autoPlayNext={autoPlayNext}
        playbackRate={playbackRate}
        onPlaybackRateChange={onPlaybackRateChange}
      />
    );
  }


  // 外部播放选项
  if (playbackMode === 'external') {
    return (
      <div 
        className={`${CONFIG.background.light} ${CONFIG.background.dark} ${CONFIG.styles.backgroundContainer} ${className}`}
        style={{
          backgroundImage: videoPic ? `url(${videoPic})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className={CONFIG.styles.overlay}>
          <div className={CONFIG.styles.dialog}>
            <AlertTriangle className={CONFIG.styles.icon.warning} />
            <h3 className={CONFIG.styles.title}>播放受限</h3>
            <p className={CONFIG.styles.description}>
              由于跨域限制，无法在当前页面播放此视频。
              <br />
              请尝试以下解决方案：
            </p>
            
            <div className={CONFIG.styles.buttonGroup}>
              <Button
                onClick={openInNewTab}
                className={CONFIG.styles.button.primary}
              >
                <ExternalLink className="w-4 h-4" />
                在新标签页打开
              </Button>
              
              <Button
                variant="outline"
                onClick={handleRetry}
                className={CONFIG.styles.button.secondary}
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
      className={`${CONFIG.background.light} ${CONFIG.background.dark} ${CONFIG.styles.backgroundContainer} ${className}`}
      style={{
        backgroundImage: videoPic ? `url(${videoPic})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className={CONFIG.styles.overlay}>
        <div className={CONFIG.styles.dialogCenter}>
          <AlertTriangle className={CONFIG.styles.icon.error} />
          <h3 className={CONFIG.styles.title}>
            播放失败
          </h3>
          <p className={CONFIG.styles.errorDescription}>
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