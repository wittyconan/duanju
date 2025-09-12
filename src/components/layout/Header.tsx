import { SearchBar } from '@/components/navigation/SearchBar';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { GlassEffectToggle } from '@/components/common/GlassEffectToggle';
import { useGlassEffect, getGlassClass } from '@/contexts/GlassEffectContext';
import { Home, TrendingUp, Clock } from 'lucide-react';

interface HeaderProps {
  onSearch: (query: string) => void;
  onNavClick?: (type: 'home' | 'latest' | 'recommended') => void;
  searchInitialValue?: string;
}

export function Header({ onSearch, onNavClick, searchInitialValue }: HeaderProps) {
  const { effectType } = useGlassEffect();

  return (
    <header className={getGlassClass("sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b", effectType)}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 cursor-pointer select-none" 
            onClick={() => onNavClick?.('home')}>
          <img 
            src="/snapdrama-icon.svg" 
            alt="瞬剧" 
            className="h-6 w-6 dark:opacity-80 dark:brightness-90 pointer-events-none"
            draggable="false"
          />
          <h1 className="text-xl font-bold">瞬剧</h1>
        </div>
        
        <div className="flex-1 max-w-lg mx-8">
          <SearchBar onSearch={onSearch} initialValue={searchInitialValue} />
        </div>
        
        <nav className="hidden md:flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-2"
            onClick={() => onNavClick?.('home')}
          >
            <Home className="h-4 w-4" />
            首页
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-2"
            onClick={() => onNavClick?.('latest')}
          >
            <Clock className="h-4 w-4" />
            最新
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-2"
            onClick={() => onNavClick?.('recommended')}
          >
            <TrendingUp className="h-4 w-4" />
            推荐
          </Button>
          <GlassEffectToggle />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}