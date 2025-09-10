"use client"

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function Footer() {
  const [aboutUsOpen, setAboutUsOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);
  const [userAgreementOpen, setUserAgreementOpen] = useState(false);
  const [privacyPolicyOpen, setPrivacyPolicyOpen] = useState(false);
  const [contactUsOpen, setContactUsOpen] = useState(false);
  const [userGuideOpen, setUserGuideOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('feedback@snapdrama.com');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };
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
              <li 
                className="cursor-pointer hover:text-foreground transition-colors"
                onClick={() => setUserAgreementOpen(true)}
              >
                用户协议
              </li>
              <li 
                className="cursor-pointer hover:text-foreground transition-colors"
                onClick={() => setPrivacyPolicyOpen(true)}
              >
                隐私政策
              </li>
              <li 
                className="cursor-pointer hover:text-foreground transition-colors"
                onClick={() => setContactUsOpen(true)}
              >
                联系我们
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">帮助</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li 
                className="cursor-pointer hover:text-foreground transition-colors"
                onClick={() => setUserGuideOpen(true)}
              >
                使用说明
              </li>
              <li 
                className="cursor-pointer hover:text-foreground transition-colors"
                onClick={() => setFaqOpen(true)}
              >
                常见问题
              </li>
              <li 
                className="cursor-pointer hover:text-foreground transition-colors"
                onClick={() => setFeedbackOpen(true)}
              >
                意见反馈
              </li>
              <li 
                className="cursor-pointer hover:text-foreground transition-colors"
                onClick={() => setSupportOpen(true)}
              >
                技术支持
              </li>
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
                <li>尝试骂一下接口提供方（当然这并不能从根本上解决问题）</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 用户协议弹窗 */}
      <Dialog open={userAgreementOpen} onOpenChange={setUserAgreementOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>用户协议</DialogTitle>
            <DialogDescription>
              瞬剧平台用户服务协议
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <div>
              <h5 className="font-semibold mb-2">服务条款</h5>
              <p className="text-muted-foreground">
                使用本平台服务即表示您同意遵守相关服务条款。请合法使用平台提供的内容，尊重知识产权，不得进行违法违规操作。
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-2">用户责任</h5>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>确保账户信息的真实性和安全性</li>
                <li>不得传播有害、违法或不当内容</li>
                <li>遵守平台使用规范和社区准则</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 隐私政策弹窗 */}
      <Dialog open={privacyPolicyOpen} onOpenChange={setPrivacyPolicyOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>隐私政策</DialogTitle>
            <DialogDescription>
              我们如何保护您的个人信息
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <div>
              <h5 className="font-semibold mb-2">信息收集</h5>
              <p className="text-muted-foreground">
                我们仅收集必要的用户信息以提供更好的服务体验，包括观看记录、偏好设置等。
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-2">信息保护</h5>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>采用行业标准的加密技术保护数据安全</li>
                <li>不会向第三方出售或分享您的个人信息</li>
                <li>定期更新安全措施，确保数据安全</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 联系我们弹窗 */}
      <Dialog open={contactUsOpen} onOpenChange={setContactUsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>联系我们</DialogTitle>
            <DialogDescription>
              与我们取得联系
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <div>
              <h5 className="font-semibold mb-2">客服热线</h5>
              <p className="text-muted-foreground">
                400-123-4567 (工作日 9:00-18:00)
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-2">在线客服</h5>
              <p className="text-muted-foreground">
                工作时间内可通过平台内置客服系统联系我们
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-2">商务合作</h5>
              <p className="text-muted-foreground">
                如有合作意向，请通过官方渠道与我们联系
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 使用说明弹窗 */}
      <Dialog open={userGuideOpen} onOpenChange={setUserGuideOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>使用说明</DialogTitle>
            <DialogDescription>
              如何更好地使用瞬剧平台
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <div>
              <h5 className="font-semibold mb-2">观看视频</h5>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>点击视频封面即可开始播放</li>
                <li>支持全屏观看，双击视频可切换全屏模式</li>
                <li>可通过进度条快速跳转到指定时间点</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-2">搜索功能</h5>
              <p className="text-muted-foreground">
                使用顶部搜索框可快速找到您感兴趣的短剧内容
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-2">分类浏览</h5>
              <p className="text-muted-foreground">
                通过分类标签浏览不同题材的短剧作品
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 意见反馈弹窗 */}
      <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>意见反馈</DialogTitle>
            <DialogDescription>
              您的意见对我们很重要
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <div>
              <h5 className="font-semibold mb-2">反馈渠道</h5>
              <p className="text-muted-foreground mb-2">
                请将您的意见和建议发送至：
              </p>
              <div className="flex items-center gap-2">
                <p className="font-mono bg-muted px-2 py-1 rounded text-xs">
                  feedback@snapdrama.com
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyEmail}
                  className="h-7 w-16 text-xs"
                >
                  {emailCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </Button>
              </div>
            </div>
            <div>
              <h5 className="font-semibold mb-2">反馈内容</h5>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>功能改进建议</li>
                <li>使用体验反馈</li>
                <li>内容质量评价</li>
                <li>技术问题报告</li>
              </ul>
            </div>
            <p className="text-xs text-muted-foreground">
              我们会认真对待每一份反馈，并持续改进产品体验。
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* 技术支持弹窗 */}
      <Dialog open={supportOpen} onOpenChange={setSupportOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>技术支持</DialogTitle>
            <DialogDescription>
              遇到技术问题？我们来帮您解决
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <div>
              <h5 className="font-semibold mb-2">常见技术问题</h5>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>视频无法播放 - 检查网络连接和浏览器设置</li>
                <li>页面加载缓慢 - 尝试刷新页面或清除缓存</li>
                <li>音频问题 - 检查设备音量和浏览器音频权限</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-2">浏览器兼容性</h5>
              <p className="text-muted-foreground">
                建议使用最新版本的Chrome、Safari、Firefox或Edge浏览器以获得最佳体验。
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-2">系统要求</h5>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>稳定的网络连接（建议10Mbps以上）</li>
                <li>支持HTML5的现代浏览器</li>
                <li>启用JavaScript和Cookie</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}