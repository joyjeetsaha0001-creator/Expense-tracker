"use client";

import { useEffect, useState, useCallback } from "react";
import api from "@/lib/api";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { toast } from "sonner";
import EditTransactionDialog from "@/components/dashboard/EditTransactionDialog";
import AddTransactionButton from "@/components/dashboard/AddTransactionButton";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Search, Trash2, Filter, ReceiptText } from "lucide-react";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [currency, setCurrency] = useState("INR");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = useCallback(async () => {
    try {
      const { data } = await api.get("/transactions");
      setTransactions(data.transactions || []);

      const profileRes = await api.get("/auth/me");
      if (profileRes.data?.user?.currency) {
        setCurrency(profileRes.data.user.currency);
      }

      const catRes = await api.get("/categories");
      if (catRes.data?.categories) {
        setCategories(catRes.data.categories);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load transactions.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  async function deleteTransaction(id) {
    if (!confirm("Are you sure you want to delete this transaction?")) return;

    try {
      await api.delete(`/transactions/${id}`);
      toast.success("Transaction deleted successfully");
      fetchTransactions();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete transaction.");
    }
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.title.toLowerCase().includes(search.toLowerCase()) ||
      (transaction.note && transaction.note.toLowerCase().includes(search.toLowerCase()));

    const matchesType =
      typeFilter === "all" || transaction.type === typeFilter;

    const catId = typeof transaction.category === "object" ? transaction.category?._id : transaction.category;
    const matchesCategory =
      categoryFilter === "all" || catId === categoryFilter;

    return matchesSearch && matchesType && matchesCategory;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
          <ReceiptText className="text-blue-600" size={28} /> All Transactions
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Search, filter, edit, or remove your financial transaction logs.
        </p>
      </div>

      <Card>
        <CardHeader className="border-b border-gray-100 pb-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <CardTitle className="text-lg font-bold text-gray-900">
              Transaction Logs ({filteredTransactions.length})
            </CardTitle>

            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px]">
                <Search
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={16}
                />
                <Input
                  className="pl-9 h-9 text-sm"
                  placeholder="Search title or notes..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Type Filter */}
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="h-9 border border-gray-200 rounded-lg px-3 text-xs font-semibold text-gray-700 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="all">All Types</option>
                <option value="income">Income Only</option>
                <option value="expense">Expenses Only</option>
              </select>

              {/* Category Filter */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="h-9 border border-gray-200 rounded-lg px-3 text-xs font-semibold text-gray-700 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-4">
          {loading ? (
            <p className="text-gray-400 py-12 text-center text-sm font-medium animate-pulse">
              Loading transactions...
            </p>
          ) : filteredTransactions.length === 0 ? (
            <div className="py-12 text-center text-gray-400 text-sm">
              No transactions found matching your filter criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-semibold text-xs uppercase tracking-wider">
                    <th className="pb-3">Title</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Type</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredTransactions.map((transaction) => (
                    <tr
                      key={transaction._id}
                      className="hover:bg-gray-50/80 transition"
                    >
                      <td className="py-4">
                        <p className="font-semibold text-gray-900">
                          {transaction.title}
                        </p>
                        {transaction.note && (
                          <p className="text-xs text-gray-400 truncate max-w-xs mt-0.5">
                            {transaction.note}
                          </p>
                        )}
                      </td>

                      <td className="py-4 text-gray-600 font-medium">
                        {transaction.category?.name || "N/A"}
                      </td>

                      <td className="py-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            transaction.type === "income"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {transaction.type}
                        </span>
                      </td>

                      <td
                        className={`py-4 font-bold ${
                          transaction.type === "income"
                            ? "text-green-600"
                            : "text-gray-900"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : "-"}
                        {formatCurrency(transaction.amount, currency)}
                      </td>

                      <td className="py-4 text-gray-500">
                        {formatDate(transaction.date)}
                      </td>

                      <td className="py-4">
                        <div className="flex justify-center items-center gap-1">
                          <EditTransactionDialog
                            transaction={transaction}
                            onSuccess={fetchTransactions}
                          />

                          <button
                            onClick={() => deleteTransaction(transaction._id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Delete Transaction"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <AddTransactionButton onTransactionAdded={fetchTransactions} />
    </div>
  );
}