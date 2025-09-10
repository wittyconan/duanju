import { Phone, MessageCircle, Users, Copy, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FOOTER_CONFIG } from '@/config/footer';
import type { ContactDialogProps } from './types';

export function ContactDialog({ open, onOpenChange, emailCopied, copyEmail }: ContactDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader className="text-center pb-4">
          <div className="mx-auto mb-4 w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
            <Phone className="w-8 h-8 text-orange-600" />
          </div>
          <DialogTitle className="text-2xl font-bold">联系我们</DialogTitle>
          <DialogDescription className="text-base mt-2">
            与我们取得联系
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 p-6 rounded-lg border flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-1">客服热线</h5>
              <p className="text-sm text-muted-foreground font-mono">{FOOTER_CONFIG.contact.phone}</p>
              <p className="text-xs text-muted-foreground">{FOOTER_CONFIG.contact.workingHours}</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 p-6 rounded-lg border flex items-center gap-4">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h5 className="font-semibold text-green-700 dark:text-green-400 mb-1">在线客服</h5>
              <p className="text-sm text-muted-foreground">平台内置客服系统</p>
              <p className="text-xs text-muted-foreground">实时响应</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 p-6 rounded-lg border flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h5 className="font-semibold text-purple-700 dark:text-purple-400 mb-1">商务合作</h5>
              <p className="text-sm text-muted-foreground">官方渠道联系</p>
              <p className="text-xs text-muted-foreground">合作咨询</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}