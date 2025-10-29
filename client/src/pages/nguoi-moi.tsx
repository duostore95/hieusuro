import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/homepage/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  CheckCircle, 
  ChevronRight, 
  BookOpen, 
  Target,
  Rocket,
  Award,
  AlertCircle
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Helmet } from "react-helmet-async";
import type { BlogPost } from "@shared/schema";

interface Lesson {
  id: number;
  postId: string;
  moduleId: number;
  moduleName: string;
  title: string;
  duration: string;
  content: string;
  objectives: string[];
  actionSteps: string[];
}

export default function NguoiMoiPage() {
  const [currentLessonId, setCurrentLessonId] = useState(1);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [isAllCompleted, setIsAllCompleted] = useState(false);

  const { data: blogPosts, isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ["/api/posts", "nguoi-moi"],
    queryFn: async () => {
      const response = await fetch("/api/posts?type=nguoi-moi");
      if (!response.ok) {
        throw new Error("Failed to fetch lessons");
      }
      return response.json();
    },
  });

  const lessons: Lesson[] = blogPosts?.map((post, index) => ({
    id: index + 1,
    postId: post.id,
    moduleId: post.moduleId || 0,
    moduleName: post.moduleName || "",
    title: post.title,
    duration: post.duration || "5 phút đọc",
    content: post.content,
    objectives: post.objectives || [],
    actionSteps: post.actionSteps || [],
  })) || [];

  useEffect(() => {
    const saved = localStorage.getItem("nguoi-moi-progress");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setCompletedLessons(data.completedLessons || []);
        setCurrentLessonId(data.currentLessonId || 1);
      } catch (e) {
        console.error("Failed to parse saved progress", e);
      }
    }
  }, []);

  useEffect(() => {
    if (lessons.length > 0) {
      const validLessonIds = lessons.map(l => l.id);
      
      setCompletedLessons(prev => {
        const sanitized = prev.filter(id => validLessonIds.includes(id));
        return sanitized.length !== prev.length ? sanitized : prev;
      });
      
      setCurrentLessonId(prev => {
        if (!validLessonIds.includes(prev)) {
          return validLessonIds[0] || 1;
        }
        return prev;
      });
    }
  }, [lessons]);

  useEffect(() => {
    if (lessons.length > 0 && completedLessons.length === lessons.length && !isAllCompleted) {
      setIsAllCompleted(true);
    }
  }, [completedLessons, lessons.length, isAllCompleted]);

  useEffect(() => {
    const saveProgress = () => {
      localStorage.setItem("nguoi-moi-progress", JSON.stringify({
        completedLessons,
        currentLessonId
      }));
    };
    saveProgress();
  }, [completedLessons, currentLessonId]);

  const currentLesson = lessons.find(l => l.id === currentLessonId) || lessons[0];
  const progress = lessons.length > 0 ? (completedLessons.length / lessons.length) * 100 : 0;

  const isLessonCompleted = (lessonId: number) => completedLessons.includes(lessonId);

  const handleCompleteLesson = () => {
    if (!isLessonCompleted(currentLessonId)) {
      setCompletedLessons([...completedLessons, currentLessonId]);
    }
    
    if (currentLessonId < lessons.length) {
      setCurrentLessonId(currentLessonId + 1);
      const lessonCard = document.getElementById('lesson-card');
      if (lessonCard) {
        setTimeout(() => {
          lessonCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  };

  const handlePreviousLesson = () => {
    if (currentLessonId > 1) {
      setCurrentLessonId(currentLessonId - 1);
      const lessonCard = document.getElementById('lesson-card');
      if (lessonCard) {
        setTimeout(() => {
          lessonCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  };

  const handleLessonClick = (lessonId: number) => {
    setCurrentLessonId(lessonId);
    const lessonCard = document.getElementById('lesson-card');
    if (lessonCard) {
      setTimeout(() => {
        lessonCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const modules = lessons.length > 0 ? Array.from(
    lessons.reduce((map, lesson) => {
      if (!map.has(lesson.moduleId)) {
        map.set(lesson.moduleId, { id: lesson.moduleId, name: lesson.moduleName });
      }
      return map;
    }, new Map<number, { id: number; name: string }>()).values()
  ).sort((a, b) => a.id - b.id) : [];

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Khóa học cho người mới - Hiếu Suro</title>
          <meta name="description" content="Khóa học miễn phí cho người mới bắt đầu với Shopee Affiliate" />
        </Helmet>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 pt-24">
          <div className="container mx-auto px-4 py-16 max-w-7xl">
            <div className="text-center mb-16">
              <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
              <Skeleton className="h-6 w-1/2 mx-auto" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div>
                <Skeleton className="h-96 w-full" />
              </div>
              <div className="lg:col-span-3">
                <Skeleton className="h-[600px] w-full" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Helmet>
          <title>Lỗi - Hiếu Suro</title>
        </Helmet>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 pt-24">
          <div className="container mx-auto px-4 py-16 max-w-7xl">
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-8 text-center">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-red-900 mb-2">Không thể tải bài học</h2>
                <p className="text-red-700 mb-4">Đã có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.</p>
                <Button onClick={() => window.location.reload()} variant="outline">
                  Tải lại trang
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  }

  if (lessons.length === 0) {
    return (
      <>
        <Helmet>
          <title>Khóa học cho người mới - Hiếu Suro</title>
          <meta name="description" content="Khóa học miễn phí cho người mới bắt đầu với Shopee Affiliate" />
        </Helmet>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 pt-24">
          <div className="container mx-auto px-4 py-16 max-w-7xl">
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-8 text-center">
                <BookOpen className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Chưa có bài học nào</h2>
                <p className="text-gray-600 mb-4">
                  Các bài học đang được chuẩn bị. Vui lòng quay lại sau nhé!
                </p>
                <Link href="/">
                  <Button className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white">
                    Về trang chủ
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Khóa học cho người mới - Hiếu Suro</title>
        <meta name="description" content="Khóa học miễn phí dành cho người mới bắt đầu với Shopee Affiliate. Học từ cơ bản đến nâng cao, hoàn toàn miễn phí!" />
        <meta property="og:title" content="Khóa học cho người mới - Hiếu Suro" />
        <meta property="og:description" content="Khóa học miễn phí dành cho người mới bắt đầu với Shopee Affiliate" />
      </Helmet>
      <Header />
      
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 pt-12">
        <div className="container mx-auto px-4 py-3 max-w-7xl">
          <div className="text-center mb-16 relative">
            <Card className="max-w-3xl mx-auto bg-gradient-to-br from-white to-orange-50/30 shadow-xl border-orange-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-orange-600" />
                    <span className="text-base font-semibold text-gray-800">
                      Tiến độ học tập
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">
                      {completedLessons.length}/{lessons.length} bài hoàn thành
                    </span>
                    <span className="text-lg font-bold text-orange-600">
                      {Math.round(progress)}%
                    </span>
                  </div>
                </div>
                <Progress value={progress} className="h-3 bg-orange-100" />
                {progress === 100 && (
                  <div className="mt-4 flex items-center justify-center gap-2 text-green-700 bg-green-50 py-2 px-4 rounded-lg">
                    <Award className="h-5 w-5" />
                    <span className="font-semibold">Chúc mừng! Bạn đã hoàn thành khóa học!</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <Card className="bg-white shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-orange-600" />
                      Chương trình học
                    </h3>
                    
                    <div className="space-y-4">
                      {modules.map((module) => (
                        <div key={module.id} className="space-y-2">
                          <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                            Module {module.id}: {module.name}
                          </h4>
                          <div className="space-y-1">
                            {lessons.filter(l => l.moduleId === module.id).map((lesson) => (
                              <button
                                key={lesson.id}
                                onClick={() => handleLessonClick(lesson.id)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                  currentLessonId === lesson.id
                                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium'
                                    : isLessonCompleted(lesson.id)
                                    ? 'bg-green-50 text-green-800 hover:bg-green-100'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                                data-testid={`lesson-nav-${lesson.id}`}
                              >
                                <div className="flex items-center gap-2">
                                  {isLessonCompleted(lesson.id) ? (
                                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                  ) : (
                                    <div className="h-4 w-4 border-2 border-gray-300 rounded-full flex-shrink-0"></div>
                                  )}
                                  <span className="line-clamp-2">{lesson.id}. {lesson.title}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="lg:col-span-3">
              <Card className="bg-white scroll-mt-24" id="lesson-card">
                <CardContent className="p-8">
                  <div className="mb-8">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <span>Module {currentLesson.moduleId}: {currentLesson.moduleName}</span>
                      <span>•</span>
                      <span>{currentLesson.duration}</span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                      {currentLesson.title}
                    </h2>

                    <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                      <h4 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Sau bài này bạn sẽ:
                      </h4>
                      <ul className="space-y-1">
                        {currentLesson.objectives.map((obj, idx) => (
                          <li key={idx} className="text-orange-800 flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="prose prose-lg max-w-none mb-8">
                    <ReactMarkdown>{currentLesson.content}</ReactMarkdown>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-pink-50 p-6 rounded-xl mb-8">
                    <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <Award className="h-5 w-5 text-orange-600" />
                      Hành động ngay:
                    </h4>
                    <ul className="space-y-3">
                      {currentLesson.actionSteps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {idx + 1}
                          </div>
                          <span className="text-gray-800">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <Button
                      variant="outline"
                      onClick={handlePreviousLesson}
                      disabled={currentLessonId === 1}
                      className="flex items-center gap-2"
                      data-testid="button-previous-lesson"
                    >
                      <ChevronRight className="h-4 w-4 rotate-180" />
                      Bài trước
                    </Button>

                    {currentLessonId === lessons.length ? (
                      <Link href="/affshopee">
                        <Button 
                          className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white"
                          data-testid="button-advanced-course"
                        >
                          Tìm hiểu khóa nâng cao
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        onClick={handleCompleteLesson}
                        className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white flex items-center gap-2"
                        data-testid="button-complete-lesson"
                      >
                        {isLessonCompleted(currentLessonId) ? 'Bài tiếp theo' : 'Hoàn thành & Tiếp tục'}
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {currentLesson.id < lessons.length && (
                <Card className="mt-8 bg-gradient-to-br from-orange-50 to-pink-50 border-2 border-orange-200">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">
                      💡 Đã hiểu nền tảng rồi!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Lộ trình này miễn phí! Bạn có thể học và tham khảo thêm ở nhóm trên Facebook hen! Nếu bạn muốn học lớp Affiliate Shopee VIP, có động đồng học viên, có sự support từ Hiếu. Chi tiết bạn bấm vào bên dưới nghen!
                    </p>
                    <Link href="/hieusuro">
                      <Button 
                        size="lg" 
                        className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white"
                        data-testid="button-affiliate-course"
                      >
                        Tìm hiểu khóa Affiliate Shopee VIP
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {isAllCompleted && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-lg w-full">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                Chúc mừng bạn!
              </h2>
              <p className="text-gray-600 mb-6">
                Bạn đã hoàn thành khóa học miễn phí! Giờ là lúc HÀNH ĐỘNG và kiếm tiền thật!
              </p>
              <p className="text-sm text-gray-500 mb-6">
                💡 Muốn có mentor hỗ trợ 1-1, kịch bản chi tiết hơn, và roadmap từ 5M → 50M/tháng? Xem khóa nâng cao của mình nhé.
              </p>
              <div className="space-y-3">
                <Link href="/affshopee">
                  <Button 
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white"
                    data-testid="button-completion-advanced"
                  >
                    Tìm hiểu khóa nâng cao
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => {
                    setCurrentLessonId(1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full"
                  data-testid="button-restart-course"
                >
                  Học lại từ đầu
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
