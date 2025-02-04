import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface EventCardProps {
  city: string;
  country: string;
  date: string;
  isActive?: boolean;
  onRegister: () => void;
  onJoin?: (code: string) => void;
}

export const EventCard = ({
  city,
  country,
  date,
  isActive,
  onRegister,
  onJoin,
}: EventCardProps) => {
  const [showActivation, setShowActivation] = useState(false);
  const [activationCode, setActivationCode] = useState("");

  const handleJoin = () => {
    if (!showActivation) {
      setShowActivation(true);
      return;
    }
    if (onJoin) {
      onJoin(activationCode);
      setShowActivation(false);
      setActivationCode("");
    }
  };

  return (
    <Card className="w-full overflow-hidden group transition-all duration-300 hover:shadow-lg border-2 hover:border-purple-200">
      <div className="relative h-32 bg-gradient-to-br from-purple-500/10 to-blue-500/10">
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
        <CardHeader className="relative">
          <CardTitle className="text-xl font-semibold">
            {city}, {country}
          </CardTitle>
          <p className="text-muted-foreground font-medium">{date}</p>
        </CardHeader>
      </div>
      <CardContent className="pt-4">
        {isActive && showActivation && (
          <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <Input
              type="text"
              value={activationCode}
              onChange={(e) => setActivationCode(e.target.value)}
              placeholder="Enter activation code"
              className="w-full"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-3">
        {isActive ? (
          <Button 
            onClick={handleJoin} 
            className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 transition-all duration-300"
          >
            {showActivation ? "Submit Code" : "Join Event"}
          </Button>
        ) : (
          <Button 
            onClick={onRegister} 
            variant="outline" 
            className="w-full hover:bg-purple-50 transition-all duration-300"
          >
            Register
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};