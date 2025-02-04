import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";

const LiveExperience = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activationCode, setActivationCode] = useState("");
  const [businessName, setBusinessName] = useState("");
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
      description: "Experience unlocked successfully!",
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

  return (
    <div className="max-w-md mx-auto space-y-6">
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
      </div>
    </div>
  );
};

export default LiveExperience;