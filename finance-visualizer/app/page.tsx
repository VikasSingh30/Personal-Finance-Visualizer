"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import ExpenseChart from "@/components/ExpenseChart";
import { format } from "date-fns";

interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
}

export default function HomePage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (amount: string, date: string, description: string) => {
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      amount: parseFloat(amount),
      date,
      description,
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

  return (
    <main className="p-4 max-w-3xl mx-auto space-y-6">
      <Card>
        <CardContent className="p-4">
          <TransactionForm onAdd={addTransaction} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <TransactionList transactions={transactions} onDelete={deleteTransaction} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <ExpenseChart data={monthlyData} />
        </CardContent>
      </Card>
    </main>
  );
}
