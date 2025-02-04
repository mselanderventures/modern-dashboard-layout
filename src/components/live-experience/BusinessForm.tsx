import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { useState } from "react";

interface BusinessFormProps {
  onSubmit: () => void;
}

export const BusinessForm = ({ onSubmit }: BusinessFormProps) => {
  const { toast } = useToast();
  const [businessName, setBusinessName] = useState("");

  const handleBusinessSubmit = () => {
    if (businessName.trim() === "") {
      toast({
        title: "Error",
        description: "Please enter your business name",
        variant: "destructive",
      });
      return;
    }
    onSubmit();
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
};