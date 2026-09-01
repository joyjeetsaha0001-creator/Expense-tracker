"use client";

import { Card } from "@/components/ui/Card";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#22c55e", "#ef4444"];

export default function ExpenseChart({
  transactions = [],
}) {
  const income = transactions
    .filter((item) => item.type === "income")
    .reduce(
      (total, item) => total + item.amount,
      0
    );

  const expense = transactions
    .filter((item) => item.type === "expense")
    .reduce(
      (total, item) => total + item.amount,
      0
    );

  const data = [
    {
      name: "Income",
      value: income,
    },
    {
      name: "Expense",
      value: expense,
    },
  ];

  return (
    <Card className="p-6">

      <h2 className="text-2xl font-semibold mb-6">
        Income vs Expense
      </h2>

      <div className="w-full h-[350px]">

        <ResponsiveContainer>

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              outerRadius={120}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </Card>
  );
}