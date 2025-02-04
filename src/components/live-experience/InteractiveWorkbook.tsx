import { QuestionForm } from "./QuestionForm";
import { QuestionSidebar } from "./QuestionSidebar";

interface Question {
  id: number;
  text: string;
  answer: string;
  isCompleted: boolean;
  followUpAnswer?: string;
  showFollowUp?: boolean;
  hasMessage?: boolean;
}

interface InteractiveWorkbookProps {
  questions: Question[];
  currentQuestionId: number;
  isLoading: boolean;
  onQuestionSelect: (id: number) => void;
  onAnswerChange: (answer: string) => void;
  onFollowUpAnswerChange: (answer: string) => void;
  onSave: () => void;
  onToggleMessage: () => void;
}

export const InteractiveWorkbook = ({
  questions,
  currentQuestionId,
  isLoading,
  onQuestionSelect,
  onAnswerChange,
  onFollowUpAnswerChange,
  onSave,
  onToggleMessage,
}: InteractiveWorkbookProps) => {
  const currentQuestion = questions.find(q => q.id === currentQuestionId)!;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 bg-gray-50 mt-8 rounded-t-xl animate-[fade-in_0.5s_ease-out,slide-in-bottom_0.5s_ease-out] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Interactive Workbook</h2>
      <div className="flex gap-8">
        <QuestionSidebar
          questions={questions}
          currentQuestionId={currentQuestionId}
          canAccessQuestion={(questionId) => questionId <= currentQuestionId}
          onQuestionSelect={onQuestionSelect}
        />
        <QuestionForm
          question={currentQuestion}
          questions={questions}
          onAnswerChange={onAnswerChange}
          onFollowUpAnswerChange={onFollowUpAnswerChange}
          onSave={onSave}
          isLoading={isLoading}
          onToggleMessage={onToggleMessage}
        />
      </div>
    </div>
  );
};