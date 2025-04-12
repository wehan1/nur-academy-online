
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Calendar, Book, Users, BarChart, ArrowRight, Clock, Video, BookOpen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ParentDashboard = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || currentUser?.role !== "parent") {
      navigate("/login");
    }
  }, [isAuthenticated, currentUser, navigate]);

  // Mock data
  const children = [
    {
      id: "child1",
      name: "Yusuf",
      age: 10,
      level: 2,
      courses: 3,
      recentProgress: 72,
      nextClass: "Tomorrow, 5:00 PM",
      recentActivity: "Completed Surah Al-Fatiha lesson",
    },
    {
      id: "child2",
      name: "Maryam",
      age: 8,
      level: 1,
      courses: 2,
      recentProgress: 45,
      nextClass: "Today, 6:30 PM",
      recentActivity: "Started Arabic Alphabet course",
    },
  ];

  const upcomingPayments = [
    {
      id: "payment1",
      description: "Monthly Tuition - May 2025",
      amount: "$75.00",
      dueDate: "April 30, 2025",
    },
    {
      id: "payment2",
      description: "Learning Materials Package",
      amount: "$25.00",
      dueDate: "May 15, 2025",
    },
  ];

  const announcements = [
    {
      id: "a1",
      title: "End of Term Assessments",
      description: "All students will have their term assessments during the last week of May.",
      date: "Posted 2 days ago",
    },
    {
      id: "a2",
      title: "Eid Celebration",
      description: "Join our virtual Eid celebration on Friday. Games and activities planned!",
      date: "Posted yesterday",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Welcome, {currentUser?.name || "Parent"}!
          </h1>
          <Button variant="outline" onClick={() => navigate("/courses")}>
            Browse Courses
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Children Enrolled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-madrasah-purple" />
                <span className="text-2xl font-bold">{children.length}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Book className="mr-2 h-5 w-5 text-madrasah-blue" />
                <span className="text-2xl font-bold">5</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Next Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-madrasah-green" />
                <div>
                  <div className="text-sm font-medium">Monthly Tuition</div>
                  <div className="text-xs text-muted-foreground">Due April 30, 2025</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Children's Progress */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Children's Progress</h2>
            <Button variant="ghost" size="sm" className="text-madrasah-purple hover:text-madrasah-purple-dark" asChild>
              <a href="/parent/children">View details <ArrowRight className="ml-1 h-4 w-4" /></a>
            </Button>
          </div>
          
          <Tabs defaultValue={children[0].id} className="space-y-4">
            <TabsList className="grid grid-cols-2 w-full max-w-md">
              {children.map((child) => (
                <TabsTrigger key={child.id} value={child.id}>
                  {child.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {children.map((child) => (
              <TabsContent key={child.id} value={child.id} className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{child.name}</CardTitle>
                    <CardDescription>Age {child.age} • Level {child.level}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium">Recent Progress</div>
                        <div className="text-sm font-medium">{child.recentProgress}%</div>
                      </div>
                      <Progress value={child.recentProgress} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg border">
                        <div className="flex items-start">
                          <Video className="h-8 w-8 text-madrasah-blue p-1.5 bg-madrasah-blue-light rounded-full mr-3" />
                          <div>
                            <h4 className="font-medium">Next Class</h4>
                            <p className="text-sm text-muted-foreground">{child.nextClass}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg border">
                        <div className="flex items-start">
                          <BookOpen className="h-8 w-8 text-madrasah-purple p-1.5 bg-madrasah-purple-light rounded-full mr-3" />
                          <div>
                            <h4 className="font-medium">Recent Activity</h4>
                            <p className="text-sm text-muted-foreground">{child.recentActivity}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button className="bg-madrasah-purple hover:bg-madrasah-purple-dark">View Full Report</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upcoming Payments */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Payments</CardTitle>
              <CardDescription>Your scheduled payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                    <div>
                      <h4 className="font-medium">{payment.description}</h4>
                      <p className="text-sm text-muted-foreground">Due {payment.dueDate}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium mr-4">{payment.amount}</span>
                      <Button size="sm">Pay Now</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Announcements */}
          <Card>
            <CardHeader>
              <CardTitle>Announcements</CardTitle>
              <CardDescription>Important updates from the school</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                    <h4 className="font-medium">{announcement.title}</h4>
                    <p className="text-sm text-muted-foreground my-1">{announcement.description}</p>
                    <p className="text-xs text-muted-foreground">{announcement.date}</p>
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

export default ParentDashboard;
