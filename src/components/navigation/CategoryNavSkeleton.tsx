import { Skeleton } from '@/components/ui/skeleton';

export function CategoryNavSkeleton() {
  return (
    <div className="sticky top-[73px] z-40 bg-background/80 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-8 w-16 rounded-full flex-shrink-0" />
          ))}
        </div>
      </div>
    </div>
  );
}