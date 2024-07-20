import React from "react";
import purchasableItems from "@/data/purchasableItems";
import { Transaction } from "@/types/transaction";

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const item = purchasableItems.find((item) => item.id === transaction.itemId);

  return (
    <li className="py-4">
      {item ? (
        <>
          <div className="font-semibold text-lg">{item.name}</div>
          <div className="text-gray-600">
            Item Description: {item.description}
          </div>
          <div className="text-gray-600">Item Price: {item.price}</div>
          <div className="text-sm text-gray-500">
            Quantity: {transaction.amount}, Total Amount:{" "}
            {transaction.totalAmount}, Timestamp:{" "}
            {new Date(transaction.timestamp).toLocaleString()}
          </div>
        </>
      ) : (
        <div className="text-red-500">
          Item ID: {transaction.itemId} (Item not found)
        </div>
      )}
    </li>
  );
};

export default TransactionItem;
