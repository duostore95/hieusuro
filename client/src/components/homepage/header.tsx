import { useState } from "react";
import { Menu, X, Gift, Rocket } from "lucide-react";
import { Link } from "wouter";

interface MenuItem {
  label: string;
  href?: string;
  section?: string;
  icon?: any;
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const menuItems: MenuItem[] = [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Khóa học", href: "/hoc" },
    { label: "Quà tặng", section: "ebook", icon: Gift }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <span className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors duration-200">
              Hiếu Suro
            </span>
            <span 
              className="inline-block w-0.5 bg-indigo-600 ml-1 cursor-blink"
              style={{
                height: '1.5em'
              }}
            >
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              item.href ? (
                <Link 
                  key={`desktop-${item.href || item.section}-${index}`}
                  href={item.href}
                  className="group flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-all duration-200 relative overflow-hidden rounded-lg hover:bg-indigo-50"
                  data-testid={`nav-${item.href.replace('/', '')}`}
                >
                  {item.icon && (
                    <item.icon className="h-4 w-4 transform group-hover:scale-110 transition-transform duration-200" />
                  )}
                  <span className="relative">
                    {item.label}
                    <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-indigo-600 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </span>
                </Link>
              ) : (
                <button
                  key={`desktop-${item.section}-${index}`}
                  onClick={() => scrollToSection(item.section!)}
                  className="group flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-all duration-200 relative overflow-hidden rounded-lg hover:bg-indigo-50"
                  data-testid={`nav-${item.section}`}
                >
                  {item.icon && (
                    <item.icon className="h-4 w-4 transform group-hover:scale-110 transition-transform duration-200" />
                  )}
                  <span className="relative">
                    {item.label}
                    <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-indigo-600 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </span>
                </button>
              )
            ))}
          </nav>
          
          {/* Right side - Người mới */}
          <div className="hidden md:flex items-center">
            <Link 
              href="/nguoi-moi"
              className="group flex items-center gap-2 text-sm font-medium bg-gradient-to-r from-orange-500 to-pink-600 text-white hover:from-orange-600 hover:to-pink-700 transition-all duration-200 px-4 py-2 rounded-full shadow-md hover:shadow-lg transform hover:scale-105"
              data-testid="nguoi-moi-link"
            >
              <Rocket className="h-4 w-4 transform group-hover:rotate-12 transition-transform duration-200" />
              <span>Người mới</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-100 transition-all duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 transform rotate-180 transition-transform duration-200" />
            ) : (
              <Menu className="h-5 w-5 transform hover:scale-110 transition-transform duration-200" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg mx-4 rounded-xl mt-1 overflow-hidden animate-in slide-in-from-top-2 duration-200">
            <nav className="px-6 py-4 space-y-2">
              {menuItems.map((item, index) => (
                item.href ? (
                  <Link
                    key={`mobile-${item.href}-${index}`}
                    href={item.href}
                    className="group flex items-center space-x-3 w-full px-4 py-3 text-lg text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200 transform hover:translate-x-1"
                    data-testid={`mobile-nav-${item.href.replace('/', '')}`}
                    style={{ 
                      animationDelay: `${index * 50}ms`,
                      animation: 'slideInLeft 0.3s ease-out forwards'
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon && (
                      <item.icon className="h-5 w-5 transform group-hover:scale-110 transition-transform duration-200" />
                    )}
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <button
                    key={`mobile-${item.section}-${index}`}
                    onClick={() => scrollToSection(item.section!)}
                    className="group flex items-center space-x-3 w-full px-4 py-3 text-lg text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200 transform hover:translate-x-1"
                    data-testid={`mobile-nav-${item.section}`}
                    style={{ 
                      animationDelay: `${index * 50}ms`,
                      animation: 'slideInLeft 0.3s ease-out forwards'
                    }}
                  >
                    {item.icon && (
                      <item.icon className="h-5 w-5 transform group-hover:scale-110 transition-transform duration-200" />
                    )}
                    <span>{item.label}</span>
                  </button>
                )
              ))}
              
              <div className="pt-4 mt-4 border-t border-gray-200">
                <Link 
                  href="/nguoi-moi"
                  className="group flex items-center gap-2 w-full px-4 py-3 text-sm font-medium bg-gradient-to-r from-orange-500 to-pink-600 text-white hover:from-orange-600 hover:to-pink-700 rounded-xl transition-all duration-200 shadow-md"
                  data-testid="mobile-nguoi-moi-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Rocket className="h-4 w-4 transform group-hover:rotate-12 transition-transform duration-200" />
                  <span>Người mới</span>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>

    </header>
  );
}