import { useState, useEffect } from "react";
import { fetchTransactionHistory } from "@/services/firestore/firestoreServices";
import { Transaction } from "@/types/transaction";

export const useTransactions = (userId: string | undefined) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            if (!userId) return;
            const fetchedTransactions = await fetchTransactionHistory(userId);
            setTransactions(fetchedTransactions);
        };

        fetchTransactions();
    }, [userId]);

    return transactions;
};