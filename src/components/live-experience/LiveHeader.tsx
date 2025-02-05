import { DollarSign, MapPin, Percent, Users, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface BusinessDetails {
  name: string;
  customers: number;
  revenue: number;
  grossMargin: number;
}

interface LiveHeaderProps {
  businessDetails: BusinessDetails | null;
}

export const LiveHeader = ({ businessDetails }: LiveHeaderProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-4">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Founder's Fortune Academy by Jeremy Schwartz
          </h1>
          <div className="mt-3 flex items-center text-gray-600 space-x-4">
            <span className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              Miami, Florida
            </span>
            <span>•</span>
            <span>Feb 14th 2025</span>
          </div>
        </div>

        {businessDetails && (
          <div className="border-t pt-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-500">My Business:</span>
                  <h2 className="text-xl font-semibold text-gray-800 mt-1">
                    {businessDetails.name}
                  </h2>
                </div>
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 rounded-md hover:bg-gray-50"
                >
                  <span className="text-sm font-medium">
                    {showDetails ? "Hide Details" : "View Details"}
                  </span>
                  {showDetails ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
              </div>

              {showDetails && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 animate-slide-in-bottom">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-purple-200 transition-all duration-300">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-purple-500 mr-2" />
                      <span className="text-sm font-medium text-gray-500">Customers</span>
                    </div>
                    <p className="mt-2 text-2xl font-semibold text-gray-900">
                      {new Intl.NumberFormat('en-US').format(businessDetails.customers)}
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-purple-200 transition-all duration-300">
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-purple-500 mr-2" />
                      <span className="text-sm font-medium text-gray-500">Revenue</span>
                    </div>
                    <p className="mt-2 text-2xl font-semibold text-gray-900">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(businessDetails.revenue)}
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-purple-200 transition-all duration-300">
                    <div className="flex items-center">
                      <Percent className="h-5 w-5 text-purple-500 mr-2" />
                      <span className="text-sm font-medium text-gray-500">Gross Margin</span>
                    </div>
                    <p className="mt-2 text-2xl font-semibold text-gray-900">
                      {businessDetails.grossMargin}%
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};