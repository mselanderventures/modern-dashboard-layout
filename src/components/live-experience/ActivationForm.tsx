import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { EventCard } from "./EventCard";

interface ActivationFormProps {
  onUnlock: () => void;
}

export const ActivationForm = ({ onUnlock }: ActivationFormProps) => {
  const { toast } = useToast();

  const handleUnlock = (code: string) => {
    if (code.trim() === "") {
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

  const handleRegister = () => {
    toast({
      title: "Registration",
      description: "Registration will be available soon!",
    });
  };

  return (
    <div className="space-y-8">
      <div className="relative h-[30vh] w-full overflow-hidden">
        <img 
          src="/lovable-uploads/4f29a7be-e1a6-4599-92b0-deb671ce8b79.png" 
          alt="Event Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" />
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="grid gap-6 md:grid-cols-3 animate-fade-in">
          <EventCard
            city="Miami"
            country="Florida"
            date="Feb 14th"
            isActive
            onRegister={handleRegister}
            onJoin={handleUnlock}
          />
          <EventCard
            city="London"
            country="England"
            date="Mar 1st"
            onRegister={handleRegister}
          />
          <EventCard
            city="Dubai"
            country="UAE"
            date="April 1st"
            onRegister={handleRegister}
          />
        </div>
      </div>
    </div>
  );
};