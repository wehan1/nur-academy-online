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
  Clock,
  Info,
  Award,
  ExternalLink
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import AIChatBox from "@/components/lesson/AIChatBox";

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
          <div class="bg-gradient-to-r from-madrasah-purple-light to-madrasah-blue-light p-6 rounded-lg mb-8 text-center">
            <h2 class="text-3xl font-bold text-madrasah-purple-dark mb-2">The Holy Quran</h2>
            <p class="text-madrasah-blue-dark">The Divine Book of Guidance for Muslims</p>
          </div>

          <div class="flex flex-col md:flex-row gap-6 mb-8">
            <div class="flex-1 p-5 bg-madrasah-purple-light/20 rounded-lg border border-madrasah-purple-light">
              <h3 class="text-xl font-semibold text-madrasah-purple-dark flex items-center mb-3">
                <Info class="w-5 h-5 mr-2" />
                What is the Quran?
              </h3>
              <p class="mb-4">The Quran is the central religious text of Islam, believed by Muslims to be a revelation from Allah (God). It is widely regarded as the finest work in classical Arabic literature.</p>
              
              <div class="flex justify-center my-4">
                <img src="/lovable-uploads/07ae5ae0-b56c-4a47-9c81-8c07d1ddc290.png" alt="Holy Quran" class="rounded-lg shadow-md max-w-full max-h-48 object-contain" />
              </div>
              
              <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <p class="italic text-gray-700">"This is the Book about which there is no doubt, a guidance for those conscious of Allah." <span class="font-semibold">- Quran 2:2</span></p>
              </div>
            </div>
            
            <div class="flex-1 p-5 bg-madrasah-blue-light/20 rounded-lg border border-madrasah-blue-light">
              <h3 class="text-xl font-semibold text-madrasah-blue-dark flex items-center mb-3">
                <Award class="w-5 h-5 mr-2" />
                Significance
              </h3>
              <p>For Muslims, the Quran:</p>
              <ul class="list-disc pl-5 space-y-2 my-3">
                <li>Is the literal word of Allah</li>
                <li>Provides guidance for all aspects of life</li>
                <li>Contains timeless wisdom and teachings</li>
                <li>Maintains its original Arabic text unchanged for over 1400 years</li>
              </ul>
              
              <div class="mt-4 flex items-center justify-center">
                <button class="interactive-item py-2 px-4 rounded-md bg-madrasah-blue text-white flex items-center hover:bg-madrasah-blue-dark transition-colors" onclick="alert('This would play a short audio recitation in a real app')">
                  <Play class="w-4 h-4 mr-2" />
                  Listen to Recitation
                </button>
              </div>
            </div>
          </div>
          
          <h3 class="text-xl font-semibold text-madrasah-purple flex items-center my-4">
            Structure of the Quran
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div class="bg-madrasah-purple-light/30 p-4 rounded-lg text-center hover:shadow-md transition-shadow interactive-item">
              <div class="text-2xl font-bold mb-2 text-madrasah-purple">114</div>
              <div class="font-medium">Surah (Chapters)</div>
              <div class="text-sm text-gray-600">of varying lengths</div>
            </div>
            
            <div class="bg-madrasah-purple-light/30 p-4 rounded-lg text-center hover:shadow-md transition-shadow interactive-item">
              <div class="text-2xl font-bold mb-2 text-madrasah-purple">30</div>
              <div class="font-medium">Juz (Parts)</div>
              <div class="text-sm text-gray-600">of roughly equal length</div>
            </div>
            
            <div class="bg-madrasah-purple-light/30 p-4 rounded-lg text-center hover:shadow-md transition-shadow interactive-item">
              <div class="text-2xl font-bold mb-2 text-madrasah-purple">6,236</div>
              <div class="font-medium">Ayat (Verses)</div>
              <div class="text-sm text-gray-600">throughout the Quran</div>
            </div>
          </div>
          
          <div class="bg-madrasah-green-light/20 p-5 rounded-lg border border-madrasah-green-light mb-8">
            <h3 class="text-xl font-semibold text-madrasah-green-dark mb-3">Importance in Islam</h3>
            <p class="mb-3">The Quran serves as the primary source of Islamic law and practice. Its teachings cover various aspects of human life, including:</p>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 my-4">
              <div class="bg-white p-3 rounded-md shadow-sm flex items-center">
                <div class="w-3 h-3 rounded-full bg-madrasah-green mr-2"></div>
                <span>Belief and theology</span>
              </div>
              <div class="bg-white p-3 rounded-md shadow-sm flex items-center">
                <div class="w-3 h-3 rounded-full bg-madrasah-green mr-2"></div>
                <span>Worship and rituals</span>
              </div>
              <div class="bg-white p-3 rounded-md shadow-sm flex items-center">
                <div class="w-3 h-3 rounded-full bg-madrasah-green mr-2"></div>
                <span>Ethics and morality</span>
              </div>
              <div class="bg-white p-3 rounded-md shadow-sm flex items-center">
                <div class="w-3 h-3 rounded-full bg-madrasah-green mr-2"></div>
                <span>Social relations</span>
              </div>
              <div class="bg-white p-3 rounded-md shadow-sm flex items-center">
                <div class="w-3 h-3 rounded-full bg-madrasah-green mr-2"></div>
                <span>Laws and governance</span>
              </div>
            </div>
          </div>
          
          <div class="border-l-4 border-madrasah-purple p-4 bg-madrasah-purple-light/10 mb-6">
            <h3 class="text-xl font-semibold text-madrasah-purple-dark mb-2">Did You Know?</h3>
            <p>The word "Quran" comes from the Arabic word "qara'a" which means "to read" or "to recite". The Quran is meant to be recited aloud and its melodious recitation is considered a form of worship.</p>
          </div>
          
          <div class="bg-madrasah-blue-light/10 p-6 rounded-lg mb-6">
            <h3 class="text-xl font-semibold text-madrasah-blue-dark mb-4">Learning to Read the Quran</h3>
            <p class="mb-4">Learning to read the Quran is considered an important religious duty for Muslims. The process typically involves:</p>
            
            <div class="space-y-4">
              <div class="flex items-start">
                <div class="flex-shrink-0 bg-madrasah-blue text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">1</div>
                <div>
                  <h4 class="font-medium">Learning the Arabic alphabet</h4>
                  <p class="text-gray-600">Memorizing the letters and their various forms</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="flex-shrink-0 bg-madrasah-blue text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">2</div>
                <div>
                  <h4 class="font-medium">Understanding vowel marks (harakaat)</h4>
                  <p class="text-gray-600">Learning the symbols that indicate how letters should be pronounced</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="flex-shrink-0 bg-madrasah-blue text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">3</div>
                <div>
                  <h4 class="font-medium">Learning pronunciation rules (tajweed)</h4>
                  <p class="text-gray-600">Understanding the proper way to pronounce Quranic Arabic</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="flex-shrink-0 bg-madrasah-blue text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">4</div>
                <div>
                  <h4 class="font-medium">Practice reading with guidance</h4>
                  <p class="text-gray-600">Regular practice with a teacher to perfect pronunciation</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="bg-amber-50 p-4 rounded-lg border border-amber-200 mb-8">
            <h3 class="text-lg font-semibold mb-2 flex items-center">
              <Info class="w-5 h-5 mr-2 text-amber-600" />
              Check Your Understanding
            </h3>
            <div class="space-y-3 quiz-container">
              <p class="font-medium">How many chapters (surahs) are there in the Quran?</p>
              <div class="space-y-2">
                <div class="quiz-option flex items-center bg-white p-2 rounded border border-gray-200 cursor-pointer hover:bg-madrasah-purple-light/10 hover:border-madrasah-purple-light" data-correct="false" onclick="this.classList.toggle('bg-red-50'); this.classList.toggle('border-red-300');">
                  <div class="w-5 h-5 border border-gray-300 rounded-full mr-2"></div>
                  <span>100 chapters</span>
                </div>
                <div class="quiz-option flex items-center bg-white p-2 rounded border border-gray-200 cursor-pointer hover:bg-madrasah-purple-light/10 hover:border-madrasah-purple-light" data-correct="true" onclick="this.classList.toggle('bg-green-50'); this.classList.toggle('border-green-300');">
                  <div class="w-5 h-5 border border-gray-300 rounded-full mr-2"></div>
                  <span>114 chapters</span>
                </div>
                <div class="quiz-option flex items-center bg-white p-2 rounded border border-gray-200 cursor-pointer hover:bg-madrasah-purple-light/10 hover:border-madrasah-purple-light" data-correct="false" onclick="this.classList.toggle('bg-red-50'); this.classList.toggle('border-red-300');">
                  <div class="w-5 h-5 border border-gray-300 rounded-full mr-2"></div>
                  <span>120 chapters</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="flex justify-center my-6">
            <a href="https://quran.com" target="_blank" class="flex items-center text-madrasah-blue hover:text-madrasah-blue-dark transition-colors">
              <span class="mr-2">Visit Quran.com to explore more</span>
              <ExternalLink class="w-4 h-4" />
            </a>
          </div>
          
          <p class="mt-5">In the upcoming lessons, we will start with the basics of the Arabic alphabet and gradually build up to reading Quranic text with proper pronunciation.</p>
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
        },
        {
          id: "resource1-3",
          title: "History of Quranic Compilation",
          type: "PDF",
          size: "3.4 MB"
        },
        {
          id: "resource1-4",
          title: "Basic Quranic Terminology",
          type: "PDF",
          size: "1.8 MB"
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
    const lessonIndex = course.lessons.findIndex(lesson => lesson.id === lessonId);
    
    if (lessonIndex !== -1) {
      setCurrentLesson(course.lessons[lessonIndex]);
      setCurrentLessonIndex(lessonIndex);
    } else {
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
      navigate(`/courses/${course.id}`);
    }
  };

  const markAsCompleted = () => {
    console.log(`Marking lesson ${currentLesson.id} as completed`);
    
    if (currentLesson.nextLessonId) {
      navigate(`/lessons/${currentLesson.nextLessonId}`);
    } else {
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
        <div className="flex-1 flex flex-col overflow-hidden">
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
        
        <div className="w-full md:w-96 flex flex-col overflow-hidden">
          <AIChatBox lessonTitle={currentLesson.title} lessonContent={currentLesson.content} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LessonPage;
