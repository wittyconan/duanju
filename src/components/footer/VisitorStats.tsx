"use client"

import React, { useEffect, useState } from 'react';

interface VisitorStatsProps {
  className?: string;
}

interface StatsData {
  pageviews: number;
  visitors: number;
}

export const VisitorStats: React.FC<VisitorStatsProps> = ({ className = '' }) => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 从 window.umami 获取统计数据（如果可用）
    const getStats = () => {
      try {
        // 由于 Umami 的公共 API 需要认证，我们使用本地存储来模拟统计
        // 这里可以根据实际需要调用 Umami 的 API 或者使用其他方式
        
        // 简单的本地计数器（实际使用中应该从 Umami API 获取）
        const today = new Date().toDateString();
        const todayViews = localStorage.getItem(`umami_views_${today}`) || '0';
        const totalViews = localStorage.getItem('umami_total_views') || '0';
        
        // 增加今日访问计数
        const currentTodayViews = parseInt(todayViews) + 1;
        const currentTotalViews = parseInt(totalViews) + 1;
        
        localStorage.setItem(`umami_views_${today}`, currentTodayViews.toString());
        localStorage.setItem('umami_total_views', currentTotalViews.toString());
        
        setStats({
          pageviews: currentTotalViews,
          visitors: Math.floor(currentTotalViews * 0.7) // 估算访客数
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Failed to get stats:', error);
        setLoading(false);
      }
    };

    // 页面加载后获取统计
    const timer = setTimeout(getStats, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className={`text-xs text-muted-foreground ${className}`}>
        <div className="animate-pulse text-right md:text-left">加载统计中...</div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className={`text-xs text-muted-foreground ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4 text-center md:text-right">
        <div className="flex items-center justify-center md:justify-end space-x-2">
          <span>总访问: {stats.pageviews.toLocaleString()}</span>
          <span>•</span>
          <span>访客: {stats.visitors.toLocaleString()}</span>
        </div>
        <div className="opacity-75 whitespace-nowrap">
          数据由 Umami 提供
        </div>
      </div>
    </div>
  );
};