import { 
  type User, 
  type InsertUser,
  type BlogPost,
  type InsertBlogPost,
  type Course,
  type InsertCourse,
  type Testimonial,
  type InsertTestimonial,
  type Lead,
  type InsertLead,
  type Setting,
  type InsertSetting,
  type LandingPageView,
  type InsertLandingPageView
} from "@shared/schema";
import { processDailyViewIncrement, createSlug } from "@shared/utils";
import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import * as path from "path";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Blog Posts
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;
  incrementBlogPostViews(id: string): Promise<BlogPost | undefined>;
  incrementBlogPostViewsBySlug(slug: string): Promise<BlogPost | undefined>;
  processDailyViewIncrements(): Promise<void>;

  // Courses
  getAllCourses(): Promise<Course[]>;
  getCourse(id: string): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  updateCourse(id: string, course: Partial<InsertCourse>): Promise<Course | undefined>;
  deleteCourse(id: string): Promise<boolean>;

  // Testimonials
  getAllTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: string): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: string, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined>;
  deleteTestimonial(id: string): Promise<boolean>;

  // Leads
  getAllLeads(): Promise<Lead[]>;
  createLead(lead: InsertLead): Promise<Lead>;

  // Settings
  getAllSettings(): Promise<Setting[]>;
  getSetting(key: string): Promise<Setting | undefined>;
  upsertSetting(setting: InsertSetting): Promise<Setting>;

  // Landing Page Views
  getAllLandingPageViews(): Promise<LandingPageView[]>;
  getLandingPageView(slug: string): Promise<LandingPageView | undefined>;
  incrementLandingPageViewBySlug(slug: string): Promise<LandingPageView | undefined>;
  // processDailyLandingPageViewIncrements(): Promise<void>; // REMOVED for accurate tracking
  
  // Admin credentials
  getAdminPassword(): Promise<string>;
  setAdminPassword(newPassword: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private blogPosts: Map<string, BlogPost>;
  private courses: Map<string, Course>;
  private testimonials: Map<string, Testimonial>;
  private leads: Map<string, Lead>;
  private settings: Map<string, Setting>;
  private landingPageViews: Map<string, LandingPageView>;
  private readonly dataFilePath = path.join(process.cwd(), 'server', 'data.json');
  private initialized = false;

  constructor() {
    this.users = new Map();
    this.blogPosts = new Map();
    this.courses = new Map();
    this.testimonials = new Map();
    this.leads = new Map();
    this.settings = new Map();
    this.landingPageViews = new Map();
    
    // Try to load existing data, otherwise initialize defaults
    this.initializeData();
  }

  private async ensureInitialized(): Promise<void> {
    if (!this.initialized) {
      await this.initializeData();
    }
  }

  private async initializeData() {
    if (this.initialized) return;
    
    try {
      await this.loadFromDisk();
      
      // Backfill slugs for existing posts that don't have them
      await this.backfillSlugs();
      
      // Only seed defaults if all collections are empty
      if (this.courses.size === 0 && this.blogPosts.size === 0 && this.testimonials.size === 0) {
        await this.initializeDefaultData();
        await this.saveToDisk();
      }
    } catch (error) {
      console.log('No existing data found, initializing with defaults');
      await this.initializeDefaultData();
      await this.saveToDisk();
    }
    
    this.initialized = true;
  }

  private async backfillSlugs(): Promise<void> {
    let hasUpdates = false;
    
    Array.from(this.blogPosts.entries()).forEach(([id, post]) => {
      if (!post.slug) {
        const baseSlug = createSlug(post.title);
        let finalSlug = baseSlug;
        let counter = 1;
        
        // Check for slug uniqueness, excluding current post
        while (Array.from(this.blogPosts.values()).some(p => p.id !== id && p.slug === finalSlug)) {
          finalSlug = `${baseSlug}-${counter}`;
          counter++;
        }
        
        const updated = {
          ...post,
          slug: finalSlug
        };
        this.blogPosts.set(id, updated);
        hasUpdates = true;
        console.log(`Backfilled slug for post "${post.title}": ${finalSlug}`);
      }
    });
    
    if (hasUpdates) {
      await this.saveToDisk();
      console.log('Slug backfill completed');
    }
  }

  private async loadFromDisk(): Promise<void> {
    const data = await fs.readFile(this.dataFilePath, 'utf-8');
    const parsed = JSON.parse(data);
    
    // Restore dates from ISO strings
    this.users = new Map(parsed.users?.map(([k, v]: [string, any]) => [k, v]) || []);
    this.blogPosts = new Map(parsed.blogPosts?.map(([k, v]: [string, any]) => [k, {
      ...v,
      publishedAt: v.publishedAt ? new Date(v.publishedAt) : null
    }]) || []);
    this.courses = new Map(parsed.courses?.map(([k, v]: [string, any]) => [k, {
      ...v,
      createdAt: v.createdAt ? new Date(v.createdAt) : null
    }]) || []);
    this.testimonials = new Map(parsed.testimonials?.map(([k, v]: [string, any]) => [k, {
      ...v,
      createdAt: v.createdAt ? new Date(v.createdAt) : null
    }]) || []);
    this.leads = new Map(parsed.leads?.map(([k, v]: [string, any]) => [k, {
      ...v,
      createdAt: v.createdAt ? new Date(v.createdAt) : null
    }]) || []);
    this.settings = new Map(parsed.settings?.map(([k, v]: [string, any]) => [k, {
      ...v,
      updatedAt: v.updatedAt ? new Date(v.updatedAt) : null
    }]) || []);
    this.landingPageViews = new Map(parsed.landingPageViews?.map(([k, v]: [string, any]) => [k, {
      ...v,
      createdAt: v.createdAt ? new Date(v.createdAt) : null
    }]) || []);
  }

  private async saveToDisk(): Promise<void> {
    const data = {
      users: Array.from(this.users.entries()),
      blogPosts: Array.from(this.blogPosts.entries()),
      courses: Array.from(this.courses.entries()),
      testimonials: Array.from(this.testimonials.entries()),
      leads: Array.from(this.leads.entries()),
      settings: Array.from(this.settings.entries()),
      landingPageViews: Array.from(this.landingPageViews.entries())
    };
    
    // Ensure directory exists
    await fs.mkdir(path.dirname(this.dataFilePath), { recursive: true });
    
    // Atomic write: write to temp file then rename
    const tempPath = this.dataFilePath + '.tmp';
    await fs.writeFile(tempPath, JSON.stringify(data, null, 2));
    await fs.rename(tempPath, this.dataFilePath);
  }

  private async initializeDefaultData() {
    // Default blog posts
    const defaultPosts: BlogPost[] = [
      {
        id: randomUUID(),
        title: "7 Bước Làm chủ Shopee từ Zero",
        slug: "7-buoc-lam-chu-shopee-tu-zero",
        excerpt: "Khám phá những chiến lược hiệu quả để bán hàng thành công trên Shopee từ Zero đến Diamond Seller...",
        content: "Nội dung chi tiết về chiến lược bán hàng Shopee...",
        imageUrl: "/attached_assets/hieu-suro-profile.png",
        publishedAt: new Date("2024-11-25"),
        views: 23, // Real views: 23, Display: 230
        lastDailyIncrement: null,
        status: "published"
      },
      {
        id: randomUUID(),
        title: "Content Marketing: Từ Zero Đến Hero",
        slug: "content-marketing-tu-zero-den-hero",
        excerpt: "Hướng dẫn chi tiết cách tạo ra nội dung chất lượng, thu hút và chuyển đổi khách hàng hiệu quả...",
        content: "Nội dung chi tiết về content marketing...",
        imageUrl: "/attached_assets/hieu-suro-profile.png",
        publishedAt: new Date("2024-11-20"),
        views: 18, // Real views: 18, Display: 180
        lastDailyIncrement: null,
        status: "published"
      },
      {
        id: randomUUID(),
        title: "Social Media Growth Hacks 2024",
        slug: "social-media-growth-hacks-2024",
        excerpt: "Những chiến thuật tăng trưởng mạnh mẽ trên các nền tảng mạng xã hội để xây dựng community mạnh mẽ...",
        content: "Nội dung chi tiết về social media growth...",
        imageUrl: "/attached_assets/hieu-suro-profile.png",
        publishedAt: new Date("2024-11-18"),
        views: 15, // Real views: 15, Display: 150
        lastDailyIncrement: null,
        status: "published"
      }
    ];

    // Default courses
    const defaultCourses: Course[] = [
      {
        id: randomUUID(),
        title: "ShopeeZoom - Từ Zero Đến Hero",
        description: "Khóa học toàn diện về bán hàng Shopee từ A-Z, bao gồm tạo shop, SEO sản phẩm, chạy quảng cáo và scale doanh thu.",
        price: "1990000",
        imageUrl: "/attached_assets/hieu-suro-profile.png",
        duration: "8 tuần",
        studentCount: 150,
        rating: "4.9",
        badge: "Bestseller",
        status: "active",
        createdAt: new Date(),
        courseUrl: "/shopeezoom"
      },
      {
        id: randomUUID(),
        title: "Affiliate Shopee A-Z",
        description: "Hướng dẫn chi tiết cách kiếm tiền từ Affiliate Shopee, từ cách tạo content đến chiến lược marketing tăng thu nhập.",
        price: "2490000",
        imageUrl: "/attached_assets/hieu-suro-profile.png",
        duration: "10 tuần",
        studentCount: 89,
        rating: "4.8",
        badge: "Mới",
        status: "active",
        createdAt: new Date(),
        courseUrl: "/affshopee"
      },
      {
        id: randomUUID(),
        title: "TikTok Shop Mastery",
        description: "Khóa học chuyên sâu về bán hàng trên TikTok Shop, từ cách tạo video viral đến quản lý đơn hàng hiệu quả.",
        price: "1590000",
        imageUrl: "/attached_assets/hieu-suro-profile.png",
        duration: "6 tuần",
        studentCount: 200,
        rating: "4.9",
        badge: "Hot",
        status: "active",
        createdAt: new Date(),
        courseUrl: null
      }
    ];

    // Default testimonials
    const defaultTestimonials: Testimonial[] = [
      {
        id: randomUUID(),
        name: "Nguyễn Minh Anh",
        title: "Content Creator",
        company: "50K followers",
        content: "Khóa học ShopeeZoom của anh Hiếu đã thay đổi hoàn toàn cách tôi bán hàng online. Chỉ sau 2 tháng, shop tôi đã từ 0 lên 500+ đơn/tháng và doanh thu hơn 50 triệu.",
        rating: 5,
        avatarUrl: "/attached_assets/hieu-suro-profile.png",
        featured: true,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        name: "Trần Đức Thành",
        title: "Startup Founder",
        company: "Tech",
        content: "Mentor Hiếu rất tận tâm và có kinh nghiệm thực tiễn. Những chiến lược anh chia sẻ đều có thể áp dụng ngay và mang lại kết quả cụ thể cho business của tôi.",
        rating: 5,
        avatarUrl: "/attached_assets/hieu-suro-profile.png",
        featured: true,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        name: "Lê Thị Hương",
        title: "Marketing Manager",
        company: "Fashion",
        content: "Course content rất chi tiết và dễ hiểu. Anh Hiếu luôn support nhiệt tình khi tôi có thắc mắc. Recommend 100% cho ai muốn build personal brand!",
        rating: 5,
        avatarUrl: "/attached_assets/hieu-suro-profile.png",
        featured: true,
        createdAt: new Date()
      }
    ];

    // Default landing page views
    const defaultLandingPageViews: LandingPageView[] = [
      {
        id: randomUUID(),
        slug: "/affshopee",
        title: "Affiliate Shopee A-Z",
        views: 0,
        lastDailyIncrement: null,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        slug: "/shopeezoom", 
        title: "ShopeeZoom - Từ Zero Đến Hero",
        views: 0,
        lastDailyIncrement: null,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        slug: "/tiktokzoom",
        title: "TikTok Shop Mastery", 
        views: 0,
        lastDailyIncrement: null,
        createdAt: new Date()
      }
    ];

    defaultPosts.forEach(post => this.blogPosts.set(post.id, post));
    defaultCourses.forEach(course => this.courses.set(course.id, course));
    defaultTestimonials.forEach(testimonial => this.testimonials.set(testimonial.id, testimonial));
    defaultLandingPageViews.forEach(view => this.landingPageViews.set(view.slug, view));
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    await this.saveToDisk();
    return user;
  }

  // Blog Posts
  async getAllBlogPosts(): Promise<BlogPost[]> {
    console.log("getAllBlogPosts called");
    await this.ensureInitialized();
    console.log("Initialization complete, posts count:", this.blogPosts.size);
    // Process daily view increments before returning posts
    await this.processDailyViewIncrements();
    
    const posts = Array.from(this.blogPosts.values()).sort((a, b) => 
      new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime()
    );
    console.log("Returning posts:", posts.length);
    return posts;
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    await this.ensureInitialized();
    // Process daily view increments before returning post
    await this.processDailyViewIncrements();
    
    return this.blogPosts.get(id);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    await this.ensureInitialized();
    // Process daily view increments before returning post
    await this.processDailyViewIncrements();
    
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const slug = createSlug(insertPost.title);
    
    // Check for slug uniqueness and append number if needed
    let finalSlug = slug;
    let counter = 1;
    while (Array.from(this.blogPosts.values()).some(p => p.slug === finalSlug)) {
      finalSlug = `${slug}-${counter}`;
      counter++;
    }
    
    const post: BlogPost = { 
      ...insertPost, 
      id, 
      slug: finalSlug,
      publishedAt: new Date(),
      views: 0,
      lastDailyIncrement: null,
      status: insertPost.status || "published",
      imageUrl: insertPost.imageUrl || null
    };
    this.blogPosts.set(id, post);
    await this.saveToDisk();
    return post;
  }

  async updateBlogPost(id: string, updateData: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const existing = this.blogPosts.get(id);
    if (!existing) return undefined;

    // If title is being updated, regenerate slug
    let newSlug = existing.slug;
    if (updateData.title && updateData.title !== existing.title) {
      const baseSlug = createSlug(updateData.title);
      let finalSlug = baseSlug;
      let counter = 1;
      
      // Check for slug uniqueness, excluding current post
      while (Array.from(this.blogPosts.values()).some(p => p.id !== id && p.slug === finalSlug)) {
        finalSlug = `${baseSlug}-${counter}`;
        counter++;
      }
      newSlug = finalSlug;
    }

    const updated = { 
      ...existing, 
      ...updateData,
      slug: newSlug
    };
    this.blogPosts.set(id, updated);
    await this.saveToDisk();
    return updated;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    const result = this.blogPosts.delete(id);
    if (result) await this.saveToDisk();
    return result;
  }

  async incrementBlogPostViews(id: string): Promise<BlogPost | undefined> {
    const existing = this.blogPosts.get(id);
    if (!existing) return undefined;

    const updated = { 
      ...existing, 
      views: (existing.views || 0) + 1 
    };
    this.blogPosts.set(id, updated);
    await this.saveToDisk();
    return updated;
  }

  async incrementBlogPostViewsBySlug(slug: string): Promise<BlogPost | undefined> {
    const existing = Array.from(this.blogPosts.values()).find(post => post.slug === slug);
    if (!existing) return undefined;

    const updated = { 
      ...existing, 
      views: (existing.views || 0) + 1 
    };
    this.blogPosts.set(existing.id, updated);
    await this.saveToDisk();
    return updated;
  }

  async processDailyViewIncrements(): Promise<void> {
    const currentDate = new Date().toISOString().split('T')[0];
    let hasUpdates = false;

    // Use Array.from to iterate over Map entries
    Array.from(this.blogPosts.entries()).forEach(([id, post]) => {
      const result = processDailyViewIncrement(post, currentDate);
      
      if (result.needsUpdate) {
        const updated = {
          ...post,
          views: result.newViews,
          lastDailyIncrement: result.newLastDailyIncrement
        };
        this.blogPosts.set(id, updated);
        hasUpdates = true;
      }
    });

    if (hasUpdates) {
      await this.saveToDisk();
    }
  }

  // Courses
  async getAllCourses(): Promise<Course[]> {
    const courseOrder = ["/affshopee", "/shopeezoom", "/tiktokzoom"];
    
    return Array.from(this.courses.values()).sort((a, b) => {
      const aIndex = courseOrder.findIndex(url => a.courseUrl === url);
      const bIndex = courseOrder.findIndex(url => b.courseUrl === url);
      
      // If both courses have order priority, sort by order
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex;
      }
      
      // If only one course has order priority, it comes first
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      
      // For courses without order priority, sort by createdAt (newest first)
      return new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime();
    });
  }

  async getCourse(id: string): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = randomUUID();
    const course: Course = { 
      ...insertCourse, 
      id, 
      studentCount: 0,
      createdAt: new Date(),
      status: insertCourse.status || "active",
      rating: insertCourse.rating || "5.0",
      imageUrl: insertCourse.imageUrl || null,
      badge: insertCourse.badge || null,
      courseUrl: insertCourse.courseUrl || null
    };
    this.courses.set(id, course);
    await this.saveToDisk();
    return course;
  }

  async updateCourse(id: string, updateData: Partial<InsertCourse>): Promise<Course | undefined> {
    const existing = this.courses.get(id);
    if (!existing) return undefined;

    const updated = { ...existing, ...updateData };
    this.courses.set(id, updated);
    await this.saveToDisk();
    return updated;
  }

  async deleteCourse(id: string): Promise<boolean> {
    const result = this.courses.delete(id);
    if (result) await this.saveToDisk();
    return result;
  }

  // Testimonials
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getTestimonial(id: string): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const testimonial: Testimonial = { 
      ...insertTestimonial, 
      id, 
      createdAt: new Date(),
      rating: insertTestimonial.rating || 5,
      company: insertTestimonial.company || null,
      avatarUrl: insertTestimonial.avatarUrl || null,
      featured: insertTestimonial.featured || false
    };
    this.testimonials.set(id, testimonial);
    await this.saveToDisk();
    return testimonial;
  }

  async updateTestimonial(id: string, updateData: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    const existing = this.testimonials.get(id);
    if (!existing) return undefined;

    const updated = { ...existing, ...updateData };
    this.testimonials.set(id, updated);
    await this.saveToDisk();
    return updated;
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    const result = this.testimonials.delete(id);
    if (result) await this.saveToDisk();
    return result;
  }

  // Leads
  async getAllLeads(): Promise<Lead[]> {
    return Array.from(this.leads.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = randomUUID();
    const lead: Lead = { 
      ...insertLead, 
      id, 
      createdAt: new Date(),
      phone: insertLead.phone || null
    };
    this.leads.set(id, lead);
    await this.saveToDisk();
    return lead;
  }

  // Settings
  async getAllSettings(): Promise<Setting[]> {
    return Array.from(this.settings.values());
  }

  async getSetting(key: string): Promise<Setting | undefined> {
    return Array.from(this.settings.values()).find(setting => setting.key === key);
  }

  async upsertSetting(insertSetting: InsertSetting): Promise<Setting> {
    const existing = await this.getSetting(insertSetting.key);
    
    if (existing) {
      const updated = { 
        ...existing, 
        value: insertSetting.value, 
        updatedAt: new Date() 
      };
      this.settings.set(existing.id, updated);
      await this.saveToDisk();
      return updated;
    } else {
      const id = randomUUID();
      const setting: Setting = { 
        ...insertSetting, 
        id, 
        updatedAt: new Date()
      };
      this.settings.set(id, setting);
      await this.saveToDisk();
      return setting;
    }
  }

  // Admin credentials helpers
  async getAdminPassword(): Promise<string> {
    await this.ensureInitialized();
    const setting = await this.getSetting("adminPassword");
    
    // Return stored password if exists, otherwise return default/env password
    if (setting?.value) {
      return setting.value;
    }
    
    return process.env.ADMIN_PASSWORD || "123123";
  }

  async setAdminPassword(newPassword: string): Promise<void> {
    await this.upsertSetting({
      key: "adminPassword",
      value: newPassword
    });
  }

  // Landing Page Views
  async getAllLandingPageViews(): Promise<LandingPageView[]> {
    await this.ensureInitialized();
    // await this.processDailyLandingPageViewIncrements(); // REMOVED - no more fake data
    
    return Array.from(this.landingPageViews.values()).sort((a, b) => 
      a.slug.localeCompare(b.slug)
    );
  }

  async getLandingPageView(slug: string): Promise<LandingPageView | undefined> {
    await this.ensureInitialized();
    // await this.processDailyLandingPageViewIncrements(); // REMOVED - no more fake data
    
    return this.landingPageViews.get(slug);
  }

  async incrementLandingPageViewBySlug(slug: string): Promise<LandingPageView> {
    const existing = this.landingPageViews.get(slug);
    
    if (!existing) {
      // Create new landing page view if doesn't exist
      const newLandingPageView: LandingPageView = {
        id: crypto.randomUUID(),
        title: `Landing Page ${slug.replace('/', '')}`,
        slug: slug,
        views: 1,
        lastDailyIncrement: null,
        createdAt: new Date()
      };
      this.landingPageViews.set(slug, newLandingPageView);
      await this.saveToDisk();
      return newLandingPageView;
    }

    // Increment existing view count
    const updated = { 
      ...existing, 
      views: (existing.views || 0) + 1 
    };
    this.landingPageViews.set(slug, updated);
    await this.saveToDisk();
    return updated;
  }

  // DISABLED: Fake data generation removed for accurate analytics
  // async processDailyLandingPageViewIncrements(): Promise<void> {
  //   // This function was creating fake view data (1-50 views per day)
  //   // Removed to ensure 100% accurate tracking
  // }

  // Reset landing page views for accurate tracking
  async resetLandingPageViews(): Promise<void> {
    // Keep only official landing pages and reset their views to 0
    const officialPages = ['/affshopee', '/shopeezoom', '/tiktokzoom'];
    
    // Clear all existing data
    this.landingPageViews.clear();
    
    // Create fresh entries with 0 views for official pages
    for (const slug of officialPages) {
      const newLandingPageView: LandingPageView = {
        id: crypto.randomUUID(),
        title: `Landing Page ${slug.replace('/', '')}`,
        slug: slug,
        views: 0,
        lastDailyIncrement: null, // Clean slate - no fake data influence
        createdAt: new Date()
      };
      this.landingPageViews.set(slug, newLandingPageView);
    }
    
    await this.saveToDisk();
  }
}

export const storage = new MemStorage();
