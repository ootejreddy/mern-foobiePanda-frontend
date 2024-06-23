import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  restaurantId: string;
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
    country: string;
  };
};
export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createCheckoutSessionRequest = async (
    checkoutSessionRequest: CheckoutSessionRequest
  ) => {
    const accessToken = await getAccessTokenSilently();
    console.log("The checkout session request is: ", checkoutSessionRequest);

    const response = await fetch(
      `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutSessionRequest),
      }
    );
    if (!response.ok) {
      throw new Error("Unable to create checkout session");
    }
    return response.json();
  };
  const {
    mutateAsync: createCheckoutSession,
    isPending,
    isSuccess,
    error,
    reset,
  } = useMutation({
    mutationFn: createCheckoutSessionRequest,
  });
  if (error) {
    toast.error(error.toString());
    reset();
  }
  return {
    createCheckoutSession,
    isPending,
    isSuccess,
  };
};
