import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Testimonial } from "@shared/schema";
import { useState } from "react";
import { Star, Users, Quote, ChevronDown, Heart } from "lucide-react";

export default function TestimonialsSection() {
  const [visibleCount, setVisibleCount] = useState(6);
  
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const visibleTestimonials = testimonials?.slice(0, visibleCount) || [];
  const hasMore = testimonials && testimonials.length > visibleCount;

  const loadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  if (isLoading) {
    return (
      <section className="py-[4vh] md:py-[8vh] bg-gray-50">
        <div className="container px-4 sm:px-6">
          <div className="flex flex-col items-center justify-center space-y-6 text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700">
              <Heart className="mr-2 h-4 w-4 text-indigo-600" />
              Đánh giá từ học viên
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                Học viên nói gì về{" "}
                <span className="text-indigo-600">
                  Hiếu Suro
                </span>
              </h2>
              <p className="max-w-3xl text-lg md:text-xl text-gray-600 leading-relaxed">
                Hơn <strong>1000+ học viên</strong> đã thành công với các khóa học và mentoring
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-indigo-500 fill-current' : 'text-gray-300'}`} />
    ));
  };

  return (
    <section className="py-[4vh] md:py-[8vh] bg-gray-50">

      <div className="container relative z-10 px-4 sm:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700">
            <Heart className="mr-2 h-4 w-4 text-indigo-600" />
            Đánh giá từ học viên
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
              Học viên nói gì về{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                Hiếu Suro
              </span>
            </h2>
            <p className="max-w-3xl text-lg md:text-xl text-gray-600 leading-relaxed">
              Hơn <strong>1000+ học viên</strong> đã thành công với các khóa học và mentoring
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">1000+</div>
              <div className="text-sm text-gray-600">Học viên</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">4.9⭐</div>
              <div className="text-sm text-gray-600">Đánh giá</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">95%</div>
              <div className="text-sm text-gray-600">Hài lòng</div>
            </div>
          </div>
        </div>
        
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleTestimonials.map((testimonial, index) => (
              <Card 
                key={testimonial.id} 
                className="group bg-white/90 border border-white/40 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-500 p-6 relative overflow-hidden"
              >
                {/* Quote icon */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <Quote className="h-8 w-8 text-purple-600" />
                </div>

                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <img 
                      src={testimonial.avatarUrl || "/attached_assets/hieu-suro-profile.png"} 
                      alt={`${testimonial.name} testimonial`} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg" 
                      loading="lazy"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center space-x-1">
                      {renderStars(testimonial.rating)}
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed relative" data-testid={`testimonial-content-${testimonial.id}`}>
                      "{testimonial.content}"
                    </p>
                    
                    <div className="pt-2 border-t border-white/20">
                      <p className="font-semibold text-gray-900" data-testid={`testimonial-name-${testimonial.id}`}>
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-600" data-testid={`testimonial-title-${testimonial.id}`}>
                        {testimonial.title} {testimonial.company && `• ${testimonial.company}`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Featured badge */}
                {testimonial.featured && (
                  <div className="absolute top-0 left-4">
                    <div className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-b-lg">
                      ⭐ Nổi bật
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
          
          {hasMore && (
            <div className="flex justify-center mt-12">
              <Button 
                variant="outline" 
                onClick={loadMore}
                className="bg-white/80 border-2 border-purple-200 hover:bg-white/90 text-purple-700 hover:text-purple-900 px-8 py-4 rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                data-testid="button-load-more-testimonials"
              >
                <Users className="mr-2 h-5 w-5" />
                Xem thêm đánh giá
                <ChevronDown className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}