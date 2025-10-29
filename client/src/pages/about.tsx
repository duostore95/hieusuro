import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Star,
  Users,
  Trophy,
  TrendingUp,
  Youtube,
  ShoppingBag,
  Heart,
  CheckCircle,
  Award,
  Target,
  Zap,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { SiShopee, SiTiktok, SiFacebook, SiYoutube } from "react-icons/si";
import { Link } from "wouter";
import Header from "@/components/homepage/header";
import Footer from "@/components/homepage/footer";
import SEO from "@/components/seo";

export default function AboutPage() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 3 },
    },
  });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  // Personal photos gallery (user will update later)
  const personalPhotos = Array.from({ length: 18 }, (_, i) => ({
    id: i + 1,
    placeholder: `/attached_assets/personal-${i + 1}.png`, // User will replace these
  }));

  const achievements = [
    {
      icon: <Trophy className="h-6 w-6" />,
      value: "Diamond Seller",
      label: "Top 1% seller Việt Nam",
    },
    {
      icon: <Users className="h-6 w-6" />,
      value: "3000+",
      label: "Shop thành công",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      value: "500+ tỷ",
      label: "Tổng GMV học viên",
    },
    {
      icon: <Award className="h-6 w-6" />,
      value: "50+",
      label: "Workshop E-commerce",
    },
  ];

  const skills = [
    {
      title: "YouTuber & Content Creator",
      description:
        "Tạo nội dung giáo dục về e-commerce và bán hàng online cho hàng trăm nghìn người theo dõi.",
      icon: <Youtube className="h-8 w-8" />,
      platforms: ["YouTube", "TikTok", "Facebook"],
    },
    {
      title: "Top Seller & Diamond Merchant",
      description:
        "Shopee Diamond Seller với kinh nghiệm 8+ năm bán hàng online và quản lý hệ thống shop.",
      icon: <ShoppingBag className="h-8 w-8" />,
      platforms: ["Shopee", "TikTok Shop", "Lazada"],
    },
    {
      title: "Mentor & Coach",
      description:
        "Đào tạo và hướng dẫn hàng nghìn học viên thành công trong lĩnh vực e-commerce.",
      icon: <Target className="h-8 w-8" />,
      platforms: ["1-on-1 Coaching", "Group Training", "Online Courses"],
    },
  ];

  const timeline = [
    {
      year: "2014",
      title: "Vào Sài Gòn học tập",
      description:
        "Sinh viên Xây Dựng, làm đủ nghề mưu sinh: bồi bàn, phục vụ, bảo vệ, bán hàng... để trang trải học phí.",
    },
    {
      year: "2016",
      title: "Từ nhân viên thành 'Chủ'",
      description:
        "Không làm thuê nữa, bắt đầu nhập hàng Trung Quốc bán ngoài lề đường ở khu ký túc xá sinh viên.",
    },
    {
      year: "2017",
      title: "Lớp Digital Marketing đầu tiên",
      description:
        "Tổ chức lớp học đầu tiên (2tr/người, 10 ngày), chủ yếu doanh nghiệp tham gia và nhiều người thành công.",
    },
    {
      year: "2018",
      title: "Kỷ lục 7000+ đơn trong 3 ngày",
      description:
        "Đạt kỷ lục chưa từng có: 7000+ đơn hàng, doanh thu 514 triệu trong 3 ngày trên Shopee, Lazada & Sendo.",
    },
    {
      year: "2019",
      title: "Gặp Idol Thế Khương & Viết Ebook",
      description:
        "Kết bạn với anh Thế Khương, được khuyến khích chia sẻ. Viết ebook 120 trang về kinh nghiệm bán hàng.",
    },
    {
      year: "2020",
      title: "Hợp tác đa nền tảng",
      description:
        "Hợp tác với KTcity, Gitiho, MISA Academy, Kyna, Edumall, Udemy... mở rộng tệp học viên.",
    },
    {
      year: "2024",
      title: "Chuyên gia E-commerce #1",
      description:
        "Được công nhận là chuyên gia hàng đầu Việt Nam về Shopee & TikTok Shop với 3000+ shop thành công.",
    },
  ];

  const socialStats = [
    {
      platform: "YouTube",
      followers: "100K+",
      icon: <SiYoutube className="h-5 w-5" />,
    },
    {
      platform: "TikTok",
      followers: "250K+",
      icon: <SiTiktok className="h-5 w-5" />,
    },
    {
      platform: "Facebook",
      followers: "150K+",
      icon: <SiFacebook className="h-5 w-5" />,
    },
    {
      platform: "Shopee",
      followers: "50K+",
      icon: <SiShopee className="h-5 w-5" />,
    },
  ];

  return (
    <>
      <SEO
        title="Về Hiếu Suro - Chuyên gia E-commerce #1 Việt Nam | Hành trình từ Zero đến Diamond Seller"
        description="Tìm hiểu về Cao Lê Ngọc Hiếu (Hiếu Suro) - Kỹ sư Xây Dựng trở thành chuyên gia E-commerce #1 VN. Kỷ lục 7000+ đơn/3 ngày, 514 triệu doanh thu, đào tạo 3000+ shop thành công."
        keywords="hiếu suro, về hiếu suro, cao lê ngọc hiếu, chuyên gia ecommerce việt nam, diamond seller shopee, mentor tiktok shop, youtber ecommerce"
        canonical="https://hieusuro.replit.app/about"
        ogImage="/attached_assets/hieu-suro-profile.png"
      />
      <div className="min-h-screen bg-white">
        <Header />

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-indigo-50 via-white to-pink-50 pt-20 pb-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700">
                    <Zap className="mr-2 h-4 w-4 text-indigo-600" />
                    Về Hiếu Suro
                  </div>

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    I'm{" "}
                    <span className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                      Hiếu Suro
                    </span>
                  </h1>

                  <h2 className="text-2xl md:text-3xl font-semibold text-gray-700">
                    <span className="text-red-600">YouTuber</span> &{" "}
                    <span className="text-orange-600">Top Seller</span>
                  </h2>

                  <p className="text-xl text-gray-600 leading-relaxed">
                    <strong>Cao Lê Ngọc Hiếu</strong> (sinh 02/12/1995, quê Bình
                    Thuận) - Kỹ sư Xây Dựng nhưng đam mê E-commerce. Từ sinh
                    viên làm đủ nghề mưu sinh đến Diamond Seller với kỷ lục{" "}
                    <strong>7000+ đơn hàng trong 3 ngày</strong>, doanh thu{" "}
                    <strong>514 triệu</strong>. Hiện tại giúp{" "}
                    <strong>3000+ shop thành công</strong> với tổng GMV{" "}
                    <strong>500+ tỷ đồng</strong>.
                  </p>
                </div>

                {/* Social Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {socialStats.map((stat, index) => (
                    <Card
                      key={index}
                      className="text-center p-4 hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-2">
                        <div className="flex justify-center mb-2">
                          {stat.icon}
                        </div>
                        <div className="font-bold text-lg">
                          {stat.followers}
                        </div>
                        <div className="text-sm text-gray-600">
                          {stat.platform}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://youtube.com/@hieusuro"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="link-youtube"
                  >
                    <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl w-full">
                      <Youtube className="mr-2 h-5 w-5" />
                      Xem YouTube Channel
                    </Button>
                  </a>
                  <Link href="/hoc" data-testid="link-courses">
                    <Button
                      variant="outline"
                      className="border-2 border-indigo-200 hover:bg-indigo-50 px-8 py-3 rounded-xl w-full"
                    >
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      Khóa học của tôi
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Image */}
              <div className="relative">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src="/attached_assets/hieu-suro-profile.png"
                    alt="Hiếu Suro - Chuyên gia E-commerce"
                    className="w-full h-auto object-cover"
                  />

                  {/* Floating achievement badge */}
                  <div className="absolute top-6 right-6 bg-white rounded-xl p-4 shadow-lg">
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      <div>
                        <div className="font-bold text-lg">Diamond</div>
                        <div className="text-sm text-gray-600">Seller</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Thành tựu nổi bật
              </h2>
              <p className="text-xl text-gray-600">
                Những con số biết nói về hành trình E-commerce của tôi
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <Card
                  key={index}
                  className="text-center p-6 hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">
                      {achievement.icon}
                    </div>
                    <div className="font-bold text-2xl text-gray-900 mb-2">
                      {achievement.value}
                    </div>
                    <div className="text-gray-600">{achievement.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Skills & Expertise */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Chuyên môn & Kinh nghiệm
              </h2>
              <p className="text-xl text-gray-600">
                3 vai trò chính trong hành trình E-commerce
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {skills.map((skill, index) => (
                <Card
                  key={index}
                  className="p-6 hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-pink-100 rounded-2xl flex items-center justify-center mb-6 text-indigo-600">
                      {skill.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {skill.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{skill.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {skill.platforms.map((platform, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Hành trình thành công
              </h2>
              <p className="text-xl text-gray-600">
                Từ zero đến chuyên gia E-commerce Việt Nam
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start mb-8 last:mb-0">
                  <div className="flex-shrink-0 w-24 text-right mr-8">
                    <div className="inline-block bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {item.year}
                    </div>
                  </div>
                  <div className="relative flex-1">
                    <div className="absolute left-0 top-2 w-3 h-3 bg-indigo-600 rounded-full -ml-6"></div>
                    {index !== timeline.length - 1 && (
                      <div className="absolute left-0 top-5 w-0.5 h-16 bg-gray-300 -ml-5"></div>
                    )}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 ml-2">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Personal Photos Section */}
        <div className="py-16 bg-gradient-to-br from-indigo-50 via-white to-pink-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Hình ảnh cá nhân
              </h2>
              <p className="text-xl text-gray-600">
                Những khoảnh khắc đáng nhớ trong hành trình phát triển sự nghiệp
              </p>
            </div>

            <div className="relative">
              <div
                className="overflow-hidden"
                ref={emblaRef}
                data-testid="carousel-proof-images"
              >
                <div className="flex gap-4">
                  {personalPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="flex-none w-64 md:w-72 lg:w-80"
                      data-testid={`image-personal-${photo.id}`}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardContent className="p-0">
                          <div className="aspect-[3/4] bg-gradient-to-br from-indigo-100 to-pink-100 rounded-lg flex items-center justify-center">
                            <div className="text-center text-gray-500">
                              <ImageIcon className="h-12 w-12 mx-auto mb-2 text-indigo-400" />
                              <p className="text-sm font-medium">
                                Ảnh cá nhân {photo.id}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={scrollPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center z-10"
                data-testid="button-carousel-prev"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>

              <button
                onClick={scrollNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center z-10"
                data-testid="button-carousel-next"
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Swipe hint */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-500">
                ← Vuốt qua trái/phải để xem thêm ảnh →
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Sứ mệnh của tôi
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                "Sứ mệnh của Hiếu là giúp đỡ những bạn biết cách bán hàng online
                và kiếm thêm thu nhập. Tôi tin rằng mọi người đều có thể thành
                công trong E-commerce nếu được hướng dẫn đúng cách. Đã chia sẻ
                thì phải chia sẻ hết lòng, không giấu diếm, vì điều đó sẽ bị
                phát hiện ngay thôi."
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Nhiệt tình</h3>
                  <p className="text-gray-600">
                    Bạn bè, đối tác, học viên đều dành cho Hiếu 2 từ 'nhiệt
                    tình'
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Cho đi</h3>
                  <p className="text-gray-600">
                    Chia sẻ hết lòng, không giấu diếm, vì con tim mách bảo
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Chân thành</h3>
                  <p className="text-gray-600">
                    Không dám nhận mình giỏi, chỉ là người bình thường với sự
                    nhiệt thành
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 bg-gradient-to-r from-indigo-600 to-pink-600">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Sẵn sàng bắt đầu hành trình E-commerce?
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Tham gia cùng hàng nghìn học viên đã thành công với phương pháp
              của tôi
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/hoc" data-testid="link-courses-bottom">
                <Button className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold w-full">
                  Xem khóa học
                </Button>
              </Link>
              <Link href="/blog" data-testid="link-blog">
                <Button
                  variant="outline"
                  className="border-2 border-white text-pink-200 hover:bg-white hover:text-indigo-600 px-8 py-3 rounded-xl w-full"
                >
                  Đọc Blog
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
