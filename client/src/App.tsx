import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/auth-context";
import ScrollToTop from "@/components/scroll-to-top";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Admin from "@/pages/admin";
import AboutPage from "@/pages/about";
import CoursesPage from "@/pages/courses";
import ShopeeZoomLanding from "@/pages/shopeezoom";
import AffiliateShopee from "@/pages/affshopee";
import TikTokZoom from "@/pages/tiktokzoom";
import LoginPage from "@/pages/login";
import BlogPage from "@/pages/blog";
import BlogDetailPage from "@/pages/blog-detail";
import NguoiMoiPage from "@/pages/nguoi-moi";
import ProtectedRoute from "@/components/auth/protected-route";

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={AboutPage} />
        <Route path="/hoc" component={CoursesPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/blog" component={BlogPage} />
        <Route path="/blog/:slug" component={BlogDetailPage} />
        <Route path="/admin">
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        </Route>
        <Route path="/shopeezoom" component={ShopeeZoomLanding} />
        <Route path="/affshopee" component={AffiliateShopee} />
        <Route path="/tiktokzoom" component={TikTokZoom} />
        <Route path="/nguoi-moi" component={NguoiMoiPage} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
