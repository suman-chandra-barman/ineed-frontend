import { Calendar, CheckCircle, DollarSign } from "lucide-react";

interface Transaction {
  orderId: string;
  serviceName: string;
  providerName: string;
  paymentDate: string;
  amount: string;
}

const mockTransactions: Transaction[] = [
  {
    orderId: "CO 122",
    serviceName: "name@gmail.com",
    providerName: "Rahim Hossain",
    paymentDate: "25-02-2025",
    amount: "$34,295",
  },
  {
    orderId: "CO 122",
    serviceName: "name@gmail.com",
    providerName: "Rahim Hossain",
    paymentDate: "25-02-2025",
    amount: "$34,295",
  },
  {
    orderId: "CO 122",
    serviceName: "name@gmail.com",
    providerName: "Rahim Hossain",
    paymentDate: "25-02-2025",
    amount: "$34,295",
  },
  {
    orderId: "CO 122",
    serviceName: "name@gmail.com",
    providerName: "Rahim Hossain",
    paymentDate: "25-02-2025",
    amount: "$34,295",
  },
  {
    orderId: "CO 122",
    serviceName: "name@gmail.com",
    providerName: "Rahim Hossain",
    paymentDate: "25-02-2025",
    amount: "$34,295",
  },
  {
    orderId: "CO 122",
    serviceName: "name@gmail.com",
    providerName: "Rahim Hossain",
    paymentDate: "25-02-2025",
    amount: "$34,295",
  },
  {
    orderId: "CO 122",
    serviceName: "name@gmail.com",
    providerName: "Rahim Hossain",
    paymentDate: "25-02-2025",
    amount: "$34,295",
  },
  {
    orderId: "CO 122",
    serviceName: "name@gmail.com",
    providerName: "Rahim Hossain",
    paymentDate: "25-02-2025",
    amount: "$34,295",
  },
];

function UserDashboardPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Dashboard
        </h1>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>🏠</span>
          <span>&gt;</span>
          <span>Home</span>
          <span>&gt;</span>
          <span className="text-gray-900 font-medium">Dashboard</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Active Bookings */}
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Bookings</p>
              <p className="text-3xl font-bold text-gray-900">89</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Completed Services */}
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Completed Services</p>
              <p className="text-3xl font-bold text-gray-900">89</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Total Spend */}
        <div className="bg-white rounded-lg shadow-sm p-6 border sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Spend</p>
              <p className="text-3xl font-bold text-gray-900">$204</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Recent Transaction
          </h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Id
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Provider name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockTransactions.map((transaction, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.orderId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.serviceName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.providerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.paymentDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserDashboardPage;
