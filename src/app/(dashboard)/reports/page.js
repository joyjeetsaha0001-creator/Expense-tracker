"use client";

import { useEffect, useState, useCallback } from "react";
import api from "@/lib/api";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { toast } from "sonner";
import {
  Download,
  FileSpreadsheet,
  TrendingUp,
  TrendingDown,
  Scale,
  Calendar,
  Filter,
} from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function ReportsPage() {
  const [transactions, setTransactions] = useState([]);
  const [currency, setCurrency] = useState("INR");
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("all");

  const fetchReportData = useCallback(async () => {
    try {
      const { data } = await api.get("/dashboard");
      setTransactions(data.transactions || []);
      setCurrency(data.currency || "INR");
    } catch (err) {
      console.error("Failed to fetch report data:", err);
      toast.error("Failed to load reports data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReportData();
  }, [fetchReportData]);

  // Filter transactions based on timeframe
  const filteredTransactions = transactions.filter((item) => {
    if (timeframe === "all") return true;
    const itemDate = new Date(item.date);
    const now = new Date();

    if (timeframe === "this_month") {
      return (
        itemDate.getMonth() === now.getMonth() &&
        itemDate.getFullYear() === now.getFullYear()
      );
    }
    if (timeframe === "last_month") {
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      return (
        itemDate.getMonth() === lastMonth.getMonth() &&
        itemDate.getFullYear() === lastMonth.getFullYear()
      );
    }
    if (timeframe === "ytd") {
      return itemDate.getFullYear() === now.getFullYear();
    }
    return true;
  });

  const totalIncome = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netSavings = totalIncome - totalExpense;
  const expenseRatio =
    totalIncome > 0
      ? Math.min(Math.round((totalExpense / totalIncome) * 100), 100)
      : totalExpense > 0
      ? 100
      : 0;

  // Category breakdown calculation
  const categoryMap = {};
  filteredTransactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      const catName = t.category?.name || "Uncategorized";
      categoryMap[catName] = (categoryMap[catName] || 0) + t.amount;
    });

  const categoryBreakdown = Object.entries(categoryMap)
    .map(([name, amount]) => ({
      name,
      amount,
      percentage:
        totalExpense > 0 ? Math.round((amount / totalExpense) * 100) : 0,
    }))
    .sort((a, b) => b.amount - a.amount);

  function exportCSV() {
    if (filteredTransactions.length === 0) {
      toast.error("No data available to export");
      return;
    }

    const headers = ["Title", "Type", "Category", "Amount", "Currency", "Date", "Notes"];
    const csvRows = [headers.join(",")];

    filteredTransactions.forEach((t) => {
      const row = [
        `"${t.title.replace(/"/g, '""')}"`,
        t.type,
        `"${(t.category?.name || "N/A").replace(/"/g, '""')}"`,
        t.amount,
        currency,
        new Date(t.date).toISOString().split("T")[0],
        `"${(t.note || "").replace(/"/g, '""')}"`,
      ];
      csvRows.push(row.join(","));
    });

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute(
      "download",
      `Financial_Report_${timeframe}_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success("CSV Report downloaded successfully!");
  }

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <p className="text-gray-500 font-medium animate-pulse">
          Generating Financial Reports...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <FileSpreadsheet className="text-blue-600" size={28} /> Financial Reports
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Export transaction logs, examine expense distribution, and analyze net savings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-1.5 shadow-2xs">
            <Filter size={16} className="text-gray-400" />
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="text-sm font-medium text-gray-700 bg-transparent outline-none cursor-pointer"
            >
              <option value="all">All Time</option>
              <option value="this_month">This Month</option>
              <option value="last_month">Last Month</option>
              <option value="ytd">Year to Date (YTD)</option>
            </select>
          </div>

          <Button
            onClick={exportCSV}
            className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 shadow-md shadow-emerald-600/20"
          >
            <Download size={18} /> Export CSV
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-5 border-l-4 border-l-green-500 shadow-2xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Total Income
            </p>
            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
              <TrendingUp size={20} />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-3">
            {formatCurrency(totalIncome, currency)}
          </p>
          <p className="text-xs text-gray-400 mt-1">Filtered timeframe total</p>
        </Card>

        <Card className="p-5 border-l-4 border-l-red-500 shadow-2xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Total Expenses
            </p>
            <div className="p-2 bg-red-50 text-red-600 rounded-lg">
              <TrendingDown size={20} />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-3">
            {formatCurrency(totalExpense, currency)}
          </p>
          <p className="text-xs text-gray-400 mt-1">Filtered timeframe total</p>
        </Card>

        <Card className="p-5 border-l-4 border-l-blue-500 shadow-2xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Net Savings
            </p>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Scale size={20} />
            </div>
          </div>
          <p
            className={`text-2xl font-bold mt-3 ${
              netSavings >= 0 ? "text-blue-600" : "text-red-600"
            }`}
          >
            {formatCurrency(netSavings, currency)}
          </p>
          <p className="text-xs text-gray-400 mt-1">Income minus Expenses</p>
        </Card>

        <Card className="p-5 border-l-4 border-l-purple-500 shadow-2xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Expense Ratio
            </p>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <Calendar size={20} />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-3">{expenseRatio}%</p>
          <p className="text-xs text-gray-400 mt-1">Expenses of total income</p>
        </Card>
      </div>

      {/* Category Breakdown & Detailed Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-lg font-bold text-gray-900">
              Expense Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-4">
            {categoryBreakdown.length === 0 ? (
              <p className="text-sm text-gray-400 py-8 text-center">
                No expense data recorded for this timeframe.
              </p>
            ) : (
              categoryBreakdown.map((cat, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">{cat.name}</span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(cat.amount, currency)} ({cat.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${cat.percentage}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-lg font-bold text-gray-900">
              Transaction Records ({filteredTransactions.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {filteredTransactions.length === 0 ? (
              <p className="text-sm text-gray-400 py-12 text-center">
                No transactions match the selected timeframe.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b text-gray-500 font-semibold text-xs uppercase tracking-wider">
                      <th className="pb-3">Title</th>
                      <th className="pb-3">Category</th>
                      <th className="pb-3">Type</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredTransactions.slice(0, 15).map((t) => (
                      <tr key={t._id} className="hover:bg-gray-50/80 transition">
                        <td className="py-3 font-medium text-gray-900">{t.title}</td>
                        <td className="py-3 text-gray-600">
                          {t.category?.name || "N/A"}
                        </td>
                        <td className="py-3">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                              t.type === "income"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {t.type}
                          </span>
                        </td>
                        <td className="py-3 text-gray-500">{formatDate(t.date)}</td>
                        <td
                          className={`py-3 text-right font-bold ${
                            t.type === "income" ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {t.type === "income" ? "+" : "-"}
                          {formatCurrency(t.amount, currency)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
