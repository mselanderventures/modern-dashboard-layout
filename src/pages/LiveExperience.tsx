import { useState } from "react";
import { ActivationForm } from "@/components/live-experience/ActivationForm";
import { BusinessForm } from "@/components/live-experience/BusinessForm";
import { QuestionSidebar } from "@/components/live-experience/QuestionSidebar";
import { QuestionForm } from "@/components/live-experience/QuestionForm";
import { MapPin, Users, DollarSign, Percent } from "lucide-react";

interface Question {
  id: number;
  text: string;
  answer: string;
  isCompleted: boolean;
  followUpAnswer?: string;
  showFollowUp?: boolean;
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
  const [businessDetails, setBusinessDetails] = useState<BusinessDetails | null>(null);

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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  if (!isUnlocked) {
    return <ActivationForm onUnlock={() => setIsUnlocked(true)} />;
  }

  if (!hasEnteredBusiness) {
    return <BusinessForm onSubmit={handleBusinessSubmit} />;
  }

  const currentQuestion = questions.find(q => q.id === currentQuestionId)!;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Founder's Fortune Academy by Jeremy Schwartz
            </h1>
            <div className="mt-2 flex items-center text-gray-600 space-x-4">
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                Miami, Florida
              </span>
              <span>•</span>
              <span>Feb 14th 2025</span>
            </div>
          </div>

          {businessDetails && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-purple-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Customers</span>
                </div>
                <p className="mt-2 text-2xl font-semibold text-gray-900">
                  {formatNumber(businessDetails.customers)}
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-purple-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Revenue</span>
                </div>
                <p className="mt-2 text-2xl font-semibold text-gray-900">
                  {formatCurrency(businessDetails.revenue)}
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center">
                  <Percent className="h-5 w-5 text-purple-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Gross Margin</span>
                </div>
                <p className="mt-2 text-2xl font-semibold text-gray-900">
                  {businessDetails.grossMargin}%
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex gap-8 animate-fade-in">
          <QuestionSidebar
            questions={questions}
            currentQuestionId={currentQuestionId}
            canAccessQuestion={(questionId) => questionId <= currentQuestionId}
            onQuestionSelect={setCurrentQuestionId}
          />
          <QuestionForm
            question={currentQuestion}
            questions={questions}
            onAnswerChange={handleAnswerChange}
            onFollowUpAnswerChange={handleFollowUpAnswerChange}
            onSave={handleSaveAnswer}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default LiveExperience;