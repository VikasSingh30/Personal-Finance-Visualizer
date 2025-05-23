'use client'

type Transaction = {
  id: string;
  description: string;
  amount: number;
  date: string;
};

const dummyTransactions: Transaction[] = [
  { id: "1", description: "Groceries", amount: 45.0, date: "2025-05-01" },
  { id: "2", description: "Rent", amount: 1200, date: "2025-05-03" },
];

export default function TransactionList() {
  return (
    <div className="p-4 border rounded-xl">
      <h2 className="text-xl font-bold mb-2">Transactions</h2>
      <ul className="space-y-2">
        {dummyTransactions.map((txn) => (
          <li key={txn.id} className="flex justify-between border-b pb-1">
            <span>{txn.description}</span>
            <span>₹{txn.amount}</span>
            <span>{txn.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
