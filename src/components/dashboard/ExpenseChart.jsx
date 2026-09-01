"use client";

import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/utils/formatCurrency";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#10b981", "#ef4444"];

export default function ExpenseChart({
  transactions = [],
  currency = "INR",
}) {
  const income = transactions
    .filter((item) => item.type === "income")
    .reduce((total, item) => total + item.amount, 0);

  const expense = transactions
    .filter((item) => item.type === "expense")
    .reduce((total, item) => total + item.amount, 0);

  const data = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];

  const isEmpty = income === 0 && expense === 0;

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Income vs Expense
      </h2>

      {isEmpty ? (
        <div className="w-full h-[320px] flex items-center justify-center text-gray-400 text-sm">
          No chart data available yet.
        </div>
      ) : (
        <div className="w-full h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={60}
                paddingAngle={4}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => formatCurrency(value, currency)}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}