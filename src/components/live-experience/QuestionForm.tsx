import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, ChevronRight, Loader2 } from "lucide-react";
import { useState } from "react";

interface Question {
  id: number;
  text: string;
  answer: string;
  isCompleted: boolean;
  followUpAnswer?: string;
  showFollowUp?: boolean;
}

interface QuestionFormProps {
  question: Question;
  onAnswerChange: (answer: string) => void;
  onFollowUpAnswerChange: (answer: string) => void;
  onSave: () => void;
  isLoading: boolean;
}

export const QuestionForm = ({ 
  question, 
  onAnswerChange, 
  onFollowUpAnswerChange,
  onSave,
  isLoading 
}: QuestionFormProps) => {
  const { toast } = useToast();

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
    if (!(question.id === 3 && !question.showFollowUp)) {
      toast({
        title: "Success",
        description: (
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>Answer saved successfully!</span>
          </div>
        ),
      });
    }
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

  return (
    <div className="flex-1 max-w-2xl space-y-6 animate-fade-in">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          {getQuestionTitle(question.id)}
        </h2>
        <p className="text-gray-600">{question.text}</p>
        <Textarea
          value={question.answer}
          onChange={(e) => onAnswerChange(e.target.value)}
          placeholder="Type your answer here..."
          className="min-h-[200px]"
        />
        
        {question.id === 3 && question.showFollowUp && (
          <div className="space-y-4 animate-[fade-in_0.5s_ease-out,slide-in-right_0.5s_ease-out]">
            <h2 className="text-2xl font-semibold text-gray-900 mt-4">
              AI Follow Up Question
            </h2>
            <p className="text-gray-600">Can you go into more detail about the actual demographics of your customer? Are they old/young? Are they wealthy/on a budget?</p>
            <Textarea
              value={question.followUpAnswer}
              onChange={(e) => onFollowUpAnswerChange(e.target.value)}
              placeholder="Type your follow-up answer here..."
              className="min-h-[200px]"
            />
          </div>
        )}

        {isLoading ? (
          <Button disabled className="w-full">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button onClick={handleSave} className="w-full">
            {question.id === 3 && !question.showFollowUp ? "Next" : "Save Answer"}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};