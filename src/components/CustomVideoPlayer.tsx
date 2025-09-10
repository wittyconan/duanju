import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward, Maximize2, PlayCircle, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

// 常量配置
const PLAYBACK_RATES = [0.5, 0.75, 1, 1.25, 1.5, 2, 3];
const INITIAL_VOLUME = 0.4;
const CONTROLS_HIDE_DELAY = 3000;
const UNMUTE_DELAY = 1000;

interface CustomVideoPlayerProps {
  src: string;
  onError?: () => void;
  onLoadedMetadata?: () => void;
  onEnded?: () => void;
  className?: string;
  autoPlay?: boolean;
  autoPlayNext?: boolean;
  playbackRate?: number;
  onPlaybackRateChange?: (rate: number) => void;
}

export function CustomVideoPlayer({ 
  src, 
  onError, 
  onLoadedMetadata, 
  onEnded, 
  className, 
  autoPlay = true, 
  autoPlayNext = false,
  playbackRate: initialPlaybackRate = 1,
  onPlaybackRateChange
}: CustomVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.4);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(initialPlaybackRate);
  const [autoPlayNextEnabled, setAutoPlayNextEnabled] = useState(autoPlayNext);
  const [isWebFullscreen, setIsWebFullscreen] = useState(false);

  const controlsTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // 设置初始音量
    video.volume = INITIAL_VOLUME;
    // 设置播放速率
    video.playbackRate = playbackRate;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleDurationChange = () => setDuration(video.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      if (autoPlayNextEnabled && onEnded) {
        onEnded();
      }
    };
    const handleError = (e: Event) => {
      console.error('Video error:', e);
      onError?.();
    };
    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      onLoadedMetadata?.();
    };

    // 为夸克网盘等直链设置请求头
    if (src) {
      // 对于第三方视频源，不设置crossorigin避免CORS问题
      if (src.includes('drive.quark.cn') || 
          src.includes('quark.cn') ||
          src.includes('aliyundrive.com') ||
          src.includes('189.cn')) {
        
        // 移除crossorigin属性
        video.removeAttribute('crossorigin');
        
        // 设置referrer策略为no-referrer
        video.setAttribute('referrerpolicy', 'no-referrer');
        
        // 设置preload属性
        video.setAttribute('preload', 'metadata');
      } else {
        // 对于其他源，使用标准CORS设置
        video.crossOrigin = 'anonymous';
      }
    }

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    // 监听全屏状态变化
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
        toast.success('已进入全屏模式', {
          duration: 1500,
          position: 'top-center'
        });
      } else {
        toast.success('已退出全屏模式', {
          duration: 1500,
          position: 'top-center'
        });
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [onError, onLoadedMetadata, src, playbackRate]);

  // 自动播放逻辑
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src || !autoPlay) return;
    
    // 为了符合浏览器的自动播放策略，开始时静音
    video.muted = true;
    setIsMuted(true);
    
    const handleCanPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // 自动播放成功后，延迟取消静音
            setTimeout(() => {
              if (volume > 0) {
                video.muted = false;
                setIsMuted(false);
              }
            }, UNMUTE_DELAY);
          })
          .catch((error) => {
            console.log('Auto-play failed:', error);
          });
      }
    };

    if (video.readyState >= 3) {
      handleCanPlay();
    } else {
      video.addEventListener('canplay', handleCanPlay, { once: true });
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [src, autoPlay, volume]);

  // 确保播放速率在视频源改变时保持
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handleLoadedData = () => {
      video.playbackRate = playbackRate;
    };
    
    video.addEventListener('loadeddata', handleLoadedData);
    
    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [src, playbackRate]);

  // 同步外部传入的播放速率
  useEffect(() => {
    if (initialPlaybackRate !== playbackRate) {
      setPlaybackRate(initialPlaybackRate);
      const video = videoRef.current;
      if (video) {
        video.playbackRate = initialPlaybackRate;
      }
    }
  }, [initialPlaybackRate, playbackRate]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  }, [isPlaying]);

  const handleSeek = useCallback((value: number[]) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = value[0];
    setCurrentTime(value[0]);
  }, []);

  const handleVolumeChange = useCallback((value: number[]) => {
    const video = videoRef.current;
    if (!video) return;
    const newVolume = value[0];
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isMuted) {
      video.volume = volume || INITIAL_VOLUME;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  }, [isMuted, volume]);

  const skipTime = useCallback((seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime += seconds;
  }, []);

  const handlePlaybackRateChange = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const currentIndex = PLAYBACK_RATES.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % PLAYBACK_RATES.length;
    const newRate = PLAYBACK_RATES[nextIndex];
    
    video.playbackRate = newRate;
    setPlaybackRate(newRate);
    onPlaybackRateChange?.(newRate);
  }, [playbackRate, onPlaybackRateChange]);

  const toggleFullscreen = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch((err) => {
        console.error('Failed to enter fullscreen:', err);
        toast.error('无法进入全屏模式', {
          duration: 2000,
          position: 'top-center'
        });
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.error('Failed to exit fullscreen:', err);
        toast.error('无法退出全屏模式', {
          duration: 2000,
          position: 'top-center'
        });
      });
    }
  }, []);

  const toggleWebFullscreen = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    if (container.classList.contains('web-fullscreen')) {
      container.classList.remove('web-fullscreen');
      setIsWebFullscreen(false);
      toast.success('已退出网页全屏', {
        duration: 1500,
        position: 'top-center'
      });
    } else {
      container.classList.add('web-fullscreen');
      setIsWebFullscreen(true);
      toast.success('已进入网页全屏', {
        duration: 1500,
        position: 'top-center'
      });
    }
  }, []);

  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, CONTROLS_HIDE_DELAY);
  }, [isPlaying]);

  // 优化的时间格式化函数
  const formatTime = useMemo(() => {
    return (time: number) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };
  }, []);

  const handleVideoClick = useCallback(() => {
    togglePlay();
  }, [togglePlay]);

  // 渲染控制按钮
  const renderPlaybackControls = useMemo(() => (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={togglePlay}
        className="text-white hover:bg-white/20 hover:text-white transition-colors"
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => skipTime(-10)}
        className="text-white hover:bg-white/20 hover:text-white transition-colors"
      >
        <SkipBack className="w-4 h-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => skipTime(10)}
        className="text-white hover:bg-white/20 hover:text-white transition-colors"
      >
        <SkipForward className="w-4 h-4" />
      </Button>

      <div className="flex items-center gap-2 ml-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMute}
          className="text-white hover:bg-white/20 hover:text-white transition-colors"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </Button>
        <div className="w-20">
          <Slider
            value={[isMuted ? 0 : volume]}
            max={1}
            step={0.1}
            onValueChange={handleVolumeChange}
            className="w-full [&_[data-slot=slider-track]]:bg-white/30 [&_[data-slot=slider-track]]:shadow-[0_0_0_1px_rgba(0,0,0,0.5)] [&_[data-slot=slider-range]]:bg-white [&_[data-slot=slider-thumb]]:bg-white [&_[data-slot=slider-thumb]]:border-white [&_[data-slot=slider-thumb]]:shadow-[0_0_0_2px_rgba(0,0,0,0.3)]"
          />
        </div>
      </div>
    </div>
  ), [isPlaying, togglePlay, skipTime, isMuted, toggleMute, volume, handleVolumeChange]);

  // 渲染右侧控制按钮
  const renderRightControls = useMemo(() => (
    <div className="flex items-center gap-2">
      <span className="text-white text-sm">
        {formatTime(currentTime)} / {formatTime(duration)}
      </span>

      <Button
        variant="ghost"
        size="sm"
        onClick={handlePlaybackRateChange}
        className="text-white hover:bg-white/20 hover:text-white min-w-[48px] transition-colors"
        title={`当前倍速: ${playbackRate}x，点击切换`}
      >
        <span className="text-xs font-medium">{playbackRate}x</span>
      </Button>

      <div className="flex items-center gap-2 text-white">
        <PlayCircle className="w-4 h-4" />
        <span className="text-xs font-medium whitespace-nowrap">自动下一集</span>
        <Switch
          checked={autoPlayNextEnabled}
          onCheckedChange={(checked) => {
            setAutoPlayNextEnabled(checked);
            toast.success(checked ? '已开启自动下一集' : '已关闭自动下一集', {
              duration: 1500,
              position: 'top-center'
            });
          }}
          className="data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-gray-600"
        />
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={toggleWebFullscreen}
        className="text-white hover:bg-white/20 hover:text-white transition-colors"
        title={isWebFullscreen ? "退出网页全屏" : "网页全屏"}
      >
        {isWebFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={toggleFullscreen}
        className="text-white hover:bg-white/20 hover:text-white transition-colors"
        title="浏览器全屏"
      >
        <Maximize className="w-4 h-4" />
      </Button>
    </div>
  ), [currentTime, duration, formatTime, playbackRate, handlePlaybackRateChange, autoPlayNextEnabled, isWebFullscreen, toggleWebFullscreen, toggleFullscreen]);

  return (
    <div 
      ref={containerRef}
      className={`relative bg-black group overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-contain cursor-pointer"
        onClick={handleVideoClick}
        onDoubleClick={toggleFullscreen}
      />

      {/* 播放按钮覆盖层 */}
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
          onClick={togglePlay}
        >
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-colors">
            <Play className="w-12 h-12 text-white ml-1" />
          </div>
        </div>
      )}

      {/* 控制栏 */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
        showControls ? 'opacity-100' : 'opacity-0'
      }`}>
        {/* 进度条 */}
        <div className="mb-4">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={1}
            onValueChange={handleSeek}
            className="w-full [&_[data-slot=slider-track]]:bg-white/30 [&_[data-slot=slider-track]]:shadow-[0_0_0_1px_rgba(0,0,0,0.5)] [&_[data-slot=slider-range]]:bg-white [&_[data-slot=slider-thumb]]:bg-white [&_[data-slot=slider-thumb]]:border-white [&_[data-slot=slider-thumb]]:shadow-[0_0_0_2px_rgba(0,0,0,0.3)]"
          />
        </div>

        {/* 控制按钮 */}
        <div className="flex items-center justify-between">
          {renderPlaybackControls}
          {renderRightControls}
        </div>
      </div>
    </div>
  );
}