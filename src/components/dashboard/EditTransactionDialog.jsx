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

import { Button } from "@/components/ui/Button";

export default function EditTransactionDialog({
  transaction,
}) {
  const [title, setTitle] = useState(transaction.title);
  const [amount, setAmount] = useState(transaction.amount);

  async function updateTransaction() {
    try {
      await api.put(`/transactions/${transaction._id}`, {
        title: title,
        amount: Number(amount),
        type: transaction.type,
        category:
          typeof transaction.category === "object"
            ? transaction.category._id
            : transaction.category,
        note: transaction.note || "",
        date: transaction.date,
      });

      window.location.reload();
    } catch (err) {
      console.error("Update Transaction Error:", err);

      if (err.response) {
        console.error("Server response:", err.response.data);
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger
        render={
          <button className="text-blue-500">
            Edit
          </button>
        }
      />

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

          <Button
            onClick={updateTransaction}
            className="w-full"
          >
            Update
          </Button>

        </div>
      </DialogContent>
    </Dialog>
  );
}