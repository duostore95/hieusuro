import { useAuth } from "@/contexts/auth-context";
import { useLocation } from "wouter";
import { useEffect } from "react";
import Login from "@/components/auth/login";
import SEO from "@/components/seo";

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (username: string, password: string): Promise<boolean> => {
    const success = await login(username, password);
    if (success) {
      navigate("/admin");
    }
    return success;
  };

  return (
    <>
      <SEO 
        title="Đăng nhập - Hiếu Suro Admin"
        description="Trang đăng nhập cho quản trị viên website Hiếu Suro"
        keywords="đăng nhập, login, admin, hiếu suro"
        canonical="https://hieusuro.replit.app/login"
        ogImage="/attached_assets/hieu-suro-profile.png"
        robots="noindex, nofollow"
      />
      <Login onLogin={handleLogin} />
    </>
  );
}