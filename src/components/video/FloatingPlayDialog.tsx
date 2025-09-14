import { useEffect, useCallback, useState } from 'react';
import { ChevronUp, ChevronDown, X } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { VideoPlayerWithFallback } from '@/components/video/VideoPlayerWithFallback';
import { useGlassEffect, getGlassOverlayClass } from '@/contexts/GlassEffectContext';

// Constants
const DEFAULT_ASPECT_RATIO = 16 / 9;
const CONTROL_PANEL_WIDTH = 64; // 4rem
const PLAYBACK_RATES = [0.5, 0.75, 1, 1.25, 1.5, 2];

interface FloatingPlayDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoUrl: string;
  videoPic?: string;
  currentEpisode: number;
  episodeList: number[];
  onEpisodeChange: (episode: number) => void;
  onVideoError?: () => void;
  onVideoEnded?: () => void;
  autoPlayNext?: boolean;
  playbackRate?: number;
  onPlaybackRateChange?: (rate: number) => void;
  initialCurrentTime?: number;
  onCurrentTimeChange?: (time: number) => void;
  episodeLoading?: boolean;
}

export function FloatingPlayDialog({
  open,
  onOpenChange,
  videoUrl,
  videoPic,
  currentEpisode,
  episodeList,
  onEpisodeChange,
  onVideoError,
  onVideoEnded,
  autoPlayNext = false,
  playbackRate = 1,
  onPlaybackRateChange,
  initialCurrentTime = 0,
  onCurrentTimeChange,
  episodeLoading = false
}: FloatingPlayDialogProps) {
  const { effectType } = useGlassEffect();
  const [aspectRatio, setAspectRatio] = useState(DEFAULT_ASPECT_RATIO);
  const [dialogSize, setDialogSize] = useState({ width: '80vw', height: '45vw' });

  // Calculate dialog size based on video aspect ratio
  const calculateDialogSize = useCallback((ratio: number) => {
    const maxWidth = Math.min(window.innerWidth * 0.9, 1200);
    const maxHeight = Math.min(window.innerHeight * 0.8, 800);

    let width = maxWidth;
    let height = width / ratio;

    // Adjust if height exceeds limit
    if (height > maxHeight) {
      height = maxHeight;
      width = height * ratio;
    }

    // Reserve space for control panel
    const totalWidth = width + CONTROL_PANEL_WIDTH;

    return {
      width: `${totalWidth}px`,
      height: `${height}px`,
      maxWidth: '90vw',
      maxHeight: '80vh'
    };
  }, []);

  // Episode navigation handlers
  const handlePreviousEpisode = useCallback(() => {
    if (currentEpisode > 1) {
      onEpisodeChange(currentEpisode - 1);
    }
  }, [currentEpisode, onEpisodeChange]);

  const handleNextEpisode = useCallback(() => {
    if (currentEpisode < episodeList.length) {
      onEpisodeChange(currentEpisode + 1);
    }
  }, [currentEpisode, episodeList.length, onEpisodeChange]);

  // Playback rate handler
  const handlePlaybackRateChange = useCallback(() => {
    const currentIndex = PLAYBACK_RATES.indexOf(playbackRate);
    const nextRate = PLAYBACK_RATES[(currentIndex + 1) % PLAYBACK_RATES.length];
    onPlaybackRateChange?.(nextRate);
  }, [playbackRate, onPlaybackRateChange]);

  // Load video metadata to get actual aspect ratio
  useEffect(() => {
    if (!open || !videoUrl) return;

    const video = document.createElement('video');
    video.src = videoUrl;
    video.preload = 'metadata';

    const handleLoadedMetadata = () => {
      const ratio = video.videoWidth / video.videoHeight;
      setAspectRatio(ratio);
      setDialogSize(calculateDialogSize(ratio));
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.src = '';
    };
  }, [open, videoUrl, calculateDialogSize]);

  // Handle window resize
  useEffect(() => {
    if (!open) return;

    const handleResize = () => {
      setDialogSize(calculateDialogSize(aspectRatio));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [open, aspectRatio, calculateDialogSize]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'ArrowUp') {
        event.preventDefault();
        handlePreviousEpisode();
      } else if (event.code === 'ArrowDown') {
        event.preventDefault();
        handleNextEpisode();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, handlePreviousEpisode, handleNextEpisode]);

  // Sync video time to parent component
  useEffect(() => {
    if (!open || !onCurrentTimeChange) return;

    const handleTimeUpdate = () => {
      const video = document.querySelector('.floating-video') as HTMLVideoElement;
      if (video) {
        onCurrentTimeChange(video.currentTime);
      }
    };

    const video = document.querySelector('.floating-video') as HTMLVideoElement;
    if (video) {
      video.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      if (video) {
        video.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [open, onCurrentTimeChange]);

  // Helper functions
  const canGoPrevious = currentEpisode > 1;
  const canGoNext = currentEpisode < episodeList.length;

  const getButtonClasses = (canNavigate: boolean) => {
    const baseClasses = "w-14 h-12 rounded-lg flex flex-col items-center justify-center gap-1 border transition-all";

    if (canNavigate && !episodeLoading) {
      return effectType === 'liquid'
        ? `${baseClasses} text-white border-white/60 hover:border-white/80 shadow-md [&]:bg-black/80 [&]:hover:bg-black/60`
        : `${baseClasses} text-white bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/40`;
    }

    return effectType === 'liquid'
      ? `${baseClasses} text-white/70 border-white/30 cursor-not-allowed [&]:bg-black/60`
      : `${baseClasses} text-white/40 bg-white/5 border-white/10 cursor-not-allowed`;
  };

  const getButtonStyle = (canNavigate: boolean) => {
    if (effectType !== 'liquid') return undefined;

    return {
      backgroundColor: (canNavigate && !episodeLoading) ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.6)',
      color: 'white'
    };
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={getGlassOverlayClass("p-0 border-0 overflow-hidden", effectType)}
        style={dialogSize}
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">
          视频播放器 - 第{currentEpisode}集
        </DialogTitle>
        <DialogDescription className="sr-only">
          浮动视频播放器，可使用上下箭头键切换集数，当前播放第{currentEpisode}集，共{episodeList.length}集
        </DialogDescription>

        <div className="relative w-full h-full flex">
          {/* Video Player */}
          <div className="flex-1 relative">
            <VideoPlayerWithFallback
              src={videoUrl}
              videoPic={videoPic}
              onError={onVideoError}
              onEnded={onVideoEnded}
              autoPlayNext={autoPlayNext}
              playbackRate={playbackRate}
              onPlaybackRateChange={onPlaybackRateChange}
              isFloatingMode={true}
              initialCurrentTime={initialCurrentTime}
              className="w-full h-full rounded-l-lg floating-video"
            />
          </div>

          {/* Control Panel */}
          <div className={`w-20 backdrop-blur-md flex flex-col items-center justify-center gap-3 rounded-r-lg border-l floating-player-controls ${
            effectType === 'liquid'
              ? 'bg-black/98 border-white/40 shadow-2xl'
              : 'bg-gradient-to-b from-black/90 to-black/70 border-white/10'
          }`}>
            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className={`absolute top-2 right-2 hover:bg-red-600/80 text-white rounded-full w-8 h-8 p-0 border transition-colors ${
                effectType === 'liquid'
                  ? 'bg-black/95 border-white/50 shadow-lg'
                  : 'bg-black/70 border-white/20'
              }`}
            >
              <X className="w-4 h-4" />
            </Button>

            {/* Previous Episode Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePreviousEpisode}
              disabled={!canGoPrevious || episodeLoading}
              className={getButtonClasses(canGoPrevious)}
              style={getButtonStyle(canGoPrevious)}
              title={
                episodeLoading ? '加载中...' :
                (canGoPrevious ? `上一集 (第${currentEpisode - 1}集)` : '已是第一集')
              }
            >
              <ChevronUp className="w-5 h-5" />
              <span className="text-xs font-medium text-white">上一集</span>
            </Button>

            {/* Current Episode Display */}
            <div className={`text-center py-2 px-2 rounded-lg border min-w-14 ${
              effectType === 'liquid'
                ? 'bg-black/90 border-white/60 shadow-md'
                : 'bg-white/10 border-white/20'
            }`}>
              <div className="text-sm font-bold text-white">{currentEpisode}</div>
              <div className={`text-xs ${
                effectType === 'liquid' ? 'text-white/95' : 'text-white/80'
              }`}>/{episodeList.length}</div>
            </div>

            {/* Playback Rate Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePlaybackRateChange}
              className={`w-14 h-12 rounded-lg flex flex-col items-center justify-center gap-1 border transition-all ${
                effectType === 'liquid'
                  ? 'text-white border-white/60 hover:border-white/80 shadow-md [&]:bg-black/80 [&]:hover:bg-black/60'
                  : 'text-white bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/40'
              }`}
              style={effectType === 'liquid' ? {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: 'white'
              } : undefined}
              title={`当前倍速: ${playbackRate}x`}
            >
              <span className="text-xs font-bold text-white">{playbackRate}x</span>
              <span className="text-xs font-medium text-white">倍速</span>
            </Button>

            {/* Next Episode Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNextEpisode}
              disabled={!canGoNext || episodeLoading}
              className={getButtonClasses(canGoNext)}
              style={getButtonStyle(canGoNext)}
              title={
                episodeLoading ? '加载中...' :
                (canGoNext ? `下一集 (第${currentEpisode + 1}集)` : '已是最后一集')
              }
            >
              <ChevronDown className="w-5 h-5" />
              <span className="text-xs font-medium text-white">下一集</span>
            </Button>

            {/* Keyboard Hint */}
            <div className={`text-center mt-2 px-2 py-1 rounded border ${
              effectType === 'liquid'
                ? 'bg-black/70 border-white/40'
                : 'bg-white/5 border-white/10'
            }`}>
              <div className={`text-xs font-medium ${
                effectType === 'liquid' ? 'text-white' : 'text-white/90'
              }`}>键盘</div>
              <div className={`text-xs ${
                effectType === 'liquid' ? 'text-white/90' : 'text-white/70'
              }`}>↑ ↓</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}