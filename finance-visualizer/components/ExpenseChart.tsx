// // components/ExpenseChart.tsx
// "use client";

// import { Transaction } from "@/app/page";
// import { Card, CardContent } from "@/components/ui/card";
// import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
// import { format } from "date-fns";

// interface Props {
//   transactions: Transaction[];
//   categories: string[];
// }

// export default function ExpenseChart({ transactions, categories }: Props) {
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

//   const categoryData = categories.map(cat => {
//     const total = transactions
//       .filter(t => t.category === cat)
//       .reduce((sum, t) => sum + t.amount, 0);
//     return { category: cat, total };
//   });

//   return (
//     <>
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
//           <h2 className="text-xl font-semibold mb-4">Category Breakdown</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={categoryData}>
//               <XAxis dataKey="category" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="total" fill="#82ca9d" />
//             </BarChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>
//     </>
//   );
// }
