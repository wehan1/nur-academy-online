
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isAuthenticated, currentUser } = useAuth();

  const getDashboardLink = () => {
    if (!currentUser) return "/login";
    
    switch (currentUser.role) {
      case "student":
        return "/student/dashboard";
      case "parent":
        return "/parent/dashboard";
      case "teacher":
        return "/teacher/dashboard";
      default:
        return "/login";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
