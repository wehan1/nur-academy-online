import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Card, 
  CardContent,
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChevronLeft, 
  ChevronRight, 
  Send, 
  Download,
  Play,
  CheckCircle,
  Video,
  BookOpen,
  Clock,
  Volume,
  Brain,
  Award
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import AIChatBox from "@/components/lesson/AIChatBox";
import { Badge } from "@/components/ui/badge";

// Simple Quiz Component
interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

const QuizComponent = ({ questions, onComplete }: { 
  questions: QuizQuestion[]; 
  onComplete: (score: number) => void;
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  
  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    
    // Auto-submit after selection
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      }, 1000);
    } else {
      setTimeout(() => {
        setShowResult(true);
        onComplete(score + (answer === questions[currentQuestion].correctAnswer ? 1 : 0));
      }, 1000);
    }
  };
  
  return (
    <div className="mt-8 bg-white p-6 rounded-lg border shadow-sm">
      <h3 className="text-xl font-semibold mb-4 flex items-center text-madrasah-purple">
        <Brain className="h-5 w-5 mr-2" />
        Knowledge Check
      </h3>
      
      {!showResult ? (
        <div>
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>Score: {score}/{questions.length}</span>
            </div>
            <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
          </div>
          
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-3">{questions[currentQuestion].question}</h4>
            <div className="space-y-2">
              {questions[currentQuestion].options.map((option, index) => (
                <div 
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className={`p-3 border rounded-md cursor-pointer transition-colors ${
                    selectedAnswer === option 
                      ? option === questions[currentQuestion].correctAnswer
                        ? "bg-green-100 border-green-300"
                        : "bg-red-100 border-red-300"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-madrasah-purple/10 mb-4">
            <Award className="h-8 w-8 text-madrasah-purple" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Quiz Completed!</h3>
          <p className="mb-4">Your score: {score} out of {questions.length}</p>
          <Button 
            onClick={() => {
              setCurrentQuestion(0);
              setScore(0);
              setSelectedAnswer(null);
              setShowResult(false);
            }}
            className="bg-madrasah-purple hover:bg-madrasah-purple-dark"
          >
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
};

// Mock data for a single course with lessons
const course = {
  id: "course1",
  title: "Quran Reading Basics",
  lessons: []
};

const LessonPage = () => {
  const { lessonId } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [currentLesson, setCurrentLesson] = useState<any>(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    // Find the lesson in our mock data
    const lessonIndex = course.lessons.findIndex(lesson => lesson.id === lessonId);
    
    if (lessonIndex !== -1) {
      setCurrentLesson(course.lessons[lessonIndex]);
      setCurrentLessonIndex(lessonIndex);
    } else {
      // Lesson not found, redirect to courses page
      navigate(`/courses/${course.id}`);
    }
    
    setIsLoading(false);
  }, [lessonId, navigate]);

  const goToPreviousLesson = () => {
    if (currentLessonIndex > 0) {
      navigate(`/lessons/${course.lessons[currentLessonIndex - 1].id}`);
    }
  };

  const goToNextLesson = () => {
    if (currentLessonIndex < course.lessons.length - 1) {
      navigate(`/lessons/${course.lessons[currentLessonIndex + 1].id}`);
    } else {
      // If this is the last lesson, go back to course page
      navigate(`/courses/${course.id}`);
    }
  };

  const markAsCompleted = () => {
    // In a real app, this would call an API to mark the lesson as completed
    console.log(`Marking lesson ${currentLesson.id} as completed`);
    
    // For this demo, just navigate to the next lesson
    if (currentLesson.nextLessonId) {
      navigate(`/lessons/${currentLesson.nextLessonId}`);
    } else {
      // If this is the last lesson, go back to course page
      navigate(`/courses/${course.id}`);
    }
  };
  
  const handleQuizComplete = (score: number) => {
    setQuizCompleted(true);
    setQuizScore(score);
  };

  if (isLoading || !currentLesson) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <p>Loading lesson...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-10rem)]">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Lesson Header */}
          <div className="bg-white border rounded-lg p-4 mb-4 shadow-sm">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => navigate(`/courses/${course.id}`)}
                className="text-madrasah-purple hover:underline text-sm flex items-center"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to course
              </button>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={goToPreviousLesson}
                  disabled={currentLessonIndex === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={goToNextLesson}
                  disabled={currentLessonIndex === course.lessons.length - 1}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
            
            <div className="mt-4">
              <h1 className="text-2xl font-bold">{currentLesson.title}</h1>
              <p className="text-gray-600 mt-1">{currentLesson.description}</p>
              
              <div className="flex flex-wrap items-center mt-2 gap-3">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{currentLesson.duration}</span>
                </div>
                
                {currentLesson.completed && (
                  <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Completed
                  </Badge>
                )}
                
                {quizCompleted && (
                  <Badge variant="outline" className="bg-madrasah-purple-light text-madrasah-purple border-madrasah-purple/30">
                    <Award className="h-3 w-3 mr-1" />
                    Quiz Score: {quizScore}/{currentLesson.quiz?.length || 0}
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="mt-4">
              <Progress 
                value={((currentLessonIndex + 1) / course.lessons.length) * 100} 
                className="h-2" 
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Lesson {currentLessonIndex + 1} of {course.lessons.length}</span>
                <span>{Math.round(((currentLessonIndex + 1) / course.lessons.length) * 100)}% Complete</span>
              </div>
            </div>
          </div>
          
          {/* Lesson Content */}
          <div className="flex-1 bg-white border rounded-lg overflow-hidden flex flex-col shadow-sm">
            <Tabs defaultValue="content" className="flex-1 flex flex-col">
              <div className="border-b px-4">
                <TabsList className="h-12">
                  <TabsTrigger value="content" className="data-[state=active]:text-madrasah-purple">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Content
                  </TabsTrigger>
                  <TabsTrigger value="video" className="data-[state=active]:text-madrasah-purple">
                    <Video className="h-4 w-4 mr-2" />
                    Video
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="content" className="flex-1 overflow-y-auto p-6 m-0 border-none">
                <div dangerouslySetInnerHTML={{ __html: currentLesson.content }} />
                
                {/* Quiz Section */}
                {currentLesson.quiz && currentLesson.quiz.length > 0 && (
                  <QuizComponent 
                    questions={currentLesson.quiz} 
                    onComplete={handleQuizComplete} 
                  />
                )}
                
                {currentLesson.resources && currentLesson.resources.length > 0 && (
                  <div className="mt-8 border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Resources</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentLesson.resources.map((resource: any) => (
                        <div 
                          key={resource.id} 
                          className="border rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition-colors shadow-sm"
                        >
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-md bg-madrasah-purple-light text-madrasah-purple flex items-center justify-center mr-3">
                              {resource.type === "PDF" ? "PDF" : 
                               resource.type === "Audio" ? "🎵" : "🖼️"}
                            </div>
                            <div>
                              <p className="font-medium">{resource.title}</p>
                              <p className="text-xs text-gray-500">{resource.size}</p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" className="text-madrasah-purple border-madrasah-purple hover:bg-madrasah-purple/5">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-8 pt-6 border-t">
                  <div className="flex justify-end">
                    {!currentLesson.completed && (
                      <Button 
                        onClick={markAsCompleted}
                        className="bg-madrasah-purple hover:bg-madrasah-purple-dark"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark as Completed
                      </Button>
                    )}
                    
                    {currentLesson.nextLessonId && (
                      <Button 
                        onClick={() => navigate(`/lessons/${currentLesson.nextLessonId}`)}
                        className="ml-2 bg-madrasah-blue hover:bg-madrasah-blue-dark"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Next Lesson
                      </Button>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="video" className="flex-1 p-0 m-0 flex items-center justify-center border-none">
                <div className="text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-madrasah-purple/10 flex items-center justify-center mx-auto mb-4">
                    <Video className="h-8 w-8 text-madrasah-purple" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Video Coming Soon</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    We're working on adding video content to this lesson. 
                    Please check back later or explore the written content.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* AI Tutor Sidebar */}
        <div className="w-full md:w-96 flex flex-col overflow-hidden">
          <AIChatBox lessonTitle={currentLesson.title} lessonContent={currentLesson.content} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LessonPage;
