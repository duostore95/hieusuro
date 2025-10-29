import { Button } from "@/components/ui/button";
import {
  Award,
  Users,
  TrendingUp,
  Play,
  Sparkles,
  Mail,
  Briefcase,
  Star,
} from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-[4vh] md:py-[8vh] bg-white">
      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gray-100 border border-gray-200 rounded-full text-sm font-medium text-gray-700">
              <Sparkles className="mr-2 h-4 w-4 text-indigo-600" />
              Chuyên gia E-commerce Shopee & TikTok
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                Về{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                  Hiếu Suro
                </span>
              </h2>

              <p className="text-xl text-gray-600 leading-relaxed">
                Mình là Hiếu Suro, Hiếu đang kinh doanh online.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed">
                Hiếu là một sinh viên ngành xây dựng tại ĐH SPKT HCM, tuy nhiên
                sau khi trải qua vài đồ án "xây nhà, xây cầu, xây đường" và thực
                tập tốt nghiệp tại dự án Golden Mansion thì Hiếu lại bỏ ngang,
                và cũng bỏ ngang luôn việc học đại học, vì Hiếu nhận ra đó không
                phải là đam mê, là nghề nghiệp mà mình sẽ theo đuổi.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed">
                Hiện tại Hiếu đang{" "}
                <span className="font-semibold text-gray-900">
                  kinh doanh online đa kênh
                </span>{" "}
                trên sàn Shopee, Lazada, TiktokShop… Ngoài ra Hiếu có viết blog
                và làm các video chia sẻ trên kênh youtube.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed">
                Năm 2019 Hiếu đã đạt{" "}
                <strong>kỷ luật bán 7000 đơn hàng trong 3 ngày</strong> đạt
                doanh số là{" "}
                <span className="font-semibold text-gray-900">514 triệu</span>.
                Hiện tại Hiếu có các lớp học bán hàng trên shopee học Online qua
                Zoom hoặc học Offline tại lớp.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed">
                Ngoài ra, Hiếu còn đào tạo tại các doanh nghiệp như:{" "}
                <strong>
                  tập đoàn Phú Mỹ (DPM), Shopee, Lazada, Misa, Sapo, Edumall
                </strong>
                … Các trường ĐH-CĐ như: Cao Đăng Lý Tự Trọng, ĐH Lao Động & Xã
                Hội, Trường Cao Đẳng Nghề Đà Lạt… Tổ chức phi chính phủ (NGO):
                The Dariu Foundation Vietnam.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed">
                Hiếu chúc bạn học tập thật tốt, trau dồi thêm nhiều kiến thức và
                đạt được{" "}
                <span className="font-semibold text-gray-900">
                  mức doanh thu như mình mong muốn
                </span>
                .
              </p>
            </div>

            {/* Achievements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: Award,
                  title: "Shopee Diamond Seller",
                  description: "Top 1% seller Việt Nam",
                },
                {
                  icon: Users,
                  title: "1000+ shop thành công",
                  description: "Học viên đạt ngàn đơn",
                },
                {
                  icon: TrendingUp,
                  title: "500+ tỷ doanh thu",
                  description: "Tổng GMV học viên",
                },
                {
                  icon: Play,
                  title: "YouTube Creator",
                  description: "Chia sẻ chiến lược thực tế",
                },
              ].map((achievement, index) => (
                <div
                  key={index}
                  className="group bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                      <achievement.icon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                data-testid="button-contact-mentoring"
                onClick={() =>
                  window.open("https://zalo.me/0931459459", "_blank")
                }
              >
                <Mail className="mr-2 h-4 w-4" />
                Tư vấn 1-1
              </Button>
              <Button
                variant="outline"
                className="bg-white border-2 border-indigo-200 hover:bg-gray-50 text-indigo-700 hover:text-indigo-900 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                data-testid="button-view-portfolio"
                onClick={() => (window.location.href = "/about")}
              >
                <Briefcase className="mr-2 h-4 w-4" />
                About Hiếu Suro
              </Button>
            </div>
          </div>

          {/* Profile section */}
          <div className="relative">
            <div className="relative group">
              {/* Main image */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                <img
                  src="/attached_assets/hieu-suro-profile.png"
                  alt="Hiếu Suro professional portrait"
                  className="w-full h-auto"
                  loading="lazy"
                />

                {/* Overlay gradient */}
              </div>

              {/* Floating stats card - Hidden */}
              <div className="hidden absolute -bottom-8 -right-8 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex -space-x-3">
                    {[
                      "/attached_assets/hieu-suro-profile.png",
                      "/attached_assets/hieu-suro-profile.png",
                      "/attached_assets/hieu-suro-profile.png",
                    ].map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        alt="Student"
                        className="w-10 h-10 rounded-full border-3 border-white shadow-lg"
                      />
                    ))}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">1000+ học viên</p>
                    <div className="flex items-center space-x-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="h-4 w-4 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        4.9
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating decorative elements */}
          </div>
        </div>
      </div>
    </section>
  );
}
