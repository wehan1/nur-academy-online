
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
import { MessageSquare, Send, Bot, User, PanelRightOpen, PanelRightClose, Sparkles } from "lucide-react";
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

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Analyze if the question is related to the lesson content
  const isQuestionRelevant = (question: string): boolean => {
    if (!lessonContent) return true; // If no content is provided, all questions are valid
    
    const lowerCaseQuestion = question.toLowerCase();
    const lowerCaseContent = lessonContent.toLowerCase();
    
    const relevanceKeywords = [
      'quran', 'surah', 'ayat', 'juz', 'prophet', 'muhammad', 'islam',
      'arabic', 'letter', 'tajweed', 'recitation', 'chapter', 'verse'
    ];
    
    // Check if any relevant keywords are in the question
    const hasRelevantKeywords = relevanceKeywords.some(keyword => 
      lowerCaseQuestion.includes(keyword)
    );
    
    // Check if the question might be about the lesson content
    const contentSimilarity = relevanceKeywords.some(keyword => 
      lowerCaseContent.includes(keyword) && lowerCaseQuestion.includes(keyword)
    );
    
    return hasRelevantKeywords || contentSimilarity;
  };

  const generateContextualResponse = (question: string): string => {
    // Quran structure related questions
    if (question.toLowerCase().includes('surah') || 
        question.toLowerCase().includes('chapter')) {
      return "The Quran has 114 surahs (chapters) of varying lengths. Each surah has a unique name and theme. The longest is Surah Al-Baqarah (The Cow) and the shortest is Surah Al-Kawthar (Abundance).";
    }
    
    // Tajweed related questions
    if (question.toLowerCase().includes('tajweed') || 
        question.toLowerCase().includes('pronunciation')) {
      return "Tajweed refers to the rules governing the pronunciation during recitation of the Quran. It's important because it preserves the original way the Quran was revealed. Some basic rules include proper articulation points (makharij) and attributes of letters (sifat).";
    }
    
    // Arabic letters related questions
    if (question.toLowerCase().includes('letter') || 
        question.toLowerCase().includes('arabic alphabet')) {
      return "The Arabic alphabet consists of 28 letters. Each letter has different forms depending on its position in a word (beginning, middle, end, or isolated). The letters are written from right to left.";
    }
    
    // Prophet Muhammad related questions
    if (question.toLowerCase().includes('muhammad') || 
        question.toLowerCase().includes('prophet')) {
      return "Prophet Muhammad ﷺ received the revelations of the Quran over a period of 23 years (610-632 CE). The revelations began in the month of Ramadan when he was 40 years old.";
    }
    
    // Importance of the Quran
    if (question.toLowerCase().includes('importance') || 
        question.toLowerCase().includes('significance')) {
      return "The Quran serves as the primary source of Islamic law and practice. Its teachings cover various aspects of human life, including belief, worship, ethics, social relations, and governance. It's considered the literal word of Allah revealed to Prophet Muhammad ﷺ.";
    }
    
    // Generic answer about learning Quran
    return "Learning the Quran is considered an important religious duty for Muslims. The process typically involves learning the Arabic alphabet, understanding vowel marks (harakaat), learning pronunciation rules (tajweed), and practicing recitation with guidance. The Prophet Muhammad ﷺ said: \"The best among you are those who learn the Quran and teach it.\"";
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
    
    // Generate AI response based on context
    setTimeout(() => {
      let aiResponse: string;
      
      if (isQuestionRelevant(userMessage.content)) {
        aiResponse = generateContextualResponse(userMessage.content);
      } else {
        aiResponse = "I'm sorry, but that question seems to be outside the scope of this lesson. I'm here to help you understand the content of this specific lesson. Could you ask something related to the Quran or this lesson?";
      }
      
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
                    ? "ml-auto bg-ma-purple text-primary-foreground bg-madrasah-purple"
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
                  <Sparkles className="h-3 w-3 text-madrasah-purple animate-pulse" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0.2s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </CardContent>

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
