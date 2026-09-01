"use client";

import { useEffect, useState, useCallback } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCard from "@/components/dashboard/StatCard";
import ExpenseChart from "@/components/dashboard/ExpenseChart";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import AddTransactionButton from "@/components/dashboard/AddTransactionButton";
import api from "@/lib/api";

import { Wallet, TrendingUp, TrendingDown } from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    balance: 0,
    income: 0,
    expense: 0,
    currency: "INR",
    transactions: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/dashboard");
      setStats({
        balance: data.balance || 0,
        income: data.income || 0,
        expense: data.expense || 0,
        currency: data.currency || "INR",
        transactions: data.transactions || [],
      });
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();

    const handleUpdate = () => fetchDashboard();
    window.addEventListener("transaction:updated", handleUpdate);
    return () => window.removeEventListener("transaction:updated", handleUpdate);
  }, [fetchDashboard]);

  if (loading) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-500 animate-pulse">
          Loading Dashboard Data...
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <DashboardHeader />

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        <StatCard
          title="Total Balance"
          value={stats.balance}
          currency={stats.currency}
          icon={<Wallet size={24} />}
          color="bg-blue-600"
        />

        <StatCard
          title="Total Income"
          value={stats.income}
          currency={stats.currency}
          icon={<TrendingUp size={24} />}
          color="bg-emerald-600"
        />

        <StatCard
          title="Total Expenses"
          value={stats.expense}
          currency={stats.currency}
          icon={<TrendingDown size={24} />}
          color="bg-rose-600"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1">
          <ExpenseChart
            transactions={stats.transactions}
            currency={stats.currency}
          />
        </div>

        <div className="xl:col-span-2">
          <RecentTransactions
            transactions={stats.transactions}
            currency={stats.currency}
            onRefresh={fetchDashboard}
          />
        </div>
      </div>

      <AddTransactionButton onTransactionAdded={fetchDashboard} />
    </div>
  );
}