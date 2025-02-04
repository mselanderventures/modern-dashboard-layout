import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { useState } from "react";

interface BusinessFormProps {
  onSubmit: (businessDetails: {
    name: string;
    customers: number;
    revenue: number;
    grossMargin: number;
  }) => void;
}

export const BusinessForm = ({ onSubmit }: BusinessFormProps) => {
  const { toast } = useToast();
  const [businessName, setBusinessName] = useState("");
  const [customers, setCustomers] = useState("");
  const [revenue, setRevenue] = useState("");
  const [grossMargin, setGrossMargin] = useState("");

  const handleBusinessSubmit = () => {
    if (businessName.trim() === "") {
      toast({
        title: "Error",
        description: "Please enter your business name",
        variant: "destructive",
      });
      return;
    }

    if (!customers || !revenue || !grossMargin) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    onSubmit({
      name: businessName,
      customers: parseInt(customers),
      revenue: parseInt(revenue),
      grossMargin: parseInt(grossMargin),
    });
    
    toast({
      title: "Success",
      description: (
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span>Business details saved successfully!</span>
        </div>
      ),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-lg w-full mx-auto p-12 bg-white rounded-lg shadow-sm space-y-6 animate-fade-in">
        <h2 className="text-2xl font-semibold text-gray-900">Business Details</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              What is the name of your business?
            </label>
            <Input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Enter your business name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Customers
            </label>
            <Input
              type="number"
              value={customers}
              onChange={(e) => setCustomers(e.target.value)}
              placeholder="Enter number of customers"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Annual Revenue ($)
            </label>
            <Input
              type="number"
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
              placeholder="Enter annual revenue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gross Margin (%)
            </label>
            <Input
              type="number"
              value={grossMargin}
              onChange={(e) => setGrossMargin(e.target.value)}
              min="0"
              max="100"
              placeholder="Enter gross margin percentage"
            />
          </div>

          <Button onClick={handleBusinessSubmit} className="w-full">
            Continue <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};