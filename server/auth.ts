import { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";

// Simple in-memory session store for demo (trong production nên dùng database hoặc Redis)
const activeSessions = new Set<string>();

// Interface để extend Request với user info
interface AuthenticatedRequest extends Request {
  sessionId?: string;
  isAuthenticated?: boolean;
}

// Function tạo session ID an toàn
function generateSessionId(): string {
  return randomUUID();
}

// Middleware kiểm tra authentication
export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      error: "Unauthorized", 
      message: "Vui lòng đăng nhập để thực hiện thao tác này" 
    });
  }

  const sessionId = authHeader.substring(7); // Remove 'Bearer ' prefix
  
  if (!activeSessions.has(sessionId)) {
    return res.status(401).json({ 
      error: "Unauthorized", 
      message: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại" 
    });
  }

  req.sessionId = sessionId;
  req.isAuthenticated = true;
  next();
}

// Function để login và tạo session
export function createSession(): string {
  const sessionId = generateSessionId();
  activeSessions.add(sessionId);
  
  // Auto expire session after 24 hours
  setTimeout(() => {
    activeSessions.delete(sessionId);
  }, 24 * 60 * 60 * 1000);
  
  return sessionId;
}

// Function để logout và xóa session
export function destroySession(sessionId: string): void {
  activeSessions.delete(sessionId);
}

// Function để verify login credentials
export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  // Import storage here to avoid circular dependency
  const { storage } = await import("./storage");
  
  // Get credentials from storage first, then environment variables or fallback to defaults
  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = await storage.getAdminPassword();
  
  return username === adminUsername && password === adminPassword;
}