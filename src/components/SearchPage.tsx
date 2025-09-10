import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Header } from './Header';
import { VideoCard } from './VideoCard';
import { VideoGridSkeleton } from './VideoCardSkeleton';
import { VideoDetailModal } from './VideoDetailModal';
import { Footer } from './Footer';
import { BackToTop } from './BackToTop';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { apiService } from '@/services/api';
import type { VideoItem } from '@/types';

export function SearchPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 0, currentPage: 1 });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // 从URL参数获取搜索词和页码
  useEffect(() => {
    const query = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1');
    
    setSearchQuery(query);
    setCurrentPage(page);
    
    if (query) {
      performSearch(query, page);
    }
  }, [searchParams]);

  const performSearch = async (query: string, page: number = 1) => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const result = await apiService.searchVideos(query, page);
      setVideos(result.videos || []);
      setPagination(result.pagination);
    } catch (error) {
      console.error('Failed to search videos:', error);
      setVideos([]);
      setPagination({ total: 0, totalPages: 0, currentPage: 1 });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    
    // 更新URL参数，重置到第1页
    setSearchParams({ q: query, page: '1' });
  };

  const handlePageChange = (page: number) => {
    if (page === currentPage || loading) return;
    if (page < 1 || page > pagination.totalPages) return;
    
    // 更新URL参数
    setSearchParams({ q: searchQuery, page: page.toString() });
  };

  const handleVideoClick = (video: VideoItem) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleVideoPlay = (video: VideoItem, episode: number) => {
    sessionStorage.setItem('currentVideo', JSON.stringify(video));
    navigate(`/play/${video.id}/${episode}`);
  };

  const handleNavClick = (type: 'home' | 'latest' | 'recommended') => {
    if (type === 'recommended') {
      navigate('/recommend');
    } else if (type === 'home') {
      navigate('/');
    } else if (type === 'latest') {
      navigate('/');
    }
  };

  const renderPagination = () => {
    if (pagination.totalPages <= 1) return null;

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
      <Header onSearch={handleSearch} onNavClick={handleNavClick} searchInitialValue={searchQuery} />
      
      <main className="max-w-7xl mx-auto">
        <div className="px-4 py-6">
          {searchQuery && (
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                搜索结果
              </h1>
              <p className="text-muted-foreground">
                关键词: "{searchQuery}" 
                {!loading && pagination.total > 0 && (
                  <span className="ml-2">共找到 {pagination.total} 个结果</span>
                )}
              </p>
            </div>
          )}
        </div>
        
        <div className="px-4 pb-6 min-h-[70vh]">
          {loading ? (
            <VideoGridSkeleton count={18} />
          ) : !searchQuery ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                请输入搜索关键词
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                在上方搜索框中输入视频名称进行搜索
              </p>
            </div>
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
              <div className="text-6xl mb-4">😔</div>
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                未找到相关视频
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                试试其他关键词或检查拼写是否正确
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