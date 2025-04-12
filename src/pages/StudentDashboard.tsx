
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Calendar, Book, BookOpen, Award, Clock, Video, ArrowRight } from "lucide-react";

const StudentDashboard = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || currentUser?.role !== "student") {
      navigate("/login");
    }
  }, [isAuthenticated, currentUser, navigate]);

  // Mock data
  const recentCourses = [
    {
      id: "course1",
      title: "Quran Reading Basics",
      level: 1,
      subject: "Quran",
      progress: 65,
      lastAccessed: "2 days ago"
    },
    {
      id: "course2",
      title: "Islamic Etiquettes",
      level: 1,
      subject: "Islamic Studies",
      progress: 40,
      lastAccessed: "Yesterday"
    },
    {
      id: "course3",
      title: "Arabic Alphabet",
      level: 1,
      subject: "Arabic",
      progress: 85,
      lastAccessed: "Today"
    }
  ];

  const upcomingClasses = [
    {
      id: "class1",
      title: "Tajweed Rules Practice",
      teacher: "Umar Teacher",
      time: "Tomorrow, 4:00 PM",
      duration: "45 min"
    },
    {
      id: "class2",
      title: "Surah Al-Fatiha Memorization",
      teacher: "Aisha Teacher",
      time: "Friday, 5:30 PM",
      duration: "30 min"
    }
  ];

  const achievements = [
    {
      id: "ach1",
      title: "First Surah Memorized",
      description: "Successfully memorized Surah Al-Fatiha",
      date: "2 weeks ago",
      icon: Award
    },
    {
      id: "ach2",
      title: "Perfect Attendance",
      description: "Attended 10 classes without missing any",
      date: "1 week ago",
      icon: Clock
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Welcome back, {currentUser?.name || "Student"}!
          </h1>
          <Button variant="outline" onClick={() => navigate("/courses")}>
            Browse All Courses
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Courses Enrolled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Book className="mr-2 h-5 w-5 text-madrasah-purple" />
                <span className="text-2xl font-bold">3</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Overall Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BookOpen className="mr-2 h-5 w-5 text-madrasah-blue" />
                    <span className="text-2xl font-bold">63%</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Level 1</span>
                </div>
                <Progress value={63} className="h-2" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Next Class</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-madrasah-green" />
                <div>
                  <div className="text-sm font-medium">Tajweed Rules Practice</div>
                  <div className="text-xs text-muted-foreground">Tomorrow, 4:00 PM</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Courses */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Continue Learning</h2>
            <Button variant="ghost" size="sm" className="text-madrasah-purple hover:text-madrasah-purple-dark" asChild>
              <a href="/courses">View all <ArrowRight className="ml-1 h-4 w-4" /></a>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentCourses.map((course) => (
              <Card key={course.id} className="card-hover">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{course.title}</CardTitle>
                      <CardDescription>Level {course.level} • {course.subject}</CardDescription>
                    </div>
                    <div className="px-2 py-1 bg-madrasah-purple-light text-madrasah-purple text-xs font-medium rounded-full">
                      {course.progress}%
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={course.progress} className="h-2 mb-4" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Last accessed {course.lastAccessed}</span>
                    <Button size="sm" className="bg-madrasah-purple hover:bg-madrasah-purple-dark" asChild>
                      <a href={`/courses/${course.id}`}>Continue</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upcoming Classes */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Classes</CardTitle>
              <CardDescription>Your scheduled live sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingClasses.map((cls) => (
                  <div key={cls.id} className="flex items-start p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                    <Video className="h-10 w-10 text-madrasah-blue p-2 bg-madrasah-blue-light rounded-full mr-3" />
                    <div className="flex-1">
                      <h4 className="font-medium">{cls.title}</h4>
                      <p className="text-sm text-muted-foreground">with {cls.teacher}</p>
                      <div className="flex items-center mt-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{cls.time} • {cls.duration}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Join</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
              <CardDescription>Your learning milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-start p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                    <achievement.icon className="h-10 w-10 text-madrasah-purple p-2 bg-madrasah-purple-light rounded-full mr-3" />
                    <div>
                      <h4 className="font-medium">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
