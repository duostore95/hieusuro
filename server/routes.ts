import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertBlogPostSchema,
  insertCourseSchema,
  insertTestimonialSchema,
  insertLeadSchema,
  insertSettingSchema,
  insertLandingPageViewSchema
} from "@shared/schema";
import { z } from "zod";
import { requireAuth, createSession, destroySession, verifyCredentials } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication Routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
      }
      
      if (await verifyCredentials(username, password)) {
        const sessionToken = createSession();
        res.json({ 
          success: true, 
          token: sessionToken,
          message: "Đăng nhập thành công" 
        });
      } else {
        res.status(401).json({ 
          error: "Invalid credentials", 
          message: "Tên đăng nhập hoặc mật khẩu không đúng" 
        });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/auth/logout", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const sessionId = authHeader.substring(7);
        destroySession(sessionId);
      }
      res.json({ success: true, message: "Đăng xuất thành công" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/auth/change-password", requireAuth, async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      
      if (!oldPassword || !newPassword) {
        return res.status(400).json({ 
          error: "Old password and new password are required",
          message: "Vui lòng nhập đầy đủ mật khẩu cũ và mật khẩu mới" 
        });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({ 
          error: "Password too short",
          message: "Mật khẩu mới phải có ít nhất 6 ký tự" 
        });
      }

      // Verify old password
      const adminUsername = process.env.ADMIN_USERNAME || "admin";
      if (!(await verifyCredentials(adminUsername, oldPassword))) {
        return res.status(401).json({ 
          error: "Invalid old password",
          message: "Mật khẩu hiện tại không đúng" 
        });
      }

      // Update password in persistent storage
      await storage.setAdminPassword(newPassword);
      
      res.json({ 
        success: true, 
        message: "Mật khẩu đã được thay đổi thành công" 
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Blog Posts Routes
  app.get("/api/posts", async (req, res) => {
    try {
      const { type } = req.query;
      let posts = await storage.getAllBlogPosts();
      
      if (type === "nguoi-moi") {
        posts = posts
          .filter(post => 
            post.showInNguoiMoi === true && 
            post.status === "published" &&
            typeof post.moduleId === 'number' &&
            post.moduleId >= 0 &&
            typeof post.moduleName === 'string' &&
            post.moduleName.trim() !== "" &&
            typeof post.lessonOrder === 'number' &&
            post.lessonOrder >= 0
          )
          .sort((a, b) => {
            if (a.moduleId !== b.moduleId) {
              return (a.moduleId || 0) - (b.moduleId || 0);
            }
            return (a.lessonOrder || 0) - (b.lessonOrder || 0);
          });
      }
      
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  // Get blog post by slug (must be before /:id route)
  app.get("/api/posts/slug/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  // Increment view count for a blog post by slug
  app.post("/api/posts/slug/:slug/view", async (req, res) => {
    try {
      const post = await storage.incrementBlogPostViewsBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json({ views: post.views });
    } catch (error) {
      res.status(500).json({ error: "Failed to increment views" });
    }
  });

  app.get("/api/posts/:id", async (req, res) => {
    try {
      const post = await storage.getBlogPost(req.params.id);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  // Increment view count for a blog post
  app.post("/api/posts/:id/view", async (req, res) => {
    try {
      const post = await storage.incrementBlogPostViews(req.params.id);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json({ views: post.views });
    } catch (error) {
      res.status(500).json({ error: "Failed to increment views" });
    }
  });

  app.post("/api/posts", requireAuth, async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid input data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create blog post" });
    }
  });

  app.put("/api/posts/:id", requireAuth, async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.updateBlogPost(req.params.id, validatedData);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid input data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update blog post" });
    }
  });

  app.delete("/api/posts/:id", requireAuth, async (req, res) => {
    try {
      const success = await storage.deleteBlogPost(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete blog post" });
    }
  });

  // Courses Routes
  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await storage.getAllCourses();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch courses" });
    }
  });

  app.get("/api/courses/:id", async (req, res) => {
    try {
      const course = await storage.getCourse(req.params.id);
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
      res.json(course);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch course" });
    }
  });

  app.post("/api/courses", requireAuth, async (req, res) => {
    try {
      const validatedData = insertCourseSchema.parse(req.body);
      const course = await storage.createCourse(validatedData);
      res.status(201).json(course);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid input data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create course" });
    }
  });

  app.put("/api/courses/:id", requireAuth, async (req, res) => {
    try {
      const validatedData = insertCourseSchema.partial().parse(req.body);
      const course = await storage.updateCourse(req.params.id, validatedData);
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
      res.json(course);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid input data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update course" });
    }
  });

  app.delete("/api/courses/:id", requireAuth, async (req, res) => {
    try {
      const success = await storage.deleteCourse(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Course not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete course" });
    }
  });

  // Testimonials Routes
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  app.get("/api/testimonials/:id", async (req, res) => {
    try {
      const testimonial = await storage.getTestimonial(req.params.id);
      if (!testimonial) {
        return res.status(404).json({ error: "Testimonial not found" });
      }
      res.json(testimonial);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch testimonial" });
    }
  });

  app.post("/api/testimonials", requireAuth, async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);
      res.status(201).json(testimonial);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid input data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create testimonial" });
    }
  });

  app.put("/api/testimonials/:id", requireAuth, async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.partial().parse(req.body);
      const testimonial = await storage.updateTestimonial(req.params.id, validatedData);
      if (!testimonial) {
        return res.status(404).json({ error: "Testimonial not found" });
      }
      res.json(testimonial);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid input data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update testimonial" });
    }
  });

  app.delete("/api/testimonials/:id", requireAuth, async (req, res) => {
    try {
      const success = await storage.deleteTestimonial(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Testimonial not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete testimonial" });
    }
  });

  // Leads Routes
  app.get("/api/leads", requireAuth, async (req, res) => {
    try {
      const leads = await storage.getAllLeads();
      res.json(leads);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });

  app.post("/api/leads", async (req, res) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(validatedData);
      res.status(201).json(lead);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid input data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create lead" });
    }
  });

  // Settings Routes
  app.get("/api/settings", requireAuth, async (req, res) => {
    try {
      const settings = await storage.getAllSettings();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch settings" });
    }
  });

  app.post("/api/settings", requireAuth, async (req, res) => {
    try {
      const validatedData = insertSettingSchema.parse(req.body);
      const setting = await storage.upsertSetting(validatedData);
      res.json(setting);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid input data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update setting" });
    }
  });

  // Landing Page Views Routes
  app.get("/api/landing-views", async (req, res) => {
    try {
      const landingPageViews = await storage.getAllLandingPageViews();
      res.json(landingPageViews);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch landing page views" });
    }
  });

  app.post("/api/landing-views/:slug/view", async (req, res) => {
    try {
      // Validate slug format (must start with / and contain only safe characters)
      const slug = req.params.slug.startsWith("/") ? req.params.slug : `/${req.params.slug}`;
      
      if (!slug.match(/^\/[a-zA-Z0-9\-_]+$/)) {
        return res.status(400).json({ error: "Invalid landing page slug format" });
      }

      const landingPageView = await storage.incrementLandingPageViewBySlug(slug);
      res.json({ views: landingPageView?.views || 0 });
    } catch (error) {
      res.status(500).json({ error: "Failed to increment views" });
    }
  });

  // TEMPORARY: Reset landing page views to 0 for accurate tracking
  app.delete("/api/landing-views/reset", requireAuth, async (req, res) => {
    try {
      await storage.resetLandingPageViews();
      res.status(200).json({ message: "Landing page views reset successfully to 0. Clean slate for accurate tracking." });
    } catch (error) {
      console.error("Error resetting landing page views:", error);
      res.status(500).json({ error: "Failed to reset landing page views" });
    }
  });

  // Stats endpoint for dashboard
  app.get("/api/stats", requireAuth, async (req, res) => {
    try {
      const [posts, courses, testimonials, leads, landingPageViews] = await Promise.all([
        storage.getAllBlogPosts(),
        storage.getAllCourses(),
        storage.getAllTestimonials(),
        storage.getAllLeads(),
        storage.getAllLandingPageViews()
      ]);

      const totalStudents = courses.reduce((sum, course) => sum + (course.studentCount || 0), 0);

      // Convert landing page views to dynamic object
      const landingPageViewsObj: Record<string, number> = {};
      landingPageViews.forEach(lpv => {
        const key = lpv.slug.substring(1); // Remove leading slash for key
        landingPageViewsObj[key] = lpv.views || 0;
      });

      res.json({
        totalPosts: posts.length,
        totalCourses: courses.length,
        totalStudents,
        totalSubscribers: leads.length,
        landingPageViews: landingPageViewsObj
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  // SEO endpoints - Sitemap.xml for search engines
  app.get("/sitemap.xml", async (req, res) => {
    try {
      const [posts, courses] = await Promise.all([
        storage.getAllBlogPosts(),
        storage.getAllCourses()
      ]);

      const baseUrl = req.protocol + '://' + req.get('host');
      const currentDate = new Date().toISOString().split('T')[0];

      // Generate sitemap XML
      let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/hoc</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`;

      // Add blog posts
      const publishedPosts = posts.filter(post => post.status === 'published');
      publishedPosts.forEach(post => {
        sitemap += `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.publishedAt ? new Date(post.publishedAt).toISOString().split('T')[0] : currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
      });

      // Add course URLs (fix for missing course discovery)
      const activeCourses = courses.filter(course => course.status === 'active' && course.courseUrl);
      activeCourses.forEach(course => {
        sitemap += `
  <url>
    <loc>${baseUrl}${course.courseUrl}</loc>
    <lastmod>${course.createdAt ? new Date(course.createdAt).toISOString().split('T')[0] : currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
      });

      sitemap += `
</urlset>`;

      res.setHeader('Content-Type', 'application/xml');
      res.send(sitemap);
    } catch (error) {
      console.error('Sitemap generation error:', error);
      res.status(500).send('<?xml version="1.0" encoding="UTF-8"?><error>Sitemap generation failed</error>');
    }
  });

  // Robots.txt for search engine crawlers
  app.get("/robots.txt", (req, res) => {
    const robotsTxt = `User-agent: *
Allow: /
Allow: /about
Allow: /hoc
Allow: /blog/
Allow: /blog/*

# Disallow admin and private areas
Disallow: /admin/
Disallow: /admin/*
Disallow: /api/
Disallow: /api/*

# Allow crawling of public assets
Allow: /attached_assets/

# Sitemap location
Sitemap: ${req.protocol}://${req.get('host')}/sitemap.xml

# Crawl delay to be respectful
Crawl-delay: 1`;

    res.setHeader('Content-Type', 'text/plain');
    res.send(robotsTxt);
  });

  const httpServer = createServer(app);
  return httpServer;
}
