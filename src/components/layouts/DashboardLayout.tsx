
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Home,
  BookOpen,
  Users,
  Calendar,
  Award,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  Video,
  MessageSquare,
  Upload,
  BookOpenCheck,
  BarChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Define navigation items based on user role
  const getNavItems = () => {
    const baseNavItems = [
      { label: "Dashboard", icon: Home, href: `/${currentUser?.role}/dashboard` },
      { label: "Courses", icon: BookOpen, href: "/courses" },
    ];

    const roleSpecificNavItems = {
      student: [
        { label: "My Classes", icon: Calendar, href: "/student/classes" },
        { label: "Achievements", icon: Award, href: "/student/achievements" },
        { label: "Settings", icon: Settings, href: "/student/settings" },
      ],
      parent: [
        { label: "My Children", icon: Users, href: "/parent/children" },
        { label: "Progress Reports", icon: BarChart, href: "/parent/reports" },
        { label: "Settings", icon: Settings, href: "/parent/settings" },
      ],
      teacher: [
        { label: "My Students", icon: Users, href: "/teacher/students" },
        { label: "Schedule Classes", icon: Calendar, href: "/teacher/schedule" },
        { label: "Upload Materials", icon: Upload, href: "/teacher/upload" },
        { label: "Assessments", icon: BookOpenCheck, href: "/teacher/assessments" },
        { label: "Settings", icon: Settings, href: "/teacher/settings" },
      ],
    };

    return [
      ...baseNavItems,
      ...(currentUser?.role ? roleSpecificNavItems[currentUser.role] || [] : []),
    ];
  };

  const navItems = getNavItems();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar for larger screens */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="px-4 py-6 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-madrasah-purple flex items-center justify-center mr-2">
                  <span className="text-lg font-bold text-white arabic-text">ق</span>
                </div>
                <span className="text-lg font-bold text-madrasah-purple">Virtual Madrasah</span>
              </div>
              <button className="lg:hidden" onClick={closeSidebar}>
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="px-4 py-6 border-b">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={currentUser?.profilePicture} alt={currentUser?.name} />
                <AvatarFallback>{currentUser?.name ? getInitials(currentUser.name) : "U"}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{currentUser?.name}</div>
                <div className="text-xs text-muted-foreground capitalize">{currentUser?.role}</div>
              </div>
            </div>
          </div>

          <nav className="flex-1 px-2 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {navItems.map((item, i) => (
                <li key={i}>
                  <a
                    href={item.href}
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-madrasah-purple-light hover:text-madrasah-purple transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.href);
                      closeSidebar();
                    }}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="px-4 py-4 border-t">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between">
            <button className="lg:hidden" onClick={toggleSidebar}>
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="icon" className="h-9 w-9 rounded-full" asChild>
                <a href="#">
                  <MessageSquare className="h-5 w-5" />
                  <span className="sr-only">Messages</span>
                </a>
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9 rounded-full" asChild>
                <a href="#">
                  <Video className="h-5 w-5" />
                  <span className="sr-only">Video Conferences</span>
                </a>
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9 rounded-full" asChild>
                <a href="#">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Profile</span>
                </a>
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
