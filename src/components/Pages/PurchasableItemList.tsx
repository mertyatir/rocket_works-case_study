"use client";

import purchasableItems from "@/data/purchasableItems";
import { PurchasableItem } from "@/types/purchasableItem";

//hooks
import { useUser } from "@/hooks/use-user";
import { postTransaction } from "@/services/api/apiServices";

import WalletBalanceDisplay from "@/components/SharedComponents/WalletBalanceDisplay";

export default function ItemsPage() {
  const user = useUser();

  const handlePurchase = async (item: PurchasableItem) => {
    if (!user) {
      console.error("User not logged in");
      return;
    }
    const idToken = await user.getIdToken();
    const data = await postTransaction(item, 1, idToken);
    if (!data.error) {
      alert(`Successfully purchased ${item.name}`);
    } else alert(data.error);
  };
  return (
    <>
      <div className="mt-12">
        <WalletBalanceDisplay />
      </div>
      <div className="flex flex-wrap justify-center gap-4 p-4 mt-12">
        {purchasableItems.map((item) => (
          <div
            key={item.id}
            className="max-w-sm rounded overflow-hidden shadow-lg bg-white"
          >
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{item.name}</div>
              <p className="text-gray-700 text-base">{item.description}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <div className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                <button onClick={() => handlePurchase(item)}>
                  Buy for {item.price}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
