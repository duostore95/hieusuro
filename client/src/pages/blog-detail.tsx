import { useParams, Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@shared/schema";
import { Calendar, Eye, ArrowLeft, Share2, BookmarkPlus, Clock, ArrowRight, User, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import Header from "@/components/homepage/header";
import Footer from "@/components/homepage/footer";
import SEO from "@/components/seo";
import { apiRequest } from "@/lib/queryClient";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { defaultSchema } from 'rehype-sanitize';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Custom sanitize schema to allow safe YouTube embeds
  const customSanitizeSchema = {
    ...defaultSchema,
    tagNames: [...(defaultSchema.tagNames || []), 'iframe'],
    attributes: {
      ...defaultSchema.attributes,
      iframe: [
        'src', 
        'width', 
        'height', 
        'frameBorder', 
        'allowFullScreen',
        'title',
        'referrerPolicy'
      ]
    },
    protocols: {
      ...defaultSchema.protocols,
      src: ['https']
    }
  };

  const { data: post, isLoading } = useQuery<BlogPost>({
    queryKey: [`/api/posts/slug/${slug}`],
    enabled: !!slug,
  });

  // Increment view count mutation
  const incrementViewMutation = useMutation({
    mutationFn: async (postSlug: string) => {
      return await apiRequest("POST", `/api/posts/slug/${postSlug}/view`);
    },
  });

  // Increment view count when post loads
  useEffect(() => {
    if (post && slug && !incrementViewMutation.isSuccess) {
      // Only increment once per session
      const viewedKey = `viewed_post_${post.id}`;
      const hasViewed = sessionStorage.getItem(viewedKey);
      
      if (!hasViewed) {
        incrementViewMutation.mutate(slug);
        sessionStorage.setItem(viewedKey, 'true');
      }
    }
  }, [post, slug]);

  const { data: allPosts } = useQuery<BlogPost[]>({
    queryKey: ["/api/posts"],
  });

  const relatedPosts = allPosts?.filter(p => 
    p.slug !== slug && p.status === "published" && p.showInBlog !== false
  ).slice(0, 3) || [];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title || "Blog Hiếu Suro",
          text: post?.excerpt || "Đang tải bài viết từ blog Hiếu Suro",
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link đã được sao chép!');
    }
  };

  return (
    <>
      <SEO 
        title={post ? `${post.title} | Blog Hiếu Suro` : "Đang tải... | Blog Hiếu Suro"}
        description={post ? post.excerpt : "Đang tải bài viết từ blog Hiếu Suro về E-commerce và bán hàng online"}
        keywords={post ? `${post.title.toLowerCase()}, hiếu suro, ecommerce, shopee, tiktok shop, bán hàng online` : "hiếu suro, blog ecommerce"}
        ogImage={post?.imageUrl || "/attached_assets/hieu-suro-profile.png"}
        canonical={slug ? `https://hieusuro.replit.app/blog/${slug}` : undefined}
      />
      
      {isLoading ? (
        <div className="min-h-screen bg-gray-50">
          <Header />
          <div className="container mx-auto px-4 md:px-6 py-16">
            <div className="animate-pulse space-y-8">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-12 bg-gray-200 rounded w-3/4"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      ) : !post ? (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Header />
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy bài viết</h1>
            <p className="text-gray-600 mb-6">Bài viết bạn đang tìm không tồn tại hoặc đã bị xóa.</p>
            <Link href="/blog">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Quay lại blog
              </Button>
            </Link>
          </div>
        </div>
      ) : (
      <div className="min-h-screen bg-gray-50">
        <Header />
      {/* Navigation - Hidden on mobile */}
      <div className="bg-white border-b hidden md:block">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <nav className="flex items-center space-x-4 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Trang chủ</Link>
            <span className="text-gray-300">/</span>
            <Link href="/blog" className="text-gray-500 hover:text-gray-700">Blog</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium truncate">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <div className="bg-white">
        <div className="container mx-auto px-4 md:px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {/* Back button */}
              <Link href="/blog">
                <Button variant="ghost" className="p-0 h-auto text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Quay lại blog
                </Button>
              </Link>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                {post.title}
              </h1>

              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-6 text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(post.publishedAt!).toLocaleDateString('vi-VN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                
                {post.views && post.views > 0 && (
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4" />
                    <span>{post.views} lượt xem</span>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>5 phút đọc</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center space-x-4">
                <Button onClick={handleShare} variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Chia sẻ
                </Button>
                <Button 
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  variant="outline" 
                  size="sm"
                  className={isBookmarked ? "bg-indigo-50 text-indigo-600 border-indigo-200" : ""}
                >
                  <BookmarkPlus className="mr-2 h-4 w-4" />
                  {isBookmarked ? "Đã lưu" : "Lưu bài"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {post.imageUrl && (
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-96 object-cover rounded-xl shadow-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.parentElement!.innerHTML = '<div class="w-full h-96 bg-gradient-to-br from-indigo-100 to-pink-100 rounded-xl flex items-center justify-center"><svg class="h-24 w-24 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg></div>';
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Article Content */}
      <div className="bg-white">
        <div className="container mx-auto px-4 md:px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              {/* Excerpt */}
              <p className="text-xl text-gray-700 leading-relaxed mb-8 font-medium border-l-4 border-indigo-500 pl-6 bg-indigo-50 py-4 rounded-r-lg">
                {post.excerpt}
              </p>
              
              {/* Content */}
              <div className="prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-900 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw, [rehypeSanitize, customSanitizeSchema]]}
                  components={{
                    img: ({src, alt, ...props}) => (
                      <img 
                        src={src} 
                        alt={alt} 
                        className="max-w-full h-auto rounded-lg shadow-lg my-6"
                        loading="lazy"
                        {...props}
                      />
                    ),
                    iframe: ({src, ...props}) => (
                      <div className="relative aspect-video my-8">
                        <iframe 
                          src={src}
                          className="absolute inset-0 w-full h-full rounded-lg shadow-lg"
                          allowFullScreen
                          {...props}
                        />
                      </div>
                    ),
                    a: ({href, children, ...props}) => (
                      <a 
                        href={href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline font-medium"
                        {...props}
                      >
                        {children}
                      </a>
                    ),
                    h1: ({children, ...props}) => (
                      <h1 className="text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200" {...props}>
                        {children}
                      </h1>
                    ),
                    h2: ({children, ...props}) => (
                      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4" {...props}>
                        {children}
                      </h2>
                    ),
                    h3: ({children, ...props}) => (
                      <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3" {...props}>
                        {children}
                      </h3>
                    ),
                    blockquote: ({children, ...props}) => (
                      <blockquote className="border-l-4 border-indigo-500 pl-6 my-6 bg-indigo-50 py-4 rounded-r-lg italic text-gray-700" {...props}>
                        {children}
                      </blockquote>
                    ),
                    code: ({children, ...props}) => (
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800" {...props}>
                        {children}
                      </code>
                    ),
                    pre: ({children, ...props}) => (
                      <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4" {...props}>
                        {children}
                      </pre>
                    ),
                    ul: ({children, ...props}) => (
                      <ul className="list-disc list-inside space-y-2 my-4 text-gray-700" {...props}>
                        {children}
                      </ul>
                    ),
                    ol: ({children, ...props}) => (
                      <ol className="list-decimal list-inside space-y-2 my-4 text-gray-700" {...props}>
                        {children}
                      </ol>
                    ),
                    li: ({children, ...props}) => (
                      <li className="leading-relaxed" {...props}>
                        {children}
                      </li>
                    ),
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="bg-white border-t">
        <div className="container mx-auto px-4 md:px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100 p-8 md:p-12">
              <div className="space-y-8">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
                  Khi bạn sẵn sàng, đây là 4 cách Hiếu có thể giúp bạn:
                </h3>
                
                <div className="space-y-6">
                  {/* Service 1 */}
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
                      <div>
                        <Link href="/shopeezoom" className="text-lg font-bold text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
                          Khóa học ShopeeZoom - Từ Zero Đến Hero
                        </Link>
                        <p className="text-gray-700 mt-2 leading-relaxed">
                          Giúp bạn bán hàng thành công trên Shopee từ con số 0. Học cách tạo shop, tối ưu listing, chạy quảng cáo hiệu quả và scale doanh thu bền vững.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Service 2 */}
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
                      <div>
                        <Link href="/affshopee" className="text-lg font-bold text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
                          Affiliate Shopee A-Z - Kiếm tiền từ Affiliate
                        </Link>
                        <p className="text-gray-700 mt-2 leading-relaxed">
                          Hướng dẫn chi tiết cách kiếm tiền từ Affiliate Shopee. Từ cách tạo content, chọn sản phẩm đến chiến lược marketing để tăng thu nhập.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Service 3 */}
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
                      <div>
                        <a href="#courses" className="text-lg font-bold text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
                          TikTok Shop Mastery - Làm chủ TikTok Shop
                        </a>
                        <p className="text-gray-700 mt-2 leading-relaxed">
                          Khóa học toàn diện giúp bạn làm chủ TikTok Shop từ Zero. Từ cách tạo video viral đến quản lý đơn hàng và phát triển doanh thu bền vững.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Service 4 */}
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">4</span>
                      <div>
                        <a href="https://zalo.me/0931459459" target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
                          Tư vấn 1-1 - Giải pháp cá nhân hóa
                        </a>
                        <p className="text-gray-700 mt-2 leading-relaxed">
                          Dịch vụ tư vấn riêng về chiến lược bán hàng Shopee và TikTok Shop. 
                          Phù hợp cho cá nhân và doanh nghiệp muốn giải pháp đặc thù.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Author Section */}
      <div className="bg-gray-50 border-t">
        <div className="container mx-auto px-4 md:px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
                {/* Author Avatar */}
                <div className="flex-shrink-0">
                  <img 
                    src="/attached_assets/hieu-suro-profile.png" 
                    alt="Hiếu Suro" 
                    className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100"
                  />
                </div>
                
                {/* Author Info */}
                <div className="flex-1">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">Hiếu Suro</h3>
                      <p className="text-indigo-600 font-medium">Chuyên gia E-commerce Shopee & TikTok Shop</p>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed">
                      Chuyên gia E-commerce với hơn 7 năm kinh nghiệm trên Shopee, TikTok Shop. 
                      Đã giúp 3000+ seller xây dựng shop thành công với tổng doanh thu hơn 500 tỷ đồng, 
                      từ người mới bắt đầu đến những shop hàng nghìn đơn mỗi tháng.
                    </p>
                    
                    {/* Author Links */}
                    <div className="flex flex-wrap items-center gap-4">
                      <a 
                        href="https://fb.com/hieusuro2" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-sm font-medium"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Facebook
                      </a>
                      
                      <a 
                        href="https://youtube.com/@hieusuro" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors duration-200 text-sm font-medium"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        YouTube
                      </a>
                      
                      <a 
                        href="https://zalo.me/0931459459" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors duration-200 text-sm font-medium"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Zalo
                      </a>
                      
                      <Link href="/#about">
                        <Button variant="outline" size="sm" className="text-sm">
                          <User className="h-4 w-4 mr-2" />
                          Tìm hiểu thêm
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-gray-50 border-t">
          <div className="container mx-auto px-4 md:px-6 py-16">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Bài viết liên quan</h2>
              
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="h-full">
                    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group cursor-pointer h-full flex flex-col">
                      {/* Image */}
                      <div className="relative overflow-hidden flex-shrink-0">
                        {relatedPost.imageUrl ? (
                          <img 
                            src={relatedPost.imageUrl} 
                            alt={relatedPost.title} 
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
                          className="w-full h-48 bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center"
                          style={{ display: relatedPost.imageUrl ? 'none' : 'flex' }}
                        >
                          <BookmarkPlus className="h-16 w-16 text-indigo-400" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 mb-2">
                          {relatedPost.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-1">
                          {relatedPost.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {new Date(relatedPost.publishedAt!).toLocaleDateString('vi-VN')}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-1 text-indigo-600 group-hover:text-indigo-700">
                            <span className="font-medium">Đọc thêm</span>
                            <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
      </div>
      )}
    </>
  );
}