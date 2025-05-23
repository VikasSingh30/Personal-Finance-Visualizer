import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import MonthlyBarChart from "@/components/MonthlyBarChart";

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto space-y-6 py-8">
      <h1 className="text-3xl font-bold text-center">Personal Finance Visualizer</h1>
      <TransactionForm />
      <TransactionList />
      <MonthlyBarChart />
    </main>
  );
}
