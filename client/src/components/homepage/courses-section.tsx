import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Course } from "@shared/schema";
import { Clock, Users, Star, Zap, BookOpen, TrendingUp, ArrowRight } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function CoursesSection() {
  const [, navigate] = useLocation();
  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  const featuredCourses = courses?.slice(0, 3) || [];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJoinCourse = (course: Course) => {
    if (course.courseUrl) {
      // Navigate tới course landing page
      navigate(course.courseUrl);
    } else {
      // Fallback nếu course không có landing page
      navigate('/hoc');
    }
  };

  if (isLoading) {
    return (
      <section id="courses" className="py-[4vh] md:py-[8vh] bg-gray-50">
        <div className="container px-4 sm:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900">
                Khóa học nổi bật
              </h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Những khóa học chất lượng cao để giúp bạn làm chủ Shopee và TikTok Shop
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-7xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                <div className="w-full h-48 bg-gray-200"></div>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded-full"></div>
                    <div className="h-6 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(parseFloat(price));
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Bestseller":
        return "bg-indigo-600 text-white";
      case "Mới":
        return "bg-indigo-600 text-white";
      case "Hot":
        return "bg-indigo-600 text-white";
      default:
        return "bg-indigo-600 text-white";
    }
  };

  return (
    <section id="courses" className="py-[4vh] md:py-[8vh] bg-gray-50">

      <div className="container relative z-10 px-4 sm:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700">
            <BookOpen className="mr-2 h-4 w-4 text-indigo-600" />
            Khóa học E-commerce chuyên sâu
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
              Khóa học{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                nổi bật
              </span>
            </h2>
            <p className="max-w-3xl text-lg md:text-xl text-gray-600 leading-relaxed">
              Những khóa học <strong>thực chiến</strong> được thiết kế để giúp bạn{" "}
              <span className="font-semibold text-gray-900">
                làm chủ Shopee & TikTok Shop
              </span>
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCourses.map((course, index) => (
            <Card 
              key={course.id} 
              className="group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden relative"
            >
              {/* Course image */}
              <div 
                className="relative overflow-hidden cursor-pointer"
                onClick={() => handleJoinCourse(course)}
                data-testid={`course-image-${course.id}`}
              >
                {course.imageUrl ? (
                  <img 
                    src={course.imageUrl} 
                    alt={course.title} 
                    className="w-full h-48 object-cover" 
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-white/50" />
                  </div>
                )}
                
                {/* Badge overlay */}
                {course.badge && (
                  <div className="absolute top-4 left-4">
                    <Badge className={`${getBadgeColor(course.badge)} px-3 py-1 text-xs font-bold border-none`}>
                      {course.badge}
                    </Badge>
                  </div>
                )}

                {/* Price overlay */}
                <div className="absolute top-4 right-4">
                  <div className="bg-white border border-gray-200 rounded-full px-3 py-1">
                    <span className="text-lg font-bold text-gray-900" data-testid={`course-price-${course.id}`}>
                      {formatPrice(course.price)}
                    </span>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 
                    className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors cursor-pointer" 
                    onClick={() => handleJoinCourse(course)}
                    data-testid={`course-title-${course.id}`}
                  >
                    {course.title}
                  </h3>
                  
                  <p className="text-gray-600 line-clamp-2" data-testid={`course-description-${course.id}`}>
                    {course.description}
                  </p>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.studentCount}+ học viên</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{course.rating}</span>
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <Button 
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                    onClick={() => handleJoinCourse(course)}
                    data-testid={`course-join-${course.id}`}
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Tham gia ngay
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View all courses CTA */}
        <div className="text-center mt-12">
          <Link href="/hoc">
            <Button
              variant="outline"
              size="lg"
              className="bg-white border-2 border-indigo-200 hover:bg-gray-50 text-indigo-700 hover:text-indigo-900 px-8 py-4 rounded-xl text-lg font-semibold shadow-sm hover:shadow-md transition-all duration-200"
              data-testid="view-all-courses"
            >
              <TrendingUp className="mr-2 h-5 w-5" />
              Xem tất cả khóa học
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
