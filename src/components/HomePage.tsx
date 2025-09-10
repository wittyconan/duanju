import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { CategoryNav } from './CategoryNav';
import { CategoryNavSkeleton } from './CategoryNavSkeleton';
import { VideoCard } from './VideoCard';
import { VideoGridSkeleton } from './VideoCardSkeleton';
import { VideoDetailModal } from './VideoDetailModal';
import { Footer } from './Footer';
import { BackToTop } from './BackToTop';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { apiService } from '@/services/api';
import type { VideoCategory, VideoItem } from '@/types';

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
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 0, currentPage: 1 });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      const currentPath = location.pathname;
      
      if (currentPath === '/recommend' && !isRecommendMode) {
        setIsRecommendMode(true);
        setActiveCategory(null);
        setCurrentPage(1);
        loadRecommendedVideos();
      } else if (categoryId) {
        const targetCategoryId = parseInt(categoryId);
        if (targetCategoryId !== activeCategory || isRecommendMode) {
          setIsRecommendMode(false);
          setActiveCategory(targetCategoryId);
          setCurrentPage(1);
          loadVideosByCategory(targetCategoryId, 1);
        }
      } else if (currentPath === '/' && activeCategory === null && !isRecommendMode) {
        // 默认选择第一个分类
        const firstCategory = categories[0]?.type_id;
        if (firstCategory) {
          setIsRecommendMode(false);
          setActiveCategory(firstCategory);
          setCurrentPage(1);
          navigate(`/category/${firstCategory}`, { replace: true });
          loadVideosByCategory(firstCategory, 1);
        }
      }
    }
  }, [categories, categoryId, location.pathname, navigate]);

  const loadCategories = async () => {
    setCategoriesLoading(true);
    try {
      const response = await apiService.getCategories();
      setCategories(response.categories);
    } catch (error) {
      console.error('Failed to load categories:', error);
    } finally {
      setCategoriesLoading(false);
    }
  };

  const loadRecommendedVideos = async () => {
    if (loading) return; // 防止重复加载
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

  const loadVideosByCategory = async (categoryId: number | null, page: number = 1) => {
    if (loading) return; // 防止重复加载
    setLoading(true);
    try {
      if (categoryId) {
        const result = await apiService.getVideoList(categoryId, page);
        setVideos(result.videos || []);
        setPagination(result.pagination);
      } else {
        const videos = await apiService.getRecommended();
        setVideos(videos || []);
        setPagination({ total: 0, totalPages: 0, currentPage: 1 });
      }
    } catch (error) {
      console.error('Failed to load videos:', error);
      setVideos([]);
      setPagination({ total: 0, totalPages: 0, currentPage: 1 });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setLoading(true);
    setIsRecommendMode(false);
    setActiveCategory(null);
    setCurrentPage(1);
    navigate('/');
    try {
      const result = await apiService.searchVideos(query);
      setVideos(result.videos || []);
      setPagination({ total: 0, totalPages: 0, currentPage: 1 }); // 搜索暂不支持分页显示
    } catch (error) {
      console.error('Failed to search videos:', error);
      setVideos([]);
      setPagination({ total: 0, totalPages: 0, currentPage: 1 });
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
      setCurrentPage(1);
      navigate(`/category/${categoryId}`);
      loadVideosByCategory(categoryId, 1);
    } else {
      // 选择推荐
      setIsRecommendMode(true);
      setActiveCategory(null);
      setCurrentPage(1);
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
      setCurrentPage(1);
      navigate('/recommend');
      loadRecommendedVideos();
    } else if (type === 'home') {
      if (categories.length > 0) {
        const firstCategory = categories[0].type_id;
        setIsRecommendMode(false);
        setActiveCategory(firstCategory);
        setCurrentPage(1);
        navigate(`/category/${firstCategory}`);
        loadVideosByCategory(firstCategory, 1);
      }
    } else if (type === 'latest') {
      const latestCategoryId = categories.find(cat => 
        cat.type_name.includes('剧集') || cat.type_name.includes('最新')
      )?.type_id;
      if (latestCategoryId) {
        setIsRecommendMode(false);
        setActiveCategory(latestCategoryId);
        setCurrentPage(1);
        navigate(`/category/${latestCategoryId}`);
        loadVideosByCategory(latestCategoryId, 1);
      } else if (categories.length > 0) {
        const firstCategory = categories[0].type_id;
        setIsRecommendMode(false);
        setActiveCategory(firstCategory);
        setCurrentPage(1);
        navigate(`/category/${firstCategory}`);
        loadVideosByCategory(firstCategory, 1);
      }
    }
  };

  const handleVideoPlay = (video: VideoItem, episode: number) => {
    // 将视频信息存储到sessionStorage
    sessionStorage.setItem('currentVideo', JSON.stringify(video));
    
    // 导航到播放页面
    navigate(`/play/${video.id}/${episode}`);
  };

  const handlePageChange = (page: number) => {
    if (page === currentPage || loading) return;
    if (page < 1 || page > pagination.totalPages) return; // 边界检查
    
    setCurrentPage(page);
    if (activeCategory && !isRecommendMode) {
      loadVideosByCategory(activeCategory, page);
    }
  };

  const renderPagination = () => {
    if (isRecommendMode || pagination.totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(pagination.totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex justify-center mt-8">
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="cursor-pointer"
                />
              </PaginationItem>
            )}
            
            {pages.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  isActive={page === currentPage}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            {currentPage < pagination.totalPages && (
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="cursor-pointer"
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={handleSearch} onNavClick={handleNavClick} />
      
      <main className="max-w-7xl mx-auto">
        {categoriesLoading ? (
          <CategoryNavSkeleton />
        ) : (
          <CategoryNav 
            categories={categories}
            activeCategory={isRecommendMode ? null : activeCategory}
            onCategorySelect={handleCategorySelect}
            isRecommendMode={isRecommendMode}
          />
        )}
        
        <div className="px-4 py-6 min-h-[70vh]">
          {loading ? (
            <VideoGridSkeleton count={18} />
          ) : videos && videos.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
                {videos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onClick={handleVideoClick}
                    onPlay={handleVideoPlay}
                  />
                ))}
              </div>
              {renderPagination()}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="text-6xl mb-4">📺</div>
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                暂无视频内容
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                当前分类下还没有视频，请尝试切换到其他分类
              </p>
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