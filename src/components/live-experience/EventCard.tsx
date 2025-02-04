import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface EventCardProps {
  city: string;
  country: string;
  date: string;
  isActive?: boolean;
  onRegister: () => void;
  onJoin?: () => void;
}

export const EventCard = ({
  city,
  country,
  date,
  isActive,
  onRegister,
  onJoin,
}: EventCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          {city}, {country}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{date}</p>
      </CardContent>
      <CardFooter className="flex gap-3">
        {isActive ? (
          <Button onClick={onJoin} className="w-full">
            Join Event
          </Button>
        ) : (
          <Button onClick={onRegister} variant="outline" className="w-full">
            Register
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};