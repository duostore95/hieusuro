import { sql } from 'drizzle-orm';
import {
  pgTable,
  text,
  varchar,
  timestamp,
  decimal,
  integer,
  boolean,
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

// export const users = pgTable("users", {
//   id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
//   username: text("username").notNull().unique(),
//   password: text("password").notNull(),
// });

export const user = pgTable('user', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
});

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const blogPosts = pgTable('blog_posts', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(), // URL-friendly version of title
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  imageUrl: text('image_url'),
  publishedAt: timestamp('published_at').defaultNow(),
  views: integer('views').default(0),
  lastDailyIncrement: text('last_daily_increment'), // Stores date as YYYY-MM-DD for daily view increments
  status: text('status').notNull().default('published'), // published, draft

  showInBlog: boolean('show_in_blog').default(true),
  showInNguoiMoi: boolean('show_in_nguoi_moi').default(false),
  moduleId: integer('module_id'),
  moduleName: text('module_name'),
  lessonOrder: integer('lesson_order'),
  duration: text('duration'),
  objectives: text('objectives').array(),
  actionSteps: text('action_steps').array(),
});

export const courses = pgTable('courses', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: text('title').notNull(),
  description: text('description').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  imageUrl: text('image_url'),
  courseUrl: text('course_url'), // Link to landing page (e.g., "/shopeezoom", "/affshopee")
  duration: text('duration').notNull(), // e.g., "8 tuần"
  studentCount: integer('student_count').default(0),
  rating: decimal('rating', { precision: 2, scale: 1 }).default('5.0'),
  badge: text('badge'), // e.g., "Bestseller", "Mới", "Hot"
  status: text('status').notNull().default('active'), // active, inactive
  createdAt: timestamp('created_at').defaultNow(),
});

export const testimonials = pgTable('testimonials', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text('name').notNull(),
  title: text('title').notNull(), // e.g., "Content Creator"
  company: text('company'), // e.g., "50K followers"
  content: text('content').notNull(),
  rating: integer('rating').notNull().default(5),
  avatarUrl: text('avatar_url'),
  featured: boolean('featured').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

export const leads = pgTable('leads', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  source: text('source').notNull(), // e.g., "E-book", "Course", "Contact"
  createdAt: timestamp('created_at').defaultNow(),
});

export const settings = pgTable('settings', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  key: text('key').notNull().unique(),
  value: text('value').notNull(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const landingPageViews = pgTable('landing_page_views', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  slug: text('slug').notNull().unique(), // "/affshopee", "/shopeezoom", "/tiktokzoom"
  title: text('title').notNull(), // Display name for dashboard
  views: integer('views').default(0),
  lastDailyIncrement: text('last_daily_increment'), // Stores date as YYYY-MM-DD for daily view increments
  createdAt: timestamp('created_at').defaultNow(),
});

// Insert schemas
// export const insertUserSchema = createInsertSchema(users).pick({
//   username: true,
//   password: true,
// });

export const insertBlogPostSchema = createInsertSchema(blogPosts)
  .omit({
    id: true,
    slug: true, // Auto-generated from title
    publishedAt: true,
    views: true,
    lastDailyIncrement: true,
  })
  .extend({
    showInBlog: z.boolean().default(true),
    showInNguoiMoi: z.boolean().default(false),
    moduleId: z.number().optional(),
    moduleName: z.string().optional(),
    lessonOrder: z.number().optional(),
    duration: z.string().optional(),
    objectives: z.array(z.string()).optional(),
    actionSteps: z.array(z.string()).optional(),
  })
  .refine(
    (data) => {
      if (data.showInNguoiMoi) {
        return (
          typeof data.moduleId === 'number' &&
          data.moduleId >= 0 &&
          typeof data.moduleName === 'string' &&
          data.moduleName.trim() !== '' &&
          typeof data.lessonOrder === 'number' &&
          data.lessonOrder >= 0
        );
      }
      return true;
    },
    {
      message:
        'Khi hiển thị ở Người mới, cần nhập đầy đủ: Module ID, Tên Module, và Thứ tự bài',
      path: ['moduleId'],
    }
  );

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
  studentCount: true,
  createdAt: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
});

export const insertSettingSchema = createInsertSchema(settings).omit({
  id: true,
  updatedAt: true,
});

export const insertLandingPageViewSchema = createInsertSchema(
  landingPageViews
).omit({
  id: true,
  views: true,
  lastDailyIncrement: true,
  createdAt: true,
});

// Types
export type User = typeof user.$inferSelect;
// export type InsertUser = z.infer<typeof insertUserSchema>;

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;

export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;

export type Lead = typeof leads.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;

export type Setting = typeof settings.$inferSelect;
export type InsertSetting = z.infer<typeof insertSettingSchema>;

export type LandingPageView = typeof landingPageViews.$inferSelect;
export type InsertLandingPageView = z.infer<typeof insertLandingPageViewSchema>;
