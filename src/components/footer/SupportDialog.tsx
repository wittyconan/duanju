import { Wrench } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { FOOTER_CONFIG } from '@/config/footer';
import type { DialogProps } from './types';

export function SupportDialog({ open, onOpenChange }: DialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader className="text-center pb-4">
          <div className="mx-auto mb-4 w-16 h-16 bg-teal-100 dark:bg-teal-900/20 rounded-full flex items-center justify-center">
            <Wrench className="w-8 h-8 text-teal-600" />
          </div>
          <DialogTitle className="text-2xl font-bold">技术支持</DialogTitle>
          <DialogDescription className="text-base mt-2">
            遇到技术问题？我们来帮您解决
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/20 dark:to-emerald-950/20 p-6 rounded-lg border">
            <h5 className="font-semibold text-lg mb-4 flex items-center text-teal-700 dark:text-teal-400">
              <Wrench className="w-5 h-5 mr-2" />
              常见技术问题
            </h5>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-muted-foreground">视频无法播放 - 检查网络连接和浏览器设置</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-muted-foreground">页面加载缓慢 - 尝试刷新页面或清除缓存</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-muted-foreground">音频问题 - 检查设备音量和浏览器音频权限</span>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-950/20 p-5 rounded-lg border border-blue-200 dark:border-blue-800">
              <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-3">浏览器兼容性</h5>
              <p className="text-sm text-muted-foreground leading-relaxed">
                建议使用最新版本的{FOOTER_CONFIG.system.recommendedBrowsers.join('、')}浏览器以获得最佳体验。避免使用过时的浏览器版本。
              </p>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-950/20 p-5 rounded-lg border border-indigo-200 dark:border-indigo-800">
              <h5 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-3">系统要求</h5>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span className="text-muted-foreground">稳定的网络连接（建议{FOOTER_CONFIG.system.minNetworkSpeed}以上）</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span className="text-muted-foreground">支持HTML5的现代浏览器</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span className="text-muted-foreground">启用JavaScript和Cookie</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}