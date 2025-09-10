import { Shield } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import type { DialogProps } from './types';

export function PrivacyPolicyDialog({ open, onOpenChange }: DialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader className="text-center pb-4">
          <div className="mx-auto mb-4 w-16 h-16 bg-rose-100 dark:bg-rose-900/20 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-rose-600" />
          </div>
          <DialogTitle className="text-2xl font-bold">隐私政策</DialogTitle>
          <DialogDescription className="text-base mt-2">
            我们如何保护您的个人信息
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20 p-6 rounded-lg border">
            <h5 className="font-semibold text-lg mb-4 flex items-center text-rose-700 dark:text-rose-400">
              <Shield className="w-5 h-5 mr-2" />
              信息收集
            </h5>
            <p className="text-muted-foreground leading-relaxed">
              我们仅收集必要的用户信息以提供更好的服务体验，包括观看记录、偏好设置等。
              我们承诺不会收集与服务无关的个人隐私信息。
            </p>
          </div>
          <div className="bg-muted/50 p-5 rounded-lg">
            <h5 className="font-semibold text-lg mb-4 text-slate-700 dark:text-slate-400">信息保护</h5>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-muted-foreground">采用行业标准的加密技术保护数据安全</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-muted-foreground">不会向第三方出售或分享您的个人信息</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-muted-foreground">定期更新安全措施，确保数据安全</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}