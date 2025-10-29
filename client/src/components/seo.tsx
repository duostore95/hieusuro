import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  robots?: string;
}

export default function SEO({ 
  title = "Hiếu Suro - Chuyên gia E-commerce Shopee & TikTok Shop #1 Việt Nam",
  description = "Hiếu Suro - Mentor E-commerce hàng đầu với 7000+ đơn/3 ngày, 514 triệu doanh thu. Khóa học Shopee, TikTok Shop từ A-Z. Đã đào tạo 500+ học viên thành công.",
  keywords = "hiếu suro, chuyên gia ecommerce, mentor shopee, tiktok shop, bán hàng online, affiliate shopee",
  ogImage = "/attached_assets/hieu-suro-profile.png",
  ogType = "website",
  canonical,
  robots = "index, follow"
}: SEOProps) {
  // Get base URL for absolute URLs
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const absoluteOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;
  const currentUrl = canonical || (typeof window !== 'undefined' ? window.location.href : '');
  
  // Strip HTML/markdown from description to ensure plain text
  const cleanDescription = description.replace(/<[^>]*>/g, '').replace(/[*_`#]/g, '');
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={cleanDescription} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={cleanDescription} />
      <meta property="og:image" content={absoluteOgImage} />
      {currentUrl && <meta property="og:url" content={currentUrl} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={cleanDescription} />
      <meta name="twitter:image" content={absoluteOgImage} />
      
      {/* Canonical URL - only set if explicitly provided */}
      {canonical && !canonical.includes('yourdomain.com') && <link rel="canonical" href={canonical} />}
      
      {/* Additional SEO Meta Tags */}
      <meta name="robots" content={robots} />
      <meta name="author" content="Hiếu Suro" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
  );
}