'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TransactionForm() {
  const [form, setForm] = useState({
    description: "",
    amount: "",
    date: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", form); // replace with API call
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-xl">
      <div>
        <Label>Description</Label>
        <Input name="description" value={form.description} onChange={handleChange} required />
      </div>
      <div>
        <Label>Amount</Label>
        <Input type="number" name="amount" value={form.amount} onChange={handleChange} required />
      </div>
      <div>
        <Label>Date</Label>
        <Input type="date" name="date" value={form.date} onChange={handleChange} required />
      </div>
      <Button type="submit">Add Transaction</Button>
    </form>
  );
}
