import {
  Home,
  Edit,
  GraduationCap,
  Star,
  Settings,
  User,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Sidebar({
  activeSection,
  setActiveSection,
}: SidebarProps) {
  const { user, logout } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'posts', label: 'Quản lý bài viết', icon: Edit },
    { id: 'courses', label: 'Quản lý khóa học', icon: GraduationCap },
    { id: 'testimonials', label: 'Quản lý đánh giá', icon: Star },
    { id: 'settings', label: 'Cài đặt', icon: Settings },
  ];

  const handleLogout = async () => {
    await logout();
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return 'A';
    return user.name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen">
      <div className="flex h-16 items-center border-b border-sidebar-border px-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">H</span>
          </div>
          <div className="flex flex-col">
            <h2 className="text-sm font-semibold text-sidebar-foreground">
              Hiếu Suro
            </h2>
            <p className="text-xs text-muted-foreground">Admin Dashboard</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeSection === item.id
                  ? 'text-sidebar-primary-foreground bg-sidebar-primary'
                  : 'text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent'
              }`}
              data-testid={`nav-${item.id}`}
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="border-t border-sidebar-border p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-muted-foreground">
              {getUserInitials()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {user?.name || 'N/A'}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email || 'N/A'}
            </p>
          </div>
        </div>
        <Button
          size="icon"
          variant="secondary"
          title="Đăng xuất"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
