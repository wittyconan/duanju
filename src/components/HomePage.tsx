import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { CategoryNav } from './CategoryNav';
import { VideoCard } from './VideoCard';
import { VideoDetailModal } from './VideoDetailModal';
import { Footer } from './Footer';
import { BackToTop } from './BackToTop';
import { apiService } from '@/services/api';
import type { VideoCategory, VideoItem } from '@/types';
import { Loader2 } from 'lucide-react';

export function HomePage() {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const location = useLocation();
  const [categories, setCategories] = useState<VideoCategory[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [isRecommendMode, setIsRecommendMode] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      if (location.pathname === '/recommend') {
        setIsRecommendMode(true);
        setActiveCategory(null);
        loadRecommendedVideos();
      } else if (categoryId) {
        const targetCategoryId = parseInt(categoryId);
        if (targetCategoryId !== activeCategory) {
          setIsRecommendMode(false);
          setActiveCategory(targetCategoryId);
          loadVideosByCategory(targetCategoryId);
        }
      } else if (location.pathname === '/' && !isRecommendMode && activeCategory === null) {
        // 默认选择第一个分类
        const firstCategory = categories[0]?.type_id;
        if (firstCategory) {
          setIsRecommendMode(false);
          setActiveCategory(firstCategory);
          navigate(`/category/${firstCategory}`, { replace: true });
          loadVideosByCategory(firstCategory);
        }
      }
    }
  }, [categories, categoryId, location.pathname, activeCategory, isRecommendMode]);

  const loadCategories = async () => {
    try {
      const response = await apiService.getCategories();
      setCategories(response.categories);
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const loadRecommendedVideos = async () => {
    setLoading(true);
    try {
      const videos = await apiService.getRecommended();
      setVideos(videos || []);
    } catch (error) {
      console.error('Failed to load videos:', error);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  const loadVideosByCategory = async (categoryId: number | null) => {
    setLoading(true);
    try {
      const videos = categoryId 
        ? await apiService.getVideoList(categoryId)
        : await apiService.getRecommended();
      setVideos(videos || []);
    } catch (error) {
      console.error('Failed to load videos:', error);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setLoading(true);
    setIsRecommendMode(false);
    setActiveCategory(null);
    navigate('/');
    try {
      const videos = await apiService.searchVideos(query);
      setVideos(videos || []);
    } catch (error) {
      console.error('Failed to search videos:', error);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (categoryId: number | null) => {
    if (categoryId === activeCategory && !isRecommendMode) {
      return;
    }
    
    if (categoryId) {
      setIsRecommendMode(false);
      setActiveCategory(categoryId);
      navigate(`/category/${categoryId}`);
      loadVideosByCategory(categoryId);
    } else {
      // 选择推荐
      setIsRecommendMode(true);
      setActiveCategory(null);
      navigate('/recommend');
      loadRecommendedVideos();
    }
  };

  const handleVideoClick = (video: VideoItem) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleNavClick = (type: 'home' | 'latest' | 'recommended') => {
    if (type === 'recommended') {
      setIsRecommendMode(true);
      setActiveCategory(null);
      navigate('/recommend');
      loadRecommendedVideos();
    } else if (type === 'home') {
      if (categories.length > 0) {
        const firstCategory = categories[0].type_id;
        setIsRecommendMode(false);
        setActiveCategory(firstCategory);
        navigate(`/category/${firstCategory}`);
        loadVideosByCategory(firstCategory);
      }
    } else if (type === 'latest') {
      const latestCategoryId = categories.find(cat => 
        cat.type_name.includes('剧集') || cat.type_name.includes('最新')
      )?.type_id;
      if (latestCategoryId) {
        setIsRecommendMode(false);
        setActiveCategory(latestCategoryId);
        navigate(`/category/${latestCategoryId}`);
        loadVideosByCategory(latestCategoryId);
      } else if (categories.length > 0) {
        const firstCategory = categories[0].type_id;
        setIsRecommendMode(false);
        setActiveCategory(firstCategory);
        navigate(`/category/${firstCategory}`);
        loadVideosByCategory(firstCategory);
      }
    }
  };

  const handleVideoPlay = (video: VideoItem, episode: number) => {
    // 将视频信息存储到sessionStorage
    sessionStorage.setItem('currentVideo', JSON.stringify(video));
    
    // 导航到播放页面
    navigate(`/play/${video.id}/${episode}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={handleSearch} onNavClick={handleNavClick} />
      
      <main className="max-w-7xl mx-auto">
        <CategoryNav 
          categories={categories}
          activeCategory={isRecommendMode ? null : activeCategory}
          onCategorySelect={handleCategorySelect}
          isRecommendMode={isRecommendMode}
        />
        
        <div className="px-4 py-6">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
              {videos?.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onClick={handleVideoClick}
                  onPlay={handleVideoPlay}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <VideoDetailModal
        video={selectedVideo}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPlay={handleVideoPlay}
      />
      
      <Footer />
      <BackToTop />
    </div>
  );
}