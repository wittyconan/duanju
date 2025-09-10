export interface VideoCategory {
  type_id: number;
  type_name: string;
}

// 推荐API返回的视频项
export interface RecommendVideoItem {
  vod_id: number;
  vod_name: string;
  vod_pic: string;
  vod_remarks: string;
  vod_score: number;
  vod_year: number;
  vod_area: string;
  vod_actor?: string;
  vod_director?: string;
  vod_content?: string;
}

// 分类列表API返回的视频项
export interface ListVideoItem {
  id: number;
  name: string;
  cover: string;
  update_time: string;
  score: number;
}

// 统一的视频项接口
export interface VideoItem {
  id: number;
  name: string;
  pic: string;
  remarks?: string;
  score: number;
  year?: number;
  area?: string;
  actor?: string;
  director?: string;
  content?: string;
  updateTime?: string;
}

export interface CategoriesResponse {
  categories: VideoCategory[];
  total: number;
}

export interface RecommendResponse {
  mode: string;
  categoryId: number;
  categoryName: string | null;
  total: number;
  items: RecommendVideoItem[];
}

export interface ListResponse {
  total: number;
  totalPages: number;
  currentPage: number;
  list: ListVideoItem[];
}