
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Book, 
  Users, 
  Clock, 
  CheckCircle, 
  Play, 
  Download, 
  Star 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock course data with lessons
const allCourses = [
  {
    id: "course1",
    title: "Quran Reading Basics",
    description: "Learn the fundamental rules of reading the Quran with proper pronunciation. This course is designed for beginners who want to start their journey of Quranic learning. Through step-by-step guidance, you will learn how to read the Arabic letters, recognize basic Tajweed rules, and begin reading simple verses.",
    level: 1,
    subject: "Quran",
    duration: "8 weeks",
    lessons: [],
    instructors: [
      {
        id: "teacher1",
        name: "Umar Abdullah",
        role: "Quran Teacher",
        avatar: "/placeholder.svg",
        bio: "Certified Quran teacher with 10+ years of experience teaching children and adults."
      }
    ],
    enrolled: 120,
    rating: 4.8,
    reviews: 45,
    skills: ["Quranic Arabic", "Letter Recognition", "Basic Tajweed", "Reading Practice"],
    prerequisites: "None - suitable for absolute beginners",
    objectives: [
      "Recognize and pronounce all Arabic letters correctly",
      "Read words with proper vowel marks",
      "Understand basic Tajweed rules",
      "Build confidence in reading simple Quranic verses"
    ],
    resources: [
      {
        id: "resource1",
        title: "Arabic Alphabet Chart",
        type: "PDF",
        size: "1.2 MB"
      },
      {
        id: "resource2",
        title: "Letter Pronunciation Guide",
        type: "Audio",
        size: "15 MB"
      },
      {
        id: "resource3",
        title: "Practice Workbook",
        type: "PDF",
        size: "3.5 MB"
      }
    ]
  },
  // Add more courses here
];

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();

  const [course, setCourse] = useState<any>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const foundCourse = allCourses.find(c => c.id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);
      
      // Calculate course progress based on completed lessons
      if (foundCourse.lessons) {
        const completedLessons = foundCourse.lessons.filter(lesson => lesson.completed).length;
        const progressPercentage = (completedLessons / foundCourse.lessons.length) * 100;
        setProgress(progressPercentage);
        
        // For demo purposes, we'll consider the user enrolled if there's any progress
        setIsEnrolled(progressPercentage > 0);
      }
    } else {
      // Course not found, redirect to courses page
      navigate("/courses");
    }
  }, [courseId, navigate]);

  const handleEnroll = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    setIsEnrolled(true);
    
    // In a real app, this would call an API to enroll the user
    console.log(`User ${currentUser?.id} enrolled in course ${courseId}`);
  };

  const startCourse = () => {
    if (course?.lessons?.[0]) {
      navigate(`/lessons/${course.lessons[0].id}`);
    }
  };

  const continueCourse = () => {
    // Find the first incomplete lesson
    const nextLesson = course.lessons.find((lesson: any) => !lesson.completed);
    if (nextLesson) {
      navigate(`/lessons/${nextLesson.id}`);
    } else {
      // If all complete, go to first lesson
      navigate(`/lessons/${course.lessons[0].id}`);
    }
  };

  if (!course) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <p>Loading course details...</p>
        </div>
      </DashboardLayout>
    );
  }

  const getLevelName = (level: number) => {
    switch (level) {
      case 1: return "Beginner";
      case 2: return "Foundation";
      case 3: return "Intermediate";
      case 4: return "Advanced";
      default: return "Unknown";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Course Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge className="bg-madrasah-purple">{course.subject}</Badge>
              <Badge variant="outline" className="text-madrasah-blue border-madrasah-blue">
                Level {course.level}: {getLevelName(course.level)}
              </Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              {course.title}
            </h1>
            <p className="text-gray-600">{course.description}</p>
            
            {/* Removed the course metadata section (enrolled, weeks, lessons, ratings) */}
          </div>
          
          <div className="w-full md:w-auto">
            {isAuthenticated ? (
              isEnrolled ? (
                <Card className="w-full md:w-80">
                  <CardHeader className="pb-2">
                    <CardTitle>Your Progress</CardTitle>
                    <CardDescription>
                      {Math.round(progress)}% complete
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Progress value={progress} className="h-2" />
                    <Button 
                      className="w-full bg-madrasah-purple hover:bg-madrasah-purple-dark"
                      onClick={continueCourse}
                    >
                      Continue Learning
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="w-full md:w-80">
                  <CardHeader className="pb-2">
                    <CardTitle>Ready to Start?</CardTitle>
                    <CardDescription>
                      Enroll today to access all lessons
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full bg-madrasah-purple hover:bg-madrasah-purple-dark"
                      onClick={handleEnroll}
                    >
                      Enroll in Course
                    </Button>
                  </CardContent>
                </Card>
              )
            ) : (
              <Card className="w-full md:w-80">
                <CardHeader className="pb-2">
                  <CardTitle>Ready to Start?</CardTitle>
                  <CardDescription>
                    Login or signup to join this course
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    className="w-full bg-madrasah-purple hover:bg-madrasah-purple-dark"
                    onClick={() => navigate("/login")}
                  >
                    Log In
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Course Content Tabs */}
        <Tabs defaultValue="curriculum" className="space-y-4">
          <TabsList>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="instructors">Instructors</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          
          {/* Curriculum Tab */}
          <TabsContent value="curriculum" className="space-y-4">
            <div className="grid gap-4">
              {course.lessons.map((lesson: any, index: number) => (
                <div key={lesson.id} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-madrasah-purple-light text-madrasah-purple flex items-center justify-center font-medium mr-3">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-medium">{lesson.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{lesson.description}</p>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{lesson.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {lesson.completed && (
                        <div className="flex items-center text-green-600 mr-3">
                          <CheckCircle className="h-5 w-5" />
                          <span className="ml-1 text-sm font-medium">Completed</span>
                        </div>
                      )}
                      <Button 
                        size="sm" 
                        variant={lesson.completed ? "outline" : "default"}
                        className={!lesson.completed ? "bg-madrasah-purple hover:bg-madrasah-purple-dark" : ""}
                        onClick={() => navigate(`/lessons/${lesson.id}`)}
                      >
                        <Play className="h-4 w-4 mr-1" />
                        {lesson.completed ? "Review" : "Start"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          {/* Instructors Tab */}
          <TabsContent value="instructors" className="space-y-6">
            {course.instructors.map((instructor: any) => (
              <Card key={instructor.id}>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={instructor.avatar} alt={instructor.name} />
                      <AvatarFallback className="text-xl">{instructor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">{instructor.name}</h3>
                      <p className="text-madrasah-purple">{instructor.role}</p>
                      <p className="mt-3 text-gray-600">{instructor.bio}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Course Materials</CardTitle>
                <CardDescription>Download resources to enhance your learning</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {course.resources.map((resource: any) => (
                    <div 
                      key={resource.id} 
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-md bg-madrasah-purple-light text-madrasah-purple flex items-center justify-center mr-3">
                          {resource.type === "PDF" ? "PDF" : "🎵"}
                        </div>
                        <div>
                          <h4 className="font-medium">{resource.title}</h4>
                          <p className="text-xs text-muted-foreground">{resource.size}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* About Tab */}
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Objectives</CardTitle>
                <CardDescription>What you'll learn in this course</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {course.objectives.map((objective: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-madrasah-purple mr-2 flex-shrink-0" />
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Prerequisites</CardTitle>
                <CardDescription>Knowledge required before starting</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{course.prerequisites}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Skills You'll Gain</CardTitle>
                <CardDescription>Competencies developed through this course</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {course.skills.map((skill: string, index: number) => (
                    <Badge key={index} variant="outline" className="bg-madrasah-purple-light text-madrasah-purple border-madrasah-purple">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CourseDetailPage;
