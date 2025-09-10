# 瞬剧 (SnapDrama)

一个现代化的在线视频播放平台，提供流畅的视频观看体验。基于 React + TypeScript + Vite 构建，采用响应式设计，支持多集剧集播放和智能搜索。

## ✨ 特性

- 🎬 **视频播放**: 支持在线视频播放，自定义播放器控制
- 📱 **响应式设计**: 适配桌面端和移动端
- 🔍 **智能搜索**: 实时搜索视频内容
- 📂 **分类浏览**: 按类型浏览视频内容
- 🎯 **个性推荐**: 智能推荐相关视频
- 📺 **多集播放**: 支持连续剧集播放，选集功能
- ⚡ **性能优化**: API 缓存机制，快速加载
- 🎨 **现代UI**: 基于 shadcn/ui 组件库的精美界面

## 🛠️ 技术栈

- **前端框架**: React 19 + TypeScript
- **构建工具**: Vite 7
- **路由管理**: React Router DOM
- **UI组件库**: shadcn/ui + Radix UI
- **样式框架**: Tailwind CSS 4
- **图标库**: Lucide React
- **视频播放**: React Player
- **状态管理**: React Hooks
- **开发工具**: ESLint + TypeScript ESLint

## 📦 安装

确保您已安装 [Node.js](https://nodejs.org/) (推荐版本 18+) 和 [pnpm](https://pnpm.io/)。

```bash
# 克隆项目
git clone <repository-url>
cd reel-drama

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

## 🚀 开发

```bash
# 开发模式
pnpm dev

# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview

# 代码检查
pnpm lint
```

## 📁 项目结构

```
src/
├── components/           # React 组件
│   ├── ui/              # shadcn/ui 基础组件
│   ├── HomePage.tsx     # 首页组件
│   ├── VideoPlayPage.tsx # 视频播放页
│   ├── Header.tsx       # 头部导航
│   ├── CategoryNav.tsx  # 分类导航
│   ├── VideoCard.tsx    # 视频卡片
│   ├── SearchBar.tsx    # 搜索栏
│   ├── CustomVideoPlayer.tsx # 自定义播放器
│   └── VideoDetailModal.tsx  # 视频详情弹窗
├── services/            # API 服务
│   └── api.ts          # API 接口封装
├── types/              # TypeScript 类型定义
│   └── index.ts        # 类型声明
├── lib/                # 工具函数
├── assets/             # 静态资源
├── App.tsx             # 主应用组件
├── main.tsx            # 应用入口
└── index.css           # 全局样式
```

## 🎯 主要功能

### 🏠 首页
- 推荐视频展示
- 分类导航
- 搜索功能
- 响应式网格布局

### 🎬 视频播放
- 自定义视频播放器
- 多集选择
- 视频详情展示
- 播放错误处理
- 下载功能

### 🔍 搜索与分类
- 实时搜索
- 按分类筛选
- 智能推荐算法

### 📱 用户体验
- 加载状态提示
- 错误处理机制
- 移动端优化
- 流畅的页面切换

## 🔧 API 接口

项目使用 RESTful API，主要接口包括：

- `GET /vod/categories` - 获取视频分类
- `GET /vod/recommend` - 获取推荐视频
- `GET /vod/list` - 获取分类视频列表
- `GET /vod/search` - 搜索视频
- `GET /vod/parse/single` - 获取视频播放链接

## 🎨 UI 设计

- 采用现代化的卡片式布局
- 支持深色/浅色主题切换
- 流畅的动画过渡效果
- 移动端优先的响应式设计

## 📄 许可证

本项目仅供学习和研究使用。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来帮助改进项目。

---

⭐ 如果这个项目对您有帮助，请给它一个星星！