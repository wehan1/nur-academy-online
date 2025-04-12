
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, Bot, User, PanelRightOpen, PanelRightClose, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface AIChatBoxProps {
  lessonTitle: string;
  lessonContent?: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const AIChatBox = ({ lessonTitle, lessonContent }: AIChatBoxProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `👋 Assalamu alaikum! I'm your AI tutor for "${lessonTitle}". Ask me any questions about this lesson and I'll help you understand better.`,
      timestamp: new Date(),
    },
  ]);
  const [messageInput, setMessageInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { currentUser } = useAuth();

  // Extract and store key lesson concepts for the AI to reference
  const [lessonConcepts, setLessonConcepts] = useState<string[]>([]);
  
  useEffect(() => {
    if (lessonContent) {
      // Extract key concepts from lesson content
      // In a real implementation, this would be more sophisticated
      const concepts = [
        "The Quran is the central religious text of Islam",
        "The Quran contains 114 chapters (surahs)",
        "The Quran is divided into 30 parts (juz)",
        "The Quran has 6,236 verses (ayat)",
        "Learning to read the Quran involves learning the Arabic alphabet, vowel marks, and tajweed rules",
        "The Quran serves as the primary source of Islamic law and practice",
        "The Quran covers belief, worship, ethics, social relations, and laws"
      ];
      
      setLessonConcepts(concepts);
    }
  }, [lessonContent]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const isQuestionBeyondScope = (question: string): boolean => {
    // List of topics that would be considered beyond the scope of this lesson
    const beyondScopeTopics = [
      "how to perform prayer",
      "what are the five pillars",
      "fasting rules",
      "hajj requirements",
      "zakat calculation",
      "halal food",
      "islamic finance",
      "marriage in islam"
    ];
    
    const questionLower = question.toLowerCase();
    return beyondScopeTopics.some(topic => questionLower.includes(topic));
  };

  const getContextualResponse = (question: string): string => {
    const questionLower = question.toLowerCase();
    
    // Check if the question is beyond the scope
    if (isQuestionBeyondScope(questionLower)) {
      return "That's a great question, but it's beyond the scope of our current lesson about the introduction to the Quran. We'll cover that in future lessons. Let's focus on understanding the Quran's structure and significance first.";
    }

    // Questions about the number of chapters/surahs
    if (questionLower.includes("how many surah") || 
        questionLower.includes("how many chapter") || 
        questionLower.includes("number of surah") || 
        questionLower.includes("number of chapter")) {
      return "The Quran contains 114 surahs (chapters) of varying lengths. Each surah has its own name and unique characteristics.";
    }
    
    // Questions about juz
    if (questionLower.includes("juz") || questionLower.includes("parts of quran")) {
      return "The Quran is divided into 30 parts, called juz. This division helps Muslims complete the recitation of the entire Quran over a month, especially during Ramadan.";
    }
    
    // Questions about verses/ayat
    if (questionLower.includes("ayat") || questionLower.includes("verses") || questionLower.includes("how many verse")) {
      return "The Quran contains 6,236 verses (ayat). These verses vary in length and cover various topics including belief, worship, stories of prophets, and guidance for daily life.";
    }
    
    // Questions about learning to read
    if (questionLower.includes("learn to read") || questionLower.includes("how to read")) {
      return "Learning to read the Quran involves four main steps: 1) Learning the Arabic alphabet, 2) Understanding vowel marks (harakaat), 3) Learning pronunciation rules (tajweed), and 4) Practice reading with guidance. We'll cover these in detail in our upcoming lessons.";
    }
    
    // Questions about the importance of the Quran
    if (questionLower.includes("importance") || questionLower.includes("significant") || questionLower.includes("why is quran")) {
      return "The Quran is of utmost importance in Islam as it's believed to be the literal word of Allah. It serves as the primary source of Islamic law and practice, providing guidance on belief, worship, ethics, social relations, and governance. Muslims strive to understand and apply its teachings in their daily lives.";
    }
    
    // General fallback responses that are still relevant to the lesson
    const fallbackResponses = [
      "The Quran was revealed to Prophet Muhammad ﷺ over a period of approximately 23 years. It was revealed in portions, addressing the circumstances and needs of the early Muslim community.",
      "The Quran is predominantly in Arabic. While translations exist in virtually every language, Muslims believe that the true Quran is only in its original Arabic, and translations are considered interpretations rather than the literal Quran.",
      "The first surah of the Quran is Al-Fatiha (The Opening), and it's recited in every prayer. The last surah is An-Nas (Mankind).",
      "The longest surah in the Quran is Al-Baqarah (The Cow), which consists of 286 verses. The shortest is Al-Kawthar, with just 3 verses.",
      "The Quran was compiled into a single book shortly after Prophet Muhammad's ﷺ death, during the caliphate of Abu Bakr. It was later standardized during the caliphate of Uthman.",
    ];
    
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!messageInput.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: messageInput.trim(),
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setMessageInput("");
    setIsLoading(true);
    
    // In a real implementation, this would call an AI API with context from the lesson
    setTimeout(() => {
      // Generate contextual AI response based on the question
      const aiResponse = getContextualResponse(userMessage.content);
      
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="flex flex-col h-full shadow-md">
      <CardHeader className="py-3 px-4 flex flex-row items-center justify-between space-y-0 border-b">
        <div className="flex items-center">
          <Bot className="h-5 w-5 mr-2 text-madrasah-purple" />
          <div>
            <CardTitle className="text-sm">AI Tutor</CardTitle>
            <CardDescription className="text-xs">Ask questions about this lesson</CardDescription>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsMinimized(!isMinimized)}
          className="h-8 w-8"
        >
          {isMinimized ? <PanelRightOpen className="h-4 w-4" /> : <PanelRightClose className="h-4 w-4" />}
        </Button>
      </CardHeader>

      {!isMinimized && (
        <>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex w-max max-w-[85%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                  message.role === "user"
                    ? "ml-auto bg-madrasah-purple text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <div className="flex items-center gap-2">
                  {message.role === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                  <span className="font-semibold">
                    {message.role === "user" ? currentUser?.name || "You" : "AI Tutor"}
                  </span>
                </div>
                <div>{message.content}</div>
              </div>
            ))}

            {isLoading && (
              <div className="flex w-max max-w-[85%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted">
                <div className="flex items-center gap-2">
                  <Bot className="h-4 w-4" />
                  <span className="font-semibold">AI Tutor</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0.2s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </CardContent>

          <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center text-xs text-gray-500 mb-2">
              <BookOpen className="h-3 w-3 mr-1" />
              <span>AI tutor is focused on: Introduction to the Quran</span>
            </div>
          </div>

          <CardFooter className="pt-2 px-3 pb-3">
            <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
              <Input
                placeholder="Ask a question about this lesson..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="flex-1"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={isLoading || !messageInput.trim()}
                className="h-8 w-8 bg-madrasah-purple hover:bg-madrasah-purple-dark"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default AIChatBox;
