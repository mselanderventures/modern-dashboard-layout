import { CheckCircle2, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
  id: number;
  text: string;
  answer: string;
  isCompleted: boolean;
  hasMessage?: boolean;
}

interface QuestionSidebarProps {
  questions: Question[];
  currentQuestionId: number;
  canAccessQuestion: (questionId: number) => boolean;
  onQuestionSelect: (questionId: number) => void;
}

export const QuestionSidebar = ({
  questions,
  currentQuestionId,
  canAccessQuestion,
  onQuestionSelect,
}: QuestionSidebarProps) => {
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

  return (
    <div className="w-64 space-y-4">
      <h3 className="font-medium text-gray-700 mb-4">Your Progress</h3>
      {questions.map((question) => (
        <button
          key={question.id}
          onClick={() => canAccessQuestion(question.id) && onQuestionSelect(question.id)}
          className={cn(
            "w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center gap-3",
            currentQuestionId === question.id
              ? "bg-primary text-primary-foreground"
              : question.isCompleted
              ? "bg-green-100 text-green-800 hover:bg-green-200"
              : "bg-muted text-muted-foreground",
            !canAccessQuestion(question.id) && "opacity-50 cursor-not-allowed",
            canAccessQuestion(question.id) && "hover:opacity-90"
          )}
        >
          <span className="flex-1 text-sm">{getQuestionTitle(question.id)}</span>
          <div className="flex items-center gap-2">
            {question.hasMessage && (
              <MessageCircle className="h-4 w-4 text-purple-400" />
            )}
            {question.isCompleted && (
              <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
            )}
          </div>
        </button>
      ))}
    </div>
  );
};