"use client";

import { Button } from "@/components/ui/button";

interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
}

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export default function TransactionList({ transactions, onDelete }: TransactionListProps) {
  if (transactions.length === 0) {
    return <p>No transactions yet.</p>;
  }

  return (
    <ul className="space-y-3">
      {transactions.map((t) => (
        <li
          key={t.id}
          className="flex justify-between items-center border rounded p-3"
        >
          <div>
            <p className="font-semibold">${t.amount.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">{t.date}</p>
            <p className="text-sm">{t.description}</p>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(t.id)}
          >
            Delete
          </Button>
        </li>
      ))}
    </ul>
  );
}
