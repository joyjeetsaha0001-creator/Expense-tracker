"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCard from "@/components/dashboard/StatCard";
import ExpenseChart from "@/components/dashboard/ExpenseChart";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import AddTransactionButton from "@/components/dashboard/AddTransactionButton";

import useDashboard from "@/hooks/useDashboard";

import {
  Wallet,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

export default function DashboardPage() {
  const { stats, loading } =
    useDashboard();

  if (loading) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <h2 className="text-2xl font-semibold animate-pulse">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <DashboardHeader />

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">

        <StatCard
          title="Balance"
          value={stats.balance}
          icon={<Wallet size={30} />}
          color="bg-blue-600"
        />

        <StatCard
          title="Income"
          value={stats.income}
          icon={<TrendingUp size={30} />}
          color="bg-green-600"
        />

        <StatCard
          title="Expense"
          value={stats.expense}
          icon={<TrendingDown size={30} />}
          color="bg-red-600"
        />

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div className="xl:col-span-1">

          <ExpenseChart
            transactions={stats.transactions}
          />

        </div>

        <div className="xl:col-span-2">

          <RecentTransactions
            transactions={stats.transactions}
          />

        </div>

      </div>

      <AddTransactionButton />

    </div>
  );
}