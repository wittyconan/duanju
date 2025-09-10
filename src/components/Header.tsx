import { SearchBar } from './SearchBar';
import { Button } from '@/components/ui/button';
import { Film, Home, TrendingUp, Clock } from 'lucide-react';

interface HeaderProps {
  onSearch: (query: string) => void;
  onNavClick?: (type: 'home' | 'latest' | 'recommended') => void;
}

export function Header({ onSearch, onNavClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Film className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">瞬剧</h1>
        </div>
        
        <div className="flex-1 max-w-lg mx-8">
          <SearchBar onSearch={onSearch} />
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
        </nav>
      </div>
    </header>
  );
}