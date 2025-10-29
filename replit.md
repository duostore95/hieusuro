# Overview

This is a full-stack web application for an e-commerce marketing platform built around "Hiếu Suro" - an e-commerce specialist and mentor focusing on Shopee and TikTok Shop. The application serves as a content management system featuring blog posts, courses, testimonials, lead management, and system settings. It's designed as a professional platform where users can read blog content about e-commerce strategies, explore Shopee and TikTok Shop courses, submit leads for ebooks, and view testimonials, while administrators can manage all content through a comprehensive admin panel.

# Recent Changes (October 16, 2025)

- **Curriculum Expansion**: Updated course curriculum from 4 modules to 8 comprehensive modules
  - Module 1: Hiểu đúng về Affiliate Shopee (Nền tảng & Tư duy)
  - Module 2: Thiết lập tài khoản & công cụ (Cơ bản)
  - Module 3: Hiểu thuật toán Shopee (Chọn sản phẩm dễ ra đơn)
  - Module 4: Kéo traffic miễn phí (Không cần chạy ads)
  - Module 5: Làm content Affiliate (Hút click & ra đơn)
  - Module 6: Chiến lược ra đơn đầu tiên (Trong 7 ngày)
  - Module 7: Xây thương hiệu cá nhân (Nhân bản hệ thống)
  - Module 8: Tư duy & con đường bền vững (Trong Affiliate)
- **Course Summary Cards**: Added 8 module summary cards matching the new curriculum structure
- **Student Results Carousel**: Added second carousel for student success proof (12 images: STUDENT_RESULT_URL_1-12)
- **Results Carousel Renamed**: Renamed original carousel URLs from YOUR_IMAGE_URL_X to HIEU_RESULT_URL_X for clarity
- **Course Outcomes Section**: Added new section "Kết quả khóa học mang lại" positioned between "Bạn sẽ nhận được gì?" and "Kết quả học viên" emphasizing realistic expectations and 6 key outcomes students will achieve
- **Skills Section Update**: Enhanced skills section with 20 detailed practical skills organized into 4 categories: Hiểu rõ nền tảng Affiliate Shopee, Cách xây kênh mạng xã hội kiếm đơn, Content Creation & Marketing, Traffic & Scaling Strategies - with updated title and description focusing on practical transformation from beginner to earning

# Previous Changes (October 14, 2025)

- **Pricing Update**: Changed course price from 6990K to 3990K for "Affiliate Shopee Pro" package
- **Voucher System Update**: Lucky box (voucher spin) now generates random values from 1000K to 1500K with 20K increments (1000K, 1020K, 1040K... 1480K, 1500K)
- **Final Price Range**: With new pricing and voucher range, customers pay between 2.490.000 VND and 2.990.000 VND after discount
- **Smart Voucher Upgrade Removed**: Simplified voucher logic as the new range already fits well with the price point
- **Income Range Fixed**: Changed from random income display (8-35 triệu) to fixed display of "10-50 triệu/tháng" across all pages for consistency
- **QR Payment Updated**: New QR code image for payment section

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with two main routes (home and admin)
- **State Management**: TanStack React Query for server state management and data fetching
- **UI Components**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Form Handling**: React Hook Form with Zod schema validation

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **API Design**: RESTful API with CRUD operations for all entities
- **Data Validation**: Zod schemas for request/response validation
- **Database Layer**: Drizzle ORM with PostgreSQL dialect
- **Error Handling**: Centralized error handling middleware
- **Development**: Hot module replacement with Vite middleware integration

## Database Schema Design
The application uses five main entities:
- **Users**: Authentication and user management (id, username, password)
- **Blog Posts**: Unified content management supporting both blog posts and learning lessons
  - Core fields: title, slug, excerpt, content, imageUrl, status, views
  - Display control: showInBlog (default true), showInNguoiMoi (default false)
  - Learning metadata: moduleId, moduleName, lessonOrder, duration, objectives[], actionSteps[]
  - Validation: When showInNguoiMoi=true, requires moduleId, moduleName, and lessonOrder to be non-null
- **Courses**: Course catalog (title, description, price, duration, ratings, badges)
- **Testimonials**: Social proof (name, title, company, content, rating, featured status)
- **Leads**: Contact management (name, email, phone, source tracking)
- **Settings**: System configuration (key-value pairs for site settings)

## Component Architecture
- **Homepage Components**: Modular sections (Hero, Blog, Courses, Testimonials, About, Footer)
- **Admin Components**: Full CRUD management interfaces for each entity type
- **Shared UI Components**: Reusable components from shadcn/ui library
- **Form Components**: Validated forms with real-time error handling

## Content Management Features
- **Unified Blog & Learning Content**: Database-driven content system with dual-purpose posts
  - Blog posts: Display on homepage and /blog page (showInBlog=true)
  - Learning lessons: Display on /nguoi-moi page (showInNguoiMoi=true)
  - Posts can appear in both locations via checkbox selection in admin
  - Admin form features structured array inputs for objectives and actionSteps (no JSON knowledge required)
  - Automatic slug generation from Vietnamese titles with proper handling of diacritics
- **Learning Hub (/nguoi-moi)**: Interactive lesson progression system
  - Dynamic loading from database via API filtering (?type=nguoi-moi)
  - Module-based organization with moduleId and moduleName grouping
  - Progress tracking with localStorage persistence and sanitization on data changes
  - Server-side filtering ensures only published lessons with complete metadata are shown
- **Course Management**: Full course catalog with pricing, ratings, and student counts
- **Testimonial System**: Customer reviews with featured testimonial highlighting
- **Lead Capture**: Email collection system with source tracking for conversion analytics
- **Settings Management**: Configurable site settings for email, contact info, and branding

# External Dependencies

- **Database**: PostgreSQL with Neon serverless hosting (@neondatabase/serverless)
- **ORM**: Drizzle ORM for type-safe database operations
- **UI Framework**: Radix UI primitives for accessible component foundation
- **Styling**: Tailwind CSS for utility-first styling approach
- **Form Validation**: Zod for schema validation across client and server
- **State Management**: TanStack React Query for server state and caching
- **Build Tools**: Vite for fast development and optimized production builds
- **Development Tools**: Replit-specific plugins for enhanced development experience
- **Fonts**: Google Fonts integration (Architects Daughter, DM Sans, Fira Code, Geist Mono)