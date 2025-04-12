
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

export type UserRole = "student" | "parent" | "teacher";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profilePicture?: string;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // For demo purposes, we'll use localStorage to simulate authentication
  // In a real app, this would be replaced with Firebase Auth
  useEffect(() => {
    const storedUser = localStorage.getItem("madrasahUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Mock login - in a real app, this would call Firebase Auth
      // For demo, we'll just check against some hardcoded values
      if (email === "student@example.com" && password === "password") {
        const user = {
          id: "student1",
          name: "Ahmed Student",
          email,
          role: "student" as UserRole,
          profilePicture: "/placeholder.svg"
        };
        localStorage.setItem("madrasahUser", JSON.stringify(user));
        setCurrentUser(user);
        toast({
          title: "Login successful",
          description: "Welcome back, Ahmed!",
        });
      } else if (email === "parent@example.com" && password === "password") {
        const user = {
          id: "parent1",
          name: "Fatima Parent",
          email,
          role: "parent" as UserRole,
          profilePicture: "/placeholder.svg"
        };
        localStorage.setItem("madrasahUser", JSON.stringify(user));
        setCurrentUser(user);
        toast({
          title: "Login successful",
          description: "Welcome back, Fatima!",
        });
      } else if (email === "teacher@example.com" && password === "password") {
        const user = {
          id: "teacher1",
          name: "Umar Teacher",
          email,
          role: "teacher" as UserRole,
          profilePicture: "/placeholder.svg"
        };
        localStorage.setItem("madrasahUser", JSON.stringify(user));
        setCurrentUser(user);
        toast({
          title: "Login successful",
          description: "Welcome back, Umar!",
        });
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An error occurred during login",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    try {
      setLoading(true);
      // Mock signup - in a real app, this would call Firebase Auth
      const user = {
        id: `user-${Date.now()}`,
        name,
        email,
        role,
        profilePicture: "/placeholder.svg"
      };
      localStorage.setItem("madrasahUser", JSON.stringify(user));
      setCurrentUser(user);
      toast({
        title: "Account created",
        description: `Welcome to Virtual Madrasah, ${name}!`,
      });
    } catch (error) {
      toast({
        title: "Signup failed",
        description: error instanceof Error ? error.message : "An error occurred during signup",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("madrasahUser");
    setCurrentUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const authValue = {
    currentUser,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: currentUser !== null,
  };

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};
