import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Monitor, MapPin } from "lucide-react";
import { useState } from "react";

interface EventCardProps {
  city: string;
  country: string;
  date: string;
  image?: string;
  isActive?: boolean;
  isVirtual?: boolean;
  onRegister: () => void;
  onJoin?: (code: string) => void;
}

export const EventCard = ({
  city,
  country,
  date,
  image,
  isActive,
  isVirtual,
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
    <Card className={`relative w-full overflow-hidden group transition-all duration-300 hover:shadow-lg border-2 ${isActive ? 'hover:border-purple-300' : 'hover:border-purple-200'}`}>
      {image ? (
        <div className="relative h-48">
          <img
            src={image}
            alt={`${city} Event`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
        </div>
      ) : (
        <div className={`h-32 ${isVirtual
            ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10'
            : 'bg-gradient-to-br from-purple-500/10 to-blue-500/10'
          }`}>
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
        </div>
      )}
      <CardHeader className="relative pb-2">
        <div className="flex items-center gap-2">
          {isVirtual ? (
            <Monitor className="h-5 w-5 text-purple-500" />
          ) : (
            <MapPin className="h-5 w-5 text-purple-500" />
          )}
          <CardTitle className="text-xl font-semibold">
            {city}, {country}
          </CardTitle>
        </div>
        <p className="text-muted-foreground font-medium">{date}</p>
      </CardHeader>

      {isActive && showActivation && (
        <CardContent className="">
          <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <Input
              type="text"
              value={activationCode}
              onChange={(e) => setActivationCode(e.target.value)}
              placeholder="Enter activation code"
              className="w-full"
            />
          </div>
        </CardContent>
      )}

      <CardFooter className="">
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
            className={`w-full hover:bg-purple-50 transition-all duration-300 ${isVirtual ? 'border-blue-200 hover:border-blue-300' : 'border-purple-200 hover:border-purple-300'
              }`}
          >
            Register
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};