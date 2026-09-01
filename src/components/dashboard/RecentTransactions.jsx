"use client";

import api from "@/lib/api";
import EditTransactionDialog from "./EditTransactionDialog";
import { Card } from "@/components/ui/Card";

export default function RecentTransactions({ transactions }) {
  async function deleteTransaction(id) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/transactions/${id}`);

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to delete transaction.");
    }
  }

  if (!transactions || transactions.length === 0) {
    return (
      <Card className="p-8">
        <h2 className="text-2xl font-semibold">
          Recent Transactions
        </h2>

        <div className="flex items-center justify-center h-40 text-gray-500">
          No transactions found.
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-6">
        Recent Transactions
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left">
              <th className="py-3">Title</th>
              <th className="py-3">Category</th>
              <th className="py-3">Type</th>
              <th className="py-3">Amount</th>
              <th className="py-3">Date</th>
              <th className="py-3 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((item) => (
              <tr
                key={item._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-4">
                  {item.title}
                </td>

                <td className="py-4">
                  {item.category?.name || "N/A"}
                </td>

                <td className="py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      item.type === "income"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.type}
                  </span>
                </td>

                <td className="py-4 font-semibold">
                  ₹{item.amount}
                </td>

                <td className="py-4">
                  {new Date(item.date).toLocaleDateString()}
                </td>

                <td className="py-4">
                  <div className="flex justify-center gap-3">
                    <EditTransactionDialog
                      transaction={item}
                    />

                    <button
                      onClick={() =>
                        deleteTransaction(item._id)
                      }
                      className="text-red-500 hover:text-red-700 font-medium"
                    >
                      Delete
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