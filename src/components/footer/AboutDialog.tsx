import { Users, Info } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import type { DialogProps } from './types';

export function AboutDialog({ open, onOpenChange }: DialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader className="text-center pb-4">
          <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-bold">关于我们</DialogTitle>
          <DialogDescription className="text-base mt-2">
            了解瞬剧平台的理念与愿景
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-6 rounded-lg border">
            <h4 className="font-semibold text-lg mb-3 flex items-center">
              <Info className="w-5 h-5 mr-2 text-blue-600" />
              平台介绍
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              瞬剧是一个专注于短剧内容的观看平台，致力于为用户提供高质量、精彩纷呈的短剧体验。
              我们深知时间的珍贵，因此精心打造每一分钟的观看体验。
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h5 className="font-semibold mb-2 text-green-700 dark:text-green-400">我们的使命</h5>
              <p className="text-sm text-muted-foreground">
                让每一分钟的观看时间都充满价值，通过精心筛选的内容和优化的观看体验，为用户带来最佳的娱乐享受。
              </p>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg">
              <h5 className="font-semibold mb-2 text-purple-700 dark:text-purple-400">内容特色</h5>
              <p className="text-sm text-muted-foreground">
                平台汇聚了各类优质短剧作品，涵盖言情、悬疑、喜剧、都市等多个题材，满足不同用户的观看需求。
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}