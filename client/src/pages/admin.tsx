import { useState } from "react";
import Sidebar from "@/components/admin/sidebar";
import Dashboard from "@/components/admin/dashboard";
import PostsManagement from "@/components/admin/posts-management";
import CoursesManagement from "@/components/admin/courses-management";
import TestimonialsManagement from "@/components/admin/testimonials-management";
import Settings from "@/components/admin/settings";
import { Menu, Home, Edit, GraduationCap, Star, Settings as SettingsIcon } from "lucide-react";
import SEO from "@/components/seo";

export default function Admin() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "posts":
        return <PostsManagement />;
      case "courses":
        return <CoursesManagement />;
      case "testimonials":
        return <TestimonialsManagement />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  const getSectionTitle = () => {
    const titles = {
      dashboard: 'Dashboard',
      posts: 'Quản lý bài viết',
      courses: 'Quản lý khóa học',
      testimonials: 'Quản lý đánh giá',
      settings: 'Cài đặt hệ thống'
    };
    return titles[activeSection as keyof typeof titles] || 'Dashboard';
  };

  return (
    <>
      <SEO 
        title="Admin Panel - Hiếu Suro"
        description="Trang quản trị hệ thống cho website Hiếu Suro E-commerce"
        keywords="admin, quản trị, hiếu suro"
        canonical="https://hieusuro.replit.app/admin"
        ogImage="/attached_assets/hieu-suro-profile.png"
        robots="noindex, nofollow"
      />
      <div className="flex h-screen bg-background admin-dark">
      {/* Sidebar - hidden on mobile, shown on md+ screens */}
      <div className="hidden md:block">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      </div>
      
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-background border-b border-border px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Mobile menu button */}
              <button 
                className="md:hidden h-11 w-11 flex items-center justify-center" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="mobile-menu-button"
              >
                <Menu className="h-5 w-5" />
              </button>
              <h1 className="text-xl md:text-2xl font-bold truncate">{getSectionTitle()}</h1>
            </div>
            <div></div>
          </div>
          
          {/* Mobile navigation menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-border mt-4 pt-4">
              <nav className="space-y-2">
                {[
                  { id: "dashboard", label: "Dashboard", icon: Home },
                  { id: "posts", label: "Quản lý bài viết", icon: Edit },
                  { id: "courses", label: "Quản lý khóa học", icon: GraduationCap },
                  { id: "testimonials", label: "Quản lý đánh giá", icon: Star },
                  { id: "settings", label: "Cài đặt", icon: SettingsIcon },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-md transition-colors h-11 ${
                      activeSection === item.id
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                    data-testid={`mobile-nav-${item.id}`}
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {renderActiveSection()}
        </main>
      </div>
    </div>
    </>
  );
}
