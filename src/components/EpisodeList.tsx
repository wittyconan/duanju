import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface EpisodeListProps {
  episodes: number[];
  currentEpisode: number;
  onEpisodeChange: (episode: number) => void;
  loading?: boolean;
}

export function EpisodeList({ episodes, currentEpisode, onEpisodeChange, loading }: EpisodeListProps) {
  if (episodes.length === 0 && !loading) {
    return null;
  }

  return (
    <Card>
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
                  className="h-10"
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