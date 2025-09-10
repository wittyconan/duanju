import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoErrorProps {
  error: string;
  videoPic?: string;
  onRetry: () => void;
  onDirectPlay: () => void;
  onDownload: () => void;
}

export function VideoError({ error, videoPic, onRetry, onDirectPlay, onDownload }: VideoErrorProps) {
  return (
    <div 
      className="flex flex-col items-center justify-center h-full text-white p-8"
      style={{
        backgroundImage: videoPic ? `url(${videoPic})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative z-10 flex flex-col items-center">
        <AlertCircle className="h-12 w-12 mb-4 text-red-400" />
        <div className="text-center mb-4 text-white font-medium">{error}</div>
        <div className="flex gap-2">
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={onRetry}
            className="bg-white/10 backdrop-blur text-white border-white/30 hover:bg-white/20"
          >
            重新加载
          </Button>
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={onDirectPlay}
            className="bg-white/10 backdrop-blur text-white border-white/30 hover:bg-white/20"
          >
            直接播放
          </Button>
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={onDownload}
            className="bg-white/10 backdrop-blur text-white border-white/30 hover:bg-white/20"
          >
            下载观看
          </Button>
        </div>
      </div>
    </div>
  );
}