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
      
      return {
        categories,
        total: categories.length
      };
    } catch (error) {
      console.error('Failed to get categories:', error);
      // 返回默认分类
      return {
        categories: [
          { type_id: 1, type_name: '电影' },
          { type_id: 2, type_name: '电视剧' },
          { type_id: 3, type_name: '综艺' },
          { type_id: 4, type_name: '动漫' },
          { type_id: 5, type_name: '纪录片' }
        ],
        total: 5
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
        return response.list.map((item: any) => ({
          id: item.id || item.vod_id || 0,
          name: item.name || item.vod_name || '',
          pic: item.cover || item.vod_pic || '',
          score: item.score || item.vod_score || 0,
          remarks: item.remarks || item.vod_remarks || '',
          year: item.year || item.vod_year || 1900,
          area: item.area || item.vod_area || '',
          actor: item.actor || item.vod_actor || '',
          director: item.director || item.vod_director || '',
          content: item.content || item.vod_content || ''
        }));
      } else if (response && response.data) {
        // 格式2: { data: { list: [...] } }
        return response.data.list.map((item: any) => ({
          id: item.id || item.vod_id || 0,
          name: item.name || item.vod_name || '',
          pic: item.cover || item.vod_pic || '',
          score: item.score || item.vod_score || 0,
          remarks: item.remarks || item.vod_remarks || '',
          year: item.year || item.vod_year || 1900,
          area: item.area || item.vod_area || '',
          actor: item.actor || item.vod_actor || '',
          director: item.director || item.vod_director || '',
          content: item.content || item.vod_content || ''
        }));
      } else {
        return [];
      }
    } catch (error) {
      console.error('Failed to get recommended videos:', error);
      return [];
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
          pic: item.cover || item.vod_pic || '',
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
          pic: item.cover || item.vod_pic || '',
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
      console.error('Failed to get video list:', error);
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
          pic: item.cover || item.vod_pic || '',
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
          pic: item.cover || item.vod_pic || '',
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
    const params = new URLSearchParams({
      proxy: 'true',
      id: id.toString(),
      episode: (episode - 1).toString() // 转换为基于0的索引
    });
    // 播放URL不使用缓存，因为可能会过期
    const response = await this.request<PlayResponse>(`/vod/parse/single?${params}`, false);
    
    return {
      url: response.episode.proxyUrl,
      videoInfo: response
    };
  }
}

export const apiService = new ApiService();