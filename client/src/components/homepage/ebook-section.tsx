import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, BookOpen, CheckCircle, Play, Star, Gift } from "lucide-react";

export default function EbookSection() {
  const handleDownloadEbook = () => {
    // Chuyển hướng đến trang Substack để nhận ebook
    window.open("https://hieusuro.substack.com/", "_blank");
  };

  return (
    <section id="ebook" className="py-[4vh] md:py-[8vh] bg-gray-50">

      <div className="container relative z-10 px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700">
              <Gift className="mr-2 h-4 w-4 text-indigo-600" />
              Miễn phí 100%
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                <span className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                  Shopee Success
                </span>{" "}
                <br />
                Blueprint: 100 đơn quá đơn giản
              </h2>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Nhận ngay cuốn sách điện tử{" "}
                <span className="font-semibold text-gray-900">
                  120+ trang
                </span>{" "}
                với những chiến lược bán hàng Shopee được chứng minh hiệu quả từ các kinh nghiệm của Hiếu.
              </p>
            </div>

            {/* Features list */}
            <div className="space-y-4">
              {[
                { icon: CheckCircle, text: "7 bước từ 0 lên 100 đơn trên shopee" },
                { icon: BookOpen, text: "Nhiều kinh nghiệm đúc kết từ Hiếu" },
                { icon: Star, text: "Case study 7000+ đơn hàng từ Hiếu" },
                { icon: Play, text: "Bonus: nhiều thứ hay ho trong đó" }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-4 group">
                  <div className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <span className="text-gray-700 font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:flex sm:space-x-8 py-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">120+</div>
                <div className="text-sm text-gray-600">Trang nội dung</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">1000+</div>
                <div className="text-sm text-gray-600">Lượt tải</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">5⭐</div>
                <div className="text-sm text-gray-600">Đánh giá</div>
              </div>
            </div>
          </div>

          {/* Download Card */}
          <div className="relative">
            <Card className="group bg-white/90 border border-white/40 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
              {/* Card background gradient */}
              
              <CardContent className="relative z-10 p-8">
                <div className="space-y-6 text-center">
                  {/* Book icon */}
                  <div className="mx-auto w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center">
                    <BookOpen className="h-10 w-10 text-white" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-gray-900">Tải ngay <span className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">miễn phí</span></h3>
                    <p className="text-gray-600 leading-relaxed">
                      Nhận ngay cuốn sách điện tử{" "}
                      <span className="font-semibold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">Shopee Success Blueprint: 100 đơn quá đơn giản</span>
                    </p>
                  </div>
                  
                  <Button 
                    onClick={handleDownloadEbook}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 py-4 text-lg font-semibold"
                    data-testid="button-download-ebook"
                  >
                    <Download className="mr-3 h-5 w-5 group-hover:animate-bounce" />
                    Tải ngay miễn phí
                  </Button>
                  
                  <p className="text-sm text-gray-500 bg-gray-100 rounded-lg px-4 py-2">
                    💡 Click để chuyển đến trang tải xuống
                  </p>

                  {/* Trust indicators */}
                  <div className="flex items-center justify-center space-x-2 pt-4">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 font-medium">4.9/5 từ 500+ reviews</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Floating elements */}
          </div>
        </div>
      </div>
    </section>
  );
}