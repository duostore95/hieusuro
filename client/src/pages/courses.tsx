import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Course } from "@shared/schema";
import { Clock, Users, Star, Search, Filter, BookOpen, TrendingUp, ExternalLink, Zap } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import Header from "@/components/homepage/header";
import Footer from "@/components/homepage/footer";
import SEO from "@/components/seo";

export default function CoursesPage() {
  const [, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active">("all");
  
  
  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  const filteredCourses = courses?.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || course.status === filterStatus;
    return matchesSearch && matchesStatus;
  }) || [];

  const handleJoinCourse = (course: Course) => {
    if (course.courseUrl) {
      navigate(course.courseUrl);
    } else {
      // Fallback for courses without specific landing pages
      alert(`Khóa học "${course.title}" hiện chưa có landing page riêng. Vui lòng liên hệ để biết thêm thông tin!`);
    }
  };

  return (
    <>
      <SEO 
        title="Khóa học E-commerce - Học bán hàng Shopee & TikTok Shop | Hiếu Suro"
        description="Danh sách khóa học E-commerce của Hiếu Suro. Học bán hàng Shopee, TikTok Shop từ A-Z. ShopeeZoom, Affiliate Shopee, TikTok Zoom và nhiều khóa học khác."
        keywords="khóa học ecommerce, học bán hàng shopee, tiktok shop, hiếu suro, shopeezoom, affiliate shopee"
        ogImage="/attached_assets/hieu-suro-profile.png"
        canonical="https://hieusuro.replit.app/hoc"
      />
      
      {isLoading ? (
        <div className="min-h-screen bg-gray-50">
          <Header />
          <div className="container mx-auto px-4 md:px-6 py-16">
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
      
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 md:px-6 py-16">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-full text-sm font-medium text-indigo-700">
              <BookOpen className="mr-2 h-4 w-4" />
              Tất cả khóa học
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Khóa học{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                E-commerce
              </span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Nâng cao kỹ năng bán hàng online với các khóa học chuyên sâu về Shopee và TikTok Shop từ Hiếu Suro
            </p>

            {/* Search and Filter */}
            <div className="max-w-md mx-auto space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Tìm kiếm khóa học..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-300 focus:ring-indigo-200"
                  data-testid="search-courses"
                />
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Courses Grid */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {searchTerm ? "Không tìm thấy khóa học" : "Chưa có khóa học nào"}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm ? "Thử tìm kiếm với từ khóa khác" : "Hãy quay lại sau để khám phá những khóa học mới"}
            </p>
            {searchTerm && (
              <Button 
                onClick={() => setSearchTerm("")}
                variant="outline"
              >
                Xóa tìm kiếm
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <Card 
                key={course.id} 
                className="group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col cursor-pointer"
                onClick={() => handleJoinCourse(course)}
                data-testid={`course-card-${course.id}`}
              >
                {/* Course Image */}
                <div className="relative overflow-hidden">
                  {course.imageUrl ? (
                    <img 
                      src={course.imageUrl} 
                      alt={course.title} 
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center">
                      <BookOpen className="h-20 w-20 text-indigo-400" />
                    </div>
                  )}
                  
                  {/* Badge */}
                  {course.badge && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-indigo-600 text-white border-0">
                        <Zap className="h-3 w-3 mr-1" />
                        {course.badge}
                      </Badge>
                    </div>
                  )}

                  {/* Status */}
                  <div className="absolute top-4 right-4">
                    <Badge 
                      variant={course.status === 'active' ? 'default' : 'secondary'}
                      className={course.status === 'active' ? 'bg-green-600 text-white' : ''}
                    >
                      {course.status === 'active' ? 'Đang mở' : 'Sắp mở'}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="space-y-4 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {course.title}
                    </h3>
                    
                    <p className="text-gray-600 line-clamp-3 flex-1">
                      {course.description}
                    </p>
                    
                    {/* Course Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        {course.duration && (
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{course.duration}</span>
                          </div>
                        )}
                        {course.studentCount && course.studentCount > 0 && (
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{course.studentCount}</span>
                          </div>
                        )}
                      </div>
                      
                      {course.rating && (
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="font-medium">{course.rating}</span>
                        </div>
                      )}
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        {course.price ? (
                          <div className="text-2xl font-bold text-indigo-600">
                            {course.price}
                          </div>
                        ) : (
                          <div className="text-xl font-bold text-gray-900">
                            Liên hệ
                          </div>
                        )}
                      </div>
                      
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleJoinCourse(course);
                        }}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                        data-testid={`join-course-${course.id}`}
                      >
                        Tham gia
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Call to Action */}
        {filteredCourses.length > 0 && (
          <div className="text-center mt-16 p-8 bg-white rounded-2xl border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Bạn chưa tìm thấy khóa học phù hợp?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Liên hệ trực tiếp với Hiếu Suro để được tư vấn khóa học phù hợp nhất với mục tiêu kinh doanh của bạn
            </p>
            <Button 
              onClick={() => window.open('https://zalo.me/0931459459', '_blank')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-8 py-3"
              data-testid="button-zalo-consultation"
            >
              <TrendingUp className="mr-2 h-5 w-5" />
              Tư vấn 1-1 miễn phí
            </Button>
          </div>
        )}
      </div>

      <Footer />
      </div>
      )}
    </>
  );
}