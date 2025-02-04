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
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "/lovable-uploads/d1cf653d-5e53-4394-87ac-97daadce0889.png",
    "/lovable-uploads/de2a42f8-f85e-4ab0-8588-f09ee3d0463f.png",
    "/lovable-uploads/9b73c291-d943-42f0-bde8-3ac27e5e7669.png"
  ];

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
      <div className="relative h-[30vh] w-full overflow-hidden rounded-xl">
        <div className="absolute inset-0 flex">
          {images.map((img, index) => (
            <img 
              key={index}
              src={img} 
              alt={`Event Banner ${index + 1}`} 
              className="w-1/3 h-full object-cover"
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
      </div>

      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">Live Events</h2>
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

        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">Virtual Events</h2>
          <div className="grid gap-6 md:grid-cols-3 animate-fade-in">
            <EventCard
              city="Virtual Workshop"
              country="Online"
              date="Feb 21st - 8pm EST"
              onRegister={handleRegister}
              isVirtual
            />
            <EventCard
              city="Virtual Workshop"
              country="Online"
              date="Feb 28th - 8pm EST"
              onRegister={handleRegister}
              isVirtual
            />
            <EventCard
              city="Virtual Workshop"
              country="Online"
              date="Mar 7th - 8pm EST"
              onRegister={handleRegister}
              isVirtual
            />
            <EventCard
              city="Virtual Workshop"
              country="Online"
              date="Mar 14th - 8pm EST"
              onRegister={handleRegister}
              isVirtual
            />
            <EventCard
              city="Virtual Workshop"
              country="Online"
              date="Mar 21st - 8pm EST"
              onRegister={handleRegister}
              isVirtual
            />
            <EventCard
              city="Virtual Workshop"
              country="Online"
              date="Mar 28th - 8pm EST"
              onRegister={handleRegister}
              isVirtual
            />
          </div>
        </div>
      </div>
    </div>
  );
};