import 'dotenv/config';
import { db } from './db';
import {
  blogPosts,
  courses,
  testimonials,
  settings,
  landingPageViews,
  users,
} from '@shared/schema';
import { promises as fs } from 'fs';
import * as path from 'path';

async function seed() {
  console.log('🌱 Starting database seed...');

  try {
    // Load existing data from JSON file
    const dataFilePath = path.join(process.cwd(), 'server', 'data.json');
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    const data = JSON.parse(fileContent);

    console.log('📖 Loaded data from data.json');

    // Seed Users (if any)
    if (data.users && data.users.length > 0) {
      console.log(`👤 Seeding ${data.users.length} users...`);
      for (const [_, user] of data.users) {
        await db
          .insert(users)
          .values({
            id: user.id,
            username: user.username,
            password: user.password,
          })
          .onConflictDoNothing();
      }
      console.log('✅ Users seeded');
    }

    // Seed Blog Posts
    if (data.blogPosts && data.blogPosts.length > 0) {
      console.log(`📝 Seeding ${data.blogPosts.length} blog posts...`);
      for (const [_, post] of data.blogPosts) {
        try {
          await db
            .insert(blogPosts)
            .values({
              id: post.id,
              title: post.title,
              slug: post.slug,
              excerpt: post.excerpt,
              content: post.content,
              imageUrl: post.imageUrl || null,
              publishedAt: post.publishedAt
                ? new Date(post.publishedAt)
                : new Date(),
              views: post.views || 0,
              lastDailyIncrement: post.lastDailyIncrement || null,
              status: post.status || 'published',
              showInBlog: post.showInBlog ?? true,
              showInNguoiMoi: post.showInNguoiMoi ?? false,
              moduleId: post.moduleId ?? null,
              moduleName: post.moduleName ?? null,
              lessonOrder: post.lessonOrder ?? null,
              duration: post.duration ?? null,
              objectives: post.objectives ?? null,
              actionSteps: post.actionSteps ?? null,
            })
            .onConflictDoNothing();
        } catch (error) {
          console.error(`Failed to insert post: ${post.title}`);
          console.error('Post data:', JSON.stringify(post, null, 2));
          throw error;
        }
      }
      console.log('✅ Blog posts seeded');
    }

    // Seed Courses
    if (data.courses && data.courses.length > 0) {
      console.log(`📚 Seeding ${data.courses.length} courses...`);
      for (const [_, course] of data.courses) {
        await db
          .insert(courses)
          .values({
            id: course.id,
            title: course.title,
            description: course.description,
            price: course.price,
            imageUrl: course.imageUrl || null,
            courseUrl: course.courseUrl || null,
            duration: course.duration,
            studentCount: course.studentCount || 0,
            rating: course.rating || '5.0',
            badge: course.badge || null,
            status: course.status || 'active',
            createdAt: course.createdAt
              ? new Date(course.createdAt)
              : new Date(),
          })
          .onConflictDoNothing();
      }
      console.log('✅ Courses seeded');
    }

    // Seed Testimonials
    if (data.testimonials && data.testimonials.length > 0) {
      console.log(`💬 Seeding ${data.testimonials.length} testimonials...`);
      for (const [_, testimonial] of data.testimonials) {
        await db
          .insert(testimonials)
          .values({
            id: testimonial.id,
            name: testimonial.name,
            title: testimonial.title,
            company: testimonial.company || null,
            content: testimonial.content,
            rating: testimonial.rating || 5,
            avatarUrl: testimonial.avatarUrl || null,
            featured: testimonial.featured ?? false,
            createdAt: testimonial.createdAt
              ? new Date(testimonial.createdAt)
              : new Date(),
          })
          .onConflictDoNothing();
      }
      console.log('✅ Testimonials seeded');
    }

    // Seed Settings
    if (data.settings && data.settings.length > 0) {
      console.log(`⚙️  Seeding ${data.settings.length} settings...`);
      for (const [_, setting] of data.settings) {
        await db
          .insert(settings)
          .values({
            id: setting.id,
            key: setting.key,
            value: setting.value,
            updatedAt: setting.updatedAt
              ? new Date(setting.updatedAt)
              : new Date(),
          })
          .onConflictDoNothing();
      }
      console.log('✅ Settings seeded');
    }

    // Seed Landing Page Views
    if (data.landingPageViews && data.landingPageViews.length > 0) {
      console.log(
        `👁️  Seeding ${data.landingPageViews.length} landing page views...`
      );
      for (const [_, lpv] of data.landingPageViews) {
        await db
          .insert(landingPageViews)
          .values({
            id: lpv.id,
            slug: lpv.slug,
            title: lpv.title,
            views: lpv.views || 0,
            lastDailyIncrement: lpv.lastDailyIncrement || null,
            createdAt: lpv.createdAt ? new Date(lpv.createdAt) : new Date(),
          })
          .onConflictDoNothing();
      }
      console.log('✅ Landing page views seeded');
    }

    console.log('\n🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:');
    if (error instanceof Error) {
      console.error('Message:', error.message);
      console.error('Stack:', error.stack);
    } else {
      console.error('Error details:', error);
    }
    process.exit(1);
  }
}

seed();
