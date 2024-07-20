"use client";

//hooks
import { useUser } from "@/hooks/use-user";
import { useTransactions } from "@/hooks/use-transactions";

//components
import TransactionItem from "@/components/Pages/TransactionHistoryList/TransactionItem";

export default function TransactionHistoryList() {
  const user = useUser();

  const transactions = useTransactions(user?.uid);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center my-4">
        Transaction History
      </h2>
      <ul className="divide-y divide-gray-200">
        {transactions.map((transaction, index) => {
          return <TransactionItem key={index} transaction={transaction} />;
        })}
      </ul>
    </div>
  );
}
