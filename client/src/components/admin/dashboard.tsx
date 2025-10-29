import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon, FileText, GraduationCap, Users, Mail, Eye, ShoppingCart, Video } from "lucide-react";

interface Stats {
  totalPosts: number;
  totalCourses: number;
  totalStudents: number;
  totalSubscribers: number;
  landingPageViews: Record<string, number>;
}

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery<Stats>({
    queryKey: ["/api/stats"],
  });

  // Helper function to get page title and icon
  const getPageDisplayInfo = (slug: string) => {
    const displayMap: Record<string, { title: string; icon: any }> = {
      'affshopee': { title: 'Views Affiliate Shopee', icon: ShoppingCart },
      'shopeezoom': { title: 'Views ShopeeZoom', icon: Eye },
      'tiktokzoom': { title: 'Views TikTokZoom', icon: Video },
    };
    return displayMap[slug] || { title: `Views ${slug}`, icon: Eye };
  };

  // Base stats cards
  const baseStatsCards = [
    { 
      id: "total-posts",
      title: "Tổng bài viết", 
      value: stats?.totalPosts || 0, 
      icon: FileText,
      change: "+12%",
      changeType: "positive" as const
    },
    { 
      id: "total-courses",
      title: "Tổng khóa học", 
      value: stats?.totalCourses || 0, 
      icon: GraduationCap,
      change: "+5%",
      changeType: "positive" as const
    },
    { 
      id: "total-students",
      title: "Tổng học viên", 
      value: stats?.totalStudents || 0, 
      icon: Users,
      change: "+23%",
      changeType: "positive" as const
    },
    { 
      id: "total-subscribers",
      title: "Tổng subscribers", 
      value: stats?.totalSubscribers || 0, 
      icon: Mail,
      change: "+8%",
      changeType: "positive" as const
    },
  ];

  // Dynamic landing page cards
  const landingPageCards = Object.entries(stats?.landingPageViews || {}).map(([slug, views]) => {
    const pageInfo = getPageDisplayInfo(slug);
    return {
      id: `${slug}-views`,
      title: pageInfo.title,
      value: views,
      icon: pageInfo.icon,
      change: "+15%",
      changeType: "positive" as const
    };
  });

  const statsCards = [...baseStatsCards, ...landingPageCards];

  if (isLoading) {
    return (
      <div className="flex-1 space-y-8 p-8">
        <div className="flex items-center justify-between space-y-2">
          <div className="h-8 w-48 bg-muted animate-pulse rounded"></div>
          <div className="h-8 w-32 bg-muted animate-pulse rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 + Object.keys({}).length }, (_, i) => i + 1).map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-24 bg-muted rounded"></div>
                <div className="h-4 w-4 bg-muted rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 w-16 bg-muted rounded"></div>
                <div className="h-3 w-20 bg-muted rounded mt-2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-8 p-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h2>
          <p className="text-muted-foreground">
            Chào mừng trở lại với bảng điều khiển của bạn
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-sm text-muted-foreground">
            Cập nhật: {new Date().toLocaleDateString('vi-VN')}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index} className="border-sidebar-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground" data-testid={`stat-${stat.id}`}>
                {stat.value.toLocaleString()}
              </div>
              <div className="flex items-center text-xs text-muted-foreground mt-2">
                {stat.changeType === 'positive' ? (
                  <ArrowUpIcon className="mr-1 h-3 w-3 text-emerald-500" />
                ) : (
                  <ArrowDownIcon className="mr-1 h-3 w-3 text-red-500" />
                )}
                <span className={stat.changeType === 'positive' ? 'text-emerald-500' : 'text-red-500'}>
                  {stat.change}
                </span>
                <span className="ml-1">từ tháng trước</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-sidebar-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div className="space-y-1">
                <p className="text-sm text-foreground">Hệ thống đã được khởi tạo thành công</p>
                <p className="text-xs text-muted-foreground">Vừa xong</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-muted rounded-full mt-2"></div>
              <div className="space-y-1">
                <p className="text-sm text-foreground">Đang sẵn sàng để quản lý nội dung</p>
                <p className="text-xs text-muted-foreground">2 phút trước</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-sidebar-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Thống kê tổng quan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Tổng nội dung</p>
                <p className="text-sm text-muted-foreground">
                  {(stats?.totalPosts || 0) + (stats?.totalCourses || 0)} items
                </p>
              </div>
              <div className="text-2xl font-bold text-primary">
                {(stats?.totalPosts || 0) + (stats?.totalCourses || 0)}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Engagement</p>
                <p className="text-sm text-muted-foreground">Người dùng tương tác</p>
              </div>
              <div className="text-2xl font-bold text-primary">
                {stats?.totalStudents || 0}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}