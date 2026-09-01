"use client";

import { useEffect, useState, useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import api from "@/lib/api";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function TransactionForm({ onSuccess }) {
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      title: "",
      amount: "",
      type: "expense",
      category: "",
      date: new Date().toISOString().split("T")[0],
      note: "",
    },
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const selectedType = useWatch({ control, name: "type" });

  const fetchCategories = useCallback(async () => {
    try {
      const { data } = await api.get("/categories");
      setCategories(data.categories || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load categories");
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const filteredCategories = categories.filter(
    (cat) => !cat.type || cat.type === selectedType
  );

  async function onSubmit(data) {
    setLoading(true);
    try {
      await api.post("/transactions", {
        ...data,
        amount: Number(data.amount),
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      });

      toast.success("Transaction added successfully!");
      reset();

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add transaction.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
      <div>
        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1">
          Title
        </label>
        <Input
          placeholder="e.g. Salary, Electricity Bill, Groceries"
          {...register("title", { required: true })}
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
            placeholder="0.00"
            {...register("amount", { required: true })}
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1">
            Type
          </label>
          <select
            {...register("type")}
            className="w-full border rounded-lg p-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
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
            {...register("category", { required: true })}
            className="w-full border rounded-lg p-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Select Category</option>
            {(filteredCategories.length > 0 ? filteredCategories : categories).map(
              (category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              )
            )}
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1">
            Date
          </label>
          <Input type="date" {...register("date")} />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1">
          Notes (Optional)
        </label>
        <textarea
          {...register("note")}
          rows={3}
          placeholder="Add extra context or descriptions..."
          className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <Button className="w-full mt-2" type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Transaction"}
      </Button>
    </form>
  );
}