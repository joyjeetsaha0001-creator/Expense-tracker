"use client";

import { useState } from "react";
import api from "@/lib/api";
import { toast } from "sonner";
import { Pencil } from "lucide-react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function EditTransactionDialog({ transaction, onSuccess }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
    date: "",
    note: "",
  });

  async function handleOpenChange(isOpen) {
    setOpen(isOpen);
    if (isOpen) {
      if (transaction) {
        setFormData({
          title: transaction.title || "",
          amount: transaction.amount || "",
          type: transaction.type || "expense",
          category:
            typeof transaction.category === "object"
              ? transaction.category?._id || ""
              : transaction.category || "",
          date: transaction.date
            ? new Date(transaction.date).toISOString().split("T")[0]
            : "",
          note: transaction.note || "",
        });
      }

      try {
        const { data } = await api.get("/categories");
        setCategories(data.categories || []);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.title || !formData.amount || !formData.category) {
      toast.error("Please fill in title, amount, and category.");
      return;
    }

    setLoading(true);
    try {
      await api.put(`/transactions/${transaction._id}`, {
        title: formData.title,
        amount: Number(formData.amount),
        type: formData.type,
        category: formData.category,
        date: formData.date ? new Date(formData.date).toISOString() : new Date().toISOString(),
        note: formData.note,
      });

      toast.success("Transaction updated successfully!");
      setOpen(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error("Update Transaction Error:", err);
      toast.error(err.response?.data?.message || "Failed to update transaction");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <button
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"
            title="Edit Transaction"
          >
            <Pencil size={18} />
          </button>
        }
      />

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div>
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1">
              Title
            </label>
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="e.g. Groceries, Client Payment"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1">
                Amount
              </label>
              <Input
                type="number"
                step="any"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                placeholder="0.00"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1">
                Type
              </label>
              <select
                className="w-full border rounded-lg p-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1">
                Category
              </label>
              <select
                className="w-full border rounded-lg p-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1">
                Date
              </label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1">
              Note (Optional)
            </label>
            <textarea
              className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              rows={3}
              value={formData.note}
              onChange={(e) =>
                setFormData({ ...formData, note: e.target.value })
              }
              placeholder="Add optional transaction notes..."
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}