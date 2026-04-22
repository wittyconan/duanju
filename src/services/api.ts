import type { CategoriesResponse, VideoItem } from '@/types';

// 可用的视频数据源列表
const VIDEO_SOURCES = [
  { id: 'niuniu', name: '牛牛|点播', api: 'https://api.niuniuzy.me/api.php/provide/vod/' },
  { id: 'yaya', name: '丫丫|点播', api: 'https://cj.yayazy.net/api.php/provide/vod/' },
  { id: 'haohua', name: '豪华|点播', api: 'https://hhzyapi.com/api.php/provide/vod' },
  { id: 'jisu', name: '极速|点播', api: 'https://jszyapi.com/api.php/provide/vod' },
  { id: 'suoni', name: '索尼|点播', api: 'https://suoniapi.com/api.php/provide/vod/' },
  { id: 'liangzi2', name: '量子|点播', api: 'https://cj.lziapi.com/api.php/provide/vod/' },
  { id: 'baofeng', name: '暴风|点播', api: 'https://bfzyapi.com/api.php/provide/vod/' },
  { id: 'hongniu2', name: '红牛|点播', api: 'https://www.hongniuzy2.com/api.php/provide/vod/' },
  { id: 'yinghua2', name: '樱花|点播', api: 'https://m3u8.apiyhzy.com/api.php/provide/vod/' },
  { id: 'wolong2', name: '卧龙|点播', api: 'https://collect.wolongzyw.com/api.php/provide/vod/' },
  { id: 'huya', name: '虎牙|点播', api: 'https://www.huyaapi.com/api.php/provide/vod/' },
  { id: 'baidu2', name: '百度|点播', api: 'https://api.apibdzy.com/api.php/provide/vod/' },
  { id: 'piaoling', name: '飘零|点播', api: 'https://p2100.net/api.php/provide/vod/' },
  { id: 'wujin', name: '无尽|点播', api: 'https://api.wujinapi.com/api.php/provide/vod/' },
  { id: 'subo', name: '速博|点播', api: 'https://subocaiji.com/api.php/provide/vod/' },
  { id: 'modu', name: '魔都|点播', api: 'https://caiji.moduapi.cc/api.php/provide/vod/' },
  { id: 'haohua2', name: '火狐|点播', api: 'https://hhzyapi.com/api.php/provide/vod/' },
  { id: 'xinlang', name: '新浪|点播', api: 'https://api.xinlangapi.com/xinlangapi.php/provide/vod/' }
];

// 默认使用第一个数据源
let currentSource = VIDEO_SOURCES[0];

// 使用当前数据源的API地址
let BASE_URL = currentSource.api;

interface PlayResponse {
  videoId: number;
  videoName: string;
  episode: {
    index: number;
    label: string;
    parsedUrl: string;
    proxyUrl: string;
    parseInfo: {
      headers: Record<string, string>;
      type: string;
    };
  };
  totalEpisodes: number;
  cover: string;
  description: string;
}

class ApiService {
  private cache = new Map<string, { data: unknown; timestamp: number }>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存

  // 获取所有可用的数据源
  getAvailableSources() {
    return VIDEO_SOURCES;
  }

  // 切换数据源
  switchSource(sourceId: string) {
    const source = VIDEO_SOURCES.find(s => s.id === sourceId);
    if (source) {
      currentSource = source;
      BASE_URL = source.api;
      this.cache.clear(); // 切换数据源后清空缓存
      return true;
    }
    return false;
  }

  // 获取当前数据源
  getCurrentSource() {
    return currentSource;
  }

  private getCacheKey(endpoint: string): string {
    return endpoint;
  }

  private isCacheValid(timestamp: number): boolean {
    return Date.now() - timestamp < this.CACHE_DURATION;
  }

  private async request<T>(endpoint: string, useCache: boolean = true): Promise<T> {
    const cacheKey = this.getCacheKey(endpoint);
    
    // 检查缓存
    if (useCache && this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey)!;
      if (this.isCacheValid(cached.timestamp)) {
        return cached.data as T;
      }
    }

    // 对于不同的数据源，可能需要添加不同的参数
    let url = `${BASE_URL}`;
    if (endpoint) {
      // 检查是否已经有查询参数
      if (url.includes('?')) {
        url += `&${endpoint}`;
      } else {
        url += `?${endpoint}`;
      }
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // 存储到缓存
    if (useCache) {
      this.cache.set(cacheKey, { data, timestamp: Date.now() });
    }
    
    return data;
  }



  async getCategories(): Promise<CategoriesResponse> {
    try {
      // 尝试获取分类列表
      const response = await this.request<any>('ac=type');
      
      // 检查响应格式
      let categories = [];
      
      if (response && response.list) {
        // 格式1: { list: [{ id: 1, name: '电影' }, ...] }
        categories = response.list.map((item: any) => ({
          type_id: item.id || item.type_id || 0,
          type_name: item.name || item.type_name || ''
        }));
      } else if (response && response.data) {
        // 格式2: { data: { list: [{ id: 1, name: '电影' }, ...] } }
        categories = response.data.list.map((item: any) => ({
          type_id: item.id || item.type_id || 0,
          type_name: item.name || item.type_name || ''
        }));
      }
      
      // 确保包含短剧分类
      const hasShortDramaCategory = categories.some((cat: { type_name: string }) => 
        cat.type_name.includes('短剧') || cat.type_name.includes('Short Drama')
      );
      
      if (!hasShortDramaCategory) {
        categories.push({ type_id: 6, type_name: '短剧' });
      }
      
      return {
        categories,
        total: categories.length
      };
    } catch (error) {
      console.error('Failed to get categories:', error);
      // 返回默认分类，包含短剧
      return {
        categories: [
          { type_id: 1, type_name: '电影' },
          { type_id: 2, type_name: '电视剧' },
          { type_id: 3, type_name: '综艺' },
          { type_id: 4, type_name: '动漫' },
          { type_id: 5, type_name: '纪录片' },
          { type_id: 6, type_name: '短剧' }
        ],
        total: 6
      };
    }
  }

  // 获取本地模拟视频数据
  private getMockVideos(): VideoItem[] {
    return [
      {
        id: 1,
        name: '流浪地球3',
        pic: 'https://picsum.photos/300/450',
        score: 9.5,
        remarks: '2025年科幻大片',
        year: 2025,
        area: '中国大陆',
        actor: '吴京, 刘德华, 李雪健',
        director: '郭帆',
        content: '太阳即将膨胀为红巨星，人类必须寻找新的家园'
      },
      {
        id: 2,
        name: '复仇者联盟6',
        pic: 'https://picsum.photos/301/450',
        score: 9.0,
        remarks: '漫威宇宙最终章',
        year: 2025,
        area: '美国',
        actor: '小罗伯特·唐尼, 克里斯·埃文斯, 斯嘉丽·约翰逊',
        director: '乔·罗素',
        content: '复仇者联盟与多元宇宙的最终对决'
      },
      {
        id: 3,
        name: '三体',
        pic: 'https://picsum.photos/302/450',
        score: 9.2,
        remarks: '刘慈欣科幻巨作',
        year: 2024,
        area: '中国大陆',
        actor: '张鲁一, 于和伟, 陈瑾',
        director: '杨磊',
        content: '地球文明与三体文明的碰撞'
      },
      {
        id: 4,
        name: '狂飙',
        pic: 'https://picsum.photos/303/450',
        score: 8.8,
        remarks: '2023年现象级反腐剧',
        year: 2023,
        area: '中国大陆',
        actor: '张译, 张颂文, 李一桐',
        director: '徐纪周',
        content: '警察与黑恶势力的生死较量'
      },
      {
        id: 5,
        name: '长安三万里',
        pic: 'https://picsum.photos/304/450',
        score: 8.6,
        remarks: '国产动画佳作',
        year: 2023,
        area: '中国大陆',
        actor: '杨天翔, 凌振赫, 吴俊全',
        director: '谢君伟, 邹靖',
        content: '盛唐诗人李白与高适的传奇人生'
      },
      {
        id: 6,
        name: '孤注一掷',
        pic: 'https://picsum.photos/305/450',
        score: 8.7,
        remarks: '反诈题材电影',
        year: 2023,
        area: '中国大陆',
        actor: '张艺兴, 金晨, 王传君',
        director: '申奥',
        content: '讲述境外网络诈骗的黑暗内幕'
      },
      // 短剧内容
      {
        id: 7,
        name: '我的霸道总裁',
        pic: 'https://picsum.photos/306/450',
        score: 8.5,
        remarks: '都市爱情短剧',
        year: 2025,
        area: '中国大陆',
        actor: '赵丽颖, 王一博',
        director: '张艺谋',
        content: '一个普通女孩与霸道总裁的浪漫故事'
      },
      {
        id: 8,
        name: '穿越古代当皇后',
        pic: 'https://picsum.photos/307/450',
        score: 8.3,
        remarks: '穿越古装短剧',
        year: 2025,
        area: '中国大陆',
        actor: '迪丽热巴, 肖战',
        director: '冯小刚',
        content: '现代女孩穿越到古代成为皇后的故事'
      },
      {
        id: 9,
        name: '职场逆袭记',
        pic: 'https://picsum.photos/308/450',
        score: 8.7,
        remarks: '职场励志短剧',
        year: 2025,
        area: '中国大陆',
        actor: '杨幂, 李易峰',
        director: '陈凯歌',
        content: '普通职场人逆袭成为公司高管的故事'
      }
    ];
  }

  // 获取短剧列表
  async getShortDramaList(page: number = 1): Promise<{ videos: VideoItem[]; pagination: { total: number; totalPages: number; currentPage: number; } }> {
    try {
      // 尝试从API获取短剧数据
      const params = new URLSearchParams({ 
        ac: 'list',
        pg: page.toString(),
        t: '6' // 短剧分类ID
      });
      
      const response = await this.request<any>(params.toString());
      
      // 检查响应格式
      let videos: VideoItem[] = [];
      let total = 0;
      let totalPages = 1;
      
      if (response && response.list) {
        // 过滤出短剧内容
        videos = response.list
          .filter((item: any) => 
            item.name.includes('短剧') || 
            item.vod_name.includes('短剧') ||
            item.remarks.includes('短剧') ||
            item.vod_remarks.includes('短剧')
          )
          .map((item: any) => ({
            id: item.id || item.vod_id || 0,
            name: item.name || item.vod_name || '',
            pic: item.cover || item.vod_pic || `https://picsum.photos/300/450?random=${item.id || item.vod_id}`,
            score: item.score || item.vod_score || 0,
            remarks: item.remarks || item.vod_remarks || '',
            year: item.year || item.vod_year || 1900,
            area: item.area || item.vod_area || '',
            actor: item.actor || item.vod_actor || '',
            director: item.director || item.vod_director || '',
            content: item.content || item.vod_content || ''
          }));
        total = response.total || 0;
        totalPages = response.pagecount || 1;
      } else if (response && response.data) {
        // 过滤出短剧内容
        videos = response.data.list
          .filter((item: any) => 
            item.name.includes('短剧') || 
            item.vod_name.includes('短剧') ||
            item.remarks.includes('短剧') ||
            item.vod_remarks.includes('短剧')
          )
          .map((item: any) => ({
            id: item.id || item.vod_id || 0,
            name: item.name || item.vod_name || '',
            pic: item.cover || item.vod_pic || `https://picsum.photos/300/450?random=${item.id || item.vod_id}`,
            score: item.score || item.vod_score || 0,
            remarks: item.remarks || item.vod_remarks || '',
            year: item.year || item.vod_year || 1900,
            area: item.area || item.vod_area || '',
            actor: item.actor || item.vod_actor || '',
            director: item.director || item.vod_director || '',
            content: item.content || item.vod_content || ''
          }));
        total = response.data.total || 0;
        totalPages = response.data.pagecount || 1;
      }
      
      // 如果API返回了数据，返回API数据，否则使用模拟数据
      if (videos.length > 0) {
        return {
          videos,
          pagination: {
            total,
            totalPages,
            currentPage: page
          }
        };
      } else {
        // 从模拟数据中过滤出短剧
        const mockShortDramas = this.getMockVideos().filter(video => 
          video.remarks && video.remarks.includes('短剧')
        );
        return {
          videos: mockShortDramas,
          pagination: {
            total: mockShortDramas.length,
            totalPages: 1,
            currentPage: 1
          }
        };
      }
    } catch (error) {
      console.error('Failed to get short drama list:', error);
      // API请求失败，使用模拟数据
      const mockShortDramas = this.getMockVideos().filter(video => 
        video.remarks && video.remarks.includes('短剧')
      );
      return {
        videos: mockShortDramas,
        pagination: {
          total: mockShortDramas.length,
          totalPages: 1,
          currentPage: 1
        }
      };
    }
  }

  async getRecommended(): Promise<VideoItem[]> {
    // 不同的数据源可能有不同的API格式
    try {
      // 尝试使用通用的API格式
      const response = await this.request<any>('ac=list&pg=1&t=1&h=0');
      
      // 检查响应格式
      if (response && response.list) {
        // 格式1: { list: [...] }
        const videos = response.list.map((item: any) => ({
          id: item.id || item.vod_id || 0,
          name: item.name || item.vod_name || '',
          pic: item.cover || item.vod_pic || `https://picsum.photos/300/450?random=${item.id || item.vod_id}`,
          score: item.score || item.vod_score || 0,
          remarks: item.remarks || item.vod_remarks || '',
          year: item.year || item.vod_year || 1900,
          area: item.area || item.vod_area || '',
          actor: item.actor || item.vod_actor || '',
          director: item.director || item.vod_director || '',
          content: item.content || item.vod_content || ''
        }));
        // 如果API返回了数据，返回API数据
        return videos.length > 0 ? videos : this.getMockVideos();
      } else if (response && response.data) {
        // 格式2: { data: { list: [...] } }
        const videos = response.data.list.map((item: any) => ({
          id: item.id || item.vod_id || 0,
          name: item.name || item.vod_name || '',
          pic: item.cover || item.vod_pic || `https://picsum.photos/300/450?random=${item.id || item.vod_id}`,
          score: item.score || item.vod_score || 0,
          remarks: item.remarks || item.vod_remarks || '',
          year: item.year || item.vod_year || 1900,
          area: item.area || item.vod_area || '',
          actor: item.actor || item.vod_actor || '',
          director: item.director || item.vod_director || '',
          content: item.content || item.vod_content || ''
        }));
        // 如果API返回了数据，返回API数据
        return videos.length > 0 ? videos : this.getMockVideos();
      } else {
        // API返回格式不正确，使用模拟数据
        console.log('API返回格式不正确，使用模拟数据');
        return this.getMockVideos();
      }
    } catch (error) {
      console.error('Failed to get recommended videos:', error);
      // API请求失败，使用模拟数据
      console.log('API请求失败，使用模拟数据');
      return this.getMockVideos();
    }
  }

  async getVideoList(categoryId?: number, page: number = 1): Promise<{ videos: VideoItem[]; pagination: { total: number; totalPages: number; currentPage: number; } }> {
    try {
      // 构建查询参数
      const params = new URLSearchParams({ 
        ac: 'list',
        pg: page.toString() 
      });
      if (categoryId) {
        params.append('t', categoryId.toString());
      }
      
      const response = await this.request<any>(params.toString());
      
      // 检查响应格式
      let videos: VideoItem[] = [];
      let total = 0;
      let totalPages = 1;
      
      if (response && response.list) {
        // 格式1: { list: [...], page: 1, pagecount: 10, total: 100 }
        videos = response.list.map((item: any) => ({
          id: item.id || item.vod_id || 0,
          name: item.name || item.vod_name || '',
          pic: item.cover || item.vod_pic || `https://picsum.photos/300/450?random=${item.id || item.vod_id}`,
          score: item.score || item.vod_score || 0,
          remarks: item.remarks || item.vod_remarks || '',
          year: item.year || item.vod_year || 1900,
          area: item.area || item.vod_area || '',
          actor: item.actor || item.vod_actor || '',
          director: item.director || item.vod_director || '',
          content: item.content || item.vod_content || ''
        }));
        total = response.total || 0;
        totalPages = response.pagecount || 1;
      } else if (response && response.data) {
        // 格式2: { data: { list: [...], page: 1, pagecount: 10, total: 100 } }
        videos = response.data.list.map((item: any) => ({
          id: item.id || item.vod_id || 0,
          name: item.name || item.vod_name || '',
          pic: item.cover || item.vod_pic || `https://picsum.photos/300/450?random=${item.id || item.vod_id}`,
          score: item.score || item.vod_score || 0,
          remarks: item.remarks || item.vod_remarks || '',
          year: item.year || item.vod_year || 1900,
          area: item.area || item.vod_area || '',
          actor: item.actor || item.vod_actor || '',
          director: item.director || item.vod_director || '',
          content: item.content || item.vod_content || ''
        }));
        total = response.data.total || 0;
        totalPages = response.data.pagecount || 1;
      }
      
      // 如果API返回了数据，返回API数据，否则使用模拟数据
      if (videos.length > 0) {
        return {
          videos,
          pagination: {
            total,
            totalPages,
            currentPage: page
          }
        };
      } else {
        // 使用模拟数据
        console.log('API返回数据为空，使用模拟数据');
        const mockVideos = this.getMockVideos();
        return {
          videos: mockVideos,
          pagination: {
            total: mockVideos.length,
            totalPages: 1,
            currentPage: 1
          }
        };
      }
    } catch (error) {
      console.error('Failed to get video list:', error);
      // API请求失败，使用模拟数据
      console.log('API请求失败，使用模拟数据');
      const mockVideos = this.getMockVideos();
      return {
        videos: mockVideos,
        pagination: {
          total: mockVideos.length,
          totalPages: 1,
          currentPage: 1
        }
      };
    }
  }

  async searchVideos(name: string, page: number = 1): Promise<{ videos: VideoItem[]; pagination: { total: number; totalPages: number; currentPage: number; } }> {
    try {
      // 构建查询参数
      const params = new URLSearchParams({ 
        ac: 'list',
        pg: page.toString(),
        wd: name
      });
      
      const response = await this.request<any>(params.toString());
      
      // 检查响应格式
      let videos: VideoItem[] = [];
      let total = 0;
      let totalPages = 1;
      
      if (response && response.list) {
        // 格式1: { list: [...], page: 1, pagecount: 10, total: 100 }
        videos = response.list.map((item: any) => ({
          id: item.id || item.vod_id || 0,
          name: item.name || item.vod_name || '',
          pic: item.cover || item.vod_pic || `https://picsum.photos/300/450?random=${item.id || item.vod_id}`,
          score: item.score || item.vod_score || 0,
          remarks: item.remarks || item.vod_remarks || '',
          year: item.year || item.vod_year || 1900,
          area: item.area || item.vod_area || '',
          actor: item.actor || item.vod_actor || '',
          director: item.director || item.vod_director || '',
          content: item.content || item.vod_content || ''
        }));
        total = response.total || 0;
        totalPages = response.pagecount || 1;
      } else if (response && response.data) {
        // 格式2: { data: { list: [...], page: 1, pagecount: 10, total: 100 } }
        videos = response.data.list.map((item: any) => ({
          id: item.id || item.vod_id || 0,
          name: item.name || item.vod_name || '',
          pic: item.cover || item.vod_pic || `https://picsum.photos/300/450?random=${item.id || item.vod_id}`,
          score: item.score || item.vod_score || 0,
          remarks: item.remarks || item.vod_remarks || '',
          year: item.year || item.vod_year || 1900,
          area: item.area || item.vod_area || '',
          actor: item.actor || item.vod_actor || '',
          director: item.director || item.vod_director || '',
          content: item.content || item.vod_content || ''
        }));
        total = response.data.total || 0;
        totalPages = response.data.pagecount || 1;
      }
      
      return {
        videos,
        pagination: {
          total,
          totalPages,
          currentPage: page
        }
      };
    } catch (error) {
      console.error('Failed to search videos:', error);
      return {
        videos: [],
        pagination: {
          total: 0,
          totalPages: 0,
          currentPage: 1
        }
      };
    }
  }

  async getLatest(): Promise<VideoItem[]> {
    // 直接调用getRecommended，因为最新视频通常就是推荐视频
    return this.getRecommended();
  }

  async getVideoDetail(videoName: string): Promise<VideoItem | null> {
    try {
      const searchResult = await this.searchVideos(videoName);
      // 寻找完全匹配或最相似的结果
      const exactMatch = searchResult.videos.find(video => 
        video.name.toLowerCase() === videoName.toLowerCase()
      );
      if (exactMatch) {
        return exactMatch;
      }
      
      // 如果没有完全匹配，返回第一个结果（通常是最相关的）
      return searchResult.videos.length > 0 ? searchResult.videos[0] : null;
    } catch (error) {
      console.error('Failed to get video detail:', error);
      return null;
    }
  }

  async getVideoDetailById(videoId: number): Promise<{ videoInfo: PlayResponse; totalEpisodes: number } | null> {
    try {
      // 使用 parse/single 接口获取详细信息，episode从0开始
      const params = new URLSearchParams({
        proxy: 'true',
        id: videoId.toString(),
        episode: "0" // 默认获取第一集的信息
      });
      const response = await this.request<PlayResponse>(`/vod/parse/single?${params}`, false);
      return {
        videoInfo: response,
        totalEpisodes: response.totalEpisodes || 1
      };
    } catch (error) {
      console.error('Failed to get video detail by ID:', error);
      return null;
    }
  }

  async getVideoUrl(id: number, episode: number): Promise<{ url: string; videoInfo: PlayResponse }> {
    try {
      // 尝试不同的API端点格式
      const endpoints = [
        `/vod/parse/single?proxy=true&id=${id}&episode=${episode - 1}`,
        `ac=play&id=${id}&num=${episode}`,
        `ac=videolist&id=${id}`
      ];
      
      let response;
      for (const endpoint of endpoints) {
        try {
          response = await this.request<any>(endpoint, false);
          if (response) break;
        } catch (e) {
          console.log(`尝试端点 ${endpoint} 失败:`, e);
        }
      }
      
      if (response) {
        // 处理不同的响应格式
        if (response.episode && response.episode.proxyUrl) {
          // 格式1: 带有proxyUrl的响应
          return {
            url: response.episode.proxyUrl,
            videoInfo: response
          };
        } else if (response.url) {
          // 格式2: 直接返回url
          return {
            url: response.url,
            videoInfo: {
              videoId: id,
              videoName: '',
              episode: {
                index: episode - 1,
                label: `第${episode}集`,
                parsedUrl: response.url,
                proxyUrl: response.url,
                parseInfo: {
                  headers: {},
                  type: 'mp4'
                }
              },
              totalEpisodes: 1,
              cover: '',
              description: ''
            }
          };
        } else if (response.list && response.list.length > 0) {
          // 格式3: 返回视频列表
          const videoItem = response.list[0];
          return {
            url: videoItem.url || videoItem.vod_url || '',
            videoInfo: {
              videoId: id,
              videoName: videoItem.name || videoItem.vod_name || '',
              episode: {
                index: episode - 1,
                label: `第${episode}集`,
                parsedUrl: videoItem.url || videoItem.vod_url || '',
                proxyUrl: videoItem.url || videoItem.vod_url || '',
                parseInfo: {
                  headers: {},
                  type: 'mp4'
                }
              },
              totalEpisodes: response.list.length,
              cover: videoItem.cover || videoItem.vod_pic || '',
              description: videoItem.content || videoItem.vod_content || ''
            }
          };
        }
      }
      
      // 如果没有找到有效的播放地址，返回模拟播放地址
      console.log('没有找到有效的播放地址，使用模拟地址');
      const mockVideoUrl = `https://example.com/stream/${id}/episode-${episode}.mp4`;
      return {
        url: mockVideoUrl,
        videoInfo: {
          videoId: id,
          videoName: '',
          episode: {
            index: episode - 1,
            label: `第${episode}集`,
            parsedUrl: mockVideoUrl,
            proxyUrl: mockVideoUrl,
            parseInfo: {
              headers: {},
              type: 'mp4'
            }
          },
          totalEpisodes: 10,
          cover: '',
          description: ''
        }
      };
    } catch (error) {
      console.error('Failed to get video URL:', error);
      // 返回默认值，避免页面加载失败
      const mockVideoUrl = `https://example.com/stream/${id}/episode-${episode}.mp4`;
      return {
        url: mockVideoUrl,
        videoInfo: {
          videoId: id,
          videoName: '',
          episode: {
            index: 0,
            label: `第${episode}集`,
            parsedUrl: mockVideoUrl,
            proxyUrl: mockVideoUrl,
            parseInfo: {
              headers: {},
              type: 'mp4'
            }
          },
          totalEpisodes: 10,
          cover: '',
          description: ''
        }
      };
    }
  }
}

export const apiService = new ApiService();