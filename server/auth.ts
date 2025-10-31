import { Request, Response, NextFunction } from 'express';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@server/db';

// Interface to extend Request with user info
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
  };
  session?: {
    id: string;
    userId: string;
    expiresAt: Date;
  };
}

// Configure better-auth with database and settings
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
  },
  // baseURL: process.env.BASE_URL || 'http://localhost:5000',
  // trustedOrigins: [
  //   process.env.BASE_URL || 'http://localhost:5000',
  //   'http://localhost:5000',
  //   'http://localhost:5173', // Vite dev server
  // ],
});

// Middleware to check authentication using better-auth sessions
export async function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    // Get session from better-auth using the request
    const session = await auth.api.getSession({
      headers: req.headers as any,
    });

    if (!session || !session.user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Vui lòng đăng nhập để thực hiện thao tác này',
      });
    }

    // Attach user and session to request
    req.user = session.user;
    req.session = session.session;
    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Phiên đăng nhập không hợp lệ hoặc đã hết hạn',
    });
  }
}
