import { db } from './config';
import { logger } from 'firebase-functions';



class FirestoreService {
    private static instance: FirestoreService;
    private constructor() { }

    public static getInstance(): FirestoreService {
        if (!FirestoreService.instance) {
            FirestoreService.instance = new FirestoreService();
        }
        return FirestoreService.instance;
    }

    /**
     * generate token.
     * returning a promise token after calling the gateway
     */
    setWalletBalance = async (userId: string, amount: number) => {
        const walletRef = db.doc(`walletBalances/${userId}`);

        const walletSnap = await walletRef.get();

        if (walletSnap.exists) {
            const walletData = walletSnap.data();
            if (walletData) {
                await walletRef.update({
                    balance: +walletData.balance + +amount,
                    lastUpdated: new Date().toISOString()
                });
            }
            else {
                logger.error('walletSnap.data() is null');
            }

        } else {
            await walletRef.set({
                balance: amount,
                lastUpdated: new Date().toISOString()
            });
        }
    }


    // Update the user's wallet balance
    updateWalletBalance = async (userId: string, totalAmount: number) => {
        const walletRef = db.doc(`walletBalances/${userId}`);

        const walletSnap = await walletRef.get();

        if (!walletSnap.exists) {
            return { error: 'User wallet balance not found.' };
        }
        const walletData = walletSnap.data();
        if (!walletData) {
            return { error: 'User wallet balance data not found.' };
        }
        if (walletData.balance < totalAmount) {
            return { error: 'Insufficient funds.' };
        }

        try {
            await walletRef.update({
                balance: walletData.balance - totalAmount,
                lastUpdated: new Date().toISOString()
            });
        } catch (e) {
            return { error: e instanceof Error ? e.message : String(e) };
        }


        return { success: true }
    }

    // Add the transaction to the user's transaction history
    addTransaction = async (userId: string, itemId: string, amount: number, totalAmount: number) => {
        try {
            const transactionRef = db.collection(`transactions/${userId}/history`).doc();
            await transactionRef.set({
                itemId: itemId,
                amount: amount,
                totalAmount: totalAmount,
                timestamp: new Date().toISOString()
            });
        } catch (e) {
            return { error: e instanceof Error ? e.message : String(e) };
        }
        return { success: true };
    }
}

export const firestoreService = FirestoreService.getInstance();