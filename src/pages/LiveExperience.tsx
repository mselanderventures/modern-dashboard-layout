import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
  id: number;
  text: string;
  answer: string;
  isCompleted: boolean;
}

const initialQuestions: Question[] = [
  {
    id: 1,
    text: "\"I Wish\" statements that describe where you wish you were with your business. What are some \"I Wish\" statements related to the number of customers that you have?",
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
  },
];

const LiveExperience = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activationCode, setActivationCode] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [hasEnteredBusiness, setHasEnteredBusiness] = useState(false);
  const { toast } = useToast();

  const handleUnlock = () => {
    if (activationCode.trim() === "") {
      toast({
        title: "Error",
        description: "Please enter an activation code",
        variant: "destructive",
      });
      return;
    }
    setIsUnlocked(true);
    toast({
      title: "Success",
      description: (
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span>Experience unlocked successfully!</span>
        </div>
      ),
    });
  };

  const handleBusinessSubmit = () => {
    if (businessName.trim() === "") {
      toast({
        title: "Error",
        description: "Please enter your business name",
        variant: "destructive",
      });
      return;
    }
    setHasEnteredBusiness(true);
    toast({
      title: "Success",
      description: (
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span>Business name saved successfully!</span>
        </div>
      ),
    });
  };

  const handleAnswerChange = (answer: string) => {
    setQuestions(questions.map(q => 
      q.id === currentQuestionId ? { ...q, answer } : q
    ));
  };

  const canAccessQuestion = (questionId: number) => {
    // Can access if it's the current question or a previous completed question
    return questionId <= currentQuestionId;
  };

  const handleSaveAnswer = () => {
    const currentQuestion = questions.find(q => q.id === currentQuestionId);
    if (!currentQuestion?.answer.trim()) {
      toast({
        title: "Error",
        description: "Please provide an answer before saving",
        variant: "destructive",
      });
      return;
    }

    setQuestions(questions.map(q =>
      q.id === currentQuestionId ? { ...q, isCompleted: true } : q
    ));

    if (currentQuestionId < questions.length) {
      setCurrentQuestionId(currentQuestionId + 1);
    }

    toast({
      title: "Success",
      description: (
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span>Answer saved successfully!</span>
        </div>
      ),
    });
  };

  if (!isUnlocked) {
    return (
      <div className="max-w-md mx-auto space-y-6">
        <Alert>
          <AlertDescription>
            Please enter your activation code to join the live experience
          </AlertDescription>
        </Alert>
        <div className="flex gap-4">
          <Input
            type="text"
            value={activationCode}
            onChange={(e) => setActivationCode(e.target.value)}
            placeholder="Enter activation code"
            className="flex-1"
          />
          <Button onClick={handleUnlock}>Enter</Button>
        </div>
      </div>
    );
  }

  if (!hasEnteredBusiness) {
    return (
      <div className="max-w-md mx-auto space-y-6 animate-fade-in">
        <h2 className="text-2xl font-semibold text-gray-900">Business Details</h2>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            What is the name of your business?
          </label>
          <Input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Enter your business name"
          />
          <Button onClick={handleBusinessSubmit} className="w-full">
            Continue <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions.find(q => q.id === currentQuestionId);

  return (
    <div className="flex gap-8 p-6 animate-fade-in">
      {/* Progress Sidebar */}
      <div className="w-64 space-y-4">
        <h3 className="font-medium text-gray-700 mb-4">Your Progress</h3>
        {questions.map((question) => (
          <button
            key={question.id}
            onClick={() => canAccessQuestion(question.id) && setCurrentQuestionId(question.id)}
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
            <span className="flex-1 text-sm">Question {question.id}</span>
            {question.isCompleted && (
              <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
            )}
          </button>
        ))}
      </div>

      {/* Question Content */}
      <div className="flex-1 max-w-2xl space-y-6 animate-fade-in">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Question {currentQuestion?.id}
          </h2>
          <p className="text-gray-700">{currentQuestion?.text}</p>
          <Textarea
            value={currentQuestion?.answer || ""}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder="Type your answer here..."
            className="min-h-[200px]"
          />
          <Button 
            onClick={handleSaveAnswer}
            className="w-full"
          >
            Save Answer
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LiveExperience;
