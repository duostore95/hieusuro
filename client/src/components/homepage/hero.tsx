import { useState, useEffect } from "react";
import {
  Star,
  TrendingUp,
  Users,
  BookOpen,
  Zap,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const [animatedStats, setAnimatedStats] = useState({
    students: 0,
    courses: 0,
    rating: 0,
    experience: 0,
  });

  const finalStats = {
    students: 2563,
    courses: 3,
    rating: 4.9,
    experience: 10,
  };

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      // Set final values immediately
      setAnimatedStats(finalStats);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Use requestAnimationFrame for smoother animation
            const duration = 2000; // 2 seconds
            const startTime = performance.now();

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);

              // Easing function for smoother animation
              const easeOut = 1 - Math.pow(1 - progress, 3);

              setAnimatedStats({
                students: Math.floor(finalStats.students * easeOut),
                courses: Math.floor(finalStats.courses * easeOut),
                rating: Math.min(
                  finalStats.rating,
                  finalStats.rating * easeOut,
                ),
                experience: Math.floor(finalStats.experience * easeOut),
              });

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setAnimatedStats(finalStats);
              }
            };

            requestAnimationFrame(animate);
            observer.disconnect(); // Only animate once
          }
        });
      },
      { threshold: 0.3 },
    );

    const heroElement = document.getElementById("home");
    if (heroElement) {
      observer.observe(heroElement);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const achievements = [
    {
      icon: <Users className="h-6 w-6" />,
      value: animatedStats.students.toLocaleString(),
      label: "Seller thành công",
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      value: `${animatedStats.courses}+`,
      label: "Khóa học",
    },
    {
      icon: <Star className="h-6 w-6" />,
      value: animatedStats.rating.toFixed(1),
      label: "Đánh giá trung bình",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      value: `${animatedStats.experience}+`,
      label: "Năm kinh nghiệm",
    },
  ];

  return (
    <section
      id="home"
      className="relative min-h-[85vh] sm:min-h-fit flex items-start justify-center overflow-hidden bg-white py-[4vh] md:py-[8vh]"
    >
      <div className="container relative z-10 px-4 sm:px-6">
        <div className="flex flex-col items-center space-y-6 text-center">
          {/* Main Content */}
          <div className="space-y-4">
            <div className="inline-flex items-center px-4 py-2 bg-gray-100 border border-gray-200 rounded-full text-sm font-medium text-gray-700">
              <Zap className="mr-2 h-4 w-4 text-indigo-600" />
              Hiếu Suro
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-tight">
              {" "}
              <span className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                Kinh Doanh Online. Tự Do. Tận Hưởng Cuộc Sống.
              </span>
            </h1>

            <p className="mx-auto max-w-md sm:max-w-3xl text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 leading-snug sm:leading-relaxed">
              <strong>10 năm kinh doanh online tại Việt Nam</strong> - Mentor
              giúp bạn{" "}
              <span className="font-semibold text-gray-900">
                làm chủ Shopee & TikTok Shop
              </span>{" "}
              từ zero đến{" "}
              <span className="font-semibold text-gray-900">
                hàng nghìn đơn mỗi tháng
              </span>
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 w-full max-w-xl sm:max-w-4xl">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="group bg-white/80 supports-[backdrop-filter]:bg-white/60 border border-gray-100 rounded-lg p-3 sm:p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="inline-flex p-2 rounded-lg bg-indigo-50 text-indigo-600 mb-2">
                  {achievement.icon}
                </div>
                <div
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1"
                  data-testid={`stat-${index}`}
                >
                  {achievement.value}
                </div>
                <div className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="grid grid-cols-2 gap-3 max-w-xs sm:max-w-none sm:flex sm:flex-row sm:gap-4 pt-6 mx-auto px-4 sm:px-0">
            <Button
              onClick={() => scrollToSection("courses")}
              className="group relative bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-full text-sm sm:text-base font-medium shadow-sm sm:shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden leading-none"
              data-testid="button-explore-courses"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center">
                <BookOpen className="mr-1 sm:mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Khám phá khóa học</span>
                <span className="sm:hidden">Khóa học</span>
                <ArrowRight className="ml-1 sm:ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Button>

            <Button
              onClick={() => scrollToSection("blog")}
              variant="outline"
              className="group relative bg-white/90 backdrop-blur border-2 border-indigo-200 hover:border-indigo-300 text-indigo-700 hover:text-indigo-800 px-4 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-full text-sm sm:text-base font-medium shadow-sm sm:shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden leading-none"
              data-testid="button-read-blog"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/80 to-purple-50/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center">
                <TrendingUp className="mr-1 sm:mr-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                <span className="hidden sm:inline">Đọc blog</span>
                <span className="sm:hidden">Blog</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
