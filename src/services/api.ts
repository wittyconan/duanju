import type { CategoriesResponse, RecommendResponse, ListResponse, VideoItem, RecommendVideoItem, ListVideoItem } from '@/types';

// 使用相对路径，在开发环境中会通过Vite代理，在生产环境中会通过Cloudflare Pages路由规则代理
const BASE_URL = '/api-proxy';

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

    const response = await fetch(`${BASE_URL}${endpoint}`);
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

  // 转换推荐API返回的数据为统一格式
  private convertRecommendItem(item: RecommendVideoItem): VideoItem {
    return {
      id: item.vod_id,
      name: item.vod_name,
      pic: item.vod_pic,
      remarks: item.vod_remarks,
      score: item.vod_score,
      year: item.vod_year,
      area: item.vod_area,
      actor: item.vod_actor,
      director: item.vod_director,
      content: item.vod_content,
    };
  }

  // 转换列表API返回的数据为统一格式
  private convertListItem(item: ListVideoItem): VideoItem {
    return {
      id: item.id,
      name: item.name,
      pic: item.cover,
      score: item.score,
      updateTime: item.update_time,
      remarks: '',
      year: 1900,
      area: '',
      actor: '',
      director: '',
      content: '',
    };
  }

  async getCategories(): Promise<CategoriesResponse> {
    return this.request<CategoriesResponse>('/vod/categories');
  }

  async getRecommended(): Promise<VideoItem[]> {
    const response = await this.request<RecommendResponse>('/vod/recommend?size=20');
    return response.items.map(item => this.convertRecommendItem(item));
  }

  async getVideoList(categoryId?: number, page: number = 1): Promise<{ videos: VideoItem[]; pagination: { total: number; totalPages: number; currentPage: number; } }> {
    const params = new URLSearchParams({ page: page.toString() });
    if (categoryId) {
      params.append('categoryId', categoryId.toString());
    }
    const response = await this.request<ListResponse>(`/vod/list?${params}`);
    return {
      videos: response.list.map(item => this.convertListItem(item)),
      pagination: {
        total: response.total,
        totalPages: response.totalPages,
        currentPage: response.currentPage
      }
    };
  }

  async searchVideos(name: string, page: number = 1): Promise<{ videos: VideoItem[]; pagination: { total: number; totalPages: number; currentPage: number; } }> {
    const params = new URLSearchParams({
      name,
      page: page.toString()
    });
    const response = await this.request<ListResponse>(`/vod/search?${params}`);
    return {
      videos: response.list.map(item => this.convertListItem(item)),
      pagination: {
        total: response.total,
        totalPages: response.totalPages,
        currentPage: response.currentPage
      }
    };
  }

  async getLatest(): Promise<VideoItem[]> {
    const response = await this.request<ListResponse>('/vod/latest');
    return response.list.map(item => this.convertListItem(item));
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