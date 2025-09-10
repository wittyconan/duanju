import { Shield } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import type { DialogProps } from './types';

export function UserAgreementDialog({ open, onOpenChange }: DialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader className="text-center pb-4">
          <div className="mx-auto mb-4 w-16 h-16 bg-cyan-100 dark:bg-cyan-900/20 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-cyan-600" />
          </div>
          <DialogTitle className="text-2xl font-bold">用户协议</DialogTitle>
          <DialogDescription className="text-base mt-2">
            瞬剧平台用户服务协议
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 p-6 rounded-lg border">
            <h5 className="font-semibold text-lg mb-4 flex items-center text-cyan-700 dark:text-cyan-400">
              <Shield className="w-5 h-5 mr-2" />
              服务条款
            </h5>
            <p className="text-muted-foreground leading-relaxed">
              使用本平台服务即表示您同意遵守相关服务条款。请合法使用平台提供的内容，尊重知识产权，不得进行违法违规操作。
              我们致力于为用户提供安全、可靠的视频服务体验。
            </p>
          </div>
          <div className="bg-muted/50 p-5 rounded-lg">
            <h5 className="font-semibold text-lg mb-4 text-slate-700 dark:text-slate-400">用户责任</h5>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-muted-foreground">确保账户信息的真实性和安全性</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-muted-foreground">不得传播有害、违法或不当内容</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-muted-foreground">遵守平台使用规范和社区准则</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}