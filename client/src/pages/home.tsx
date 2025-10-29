import Header from "@/components/homepage/header";
import Hero from "@/components/homepage/hero";
import BlogSection from "@/components/homepage/blog-section";
import CoursesSection from "@/components/homepage/courses-section";
import EbookSection from "@/components/homepage/ebook-section";
import TestimonialsSection from "@/components/homepage/testimonials-section";
import AboutSection from "@/components/homepage/about-section";
import Footer from "@/components/homepage/footer";
import SEO from "@/components/seo";
import CoursesSchema from "@/components/schemas/courses-schema";
import TestimonialsSchema from "@/components/schemas/testimonials-schema";

export default function Home() {
  return (
    <>
      <SEO 
        title="Hiếu Suro - Chuyên gia E-commerce Shopee & TikTok Shop #1 Việt Nam"
        description="Hiếu Suro - Mentor E-commerce hàng đầu với 7000+ đơn/3 ngày, 514 triệu doanh thu. Khóa học Shopee, TikTok Shop từ A-Z. Đã đào tạo 500+ học viên thành công."
        keywords="hiếu suro, chuyên gia ecommerce, mentor shopee, tiktok shop, bán hàng online, affiliate shopee, khóa học shopee"
        ogImage="/attached_assets/hieu-suro-profile.png"
        canonical="https://hieusuro.replit.app/"
      />
      <CoursesSchema />
      <TestimonialsSchema />
      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <BlogSection />
          <CoursesSection />
          <EbookSection />
          <TestimonialsSection />
          <AboutSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
