"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TransactionFormProps {
  onAdd: (amount: string, date: string, description: string) => void;
}

export default function TransactionForm({ onAdd }: TransactionFormProps) {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Please enter a valid positive amount.");
      return;
    }
    if (!date) {
      setError("Please select a date.");
      return;
    }
    if (!description.trim()) {
      setError("Please enter a description.");
      return;
    }

    setError("");
    onAdd(amount, date, description);

    // Reset form
    setAmount("");
    setDate("");
    setDescription("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        step="0.01"
      />
      <Input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      {error && (
        <p className="text-red-600 text-sm font-medium">{error}</p>
      )}
      <Button type="submit">Add Transaction</Button>
    </form>
  );
}
