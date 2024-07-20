// config
import { db } from "@/libs/firebase/config";

// firestore
import { doc, onSnapshot, collection, query, orderBy, getDocs } from "firebase/firestore";

//hooks
import { useState, useEffect } from "react";

//types
import { Transaction } from "@/types/transaction";


export function useWalletBalance(userId: string | null) {
    const [walletBalance, setWalletBalance] = useState<number>(0);

    useEffect(() => {
        const docRef = doc(db, `walletBalances/${userId}`);
        const unsubscribe = onSnapshot(docRef, (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                setWalletBalance(data.balance);
            } else {
                console.log("No such document!");
            }
        }, (error) => {
            console.error("Error fetching wallet balance:", error);

        });
        return () => unsubscribe();
    }, [userId]);

    return walletBalance
}


export async function fetchTransactionHistory(userId: string) {
    const transactionsRef = collection(db, `transactions/${userId}/history`);
    const q = query(transactionsRef, orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    const transactions = snapshot.docs.map((doc) =>
        doc.data()
    ) as Transaction[];
    return transactions;
}

