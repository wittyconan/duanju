import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGlassEffect, getGlassClass, getGlassButtonClass } from '@/contexts/GlassEffectContext';

interface EpisodeListProps {
  episodes: number[];
  currentEpisode: number;
  onEpisodeChange: (episode: number) => void;
  loading?: boolean;
}

export function EpisodeList({ episodes, currentEpisode, onEpisodeChange, loading }: EpisodeListProps) {
  const { effectType } = useGlassEffect();

  if (episodes.length === 0 && !loading) {
    return null;
  }

  return (
    <Card className={getGlassClass("bg-background/80 backdrop-blur-sm border", effectType)}>
      <CardHeader>
        <CardTitle className="text-base">选集播放</CardTitle>
        <p className="text-sm text-muted-foreground">
          {episodes.length > 0 ? `共${episodes.length}集` : '加载中...'}
        </p>
      </CardHeader>
      <CardContent className="pr-2">
        <ScrollArea className="h-150 pr-4">
          {episodes.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-muted-foreground">
              加载集数中...
            </div>
          ) : (
            <div className="grid grid-cols-4 lg:grid-cols-3 gap-3 pr-2">
              {episodes.map((episode) => (
                <Button
                  key={episode}
                  variant={episode === currentEpisode ? "default" : "outline"}
                  size="sm"
                  onClick={() => onEpisodeChange(episode)}
                  className={
                    episode === currentEpisode 
                      ? "h-10 bg-primary text-primary-foreground font-bold border-2 border-primary shadow-lg" 
                      : getGlassButtonClass("h-10 bg-background/50 backdrop-blur-sm hover:bg-background/70", effectType)
                  }
                >
                  {episode}
                </Button>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}