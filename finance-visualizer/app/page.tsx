"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import ExpenseChart from "@/components/ExpenseChart";
import { format } from "date-fns";

export interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
  category: string;
}

const categories = ["Food", "Rent", "Transport", "Entertainment", "Utilities", "Other"];

export default function HomePage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (
    amount: string,
    date: string,
    description: string,
    category: string
  ) => {
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      amount: parseFloat(amount),
      date,
      description,
      category,
    };
    setTransactions([...transactions, newTransaction]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const monthlyData = transactions.reduce((acc, t) => {
    const month = format(new Date(t.date), "yyyy-MM");
    const existing = acc.find((item) => item.month === month);
    if (existing) {
      existing.total += t.amount;
    } else {
      acc.push({ month, total: t.amount });
    }
    return acc;
  }, [] as { month: string; total: number }[]);

  const categoryData = categories.map((cat) => {
    const total = transactions
      .filter((t) => t.category === cat)
      .reduce((sum, t) => sum + t.amount, 0);
    return { category: cat, total };
  });

  return (
    <main className="p-4 max-w-3xl mx-auto space-y-6">
      <Card>
        <CardContent className="p-4">
          <TransactionForm onAdd={addTransaction} categories={categories} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <TransactionList transactions={transactions} onDelete={deleteTransaction} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
          <ExpenseChart data={monthlyData} xKey="month" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-4">Category Breakdown</h2>
          <ExpenseChart data={categoryData} xKey="category" />
        </CardContent>
      </Card>
    </main>
  );
}
