import { BookOpen } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import type { DialogProps } from './types';

export function UserGuideDialog({ open, onOpenChange }: DialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader className="text-center pb-4">
          <div className="mx-auto mb-4 w-16 h-16 bg-indigo-100 dark:bg-indigo-900/20 rounded-full flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-indigo-600" />
          </div>
          <DialogTitle className="text-2xl font-bold">使用说明</DialogTitle>
          <DialogDescription className="text-base mt-2">
            如何更好地使用瞬剧平台
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-6 rounded-lg border">
            <h5 className="font-semibold text-lg mb-4 flex items-center text-blue-700 dark:text-blue-400">
              <BookOpen className="w-5 h-5 mr-2" />
              观看视频
            </h5>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-muted-foreground">点击视频封面即可开始播放</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-muted-foreground">支持全屏观看，双击视频可切换全屏模式</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-muted-foreground">可通过进度条快速跳转到指定时间点</span>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-emerald-50 dark:bg-emerald-950/20 p-5 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <h5 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-3">搜索功能</h5>
              <p className="text-sm text-muted-foreground leading-relaxed">
                使用顶部搜索框可快速找到您感兴趣的短剧内容，支持按标题、演员等关键词搜索。
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/20 p-5 rounded-lg border border-purple-200 dark:border-purple-800">
              <h5 className="font-semibold text-purple-700 dark:text-purple-400 mb-3">分类浏览</h5>
              <p className="text-sm text-muted-foreground leading-relaxed">
                通过分类标签浏览不同题材的短剧作品，快速发现感兴趣的内容类型。
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}