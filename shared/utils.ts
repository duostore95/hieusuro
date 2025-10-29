import { BlogPost } from "./schema";

// Simple stable hash function for deterministic seeding
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

// Calculate realistic displayed view count
export function computeDisplayedViews(post: BlogPost, now = new Date()): number {
  const actual = post.views || 0;
  
  // Post age in days
  const publishedAt = new Date(post.publishedAt || now);
  const ageDays = Math.floor((now.getTime() - publishedAt.getTime()) / (1000 * 60 * 60 * 24));
  
  // Deterministic seed per post (40-90)
  const seed = 40 + (simpleHash(post.id) % 51);
  
  // Base boost using square root (sublinear growth)
  const baseBoost = 6 * Math.sqrt(actual);
  
  // Age boost - older posts naturally have more views
  const ageBoost = Math.min(120, 15 * Math.log1p(Math.max(0, ageDays)));
  
  // Headline quality boost (0-50 points)
  const headlineBoost = calculateHeadlineBoost(post.title);
  
  // Launch boost for new posts (first 7 days)
  const launchBoost = ageDays < 7 ? 12 * (7 - ageDays) : 0;
  
  // Daily jitter for natural variation
  const today = now.toISOString().split('T')[0].replace(/-/g, '');
  const dailyJitter = ((simpleHash(post.id + today) % 7) - 3);
  
  // Calculate total
  const rawTotal = actual + seed + baseBoost + ageBoost + headlineBoost + launchBoost + dailyJitter;
  
  // Clamp to realistic bounds
  const lower = actual;
  const upper = actual * 3 + 180;
  const clamped = Math.max(lower, Math.min(upper, rawTotal));
  
  // Round to nearest 5 for natural appearance
  return Math.round(clamped / 5) * 5;
}

// Generate daily random views increment (1-50) for a post
export function generateDailyViewIncrement(postId: string, currentDate: string = new Date().toISOString().split('T')[0]): number {
  // Use post ID + date as seed for deterministic but random increment
  const seed = simpleHash(postId + currentDate);
  // Random number between 1-50
  return (seed % 50) + 1;
}

// Check if post needs daily view increment and return new view count
export function processDailyViewIncrement(post: BlogPost, currentDate: string = new Date().toISOString().split('T')[0]): {
  needsUpdate: boolean;
  newViews: number;
  newLastDailyIncrement: string;
} {
  // Check if we already incremented today
  if (post.lastDailyIncrement === currentDate) {
    return {
      needsUpdate: false,
      newViews: post.views || 0,
      newLastDailyIncrement: post.lastDailyIncrement
    };
  }

  // Generate daily increment and add to current views
  const dailyIncrement = generateDailyViewIncrement(post.id, currentDate);
  const newViews = (post.views || 0) + dailyIncrement;

  return {
    needsUpdate: true,
    newViews,
    newLastDailyIncrement: currentDate
  };
}

// Convert Vietnamese title to URL-friendly slug
export function createSlug(title: string): string {
  // Map of Vietnamese characters to ASCII equivalents
  const vietnameseMap: { [key: string]: string } = {
    'à': 'a', 'á': 'a', 'ạ': 'a', 'ả': 'a', 'ã': 'a', 'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ậ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ặ': 'a', 'ẳ': 'a', 'ẵ': 'a',
    'è': 'e', 'é': 'e', 'ẹ': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ê': 'e', 'ề': 'e', 'ế': 'e', 'ệ': 'e', 'ể': 'e', 'ễ': 'e',
    'ì': 'i', 'í': 'i', 'ị': 'i', 'ỉ': 'i', 'ĩ': 'i',
    'ò': 'o', 'ó': 'o', 'ọ': 'o', 'ỏ': 'o', 'õ': 'o', 'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ộ': 'o', 'ổ': 'o', 'ỗ': 'o', 'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ợ': 'o', 'ở': 'o', 'ỡ': 'o',
    'ù': 'u', 'ú': 'u', 'ụ': 'u', 'ủ': 'u', 'ũ': 'u', 'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ự': 'u', 'ử': 'u', 'ữ': 'u',
    'ỳ': 'y', 'ý': 'y', 'ỵ': 'y', 'ỷ': 'y', 'ỹ': 'y',
    'đ': 'd',
    'À': 'a', 'Á': 'a', 'Ạ': 'a', 'Ả': 'a', 'Ã': 'a', 'Â': 'a', 'Ầ': 'a', 'Ấ': 'a', 'Ậ': 'a', 'Ẩ': 'a', 'Ẫ': 'a', 'Ă': 'a', 'Ằ': 'a', 'Ắ': 'a', 'Ặ': 'a', 'Ẳ': 'a', 'Ẵ': 'a',
    'È': 'e', 'É': 'e', 'Ẹ': 'e', 'Ẻ': 'e', 'Ẽ': 'e', 'Ê': 'e', 'Ề': 'e', 'Ế': 'e', 'Ệ': 'e', 'Ể': 'e', 'Ễ': 'e',
    'Ì': 'i', 'Í': 'i', 'Ị': 'i', 'Ỉ': 'i', 'Ĩ': 'i',
    'Ò': 'o', 'Ó': 'o', 'Ọ': 'o', 'Ỏ': 'o', 'Õ': 'o', 'Ô': 'o', 'Ồ': 'o', 'Ố': 'o', 'Ộ': 'o', 'Ổ': 'o', 'Ỗ': 'o', 'Ơ': 'o', 'Ờ': 'o', 'Ớ': 'o', 'Ợ': 'o', 'Ở': 'o', 'Ỡ': 'o',
    'Ù': 'u', 'Ú': 'u', 'Ụ': 'u', 'Ủ': 'u', 'Ũ': 'u', 'Ư': 'u', 'Ừ': 'u', 'Ứ': 'u', 'Ự': 'u', 'Ử': 'u', 'Ữ': 'u',
    'Ỳ': 'y', 'Ý': 'y', 'Ỵ': 'y', 'Ỷ': 'y', 'Ỹ': 'y',
    'Đ': 'd'
  };

  return title
    .toLowerCase()
    // Replace Vietnamese characters
    .split('')
    .map(char => vietnameseMap[char] || char)
    .join('')
    // Replace spaces and special characters with hyphens
    .replace(/[^a-z0-9]/g, '-')
    // Remove multiple consecutive hyphens
    .replace(/-+/g, '-')
    // Remove leading and trailing hyphens
    .replace(/^-|-$/g, '');
}

// Calculate boost based on headline quality
function calculateHeadlineBoost(title: string): number {
  let score = 0;
  const titleLower = title.toLowerCase();
  
  // Contains numbers
  if (/\d/.test(title)) {
    score += 0.3;
  }
  
  // Contains year
  if (/20\d{2}/.test(title)) {
    score += 0.3;
  }
  
  // Power words (Vietnamese e-commerce terms)
  const powerWords = [
    'hướng dẫn', 'case study', 'bí kíp', 'bước', 'a-z', 
    'shopee', 'tiktok', 'lazada', 'sendo', 'chiến lược',
    'bán hàng', 'kinh doanh', 'marketing', 'seo', 'ads'
  ];
  
  let powerWordCount = 0;
  powerWords.forEach(word => {
    if (titleLower.includes(word)) {
      powerWordCount++;
    }
  });
  score += Math.min(0.4, powerWordCount * 0.1);
  
  // Optimal length boost
  const titleLength = title.length;
  if (titleLength >= 35 && titleLength <= 65) {
    score += 0.2;
  } else if (titleLength >= 20 && titleLength <= 90) {
    score += 0.1;
  }
  
  // Cap at 1.0 and multiply by 50
  return Math.min(1.0, score) * 50;
}