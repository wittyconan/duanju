import { Skeleton } from '@/components/ui/skeleton';

export function VideoPlayPageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* 顶部导航骨架屏 */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="h-8 w-16 rounded" />
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
            <Skeleton className="h-9 w-9 rounded-full" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧视频播放器骨架屏 */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-lg bg-black">
              <Skeleton className="aspect-video w-full" />
              
              {/* 播放器下方控制栏骨架屏 */}
              <div className="p-4 bg-background border-t">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </div>

            {/* 视频详情信息骨架屏 */}
            <div className="mt-4 rounded-lg border bg-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-6 w-20" />
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-16 w-full" />
                </div>
              </div>
            </div>
          </div>

          {/* 右侧选集列表骨架屏 */}
          <div className="lg:col-span-1">
            <div className="rounded-lg border bg-card">
              <div className="p-4 border-b">
                <Skeleton className="h-6 w-16" />
              </div>
              <div className="p-4">
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: 12 }).map((_, index) => (
                    <Skeleton key={index} className="h-10 w-full rounded" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}