"use client";

import { useEffect, useState } from "react";

import api from "@/lib/api";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/Card";

import { Input } from "@/components/ui/Input";

import EditTransactionDialog from "@/components/dashboard/EditTransactionDialog";

import { Search, Trash2 } from "lucide-react";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    try {
      const { data } = await api.get("/transactions");
      setTransactions(data.transactions);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteTransaction(id) {
    if (!confirm("Delete transaction?")) return;

    try {
      await api.delete(`/transactions/${id}`);
      fetchTransactions();
    } catch (error) {
      console.error(error);
    }
  }

  const filteredTransactions =
    transactions.filter((transaction) =>
      transaction.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div className="space-y-6">

      <Card>

        <CardHeader>

          <CardTitle>

            All Transactions

          </CardTitle>

        </CardHeader>

        <CardContent>

          <div className="relative mb-6">

            <Search
              className="absolute left-3 top-3"
              size={18}
            />

            <Input
              className="pl-10"
              placeholder="Search Transactions..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="text-left py-3">
                    Title
                  </th>

                  <th>Category</th>

                  <th>Type</th>

                  <th>Amount</th>

                  <th>Date</th>

                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>

                {filteredTransactions.map(
                  (transaction) => (

                    <tr
                      key={transaction._id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="py-4">

                        {transaction.title}

                      </td>

                      <td>

                        {transaction.category?.name}

                      </td>

                      <td>

                        <span
                          className={`px-3 py-1 rounded-full text-sm

                          ${
                            transaction.type ===
                            "income"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }
                          `}
                        >

                          {transaction.type}

                        </span>

                      </td>

                      <td>

                        ₹
                        {transaction.amount}

                      </td>

                      <td>

                        {new Date(
                          transaction.date
                        ).toLocaleDateString()}

                      </td>

                      <td>

                        <div className="flex justify-center gap-3">

                          <EditTransactionDialog
                            transaction={transaction}
                          />

                          <button
                            onClick={() =>
                              deleteTransaction(
                                transaction._id
                              )
                            }
                          >

                            <Trash2
                              size={18}
                              className="text-red-500"
                            />

                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </CardContent>

      </Card>

    </div>
  );
}