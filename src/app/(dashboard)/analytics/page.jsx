"use client";

import { useEffect, useState, useCallback } from "react";
import api from "@/lib/api";
import { formatCurrency } from "@/utils/formatCurrency";
import { toast } from "sonner";
import { BarChart3 } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const COLORS = ["#10b981", "#ef4444", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899"];

export default function AnalyticsPage() {
  const [transactions, setTransactions] = useState([]);
  const [currency, setCurrency] = useState("INR");
  const [loading, setLoading] = useState(true);

  const fetchTransactions = useCallback(async () => {
    try {
      const { data } = await api.get("/transactions");
      setTransactions(data.transactions || []);

      const profileRes = await api.get("/auth/me");
      if (profileRes.data?.user?.currency) {
        setCurrency(profileRes.data.user.currency);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load analytics data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const pieData = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];

  const categoryMap = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      const category = t.category?.name || "Others";
      categoryMap[category] = (categoryMap[category] || 0) + t.amount;
    });

  const barData = Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value,
  }));

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <p className="text-gray-400 font-medium animate-pulse">
          Loading Analytics...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
          <BarChart3 className="text-blue-600" size={28} /> Financial Analytics
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Visual metrics for cashflow distribution and spending trends.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-lg font-bold text-gray-900">
              Income vs Expense Ratio
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {income === 0 && expense === 0 ? (
              <div className="h-80 flex items-center justify-center text-gray-400 text-sm">
                No financial data recorded yet.
              </div>
            ) : (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      innerRadius={50}
                      paddingAngle={4}
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value, currency)} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-lg font-bold text-gray-900">
              Expense by Category
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {barData.length === 0 ? (
              <div className="h-80 flex items-center justify-center text-gray-400 text-sm">
                No expense category data recorded yet.
              </div>
            ) : (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(value, currency)} />
                    <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}