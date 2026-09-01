"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/Button";
import TransactionForm from "../forms/TransactionForm";

export default function AddTransactionButton({ onTransactionAdded }) {
  const [open, setOpen] = useState(false);

  function handleSuccess() {
    setOpen(false);
    if (onTransactionAdded) {
      onTransactionAdded();
    } else {
      window.dispatchEvent(new CustomEvent("transaction:updated"));
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            className="fixed bottom-8 right-8 rounded-full h-14 w-14 shadow-xl hover:scale-105 transition-transform bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center border-0 z-40"
            aria-label="Add Transaction"
          >
            <Plus size={24} />
          </Button>
        }
      />

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Transaction</DialogTitle>
        </DialogHeader>

        <TransactionForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
}