import { useState } from "react";
import { ActivationForm } from "@/components/live-experience/ActivationForm";
import { BusinessForm } from "@/components/live-experience/BusinessForm";
import { QuestionSidebar } from "@/components/live-experience/QuestionSidebar";
import { QuestionForm } from "@/components/live-experience/QuestionForm";

interface Question {
  id: number;
  text: string;
  answer: string;
  isCompleted: boolean;
  followUpAnswer?: string;
  showFollowUp?: boolean;
}

const initialQuestions: Question[] = [
  {
    id: 1,
    text: "What are some \"I Wish\" statements related to the number of customers that you have?",
    answer: "",
    isCompleted: false,
  },
  {
    id: 2,
    text: "What are some \"I wish\" statements related to your P&L statement?",
    answer: "",
    isCompleted: false,
  },
  {
    id: 3,
    text: "Describe your ideal customer in as much detail as possible.",
    answer: "",
    isCompleted: false,
    followUpAnswer: "",
    showFollowUp: false,
  },
];

const LiveExperience = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hasEnteredBusiness, setHasEnteredBusiness] = useState(false);
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnswerChange = (answer: string) => {
    setQuestions(questions.map(q => 
      q.id === currentQuestionId ? { ...q, answer } : q
    ));
  };

  const handleFollowUpAnswerChange = (followUpAnswer: string) => {
    setQuestions(questions.map(q =>
      q.id === currentQuestionId ? { ...q, followUpAnswer } : q
    ));
  };

  const handleSaveAnswer = () => {
    if (currentQuestionId === 3 && !questions[2].showFollowUp) {
      setIsLoading(true);
      setTimeout(() => {
        setQuestions(questions.map(q =>
          q.id === 3 ? { ...q, showFollowUp: true } : q
        ));
        setIsLoading(false);
      }, 3000);
      return;
    }

    setQuestions(questions.map(q =>
      q.id === currentQuestionId ? { ...q, isCompleted: true } : q
    ));

    if (currentQuestionId < questions.length) {
      setCurrentQuestionId(currentQuestionId + 1);
    }
  };

  const canAccessQuestion = (questionId: number) => {
    return questionId <= currentQuestionId;
  };

  if (!isUnlocked) {
    return <ActivationForm onUnlock={() => setIsUnlocked(true)} />;
  }

  if (!hasEnteredBusiness) {
    return <BusinessForm onSubmit={() => setHasEnteredBusiness(true)} />;
  }

  const currentQuestion = questions.find(q => q.id === currentQuestionId)!;

  return (
    <div className="flex gap-8 p-6 animate-fade-in">
      <QuestionSidebar
        questions={questions}
        currentQuestionId={currentQuestionId}
        canAccessQuestion={canAccessQuestion}
        onQuestionSelect={setCurrentQuestionId}
      />
      <QuestionForm
        question={currentQuestion}
        onAnswerChange={handleAnswerChange}
        onFollowUpAnswerChange={handleFollowUpAnswerChange}
        onSave={handleSaveAnswer}
        isLoading={isLoading}
      />
    </div>
  );
};

export default LiveExperience;