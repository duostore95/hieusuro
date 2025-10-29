import { Mail, Phone, MapPin, Sparkles, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="container relative z-10 px-4 md:px-6 py-[4vh] md:py-[8vh]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand section */}
          <div className="space-y-6">
            <div className="flex items-center">
              <h3 className="text-2xl font-bold text-white">Hiếu Suro</h3>
              <span
                className="inline-block w-0.5 bg-indigo-500 ml-2 cursor-blink"
                style={{
                  height: "1.5em",
                }}
              ></span>
            </div>

            <p className="text-gray-400 leading-relaxed">
              Chuyên gia E-commerce Việt Nam giúp bạn làm chủ Shopee & TikTok
              Shop, từ zero đến hàng nghìn đơn mỗi tháng.
            </p>

            {/* Social links */}
            <div className="flex space-x-4">
              {[
                {
                  platform: "facebook",
                  icon: "fab fa-facebook-f",
                  href: "https://fb.com/hieusuro2",
                },
                {
                  platform: "youtube",
                  icon: "fab fa-youtube",
                  href: "https://youtube.com/@hieusuro",
                },
                {
                  platform: "zalo",
                  icon: "fab fa-telegram",
                  href: "https://zalo.me/0931459459",
                },
              ].map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  className="group w-12 h-12 bg-indigo-600 hover:bg-indigo-700 rounded-lg flex items-center justify-center transition-colors duration-200"
                  data-testid={`link-${social.platform}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={`${social.icon} text-white text-sm`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Courses section */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white flex items-center">
              <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
              Khóa học
            </h4>
            <ul className="space-y-3">
              {[
                { name: "ShopeeZoom - Từ Zero Đến Hero", href: "/shopeezoom" },
                { name: "Affiliate Shopee A-Z", href: "/affshopee" },
                { name: "TikTok Shop Mastery", href: "/hoc" },
                { name: "Tất cả khóa học", href: "/hoc" },
              ].map((course, index) => (
                <li key={index}>
                  <a
                    href={course.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <ExternalLink className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {course.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources section */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white flex items-center">
              <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
              Tài nguyên
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Blog", href: "/blog" },
                { name: "E-book miễn phí", href: "#ebook" },
                { name: "Podcast", href: "#" },
                { name: "Case studies", href: "/blog" },
              ].map((resource, index) => (
                <li key={index}>
                  <a
                    href={resource.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                    onClick={
                      resource.href.startsWith("#")
                        ? (e) => {
                            e.preventDefault();
                            if (resource.href === "#ebook") {
                              const element = document.getElementById("ebook");
                              if (element) {
                                element.scrollIntoView({ behavior: "smooth" });
                              }
                            }
                          }
                        : undefined
                    }
                  >
                    <ExternalLink className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact section */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white flex items-center">
              <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
              Liên hệ
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-400 group hover:text-white transition-colors">
                <Mail className="h-5 w-5 mt-0.5 text-orange-500 group-hover:text-orange-400 transition-colors" />
                <span>hieusurodotcom@gmail.com</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-400 group hover:text-white transition-colors">
                <Phone className="h-5 w-5 mt-0.5 text-green-500 group-hover:text-green-400 transition-colors" />
                <span>0931 459 459</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-400 group hover:text-white transition-colors">
                <MapPin className="h-5 w-5 mt-0.5 text-blue-500 group-hover:text-blue-400 transition-colors" />
                <span>Việt Nam</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-700/50 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-center md:text-left">
              © 2024 Hiếu Suro. All rights reserved.
            </p>

            <div className="flex justify-center md:justify-end">
              <div className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 px-4 py-2 rounded-full text-white text-sm font-medium flex items-center space-x-2 transition-all duration-300 cursor-pointer vietnam-badge-glow">
                <span className="bg-red-800 rounded-full w-8 h-8 flex items-center justify-center text-lg">
                  🇻🇳
                </span>
                <span>Hoàng Sa & Trường Sa là của Việt Nam!</span>
              </div>
            </div>
          </div>

          {/* Made with love */}
          <div className="text-center mt-8 pt-6 border-t border-gray-700/30">
            <p className="text-gray-500 text-sm flex items-center justify-center space-x-1">
              <span>Made with</span>
              <span className="text-red-500 animate-pulse">♥</span>
              <span>by Hiếu Suro</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
