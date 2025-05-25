
// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
// import { format, startOfWeek, endOfWeek } from "date-fns";
// import { Progress } from "@/components/ui/progress";

// interface Transaction {
//   id: string;
//   amount: number;
//   date: string;
//   description: string;
//   category: string;
// }

// const categories = ["Food", "Rent", "Transport", "Entertainment", "Utilities", "Other"];

// export default function HomePage() {
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [amount, setAmount] = useState("");
//   const [date, setDate] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [error, setError] = useState("");
//   const [budgets, setBudgets] = useState<{ [key: string]: number }>({});

//   const addTransaction = () => {
//     if (!amount || !date || !description || !category) {
//       setError("All fields are required.");
//       return;
//     }
//     const newTransaction: Transaction = {
//       id: crypto.randomUUID(),
//       amount: parseFloat(amount),
//       date,
//       description,
//       category,
//     };
//     setTransactions([...transactions, newTransaction]);
//     setAmount("");
//     setDate("");
//     setDescription("");
//     setCategory("");
//     setError("");
//   };

//   const deleteTransaction = (id: string) => {
//     setTransactions(transactions.filter(t => t.id !== id));
//   };

//   const updateBudget = (category: string, value: number) => {
//     setBudgets({ ...budgets, [category]: value });
//   };

//   const monthlyData = transactions.reduce((acc, transaction) => {
//     const month = format(new Date(transaction.date), "yyyy-MM");
//     const existing = acc.find(item => item.month === month);
//     if (existing) {
//       existing.total += transaction.amount;
//     } else {
//       acc.push({ month, total: transaction.amount });
//     }
//     return acc;
//   }, [] as { month: string; total: number }[]);

//   const weeklyData = transactions.reduce((acc, transaction) => {
//     const start = format(startOfWeek(new Date(transaction.date)), "yyyy-MM-dd");
//     const end = format(endOfWeek(new Date(transaction.date)), "yyyy-MM-dd");
//     const label = `${start} to ${end}`;
//     const existing = acc.find(item => item.week === label);
//     if (existing) {
//       existing.total += transaction.amount;
//     } else {
//       acc.push({ week: label, total: transaction.amount });
//     }
//     return acc;
//   }, [] as { week: string; total: number }[]);

//   const categoryData = categories.map(cat => {
//     const total = transactions
//       .filter(t => t.category === cat)
//       .reduce((sum, t) => sum + t.amount, 0);
//     return { category: cat, total, budget: budgets[cat] || 0 };
//   });

//   return (
//     <main className="p-4 max-w-3xl mx-auto space-y-6">
//       <Card>
//         <CardContent className="p-4 space-y-4">
//           <h2 className="text-xl font-semibold">Add Transaction</h2>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <Input
//               type="number"
//               placeholder="Amount"
//               value={amount}
//               onChange={e => setAmount(e.target.value)}
//             />
//             <Input
//               type="date"
//               value={date}
//               onChange={e => setDate(e.target.value)}
//             />
//             <Input
//               type="text"
//               placeholder="Description"
//               value={description}
//               onChange={e => setDescription(e.target.value)}
//             />
//             <Select value={category} onValueChange={setCategory}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select Category" />
//               </SelectTrigger>
//               <SelectContent>
//                 {categories.map(cat => (
//                   <SelectItem key={cat} value={cat}>{cat}</SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           <Button onClick={addTransaction}>Add</Button>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardContent className="p-4 space-y-2">
//           <h2 className="text-xl font-semibold">Transactions</h2>
//           {transactions.map(transaction => (
//             <div key={transaction.id} className="flex justify-between border-b py-2">
//               <span>
//                 {transaction.description} - ${transaction.amount} on {transaction.date} [{transaction.category}]
//               </span>
//               <Button variant="destructive" onClick={() => deleteTransaction(transaction.id)}>Delete</Button>
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       <Card>
//         <CardContent className="p-4">
//           <h2 className="text-xl font-semibold mb-4">Weekly Summary</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={weeklyData}>
//               <XAxis dataKey="week" hide />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="total" fill="#ffc658" />
//             </BarChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardContent className="p-4">
//           <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={monthlyData}>
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="total" fill="#8884d8" />
//             </BarChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardContent className="p-4">
//           <h2 className="text-xl font-semibold mb-4">Category Budgets</h2>
//           <div className="space-y-4">
//             {categoryData.map(data => (
//               <div key={data.category} className="space-y-2">
//                 <div className="flex justify-between">
//                   <p className="font-medium">{data.category}</p>
//                   <p className="text-sm">${data.total.toFixed(2)} / ${data.budget.toFixed(2)}</p>
//                 </div>
//                 <Progress
//                   value={data.budget > 0 ? Math.min((data.total / data.budget) * 100, 100) : 0}
//                   className={data.total > data.budget ? "bg-red-500" : "bg-green-500"}
//                 />
//                 <Input
//                   type="number"
//                   placeholder="Set Budget"
//                   value={budgets[data.category] || ""}
//                   onChange={(e) => updateBudget(data.category, parseFloat(e.target.value))}
//                 />
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </main>
//   );
// }

/* === File: app/page.tsx === */
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { format, parseISO } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

const categories = ['Food', 'Transport', 'Bills', 'Entertainment', 'Other'];
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#d0ed57'];

type Transaction = {
  id: string;
  amount: number;
  date: string;
  description: string;
  category: string;
};

type Budget = {
  category: string;
  amount: number;
};

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [form, setForm] = useState({ amount: '', date: '', description: '', category: '', id: '' });
  const [budgets, setBudgets] = useState<Budget[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('transactions');
    if (stored) setTransactions(JSON.parse(stored));
    const storedBudgets = localStorage.getItem('budgets');
    if (storedBudgets) setBudgets(JSON.parse(storedBudgets));
  }, []);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('budgets', JSON.stringify(budgets));
  }, [budgets]);

  const handleSubmit = () => {
    if (!form.amount || !form.date || !form.category) return alert('Amount, date, and category are required');
    const newTx: Transaction = {
      id: form.id || uuidv4(),
      amount: parseFloat(form.amount),
      date: form.date,
      description: form.description,
      category: form.category,
    };
    setTransactions((prev) => {
      const filtered = prev.filter((tx) => tx.id !== newTx.id);
      return [...filtered, newTx].sort((a, b) => b.date.localeCompare(a.date));
    });
    setForm({ amount: '', date: '', description: '', category: '', id: '' });
  };

  const editTx = (tx: Transaction) => {
    setForm({ ...tx, amount: tx.amount.toString() });
  };

  const deleteTx = (id: string) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  const monthlyData = transactions.reduce<Record<string, number>>((acc, tx) => {
    const key = tx.date.slice(0, 7);
    acc[key] = (acc[key] || 0) + tx.amount;
    return acc;
  }, {});

  const chartData = Object.entries(monthlyData).map(([month, total]) => ({ month, total }));

  const categoryData = categories.map((cat) => ({
    name: cat,
    value: transactions.filter((tx) => tx.category === cat).reduce((sum, tx) => sum + tx.amount, 0),
  }));

  const handleBudgetChange = (category: string, value: string) => {
    const newBudget = { category, amount: parseFloat(value) || 0 };
    setBudgets((prev) => {
      const others = prev.filter((b) => b.category !== category);
      return [...others, newBudget];
    });
  };

  const getBudget = (category: string) => budgets.find((b) => b.category === category)?.amount || 0;
  const getSpent = (category: string) => categoryData.find((d) => d.name === category)?.value || 0;

  return (
    <main className="max-w-5xl mx-auto p-4 space-y-6">
      <h1 className="text-4xl font-extrabold text-center text-primary mb-6">Personal Finance Tracker</h1>

      <Card>
        <CardContent className="space-y-4 pt-4">
          <div className="grid md:grid-cols-5 gap-4">
            <div>
              <Label>Amount</Label>
              <Input
                type="number"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
              />
            </div>
            <div>
              <Label>Date</Label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div>
              <Label>Category</Label>
              <select
                className="w-full border rounded px-2 py-1"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="">Select</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
          <Button onClick={handleSubmit}>{form.id ? 'Update' : 'Add'} Transaction</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-4 space-y-2">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          {transactions.length === 0 ? (
            <p className="text-muted-foreground">No transactions yet.</p>
          ) : (
            <div className="space-y-2">
              {transactions.slice(0, 5).map((tx) => (
                <div
                  key={tx.id}
                  className="flex justify-between items-center p-2 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">${tx.amount.toFixed(2)} • {tx.category}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(parseISO(tx.date), 'MMM d, yyyy')} — {tx.description || 'No description'}
                    </p>
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => editTx(tx)}>
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => deleteTx(tx.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-4">
            <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#6366f1" name="Total Spent" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <h2 className="text-xl font-semibold mb-4">Spending by Category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-4 space-y-4">
          <h2 className="text-xl font-semibold">Budgets & Insights</h2>
          {categories.map((cat, index) => {
            const budget = getBudget(cat);
            const spent = getSpent(cat);
            const percent = Math.min((spent / budget) * 100 || 0, 100);
            return (
              <div key={cat} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{cat}</span>
                  <span className="text-sm">${spent.toFixed(2)} / ${budget.toFixed(2)}</span>
                </div>
                <Progress value={percent} />
                <Input
                  type="number"
                  placeholder="Set monthly budget"
                  defaultValue={budget}
                  onBlur={(e) => handleBudgetChange(cat, e.target.value)}
                />
              </div>
            );
          })}
        </CardContent>
      </Card>
    </main>
  );
}

