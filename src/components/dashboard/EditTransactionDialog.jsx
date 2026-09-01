"use client";

import { useState } from "react";
import api from "@/lib/api";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function EditTransactionDialog({
  transaction,
}) {
  const [title, setTitle] = useState(transaction.title);
  const [amount, setAmount] = useState(transaction.amount);

  async function updateTransaction() {
    try {
      await api.put(`/transactions/${transaction._id}`, {
        ...transaction,
        title,
        amount,
      });

      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-blue-500">
          Edit
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Edit Transaction
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <input
            className="border p-2 rounded w-full"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <input
            className="border p-2 rounded w-full"
            type="number"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
          />

          <button
            onClick={updateTransaction}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}