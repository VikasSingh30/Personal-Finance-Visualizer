// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { format, startOfWeek, endOfWeek } from "date-fns";
import { Progress } from "@/components/ui/progress";

interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
  category: string;
}

const categories = ["Food", "Rent", "Transport", "Entertainment", "Utilities", "Other"];

export default function HomePage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [budgets, setBudgets] = useState<{ [key: string]: number }>({});

  const addTransaction = () => {
    if (!amount || !date || !description || !category) {
      setError("All fields are required.");
      return;
    }
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      amount: parseFloat(amount),
      date,
      description,
      category,
    };
    setTransactions([...transactions, newTransaction]);
    setAmount("");
    setDate("");
    setDescription("");
    setCategory("");
    setError("");
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const updateBudget = (category: string, value: number) => {
    setBudgets({ ...budgets, [category]: value });
  };

  const monthlyData = transactions.reduce((acc, transaction) => {
    const month = format(new Date(transaction.date), "yyyy-MM");
    const existing = acc.find(item => item.month === month);
    if (existing) {
      existing.total += transaction.amount;
    } else {
      acc.push({ month, total: transaction.amount });
    }
    return acc;
  }, [] as { month: string; total: number }[]);

  const weeklyData = transactions.reduce((acc, transaction) => {
    const start = format(startOfWeek(new Date(transaction.date)), "yyyy-MM-dd");
    const end = format(endOfWeek(new Date(transaction.date)), "yyyy-MM-dd");
    const label = `${start} to ${end}`;
    const existing = acc.find(item => item.week === label);
    if (existing) {
      existing.total += transaction.amount;
    } else {
      acc.push({ week: label, total: transaction.amount });
    }
    return acc;
  }, [] as { week: string; total: number }[]);

  const categoryData = categories.map(cat => {
    const total = transactions
      .filter(t => t.category === cat)
      .reduce((sum, t) => sum + t.amount, 0);
    return { category: cat, total, budget: budgets[cat] || 0 };
  });

  return (
    <main className="p-4 max-w-3xl mx-auto space-y-6">
      <Card>
        <CardContent className="p-4 space-y-4">
          <h2 className="text-xl font-semibold">Add Transaction</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
            <Input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button onClick={addTransaction}>Add</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 space-y-2">
          <h2 className="text-xl font-semibold">Transactions</h2>
          {transactions.map(transaction => (
            <div key={transaction.id} className="flex justify-between border-b py-2">
              <span>
                {transaction.description} - ${transaction.amount} on {transaction.date} [{transaction.category}]
              </span>
              <Button variant="destructive" onClick={() => deleteTransaction(transaction.id)}>Delete</Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-4">Weekly Summary</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <XAxis dataKey="week" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-4">Category Budgets</h2>
          <div className="space-y-4">
            {categoryData.map(data => (
              <div key={data.category} className="space-y-2">
                <div className="flex justify-between">
                  <p className="font-medium">{data.category}</p>
                  <p className="text-sm">${data.total.toFixed(2)} / ${data.budget.toFixed(2)}</p>
                </div>
                <Progress
                  value={data.budget > 0 ? Math.min((data.total / data.budget) * 100, 100) : 0}
                  className={data.total > data.budget ? "bg-red-500" : "bg-green-500"}
                />
                <Input
                  type="number"
                  placeholder="Set Budget"
                  value={budgets[data.category] || ""}
                  onChange={(e) => updateBudget(data.category, parseFloat(e.target.value))}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}



// "use client";

// import { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import TransactionForm from "@/components/TransactionForm";
// import TransactionList from "@/components/TransactionList";
// import ExpenseChart from "@/components/ExpenseChart";
// import { format } from "date-fns";

// export interface Transaction {
//   id: string;
//   amount: number;
//   date: string;
//   description: string;
//   category: string;
// }

// const categories = ["Food", "Rent", "Transport", "Entertainment", "Utilities", "Other"];

// export default function HomePage() {
//   const [transactions, setTransactions] = useState<Transaction[]>([]);

//   const addTransaction = (
//     amount: string,
//     date: string,
//     description: string,
//     category: string
//   ) => {
//     const newTransaction: Transaction = {
//       id: crypto.randomUUID(),
//       amount: parseFloat(amount),
//       date,
//       description,
//       category,
//     };
//     setTransactions([...transactions, newTransaction]);
//   };

//   const deleteTransaction = (id: string) => {
//     setTransactions(transactions.filter((t) => t.id !== id));
//   };

//   const monthlyData = transactions.reduce((acc, t) => {
//     const month = format(new Date(t.date), "yyyy-MM");
//     const existing = acc.find((item) => item.month === month);
//     if (existing) {
//       existing.total += t.amount;
//     } else {
//       acc.push({ month, total: t.amount });
//     }
//     return acc;
//   }, [] as { month: string; total: number }[]);

//   const categoryData = categories.map((cat) => {
//     const total = transactions
//       .filter((t) => t.category === cat)
//       .reduce((sum, t) => sum + t.amount, 0);
//     return { category: cat, total };
//   });

//   return (
//     <main className="p-4 max-w-3xl mx-auto space-y-6">
//       <Card>
//         <CardContent className="p-4">
//           <TransactionForm onAdd={addTransaction} categories={categories} />
//         </CardContent>
//       </Card>

//       <Card>
//         <CardContent className="p-4">
//           <TransactionList transactions={transactions} onDelete={deleteTransaction} />
//         </CardContent>
//       </Card>

//       <Card>
//         <CardContent className="p-4">
//           <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
//           <ExpenseChart data={monthlyData} xKey="month" />
//         </CardContent>
//       </Card>

//       <Card>
//         <CardContent className="p-4">
//           <h2 className="text-xl font-semibold mb-4">Category Breakdown</h2>
//           <ExpenseChart data={categoryData} xKey="category" />
//         </CardContent>
//       </Card>
//     </main>
//   );
// }
