import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BlogPost } from "@shared/schema";
import { Calendar, Eye, ArrowRight, BookOpen, Search, Filter, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import Header from "@/components/homepage/header";
import Footer from "@/components/homepage/footer";
import SEO from "@/components/seo";

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 6;
  
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/posts"],
  });

  const filteredPosts = posts?.filter(post => 
    post.status === "published" &&
    post.showInBlog !== false &&
    (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  // Pagination calculations
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  // Pagination handlers
  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  return (
    <>
      <SEO 
        title="Blog E-commerce - Chiến lược bán hàng Shopee & TikTok Shop | Hiếu Suro"
        description="Khám phá những insights và strategies mới nhất về bán hàng Shopee và TikTok Shop từ Hiếu Suro. Tips, tricks và case studies thực tế giúp bạn thành công trong E-commerce."
        keywords="blog ecommerce, chiến lược shopee, tiktok shop tips, bán hàng online, hiếu suro blog, kinh nghiệm ecommerce"
        canonical="https://hieusuro.replit.app/blog"
        ogImage="/attached_assets/hieu-suro-profile.png"
      />
      
      {isLoading ? (
        <div className="min-h-screen bg-gray-50 py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="animate-pulse space-y-8">
              <div className="h-12 bg-gray-200 rounded w-1/3 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-xl p-6 space-y-4">
                    <div className="h-48 bg-gray-200 rounded"></div>
                    <div className="h-6 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-16 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
      <div className="min-h-screen bg-gray-50">
        <Header />
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 md:px-6 py-16">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-full text-sm font-medium text-indigo-700">
              <BookOpen className="mr-2 h-4 w-4" />
              Blog & Insights
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Tất cả bài viết
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Khám phá những insights và strategies mới nhất về bán hàng Shopee và TikTok Shop từ Hiếu Suro
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-300 focus:ring-indigo-200"
                data-testid="search-posts"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation - Hidden on mobile */}
      <div className="bg-white border-b hidden md:block">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <nav className="flex items-center space-x-4 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Trang chủ</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">Blog</span>
          </nav>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        {/* Results info */}
        {filteredPosts.length > 0 && (
          <div className="mb-8 text-center">
            <p className="text-gray-600">
              {searchTerm ? (
                <>Tìm thấy <span className="font-semibold">{totalPosts}</span> bài viết cho "{searchTerm}"</>
              ) : (
                <>Hiển thị <span className="font-semibold">{totalPosts}</span> bài viết</>
              )}
              {totalPages > 1 && (
                <> - Trang {currentPage} / {totalPages}</>
              )}
            </p>
          </div>
        )}

        {currentPosts.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {searchTerm ? "Không tìm thấy bài viết" : "Chưa có bài viết nào"}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm ? "Thử tìm kiếm với từ khóa khác" : "Hãy quay lại sau để đọc những bài viết mới nhất"}
            </p>
            {searchTerm && (
              <Button 
                onClick={() => handleSearch("")}
                variant="outline"
              >
                Xóa tìm kiếm
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
              {currentPosts.map((post) => (
              <Card 
                key={post.id} 
                className="group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col"
              >
                {/* Image */}
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative overflow-hidden cursor-pointer">
                    {post.imageUrl ? (
                      <img 
                        src={post.imageUrl} 
                        alt={post.title} 
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const placeholder = target.nextElementSibling as HTMLElement;
                          if (placeholder) placeholder.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className="w-full h-56 bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center"
                      style={{ display: post.imageUrl ? 'none' : 'flex' }}
                    >
                      <BookOpen className="h-20 w-20 text-indigo-400" />
                    </div>
                  
                  {/* Views badge */}
                  {post.views && post.views > 0 && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                        <Eye className="h-3 w-3 text-gray-600" />
                        <span className="text-xs font-medium text-gray-600">{post.views}</span>
                      </div>
                    </div>
                  )}

                    {/* Reading time */}
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-gray-900/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                        <Clock className="h-3 w-3 text-white" />
                        <span className="text-xs font-medium text-white">5 phút đọc</span>
                      </div>
                    </div>
                  </div>
                </Link>

                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="space-y-4 flex-1 flex flex-col">
                    <Link href={`/blog/${post.slug}`}>
                      <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 cursor-pointer hover:text-indigo-600">
                        {post.title}
                      </h2>
                    </Link>
                    
                    {/* Date */}
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(post.publishedAt!).toLocaleDateString('vi-VN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    
                    {/* Read more button */}
                    <div className="mt-auto">
                      <Link href={`/blog/${post.slug}`}>
                        <Button 
                          variant="link" 
                          className="p-0 h-auto text-indigo-600 hover:text-indigo-700 font-semibold group/btn"
                          data-testid={`read-more-${post.id}`}
                        >
                          Đọc thêm 
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-16 flex flex-col items-center space-y-6">
                {/* Pagination controls */}
                <div className="flex items-center space-x-2">
                  {/* Previous button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToPrevious}
                    disabled={currentPage === 1}
                    className="flex items-center space-x-1"
                    data-testid="pagination-previous"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">Trước</span>
                  </Button>

                  {/* Page numbers */}
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(page => {
                        // Show first page, last page, current page, and pages around current
                        return page === 1 || 
                               page === totalPages || 
                               Math.abs(page - currentPage) <= 1;
                      })
                      .map((page, index, array) => {
                        // Add ellipsis if there's a gap
                        const showEllipsis = index > 0 && page - array[index - 1] > 1;
                        
                        return (
                          <div key={page} className="flex items-center space-x-1">
                            {showEllipsis && (
                              <span className="px-2 py-1 text-gray-500">...</span>
                            )}
                            <Button
                              variant={currentPage === page ? "default" : "outline"}
                              size="sm"
                              onClick={() => goToPage(page)}
                              className="w-10 h-10"
                              data-testid={`pagination-page-${page}`}
                            >
                              {page}
                            </Button>
                          </div>
                        );
                      })
                    }
                  </div>

                  {/* Next button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToNext}
                    disabled={currentPage === totalPages}
                    className="flex items-center space-x-1"
                    data-testid="pagination-next"
                  >
                    <span className="hidden sm:inline">Sau</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Back to home */}
        <div className="text-center mt-16">
          <Link href="/">
            <Button variant="outline" size="lg" className="px-8">
              Về trang chủ
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
      </div>
      )}
    </>
  );
}