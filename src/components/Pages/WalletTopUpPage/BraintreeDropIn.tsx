"use client";

//components
import dropin from "braintree-web-drop-in";
import { Button } from "reactstrap";

//services
import { fetchClientToken, postSale } from "@/services/api/apiServices";

//hooks
import { useUser } from "@/hooks/use-user";
import React, { useEffect, useState } from "react";

//types
import { BraintreeDropInProps } from "@/types/braintreeProps";

export default function BraintreeDropIn(props: BraintreeDropInProps) {
  const { amount, show, onPaymentCompleted } = props;

  const [braintreeInstance, setBraintreeInstance] = useState<
    dropin.Dropin | undefined
  >(undefined);
  const [clientToken, setClientToken] = useState(undefined);

  const user = useUser();

  useEffect(() => {
    if (show) {
      const fetchAndSetClientToken = async () => {
        const clientToken = await fetchClientToken(); // Wait for the promise to resolve
        setClientToken(clientToken); // Set the state with the resolved value
      };
      fetchAndSetClientToken();
    }
  }, [show]);

  useEffect(() => {
    if (show && clientToken) {
      // Ensure clientToken is available
      const initializeBraintree = () =>
        dropin.create(
          {
            authorization: clientToken, // Use the fetched client token
            container: "#braintree-drop-in-div",
          },
          function (error, instance) {
            if (error) console.error(error);
            else setBraintreeInstance(instance);
          }
        );

      if (braintreeInstance) {
        braintreeInstance.teardown().then(() => {
          initializeBraintree();
        });
      } else {
        initializeBraintree();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, clientToken]);

  const completePayment = async (
    paymentMethodNonce: string,
    amount: number
  ) => {
    if (!user) {
      console.error("User is not logged in");
      return;
    }

    const idToken = await user.getIdToken();
    const response = await postSale(paymentMethodNonce, amount, idToken);
    console.log("Response from postSale:", response);

    if (response && response.result.success) alert("Payment successful");
  };
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg max-w-md w-full">
        <div id={"braintree-drop-in-div"} />
        <Button
          className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={!braintreeInstance}
          onClick={() => {
            if (braintreeInstance) {
              braintreeInstance.requestPaymentMethod((error, payload) => {
                if (error) {
                  console.error(error);
                } else {
                  const paymentMethodNonce = payload.nonce;
                  completePayment(paymentMethodNonce, amount);
                  onPaymentCompleted();
                }
              });
            }
          }}
        >
          {"Pay"}
        </Button>
      </div>
    </div>
  );
}
