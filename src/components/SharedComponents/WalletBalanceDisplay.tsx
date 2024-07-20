import { useUser } from "@/hooks/use-user";
import { useWalletBalance } from "@/services/firestore/firestoreServices";

const WalletBalanceDisplay = () => {
  const user = useUser();
  const userId = user ? user.uid : null;
  const walletBalance = useWalletBalance(userId);

  if (!user) return null;

  return (
    <div className="flex justify-center">
      <div className="bg-blue-100 p-4 rounded-lg shadow-md flex items-center justify-center w-36">
        <span className="text-gray-700 font-medium">Wallet Balance:</span>
        <span className="text-green-600 font-bold">{walletBalance}</span>
      </div>
    </div>
  );
};

export default WalletBalanceDisplay;
