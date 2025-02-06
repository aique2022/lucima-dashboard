import React from "react";
import { DollarSign, TrendingUp, Activity } from "lucide-react";
import CountUp from "react-countup";

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

export function SalesStatisticsCard() {
  const stats = [
    {
      title: "Today's Transactions",
      value: 100,
      icon: <Activity className="h-5 w-5 text-gray-400" />,
      trend: 12,
    },
    {
      title: "Total Transactions",
      value: 45231,
      icon: <TrendingUp className="h-5 w-5 text-gray-400" />,
      trend: 8,
    },
    // {
    //   title: "Today's Revenue",
    //   value: 12234,
    //   icon: <DollarSign className="h-5 w-5 text-gray-400" />,
    //   trend: -3,
    // },
    // {
    //   title: "Total Revenue",
    //   value: 5123373,
    //   icon: <DollarSign className="h-5 w-5 text-gray-400" />,
    //   trend: 5,
    // },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 ">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
