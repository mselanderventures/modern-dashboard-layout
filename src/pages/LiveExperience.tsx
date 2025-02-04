import { ActivationForm } from "@/components/live-experience/ActivationForm";
import { BusinessForm } from "@/components/live-experience/BusinessForm";
import { LiveHeader } from "@/components/live-experience/LiveHeader";
import { InteractiveWorkbook } from "@/components/live-experience/InteractiveWorkbook";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface Question {
  id: number;
  text: string;
  answer: string;
  isCompleted: boolean;
  followUpAnswer?: string;
  showFollowUp?: boolean;
  hasMessage?: boolean;
}

interface BusinessDetails {
  name: string;
  customers: number;
  revenue: number;
  grossMargin: number;
}

const initialQuestions: Question[] = [
  {
    id: 1,
    text: "What are some \"I Wish\" statements related to the number of customers that you have?",
    answer: "",
    isCompleted: false,
    hasMessage: false,
  },
  {
    id: 2,
    text: "What are some \"I wish\" statements related to your P&L statement?",
    answer: "",
    isCompleted: false,
    hasMessage: false,
  },
  {
    id: 3,
    text: "Describe your ideal customer in as much detail as possible.",
    answer: "",
    isCompleted: false,
    followUpAnswer: "",
    showFollowUp: false,
    hasMessage: false,
  },
];

const LiveExperience = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hasEnteredBusiness, setHasEnteredBusiness] = useState(false);
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [businessDetails, setBusinessDetails] = useState<BusinessDetails | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsUnlocked(searchParams.get("unlocked") === "true");
  }, [searchParams]);

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

  const handleBusinessSubmit = (details: BusinessDetails) => {
    setBusinessDetails(details);
    setHasEnteredBusiness(true);
  };

  const handleMessageClick = () => {
    setQuestions(questions.map(q =>
      q.id === currentQuestionId ? { ...q, hasMessage: !q.hasMessage } : q
    ));
  };

  if (!isUnlocked) {
    return <ActivationForm onUnlock={() => setIsUnlocked(true)} />;
  }

  if (!hasEnteredBusiness) {
    return <BusinessForm onSubmit={handleBusinessSubmit} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <LiveHeader businessDetails={businessDetails} />
      <InteractiveWorkbook
        questions={questions}
        currentQuestionId={currentQuestionId}
        isLoading={isLoading}
        onQuestionSelect={setCurrentQuestionId}
        onAnswerChange={handleAnswerChange}
        onFollowUpAnswerChange={handleFollowUpAnswerChange}
        onSave={handleSaveAnswer}
        onToggleMessage={handleMessageClick}
      />
    </div>
  );
};

export default LiveExperience;