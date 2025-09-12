import { useState } from 'react';
import { MessageCircle, Copy, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useGlassEffect, getGlassOverlayClass } from '@/contexts/GlassEffectContext';
import { FOOTER_CONFIG } from '@/config/footer';
import type { DialogProps } from './types';

export function FeedbackDialog({ open, onOpenChange }: DialogProps) {
  const { effectType } = useGlassEffect();
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(FOOTER_CONFIG.contact.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), FOOTER_CONFIG.system.copyTimeout);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={getGlassOverlayClass("max-w-2xl", effectType)}>
        <DialogHeader className="text-center pb-4">
          <div className="mx-auto mb-4 w-16 h-16 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <DialogTitle className="text-2xl font-bold">意见反馈</DialogTitle>
          <DialogDescription className="text-base mt-2">
            您的意见对我们很重要
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 p-6 rounded-lg border">
            <h5 className="font-semibold text-lg mb-3 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2 text-emerald-600" />
              反馈渠道
            </h5>
            <p className="text-muted-foreground mb-3">
              请将您的意见和建议发送至：
            </p>
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border">
              <p className="font-mono bg-muted px-3 py-2 rounded text-sm flex-1">
                {FOOTER_CONFIG.contact.email}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={copyEmail}
                className="h-9 px-4 text-sm"
              >
                {emailCopied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                {emailCopied ? '已复制' : '复制'}
              </Button>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h5 className="font-semibold mb-3 text-blue-700 dark:text-blue-400">反馈内容</h5>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-muted-foreground">功能改进建议</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-muted-foreground">使用体验反馈</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-muted-foreground">内容质量评价</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-muted-foreground">技术问题报告</span>
                </div>
              </div>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
              <h5 className="font-semibold mb-2 text-amber-700 dark:text-amber-400">温馨提示</h5>
              <p className="text-xs text-muted-foreground leading-relaxed">
                我们会认真对待每一份反馈，并持续改进产品体验。您的建议是我们前进的动力！
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}