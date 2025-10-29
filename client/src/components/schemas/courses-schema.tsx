import { useQuery } from "@tanstack/react-query";
import { Course } from "@shared/schema";
import { Helmet } from "react-helmet-async";

export default function CoursesSchema() {
  const { data: courses } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  if (!courses || courses.length === 0) {
    return null;
  }

  const generateCourseSchema = (course: Course) => {
    return {
      "@type": "Course",
      "name": course.title,
      "description": course.description,
      "provider": {
        "@type": "Organization",
        "name": "Hiếu Suro - Chuyên gia E-commerce",
        "url": "https://hieusuro.com"
      },
      "offers": {
        "@type": "Offer",
        "price": parseFloat(course.price),
        "priceCurrency": "VND",
        "availability": "https://schema.org/InStock"
      },
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "online",
        "duration": course.duration,
        "instructor": {
          "@type": "Person",
          "name": "Hiếu Suro",
          "jobTitle": "Chuyên gia E-commerce",
          "description": "Mentor E-commerce hàng đầu với 7000+ đơn/3 ngày, 514 triệu doanh thu"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": parseFloat(course.rating || "5.0"),
        "reviewCount": course.studentCount || 100,
        "bestRating": 5,
        "worstRating": 1
      },
      "image": course.imageUrl || "/attached_assets/hieu-suro-profile.png",
      "url": course.courseUrl ? `https://hieusuro.com${course.courseUrl}` : "https://hieusuro.com/hoc"
    };
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Khóa học E-commerce của Hiếu Suro",
    "description": "Những khóa học thực chiến để làm chủ Shopee & TikTok Shop",
    "numberOfItems": courses.length,
    "itemListElement": courses.map((course, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": generateCourseSchema(course)
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
}