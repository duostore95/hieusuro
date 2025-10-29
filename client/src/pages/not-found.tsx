import { useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";
import Header from "@/components/homepage/header";
import Footer from "@/components/homepage/footer";

export default function NotFound() {
  // Set proper SEO meta tags and 404 status
  useEffect(() => {
    // Set page title
    document.title = "404 - Trang không tồn tại | Hiếu Suro";
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Trang bạn tìm kiếm không tồn tại. Quay lại trang chủ để khám phá các khóa học và nội dung từ Hiếu Suro.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Trang bạn tìm kiếm không tồn tại. Quay lại trang chủ để khám phá các khóa học và nội dung từ Hiếu Suro.';
      document.head.appendChild(meta);
    }

    // Set canonical URL  
    const canonicalLink = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (canonicalLink) {
      canonicalLink.href = `${window.location.origin}/404`;
    } else {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = `${window.location.origin}/404`;
      document.head.appendChild(link);
    }

    // Set robots meta tag (noindex for 404 pages)
    const robotsMeta = document.querySelector('meta[name="robots"]');
    if (robotsMeta) {
      robotsMeta.setAttribute('content', 'noindex, follow');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'robots';
      meta.content = 'noindex, follow';
      document.head.appendChild(meta);
    }

    // Set proper HTTP status (this would typically be handled by server, but we set status in document)
    const statusMeta = document.querySelector('meta[name="http-status"]');
    if (!statusMeta) {
      const meta = document.createElement('meta');
      meta.name = 'http-status';
      meta.content = '404';
      document.head.appendChild(meta);
    }

    // Cleanup function to reset meta tags when component unmounts
    return () => {
      document.title = "Hiếu Suro - Chuyên gia E-commerce";
      const desc = document.querySelector('meta[name="description"]');
      if (desc) {
        desc.setAttribute('content', 'Học bán hàng Shopee và TikTok Shop cùng Hiếu Suro. Khóa học ShopeeZoom, Affiliate Shopee và các chiến lược e-commerce hiệu quả.');
      }
      const robots = document.querySelector('meta[name="robots"]');
      if (robots) {
        robots.setAttribute('content', 'index, follow');
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* 404 Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Large 404 Number */}
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent mb-4">
              404
            </h1>
          </div>

          {/* Error Card */}
          <Card className="mb-8 border shadow-sm">
            <CardContent className="p-8">
              <div className="mb-6">
                <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Oops! Không tìm thấy trang này
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên, hoặc tạm thời không khả dụng.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white px-8"
                  data-testid="btn-home"
                >
                  <Link href="/">
                    <Home className="h-5 w-5 mr-2" />
                    Về trang chủ
                  </Link>
                </Button>
                
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg"
                  className="border-primary text-primary hover:bg-primary/5 px-8"
                  data-testid="btn-back"
                  onClick={() => window.history.back()}
                >
                  <span className="cursor-pointer">
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Quay lại
                  </span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Helpful Links */}
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Hoặc bạn có thể khám phá:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/shopeezoom" 
                className="text-primary hover:underline font-medium transition-colors"
                data-testid="link-shopeezoom"
              >
                Khóa học Shopee Zoom
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link 
                href="/" 
                className="text-primary hover:underline font-medium transition-colors"
                data-testid="link-blog"
              >
                Blog & Tài liệu
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Cần hỗ trợ? Liên hệ: <a href="https://zalo.me/0931459459" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Zalo: 0931 459 459</a>
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
