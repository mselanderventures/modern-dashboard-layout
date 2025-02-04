import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, ChevronRight } from "lucide-react";

interface Question {
  id: number;
  text: string;
  answer: string;
  isCompleted: boolean;
}

interface QuestionFormProps {
  question: Question;
  onAnswerChange: (answer: string) => void;
  onSave: () => void;
}

export const QuestionForm = ({ question, onAnswerChange, onSave }: QuestionFormProps) => {
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

  return (
    <div className="flex-1 max-w-2xl space-y-6 animate-fade-in">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          Question {question.id}
        </h2>
        <p className="text-gray-700">{question.text}</p>
        <Textarea
          value={question.answer}
          onChange={(e) => onAnswerChange(e.target.value)}
          placeholder="Type your answer here..."
          className="min-h-[200px]"
        />
        <Button onClick={handleSave} className="w-full">
          Save Answer
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};