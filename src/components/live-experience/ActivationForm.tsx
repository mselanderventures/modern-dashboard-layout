import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface ActivationFormProps {
  onUnlock: () => void;
}

export const ActivationForm = ({ onUnlock }: ActivationFormProps) => {
  const { toast } = useToast();
  const [activationCode, setActivationCode] = useState("");

  const handleUnlock = () => {
    if (activationCode.trim() === "") {
      toast({
        title: "Error",
        description: "Please enter an activation code",
        variant: "destructive",
      });
      return;
    }
    onUnlock();
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
};