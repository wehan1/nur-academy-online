
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Book, Search, BookOpen, Star, Clock } from "lucide-react";

// Mock course data
const allCourses = [
  {
    id: "course1",
    title: "Quran Reading Basics",
    description: "Learn the fundamental rules of reading the Quran with proper pronunciation.",
    level: 1,
    subject: "Quran",
    duration: "8 weeks",
    lessons: 16,
    rating: 4.8,
    enrolled: 120,
    image: "/placeholder.svg"
  },
  {
    id: "course2",
    title: "Islamic Etiquettes",
    description: "Discover the beautiful manners and etiquettes taught in Islam for daily life.",
    level: 1,
    subject: "Islamic Studies",
    duration: "6 weeks",
    lessons: 12,
    rating: 4.6,
    enrolled: 85,
    image: "/placeholder.svg"
  },
  {
    id: "course3",
    title: "Arabic Alphabet",
    description: "Master the Arabic alphabet and basic vocabulary with fun interactive lessons.",
    level: 1,
    subject: "Arabic",
    duration: "4 weeks",
    lessons: 8,
    rating: 4.9,
    enrolled: 150,
    image: "/placeholder.svg"
  },
  {
    id: "course4",
    title: "Tajweed Rules",
    description: "Learn the rules of Tajweed to perfect your Quranic recitation.",
    level: 2,
    subject: "Quran",
    duration: "10 weeks",
    lessons: 20,
    rating: 4.7,
    enrolled: 95,
    image: "/placeholder.svg"
  },
  {
    id: "course5",
    title: "Prophets' Stories",
    description: "Explore the inspiring stories of the prophets mentioned in the Quran.",
    level: 2,
    subject: "Islamic Studies",
    duration: "12 weeks",
    lessons: 24,
    rating: 4.9,
    enrolled: 110,
    image: "/placeholder.svg"
  },
  {
    id: "course6",
    title: "Arabic Grammar Basics",
    description: "Introduction to Arabic grammar rules and sentence structure.",
    level: 2,
    subject: "Arabic",
    duration: "8 weeks",
    lessons: 16,
    rating: 4.5,
    enrolled: 75,
    image: "/placeholder.svg"
  },
  {
    id: "course7",
    title: "Surah Memorization",
    description: "Memorize selected surahs from Juz Amma with proper Tajweed.",
    level: 3,
    subject: "Quran",
    duration: "16 weeks",
    lessons: 32,
    rating: 4.8,
    enrolled: 90,
    image: "/placeholder.svg"
  },
  {
    id: "course8",
    title: "Islamic History",
    description: "Learn about the early Islamic history and the lives of the companions.",
    level: 3,
    subject: "Islamic Studies",
    duration: "14 weeks",
    lessons: 28,
    rating: 4.7,
    enrolled: 80,
    image: "/placeholder.svg"
  },
];

const CoursesPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Parse level from URL if present
  const queryParams = new URLSearchParams(location.search);
  const levelParam = queryParams.get("level");
  
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState(levelParam || "all");
  const [subjectFilter, setSubjectFilter] = useState("all");
  
  const handleLevelChange = (value: string) => {
    setLevelFilter(value);
    // Update URL with the level parameter
    if (value === "all") {
      queryParams.delete("level");
    } else {
      queryParams.set("level", value);
    }
    navigate({ search: queryParams.toString() });
  };

  // Filter courses based on search term, level and subject
  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLevel = levelFilter === "all" || course.level.toString() === levelFilter;
    
    const matchesSubject = subjectFilter === "all" || course.subject === subjectFilter;
    
    return matchesSearch && matchesLevel && matchesSubject;
  });

  const subjects = ["Quran", "Islamic Studies", "Arabic"];
  const levels = [
    { value: "1", label: "Beginner" },
    { value: "2", label: "Foundation" },
    { value: "3", label: "Intermediate" },
    { value: "4", label: "Advanced" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Course Library
          </h1>
          {!isAuthenticated && (
            <Button onClick={() => navigate("/signup")}>
              Sign Up to Enroll
            </Button>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={levelFilter} onValueChange={handleLevelChange}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {levels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label} (Level {level.value})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden card-hover">
                <div className="aspect-video bg-gray-100 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Book className="h-16 w-16 text-madrasah-purple opacity-20" />
                  </div>
                  <Badge className="absolute top-2 right-2 bg-madrasah-purple">
                    Level {course.level}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.subject}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                    {course.description}
                  </p>
                  {/* Removed course metadata (lessons, duration, rating) */}
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-madrasah-purple hover:bg-madrasah-purple-dark"
                    onClick={() => navigate(`/courses/${course.id}`)}
                  >
                    View Course
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-medium mb-2">No courses found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CoursesPage;
