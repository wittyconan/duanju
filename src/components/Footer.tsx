"use client"

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export function Footer() {
  const [aboutUsOpen, setAboutUsOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);
  return (
    <>
    <footer className="bg-muted/50 border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4 cursor-pointer select-none">
              <img 
                src="/snapdrama-icon.svg" 
                alt="瞬剧" 
                className="h-6 w-6 dark:opacity-80 dark:brightness-90 pointer-events-none"
                draggable="false"
              />
              <h3 className="font-bold text-lg">瞬剧</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              专注于提供优质的短剧观看体验，让每一分钟都精彩。
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">关于</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li 
                className="cursor-pointer hover:text-foreground transition-colors"
                onClick={() => setAboutUsOpen(true)}
              >
                关于我们
              </li>
              <li className="cursor-pointer hover:text-foreground transition-colors">用户协议</li>
              <li className="cursor-pointer hover:text-foreground transition-colors">隐私政策</li>
              <li className="cursor-pointer hover:text-foreground transition-colors">联系我们</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">帮助</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="cursor-pointer hover:text-foreground transition-colors">使用说明</li>
              <li 
                className="cursor-pointer hover:text-foreground transition-colors"
                onClick={() => setFaqOpen(true)}
              >
                常见问题
              </li>
              <li className="cursor-pointer hover:text-foreground transition-colors">意见反馈</li>
              <li className="cursor-pointer hover:text-foreground transition-colors">技术支持</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} 瞬剧. All rights reserved.</p>
        </div>
      </div>
    </footer>

      {/* 关于我们弹窗 */}
      <Dialog open={aboutUsOpen} onOpenChange={setAboutUsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>关于我们</DialogTitle>
            <DialogDescription>
              了解瞬剧平台的理念与愿景
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <p>
              瞬剧是一个专注于短剧内容的观看平台，致力于为用户提供高质量、精彩纷呈的短剧体验。
            </p>
            <p>
              我们的使命是让每一分钟的观看时间都充满价值，通过精心筛选的内容和优化的观看体验，
              为用户带来最佳的娱乐享受。
            </p>
            <p>
              平台汇聚了各类优质短剧作品，涵盖言情、悬疑、喜剧、都市等多个题材，
              满足不同用户的观看需求。
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* 常见问题弹窗 */}
      <Dialog open={faqOpen} onOpenChange={setFaqOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>常见问题</DialogTitle>
            <DialogDescription>
              关于视频播放的常见问题解答
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 text-sm">
            <div>
              <h5 className="font-semibold mb-2">Q: 为什么有些视频无法播放？</h5>
              <p className="text-muted-foreground">
                A: 可能是由于以下原因：
              </p>
              <ul className="list-disc list-inside mt-1 space-y-1 text-muted-foreground ml-4">
                <li>网络连接不稳定，请检查网络状态</li>
                <li>视频源暂时不可用，请稍后重试</li>
                <li>浏览器兼容性问题，建议使用最新版本的Chrome或Safari</li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-2">Q: 关于跨域播放问题</h5>
              <p className="text-muted-foreground">
                A: 我们的播放器已针对跨域播放进行了优化：
              </p>
              <ul className="list-disc list-inside mt-1 space-y-1 text-muted-foreground ml-4">
                <li>自动设置crossOrigin属性处理CORS问题</li>
                <li>对夸克网盘等第三方链接设置了no-referrer策略</li>
                <li>如仍有播放问题，可能是视频源设置了防盗链保护</li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-2">Q: 视频加载很慢怎么办？</h5>
              <p className="text-muted-foreground">
                A: 建议尝试以下方法：
              </p>
              <ul className="list-disc list-inside mt-1 space-y-1 text-muted-foreground ml-4">
                <li>切换到更稳定的网络环境</li>
                <li>清除浏览器缓存后重新加载</li>
                <li>尝试其他清晰度选项（如有提供）</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}