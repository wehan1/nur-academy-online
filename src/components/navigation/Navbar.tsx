
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, User, LogOut, BookOpen, Users } from "lucide-react";

const Navbar: React.FC = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
    <header className="w-full border-b bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-madrasah-purple flex items-center justify-center mr-2">
                <span className="text-xl font-bold text-white arabic-text">ق</span>
              </div>
              <span className="text-xl font-bold text-madrasah-purple">Virtual Madrasah</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-600 hover:text-madrasah-purple transition-colors">Home</Link>
            <Link to="/courses" className="text-gray-600 hover:text-madrasah-purple transition-colors">Courses</Link>
            <Link to="#about" className="text-gray-600 hover:text-madrasah-purple transition-colors">About</Link>
            <Link to="#contact" className="text-gray-600 hover:text-madrasah-purple transition-colors">Contact</Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {currentUser?.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate(getDashboardLink())}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/courses")}>
                    <Users className="mr-2 h-4 w-4" />
                    <span>My Courses</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild variant="outline">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="bg-madrasah-purple hover:bg-madrasah-purple-dark">
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container px-4 py-4 flex flex-col gap-4">
            <Link to="/" className="text-gray-600 hover:text-madrasah-purple py-2 transition-colors" onClick={toggleMenu}>Home</Link>
            <Link to="/courses" className="text-gray-600 hover:text-madrasah-purple py-2 transition-colors" onClick={toggleMenu}>Courses</Link>
            <Link to="#about" className="text-gray-600 hover:text-madrasah-purple py-2 transition-colors" onClick={toggleMenu}>About</Link>
            <Link to="#contact" className="text-gray-600 hover:text-madrasah-purple py-2 transition-colors" onClick={toggleMenu}>Contact</Link>
            
            <div className="pt-4 border-t flex flex-col gap-3">
              {isAuthenticated ? (
                <>
                  <Button onClick={() => { navigate(getDashboardLink()); toggleMenu(); }} className="w-full">
                    Dashboard
                  </Button>
                  <Button onClick={handleLogout} variant="outline" className="w-full">
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/login" onClick={toggleMenu}>Login</Link>
                  </Button>
                  <Button asChild className="w-full bg-madrasah-purple hover:bg-madrasah-purple-dark">
                    <Link to="/signup" onClick={toggleMenu}>Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
