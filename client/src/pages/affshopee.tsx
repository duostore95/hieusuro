import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  Clock,
  Users,
  Star,
  Target,
  Zap,
  TrendingUp,
  Gift,
  BookOpen,
  UserCheck,
  ShoppingCart,
  Briefcase,
  DollarSign,
  Laptop,
  Award,
  Heart,
  MessageCircle,
  Calendar,
  Timer,
  CreditCard,
  QrCode,
  ChevronDown,
  Trophy,
  Play,
  ArrowRight,
  Coins,
  TrendingDown,
  Building,
  GraduationCap,
  Search,
  BarChart3,
  Image,
  Globe,
  Settings,
  Smartphone,
  Share2,
  Link,
  Camera,
  Video,
  ChevronLeft,
  ChevronRight,
  Megaphone,
  PieChart,
  TrendingUpIcon,
  Percent,
  MousePointer,
  Eye,
  RefreshCw,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/seo";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

// Hieu's Results Carousel Component
function ResultsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 3 },
    },
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // 12 result images of Hieu - Replace HIEU_RESULT_URL_X with actual URLs
  const hieuResultImages = [
    { id: 1, url: "HIEU_RESULT_URL_1", alt: "Kết quả Hiếu 1" },
    { id: 2, url: "HIEU_RESULT_URL_2", alt: "Kết quả Hiếu 2" },
    { id: 3, url: "HIEU_RESULT_URL_3", alt: "Kết quả Hiếu 3" },
    { id: 4, url: "HIEU_RESULT_URL_4", alt: "Kết quả Hiếu 4" },
    { id: 5, url: "HIEU_RESULT_URL_5", alt: "Kết quả Hiếu 5" },
    { id: 6, url: "HIEU_RESULT_URL_6", alt: "Kết quả Hiếu 6" },
    { id: 7, url: "HIEU_RESULT_URL_7", alt: "Kết quả Hiếu 7" },
    { id: 8, url: "HIEU_RESULT_URL_8", alt: "Kết quả Hiếu 8" },
    { id: 9, url: "HIEU_RESULT_URL_9", alt: "Kết quả Hiếu 9" },
    { id: 10, url: "HIEU_RESULT_URL_10", alt: "Kết quả Hiếu 10" },
    { id: 11, url: "HIEU_RESULT_URL_11", alt: "Kết quả Hiếu 11" },
    { id: 12, url: "HIEU_RESULT_URL_12", alt: "Kết quả Hiếu 12" },
  ];

  return (
    <div className="relative">
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {hieuResultImages.map((image) => (
            <div
              key={image.id}
              className="embla__slide flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-2"
            >
              <div className="relative group">
                <div className="aspect-[3/4] bg-gradient-to-br from-orange-100 to-pink-100 rounded-xl border-2 border-pink-200 hover:border-pink-400 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-[1.02]">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    data-testid={`hieu-result-image-${image.id}`}
                  />
                </div>

                {/* Overlay with zoom effect on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <Search className="h-5 w-5 text-gray-700" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white border border-orange-200 hover:border-orange-400 text-orange-600 rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transition-all duration-300 z-10"
        data-testid="hieu-carousel-prev-button"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white border border-orange-200 hover:border-orange-400 text-orange-600 rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transition-all duration-300 z-10"
        data-testid="hieu-carousel-next-button"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Instructions */}
      <div className="text-center mt-6">
        <p className="text-gray-500 text-sm">
          ← Vuốt qua trái/phải để xem thêm kết quả →
        </p>
      </div>
    </div>
  );
}

// Student Results Carousel Component
function StudentResultsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 3 },
    },
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // 12 student result images - Replace STUDENT_RESULT_URL_X with actual URLs
  const studentResultImages = [
    { id: 1, url: "STUDENT_RESULT_URL_1", alt: "Kết quả học viên 1" },
    { id: 2, url: "STUDENT_RESULT_URL_2", alt: "Kết quả học viên 2" },
    { id: 3, url: "STUDENT_RESULT_URL_3", alt: "Kết quả học viên 3" },
    { id: 4, url: "STUDENT_RESULT_URL_4", alt: "Kết quả học viên 4" },
    { id: 5, url: "STUDENT_RESULT_URL_5", alt: "Kết quả học viên 5" },
    { id: 6, url: "STUDENT_RESULT_URL_6", alt: "Kết quả học viên 6" },
    { id: 7, url: "STUDENT_RESULT_URL_7", alt: "Kết quả học viên 7" },
    { id: 8, url: "STUDENT_RESULT_URL_8", alt: "Kết quả học viên 8" },
    { id: 9, url: "STUDENT_RESULT_URL_9", alt: "Kết quả học viên 9" },
    { id: 10, url: "STUDENT_RESULT_URL_10", alt: "Kết quả học viên 10" },
    { id: 11, url: "STUDENT_RESULT_URL_11", alt: "Kết quả học viên 11" },
    { id: 12, url: "STUDENT_RESULT_URL_12", alt: "Kết quả học viên 12" },
  ];

  return (
    <div className="relative">
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {studentResultImages.map((image) => (
            <div
              key={image.id}
              className="embla__slide flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-2"
            >
              <div className="relative group">
                <div className="aspect-[3/4] bg-gradient-to-br from-orange-100 to-pink-100 rounded-xl border-2 border-pink-200 hover:border-pink-400 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-[1.02]">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    data-testid={`student-result-image-${image.id}`}
                  />
                </div>

                {/* Overlay with zoom effect on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <Search className="h-5 w-5 text-gray-700" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white border border-orange-200 hover:border-orange-400 text-orange-600 rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transition-all duration-300 z-10"
        data-testid="student-carousel-prev-button"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white border border-orange-200 hover:border-orange-400 text-orange-600 rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transition-all duration-300 z-10"
        data-testid="student-carousel-next-button"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Instructions */}
      <div className="text-center mt-6">
        <p className="text-gray-500 text-sm">
          ← Vuốt qua trái/phải để xem thêm kết quả →
        </p>
      </div>
    </div>
  );
}

export default function AffiliateShopee() {
  const { toast } = useToast();

  // Increment view count mutation for landing page
  const incrementViewMutation = useMutation({
    mutationFn: async (slug: string) => {
      return await apiRequest("POST", `/api/landing-views${slug}/view`);
    },
  });

  // Increment view count when page loads
  useEffect(() => {
    // Count every visit for accurate analytics
    incrementViewMutation.mutate("/affshopee");
  }, []);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Animated counters
  const [earningsCounter, setEarningsCounter] = useState(0);
  const [studentsCounter, setStudentsCounter] = useState(0);
  const [marketCounter, setMarketCounter] = useState(0);
  const [commissionCounter, setCommissionCounter] = useState(10);

  // Fixed income range (10-50 triệu/tháng)
  const [minIncome] = useState(10);
  const [maxIncome] = useState(50);

  // State for selected pricing package
  const [selectedPackage, setSelectedPackage] = useState({
    name: "Affiliate Shopee Pro",
    price: "3990K",
    fullAmount: "3.990.000 VND",
    qrCode: "/attached_assets/IMG_D728348A456C-1_1760458629964.jpeg",
  });

  // Voucher game state
  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const [showVoucher, setShowVoucher] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpunBefore, setHasSpunBefore] = useState(false);
  const [voucherUpgraded, setVoucherUpgraded] = useState(false);
  const [originalVoucher, setOriginalVoucher] = useState(0);

  // Countdown timer
  useEffect(() => {
    const targetDate = new Date("2025-10-15T20:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Animate counters on mount
  useEffect(() => {
    const animateCounter = (
      setter: React.Dispatch<React.SetStateAction<number>>,
      target: number,
      duration: number,
    ) => {
      const start = 0;
      const increment = target / (duration / 16);
      let current = start;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(current));
        }
      }, 16);
    };

    setTimeout(() => animateCounter(setEarningsCounter, 50, 2000), 500);
    setTimeout(() => animateCounter(setStudentsCounter, 56, 2000), 800);
    setTimeout(() => animateCounter(setMarketCounter, 1800, 2000), 1100);
    setTimeout(() => animateCounter(setCommissionCounter, 30, 2000), 1400);
  }, []);

  // Check localStorage for previous voucher spin
  useEffect(() => {
    try {
      const savedVoucher = localStorage.getItem("voucherSpinData");
      if (savedVoucher) {
        const { discount, originalDiscount, timestamp } =
          JSON.parse(savedVoucher);
        setVoucherDiscount(discount);
        setOriginalVoucher(originalDiscount || discount);
        setShowVoucher(true);
        setHasSpunBefore(true);
      }
    } catch (error) {
      // If localStorage data is corrupted, clear it
      localStorage.removeItem("voucherSpinData");
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle voucher spin game
  const handleVoucherSpin = () => {
    if (showVoucher || hasSpunBefore) return; // Already claimed

    setIsSpinning(true);

    // Simulate spinning animation
    setTimeout(() => {
      // Generate random discount: 1000-1500K in steps of 20K
      // 1000K, 1020K, 1040K... 1480K, 1500K
      // In units of 10K: 100, 102, 104... 148, 150
      const minDiscount = 100; // 1000K / 10
      const maxDiscount = 150; // 1500K / 10
      const step = 2; // 20K / 10
      const numSteps = (maxDiscount - minDiscount) / step; // 25 steps (0-25 = 26 values)
      const randomStep = Math.floor(Math.random() * (numSteps + 1)); // 0 to 25
      const randomDiscount = minDiscount + randomStep * step;

      // Save to localStorage
      const voucherData = {
        discount: randomDiscount,
        originalDiscount: randomDiscount,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem("voucherSpinData", JSON.stringify(voucherData));

      setVoucherDiscount(randomDiscount);
      setOriginalVoucher(randomDiscount);
      setShowVoucher(true);
      setHasSpunBefore(true);
      setIsSpinning(false);
    }, 2000);
  };

  // Smart voucher adjustment based on selected package
  const adjustVoucherForPackage = (
    packageName: string,
    currentVoucher: number,
  ) => {
    // Pro (3990K): Voucher range 1000-1500K gives final price 2490-2990K
    // No adjustment needed as the voucher range already fits well
  };

  // Calculate final price after discount
  const calculateFinalPrice = (originalPrice: string, discount: number) => {
    const price = parseInt(originalPrice.replace(/[^\d]/g, ""));
    // discount is stored as units of 10K (e.g., 30 = 300K)
    const finalPrice = price - discount * 10000;
    return finalPrice.toLocaleString("vi-VN");
  };

  // Data structures
  const painPoints = [
    {
      title: "Không có thu nhập thụ động từ Online",
      description:
        "Làm việc 8-10h/ngày nhưng thu nhập dừng lại khi nghỉ việc. Không có nguồn thu tay trái. Không có sự dự phòng cho tương lai",
      icon: <Clock className="h-8 w-8" />,
      color: "from-orange-500 to-pink-500",
    },
    {
      title: "Rất muốn khởi nghiệp nhưng thiếu vốn",
      description:
        "Muốn kinh doanh online nhưng không có vốn mua hàng, thuê kho, vận hành... Rủi ro tồn kho cao.",
      icon: <DollarSign className="h-8 w-8" />,
      color: "from-orange-500 to-pink-500",
    },
    {
      title: "Không biết bắt đầu từ đâu trên hành trình này",
      description:
        "Nghe về Affiliate Shopee nhưng không biết làm thế nào, đăng ký sao, làm sao có hoa hồng..",
      icon: <Search className="h-8 w-8" />,
      color: "from-orange-500 to-pink-500",
    },
    {
      title: "Sợ sự cạnh tranh khốc liệt đến từ thị trường",
      description:
        "Nghĩ thị trường đã bão hòa, nhiều người làm quá rồi. Không tự tin rằng có thể mình sẽ làm được.",
      icon: <Users className="h-8 w-8" />,
      color: "from-orange-500 to-pink-500",
    },
    {
      title: "Không có ai hỗ trợ trên con đường này",
      description:
        "Tự mò mẫm, không có mentor dẫn dắt. Gặp vấn đề không biết hỏi ai, dễ nản lòng và bỏ cuộc.",
      icon: <MessageCircle className="h-8 w-8" />,
      color: "from-orange-500 to-pink-500",
    },
    {
      title: "Cóp nhặt kiến thức tùm lum ở nhiều nơi",
      description:
        "Học lung tung từ YouTube, Facebook, TikTok... Thông tin lúc đúng lúc sai, không có lộ trình rõ ràng.",
      icon: <RefreshCw className="h-8 w-8" />,
      color: "from-orange-500 to-pink-500",
    },
  ];

  const hieuResults = [
    {
      metric: "100M+",
      description: "Thu nhập từ affiliate shopee",
      details: "Duy nhất từ nền tảng Shopee",
    },
    {
      metric: "56+",
      description: "Học viên đã thành công",
      details: `Thu nhập trung bình ${minIncome}-${maxIncome}M/tháng`,
    },
    {
      metric: "500.000+",
      description: "Follow trên các nền tảng",
      details: "Facebook, TikTok, YouTube",
    },
    {
      metric: "9 năm",
      description: "Kinh nghiệm affiliate",
      details: "Từ VN đến các nước ngoài",
    },
  ];

  const targetAudience = [
    {
      title: "Nhân viên văn phòng",
      description:
        "Muốn kiếm thêm thu nhập từ online bên cạnh công việc chính. Để có thêm đồng ra đồng vào",
      icon: <Briefcase className="h-8 w-8" />,
      examples: [
        "Nhân viên IT",
        "Kế toán",
        "Marketing",
        "Sales",
        "Ngành nào cũng được",
      ],
    },
    {
      title: "Mẹ bỉm sữa",
      description:
        "Ở nhà chăm con, muốn kiếm tiền online từ nhà. Có thể làm việc linh hoạt theo giờ.",
      icon: <Heart className="h-8 w-8" />,
      examples: ["Nghỉ thai sản", "Freelancer", "Nội trợ", "Làm Part-time"],
    },
    {
      title: "Sinh viên",
      description:
        "Muốn kiếm tiền thêm trong thời gian học. Cần kỹ năng affiliate marketing cho tương lai.",
      icon: <GraduationCap className="h-8 w-8" />,
      examples: [
        "Sinh viên đại học",
        "Học nghề",
        "Thực tập sinh",
        "Fresh graduate",
      ],
    },
    {
      title: "Chủ shop, KOC/KOL",
      description:
        "Đã có tệp khách sẵn, muốn làm hiệu quả hơn. Tăng thu nhập từ follower hiện tại.",
      icon: <Megaphone className="h-8 w-8" />,
      examples: ["Chủ Shop", "Influencer", "Content creator", "Blogger"],
    },
  ];

  const detailedSkills = [
    {
      category: "Hiểu rõ nền tảng Affiliate Shopee",
      skills: [
        "Nắm vững cơ chế hoạt động & cách Shopee ghi nhận đơn hàng (tránh mất hoa hồng oan)",
        "Đăng ký & thiết lập tài khoản Affiliate đúng chuẩn ngay từ đầu",
        "Biết cách lấy link, tạo shortlink, tracking click như một người chuyên nghiệp",
        "Hiểu & sử dụng các công cụ tracking của Shopee để quản lý hiệu quả chiến dịch",
        "Đọc hiểu báo cáo Shopee, phân tích hành vi khách hàng & sản phẩm hot",
      ],
      icon: <BookOpen className="h-8 w-8" />,
      color: "from-orange-500 to-pink-500",
    },
    {
      category: "Cách xây kênh mạng xã hội kiếm đơn",
      skills: [
        "Biết nghiên cứu thị trường & chọn sản phẩm bán tốt, đúng nhu cầu người mua",
        "Phân tích đối thủ & xu hướng, tìm cơ hội trước khi thị trường bão hòa",
        "Chọn sản phẩm có hoa hồng cao (8–30%) và khả năng chuyển đổi tốt",
        "Validate (kiểm chứng) ý tưởng sản phẩm trước khi promote, tránh làm vô ích",
        "Xây database sản phẩm hot để làm Affiliate bền, không phụ thuộc trend ngắn hạn",
      ],
      icon: <Search className="h-8 w-8" />,
      color: "from-orange-500 to-pink-500",
    },
    {
      category: "Content Creation & Marketing",
      skills: [
        "Tạo content viral trên TikTok, Facebook, Threads và Instagram mà không cần nổi tiếng",
        "Viết review sản phẩm thuyết phục, tăng CTR & tỷ lệ chuyển đổi",
        "Biết cách dùng AI tools (ChatGPT, Notion AI, Canva AI...) để rút ngắn thời gian làm content",
        "Nắm kỹ thuật quay – dựng video ngắn, livestream, review sản phẩm",
        "Biết cách SEO nội dung affiliate để có traffic tự nhiên, đều và bền",
      ],
      icon: <Camera className="h-8 w-8" />,
      color: "from-orange-500 to-pink-500",
    },
    {
      category: "Traffic & Scaling Strategies",
      skills: [
        "Cài đặt & tối ưu Facebook Ads cho affiliate (setup – test – scale)",
        "Hiểu Google Ads keyword research và chạy chiến dịch sản phẩm affiliate",
        "Biết cách xây cộng đồng riêng (group, email list) để nuôi tệp và tăng đơn đều",
        "Ứng dụng automation tools để tự động hóa chia sẻ link & scale doanh thu 10x",
        "Đọc số, phân tích dữ liệu & tối ưu hiệu suất chiến dịch như một marketer chuyên nghiệp",
      ],
      icon: <TrendingUp className="h-8 w-8" />,
      color: "from-orange-500 to-pink-500",
    },
  ];

  const specialGifts = [
    {
      name: "Tools Affiliate Pro",
      value: "5.000.000 VNĐ",
      description:
        "Bộ công cụ tự động hóa affiliate marketing, tracking links, analytics",
      icon: <Settings className="h-8 w-8" />,
    },
    {
      name: "Template Content Creator",
      value: "2.500.000 VNĐ",
      description:
        "1000+ template thiết kế content cho social media, video script",
      icon: <Image className="h-8 w-8" />,
    },
    {
      name: "Database sản phẩm Hot",
      value: "3.000.000 VNĐ",
      description: "10.000+ sản phẩm hot trend, commission cao, đã được test",
      icon: <BarChart3 className="h-8 w-8" />,
    },
    {
      name: "Khóa TikTok Affiliate",
      value: "4.990.000 VNĐ",
      description:
        "Chiến lược làm affiliate trên TikTok, viral content, live stream",
      icon: <Video className="h-8 w-8" />,
    },
  ];

  const curriculumStages = [
    {
      stage: "Module 1",
      title: "Hiểu đúng về Affiliate Shopee",
      duration: "Nền tảng & Tư duy",
      details: [
        "Affiliate Shopee là gì? Cách hệ thống ghi nhận đơn hàng và trả hoa hồng",
        "Phân biệt giữa Affiliate, KOL, Seller và Reviewer",
        "4 cách kiếm tiền từ Shopee Affiliate (tự làm, team, cộng đồng, content)",
        "Giải thích toàn bộ quy trình: từ click → đơn → duyệt → thanh toán",
        "Những hiểu lầm khiến 90% người mới thất bại khi làm affiliate",
      ],
    },
    {
      stage: "Module 2",
      title: "Thiết lập tài khoản & công cụ",
      duration: "Cơ bản",
      details: [
        "Hướng dẫn đăng ký tài khoản Shopee Affiliate (qua Shopee Uni & AccessTrade)",
        "Cách lấy link, tạo short link & theo dõi hiệu suất từng link",
        "Giải thích các chỉ số quan trọng trong dashboard (click, conversion, hoa hồng...)",
        "Cách xử lý lỗi: có đơn nhưng không ghi nhận hoa hồng / đơn bị hủy / hoa hồng 0đ",
        "Hướng dẫn rút tiền, xác minh danh tính, và quản lý thu nhập",
      ],
    },
    {
      stage: "Module 3",
      title: "Hiểu thuật toán Shopee",
      duration: "Chọn sản phẩm dễ ra đơn",
      details: [
        "Cơ chế ghi nhận đơn của Shopee – vì sao có người có đơn, có người không",
        "Cookie & Tracking – hiểu sâu để không mất đơn oan",
        "Cách chọn sản phẩm dễ ra đơn cho người mới (theo 3 tiêu chí: nhu cầu cao – giá tốt – deal lớn)",
        "Những sản phẩm nên tránh khi mới bắt đầu (và vì sao)",
        "Thời điểm vàng để chia sẻ link (chiến thuật theo ngày, tuần, tháng)",
      ],
    },
    {
      stage: "Module 4",
      title: "Kéo traffic miễn phí",
      duration: "Không cần chạy ads",
      details: [
        "Tổng quan 6 kênh kéo traffic phổ biến (TikTok, Facebook, Threads, Zalo, YouTube, Telegram)",
        "Cách chọn 1 nền tảng phù hợp với bạn (phân tích theo thế mạnh cá nhân)",
        "Tạo profile tối ưu để tăng CTR khi người khác click vào bio",
        "Hướng dẫn chi tiết: Làm 1 post Affiliate mẫu có thể ra đơn ngay",
        "Cách seeding, tương tác, và duy trì reach tự nhiên mỗi ngày",
      ],
    },
    {
      stage: "Module 5",
      title: "Làm content Affiliate",
      duration: "Hút click & ra đơn",
      details: [
        "10 dạng content dễ ra đơn nhất (review, top list, so sánh, trải nghiệm, deal hot...)",
        "Cấu trúc 1 bài post affiliate hiệu quả (Hook – Value – CTA)",
        "Mẫu caption tăng CTR & mẫu video 30s dễ viral",
        "Cách dùng ChatGPT để viết caption / script affiliate trong 1 phút",
        "Case study: Phân tích 3 post affiliate thực tế ra đơn rất tốt",
      ],
    },
    {
      stage: "Module 6",
      title: "Chiến lược ra đơn đầu tiên",
      duration: "Trong 7 ngày",
      details: [
        "Kế hoạch 7 ngày ra đơn đầu tiên (chi tiết từng ngày)",
        "Checklist 10 việc cần làm trước khi chia sẻ link",
        "Cách tạo mini site affiliate (LinkBio / Notion / beacons.ai) để gom traffic",
        "Cách test sản phẩm nhanh & đánh giá hiệu quả post",
        'Cách duy trì động lực và vượt qua "khoảng trống trước đơn đầu tiên"',
      ],
    },
    {
      stage: "Module 7",
      title: "Xây thương hiệu cá nhân",
      duration: "Nhân bản hệ thống",
      details: [
        "Vì sao cần xây thương hiệu cá nhân khi làm affiliate",
        "Cách chọn niche (ngách) để phát triển lâu dài",
        "Chiến lược đăng đều & xây tệp người xem trung thành",
        "Cách tạo cộng đồng riêng để gom đơn & seeding",
        "Cách nhân bản: quản lý nhiều link, team hoặc kênh affiliate",
      ],
    },
    {
      stage: "Module 8",
      title: "Tư duy & con đường bền vững",
      duration: "Trong Affiliate",
      details: [
        "Vì sao 90% người bỏ cuộc và 10% còn lại kiếm rất nhiều tiền",
        "Cách đo lường hiệu quả mỗi tháng & lập kế hoạch phát triển",
        "Tư duy kiếm tiền bền vững: Affiliate là kênh, không phải cứu cánh",
        "Hướng đi nâng cao: Làm affiliate kết hợp bán sản phẩm / tạo khóa học / KOC",
        "Tổng kết hành trình & roadmap 90 ngày sau khóa học",
      ],
    },
  ];

  const whyChooseReasons = [
    {
      title: "Duy nhất tại Việt Nam",
      description:
        "Khóa học Affiliate Shopee A-Z đầu tiên và duy nhất tại VN, được giảng dạy bởi Top Affiliate earner",
      icon: <Trophy className="h-12 w-12" />,
    },
    {
      title: "Thu nhập thụ động thực sự",
      description:
        "Học cách xây dựng hệ thống affiliate tự động, kiếm tiền 24/7 ngay cả khi ngủ",
      icon: <Coins className="h-12 w-12" />,
    },
    {
      title: "Không cần vốn đầu tư",
      description:
        "Bắt đầu với 0đ, chỉ cần smartphone và internet. Không cần kho hàng, không lo ship",
      icon: <Smartphone className="h-12 w-12" />,
    },
    {
      title: "Hỗ trợ 1-1 trọn đời",
      description:
        "Team mentor hỗ trợ 24/7, review chiến lược cá nhân, troubleshoot mọi vấn đề",
      icon: <UserCheck className="h-12 w-12" />,
    },
  ];

  const testimonials = [
    {
      name: "Minh Anh",
      location: "Hà Nội",
      avatar: "MA",
      rating: 5,
      profession: "Nhân viên IT",
      feedback:
        "Mình làm dev trong một công ty ở Hà Nội lương 15 triệu. Tìm hiểu affiliate để có thêm thu nhập thụ động. Khóa học của anh Hiếu dạy rất chi tiết, từ cách tạo content viral đến phân tích sản phẩm hot trend. Áp dụng được 3 tháng, mình đã kiếm thêm 29 triệu/tháng. Bây giờ thu nhập từ affiliate còn cao hơn lương chính, đang cân nhắc làm freelance để tập trung affiliate nhiều hơn.",
    },
    {
      name: "Thu Hiền",
      location: "TP.HCM",
      avatar: "TH",
      rating: 5,
      profession: "Mẹ bỉm sữa",
      feedback:
        "Mình nghỉ việc để ở nhà chăm 2 con nhỏ, muốn kiếm tiền mà không cần ra ngoài. Học affiliate shopee với anh Hiếu thực sự cứu tinh! Chỉ làm 2-3 tiếng buổi tối khi con ngủ, tháng đầu mình kiếm được 18 triệu. Giờ sau 5 tháng đã ổn định 45 triệu/tháng. Các chiến lược content và automation trong khóa học rất phù hợp với mẹ bỉm như mình.",
    },
    {
      name: "Đức Minh",
      location: "Đà Nẵng",
      avatar: "DM",
      rating: 5,
      profession: "Tài xế Grab",
      feedback:
        "Tớ chạy grab cả ngày mà thu nhập không ổn định lắm. Nghe bạn bè kể về affiliate nên quyết định đầu tư học. Khóa học của anh Hiếu thực chiến 100%, không lý thuyết suông. Anh dạy cách tận dụng thời gian rảnh giữa các chuyến để làm affiliate. Hiện tại tớ kiếm thêm 24 triệu/tháng từ affiliate, cuộc sống đỡ áp lực hơn nhiều.",
    },
    {
      name: "Lan Anh",
      location: "Cần Thơ",
      avatar: "LA",
      rating: 5,
      profession: "Giáo viên tiểu học",
      feedback:
        "Mình dạy học lương 12 triệu nhưng vẫn khó khăn với chi tiêu gia đình. Học affiliate shopee để tăng thu nhập. Anh Hiếu hướng dẫn rất tỉ mỉ từ setup tài khoản đến chiến lược content marketing. Mình đặc biệt thích phần psychology triggers và copywriting. Sau 4 tháng đã có thêm 31 triệu/tháng, giờ cuộc sống thoải mái hơn rất nhiều.",
    },
    {
      name: "Quang Vinh",
      location: "Hải Phòng",
      avatar: "QV",
      rating: 5,
      profession: "Nhân viên ngân hàng",
      feedback:
        "Tớ làm ngân hàng ca văn phòng, muốn có thu nhập thụ động để đầu tư bất động sản. Khóa học này giúp tớ hiểu rõ cơ chế affiliate marketing từ A-Z. Database sản phẩm hot và templates content rất hữu ích. Tháng đầu 8 triệu, tháng thứ 6 đã lên 38 triệu. Đúng như anh Hiếu nói, affiliate là cách tốt nhất để tạo passive income.",
    },
    {
      name: "Hương Giang",
      location: "Vũng Tàu",
      avatar: "HG",
      rating: 5,
      profession: "Kỹ thuật viên spa",
      feedback:
        "Mình làm spa có thời gian rảnh giữa ca. Nghe nói affiliate shopee kiếm được tiền nên tìm hiểu. Khóa học của anh Hiếu dễ hiểu, dễ áp dụng. Anh dạy cách tạo content thu hút và tối ưu conversion rate. Từ zero kiến thức, giờ mình đã kiếm được 22 triệu/tháng. Plan trong năm nay sẽ mở spa riêng nhờ tiền từ affiliate.",
    },
    {
      name: "Văn Tuấn",
      location: "Nha Trang",
      avatar: "VT",
      rating: 5,
      profession: "Kỹ sư xây dựng",
      feedback:
        "Tớ làm kỹ sư dự án, công việc khá stress. Muốn có thêm thu nhập để đỡ áp lực. Affiliate shopee là lựa chọn tốt vì không cần vốn. Khóa học này dạy rất chi tiết về traffic generation và scaling. Tớ đặc biệt thích phần facebook ads và seo content. Hiện tại kiếm thêm 35 triệu/tháng, đang cân nhắc chuyển sang làm affiliate full-time.",
    },
    {
      name: "Ngọc Mai",
      location: "Huế",
      avatar: "NM",
      rating: 5,
      profession: "Y tá",
      feedback:
        "Mình làm y tá ca đêm, ban ngày rảnh muốn kiếm thêm. Học affiliate để tận dụng thời gian nghỉ. Anh Hiếu dạy cách làm automation để không tốn quá nhiều thời gian. Phần content strategy và engagement techniques rất hay. Từ newbie hoàn toàn, giờ mình có 27 triệu/tháng từ affiliate. Thu nhập ổn định hơn lương chính.",
    },
    {
      name: "Thanh Tùng",
      location: "Thái Nguyên",
      avatar: "TT",
      rating: 5,
      profession: "Nhân viên sales",
      feedback:
        "Tớ làm sales bất động sản thu nhập theo mùa, không ổn định. Học affiliate để có passive income. Khóa học này comprehensive nhất từ trước đến giờ. Anh Hiếu share cả những tips nhỏ mà hiệu quả lớn. Advanced strategies và case studies thực tế rất bổ ích. 4 tháng đã ROI x10 và kiếm ổn định 42 triệu/tháng từ affiliate.",
    },
    {
      name: "Bích Ngọc",
      location: "Bình Dương",
      avatar: "BN",
      rating: 5,
      profession: "Nhân viên kế toán",
      feedback:
        "Mình làm kế toán lương cố định 14 triệu, muốn có thêm thu nhập để mua nhà. Affiliate shopee là cơ hội tốt. Khóa học dạy cách tối ưu thời gian, chỉ cần 1-2 tiếng mỗi tối. Tools automation và content templates rất tiện. Từ tháng đầu 5 triệu đến tháng thứ 5 đã 33 triệu. Giờ đã đủ tiền trả góp căn hộ đầu tiên.",
    },
    {
      name: "Hoàng Linh",
      location: "Quảng Ninh",
      avatar: "HL",
      rating: 5,
      profession: "Công chức",
      feedback:
        "Tớ làm công chức lương ổn định nhưng không cao. TC�m hiểu affiliate để tăng thu nhập. Khóa học này dạy từ mindset đến skillset rất đầy đủ. Phần research sản phẩm và competitor analysis giúp tớ chọn đúng niche. Hiện tại đã có 19 triệu/tháng từ affiliate, đang scale lên 50 triệu trong quý tới.",
    },
    {
      name: "Minh Tuấn",
      location: "Bạc Liêu",
      avatar: "MT",
      rating: 5,
      profession: "Nông dân",
      feedback:
        "Mình trồng lúa ở quê, mùa không có gì làm nên học affiliate. Ban đầu lo không biết công nghệ nhưng anh Hiếu dạy dễ hiểu lắm. Video hướng dẫn step by step, tools cũng đơn giản. Giờ mình kiếm được 16 triệu/tháng từ affiliate, bằng cả vụ mùa. Dự định mở rộng quy mô để có thu nhập cao hơn.",
    },
    {
      name: "Thùy Dung",
      location: "Hà Giang",
      avatar: "TD",
      rating: 5,
      profession: "Sinh viên đại h b�c",
      feedback:
        "Tớ sinh viên năm 3, muốn kiếm tiền tự lo học phí. Affiliate shopee không cần vốn nên phù hợp. Khóa học này dạy cách balance time giữa học và làm affiliate. Content creation strategies rất phù hợp với gen Z. Chỉ làm cuối tuần và tối, tớ đã kiếm được 12 triệu/tháng. Đủ trang trải học phí và chi tiêu cá nhân.",
    },
    {
      name: "Văn Hải",
      location: "An Giang",
      avatar: "VH",
      rating: 5,
      profession: "Thợ điện",
      feedback:
        "Tớ làm thợ điện thu nhập theo dự án, có khi rảnh có khi bận. Học affiliate để có thu nhập đều hơn. Khóa học dạy cách setup system để chạy tự động. Anh Hiếu chia sẻ rất thực tế, không hoa mỹ. Giờ tớ có 21 triệu/tháng ổn định từ affiliate, cuộc sống bớt lo lắng hơn nhiều.",
    },
    {
      name: "Thanh Huyền",
      location: "Nghệ An",
      avatar: "TH",
      rating: 5,
      profession: "Nhân viên marketing",
      feedback:
        "Mình làm marketing cho một công ty nhỏ ở Vinh. Muốn apply kiến thức marketing vào affiliate để kiếm thêm. Khóa học này complement perfect với background của mình. Từ funnel optimization đến data analytics đều được cover chi tiết. Nhờ kinh nghiệm marketing sẵn có, mình scale nhanh và đạt 48 triệu/tháng chỉ sau 3 tháng.",
    },
    {
      name: "Quốc Hưng",
      location: "Kiên Giang",
      avatar: "QH",
      rating: 5,
      profession: "Shipper",
      feedback:
        "Tớ chạy ship cả ngày, thấy nhiều seller bán hàng online kiếm khá. Tìm hiểu thì affiliate dễ hơn vì không cần lo hàng hóa. Khóa học của anh Hiếu dạy cách tận dụng network và social proof. Phần mobile optimization rất hay vì tớ chủ yếu làm trên điện thoại. Hiện tại kiếm thêm 18 triệu/tháng từ affiliate.",
    },
    {
      name: "Kim Liên",
      location: "Hà Nam",
      avatar: "KL",
      rating: 5,
      profession: "Thợ may",
      feedback:
        "Mình may gia công ở nhà, công việc mùa vụ lắm. Nghe con gái nói về affiliate nên thử học. Tuy tuổi hơi lớn nhưng khóa học dễ hiểu, video hướng dẫn chi tiết. Anh Hiếu hỗ trợ rất nhiệt tình. Giờ mình làm affiliate lúc rảnh và kiếm được 14 triệu/tháng. Thu nhập ổn định hơn may gia công nhiều.",
    },
    {
      name: "Đức Thành",
      location: "Quảng Bình",
      avatar: "DT",
      rating: 5,
      profession: "Nhân viên bảo vệ",
      feedback:
        "Tớ làm bảo vệ ca đêm, ngày rảnh muốn kiếm thêm thu nhập. Affiliate shopee phù hợp vì có thể làm ở nhà. Khóa học này practical lắm, anh Hiếu dạy cách optimize time và automate process. Scheduling tools giúp tớ đăng content đều đặn dù làm ca đêm. Hiện tại đã có 17 triệu/tháng từ affiliate.",
    },
    {
      name: "Hồng Nhung",
      location: "Cao Bằng",
      avatar: "HN",
      rating: 5,
      profession: "Cô giáo mầm non",
      feedback:
        "Mình dạy mầm non ở vùng xa, lương thấp. Muốn kiếm thêm để lo cho gia đình. Học affiliate vì không cần ra khỏi nhà. Khóa học rất chi tiết về content creation và audience engagement. Psychology triggers trong bài học giúp mình hiểu khách hàng hơn. Sau 6 tháng đã có 25 triệu/tháng, gấp đôi lương giáo viên.",
    },
    {
      name: "Tuấn Vũ",
      location: "Lai Châu",
      avatar: "TV",
      rating: 5,
      profession: "Nhân viên điện lực",
      feedback:
        "Tớ làm ngành điện ở vùng núi, thu nhập ổn nhưng muốn có plan B. Affiliate shopee là lựa chọn tốt vì làm online. Khóa học này systematic và comprehensive. Từ product research đến scaling strategies đều được dạy kỹ. ROI analysis và performance tracking giúp tớ optimize hiệu quả. Hiện tại kiếm 23 triệu/tháng từ affiliate.",
    },
    {
      name: "Mai Phương",
      location: "Sóc Trăng",
      avatar: "MP",
      rating: 5,
      profession: "Pharmacist",
      feedback:
        "Mình là dược sĩ ở nhà thuốc tư. Công việc ổn định nhưng muốn đầu tư tương lai. Affiliate marketing không cần vốn lớn nên phù hợp. Khóa học dạy very detailed về market analysis và customer segmentation. Medical background giúp mình research sản phẩm sức khỏe tốt hơn. Đã đạt 34 triệu/tháng với niche sản phẩm chăm sóc sức khỏe.",
    },
    {
      name: "Văn Long",
      location: "Hà Tĩnh",
      avatar: "VL",
      rating: 5,
      profession: "Thầy giáo THCS",
      feedback:
        "Tớ dạy toán THCS, hè không có lớp nên học affiliate để tận dụng thời gian. Khóa học có logic rõ ràng như môn toán. Anh Hiếu explain từng bước, có data cụ thể chứ không phải cảm tính. Analytics và conversion optimization rất scientific. Giờ tớ kiếm 28 triệu/tháng, hè không lo thiếu thu nhập nữa.",
    },
    {
      name: "Thị Hoa",
      location: "Trà Vinh",
      avatar: "TH",
      rating: 5,
      profession: "Chủ quán ăn nhỏ",
      feedback:
        "Mình bán cơm ở quê, doanh thu không cao lắm. Nghe nói affiliate kiếm tốt nên học thử. Khóa học này dạy cách leverage social media để tăng reach. Customer psychology từ bán hàng trực tiếp giúp mình apply vào affiliate hiệu quả. Giờ có thêm 19 triệu/tháng từ affiliate, đủ trang trải thêm chi phí gia đình.",
    },
    {
      name: "Minh Đức",
      location: "Tuyên Quang",
      avatar: "MD",
      rating: 5,
      profession: "Kỹ thuật viên máy tính",
      feedback:
        "Tớ sửa máy tính ở thị trấn, khách không nhiều. Muốn diversify thu nhập nên học affiliate. Tech background giúp tớ setup tools và automation nhanh hơn. Khóa học này comprehensive từ technical setup đến marketing strategies. Performance analytics và A/B testing rất familiar với mindset IT. Hiện tại đã scaling lên 31 triệu/tháng.",
    },
    {
      name: "Hồng Vân",
      location: "Bến Tre",
      avatar: "HV",
      rating: 5,
      profession: "Nhân viên Thu Ngân",
      feedback:
        "Mình làm thu ngân siêu thị ca sáng, chiều rảnh muốn kiếm thêm. Affiliate shopee flexible về thời gian nên phù hợp. Khóa học dạy time management và workflow optimization rất hay. Customer service skills từ công việc chính giúp mình engagement tốt hơn. Chỉ làm 2-3 tiếng buổi chiều mà kiếm được 20 triệu/tháng.",
    },
    {
      name: "Thanh Bình",
      location: "Điện Biên",
      avatar: "TB",
      rating: 5,
      profession: "Cán bộ xã",
      feedback:
        "Tớ làm văn phòng xã ở vC�ng cao, thu nhập thấp. Học affiliate để cải thiện kinh tế gia đình. Khóa học này practical và dễ implement. Anh Hiếu dạy cách build trust với audience và create authentic content. Local knowledge giúp tớ target được niche sản phẩm vùng miền. Đã đạt 15 triệu/tháng, đủ lo cho con ăn học tốt hơn.",
    },
    {
      name: "Thu Trang",
      location: "Phú Yên",
      avatar: "TT",
      rating: 5,
      profession: "Nhân viên resort",
      feedback:
        "Mình làm resort có mùa cao điểm và thấp điểm. Mùa thấp điểm rảnh nên học affiliate. Hospitality experience giúp mình understand customer journey tốt hơn. Khóa học dạy seasonal marketing và content planning rất match với background mình. Peak season làm ít, low season focus affiliate. Average 26 triệu/tháng từ affiliate giờ.",
    },
    {
      name: "Văn Thắng",
      location: "Lạng Sơn",
      avatar: "VT",
      rating: 5,
      profession: "Tài xế container",
      feedback:
        "Tớ chạy container đường dài, về nhà vài ngày/tuần. Thời gian rảnh muốn kiếm thêm thu nhập. Affiliate shopee có thể làm từ xa nên suitable. Khóa học dạy mobile optimization và automation tools rất hay. Content scheduling giúp tớ maintain presence dù hay đi công tác. Hiện tại kiếm 22 triệu/tháng từ affiliate.",
    },
    {
      name: "Ngọc Lan",
      location: "Yên Bái",
      avatar: "NL",
      rating: 5,
      profession: "Nhân viên tín dụng",
      feedback:
        "Mình làm tín dụng ngân hàng vùng sâu, áp lực KPI cao. Muốn có thêm passive income để bớt stress. Affiliate marketing không pressure như target vay vốn. Khóa học này dạy data-driven approach và risk management rất professional. Financial background giúp mình analyze ROI và scale sustainable. Đã reach 29 triệu/tháng ổn định.",
    },
    {
      name: "Hoàng Tuấn",
      location: "Kon Tum",
      avatar: "HT",
      rating: 5,
      profession: "Ranger kiểm lâm",
      feedback:
        "Tớ làm kiểm lâm ở vùng núi, công việc đơn điệu. Học affiliate để mở rộng kiến thức và kiếm thêm thu nhập. Environmental awareness giúp tớ promote eco-friendly products tốt hơn. Khóa học này comprehensive và practical. Niche green products đang trending và conversion rate cao. Hiện tại đã có 18 triệu/tháng từ affiliate.",
    },
    {
      name: "Mỹ Linh",
      location: "Gia Lai",
      avatar: "ML",
      rating: 5,
      profession: "Nhân viên cafe",
      feedback:
        "Mình làm nhân viên pha chế, lương không cao. Thấy nhiều khách hàng thành công từ kinh doanh online nên tìm hiểu affiliate. Khóa học dạy customer psychology và engagement strategies rất hay. Cafe experience giúp mình understand customer behavior và preferences. Social skills từ serving khách giúp content engagement tốt hơn. Giờ kiếm 16 triệu/tháng từ affiliate.",
    },
  ];

  const pricingOptions = [
    {
      name: "Affiliate Shopee Pro",
      price: "3990K",
      fullAmount: "3.990.000 VND",
      originalPrice: "10.000.000 VND",
      features: [
        "Tất cả nội dung Basic +",
        "Hỗ trợ 1-1 với mentor",
        "Database 10K sản phẩm hot",
        "Tools Affiliate Pro (5M value)",
        "Template Content Creator (2.5M value)",
        "Bonus: TikTok Affiliate course (4.9M value)",
        "Lifetime support & updates",
      ],
      recommended: true,
      qrCode: "/attached_assets/IMG_D728348A456C-1_1760458629964.jpeg",
    },
  ];

  return (
    <>
      <SEO
        title={`Khóa học Affiliate Shopee A-Z - Kiếm tiền ${minIncome}-${maxIncome} triệu/tháng | Hiếu Suro`}
        description={`Khóa học Affiliate Shopee A-Z với Hiếu Suro. Học cách tạo thu nhập thụ động ${minIncome}-${maxIncome}M/tháng từ Affiliate Marketing mà không cần vốn đầu tư. 56+ học viên thành công.`}
        keywords="affiliate shopee, hiếu suro, khóa học affiliate, kiếm tiền online, affiliate marketing, shopee affiliate program"
        ogImage="/attached_assets/hieu-suro-profile.png"
        canonical="https://hieusuro.replit.app/affshopee"
      />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50">
        {/* Hero Section - Breakthrough Design */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-16 md:pt-8 pb-16 sm:pb-28 md:pb-32">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-pink-300 to-pink-400 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,165,0,0.3) 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, rgba(236,72,153,0.3) 0%, transparent 50%)`,
              }}
            />
          </div>

          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-orange-400 rounded-full animate-pulse opacity-60" />
            <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-pink-400 rounded-full animate-bounce opacity-40" />
            <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-pink-500 rounded-full animate-ping opacity-50" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center max-w-5xl mx-auto">
              {/* Badge with Glassmorphism */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8 shadow-xl">
                <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                <span className="text-orange-800 font-semibold text-xs sm:text-sm">
                  Khóa học Affiliate Shopee A-Z
                </span>
              </div>

              {/* Main Headline with Gradient Text */}
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight px-2">
                <span className="bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent">
                  Kiếm {minIncome}-{maxIncome} triệu/tháng
                </span>
                <br />
                <span className="text-gray-800">với Affiliate Shopee</span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-6 sm:mb-8 max-w-3xl mx-auto mx-4 sm:mx-auto leading-relaxed px-2 sm:px-0">
                Đã có{" "}
                <span className="font-bold text-orange-600">
                  {studentsCounter}+ học viên
                </span>{" "}
                thành công xây dựng
                <span className="font-bold text-pink-600">
                  {" "}
                  thu nhập thụ động online
                </span>{" "}
                từ Affiliate Shopee mà{" "}
                <span className="font-bold">không cần bỏ vốn đầu tư</span>
              </p>

              {/* No Barriers Badges */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 px-4 sm:px-0">
                <div className="bg-white/30 backdrop-blur-lg border border-orange-300 text-orange-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg hover:shadow-xl hover:border-orange-400 transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                  <span className="font-semibold text-sm sm:text-base">
                    KHÔNG cần kinh nghiệm
                  </span>
                </div>
                <div className="bg-white/30 backdrop-blur-lg border border-pink-300 text-pink-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg hover:shadow-xl hover:border-pink-400 transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-pink-600" />
                  <span className="font-semibold text-sm sm:text-base">
                    KHÔNG cần follow cao
                  </span>
                </div>
                <div className="bg-white/30 backdrop-blur-lg border border-orange-300 text-orange-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg hover:shadow-xl hover:border-orange-400 transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                  <span className="font-semibold text-sm sm:text-base">
                    KHÔNG cần quảng cáo
                  </span>
                </div>
              </div>

              {/* Stats Cards with 3D Effect */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-4xl mx-auto px-2 sm:px-0">
                <div className="bg-white/30 backdrop-blur-lg border border-white/40 rounded-2xl p-4 sm:p-6 shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-orange-200/50">
                  <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2">
                    {marketCounter}tỉ+
                  </div>
                  <div className="text-gray-700 font-medium">
                    Shopee trả hoa hồng
                  </div>
                  <div className="text-sm text-gray-600">
                    (Trung bình mỗi năm)
                  </div>
                </div>

                <div className="bg-white/30 backdrop-blur-lg border border-white/40 rounded-2xl p-4 sm:p-6 shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-pink-200/50">
                  <div className="text-2xl sm:text-3xl font-bold text-pink-600 mb-2">
                    10-{commissionCounter}%
                  </div>
                  <div className="text-gray-700 font-medium">
                    Tỉ lệ hoa hồng
                  </div>
                  <div className="text-sm text-gray-600">
                    Trả cho người làm AFF
                  </div>
                </div>

                <div className="bg-white/30 backdrop-blur-lg border border-white/40 rounded-2xl p-4 sm:p-6 shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-pink-200/50">
                  <div className="text-2xl sm:text-3xl font-bold text-pink-600 mb-2">
                    {earningsCounter}tr
                  </div>
                  <div className="text-gray-700 font-medium">
                    Thu nhập cao nhất
                  </div>
                  <div className="text-sm text-gray-600">
                    Của học viên/tháng
                  </div>
                </div>
              </div>

              {/* CTA Buttons with Modern Design */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8 sm:mb-12 px-4 sm:px-0">
                <Button
                  onClick={() => scrollToSection("pricing")}
                  className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl text-base sm:text-lg font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-pink-300/50 w-full sm:w-auto"
                  data-testid="button-enroll-hero"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Đăng ký ngay - Ưu đãi đến 70%
                </Button>
                <Button
                  variant="outline"
                  onClick={() => scrollToSection("curriculum")}
                  className="border-2 border-gray-300 hover:border-orange-400 text-gray-700 hover:text-orange-600 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl text-base sm:text-lg font-semibold bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 w-full sm:w-auto"
                  data-testid="button-view-curriculum"
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Xem chương trình học
                </Button>
              </div>

              {/* Countdown Timer with Glassmorphism */}
              <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-4 sm:p-6 max-w-2xl mx-auto shadow-xl mx-4 sm:mx-auto">
                <div className="text-center mb-4">
                  <h3 className="text-lg sm:text-lg sm:text-xl font-bold text-gray-800 mb-2">
                    Flash Sale - Giảm 70% chỉ còn:
                  </h3>
                </div>
                <div className="grid grid-cols-4 gap-2 sm:gap-4">
                  {[
                    { label: "Ngày", value: timeLeft.days },
                    { label: "Giờ", value: timeLeft.hours },
                    { label: "Phút", value: timeLeft.minutes },
                    { label: "Giây", value: timeLeft.seconds },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl p-2 sm:p-4 text-white shadow-lg"
                    >
                      <div className="text-lg sm:text-2xl md:text-3xl font-bold">
                        {item.value.toString().padStart(2, "0")}
                      </div>
                      <div className="text-sm opacity-90">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problems/Pain Points Section */}
        <section className="py-12 sm:py-20 bg-gradient-to-br from-orange-50/30 via-white to-pink-50/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Bạn đang tìm cách làm Affiliate Shopee{" "}
                <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  nhưng luôn gặp Rắc Rối?
                </span>{" "}
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
                Đây là những vấn đề, khó khăn phổ biến mà hầu như ai cũng đang
                gặp phải khi bắt đầu tìm hiểu về Affiliate Shopee (ngày xưa Hiếu
                cũng không ngoại lệ)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-4 sm:p-6 md:p-8 max-w-6xl mx-auto">
              {painPoints.map((point, index) => (
                <Card
                  key={index}
                  className="group bg-white/70 backdrop-blur-sm border border-pink-100 hover:border-pink-300 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-100/50 transform hover:-translate-y-2"
                >
                  <CardContent className="p-4 sm:p-6 md:p-8">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`bg-gradient-to-br ${point.color} p-3 rounded-2xl text-white group-hover:scale-110 transition-transform duration-300`}
                      >
                        {point.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors">
                          {point.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <div className="bg-gradient-to-r from-orange-50 to-pink-50 border border-pink-200 rounded-2xl p-6 max-w-3xl mx-auto mx-4 sm:mx-auto">
                <h3 className="text-xl sm:text-2xl font-bold text-pink-800 mb-3">
                  Hiếu muốn nói với bạn là...
                </h3>
                <p className="text-pink-700">
                  Như Đen Vâu đã từng rap "cuộc đời này có mấy lần được 10 năm",
                  cơ hội làm Affiliate Shopee này cũng thế (phải 5-10 năm mới có
                  1 cơ hội), cơ hội bán hàng facebook 2014 đã qua, cơ hội bán
                  hàng Shopee, Tiktok đang dần vào thế khó khăn hơn trước. Duy
                  chỉ có làm Affiliate là ít tốn vốn nhất, ít đầu tư nhất, làm
                  online (chỉ cần 1 chiếc điện thoại) ở đâu cũng được . Ngày xưa
                  Hiếu từng mơ mình phải có nhiều nguồn thu nhập, chủ động hoặc
                  thụ động. Hiếu đã đạt được, mỗi nguồn cho ta 1 ít, dù ít hay
                  nhiều thì vẫn tốt hơn là không có.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Preview + Video Introduction */}
        <section className="py-12 sm:py-20 bg-gradient-to-br from-orange-50/30 via-white to-pink-50/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  Tham gia vào lớp
                </span>{" "}
                cùng các bạn học viên khác
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
                Khóa học Affiliate Shopee - Hướng dẫn từ A-Z để bạn tạo thu nhập
                từ tiếp thị liên kết Shopee (đạt 10-50tr/tháng)
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              {/* Video Introduction */}
              <div className="order-2 lg:order-1">
                <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-none shadow-2xl overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="aspect-video bg-black rounded-lg overflow-hidden">
                        <iframe
                          className="w-full h-full"
                          src="https://www.youtube.com/embed/sjVwA9Ujfzs?rel=0&modestbranding=1"
                          title="🎥 Video giới thiệu khóa học Affiliate Shopee A-Z"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          data-testid="youtube-video-intro"
                        ></iframe>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Solution Benefits */}
              <div className="order-1 lg:order-2 space-y-6">
                <div className="space-y-4">
                  {[
                    {
                      icon: <Coins className="h-6 w-6" />,
                      title: "Thu nhập thụ động 24/7",
                      desc: "Đơn hàng vẫn nhảy ngay cả khi ngủ",
                    },
                    {
                      icon: <Smartphone className="h-6 w-6" />,
                      title: "Không cần vốn đầu tư",
                      desc: "Chỉ cần smartphone + internet",
                    },
                    {
                      icon: <TrendingUp className="h-6 w-6" />,
                      title: "Thị trường đang bùng nổ",
                      desc: "Nếu vào muốn sẽ mất phần",
                    },
                    {
                      icon: <UserCheck className="h-6 w-6" />,
                      title: "Hiếu hỗ trợ 1-1 trọn đời",
                      desc: "Luôn luôn đồng hành cùng tất cả lớp mình",
                    },
                  ].map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-pink-200 hover:border-pink-400 transition-colors"
                    >
                      <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-2 rounded-lg text-white">
                        {benefit.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">
                          {benefit.title}
                        </h4>
                        <p className="text-gray-600 text-sm">{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => scrollToSection("pricing")}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  data-testid="button-get-solution"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Ghi danh luôn
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Hieu's Results Section */}
        <section className="py-12 sm:py-20 bg-gradient-to-br from-orange-50/30 via-white to-pink-50/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Đây là những kết quả của{" "}
                <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  Hiếu trong quá trình làm
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
                2017 Hiếu từng làm Affiliate đạt được nhiều kết quả lớn trong
                nước và ngoài nước, hiện tại 2 năm trở lại đây Hiếu tập trung
                làm thêm mảng Affiliate Shopee (ngoài kinh doanh trên Shopee),
                kết quá vượt xa mong đợi của Hiếu
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
              {hieuResults.map((result, index) => (
                <Card
                  key={index}
                  className="group bg-white/80 backdrop-blur-sm border border-pink-200 hover:border-pink-400 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-100/50 transform hover:-translate-y-2"
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-pink-600 mb-2 group-hover:scale-110 transition-transform">
                      {result.metric}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      {result.description}
                    </h3>
                    <p className="text-gray-600 text-sm">{result.details}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Results Carousel */}
            <div className="mb-16 max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Những kết quả của Hiếu (bạn hoàn toàn làm được)
                </h3>
                <p className="text-gray-600">
                  Kết quả của Hiếu từ ảnh chụp màn hình gồm đơn hàng, doanh số,
                  hoa hồng, những lần rút tiền... Hiếu chụp nhiều tháng cho các
                  bạn tiện xem nghen
                </p>
              </div>
              <ResultsCarousel />
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-pink-50 border border-pink-200 rounded-2xl p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-pink-800 mb-4">
                  Mỗi chúng ta đều có 1 hành trình riêng...
                </h3>
                <p className="text-pink-700 leading-relaxed mb-6">
                  <em>
                    Sau nhiều năm quay lại làm affiliate, khoảng 2024 Hiếu bắt
                    tay vào làm, số tiền đầu tiên mà Shopee chuyển khoản cho
                    Hiếu vỏn vẹn 14k, sau đó lượng đơn, hoa hồng cứ tăng theo
                    cấp số nhân. Không phải vì Hiếu giỏi, vì Hiếu đã thử sai đủ
                    nhiều và rút ra được 1 lộ trình phương pháp bài bản mà kể cả
                    người chưa từng làm cũng áp dụng và đạt được kết quả!
                  </em>
                </p>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                    H
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-gray-900">Hiếu Suro</div>
                    <div className="text-gray-600 text-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Student Results Section */}
        <section className="py-12 sm:py-20 bg-gradient-to-br from-pink-50/30 via-white to-orange-50/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Kết quả thực tế của{" "}
                <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  học viên đã học
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
                Các bạn học viên đã kiếm được từ vài triệu đến vài trục triệu
                mỗi tháng sau khi hoàn thành khóa học và áp dụng kiến thức vào
                thực tế
              </p>
            </div>

            {/* Student Results Carousel */}
            <div className="mb-12 max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Những kết quả của các bạn học viên
                </h3>
                <p className="text-gray-600">
                  Toàn bộ kết quả từ sự áp dụng kiến thức & sự cố gắng trong quá
                  trình làm việc!
                </p>
              </div>
              <StudentResultsCarousel />
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-pink-50 border border-pink-200 rounded-2xl p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-pink-800 mb-4">
                  Họ làm được, Hiếu tin bạn cũng vậy!
                </h3>
                <p className="text-pink-700 leading-relaxed">
                  Tất cả học viên đạt kết quả đều xuất phát từ con số 0, không
                  có kinh nghiệm trước đó. Điều khác biệt là họ đã hành động,
                  kiên trì học tập và áp dụng đúng những gì được hướng dẫn. Bạn
                  hoàn toàn có thể đạt được kết quả tương tự nếu làm theo đúng
                  lộ trình!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Target Audience Section */}
        <section className="py-12 sm:py-20 bg-gradient-to-br from-orange-50/30 via-white to-pink-50/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Khóa học{" "}
                <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  phù hợp với ai
                </span>
                ?
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
                Bất kể bạn là ai, ở độ tuổi nào, khóa học này sẽ giúp bạn tạo
                thu nhập từ affiliate shopee
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-4 sm:p-6 md:p-8 max-w-6xl mx-auto">
              {targetAudience.map((audience, index) => (
                <Card
                  key={index}
                  className="group bg-white/70 backdrop-blur-sm border border-pink-100 hover:border-pink-300 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-100/50 transform hover:-translate-y-2"
                >
                  <CardContent className="p-4 sm:p-6 md:p-8">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="bg-gradient-to-br from-orange-500 to-pink-500 p-3 rounded-2xl text-white group-hover:scale-110 transition-transform duration-300">
                        {audience.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors">
                          {audience.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                          {audience.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {audience.examples.map((example, exampleIndex) => (
                        <Badge
                          key={exampleIndex}
                          variant="secondary"
                          className="bg-pink-100 text-pink-700 hover:bg-pink-200 transition-colors"
                        >
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <div className="bg-gradient-to-r from-orange-50 to-pink-50 border border-pink-200 rounded-2xl p-6 max-w-3xl mx-auto mx-4 sm:mx-auto">
                <h3 className="text-xl sm:text-2xl font-bold text-pink-800 mb-3">
                  Đặc biệt phù hợp nếu bạn:
                </h3>
                <ul className="text-pink-700 space-y-2">
                  <li>
                    Người chưa từng làm Affiliate, nhưng muốn bắt đầu để tạo
                    nguồn thu nhập online.
                  </li>
                  <li>
                    Người đã thử nhưng mãi chưa có đơn, muốn hiểu nguyên nhân và
                    cách khắc phục.
                  </li>
                  <li>
                    Sẵn sàng học hỏi và áp dụng những chiến lược đã được chứng
                    minh từ Hiếu
                  </li>
                  <li>Có điện thoại hoặc máy tính và kết nối internet</li>
                  <li>Cam kết dành 2-3 tiếng/ngày trong 1-2 tháng đầu</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Skills Section */}
        <section className="py-12 sm:py-20 bg-gradient-to-br from-pink-50/30 via-white to-pink-50/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Kỹ năng{" "}
                <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  chi tiết
                </span>{" "}
                anh sẽ nắm vững trong khóa học
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
                Hơn 20 kỹ năng thực chiến, giúp anh đi từ người chưa biết gì → đến người có thể tự ra đơn, tự tối ưu và nhân doanh thu Affiliate Shopee
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-4 sm:p-6 md:p-8 max-w-6xl mx-auto">
              {detailedSkills.map((skillGroup, index) => (
                <Card
                  key={index}
                  className="group bg-white/70 backdrop-blur-sm border border-pink-100 hover:border-pink-300 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-100/50 transform hover:-translate-y-2"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`bg-gradient-to-br ${skillGroup.color} p-3 rounded-xl text-white group-hover:scale-110 transition-transform duration-300`}
                      >
                        {skillGroup.icon}
                      </div>
                      <CardTitle className="text-xl text-gray-900 group-hover:text-pink-600 transition-colors">
                        {skillGroup.category}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {skillGroup.skills.map((skill, skillIndex) => (
                        <li
                          key={skillIndex}
                          className="flex items-start space-x-3"
                        >
                          <CheckCircle className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <div className="bg-gradient-to-r from-orange-50 to-pink-50 border border-pink-200 rounded-2xl p-6 max-w-4xl mx-auto">
                <h3 className="text-xl sm:text-2xl font-bold text-pink-800 mb-3">
                  Sau khóa học, bạn sẽ có thể:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-pink-700">
                  <div className="space-y-2">
                    <div>Tự setup và vận hành affiliate business</div>
                    <div>Tạo thu nhập đầu tiên trong 2-4 tuần</div>
                    <div>
                      Scale doanh thu lên {minIncome}-{maxIncome}M/tháng
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>Tạo content viral thu hút khách hàng</div>
                    <div>Research sản phẩm hot trend chính xác</div>
                    <div>Tự động hóa quy trình kiếm tiền</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section
          id="why-choose"
          className="py-12 sm:py-20 bg-gradient-to-br from-white via-orange-50/30 to-pink-50/30"
        >
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Tại sao chọn{" "}
                <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  Hiếu Suro
                </span>
                ?
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
                Khóa học Affiliate Shopee A-Z duy nhất tại Việt Nam được giảng
                dạy bởi chuyên gia có thu nhập 100M+/tháng từ affiliate
                marketing
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-4 sm:p-6 md:p-8 max-w-6xl mx-auto">
              {whyChooseReasons.map((reason, index) => (
                <Card
                  key={index}
                  className="group bg-white/60 backdrop-blur-sm border border-orange-100 hover:border-orange-300 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-100/50 transform hover:-translate-y-2"
                >
                  <CardContent className="p-4 sm:p-6 md:p-8">
                    <div className="flex items-start space-x-4">
                      <div className="bg-gradient-to-br from-orange-500 to-pink-500 p-3 rounded-2xl text-white group-hover:scale-110 transition-transform duration-300">
                        {reason.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                          {reason.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Curriculum Section */}
        <section
          id="curriculum"
          className="py-12 sm:py-20 bg-gradient-to-br from-orange-50/30 via-white to-pink-50/30"
        >
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Chương trình học{" "}
                <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  chi tiết
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
                8 modules chi tiết với 40+ video bài học thực chiến, từ newbie
                đến pro affiliate earner {minIncome}-{maxIncome}M/tháng
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {curriculumStages.map((stage, index) => (
                <Collapsible key={index}>
                  <CollapsibleTrigger
                    className="w-full bg-white/80 backdrop-blur-sm border border-orange-200 rounded-2xl p-6 hover:bg-orange-50 transition-all duration-300 group"
                    data-testid={`collapsible-trigger-stage-${index + 1}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-xl font-bold">
                          {stage.stage}
                        </div>
                        <div className="text-left">
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                            {stage.title}
                          </h3>
                          <p className="text-gray-600">{stage.duration}</p>
                        </div>
                      </div>
                      <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="bg-white/60 backdrop-blur-sm border-x border-b border-orange-200 rounded-b-2xl p-6">
                    <ul className="space-y-3">
                      {stage.details.map((detail, detailIndex) => (
                        <li
                          key={detailIndex}
                          className="flex items-start space-x-3"
                        >
                          <CheckCircle className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>
        </section>

        {/* Course Summary Section */}
        <section className="py-12 sm:py-20 bg-gradient-to-br from-white via-orange-50/30 to-pink-50/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Bạn sẽ{" "}
                <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  nhận được gì
                </span>
                ?
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
                Tóm tắt những kiến thức và kỹ năng cốt lõi từ mỗi module
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-12">
              {/* Module 1 Summary */}
              <Card className="bg-white/80 backdrop-blur-sm border border-orange-200 hover:border-orange-400 transition-all duration-300 hover:shadow-2xl">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-orange-500 to-pink-500 text-white px-4 py-2 rounded-xl font-bold text-sm flex-shrink-0">
                      Module 1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        Hiểu đúng về Affiliate Shopee
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Nắm vững bản chất affiliate, mô hình vận hành, cách
                        Shopee tính hoa hồng, và tư duy đúng đắn để thành công.
                      </p>
                      <div className="flex items-center space-x-2 text-pink-600 font-semibold">
                        <CheckCircle className="h-5 w-5" />
                        <span>Nền tảng & Tư duy vững chắc</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Module 2 Summary */}
              <Card className="bg-white/80 backdrop-blur-sm border border-orange-200 hover:border-orange-400 transition-all duration-300 hover:shadow-2xl">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-orange-500 to-pink-500 text-white px-4 py-2 rounded-xl font-bold text-sm flex-shrink-0">
                      Module 2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        Thiết lập tài khoản & công cụ
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Đăng ký tài khoản, lấy link, tracking hiệu suất, xử lý
                        lỗi, và quản lý thu nhập chuyên nghiệp.
                      </p>
                      <div className="flex items-center space-x-2 text-pink-600 font-semibold">
                        <CheckCircle className="h-5 w-5" />
                        <span>Sẵn sàng bắt đầu</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Module 3 Summary */}
              <Card className="bg-white/80 backdrop-blur-sm border border-orange-200 hover:border-orange-400 transition-all duration-300 hover:shadow-2xl">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-orange-500 to-pink-500 text-white px-4 py-2 rounded-xl font-bold text-sm flex-shrink-0">
                      Module 3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        Hiểu thuật toán Shopee
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Nắm rõ cơ chế ghi nhận đơn, cookie tracking, chọn sản
                        phẩm dễ bán và thời điểm vàng chia sẻ.
                      </p>
                      <div className="flex items-center space-x-2 text-pink-600 font-semibold">
                        <CheckCircle className="h-5 w-5" />
                        <span>Chọn đúng sản phẩm</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Module 4 Summary */}
              <Card className="bg-white/80 backdrop-blur-sm border border-orange-200 hover:border-orange-400 transition-all duration-300 hover:shadow-2xl">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-orange-500 to-pink-500 text-white px-4 py-2 rounded-xl font-bold text-sm flex-shrink-0">
                      Module 4
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        Kéo traffic miễn phí
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        6 kênh hiệu quả (TikTok, Facebook, Zalo...), tối ưu
                        profile và tạo post ra đơn ngay.
                      </p>
                      <div className="flex items-center space-x-2 text-pink-600 font-semibold">
                        <CheckCircle className="h-5 w-5" />
                        <span>Traffic miễn phí liên tục</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Module 5 Summary */}
              <Card className="bg-white/80 backdrop-blur-sm border border-orange-200 hover:border-orange-400 transition-all duration-300 hover:shadow-2xl">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-orange-500 to-pink-500 text-white px-4 py-2 rounded-xl font-bold text-sm flex-shrink-0">
                      Module 5
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        Làm content Affiliate
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        10 dạng content dễ ra đơn, mẫu caption viral, video 30s
                        và dùng ChatGPT tạo nội dung nhanh.
                      </p>
                      <div className="flex items-center space-x-2 text-pink-600 font-semibold">
                        <CheckCircle className="h-5 w-5" />
                        <span>Content hút click & ra đơn</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Module 6 Summary */}
              <Card className="bg-white/80 backdrop-blur-sm border border-orange-200 hover:border-orange-400 transition-all duration-300 hover:shadow-2xl">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-orange-500 to-pink-500 text-white px-4 py-2 rounded-xl font-bold text-sm flex-shrink-0">
                      Module 6
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        Ra đơn đầu tiên trong 7 ngày
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Kế hoạch chi tiết từng ngày, checklist 10 việc, tạo mini
                        site và test sản phẩm hiệu quả.
                      </p>
                      <div className="flex items-center space-x-2 text-pink-600 font-semibold">
                        <CheckCircle className="h-5 w-5" />
                        <span>Đơn hàng đầu tiên nhanh chóng</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Module 7 Summary */}
              <Card className="bg-white/80 backdrop-blur-sm border border-orange-200 hover:border-orange-400 transition-all duration-300 hover:shadow-2xl">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-orange-500 to-pink-500 text-white px-4 py-2 rounded-xl font-bold text-sm flex-shrink-0">
                      Module 7
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        Xây thương hiệu cá nhân
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Chọn niche, xây cộng đồng trung thành và nhân bản hệ
                        thống để scale doanh thu.
                      </p>
                      <div className="flex items-center space-x-2 text-pink-600 font-semibold">
                        <CheckCircle className="h-5 w-5" />
                        <span>Thương hiệu bền vững</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Module 8 Summary */}
              <Card className="bg-white/80 backdrop-blur-sm border border-orange-200 hover:border-orange-400 transition-all duration-300 hover:shadow-2xl">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-orange-500 to-pink-500 text-white px-4 py-2 rounded-xl font-bold text-sm flex-shrink-0">
                      Module 8
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        Tư duy & con đường bền vững
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Tư duy kiếm tiền lâu dài, đo lường hiệu quả và roadmap
                        90 ngày phát triển sau khóa học.
                      </p>
                      <div className="flex items-center space-x-2 text-pink-600 font-semibold">
                        <CheckCircle className="h-5 w-5" />
                        <span>Thành công bền vững</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Overall Summary */}
            <div className="max-w-5xl mx-auto">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 rounded-3xl blur-xl opacity-20"></div>
                <Card className="relative bg-gradient-to-br from-orange-50 to-pink-50 border-2 border-orange-300 shadow-2xl">
                  <CardContent className="p-8 md:p-10">
                    <div className="text-center">
                      <div className="inline-block bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2 rounded-full font-bold mb-6">
                        🎓 Tổng kết khóa học
                      </div>
                      <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                        <strong className="text-gray-900">
                          Khóa học Affiliate Shopee A-Z
                        </strong>{" "}
                        được thiết kế bài bản và chuyên sâu nhất Việt Nam. Trang
                        bị cho bạn{" "}
                        <strong className="text-orange-600">
                          kiến thức nền tảng
                        </strong>{" "}
                        và{" "}
                        <strong className="text-pink-600">
                          kỹ năng thực chiến
                        </strong>{" "}
                        để tạo ra thu nhập thụ động{" "}
                        <strong className="text-orange-600">
                          {minIncome}-{maxIncome}M/tháng
                        </strong>{" "}
                        từ affiliate marketing. Nắm được{" "}
                        <strong className="text-gray-900">
                          tư duy kinh doanh online
                        </strong>
                        , từ cơ bản đến nâng cao, và biến{" "}
                        <strong className="text-pink-600">
                          ước mơ tự do tài chính
                        </strong>{" "}
                        của bạn thành hiện thực.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Course Outcomes Section */}
        <section className="py-12 sm:py-20 bg-gradient-to-br from-orange-50/30 via-white to-pink-50/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Kết quả{" "}
                <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  khóa học mang lại
                </span>
              </h2>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="relative mb-12">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 rounded-3xl blur-xl opacity-20"></div>
                <Card className="relative bg-white/80 backdrop-blur-sm border-2 border-orange-200 shadow-2xl">
                  <CardContent className="p-6 sm:p-8 md:p-10">
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center mb-8">
                      Khóa học này <strong className="text-orange-600">không dạy "mẹo ảo"</strong>, 
                      không hứa <strong className="text-pink-600">"giàu nhanh"</strong>, 
                      mà giúp anh <strong className="text-gray-900">thật sự hiểu</strong> – <strong className="text-gray-900">thật sự làm được</strong> – 
                      và <strong className="text-gray-900">thật sự ra đơn</strong>.
                    </p>

                    <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6 sm:p-8">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
                        Sau khóa học, anh sẽ:
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="h-6 w-6 text-orange-500 mt-1 flex-shrink-0" />
                          <p className="text-gray-700 leading-relaxed">
                            <strong className="text-gray-900">Hiểu rõ Affiliate Shopee</strong> vận hành như thế nào, hoa hồng tính ra sao, vì sao có người có đơn, có người không.
                          </p>
                        </div>

                        <div className="flex items-start space-x-3">
                          <CheckCircle className="h-6 w-6 text-orange-500 mt-1 flex-shrink-0" />
                          <p className="text-gray-700 leading-relaxed">
                            <strong className="text-gray-900">Biết cách chọn sản phẩm</strong> dễ ra đơn, phù hợp cho người mới.
                          </p>
                        </div>

                        <div className="flex items-start space-x-3">
                          <CheckCircle className="h-6 w-6 text-orange-500 mt-1 flex-shrink-0" />
                          <p className="text-gray-700 leading-relaxed">
                            <strong className="text-gray-900">Biết làm nội dung Affiliate</strong> đúng kiểu: không cần nổi tiếng, vẫn có đơn đều.
                          </p>
                        </div>

                        <div className="flex items-start space-x-3">
                          <CheckCircle className="h-6 w-6 text-orange-500 mt-1 flex-shrink-0" />
                          <p className="text-gray-700 leading-relaxed">
                            <strong className="text-gray-900">Có chiến lược 7 ngày</strong> ra đơn đầu tiên, áp dụng được ngay.
                          </p>
                        </div>

                        <div className="flex items-start space-x-3">
                          <CheckCircle className="h-6 w-6 text-orange-500 mt-1 flex-shrink-0" />
                          <p className="text-gray-700 leading-relaxed">
                            <strong className="text-gray-900">Biết xây kênh riêng</strong> để kiếm đơn lâu dài, không phụ thuộc may mắn.
                          </p>
                        </div>

                        <div className="flex items-start space-x-3">
                          <CheckCircle className="h-6 w-6 text-pink-500 mt-1 flex-shrink-0" />
                          <p className="text-gray-700 leading-relaxed">
                            Và quan trọng nhất – <strong className="text-pink-600">hiểu cách biến Affiliate thành nguồn thu nhập bền vững</strong>, không bị "phập phù theo mùa".
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-12 sm:py-20 bg-gradient-to-br from-white via-orange-50/30 to-pink-50/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Kết quả{" "}
                <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  học viên
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
                Feedback từ hơn 150+ học viên đã đánh giá 5 sao cho khóa học
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-8xl mx-auto px-4 sm:px-0">
              {testimonials.slice(15).map((testimonial, index) => (
                <Card
                  key={index}
                  className="group bg-white/90 backdrop-blur-md border border-pink-200 hover:border-pink-400 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-100/50 transform hover:-translate-y-1 h-full"
                >
                  <CardContent className="p-4 sm:p-6 flex flex-col h-full">
                    {/* Header with Avatar and Name */}
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {testimonial.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-sm">
                          {testimonial.name}
                        </h3>
                      </div>
                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>

                    {/* Feedback Content */}
                    <div className="flex-1">
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {testimonial.feedback}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Special Gifts Section */}
        <section className="py-12 sm:py-20 bg-gradient-to-br from-orange-50/50 via-white to-pink-50/50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Quà tặng{" "}
                <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  đặc biệt
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
                Tổng giá trị quà tặng:{" "}
                <span className="font-bold text-orange-600">
                  15.490.000 VNĐ
                </span>{" "}
                - Miễn phí khi đăng ký khóa học hôm nay
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-4 sm:p-6 md:p-8 max-w-6xl mx-auto mb-8">
              {specialGifts.map((gift, index) => (
                <Card
                  key={index}
                  className="group bg-white/70 backdrop-blur-md border border-pink-200 hover:border-pink-400 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-100/50 transform hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gradient-to-br from-orange-500 to-pink-500 p-3 rounded-2xl text-white group-hover:scale-110 transition-transform duration-300">
                        {gift.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                            {gift.name}
                          </h3>
                          <span className="text-orange-600 font-bold text-lg">
                            {gift.value}
                          </span>
                        </div>
                        <p className="text-gray-600">{gift.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Value Summary Box */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
                <Card className="relative bg-gradient-to-br from-orange-50 to-pink-50 border-2 border-pink-300 shadow-2xl overflow-hidden">
                  <CardContent className="p-4 sm:p-6 md:p-8 lg:p-10">
                    <div className="text-center mb-4 sm:mb-6">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center flex-wrap">
                        <Gift className="mr-2 sm:mr-3 h-6 w-6 sm:h-8 sm:w-8 text-pink-600" />
                        <span>Tổng giá trị bạn nhận được</span>
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 px-2">
                        Khi đăng ký khóa học Affiliate Shopee Pro hôm nay
                      </p>
                    </div>

                    {/* Học phí */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border-2 border-orange-200 mb-4 sm:mb-6">
                      <div className="flex items-center justify-between mb-3 gap-2">
                        <div className="flex-1">
                          <div className="text-xs sm:text-sm text-gray-600 mb-1">
                            💎 Học phí khóa học Pro
                          </div>
                          <div className="text-lg sm:text-2xl font-bold text-gray-400 line-through">
                            10.000.000đ
                          </div>
                        </div>
                        <div className="bg-red-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-bold text-base sm:text-lg flex-shrink-0">
                          -60%
                        </div>
                      </div>
                      <div className="border-t-2 border-dashed border-orange-300 my-3"></div>
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="text-sm sm:text-base text-gray-600">
                          Giá hôm nay chỉ còn
                        </div>
                        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-600">
                          3.990.000đ
                        </div>
                      </div>
                    </div>

                    {/* Quà tặng miễn phí */}
                    <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-4 sm:p-6 border-2 border-pink-300 mb-4 sm:mb-6">
                      <div className="mb-3 sm:mb-4">
                        <div className="text-base sm:text-lg text-pink-700 font-bold mb-2 sm:mb-3">
                          🎁 TẶNG MIỄN PHÍ - Quà tặng đặc biệt
                        </div>
                        <div className="space-y-2 text-xs sm:text-sm text-gray-700">
                          <div className="flex items-center justify-between">
                            <span>• Khóa TikTok Affiliate</span>
                            <span className="font-semibold text-pink-600">
                              4.990.000đ
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>• Tools Affiliate Pro</span>
                            <span className="font-semibold text-pink-600">
                              5.000.000đ
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>• Template Content Creator</span>
                            <span className="font-semibold text-pink-600">
                              2.500.000đ
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>• Database sản phẩm Hot</span>
                            <span className="font-semibold text-pink-600">
                              3.000.000đ
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="border-t-2 border-dashed border-pink-300 pt-3 mt-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-pink-800 text-sm sm:text-base">
                            Tổng giá trị quà tặng:
                          </span>
                          <span className="text-lg sm:text-xl md:text-2xl font-bold text-pink-600">
                            15.490.000đ
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Tổng kết */}
                    <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-4 sm:p-6 text-white mb-4 sm:mb-6">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex-1 min-w-0">
                          <div className="text-xs sm:text-sm opacity-90 mb-1">
                            Tổng giá trị bạn nhận được
                          </div>
                          <div className="text-sm sm:text-base md:text-lg">
                            Khóa học (3.99M) + Quà tặng (15.49M)
                          </div>
                        </div>
                        <div className="text-2xl sm:text-3xl md:text-4xl font-bold flex-shrink-0">
                          22.480.000đ
                        </div>
                      </div>
                    </div>

                    {/* Bạn chỉ trả */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border-2 border-pink-400">
                      <div className="text-center">
                        <div className="text-sm sm:text-base text-gray-600 mb-2">
                          Bạn chỉ cần đầu tư
                        </div>
                        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-3">
                          3.990.000đ
                        </div>
                        <div className="text-base sm:text-lg md:text-xl text-green-600 font-semibold px-2">
                          = Nhận ngay 15.490.000đ quà tặng MIỄN PHÍ! 🎉
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 sm:mt-6 text-center">
                      <div className="bg-gradient-to-r from-orange-100 to-pink-100 border border-pink-300 rounded-xl p-3 sm:p-4">
                        <p className="text-sm sm:text-base text-pink-800 font-semibold">
                          💰 <strong>Ưu đãi đặc biệt!</strong> Đầu tư{" "}
                          <strong>3.990.000đ</strong> nhận ngay{" "}
                          <strong>22.480.000đ</strong> giá trị (khóa học + quà
                          tặng miễn phí) - Lời gấp <strong>3 lần</strong>!
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Voucher Lucky Box Game Section */}
        <section className="py-12 sm:py-20 bg-gradient-to-br from-orange-50/50 via-white to-pink-50/50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mb-8 sm:mb-12">
              <div className="max-w-2xl mx-auto bg-gradient-to-r from-orange-100 via-pink-100 to-orange-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border-2 sm:border-4 border-dashed border-orange-300 relative overflow-hidden">
                {/* Decorative background */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-orange-500 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-pink-500 rounded-full blur-3xl animate-pulse delay-75"></div>
                </div>

                <div className="relative z-10 text-center">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                    Hộp Quà May Mắn
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 px-2">
                    Click vào hộp quà để nhận Voucher giảm giá{" "}
                    <span className="font-bold text-orange-600">
                      {" "}
                      độc quyền ngẫu nhiên
                    </span>
                    !
                  </p>

                  {!showVoucher ? (
                    <button
                      onClick={handleVoucherSpin}
                      disabled={isSpinning || hasSpunBefore}
                      className={`relative group ${isSpinning ? "animate-bounce" : ""} ${hasSpunBefore ? "opacity-50 cursor-not-allowed" : ""}`}
                      data-testid="button-voucher-spin"
                    >
                      <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl sm:rounded-3xl shadow-2xl transform transition-all duration-300 hover:scale-110 hover:rotate-3 flex items-center justify-center">
                        <Gift
                          className={`h-16 w-16 sm:h-20 sm:w-20 text-white ${isSpinning ? "animate-spin" : "group-hover:animate-bounce"}`}
                        />
                      </div>
                      <p className="mt-3 sm:mt-4 text-base sm:text-lg font-bold text-gray-900">
                        {isSpinning
                          ? "Đang quay số..."
                          : hasSpunBefore
                            ? "Bạn đã quay rồi!"
                            : "Click để mở quà!"}
                      </p>
                    </button>
                  ) : (
                    <div className="animate-in fade-in zoom-in duration-500">
                      <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border-2 sm:border-4 border-orange-400">
                        <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 animate-bounce">
                          🎉
                        </div>
                        <h4 className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2">
                          {hasSpunBefore ? "Voucher của bạn!" : "Chúc mừng!"}
                        </h4>
                        <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
                          {hasSpunBefore
                            ? "Voucher giảm giá của bạn:"
                            : "Bạn nhận được voucher giảm giá:"}
                        </p>
                        <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-pink-600 mb-3 sm:mb-4">
                          {voucherDiscount * 10}K
                        </div>
                        <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl p-3 sm:p-4 border border-orange-200">
                          <p className="text-sm sm:text-base text-gray-700 mb-2">
                            Áp dụng cho gói khóa học bạn chọn bên dưới!
                          </p>
                          <div className="text-2xl sm:text-3xl font-bold text-orange-600">
                            Giảm ngay{" "}
                            {(voucherDiscount * 10).toLocaleString("vi-VN")}.000
                            VND
                          </div>
                          <p className="text-xs sm:text-sm text-pink-600 mt-2 font-semibold">
                            💡 Chọn gói khóa học ở phần dưới để nhận ưu đãi!
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          id="pricing"
          className="py-12 sm:py-20 bg-gradient-to-br from-white via-orange-50/30 to-pink-50/30"
        >
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Đầu tư cho{" "}
                <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  tương lai
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
                Chọn gói học phù hợp với mục tiêu thu nhập của bạn
              </p>
            </div>

            <div className="max-w-lg mx-auto p-4 sm:p-6 md:p-8">
              {pricingOptions.map((option, index) => (
                <Card
                  key={index}
                  className={`group relative overflow-hidden transition-all duration-300 transform hover:-translate-y-2 ${
                    option.recommended
                      ? "bg-gradient-to-br from-orange-50 to-pink-50 border-2 border-pink-400 hover:border-pink-500 shadow-2xl hover:shadow-pink-200/50 scale-105"
                      : "bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-orange-300 hover:shadow-xl"
                  }`}
                >
                  {option.recommended && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-center py-2 font-semibold">
                      KHUYẾN MÃI
                    </div>
                  )}

                  <CardContent className="p-4 sm:p-6 md:p-8 text-center">
                    <div className={option.recommended ? "pt-6" : ""}>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                        {option.name}
                      </h3>

                      <div className="mb-6">
                        <div className="text-gray-400 line-through text-lg">
                          {option.originalPrice}
                        </div>
                        <div className="text-4xl font-bold text-orange-600 mb-2">
                          {option.price}
                        </div>
                        <div className="text-gray-600">{option.fullAmount}</div>
                      </div>

                      <ul className="space-y-3 mb-8 text-left">
                        {option.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-start space-x-3"
                          >
                            <CheckCircle className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        onClick={() => {
                          // Set selected package first
                          setSelectedPackage({
                            name: option.name,
                            price: option.price,
                            fullAmount: option.fullAmount,
                            qrCode: option.qrCode,
                          });

                          // If user has voucher, adjust it for the selected package
                          if (showVoucher && voucherDiscount > 0) {
                            adjustVoucherForPackage(
                              option.name,
                              voucherDiscount,
                            );
                          }

                          // Scroll to payment section
                          scrollToSection("payment");
                        }}
                        className={`w-full py-4 rounded-xl text-lg font-semibold transition-all duration-300 ${
                          option.recommended
                            ? "bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl"
                            : "bg-gray-800 hover:bg-gray-900 text-white"
                        }`}
                        data-testid={`button-select-${option.name.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        <ArrowRight className="mr-2 h-5 w-5" />
                        Ghi danh ngay
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Payment Section */}
        <section
          id="payment"
          className="py-12 sm:py-20 bg-gradient-to-br from-orange-50/50 via-white to-pink-50/50"
        >
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Thanh toán{" "}
                  <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                    nhanh chóng
                  </span>
                </h2>
                <p className="text-xl text-gray-600">
                  Bạn đã chọn:{" "}
                  <span className="font-bold text-orange-600">
                    {selectedPackage.name}
                  </span>{" "}
                  -
                  <span className="font-bold text-pink-600">
                    {" "}
                    {showVoucher && voucherDiscount > 0
                      ? calculateFinalPrice(
                          selectedPackage.fullAmount,
                          voucherDiscount,
                        ) + " VND"
                      : selectedPackage.fullAmount}
                  </span>
                  {showVoucher && voucherDiscount > 0 && (
                    <span className="block text-sm text-pink-600 mt-2">
                      (Đã áp dụng voucher giảm {voucherDiscount * 10}K)
                    </span>
                  )}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* QR Code */}
                <div className="text-center">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl border border-orange-200">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                      📱 Quét mã QR để thanh toán
                    </h3>
                    <div className="bg-gray-100 rounded-xl p-4 mb-6">
                      <img
                        src={selectedPackage.qrCode}
                        alt="QR Code thanh toán"
                        className="w-64 h-64 mx-auto object-contain rounded-xl"
                      />
                    </div>
                    <div className="text-gray-600">
                      <p className="mb-2">
                        <strong>Số tài khoản:</strong> 1581797979
                      </p>
                      <p className="mb-2">
                        <strong>Ngân hàng:</strong> Techcombank
                      </p>
                      <p className="mb-2">
                        <strong>Chủ tài khoản:</strong> CAO LE NGOC HIEU
                      </p>
                      <div className="mb-4">
                        <strong>Số tiền:</strong>{" "}
                        {showVoucher && voucherDiscount > 0 ? (
                          <div className="mt-2">
                            <div className="text-gray-400 line-through text-sm">
                              {selectedPackage.fullAmount}
                            </div>
                            <span className="font-bold text-orange-600 text-xl">
                              {calculateFinalPrice(
                                selectedPackage.fullAmount,
                                voucherDiscount,
                              )}{" "}
                              VND
                            </span>
                            <div className="text-xs text-pink-600 mt-1">
                              (Đã giảm {voucherDiscount * 10}K)
                            </div>
                          </div>
                        ) : (
                          <span className="font-bold text-orange-600">
                            {selectedPackage.fullAmount}
                          </span>
                        )}
                      </div>
                      <p className="text-sm bg-pink-50 border border-pink-200 rounded-lg p-3">
                        <strong>⚠️ Lưu ý:</strong> Vui lòng ghi đúng nội dung
                        chuyển khoản để được xử lý nhanh chóng
                      </p>
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="space-y-6">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-orange-200">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <Clock className="mr-2 h-5 w-5 text-orange-500" />
                      Hướng dẫn thanh toán
                    </h3>
                    <ol className="space-y-3 text-gray-700">
                      <li className="flex items-start space-x-3">
                        <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                          1
                        </span>
                        <span>Quét mã QR chuyển khoản</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                          2
                        </span>
                        <span>
                          Nhập đúng số tiền:{" "}
                          <strong>
                            {showVoucher && voucherDiscount > 0
                              ? `${calculateFinalPrice(selectedPackage.fullAmount, voucherDiscount)} VND`
                              : selectedPackage.fullAmount}
                          </strong>
                        </span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                          3
                        </span>
                        <span>
                          Ghi nội dung: <strong>[SĐT của bạn]</strong>
                        </span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                          4
                        </span>
                        <span>
                          Chụp ảnh bill và gửi vào Zalo:{" "}
                          <strong>0931 459 459</strong>
                        </span>
                      </li>
                    </ol>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-pink-50 border border-pink-200 rounded-2xl p-6">
                    <h4 className="text-lg font-bold text-pink-800 mb-3 flex items-center">
                      <Gift className="mr-2 h-5 w-5" />
                      Sau khi thanh toán, bạn sẽ nhận được:
                    </h4>
                    <ul className="space-y-2 text-pink-700">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-pink-500" />
                        <span>Link truy cập khóa học trong 5 phút</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-pink-500" />
                        <span>Tài khoản truy cập trọn đời</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-pink-500" />
                        <span>Tất cả quà tặng đã cam kết</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-pink-500" />
                        <span>Được add vào group VIP học viên</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Hieu Suro Section */}
        <section className="py-12 sm:py-20 bg-gradient-to-br from-orange-50/30 via-white to-pink-50/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Về{" "}
                <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  Hiếu Suro
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
                Từ nhân viên IT lương 8 triệu đến Top Affiliate Earner Việt Nam
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
                {/* Profile Image */}
                <div className="order-2 lg:order-1">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
                    <Card className="relative bg-white/90 backdrop-blur-sm border-none shadow-2xl overflow-hidden">
                      <CardContent className="p-8">
                        <div className="flex items-center justify-center mb-6">
                          <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-xl">
                            H
                          </div>
                        </div>
                        <div className="text-center">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Hiếu Suro
                          </h3>
                          <p className="text-pink-600 font-semibold mb-4">
                            Kinh doanh - Chia sẻ - Làm Affiliate
                          </p>
                          <div className="flex items-center justify-center space-x-4 mb-6">
                            <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">
                              🏆 Top Affiliate VN
                            </Badge>
                            <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-200">
                              📈 100M+/tháng
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Story Content */}
                <div className="order-1 lg:order-2 space-y-6">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-200">
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <TrendingUp className="mr-2 h-6 w-6 text-orange-500" />
                      Hành trình Hiếu Suro
                    </h4>
                    <div className="space-y-4 text-gray-700">
                      <p>
                        <strong className="text-pink-600">2016-2018:</strong>{" "}
                        Làm tiếp thị liên kết các sàn tại Việt Nam và nước ngoài
                      </p>
                      <p>
                        <strong className="text-pink-600">2018-2023:</strong>{" "}
                        Kinh doanh online trên các sàn TMĐT như Shopee, Tiktok,
                        Lazada, Sendo, đồng thời đào tạo inhouse tại các tập
                        đoàn - cty lớn, các trường ĐH-CĐ, hợp tác với nhiều
                        doanh nghiệp...
                      </p>
                      <p>
                        <strong className="text-pink-600">2023-2025:</strong>{" "}
                        Vẫn kinh doanh online trên sàn TMĐT, tiếp tục Affiliate
                        Shopee và Tiktok, đào tạo bán hàng Shopee, Tiktok đồng
                        thời chia sẻ trên Youtube, FB, Tiktok...
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl p-6 border border-pink-200">
                    <h4 className="text-xl font-bold text-pink-800 mb-4 flex items-center">
                      <Target className="mr-2 h-6 w-6" />
                      Sứ mệnh của Hiếu
                    </h4>
                    <p className="text-pink-700 leading-relaxed">
                      "Tôi đã từng là bạn - người muốn đổi đời nhưng không biết
                      bắt đầu từ đâu. Giờ tôi muốn giúp 1000+ người Việt tạo thu
                      nhập thụ động {minIncome}-{maxIncome}M/tháng từ affiliate
                      marketing, không cần vốn, không cần kinh nghiệm."
                    </p>
                  </div>
                </div>
              </div>

              {/* Achievement Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    number: "100M+",
                    label: "Thu nhập/tháng",
                    icon: <Coins className="h-6 w-6" />,
                  },
                  {
                    number: "56+",
                    label: "Học viên thành công",
                    icon: <Users className="h-6 w-6" />,
                  },
                  {
                    number: "50K+",
                    label: "Followers",
                    icon: <Heart className="h-6 w-6" />,
                  },
                  {
                    number: "3 năm",
                    label: "Kinh nghiệm",
                    icon: <Award className="h-6 w-6" />,
                  },
                ].map((stat, index) => (
                  <Card
                    key={index}
                    className="bg-white/70 backdrop-blur-sm border border-pink-200 hover:border-pink-400 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <CardContent className="p-4 text-center">
                      <div className="flex justify-center mb-2 text-pink-500">
                        {stat.icon}
                      </div>
                      <div className="text-2xl font-bold text-pink-600 mb-1">
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 sm:py-20 bg-gradient-to-br from-white via-orange-50/30 to-pink-50/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Câu hỏi{" "}
                <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  thường gặp
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
                Giải đáp những thắc mắc phổ biến về khóa học Affiliate Shopee
                A-Z
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {[
                  {
                    question:
                      "Tôi chưa biết gì về affiliate marketing, có học được không?",
                    answer:
                      "Được. Khóa này làm riêng cho người mới, nên mọi thứ đều hướng dẫn từ bước căn bản nhất. Bạn chỉ cần làm theo từng phần, không cần phải giỏi công nghệ hay có kinh nghiệm trước. Ví dụ có bạn học viên của mình, trước đây đi làm văn phòng, thậm chí còn chưa bao giờ làm fanpage, vậy mà sau 1 tháng học và thực hành, bạn ấy đã có những đơn đầu tiên.",
                  },
                  {
                    question: "Tôi cần vốn bao nhiều để bắt đầu làm affiliate?",
                    answer:
                      "Gần như không cần vốn. Thứ bạn cần chỉ là điện thoại hoặc laptop + wifi. Mọi công cụ trong khóa học đều miễn phí hoặc có sẵn, bạn không phải bỏ tiền chạy ads ngay từ đầu. Có học viên trước đây của mình làm công nhân, lương tháng chỉ hơn 6 triệu, không dư nhiều tiền, nhưng bạn ấy vẫn làm affiliate được nhờ tập trung vào cách làm free traffic. Sau 2 tháng, bạn ấy đã có 4-5 triệu từ hoa hồng.",
                  },
                  {
                    question: "Bao lâu thì có thể kiếm được tiền đầu tiên?",
                    answer:
                      "Thời gian này không cố định. Có bạn mới học 2–3 tuần đã có hoa hồng về tài khoản, nhưng cũng có người mất 1–2 tháng. Khác biệt nằm ở chỗ bạn có thực hành đều hay không. Ví dụ một bạn nữ ở Bình Dương, ngay tuần thứ 3 sau khóa học đã có đơn đầu tiên nhờ làm video đều đặn mỗi ngày. Ngược lại, có bạn nam học cùng khóa, mãi đến tháng thứ 2 mới có đơn, vì bận việc riêng không đăng đều.",
                  },
                  {
                    question: "Tôi không biết làm content, có học được không?",
                    answer:
                      "Đây là thắc mắc nhiều bạn sợ nhất. Nhưng bạn yên tâm, khóa học có hướng dẫn chi tiết cách làm video và bài viết từ con số 0. Bạn không cần phải giỏi sáng tạo, chỉ cần biết làm theo công thức có sẵn. Một chị học viên 35 tuổi, chưa từng quay video bao giờ, còn rất ngại nói trước camera. Vậy mà sau khi làm đúng hướng dẫn, chị ấy đã đăng đều đặn mỗi tuần 3–4 video và có đơn hàng trong tháng đầu tiên.",
                  },
                  {
                    question:
                      "Tôi không có nhiều bạn bè/followers, làm sao kiếm tiền?",
                    answer:
                      "Bạn không cần phụ thuộc vào bạn bè hay followers cá nhân. Khóa học sẽ chỉ bạn cách xây fanpage, group, hoặc kênh riêng để kéo traffic tự nhiên. Nhiều học viên của mình ban đầu cũng nghĩ 'mình ít bạn bè thì chắc không ai mua đâu', nhưng thực tế, đơn hàng đến từ người lạ nhiều hơn. Ví dụ một bạn nam ở Hải Phòng, fb cá nhân chỉ có 200 bạn bè, nhưng sau khi làm page và đăng video review đều đặn, bạn ấy có hơn 3000 người follow và đơn hàng tăng liên tục.",
                  },
                  {
                    question:
                      "Tôi đang đi làm full-time, có đủ thời gian học không?",
                    answer:
                      "Hoàn toàn được. Nội dung khóa học được thiết kế để bạn có thể học và làm từng bước nhỏ, mỗi ngày chỉ cần 1–2 tiếng rảnh là đủ. Nhiều học viên của mình cũng đi làm công việc 8 tiếng, tối về mới tranh thủ học và thực hành. Có một anh làm kỹ sư xây dựng, thường tan ca rất muộn, nhưng mỗi tối anh ấy vẫn dành 1 tiếng để chỉnh video và đăng. Sau 2 tháng, anh đã có thêm 6–7 triệu từ affiliate.",
                  },
                  {
                    question: "Học xong có đảm bảo kiếm được tiền không?",
                    answer:
                      "Mình không hứa hẹn tuyệt đối vì kết quả phụ thuộc vào việc bạn có áp dụng đúng và kiên trì không. Nhưng khóa học đã chứng minh hiệu quả với rất nhiều học viên trước đây. Ví dụ có bạn học viên mới 20 tuổi, chỉ làm đều đặn theo đúng hướng dẫn, sau 1 tháng đã có thu nhập gần 2 triệu. Cũng có bạn khác chậm hơn, phải đến tháng thứ 2–3 mới ra đơn. Nói ngắn gọn, khóa học cung cấp đủ công cụ và kiến thức, còn lại phụ thuộc vào bạn.",
                  },
                  {
                    question:
                      "Shopee Affiliate có lừa đảo không? Có rủi ro gì không?",
                    answer:
                      "Shopee Affiliate là chương trình chính thức của Shopee, hoàn toàn minh bạch, bạn có thể kiểm tra trên website của Shopee. Rủi ro lớn nhất không nằm ở Shopee, mà ở bản thân mình — nếu bỏ dở giữa chừng hoặc làm sai cách thì không có đơn, vậy thôi. Có học viên ban đầu cũng nghi ngờ, sợ 'Shopee ăn chặn tiền'. Nhưng sau khi làm và nhận được hoa hồng về tài khoản ngân hàng, họ mới yên tâm.",
                  },
                  {
                    question: "Tôi cần chuẩn bị gì trước khi học?",
                    answer:
                      "Rất đơn giản: 1 chiếc điện thoại hoặc laptop có kết nối internet, và quan trọng hơn là tinh thần học hỏi. Bạn không cần vốn lớn, không cần kỹ năng gì đặc biệt trước. Có chị học viên ở Nghệ An, ban đầu chỉ dùng chiếc điện thoại cũ, camera không đẹp, nhưng vẫn quay video review được và ra đơn. Nếu có thêm tai nghe hoặc micro nhỏ thì tốt, nhưng không bắt buộc. Cái quan trọng là bạn sẵn sàng học và thực hành.",
                  },
                  {
                    question: "Thanh toán học phí như thế nào?",
                    answer:
                      "Có nhiều hình thức để bạn lựa chọn: chuyển khoản ngân hàng, ví điện tử hoặc làm theo hướng dẫn trên trang đăng ký. Toàn bộ quy trình đơn giản, chỉ mất vài phút. Học viên ở tỉnh xa hay nước ngoài vẫn đăng ký được bình thường. Một bạn ở Cần Thơ chia sẻ rằng chỉ mất 5 phút thanh toán qua ví Momo là đã nhận được ngay tài khoản học. Vậy nên bạn yên tâm, thanh toán rất nhanh và tiện.",
                  },
                  {
                    question: "Có được hoàn tiền nếu không hài lòng không?",
                    answer:
                      "Có. Khóa học có chính sách hoàn tiền rõ ràng trong thời gian nhất định (thường là 7 ngày), nếu bạn cảm thấy nội dung không phù hợp. Thực tế có vài học viên đăng ký vì tò mò, sau đó thấy mình chưa sẵn sàng nên xin hoàn tiền, và đều được xử lý nhanh chóng. Mình muốn bạn học với tâm thế thoải mái, không áp lực, nên nếu thực sự thấy không hợp thì cứ yên tâm rằng bạn có thể được hoàn tiền.",
                  },
                  {
                    question: "Tôi ở tỉnh xa, có học được không?",
                    answer:
                      "Hoàn toàn được. Khóa học online 100%, bạn chỉ cần có điện thoại hoặc laptop có mạng là học được ở bất cứ đâu. Có học viên ở tận vùng núi Hà Giang, sóng yếu nhưng vẫn tranh thủ học vào buổi tối. Sau 1 tháng kiên trì, bạn ấy đã có những đơn đầu tiên từ Shopee. Vậy nên bạn không cần lo khoảng cách địa lý, miễn có internet là mọi thứ đều sẵn sàng.",
                  },
                  {
                    question: "Nội dung khóa học có bị lỗi thời không?",
                    answer:
                      "Đây là câu hỏi nhiều người băn khoăn. Affiliate thay đổi nhanh, nhưng khóa học được cập nhật liên tục, bám sát chính sách mới của Shopee. Ví dụ năm ngoái Shopee thay đổi tỷ lệ hoa hồng ở một số ngành hàng, mình đã cập nhật lại ngay trong nội dung học để học viên không bị hụt hẫng. Bạn yên tâm rằng sẽ luôn có phiên bản mới nhất, tránh tình trạng học xong mà áp dụng không được.",
                  },
                  {
                    question: "Tôi 40 tuổi rồi, có quá tuổi để học không?",
                    answer:
                      "Không hề. Affiliate không phân biệt tuổi tác, quan trọng là bạn chịu học và làm. Có một cô học viên 42 tuổi ở Huế, trước đây chưa từng bán online, cũng không rành công nghệ. Nhưng sau khi học, cô vẫn biết cách làm video review đơn giản và đã có đơn đầu tiên chỉ sau hơn 1 tháng. Thậm chí nhiều anh chị lớn tuổi còn kiên trì và chịu khó hơn lớp trẻ, nên kết quả lại tốt hơn.",
                  },
                  {
                    question: "Có hỗ trợ sau khi mua khóa học không?",
                    answer:
                      "Có. Sau khi đăng ký, bạn sẽ được vào group kín để hỏi đáp, thảo luận và được hỗ trợ trực tiếp. Ngoài ra còn có những buổi live Q&A định kỳ để giải đáp thắc mắc thực tế. Một bạn học viên từng kẹt ở bước rút tiền hoa hồng, không biết làm sao, đã hỏi trong group và được hỗ trợ ngay trong ngày. Nhờ vậy bạn ấy rút tiền thành công và yên tâm tiếp tục.",
                  },
                  {
                    question:
                      "Affiliate Shopee có bị cạnh tranh khốc liệt không?",
                    answer:
                      "Thực tế là có cạnh tranh, vì ngày càng nhiều người tham gia. Nhưng thị trường còn rất rộng, hàng triệu người mua mỗi ngày, nên cơ hội vẫn rất lớn. Quan trọng là bạn biết cách chọn ngách sản phẩm, làm nội dung khác biệt và đều đặn. Một bạn học viên của mình chỉ tập trung vào đồ mẹ & bé, đăng video review thật đều, và đến nay vẫn có đơn hàng mỗi ngày. Cạnh tranh khốc liệt với người không có chiến lược, nhưng dễ dàng với người biết cách.",
                  },
                  {
                    question:
                      "Sau khóa học tôi có thể làm affiliate cho sàn khác không?",
                    answer:
                      "Hoàn toàn có thể. Kiến thức và kỹ năng bạn học được áp dụng chung cho nhiều sàn như Tiki, Lazada, TikTok Shop… Thậm chí nhiều học viên sau khi làm Shopee ổn định đã mở rộng sang TikTok Shop để tăng thêm thu nhập. Có một bạn ở Sài Gòn học khóa này, sau khi làm Shopee được 2 tháng, bạn ấy triển khai thêm Lazada và hiện có thêm 3–4 triệu/tháng từ đó. Vậy nên bạn không bị giới hạn chỉ ở một nền tảng.",
                  },
                  {
                    question:
                      "Tôi có giấy chứng nhận sau khi hoàn thành khóa học không?",
                    answer:
                      "Có. Khi hoàn thành đầy đủ các phần học, bạn sẽ nhận chứng nhận online. Giấy chứng nhận này không phải để xin việc, mà chủ yếu khẳng định bạn đã hoàn thành chương trình. Một số bạn học viên dùng chứng nhận để tạo thêm uy tín khi nhận cộng tác viên hoặc chia sẻ lại kinh nghiệm cho người khác. Đây cũng là một dấu mốc để bạn thấy mình đã đi hết chặng đường học tập.",
                  },
                  {
                    question:
                      "Khóa học có dạy cách tránh bị Shopee ban tài khoản không?",
                    answer:
                      "Có. Trong khóa học có riêng phần lưu ý về chính sách của Shopee và những lỗi thường gặp khiến tài khoản bị khóa. Ví dụ: spam link bừa bãi, dùng tool tự động, hay gian lận đơn hàng đều là những điều bạn phải tránh. Nhiều bạn học viên trước khi học từng bị khóa tài khoản, nhưng sau khi hiểu rõ quy tắc, họ đã làm lại một cách an toàn và bền vững. Vậy nên bạn sẽ được trang bị đầy đủ để tránh rủi ro.",
                  },
                  {
                    question: "Tôi có thể học ở đâu và khi nào?",
                    answer:
                      "Học online 100%, nên bạn có thể học bất cứ đâu, bất cứ lúc nào. Chỉ cần điện thoại hoặc laptop kết nối internet là truy cập được toàn bộ nội dung. Có học viên thường học vào buổi tối sau giờ làm, có bạn lại tranh thủ học buổi sáng sớm. Thậm chí có chị học viên ở nước ngoài vẫn học được bình thường. Khóa học không giới hạn thời gian, nên bạn hoàn toàn chủ động lịch trình của mình.",
                  },
                ].map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl px-6 hover:border-orange-300 transition-colors"
                  >
                    <AccordionTrigger
                      className="text-left text-lg font-semibold text-gray-900 hover:text-orange-600 transition-colors py-6"
                      data-testid={`accordion-trigger-faq-${index}`}
                    >
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pb-6 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Additional Testimonials Section */}
        <section className="py-12 sm:py-20 bg-gradient-to-br from-orange-50 via-white to-pink-50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Học viên nói gì về{" "}
                <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  khóa học
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
                Hơn 100+ học viên đã thành công với phương pháp của Hiếu
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto px-4 sm:px-0">
              {testimonials.slice(0, 15).map((testimonial, index) => (
                <Card
                  key={index}
                  className="group bg-white/90 backdrop-blur-md border border-pink-200 hover:border-pink-400 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-100/50 transform hover:-translate-y-1 h-full"
                >
                  <CardContent className="p-4 sm:p-6 flex flex-col h-full">
                    {/* Header with Avatar and Name */}
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {testimonial.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-sm">
                          {testimonial.name}
                        </h3>
                      </div>
                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>

                    {/* Feedback Content */}
                    <div className="flex-1">
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {testimonial.feedback}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-12 sm:py-20 bg-gradient-to-br from-orange-50/50 via-white to-pink-50/50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                Bắt đầu hành trình{" "}
                <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  Affiliate Shopee
                </span>{" "}
                ngay hôm nay
              </h2>

              <p className="text-xl text-gray-600 mb-8">
                Tuần trước, đã có thêm{" "}
                <span className="text-orange-600 font-bold">
                  8 học viên mới
                </span>{" "}
                đăng ký thành công.
              </p>

              <div className="mb-8">
                <button
                  onClick={() => {
                    const pricingSection = document.querySelector("#pricing");
                    if (pricingSection) {
                      pricingSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="group bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold text-xl px-12 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-pink-200/50"
                  data-testid="button-final-cta"
                >
                  Ghi danh ngay chỉ từ 2,990K
                </button>
              </div>

              {/* Rating Display */}
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-8 w-8 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                <p className="text-gray-600 text-lg">
                  <span className="text-gray-900 font-bold">4.95/5</span> từ hơn{" "}
                  <span className="text-pink-600 font-bold">100+ học viên</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
