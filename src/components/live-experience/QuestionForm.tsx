import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, ChevronRight, Loader2, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface Question {
  id: number;
  text: string;
  answer: string;
  isCompleted: boolean;
  followUpAnswer?: string;
  showFollowUp?: boolean;
  hasMessage?: boolean;
}

interface QuestionFormProps {
  question: Question;
  questions: Question[];
  onAnswerChange: (answer: string) => void;
  onFollowUpAnswerChange: (answer: string) => void;
  onSave: () => void;
  isLoading: boolean;
  onToggleMessage: () => void;
}

export const QuestionForm = ({ 
  question, 
  questions,
  onAnswerChange, 
  onFollowUpAnswerChange,
  onSave,
  isLoading,
  onToggleMessage
}: QuestionFormProps) => {
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [followUpVisible, setFollowUpVisible] = useState(false);
  const [mountedQuestionId, setMountedQuestionId] = useState(question.id);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (mountedQuestionId !== question.id) {
      setIsTransitioning(true);
      setIsVisible(false);
      
      const transitionTimer = setTimeout(() => {
        setMountedQuestionId(question.id);
        setIsTransitioning(false);
        setIsVisible(true);
      }, 300);
      
      return () => clearTimeout(transitionTimer);
    }
  }, [question.id, mountedQuestionId]);

  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  useEffect(() => {
    if (question.showFollowUp) {
      const timer = setTimeout(() => {
        setFollowUpVisible(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setFollowUpVisible(false);
    }
  }, [question.showFollowUp]);

  const handleSave = () => {
    if (!question.answer.trim()) {
      toast({
        title: "Error",
        description: "Please provide an answer before saving",
        variant: "destructive",
      });
      return;
    }
    onSave();
  };

  const toggleMessage = () => {
    setShowMessage(!showMessage);
    onToggleMessage();
  };

  const getQuestionTitle = (id: number) => {
    switch (id) {
      case 1:
        return "I Wish... #1";
      case 2:
        return "I Wish... #2";
      case 3:
        return "Your Ideal Customer";
      default:
        return "";
    }
  };

  const getFollowUpQuestion = (id: number) => {
    switch (id) {
      case 1:
        return "Looking at your customer acquisition goals, what specific challenges or roadblocks do you face in reaching these numbers?";
      case 2:
        return "Can you elaborate on which specific aspects of your P&L statement concern you the most and why?";
      case 3:
        return "Can you go into more detail about the actual demographics of your customer? Are they old/young? Are they wealthy/on a budget?";
      default:
        return "";
    }
  };

  const currentQuestion = isTransitioning ? questions.find(q => q.id === mountedQuestionId)! : question;

  return (
    <div className="flex-1 max-w-2xl">
      <div 
        className={`space-y-4 transition-all duration-300 ${
          isVisible 
            ? "opacity-100 translate-x-0" 
            : "opacity-0 -translate-x-4"
        }`}
      >
        <h2 className="text-2xl font-semibold text-gray-900">
          {getQuestionTitle(currentQuestion.id)}
        </h2>
        <p className="text-gray-600">{currentQuestion.text}</p>
        <Textarea
          value={currentQuestion.answer}
          onChange={(e) => onAnswerChange(e.target.value)}
          placeholder="Type your answer here..."
          className="min-h-[200px]"
        />
        
        {currentQuestion.showFollowUp && (
          <div 
            className={`space-y-4 transition-all duration-300 ${
              followUpVisible 
                ? "opacity-100 translate-x-0" 
                : "opacity-0 translate-x-4"
            }`}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mt-8">
              AI Follow Up Question
            </h2>
            <p className="text-gray-600">
              {getFollowUpQuestion(currentQuestion.id)}
            </p>
            <Textarea
              value={currentQuestion.followUpAnswer}
              onChange={(e) => onFollowUpAnswerChange(e.target.value)}
              placeholder="Type your follow-up answer here..."
              className="min-h-[200px]"
            />
          </div>
        )}

        <div className="space-y-4">
          {isLoading ? (
            <Button disabled className="w-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button onClick={handleSave} className="w-full">
              {!currentQuestion.showFollowUp ? "Next" : "Save Answer"}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
          {currentQuestion.id === 2 && (
            <Button
              onClick={toggleMessage}
              variant="outline"
              className="w-full flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              DEMO: Message from Jeremy
            </Button>
          )}
          {showMessage && (
            <div 
              className={`bg-[#F1F0FB] border border-gray-200 rounded-lg p-6 transition-all duration-300 ${
                showMessage ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Message From Jeremy</h3>
              <p className="text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};