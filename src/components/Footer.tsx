export function Footer() {
  return (
    <footer className="bg-muted/50 border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/snapdrama-icon.svg" 
                alt="瞬剧" 
                className="h-6 w-6 dark:opacity-80 dark:brightness-90"
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
              <li>关于我们</li>
              <li>用户协议</li>
              <li>隐私政策</li>
              <li>联系我们</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">帮助</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>使用说明</li>
              <li>常见问题</li>
              <li>意见反馈</li>
              <li>技术支持</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>© 2025 瞬剧. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}