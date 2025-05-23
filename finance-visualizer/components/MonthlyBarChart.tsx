'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", total: 400 },
  { month: "Feb", total: 900 },
  { month: "Mar", total: 600 },
];

export default function MonthlyBarChart() {
  return (
    <div className="p-4 border rounded-xl h-[300px]">
      <h2 className="text-xl font-bold mb-2">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
