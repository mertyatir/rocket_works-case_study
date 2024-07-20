import { PurchasableItem } from "@/types/purchasableItem";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


export const fetchClientToken = async () => {
    try {
        const response = await fetch(
            `${BASE_URL}/client_token`,
        );
        const data = await response.json();
        if (data && data.token) {
            return data.token.clientToken;
        } else {
            console.error("Failed to fetch client token");
            return null;
        }
    } catch (error) {
        console.error("Error fetching client token:", error);
        return null;
    }
};

export const postSale = async (paymentMethodNonce: string, amount: number, idToken: string) => {
    try {
        const response = await
            fetch(
                `${BASE_URL}/sale`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${idToken}`,
                    },
                    body: JSON.stringify({
                        nonce: paymentMethodNonce,
                        amount: amount,
                    }),
                }
            );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error posting sale:", error);
    }
}

export const postTransaction = async (item: PurchasableItem, amount: number = 1, idToken: string) => {

    try {
        const response = await fetch(
            `${BASE_URL}/transactions`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${idToken}`,
                },
                body: JSON.stringify({
                    itemId: item.id,
                    amount: amount,
                }),
            }
        );

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error posting transaction:", error);
        return null;
    }

}