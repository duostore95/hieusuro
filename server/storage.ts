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
  type InsertLandingPageView,
  users,
  blogPosts,
  courses,
  testimonials,
  leads,
  settings,
  landingPageViews,
} from '@shared/schema';
import { processDailyViewIncrement, createSlug } from '@shared/utils';
import { db } from './db';
import { eq, desc, and, sql, notInArray } from 'drizzle-orm';

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
  updateBlogPost(
    id: string,
    post: Partial<InsertBlogPost>
  ): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;
  incrementBlogPostViews(id: string): Promise<BlogPost | undefined>;
  incrementBlogPostViewsBySlug(slug: string): Promise<BlogPost | undefined>;
  processDailyViewIncrements(): Promise<void>;

  // Courses
  getAllCourses(): Promise<Course[]>;
  getCourse(id: string): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  updateCourse(
    id: string,
    course: Partial<InsertCourse>
  ): Promise<Course | undefined>;
  deleteCourse(id: string): Promise<boolean>;

  // Testimonials
  getAllTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: string): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(
    id: string,
    testimonial: Partial<InsertTestimonial>
  ): Promise<Testimonial | undefined>;
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
  incrementLandingPageViewBySlug(
    slug: string
  ): Promise<LandingPageView | undefined>;
  resetLandingPageViews(): Promise<void>;

  // Admin credentials
  getAdminPassword(): Promise<string>;
  setAdminPassword(newPassword: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Blog Posts
  async getAllBlogPosts(): Promise<BlogPost[]> {
    // Process daily view increments before returning posts
    await this.processDailyViewIncrements();

    const posts = await db
      .select()
      .from(blogPosts)
      .orderBy(desc(blogPosts.publishedAt));
    return posts;
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    // Process daily view increments before returning post
    await this.processDailyViewIncrements();

    const result = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.id, id))
      .limit(1);
    return result[0];
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    // Process daily view increments before returning post
    await this.processDailyViewIncrements();

    const result = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);
    return result[0];
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const slug = createSlug(insertPost.title);

    // Check for slug uniqueness and append number if needed
    let finalSlug = slug;
    let counter = 1;

    while (true) {
      const existing = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.slug, finalSlug))
        .limit(1);
      if (existing.length === 0) break;
      finalSlug = `${slug}-${counter}`;
      counter++;
    }

    const result = await db
      .insert(blogPosts)
      .values({
        ...insertPost,
        slug: finalSlug,
        publishedAt: new Date(),
        views: 0,
        lastDailyIncrement: null,
        status: insertPost.status || 'published',
        imageUrl: insertPost.imageUrl || null,
      })
      .returning();

    return result[0];
  }

  async updateBlogPost(
    id: string,
    updateData: Partial<InsertBlogPost>
  ): Promise<BlogPost | undefined> {
    const existing = await this.getBlogPost(id);
    if (!existing) return undefined;

    // If title is being updated, regenerate slug
    let newSlug = existing.slug;
    if (updateData.title && updateData.title !== existing.title) {
      const baseSlug = createSlug(updateData.title);
      let finalSlug = baseSlug;
      let counter = 1;

      // Check for slug uniqueness, excluding current post
      while (true) {
        const existingPost = await db
          .select()
          .from(blogPosts)
          .where(eq(blogPosts.slug, finalSlug))
          .limit(1);
        if (existingPost.length === 0 || existingPost[0].id === id) break;
        finalSlug = `${baseSlug}-${counter}`;
        counter++;
      }
      newSlug = finalSlug;
    }

    const result = await db
      .update(blogPosts)
      .set({ ...updateData, slug: newSlug })
      .where(eq(blogPosts.id, id))
      .returning();

    return result[0];
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    const result = await db
      .delete(blogPosts)
      .where(eq(blogPosts.id, id))
      .returning();
    return result.length > 0;
  }

  async incrementBlogPostViews(id: string): Promise<BlogPost | undefined> {
    const result = await db
      .update(blogPosts)
      .set({ views: sql`${blogPosts.views} + 1` })
      .where(eq(blogPosts.id, id))
      .returning();

    return result[0];
  }

  async incrementBlogPostViewsBySlug(
    slug: string
  ): Promise<BlogPost | undefined> {
    const result = await db
      .update(blogPosts)
      .set({ views: sql`${blogPosts.views} + 1` })
      .where(eq(blogPosts.slug, slug))
      .returning();

    return result[0];
  }

  async processDailyViewIncrements(): Promise<void> {
    const currentDate = new Date().toISOString().split('T')[0];

    // Get all posts that need daily increment
    const posts = await db.select().from(blogPosts);

    for (const post of posts) {
      const result = processDailyViewIncrement(post, currentDate);

      if (result.needsUpdate) {
        await db
          .update(blogPosts)
          .set({
            views: result.newViews,
            lastDailyIncrement: result.newLastDailyIncrement,
          })
          .where(eq(blogPosts.id, post.id));
      }
    }
  }

  // Courses
  async getAllCourses(): Promise<Course[]> {
    const courseOrder = ['/affshopee', '/shopeezoom', '/tiktokzoom'];
    const allCourses = await db.select().from(courses);

    return allCourses.sort((a, b) => {
      const aIndex = courseOrder.findIndex((url) => a.courseUrl === url);
      const bIndex = courseOrder.findIndex((url) => b.courseUrl === url);

      // If both courses have order priority, sort by order
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex;
      }

      // If only one course has order priority, it comes first
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;

      // For courses without order priority, sort by createdAt (newest first)
      return (
        new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
      );
    });
  }

  async getCourse(id: string): Promise<Course | undefined> {
    const result = await db
      .select()
      .from(courses)
      .where(eq(courses.id, id))
      .limit(1);
    return result[0];
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const result = await db
      .insert(courses)
      .values({
        ...insertCourse,
        studentCount: 0,
        createdAt: new Date(),
        status: insertCourse.status || 'active',
        rating: insertCourse.rating || '5.0',
        imageUrl: insertCourse.imageUrl || null,
        badge: insertCourse.badge || null,
        courseUrl: insertCourse.courseUrl || null,
      })
      .returning();

    return result[0];
  }

  async updateCourse(
    id: string,
    updateData: Partial<InsertCourse>
  ): Promise<Course | undefined> {
    const result = await db
      .update(courses)
      .set(updateData)
      .where(eq(courses.id, id))
      .returning();

    return result[0];
  }

  async deleteCourse(id: string): Promise<boolean> {
    const result = await db
      .delete(courses)
      .where(eq(courses.id, id))
      .returning();
    return result.length > 0;
  }

  // Testimonials
  async getAllTestimonials(): Promise<Testimonial[]> {
    return await db
      .select()
      .from(testimonials)
      .orderBy(desc(testimonials.createdAt));
  }

  async getTestimonial(id: string): Promise<Testimonial | undefined> {
    const result = await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.id, id))
      .limit(1);
    return result[0];
  }

  async createTestimonial(
    insertTestimonial: InsertTestimonial
  ): Promise<Testimonial> {
    const result = await db
      .insert(testimonials)
      .values({
        ...insertTestimonial,
        createdAt: new Date(),
        rating: insertTestimonial.rating || 5,
        company: insertTestimonial.company || null,
        avatarUrl: insertTestimonial.avatarUrl || null,
        featured: insertTestimonial.featured || false,
      })
      .returning();

    return result[0];
  }

  async updateTestimonial(
    id: string,
    updateData: Partial<InsertTestimonial>
  ): Promise<Testimonial | undefined> {
    const result = await db
      .update(testimonials)
      .set(updateData)
      .where(eq(testimonials.id, id))
      .returning();

    return result[0];
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    const result = await db
      .delete(testimonials)
      .where(eq(testimonials.id, id))
      .returning();
    return result.length > 0;
  }

  // Leads
  async getAllLeads(): Promise<Lead[]> {
    return await db.select().from(leads).orderBy(desc(leads.createdAt));
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const result = await db
      .insert(leads)
      .values({
        ...insertLead,
        createdAt: new Date(),
        phone: insertLead.phone || null,
      })
      .returning();

    return result[0];
  }

  // Settings
  async getAllSettings(): Promise<Setting[]> {
    return await db.select().from(settings);
  }

  async getSetting(key: string): Promise<Setting | undefined> {
    const result = await db
      .select()
      .from(settings)
      .where(eq(settings.key, key))
      .limit(1);
    return result[0];
  }

  async upsertSetting(insertSetting: InsertSetting): Promise<Setting> {
    const existing = await this.getSetting(insertSetting.key);

    if (existing) {
      const result = await db
        .update(settings)
        .set({
          value: insertSetting.value,
          updatedAt: new Date(),
        })
        .where(eq(settings.id, existing.id))
        .returning();

      return result[0];
    } else {
      const result = await db
        .insert(settings)
        .values({
          ...insertSetting,
          updatedAt: new Date(),
        })
        .returning();

      return result[0];
    }
  }

  // Admin credentials helpers
  async getAdminPassword(): Promise<string> {
    const setting = await this.getSetting('adminPassword');

    // Return stored password if exists, otherwise return default/env password
    if (setting?.value) {
      return setting.value;
    }

    return process.env.ADMIN_PASSWORD || '123123';
  }

  async setAdminPassword(newPassword: string): Promise<void> {
    await this.upsertSetting({
      key: 'adminPassword',
      value: newPassword,
    });
  }

  // Landing Page Views
  async getAllLandingPageViews(): Promise<LandingPageView[]> {
    const views = await db.select().from(landingPageViews);
    return views.sort((a, b) => a.slug.localeCompare(b.slug));
  }

  async getLandingPageView(slug: string): Promise<LandingPageView | undefined> {
    const result = await db
      .select()
      .from(landingPageViews)
      .where(eq(landingPageViews.slug, slug))
      .limit(1);
    return result[0];
  }

  async incrementLandingPageViewBySlug(
    slug: string
  ): Promise<LandingPageView | undefined> {
    const existing = await this.getLandingPageView(slug);

    if (!existing) {
      // Create new landing page view if doesn't exist
      const result = await db
        .insert(landingPageViews)
        .values({
          title: `Landing Page ${slug.replace('/', '')}`,
          slug: slug,
          views: 1,
          lastDailyIncrement: null,
          createdAt: new Date(),
        })
        .returning();

      return result[0];
    }

    // Increment existing view count
    const result = await db
      .update(landingPageViews)
      .set({ views: sql`${landingPageViews.views} + 1` })
      .where(eq(landingPageViews.slug, slug))
      .returning();

    return result[0];
  }

  async resetLandingPageViews(): Promise<void> {
    // Keep only official landing pages and reset their views to 0
    const officialPages = ['/affshopee', '/shopeezoom', '/tiktokzoom'];

    // Delete all landing page views that are not official pages
    await db
      .delete(landingPageViews)
      .where(notInArray(landingPageViews.slug, officialPages));

    // For each official page, either update to 0 or create with 0 views
    for (const slug of officialPages) {
      const existing = await this.getLandingPageView(slug);

      if (existing) {
        // Reset existing landing page views to 0
        await db
          .update(landingPageViews)
          .set({
            views: 0,
            lastDailyIncrement: null, // Clean slate - no fake data influence
          })
          .where(eq(landingPageViews.slug, slug));
      } else {
        // Create new landing page view with 0 views
        await db.insert(landingPageViews).values({
          title: `Landing Page ${slug.replace('/', '')}`,
          slug: slug,
          views: 0,
          lastDailyIncrement: null,
          createdAt: new Date(),
        });
      }
    }
  }
}

export const storage = new DatabaseStorage();
