"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCard from "@/components/dashboard/StatCard";
import ExpenseChart from "@/components/dashboard/ExpenseChart";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import AddTransactionButton from "@/components/dashboard/AddTransactionButton";

import useDashboard from "@/hooks/useDashboard";

export default function DashboardPage() {
  const { stats, loading } = useDashboard();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-6">
      <DashboardHeader />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Balance"
          value={`₹${stats.balance}`}
        />

        <StatCard
          title="Income"
          value={`₹${stats.income}`}
        />

        <StatCard
          title="Expense"
          value={`₹${stats.expense}`}
        />
      </div>

      <ExpenseChart
        transactions={stats.transactions}
      />

      <RecentTransactions
        transactions={stats.transactions}
      />

      <AddTransactionButton />
    </div>
  );
}