import { Skeleton } from '@/components/ui/skeleton';

export function VideoCardSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="aspect-[3/4] w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}

export function VideoGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <VideoCardSkeleton key={index} />
      ))}
    </div>
  );
}