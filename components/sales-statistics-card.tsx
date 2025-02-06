import React from "react";
import { DollarSign, TrendingUp, Activity } from "lucide-react";
import CountUp from "react-countup";

// Define the type for each stat card's props
interface StatProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend: number;
}

const StatCard: React.FC<StatProps> = ({ title, value, icon, trend }) => {
  return (
    <div className="bg-transparent p-8 rounded-lg shadow-md border hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between pb-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {icon}
      </div>
      <div className="text-[40px] font-bold text-green-600">
        <CountUp end={value} duration={1.5} separator="," />
      </div>
    </div>
  );
};
interface SalesStatisticsCardProps {
  data: {
    today: number;
    total: number;
  };
}

export const SalesStatisticsCard: React.FC<SalesStatisticsCardProps> = ({
  data,
}) => {
  const stats: StatProps[] = [
    {
      title: "Today's Transactions",
      value: data?.today,
      icon: <Activity className="h-5 w-5 text-gray-400" />,
      trend: 12, // Adjust the trend value as needed
    },
    {
      title: "Total Transactions",
      value: data?.total,
      icon: <TrendingUp className="h-5 w-5 text-gray-400" />,
      trend: 8, // Adjust the trend value as needed
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};
