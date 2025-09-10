import { HelpCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import type { DialogProps } from './types';

export function FaqDialog({ open, onOpenChange }: DialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[80vh] flex flex-col">
        <DialogHeader className="text-center pb-4 flex-shrink-0">
          <div className="mx-auto mb-4 w-16 h-16 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center">
            <HelpCircle className="w-8 h-8 text-amber-600" />
          </div>
          <DialogTitle className="text-2xl font-bold">常见问题</DialogTitle>
          <DialogDescription className="text-base mt-2">
            关于视频播放的常见问题解答
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 overflow-y-auto pr-2">
          <div className="border-l-4 border-red-500 bg-red-50 dark:bg-red-950/20 p-6 rounded-r-lg">
            <h5 className="font-semibold text-lg mb-3 text-red-700 dark:text-red-400">Q: 为什么有些视频无法播放？</h5>
            <p className="text-muted-foreground mb-3">
              A: 可能是由于以下原因：
            </p>
            <div className="grid gap-2">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm">网络连接不稳定，请检查网络状态</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm">视频源暂时不可用，请稍后重试</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm">浏览器兼容性问题，建议使用最新版本的Chrome或Safari</span>
              </div>
            </div>
          </div>
          
          <div className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20 p-6 rounded-r-lg">
            <h5 className="font-semibold text-lg mb-3 text-blue-700 dark:text-blue-400">Q: 关于跨域播放问题</h5>
            <p className="text-muted-foreground mb-3">
              A: 我们的播放器已针对跨域播放进行了优化：
            </p>
            <div className="grid gap-2">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm">自动设置crossOrigin属性处理CORS问题</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm">对夸克网盘等第三方链接设置了no-referrer策略</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm">如仍有播放问题，可能是视频源设置了防盗链保护</span>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 p-6 rounded-r-lg">
            <h5 className="font-semibold text-lg mb-3 text-green-700 dark:text-green-400">Q: 视频加载很慢怎么办？</h5>
            <p className="text-muted-foreground mb-3">
              A: 建议尝试以下方法：
            </p>
            <div className="grid gap-2">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm">切换到更稳定的网络环境</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm">清除浏览器缓存后重新加载</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm">尝试骂一下接口提供方（当然这并不能从根本上解决问题）</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}