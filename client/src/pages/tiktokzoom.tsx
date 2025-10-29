import { Button } from "@/components/ui/button";
import {
  Star,
  TrendingUp,
  DollarSign,
  Play,
  ArrowRight,
  Video,
} from "lucide-react";
import SEO from "@/components/seo";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function TikTokZoom() {
  // Increment view count mutation for landing page
  const incrementViewMutation = useMutation({
    mutationFn: async (slug: string) => {
      return await apiRequest("POST", `/api/landing-views${slug}/view`);
    },
  });

  // Increment view count when page loads
  useEffect(() => {
    // Count every visit for accurate analytics
    incrementViewMutation.mutate('/tiktokzoom');
  }, []);

  return (
    <>
      <SEO 
        title="TikTok Zoom - Từ 0 Follow đến Triệu Đồng trong 4 tuần | Hiếu Suro"
        description="Khóa học TikTok Shop thực chiến với Hiếu Suro. 8 buổi online + 2 buổi offline tại HCM. Học cách xây kênh viral và kiếm tiền triệu từ TikTok Shop."
        keywords="tiktok shop, tiktok zoom, hiếu suro, khóa học tiktok, kiếm tiền tiktok, bán hàng tiktok, tiktok viral"
        ogImage="/attached_assets/hieu-suro-profile.png"
        canonical="https://hieusuro.replit.app/tiktokzoom"
      />
      <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#69C9D0]/5 via-white to-[#EE1D52]/5">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-[#69C9D0]/5 via-transparent to-[#EE1D52]/5 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#69C9D0]/3 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-[#69C9D0]/20 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-[#EE1D52]/20 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-[#69C9D0]/30 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-5 h-5 bg-[#EE1D52]/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Split Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              {/* Left Side - Content */}
              <div className="space-y-8 text-center lg:text-left">
                {/* Badge */}
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#69C9D0]/10 to-[#EE1D52]/10 border border-[#69C9D0]/20 backdrop-blur-sm">
                  <Star className="h-4 w-4 text-[#EE1D52] mr-2" />
                  <span className="text-sm font-semibold text-[#010101]/80">Khóa học #1 về TikTok Shop tại Việt Nam</span>
                </div>

                {/* Main Heading */}
                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-[#010101] leading-tight">
                    Từ{" "}
                    <span className="relative">
                      <span className="bg-gradient-to-r from-[#69C9D0] to-[#EE1D52] bg-clip-text text-transparent">
                        0 Follow
                      </span>
                      <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#69C9D0] to-[#EE1D52] rounded-full"></div>
                    </span>
                  </h1>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-[#010101] leading-tight">
                    Đến{" "}
                    <span className="relative">
                      <span className="bg-gradient-to-r from-[#EE1D52] to-[#69C9D0] bg-clip-text text-transparent">
                        Triệu Đồng
                      </span>
                      <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#EE1D52] to-[#69C9D0] rounded-full"></div>
                    </span>
                  </h1>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#010101]/70">
                    Chỉ trong 4 tuần!
                  </h2>
                </div>

                {/* Description */}
                <p className="text-lg sm:text-xl text-[#010101]/70 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Khóa học TikTok Shop thực chiến - Từ xây kênh viral đến kiếm tiền triệu từ TikTok. 
                  <span className="font-semibold text-[#EE1D52]"> 8 buổi online + 2 buổi offline tại HCM</span>
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    size="lg"
                    className="group relative bg-gradient-to-r from-[#EE1D52] to-[#69C9D0] hover:from-[#EE1D52]/90 hover:to-[#69C9D0]/90 text-white font-bold text-lg px-8 py-6 rounded-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#EE1D52]/30 overflow-hidden"
                    data-testid="button-register-main"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                    <span className="relative flex items-center">
                      🚀 Ghi danh ngay - Chỉ 6.950K
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                  
                  <Button
                    size="lg"
                    variant="outline"
                    className="group border-2 border-[#69C9D0] text-[#69C9D0] hover:bg-[#69C9D0]/10 font-bold text-lg px-8 py-6 rounded-2xl transition-all duration-300 hover:border-[#EE1D52] hover:text-[#EE1D52]"
                    data-testid="button-learn-more-main"
                  >
                    <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Xem chi tiết
                  </Button>
                </div>

                {/* Social Proof Marquee */}
                <div className="flex items-center justify-center lg:justify-start space-x-4 text-sm text-[#010101]/60">
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      {[1,2,3,4,5].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-[#69C9D0] to-[#EE1D52] border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                          {i}
                        </div>
                      ))}
                    </div>
                    <span className="ml-3 font-medium">50+ học viên đã thành công</span>
                  </div>
                </div>
              </div>

              {/* Right Side - Visual Elements */}
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative">
                  {/* Main Glass Card */}
                  <div className="relative w-full max-w-md mx-auto">
                    <div className="bg-white/95 border-2 border-[#69C9D0]/30 rounded-3xl p-8 shadow-2xl">
                      {/* TikTok Icon */}
                      <div className="text-center mb-6">
                        <div className="w-20 h-20 mx-auto bg-gradient-to-r from-[#69C9D0] to-[#EE1D52] rounded-2xl flex items-center justify-center mb-4 shadow-lg transform rotate-3 hover:rotate-6 transition-transform duration-300">
                          <Video className="h-10 w-10 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-[#010101]">TikTok Shop Master</h3>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-3 rounded-xl bg-gradient-to-br from-[#69C9D0]/10 to-[#69C9D0]/5">
                          <div className="text-2xl font-black text-[#69C9D0]">4</div>
                          <div className="text-xs text-[#010101]/70 font-medium">Tuần</div>
                        </div>
                        <div className="text-center p-3 rounded-xl bg-gradient-to-br from-[#EE1D52]/10 to-[#EE1D52]/5">
                          <div className="text-2xl font-black text-[#EE1D52]">8+2</div>
                          <div className="text-xs text-[#010101]/70 font-medium">Buổi</div>
                        </div>
                        <div className="text-center p-3 rounded-xl bg-gradient-to-br from-[#69C9D0]/10 to-[#EE1D52]/10">
                          <div className="text-2xl font-black text-[#010101]">1:1</div>
                          <div className="text-xs text-[#010101]/70 font-medium">Coach</div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm font-medium text-[#010101]/80">
                          <span>Học viên đăng ký</span>
                          <span>47/50</span>
                        </div>
                        <div className="w-full bg-[#010101]/10 rounded-full h-3">
                          <div className="bg-gradient-to-r from-[#69C9D0] to-[#EE1D52] h-3 rounded-full w-[94%] relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                          </div>
                        </div>
                        <p className="text-xs text-[#EE1D52] font-semibold text-center">⚡ Chỉ còn 3 suất cuối!</p>
                      </div>
                    </div>

                    {/* Floating Elements around Card */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#EE1D52] rounded-xl flex items-center justify-center shadow-lg transform rotate-12 animate-pulse">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    
                    <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-[#69C9D0] rounded-lg flex items-center justify-center shadow-lg transform -rotate-12 animate-bounce">
                      <DollarSign className="h-5 w-5 text-white" />
                    </div>
                    
                    <div className="absolute top-1/2 -left-6 w-8 h-8 bg-gradient-to-r from-[#69C9D0] to-[#EE1D52] rounded-full flex items-center justify-center shadow-lg animate-spin" style={{ animationDuration: '4s' }}>
                      <Star className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}