export interface TopUpFormProps {
    amountToAdd: number;
    setAmountToAdd: (amount: number) => void;
    showBraintreeDropIn: boolean;
    setShowBraintreeDropIn: (show: boolean) => void;
}