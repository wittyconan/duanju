import type { VideoCategory } from '@/types';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface CategoryNavProps {
  categories: VideoCategory[];
  activeCategory: number | null;
  onCategorySelect: (categoryId: number | null) => void;
  isRecommendMode?: boolean;
}

export function CategoryNav({ categories, activeCategory, onCategorySelect, isRecommendMode }: CategoryNavProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex gap-2 p-4">
        <Button
          onClick={() => onCategorySelect(null)}
          variant={isRecommendMode ? "default" : "outline"}
          size="sm"
          className="shrink-0"
        >
          推荐
        </Button>
        {categories.map((category) => (
          <Button
            key={category.type_id}
            onClick={() => onCategorySelect(category.type_id)}
            variant={activeCategory === category.type_id ? "default" : "outline"}
            size="sm"
            className="shrink-0"
          >
            {category.type_name}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}