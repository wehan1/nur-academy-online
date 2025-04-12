
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
  MessageSquare, 
  Send, 
  Download,
  Play,
  CheckCircle,
  Video,
  BookOpen,
  Clock
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import AIChatBox from "@/components/lesson/AIChatBox";

// Mock data for a single course with lessons
const course = {
  id: "course1",
  title: "Quran Reading Basics",
  lessons: [
    {
      id: "lesson1-1",
      title: "Introduction to the Quran",
      duration: "30 minutes",
      description: "Learn about the significance and structure of the Holy Quran.",
      content: `
        <div class="prose max-w-none">
          <h2>The Holy Quran</h2>
          <p>The Quran is the central religious text of Islam, believed by Muslims to be a revelation from Allah (God). It is widely regarded as the finest work in classical Arabic literature.</p>
          
          <p>The Quran is divided into chapters (surah) and verses (ayat). There are 114 chapters in the Quran, which are classified as either Meccan or Medinan depending on when and where the revelations were received by Prophet Muhammad ﷺ.</p>
          
          <h3>Structure of the Quran</h3>
          <ul>
            <li><strong>Surah (Chapters)</strong>: 114 chapters of varying lengths</li>
            <li><strong>Juz (Parts)</strong>: 30 parts of roughly equal length</li>
            <li><strong>Ayat (Verses)</strong>: 6,236 verses</li>
          </ul>
          
          <h3>Importance in Islam</h3>
          <p>The Quran serves as the primary source of Islamic law and practice. Its teachings cover various aspects of human life, including:</p>
          <ul>
            <li>Belief and theology</li>
            <li>Worship and rituals</li>
            <li>Ethics and morality</li>
            <li>Social relations</li>
            <li>Laws and governance</li>
          </ul>
          
          <h3>Learning to Read the Quran</h3>
          <p>Learning to read the Quran is considered an important religious duty for Muslims. The process typically involves:</p>
          <ol>
            <li>Learning the Arabic alphabet</li>
            <li>Understanding vowel marks (harakaat)</li>
            <li>Learning pronunciation rules (tajweed)</li>
            <li>Practice reading with guidance</li>
          </ol>
          
          <p>In the upcoming lessons, we will start with the basics of the Arabic alphabet and gradually build up to reading Quranic text with proper pronunciation.</p>
        </div>
      `,
      resources: [
        {
          id: "resource1-1",
          title: "Introduction to Quran PDF",
          type: "PDF",
          size: "2.3 MB"
        },
        {
          id: "resource1-2",
          title: "Structure of the Quran - Infographic",
          type: "Image",
          size: "1.1 MB"
        }
      ],
      videoUrl: "#",
      completed: true,
      nextLessonId: "lesson1-2"
    },
    {
      id: "lesson1-2",
      title: "Arabic Alphabet - Part 1",
      duration: "45 minutes",
      description: "Introduction to the first set of Arabic letters.",
      content: `
        <div class="prose max-w-none">
          <h2>Arabic Alphabet - Part 1</h2>
          <p>In this lesson, we will learn the first set of Arabic letters. The Arabic alphabet consists of 28 letters, and we'll cover the first 14 in this lesson.</p>
          
          <h3>Characteristics of Arabic Script</h3>
          <ul>
            <li>Arabic is written and read from right to left</li>
            <li>Letters change form depending on their position in a word</li>
            <li>Most letters connect to each other</li>
          </ul>
          
          <h3>The First Set of Letters</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
            <div class="bg-madrasah-purple-light p-4 rounded-lg text-center">
              <div class="text-4xl font-bold arabic-text">ا</div>
              <div class="mt-2">Alif</div>
            </div>
            <div class="bg-madrasah-purple-light p-4 rounded-lg text-center">
              <div class="text-4xl font-bold arabic-text">ب</div>
              <div class="mt-2">Baa</div>
            </div>
            <div class="bg-madrasah-purple-light p-4 rounded-lg text-center">
              <div class="text-4xl font-bold arabic-text">ت</div>
              <div class="mt-2">Taa</div>
            </div>
            <div class="bg-madrasah-purple-light p-4 rounded-lg text-center">
              <div class="text-4xl font-bold arabic-text">ث</div>
              <div class="mt-2">Thaa</div>
            </div>
            <div class="bg-madrasah-purple-light p-4 rounded-lg text-center">
              <div class="text-4xl font-bold arabic-text">ج</div>
              <div class="mt-2">Jeem</div>
            </div>
            <div class="bg-madrasah-purple-light p-4 rounded-lg text-center">
              <div class="text-4xl font-bold arabic-text">ح</div>
              <div class="mt-2">Haa</div>
            </div>
            <div class="bg-madrasah-purple-light p-4 rounded-lg text-center">
              <div class="text-4xl font-bold arabic-text">خ</div>
              <div class="mt-2">Khaa</div>
            </div>
          </div>
          
          <h3>Practice Exercise</h3>
          <p>Try to identify these letters when they appear in different positions within a word:</p>
          
          <div class="bg-madrasah-blue-light p-4 rounded-lg my-4">
            <p class="text-xl arabic-text text-center">بـ ـبـ ـب</p>
            <p class="text-center mt-2">Different forms of the letter Baa</p>
          </div>
          
          <p>In the next lesson, we will continue with the remaining Arabic letters and start practicing connecting them to form simple words.</p>
        </div>
      `,
      resources: [
        {
          id: "resource2-1",
          title: "Arabic Alphabet Chart - Part 1",
          type: "PDF",
          size: "1.5 MB"
        },
        {
          id: "resource2-2",
          title: "Letter Pronunciation Audio",
          type: "Audio",
          size: "8.2 MB"
        }
      ],
      videoUrl: "#",
      completed: true,
      nextLessonId: "lesson1-3"
    },
    {
      id: "lesson1-3",
      title: "Arabic Alphabet - Part 2",
      duration: "45 minutes",
      description: "Learn the remaining Arabic letters and their pronunciations.",
      content: `
        <div class="prose max-w-none">
          <h2>Arabic Alphabet - Part 2</h2>
          <p>In this lesson, we will learn the remaining Arabic letters, completing our introduction to the Arabic alphabet.</p>
          
          <h3>The Second Set of Letters</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
            <div class="bg-madrasah-purple-light p-4 rounded-lg text-center">
              <div class="text-4xl font-bold arabic-text">د</div>
              <div class="mt-2">Dal</div>
            </div>
            <div class="bg-madrasah-purple-light p-4 rounded-lg text-center">
              <div class="text-4xl font-bold arabic-text">ذ</div>
              <div class="mt-2">Dhal</div>
            </div>
            <div class="bg-madrasah-purple-light p-4 rounded-lg text-center">
              <div class="text-4xl font-bold arabic-text">ر</div>
              <div class="mt-2">Ra</div>
            </div>
            <div class="bg-madrasah-purple-light p-4 rounded-lg text-center">
              <div class="text-4xl font-bold arabic-text">ز</div>
              <div class="mt-2">Zay</div>
            </div>
            <div class="bg-madrasah-purple-light p-4 rounded-lg text-center">
              <div class="text-4xl font-bold arabic-text">س</div>
              <div class="mt-2">Seen</div>
            </div>
            <div class="bg-madrasah-purple-light p-4 rounded-lg text-center">
              <div class="text-4xl font-bold arabic-text">ش</div>
              <div class="mt-2">Sheen</div>
            </div>
            <div class="bg-madrasah-purple-light p-4 rounded-lg text-center">
              <div class="text-4xl font-bold arabic-text">ص</div>
              <div class="mt-2">Sad</div>
            </div>
          </div>
          
          <h3>Connecting Letters</h3>
          <p>Now that we've learned all the letters, let's practice connecting them to form simple words:</p>
          
          <div class="bg-madrasah-blue-light p-4 rounded-lg my-4">
            <p class="text-xl arabic-text text-center">بسم</p>
            <p class="text-center mt-2">The word "Bism" (meaning "In the name of")</p>
          </div>
          
          <h3>Practice Exercise</h3>
          <p>Try to identify all the letters in the following words:</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div class="bg-madrasah-green-light p-4 rounded-lg text-center">
              <p class="text-xl arabic-text">كتاب</p>
              <p class="mt-2">"Kitab" (Book)</p>
            </div>
            <div class="bg-madrasah-green-light p-4 rounded-lg text-center">
              <p class="text-xl arabic-text">قلم</p>
              <p class="mt-2">"Qalam" (Pen)</p>
            </div>
          </div>
          
          <p>In the next lesson, we will learn about vowel marks (harakaat) which give sound to the letters.</p>
        </div>
      `,
      resources: [
        {
          id: "resource3-1",
          title: "Complete Arabic Alphabet Chart",
          type: "PDF",
          size: "2.0 MB"
        },
        {
          id: "resource3-2",
          title: "Letter Connections Guide",
          type: "PDF",
          size: "1.8 MB"
        }
      ],
      videoUrl: "#",
      completed: true,
      nextLessonId: "lesson1-4"
    },
    {
      id: "lesson1-4",
      title: "Vowel Marks (Harakaat)",
      duration: "40 minutes",
      description: "Understanding Fatha, Kasra, and Damma.",
      content: `
        <div class="prose max-w-none">
          <h2>Vowel Marks (Harakaat)</h2>
          <p>In this lesson, we will learn about the vowel marks in Arabic, known as Harakaat, which give sound to the letters.</p>
          
          <h3>The Three Main Vowel Marks</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <div class="bg-madrasah-purple-light p-4 rounded-lg text-center">
              <div class="text-4xl font-bold arabic-text">بَ</div>
              <div class="mt-2">Fatha (a sound)</div>
              <div class="mt-1 text-sm">Pronounced as "ba"</div>
            </div>
            <div class="bg-madrasah-purple-light p-4 rounded-lg text-center">
              <div class="text-4xl font-bold arabic-text">بِ</div>
              <div class="mt-2">Kasra (i sound)</div>
              <div class="mt-1 text-sm">Pronounced as "bi"</div>
            </div>
            <div class="bg-madrasah-purple-light p-4 rounded-lg text-center">
              <div class="text-4xl font-bold arabic-text">بُ</div>
              <div class="mt-2">Damma (u sound)</div>
              <div class="mt-1 text-sm">Pronounced as "bu"</div>
            </div>
          </div>
          
          <h3>Sukoon (Absence of Vowel)</h3>
          <div class="bg-madrasah-blue-light p-4 rounded-lg my-4 text-center">
            <div class="text-4xl font-bold arabic-text">بْ</div>
            <div class="mt-2">Sukoon</div>
            <div class="mt-1 text-sm">Indicates absence of a vowel</div>
          </div>
          
          <h3>Practice Reading with Vowels</h3>
          <p>Let's practice reading simple words with vowel marks:</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div class="bg-madrasah-green-light p-4 rounded-lg text-center">
              <p class="text-xl arabic-text">كَتَبَ</p>
              <p class="mt-2">"Kataba" (He wrote)</p>
            </div>
            <div class="bg-madrasah-green-light p-4 rounded-lg text-center">
              <p class="text-xl arabic-text">قَلَمٌ</p>
              <p class="mt-2">"Qalamun" (A pen)</p>
            </div>
          </div>
          
          <p>In the next lesson, we will learn about connecting letters with vowels to form complete words.</p>
        </div>
      `,
      resources: [
        {
          id: "resource4-1",
          title: "Vowel Marks Guide",
          type: "PDF",
          size: "1.6 MB"
        },
        {
          id: "resource4-2",
          title: "Pronunciation Practice Audio",
          type: "Audio",
          size: "10.5 MB"
        }
      ],
      videoUrl: "#",
      completed: false,
      nextLessonId: "lesson1-5"
    },
    {
      id: "lesson1-5",
      title: "Connecting Letters",
      duration: "50 minutes",
      description: "Practice joining letters to form words.",
      completed: false,
      content: "Lesson content coming soon...",
      resources: [],
      videoUrl: "#",
      nextLessonId: "lesson1-6"
    },
    {
      id: "lesson1-6",
      title: "Reading Simple Words",
      duration: "45 minutes",
      description: "Start reading basic Quranic words.",
      completed: false,
      content: "Lesson content coming soon...",
      resources: [],
      videoUrl: "#",
      nextLessonId: null
    },
  ]
};

const LessonPage = () => {
  const { lessonId } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [currentLesson, setCurrentLesson] = useState<any>(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);

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
          <div className="bg-white border rounded-lg p-4 mb-4">
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
              
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>{currentLesson.duration}</span>
                
                {currentLesson.completed && (
                  <div className="flex items-center text-green-600 ml-4">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span>Completed</span>
                  </div>
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
          <div className="flex-1 bg-white border rounded-lg overflow-hidden flex flex-col">
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
                
                {currentLesson.resources && currentLesson.resources.length > 0 && (
                  <div className="mt-8 border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Resources</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentLesson.resources.map((resource: any) => (
                        <div 
                          key={resource.id} 
                          className="border rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
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
                          <Button size="sm" variant="outline">
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
          <AIChatBox lessonTitle={currentLesson.title} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LessonPage;
