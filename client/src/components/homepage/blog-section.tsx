import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@shared/schema";
import {
  Calendar,
  Eye,
  ArrowRight,
  BookOpen,
  TrendingUp,
  Clock,
} from "lucide-react";
import { Link } from "wouter";

export default function BlogSection() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/posts"],
  });

  const latestPosts = posts?.filter(post => 
    post.status === "published" && 
    post.showInBlog !== false
  ).slice(0, 3) || [];

  if (isLoading) {
    return (
      <section id="blog" className="py-[4vh] md:py-[8vh] bg-white">
        <div className="container relative z-10 px-4 sm:px-6">
          <div className="flex flex-col items-center justify-center space-y-6 text-center mb-12">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                Blog mới nhất
              </h2>
              <p className="max-w-3xl text-lg md:text-xl text-gray-600 leading-relaxed">
                Những insights và strategies mới nhất về bán hàng Shopee và
                TikTok Shop
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-7xl items-center gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card
                key={i}
                className="group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                <div className="w-full h-48 bg-gray-200"></div>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-[4vh] md:py-[8vh] bg-white">
      <div className="container relative z-10 px-4 sm:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gray-100 border border-gray-200 rounded-full text-sm font-medium text-gray-700">
            <BookOpen className="mr-2 h-4 w-4 text-indigo-600" />
            Kiến thức E-commerce
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
              Blog{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                mới nhất
              </span>
            </h2>
            <p className="max-w-3xl text-lg md:text-xl text-gray-600 leading-relaxed">
              Những <strong>chiến lược và kinh nghiệm</strong> thực chiến về{" "}
              <span className="font-semibold text-gray-900">
                bán hàng Shopee
              </span>{" "}
              và{" "}
              <span className="font-semibold text-gray-900">TikTok Shop</span>
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl items-stretch gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post, index) => (
            <Card
              key={post.id}
              className="group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden relative h-full flex flex-col"
            >
              {/* Blog post image */}
              <Link href={`/blog/${post.slug}`}>
                <div className="relative overflow-hidden cursor-pointer">
                  {post.imageUrl ? (
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const placeholder = target.nextElementSibling as HTMLElement;
                        if (placeholder) placeholder.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className="w-full h-48 bg-gradient-to-br from-indigo-100 to-pink-100 flex items-center justify-center"
                    style={{ display: post.imageUrl ? 'none' : 'flex' }}
                  >
                    <BookOpen className="h-16 w-16 text-indigo-400" />
                  </div>

                  {/* Views badge */}
                  {post.views && post.views > 0 && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-white border border-gray-200 rounded-full px-3 py-1 flex items-center space-x-1">
                        <Eye className="h-3 w-3 text-gray-600" />
                        <span className="text-xs font-medium text-gray-600">
                          {post.views}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Reading time estimate */}
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-gray-800 rounded-full px-3 py-1 flex items-center space-x-1">
                      <Clock className="h-3 w-3 text-white" />
                      <span className="text-xs font-medium text-white">
                        5 phút đọc
                      </span>
                    </div>
                  </div>
                </div>
              </Link>

              <CardContent className="p-4 sm:p-6 flex-1 flex flex-col">
                <div className="space-y-4 flex-1 flex flex-col">
                  <Link href={`/blog/${post.slug}`}>
                    <h3
                      className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 cursor-pointer hover:text-indigo-600"
                      data-testid={`blog-title-${post.id}`}
                    >
                      {post.title}
                    </h3>
                  </Link>

                  {/* Date */}
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span data-testid={`blog-date-${post.id}`}>
                      {new Date(post.publishedAt!).toLocaleDateString("vi-VN")}
                    </span>
                  </div>

                  <p
                    className="text-gray-600 line-clamp-3 flex-1"
                    data-testid={`blog-excerpt-${post.id}`}
                  >
                    {post.excerpt}
                  </p>

                  {/* Read more CTA */}
                  <div className="mt-auto">
                    <Link href={`/blog/${post.slug}`}>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-indigo-600 hover:text-indigo-700 font-semibold group/btn"
                        data-testid={`blog-read-more-${post.id}`}
                      >
                        Đọc thêm
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View all blogs CTA */}
        <div className="text-center mt-12">
          <Link href="/blog">
            <Button
              variant="outline"
              size="lg"
              className="bg-white border-2 border-indigo-200 hover:bg-gray-50 text-indigo-700 hover:text-indigo-900 px-8 py-4 rounded-xl text-lg font-semibold shadow-sm hover:shadow-md transition-all duration-200"
              data-testid="view-all-posts"
            >
              <TrendingUp className="mr-2 h-5 w-5" />
              Xem tất cả bài viết
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
