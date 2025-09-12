import { HelpCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useGlassEffect, getGlassOverlayClass, getGlassClass } from '@/contexts/GlassEffectContext';
import type { DialogProps } from './types';

export function FaqDialog({ open, onOpenChange }: DialogProps) {
  const { effectType } = useGlassEffect();
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className={getGlassOverlayClass("flex flex-col", effectType)}
        style={{ width: '55vw', maxWidth: '800px', height: 'auto', maxHeight: '85vh' }}
      >
        <DialogHeader className="text-center pb-4 flex-shrink-0">
          <div className="mx-auto mb-4 w-16 h-16 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center">
            <HelpCircle className="w-8 h-8 text-amber-600" />
          </div>
          <DialogTitle className="text-2xl font-bold">常见问题</DialogTitle>
          <DialogDescription className="text-base mt-2">
            关于视频播放的常见问题解答
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 overflow-y-auto px-4">
          {/* FAQ 1 */}
          <div className={getGlassClass("rounded-xl p-6 transition-all duration-300 hover:shadow-lg border border-red-500/30", effectType)}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              </div>
              <div className="flex-1">
                <h5 className="font-bold text-lg mb-3 text-red-600 dark:text-red-400">为什么有些视频无法播放？</h5>
                <p className="text-foreground/90 mb-4 font-medium">可能是由于以下原因：</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 py-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm font-medium text-foreground/80">网络连接不稳定，请检查网络状态</span>
                  </div>
                  <div className="flex items-start gap-3 py-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm font-medium text-foreground/80">视频源暂时不可用，请稍后重试</span>
                  </div>
                  <div className="flex items-start gap-3 py-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm font-medium text-foreground/80">浏览器兼容性问题，建议使用最新版本的Chrome或Safari</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ 2 */}
          <div className={getGlassClass("rounded-xl p-6 transition-all duration-300 hover:shadow-lg border border-blue-500/30", effectType)}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              </div>
              <div className="flex-1">
                <h5 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">关于跨域播放问题</h5>
                <p className="text-foreground/90 mb-4 font-medium">我们的播放器已针对跨域播放进行了优化：</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 py-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm font-medium text-foreground/80">自动设置crossOrigin属性处理CORS问题</span>
                  </div>
                  <div className="flex items-start gap-3 py-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm font-medium text-foreground/80">对夸克网盘等第三方链接设置了no-referrer策略</span>
                  </div>
                  <div className="flex items-start gap-3 py-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm font-medium text-foreground/80">如仍有播放问题，可能是视频源设置了防盗链保护</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ 3 */}
          <div className={getGlassClass("rounded-xl p-6 transition-all duration-300 hover:shadow-lg border border-green-500/30", effectType)}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex-1">
                <h5 className="font-bold text-lg mb-3 text-green-600 dark:text-green-400">视频加载很慢怎么办？</h5>
                <p className="text-foreground/90 mb-4 font-medium">建议尝试以下方法：</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 py-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm font-medium text-foreground/80">切换到更稳定的网络环境</span>
                  </div>
                  <div className="flex items-start gap-3 py-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm font-medium text-foreground/80">清除浏览器缓存后重新加载</span>
                  </div>
                  <div className="flex items-start gap-3 py-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm font-medium text-foreground/80">尝试骂一下接口提供方（当然这并不能从根本上解决问题）</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}