"use client"

import { useState } from 'react';
import { Copy, Check, Users, Shield, Phone, BookOpen, MessageCircle, Wrench, Info, HelpCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

// 页面级配置参数
const CONFIG = {
  // 联系信息
  contact: {
    email: 'feedback@snapdrama.com',
    phone: '400-123-4567',
    workingHours: '工作日 9:00-18:00',
  },
  
  // 公司信息
  company: {
    name: '瞬剧',
    logoPath: '/snapdrama-icon.svg',
    description: '专注于提供优质的短剧观看体验，让每一分钟都精彩。',
    year: new Date().getFullYear(),
  },
  
  // 系统配置
  system: {
    copyTimeout: 2000,
    minNetworkSpeed: '10Mbps',
    recommendedBrowsers: ['Chrome', 'Safari', 'Firefox', 'Edge'],
  },
};

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
      await navigator.clipboard.writeText(CONFIG.contact.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), CONFIG.system.copyTimeout);
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
                src={CONFIG.company.logoPath} 
                alt={CONFIG.company.name} 
                className="h-6 w-6 dark:opacity-80 dark:brightness-90 pointer-events-none"
                draggable="false"
              />
              <h3 className="font-bold text-lg">{CONFIG.company.name}</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {CONFIG.company.description}
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
          <p>© {CONFIG.company.year} {CONFIG.company.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>

      {/* 关于我们弹窗 */}
      <Dialog open={aboutUsOpen} onOpenChange={setAboutUsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader className="text-center pb-4">
            <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <DialogTitle className="text-2xl font-bold">关于我们</DialogTitle>
            <DialogDescription className="text-base mt-2">
              了解瞬剧平台的理念与愿景
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-6 rounded-lg border">
              <h4 className="font-semibold text-lg mb-3 flex items-center">
                <Info className="w-5 h-5 mr-2 text-blue-600" />
                平台介绍
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                瞬剧是一个专注于短剧内容的观看平台，致力于为用户提供高质量、精彩纷呈的短剧体验。
                我们深知时间的珍贵，因此精心打造每一分钟的观看体验。
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h5 className="font-semibold mb-2 text-green-700 dark:text-green-400">我们的使命</h5>
                <p className="text-sm text-muted-foreground">
                  让每一分钟的观看时间都充满价值，通过精心筛选的内容和优化的观看体验，为用户带来最佳的娱乐享受。
                </p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h5 className="font-semibold mb-2 text-purple-700 dark:text-purple-400">内容特色</h5>
                <p className="text-sm text-muted-foreground">
                  平台汇聚了各类优质短剧作品，涵盖言情、悬疑、喜剧、都市等多个题材，满足不同用户的观看需求。
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 常见问题弹窗 */}
      <Dialog open={faqOpen} onOpenChange={setFaqOpen}>
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

      {/* 用户协议弹窗 */}
      <Dialog open={userAgreementOpen} onOpenChange={setUserAgreementOpen}>
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

      {/* 隐私政策弹窗 */}
      <Dialog open={privacyPolicyOpen} onOpenChange={setPrivacyPolicyOpen}>
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

      {/* 联系我们弹窗 */}
      <Dialog open={contactUsOpen} onOpenChange={setContactUsOpen}>
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
                <p className="text-sm text-muted-foreground font-mono">{CONFIG.contact.phone}</p>
                <p className="text-xs text-muted-foreground">{CONFIG.contact.workingHours}</p>
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

      {/* 使用说明弹窗 */}
      <Dialog open={userGuideOpen} onOpenChange={setUserGuideOpen}>
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

      {/* 意见反馈弹窗 */}
      <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
        <DialogContent className="max-w-2xl">
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
                  {CONFIG.contact.email}
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

      {/* 技术支持弹窗 */}
      <Dialog open={supportOpen} onOpenChange={setSupportOpen}>
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
                  建议使用最新版本的{CONFIG.system.recommendedBrowsers.join('、')}浏览器以获得最佳体验。避免使用过时的浏览器版本。
                </p>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-950/20 p-5 rounded-lg border border-indigo-200 dark:border-indigo-800">
                <h5 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-3">系统要求</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span className="text-muted-foreground">稳定的网络连接（建议{CONFIG.system.minNetworkSpeed}以上）</span>
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
    </>
  );
}