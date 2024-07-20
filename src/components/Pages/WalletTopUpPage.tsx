//components
import BraintreeDropIn from "@/components/Pages/WalletTopUpPage/BraintreeDropIn";
import WalletBalanceDisplay from "../SharedComponents/WalletBalanceDisplay";
import TopUpForm from "./WalletTopUpPage/TopUpForm";

//hooks
import { useState } from "react";

export default function WalletTopUpPage() {
  const [showBraintreeDropIn, setShowBraintreeDropIn] = useState(false);
  const [amountToAdd, setAmountToAdd] = useState(0);

  return (
    <>
      <div className="mt-12">
        <WalletBalanceDisplay />
      </div>
      <TopUpForm
        amountToAdd={amountToAdd}
        setAmountToAdd={setAmountToAdd}
        showBraintreeDropIn={showBraintreeDropIn}
        setShowBraintreeDropIn={setShowBraintreeDropIn}
      />
      <BraintreeDropIn
        show={showBraintreeDropIn}
        amount={amountToAdd}
        onPaymentCompleted={() => {
          setShowBraintreeDropIn(false);
          setAmountToAdd(0);
        }}
      />
    </>
  );
}
