"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import api from "@/lib/api";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function TransactionForm({ onSuccess }) {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const { data } = await api.get("/categories");

      setCategories(data.categories);
    } catch (error) {
      console.error(error);
    }
  }

  async function onSubmit(data) {
    try {
      await api.post("/transactions", {
        ...data,
        amount: Number(data.amount),
      });

      reset();

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add transaction.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <Input
        placeholder="Title"
        {...register("title")}
      />

      <Input
        type="number"
        placeholder="Amount"
        {...register("amount")}
      />

      <select
        {...register("type")}
        className="w-full border rounded-md p-2"
      >
        <option value="">
          Select Type
        </option>

        <option value="income">
          Income
        </option>

        <option value="expense">
          Expense
        </option>
      </select>

      <select
        {...register("category")}
        className="w-full border rounded-md p-2"
      >
        <option value="">
          Select Category
        </option>

        {categories.map((category) => (
          <option
            key={category._id}
            value={category._id}
          >
            {category.name}
          </option>
        ))}
      </select>

      <Input
        type="date"
        {...register("date")}
      />

      <textarea
        {...register("note")}
        rows={4}
        placeholder="Notes (Optional)"
        className="w-full border rounded-md p-2"
      />

      <Button
        className="w-full"
        type="submit"
      >
        Save Transaction
      </Button>
    </form>
  );
}