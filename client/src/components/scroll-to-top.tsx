import { useEffect } from "react";
import { useLocation } from "wouter";

export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // Scroll to top whenever route changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  return null;
}