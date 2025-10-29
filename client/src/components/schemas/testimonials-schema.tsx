import { useQuery } from "@tanstack/react-query";
import { Testimonial } from "@shared/schema";
import { Helmet } from "react-helmet-async";

export default function TestimonialsSchema() {
  const { data: testimonials } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const generateReviewSchema = (testimonial: Testimonial) => {
    return {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": testimonial.rating,
        "bestRating": 5,
        "worstRating": 1
      },
      "author": {
        "@type": "Person",
        "name": testimonial.name,
        "jobTitle": testimonial.title,
        "worksFor": testimonial.company ? {
          "@type": "Organization",
          "name": testimonial.company
        } : undefined
      },
      "reviewBody": testimonial.content,
      "datePublished": testimonial.createdAt || new Date().toISOString(),
      "itemReviewed": {
        "@type": "EducationalOrganization",
        "name": "Hiếu Suro - Chuyên gia E-commerce",
        "description": "Mentor E-commerce hàng đầu với 7000+ đơn/3 ngày, 514 triệu doanh thu",
        "url": "https://hieusuro.com"
      }
    };
  };

  // Organization schema with aggregate rating
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Hiếu Suro - Chuyên gia E-commerce",
    "description": "Mentor E-commerce hàng đầu chuyên về Shopee và TikTok Shop",
    "url": "https://hieusuro.com",
    "founder": {
      "@type": "Person",
      "name": "Hiếu Suro",
      "jobTitle": "Chuyên gia E-commerce",
      "description": "Mentor E-commerce hàng đầu với 7000+ đơn/3 ngày, 514 triệu doanh thu"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": 4.9,
      "reviewCount": testimonials.length,
      "bestRating": 5,
      "worstRating": 1
    },
    "review": testimonials.map(generateReviewSchema)
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
    </Helmet>
  );
}