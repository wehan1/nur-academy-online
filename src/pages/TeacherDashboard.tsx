
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  Users, Book, Calendar, ArrowRight, Upload, Clock, Video, 
  CheckCircle, XCircle, BarChart3, BookOpen
} from "lucide-react";

const TeacherDashboard = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || currentUser?.role !== "teacher") {
      navigate("/login");
    }
  }, [isAuthenticated, currentUser, navigate]);

  // Mock data
  const todayClasses = [
    {
      id: "class1",
      title: "Quran Reading Basics",
      time: "4:00 PM - 4:45 PM",
      students: 8,
      level: 1,
    },
    {
      id: "class2",
      title: "Islamic Etiquettes",
      time: "5:30 PM - 6:15 PM",
      students: 12,
      level: 1,
    },
  ];

  const recentAssignments = [
    {
      id: "assign1",
      title: "Surah Al-Fatiha Memorization",
      dueDate: "April 20, 2025",
      submitted: 5,
      total: 8,
    },
    {
      id: "assign2",
      title: "Islamic Manners Quiz",
      dueDate: "April 25, 2025",
      submitted: 3,
      total: 12,
    },
  ];

  const studentActivity = [
    {
      id: "activity1",
      student: {
        name: "Ahmed Hassan",
        avatar: "/placeholder.svg",
      },
      action: "Completed lesson: Quran Reading Basics - Lesson 3",
      time: "1 hour ago",
    },
    {
      id: "activity2",
      student: {
        name: "Fatima Khan",
        avatar: "/placeholder.svg",
      },
      action: "Submitted assignment: Surah Al-Fatiha Memorization",
      time: "3 hours ago",
    },
    {
      id: "activity3",
      student: {
        name: "Yusuf Ali",
        avatar: "/placeholder.svg",
      },
      action: "Joined class: Islamic Etiquettes",
      time: "Yesterday",
    },
  ];

  // Helper function to get avatar initials
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Welcome, {currentUser?.name || "Teacher"}!
          </h1>
          <Button variant="outline" onClick={() => navigate("/teacher/upload")}>
            Upload Learning Materials
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-madrasah-purple" />
                <span className="text-2xl font-bold">20</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Courses Teaching</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Book className="mr-2 h-5 w-5 text-madrasah-blue" />
                <span className="text-2xl font-bold">3</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Today's Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-madrasah-green" />
                <span className="text-2xl font-bold">2</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Classes */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Today's Classes</h2>
            <Button variant="ghost" size="sm" className="text-madrasah-purple hover:text-madrasah-purple-dark" asChild>
              <a href="/teacher/schedule">View schedule <ArrowRight className="ml-1 h-4 w-4" /></a>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {todayClasses.map((cls) => (
              <Card key={cls.id} className="card-hover">
                <CardHeader>
                  <CardTitle>{cls.title}</CardTitle>
                  <CardDescription>Level {cls.level} • {cls.students} students</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-2 h-4 w-4" />
                      {cls.time}
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex items-center">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Materials
                      </Button>
                      <Button size="sm" className="bg-madrasah-purple hover:bg-madrasah-purple-dark flex items-center">
                        <Video className="mr-2 h-4 w-4" />
                        Start Class
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Assignments */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Assignments</CardTitle>
              <CardDescription>Track student submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAssignments.map((assignment) => (
                  <div key={assignment.id} className="p-4 rounded-lg border">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{assignment.title}</h4>
                        <p className="text-sm text-muted-foreground">Due {assignment.dueDate}</p>
                      </div>
                      <div className="flex items-center">
                        <div className="flex items-center mr-3">
                          <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                          <span className="text-sm">{assignment.submitted}</span>
                        </div>
                        <div className="flex items-center">
                          <XCircle className="h-4 w-4 mr-1 text-red-500" />
                          <span className="text-sm">{assignment.total - assignment.submitted}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button size="sm" variant="outline">View Submissions</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Student Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Student Activity</CardTitle>
              <CardDescription>Latest actions from your students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarImage src={activity.student.avatar} alt={activity.student.name} />
                      <AvatarFallback>{getInitials(activity.student.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{activity.student.name}</h4>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center">
                <Upload className="h-6 w-6 mb-2" />
                <span>Upload Materials</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center">
                <Video className="h-6 w-6 mb-2" />
                <span>Schedule Class</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center">
                <Book className="h-6 w-6 mb-2" />
                <span>Create Assignment</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center">
                <BarChart3 className="h-6 w-6 mb-2" />
                <span>View Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
