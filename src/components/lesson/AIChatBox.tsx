
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
import { MessageSquare, Send, Bot, User, PanelRightOpen, PanelRightClose } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface AIChatBoxProps {
  lessonTitle: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const AIChatBox = ({ lessonTitle }: AIChatBoxProps) => {
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
    
    // Simulate AI response (in a real app, this would call an actual AI API)
    setTimeout(() => {
      // Generate mock AI response
      const responses = [
        "That's a great question! In Islamic studies, this concept refers to the importance of intention (niyyah) before any action. The Prophet Muhammad ﷺ said: \"Actions are judged by intentions.\"",
        "The Arabic letter you're asking about is pronounced from the throat. Try to make a soft sound while exhaling gently.",
        "Tajweed is the set of rules governing pronunciation during recitation of the Quran. It's important because it preserves the original way the Quran was revealed.",
        "You're doing great! Remember that learning Quran takes time and consistent practice. The Prophet Muhammad ﷺ said: \"The best among you are those who learn the Quran and teach it.\"",
        "This surah has 7 verses and is often recited in every prayer. It's called the "Opening" of the Quran and is essential for every Muslim to memorize.",
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: randomResponse,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
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
