import { TopUpFormProps } from "@/types/topUpFormProps";

const TopUpForm: React.FC<TopUpFormProps> = ({
  amountToAdd,
  setAmountToAdd,
  showBraintreeDropIn,
  setShowBraintreeDropIn,
}) => {
  return (
    <div className="container mx-auto h-full flex flex-col mt-10">
      <div className="col">
        <div className="flex justify-center mb-4">
          <div className="text-right pr-3">{"Amount to Add to Wallet:"}</div>
          <div>
            <input
              className="input border rounded text-black w-full"
              placeholder="Enter amount"
              min={1}
              type="number"
              step="1"
              value={amountToAdd}
              onChange={(e) => setAmountToAdd(+e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowBraintreeDropIn(true)}
            disabled={showBraintreeDropIn || amountToAdd <= 0}
          >
            {"Add Funds"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopUpForm;
