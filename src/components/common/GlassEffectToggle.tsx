import { useGlassEffect } from '@/contexts/GlassEffectContext';
import { Button } from '@/components/ui/button';
import { Droplets, Sparkles } from 'lucide-react';

export function GlassEffectToggle() {
  const { effectType, toggleEffect } = useGlassEffect();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleEffect}
      className="gap-2 text-xs"
      title={effectType === 'blur' ? '切换到 Liquid Glass 效果' : '切换到毛玻璃效果'}
    >
      {effectType === 'blur' ? (
        <>
          <Sparkles className="h-4 w-4" />
          毛玻璃
        </>
      ) : (
        <>
          <Droplets className="h-4 w-4" />
          流体玻璃
        </>
      )}
    </Button>
  );
}