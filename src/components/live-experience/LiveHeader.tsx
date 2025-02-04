import { DollarSign, MapPin, Percent, Users } from "lucide-react";

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
  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-12">
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
          <div className="border-t pt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {businessDetails.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          </div>
        )}
      </div>
    </div>
  );
};