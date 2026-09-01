"use client";

import api from "@/lib/api";
import EditTransactionDialog from "./EditTransactionDialog";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

export default function RecentTransactions({
  transactions = [],
  currency = "INR",
  onRefresh,
}) {
  async function deleteTransaction(id) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/transactions/${id}`);
      toast.success("Transaction deleted successfully");
      if (onRefresh) {
        onRefresh();
      } else {
        window.dispatchEvent(new CustomEvent("transaction:updated"));
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete transaction.");
    }
  }

  if (!transactions || transactions.length === 0) {
    return (
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900">
          Recent Transactions
        </h2>
        <div className="flex items-center justify-center h-48 text-gray-400 text-sm font-medium">
          No transactions recorded yet. Click the + button to add one.
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Recent Transactions
        </h2>
        <span className="text-xs text-gray-400 font-medium">
          Showing latest {Math.min(transactions.length, 10)}
        </span>
      </div>

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
            {transactions.slice(0, 10).map((item) => (
              <tr
                key={item._id}
                className="hover:bg-gray-50/80 transition"
              >
                <td className="py-3.5 font-medium text-gray-900">
                  {item.title}
                </td>

                <td className="py-3.5 text-gray-600">
                  {item.category?.name || "N/A"}
                </td>

                <td className="py-3.5">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      item.type === "income"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.type}
                  </span>
                </td>

                <td
                  className={`py-3.5 font-bold ${
                    item.type === "income" ? "text-green-600" : "text-gray-900"
                  }`}
                >
                  {item.type === "income" ? "+" : "-"}
                  {formatCurrency(item.amount, currency)}
                </td>

                <td className="py-3.5 text-gray-500">
                  {formatDate(item.date)}
                </td>

                <td className="py-3.5">
                  <div className="flex justify-center items-center gap-1">
                    <EditTransactionDialog
                      transaction={item}
                      onSuccess={onRefresh}
                    />

                    <button
                      onClick={() => deleteTransaction(item._id)}
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
    </Card>
  );
}