export interface BraintreeDropInProps {
    amount: number;
    show: boolean;
    onPaymentCompleted: () => void;
}