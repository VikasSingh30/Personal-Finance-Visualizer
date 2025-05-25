
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

